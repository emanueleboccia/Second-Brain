#!/usr/bin/env node
// Il controllo di siti e gestionali dei clienti.
//
// Apre ogni indirizzo con il Google Chrome installato, senza account e senza cookie, come lo
// aprirebbe un cliente, e dice cosa non va: se non risponde, se risponde con un errore, se la
// pagina è bianca o mostra un errore del server, se il certificato è scaduto o sta per scadere,
// se è lento. Sui gestionali guarda anche gli errori del codice nella pagina.
//
// Uso:  node controlla.mjs <lista.json> [esito.json]
// La lista è [{ "nome": "Da Mamma Rosaria", "url": "damammarosaria.it", "tipo": "sito" }, ...]
// e la prepara il briefing leggendo Notion: gli indirizzi stanno lì, non qui.
//
// Legge e basta: non scrive su nessun servizio. Una pagina alla volta, per non pesare sul Mac.

import { readFile, writeFile } from 'node:fs/promises';
import tls from 'node:tls';
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ATTESA_PAGINA = 45_000;
const LENTO_SECONDI = 10;
const CERTIFICATO_GIORNI = 14;

// Le frasi con cui un sito rotto si presenta a chi lo apre.
const ERRORI_IN_PAGINA = [
  [/error establishing a database connection/i, 'il sito non raggiunge il suo database'],
  [/there has been a critical error on this website/i, 'errore critico di WordPress'],
  [/(fatal|parse) error:/i, 'errore del codice PHP in pagina'],
  [/briefly unavailable for scheduled maintenance/i, 'WordPress è rimasto in manutenzione'],
  [/account (has been )?suspended|this account has been suspended/i, "l'hosting è sospeso"],
  [/this domain (name )?(has )?expired|domain has expired|dominio (è )?scaduto/i, 'il dominio risulta scaduto'],
  [/whoops, looks like something went wrong/i, 'errore del gestionale'],
  [/^\s*server error\s*$/im, 'errore del server'],
  [/404 not found|page not found|pagina non trovata/i, 'la pagina non esiste'],
];

function normalizza(url) {
  const u = url.trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

function certificato(host) {
  return new Promise((resolve) => {
    const socket = tls.connect({ host, port: 443, servername: host, timeout: 10_000 }, () => {
      const cert = socket.getPeerCertificate();
      const scade = cert?.valid_to ? new Date(cert.valid_to) : null;
      const giorni = scade ? Math.floor((scade - Date.now()) / 86_400_000) : null;
      resolve({ valido: socket.authorized, errore: socket.authorizationError || null, giorni });
      socket.end();
    });
    // Se il server non si raggiunge proprio, del certificato non si sa niente: lo dice la visita.
    socket.on('timeout', () => { socket.destroy(); resolve({ valido: null, errore: null, giorni: null }); });
    socket.on('error', (e) => {
      const rete = ['ENOTFOUND', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'EHOSTUNREACH', 'EAI_AGAIN'].includes(e.code);
      resolve({ valido: rete ? null : false, errore: rete ? null : e.code || e.message, giorni: null });
    });
  });
}

async function visita(browser, voce) {
  const url = normalizza(voce.url);
  const host = new URL(url).hostname;
  const esito = { nome: voce.nome, tipo: voce.tipo || 'sito', url, motivi: [], note: [] };

  const cert = await certificato(host);
  esito.certificato_giorni = cert.giorni;
  if (cert.valido === false) {
    esito.motivi.push(cert.errore === 'CERT_HAS_EXPIRED' ? 'il certificato è scaduto' : `certificato non valido (${cert.errore})`);
  }
  else if (cert.giorni !== null && cert.giorni <= CERTIFICATO_GIORNI) esito.motivi.push(`il certificato scade fra ${cert.giorni} giorni`);

  const page = await browser.newPage();
  const erroriJs = [];
  const risorseRotte = [];
  page.on('pageerror', (e) => erroriJs.push(String(e.message || e).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') erroriJs.push(m.text().slice(0, 160)); });
  page.on('response', (r) => {
    try {
      const stessoSito = new URL(r.url()).hostname.endsWith(host.replace(/^www\./, ''));
      if (stessoSito && r.status() >= 500) risorseRotte.push(`${r.status()} ${r.url().slice(0, 120)}`);
    } catch { /* indirizzi strani delle estensioni: si ignorano */ }
  });

  const inizio = Date.now();
  try {
    const risposta = await page.goto(url, { waitUntil: 'networkidle2', timeout: ATTESA_PAGINA });
    esito.secondi = Math.round((Date.now() - inizio) / 100) / 10;
    esito.stato_http = risposta ? risposta.status() : null;
    esito.url_finale = page.url();
    esito.titolo = (await page.title()).slice(0, 120);
    const testo = await page.evaluate(() => (document.body ? document.body.innerText : '') || '');
    esito.caratteri = testo.trim().length;

    if (esito.stato_http >= 500) esito.motivi.push(`il server risponde con un errore (${esito.stato_http})`);
    else if (esito.stato_http >= 400) esito.motivi.push(`la pagina risponde ${esito.stato_http}`);
    if (esito.caratteri < 40) esito.motivi.push('la pagina è quasi vuota');
    for (const [regola, cosa] of ERRORI_IN_PAGINA) {
      if (regola.test(testo) || regola.test(esito.titolo)) { esito.motivi.push(cosa); break; }
    }
    if (esito.secondi > LENTO_SECONDI) esito.motivi.push(`lento: ${esito.secondi} secondi per aprirsi`);
    if (risorseRotte.length) esito.motivi.push(`${risorseRotte.length} richieste al server finite in errore`);
    // Sui siti gli errori del codice nella pagina sono quasi sempre di script esterni e non si vedono:
    // si annotano e basta. Su un gestionale, che è un programma, contano.
    if (erroriJs.length) {
      if (esito.tipo === 'gestionale') esito.motivi.push(`${erroriJs.length} errori del codice nella pagina`);
      else esito.note.push(`${erroriJs.length} errori del codice nella pagina, di solito innocui su un sito`);
    }
  } catch (e) {
    esito.secondi = Math.round((Date.now() - inizio) / 100) / 10;
    const messaggio = String(e.message || e);
    const cosa = /ERR_NAME_NOT_RESOLVED/.test(messaggio) ? "il dominio non esiste più o non punta da nessuna parte"
      : /ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED/.test(messaggio) ? 'il server rifiuta la connessione'
      : /ERR_CERT/.test(messaggio) ? (cert.valido === false ? null : 'il browser blocca il sito per il certificato')
      : /timeout/i.test(messaggio) ? `non si apre entro ${ATTESA_PAGINA / 1000} secondi`
      : `non si apre (${messaggio.slice(0, 80)})`;
    if (cosa) esito.motivi.push(cosa);
    esito.non_risponde = true;
  } finally {
    esito.errori_js = erroriJs.slice(0, 5);
    esito.risorse_rotte = risorseRotte.slice(0, 5);
    await page.close();
  }

  esito.esito = esito.non_risponde ? 'non risponde' : esito.motivi.length ? 'da guardare' : 'ok';
  return esito;
}

async function main() {
  const [, , fileLista, fileEsito] = process.argv;
  if (!fileLista) {
    console.error('Uso: node controlla.mjs <lista.json> [esito.json]');
    process.exit(2);
  }
  const lista = JSON.parse(await readFile(fileLista, 'utf8'));
  const visti = new Set();
  const daControllare = lista.filter((v) => {
    const chiave = normalizza(v.url).replace(/\/+$/, '').toLowerCase();
    if (visti.has(chiave)) return false;
    visti.add(chiave);
    return true;
  });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-first-run', '--no-default-browser-check', '--disable-extensions', '--mute-audio'],
  });
  const risultati = [];
  try {
    for (const voce of daControllare) risultati.push(await visita(browser, voce));
  } finally {
    await browser.close();
  }

  const quando = new Date().toISOString();
  if (fileEsito) await writeFile(fileEsito, JSON.stringify({ quando, risultati }, null, 2));

  const problemi = risultati.filter((r) => r.esito !== 'ok');
  console.log(`Controllati ${risultati.length}: ${risultati.length - problemi.length} a posto, ${problemi.length} da guardare.`);
  for (const r of risultati) {
    const riga = r.esito === 'ok' ? `ok · ${r.secondi}s` : `${r.esito.toUpperCase()} · ${r.motivi.join('; ')}`;
    console.log(`- ${r.nome} (${r.tipo}) ${r.url_finale || r.url} → ${riga}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

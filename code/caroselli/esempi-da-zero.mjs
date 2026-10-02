// Caroselli d'esempio fatti da zero (29/09/2026): nessuna foto, solo grafiche disegnate, nello stile del
// reel, in due scale che si alternano come nel sito: la scura (fondale firma) e la chiara (fondo crema,
// testo nero, griglia leggera, niente bagliore, la passata che si ribalta). I testi vengono solo da cose
// già dette o approvate da Emanuele: self/reference/convinzioni.md e la home del sito.
//
// Dal 02/10/2026 ogni carosello è un NASTRO: una tela sola larga quanto tutte le slide insieme, che poi si
// taglia in pezzi da 1080. Le illustrazioni stanno a cavallo dei tagli, e per vederle intere bisogna
// scorrere: è l'effetto continuo dei caroselli di Arounda, chiesto da Emanuele. Il fondale è uno solo, con
// un bagliore per slide e il buio solo in alto, in basso e ai due capi del nastro, così i tagli non si vedono.
//   node esempi-da-zero.mjs → out/zero-<carosello>-NN.png e out/nastro-<carosello>.png
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json');
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FONT = '/Users/emanueleboccia/Second Brain/code/remotion-test/public/pb-girarrosto/font'; // i caratteri del brand, gli stessi del reel (fuori da git)
const dati = (f, tipo) => `data:${tipo};base64,` + fs.readFileSync(f).toString('base64');
const out = path.join(process.cwd(), 'out'); // i PNG escono nella cartella da cui si lancia, fuori dal vault
fs.mkdirSync(out, { recursive: true });

const L = 1080, H = 1350; // una slide
const X = (i, x) => i * L + x; // da coordinate della slide i a coordinate del nastro

const css = `
@font-face { font-family:'Archivo'; font-weight:100 900; font-stretch:62% 125%; font-style:normal; src:url('${dati(FONT + '/archivo-latin-wdth-normal.woff2', 'font/woff2')}') format('woff2'); }
@font-face { font-family:'Mono'; font-weight:700; src:url('${dati(FONT + '/jetbrains-mono-latin-700-normal.woff2', 'font/woff2')}') format('woff2'); }
* { margin:0; padding:0; box-sizing:border-box; }
/* la scala scura è quella di sempre; la chiara ribalta i token come fa il sito con data-scala="chiara" */
.nastro { --fondo:#0E0E0C; --testo:#EEEBDA; --forte:#FFFFFF; --spento:#75746A; --intermedio:#B5B2A4; --linea:#2A2A24; --card:#191915;
  --griglia:rgba(238,235,218,.055); --passata:#FCF0DD; --su-passata:#0E0E0C;
  position:relative; height:${H}px; overflow:hidden; background:var(--fondo); color:var(--testo); font-family:'Archivo'; }
.nastro.chiara { --fondo:#EEEBDA; --testo:#0E0E0C; --forte:#0E0E0C; --spento:#8C8A7C; --intermedio:#4A493F; --linea:#D8D3BE; --card:#E4E0CC;
  --griglia:#E2DEC9; --passata:#0E0E0C; --su-passata:#FCF0DD; }
.nastro > * { position:absolute; z-index:1; }
.nastro > .griglia-fondo, .nastro > .luce-fondo { inset:0; z-index:0; }
.griglia-fondo { background-image: linear-gradient(var(--griglia) 1px, transparent 1px), linear-gradient(90deg, var(--griglia) 1px, transparent 1px);
  background-size:72px 72px; background-position:36px 36px; }
.meta { top:64px; width:936px; display:flex; justify-content:space-between; font-family:'Mono'; font-weight:700; font-size:22px;
  letter-spacing:.22em; text-transform:uppercase; color:var(--intermedio); }
.titolo { width:936px; font-weight:900; font-stretch:125%; font-size:112px; line-height:.95; letter-spacing:-.02em; }
.testo { width:898px; font-weight:700; font-size:56px; line-height:1.14; text-wrap:balance; }
.passata { position:relative; display:inline-block; padding:4px 20px 12px; margin-top:8px; color:var(--su-passata); font-weight:900; font-stretch:125%; }
.passata::before { content:''; position:absolute; inset:0; z-index:-1; background:var(--passata); border-radius:6px 14px 8px 12px / 12px 6px 14px 8px; rotate:-1.5deg; box-shadow:0 6px 22px rgba(0,0,0,.25); }
.passata span { position:relative; }
.etichetta { font-family:'Mono'; font-weight:700; font-size:21px; letter-spacing:.22em; text-transform:uppercase; color:var(--intermedio); }
.pillola { display:inline-block; background:var(--testo); color:var(--fondo); border-radius:999px; padding:22px 40px; font-weight:700; font-stretch:125%; font-size:32px; }
.riga-sottile { height:1px; background:var(--linea); }
.griglia-funzioni { display:flex; flex-wrap:wrap; gap:12px; }
.funzione { font-family:'Mono'; font-weight:700; font-size:19px; letter-spacing:.06em; text-transform:uppercase; padding:12px 16px; border-radius:999px;
  border:1.5px solid var(--linea); color:var(--spento); background:var(--fondo); }
.funzione.accesa { background:var(--testo); color:var(--fondo); border-color:var(--testo); }
.finestra { border-radius:18px; overflow:hidden; background:var(--card); border:1.5px solid var(--linea); box-shadow:0 30px 70px rgba(0,0,0,.35); }
.finestra .barra { height:44px; display:flex; align-items:center; gap:9px; padding:0 18px; border-bottom:1.5px solid var(--linea); }
.finestra .barra i { width:12px; height:12px; border-radius:50%; background:var(--linea); display:block; }
.finestra .barra u { margin-left:14px; flex:1; height:22px; border-radius:999px; background:var(--linea); opacity:.6; display:block; }
`;


// Dal 02/10/2026, sera: il contenuto riempie la slide. Emanuele ha trovato le copertine mezze vuote, «devi fare
// sempre in modo che il contenuto riempia un po' tutta la slide e sia ben spaziato e ben posizionato». Lo script
// misura ogni slide e segnala le fasce vuote più alte di 200 punti fra il margine in alto e quello in basso.
const cssPiu = `
@font-face { font-family:'Mano'; font-weight:700; src:url('${dati(FONT + '/bradley-hand-bold.ttf', 'font/ttf')}') format('truetype'); }
.funzione { font-size:25px; padding:15px 22px; }
.griglia-funzioni { gap:14px; }
.adesivo { display:inline-block; font-family:'Mono'; font-weight:700; font-size:20px; letter-spacing:.2em; text-transform:uppercase;
  padding:11px 18px; border-radius:999px; background:var(--testo); color:var(--fondo); box-shadow:0 8px 24px rgba(0,0,0,.18); }
`;

const P = (t) => `<span class="passata"><span>${t}</span></span>`;

// Il fondale del nastro: la griglia si accende dove arriva un bagliore, uno per slide. Nella scala chiara
// niente bagliore, solo la griglia che sfuma verso i bordi di ogni slide.
const fondo = (n, chiara, luci) => {
  const maschere = luci.map(([x, y]) => `radial-gradient(ellipse ${chiara ? '810px 880px' : '670px 700px'} at ${x}px ${y}px, #000 0%, rgba(0,0,0,${chiara ? '.6' : '.35'}) ${chiara ? '60%' : '55%'}, transparent ${chiara ? '95%' : '80%'})`).join(',');
  const griglia = `<div class="griglia-fondo" style="-webkit-mask-image:${maschere}"></div>`;
  if (chiara) return griglia;
  const bagliori = luci.map(([x, y]) => `radial-gradient(circle 870px at ${x}px ${y}px, rgba(218,199,171,.30) 0%, rgba(218,199,171,.12) 28%, rgba(218,199,171,0) 60%)`).join(',');
  const buio = `linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 76%, rgba(0,0,0,.65) 100%),
    linear-gradient(to right, rgba(0,0,0,.6) 0px, rgba(0,0,0,0) 260px, rgba(0,0,0,0) ${n * L - 260}px, rgba(0,0,0,.6) ${n * L}px)`;
  return griglia + `<div class="luce-fondo" style="background:${buio},${bagliori}"></div>`;
};

// Dal 02/10/2026, sera: sulle slide niente righe dei dati in alto («Cosa penso · 01», la serie, il tema) e niente
// firma in basso. Resta solo il contenuto, detto da Emanuele.

// La chiusura ha sempre la stessa forma, ma non la stessa frase: dal 02/10/2026 ogni carosello chiude con
// una frase sua, e la riga della bio resta al caso da cui è nata, il Girarrosto. Detto da Emanuele.
// Il filo che arriva dalla slide prima finisce dove comincia la sua riga.
// Il blocco sta al centro della slide: lo stesso spazio sopra e sotto.
const chiusura = (i, a, b, cta, frase, corpo = 112) => `
  <div style="left:${X(i, 72)}px;top:0;width:936px;height:${H}px;display:flex;flex-direction:column;justify-content:center">
    <div class="titolo" style="position:static;font-size:${corpo}px">${frase}</div>
    <div id="riga-chiusura" class="riga-sottile" style="margin-top:90px;width:936px"></div>
    <div class="testo" style="position:static;margin-top:44px;font-size:44px;color:var(--intermedio)">${cta}</div>
    <div style="margin-top:56px"><span class="pillola">Scrivimi in direct</span></div>
  </div>`;
const versoChiusura = '#riga-chiusura';

// le funzioni: tante, spente; tre accese sono quelle che usi
const FUNZIONI = ['Fatture', 'Preventivi', 'CRM', 'Magazzino', 'Agenda', 'Ticket', 'Report', 'Buste paga', 'Newsletter', 'Listini', 'Resi', 'Flotta',
  'Commesse', 'Timbrature', 'Cespiti', 'Fornitori', 'Ordini', 'Scadenzario', 'Documenti', 'Firme', 'Chat', 'Budget', 'Turni', 'Note spese',
  'Contratti', 'Sondaggi', 'Lotti', 'Provvigioni', 'Cassa', 'Campagne', 'Analisi', 'Progetti', 'Presenze', 'Rubrica', 'Moduli', 'Archivio',
  'Inventario', 'Acquisti', 'Logistica', 'Bilancio', 'Mailing', 'Ferie', 'Fidelity', 'Spedizioni', 'Questionari', 'Rimborsi', 'Agenti', 'Garanzie',
  'Assistenza', 'Contabilità', 'Scorte', 'Abbonamenti'];
const ACCESE = new Set(['Fatture', 'Agenda', 'Ordini']);
const griglia = (larghezza) => `<div class="griglia-funzioni" style="width:${larghezza}px">${FUNZIONI.map((f) =>
  `<span class="funzione ${ACCESE.has(f) ? 'accesa' : ''}">${f}</span>`).join('')}</div>`;

// una finestra piena di menù: il programma che fa tutto
const finestraPiena = (w, h) => `<div class="finestra" style="width:${w}px;height:${h}px;--linea:rgba(238,235,218,.16);background:#1C1C17">
  <div class="barra"><i></i><i></i><i></i><u></u></div>
  <div style="display:flex;height:${h - 44}px">
    <div style="width:220px;border-right:1.5px solid var(--linea);padding:18px;display:flex;flex-direction:column;gap:11px">
      ${Array.from({ length: Math.floor((h - 80) / 25) }, (_, i) => `<div style="height:14px;border-radius:7px;background:var(--linea);width:${60 + ((i * 37) % 40)}%"></div>`).join('')}
    </div>
    <div style="flex:1;padding:18px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;gap:8px">${Array.from({ length: 11 }, () => `<div style="flex:1;height:30px;border-radius:8px;border:1.5px solid var(--linea)"></div>`).join('')}</div>
      <div style="display:flex;gap:8px">${Array.from({ length: 22 }, () => `<div style="width:30px;height:30px;border-radius:7px;background:var(--linea)"></div>`).join('')}</div>
      ${Array.from({ length: Math.floor((h - 180) / 32) }, () => `<div style="display:flex;gap:10px">${Array.from({ length: 8 }, (_, j) => `<div style="flex:${j ? 1 : 2};height:18px;border-radius:5px;background:var(--linea);opacity:.7"></div>`).join('')}</div>`).join('')}
    </div>
  </div></div>`;

// un sito d'esempio: stesso aspetto, due modi di presentarsi. Le tre parti hanno una classe, perché i fili
// partono da lì.
const sito = (titolo, sotto, bottone) => `<div class="finestra" style="width:440px;height:600px;background:#F7F4EA;border-color:#D8D3BE">
  <div class="barra" style="border-color:#D8D3BE"><i style="background:#D8D3BE"></i><i style="background:#D8D3BE"></i><i style="background:#D8D3BE"></i><u style="background:#D8D3BE"></u></div>
  <div style="height:250px;background:radial-gradient(circle at 30% 40%, #E9C9A8 0%, #D9A77F 35%, #B78762 70%, #8C6446 100%);position:relative">
    <div style="position:absolute;left:40px;top:40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.35)"></div>
    <div style="position:absolute;right:30px;bottom:30px;width:180px;height:80px;border-radius:40px;background:rgba(255,255,255,.25)"></div>
  </div>
  <div style="padding:26px 28px;display:flex;flex-direction:column;gap:14px">
    <div class="s-titolo" style="font-weight:800;font-size:31px;line-height:1.1;color:#1A1A16">${titolo}</div>
    <div class="s-sotto" style="font-weight:500;font-size:19px;line-height:1.35;color:#5E5C52">${sotto}</div>
    <div class="s-bottone" style="align-self:flex-start;margin-top:6px;background:#1A1A16;color:#F7F4EA;border-radius:999px;padding:12px 22px;font-weight:700;font-size:17px">${bottone}</div>
  </div></div>`;

// Nei titoli niente punto finale, detto da Emanuele il 02/10/2026: il punto resta solo nei testi che descrivono,
// come «Mi racconti la tua attività e cosa ti pesa.». Punti interrogativi e virgole restano.
// Niente icone a linea: il 29/09/2026 Emanuele le ha trovate «proprio brutte». Le illustrazioni sono schede,
// finestre e diagrammi, come nel resto dei caroselli.

const passo = (n, nome, capitolo, testo) => `
  <div style="display:flex;flex-direction:column;gap:14px">
    <div style="display:flex;align-items:baseline;gap:18px"><span style="font-family:'Mono';font-weight:700;font-size:30px;color:var(--intermedio)">${n}</span>
    <span style="font-weight:900;font-stretch:125%;font-size:46px">${nome}</span></div>
    <div class="etichetta">${capitolo}</div>
    <div style="font-weight:600;font-size:36px;line-height:1.3;color:var(--intermedio)">${testo}</div>
  </div>`;

// Una scheda con le righe, chiara su scuro o scura su chiaro: lo scontrino dei canoni, la lista del sito bello.
const scheda = (id, sx, top, w, rot, titolo, righe, ultima, piu = '') => `<div id="${id}" style="${piu}left:${sx}px;top:${top}px;width:${w}px;rotate:${rot}deg;background:var(--testo);color:var(--fondo);border-radius:22px;padding:32px 36px;box-shadow:0 30px 70px rgba(0,0,0,.4)">
  <div style="font-family:'Mono';font-weight:700;font-size:21px;letter-spacing:.2em;text-transform:uppercase;opacity:.65;margin-bottom:14px">${titolo}</div>
  ${righe.map(([a, b]) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:14px 0;border-bottom:1.5px solid rgba(128,128,120,.3)">
    <span style="font-weight:800;font-size:38px">${a}</span><span style="font-family:'Mono';font-weight:700;font-size:23px;letter-spacing:.12em;text-transform:uppercase">${b}</span></div>`).join('')}
  <div class="ultima" style="display:flex;justify-content:space-between;align-items:baseline;margin-top:20px;padding:16px 20px;border:2.5px dashed currentColor;border-radius:14px;opacity:.9">
    <span style="font-weight:800;font-size:36px">${ultima[0]}</span><span style="font-family:'Mono';font-weight:700;font-size:23px;letter-spacing:.12em;text-transform:uppercase">${ultima[1]}</span></div>
</div>`;

// ── «Cosa penso · 01» — lo strumento generico, scuro ─────────────────────────────────────────────
// 1→2 le funzioni escono dalla copertina ed entrano nella seconda; 2→3 la finestra che fa tutto sta a
// cavallo, e il tuo problema resta fuori dal suo bordo; 3→4 un filo porta il problema allo scontrino dei
// canoni; 4→5 dallo scontrino parte la riga della chiusura.
const CREMA = '#EEEBDA', NERO = '#0E0E0C';
const generico = {
  n: 5, chiara: false, luci: [[540, 837], [X(1, 540), 783], [X(2, 540), 742], [X(3, 540), 675], [X(4, 540), 594]],
  html: `
    <div class="titolo" style="left:72px;top:150px">Quante funzioni<br>${P('usi davvero?')}</div>
    <div style="left:72px;top:590px">${griglia(1400)}</div>

    <div class="titolo" style="left:${X(1, 72)}px;top:150px;font-size:72px">Migliaia di funzioni, costruite su esigenze che non sono&nbsp;le&nbsp;tue</div>
    <div style="left:${X(1, 480)}px;top:520px">${finestraPiena(1080, 680)}</div>

    <div class="titolo" style="left:${X(2, 72)}px;top:150px;font-size:80px">E il problema<br>che hai davvero?<br>${P('Resta lì')}</div>
    <div id="problema" style="left:${X(2, 640)}px;top:660px;width:360px;height:300px;border:3px dashed ${CREMA};border-radius:26px;display:flex;align-items:center;padding:0 34px">
      <div class="etichetta" style="color:var(--testo);font-size:25px;line-height:1.6">Il tuo<br>problema,<br>fuori dal<br>programma</div></div>

    <div class="titolo" style="left:${X(3, 72)}px;top:150px;font-size:76px">Un gestionale<br>che non ti risolve<br>un problema<br>non è<br>uno strumento<br>${P('È solo un costo')}</div>
    ${scheda('scontrino', X(3, 140), 770, 720, -1.5, 'Il canone', [['Ottobre', 'Pagato ✓'], ['Novembre', 'Pagato ✓'], ['Dicembre', 'Pagato ✓']], ['Il tuo problema', 'Ancora lì'])}

    ${chiusura(4, 'Cosa penso · 01', 'Gestionali', 'Scrivimi il problema che il tuo gestionale non tocca.', `Non ti serve<br>il gestionale<br>del secolo<br>Ti serve<br>${P('il tuo')}`)}`,
  fili: [
    { da: '#problema', latoDa: 'destra', a: '#scontrino .ultima', latoA: 'sinistra', colore: CREMA, punta: true, scostaA: 14 },
    { da: '#scontrino', latoDa: 'destra', a: versoChiusura, latoA: 'sinistra', colore: CREMA, dritto: true },
  ],
};

// ── «Cosa penso · 02» — il sito bello che non comunica, chiaro ───────────────────────────────────
// 1→2 il sito «bello» della copertina è a cavallo, e accanto ha la lista di quello che ha e di quello che
// gli manca; 2→3 tre fili partono dal titolo, dalla riga e dal bottone del secondo sito e diventano le tre
// cose che deve capire chi arriva; 3→4 le righe dell'elenco proseguono e sfumano; 4→5 dal sito bello,
// rimasto spento, parte la riga della chiusura.
const righeElenco = [520, 750, 980, 1210].map((y) => `<div style="left:${X(2, 72)}px;top:${y}px;width:1300px;height:1px;background:linear-gradient(to right, #D8D3BE 0, #D8D3BE 936px, rgba(216,211,190,0) 1300px)"></div>`).join('');
const SITO_A = ['Benvenuti nel nostro mondo', 'Passione, qualità e tradizione dal 1998, per offrirvi il meglio.', 'Scopri di più'];
const bello = {
  n: 5, chiara: true, luci: [0, 1, 2, 3, 4].map((i) => [X(i, 540), 675]),
  html: `
    <div class="titolo" style="left:72px;top:150px">Il tuo sito<br>è bello<br>${P('Comunica?')}</div>
    <div style="left:72px;top:620px;width:500px;display:flex;flex-direction:column;gap:18px">
      ${[['Foto', '✓'], ['Colori', '✓'], ['Animazioni', '✓'], ['Caratteri', '✓']].map(([t, s]) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:16px;border-bottom:1.5px solid var(--linea)">
        <span style="font-weight:900;font-stretch:125%;font-size:46px">${t}</span><span style="font-family:'Mono';font-weight:700;font-size:34px">${s}</span></div>`).join('')}
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding:16px 20px;border:2.5px dashed var(--testo);border-radius:14px;margin-top:6px">
        <span style="font-weight:900;font-stretch:125%;font-size:46px">Cosa vendi</span><span style="font-family:'Mono';font-weight:700;font-size:40px">?</span></div>
    </div>
    <div style="left:690px;top:530px;rotate:3deg;scale:1.12;transform-origin:0 0">${sito(...SITO_A)}</div>
    <div style="left:726px;top:494px;rotate:3deg"><span class="adesivo">Bello</span></div>

    <div class="titolo" style="left:${X(1, 72)}px;top:150px;font-size:72px">Due siti bellissimi<br>Uno dice cosa vendi,<br>${P("l'altro no")}</div>
    <div id="B" style="left:${X(1, 420)}px;top:520px;scale:1.15;transform-origin:0 0">${sito('Il pranzo di lavoro in 20 minuti', 'Il menù del giorno ti arriva su WhatsApp alle 11. Prenoti con un messaggio.', 'Scrivici su WhatsApp')}</div>
    <div style="left:${X(1, 440)}px;top:482px;rotate:-2deg"><span class="adesivo">Bello, e dice cosa fa</span></div>

    <div class="titolo" style="left:${X(2, 72)}px;top:150px;font-size:72px">Chi arriva sul tuo sito deve capire subito&nbsp;tre&nbsp;cose</div>
    ${righeElenco}
    ${[['01', 'Cosa vendi'], ['02', 'A chi'], ['03', 'Cosa fare adesso']].map(([n, t], i) => `
      <div id="r${i + 1}" style="left:${X(2, 96)}px;top:${575 + i * 230}px;display:flex;gap:40px;align-items:baseline">
        <span style="font-family:'Mono';font-weight:700;font-size:34px;color:var(--intermedio)">${n}</span>
        <span style="font-weight:900;font-stretch:125%;font-size:72px">${t}</span></div>`).join('')}

    <div class="titolo" style="left:${X(3, 72)}px;top:150px;font-size:78px;font-stretch:112%">Una cosa<br>bellissima<br>che comunica male<br>${P('non vale niente')}</div>
    <div id="spento" style="left:${X(3, 300)}px;top:600px;rotate:-3deg;filter:grayscale(1);opacity:.5">${sito(...SITO_A)}</div>
    <div style="left:${X(3, 270)}px;top:570px;rotate:-3deg"><span class="adesivo">Bello e basta</span></div>

    ${chiusura(4, 'Cosa penso · 02', 'Siti', 'Il tuo sito è bello ma non ti porta richieste? Scrivimi.', `Bello<br>non basta<br>Deve dire<br>${P('cosa vendi')}`)}`,
  fili: [
    { da: '#B .s-titolo', latoDa: 'destra', a: '#r1', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#B .s-sotto', latoDa: 'destra', a: '#r2', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#B .s-bottone', latoDa: 'destra', a: '#r3', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#spento', latoDa: 'destra', a: versoChiusura, latoA: 'sinistra', colore: NERO, dritto: true },
  ],
};

// ── «Come lavoro» — i sei passi, scuro ───────────────────────────────────────────────────────────
// 1→2 la linea dei capitoli sale e diventa la linea dei passi, che corre fino alla quarta; 2→3 la scheda
// del primo incontro sta a cavallo; 3→4 la scheda di quello che resta intestato a te esce dal cantiere e
// passa nella quarta; 4→5 dalla prima modifica dopo la consegna parte la riga della chiusura.
const passiX = [X(1, 180), X(1, 540), X(1, 900), X(2, 180), X(2, 540), X(3, 180)];
const Y_CAP = 860; // la linea dei capitoli in copertina
const lineaPassi = `<svg style="left:0;top:0;overflow:visible" width="1" height="1">
  <path d="M 900 ${Y_CAP} H 1010 C 1110 ${Y_CAP}, 1060 295, ${X(1, 60)} 295" fill="none" stroke="${CREMA}" stroke-width="3" stroke-dasharray="10 12" opacity=".5"/>
  <line x1="${X(1, 60)}" y1="295" x2="${X(3, 180)}" y2="295" stroke="#3A3A32" stroke-width="3"/>
  <line x1="${X(3, 180)}" y1="295" x2="${X(3, 1000)}" y2="295" stroke="${CREMA}" stroke-width="3" stroke-dasharray="10 12" opacity=".35"/>
  ${passiX.map((x, i) => `<circle cx="${x}" cy="295" r="16" fill="${CREMA}"/><text x="${x}" y="270" text-anchor="middle" font-family="Mono" font-weight="700" font-size="20" fill="#B5B2A4">0${i + 1}</text>`).join('')}
</svg>`;
const capitoli = `<svg style="left:0;top:0;overflow:visible" width="1" height="1">
  <line x1="72" y1="${Y_CAP}" x2="900" y2="${Y_CAP}" stroke="#3A3A32" stroke-width="3"/>
  ${[110, 260, 410, 560, 710, 860].map((x, i) => `<circle cx="${x}" cy="${Y_CAP}" r="22" fill="${CREMA}"/>
    <text x="${x}" y="${Y_CAP - 46}" text-anchor="middle" font-family="Mono" font-weight="700" font-size="26" fill="#B5B2A4">0${i + 1}</text>`).join('')}
  ${[[110, 410, 'Prima capisco'], [560, 710, 'Poi costruisco'], [860, 1000, 'Poi resto']].map(([a, b, t]) => `
    <path d="M${a} ${Y_CAP + 64} v20 H${b} v-20" fill="none" stroke="#B5B2A4" stroke-width="2.5" opacity=".7"/>
    <text x="${a}" y="${Y_CAP + 130}" font-family="Mono" font-weight="700" font-size="24" letter-spacing="4" fill="${CREMA}">${t.toUpperCase()}</text>`).join('')}
</svg>`;
const schedaDomande = `<div style="left:${X(1, 830)}px;top:935px;width:650px;rotate:2deg;background:var(--card);border:1.5px solid var(--linea);border-radius:24px;padding:26px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)">
  <div class="etichetta" style="margin-bottom:12px">Il primo incontro</div>
  ${[['01', 'Cosa ti pesa?'], ['02', 'Come lavorate adesso?'], ['03', 'Quando si può dire finito?']].map(([n, q], i) => `
    <div style="display:flex;gap:22px;align-items:baseline;padding:12px 0;${i ? 'border-top:1.5px solid var(--linea);' : ''}">
      <span style="font-family:'Mono';font-weight:700;font-size:24px;color:var(--intermedio)">${n}</span>
      <span style="font-weight:700;font-size:32px;line-height:1.15;white-space:nowrap">${q}</span></div>`).join('')}
</div>`;
const cantiere = `<div class="finestra" style="left:${X(2, 470)}px;top:805px;width:590px;height:420px;rotate:-1.5deg;--linea:rgba(238,235,218,.18);background:#1C1C17">
  <div class="barra"><i></i><i></i><i></i><u></u></div>
  <div style="padding:22px;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;justify-content:space-between"><div style="width:120px;height:18px;border-radius:9px;background:var(--testo);opacity:.8"></div>
      <div style="display:flex;gap:10px">${[1, 2, 3].map(() => '<div style="width:60px;height:14px;border-radius:7px;background:var(--linea)"></div>').join('')}</div></div>
    <div style="height:130px;border-radius:14px;background:linear-gradient(135deg, rgba(238,235,218,.28), rgba(238,235,218,.08))"></div>
    <div style="display:flex;gap:14px">
      <div style="flex:1;height:120px;border-radius:12px;background:rgba(238,235,218,.14)"></div>
      <div style="flex:1;height:120px;border-radius:12px;background:rgba(238,235,218,.14)"></div>
      <div style="flex:1;height:120px;border-radius:12px;border:2px dashed rgba(238,235,218,.35)"></div>
    </div>
  </div>
</div>`;
const intestati = `<div style="left:${X(2, 900)}px;top:960px;width:390px;rotate:2deg;background:var(--testo);color:var(--fondo);border-radius:22px;padding:28px 32px;box-shadow:0 30px 70px rgba(0,0,0,.5)">
  <div style="font-family:'Mono';font-weight:700;font-size:20px;letter-spacing:.2em;text-transform:uppercase;opacity:.7;margin-bottom:14px">Intestati a te</div>
  ${['Dominio', 'Accessi', 'Dati'].map((t) => `<div style="display:flex;gap:16px;align-items:center;font-weight:800;font-size:36px;padding:6px 0"><span style="font-family:'Mono';font-size:30px">✓</span>${t}</div>`).join('')}
</div>`;
const dopo = `<div style="left:${X(3, 320)}px;top:765px;width:700px">
  <div class="etichetta" style="margin-bottom:26px">Dopo la consegna</div>
  <div style="position:relative;padding-left:46px;display:flex;flex-direction:column;gap:22px">
    <div style="position:absolute;left:12px;top:10px;bottom:30px;border-left:3px dashed var(--linea)"></div>
    ${[['+', 'Una cosa da aggiungere', false, 'prima-modifica'], ['−', 'Una cosa da togliere', false, ''], ['✓', "Fatto: l'abito veste", true, '']].map(([s, t, pieno, id]) => `
      <div ${id ? `id="${id}"` : ''} style="position:relative;display:flex;gap:22px;align-items:center;width:${pieno ? 560 : 620}px;padding:24px 28px;border-radius:20px;
        ${pieno ? 'background:var(--testo);color:var(--fondo);' : 'background:var(--card);border:1.5px solid var(--linea);'}">
        <span style="position:absolute;left:-44px;width:22px;height:22px;border-radius:50%;background:var(--testo)"></span>
        <span style="font-family:'Mono';font-weight:700;font-size:34px;width:30px">${s}</span>
        <span style="font-weight:800;font-size:38px">${t}</span></div>`).join('')}
  </div>
</div>`;

const comeLavoro = {
  n: 5, chiara: false, luci: [[540, 760], [X(1, 540), 675], [X(2, 540), 675], [X(3, 540), 675], [X(4, 540), 594]],
  html: `
    <div class="titolo" style="left:72px;top:180px;font-size:92px">Prima capisco<br>Poi costruisco<br>${P('Poi resto')}</div>
    ${capitoli}
    <div class="testo" style="left:72px;top:1080px;font-size:42px;color:var(--intermedio)">Sei passi, sempre gli stessi, dalla prima chiamata ai mesi dopo la&nbsp;consegna.</div>
    ${lineaPassi}

    <div class="titolo" style="left:${X(1, 72)}px;top:130px;font-size:84px">Prima capisco</div>
    <div style="left:${X(1, 72)}px;width:936px;top:390px;display:flex;flex-direction:column;gap:40px">
      ${passo('01', 'Ascolto', 'Prima capisco', 'Mi racconti la tua attività e cosa ti pesa.')}
      ${passo('02', 'Proposta', 'Prima capisco', 'Ti porto per iscritto cosa facciamo e quanto costa.')}
      ${passo('03', 'Sopralluogo', 'Prima capisco', 'Vengo da te e guardo come lavorate davvero.')}
    </div>
    ${schedaDomande}

    <div class="titolo" style="left:${X(2, 72)}px;top:130px;font-size:84px">Poi costruisco</div>
    <div style="left:${X(2, 72)}px;width:936px;top:380px;display:flex;flex-direction:column;gap:36px">
      ${passo('04', 'Costruzione', 'Poi costruisco', 'Costruisco, e ti faccio vedere i passi avanti. Le revisioni le facciamo in chiamata.')}
      ${passo('05', 'Consegna', 'Poi costruisco', 'Dominio, accessi e dati sono intestati a te.')}
    </div>
    ${cantiere}
    ${intestati}

    <div class="titolo" style="left:${X(3, 72)}px;top:130px;font-size:84px">${P('Poi resto')}</div>
    <div style="left:${X(3, 72)}px;width:936px;top:400px">${passo('06', 'Affiancamento', 'Poi resto', "Nei mesi dopo lo usate davvero, e viene fuori cosa aggiungere o togliere. Ci lavoro finché l'abito non&nbsp;vi&nbsp;veste.")}</div>
    ${dopo}

    ${chiusura(4, 'Come lavoro · 01', 'Sei passi', 'Raccontami cosa ti pesa: la prima chiamata serve a capire se posso esserti utile.', `Prima capisco<br>cosa vendi<br>Poi lo<br>${P('costruisco')}`, 104)}`,
  fili: [
    { da: '#prima-modifica', latoDa: 'destra', a: versoChiusura, latoA: 'sinistra', colore: CREMA, scostaDa: 16 },
  ],
};


// ── «Cosa penso» — il preventivo fatto a sensazione, chiaro ──────────────────────────────────────
// Le parole sono quelle dell'articolo del blog dell'8 ottobre, scritte da Emanuele il 30/09/2026.
// 1→2 il preventivo a occhio è a cavallo, e nella seconda le sue promesse hanno un nome; 2→3 un filo porta il
// prezzo a occhio ai due problemi diversi; 3→4 i due problemi finiscono nel preventivo scritto; 4→5 dal
// preventivo scritto parte la riga della chiusura.
const fogliaccio = `<div id="fogliaccio" style="left:150px;top:590px;width:1180px;rotate:-2deg;background:#FBFAF4;border:1.5px solid #D8D3BE;border-radius:10px;padding:46px 56px 40px;box-shadow:0 30px 70px rgba(0,0,0,.18);color:#0E0E0C">
  <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px">
    <span style="font-family:'Mono';font-weight:700;font-size:24px;letter-spacing:.22em;text-transform:uppercase">Preventivo</span>
    <span style="font-family:'Mono';font-weight:700;font-size:20px;letter-spacing:.18em;text-transform:uppercase;opacity:.5">Valido fino a ieri</span></div>
  ${[['Sito web', '€ ?', 'v1'], ['Primo su Google in 30 giorni', 'Incluso', 'v2'], ['Clienti garantiti', 'Incluso', 'v3'], ['Tutto quello che ti serve', 'Incluso', 'v4']].map(([a, b, id]) => `
    <div id="${id}" style="display:flex;align-items:baseline;gap:16px;padding:16px 0">
      <span style="font-weight:800;font-size:40px;white-space:nowrap">${a}</span>
      <span style="flex:1;border-bottom:3px dotted rgba(14,14,12,.3);transform:translateY(-8px)"></span>
      <span style="font-family:'Mono';font-weight:700;font-size:26px;letter-spacing:.1em;text-transform:uppercase">${b}</span></div>`).join('')}
  <div id="totale" style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:20px;border-top:3px solid #0E0E0C">
    <span style="font-family:'Mono';font-weight:700;font-size:26px;letter-spacing:.2em;text-transform:uppercase">Totale</span>
    <span style="font-family:'Mano';font-weight:700;font-size:78px;line-height:1;rotate:-4deg">a occhio</span></div>
</div>`;
const problemaCarta = (id, sx, testo) => `<div id="${id}" style="left:${sx}px;top:500px;width:440px;height:500px;background:var(--card);border:1.5px solid var(--linea);border-radius:24px;padding:40px 38px;display:flex;flex-direction:column;justify-content:space-between">
  <div class="etichetta">Il problema</div>
  <div style="font-weight:900;font-stretch:112%;font-size:46px;line-height:1.08">${testo}</div>
  <div class="etichetta" style="color:var(--testo)">Il suo prezzo</div></div>`;
const preventivo = {
  n: 5, chiara: true, luci: [0, 1, 2, 3, 4].map((i) => [X(i, 540), 675]),
  html: `
    <div class="titolo" style="left:72px;top:150px;font-size:104px">Il preventivo<br>fatto a<br>${P('sensazione')}</div>
    ${fogliaccio}

    <div class="titolo" style="left:${X(1, 72)}px;top:150px;font-size:68px">Un numero tirato fuori guardandoti in faccia, e una promessa accanto per farti&nbsp;dire&nbsp;sì</div>
    <div id="et-promesse" style="left:${X(1, 560)}px;top:745px;rotate:-2deg"><span class="adesivo" style="font-size:26px;padding:14px 24px">Promesse</span></div>
    <div id="et-prezzo" style="left:${X(1, 560)}px;top:1040px;rotate:2deg"><span class="adesivo" style="font-size:26px;padding:14px 24px">Il prezzo, a sensazione</span></div>

    <div class="titolo" style="left:${X(2, 72)}px;top:150px;font-size:84px">Non esiste<br>un prezzo base<br>per tutti</div>
    ${problemaCarta('pa', X(2, 72), 'Un ristorante che perde gli ordini')}
    ${problemaCarta('pb', X(2, 568), 'Uno che non riesce a farsi trovare')}
    <div class="testo" style="left:${X(2, 72)}px;top:1060px;font-size:44px;color:var(--intermedio)">Non hanno lo stesso problema, e non possono avere lo stesso&nbsp;prezzo.</div>

    <div class="titolo" style="left:${X(3, 72)}px;top:150px;font-size:84px">Il prezzo va dietro al problema, non a chi&nbsp;ho&nbsp;davanti</div>
    ${scheda('scritto', X(3, 210), 490, 700, 1.5, 'Il preventivo scritto', [['Cosa facciamo', '✓'], ['Cosa è incluso', '✓'], ['Cosa no', '✓'], ['Quanto costa', '✓']], ['Non si muove in corsa', ''], 'scale:1.18;transform-origin:0 0;')}

    <div class="testo" style="left:${X(3, 72)}px;top:1110px;font-size:44px;color:var(--intermedio)">Se a metà salta fuori una cosa nuova, ne parliamo prima, non&nbsp;in&nbsp;fattura.</div>

    ${chiusura(4, '', '', 'Vuoi un preventivo che spiega invece di promettere? Scrivimi.', `Paghi solo<br>quello che<br>${P('ti serve')}`, 128)}`,
  fili: [
    { da: '#v2', latoDa: 'destra', a: '#et-promesse', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#v3', latoDa: 'destra', a: '#et-promesse', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#totale', latoDa: 'destra', a: '#et-prezzo', latoA: 'sinistra', colore: NERO, punto: true, scostaA: 14 },
    { da: '#et-prezzo', latoDa: 'destra', a: '#pa', latoA: 'sinistra', colore: NERO, punta: true, scostaA: 14 },
    { da: '#pb', latoDa: 'destra', a: '#scritto', latoA: 'sinistra', colore: NERO, punta: true, scostaA: 14 },
    { da: '#scritto', latoDa: 'destra', a: versoChiusura, latoA: 'sinistra', colore: NERO, scostaDa: 16 },
  ],
};

const CAROSELLI = { generico, bello, 'come-lavoro': comeLavoro, preventivo };

// I fili si disegnano a pagina composta, tra i bordi veri delle cose: un sito ingrandito o ruotato sposta i
// punti, e a mano si sbaglierebbe. Un filo `dritto` va orizzontale all'altezza `yDa`, come una riga.
const disegnaFili = (fili) => {
  const n = document.querySelector('.nastro');
  const punto = (spec, lato) => {
    if (spec.x !== undefined) return [spec.x, spec.y];
    const r = document.querySelector(spec).getBoundingClientRect(); const y = r.top + r.height / 2;
    return lato === 'sinistra' ? [r.left, y] : [r.right, y];
  };
  let s = '';
  for (const f of fili) {
    let [ax, ay] = punto(f.da, f.latoDa); let [bx, by] = punto(f.a, f.latoA);
    ax += f.scostaDa || 0; bx -= f.scostaA || 0;
    if (f.dritto) { ay = by; ax += 18; }
    const dx = Math.max(60, Math.abs(bx - ax) / 2);
    const d = f.dritto ? `M ${ax} ${ay} H ${bx}` : `M ${ax} ${ay} C ${ax + dx} ${ay}, ${bx - dx} ${by}, ${bx} ${by}`;
    s += `<path d="${d}" fill="none" stroke="${f.colore}" stroke-width="3.5" stroke-dasharray="12 11" stroke-linecap="round"/>`;
    if (f.punto) s += `<circle cx="${ax}" cy="${ay}" r="9" fill="${f.colore}"/>`;
    if (f.punta) s += `<path d="M ${bx - 22} ${by - 20} L ${bx} ${by} L ${bx - 22} ${by + 20}" fill="none" stroke="${f.colore}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  el.setAttribute('width', n.offsetWidth); el.setAttribute('height', n.offsetHeight);
  el.style.cssText = 'position:absolute;left:0;top:0;z-index:3;pointer-events:none;overflow:visible';
  el.innerHTML = s; n.appendChild(el);
};

// Le fasce vuote: per ogni slide, l'unione delle cose che ci stanno dentro, fra il margine in alto (dopo la
// riga dei dati) e quello in basso. Una fascia più alta di 200 punti è un buco da riempire.
const fasceVuote = (L, H, n) => {
  const cose = [...document.querySelectorAll('.nastro *')].filter((e) => !e.closest('.griglia-fondo, .luce-fondo'));
  const avvisi = [];
  for (let i = 0; i < n; i++) {
    const x0 = i * L, x1 = x0 + L; const tratti = [];
    for (const e of cose) {
      const r = e.getBoundingClientRect();
      if ((r.height < 2 && r.width < 200) || r.width < 2 || r.width * r.height > L * H * 0.8) continue;
      if (Math.min(r.right, x1) - Math.max(r.left, x0) < 24) continue;
      tratti.push([Math.max(0, r.top), Math.min(H, r.bottom)]);
    }
    tratti.sort((a, b) => a[0] - b[0]);
    let fino = 120, peggiore = [0, 0];
    for (const [a, b] of tratti) { if (a > fino && a - fino > peggiore[1] - peggiore[0]) peggiore = [fino, a]; fino = Math.max(fino, b); }
    if (H - 90 > fino && H - 90 - fino > peggiore[1] - peggiore[0]) peggiore = [fino, H - 90];
    if (peggiore[1] - peggiore[0] > 200) avvisi.push(`slide ${i + 1}: vuoto da ${Math.round(peggiore[0])} a ${Math.round(peggiore[1])}`);
  }
  return avvisi;
};

// I margini: in ogni slide lo spazio sopra il contenuto e quello sotto devono essere pari, detto da Emanuele il
// 02/10/2026. Si misura il contenuto che sta nella slide, tagliato ai suoi bordi.
const margini = (L, H, n) => {
  const cose = [...document.querySelectorAll('.nastro *')].filter((e) => !e.closest('.griglia-fondo, .luce-fondo'));
  const esito = [];
  for (let i = 0; i < n; i++) {
    const x0 = i * L, x1 = x0 + L; let su = H, giu = 0;
    for (const e of cose) {
      const r = e.getBoundingClientRect();
      if (r.width < 2 || r.width * r.height > L * H * 0.8 || e.tagName === 'svg') continue;
      if (Math.min(r.right, x1) - Math.max(r.left, x0) < 24) continue;
      su = Math.min(su, Math.max(0, r.top)); giu = Math.max(giu, Math.min(H, r.bottom));
    }
    esito.push([i + 1, Math.round(su), Math.round(H - giu)]);
  }
  return esito;
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  let tot = 0;
  for (const [nome, c] of Object.entries(CAROSELLI)) {
    const W = c.n * L;
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
    await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}${cssPiu}</style></head><body style="margin:0">
      <section class="nastro ${c.chiara ? 'chiara' : ''}" style="width:${W}px">${fondo(c.n, c.chiara, c.luci)}${c.html}</section></body></html>`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 150));
    await page.evaluate(disegnaFili, c.fili || []);
    // le righe che finiscono con una o due parole sole: si segnalano
    const sole = await page.evaluate(() => {
      const avvisi = [];
      document.querySelectorAll('.testo, .titolo').forEach((el) => {
        const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const parole = [];
        for (let t = w.nextNode(); t; t = w.nextNode()) { const re = /\S+/g; let m; while ((m = re.exec(t.textContent))) { const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length); parole.push(Math.round(r.getBoundingClientRect().bottom / 30)); } }
        const righe = [...new Set(parole)]; if (righe.length > 1 && !el.innerHTML.includes('<br>')) { const u = parole.filter((p) => p === righe[righe.length - 1]).length; if (u <= 2) avvisi.push(el.textContent.slice(0, 50) + ' → ' + u); }
      });
      return avvisi;
    });
    sole.forEach((a) => console.warn('⚠️  ' + nome + ': riga corta, ' + a));
    (await page.evaluate(fasceVuote, L, H, c.n)).forEach((a) => console.warn('⚠️  ' + nome + ': ' + a));
    (await page.evaluate(margini, L, H, c.n)).forEach(([i, su, giu]) => { if (Math.abs(su - giu) > 40 || su < 90) console.warn(`⚠️  ${nome}: slide ${i}, sopra ${su} e sotto ${giu}`); else console.log(`   ${nome}: slide ${i}, sopra ${su} e sotto ${giu}`); });
    await page.screenshot({ path: path.join(out, `nastro-${nome}.png`), clip: { x: 0, y: 0, width: W, height: H } });
    for (let i = 0; i < c.n; i++) {
      await page.screenshot({ path: path.join(out, `zero-${nome}-${String(i + 1).padStart(2, '0')}.png`), clip: { x: i * L, y: 0, width: L, height: H } });
      tot++;
    }
  }
  console.log(tot + ' slide');
} finally {
  await browser.close();
}

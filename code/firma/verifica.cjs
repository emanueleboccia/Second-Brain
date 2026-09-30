// Verifica la firma sulla pagina di prova, con Chrome senza finestra: misure e schermate vere.
//
//   node code/firma/verifica.cjs [cartella delle schermate]
//
// Non ha bisogno di un server: ne apre uno suo sulla cartella, su una porta libera, e lo chiude.
// Le schermate vanno fuori dal vault: nella cartella passata, o in una temporanea che alla fine dice.
// Puppeteer è quello di code/controllo-siti/, Chrome quello del Mac. Esce con 1 se qualcosa non passa.

const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');

const QUI = __dirname;
const puppeteer = require(path.join(QUI, '..', 'controllo-siti', 'node_modules', 'puppeteer-core'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FOTO = path.resolve(process.argv[2] || path.join(os.tmpdir(), 'firma-verifica'));
if (FOTO === QUI || FOTO.startsWith(path.resolve(QUI, '..', '..') + path.sep)) { console.error('Le schermate non vanno nel vault: ' + FOTO); process.exit(1); }
fs.mkdirSync(FOTO, { recursive: true });

const esiti = [];
const segna = (nome, ok, dettaglio) => { esiti.push({ nome, ok: !!ok, dettaglio }); console.log((ok ? 'OK   ' : 'NO   ') + nome + (dettaglio ? '  ·  ' + dettaglio : '')); };
const pausa = ms => new Promise(r => setTimeout(r, ms));

// ---------- il server sulla cartella ----------
const TIPI = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const servi = () => new Promise(pronto => {
  const server = http.createServer((chiesta, risposta) => {
    const nome = path.basename(decodeURIComponent(chiesta.url.split('?')[0])) || 'prova.html';
    const file = path.join(QUI, nome);
    if (!TIPI[path.extname(nome)] || !fs.existsSync(file)) { risposta.writeHead(404); risposta.end(); return; }
    risposta.writeHead(200, { 'Content-Type': TIPI[path.extname(nome)] });
    risposta.end(fs.readFileSync(file));
  });
  server.listen(0, '127.0.0.1', () => pronto(server));
});

// ---------- gli attrezzi ----------
// ferma tutte le monete a un certo angolo del giro lento
const fermaA = (page, gradi) => page.evaluate((gradi) => {
  document.getAnimations().forEach(a => {
    if (a.animationName === 'firma-eb-gira') { a.pause(); a.currentTime = 9000 * gradi / 360; }
  });
}, gradi);

// la scatola di un elemento, in coordinate di pagina
const scatola = (page, sel) => page.$eval(sel, e => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; });

// Si fotografa quello che sta nella finestra, dopo averci portato l'elemento: le schermate prese
// fuori vista (captureBeyondViewport) in Chrome senza finestra perdono a volte il testo.
const ritaglio = async (page, sel, file, margine = 16) => {
  await page.$eval(sel, e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const r = await scatola(page, sel);
  const clip = { x: Math.max(0, r.x - margine), y: Math.max(0, r.y - margine), width: r.w + 2 * margine, height: r.h + 2 * margine };
  return page.screenshot({ path: file ? path.join(FOTO, file) : undefined, encoding: file ? 'binary' : 'base64', captureBeyondViewport: false, clip });
};

// quello che conta nel footer ostile, letto dagli stili calcolati
const leggiOstile = (page, sel) => page.$eval(sel, a => {
  const cs = getComputedStyle(a), g = s => getComputedStyle(a.querySelector(s)), b = s => a.querySelector(s).getBoundingClientRect();
  const f = a.querySelector('.firma-eb__faccia'), p = a.querySelector('path');
  return { colore: cs.color, colorePadre: getComputedStyle(a.parentElement).color, decorazione: cs.textDecorationLine, ombra: cs.boxShadow,
           bordo: cs.borderBottomStyle + ' ' + cs.borderBottomWidth, fondo: cs.backgroundColor, contorno: cs.outlineStyle, mostra: cs.display,
           riempimento: cs.paddingLeft + ' ' + cs.paddingTop, freccia: getComputedStyle(a, '::after').content,
           testo: { corpo: g('.firma-eb__testo').fontSize, peso: g('.firma-eb__testo').fontWeight, stile: g('.firma-eb__testo').fontStyle, maiuscolo: g('.firma-eb__testo').textTransform, spaziatura: g('.firma-eb__testo').letterSpacing, mostra: g('.firma-eb__testo').display },
           frase: { colore: g('.firma-eb__frase').color, fondo: g('.firma-eb__frase').backgroundColor, galleggia: g('.firma-eb__frase').float, corpo: g('.firma-eb__frase').fontSize },
           scena: [b('.firma-eb__scena').width, b('.firma-eb__scena').height],
           faccia: { larga: getComputedStyle(f).width, alta: getComputedStyle(f).height, tratto: getComputedStyle(f).stroke, posto: getComputedStyle(f).position },
           tracciato: { riempie: getComputedStyle(p).fill, tratto: getComputedStyle(p).stroke },
           link: [a.getBoundingClientRect().width, a.getBoundingClientRect().height] };
});
const giudicaOstile = (o, quando) => {
  segna('ostile' + quando + ': colore del testo del footer, non quello dei link', o.colore === o.colorePadre, o.colore);
  segna('ostile' + quando + ': niente sottolineature, ombre, bordi, fondi, contorni', o.decorazione === 'none' && o.ombra === 'none' && /^none/.test(o.bordo) && o.fondo === 'rgba(0, 0, 0, 0)' && o.contorno === 'none', [o.decorazione, o.ombra, o.bordo, o.fondo, o.contorno].join(' · '));
  segna('ostile' + quando + ': niente freccia appesa, niente riempimento', o.freccia === 'none' && o.riempimento === '0px 0px' && o.link[1] === 22, o.freccia + ' · ' + o.riempimento + ' · alto ' + o.link[1]);
  segna('ostile' + quando + ': la scritta resta la sua', o.testo.corpo === '12px' && o.testo.maiuscolo === 'uppercase' && o.testo.stile === 'normal' && o.testo.peso === '500' && o.testo.mostra === 'grid' && o.frase.galleggia === 'none' && o.frase.fondo === 'rgba(0, 0, 0, 0)' && o.frase.colore === o.colorePadre && o.frase.corpo === '12px', JSON.stringify(o.testo));
  segna('ostile' + quando + ': la moneta resta di 22 px, piena e senza tratto', o.scena[0] === 22 && o.scena[1] === 22 && o.faccia.larga === '22px' && o.faccia.alta === '22px' && o.faccia.posto === 'absolute' && o.tracciato.riempie === o.colorePadre && o.tracciato.tratto === 'none', JSON.stringify(o.faccia) + ' ' + JSON.stringify(o.tracciato));
};

(async () => {
  const server = await servi();
  const BASE = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run', '--force-color-profile=srgb'] });
  const page = await browser.newPage();
  const errori = [];
  page.on('pageerror', e => errori.push('pagina: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errori.push('console: ' + m.text()); });
  page.on('response', r => { if (r.status() >= 400) errori.push(r.status() + ' ' + r.url()); });

  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
  await page.goto(BASE + 'prova.html', { waitUntil: 'networkidle0' });
  await page.waitForSelector('html[data-pronta="si"]', { timeout: 10000 });
  const blocco = fs.readFileSync(path.join(QUI, 'firma.html'), 'utf8');
  const quante = await page.$$eval('a.firma-eb', l => l.length);
  const stili = await page.$$eval('style', l => l.filter(s => s.textContent.includes('.firma-eb{')).length);
  segna('la pagina di prova carica il blocco', quante >= 12 && stili === 1, quante + ' firme, ' + stili + ' stile');
  segna('nel blocco non c\'è JavaScript', !/<script|javascript:|\son\w+=/i.test(blocco));
  const daIncollare = blocco.replace(/<!--[\s\S]*?-->\s*/, '');
  console.log('     il blocco da incollare pesa ' + Buffer.byteLength(daIncollare) + ' byte, ' + require('zlib').gzipSync(daIncollare, { level: 9 }).length + ' compresso');

  // ---------- a riposo ----------
  const alta = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewport({ width: 1100, height: alta, deviceScaleFactor: 2 });   // la pagina intera: si allunga la finestra
  await pausa(300);
  await fermaA(page, 0);
  await page.screenshot({ path: path.join(FOTO, '01-pagina-a-riposo.png'), captureBeyondViewport: false });
  await page.setViewport({ width: 1100, height: 900, deviceScaleFactor: 2 });
  await pausa(300);
  await ritaglio(page, '#piede-scuro', '02-scuro-riposo.png');

  const S = '#piede-scuro a.firma-eb';
  const riposo = await page.$eval(S, a => {
    const cs = getComputedStyle(a), f = getComputedStyle(a.querySelector('.firma-eb__frase')), n = getComputedStyle(a.querySelector('.firma-eb__nome'));
    const t = getComputedStyle(a.querySelector('.firma-eb__testo')), m = a.querySelector('.firma-eb__scena').getBoundingClientRect();
    return { opacita: cs.opacity, colore: cs.color, colorePadre: getComputedStyle(a.parentElement).color,
             frase: f.opacity, nome: n.opacity, corpo: t.fontSize, maiuscolo: t.textTransform, spaziatura: t.letterSpacing, famiglia: t.fontFamily,
             famigliaPadre: getComputedStyle(a.parentElement).fontFamily, aCapo: t.whiteSpace, moneta: [m.width, m.height],
             riempie: getComputedStyle(a.querySelector('path')).fill, giro: getComputedStyle(a.querySelector('.firma-eb__moneta')).animationDuration,
             href: a.getAttribute('href'), target: a.target, rel: a.rel };
  });
  segna('a riposo è spenta', riposo.opacita === '0.7', 'opacità ' + riposo.opacita);
  segna('prende il colore del footer, scritta e moneta', riposo.colore === riposo.colorePadre && riposo.riempie === riposo.colorePadre, riposo.colore);
  segna('prende il carattere del footer', riposo.famiglia === riposo.famigliaPadre, riposo.famiglia);
  segna('frase visibile, nome nascosto', riposo.frase === '1' && riposo.nome === '0');
  segna('frase a 12 px, maiuscola, spaziata, su una riga', riposo.corpo === '12px' && riposo.maiuscolo === 'uppercase' && riposo.aCapo === 'nowrap' && riposo.spaziatura === '0.96px', riposo.corpo + ', spaziatura ' + riposo.spaziatura);
  segna('moneta di 22 px, un giro in 9 s', riposo.moneta[0] === 22 && riposo.moneta[1] === 22 && riposo.giro === '9s', riposo.moneta.join(' × ') + ', ' + riposo.giro);
  segna('link giusto', riposo.href === 'https://emanueleboccia.it/' && riposo.target === '_blank' && riposo.rel === 'noopener', riposo.href + ' ' + riposo.target + ' ' + riposo.rel);

  // ---------- il nome per chi legge lo schermo ----------
  const albero = await page.accessibility.snapshot({ interestingOnly: true });
  const nomi = [];
  (function giro(n) { if (!n) return; if (n.role === 'link') nomi.push({ nome: n.name, figli: (n.children || []).length }); (n.children || []).forEach(giro); })(albero);
  const delleFirme = nomi.filter(n => /Emanuele Boccia/.test(n.nome));
  segna('il link ha un nome leggibile', delleFirme.some(n => n.nome === 'Costruito da Emanuele Boccia, apre emanueleboccia.it') && delleFirme.length === quante, JSON.stringify([...new Set(delleFirme.map(n => n.nome))]));
  segna('scritta e moneta sono nascoste a chi legge lo schermo', delleFirme.every(n => n.figli === 0));
  segna('sola: il nome resta nell\'etichetta', delleFirme.filter(n => n.nome === 'Sistema di Emanuele Boccia, apre emanueleboccia.it').length === 2);

  // ---------- al passaggio del mouse ----------
  const misura = (piede) => page.evaluate((piede) => {
    const p = document.querySelector(piede), a = p.querySelector('a.firma-eb'), s = p.querySelector('small'), m = a.querySelector('.firma-eb__scena');
    const r = e => { const b = e.getBoundingClientRect(); return [b.x + scrollX, b.y + scrollY, b.width, b.height].map(v => Math.round(v * 1000) / 1000).join(' '); };
    return { piede: r(p), link: r(a), testo: r(s), moneta: r(m), pagina: document.documentElement.scrollHeight + ' ' + document.documentElement.scrollWidth };
  }, piede);
  const prima = await misura('#piede-scuro');
  await page.hover(S);
  await pausa(1100);
  const durante = await misura('#piede-scuro');
  const sopra = await page.$eval(S, a => ({ opacita: getComputedStyle(a).opacity, frase: getComputedStyle(a.querySelector('.firma-eb__frase')).opacity, nome: getComputedStyle(a.querySelector('.firma-eb__nome')).opacity, giro: getComputedStyle(a.querySelector('.firma-eb__moneta')).rotate }));
  segna('al passaggio il footer non si muove', JSON.stringify(prima) === JSON.stringify(durante), 'link ' + prima.link + ' → ' + durante.link);
  segna('al passaggio: piena, nome al posto della frase', sopra.opacita === '1' && sopra.frase === '0' && sopra.nome === '1', JSON.stringify(sopra));
  await ritaglio(page, '#piede-scuro', '03-scuro-passaggio.png');

  // il giro svelto: si guarda a metà transizione
  await page.mouse.move(5, 5);
  await pausa(400);
  await page.hover(S);
  await pausa(300);
  const aMeta = await page.$eval(S + ' .firma-eb__moneta', m => getComputedStyle(m).rotate);
  segna('il giro svelto parte', /^y \d/.test(aMeta) && aMeta !== 'y 0deg' && aMeta !== 'y 360deg', 'a 300 ms: ' + aMeta);
  await page.mouse.move(5, 5);
  await pausa(500);
  segna('all\'uscita torna com\'era', JSON.stringify(prima) === JSON.stringify(await misura('#piede-scuro')));

  // ---------- al focus da tastiera ----------
  await page.evaluate(() => document.querySelector('#piede-scuro small').setAttribute('tabindex', '-1'));
  await page.focus('#piede-scuro small');
  await page.keyboard.press('Tab');
  await pausa(1100);
  const fuoco = await page.evaluate(() => {
    const a = document.activeElement, cs = getComputedStyle(a);
    return { eLaFirma: a.matches('#piede-scuro a.firma-eb'), visibile: a.matches(':focus-visible'), contorno: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, stacco: cs.outlineOffset,
             opacita: cs.opacity, nome: getComputedStyle(a.querySelector('.firma-eb__nome')).opacity };
  });
  segna('col Tab ci si arriva e il focus si vede', fuoco.eLaFirma && fuoco.visibile && /^solid 2px/.test(fuoco.contorno), fuoco.contorno + ', stacco ' + fuoco.stacco);
  segna('al focus: piena, col nome', fuoco.opacita === '1' && fuoco.nome === '1');
  segna('al focus il footer non si muove', JSON.stringify(prima) === JSON.stringify(await misura('#piede-scuro')));
  await ritaglio(page, '#piede-scuro', '04-scuro-focus.png');
  await page.evaluate(() => document.activeElement.blur());
  await pausa(400);
  const colClic = await page.evaluate(() => { const a = document.querySelector('#piede-chiaro a.firma-eb'); a.focus({ focusVisible: false }); const r = { contorno: getComputedStyle(a).outlineStyle }; a.blur(); return r; });
  segna('col focus del mouse il contorno non compare', colClic.contorno === 'none', colClic.contorno);

  // ---------- chiaro e colorato ----------
  await ritaglio(page, '#piede-chiaro', '05-chiaro-riposo.png');
  await ritaglio(page, '#piede-colorato', '06-colorato-riposo.png');
  const colori = await page.evaluate(() => ['#piede-chiaro', '#piede-colorato'].map(s => { const a = document.querySelector(s + ' a.firma-eb'); return [getComputedStyle(a.parentElement).color, getComputedStyle(a).color, getComputedStyle(a.querySelector('path')).fill]; }));
  segna('chiaro e colorato: il colore è quello del footer', colori.every(c => c[0] === c[1] && c[1] === c[2]), colori.map(c => c[1]).join(' · '));
  await page.hover('#piede-colorato a.firma-eb');
  await pausa(1100);
  await ritaglio(page, '#piede-colorato', '07-colorato-passaggio.png');
  await page.mouse.move(5, 5);
  await pausa(400);

  // ---------- il footer ostile ----------
  const O = '#colophon a.firma-eb';
  giudicaOstile(await leggiOstile(page, O), '');
  await ritaglio(page, '#colophon', '08-ostile-riposo.png');
  const primaO = await misura('#colophon');
  await page.hover(O);
  await pausa(1100);
  const ostileSopra = await page.$eval(O, a => { const cs = getComputedStyle(a); return { colore: cs.color, colorePadre: getComputedStyle(a.parentElement).color, fondo: cs.backgroundColor, decorazione: cs.textDecorationLine, contorno: cs.outlineStyle, nome: getComputedStyle(a.querySelector('.firma-eb__nome')).opacity }; });
  segna('ostile, al passaggio: resta pulita e non si muove', ostileSopra.colore === ostileSopra.colorePadre && ostileSopra.fondo === 'rgba(0, 0, 0, 0)' && ostileSopra.decorazione === 'none' && ostileSopra.contorno === 'none' && ostileSopra.nome === '1' && JSON.stringify(primaO) === JSON.stringify(await misura('#colophon')), JSON.stringify(ostileSopra));
  await ritaglio(page, '#colophon', '09-ostile-passaggio.png');
  await page.mouse.move(5, 5);
  await pausa(400);
  await page.focus('#colophon small a');
  await page.keyboard.press('Tab');
  await pausa(1100);
  const ostileFuoco = await page.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a); return { eLaFirma: a.matches('#colophon a.firma-eb'), contorno: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, fondo: cs.backgroundColor, colorePadre: getComputedStyle(a.parentElement).color }; });
  segna('ostile, al focus: il contorno è il suo', ostileFuoco.eLaFirma && ostileFuoco.contorno === 'solid 2px ' + ostileFuoco.colorePadre && ostileFuoco.fondo === 'rgba(0, 0, 0, 0)', JSON.stringify(ostileFuoco));
  await ritaglio(page, '#colophon', '10-ostile-focus.png');
  await page.evaluate(() => document.activeElement.blur());

  // lo stesso, con le regole del tema messe dopo lo stile della firma: è il caso di firma.css dentro una build
  await page.evaluate(() => {
    const tema = [...document.querySelectorAll('head style')].map(s => s.textContent).join('\n');
    const dopo = document.createElement('style'); dopo.id = 'tema-dopo'; dopo.textContent = tema; document.body.appendChild(dopo);
  });
  await pausa(500);
  giudicaOstile(await leggiOstile(page, O), ', tema caricato dopo');
  await page.evaluate(() => document.getElementById('tema-dopo').remove());

  // ---------- frasi, varianti, misure ----------
  await ritaglio(page, '#frasi', '11-frasi.png');
  const larghezze = await page.$$eval('#frasi a.firma-eb', l => l.map(a => Math.round(a.getBoundingClientRect().width * 100) / 100));
  segna('con ogni frase il link è largo uguale', new Set(larghezze).size === 1, larghezze.join(', '));
  await ritaglio(page, '#varianti', '12-varianti.png');
  const varianti = await page.evaluate(() => {
    const q = document.querySelector('.firma-eb--quieta .firma-eb__moneta'), s = document.querySelector('#varianti .firma-eb--sola');
    const r = s.getBoundingClientRect();
    const b = document.querySelector('#barra'), ab = b.querySelector('a.firma-eb').getBoundingClientRect(), rb = b.getBoundingClientRect();
    return { quieta: getComputedStyle(q).animationName, solaLink: [r.width, r.height], solaMostra: getComputedStyle(s.querySelector('.firma-eb__testo')).display,
             inFondo: Math.round(rb.bottom - ab.bottom), centrata: Math.abs((ab.left + ab.right) / 2 - (rb.left + rb.right) / 2) };
  });
  segna('quieta: a riposo non gira', varianti.quieta === 'none', varianti.quieta);
  segna('sola: resta la moneta, 22 × 22, in fondo alla barra', varianti.solaLink[0] === 22 && varianti.solaLink[1] === 22 && varianti.solaMostra === 'none' && varianti.inFondo === 14 && varianti.centrata < .01, JSON.stringify(varianti));
  await page.hover('#varianti .firma-eb--quieta');
  await pausa(300);
  const quietaSopra = await page.$eval('#varianti .firma-eb--quieta .firma-eb__moneta', m => getComputedStyle(m).rotate);
  segna('quieta: al passaggio fa il suo giro', quietaSopra !== 'y 0deg' && quietaSopra !== 'none', 'a 300 ms: ' + quietaSopra);
  await page.mouse.move(5, 5);
  await pausa(500);
  await ritaglio(page, '#misure', '13-misure.png');
  const misure = await page.$$eval('#misure .firma-eb__scena', l => l.map(e => e.getBoundingClientRect().width));
  segna('la misura si regola con --firma-misura', misure.join() === '20,22,24', misure.join(', '));

  // ---------- la riga a 320 px e la stretta ----------
  const centro = (sel) => page.evaluate((sel) => {
    const b = document.querySelector(sel), a = b.querySelector('a.firma-eb'), f = a.querySelector('.firma-eb__frase'), m = a.querySelector('.firma-eb__scena'), n = a.querySelector('.firma-eb__nome');
    const giro = document.createRange(); giro.selectNodeContents(f); const rf = giro.getBoundingClientRect();
    giro.selectNodeContents(n); const rn = giro.getBoundingClientRect();
    const rb = b.getBoundingClientRect(), ra = a.getBoundingClientRect(), rm = m.getBoundingClientRect();
    return { scatola: rb.width, link: Math.round(ra.width * 100) / 100, alto: ra.height, dentro: ra.left >= rb.left && ra.right <= rb.right, sfora: b.scrollWidth > b.clientWidth,
             fuoriCentro: Math.round(((rf.left + rm.right) / 2 - (rb.left + rb.right) / 2) * 100) / 100, nomeDa: Math.round((rn.left - rb.left) * 100) / 100 };
  }, sel);
  const stretta = await centro('#stretta');
  segna('a 320 px sta su una riga e non sfora', stretta.scatola === 320 && stretta.dentro && !stretta.sfora && stretta.alto === 22, JSON.stringify(stretta));
  const centrata = await centro('#stretta-centrata');
  segna('stretta: in un footer centrato sta al centro', Math.abs(centrata.fuoriCentro) < 1 && centrata.link < stretta.link, 'fuori centro di ' + centrata.fuoriCentro + ' px (la normale di ' + stretta.fuoriCentro + '), link largo ' + centrata.link + ' contro ' + stretta.link);
  const primaC = await misura('#stretta-centrata');
  await page.hover('#stretta-centrata a.firma-eb');
  await pausa(1100);
  const centrataSopra = await centro('#stretta-centrata');
  segna('stretta: al passaggio non si muove niente e il nome resta nel riquadro', JSON.stringify(primaC) === JSON.stringify(await misura('#stretta-centrata')) && centrataSopra.nomeDa > 0, 'il nome parte a ' + centrataSopra.nomeDa + ' px dal bordo');
  await ritaglio(page, '.strette', '15-riga-320-passaggio.png');
  await page.mouse.move(5, 5);
  await pausa(500);
  await ritaglio(page, '.strette', '14-riga-320.png');

  // ---------- con meno movimento ----------
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pausa(200);
  const ferma = await page.evaluate(() => {
    const m = document.querySelector('#piede-scuro .firma-eb__moneta');
    return { animazione: getComputedStyle(m).animationName, attive: document.getAnimations().filter(a => a.animationName === 'firma-eb-gira').length, trasformata: getComputedStyle(m).transform };
  });
  segna('con meno movimento sta ferma, di fronte', ferma.animazione === 'none' && ferma.attive === 0 && ferma.trasformata === 'none', JSON.stringify(ferma));
  await page.hover(S);
  await pausa(300);
  const fermaSopra = await page.$eval(S, a => ({ giro: getComputedStyle(a.querySelector('.firma-eb__moneta')).rotate, transizione: getComputedStyle(a.querySelector('.firma-eb__moneta')).transitionDuration, nome: getComputedStyle(a.querySelector('.firma-eb__nome')).opacity }));
  segna('con meno movimento, al passaggio non gira ma il nome compare', fermaSopra.transizione === '0s' && Number(fermaSopra.nome) > 0, JSON.stringify(fermaSopra));
  await pausa(500);
  await ritaglio(page, '#piede-scuro', '16-meno-movimento-passaggio.png');
  await page.mouse.move(5, 5);
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

  // ---------- il telefono stretto ----------
  await page.setViewport({ width: 320, height: 640, deviceScaleFactor: 3 });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.waitForSelector('html[data-pronta="si"]');
  await fermaA(page, 0);
  const telefono = await page.evaluate(() => ({ larga: document.documentElement.scrollWidth, vista: innerWidth,
    righe: [...document.querySelectorAll('a.firma-eb:not(.firma-eb--sola)')].map(a => Math.round(a.getBoundingClientRect().height)),
    fuori: [...document.querySelectorAll('a.firma-eb')].filter(a => { const r = a.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth; }).length }));
  segna('a 320 px di schermo la pagina non scorre di lato', telefono.larga <= telefono.vista && telefono.fuori === 0, telefono.larga + ' su ' + telefono.vista);
  segna('a 320 px di schermo ogni firma sta su una riga', telefono.righe.every(h => h <= 24), [...new Set(telefono.righe)].join(', ') + ' px di altezza');
  await page.evaluate(() => document.querySelector('#piede-scuro').scrollIntoView());
  await pausa(200);
  await page.screenshot({ path: path.join(FOTO, '17-telefono-320.png'), captureBeyondViewport: false });
  await page.close();

  // ---------- la moneta girata: mai il riflesso ----------
  // Sedici angoli in una schermata, da guardare. E una prova che non ha bisogno di occhi: la faccia
  // dietro è uguale a quella davanti, quindi la moneta a 220 gradi dev'essere identica a quella a 40.
  // Se dietro si leggesse il riflesso, le due schermate sarebbero una lo specchio dell'altra.
  const stile = daIncollare.match(/<style>[\s\S]*?<\/style>/)[0];
  const link = daIncollare.match(/<a class="firma-eb"[\s\S]*?<\/a>/)[0].replace('class="firma-eb"', 'class="firma-eb firma-eb--sola"');
  const angoli = [0, 30, 60, 85, 90, 95, 120, 150, 180, 210, 240, 265, 270, 275, 300, 330];
  const banco = await browser.newPage();
  await banco.setViewport({ width: 1340, height: 470, deviceScaleFactor: 2 });
  await banco.setContent(`<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:30px;background:#15171C;color:#E8E6DC;font:13px/1.3 Helvetica,Arial,sans-serif;--firma-misura:96px;--firma-opacita:1}
    .griglia{display:grid;grid-template-columns:repeat(8,150px);gap:22px 10px}
    .cella{display:flex;flex-direction:column;align-items:center;gap:14px}
    .cella b{font-weight:400;opacity:.6}</style>${stile}
    <div class="griglia">${angoli.map(a => `<div class="cella" data-angolo="${a}"><b>${a}°</b>${link}</div>`).join('')}</div>`, { waitUntil: 'load' });
  await banco.evaluate(() => document.querySelectorAll('.cella').forEach(c => c.querySelector('.firma-eb__moneta').getAnimations().forEach(a => { a.pause(); a.currentTime = 9000 * Number(c.dataset.angolo) / 360; })));
  await pausa(200);
  await banco.screenshot({ path: path.join(FOTO, '18-moneta-a-sedici-angoli.png'), captureBeyondViewport: false });
  const coppie = [];
  for (const [a, b] of [[30, 210], [60, 240], [120, 300], [150, 330], [0, 180]]) {
    const foto = [];
    for (const g of [a, b]) foto.push(await ritaglio(banco, `.cella[data-angolo="${g}"] .firma-eb__scena`, null, 4));
    coppie.push(await banco.evaluate(async (una, altra, a, b) => {
      const leggi = async s => { const i = new Image(); await new Promise(ok => { i.onload = ok; i.src = 'data:image/png;base64,' + s; }); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.drawImage(i, 0, 0); return { d: x.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height }; };
      const p = await leggi(una), q = await leggi(altra);
      let diversi = 0, specchio = 0, chiari = 0;
      for (let y = 0; y < p.h; y++) for (let x = 0; x < p.w; x++) {
        const k = (y * p.w + x) * 4, s = (y * p.w + (p.w - 1 - x)) * 4;
        if (p.d[k] > 128) chiari++;
        if (Math.abs(p.d[k] - q.d[k]) > 64) diversi++;
        if (Math.abs(p.d[k] - q.d[s]) > 64) specchio++;
      }
      return { a, b, chiari, diversi, specchio };
    }, foto[0], foto[1], a, b));
  }
  segna('la moneta voltata è uguale a quella di fronte: si legge EB, mai il riflesso', coppie.every(c => c.chiari > 2000 && c.diversi < c.chiari * .01 && c.specchio > c.chiari * .1),
        coppie.map(c => c.a + '°/' + c.b + '°: ' + c.diversi + ' pixel diversi, ' + c.specchio + ' se fosse allo specchio').join(' · '));
  const taglio = await banco.evaluate(() => [...document.querySelectorAll('.cella[data-angolo="90"] .firma-eb__faccia, .cella[data-angolo="270"] .firma-eb__faccia')].map(f => Math.round(f.getBoundingClientRect().width * 100) / 100));
  segna('a 90 e a 270 gradi è di taglio', taglio.every(l => l < .5), 'facce larghe ' + taglio.join(', ') + ' px');
  await banco.close();

  segna('nessun errore in pagina', errori.length === 0, errori.join(' | '));
  const no = esiti.filter(e => !e.ok);
  console.log('\n' + (esiti.length - no.length) + ' su ' + esiti.length + ' passano' + (no.length ? ' · NON passano: ' + no.map(e => e.nome).join('; ') : ''));
  console.log('schermate in ' + FOTO);
  await browser.close();
  server.close();
  process.exit(no.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

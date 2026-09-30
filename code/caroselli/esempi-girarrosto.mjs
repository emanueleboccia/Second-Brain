// Caroselli del personal brand nello stile del reel (29/09/2026): fondale firma, crema, la passata crema
// sulla parola chiave, niente riquadri, foto vere e mockup veri. Lo schema viene da Arounda
// (sources/riferimenti/caroselli-arounda.md): copertina col lavoro dentro un dispositivo, il prima,
// un'immagine che attraversa due slide, il dopo, la chiusura sempre uguale.
//   node caroselli.mjs  → out/<carosello>-NN.png e out/provino.png
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json');
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const qui = path.dirname(new URL(import.meta.url).pathname);
const FONT = '/Users/emanueleboccia/Second Brain/code/remotion-test/public/pb-girarrosto/font'; // i caratteri del brand, gli stessi del reel (fuori da git)
const dati = (f, tipo) => `data:${tipo};base64,` + fs.readFileSync(f).toString('base64');
const img = (n) => dati(path.join(process.cwd(), 'img', n), n.endsWith('.webp') ? 'image/webp' : 'image/png');
const out = path.join(process.cwd(), 'out');
fs.mkdirSync(out, { recursive: true });

const css = `
@font-face { font-family:'Archivo'; font-weight:100 900; font-stretch:62% 125%; font-style:normal; src:url('${dati(FONT + '/archivo-latin-wdth-normal.woff2', 'font/woff2')}') format('woff2'); }
@font-face { font-family:'Mono'; font-weight:700; src:url('${dati(FONT + '/jetbrains-mono-latin-700-normal.woff2', 'font/woff2')}') format('woff2'); }
@font-face { font-family:'Mano'; font-weight:700; src:url('${dati('/System/Library/Fonts/Supplemental/Bradley Hand Bold.ttf', 'font/ttf')}') format('truetype'); }
:root { --fondo:#0E0E0C; --crema:#EEEBDA; --passata:#FCF0DD; --intermedio:#B5B2A4; --spento:#75746A; --linea:#2A2A24; --luce:218,199,171;
  --ombra: 0 2px 3px rgba(0,0,0,.55), 0 4px 18px rgba(0,0,0,.6), 0 0 42px rgba(0,0,0,.35); }
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#222; }
.slide { position:relative; width:1080px; height:1350px; overflow:hidden; background:var(--fondo); color:var(--crema); font-family:'Archivo'; }
.largo { width:2160px; }
.fondale::before { content:''; position:absolute; inset:0; z-index:0;
  background-image: linear-gradient(rgba(238,235,218,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(238,235,218,.055) 1px, transparent 1px);
  background-size:72px 72px; background-position:36px 36px;
  -webkit-mask-image: radial-gradient(ellipse 62% 52% at var(--lx,50%) var(--ly,52%), #000 0%, rgba(0,0,0,.35) 55%, transparent 80%); }
.fondale::after { content:''; position:absolute; inset:0; z-index:0;
  background: radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,.5) 76%, #000 100%),
              radial-gradient(circle at var(--lx,50%) var(--ly,52%), rgba(var(--luce),.30) 0%, rgba(var(--luce),.12) 28%, rgba(var(--luce),0) 60%); }
.slide > * { position:absolute; z-index:1; }
.foto { inset:0; width:100%; height:100%; object-fit:cover; z-index:0; }
.scuro { inset:0; z-index:0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, rgba(0,0,0,.72) 100%); }
.meta { top:64px; left:72px; right:72px; display:flex; justify-content:space-between; font-family:'Mono'; font-weight:700; font-size:22px;
  letter-spacing:.22em; text-transform:uppercase; color:var(--crema); text-shadow:0 1px 2px rgba(0,0,0,.8), 0 2px 10px rgba(0,0,0,.7), 0 0 30px rgba(0,0,0,.5); }
.meta .destra { text-align:right; line-height:1.5; }
.titolo { left:72px; right:72px; font-weight:900; font-stretch:125%; font-size:118px; line-height:.95; letter-spacing:-.02em; text-shadow:var(--ombra); }
.testo { left:72px; right:110px; font-weight:700; font-size:56px; line-height:1.14; text-shadow:var(--ombra); text-wrap:balance; }
.passata { position:relative; display:inline-block; padding:4px 20px 12px; margin-top:8px; color:var(--fondo); font-weight:900; font-stretch:125%; text-shadow:none; }
.passata::before { content:''; position:absolute; inset:0; z-index:-1; background:var(--passata); border-radius:6px 14px 8px 12px / 12px 6px 14px 8px; rotate:-1.5deg; box-shadow:0 6px 22px rgba(0,0,0,.35); }
.passata span { position:relative; }
.etichetta { font-family:'Mono'; font-weight:700; font-size:21px; letter-spacing:.22em; text-transform:uppercase; color:var(--crema); text-shadow:var(--ombra); }
.pillola { display:inline-block; background:var(--crema); color:var(--fondo); border-radius:999px; padding:22px 40px; font-weight:700; font-stretch:125%; font-size:32px; letter-spacing:.02em; }
.mockup { border-radius:30px; box-shadow:0 40px 90px rgba(0,0,0,.65), 0 6px 18px rgba(0,0,0,.4); }
/* il foglio e la scheda dell'illustrazione */
.foglio { background:#F7F3E8; border-radius:10px; box-shadow:0 30px 80px rgba(0,0,0,.55);
  background-image: linear-gradient(rgba(90,120,190,.17) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(90,120,190,.17) 1.5px, transparent 1.5px); background-size:37px 37px; }
.riga { display:flex; align-items:center; gap:26px; height:112px; padding-left:36px; }
.nome { width:120px; height:26px; border-bottom:3.5px solid #26241E; border-radius:40%; opacity:.9; }
.ordine { position:relative; font-family:'Mano'; font-weight:700; font-size:44px; color:#26241E; }
.ordine i { position:absolute; left:-12px; right:-14px; top:6px; height:44px; opacity:.62; mix-blend-mode:multiply; border-radius:10px 16px 12px 18px / 16px 10px 18px 12px; rotate:-.8deg; }
.scheda { background:#fff; border:3px solid #1A1A1A; border-radius:22px; padding:26px 30px; display:flex; flex-direction:column; gap:14px; box-shadow:0 40px 90px rgba(0,0,0,.6); }
.scheda .voce { display:flex; justify-content:space-between; font-weight:600; font-size:31px; color:#333; }
.scheda .voce b, .scheda .tot b { font-family:'Mono'; font-weight:700; }
.scheda .tot { display:flex; justify-content:space-between; align-items:baseline; border-top:2px solid #E6E6E6; padding-top:14px; margin-top:6px; }
.scheda .tot span { font-weight:700; font-size:19px; letter-spacing:.16em; color:#999; }
.scheda .tot b { font-size:54px; color:#111; }
.scheda .verde { align-self:flex-start; background:#35C759; color:#0A2A12; border-radius:999px; padding:12px 22px; font-weight:800; font-size:19px; letter-spacing:.08em; }
`;

const P = (t) => `<span class="passata"><span>${t}</span></span>`;
const chiusura = (cta) => `
<section class="slide fondale" style="--ly:44%">
  <div class="titolo" style="top:300px;font-size:96px">Il lavoro<br>che ti pesa<br>non si<br>organizza.<br>${P('Si toglie.')}</div>
  <div style="left:72px;right:72px;top:930px;height:1px;background:var(--linea)"></div>
  <div class="testo" style="top:975px;font-size:44px;color:var(--intermedio)">${cta}</div>
  <div style="left:72px;top:1120px"><span class="pillola">Scrivimi in direct</span></div>
  <div class="etichetta" style="left:72px;bottom:64px;color:var(--intermedio)">Emanuele Boccia · siti e sistemi</div>
</section>`;

const CAROSELLI = {
  'lavoro-vero-girarrosto': [
    `<section class="slide fondale" style="--ly:62%">
      <div class="meta"><span>Lavoro vero · 01</span><span class="destra">Girarrosto Liberti<br>ordini e menù</span></div>
      <div class="titolo" style="top:190px">Dal foglio<br>${P("all'iPad.")}</div>
      <img class="mockup" src="${img('mockup-girarrosto.webp')}" style="left:100px;top:560px;width:880px;height:880px;rotate:-4deg">
    </section>`,
    `<section class="slide">
      <img class="foto" src="${img('prima-foglio.png')}"><div class="scuro"></div>
      <div class="meta"><span>Prima</span><span class="destra">Girarrosto Liberti<br>agosto 2026</span></div>
      <div class="testo" style="bottom:120px">Gli ordini si prendevano così: un foglio, una penna e<br>${P('gli evidenziatori.')}</div>
    </section>`,
    `<section class="slide largo fondale" style="--lx:50%;--ly:55%">
      <div class="titolo" style="top:120px;font-size:104px">Stesso gesto,</div>
      <div class="titolo" style="top:120px;left:1152px;font-size:104px">senza<br>${P('il foglio.')}</div>
      <div class="foglio" style="left:90px;top:380px;width:860px;height:760px;rotate:-2.5deg">
        <div style="height:40px"></div>
        <div class="riga"><div class="nome"></div><div class="ordine"><i style="background:#F2E641"></i>1 pollo fritto, patatine</div></div>
        <div class="riga"><div class="nome" style="width:96px"></div><div class="ordine"><i style="background:#FF9A3C"></i>2 alette impanate</div></div>
        <div class="riga"><div class="nome" style="width:110px"></div><div class="ordine"><i style="background:#8FDC5E"></i>1 coscia di tacchino</div></div>
        <div class="riga"><div class="nome" style="width:100px"></div><div class="ordine"><i style="background:#F2E641"></i>2 polli fritti</div></div>
        <div class="riga"><div class="nome" style="width:118px"></div><div class="ordine"><i style="background:#FF9A3C"></i>4 alette impanate</div></div>
      </div>
      <div class="etichetta" style="left:90px;top:1190px;color:var(--intermedio);line-height:1.6">Giallo il fritto · arancione l'impanato<br>verde il tacchino</div>
      <svg style="left:960px;top:560px;overflow:visible" width="260" height="120"><path d="M0 60 C 90 10, 170 110, 240 60" fill="none" stroke="#EEEBDA" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round"/><path d="M220 42 L244 60 L220 78" fill="none" stroke="#EEEBDA" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="scheda" style="left:1260px;top:400px;width:780px;rotate:2deg">
        <div style="display:flex;justify-content:space-between;font-family:'Mono';font-weight:700;font-size:22px;color:#8A8A8A"><span>#12</span><span>18:35</span></div>
        <div class="voce"><span>2 × Pollo</span><b>€20,00</b></div>
        <div class="voce"><span>1 × Patatine grande</span><b>€6,00</b></div>
        <div class="voce"><span>1 × Coca-Cola 1,5 lt</span><b>€3,00</b></div>
        <div class="tot"><span>TOTALE</span><b>€29,00</b></div>
        <div class="verde">CONSEGNATO</div>
      </div>
      <div class="etichetta" style="left:1260px;top:1200px;color:var(--intermedio)">Il totale esce da solo</div>
    </section>`,
    `<section class="slide">
      <img class="foto" src="${img('dopo-totali.png')}"><div class="scuro"></div>
      <div class="meta"><span>Dopo</span><span class="destra">Girarrosto Liberti<br>settembre 2026</span></div>
      <div class="testo" style="bottom:120px">${P('Un tocco,')}<br>e sai quanti pezzi<br>preparare in giornata.</div>
    </section>`,
    chiusura('Prendi ancora gli ordini a mano? Scrivimi come fai adesso.'),
  ],
  'convinzione-copertina': [
    `<section class="slide">
      <img class="foto" src="${img('ragazzo-colori.png')}"><div class="scuro"></div>
      <div class="meta"><span>Convinzione · 01</span><span class="destra">Come lavoro</span></div>
      <div class="titolo" style="bottom:120px;font-size:104px">Il problema<br>lo deve dire<br>${P('il cliente.')}</div>
    </section>`,
  ],
  'domanda-copertina': [
    `<section class="slide">
      <img class="foto" src="${img('prova-app.png')}"><div class="scuro"></div>
      <div class="meta"><span>La domanda · 01</span><span class="destra">Siti e sistemi</span></div>
      <div class="titolo" style="bottom:120px;font-size:100px">Ti serve un'app,<br>o un foglio<br>${P('fatto meglio?')}</div>
    </section>`,
  ],
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 2200, height: 1400, deviceScaleFactor: 1 });
  const fatti = [];
  for (const [nome, slides] of Object.entries(CAROSELLI)) {
    let n = 1;
    for (const html of slides) {
      await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body style="margin:0">${html}</body></html>`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 150));
      const el = await page.$('section.slide');
      const largo = await el.evaluate((e) => e.classList.contains('largo'));
      for (const dx of largo ? [0, 1080] : [0]) {
        const f = path.join(out, `${nome}-${String(n).padStart(2, '0')}.png`);
        await page.screenshot({ path: f, clip: { x: dx, y: 0, width: 1080, height: 1350 } });
        fatti.push(f); n++;
      }
    }
  }
  console.log(fatti.length + ' slide');
} finally {
  await browser.close();
}

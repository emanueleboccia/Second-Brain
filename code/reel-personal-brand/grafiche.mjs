// Le scritte del reel come PNG trasparenti da 1080×1920, coi caratteri del brand.
//   node grafiche.mjs grafiche.json
// Ogni voce del JSON diventa grafiche/<id>.png. Segnala i sottotitoli che finiscono con una o due
// parole sole sull'ultima riga, come vuole il CLAUDE.md di radice.

import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json');
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const qui = path.dirname(new URL(import.meta.url).pathname);
const spec = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const out = path.join(qui, 'grafiche');
fs.mkdirSync(out, { recursive: true });
// i caratteri entrano nella pagina come dati: una pagina senza origine non può leggere file dal disco
const font = (f) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(qui, 'font', f)).toString('base64');

const css = `
@font-face { font-family: 'Archivo'; font-style: normal; font-weight: 100 900; font-stretch: 62% 125%;
  src: url('${font('archivo-latin-wdth-normal.woff2')}') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family: 'Archivo'; font-style: normal; font-weight: 100 900; font-stretch: 62% 125%;
  src: url('${font('archivo-latin-ext-wdth-normal.woff2')}') format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: 'Mono'; font-weight: 700; src: url('${font('jetbrains-mono-latin-700-normal.woff2')}') format('woff2'); }
:root { --nero:#000; --fondo:#0E0E0C; --linea:#2A2A24; --spento:#75746A; --intermedio:#B5B2A4; --luce:218,199,171; --crema:#EEEBDA; --punta:#FFF; }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; background:transparent; }
#tela { position:relative; width:1080px; height:1920px; overflow:hidden; color:var(--crema); }

/* la cornice: il nome e dove siamo, sempre nello stesso punto */
.cornice { position:absolute; left:54px; top:148px; background:rgba(14,14,12,.9); border-radius:12px;
  padding:15px 22px 14px; display:flex; flex-direction:column; gap:9px; }
.marchio { font-family:'Archivo'; font-stretch:125%; font-weight:700; font-size:23px; letter-spacing:.24em; color:var(--crema); }
.etichetta { font-family:'Mono'; font-weight:700; font-size:19px; letter-spacing:.24em; text-transform:uppercase; }

/* il gancio: grande, in alto, per i primi tre secondi */
.gancio { position:absolute; left:54px; right:54px; top:300px; background:rgba(14,14,12,.92); border-radius:16px;
  padding:30px 34px 34px; font-family:'Archivo'; font-stretch:125%; font-weight:900; font-size:68px;
  line-height:.98; letter-spacing:-.01em; text-transform:uppercase; text-wrap:balance; }

/* i sottotitoli: crema su fondo scuro, una parola sola in bianco */
.sub { position:absolute; left:0; right:0; bottom:448px; display:flex; justify-content:center; }
.sub p { display:inline-block; max-width:840px; background:rgba(14,14,12,.88); border-radius:16px;
  padding:17px 28px 20px; font-family:'Archivo'; font-stretch:100%; font-weight:700; font-size:54px;
  line-height:1.13; text-align:center; text-wrap:balance; color:var(--crema); }
b { font-weight:inherit; color:var(--punta); }
.dato { font-family:'Mono'; font-weight:700; color:var(--punta); letter-spacing:-.01em; }

/* il cartello finale sul fondale firma */
.finale { position:absolute; inset:0; background:var(--fondo); }
.finale::before { content:''; position:absolute; inset:0;
  background-image: linear-gradient(rgba(238,235,218,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(238,235,218,.055) 1px, transparent 1px);
  background-size:72px 72px; background-position:36px 36px;
  -webkit-mask-image: radial-gradient(ellipse 70% 42% at 50% 46%, #000 0%, rgba(0,0,0,.35) 55%, transparent 80%); }
.finale::after { content:''; position:absolute; inset:0;
  background: radial-gradient(ellipse 85% 70% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,.55) 76%, #000 100%),
              radial-gradient(circle at 50% 46%, rgba(var(--luce),.30) 0%, rgba(var(--luce),.12) 28%, rgba(var(--luce),0) 60%); }
.finale .blocco { position:absolute; left:72px; right:72px; top:640px; z-index:1; display:flex; flex-direction:column; gap:34px; }
.finale .frase { font-family:'Archivo'; font-stretch:125%; font-weight:900; font-size:92px; line-height:.96;
  letter-spacing:-.015em; text-transform:uppercase; color:var(--crema); }
.finale .punta { font-family:'Archivo'; font-stretch:125%; font-weight:900; font-size:132px; line-height:.9;
  letter-spacing:-.02em; text-transform:uppercase; color:var(--punta); }
.finale .riga { height:1px; background:var(--linea); margin-top:10px; }
.finale .mono { font-family:'Mono'; font-weight:700; font-size:22px; letter-spacing:.24em; text-transform:uppercase; color:var(--intermedio); }
.finale .cornice { z-index:1; }
`;

const html = (voce) => {
  if (voce.tipo === 'cornice') return `<div class="cornice"><div class="marchio">EMANUELE BOCCIA</div>
    <div class="etichetta" style="color:var(--${voce.colore})">${voce.testo}</div></div>`;
  if (voce.tipo === 'gancio') return `<div class="gancio">${voce.testo}</div>`;
  if (voce.tipo === 'sub') return `<div class="sub"><p>${voce.testo}</p></div>`;
  if (voce.tipo === 'finale') return `<div class="finale">
    <div class="cornice"><div class="marchio">EMANUELE BOCCIA</div><div class="etichetta" style="color:var(--intermedio)">${voce.etichetta}</div></div>
    <div class="blocco"><div class="frase">${voce.frase}</div><div class="punta">${voce.punta}</div>
    <div class="riga"></div><div class="mono">${voce.mono}</div></div></div>`;
  throw new Error('tipo sconosciuto: ' + voce.tipo);
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div id="tela"></div></body></html>`, { waitUntil: 'load' });
  // i caratteri si caricano una volta sola, prima di disegnare
  await page.evaluate(async () => {
    const t = document.getElementById('tela');
    t.innerHTML = '<span style="font-family:Archivo;font-weight:900;font-stretch:125%">A</span><span style="font-family:Archivo;font-weight:700">A</span><span style="font-family:Mono">A</span>';
    await document.fonts.ready;
    await Promise.all([document.fonts.load('900 expanded 40px Archivo'), document.fonts.load('700 40px Archivo'), document.fonts.load('700 40px Mono')]);
  });
  for (const voce of spec) {
    await page.evaluate((h) => { document.getElementById('tela').innerHTML = h; }, html(voce));
    await page.evaluate(() => document.fonts.ready);
    if (voce.tipo === 'sub') {
      // parole sole in fondo: si contano le parole dell'ultima riga
      const avviso = await page.evaluate(() => {
        const p = document.querySelector('.sub p');
        const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
        const parole = [];
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const re = /\S+/g; let m;
          while ((m = re.exec(n.textContent))) {
            const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
            parole.push({ w: m[0], top: Math.round(r.getBoundingClientRect().bottom / 30) });
          }
        }
        const righe = [...new Set(parole.map(p => p.top))];
        if (righe.length < 2) return null;
        const ultima = parole.filter(p => p.top === righe[righe.length - 1]).length;
        return ultima <= 2 ? `ultima riga di ${ultima} parol${ultima === 1 ? 'a' : 'e'}` : null;
      });
      if (avviso) console.warn(`⚠️  ${voce.id}: ${avviso}`);
    }
    await page.screenshot({ path: path.join(out, voce.id + '.png'), omitBackground: voce.tipo !== 'finale', clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  }
  console.log(`Fatte ${spec.length} grafiche in ${out}`);
} finally {
  await browser.close();
}

// Trasforma ogni <section class="slide"> di un carosello in un PNG da 1080×1350,
// e ne fa un provino con tutte le slide affiancate.
//
//   node code/caroselli/renderizza.mjs outputs/grafiche/<cartella>/carosello.html
//
// I PNG finiscono accanto all'HTML: 01.png, 02.png… e provino.png.
// Usa il Google Chrome installato, come il controllo dei siti.

import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// puppeteer-core sta già installato per il controllo dei siti: si usa quello
const require = createRequire(new URL('../controllo-siti/package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const file = process.argv[2];
if (!file) { console.error('Manca il file: node renderizza.mjs <carosello.html>'); process.exit(1); }
const html = path.resolve(file);
const cartella = path.dirname(html);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1400, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(html).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const slides = await page.$$('section.slide');

  // il testo che esce dal margine si segnala: su un telefono sparisce oltre il bordo
  const sforamenti = await page.evaluate(() => {
    const fuori = [];
    document.querySelectorAll('section.slide').forEach((s, i) => {
      const box = s.getBoundingClientRect();
      const margine = parseFloat(getComputedStyle(s).paddingRight);
      const limite = box.right - margine + 2;
      const walker = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        const destra = Math.max(...[...range.getClientRects()].map(r => r.right));
        if (destra > limite) fuori.push(`slide ${i + 1}: «${n.textContent.trim().slice(0, 40)}» sfora di ${Math.round(destra - limite)} px`);
      }
    });
    return fuori;
  });
  sforamenti.forEach(f => console.warn('⚠️  ' + f));

  const nomi = [];
  for (let i = 0; i < slides.length; i++) {
    const nome = String(i + 1).padStart(2, '0') + '.png';
    await slides[i].screenshot({ path: path.join(cartella, nome) });
    nomi.push(nome);
  }

  // il provino: tutte le slide in fila, per guardarle insieme
  const colonne = Math.min(slides.length, 4);
  const provino = `<!DOCTYPE html><html><body style="margin:0;background:#1a1a1a;padding:40px;
    display:grid;grid-template-columns:repeat(${colonne},270px);gap:24px;width:max-content">
    ${nomi.map(n => `<img src="${pathToFileURL(path.join(cartella, n)).href}" style="width:270px;height:337.5px;display:block">`).join('')}
    </body></html>`;
  const tmp = path.join(cartella, '.provino.html');
  fs.writeFileSync(tmp, provino);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  const body = await page.$('body');
  await body.screenshot({ path: path.join(cartella, 'provino.png') });
  fs.unlinkSync(tmp);

  console.log(`Fatte ${slides.length} slide in ${cartella}`);
} finally {
  await browser.close();
}

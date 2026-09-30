// Controllo su telefono di un sito: foto di ogni pagina intera a 390 px e i difetti che si misurano.
//   node mobile.mjs <indirizzo base> <cartella di uscita> /percorso1 /percorso2 ...
// Scritto il 30/09/2026 per il sito di Room84. Segnala: pagina più larga dello schermo, elementi che escono a
// destra, testi centrati in un blocco che però stanno a sinistra, immagini senza dimensione.
import puppeteer from 'puppeteer-core';
const [base, uscita, ...percorsi] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new',
  args: ['--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1');
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
for (const p of percorsi) {
  await page.goto(base + p, { waitUntil: 'networkidle2', timeout: 60000 });
  // scorre tutta la pagina, così le animazioni all'ingresso partono e le immagini pigre si caricano
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 1500));
  });
  const esito = await page.evaluate(() => {
    const W = innerWidth, fuori = [];
    const larghezza = document.documentElement.scrollWidth;
    document.querySelectorAll('body *').forEach(e => {
      const r = e.getBoundingClientRect(), st = getComputedStyle(e);
      if (!r.width || st.position === 'fixed' || st.visibility === 'hidden') return;
      if (e.closest('[aria-hidden="true"], .modale, dialog, .carosello, .nastro, .linguette, [class*="scorri"]')) return;
      if (r.right > W + 1 && e.children.length === 0 && (e.textContent || '').trim()) fuori.push((e.className || e.tagName) + ': ' + (e.textContent || '').trim().slice(0, 40) + ' (+' + Math.round(r.right - W) + 'px)');
    });
    const storti = [];
    document.querySelectorAll('p, h1, h2, h3, h4, span, a, li').forEach(e => {
      const st = getComputedStyle(e.parentElement || e);
      if (st.textAlign !== 'center' || !e.textContent.trim() || e.children.length > 3) return;
      const r = e.getBoundingClientRect(), pr = e.parentElement.getBoundingClientRect();
      if (r.width < 30 || pr.width - r.width < 40) return;
      const sx = r.left - pr.left, dx = pr.right - r.right;
      if (Math.abs(sx - dx) > 24 && getComputedStyle(e).display !== 'block') storti.push((e.className || e.tagName) + ': ' + e.textContent.trim().slice(0, 40) + ` (sx ${Math.round(sx)} dx ${Math.round(dx)})`);
    });
    return { larghezza, W, altezza: document.body.scrollHeight, fuori: [...new Set(fuori)].slice(0, 12), storti: [...new Set(storti)].slice(0, 12) };
  });
  const nome = (p.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home');
  await page.screenshot({ path: `${uscita}/${nome}.png`, fullPage: true });
  console.log(JSON.stringify({ pagina: p, ...esito }));
}
await browser.close();

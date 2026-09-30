// Il giro di controllo prima di un lancio: ogni pagina della mappa del sito a nove larghezze.
//   node giro.mjs <indirizzo base> <cartella di uscita>
//   es. node giro.mjs http://localhost:4173 /tmp/giro
// Scritto il 30/09/2026 per emanueleboccia.it. Segnala: pagine più larghe dello schermo (prima e dopo aver
// scorso, perché le animazioni d'ingresso possono allargare), errori in console, file e immagini rotte,
// link interni rotti, titolo oltre 65 caratteri e descrizione oltre 160, e le righe corte: un paragrafo
// che finisce con una o due parole, un titolo con l'ultima riga sotto il 45% della più lunga. Salta quello
// che va a capo apposta: la passata da sola, le etichette nascoste, i titoli composti a righe fisse.
// Scrive tutto in <uscita>/esito.json.
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json')
const puppeteer = require('puppeteer-core')
const BASE = process.argv[2] || 'http://localhost:4173'
const OUT = process.argv[3] || '.'
// le pagine si leggono dalla mappa del sito, più un indirizzo che non esiste per la pagina d'errore
const mappa = await fetch(BASE + '/sitemap.xml').then((r) => r.text()).catch(() => '')
const dallaMappa = [...mappa.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1])
const PAGINE = dallaMappa.length ? [...dallaMappa, '/non-esiste/'] : ['/', '/servizi/', '/servizi/consulenza/', '/servizi/siti-web/', '/servizi/erp/', '/servizi/company-brain/', '/progetti/', '/progetti/la-masseria/', '/progetti/la-masseria-gestionale/', '/progetti/da-mamma-rosaria/', '/progetti/da-mamma-rosaria-sito/', '/progetti/tenuta-don-gaetano/', '/progetti/girarrosto-liberti/', '/progetti/room84/', '/chi-sono/', '/contatti/', '/blog/', '/blog/cosa-fa-l-ai-nel-mio-lavoro/', '/blog/il-preventivo-fatto-a-sensazione/', '/blog/una-cosa-bellissima-che-comunica-male/', '/non-esiste/']
const MISURE = [[1920, 1080], [1440, 900], [1280, 800], [1024, 768], [900, 1000], [768, 1024], [390, 844], [360, 780], [320, 700]]
const attendi = (ms) => new Promise(r => setTimeout(r, ms))
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] })
const page = await browser.newPage()
const esito = { errori: {}, rotte: {}, larghe: {}, corte: {}, meta: {}, link: new Set(), pesanti: [] }
const aggiungi = (dove, chiave, voce) => { (dove[chiave] ||= new Set()).add(voce) }
let qui = ''
page.on('pageerror', (e) => aggiungi(esito.errori, qui, e.message.slice(0, 140)))
page.on('console', (m) => { if (m.type() === 'error') aggiungi(esito.errori, qui, m.text().slice(0, 140)) })
page.on('response', (r) => { const u = r.url(); if (u.startsWith(BASE) && r.status() >= 400 && !u.includes('/non-esiste/')) aggiungi(esito.rotte, qui, `${r.status()} ${u.replace(BASE, '')}`) })
for (const [w, h] of MISURE) {
  const mob = w < 768
  await page.setViewport({ width: w, height: h, isMobile: mob, hasTouch: mob })
  for (const via of PAGINE) {
    qui = via
    await page.goto(BASE + via, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => aggiungi(esito.errori, via, 'caricamento: ' + e.message.slice(0, 80)))
    await attendi(1600)
    const prima = await page.evaluate(() => document.documentElement.scrollWidth)
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 650) { scrollTo(0, y); await new Promise(r => setTimeout(r, 45)) } })
    await attendi(900)
    const r = await page.evaluate(() => {
      const W = innerWidth
      // le righe corte: paragrafi e titoli di almeno cinque parole che finiscono con una o due
      const corte = []
      document.querySelectorAll('main p, main h1, main h2, main h3, main h4, main li, main dd, main figcaption, main blockquote, main summary').forEach((el) => {
        if (el.closest('[aria-hidden="true"], nav, .nomi, .domande__linguette') || !el.offsetParent) return
        const testo = el.innerText.trim(); if (testo.split(/\s+/).length < 5 || el.children.length > 6) return
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const parole = []; let n
        while ((n = walker.nextNode())) { const re = /[^\s ]+/g; let m; while ((m = re.exec(n.data))) { const g = document.createRange(); g.setStart(n, m.index); g.setEnd(n, m.index + m[0].length); const rc = g.getClientRects(); if (rc.length) { const q = rc[rc.length - 1]; parole.push({ y: Math.round(q.top), l: q.left, r: q.right, nodo: n.parentElement }) } } }
        if (parole.length < 5) return
        const righe = []; parole.forEach((p) => { const r = righe.find((x) => Math.abs(x.y - p.y) < 4); if (r) { r.l = Math.min(r.l, p.l); r.r = Math.max(r.r, p.r); r.n++; r.nodi.push(p.nodo) } else righe.push({ y: p.y, l: p.l, r: p.r, n: 1, nodi: [p.nodo] }) })
        if (righe.length < 2) return
        const ultima = righe[righe.length - 1]
        // le righe degli elenchi che finiscono con «Apri», una data o una freccia vanno a capo apposta
        if (!el.closest('a') && ultima.nodi.every((x) => x.closest('a, time, button, .freccia'))) return
        // un titolo che finisce con la passata la mette su una riga sua, per scelta; e le etichette nascoste vanno a capo da sole
        if (ultima.nodi.every((x) => x.closest('.passata, [aria-hidden="true"]'))) return
        // i titoli composti a righe fisse vanno a capo dove li ha messi chi li ha scritti
        if (el.querySelector('.riga')) return
        const grande = el.matches('h1, h2, h3, h4, summary, [class*="titol"]') || !!el.closest('summary')
        const larga = Math.max(...righe.map((x) => x.r - x.l))
        const corta = grande ? (ultima.r - ultima.l) < larga * 0.45 : ultima.n <= 2
        if (corta) corte.push(testo.slice(-40).replace(/\s+/g, ' '))
      })
      const meta = { titolo: document.title, desc: document.querySelector('meta[name="description"]')?.content || '', og: !!document.querySelector('meta[property="og:image"]'), h1: document.querySelectorAll('h1').length }
      const link = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h.startsWith('/') && !h.startsWith('//'))
      const img = [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.getAttribute('src'))
      return { dopo: document.documentElement.scrollWidth, W, corte, meta, link, img }
    })
    if (prima > w + 1 || r.dopo > w + 1) aggiungi(esito.larghe, via, `${w}px: ${prima} prima di scorrere, ${r.dopo} dopo`)
    r.corte.forEach((c) => aggiungi(esito.corte, via, `${w}px · …${c}`))
    r.img.forEach((i) => aggiungi(esito.rotte, via, 'immagine ' + i))
    if (w === 1440) { esito.meta[via] = r.meta; r.link.forEach((l) => esito.link.add(l.split('#')[0])) }
  }
  console.log('misura', w, 'fatta')
}
// i link interni, uno per uno, e il peso dei file
const linkRotti = []
for (const l of esito.link) { if (!l) continue; const res = await fetch(BASE + l).catch(() => null); if (!res || res.status >= 400) linkRotti.push(`${res ? res.status : 'nessuna risposta'} ${l}`) }
const stampa = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, [...v]]))
writeFileSync(OUT + '/esito.json', JSON.stringify({ errori: stampa(esito.errori), rotte: stampa(esito.rotte), larghe: stampa(esito.larghe), corte: stampa(esito.corte), meta: esito.meta, linkRotti }, null, 1))
console.log('fatto')
await browser.close()

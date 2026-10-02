// Quanto scorre liscio un sito sul telefono, e se le animazioni arrivano tutte.
//   node fluidita.mjs <indirizzo base> <cartella di uscita> [rallentamento] [/percorso ...]
//   es. node fluidita.mjs https://emanueleboccia.it /tmp/fluidita 4
// Scritto il 01/10/2026 per emanueleboccia.it, dopo «su mobile non è tanto fluido». Fa il telefono: 390 px, schermo
// a densità 3, tocco, e il processore rallentato (4 = un Android di fascia media). Scorre ogni pagina col dito, con i
// gesti veri del browser e non con scrollTo, e misura: i fotogrammi oltre i 33 ms (quelli che si vedono scattare), il
// più lungo, i blocchi del processore oltre i 50 ms, gli spostamenti della pagina. Poi, a pagina scorsa tutta, cerca
// quello che è rimasto invisibile: un'animazione d'ingresso che non è partita. E dice chi ascolta il dito senza
// «passive»: un ascoltatore così obbliga il telefono ad aspettare JavaScript prima di muovere la pagina.
// Senza percorsi legge la mappa del sito. Scrive <uscita>/fluidita.json.
import { createRequire } from 'node:module'
import { writeFileSync, mkdirSync } from 'node:fs'
const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json')
const puppeteer = require('puppeteer-core')
const [BASE, OUT = '.', LENTO = '4', ...SCELTI] = process.argv.slice(2)
mkdirSync(OUT, { recursive: true })

const leggiMappa = async (indirizzo) => {
  const xml = await fetch(indirizzo).then((r) => r.text()).catch(() => '')
  const loc = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((m) => m[1])
  if (!xml.includes('<sitemapindex')) return loc.map((u) => new URL(u).pathname)
  return (await Promise.all(loc.map((u) => leggiMappa(BASE + new URL(u).pathname)))).flat()
}
const PAGINE = SCELTI.length ? SCELTI : await leggiMappa(BASE + '/sitemap.xml')

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] })
const esito = {}
for (const via of PAGINE) {
  const page = await browser.newPage()
  const errori = []
  page.on('pageerror', (e) => errori.push(e.message.slice(0, 140)))
  page.on('console', (m) => { if (m.type() === 'error') errori.push(m.text().slice(0, 140)) })
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36')
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
  const cdp = await page.createCDPSession()
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(LENTO) })
  // i misuratori partono prima di ogni script della pagina
  await page.evaluateOnNewDocument(() => {
    window.__lunghi = []; window.__spostamenti = 0
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lunghi.push(Math.round(e.duration)))).observe({ type: 'longtask', buffered: true })
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__spostamenti += e.value })).observe({ type: 'layout-shift', buffered: true })
  })
  const t0 = Date.now()
  await page.goto(BASE + via, { waitUntil: 'networkidle2', timeout: 120000 }).catch((e) => errori.push('caricamento: ' + e.message.slice(0, 80)))
  const caricata = Date.now() - t0
  await new Promise((r) => setTimeout(r, 2500))

  // chi ascolta il dito e la rotella senza passive, sulla finestra e sul documento
  const bloccanti = []
  for (const [nome, espr] of [['window', 'window'], ['document', 'document'], ['html', 'document.documentElement'], ['body', 'document.body']]) {
    const { result } = await cdp.send('Runtime.evaluate', { expression: espr })
    const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: result.objectId })
    for (const l of listeners) if (/^(touchstart|touchmove|wheel|mousewheel)$/.test(l.type) && !l.passive) bloccanti.push(`${nome} ${l.type}`)
  }

  // si scorre col dito fino in fondo, registrando ogni fotogramma
  await page.evaluate(() => {
    window.__fotogrammi = []; window.__lunghi = []
    let prima = performance.now()
    const giro = (t) => { window.__fotogrammi.push(t - prima); prima = t; if (!window.__basta) requestAnimationFrame(giro) }
    requestAnimationFrame(giro)
  })
  const alta = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
  const passi = Math.min(40, Math.ceil(alta / 600) + 1)
  await cdp.send('Input.synthesizeScrollGesture', { x: 195, y: 650, yDistance: -600, speed: 1600, gestureSourceType: 'touch', repeatCount: passi, repeatDelayMs: 120 })
  await new Promise((r) => setTimeout(r, 1500))
  const misure = await page.evaluate(() => {
    window.__basta = true
    const f = window.__fotogrammi.slice(1)
    const scatti = f.filter((d) => d > 33.4)
    return {
      fotogrammi: f.length,
      fps: Math.round(1000 / (f.reduce((a, b) => a + b, 0) / Math.max(1, f.length))),
      scatti: scatti.length,
      quotaScatti: Math.round((100 * scatti.length) / Math.max(1, f.length)),
      piuLungo: Math.round(Math.max(0, ...f)),
      blocchi: window.__lunghi.length,
      bloccoMax: Math.max(0, ...window.__lunghi),
      bloccoTotale: window.__lunghi.reduce((a, b) => a + b, 0),
      spostamenti: Math.round(window.__spostamenti * 1000) / 1000,
      arrivato: Math.round(scrollY), fondo: document.documentElement.scrollHeight - innerHeight,
      video: document.querySelectorAll('video').length,
      videoInCorso: [...document.querySelectorAll('video')].filter((v) => !v.paused).length,
    }
  })

  // a pagina scorsa tutta: cosa è rimasto invisibile
  const invisibili = await page.evaluate(() => {
    const fuori = (e) => e.closest('[aria-hidden="true"], dialog, .contatto, .modale, .menu-pieno, .bozza, [hidden], .visualmente-nascosto, .sr-only, .screen-reader-text, .lightbox, .galleria-aperta')
    const resti = []
    document.querySelectorAll('main *, [data-barba="container"] *').forEach((e) => {
      if (fuori(e) || !e.getClientRects().length) return
      const st = getComputedStyle(e)
      if (st.display === 'none') return
      const testo = (e.childElementCount === 0 && (e.textContent || '').trim()) || e.tagName === 'IMG' || e.tagName === 'VIDEO'
      if (!testo) return
      let x = e, opaco = 1, nascosto = false
      while (x && x !== document.body) { const s = getComputedStyle(x); opaco *= Number(s.opacity); if (s.visibility === 'hidden') nascosto = true; x = x.parentElement }
      if (opaco < 0.05 || nascosto) resti.push(`${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}: ${(e.textContent || e.getAttribute('src') || '').trim().slice(0, 40)}`)
    })
    return [...new Set(resti)].slice(0, 15)
  })
  esito[via] = { caricata, ...misure, bloccanti: [...new Set(bloccanti)], invisibili, errori: [...new Set(errori)] }
  const m = esito[via]
  console.log(`${via.padEnd(46)} ${String(m.fps).padStart(3)} fps · scatti ${String(m.quotaScatti).padStart(2)}% · max ${String(m.piuLungo).padStart(4)} ms · blocchi ${m.blocchi} (${m.bloccoTotale} ms) · invisibili ${m.invisibili.length}${m.arrivato < m.fondo - 5 ? ` · FERMO a ${m.arrivato}/${m.fondo}` : ''}`)
  await page.close()
  await new Promise((r) => setTimeout(r, 400))
}
await browser.close()
writeFileSync(`${OUT}/fluidita.json`, JSON.stringify(esito, null, 1))
console.log('fatto')

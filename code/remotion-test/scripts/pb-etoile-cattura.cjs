// Le schermate vere del prima del sito di L'Étoile (etoilepoggiomarino.com), fatte il 02/10/2026 prima che si
// cominci a rifarlo: quando il sito nuovo va online il prima non si può più rifare. Servono ai reel futuri,
// come quelle di Room84 in pb-room84-cattura.cjs, da cui viene tutto il metodo: banner dei cookie rifiutato,
// pagina scorsa tutta perché le immagini pigre arrivino, barre fisse rimesse al loro posto o tolte.
//
// Le pagine sono quelle che fanno vedere i problemi del sito vecchio, scritti nello storico del cliente:
// la home col banner di San Valentino, Pelletteria con le borse esaurite in testa, Profumeria senza profumi,
// Viaggio con venti valigie, una borsa Armani Exchange col nome uguale ad altre venti, la ricerca che le mette
// in fila, e uno zaino Piquadro che dal menu non si raggiunge. Più il menu aperto sul telefono, con «Chi siamo»
// che non porta da nessuna parte.
//
// Scrive public/pb-etoile/siti/prima-<pagina>-<m|d>.png e prima-menu-m.png, e stampa le altezze.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const OUT = __dirname + '/../public/pb-etoile/siti'
const SITO = 'https://etoilepoggiomarino.com'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15'

const PAGINE = [
  ['home', '/'],
  ['pelletteria', '/collections/borse'],
  ['profumeria', '/collections/profumi'],
  ['viaggio', '/collections/viaggio'],
  ['borsa-armani', '/products/armani-exchange-borsa-a-spalla-29'],
  ['ricerca-armani', '/search?q=Armani+Exchange+Borsa+a+spalla&type=product'],
  ['zaino-piquadro', '/products/piquadro-w129-zaino-p-pc-avio']
]

async function viaBanner (page) {
  for (let i = 0; i < 5; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari|reject( all)?)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(700)
  }
  await attendi(700)
}
async function sveglia (page) {
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(160) }
  await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
  await attendi(1500)
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000) }))))
}
async function sistemaFissi (page) {
  return page.evaluate(() => {
    const fatti = []
    document.querySelectorAll('body *').forEach((e) => {
      const s = getComputedStyle(e)
      if (s.position !== 'fixed' && s.position !== 'sticky') return
      const r = e.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      if (s.position === 'sticky') { e.style.setProperty('position', 'static', 'important'); fatti.push('sticky→static'); return }
      if (r.top < 140 && r.height < 220) { e.style.setProperty('position', 'absolute', 'important'); e.style.setProperty('top', (r.top + scrollY) + 'px', 'important'); fatti.push('in cima') } else { e.style.setProperty('display', 'none', 'important'); fatti.push('via') }
    })
    return fatti
  })
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
  const page = await browser.newPage()
  // il telefono a 3x e il computer a 1,5x, come Room84; Chrome non fotografa oltre 16384 pixel veri
  const viste = [
    ['m', { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, IPHONE, 5400],
    ['d', { width: 1440, height: 900, deviceScaleFactor: 1.5 }, MAC, 10900]
  ]
  for (const [nome, percorso] of PAGINE) {
    for (const [v, vista, ua, tetto] of viste) {
      await page.setViewport(vista)
      await page.setUserAgent(ua)
      await page.goto(SITO + percorso, { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(4000)
      await viaBanner(page); await sveglia(page)
      await sistemaFissi(page); await attendi(800)
      const alt = await page.evaluate(() => document.documentElement.scrollHeight)
      const file = `${OUT}/prima-${nome}-${v}.png`
      await page.screenshot({ path: file, fullPage: alt <= tetto, ...(alt > tetto ? { clip: { x: 0, y: 0, width: vista.width, height: tetto }, captureBeyondViewport: true } : {}) })
      console.log(`prima-${nome}-${v}`, 'altezza', alt, alt > tetto ? `(tagliata a ${tetto})` : '')
      await attendi(1500)
    }
  }
  // il menu aperto sul telefono, solo la vista: «Chi siamo» c'è, ma non porta da nessuna parte
  const [, vista, ua] = viste[0]
  await page.setViewport(vista); await page.setUserAgent(ua)
  await page.goto(SITO + '/', { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(4000)
  await viaBanner(page)
  const aperto = await page.evaluate(() => {
    const b = document.querySelector('.t4s-push-menu-btn, [data-drawer-options*="menu-drawer"], [data-id="#t4s-menu-drawer"], a[href="#t4s-menu-drawer"]')
    if (b) { b.click(); return true }
    return false
  })
  await attendi(1500)
  await page.screenshot({ path: `${OUT}/prima-menu-m.png` })
  console.log('prima-menu-m', aperto ? 'menu aperto' : 'menu NON trovato')
  await browser.close()
})()

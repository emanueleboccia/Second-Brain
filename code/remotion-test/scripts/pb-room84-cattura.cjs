// Le schermate vere del prima e del dopo per il reel di Room84 (29/09/2026): il sito del 2025 online
// e quello nuovo dalla copia locale (~/Desktop/progetti/room84, servito da servi.mjs su 127.0.0.1:8084).
// Stesso telefono per tutti e due, a pagina intera: nel reel la pagina scorre dentro un telefono sul
// fondale, come le anteprime dei lavori di code/mockup-lavori, e non si registra lo schermo.
//
// Come nei mockup: il banner dei cookie si rifiuta, si scorre tutta la pagina perché immagini pigre e
// animazioni d'ingresso arrivino, e quello che è fisso si rimette al suo posto, la testata in cima e il
// resto via. Scrive public/pb-room84/siti/<prima|dopo>-m.png e stampa le altezze e dove cadono le sezioni.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const OUT = __dirname + '/../public/pb-room84/siti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
const VIMEO_COPERTINA = 'https://i.vimeocdn.com/video/2008855937-bf33c820ce3b7efb0826a52d36473c3d04161a985efc382465d865c8f9b968da-d_1280?region=us'
const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Safari/605.1.15'

async function viaBanner (page) {
  for (let i = 0; i < 5; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari|reject( all)?)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(700)
  }
  await attendi(700)
  await page.evaluate(() => document.querySelectorAll('.cmplz-cookiebanner, #cmplz-cookiebanner-container, .cmplz-overlay, [id*="iubenda"], [class*="cookie-banner"], [class*="cookiebanner"], #cookie-notice, .cky-consent-container').forEach((e) => e.remove()))
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
      if (s.position === 'sticky') { e.style.setProperty('position', 'static', 'important'); fatti.push('sticky→static ' + e.className.toString().slice(0, 30)); return }
      if (r.top < 140 && r.height < 220) { e.style.setProperty('position', 'absolute', 'important'); e.style.setProperty('top', (r.top + scrollY) + 'px', 'important'); fatti.push('in cima ' + e.className.toString().slice(0, 30)) } else { e.style.setProperty('display', 'none', 'important'); fatti.push('via ' + e.className.toString().slice(0, 30)) }
    })
    return fatti
  })
}
// dove cominciano i titoli, per sapere su cosa fermare lo scorrimento
const sezioni = (page) => page.evaluate(() => [...document.querySelectorAll('h1, h2')].map((h) => ({ y: Math.round(h.getBoundingClientRect().top + scrollY), t: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50) })).filter((s) => s.t))

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  const esito = {}
  // il telefono a 3x, e il computer a 1,5x: nel reel la finestra del computer è larga circa 1000 pixel
  const giri = []
  // Dal 30/09/2026 su www.room84.it c'è il sito nuovo: il prima resta la schermata del 29/09, e si rifà solo il dopo.
  // Con «prima» come argomento si rifarebbe anche quello, ma servirebbe il sito del 2025 da qualche parte.
  const pagine = [['dopo', 'http://127.0.0.1:8084/']]
  if (process.argv.includes('prima')) pagine.unshift(['prima', 'https://www.room84.it/'])
  for (const [nome, url] of pagine) {
    giri.push([nome + '-m', url, { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, IPHONE, 5400])
    giri.push([nome + '-d', url, { width: 1440, height: 900, deviceScaleFactor: 1.5 }, MAC, 10900])
  }
  for (const [nome, url, vista, ua, tetto] of giri) {
    await page.setViewport(vista)
    // Con l'identità di Chrome senza finestra, il video Vimeo della home vecchia risponde «We couldn't
    // verify the security of your connection»: un visitatore vero non lo vede, e nel prima non ci va.
    await page.setUserAgent(ua)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(6000)
    await viaBanner(page); await sveglia(page)
    // i video partono e vanno avanti di qualche secondo, così non si fotografa il primo fotogramma nero
    await page.evaluate(() => Promise.all([...document.querySelectorAll('video')].map((v) => { v.muted = true; return Promise.race([v.play().catch(() => {}), new Promise((r) => setTimeout(r, 3000))]) })))
    await attendi(4000)
    // Il video Vimeo della testata vecchia a Chrome senza finestra risponde «We couldn't verify the security of
    // your connection», anche con l'identità di Safari: un visitatore vero vede il video. Al suo posto va il
    // fotogramma di copertina dello stesso video, preso dall'oEmbed pubblico di Vimeo.
    if (url.includes('room84.it')) {
      await page.evaluate((copertina) => {
        document.querySelectorAll('.elementor-background-video-container').forEach((c) => {
          c.style.backgroundImage = `url(${copertina})`; c.style.backgroundSize = 'cover'; c.style.backgroundPosition = 'center'
          c.querySelectorAll('iframe').forEach((f) => { f.style.visibility = 'hidden' })
        })
      }, VIMEO_COPERTINA)
      await attendi(2500)
    }
    const fissi = await sistemaFissi(page); await attendi(800)
    const alt = await page.evaluate(() => document.documentElement.scrollHeight)
    // Chrome non fotografa oltre 16384 pixel veri: a 3x, sopra i 5400 punti la pagina ricomincia da capo
    await page.screenshot({ path: `${OUT}/${nome}.png`, fullPage: alt <= tetto, ...(alt > tetto ? { clip: { x: 0, y: 0, width: vista.width, height: tetto }, captureBeyondViewport: true } : {}) })
    // dove sta il video della testata, per rimetterci sopra quello vero nel reel
    const video = await page.evaluate(() => { const v = document.querySelector('video'); if (!v) return null; const r = v.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height), src: v.currentSrc } })
    esito[nome] = { alt, fissi, video, sezioni: await sezioni(page) }
    // La testata del sito nuovo è un video: si fotografa anche senza il video e con lo sfondo trasparente, così
    // nel reel sotto si mette il video vero e sopra restano il velo scuro, il titolo e i bottoni.
    if (video && nome.startsWith('dopo')) {
      await page.evaluate(() => {
        const v = document.querySelector('video'); v.style.visibility = 'hidden'
        let a = v.parentElement
        while (a) { a.style.setProperty('background-color', 'transparent', 'important'); a.style.setProperty('background-image', 'none', 'important'); a = a.parentElement }
        window.scrollTo(0, 0)
      })
      await attendi(600)
      await page.screenshot({ path: `${OUT}/${nome}-testata.png`, omitBackground: true, clip: { x: 0, y: 0, width: vista.width, height: video.y + video.h } })
    }
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

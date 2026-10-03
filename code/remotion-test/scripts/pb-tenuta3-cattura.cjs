// Le schermate del sito di Tenuta Don Gaetano per la v3 del reel (03/10/2026), dal metodo della v2 (30/09/2026 notte): la pagina
// intera da telefono, com'è su tenutadongaetano.it, e il logo preso dalla testata. È lo stesso modo del reel di Room84
// (scripts/pb-room84-cattura.cjs, da cui vengono le funzioni): il banner dei cookie si rifiuta, si scorre la pagina
// perché immagini pigre e animazioni arrivino, e quello che è fisso si rimette al suo posto. Un file di logo sul Mac
// non c'è: lo si fotografa dalla testata, ingrandito.
//
// Scrive public/pb-tenuta/pezzo-<n>.png, che si cuciono in sito-m.png e .jpg, e stampa dove cadono titoli e bottoni.
// Il logo grande, public/pb-tenuta/logo.png, si fa a parte a 12x, dall'immagine della testata.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const OUT = __dirname + '/../public/pb-tenuta-3'
const URL = 'https://tenutadongaetano.it/'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'

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
  for (let y = 0; y < alt; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(180) }
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


// La v3 vuole anche il computer, per la trasformazione nei mockup, e dove stanno le sezioni e i bottoni di WhatsApp,
// e il messaggio che il bottone prepara. Telefono a 3x come prima, computer a 1440 per 1,5x.
async function intera (page, nome) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  const vw = page.viewport().width, k = page.viewport().deviceScaleFactor
  const pezzo = Math.floor(9000 / k), file = []
  for (let y = 0, i = 0; y < h; y += pezzo, i++) {
    const f = `${OUT}/_${nome}-${i}.png`
    await page.screenshot({ path: f, clip: { x: 0, y, width: vw, height: Math.min(pezzo, h - y) }, captureBeyondViewport: true })
    file.push(f)
  }
  require('child_process').execFileSync('python3', [__dirname + '/cuci-pezzi.py', `${OUT}/${nome}.jpg`, ...file], { stdio: 'inherit' })
}
async function misura (page) {
  return page.evaluate(() => {
    const sez = {}
    ;['dimora', 'eventi', 'gallery', 'perche', 'contatti'].forEach((id) => { const e = document.getElementById(id); if (e) sez[id] = Math.round(e.getBoundingClientRect().top + scrollY) })
    const wa = [...document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')].map((a) => ({ y: Math.round(a.getBoundingClientRect().top + scrollY), x: Math.round(a.getBoundingClientRect().left), w: Math.round(a.getBoundingClientRect().width), h: Math.round(a.getBoundingClientRect().height), t: a.textContent.trim().slice(0, 40), href: a.href }))
    const titoli = [...document.querySelectorAll('h1, h2')].map((h) => [Math.round(h.getBoundingClientRect().top + scrollY), h.textContent.replace(/\s+/g, ' ').trim().slice(0, 50)])
    const img = [...document.querySelectorAll('section img')].map((i) => [Math.round(i.getBoundingClientRect().top + scrollY), Math.round(i.getBoundingClientRect().height), (i.getAttribute('src') || '').split('/').pop().slice(0, 40), i.closest('section')?.id || ''])
    return { sez, wa, titoli, img, alto: document.documentElement.scrollHeight }
  })
}
;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  for (const [nome, vp, ua] of [['sito-m', { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }, IPHONE], ['sito-d', { width: 1440, height: 900, deviceScaleFactor: 1.5 }, null]]) {
    const page = await browser.newPage()
    await page.setViewport(vp)
    if (ua) await page.setUserAgent(ua)
    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(4000)
    await viaBanner(page); await sveglia(page)
    await page.evaluate(() => Promise.all([...document.querySelectorAll('video')].map((v) => { v.muted = true; return Promise.race([v.play().catch(() => {}), new Promise((r) => setTimeout(r, 3000))]) })))
    await attendi(2500)
    // la prima schermata com'è, prima di toccare i fissi
    await page.evaluate(() => window.scrollTo(0, 0)); await attendi(800)
    await page.screenshot({ path: `${OUT}/${nome}-apertura.png` })
    await sistemaFissi(page)
    await page.evaluate(() => window.scrollTo(0, 0)); await attendi(800)
    console.log(nome, JSON.stringify(await misura(page)))
    await intera(page, nome)
    await page.close()
  }
  await browser.close()
})()

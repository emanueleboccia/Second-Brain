// Le schermate vere del sito di Tenuta Don Gaetano per il reel del personal brand (30/09/2026 notte): la pagina
// intera da telefono, com'è su tenutadongaetano.it, e il logo preso dalla testata. È lo stesso modo del reel di Room84
// (scripts/pb-room84-cattura.cjs, da cui vengono le funzioni): il banner dei cookie si rifiuta, si scorre la pagina
// perché immagini pigre e animazioni arrivino, e quello che è fisso si rimette al suo posto. Un file di logo sul Mac
// non c'è: lo si fotografa dalla testata, ingrandito.
//
// Scrive public/pb-tenuta/pezzo-<n>.png, che si cuciono in sito-m.png e .jpg, e stampa dove cadono titoli e bottoni.
// Il logo grande, public/pb-tenuta/logo.png, si fa a parte a 12x, dall'immagine della testata.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const OUT = __dirname + '/../public/pb-tenuta'
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

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
  await page.setUserAgent(IPHONE)
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(5000)
  await viaBanner(page); await sveglia(page)
  await page.evaluate(() => Promise.all([...document.querySelectorAll('video')].map((v) => { v.muted = true; return Promise.race([v.play().catch(() => {}), new Promise((r) => setTimeout(r, 3000))]) })))
  await attendi(3000)

  // il logo della testata, prima di toccare i fissi: il più grande fra le immagini e gli svg in cima con «logo» nel nome
  const logo = await page.evaluate(() => {
    const c = [...document.querySelectorAll('img, svg')].map((e) => ({ e, r: e.getBoundingClientRect(), n: ((e.getAttribute('class') || '') + ' ' + (e.getAttribute('alt') || '') + ' ' + (e.getAttribute('src') || '') + ' ' + (e.closest('a, div')?.className || '')).toLowerCase() }))
      .filter((x) => x.r.top < 200 && x.r.width > 30 && /logo|brand|custom-logo/.test(x.n))
      .sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)
    if (!c.length) return null
    c[0].e.setAttribute('data-logo-cattura', '1')
    return { w: Math.round(c[0].r.width), h: Math.round(c[0].r.height), n: c[0].n.slice(0, 80) }
  })
  console.log('logo', JSON.stringify(logo))
  if (logo) {
    const el = await page.$('[data-logo-cattura]')
    // il logo grande si fa a parte, a 12x: qui si fotografa solo per sapere che c'è
    if (!fs.existsSync(OUT + '/logo.png')) await el.screenshot({ path: OUT + '/logo.png', omitBackground: true })
  }

  console.log('fissi', JSON.stringify(await sistemaFissi(page)))
  // gli sfondi fissi della testata, nella schermata a pagina intera, si ripetono a ogni altezza di schermo: si
  // rimettono a scorrere con la pagina, come li vede chi scorre dal telefono
  await page.evaluate(() => document.querySelectorAll('body *').forEach((e) => { if (getComputedStyle(e).backgroundAttachment === 'fixed') e.style.setProperty('background-attachment', 'scroll', 'important') }))
  await attendi(800)
  const punti = await page.evaluate(() => ({
    alto: document.documentElement.scrollHeight,
    titoli: [...document.querySelectorAll('h1, h2, h3')].map((h) => ({ y: Math.round(h.getBoundingClientRect().top + scrollY), t: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60) })).filter((s) => s.t),
    bottoni: [...document.querySelectorAll('a, button')].filter((a) => /whatsapp|disponibilit|contatt|wa\.me/i.test((a.textContent || '') + (a.getAttribute('href') || ''))).map((a) => ({ y: Math.round(a.getBoundingClientRect().top + scrollY), t: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40), h: (a.getAttribute('href') || '').slice(0, 40) })),
  }))
  console.log('punti', JSON.stringify(punti))
  // A 3x la pagina è alta più di 33.000 pixel, oltre il limite di una schermata sola di Chrome (16.384): con fullPage
  // la pagina si ripeteva a metà. Si fotografa a pezzi da 5.000 punti e si cuce con PIL.
  const alto = punti.alto
  const pezzi = []
  for (let y = 0; y < alto; y += 5000) {
    const f = OUT + `/pezzo-${pezzi.length}.png`
    await page.screenshot({ path: f, clip: { x: 0, y, width: 390, height: Math.min(5000, alto - y) }, captureBeyondViewport: true })
    pezzi.push(f)
  }
  console.log('pezzi', JSON.stringify(pezzi))
  await browser.close()
})()

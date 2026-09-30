// Le sezioni del sito nuovo di Room84, una schermata del telefono per ognuna, nello stesso ordine dei blocchi
// del foglio che Emanuele ha disegnato il 29/09/2026: testata, booking, chi siamo, camere, esperienza,
// recensioni, gallery, dintorni. Nel reel ogni blocco del foglio si accende e il telefono accanto va alla sua
// sezione: «lo costruisco come l'ho disegnato, pezzo per pezzo».
//
// Qui la pagina resta com'è sul telefono, con la testata e il bottone di WhatsApp: sono schermate, non una
// pagina intera. Serve servi.mjs acceso su 127.0.0.1:8084. Scrive public/pb-room84/siti/sez-<nome>.png.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/../public/pb-room84/siti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'

// nome, come trovarla (un titolo o un testo), quanto sopra fermarsi
const SEZIONI = [
  ['testata', null, 0],
  ['booking', 'Verifica disponibilità', 520],
  ['chisiamo', 'Due camere, due numeri', 170],
  ['camere', 'Scegli la tua chiave', 170],
  ['esperienza', "Com'è una notte a Room84", 170],
  ['recensioni', 'Pulizia, comfort e qualità-prezzo', 170],
  ['gallery', 'Guarda dentro', 170],
  ['dintorni', 'Tra il Vesuvio e Pompei', 170],
]

;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true })
  await page.setUserAgent(IPHONE)
  await page.goto('http://127.0.0.1:8084/', { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(3000)
  // si scorre tutta la pagina, così le animazioni d'ingresso sono già entrate e le immagini ci sono
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(160) }
  await page.evaluate(() => Promise.all([...document.querySelectorAll('video')].map((v) => { v.muted = true; return Promise.race([v.play().catch(() => {}), new Promise((r) => setTimeout(r, 3000))]) })))
  const esito = {}
  for (const [nome, testo, sopra] of SEZIONI) {
    const y = testo === null ? 0 : await page.evaluate((testo, sopra) => {
      const el = [...document.querySelectorAll('h1, h2, h3, button, a, span, p')].find((e) => e.textContent.replace(/\s+/g, ' ').trim().toLowerCase().startsWith(testo.toLowerCase()) && e.getBoundingClientRect().height > 0)
      return el ? Math.max(0, Math.round(el.getBoundingClientRect().top + scrollY - sopra)) : -1
    }, testo, sopra)
    if (y < 0) { esito[nome] = 'non trovata'; continue }
    await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(1400)
    await page.screenshot({ path: `${OUT}/sez-${nome}.png` })
    esito[nome] = y
  }
  console.log(JSON.stringify(esito))
  await browser.close()
})()

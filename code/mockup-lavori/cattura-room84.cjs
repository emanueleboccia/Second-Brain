// Il sito nuovo di Room84, dalla copia sul Mac (porta 8084), a pagina intera. Il sito è pieno di
// animazioni e di sezioni che restano ferme mentre si scorre: si fotografa col movimento ridotto,
// che lo mostra fermo e completo. Le recensioni, che portano i nomi degli ospiti, restano fuori.
// Il telefono si fotografa a una volta e un quarto: la home è alta 11.800 punti, e sopra i 16.000
// Chrome ricomincia a disegnare la pagina da capo.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const PAGINE = [['room84', '/'], ['room84-camere', '/camere/'], ['room84-gallery', '/gallery/'], ['room84-dintorni', '/dintorni/'], ['room84-chi-siamo', '/chi-siamo/'], ['room84-contatti', '/contatti/']]
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const esito = {}
  for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 1.25, isMobile: true, hasTouch: true }]]) {
    for (const [nome, percorso] of PAGINE) {
      const page = await browser.newPage()
      await page.setViewport(vp)
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
      await page.goto('http://127.0.0.1:8084' + percorso, { waitUntil: 'networkidle2', timeout: 60000 })
      await attendi(1800)
      const alt0 = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y < alt0; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(120) }
      await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
      await attendi(1200)
      const tolte = await page.evaluate(() => {
        const fuori = []
        // i bottoni che galleggiano: in una pagina intera restano appesi alla prima schermata
        document.querySelectorAll('.wa-fisso, .su').forEach((e) => e.style.setProperty('display', 'none', 'important'))
        // nel piede c'è il codice fiscale di chi ha intestata l'attività: è un dato di una persona, e in un
        // mockup non serve. Si toglie la riga, insieme al codice della struttura
        document.querySelectorAll('footer *').forEach((e) => { if (!e.children.length && /C\.F\.|CIN\s*IT|[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]/.test(e.textContent)) { fuori.push('piede: ' + e.textContent.trim().slice(0, 24) + '…'); e.style.setProperty('visibility', 'hidden', 'important') } })
        // le sezioni con le parole e i nomi degli ospiti
        document.querySelectorAll('section, [class*="recension"], [id*="recension"]').forEach((s) => {
          const t = (s.querySelector('h2, h3')?.textContent || '') + ' ' + (s.id || '') + ' ' + s.className
          if (/recension|ospiti dicono|dicono di noi|booking\.com/i.test(t) && s.tagName === 'SECTION') { fuori.push(t.replace(/\s+/g, ' ').trim().slice(0, 60)); s.style.setProperty('display', 'none', 'important') }
        })
        return fuori
      })
      const info = await page.evaluate(() => ({
        alto: document.documentElement.scrollHeight,
        sezioni: [...document.querySelectorAll('main > *, body > section, main section')].filter((s) => s.getBoundingClientRect().height > 40).slice(0, 30).map((s) => Math.round(s.getBoundingClientRect().top + scrollY) + ' ' + Math.round(s.getBoundingClientRect().height) + ' ' + (s.id || String(s.className).slice(0, 30)) + ' «' + (s.querySelector('h1, h2')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50) + '»'),
        fissi: [...document.querySelectorAll('body *')].filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().height > 0).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40) + ' ' + getComputedStyle(e).position + ' ' + Math.round(e.getBoundingClientRect().height)).slice(0, 8)
      }))
      esito[nome + '-' + tipo] = { ...info, tolte }
      await page.screenshot({ path: `${OUT}/${nome}-${tipo}.png`, fullPage: true })
      await page.close()
    }
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

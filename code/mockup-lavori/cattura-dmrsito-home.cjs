// La home del sito di Da Mamma Rosaria, rifatta il 29/09/2026 senza due sezioni: quella che nomina la
// famiglia e quella con le recensioni firmate. Nel sito del personal brand la famiglia non si racconta,
// e i nomi di chi ha lasciato una recensione non servono a far vedere un sito.
// Il telefono si fotografa a una volta e mezza, così in 12.000 punti ci sta tutta la pagina.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const FUORI = [/Una famiglia prima che una location/i, /Le vostre esperienze/i]

async function pulisci (page) {
  for (let i = 0; i < 5; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari|reject( all)?)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(700)
  }
  await attendi(700)
  await page.evaluate(() => {
    document.querySelectorAll('.cmplz-cookiebanner, #cmplz-cookiebanner-container, .cmplz-overlay, [id*="iubenda"], [class*="cookie-banner"], [class*="cookiebanner"]').forEach((e) => e.remove())
    document.querySelectorAll('body *').forEach((e) => { const s = getComputedStyle(e); if (s.position !== 'fixed') return; const r = e.getBoundingClientRect(); if (r.width < 140 && r.height < 140 && r.top > innerHeight * .5) e.style.setProperty('display', 'none', 'important') })
  })
}
async function sveglia (page) {
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(140) }
  await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
  await attendi(1200)
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000) }))))
}
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true }]]) {
    await page.setViewport(vp)
    await page.goto('https://www.damammarosaria.it/', { waitUntil: 'networkidle2', timeout: 60000 }); await attendi(2500)
    await pulisci(page)
    const tolte = await page.evaluate((fuori) => {
      const esito = []
      for (const f of fuori) {
        const re = new RegExp(f.source, f.flags)
        const h = [...document.querySelectorAll('main h2')].find((e) => re.test(e.textContent.replace(/\s+/g, ' ')))
        const s = h && h.closest('section')
        if (s) { esito.push(h.textContent.replace(/\s+/g, ' ').trim() + ' · ' + Math.round(s.getBoundingClientRect().height)); s.style.setProperty('display', 'none', 'important') }
      }
      return esito
    }, FUORI.map((r) => ({ source: r.source, flags: r.flags })))
    if (tolte.length !== FUORI.length) { console.log('FERMO: non ho trovato tutte e due le sezioni', tolte); process.exit(1) }
    await sveglia(page)
    // la prova: nel testo della pagina i nomi non ci devono più essere
    const resto = await page.evaluate(() => { const t = document.querySelector('main').innerText; return { nomi: /Raffaele|Domenico/.test(t), recensioni: /Cristel|De Simone|Balzano/.test(t) } })
    if (resto.nomi || resto.recensioni) { console.log('FERMO: i nomi si leggono ancora', resto); process.exit(1) }
    const sezioni = await page.evaluate(() => [...document.querySelectorAll('main > *')].filter((s) => s.getBoundingClientRect().height > 0).map((s) => Math.round(s.getBoundingClientRect().top + scrollY) + ' ' + Math.round(s.getBoundingClientRect().height) + ' «' + (s.querySelector('h1,h2')?.textContent || s.className).replace(/\s+/g, ' ').trim().slice(0, 40) + '»'))
    const alt = await page.evaluate(() => document.documentElement.scrollHeight)
    await page.screenshot({ path: `${OUT}/dmrsito-${tipo}.png`, fullPage: true })
    console.log(tipo, 'alta', alt, 'tolte', JSON.stringify(tolte)); console.log(sezioni.join('\n'))
  }
  await browser.close()
})()

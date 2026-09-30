// Le schermate vere dei siti, a pagina intera, da cui nascono i mockup.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))

async function pulisci (page) {
  // il banner dei cookie: si rifiuta, e quello che resta fisso e piccolo si nasconde
  for (let i = 0; i < 5; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari|reject( all)?)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(700)
  }
  await attendi(700)
  await page.evaluate(() => {
    document.querySelectorAll('.cmplz-cookiebanner, #cmplz-cookiebanner-container, .cmplz-overlay, [id*="iubenda"], [class*="cookie-banner"], [class*="cookiebanner"]').forEach((e) => e.remove())
    // i bottoni che galleggiano, WhatsApp e simili: in una pagina intera finirebbero a metà foglio
    document.querySelectorAll('body *').forEach((e) => { const s = getComputedStyle(e); if (s.position !== 'fixed') return; const r = e.getBoundingClientRect(); if (r.width < 140 && r.height < 140 && r.top > innerHeight * .5) e.style.setProperty('display', 'none', 'important') })
  })
}
async function sveglia (page) {
  // si scorre tutta la pagina a passi, così le immagini pigre si caricano e le sezioni che entrano allo scroll sono entrate
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(140) }
  await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
  await attendi(1200)
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000) }))))
}
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  const esito = {}
  const siti = [['masseria', 'https://lamasseriadimezzautunno.it/'], ['tenuta', 'https://tenutadongaetano.it/'], ['girarrosto', 'https://libertigirarrosto.it/']]
  for (const [nome, url] of siti) {
    for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
      try {
        await page.setViewport(vp)
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); await attendi(2500)
        await pulisci(page)
        // il sito del Girarrosto scorre dentro un contenitore: lo si apre, così la pagina intera è davvero intera
        const dentro = await page.evaluate(() => { const c = [...document.querySelectorAll('*')].find((el) => { const cs = getComputedStyle(el); return /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 200 && el.clientHeight > 300 && el !== document.documentElement && el !== document.body }); if (!c) return null; return { cls: c.className.toString().slice(0, 40), alt: c.scrollHeight, largo: Math.round(c.getBoundingClientRect().width), x: Math.round(c.getBoundingClientRect().left) } })
        await sveglia(page)
        const info = await page.evaluate(() => ({ titolo: document.title, alt: document.documentElement.scrollHeight, link: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin) && !h.includes('#') && h !== location.href))].slice(0, 25), colori: (() => { const c = {}; document.querySelectorAll('body, header, footer, section, a, button, h1, h2').forEach((e) => { const s = getComputedStyle(e); [s.backgroundColor, s.color].forEach((v) => { if (v && v !== 'rgba(0, 0, 0, 0)') c[v] = (c[v] || 0) + 1 }) }); return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8) })(), font: [...new Set([...document.querySelectorAll('h1, h2, body, button')].map((e) => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '')))] }))
        esito[nome + '-' + tipo] = { ...info, dentro }
        if (dentro && dentro.alt > 1200) {
          // pagina-app: si fotografa il contenitore aperto
          await page.evaluate(() => { const c = [...document.querySelectorAll('*')].find((el) => { const cs = getComputedStyle(el); return /(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 200 && el.clientHeight > 300 && el !== document.documentElement && el !== document.body }); let a = c; while (a && a !== document.documentElement) { a.style.setProperty('height', 'auto', 'important'); a.style.setProperty('max-height', 'none', 'important'); a.style.setProperty('overflow', 'visible', 'important'); a = a.parentElement } document.documentElement.style.setProperty('height', 'auto', 'important'); document.documentElement.style.setProperty('overflow', 'visible', 'important') })
          await attendi(800); await sveglia(page)
          esito[nome + '-' + tipo].altAperta = await page.evaluate(() => document.documentElement.scrollHeight)
        }
        const alt = await page.evaluate(() => document.documentElement.scrollHeight)
        const tetto = tipo === 'd' ? 12000 : 6000
        await page.screenshot({ path: `${OUT}/${nome}-${tipo}.png`, fullPage: alt <= tetto, ...(alt > tetto ? { clip: { x: 0, y: 0, width: vp.width, height: tetto } } : {}) })
      } catch (e) { esito[nome + '-' + tipo] = { errore: e.message.slice(0, 200) } }
    }
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

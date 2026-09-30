// Secondo giro di schermate: i telefoni senza le barre fisse fuori posto, il gestionale senza la
// fascia «copia di prova» e senza indirizzi locali, il Girarrosto così come si vede sul desktop.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))

async function viaBanner (page) {
  for (let i = 0; i < 5; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari|reject( all)?)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(700)
  }
  await attendi(700)
  await page.evaluate(() => document.querySelectorAll('.cmplz-cookiebanner, #cmplz-cookiebanner-container, .cmplz-overlay').forEach((e) => e.remove()))
}
async function sveglia (page) {
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(140) }
  await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
  await attendi(1200)
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000) }))))
}
// quello che è fisso o appiccicato: la testata resta in cima al foglio, il resto torna al suo posto o sparisce
async function sistemaFissi (page) {
  return page.evaluate(() => {
    const fatti = []
    document.querySelectorAll('body *').forEach((e) => {
      const s = getComputedStyle(e)
      if (s.position !== 'fixed' && s.position !== 'sticky') return
      const r = e.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return
      if (s.position === 'sticky') { e.style.setProperty('position', 'static', 'important'); fatti.push('sticky→static ' + e.className.toString().slice(0, 30)); return }
      if (r.top < 140 && r.height < 220) { e.style.setProperty('position', 'absolute', 'important'); e.style.setProperty('top', r.top + 'px', 'important'); fatti.push('in cima ' + e.className.toString().slice(0, 30)) } else { e.style.setProperty('display', 'none', 'important'); fatti.push('via ' + e.className.toString().slice(0, 30)) }
    })
    return fatti
  })
}
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  const esito = {}
  // 1 · i telefoni di Masseria e Tenuta
  for (const [nome, url] of [['masseria', 'https://lamasseriadimezzautunno.it/'], ['tenuta', 'https://tenutadongaetano.it/']]) {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); await attendi(2500)
    await viaBanner(page); await sveglia(page)
    esito[nome + '-m'] = await sistemaFissi(page)
    await attendi(500)
    await page.screenshot({ path: `${OUT}/${nome}-m.png`, clip: { x: 0, y: 0, width: 390, height: 5200 } })
  }
  // 2 · il Girarrosto sul desktop: la pagina com'è, e il menù scorso dentro
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto('https://libertigirarrosto.it/', { waitUntil: 'networkidle2', timeout: 60000 }); await attendi(2500)
  for (const [i, y] of [[0, 0], [1, 620], [2, 1500]]) {
    await page.evaluate((y) => { const c = document.querySelector('.app-body'); if (c) c.scrollTop = y }, y); await attendi(900)
    await page.screenshot({ path: `${OUT}/girarrosto-d${i}.png`, captureBeyondViewport: false })
  }
  // 3 · il gestionale di Mamma Rosaria, ripulito
  const B = 'http://127.0.0.1:8011'
  await page.goto(B + '/dev/entra/admin', { waitUntil: 'networkidle0' }); await attendi(600)
  await page.goto(B + '/calendario?vista=mese&data=2026-10-15', { waitUntil: 'networkidle0' })
  const testo = await page.evaluate(() => document.body.innerText)
  if (!/Battesimo di Sofia/.test(testo) || !/Halloween/.test(testo)) { console.log(JSON.stringify({ fermo: 'non è il database della vetrina' })); await browser.close(); return }
  const link = await page.evaluate(() => { const a = [...document.querySelectorAll('a[href*="/eventi/"]')].find((x) => /Sofia/.test(x.textContent)); return a ? new URL(a.href).pathname : null })
  const pagine = [['mese', '/calendario?vista=mese&data=2026-10-15'], ['settimana', '/calendario?vista=settimana&data=2026-10-17'], ['conti', '/conti'], ['evento', link]]
  const ripulisci = () => page.evaluate(() => {
    // la fascia della copia di prova, e la finestra «il gestionale sul telefono»
    document.querySelectorAll('body *').forEach((e) => { if (e.children.length < 3 && /Copia di prova sul Mac/.test(e.textContent || '') && e.getBoundingClientRect().height < 60) e.style.setProperty('display', 'none', 'important') })
    const piu = [...document.querySelectorAll('button, a')].find((b) => /^\s*Più tardi\s*$/.test(b.textContent || '')); if (piu) piu.click()
    // l'indirizzo locale del link del cliente diventa quello vero, senza il codice
    document.querySelectorAll('input').forEach((i) => { if (/127\.0\.0\.1|localhost/.test(i.value)) i.value = 'https://gestionale.damammarosaria.it/evento/…' })
    document.querySelectorAll('a, span, p, code').forEach((e) => { if (e.children.length === 0 && /127\.0\.0\.1/.test(e.textContent)) e.textContent = e.textContent.replace(/https?:\/\/127\.0\.0\.1:\d+\/evento\/\w+/, 'https://gestionale.damammarosaria.it/evento/…') })
  })
  for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    await page.setViewport(vp)
    for (const [nome, percorso] of pagine) {
      if (!percorso) continue
      await page.goto(B + percorso, { waitUntil: 'networkidle0' }); await attendi(500)
      await ripulisci(); await attendi(600); await ripulisci()
      const fissi = await sistemaFissi(page); await attendi(300)
      const resta = await page.evaluate(() => /Copia di prova|127\.0\.0\.1|Il gestionale sul telefono/.test(document.body.innerText + [...document.querySelectorAll('input')].map((i) => i.value).join(' ')))
      esito[`dmr-${nome}-${tipo}`] = { fissi: fissi.length, restaQualcosa: resta, alt: await page.evaluate(() => document.documentElement.scrollHeight) }
      const alt = Math.min(esito[`dmr-${nome}-${tipo}`].alt, tipo === 'd' ? 4000 : 4200)
      await page.screenshot({ path: `${OUT}/dmr-${nome}-${tipo}.png`, clip: { x: 0, y: 0, width: vp.width, height: alt } })
    }
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

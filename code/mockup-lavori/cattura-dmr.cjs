// Le schermate del gestionale di Mamma Rosaria, dalla copia locale coi dati inventati per la vetrina.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const B = 'http://127.0.0.1:8011'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
// i nomi inventati, tutti: se in pagina compare un referente che non è fra questi, ci si ferma
const FINTI = ['Marta Ferri', 'Carla De Luca', 'Anna Romano', 'Elena Greco', 'Ufficio personale', 'Paola Marino', 'Giulia Conti', 'Sara Villa', 'Rita Fontana', 'Dario Leone', 'Laura Costa', 'Silvia Rinaldi', 'Monica Galli', 'Fabio Serra', 'Segreteria', 'Nadia Pellegrini', 'Irene Bassi', 'Alice Moretti', 'Bruno Testa', 'Lucia Ferraro', 'Direzione', 'Teresa Caruso']
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
  const page = await browser.newPage()
  const esito = {}
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(B + '/dev/entra/admin', { waitUntil: 'networkidle0' }); await attendi(800)
  // la prova che il database è quello della vetrina: ventidue feste, e Sofia il 3 ottobre
  await page.goto(B + '/calendario?vista=mese&data=2026-10-15', { waitUntil: 'networkidle0' }); await attendi(800)
  const testo = await page.evaluate(() => document.body.innerText)
  esito.sofia = /Battesimo di Sofia/.test(testo); esito.halloween = /Halloween/.test(testo)
  if (!esito.sofia || !esito.halloween) { console.log(JSON.stringify({ ...esito, fermo: 'non è il database della vetrina' })); await browser.close(); return }
  const pagine = [['mese', '/calendario?vista=mese&data=2026-10-15'], ['settimana', '/calendario?vista=settimana&data=2026-10-17'], ['conti', '/conti'], ['inviti', '/inviti']]
  esito.link = await page.evaluate(() => [...document.querySelectorAll('a[href*="/eventi/"]')].slice(0, 40).map((a) => [a.getAttribute('href'), a.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)]))
  const idSofia = (esito.link.find((l) => /Sofia/.test(l[1])) || esito.link[0] || [])[0]
  if (idSofia) { const u = new URL(idSofia, B); pagine.push(['evento', u.pathname], ['comanda', u.pathname + '/comanda']) }
  for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    await page.setViewport(vp)
    for (const [nome, percorso] of pagine) {
      try {
        const r = await page.goto(B + percorso, { waitUntil: 'networkidle0' }); await attendi(700)
        const info = await page.evaluate(() => ({ stato: document.title, alt: document.documentElement.scrollHeight, h1: (document.querySelector('h1, h2') || {}).innerText }))
        esito[`${nome}-${tipo}`] = { http: r.status(), ...info }
        if (r.status() !== 200) continue
        await page.screenshot({ path: `${OUT}/dmr-${nome}-${tipo}.png`, fullPage: true })
      } catch (e) { esito[`${nome}-${tipo}`] = { errore: e.message.slice(0, 120) } }
    }
  }
  // i colori e i caratteri del gestionale
  await page.setViewport({ width: 1440, height: 900 }); await page.goto(B + '/calendario?vista=mese&data=2026-10-15', { waitUntil: 'networkidle0' })
  esito.stile = await page.evaluate(() => { const c = {}; document.querySelectorAll('body, header, nav, aside, main, a, button, h1, h2, .btn, [class*="card"]').forEach((e) => { const s = getComputedStyle(e); [s.backgroundColor, s.color].forEach((v) => { if (v && v !== 'rgba(0, 0, 0, 0)') c[v] = (c[v] || 0) + 1 }) }); return { colori: Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8), font: [...new Set([...document.querySelectorAll('h1, h2, body, button')].map((e) => getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '')))] } })
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

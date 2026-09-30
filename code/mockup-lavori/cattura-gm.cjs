// Il gestionale della Masseria, dalla copia del database coi soli dati inventati (porta 8012).
// Si ferma se in pagina non trova i nomi che esistono solo nella copia.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const BASE = 'http://127.0.0.1:8012'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const PAGINE = [
  ['mese', '/calendario?vista=mese&data=2026-10-01'],
  ['settimana', '/calendario?vista=settimana&data=2026-10-12'],
  ['giorno', '/calendario?vista=giorno&data=2026-10-01'],
  ['gite', '/gite'],
  ['feste', '/feste'],
  ['serate', '/serate'],
  ['gita', '/date/3'],
  ['festa', '/date/10'],
  ['scuole', '/scuole'],
  ['scuola', '/scuole/2'],
  ['conti', '/conti'],
  ['inviti', '/inviti'],
  ['email', '/email-marketing'],
  ['campagne', '/campagne'],
  ['campagna', '/campagne/1'],
  ['esporta', '/esportazione']
]
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'] })
  const esito = {}
  for (const [tipo, vp] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }], ['m', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
    const page = await browser.newPage()
    await page.setViewport(vp)
    await page.goto(BASE + '/dev/entra/admin', { waitUntil: 'networkidle2' })
    // la prova che il database è quello di vetrina
    await page.goto(BASE + '/scuole', { waitUntil: 'networkidle2' })
    const prova = await page.evaluate(() => document.body.innerText)
    if (!/Scuola Arcobaleno/.test(prova) || !/Scuola La Girandola/.test(prova)) { console.log('FERMO: non è il database di vetrina'); process.exit(1) }
    for (const [nome, percorso] of PAGINE) {
      try {
        await page.goto(BASE + percorso, { waitUntil: 'networkidle2', timeout: 30000 })
        await attendi(600)
        // gli avvisi che chiedono di installare l'app o di attivare le notifiche si chiudono
        // quello che è della copia di prova e non del gestionale: la fascia gialla, l'avviso delle notifiche,
        // l'avviso della casella non collegata, che nella copia non può esserlo
        await page.evaluate(() => {
          // la barra «Salva» sta incollata in fondo allo schermo: in una pagina intera finirebbe a metà foglio
          document.querySelectorAll('.demo-banner, .avviso-notifiche, .savebar, dialog[open], [data-avviso-app], .avviso-app').forEach((e) => e.remove())
          document.querySelectorAll('.warn-box').forEach((e) => { if (/Gmail delle campagne/.test(e.textContent)) e.remove() })
        })
        await attendi(200)
        const info = await page.evaluate(() => ({ titolo: document.title, alto: document.documentElement.scrollHeight, fissi: [...document.querySelectorAll('body *')].filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && e.getBoundingClientRect().width > 0).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 30) + ' ' + getComputedStyle(e).position + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 6) }))
        esito[nome + '-' + tipo] = info
        await page.screenshot({ path: `${OUT}/gm-${nome}-${tipo}.png`, fullPage: true })
      } catch (e) { esito[nome + '-' + tipo] = { errore: e.message.slice(0, 160) } }
    }
    await page.close()
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

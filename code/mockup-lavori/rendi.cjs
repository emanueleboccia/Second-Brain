// Fotografa le scene: le ferme in un colpo, i video fotogramma per fotogramma.
// uso: node rendi.cjs prova            → un fotogramma di ogni scena, a metà
//      node rendi.cjs ferme            → le otto ferme
//      node rendi.cjs video <nome>     → i fotogrammi di un video
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const [, , cosa, quale] = process.argv
const B = 'http://127.0.0.1:4180/scena.html'
const FPS = 60
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'] })
  const page = await browser.newPage()
  page.on('pageerror', (e) => console.log('ERRORE', e.message))
  await page.setViewport({ width: 1000, height: 1000, deviceScaleFactor: 1 })
  await page.goto(B, { waitUntil: 'networkidle0' })
  const nomi = await page.evaluate(() => Object.keys(window.SCENE))
  const monta = (n) => page.evaluate((n) => window.monta(n), n)
  if (cosa === 'prova') {
    fs.mkdirSync(__dirname + '/prove', { recursive: true })
    for (const n of nomi) {
      if (quale && !n.startsWith(quale)) continue
      const info = await monta(n)
      const tempi = info.durata ? [0.0, info.durata * 0.21, info.durata * 0.33, info.durata * 0.62] : [0]
      for (const [i, t] of tempi.entries()) { await page.evaluate((t) => window.disegna(t), t); await page.screenshot({ path: `${__dirname}/prove/${n}-${i}.jpg`, type: 'jpeg', quality: 88 }) }
      console.log(n, JSON.stringify(info))
    }
  } else if (cosa === 'ferme') {
    fs.mkdirSync(__dirname + '/uscita', { recursive: true })
    for (const n of nomi) { const info = await monta(n); await page.evaluate(() => window.disegna(0)); await page.screenshot({ path: `${__dirname}/uscita/${n}.png` }); console.log(n, info.durata) }
  } else if (cosa === 'video') {
    const info = await monta(quale)
    const dir = `${__dirname}/fotogrammi/${quale}`
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true })
    const n = Math.round(info.durata * FPS)
    const t0 = Date.now()
    for (let i = 0; i < n; i++) { await page.evaluate((t) => window.disegna(t), i / FPS); await page.screenshot({ path: `${dir}/${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 95 }) }
    console.log(quale, n, 'fotogrammi in', ((Date.now() - t0) / 1000).toFixed(1), 's')
  }
  await browser.close()
})()

// Dodici fotogrammi per scena, a distanze uguali, in un foglio solo: per guardare una scena prima di girarla.
//   node sonda.cjs <nome> [<nome> ...]
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'] })
  const page = await browser.newPage()
  page.on('pageerror', (e) => console.log('ERRORE', e.message))
  await page.setViewport({ width: 1000, height: 1000, deviceScaleFactor: 1 })
  await page.goto('http://127.0.0.1:4180/scena.html', { waitUntil: 'networkidle0' })
  fs.mkdirSync(__dirname + '/sonde', { recursive: true })
  for (const n of process.argv.slice(2)) {
    const info = await page.evaluate((n) => window.monta(n), n)
    const quanti = info.durata ? 12 : 1
    for (let i = 0; i < quanti; i++) { await page.evaluate((t) => window.disegna(t), info.durata * i / quanti); await page.screenshot({ path: `${__dirname}/sonde/${n}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 80 }) }
    console.log(n, JSON.stringify(info))
  }
  await browser.close()
})()

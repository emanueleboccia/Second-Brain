// Terzo giro: le pagine interne della Masseria, e le pagine del gestionale che mancavano.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const OUT = __dirname + '/sorgenti'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
async function viaBanner (page) {
  for (let i = 0; i < 4; i++) {
    const ok = await page.evaluate(() => { const b = [...document.querySelectorAll('button, a, [role="button"]')].find((e) => /^\s*(rifiuta( tutto)?|nega|solo (i )?necessari)\s*$/i.test(e.textContent || '') && e.getBoundingClientRect().width > 0); if (b) { b.click(); return true } return false })
    if (ok) break
    await attendi(600)
  }
  await attendi(500)
  await page.evaluate(() => document.querySelectorAll('.cmplz-cookiebanner, #cmplz-cookiebanner-container, .cmplz-overlay').forEach((e) => e.remove()))
}
async function sveglia (page) {
  const alt = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < alt; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await attendi(130) }
  await page.evaluate(() => { document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager' }); window.scrollTo(0, 0) })
  await attendi(1100)
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000) }))))
}
async function sistemaFissi (page) {
  return page.evaluate(() => { let n = 0; document.querySelectorAll('body *').forEach((e) => { const s = getComputedStyle(e); if (s.position !== 'fixed' && s.position !== 'sticky') return; const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return; n++; if (s.position === 'sticky') { e.style.setProperty('position', 'static', 'important'); return } if (r.top < 140 && r.height < 220) { e.style.setProperty('position', 'absolute', 'important'); e.style.setProperty('top', r.top + 'px', 'important') } else e.style.setProperty('display', 'none', 'important') }); return n })
}
;(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required'] })
  const page = await browser.newPage()
  const esito = {}
  for (const [nome, url] of [['masseria-scuole', 'https://lamasseriadimezzautunno.it/scuole/'], ['masseria-zucche', 'https://lamasseriadimezzautunno.it/zucche-in-masseria/'], ['masseria-chi', 'https://lamasseriadimezzautunno.it/chi-siamo/']]) {
    for (const [tipo, vp, tetto] of [['d', { width: 1440, height: 900, deviceScaleFactor: 1 }, 9000], ['m', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, 5200]]) {
      try {
        await page.setViewport(vp)
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); await attendi(2000)
        await viaBanner(page); await sveglia(page); await sistemaFissi(page); await attendi(400)
        const alt = await page.evaluate(() => document.documentElement.scrollHeight)
        esito[`${nome}-${tipo}`] = { alt, titolo: await page.evaluate(() => document.title) }
        await page.screenshot({ path: `${OUT}/${nome}-${tipo}.png`, clip: { x: 0, y: 0, width: vp.width, height: Math.min(alt, tetto) } })
      } catch (e) { esito[`${nome}-${tipo}`] = { errore: e.message.slice(0, 140) } }
    }
  }
  // il gestionale: gli inviti e la comanda, ripuliti come le altre
  const B = 'http://127.0.0.1:8011'
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
  await page.goto(B + '/dev/entra/admin', { waitUntil: 'networkidle0' }); await attendi(500)
  await page.goto(B + '/calendario?vista=mese&data=2026-10-15', { waitUntil: 'networkidle0' })
  const testo = await page.evaluate(() => document.body.innerText)
  if (!/Battesimo di Sofia/.test(testo) || !/Halloween/.test(testo)) { console.log(JSON.stringify({ fermo: 'non è il database della vetrina' })); await browser.close(); return }
  const link = await page.evaluate(() => { const a = [...document.querySelectorAll('a[href*="/eventi/"]')].find((x) => /Sofia/.test(x.textContent)); return a ? new URL(a.href).pathname : null })
  const ripulisci = () => page.evaluate(() => {
    document.querySelectorAll('body *').forEach((e) => { if (e.children.length < 3 && /Copia di prova sul Mac/.test(e.textContent || '') && e.getBoundingClientRect().height < 60) e.style.setProperty('display', 'none', 'important') })
    const piu = [...document.querySelectorAll('button, a')].find((b) => /^\s*Più tardi\s*$/.test(b.textContent || '')); if (piu) piu.click()
    document.querySelectorAll('input').forEach((i) => { if (/127\.0\.0\.1|localhost/.test(i.value)) i.value = 'https://gestionale.damammarosaria.it/evento/…' })
  })
  for (const [nome, percorso] of [['inviti', '/inviti'], ['comanda', link + '/comanda'], ['giorno', '/calendario?vista=giorno&data=2026-10-17'], ['staff', '/staff-membri'], ['servizi', '/servizi']]) {
    try {
      const r = await page.goto(B + percorso, { waitUntil: 'networkidle0' }); await attendi(500)
      await ripulisci(); await attendi(400); await ripulisci(); await sistemaFissi(page); await attendi(300)
      const alt = await page.evaluate(() => document.documentElement.scrollHeight)
      const resta = await page.evaluate(() => /Copia di prova|127\.0\.0\.1/.test(document.body.innerText + [...document.querySelectorAll('input')].map((i) => i.value).join(' ')))
      esito['dmr-' + nome] = { http: r.status(), alt, resta, nomi: await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').slice(0, 260)) }
      if (r.status() === 200) await page.screenshot({ path: `${OUT}/dmr-${nome}-d.png`, clip: { x: 0, y: 0, width: 1440, height: Math.min(alt, 3000) } })
    } catch (e) { esito['dmr-' + nome] = { errore: e.message.slice(0, 140) } }
  }
  console.log(JSON.stringify(esito, null, 1))
  await browser.close()
})()

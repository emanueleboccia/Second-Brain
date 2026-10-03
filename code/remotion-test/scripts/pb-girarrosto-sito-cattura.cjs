// Le schermate del sito menù del Girarrosto Liberti per il reel del carrello (03/10/2026): libertigirarrosto.it da
// telefono, a 3x su 390 punti, nei passi che racconta la voce. Il sito è fatto come un'app: testata fissa, menù che
// scorre dentro #scroller, barra delle schede in fondo. Per avere il menù intero da far scorrere si allarga la
// finestra fino a farlo stare tutto, e si fotografa una volta per ogni stato del carrello: vuoto, col Menù Coppia, coi
// due crocchè, con la Coca. Poi la scheda Ordina, col nome scritto, e il messaggio che il bottone prepara.
// L'orologio della pagina è spostato alle 19:30, perché l'ordine della cena saluti con «Buonasera».
//
// Scrive public/pb-girarrosto-sito/*.jpg e .png, e misure.json con le posizioni di bottoni e campi, in punti.
const puppeteer = require('/Users/emanueleboccia/Second Brain/code/controllo-siti/node_modules/puppeteer-core')
const fs = require('fs')
const OUT = __dirname + '/../public/pb-girarrosto-sito'
const attendi = (ms) => new Promise((r) => setTimeout(r, ms))
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1'
const VP = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
const misure = {}

async function lunga (page, nome) {
  // il menù intero: la finestra si allunga finché #scroller non scorre più
  const sh = await page.evaluate(() => document.getElementById('scroller').scrollHeight)
  const st = await page.evaluate(() => document.getElementById('scroller').scrollTop)
  await page.setViewport({ ...VP, height: sh + 136 })
  await attendi(900)
  const f = `${OUT}/_${nome}.png`
  await page.screenshot({ path: f })
  require('child_process').execFileSync('python3', ['-c', `from PIL import Image; im=Image.open(${JSON.stringify(f)}).convert('RGB'); im.save(${JSON.stringify(`${OUT}/${nome}.jpg`)}, quality=90)`])
  fs.unlinkSync(f)
  misure[nome] = { alto: sh + 136 }
  await page.setViewport(VP)
  await attendi(700)
  await page.evaluate((st) => { document.getElementById('scroller').scrollTop = st }, st)
}
async function vai (page, sel, margine = 260) {
  return page.evaluate((sel, margine) => {
    const s = document.getElementById('scroller'), e = document.querySelector(sel)
    const y = e.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop
    s.scrollTop = Math.max(0, y - margine)
    return Math.round(s.scrollTop)
  }, sel, margine)
}
async function rett (page, sel) {
  return page.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } }, sel)
}
// la posizione di un elemento dentro il menù intero, in punti dall'alto della pagina lunga
async function nelMenu (page, sel) {
  return page.evaluate((sel) => {
    const s = document.getElementById('scroller'), r = document.querySelector(sel).getBoundingClientRect()
    return { x: Math.round(r.left), y: Math.round(r.top - s.getBoundingClientRect().top + s.scrollTop + 68), w: Math.round(r.width), h: Math.round(r.height) }
  }, sel)
}

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--no-sandbox', '--hide-scrollbars'] })
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    const V = Date, d = new V(); const meta = new V(d.getFullYear(), d.getMonth(), d.getDate(), 19, 30).getTime(); const scarto = meta - V.now()
    class D extends V { constructor (...a) { if (a.length === 0) super(V.now() + scarto); else super(...a) } static now () { return V.now() + scarto } }
    window.Date = D
    try { localStorage.clear() } catch (e) {}
  })
  await page.setViewport(VP)
  await page.setUserAgent(IPHONE)
  await page.goto('https://libertigirarrosto.it/', { waitUntil: 'networkidle2', timeout: 90000 }); await attendi(3000)
  await page.screenshot({ path: `${OUT}/apertura.png` })

  const COPPIA = '.add-sp[data-n="Menù Coppia"]', CROCCHE = '.add[data-n="Crocchè"]', COCA = '.add[data-n="Coca-Cola 1,5 lt"]'
  misure.bottoni = { coppia: await nelMenu(page, COPPIA), crocche: await nelMenu(page, CROCCHE), coca: await nelMenu(page, COCA) }
  misure.categorie = await page.evaluate(() => Object.fromEntries(['cat-special', 'cat-girarrosto', 'cat-contorni', 'cat-bibite'].map((id) => { const s = document.getElementById('scroller'); const e = document.getElementById(id); return [id, Math.round(e.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop + 68)] })))
  misure.tabOrdina = await rett(page, '[data-tab="ordina"]')
  await lunga(page, 'menu-0')

  // il Menù Coppia
  misure.scrollCoppia = await vai(page, COPPIA, 420)
  await page.click(COPPIA); await attendi(250)
  await page.screenshot({ path: `${OUT}/tocco-coppia.png` })
  misure.toast = await rett(page, '#toast').catch(() => null)
  misure.barra = await page.evaluate(() => { const b = document.getElementById('barraCarrello'); const r = b.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), vis: getComputedStyle(b).display } })
  await attendi(1600)
  await lunga(page, 'menu-1')
  // due crocchè
  misure.scrollCrocche = await vai(page, CROCCHE, 360)
  await page.click(CROCCHE); await attendi(400); await page.click(CROCCHE); await attendi(250)
  await page.screenshot({ path: `${OUT}/tocco-crocche.png` })
  await attendi(1600)
  await lunga(page, 'menu-3')
  // la Coca
  misure.scrollCoca = await vai(page, COCA, 360)
  await page.click(COCA); await attendi(250)
  await page.screenshot({ path: `${OUT}/tocco-coca.png` })
  await attendi(1600)
  await lunga(page, 'menu-4')

  // la scheda Ordina
  await page.click('[data-tab="ordina"]'); await attendi(1200)
  await page.screenshot({ path: `${OUT}/ordina-0.png` })
  misure.ordina = {
    nome: await rett(page, '#nomeCliente'),
    oggi: await page.evaluate(() => { const b = [...document.querySelectorAll('button, label')].find((e) => e.textContent.trim() === 'Oggi' && e.getBoundingClientRect().width > 0); if (!b) return null; const r = b.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) } }),
    bottone: await rett(page, '#ordinaOra'),
    totale: await rett(page, '#cartTot'),
    scroll: await page.evaluate(() => document.getElementById('scroller').scrollTop),
    alto: await page.evaluate(() => document.getElementById('scroller').scrollHeight),
  }
  await page.click('#nomeCliente'); await page.type('#nomeCliente', 'Giovanni', { delay: 60 }); await attendi(300)
  await page.evaluate(() => document.activeElement.blur()); await attendi(300)
  await page.screenshot({ path: `${OUT}/ordina-nome.png` })
  // fino al bottone
  misure.ordina.scrollBottone = await vai(page, '#ordinaOra', 520)
  await attendi(500)
  await page.screenshot({ path: `${OUT}/ordina-bottone.png` })
  misure.ordina.bottoneDopo = await rett(page, '#ordinaOra')
  misure.ordina.nomeDopo = await rett(page, '#nomeCliente')
  await lunga(page, 'ordina-lunga')
  const href = await page.evaluate(() => document.getElementById('ordinaOra').href)
  misure.messaggio = decodeURIComponent(href.split('text=')[1] || '')
  misure.numero = href.split('wa.me/')[1]?.split('?')[0]
  fs.writeFileSync(`${OUT}/misure.json`, JSON.stringify(misure, null, 1))
  console.log(JSON.stringify(misure, null, 1))
  await browser.close()
})()

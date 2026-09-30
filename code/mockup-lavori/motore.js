/* Il motore dei mockup. Ogni scena è una funzione del tempo: disegna(t) mette ogni cosa al suo
   posto per quell'istante, e i fotogrammi si fotografano uno per uno. Così il movimento è liscio
   per costruzione: nessun fotogramma può mancare. */
const E = {
  lin: (t) => t,
  io2: (t) => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  io3: (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  io4: (t) => (t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  expoIO: (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2),
  out3: (t) => 1 - Math.pow(1 - t, 3),
  out5: (t) => 1 - Math.pow(1 - t, 5),
  outExpo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
}
const stringi = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const tratto = (t, da, a, ease = 'io3') => E[ease](stringi((t - da) / (a - da)))
const misto = (a, b, k) => a + (b - a) * k
const el = (tag, cls, genitore, stile) => { const e = document.createElement(tag); if (cls) e.className = cls; if (stile) Object.assign(e.style, stile); if (genitore) genitore.appendChild(e); return e }

/* --- il fondo: il colore del brand, una macchia di luce, una forma morbida, la grana --------- */
function fondo (tela, f) {
  const s = el('div', 'fondo', tela, { background: f.base })
  const forme = (f.forme || (f.forma ? [f.forma] : [])).map((o) => el('div', 'fondo__forma', s, { left: o.x + '%', top: o.y + '%', width: o.r * 2 + '%', height: o.r * 2 + '%', background: `radial-gradient(closest-side, ${o.colore} 0%, ${o.colore} 38%, transparent 100%)`, opacity: o.a }))
  if (f.luce) el('div', 'fondo__luce', s, { background: `radial-gradient(ellipse 70% 60% at ${f.luce.x}% ${f.luce.y}%, rgba(255,255,255,${f.luce.a}), transparent 70%)` })
  if (f.ombra) el('div', 'fondo__luce', s, { background: `radial-gradient(ellipse 120% 100% at 50% 40%, transparent 45%, rgba(0,0,0,${f.ombra}) 100%)` })
  if (f.griglia) el('div', 'fondo__griglia', s, { backgroundImage: `linear-gradient(to right, ${f.griglia} 1px, transparent 1px), linear-gradient(to bottom, ${f.griglia} 1px, transparent 1px)` })
  el('div', 'fondo__grana', s, { opacity: f.grana ?? 0.07 })
  return { muovi: (fase) => forme.forEach((o, i) => { const v = i % 2 ? -1 : 1; o.style.transform = `translate(-50%, -50%) translate(${Math.sin(fase * Math.PI * 2) * 16 * v}px, ${Math.cos(fase * Math.PI * 2) * 12 * v}px)` }) }
}

/* --- il cursore: sta quasi fermo, come quando si scorre con la rotella ------------------------ */
function cursore (tela, chiaro) {
  const c = el('div', 'cursore', tela)
  c.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l14 8.2-6.3 1.5-3 5.8z" fill="${chiaro ? '#fff' : '#111'}" stroke="${chiaro ? '#111' : '#fff'}" stroke-width="1.4" stroke-linejoin="round"/></svg>`
  return c
}

/* === A · LE FINESTRE: le pagine del desktop una sopra l'altra, la camera scende ================ */
function scenaFinestre (tela, cfg) {
  const W = cfg.larga ?? 860; const H = Math.round(W * (cfg.rapporto ?? 0.625)); const X = (1000 - W) / 2; const Y = (1000 - H) / 2
  const passo = H + (cfg.spazio ?? 58)
  const n = cfg.finestre.length; const fetta = cfg.fetta ?? 3.2; const tr = cfg.passaggio ?? 1.15
  const T = n * fetta
  const f = fondo(tela, cfg.fondo)
  const pista = el('div', 'pista', tela)
  const scala = W / (cfg.paginaLarga ?? 1440)
  // la fila: la copia dell'ultima sopra, le finestre, la copia della prima e della seconda sotto
  const ordine = [{ i: n - 1, fermo: 'fine' }, ...cfg.finestre.map((_, i) => ({ i })), { i: 0, fermo: 'inizio' }, { i: 1 % n, fermo: 'inizio' }]
  const pezzi = ordine.map((o, k) => {
    const d = cfg.finestre[o.i]
    const fin = el('div', 'finestra' + (cfg.scura ? ' finestra--scura' : ''), pista, { left: X + 'px', top: (k - 1) * passo + 'px', width: W + 'px', height: H + 'px', borderRadius: (cfg.raggio ?? 14) + 'px' })
    const img = el('img', '', fin); img.src = d.img
    if (d.fissa) { const b = el('img', 'finestra__fissa', fin); b.src = d.fissa.img; b.style.width = d.fissa.w * scala + 'px' }
    let dentro = null
    if (d.dentro) { // una zona che scorre dentro la pagina ferma: il telefono del sito del Girarrosto
      const z = el('div', 'dentro', fin, { left: d.dentro.x * scala + 'px', top: d.dentro.y * scala + 'px', width: d.dentro.w * scala + 'px', height: d.dentro.h * scala + 'px' })
      dentro = el('img', '', z); dentro.src = d.dentro.img
    }
    return { ...o, k: k - 1, fin, img, dentro, d }
  })
  const cur = cfg.cursore === false ? null : cursore(tela, cfg.cursoreChiaro)
  const scorri = (d, u) => { // u: secondi dall'inizio della sua fetta
    const s = d.scorri; if (!s || s.length < 2) return (s && s[0]) || 0
    const tappe = s.length - 1; const libero = fetta - tr - 0.5; const durata = Math.min(1.7, libero / tappe - 0.25)
    let y = s[0]
    for (let j = 0; j < tappe; j++) { const da = 0.45 + j * (libero / tappe); y = misto(y, s[j + 1], tratto(u, da, da + durata, 'io3')) }
    return y
  }
  return {
    durata: T,
    disegna (t) {
      const k = Math.floor(t / fetta); const u = t - k * fetta
      const c = k + tratto(u, fetta - tr, fetta, 'expoIO')
      pista.style.transform = `translate3d(0, ${Y - c * passo}px, 0)`
      pezzi.forEach((p) => {
        const dist = Math.min(1, Math.abs(p.k - c))
        p.fin.style.transform = `scale(${1 - 0.045 * dist})`
        let y
        if (p.fermo === 'inizio') y = (p.d.scorri && p.d.scorri[0]) || 0
        else if (p.fermo === 'fine') y = scorri(p.d, fetta)
        else y = scorri(p.d, stringi(t - p.i * fetta, 0, fetta))
        if (p.dentro) p.dentro.style.transform = `translate3d(0, ${-y * scala}px, 0)`
        else p.img.style.transform = `translate3d(0, ${-y * scala}px, 0)`
      })
      f.muovi(t / T)
      if (cur) {
        const via = tratto(u, fetta - tr, fetta - tr + 0.25, 'io2') - tratto(u, 0.15, 0.55, 'io2') * (u < 1 ? 1 : 0)
        const dentro = u < 1 ? tratto(u, 0.15, 0.55, 'io2') : 1 - tratto(u, fetta - tr, fetta - tr + 0.25, 'io2')
        const cx = X + W * (cfg.cursoreX ?? 0.7) + Math.sin(t * 0.9) * 26 + Math.sin(t * 2.3) * 6
        const cy = Y + H * (cfg.cursoreY ?? 0.62) + Math.cos(t * 0.7) * 18
        cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; cur.style.opacity = stringi(dentro)
      }
    }
  }
}

/* === B · I TELEFONI: gli schermi in fila, la camera scorre di lato ============================ */
function scenaTelefoni (tela, cfg) {
  const W = cfg.largo ?? 324; const H = Math.round(W * 844 / 390); const Y = (1000 - H) / 2; const passo = W + (cfg.spazio ?? 44); const X = (1000 - W) / 2
  const n = cfg.schermi.length; const fetta = cfg.fetta ?? 2.7; const tr = cfg.passaggio ?? 1.05
  const T = n * fetta
  const f = fondo(tela, cfg.fondo)
  const pista = el('div', 'pista', tela)
  const scala = (W - 14) / 390
  const ordine = [{ i: (n - 2 + n) % n, fermo: 'fine' }, { i: n - 1, fermo: 'fine' }, ...cfg.schermi.map((_, i) => ({ i })), { i: 0, fermo: 'inizio' }, { i: 1 % n, fermo: 'inizio' }, { i: 2 % n, fermo: 'inizio' }]
  const pezzi = ordine.map((o, k) => {
    const d = cfg.schermi[o.i]
    const tel = el('div', 'telefono' + (cfg.chiaro ? ' telefono--chiaro' : ''), pista, { left: X + (k - 2) * passo + 'px', top: Y + 'px', width: W + 'px', height: H + 'px' })
    const sch = el('div', 'telefono__schermo', tel)
    const img = el('img', '', sch); img.src = d.img
    if (d.testata) { const te = el("img", "telefono__barra", sch); te.src = d.testata }
    if (d.piede) { const pi = el("img", "telefono__barra telefono__barra--piede", sch); pi.src = d.piede }
    return { ...o, k: k - 2, tel, img, d }
  })
  const dove = (d, u) => misto(d.y, d.y + (d.scorri ?? 0), tratto(u, 0.35, fetta - tr - 0.1, 'io3'))
  return {
    durata: T,
    disegna (t) {
      const k = Math.floor(t / fetta); const u = t - k * fetta
      const c = k + tratto(u, fetta - tr, fetta, 'expoIO')
      pista.style.transform = `translate3d(${-c * passo}px, 0, 0)`
      pezzi.forEach((p) => {
        const dist = Math.min(1, Math.abs(p.k - c))
        p.tel.style.transform = `scale(${1 - 0.08 * dist})`
        p.tel.style.opacity = 1 - (cfg.spegni ?? 0.0) * dist
        let y
        if (p.fermo === 'inizio') y = p.d.y
        else if (p.fermo === 'fine') y = dove(p.d, fetta)
        else y = dove(p.d, stringi(t - p.i * fetta, 0, fetta))
        p.img.style.transform = `translate3d(0, ${-y * scala}px, 0)`
      })
      f.muovi(t / T)
    }
  }
}

/* === C · I TOCCHI: la tavoletta, e l'ordine che cresce a ogni tocco ============================ */
function scenaTocchi (tela, cfg) {
  const W = cfg.larga ?? 868; const iw = cfg.immagine[0]; const ih = cfg.immagine[1]
  const cornice = cfg.cornice ?? 13; const sw = W - cornice * 2; const sh = Math.round(sw * ih / iw); const H = sh + cornice * 2
  const X = (1000 - W) / 2; const Y = (1000 - H) / 2; const scala = sw / iw
  const f = fondo(tela, cfg.fondo)
  const tav = el('div', 'tavoletta', tela, { left: X + 'px', top: Y + 'px', width: W + 'px', height: H + 'px', padding: cornice + 'px' })
  const sch = el('div', 'tavoletta__schermo', tav)
  const stati = cfg.stati.map((src, i) => { const im = el('img', '', sch); im.src = src; im.style.opacity = i === 0 ? 1 : 0; return im })
  const dito = el('div', 'dito', sch)
  const passo = cfg.passo ?? 1.15; const primo = cfg.primo ?? 0.9; const n = cfg.tocchi.length
  const fine = primo + n * passo; const T = fine + (cfg.resta ?? 1.5) + (cfg.sfuma ?? 0.7)
  return {
    durata: T,
    disegna (t) {
      // quale stato si vede: si cambia nell'istante in cui il dito si alza
      let stato = 0
      cfg.tocchi.forEach((_, i) => { if (t >= primo + i * passo + 0.34) stato = i + 1 })
      const sfuma = tratto(t, T - (cfg.sfuma ?? 0.7), T, 'io2')
      stati.forEach((im, i) => { im.style.opacity = i === stato ? 1 : 0 })
      if (sfuma > 0) { stati[0].style.opacity = 1; stati[stato].style.opacity = 1 - sfuma; stati[0].style.zIndex = 0; stati[stato].style.zIndex = 1 } else stati.forEach((im) => { im.style.zIndex = 0 })
      // il dito: compare sul punto, preme, si alza
      let vis = 0; let sc = 1; let x = 0; let y = 0
      cfg.tocchi.forEach((p, i) => {
        const t0 = primo + i * passo
        if (t >= t0 - 0.02 && t < t0 + 0.75) {
          x = p[0] * scala; y = p[1] * scala
          const entra = tratto(t, t0, t0 + 0.22, 'out3'); const preme = tratto(t, t0 + 0.2, t0 + 0.34, 'io2'); const esce = tratto(t, t0 + 0.36, t0 + 0.72, 'out3')
          vis = entra * (1 - esce); sc = misto(1.5, 1, entra) - 0.22 * preme * (1 - esce) + 0.9 * esce
        }
      })
      dito.style.opacity = vis * 0.9; dito.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${sc})`
      f.muovi(t / T)
    }
  }
}

/* === D · LE FERME: la pagina alta, e la parete di schermi vista di sbieco ======================= */
function scenaPagina (tela, cfg) {
  fondo(tela, cfg.fondo)
  const W = cfg.larga ?? 800; const X = (1000 - W) / 2
  const fin = el('div', 'finestra' + (cfg.scura ? ' finestra--scura' : ''), tela, { left: X + 'px', top: (cfg.alto ?? 130) + 'px', width: W + 'px', height: '1000px', borderRadius: `${cfg.raggio ?? 14}px ${cfg.raggio ?? 14}px 0 0` })
  const img = el('img', '', fin); img.src = cfg.img; img.style.transform = `translate3d(0, ${-(cfg.y ?? 0) * W / (cfg.paginaLarga ?? 1440)}px, 0)`
  return { durata: 0, disegna () {} }
}
function scenaParete (tela, cfg) {
  fondo(tela, cfg.fondo)
  const p = el('div', 'parete', tela)
  const W = cfg.largo ?? 250; const H = Math.round(W * (cfg.rapporto ?? 844 / 390)); const sx = W + (cfg.spazio ?? 34); const sy = H + (cfg.spazio ?? 34)
  const dispari = (c) => (((c % 2) + 2) % 2 ? sy * 0.42 : 0)
  cfg.schermi.forEach((s) => {
    const t = el('div', 'parete__schermo', p, { left: s.col * sx + 'px', top: s.riga * sy + dispari(s.col) + 'px', width: W + 'px', height: H + 'px', borderRadius: (cfg.raggio ?? 26) + 'px' })
    const img = el('img', '', t); img.src = s.img; img.style.transform = `translate3d(0, ${-(s.y ?? 0) * W / (cfg.paginaLarga ?? 390)}px, 0)`
  })
  // il punto della parete che sta al centro della piastrella, e attorno a cui la parete si inclina
  const c = cfg.centro ?? [1, 0.5]
  const cx = c[0] * sx + W / 2; const cy = c[1] * sy + H / 2 + sy * 0.21
  p.style.transformOrigin = `${cx}px ${cy}px`
  p.style.transform = `translate(${500 - cx}px, ${500 - cy}px) rotateX(${cfg.rx ?? 54}deg) rotateZ(${cfg.rz ?? -36}deg) scale(${cfg.scala ?? 1.05})`
  return { durata: 0, disegna () {} }
}
function scenaInsieme (tela, cfg) { // una finestra ferma e un telefono davanti: il sito e il suo telefono
  fondo(tela, cfg.fondo)
  cfg.pezzi.forEach((z) => {
    const b = el('div', z.tipo, tela, { left: z.x + 'px', top: z.y + 'px', width: z.w + 'px', height: z.h + 'px', ...(z.raggio ? { borderRadius: z.raggio + 'px' } : {}), ...(z.ruota ? { transform: `rotate(${z.ruota}deg)` } : {}), ...(z.cornice ? { padding: z.cornice + 'px' } : {}) })
    const dentro = (z.tipo === 'telefono' || z.tipo === 'tavoletta') ? el('div', z.tipo + '__schermo', b) : b
    const img = el('img', '', dentro); img.src = z.img; img.style.transform = `translate3d(0, ${-(z.sy ?? 0) * (z.tipo === 'telefono' ? z.w / 390 : z.w / (z.paginaLarga ?? 1440))}px, 0)`
  })
  return { durata: 0, disegna () {} }
}

/* === E · LO SCORRIMENTO: una pagina sola, dall'alto in fondo, con le soste ===================== */
function scenaScorrimento (tela, cfg) {
  const f = fondo(tela, cfg.fondo)
  const tel = cfg.dispositivo === 'telefono'
  let img, scala, cur = null
  if (tel) {
    const W = cfg.largo ?? 392; const H = Math.round(W * 844 / 390)
    const t = el('div', 'telefono' + (cfg.chiaro ? ' telefono--chiaro' : ''), tela, { left: (1000 - W) / 2 + 'px', top: (1000 - H) / 2 + 'px', width: W + 'px', height: H + 'px' })
    const sch = el('div', 'telefono__schermo', t); img = el('img', '', sch); img.src = cfg.img
    if (cfg.testata) { const b = el('img', 'telefono__barra', sch); b.src = cfg.testata }
    if (cfg.piede) { const b = el('img', 'telefono__barra telefono__barra--piede', sch); b.src = cfg.piede }
    scala = (W - 14) / 390
  } else {
    const W = cfg.larga ?? 880; const H = Math.round(W * (cfg.rapporto ?? 0.625)); const X = (1000 - W) / 2; const Y = (1000 - H) / 2
    const fin = el('div', 'finestra' + (cfg.scura ? ' finestra--scura' : ''), tela, { left: X + 'px', top: Y + 'px', width: W + 'px', height: H + 'px', borderRadius: (cfg.raggio ?? 14) + 'px' })
    img = el('img', '', fin); img.src = cfg.img
    scala = W / (cfg.paginaLarga ?? 1440)
    if (cfg.fissa) { const b = el('img', 'finestra__fissa', fin); b.src = cfg.fissa.img; b.style.width = cfg.fissa.w * scala + 'px' }
    if (cfg.cursore !== false) { cur = cursore(tela, cfg.cursoreChiaro); cur._x = X + W * 0.72; cur._y = Y + H * 0.6 }
  }
  // il percorso: da una sosta all'altra, poi di corsa in cima
  const soste = cfg.soste; const pausa = cfg.pausa ?? 0.4; const vel = cfg.velocita ?? 900; const ritorno = cfg.ritorno ?? 1.4
  const tratti = []; let quando = cfg.attesa ?? 0.6
  for (let i = 0; i < soste.length - 1; i++) { const d = stringi(Math.abs(soste[i + 1] - soste[i]) / vel, 0.9, 2.4); tratti.push({ da: soste[i], a: soste[i + 1], t0: quando, t1: quando + d, ease: 'io3' }); quando += d + pausa }
  tratti.push({ da: soste[soste.length - 1], a: soste[0], t0: quando, t1: quando + ritorno, ease: 'expoIO' }); quando += ritorno
  const T = quando
  return {
    durata: T,
    disegna (t) {
      let y = soste[0]
      for (const s of tratti) { if (t >= s.t0) y = misto(s.da, s.a, tratto(t, s.t0, s.t1, s.ease)) }
      img.style.transform = `translate3d(0, ${-y * scala}px, 0)`
      f.muovi(t / T)
      if (cur) { cur.style.opacity = tratto(t, 0.2, 0.6, 'io2') * (1 - tratto(t, T - ritorno - 0.2, T - ritorno + 0.2, 'io2')); cur.style.transform = `translate3d(${cur._x + Math.sin(t * 0.9) * 26}px, ${cur._y + Math.cos(t * 0.7) * 18}px, 0)` }
    }
  }
}

/* === F · LA PARETE VIVA: colonne di schermi viste di sbieco, una sale e una scende ============== */
function scenaPareteViva (tela, cfg) {
  const f = fondo(tela, cfg.fondo)
  const p = el('div', 'parete', tela)
  const W = cfg.largo ?? 250; const H = Math.round(W * (cfg.rapporto ?? 844 / 390)); const sx = W + (cfg.spazio ?? 34); const sy = H + (cfg.spazio ?? 34)
  const T = cfg.durata ?? 12; const quante = cfg.quante ?? 7; const meta = Math.floor(quante / 2)
  const piste = []
  for (let c = -meta; c <= meta; c++) {
    const col = cfg.colonne[(((c + meta) % cfg.colonne.length) + cfg.colonne.length) % cfg.colonne.length]; const n = col.length
    const pista = el('div', 'parete__colonna', p, { left: c * sx + 'px', top: '0px', width: W + 'px' })
    for (let k = -n; k < 2 * n; k++) {
      const s = col[((k % n) + n) % n]
      const b = el('div', 'parete__schermo', pista, { left: '0px', top: k * sy + 'px', width: W + 'px', height: H + 'px', borderRadius: (cfg.raggio ?? 26) + 'px' })
      const i = el('img', '', b); i.src = s.img; i.style.transform = `translate3d(0, ${-(s.y ?? 0) * W / (cfg.paginaLarga ?? 390)}px, 0)`
    }
    piste.push({ pista, giro: n * sy, verso: ((c % 2) + 2) % 2 ? 1 : -1, sfaso: (((c * 0.37) % 1) + 1) % 1 })
  }
  const n0 = cfg.colonne[0].length
  const cx = W / 2; const cy = n0 * sy / 2
  p.style.transformOrigin = `${cx}px ${cy}px`
  p.style.transform = `translate(${500 - cx}px, ${500 - cy}px) rotateX(${cfg.rx ?? 54}deg) rotateZ(${cfg.rz ?? -36}deg) scale(${cfg.scala ?? 1.05})`
  return {
    durata: T,
    disegna (t) {
      piste.forEach((c) => { const fase = ((t / T) + c.sfaso) % 1; c.pista.style.transform = `translate3d(0, ${c.verso * fase * c.giro - (c.verso > 0 ? c.giro : 0)}px, 0)` })
      f.muovi(t / T)
    }
  }
}

/* === G · L'INSIEME VIVO: la tavoletta che cambia schermata e il telefono che scorre ============= */
function scenaInsiemeVivo (tela, cfg) {
  const f = fondo(tela, cfg.fondo)
  const T = cfg.durata ?? 10
  const pezzi = cfg.pezzi.map((z) => {
    const b = el('div', z.tipo, tela, { left: z.x + 'px', top: z.y + 'px', width: z.w + 'px', height: z.h + 'px', ...(z.raggio ? { borderRadius: z.raggio + 'px' } : {}), ...(z.cornice ? { padding: z.cornice + 'px' } : {}) })
    const dentro = (z.tipo === 'telefono' || z.tipo === 'tavoletta') ? el('div', z.tipo + '__schermo', b) : b
    const larga = z.tipo === 'telefono' ? (z.w - 14) / 390 : (z.w - (z.cornice ?? 0) * 2) / (z.paginaLarga ?? 1440)
    const imgs = (z.stati || [z.img]).map((src, i) => { const im = el('img', '', dentro); im.src = src; im.style.opacity = i === 0 ? 1 : 0; return im })
    if (z.testata) { const t = el('img', 'telefono__barra', dentro); t.src = z.testata }
    if (z.piede) { const t = el('img', 'telefono__barra telefono__barra--piede', dentro); t.src = z.piede }
    let dito = null
    if (z.tocchi) dito = el('div', 'dito', dentro)
    return { z, b, imgs, larga, dito }
  })
  return {
    durata: T,
    disegna (t) {
      pezzi.forEach(({ z, b, imgs, larga, dito }) => {
        if (z.scorri) { // va e torna, senza strappi
          const k = (1 - Math.cos((t / T) * Math.PI * 2)) / 2
          imgs[0].style.transform = `translate3d(0, ${-misto(z.scorri[0], z.scorri[1], E.io2(k)) * larga}px, 0)`
        } else if (z.sy) imgs[0].style.transform = `translate3d(0, ${-z.sy * larga}px, 0)`
        if (z.stati && z.tocchi) {
          const n = z.tocchi.length; const primo = z.primo ?? 0.8; const passo = (T - primo - (z.resta ?? 1.6) - 0.7) / n
          let stato = 0; z.tocchi.forEach((_, i) => { if (t >= primo + i * passo + 0.34) stato = i + 1 })
          const sfuma = tratto(t, T - 0.7, T, 'io2')
          imgs.forEach((im, i) => { im.style.opacity = i === stato ? 1 : 0; im.style.zIndex = 0 })
          if (sfuma > 0) { imgs[0].style.opacity = 1; imgs[stato].style.opacity = 1 - sfuma; imgs[stato].style.zIndex = 1 }
          let vis = 0; let sc = 1; let x = 0; let y = 0
          z.tocchi.forEach((p, i) => { const t0 = primo + i * passo; if (t >= t0 - 0.02 && t < t0 + 0.75) { x = p[0] * larga; y = p[1] * larga; const entra = tratto(t, t0, t0 + 0.22, 'out3'); const preme = tratto(t, t0 + 0.2, t0 + 0.34, 'io2'); const esce = tratto(t, t0 + 0.36, t0 + 0.72, 'out3'); vis = entra * (1 - esce); sc = misto(1.5, 1, entra) - 0.22 * preme * (1 - esce) + 0.9 * esce } })
          dito.style.opacity = vis * 0.9; dito.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${sc})`
        }
        if (z.dondola) b.style.transform = `translate3d(0, ${Math.sin((t / T) * Math.PI * 2 + (z.fase ?? 0)) * z.dondola}px, 0)`
      })
      f.muovi(t / T)
    }
  }
}

const TIPI = { finestre: scenaFinestre, telefoni: scenaTelefoni, tocchi: scenaTocchi, pagina: scenaPagina, parete: scenaParete, insieme: scenaInsieme, scorrimento: scenaScorrimento, 'parete-viva': scenaPareteViva, 'insieme-vivo': scenaInsiemeVivo }
window.monta = async (nome) => {
  const cfg = window.SCENE[nome]; if (!cfg) throw new Error('scena sconosciuta: ' + nome)
  const tela = document.getElementById('tela'); tela.textContent = ''
  const scena = TIPI[cfg.tipo](tela, cfg)
  await Promise.all([...tela.querySelectorAll('img')].map((i) => (i.decode ? i.decode().catch(() => {}) : Promise.resolve())))
  window.disegna = (t) => scena.disegna(t)
  scena.disegna(0)
  return { durata: scena.durata, immagini: tela.querySelectorAll('img').length, rotte: [...tela.querySelectorAll('img')].filter((i) => !i.naturalWidth).map((i) => i.src) }
}

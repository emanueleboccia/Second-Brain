/* Le sedici scene: quattro per lavoro, nell'ordine in cui stanno nella riga.
   1 ferma · 2 video · 3 video · 4 ferma. I colori di fondo sono quelli del brand di ognuno. */
const W = (n) => `web/${n}.jpg`
window.SCENE = {
  /* ---------- La Masseria di Mezz'autunno · sito ---------- */
  'masseria-1': { tipo: 'pagina', img: W('masseria-d'), larga: 800, alto: 128, fondo: { base: '#F7EBD6', forme: [{ colore: '#F2B01E', x: 84, y: 14, r: 34, a: 0.5 }, { colore: '#D56A12', x: 8, y: 92, r: 30, a: 0.35 }], luce: { x: 30, y: 10, a: 0.5 }, grana: 0.06 } },
  'masseria-2': { tipo: 'finestre', fondo: { base: '#D56A12', forme: [{ colore: '#F2B01E', x: 80, y: 18, r: 40, a: 0.6 }, { colore: '#2B1A12', x: 6, y: 96, r: 36, a: 0.35 }], luce: { x: 25, y: 8, a: 0.2 }, grana: 0.08 }, cursoreChiaro: false,
    finestre: [{ img: W('masseria-d'), scorri: [0, 1040] }, { img: W('masseria-d'), scorri: [2760, 3780] }, { img: W('masseria-d'), scorri: [5440, 6120] }] },
  'masseria-3': { tipo: 'telefoni', fondo: { base: '#2B1A12', forme: [{ colore: '#D56A12', x: 16, y: 84, r: 42, a: 0.5 }, { colore: '#5C7A2E', x: 90, y: 10, r: 34, a: 0.4 }], luce: { x: 70, y: 0, a: 0.1 }, grana: 0.09 },
    schermi: [{ img: W('masseria-m'), y: 0, scorri: 260 }, { img: W('masseria-m'), y: 1200, scorri: 380 }, { img: W('masseria-m'), y: 2300, scorri: 400 }, { img: W('masseria-m'), y: 4200, scorri: 300 }] },
  'masseria-4': { tipo: 'parete', fondo: { base: '#5C7A2E', forme: [{ colore: '#F2B01E', x: 90, y: 90, r: 40, a: 0.4 }], luce: { x: 20, y: 10, a: 0.18 }, grana: 0.08 },
    schermi: [{ col: 0, riga: 0, img: W('masseria-m'), y: 1200 }, { col: 0, riga: 1, img: W('masseria-m'), y: 2300 }, { col: 1, riga: 0, img: W('masseria-m'), y: 0 }, { col: 1, riga: 1, img: W('masseria-m'), y: 4200 }, { col: 2, riga: 0, img: W('masseria-m'), y: 1700 }, { col: 2, riga: 1, img: W('masseria-m'), y: 2900 }, { col: 1, riga: -1, img: W('masseria-m'), y: 3500 }, { col: 3, riga: 0, img: W('masseria-m'), y: 300 }, { col: -1, riga: 1, img: W('masseria-m'), y: 900 }] },

  /* ---------- Da Mamma Rosaria · gestionale degli eventi ---------- */
  'dmr-1': { tipo: 'pagina', img: W('dmr-mese-d'), larga: 820, alto: 140, fondo: { base: '#F09D28', forme: [{ colore: '#FBF1DD', x: 86, y: 12, r: 34, a: 0.5 }, { colore: '#FFFFFF', x: 6, y: 94, r: 30, a: 0.25 }], luce: { x: 30, y: 6, a: 0.22 }, grana: 0.07 } },
  'dmr-2': { tipo: 'finestre', fondo: { base: '#FBF1DD', forme: [{ colore: '#F09D28', x: 94, y: 6, r: 24, a: 0.4 }, { colore: '#FFFFFF', x: 10, y: 90, r: 40, a: 0.7 }], luce: { x: 30, y: 10, a: 0.6 }, grana: 0.05 },
    finestre: [{ img: W('dmr-mese-d'), scorri: [0, 640] }, { img: W('dmr-evento-d'), scorri: [0, 760] }, { img: W('dmr-conti-d'), scorri: [0, 520] }] },
  'dmr-3': { tipo: 'telefoni', chiaro: true, fondo: { base: '#F09D28', forme: [{ colore: '#FBF1DD', x: 14, y: 86, r: 40, a: 0.45 }, { colore: '#FFFFFF', x: 92, y: 8, r: 30, a: 0.3 }], luce: { x: 60, y: 0, a: 0.2 }, grana: 0.07 },
    schermi: [{ img: W('dmr-mese-m'), y: 0, scorri: 420, testata: W('dmr-testata') }, { img: W('dmr-evento-m'), y: 0, scorri: 520, testata: W('dmr-testata') }, { img: W('dmr-settimana-m'), y: 0, scorri: 380, testata: W('dmr-testata') }, { img: W('dmr-conti-m'), y: 0, scorri: 300, testata: W('dmr-testata') }] },
  'dmr-4': { tipo: 'parete', fondo: { base: '#FBF1DD', forme: [{ colore: '#F09D28', x: 88, y: 88, r: 42, a: 0.45 }], luce: { x: 20, y: 10, a: 0.5 }, grana: 0.06 },
    schermi: [{ col: 0, riga: 0, img: W('dmr-evento-m'), y: 0 }, { col: 0, riga: 1, img: W('dmr-settimana-m'), y: 380 }, { col: 1, riga: 0, img: W('dmr-mese-m'), y: 0 }, { col: 1, riga: 1, img: W('dmr-conti-m'), y: 0 }, { col: 2, riga: 0, img: W('dmr-mese-m'), y: 640 }, { col: 2, riga: 1, img: W('dmr-evento-m'), y: 700 }, { col: 1, riga: -1, img: W('dmr-settimana-m'), y: 0 }, { col: 3, riga: 0, img: W('dmr-conti-m'), y: 300 }, { col: -1, riga: 1, img: W('dmr-evento-m'), y: 1400 }] },

  /* ---------- Tenuta Don Gaetano · sito ---------- */
  'tenuta-1': { tipo: 'pagina', img: W('tenuta-d'), larga: 800, alto: 128, scura: true, fondo: { base: '#F4ECD6', forme: [{ colore: '#D8BD87', x: 86, y: 12, r: 36, a: 0.6 }, { colore: '#96825A', x: 6, y: 96, r: 30, a: 0.3 }], luce: { x: 30, y: 8, a: 0.5 }, grana: 0.06 } },
  'tenuta-2': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: { base: '#1A1613', forme: [{ colore: '#D8BD87', x: 82, y: 14, r: 38, a: 0.26 }, { colore: '#96825A', x: 8, y: 96, r: 34, a: 0.22 }], luce: { x: 30, y: 0, a: 0.08 }, grana: 0.1 },
    finestre: [{ img: W('tenuta-d'), scorri: [0, 880] }, { img: W('tenuta-d'), scorri: [1900, 2560] }, { img: W('tenuta-d'), scorri: [3500, 4300] }] },
  'tenuta-3': { tipo: 'telefoni', fondo: { base: '#D8BD87', forme: [{ colore: '#F4ECD6', x: 14, y: 14, r: 40, a: 0.6 }, { colore: '#96825A', x: 90, y: 92, r: 36, a: 0.45 }], luce: { x: 50, y: 0, a: 0.25 }, grana: 0.07 },
    schermi: [{ img: W('tenuta-m'), y: 0, scorri: 280 }, { img: W('tenuta-m'), y: 800, scorri: 420 }, { img: W('tenuta-m'), y: 1900, scorri: 480 }, { img: W('tenuta-m'), y: 3700, scorri: 500 }] },
  'tenuta-4': { tipo: 'parete', fondo: { base: '#96825A', forme: [{ colore: '#1A1613', x: 92, y: 92, r: 44, a: 0.45 }, { colore: '#D8BD87', x: 10, y: 8, r: 34, a: 0.4 }], luce: { x: 20, y: 10, a: 0.14 }, grana: 0.08 },
    schermi: [{ col: 0, riga: 0, img: W('tenuta-m'), y: 800 }, { col: 0, riga: 1, img: W('tenuta-m'), y: 2500 }, { col: 1, riga: 0, img: W('tenuta-m'), y: 0 }, { col: 1, riga: 1, img: W('tenuta-m'), y: 4300 }, { col: 2, riga: 0, img: W('tenuta-m'), y: 1900 }, { col: 2, riga: 1, img: W('tenuta-m'), y: 3100 }, { col: 1, riga: -1, img: W('tenuta-m'), y: 3700 }, { col: 3, riga: 0, img: W('tenuta-m'), y: 1300 }, { col: -1, riga: 1, img: W('tenuta-m'), y: 300 }] },

  /* ---------- Girarrosto Liberti · app degli ordini e sito menù ---------- */
  'girarrosto-1': { tipo: 'finestre', scura: true, cursore: false, fetta: 3.4, fondo: { base: '#161412', forme: [{ colore: '#6B2A12', x: 24, y: 10, r: 44, a: 0.6 }, { colore: '#128C4A', x: 88, y: 92, r: 38, a: 0.4 }], luce: { x: 50, y: 0, a: 0.06 }, grana: 0.1 },
    finestre: [{ img: W('girarrosto-d0'), scorri: [0, 620], dentro: { x: 784, y: 120, w: 388, h: 668, img: W('girarrosto-corpo') } }, { img: W('girarrosto-d0'), scorri: [1180, 1500], dentro: { x: 784, y: 120, w: 388, h: 668, img: W('girarrosto-corpo') } }] },
  'girarrosto-2': { tipo: 'tocchi', immagine: [1132, 816], fondo: { base: '#161412', forme: [{ colore: '#128C4A', x: 84, y: 14, r: 40, a: 0.5 }, { colore: '#6B2A12', x: 10, y: 92, r: 38, a: 0.55 }], luce: { x: 40, y: 0, a: 0.07 }, grana: 0.1 },
    stati: [0, 1, 2, 3, 4, 5, 6].map((i) => W('ordini-' + i)),
    tocchi: [[122, 327], [566, 327], [175, 248], [566, 327], [289, 248], [122, 327]] },
  'girarrosto-3': { tipo: 'telefoni', fondo: { base: '#F3F1EB', forme: [{ colore: '#25D366', x: 88, y: 12, r: 36, a: 0.35 }, { colore: '#161412', x: 8, y: 96, r: 34, a: 0.12 }], luce: { x: 30, y: 0, a: 0.5 }, grana: 0.06 },
    schermi: [{ img: W('girarrosto-m'), y: 0, scorri: 280, testata: W('girarrosto-testata'), piede: W('girarrosto-piede') }, { img: W('girarrosto-m'), y: 700, scorri: 300, testata: W('girarrosto-testata'), piede: W('girarrosto-piede') }, { img: W('girarrosto-m'), y: 1300, scorri: 200, testata: W('girarrosto-testata'), piede: W('girarrosto-piede') }, { img: W('girarrosto-m'), y: 3300, scorri: 380, testata: W('girarrosto-testata'), piede: W('girarrosto-piede') }] },
  'girarrosto-4': { tipo: 'insieme', fondo: { base: '#25D366', forme: [{ colore: '#128C4A', x: 90, y: 90, r: 46, a: 0.7 }, { colore: '#F3F1EB', x: 8, y: 6, r: 30, a: 0.35 }], luce: { x: 25, y: 5, a: 0.2 }, grana: 0.08 },
    pezzi: [{ tipo: 'tavoletta', x: 60, y: 210, w: 760, h: 562, cornice: 12, img: W('ordini-6'), paginaLarga: 1132 }, { tipo: 'telefono', x: 640, y: 330, w: 272, h: 589, img: W('girarrosto-m'), sy: 700 }] }
}

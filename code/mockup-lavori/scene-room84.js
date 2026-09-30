/* Room84, il sito rifatto il 29/09/2026: quattro scene per l'elenco e sei per la pagina del progetto.
   Le schermate vengono dalla copia sul Mac, col movimento ridotto, che mostra il sito fermo e completo.
   Restano fuori le recensioni, che portano i nomi degli ospiti, nel piede la riga col codice fiscale,
   e la cima di «Chi siamo», che nomina i titolari.
   Le misure: la home è alta 10.358 dal computer e 11.827 dal telefono. */
;(() => {
  const W = (n) => `web/${n}.jpg`
  const S = window.SCENE
  const colonne = (img, ys) => ys.map((col) => col.map((y) => ({ img: Array.isArray(y) ? W(y[0]) : img, y: Array.isArray(y) ? y[1] : y })))
  /* i fondi: la notte, il crema e il bronzo del suo sito */
  const R = {
    notte: { base: '#1A1816', forme: [{ colore: '#A58661', x: 84, y: 14, r: 40, a: 0.42 }, { colore: '#7C6143', x: 8, y: 94, r: 38, a: 0.4 }], luce: { x: 30, y: 0, a: 0.08 }, grana: 0.1 },
    crema: { base: '#FFF8F0', forme: [{ colore: '#A58661', x: 88, y: 12, r: 34, a: 0.35 }, { colore: '#E9DCCB', x: 6, y: 96, r: 34, a: 0.7 }], luce: { x: 30, y: 8, a: 0.55 }, grana: 0.05 },
    bronzo: { base: '#A58661', forme: [{ colore: '#FFF8F0', x: 12, y: 10, r: 38, a: 0.4 }, { colore: '#1A1816', x: 92, y: 94, r: 40, a: 0.4 }], luce: { x: 45, y: 0, a: 0.2 }, grana: 0.07 },
    sabbia: { base: '#E9DCCB', forme: [{ colore: '#FFF8F0', x: 14, y: 12, r: 38, a: 0.7 }, { colore: '#A58661', x: 90, y: 92, r: 38, a: 0.45 }], luce: { x: 50, y: 0, a: 0.3 }, grana: 0.06 }
  }
  const telefoni = [{ img: W('room84-m'), y: 0, scorri: 480 }, { img: W('room84-m'), y: 2080, scorri: 380 }, { img: W('room84-camere-m'), y: 1347, scorri: 520 }, { img: W('room84-dintorni-m'), y: 0, scorri: 480 }]

  Object.assign(S, {
    'r84-1': { tipo: 'pagina', img: W('room84-d'), larga: 800, alto: 128, scura: true, fondo: R.sabbia },
    'r84-2': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: R.notte,
      finestre: [{ img: W('room84-d'), scorri: [0, 924] }, { img: W('room84-d'), scorri: [1904, 2260] }, { img: W('room84-camere-d'), scorri: [0, 975] }] },
    'r84-3': { tipo: 'telefoni', fondo: R.crema, schermi: telefoni },
    'r84-4': { tipo: 'parete', fondo: R.bronzo,
      schermi: [{ col: 0, riga: 0, img: W('room84-m'), y: 2080 }, { col: 0, riga: 1, img: W('room84-camere-m'), y: 1347 }, { col: 1, riga: 0, img: W('room84-m'), y: 0 }, { col: 1, riga: 1, img: W('room84-m'), y: 2931 }, { col: 2, riga: 0, img: W('room84-dintorni-m'), y: 0 }, { col: 2, riga: 1, img: W('room84-m'), y: 5318 }, { col: 1, riga: -1, img: W('room84-gallery-m'), y: 0 }, { col: 3, riga: 0, img: W('room84-contatti-m'), y: 0 }, { col: -1, riga: 1, img: W('room84-camere-m'), y: 3980 }] },

    'caso-r84-1': { tipo: 'scorrimento', img: W('room84-d'), scura: true, cursoreChiaro: true, fondo: R.sabbia, soste: [0, 924, 1904, 3146, 4180, 5365, 6643, 8849] },
    'caso-r84-2': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: R.notte,
      finestre: [{ img: W('room84-d'), scorri: [0, 924] }, { img: W('room84-d'), scorri: [1904, 2260] }, { img: W('room84-d'), scorri: [3146, 3700] }] },
    'caso-r84-3': { tipo: 'telefoni', fondo: R.crema, schermi: telefoni },
    'caso-r84-4': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: R.bronzo,
      finestre: [{ img: W('room84-camere-d'), scorri: [975, 1900] }, { img: W('room84-gallery-d'), scorri: [0, 900] }, { img: W('room84-dintorni-d'), scorri: [0, 900] }] },
    'caso-r84-5': { tipo: 'parete-viva', fondo: R.sabbia, durata: 14,
      colonne: colonne(W('room84-m'), [[0, 2080, ['room84-camere-m', 1347]], [['room84-dintorni-m', 0], 2931, ['room84-gallery-m', 0]], [['room84-camere-m', 3980], ['room84-contatti-m', 0], 5318]]) },
    'caso-r84-6': { tipo: 'scorrimento', dispositivo: 'telefono', img: W('room84-m'), fondo: R.notte, soste: [0, 1049, 2080, 2931, 5318, 7546, 9749] }
  })
})()

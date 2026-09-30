/* I due lavori aggiunti il 29/09/2026: il gestionale della Masseria e il sito di Da Mamma Rosaria.
   Quattro scene per l'elenco e sei per la pagina del progetto, come gli altri.
   Il gestionale è fotografato dalla copia del database coi soli dati inventati.
   La home del sito è quella di cattura-dmrsito-home.cjs, senza la sezione della famiglia e senza le
   recensioni firmate: le misure qui sotto valgono per quella, alta 6641 dal computer e 8120 dal telefono. */
;(() => {
  const W = (n) => `web/${n}.jpg`
  const S = window.SCENE
  const barra = (n) => ({ img: W('gm-barra-' + n), w: 256 })
  const testa = W('gm-testata')
  const colonne = (img, ys) => ys.map((col) => col.map((y) => ({ img: Array.isArray(y) ? W(y[0]) : img, y: Array.isArray(y) ? y[1] : y })))

  /* i fondi: quelli della Masseria, girati sul verde delle scuole e sul marrone */
  const M = {
    verde: { base: '#5C7A2E', forme: [{ colore: '#F2B01E', x: 86, y: 12, r: 36, a: 0.45 }, { colore: '#2B1A12', x: 8, y: 94, r: 34, a: 0.35 }], luce: { x: 28, y: 6, a: 0.18 }, grana: 0.08 },
    crema: { base: '#F7EBD6', forme: [{ colore: '#5C7A2E', x: 90, y: 10, r: 30, a: 0.3 }, { colore: '#D56A12', x: 8, y: 92, r: 34, a: 0.3 }], luce: { x: 30, y: 10, a: 0.55 }, grana: 0.05 },
    marrone: { base: '#2B1A12', forme: [{ colore: '#5C7A2E', x: 14, y: 86, r: 42, a: 0.5 }, { colore: '#F2B01E', x: 90, y: 10, r: 32, a: 0.35 }], luce: { x: 70, y: 0, a: 0.1 }, grana: 0.09 },
    giallo: { base: '#F2B01E', forme: [{ colore: '#F7EBD6', x: 12, y: 12, r: 38, a: 0.5 }, { colore: '#D56A12', x: 90, y: 92, r: 40, a: 0.5 }], luce: { x: 40, y: 0, a: 0.2 }, grana: 0.07 }
  }
  /* i fondi del sito di Mamma Rosaria: il marrone, il tabacco e l'arancio del suo sito */
  const D = {
    scuro: { base: '#301C00', forme: [{ colore: '#F09D28', x: 84, y: 14, r: 40, a: 0.4 }, { colore: '#774F03', x: 8, y: 94, r: 38, a: 0.55 }], luce: { x: 30, y: 0, a: 0.08 }, grana: 0.1 },
    tabacco: { base: '#C2AB85', forme: [{ colore: '#FBF1DD', x: 12, y: 12, r: 38, a: 0.55 }, { colore: '#774F03', x: 92, y: 92, r: 38, a: 0.4 }], luce: { x: 50, y: 0, a: 0.25 }, grana: 0.07 },
    crema: { base: '#FBF1DD', forme: [{ colore: '#C2AB85', x: 88, y: 12, r: 36, a: 0.55 }, { colore: '#F09D28', x: 6, y: 96, r: 28, a: 0.3 }], luce: { x: 30, y: 8, a: 0.55 }, grana: 0.05 },
    marrone: { base: '#774F03', forme: [{ colore: '#F09D28', x: 90, y: 90, r: 42, a: 0.45 }, { colore: '#301C00', x: 8, y: 8, r: 36, a: 0.4 }], luce: { x: 25, y: 8, a: 0.14 }, grana: 0.08 }
  }

  const gmTelefoni = [{ img: W('gm-mese-m'), y: 0, scorri: 460, testata: testa }, { img: W('gm-gita-m'), y: 0, scorri: 520, testata: testa }, { img: W('gm-email-m'), y: 150, scorri: 520, testata: testa }, { img: W('gm-conti-m'), y: 0, scorri: 380, testata: testa }]
  const dmrTelefoni = [{ img: W('dmrsito-m'), y: 0, scorri: 460 }, { img: W('dmrsito-m'), y: 1880, scorri: 420 }, { img: W('dmrsito-eventi-m'), y: 0, scorri: 460 }, { img: W('dmrsito-ambienti-m'), y: 700, scorri: 480 }]

  Object.assign(S, {
    /* ---------- La Masseria di Mezz'autunno · il gestionale ---------- */
    'gm-1': { tipo: 'pagina', img: W('gm-mese-d'), larga: 820, alto: 140, fondo: M.verde },
    'gm-2': { tipo: 'finestre', fondo: M.crema, cursoreChiaro: false,
      finestre: [{ img: W('gm-mese-d'), scorri: [0, 620], fissa: barra('mese') }, { img: W('gm-campagna-d'), scorri: [0, 900], fissa: barra('campagna') }, { img: W('gm-conti-d'), scorri: [0, 640], fissa: barra('conti') }] },
    'gm-3': { tipo: 'telefoni', chiaro: true, fondo: M.marrone, schermi: gmTelefoni },
    'gm-4': { tipo: 'parete', fondo: M.giallo,
      schermi: [{ col: 0, riga: 0, img: W('gm-gita-m'), y: 0 }, { col: 0, riga: 1, img: W('gm-conti-m'), y: 300 }, { col: 1, riga: 0, img: W('gm-mese-m'), y: 0 }, { col: 1, riga: 1, img: W('gm-email-m'), y: 150 }, { col: 2, riga: 0, img: W('gm-scuole-m'), y: 0 }, { col: 2, riga: 1, img: W('gm-festa-m'), y: 0 }, { col: 1, riga: -1, img: W('gm-settimana-m'), y: 0 }, { col: 3, riga: 0, img: W('gm-scuola-m'), y: 0 }, { col: -1, riga: 1, img: W('gm-inviti-m'), y: 500 }] },

    'caso-gm-1': { tipo: 'scorrimento', img: W('gm-mese-d'), fissa: barra('mese'), fondo: M.verde, soste: [0, 660, 1300, 2000] },
    'caso-gm-2': { tipo: 'finestre', fondo: M.crema, cursoreChiaro: false,
      finestre: [{ img: W('gm-mese-d'), scorri: [0, 620], fissa: barra('mese') }, { img: W('gm-gita-d'), scorri: [0, 900], fissa: barra('gita') }, { img: W('gm-conti-d'), scorri: [0, 640], fissa: barra('conti') }] },
    'caso-gm-3': { tipo: 'telefoni', chiaro: true, fondo: M.marrone, schermi: gmTelefoni },
    'caso-gm-4': { tipo: 'scorrimento', img: W('gm-campagna-d'), fissa: barra('campagna'), fondo: M.giallo, soste: [0, 560, 1200, 1900, 2700] },
    'caso-gm-5': { tipo: 'parete-viva', fondo: M.crema, durata: 14,
      colonne: colonne(W('gm-mese-m'), [[0, ['gm-gita-m', 0], ['gm-conti-m', 300]], [['gm-email-m', 150], 900, ['gm-scuole-m', 0]], [['gm-festa-m', 0], ['gm-settimana-m', 0], ['gm-scuola-m', 0]]]) },
    'caso-gm-6': { tipo: 'finestre', fondo: M.verde, cursoreChiaro: false,
      finestre: [{ img: W('gm-scuola-d'), scorri: [0, 900], fissa: barra('scuola') }, { img: W('gm-inviti-d'), scorri: [0, 170], fissa: barra('inviti') }, { img: W('gm-giorno-d'), scorri: [0, 700], fissa: barra('giorno') }] },

    /* ---------- Da Mamma Rosaria · il sito ---------- */
    'dmrsito-1': { tipo: 'pagina', img: W('dmrsito-eventi-d'), larga: 800, alto: 128, scura: true, fondo: D.tabacco },
    'dmrsito-2': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: D.scuro,
      finestre: [{ img: W('dmrsito-d'), scorri: [0, 940] }, { img: W('dmrsito-d'), scorri: [1720, 2300] }, { img: W('dmrsito-eventi-d'), scorri: [0, 900] }] },
    'dmrsito-3': { tipo: 'telefoni', fondo: D.crema, schermi: dmrTelefoni },
    'dmrsito-4': { tipo: 'parete', fondo: D.marrone,
      schermi: [{ col: 0, riga: 0, img: W('dmrsito-m'), y: 1880 }, { col: 0, riga: 1, img: W('dmrsito-ambienti-m'), y: 700 }, { col: 1, riga: 0, img: W('dmrsito-m'), y: 0 }, { col: 1, riga: 1, img: W('dmrsito-eventi-m'), y: 0 }, { col: 2, riga: 0, img: W('dmrsito-dispensa-m'), y: 0 }, { col: 2, riga: 1, img: W('dmrsito-m'), y: 3580 }, { col: 1, riga: -1, img: W('dmrsito-angoli-m'), y: 0 }, { col: 3, riga: 0, img: W('dmrsito-contatti-m'), y: 0 }, { col: -1, riga: 1, img: W('dmrsito-eventi-m'), y: 1800 }] },

    'caso-dmrsito-1': { tipo: 'scorrimento', img: W('dmrsito-d'), scura: true, cursoreChiaro: true, fondo: D.tabacco, soste: [0, 940, 1720, 2300, 2980, 3480, 4900, 5650] },
    'caso-dmrsito-2': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: D.scuro,
      finestre: [{ img: W('dmrsito-d'), scorri: [0, 940] }, { img: W('dmrsito-d'), scorri: [1720, 2300] }, { img: W('dmrsito-d'), scorri: [2980, 3480] }] },
    'caso-dmrsito-3': { tipo: 'telefoni', fondo: D.crema, schermi: dmrTelefoni },
    'caso-dmrsito-4': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: D.marrone,
      finestre: [{ img: W('dmrsito-eventi-d'), scorri: [0, 900] }, { img: W('dmrsito-ambienti-d'), scorri: [0, 1000] }, { img: W('dmrsito-dispensa-d'), scorri: [0, 900] }] },
    'caso-dmrsito-5': { tipo: 'parete-viva', fondo: D.tabacco, durata: 14,
      colonne: colonne(W('dmrsito-m'), [[0, 1880, ['dmrsito-eventi-m', 0]], [['dmrsito-ambienti-m', 700], 3580, ['dmrsito-dispensa-m', 0]], [['dmrsito-angoli-m', 0], ['dmrsito-contatti-m', 0], 5817]]) },
    'caso-dmrsito-6': { tipo: 'scorrimento', dispositivo: 'telefono', img: W('dmrsito-m'), fondo: D.scuro, soste: [0, 927, 2116, 2982, 3561, 4885, 6531] }
  })
})()

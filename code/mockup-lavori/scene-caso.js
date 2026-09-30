/* Le ventiquattro anteprime delle pagine dei progetti: sei per lavoro, tutte in movimento.
   Riusano i fondi e le scene dell'elenco, e ne aggiungono di nuove. */
;(() => {
  const W = (n) => `web/${n}.jpg`
  const S = window.SCENE
  const F = { // i fondi, uno per brand e per tono
    masseriaArancio: S['masseria-2'].fondo, masseriaScuro: S['masseria-3'].fondo, masseriaVerde: S['masseria-4'].fondo, masseriaChiaro: S['masseria-1'].fondo,
    dmrChiaro: S['dmr-2'].fondo, dmrArancio: S['dmr-3'].fondo, dmrPieno: S['dmr-1'].fondo,
    tenutaScuro: S['tenuta-2'].fondo, tenutaOro: S['tenuta-3'].fondo, tenutaMuto: S['tenuta-4'].fondo, tenutaChiaro: S['tenuta-1'].fondo,
    girScuro: S['girarrosto-1'].fondo, girScuro2: S['girarrosto-2'].fondo, girChiaro: S['girarrosto-3'].fondo, girVerde: S['girarrosto-4'].fondo
  }
  const barra = (n) => ({ img: W('dmr-barra-' + n), w: 256 })
  const gir = { testata: W('girarrosto-testata'), piede: W('girarrosto-piede') }
  const colonne = (img, ys) => ys.map((col) => col.map((y) => ({ img: Array.isArray(y) ? W(y[0]) : img, y: Array.isArray(y) ? y[1] : y })))

  Object.assign(S, {
    /* ---------- La Masseria di Mezz'autunno ---------- */
    'caso-masseria-1': { tipo: 'scorrimento', img: W('masseria-d'), fondo: F.masseriaChiaro, soste: [0, 1040, 2760, 3780, 5440, 6900, 8100] },
    'caso-masseria-2': { ...S['masseria-2'] },
    'caso-masseria-3': { ...S['masseria-3'] },
    'caso-masseria-4': { tipo: 'finestre', fondo: F.masseriaVerde, cursoreChiaro: false,
      finestre: [{ img: W('masseria-scuole-d'), scorri: [0, 700] }, { img: W('masseria-zucche-d'), scorri: [0, 760] }, { img: W('masseria-chi-d'), scorri: [0, 560] }] },
    'caso-masseria-5': { tipo: 'parete-viva', fondo: F.masseriaArancio, durata: 14,
      colonne: colonne(W('masseria-m'), [[0, 1200, 2300], [['masseria-zucche-m', 0], 4200, ['masseria-scuole-m', 0]], [1700, 2900, ['masseria-chi-m', 0]]]) },
    'caso-masseria-6': { tipo: 'scorrimento', dispositivo: 'telefono', img: W('masseria-m'), fondo: F.masseriaScuro, soste: [0, 900, 1700, 2900, 4200], velocita: 700 },

    /* ---------- Da Mamma Rosaria ---------- */
    'caso-dmr-1': { tipo: 'scorrimento', img: W('dmr-mese-d'), fissa: barra('mese'), fondo: F.dmrPieno, soste: [0, 640, 1300, 2000] },
    'caso-dmr-2': { ...S['dmr-2'], finestre: [{ img: W('dmr-mese-d'), scorri: [0, 640], fissa: barra('mese') }, { img: W('dmr-evento-d'), scorri: [0, 760], fissa: barra('evento') }, { img: W('dmr-conti-d'), scorri: [0, 520], fissa: barra('conti') }] },
    'caso-dmr-3': { ...S['dmr-3'] },
    'caso-dmr-4': { tipo: 'scorrimento', img: W('dmr-evento-d'), fissa: barra('evento'), fondo: F.dmrChiaro, soste: [0, 760, 1500, 2100, 2480] },
    'caso-dmr-5': { tipo: 'parete-viva', fondo: F.dmrChiaro, durata: 14,
      colonne: colonne(W('dmr-mese-m'), [[0, ['dmr-evento-m', 0], ['dmr-conti-m', 0]], [['dmr-settimana-m', 0], 640, ['dmr-evento-m', 700]], [['dmr-evento-m', 1400], ['dmr-settimana-m', 380], 1300]]) },
    'caso-dmr-6': { tipo: 'finestre', fondo: F.dmrArancio,
      finestre: [{ img: W('dmr-comanda-d'), scorri: [0, 260] }, { img: W('dmr-inviti-d'), scorri: [0, 100], fissa: barra('inviti') }, { img: W('dmr-giorno-d'), scorri: [0, 480], fissa: barra('giorno') }] },

    /* ---------- Tenuta Don Gaetano ---------- */
    'caso-tenuta-1': { tipo: 'scorrimento', img: W('tenuta-d'), scura: true, cursoreChiaro: true, fondo: F.tenutaChiaro, soste: [0, 880, 1900, 3500, 5400, 6300, 8400, 9500] },
    'caso-tenuta-2': { ...S['tenuta-2'] },
    'caso-tenuta-3': { ...S['tenuta-3'] },
    'caso-tenuta-4': { tipo: 'finestre', scura: true, cursoreChiaro: true, fondo: F.tenutaMuto,
      finestre: [{ img: W('tenuta-d'), scorri: [4300, 5400] }, { img: W('tenuta-d'), scorri: [6300, 7000] }, { img: W('tenuta-d'), scorri: [7500, 8400] }] },
    'caso-tenuta-5': { tipo: 'parete-viva', fondo: F.tenutaScuro, durata: 14,
      colonne: colonne(W('tenuta-m'), [[0, 800, 1900], [2500, 4300, 300], [3100, 1300, 3700]]) },
    'caso-tenuta-6': { tipo: 'scorrimento', dispositivo: 'telefono', img: W('tenuta-m'), fondo: F.tenutaOro, soste: [0, 800, 1900, 3100, 4300], velocita: 700 },

    /* ---------- Girarrosto Liberti ---------- */
    'caso-girarrosto-1': { ...S['girarrosto-1'],
      finestre: [{ img: W('girarrosto-d0'), scorri: [0, 620], dentro: { x: 784, y: 120, w: 388, h: 668, img: W('girarrosto-corpo') } }, { img: W('girarrosto-d0'), scorri: [1180, 1700], dentro: { x: 784, y: 120, w: 388, h: 668, img: W('girarrosto-corpo') } }, { img: W('girarrosto-d0'), scorri: [3250, 3900], dentro: { x: 784, y: 120, w: 388, h: 668, img: W('girarrosto-corpo') } }] },
    'caso-girarrosto-2': { ...S['girarrosto-2'] },
    'caso-girarrosto-3': { ...S['girarrosto-3'] },
    'caso-girarrosto-4': { tipo: 'insieme-vivo', fondo: F.girVerde, durata: 11,
      pezzi: [{ tipo: 'tavoletta', x: 50, y: 214, w: 770, h: 569, cornice: 12, paginaLarga: 1132, stati: [0, 1, 2, 3, 4, 5, 6].map((i) => W('ordini-' + i)), tocchi: [[122, 327], [566, 327], [175, 248], [566, 327], [289, 248], [122, 327]] },
        { tipo: 'telefono', x: 648, y: 300, w: 288, h: 623, img: W('girarrosto-m'), scorri: [700, 1560], ...gir }] },
    'caso-girarrosto-5': { tipo: 'parete-viva', fondo: F.girScuro2, durata: 14,
      colonne: colonne(W('girarrosto-m'), [[0, 700, 1300], [1520, 3300, 300], [3650, 1000, 4050]]) },
    'caso-girarrosto-6': { tipo: 'scorrimento', dispositivo: 'telefono', img: W('girarrosto-m'), fondo: F.girChiaro, soste: [0, 700, 1520, 2400, 3300, 4050], velocita: 760, ...gir }
  })
})()

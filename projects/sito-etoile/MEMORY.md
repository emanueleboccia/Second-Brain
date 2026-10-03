# Memory — Il sito nuovo di L'Étoile

Aperto il 02/10/2026, quando Emanuele ha detto «dobbiamo fare un gran lavorone con questo sito». Il cliente sta
in `entities/clienti/l-etoile/`, il lavoro in `sito.md`, il prima fotografato per il reel in
`projects/personal-brand/girato-etoile.md`.

## 02/10/2026 — Da dove si parte

- **Il problema, detto da Emanuele:** nessuno in negozio è dedicato al sito, e il sito muore. Quindi il lavoro è
  doppio: sito nuovo e **assistente di magazzino a cui si parla**, «come se fossi un dipendente».
- **Piattaforma non decisa.** Emanuele non sa se resta Shopify, perché per loro la gestione del magazzino lì non
  è semplice. La proposta è tenere Shopify come motore per il connettore ufficiale con Claude, uscito a maggio
  2026, e rifare tutto il tema. Sarebbe un'eccezione alla decisione «e-commerce su WordPress» del 26/08/2026.
- **Le idee di Emanuele per il sito:** una home che chiede dove vuoi andare e ti accompagna; mondi con
  un'estetica propria; **Voyage con una valigia che si riempie di prodotti da viaggio e sblocca uno sconto**;
  **una pagina tutta per l'uomo**, col lavoro e lo stile di Piquadro, «per me sarebbe fighissimo avere una sezione
  dedicata a me».
- **I pubblici sono cinque**, li ha elencati lui: chi fa un regalo, l'uomo che si dedica qualcosa, la donna che
  cerca la sua borsa, i profumi, chi viaggia. Voyage l'hanno già voluto separato loro, aprendo il negozio.
- **Il prima è fotografato**, chiesto da Emanuele per i reel futuri: sta in `code/remotion-test/public/pb-etoile/`
  ed è copiato sull'SSD dal 03/10/2026, in `04-PERSONAL-BRAND/1-girato/l-etoile/`: ventun file, identici.
- Al cliente non è stato ancora mostrato niente.

## 02/10/2026, sera — Il primo prototipo

- **Chiesto da Emanuele:** «se volessi vedere una prova del sito, come verrebbe?», estetica e funzionamento,
  non il magazzino. Fatto e cliccabile: home col bivio, Donna, Uomo, Voyage con la valigia, Beauty col Parfum
  Bar, Regali in tre passi, Marchi, scheda prodotto, carrello, ricerca, pagina del negozio.
- **Dove sta:** `~/Desktop/progetti/etoile/`, fuori dal vault. Il sito è in `sito/`, si apre con la
  configurazione `etoile` di `.claude/launch.json`, su 127.0.0.1:8086. I dati vengono dal catalogo del 02/10
  con `prepara-dati.py`, che fa in piccolo il riordino vero: marca, nome leggibile, mondo, categoria, colore,
  misure. Non è un repository git.
- **Lo stile è il lussuoso, ancora come proposta.** Il loro Playfair Display, il marrone `#4C3F41`, e **l'arco
  delle loro foto Instagram come cornice di tutte le immagini**. Ogni mondo ha la sua pelle e il sito cambia
  colore quando ci entri: Uomo scuro con l'ottone, Voyage sabbia e cuoio, Beauty cipria.
- **Inventato per far vedere, da decidere con loro:** gli scaglioni della valigia (2 cose −5%, 3 −10%, 4 o più
  −15%), la confezione regalo col biglietto, e quali accessori vanno nella valigia. **Le foto grandi sono quelle
  di Instagram a 640 pixel:** per il sito vero servono gli originali o uno shooting.

## 03/10/2026 — I consigli e i kit, decisi da loro

- **Chiesto da Emanuele:** l'assistente deve permettere alle cugine di dire **quali prodotti vanno insieme**. Chi
  mette una cosa nel carrello o in valigia si vede proporre subito quella che ci va con. Di base i consigli sono
  **automatici**, ma loro possono decidere un abbinamento o un **kit** a mano, parlando all'assistente. Va ancora
  definito bene.
- Il prototipo gli piace già: «dovrà essere ben definito».
- **È un caso studio, non una vendita: il primo di e-commerce.** Detto da Emanuele lo stesso giorno: Maria
  Grazia è sua cugina, e questo lavoro «glielo devo». Non si tratta a livello di preventivo: niente codice
  `PROP`, niente trattativa su Notion. La proposta `PROP_2026_005_LEtoile` fatta la mattina è stata tolta, e il
  numero 005 resta libero per il prossimo cliente vero.
- **Il documento per Maria Grazia è una mappa disegnata, non un report.** Un primo prima e dopo in tre pagine,
  con le schermate e i testi, non gli è piaciuto: «non voglio testi, non voglio roba da leggere… una mappa, uno
  schema». Sono due pagine orizzontali: come funzionerà (voi dal telefono, l'assistente e cosa fa, il magazzino, il
  sito coi sei mondi e il carrello, i numeri) e come ci arriviamo (cinque passi, e le due corsie del sito di oggi e
  di quello nuovo). Sta in `outputs/report/2026-10-03-mappa-sito-l-etoile.pdf`, con l'HTML accanto.

## 03/10/2026, sera — Lunedì in negozio

- **Lunedì 05/10/2026, di mattina, Emanuele va da L'Étoile** a parlarne da vicino con Maria Grazia, con la mappa.
  Le domande da fare stanno nella task dell'appuntamento su TickTick, in 💼 Personal Brand.
- **Emanuele non ha più l'accesso allo store Shopify**: ha perso l'account. Lunedì l'accesso va chiesto a Maria
  Grazia, che lo invita lei. Una richiesta da collaboratore parte da un account Shopify Partner, gratuito; in
  alternativa lo aggiunge allo staff.
- **Appena c'è l'accesso, la prima cosa:** togliere il testo di prova del tema sotto i prezzi («Go kalles this
  summer…»), che c'è su tutte le schede prodotto.
- **Proposte per il prototipo, non ancora fatte:** i consigli e i kit nel carrello e nella valigia, e un assistente
  in prova dentro il prototipo, una chat simulata dove «La nera è venduta» fa sparire la borsa. Il 03/10 Emanuele
  è passato ad altro prima di decidere.

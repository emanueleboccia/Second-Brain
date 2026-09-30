---
title: "Il restyling di Room84"
summary: "Il sito di Room84 rifatto gratis dal 29/09/2026 per conquistare Antonio Vorraro, che conosce mezza zona e può mandare altri clienti: cosa non andava nel sito del 2025, le scelte del nuovo (custom sull'hosting, stesse pagine e stessi indirizzi, logo al centro, Trirong e Inter, animazioni, la 8 e la 4 come chiavi appese, la disponibilità presa dai calendari di Booking), com'è fatto il sorgente e cosa manca per andare online."
tags:
  - projects
  - siti
status: in-lavorazione
created: 2026-09-29
updated: 2026-09-29
related:
  - "[[entities/clienti/room84/scheda]]"
  - "[[entities/clienti/room84/brand-book]]"
  - "[[docs/web-design/custom-o-wordpress]]"
  - "[[docs/web-design/stile-lussuoso]]"
---

# Il restyling di Room84

Chi è il cliente sta nella [[entities/clienti/room84/scheda|scheda]], come si parla di lui nel
[[entities/clienti/room84/brand-book|brand book]]. Qui sta il lavoro sul sito.

**Perché è gratis.** Lo ha deciso Emanuele il 29/09/2026: Antonio Vorraro conosce molta gente sul
territorio, e un restyling fatto bene senza che l'abbia chiesto è il modo per farsi nominare. Il
restyling si propone con un video di Emanuele che disegna il sito, girato lo stesso giorno: cosa c'è nelle
clip sta in [[projects/personal-brand/girato-room84|il girato di Room84]]. La causa esterna, vera, è doppia:
il sito vecchio sta sull'abbonamento Elementor di Emanuele, che non si rinnova, ed Emanuele cerca
casi studio.

## Il sito del 2025

Guardato pagina per pagina il 29/09/2026, desktop e telefono. WordPress con Elementor, ElementsKit e
MetForm, sei pagine: Home, Camere, Gallery, Dintorni, Chi siamo, Contatti.

- **Cose del template mai tolte:** «$1500 /Night» sotto tutte e due le camere; «Category», «Find
  stories by category», «Adventure» e i «Read More» nei Dintorni.
- **Recensioni inventate** nella home, con «Cienti» nel titolo, mentre su Booking ce ne sono
  quaranta vere con media 9,8, mai nominate.
- **Cose false:** «nel cuore di Napoli», «solo 2 suite disponibili per le prossime date».
- **Due numeri di telefono** diversi, e nella privacy un indirizzo col civico 28 e il CAP 80044.
- **La hero era un video Vimeo** che, se non carica, lascia mezza home nera.
- **Un modulo con le date che non prenotava** niente.

## Le scelte

**Custom, sull'hosting Ergonet che il cliente paga già.** È il caso dei siti semplici di
[[docs/web-design/custom-o-wordpress|custom o WordPress]], e toglie di mezzo Elementor e l'arretrato
scritto nel [[docs/processo-cliente|processo cliente]]. Vale
[[docs/web-design/sorgente-e-live|si lavora dal sorgente, mai sul live]].

**Le stesse pagine, agli stessi indirizzi.** Emanuele l'ha chiesto: niente one page. Home,
`/camere/`, `/gallery/`, `/dintorni/`, `/chi-siamo/`, `/contatti/`, `/privacy-policy/` e
`/cookie-policy/` restano dove sono, così i link che Google e Booking conoscono continuano a
funzionare. In più una pagina 404.

**Il logo al centro della testata**, anche sul telefono: è la preferenza che Antonio ha detto a
Emanuele. Sul computer tre voci a sinistra e tre a destra, più «Prenota»; sul telefono il menu a
sinistra e il calendario a destra.

**Font e colori sono quelli del sito WordPress.** Trirong per i titoli, Inter per il testo, il
bronzo `#A58661` e il crema `#FFF8F0` presi dai colori globali di Elementor. Sostituiscono la
Cormorant e la Manrope della prima bozza della mattina.

**Lo stile è [[docs/web-design/stile-lussuoso|il lussuoso]]**, con il riferimento scelto da Emanuele:
il template alberghiero Royella, nero e oro, con la barra delle date in fondo alla hero e un piccolo
sigillo sopra ogni titolo. Qui il sigillo è l'alloro con la V del logo.

**La 8 e la 4 sono due chiavi appese.** Emanuele ha chiesto un modo più simpatico e verticale di
raccontare le due camere: due portachiavi da reception ad arco, appesi a una barra d'ottone, con
dentro il video verticale della camera e il numero grande. Nella home la sezione resta ferma mentre
il grande «84» si divide in 8 e 4 e le chiavi scendono dondolando.

**Animazioni sì, e tante.** Emanuele l'ha chiesto il 29/09: il sito «bello animato». Sulla
contraddizione aperta degli appunti,
[[docs/web-design/animazioni-con-parsimonia|meno animazioni ci sono meglio è]] contro gli stili
moderni, qui ha deciso lui per le animazioni. GSAP con ScrollTrigger e SplitText, e Lenis per lo
scorrimento morbido, tutti caricati dal sito. Chi ha il movimento ridotto nel sistema vede la pagina
ferma e completa.

**Solo materiale vero.** Le foto sono le 64 del sito vecchio, divise fra Camera 8, Camera 4, bagni,
dettagli e ingresso. I quattro video girati per il cliente, due per camera, con e senza modella,
sono diventati la hero, le due chiavi verticali, i giri delle camere e le serate. Le foto stock
stanno solo nei Dintorni, per i luoghi.

**Le recensioni sono quelle di Booking**, con le parole e i nomi degli ospiti: 9,8 su 40, e i voti
per voce.

## La disponibilità

Al posto della fascia dei voti, sotto la hero, c'è la barra delle date: arrivo, partenza, ospiti,
camera. Qualunque campo apre una finestra dentro il sito, con «Torna al sito» per chiuderla e il
tasto indietro del telefono che fa lo stesso: calendario di due mesi, due puntini per notte, uno per
la 8 e uno per la 4, e per ogni camera libera due bottoni, «Chiedila su WhatsApp» col messaggio già
scritto e «Vedi il prezzo su Booking» con le date già inserite.

**Booking non si può aprire dentro il sito**: la sua pagina dichiara che non vuole stare dentro altre
pagine. Per questo le notti occupate si leggono dai **calendari iCal che Booking esporta**, uno per
camera, con `disponibilita.php` sull'hosting, che li tiene in copia per un quarto d'ora. Provato il
29/09 con due calendari finti: legge bene le prenotazioni.

⚠️ **Finché i due link non ci sono, il calendario mostra un'occupazione di prova**, più piena nei
fine settimana. Va bene per il video; online non può andare così. I link li genera Antonella
dall'extranet di Booking: Tariffe e disponibilità, Sincronizza calendari, Esporta.

## Com'è fatto il sorgente

Sta in `~/Desktop/progetti/room84/`:

- `src/` è il sorgente: `pagine/` una pagina per file, `parti/` testata, piede, icone e finestre,
  `css/stile.css`, `js/sito.js` per le animazioni, `js/prenota.js` per la disponibilità,
  `js/galleria.js`, e `disponibilita.php` con `.htaccess`.
- `node costruisci.mjs` compone le pagine in `sito/`, che è la cartella da caricare sull'hosting.
  Genera anche la gallery, la mappa dei dintorni, la sitemap, e lega le ultime parole di ogni
  paragrafo perché nessuna riga resti con una o due parole.
- `python3 immagini.py` rifà tutte le WebP da `foto-originali/`; `bash video.sh` riconverte i video
  da Downloads, uno alla volta.
- L'anteprima è `room84` in `.claude/launch.json`, porta 8084, servita da `servi.mjs`.

Il sito pesa 38 MB, quasi tutti di video; la hero è 2,9 MB sul computer e 1,2 sul telefono, e i video lunghi partono solo quando qualcuno li apre.

## Cosa manca per andare online

- I due link iCal di Booking, per la disponibilità vera.
- Quale numero è quello giusto: sul sito vecchio c'erano il 370 132 7821 e il 340 812 1617. Il
  nuovo usa il 370, che è sulla targa.
- Il letto: king size, come diceva il sito vecchio, o matrimoniale, come dice Booking.
- Se chi prenota diretto ha davvero una tariffa migliore: il sito vecchio lo prometteva.
- Chi decide sul sito, Antonio o Antonella.
- L'accesso a Ergonet, e una copia del WordPress prima di sostituirlo.
- Privacy e cookie sono riscritte per un sito che non usa cookie: da far guardare a chi segue la
  privacy del cliente, se c'è qualcuno.

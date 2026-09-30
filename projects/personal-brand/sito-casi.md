---
title: "Personal brand — le pagine dei singoli progetti"
summary: "Le sei pagine dei progetti di emanueleboccia.it, montate il 29/09/2026 come la pagina di un lavoro di eliotbesson: prima schermata con sei anteprime che si allargano, poi il caso spiegato per intero, che in eliot non c'è. Con i tempi dell'ingresso letti dai suoi script, la dissolvenza fra le pagine, come si cambia un testo, lo stato dei testi e le trappole trovate."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-29
updated: 2026-09-29
related:
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/sito-progetti]]"
  - "[[projects/personal-brand/sito-pagine]]"
  - "[[projects/personal-brand/sito-intervista]]"
  - "[[projects/personal-brand/lavori]]"
  - "[[projects/personal-brand/MEMORY]]"
  - "[[code/mockup-lavori/README]]"
---

# Personal brand — le pagine dei singoli progetti

> Montate il 29/09/2026 su `~/Desktop/progetti/eb-site/progetti/<lavoro>/`. Emanuele le ha chieste
> «proprio come» `eliotbesson.com/works/handshaik`, con una differenza: dove eliot ha un tasto
> «project details» coi dettagli «molto brevi», lui vuole «qualcosa di più approfondito», che spieghi
> a fondo ogni progetto.

Sono sei, una per riga di [[projects/personal-brand/sito-progetti|la pagina Progetti]]:
`/progetti/la-masseria/`, `/progetti/la-masseria-gestionale/`, `/progetti/da-mamma-rosaria/`,
`/progetti/da-mamma-rosaria-sito/`, `/progetti/tenuta-don-gaetano/`, `/progetti/girarrosto-liberti/`.
Le due in più sono della sera del 29/09. Ci si arriva dalle righe dell'elenco, dalle righe dei
lavori in home e in Chi sono, dall'indice, dal «prossimo progetto» in fondo a ogni pagina e dalle
pagine dei servizi.

## Com'è fatta

**La prima schermata è quella di eliot**, letta dal codice e non a occhio. In alto a sinistra il
bottone «Tutti i progetti». Al centro le etichette, il nome su due righe, la descrizione e un
bottone. In basso sei anteprime quadrate, numerate da `/01` a `/06`.

**Passando il mouse su un'anteprima**, quella si allarga da un sesto della fila a più di un terzo,
il suo video parte e accanto al numero compare il nome. Il resto si spegne: il centro scende al 20% e
si rimpicciolisce, il bottone dell'indice pure. Un clic ferma il video, un altro lo riprende, e
l'etichetta accanto al mouse dice quale dei due. Uscendo, tutto torna com'era.

**Il bottone dell'indice** apre un velo sfocato su tutta la pagina con gli altri progetti e il
link all'elenco. Si chiude con un clic fuori, col bottone o con Esc.

**Sotto la prima schermata c'è il caso**, e qui eliot non c'entra più. «Leggi il caso» ci porta.
L'apertura riprende la forma dei suoi dettagli: a sinistra il titolo, il sottotitolo e il link al
sito, a destra la scheda con cosa c'è dentro, per chi e quando. Poi i capitoli numerati, col titolo
che resta fermo a sinistra mentre il testo scorre a destra, e sotto i capitoli due video grandi.
In fondo la riga del prossimo progetto, fatta come una riga dell'elenco.

**Sul telefono e sul tablet** le anteprime diventano una fila che scorre di lato, una al centro e le
vicine che spuntano, con due frecce sotto. Gira solo il video dell'anteprima al centro. Il bottone
dell'indice non c'è, come in eliot.

| Un capitolo può avere | Dove serve |
|---|---|
| i capoversi, il primo più acceso degli altri | sempre |
| due video sotto, con la didascalia | «Cosa ho costruito» |
| tre numeri grandi in riga | Girarrosto, «Cos'è cambiato» |
| un elenco a due colonne, chi e cosa | Mamma Rosaria, «Chi vede cosa» |
| una chiusura con la domanda e il bottone di WhatsApp | Girarrosto e Mamma Rosaria |

## L'ingresso, coi tempi di eliot

Copiati dai suoi script, secondo per secondo. Dal computer:

| Cosa | Da dove parte | Quando | Quanto dura |
|---|---|---|---|
| le lettere del nome | da sotto, invisibili, dal centro di ogni riga verso i bordi | 0 | 1 s |
| il nome | grande e al 20%, si stringe alla sua misura | 0,2 | 1,6 s |
| le righe della descrizione | da sotto, una dopo l'altra | 1 | 0,8 s |
| le anteprime | da sotto lo schermo, sfocate, dal centro verso i lati | 1,2 | 1 s |
| il bottone dell'indice, «Leggi il caso» | da sinistra, dal basso | 1,3 | 1,2 s |
| etichette, logo, menù, bottone «Parliamone» | dai lati e dall'alto | 1,4 | 1,2 s |

Dal telefono tutto parte prima: le righe a 0,4, bottone ed etichette a 0,5, le anteprime a 0,7 da
sinistra, la testata a 0,8. La pagina torna a scorrere a 2,6 secondi.

Due cose sono diverse da eliot, per forza:

- **il nome parte meno grande.** Lui passa da 10 a 6, cioè parte una volta e due terzi più grande. I
  nostri nomi sono lunghi e in Archivo largo: a quella misura «di Mezz'autunno» usciva dallo schermo
  da tutti e due i lati. Parte dalla misura più grande che sta nello schermo;
- **le lettere salgono riga per riga.** Il suo nome è una parola sola. Col nostro su due righe,
  partendo dal centro di tutte le lettere insieme, saliva prima la fine della prima riga e l'inizio
  della seconda.

## I passaggi fra le pagine

Dal 29/09 è **la dissolvenza di eliot**: la pagina e la testata si spengono in due decimi, e la
pagina nuova fa per intero il suo ingresso, lo stesso che fa quando si carica. Prima c'era una tenda
nera che saliva, e l'ingresso si vedeva solo al caricamento. Vale per tutte le pagine del sito.

Un link a una sezione, come «Servizi» dal menù, fa eccezione: porta dritto alla sezione e l'ingresso
della cima non si guarda.

## Come si cambia un testo

**I testi stanno in un file solo**, `src/dati/progetti.mjs`: nome, etichette, descrizione, i nomi
delle sei anteprime e il caso. Da lì `strumenti/genera-pagine.mjs` scrive le pagine e le righe
dell'elenco, e parte da solo prima di `npm run build` e di `npm run dev`. Le pagine in
`progetti/<lavoro>/index.html` non si toccano a mano: alla build dopo tornano com'erano.

Per aggiungere un progetto si aggiunge una voce al file, si girano le sue anteprime con
[[code/mockup-lavori/README|gli script dei mockup]] e si rifà la build.

**Il generatore lega le ultime tre parole di ogni paragrafo**, così nessuno finisce con una o due
parole sole sull'ultima riga, che è la regola di design che vale per tutti i brand. Se le tre parole
sono lunghe ne lega due. Lega anche «agosto 2026» e simili. Dal 29/09 sera lo fa anche con le righe
della scheda: sui telefoni «Una pagina per ognuno dei quattro progetti» finiva con una parola sola, e
nessun controllo le guardava. La domanda della chiusura si bilancia da sé.

## Le trentasei anteprime

Sei per lavoro, tutte in movimento, a 1000 px e 60 fotogrammi al secondo. Fatte con le schermate
vere, come quelle dell'elenco.

| | La Masseria | Da Mamma Rosaria | Tenuta Don Gaetano | Girarrosto Liberti |
|---|---|---|---|---|
| /01 | la home che scorre | il calendario | la pagina che scorre | il sito col menù |
| /02 | pagine scelte, dal computer | calendario, conferma, conti | sezioni scelte, dal computer | un ordine, tocco per tocco |
| /03 | pagine scelte, dal telefono | dal telefono | sezioni scelte, dal telefono | il menù, dal telefono |
| /04 | Scuole, Zucche, Chi siamo | la conferma d'ordine | galleria e servizi | lo stesso menù, in due posti |
| /05 | tutte le schermate | tutte le schermate | tutte le schermate | tutte le schermate |
| /06 | la home, dal telefono | comanda, inviti, giornata | la pagina, dal telefono | il menù che scorre |

| | La Masseria, il gestionale | Da Mamma Rosaria, il sito |
|---|---|---|
| /01 | il calendario | la home che scorre |
| /02 | calendario, gita, conti | sezioni scelte, dal computer |
| /03 | dal telefono | dal telefono |
| /04 | una campagna email | Eventi, sale, dispensa |
| /05 | tutte le schermate | tutte le schermate |
| /06 | scuola, invito, giornata | la home, dal telefono |

I due gestionali mostrano solo date e nomi inventati, ognuno da una copia del database fatta
apposta. L'app del Girarrosto non ha mai il nome di un cliente. La home del sito di Mamma Rosaria è
senza la sezione della famiglia e senza le recensioni firmate: il perché sta in
[[projects/personal-brand/sito-progetti|la pagina Progetti]].

## I testi, a che punto sono

| Lavoro | Il caso | Cosa manca |
|---|---|---|
| **Girarrosto Liberti** | quello scritto il 20/09, in [[projects/personal-brand/sito-pagine|le pagine del sito]]: cinque capitoli, i numeri, la chiusura. Dal 29/09 sera anche cosa è suo, logo, foto e testi, e i dodici giorni di lavoro | niente |
| **La Masseria** | dal 29/09 con le risposte di Emanuele: com'era prima, cosa serviva, cosa ho costruito, cos'è cambiato | solo la sua lettura |
| **Da Mamma Rosaria** | dal 29/09 con le risposte di Emanuele: sei capitoli, la chiusura, il menù col QR fra le cose in arrivo | solo la sua lettura |
| **Tenuta Don Gaetano** | dal 29/09 con le risposte di Emanuele: quattro capitoli, col taglio della vetrina | solo la sua lettura |
| **La Masseria, il gestionale** | dal 29/09 sera coi fatti del sistema e del codice, più il prima e il dopo detti da Emanuele: cinque capitoli, dieci giorni di lavoro, e la chiusura «Prendi prenotazioni anche tu?» | solo la sua lettura |
| **Da Mamma Rosaria, il sito** | dal 29/09 sera col sito vero e con le risposte di Emanuele: com'era prima, cosa serviva, cosa ho costruito; testi, foto e video suoi, dieci giorni di lavoro. Il logo non si nomina | niente: approvata da lui il 29/09, «va bene così la pagina» |

**Nei primi tre di famiglia c'è quello che ha detto Emanuele nell'intervista del 29/09**, più i
fatti letti dai siti e dal vault. Numeri non ce ne sono, perché non ne ha dati: non si inventano.
**I due della sera sono partiti dai soli fatti**, controllati uno per uno sul codice e sul sito: i
quattro ruoli, i quattro tipi di data, l'avviso dei bambini, i titoli delle pagine. Il gestionale
della Masseria ha poi avuto il prima e il dopo dalle sue parole; il sito di Mamma Rosaria resta
senza «Cos'è cambiato», per sua scelta: la pagina gli va bene così.

Tre cose valgono per tutte le pagine:

- **i lavori di famiglia lo dicono in cima**, nella terza etichetta e nella riga «L'ho costruito
  per l'azienda della mia famiglia, dove gli errori li pago io»;
- **nessun ruolo e nessun nome di famiglia.** In Mamma Rosaria si dice «chi organizza», «gli chef»,
  «un cameriere»;
- **nel Girarrosto c'è «Marco, il titolare»**, senza cognome e senza prezzo. La sua frase non c'è e
  non gli si chiede: la pagina è completa così.

⚠️ **Corretto il 29/09**: la riga della Masseria diceva «quattro progetti, uno per stagione». Gli
eventi sono quattro, ma due cadono in autunno e nessuno d'estate. Ora dice «quattro eventi,
dall'autunno alla primavera», nell'elenco e nella pagina.

## L'intervista a Emanuele

Cominciata il 29/09/2026: un progetto alla volta, quattro passi l'uno. Quello che ha detto, con le
parole sue, le correzioni e le domande ancora aperte, sta in
[[projects/personal-brand/sito-intervista|l'intervista sui lavori del sito]]. Staccata da qui lo
stesso giorno, per la regola delle 300 righe.

## Come è montata

- I dati in `src/dati/progetti.mjs`, il generatore in `strumenti/genera-pagine.mjs`.
- Lo stile in `src/styles/progetto.css`, le animazioni in `src/js/progetto.js`.
- La dissolvenza in `src/js/transizioni.js`; l'ingresso di ogni pagina passa da `entra()` in
  `src/main.js`, al caricamento e al cambio di pagina.
- L'etichetta accanto al mouse è in `src/js/interazioni.js`: la porta ogni elemento con
  `data-cursore`. Sulle righe dei lavori dice «Apri il progetto».
- I video in `public/lavori/<lavoro>/caso/`, da `01.mp4` a `06.mp4`, ognuno con la sua copertina.
  Dal computer si scaricano uno dopo l'altro a ingresso finito, così al passaggio del mouse partono
  subito; dal telefono si scarica solo quello al centro.

Provata a 320, 360, 390, 768, 1024, 1280, 1440 e 1920 px, in chiaro e in scuro, con tutti i
passaggi: nessun errore, nessuna pagina più larga dello schermo, nessun paragrafo che finisce con una
o due parole.

## Le trappole

- **Barba tiene la pagina vecchia nel documento finché quella nuova non è entrata.** Con la
  dissolvenza le due pagine si sarebbero viste una sopra l'altra: la vecchia si toglie appena è spenta.
- **Un titolo fermo dentro una griglia resta fermo per tutta la griglia.** Il titolo del capitolo
  finiva sopra i video: testo e titolo stanno in una loro riga, i video fuori.
- **Un'etichetta con la sfocatura dietro, da spenta, resta dipinta** finché la zona non si ridisegna.
  L'etichetta del mouse ha un fondo pieno, e da spenta è anche nascosta.
- **Il browser manda movimenti finti del mouse mentre la pagina cambia sotto.** L'etichetta si
  riaccendeva su un link che non c'era più: durante il cambio di pagina sta ferma.
- **A 1024 px «Chi sono» andava a capo nella testata**, in tutte le pagine: la colonna al centro era
  un terzo della riga. Ora prende lo spazio che le serve.
- **Il server di prova non sa dare un video a pezzi**, e Chrome segna le richieste come interrotte. I
  video girano lo stesso: non è un errore del sito.

## Aperto

- i testi dei lavori di famiglia: tre scritti sulle sue risposte, due sui fatti. Li deve leggere lui;
- le domande per il Girarrosto e per i due lavori nuovi, che stanno in
  [[projects/personal-brand/sito-intervista|l'intervista sui lavori del sito]];
- le descrizioni delle sei righe dell'elenco, che sono le stesse della prima schermata.

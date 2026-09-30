---
title: "Personal brand — il brief per costruire la home"
summary: "Quello che serve a chi monta la home di emanueleboccia.it dal wireframe del 28/09/2026: dove sta il testo approvato, il sito di riferimento di ogni sezione e come sono fatte le sue animazioni, il codice da cui partire, le regole dette da Emanuele e le cose ancora aperte."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-28
updated: 2026-09-28
related:
  - "[[projects/personal-brand/sito-home]]"
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/MEMORY]]"
  - "[[self/reference/design]]"
  - "[[self/reference/tono]]"
  - "[[self/pacchetti]]"
---

# Il brief per costruire la home

> Scritto il 28/09/2026, alla fine della giornata in cui la home è stata rifatta da capo con Emanuele.
> Serve a chi la monta, che sia un'altra sessione o un altro modello, e si legge prima di toccare il
> codice. **Il lancio è giovedì 1° ottobre 2026.**

## Il testo

**Il testo approvato sta in [[projects/personal-brand/sito-home|la home]].** Si copia da lì parola per
parola: ogni titolo, testo e bottone è stato scelto da Emanuele fra più proposte. La prima versione, del 20
e 21/09, sta in [[projects/personal-brand/sito-home-vecchia|la home di prima]]: è materiale, e non si usa
senza chiederglielo.

## Le nove sezioni e i loro riferimenti

**Per le animazioni il riferimento principale è [eliotbesson.com](https://www.eliotbesson.com/)**, detto da
Emanuele il 28/09. La sua home ha quasi la stessa scaletta della nostra: una hero, una sezione «I build
websites at the intersection of: aesthetic, performance, strategy» che corrisponde al nostro triangolo, un
assaggio di chi è, i lavori recenti e un footer che apre il modulo di contatto. Tre sezioni hanno un
riferimento a parte, scelto da lui.

| # | Sezione | Riferimento | Com'è fatta |
|---|---|---|---|
| 1 | **Hero** | eliotbesson | titolo, testo, due bottoni: *Come lavoro* porta alla sezione 2, *Scrivimi* apre WhatsApp. Niente lavori e niente Girarrosto |
| 2 | **Come lavoro, il triangolo** | eliotbesson, la sezione «at the intersection of» | marketing in alto, codice a sinistra, design a destra, l'AI al centro, e sotto ogni lato cosa fa |
| 3 | **Agenzia, fai da te o io** | nessuno | tabella a tre colonne, «Con me» al centro ed evidenziata; sul telefono tre schede una sotto l'altra |
| 4 | **Servizi** | [fundamental.bg](https://fundamental.bg/en), «Our Services» | vedi sotto |
| 5 | **Lavori recenti** | eliotbesson, i lavori recenti | vedi sotto |
| 6 | **Il processo** | [stopidesign.com](https://www.stopidesign.com/), il processo | vedi sotto |
| 7 | **Chi sono** | eliotbesson, la sezione «about» | ritratto, testo, i cerchi del percorso, due bottoni con una frase sopra |
| 8 | **Le domande** | stopidesign, le domande frequenti | cinque linguette di categoria sopra un elenco a fisarmonica col «+» |
| 9 | **La chiusura** | eliotbesson, il footer | vedi sotto |

**Servizi, come fundamental.bg.** Letta il 28/09. Griglia a mosaico su dodici colonne, bordi sottili fra le
carte, contenitore arrotondato. Le nostre misure: in alto Consulenza su quattro colonne e Siti web su otto,
al centro ERP e gestionali su sette e Company Brain su cinque, in fondo AI e automazioni su tutte e dodici.
Ogni carta ha un pallino vuoto in alto a sinistra, il titolo grande in basso e un video di sfondo nascosto.
Al passaggio del mouse il video appare e parte, il pallino si riempie, il titolo prende il colore sfumato e
compare la freccia, e la descrizione di due righe sale da sotto, da `translateY(50px)` e opacità zero. Allo
scroll le carte entrano sfocate, `blur(30px)`, trasparenti e spostate di 40 px in basso. Accanto al titolo
della sezione, il bottone *Tutti i servizi ↗*. Il loro verde diventa la nostra scala: crema e luce calda.

**Lavori recenti, come eliotbesson.** Letta il 28/09 dal codice della pagina. Un elenco di quattro righe, e
ogni riga è un link intero. Nella riga il nome grande del lavoro con due etichette piccole, cosa è stato fatto
e il mese, e intorno tre anteprime quadrate piccole: un mockup fermo e due clip in loop, mute. Al passaggio
del mouse sul nome le anteprime si ingrandiscono e le clip partono. Solo il titolo, senza testo sotto:
l'ha chiesto Emanuele. Al lancio ogni riga porta alla pagina Progetti.

**Il processo, come stopidesign.** Letta il 28/09. La sezione resta ferma a schermo intero mentre si scorre
la pagina. In alto una linea sottile con sei pallini e i nomi dei passi, che si riempie scorrendo: il
pallino attivo si accende con un alone, gli altri restano spenti. Sotto, le carte dei passi scorrono in
orizzontale guidate dallo scroll: quella attiva è a grandezza piena, le altre scalate fra 0,92 e 0,95 e
spente. Ogni carta ha il numero grande sfumato, un'icona in un quadrato arrotondato, il nome del passo,
l'etichetta del capitolo e la descrizione, con una luce che segue il mouse. Sul telefono niente sezione
ferma: le carte si scorrono di lato col dito, agganciandosi.

**La chiusura, come eliotbesson.** Letta il 28/09. Il footer si apre con una frase gigante che al
passaggio del mouse cambia in un invito, e al clic apre il modulo in un pannello fisso sopra la pagina.
Nel pannello un titolo, i campi, le pillole per il servizio, il messaggio, il bottone, il ringraziamento
dopo l'invio e l'alternativa per chi non ama i moduli. Sul footer c'è una grana di rumore leggera. Sotto la
frase, la mappa del sito, i social, le note legali e la partita IVA. «Pagina successiva» l'ha tolta Emanuele il 28/09.

**Gli strumenti di eliotbesson**, letti dal codice: Webflow con GSAP, ScrollTrigger, split-type per dividere
il testo, Lenis per lo scroll morbido, Lottie per le icone animate e Swiper. Il 28/09 il pannello del browser
dell'app era nascosto e la pagina non si disegnava: la struttura è stata letta, le animazioni vanno guardate
in un browser visibile o registrate con Chrome prima di copiarle.

## Il codice

- **Il sorgente:** `~/Desktop/progetti/eb-site/`, un progetto Vite con GSAP e ScrollTrigger, Lenis, Barba e
  i caratteri Archivo e JetBrains Mono installati. È la prima versione, del 29/08, ferma a preloader e hero;
  le variabili del design stanno in `src/styles/tokens.css`. `npm run dev` apre il sito in locale,
  `npm run build` produce `dist/`.
- **L'ultima bozza:** `~/Desktop/progetti/emanueleboccia-it/`, del 21/09. È una build già compilata, e non
  si ricompila. Emanuele ha chiesto di riprenderla: da lì si prendono l'aspetto, la luce calda come
  variabile `--luce`, le immagini in `img/`, fra cui il ritratto e le miniature dei lavori, e le carte dei
  servizi già scritte.
- **Il design:** [[self/reference/design|il design del personal brand]], che vale per tutto quello che esce
  col suo nome. I colori dei siti di riferimento non si copiano mai.
- **I paragrafi:** nessuno finisce con una o due parole sull'ultima riga, regola del `CLAUDE.md` di radice.
  `text-wrap: pretty` non basta da solo: si lega con uno spazio che non va a capo.
- **La verifica:** dopo ogni sezione, una schermata vera fatta con Chrome headless, guardata e mandata a
  Emanuele. Il pannello del browser dell'app può essere nascosto, e allora non disegna.
- **La pubblicazione:** su Hostinger, dominio `emanueleboccia.it`, solo dopo l'ok di Emanuele sulle
  anteprime.

## Le regole dette da Emanuele il 28/09

- **È un personal brand: il protagonista è lui.** I lavori stanno nella sezione Lavori recenti e nelle loro
  pagine, non ovunque; il Girarrosto è l'ultimo dei quattro. È in [[correction|correction log]].
- **Ogni sezione si legge anche da sola**, come se fosse la prima dove uno ferma l'occhio, e insieme
  riprende quella prima.
- **Il listino non si nomina, e niente prezzi:** si dice che paga solo quello che serve alla sua situazione.
  La regola sta in [[projects/personal-brand/sito|il sito]].
- **Prodotti e Blog non entrano in home.** Garanzie e rottamazione, quelle di
  [[self/pacchetti|pacchetti]], vanno nelle pagine dei servizi.
- **Le pagine dei singoli servizi e dei casi studio vengono dopo il lancio.** Al lancio le carte dei servizi
  portano alla pagina Servizi, le righe dei lavori alla pagina Progetti.
- **Di persona tra Napoli e il Vesuvio, in remoto in tutta Italia.**
- **Il materiale che manca è un segnaposto dichiarato**, mai inventato: i video delle carte, i mockup e le
  clip dei lavori.
- **Le decisioni del 19-21/09 sono materiale, non vincoli.**
- **Come si lavora con lui:** alternative con una raccomandazione, messaggi corti e semplici, domande solo
  quando bloccano, e il lavoro mostrato invece che raccontato. Il tono dei testi è quello di
  [[self/reference/tono|tono]] e della sezione «Come non si scrive mai» del `CLAUDE.md`.

## La testata, il pannello e l'ingresso, letti da eliotbesson il 28/09/2026

Alla prima schermata Emanuele ha chiesto la testata identica a quella di eliot, col pannello e il caricamento.
Dal suo codice, script inline compresi:

- **testata** `.menu`: `position: fixed`, `z-index 999`, sfondo `linear-gradient(180deg, #0d0d0d, transparent)`,
  `transition: transform .35s`; con jQuery allo scroll: in cima `translateY(0)`, scendendo `translateY(-100%)`,
  risalendo `translateY(0)`. Dentro, una griglia a tre colonne con `padding: 1em 5em` e `max-width 1800px`;
- **logo**: un cerchio con la «e», 3.25em, e un Lottie che al passaggio lo trasforma nella parola «eliot»;
- **bottone «Contact»**: sfondo `#121212`, bordo `1px #fafafa14`, angoli `.3125em`, `padding 0 1.25em 0 .75em`;
  dentro un Lottie da 1.5em col puntino che diventa tre e due etichette sovrapposte che si scambiano al
  passaggio, con `perspective 1000px`; al passaggio lo sfondo scala a .96;
- **telefono**: i link spariscono sotto i 767px, resta il bottone e compare il burger (46px, bordo, angoli
  `.31em`); il menù pieno è una scheda `#fafafa` con angoli 1em, `padding .5em` dal bordo, i link in Arges 3em
  maiuscolo, i social in cerchio, la grana; sotto, un velo al 75%;
- **pannello**: `.contact_bg` fisso al 75% di nero, `.contact_main` assoluto a destra al 50% (75% sotto i 991px,
  100% sotto i 767), `padding 0 4.75em`, un bordo sinistro da 1px all'8%; dentro `max-width 38em`, `padding 4em
  1.5em 6em`, `gap 2.5em`, scorrevole; il titolo in Arges 4em; i campi in griglia a due colonne con l'icona
  Lottie nell'etichetta, `min-height 3.25em`, sfondo `#ffffff05`, bordo `#fafafa14`, angoli `.2em`; i radio in
  griglia a due colonne con il pallino da 1em; il bottone a tutta larghezza, `min-height 2.75em`, bordo
  `#292929`; il divisore e «don't like forms? send an email»; una sfumatura di 5em in fondo. La regia GSAP: velo
  a opacità 1 in .4 s, pannello da `x: 100%` a 0 in .8 s `power4.out` da .1, la X da scala 0 a 1 in .8 s da .15;
  in chiusura X a 0 in .4, pannello a 100% in .5, velo a 0 in .3;
- **ingresso**, sopra i 992px: `.page_w` e `.menu_inner` da opacità 0 a 1 in .2 s; il titolo da `fontSize 12em`
  e opacità .2 a `4em` e 1 in 1.6 s `expo.inOut` da .6; le parole da `y: 100%` in 1 s `expo.out` con `stagger`
  .15; il sottotitolo da `y: 100%` a 1.6 con `stagger` .1; il logo da `x: -50vw`, scala 1.2 e opacità 0 in 1.2 s
  `expo.out` da 1.4; i link da `y: -10vw` con `stagger` .05 da 1.4; il bottone da `x: 50vw` da 1.4; le carte dei
  lavori da scala .2 e `blur 12px` da 1.2. Sotto i 992px il titolo sale da `25vh` in 1 s da .8.

Com'è stato tradotto nel nostro codice sta in [[projects/personal-brand/MEMORY|la memoria del progetto]].

## Montata il 28/09/2026

La home è nel sorgente, con tutte e nove le sezioni e le animazioni dei riferimenti; le schermate sono andate a
Emanuele lo stesso giorno. Cosa c'è, cosa è segnaposto e le trappole trovate stanno in
[[projects/personal-brand/MEMORY|la memoria del progetto]].

## Aperto

Rifatto il 28/09/2026 sera, dopo la terza tornata di correzioni: è la lista di quello che manca alla home, e
alla home sola, per giovedì.

**Segnaposto ancora nella pagina**

- ~~i cinque video delle carte dei servizi~~ — fatti con Kling la sera del 28, nello stile di fundamental;
- ~~i lavori recenti~~ — le otto clip ci sono, registrate dai siti veri e dalla copia locale del gestionale
  coi dati finti. Manca solo una clip dell'app ordini del Girarrosto, che ha la password;
- ~~il link di LinkedIn~~ — `linkedin.com/in/emanueleboccia`, messo il 28/09.

**Da decidere con Emanuele**

- **dove arrivano i messaggi del modulo**: deciso il 28/09, a `ema.boccia02@gmail.com` e soprattutto su
  Notion, in *Contatti e lead* con Origine «Inbound sito» e Stato «Nuovo». Si monta quando il sito va
  online, perché gira sul server, e serve un token di integrazione di Notion creato da Emanuele;
- ~~il numero di WhatsApp~~ — confermato il 28/09;
- ~~il Blog e Prodotti nel menù~~ — restano fuori per il lancio, «li faremo poi»;
- **l'etichetta «Azienda di famiglia»** sui tre lavori di famiglia: proposta, non confermata.

**Le pagine che i link della home aspettano**

- ~~`/servizi/`, `/progetti/`, `/chi-sono/`~~ — montate il 29/09, con le quattro pagine dei progetti. Le
  carte dei servizi portano alla pagina Servizi, all'altezza del loro servizio;
- `/privacy/` e `/cookie/`: i testi ci sono, le pagine si generano quando Emanuele dà la sede e l'email.
  Sta in [[projects/personal-brand/sito-servizi|la pagina Servizi]].

**Prima di andare online**

- ~~l'anteprima social~~ — fatta il 29/09: ogni pagina ha i suoi tag e l'immagine di condivisione;
- ⚠️ **il modulo di contatto non spedisce**: mostra il grazie e basta. Va montato prima di andare online;
- **le statistiche**: se si mette Plausible o simili serve il banner dei cookie; senza, niente banner;
- **la casella info@emanueleboccia.it** la crea Emanuele, perché chiede una password;
- **Hostinger, «tramite WordPress»**, detto il 28/09: si va online solo quando il resto è finito, e il sito
  va impacchettato dentro WordPress. Solo dopo il suo ok;
- **una lettura sua di ogni sezione nel browser**, anche in chiaro, prima di pubblicare;
- **il progetto su TickTick** ha ancora i passi vecchi, da riscrivere sulla home nuova, con il suo ok.

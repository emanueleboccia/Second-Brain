---
title: "Personal brand — la pagina Progetti"
summary: "La pagina Progetti di emanueleboccia.it, montata il 29/09/2026 come l'elenco dei lavori di eliotbesson: sei righe, una accesa alla volta, ognuna con quattro anteprime. Con i testi delle righe, i due lavori aggiunti la sera, come sono fatti i mockup animati e perché non li ha generati un'intelligenza artificiale, e quello che resta aperto."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-29
updated: 2026-09-30
related:
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/lavori]]"
  - "[[projects/personal-brand/sito-home]]"
  - "[[projects/personal-brand/sito-chi-sono]]"
  - "[[projects/personal-brand/MEMORY]]"
  - "[[code/mockup-lavori/README]]"
  - "[[projects/personal-brand/sito-casi]]"
  - "[[projects/restyling-room84/sito]]"
  - "[[projects/restyling-room84/MEMORY]]"
---

# Personal brand — la pagina Progetti

> Montata il 29/09/2026 su `~/Desktop/progetti/eb-site/progetti/`. È la terza pagina del sito. Emanuele
> l'ha chiesta «sempre come eliotbesson.com/works», e i mockup «più fluidi e belli» come i suoi.

## Com'è fatta

Letta dal sito di eliot il 29/09, dal codice e non a occhio. Un elenco di righe, una per lavoro. Ogni
riga ha due anteprime a sinistra, il nome al centro con le etichette sopra e una descrizione sotto, e
altre due anteprime a destra.

**Sul desktop una riga sola è accesa**, quella che ha passato la linea al 60% dello schermo. Le altre
mostrano solo il nome, al 10% e rimpicciolito: anteprime, etichette e descrizione non ci sono. Quando
una riga si accende le anteprime si aprono da 0,4 a 1, una dopo l'altra, e i video partono dopo due
decimi di secondo; quando si spegne, si fermano.

**L'ingresso**: le righe salgono da sotto lo schermo strette una sull'altra, poi l'elenco si
apre e fra una riga e l'altra si fa il vuoto. La testata entra dai lati, come nelle altre pagine.

**Sul telefono e sul tablet** c'è un titolo in cima, «Esplora i progetti», e sotto le righe una dopo
l'altra: le etichette, le due anteprime che si muovono, il nome. La descrizione resta.

| Misura di eliot | Da noi |
|---|---|
| 40vh di vuoto sopra la prima riga | uguale |
| 16em fra una riga e l'altra | 16rem |
| griglia a sei colonne, il nome su due | due colonne, il nome, due colonne |
| anteprime quadrate, massimo 12,5em, bordo sottile | massimo 13rem |
| nome a 100 px in un carattere stretto | Archivo largo: la misura la decide il nome più lungo |

⚠️ **Il carattere cambia la misura.** Eliot scrive i nomi in un carattere stretto e alto, e a 100 px
«Handshaik» sta in 265 px. I nostri nomi sono in Archivo largo, come tutto il sito, e sono lunghi:
vanno su due righe, e uno script li rimpicciolisce tutti insieme finché il più lungo non entra nella
sua colonna. Il più lungo era «di Mezz'autunno»; dalla sera del 29/09 è «Mamma Rosaria».

## Le sei righe

Erano quattro, nell'ordine della home deciso da Emanuele il 28/09. La sera del 29/09, guardate tutte
le pagine, ha detto cosa mancava: «manca il sito da mamma rosaria, e anche il nuovo gestionale di la
masseria di mezz'autunno». Le descrizioni le ha scritte Claude: **Emanuele non le ha ancora lette.**

| Riga | Etichette | Descrizione |
|---|---|---|
| **La Masseria · il sito** | Identità e sito · Set 2026 · Azienda di famiglia | Il sito di una masseria di Poggiomarino che fa eventi per famiglie e scuole: quattro eventi, dall'autunno alla primavera. |
| **La Masseria · il gestionale** | Gestionale · Set 2026 · Azienda di famiglia | Il gestionale delle date di una masseria che fa eventi: gite, feste e serate in un calendario solo, con le scuole e l'email marketing. |
| **Mamma Rosaria · il gestionale** | Gestionale eventi · Set 2026 · Azienda di famiglia | Il gestionale degli eventi di un agriturismo: la festa si crea una volta, e cliente, staff e cucina ricevono ognuno la sua parte. |
| **Mamma Rosaria · il sito** | Sito web · Set 2026 · Azienda di famiglia | Il sito di un agriturismo di Poggiomarino che ospita feste private: gli eventi, le sale, gli angoli e la dispensa, fino alla richiesta della data. |
| **Tenuta Don Gaetano** | Identità e sito · Lug 2026 · Azienda di famiglia | Il sito di una dimora del Settecento a Poggiomarino che ospita eventi: una pagina sola, per far vedere un posto nuovo. |
| **Girarrosto Liberti** | Gestionale e sito menù · Ago 2026 | L'app per prendere gli ordini dall'iPad e il sito col menù. Il menù si cambia in un posto solo, e cambia in tutti e due. |

**Due brand hanno due righe, e la seconda riga del nome dice quale.** Con lo stesso nome su due
righe dell'elenco sarebbe sembrato un doppione. Il nome intero del brand resta nel titolo della
pagina, nella scheda del caso e nelle pagine dei servizi: nei dati ogni lavoro ha un campo in più,
`marchio`. ⚠️ È una scelta di Claude, e «La Masseria» senza «di Mezz'autunno» va fatta vedere a
Emanuele. **La riga dei lavori in home e in Chi sono resta di quattro**: è una scelta sua del 28/09,
e i due nuovi ci entrano se lo dice lui.

«Azienda di famiglia» è la terza etichetta dei tre lavori di famiglia, come vuole
[[projects/personal-brand/lavori|la nota sui lavori]]: si dichiara, e sta in alto.

## La settima riga: Room84, pubblica dal 30/09

Il 29/09 notte Emanuele ha proposto di inserire come caso studio il sito di Room84, rifatto lo stesso
giorno in un'altra sessione: sta in [[projects/restyling-room84/sito|il restyling di Room84]].

✅ **Pubblica dal 30/09/2026**: «room84 mi ha dato l'ok per metterlo ovunque». Fino al giorno prima era
una bozza, per la regola data per il reel in [[projects/restyling-room84/MEMORY|la memoria del
restyling]]. Su `room84.it` c'è ancora il sito del 2025, quindi la terza etichetta resta «Non ancora
online» e la pagina non ha il link al sito. Con l'ok, Room84 è entrato anche nei nomi che scorrono in
Chi sono, al posto di Sistema Evolve, e fra i «Fatti così» della pagina Siti web.

L'interruttore delle bozze resta, per il prossimo lavoro che un cliente non ha ancora visto:

- nei dati il progetto ha `bozza: true`. Con «npm run build», quello che va online, non entra
  nell'elenco, non ha pagina, non sta nella mappa del sito;
- **i suoi video stanno in `bozze/lavori/<slug>/`**, fuori dai file pubblici, così non si raggiungono
  nemmeno conoscendo l'indirizzo, e le sue due cartelle si mettono in `.gitignore`;
- per guardarlo c'è «npm run anteprima», che compila con le bozze: la pagina porta in fondo la
  scritta «Bozza · questa pagina non è online» e i motori di ricerca non la leggono;
- **per pubblicarlo** si toglie `bozza: true`, si spostano i video in `public/lavori/<slug>/`, si
  tolgono le due cartelle da `.gitignore` e si guarda la terza etichetta.

I testi sono scritti coi soli fatti del vault. Tre cose restano fuori per scelta: perché il
restyling è gratuito, l'abbonamento a Elementor, e quello che non andava nel sito del 2025, che
l'aveva fatto Emanuele. ⚠️ La frase sulle notti libere lette dai calendari di Booking sarà vera
quando arrivano i due link: oggi il calendario è di prova.

## Il mazzo, nella home

Il 30/09 Emanuele ha chiesto che nella home entrino anche i lavori nuovi, e ha dato la forma:
«i nuovi stanno in basso agli altri, e stanno in questa lista fatta come eliot, con questo effetto
animato che scorrono, ci metti tutti i progetti insieme a quelli extra». Il riferimento è la sezione
in fondo a `eliotbesson.com/works`, quella dei suoi modelli.

**Le quattro righe restano**, e sotto c'è il mazzo: una frase, il bottone «Tutti i progetti» e le
schede di tutti i lavori una sopra l'altra. Davanti stanno quelli che nelle righe non ci sono, poi i
quattro. Il bottone in fondo alle righe nella home non c'è più: ce n'è uno nel mazzo.

I numeri sono quelli di eliot, letti dal suo codice:

| Cosa | Misura |
|---|---|
| la scheda davanti | a misura piena, un passo più su |
| quelle dietro | ognuna il 4% più piccola e un passo più su della precedente |
| la scheda passata | al 90%, inclinata di venti gradi, cade sotto il mazzo |
| il movimento | mezzo secondo in avanti, 0,35 indietro; le schede partono a cinque centesimi l'una dall'altra |
| il nome e il tipo | solo sulla scheda davanti, arrivano dai lati |

Tre cose sono diverse:

- **il fondo sfuma con una maschera**, non con la macchia scura sfocata di eliot: la macchia è più
  larga del mazzo e sul nostro fondale, che ha la griglia, lasciava un rettangolo più scuro. Con la
  maschera sotto si vede il fondale vero, in scuro e in chiaro;
- **le misure sono in parti della scheda**, così il mazzo è lo stesso dal telefono al monitor;
- **il mazzo gira da solo** finché nessuno tocca le frecce, e la scheda davanti fa girare il suo
  video. Chi ha chiesto meno movimento lo vede fermo.

Nella frase, al posto delle figure animate di eliot, ci sono due pasticche con dentro un pezzo di
lavoro vero: niente icone a linea. Il mazzo lo scrive il generatore da `src/dati/progetti.mjs`, e le
bozze ci entrano solo in anteprima. Stile in `src/styles/mazzo.css`, movimento in `src/js/mazzo.js`.

## I mockup

Ventiquattro anteprime, quattro per lavoro: la prima e la quarta ferme, la seconda e la terza in
movimento. È lo schema di eliot, che su ogni lavoro ha due immagini e due video.

| | 1 · ferma | 2 · video | 3 · video | 4 · ferma |
|---|---|---|---|---|
| **Masseria, il sito** | la home, tagliata dal bordo | tre finestre del sito che scorrono | quattro telefoni in fila | una parete di schermi di sbieco |
| **Masseria, il gestionale** | il calendario di ottobre | calendario, campagna, conti | quattro telefoni in fila | una parete di schermi |
| **Mamma Rosaria, il gestionale** | il calendario di ottobre | calendario, conferma, conti | quattro telefoni in fila | una parete di schermi |
| **Mamma Rosaria, il sito** | la pagina Eventi, tagliata dal bordo | home ed Eventi che scorrono | quattro telefoni in fila | una parete di schermi |
| **Tenuta** | la home, tagliata dal bordo | tre finestre del sito | quattro telefoni in fila | una parete di schermi |
| **Girarrosto** | il sito col menù nel telefono | l'ordine che cresce a ogni tocco | il menù sul telefono | la tavoletta e il telefono |

I fondi sono i colori del brand di ognuno, dai loro `reference/design.md`; quelli del Girarrosto, che
nel vault non ha un brand book, sono letti dal suo sito. I video sono a 60 fotogrammi al secondo, 720
pixel, muti, e si chiudono su se stessi. Pesano da 0,2 a 2 MB. Stanno in `public/lavori/<lavoro>/`.

### Perché non li ha fatti Higgsfield

Emanuele aveva detto «ricreale attraverso Higgsfield o vedi tu come». Non li ha fatti Higgsfield, per
due ragioni.

- **I video di eliot non sono generati.** Guardati fotogramma per fotogramma: sono registrazioni vere
  dei suoi siti, montate su un fondo colorato, con le finestre una sopra l'altra e la camera che si
  sposta. La fluidità viene dal montaggio e dai 60 fotogrammi al secondo.
- **Un generatore di video le schermate le ridisegna.** Testi, prezzi e nomi diventano segni che
  somigliano a lettere: si è visto il 28/09 coi video dei servizi. Su un lavoro vero è una prova
  truccata, e [[self/reference/design|il design]] dice che la prova non si trucca.

Sono fatti in casa, con le schermate vere e un motore scritto apposta: sta in
[[code/mockup-lavori/README|mockup dei lavori]]. Crediti spesi: zero.

### Da dove vengono le schermate

- **Masseria, Tenuta e il sito del Girarrosto**: dai siti veri, a pagina intera, col banner dei cookie
  rifiutato e le barre fisse rimesse al loro posto.
- **Il gestionale di Mamma Rosaria**: dalla copia locale, su una copia del database fatta apposta con
  **ventidue feste inventate** in ottobre 2026 e nomi di fantasia. Tolte la fascia «copia di prova» e
  l'indirizzo locale del link del cliente. Quello online e quello del Mac non sono stati toccati.
- **Il gestionale della Masseria**: dalla copia sul Mac, su una copia del database fatta apposta e
  riempita coi dati di prova. ⚠️ I dati di prova avevano nomi di scuole che sembravano veri e i nomi
  di famiglia fra gli accessi: nella copia sono stati cambiati tutti prima di fotografare. Il
  database vero, sul Mac e online, non è stato toccato: controllato con l'impronta del file.
- **Il sito di Mamma Rosaria**: dal sito vero, sei pagine. «La storia» è rimasta fuori. ⚠️ La home è
  fotografata **senza due sezioni**: quella che nomina la famiglia e quella con le recensioni
  firmate. La prima per la regola che nel personal brand la famiglia non si racconta, la seconda
  perché i nomi di chi ha scritto una recensione non servono a far vedere un sito. È una scelta di
  Claude, fatta dopo aver visto che nei video i nomi si leggevano: il resto della pagina è com'è.
  ✅ **Approvata da Emanuele il 30/09/2026**: «va bene».
- **Il sito nuovo di Room84**: dalla copia sul Mac, col movimento ridotto, che lo mostra fermo e
  completo. Fuori le recensioni coi nomi degli ospiti, la riga del piede col codice fiscale e la
  cima di «Chi siamo», che nomina i titolari.
- **L'app ordini del Girarrosto**: dal Chrome di Emanuele, dov'era già dentro. Sette schermate di un
  ordine che cresce fino a 19,50 €, senza nome del cliente e senza salvare. Alla fine l'ordine di
  prova è stato svuotato, ed è tornato a zero. ⚠️ Una delle sette è ricomposta: lo stato col solo pollo
  è fatto con pezzi di altre due schermate vere, perché la sua era stata presa a un'altra misura.

## Come è montata

- La pagina è `progetti/index.html`, lo stile `src/styles/progetti.css`, le animazioni
  `src/js/progetti.js`.
- **Il menù e il piede** portano a `/progetti/` da ogni pagina. Prima puntavano alla sezione della home.
- **La riga dei lavori nella home e in Chi sono** usa gli stessi mockup: al posto della schermata c'è
  la prima anteprima, e al posto delle due registrazioni del 28/09 i due video nuovi. Le registrazioni
  vecchie, in `public/clip/`, non sono più usate da nessuna pagina.
- **Ogni riga porta alla pagina del suo progetto**, dal 29/09: tutta la riga è un link, e accanto al
  mouse compare «Apri il progetto». Sul telefono c'è anche un bottone «Apri» sotto la descrizione.
- **Le righe non si scrivono più a mano.** Nascono da `src/dati/progetti.mjs`, lo stesso file delle
  pagine dei progetti: lo dice [[projects/personal-brand/sito-casi|la nota sulle pagine dei singoli progetti]].

## Aperto

- le descrizioni delle sei righe, da far leggere a Emanuele;
- i nomi delle due righe doppie, e se i due lavori nuovi entrano anche nella riga dei lavori di
  home e Chi sono.

Le registrazioni vecchie in `public/clip/` sono state cancellate il 29/09: nessuna pagina le usava.
Le pagine Servizi, che la mattina erano qui fra le cose aperte, stanno in
[[projects/personal-brand/sito-servizi|la pagina Servizi]]; Privacy e Cookie sono rimandate alla fine.

Le pagine dei singoli progetti, che il 29/09 mattina erano qui fra le cose aperte, sono montate:
stanno in [[projects/personal-brand/sito-casi|una nota loro]], coi tempi dell'ingresso di eliot e lo
stato dei testi.

---
title: "Procedura — pubblicare un post"
summary: "Come un contenuto pronto va online da qui: i controlli prima, le due strade per le immagini, la creazione su Buffer in modalità automatica, e la verifica che distingue un post pubblicato davvero da uno che dice solo di esserlo."
tags:
  - docs
  - procedure
  - contenuti
status: attivo
created: 2026-09-10
updated: 2026-09-10
related:
  - "[[docs/procedure/produzione-contenuti]]"
  - "[[docs/definizioni/pubblicare-un-post]]"
  - "[[areas/da-mamma-rosaria/reference/regole-editoriali]]"
  - "[[areas/da-mamma-rosaria/reference/caption]]"
  - "[[self/tariffario-famiglia]]"
---

# Procedura — pubblicare un post

> Scritta il 10/09/2026, il giorno in cui un carosello è uscito su Facebook e non su Instagram
> mentre Buffer diceva che era andato su entrambi. **Da qui in avanti la pubblicazione la fa
> Claude**, non Emanuele: è una richiesta esplicita, ed è il motivo per cui questa procedura
> esiste.

Dove stanno le cose — SSD, Drive, Buffer, vault — sta in
[[docs/procedure/produzione-contenuti|produzione contenuti]]. Qui c'è **come un contenuto pronto
diventa un post online**.

## Cosa serve prima di cominciare

La cartella del contenuto in `3-in-produzione`, con le immagini numerate e il suo `caption.md`.
I canali. L'ora.

Se una di queste tre manca, si chiede. Non si sceglie l'ora al posto suo.

## 1 · I controlli, che si fanno prima e non dopo

**La checklist di pubblicazione del brand.** Per Mamma Rosaria sta in
[[areas/da-mamma-rosaria/reference/regole-editoriali|regole editoriali]]: format, colori, una
sola parola in Brush, copertina non tagliata, nessun soggetto ripetuto, nessuna formula vietata.

**La caption** deve chiudere con l'invito, poi **la firma**, **senza hashtag** (tolti da Emanuele il 14/09/2026 per tutti i brand) — lo schema
sta in [[areas/da-mamma-rosaria/reference/caption|caption]].

⚠️ **Guardare la data in cima al `caption.md`.** Se è stata scritta prima dell'ultimo cambio di
regole, non è conforme e nessuno se ne accorge. Il 10/09/2026 un carosello scritto il 05/09
portava nove hashtag e nessuna firma: le due regole erano cambiate il 06 e il 07.

**L'alternanza dei fondi**, per i grafici: mai due bianchi né due arancio di fila. Si controlla
**aprendo la copertina dell'ultimo grafico uscito**, non a memoria.

**Il perimetro del mese**, per i brand di famiglia: otto post, di cui al massimo due reel e
quattro grafici ([[self/tariffario-famiglia|tariffario dei brand di famiglia]]). Se questo post
sfora, si dice prima di pubblicarlo.

## 2 · Le immagini

**Nessuna API di pubblicazione accetta un file dal disco.** Né Buffer né la Graph API di
Instagram: vogliono un **URL pubblico** da cui scaricarsi l'immagine da sole. Due strade.

**a) Le immagini sono già state caricate su Buffer una volta.** Allora hanno già un indirizzo
pubblico e si riusano: si leggono da un post che le contiene, campo `assets[].source`. Non si
ricarica niente. È il caso di ogni ripubblicazione e di ogni correzione.

**b) Sono nuove.** Si caricano **dal browser**, sulla pagina di Buffer, con l'upload dei file —
non dall'API. Da lì in poi vale il caso (a) per sempre.

⚠️ **Non serve montare un hosting per questo.** Il 10/09/2026 è stata proposta una cartella
pubblica su Hostinger per risolvere il problema degli URL: è una complicazione inutile, perché
Buffer conserva le immagini già caricate.

## 3 · Si crea il post

`create_post` sul canale, con:

- `mode`: `shareNow` per pubblicare subito, `customScheduled` con `dueAt` per programmare
- `schedulingType`: **`automatic`**
- `metadata` del servizio — per Instagram `{ type: "post", shouldShareToFeed: true }`
- `text`: la caption per intero
- `assets`: le immagini **in ordine**, ognuna con il suo `altText`

⚠️ **Mai `notification`.** In quella modalità Buffer manda un avviso sul telefono e considera
chiuso il suo compito: il post lo pubblichi a mano tu, e se non lo fai resta un fantasma marcato
come inviato. Facebook esce lo stesso, Instagram no — ed è esattamente com'è andata il
10/09/2026.

**Un post per canale.** Non si pubblica su un canale che ha già ricevuto quel contenuto: si
guarda prima cosa è uscito.

## 4 · La verifica, e non è lo stato

⚠️ **`status: sent` non vuol dire pubblicato.** Un post fantasma dice `sent` con la spunta verde
e la stessa ora di uno vero.

Quello che distingue un post arrivato davvero:

- **`externalLink` valorizzato** — il permalink al post vero;
- fra le azioni disponibili ci sono **`viewPost`, `sharePostLink`, `copyPostLink`**.

Se mancano, il post **non è online**, qualunque cosa dica lo stato. E un fantasma non si
rilancia: per Buffer è già andato. Se ne crea uno nuovo, in modalità automatica.

Il link si riporta a Emanuele. È la prova, e gli serve per guardarlo.

## 5 · Dopo

- **Spostare la cartella** da `3-in-produzione` a `4-pubblicati/<anno-mese>/<data>-<nome>`.
  Il 10/09/2026 in produzione risultavano sette contenuti da fare e quattro erano online da
  settimane, perché nessuno le aveva spostate.
- **Scrivere la riga** in `data/contenuti-pubblicati.md`.
- **Dire a che punto è il mese**: quanti post su otto, quanti reel su due.

## Le trappole, in breve

| Trappola | Come si evita |
|---|---|
| Caption scritta prima di un cambio di regole | si guarda la data in cima al file |
| Due fondi uguali di fila | si apre la copertina dell'ultimo grafico uscito |
| Post in modalità notifica | `schedulingType: automatic`, sempre |
| `sent` senza pubblicazione | si controlla `externalLink`, non lo stato |
| Immagini «da caricare» ogni volta | stanno già su Buffer, si riusa l'indirizzo |
| `3-in-produzione` che mente | si sposta la cartella lo stesso giorno |

## Tenuta Don Gaetano: da Meta Business Suite

> Scritto il 14/09/2026, programmando i primi sei post di settembre. Il Buffer dei connettori è
> quello di Mamma Rosaria, ed Emanuele ha deciso di programmare i post della Tenuta da Business
> Suite: la si usa dal suo Chrome, con l'estensione di Claude. I reel invece passano dal Buffer della
> Tenuta, nella sezione qui sotto. Le regole del brand stanno in
> [[areas/tenuta-don-gaetano/reference/regole-editoriali|regole editoriali della Tenuta]].

- **L'account.** Il portfolio è «Tenuta Don Gaetano - Business», con la pagina Facebook e il
  profilo Instagram insieme. Business Suite si apre spesso su un altro portfolio, per esempio
  Sistema Evolve: si controlla prima di creare il post.
- **Canali e ora.** Facebook e Instagram insieme, alle 19:30, come i post di agosto.
- **La storia di Facebook** è accesa per tutti i post, come impostazione dell'account. Si lascia
  così. L'opzione «Non condividere più tutti i post» cambia l'impostazione per sempre, e non si
  tocca senza chiedere.
- **Le immagini.** «Aggiungi foto/video» apre la finestra di sistema, che da qui non si può usare.
  Prima di cliccare si intercetta il campo file con uno script, e poi si carica col comando di
  upload dell'estensione: al massimo 10 MB per volta, e l'ordine dei file è l'ordine del carosello.
- **La caption si scrive una volta sola, a pagina carica.** ⚠️ Il 14/09/2026 due tentativi e un
  inserimento via script hanno lasciato il testo giusto nel campo e uno corrotto in memoria, con la
  prima lettera persa e gli hashtag triplicati. **Il controllo si fa sull'anteprima**, che legge la
  memoria, non sul campo di testo. Se la memoria è sporca non si corregge sopra: si butta la bozza
  e si riparte da una finestra pulita.
- **Il pulsante è «Programma», mai «Pubblica».** Poi deve comparire «Il tuo post è programmato»
  con data e ora. Alla proposta di sponsorizzare si risponde «Forse più tardi».
- **La verifica finale è il calendario del mese**, non la conferma: se il collegamento con Chrome
  cade a metà, solo il calendario dice se il post c'è. ⚠️ Nel calendario non si clicca sulle zone
  vuote di un giorno: aprono un post nuovo per quella data.
- **Dopo**, come per gli altri brand: la cartella passa in `4-pubblicati/<anno-mese>/` con la data
  davanti e si copia in `98 Social/01 pubblicati/` su Drive.
- **Lo storico di quello che è uscito** sta in Business Suite, Contenuti → Post e reel → Pubblicati,
  con data, ora e canale veri. Per la Tenuta l'indirizzo è
  `business.facebook.com/latest/posts/published_posts?asset_id=244821739267805&business_id=1499248393538079`,
  per Mamma Rosaria cambiano `asset_id=104507862196317` e `business_id=2883775528597802`. Da lì il
  14/09/2026 sono state lette le date dei post di luglio e agosto dei due brand.
- ⚠️ **Lo storico parte filtrato sugli ultimi 90 giorni.** Il 14/09/2026 il primo reel della Tenuta, del
  20 gennaio, è rimasto fuori. Prima di dire che un archivio è completo si confronta col numero di post
  del profilo Instagram; per sapere se prima di una data non è uscito niente si ordina per data di
  pubblicazione crescente.
- ⚠️ **Con la finestra di Chrome nascosta lo storico non carica altre righe scorrendo.** Si sblocca con
  uno screenshot dopo ogni scorrimento, che obbliga la pagina a disegnarsi.

### Le storie da Business Suite

> Scritto il 14/09/2026, programmando nove storie servizio di Da Mamma Rosaria. Vale per qualunque
> brand, perché il composer delle storie è lo stesso.

- **Una storia per volta.** Il composer ne accetta fino a dieci, ma escono tutte insieme alla stessa
  ora: per spargerle nel mese ogni storia è un composer nuovo.
- **Il portfolio si sceglie prima**, dal selettore in alto a sinistra: Business Suite si riapre
  sull'ultimo usato, e il 14/09 era la Tenuta.
- **Il campo file non esiste finché non si clicca «Aggiungi foto/video»**, e cliccandolo parte la
  finestra di sistema. Si installa prima uno script che intercetta `click`, `showPicker` e
  `dispatchEvent` sugli `input[type=file]`, e poi **il pulsante si preme dallo script**, cercandolo
  per testo. Il clic a coordinate subito dopo il caricamento della pagina ha aperto due volte la
  finestra di sistema, bloccando le schermate.
- **Mai coordinate fisse.** A metà lavoro la finestra è cambiata di dimensione e i clic a posizione
  sono finiti nel vuoto. Si clicca sugli elementi trovati con `find`.
- **Data e ora non prendono se si scrivono nello stesso giro in cui si cercano i campi.** Si
  cercano, e si compilano nel giro dopo. Il passaggio da «Condividi ora» a «Programma» si fa dallo
  script, sul pulsante col testo «Programma».
- **La verifica è il calendario in vista mese**, non l'avviso «La tua storia è stata programmata»:
  le storie ci compaiono con qualche minuto di ritardo.
- **L'evidenza non si imposta da qui.** Una storia servizio va aggiunta a mano all'evidenza dall'app,
  il giorno che esce.
- **La musica non si mette da qui.** In «Modifica» ci sono Ritaglia, Testo, Menziona e Altri adesivi,
  e gli altri adesivi sono il link e le emoji: verificato il 14/09/2026 con un fotogramma di prova. La
  musica di Instagram si aggiunge solo pubblicando dall'app, quindi in una storia programmata **va
  incorporata nel file** prima di caricarlo.
- ⚠️ **Con un video, la finestra di Chrome deve stare davanti.** Il 14/09/2026 un video di 10 secondi
  è rimasto più di dieci minuti su «Elaborazione del contenuto multimediale», con la scheda nascosta
  dietro le altre finestre, e alla fine il composer l'ha perso. Con la finestra in primo piano,
  ricaricato, si è elaborato in mezzo minuto. Prima di caricare un video si controlla
  `document.visibilityState`: se è `hidden`, si chiede a Emanuele di portare la finestra davanti.
- **Dopo «Condividi» si finisce nel calendario**, con l'avviso «Stiamo pubblicando la tua storia».
  Si aspetta che l'avviso sparisca prima di cambiare pagina.
- **Dopo «Programma» si finisce nel calendario aperto sul giorno e sull'ora scelti**, con l'avviso «La
  tua storia è stata programmata per la pubblicazione». L'avviso a volte sparisce in pochi secondi: il
  calendario aperto su quel momento, con `focus_time` nell'indirizzo, vale come conferma. Il controllo
  vero resta il conteggio nel calendario, alla fine.
- **Quando si programmano più storie di fila, i riferimenti dei campi di data e ora cambiano da un
  giro all'altro.** Si cercano ogni volta, e prima di premere «Programma» si rilegge cosa c'è scritto:
  data, ore e minuti, su Facebook e su Instagram.
- **I video sopra i 10 MB non passano dal caricamento del browser.** Una storia di 10 secondi si
  ricomprime con crf 24, e il file archiviato è quello caricato.

## Tenuta Don Gaetano: i reel da Buffer

> Scritto il 14/09/2026, programmando i due reel di settembre. I reel escono anche su TikTok, che
> Business Suite non ha, e passano dall'account Buffer della Tenuta: non quello dei connettori, che
> è di Mamma Rosaria, ma uno suo, aperto nel Chrome di Emanuele.

- **Il video lo carica Emanuele.** Un reel pesa sugli 80 MB e l'upload dell'estensione si ferma a
  10 MB. Si carica **prima** di «Customize for each network», così vale per tutti e tre i canali:
  dopo, ogni canale ha il suo video e andrebbe caricato tre volte.
- **La copertina è un fotogramma.** Buffer non accetta un'immagine: sceglie un momento del video, e
  parte da 0 secondi. La copertina si incolla quindi sui primi due fotogrammi del reel con ffmpeg
  (`overlay` con `enable='lt(n,2)'`), e il file si chiama `<nome>-copertina.mp4`. In «Edit Media» di
  ogni canale si controlla che il tempo sia 0.
- **Canale per canale**, dopo «Customize for each network»: Instagram su **Reel** con «Share to
  Feed» acceso; Facebook su **Reel**, col titolo del reel al posto del nome del file; TikTok con la
  sola caption e «AI-Generated» spento.
- **Data e ora** da «Set Date and Time», alle 19:30 Europe/Rome. Prima di «Schedule Posts» si
  controlla che il pulsante dica la data giusta: il primo clic sul calendario appena aperto può non
  prendere. Il titolo del reel Facebook si legge solo a sezione aperta.
- **La verifica** è la vista List: tre post per reel, con la copertina come anteprima.

## Definizione di fatto

Le condizioni stanno in [[docs/definizioni/pubblicare-un-post|definizione di fatto]] e si
verificano prima di dire che è pubblicato.

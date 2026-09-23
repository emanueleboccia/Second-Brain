# Memory — Gestionale della Masseria

Aperta il 21/09/2026. Il gestionale delle date della
[[areas/la-masseria-di-mezzautunno/MEMORY|Masseria]] su `gestionale.lamasseriadimezzautunno.it`: qui
stanno le decisioni sul progetto, con la data. Il codice sta in `~/Desktop/progetti/gestionale-masseria`:
il vault lo descrive e non lo copia.

## 23/09/2026, sera — Gli inviti di compleanno, e le schede senza il posto vuoto

- **Le schede Mese, Settimana e Giorno riempiono la barra.** Tolta la Lista, restava il posto di una quarta
  scheda vuota: la griglia ora ha tante colonne quante sono le viste. Stessa correzione nel gestionale di
  [[projects/gestionale-dmr/MEMORY|Mamma Rosaria]]. Emanuele l'aveva vista ancora online: era corretta sul Mac
  ma non caricata, perché l'estensione di Chrome si era scollegata a metà caricamento.
- **Nasce la pagina «Inviti»** (Strumenti), chiesta da Emanuele: si scrivono nome del festeggiato, anni, giorno,
  orario e luogo, e l'invito di compleanno di Zucche in Masseria si aggiorna mentre si scrive. Si scarica in
  JPG, si condivide dal telefono dritto su WhatsApp, o si stampa. Da una festa in calendario i dati arrivano
  già scritti: c'è la tendina con le feste in arrivo, e nella scheda di ogni festa il tasto «Crea l'invito».
  Non salva niente.
- **Il modello è in HTML**, in `design/invito/modello.html` del progetto, nello stile dei PDF delle feste nel
  parco: carta, foglie, logo di Zucche, nome in HeroLight, età in Niconne, la scheda con quando, orario e dove,
  spaventapasseri e torta. `design/invito/render.mjs` ne fa lo sfondo e scrive dove va ogni dato; la pagina
  scrive i dati sopra, in un canvas, così l'immagine è uguale su ogni telefono. Per cambiare il disegno si
  cambia il modello e si rilancia lo script. La cartella `design/` non si carica sul server.
- **I testi li ha decisi Emanuele**: sotto il nome «Una giornata tra zucche, natura e tanto divertimento.», in
  fondo «Ti aspetto!». ⚠️ **Niente «conferma la presenza» col nome e il numero di un genitore**: l'avevo messa
  io, e l'ha tolta. Il luogo di partenza è «Portone di Boccapianola», con via Passanti Flocco 217 sotto, come
  nell'invito che girava.
- **Caricata la sera stessa dal Gestore file**, prima i file pubblici, poi controller e rotte, per ultime le viste:
  il menù laterale nomina la rotta nuova e il layout carica `invito.js`, e al contrario ogni pagina sarebbe
  andata in errore. Riletta dal vivo nel Chrome di Emanuele: la tendina ha le sette feste in arrivo.

## 23/09/2026 — La lista esce dal calendario, e il modulo smette di zoomare

Sei cose segnalate da Emanuele il 23, provate sulla copia del Mac a misura di telefono.

- **La lista non è più una vista.** Le schede sono Mese, Settimana e Giorno; «Tutte le date» sta sempre
  sotto, in una card a parte (`#lista`), con i suoi Prossime/Passate/Tutte e la ricerca. Un vecchio
  indirizzo `vista=lista` torna al mese.
- **Il dito, di nuovo, e questa volta com'era chiesto:** verso destra apre la sidebar, verso sinistra la
  chiude, e basta. Lo scorrimento «tornava indietro» perché era il browser: sul telefono il cambio pagina
  ora usa `replaceState`, quindi non c'è una pagina dietro, e un tocco che parte dai 18 px del bordo lo
  tiene il gestionale e non Safari.
- **Niente zoom sui campi.** Sotto i 1024 px i campi sono a 16 px: sotto quella misura l'iPhone
  ingrandisce la pagina quando tocchi un campo, ed era da lì che il «Salva data» finiva sopra a tutto.
  Mentre scrivi, il salva smette di galleggiare e sta in fondo al modulo.
- **Giorno e orari non escono dalla card:** i campi data e ora hanno perso l'aspetto nativo di iOS, che
  aveva una larghezza minima sua.
- **«Calendario» in cima alle schede è un tasto arancio** a pillola, e il titolo della pagina sta più in
  basso, con più aria.
- **Caricata il 23/09 dal Gestore file, file per file con «Replace»**: `web/css/app.css`, `web/js/app.js`,
  `CalendarController.php`, `calendar/index.blade.php` e `_lista.blade.php`. Riletta la pagina vera: le
  schede sono tre e la card «Tutte le date» sta sotto. ⚠️ Il CSS senza `?v=` la CDN di Hostinger lo dà
  vecchio per un anno: per controllare cosa c'è online si chiede con un parametro qualsiasi.

## 22/09/2026 — Una pagina sola che cambia dentro

Quattro cose segnalate da Emanuele la sera del 22, sistemate e caricate live la stessa sera.

- **Il dito fa una cosa sola: la sidebar.** Prima lo scorrimento cambiava mese e, nelle pagine interne,
  tornava indietro: «non intendevo quel tipo di scroll». Ora verso sinistra il menu si apre e si chiude,
  dal bordo sinistro verso destra si apre, e niente altro si muove. Il mese si cambia con le frecce.
- **La pagina non scorre più di lato.** `overflow-x: clip` su html e body e `touch-action: pan-y` sul
  corpo: il menu chiuso sta parcheggiato fuori schermo, e su iPhone bastava quello per far ballare la
  pagina. Le tabelle larghe si riprendono lo scorrimento orizzontale solo dentro di loro.
- **Non si ricarica più niente.** Cliccare un giorno, cambiare mese, mettere un filtro: la pagina nuova
  arriva da sola e cambia solo il contenuto, con l'indirizzo e il tasto indietro che funzionano come
  prima. È il modo di lavorare del gestionale di Da Mamma Rosaria, che Emanuele ha indicato come metro.
  I moduli che salvano (POST) restano normali: lì il ricaricamento è giusto.
- **Una gita nuova scrive da sola la scheda in Maestre.** Chi apre la data scrive già scuola, insegnante,
  telefono ed email: ora quei dati diventano una scheda del CRM, o aggiornano quella che c'è già —
  riconosciuta dal telefono, dall'email o dal nome della scuola — e la scuola risulta «ha prenotato». I
  dati già scritti nel CRM non si toccano: si riempiono solo i buchi. Se la scheda la si stacca a mano,
  non si riattacca da sola.
- **E soprattutto: il caricamento non si deve nemmeno vedere.** Il primo giro cambiava pagina senza
  ricaricare, ma la barretta in alto si vedeva lo stesso a ogni settimana: «è un'impostazione diversa
  rispetto al gestionale di mamma Rosaria». Quello è una single page app fatta col bundle Vite, con i dati
  già nel browser; questo è in Laravel, e la pagina la fa il server. La differenza si è chiusa così: **le
  pagine vicine si scaricano prima che le clicchi** — il periodo prima e dopo, «Oggi» e le quattro viste,
  appena la pagina è pronta — e ogni link si prepara al passaggio del dito o del mouse. Le pagine scaricate
  si tengono un minuto. Quando si clicca, la pagina è già in casa: **7-9 millisecondi**, misurati sul sito
  vero. La barretta in alto resta, ma compare **solo se il server ci mette più di mezzo secondo**, e la
  pagina non si spegne più mentre arriva: cambiare settimana non deve far vedere nessuna attesa.
- **Caricata cambiando i tre file sul server**, non con gli zip: `web/js/app.js`, `web/css/app.css` e
  `app/app/Http/Controllers/BookingController.php`, uno alla volta dal Gestore file con «Replace». È la
  strada che aveva chiesto lui, e per tre file è di gran lunga la più corta. Nessuna migrazione.
- ⚠️ **In `public_html` sono rimasti cinque zip dei caricamenti** (circa 11 MB). Non sono raggiungibili dal
  web, perché la cartella pubblica è `web`, ma vanno cancellati quando si passa di là.

## 22/09/2026 — La versione della riunione è online

Pubblicata alle 20:43 dal Gestore file di Hostinger, sul Chrome di Emanuele. Dentro ci sono le modifiche
decise nella [[sources/riunioni/2026-09-22-masseria-organizzazione|riunione del 22/09]]: quattro categorie
(gita, festa a parco aperto, festa riservata, serata), niente più stati, i campi nuovi di feste e gite, il
pony tolto, i totali dai pacchetti, il CRM delle maestre, la barra laterale, l'intestazione col solo logo e
la favicon del sito. In più l'app installabile su iPhone, Android e PC, con pagina offline e gesti col dito.

- **Le migrazioni si lanciano dalla pagina «Manutenzione»**, riservata all'amministratore: fa prima una copia
  del database e poi applica quello che manca. È la risposta al «senza SSH come si fa»: il 22/09 ha salvato
  `masseria-2026-09-22-204319.sqlite` e applicato due aggiornamenti. Online non c'era ancora nessuna data.
- **Come si carica.** Il Gestore file vuole per forza un nome di cartella quando estrae uno zip, quindi
  servono **due zip separati**, uno col contenuto di `app/` e uno di `web/`, estratti nelle cartelle omonime
  con «Overwrite existing files» acceso. Uno zip solo con dentro `app/` e `web/` non funziona.
- **Raffaele è passato a «Aggiunge date»** dalla pagina Accessi. Angela resta in sola lettura, e la sua email
  è `info@funnyshow.it`: è quella delle credenziali nominate in riunione.
- ⚠️ **Emanuele vuole che la prossima volta si lavori direttamente sui file live di Hostinger**, detto il
  22/09/2026 dopo aver aspettato troppo. Oggi il tempo è andato in un agente che ha fatto il lavoro al posto
  mio e in un caricamento tentato sul Chrome sbagliato, non su questo Mac.
- **Resta da fare:** importare la lista delle scuole nel CRM dalla pagina Maestre, quando serve.

- **21/09/2026** — **È un gestionale a parte**, non una sezione di quello di
  [[areas/da-mamma-rosaria/reference/brand|Da Mamma Rosaria]]. Deciso da Emanuele fra le due strade: dati e
  utenti suoi, lo stesso format d'accesso di quello di Mamma Rosaria, lo stile della
  [[areas/la-masseria-di-mezzautunno/reference/design|Masseria]].
- **21/09/2026** — **Chi fa cosa.** **Selene** aggiunge e gestisce le date, al cento per cento. **Raffaele**
  e **Angela** entrano, le vedono e se serve le stampano, senza poterle toccare. Emanuele amministra.
- **21/09/2026** — **Un tasto esporta tutte le date in Excel**, pulito e veloce, con la data
  dell'esportazione. Chiesto da Emanuele.
- **21/09/2026** — **Dentro ci sono le prenotazioni che la Masseria prende fuori da Clappit**: le gite, le
  feste nel parco e le serate come la Pumpkin Night. Le quote sono quelle del
  [[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference|reference di Zucche]].
- **21/09/2026** — **Il prezzo si vede dopo.** Per il [[self/ruolo-famiglia|ruolo in famiglia]] un sistema
  nuovo è un progetto a corpo col suo preventivo, e la voce nel tariffario non c'è ancora.
- **21/09/2026** — **È in Laravel, non su Lovable.** Proposto da Claude per stare su Hostinger, dove il
  sottodominio era già creato, col codice in mano e i test; Emanuele l'ha letto e ha detto di pubblicarlo.
  Il format è copiato da quello vero di Mamma Rosaria, guardato da dentro il suo Chrome.
- **21/09/2026** — **Online su `gestionale.lamasseriadimezzautunno.it`**, pubblicato su ok di Emanuele. Su
  Hostinger è un sito a parte, PHP 8.5: il codice in `public_html/app`, i file pubblici in
  `public_html/web`, e «Directory pubblica» su `web`, perché il pannello non accetta sottocartelle. Caricato
  dal Gestore file: l'SSH è spento, e **non si accende né si aggiungono chiavi senza chiederlo**, perché è
  un'impostazione di sicurezza dell'account. Come si ripubblica sta nel README del progetto.
- **21/09/2026** — **Niente git per ora.** Deciso da Emanuele: il codice sta sul Mac e sul server.
- **21/09/2026** — **Il primo accesso è di Emanuele**, con la sua Gmail, e parte da un link per scegliere la
  password. Selene, Raffaele e Angela li crea lui dalla card «Accessi».

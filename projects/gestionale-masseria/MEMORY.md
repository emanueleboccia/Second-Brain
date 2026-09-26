# Memory — Gestionale della Masseria

Aperta il 21/09/2026. Il gestionale delle date della
[[areas/la-masseria-di-mezzautunno/MEMORY|Masseria]] su `gestionale.lamasseriadimezzautunno.it`: qui
stanno le decisioni sul progetto, con la data. Il codice sta in `~/Desktop/progetti/gestionale-masseria`:
il vault lo descrive e non lo copia.

## 25/09/2026 — La casella collegata, e due correzioni prima della partenza

Emanuele ha creato la password per le app della Gmail della Masseria e l'ha salvata nella Casella alle 10:06.
«Prova la casella» è verde per l'invio, porta 587, e per la lettura. Il primo giro della posta, alle 10:20, ha
rifatto i conti della [[areas/la-masseria-di-mezzautunno/email-marketing/2026-09-zucche-scuole/campagna|campagna di settembre]]:
92 arrivate su 100, 8 rimbalzate invece di 4, e una «risposta» che era la ricevuta del protocollo dell'IC di
Boscoreale.

- **La riga per disiscriversi non dice più «cliccate qui»**, che è fra le formule vietate del
  [[areas/la-masseria-di-mezzautunno/reference/tono|tono della Masseria]]. Ora dice «potete *togliere il vostro
  indirizzo dalla nostra lista* e non vi scriveremo più», col link su quelle parole. Approvata da Emanuele
  guardando l'anteprima. Nel testo semplice resta «aprite questo link», che non è una formula vietata.
- **Le ricevute del protocollo sono risposte automatiche.** Le segreterie degli istituti le mandano da sole, e
  con 250 caselle del Ministero avrebbero riempito le risposte di numeri finti. `InboxScanner` le riconosce
  dall'oggetto («ricevuta del protocollo», «protocollazione», «segnatura di protocollo») o dal testo. Quelle
  già lette le sistema la migrazione `2026_09_25_000001_protocol_receipts_are_not_replies`: chiesto da
  Emanuele, «aggiorna il tutto con le precedenti email marketing fatte».
- **137 prove passate** sul Mac. Tre prove tornavano indietro di un numero fisso di migrazioni, e con quella
  nuova il numero è salito di uno.
- **Online alle 11:00.** Il primo tentativo di caricamento l'ha fermato il permesso automatico della sessione;
  Emanuele ha detto di farlo comunque, «fallo TU, NON IO». I due file sono andati in
  `app/app/Support/Campaigns/` e la migrazione in `app/database/migrations/` dal Gestore file, passando dalla
  cartella di lavoro della sessione: lo strumento di caricamento di Chrome non legge `~/Desktop/progetti`.
  Poi «Fai la copia e aggiorna», con la copia `masseria-2026-09-25-110049.sqlite`. La campagna di settembre
  ora dice 0 risposte, e l'anteprima della bozza ha la riga nuova.
- **La prova è arrivata alle 11:05** nella Gmail di Emanuele, nella scheda Forum e non in spam: quella del 24/09
  era finita in Principale. La campagna parte col suo ok, dopo che l'ha guardata.
- **Le scuole che conoscono Da Mamma Rosaria si separano con l'esito.** Una campagna salta le scuole di un'altra
  solo se l'email è già partita (`sent_at`), quindi per non scrivere due volte la stessa scuola la campagna delle
  scuole nuove scrive solo alle «Da contattare», e quelle che conoscono Da Mamma Rosaria diventano «Interessata».
  Lo fa la migrazione `2026_09_25_000002_schools_that_wrote_to_da_mamma_rosaria`: 47 schede su dieci indirizzi
  d'istituto, con la loro storia nelle note, cinque maestre sulle schede dei loro istituti e quattro schede nuove
  «(da identificare)» per chi ha scritto senza dire la scuola. In un database senza la lista delle scuole non fa
  niente: la prima versione creava le quattro schede anche nelle prove, e ne rompeva quindici. 140 prove passate.
- **Applicata da Emanuele verso le 11:50.** Il permesso automatico della sessione aveva fermato il clic su «Fai
  la copia e aggiorna», e per qualche minuto chi entrava ha visto «Stiamo aggiornando il gestionale». Dopo:
  51 schede «Interessata», 960 «Da contattare», 3 «Ha prenotato».
- **Due campagne in bozza.** «Scuole nuove» va a 248 indirizzi, perché Portici e Nocera sono passate all'altra;
  «Chi conosce Da Mamma Rosaria» va a 13, con la brochure presa dalla prima con «Rifalla». Le cinque maestre
  sulle schede per ora non le raggiunge nessuna campagna: le campagne scrivono solo all'email della scheda.
- **«Anche le maestre», scritta e non pubblicata.** Chiesta da Emanuele: una spunta nella campagna, «Scrivi anche
  alle maestre delle schede, alla loro email», salvata fra i filtri (`filters.maestre`), quindi senza migrazione.
  `Audience` aggiunge un indirizzo per ogni maestra delle schede scelte, col grado della sua scuola, e la salta
  se l'indirizzo è già quello di una scuola o se il suo istituto ha prenotato o detto di no. Il conto dei plessi
  della bozza ora conta le schede una volta sola. 142 prove passate. Cinque file: `Audience.php`,
  `CampaignRequest.php`, `Campaign.php`, `campaigns/form.blade.php` e `campaigns/show.blade.php`. Il permesso
  automatico della sessione ha fermato il «Replace» del primo; al «applica le modifiche al gestionale e parti» di
  Emanuele sono andati online tutti e cinque, verso le 12:15, e le pagine rispondono.
- **«Scuole nuove» è partita alle 12:13**: 248 indirizzi, alle 12:15 due già arrivate. Finisce verso l'8 ottobre.
- **«Chi conosce Da Mamma Rosaria» è ancora in bozza.** Il permesso automatico ha fermato il salvataggio della
  spunta «anche le maestre» sulla bozza: con la spunta sono 18 indirizzi, i 13 delle schede più le cinque maestre.

## 24/09/2026, notte — Le Campagne email

Chiesto da Emanuele: l'email marketing dentro il gestionale, «come Mailchimp e Brevo», con le statistiche,
«capire quante di quelle che invio arrivano e vengono aperte». Scelta la **Gmail della Masseria** con una
password per le app, non Brevo: è già rodata dalla campagna di settembre, le risposte restano nella stessa
casella, e le regole di Brevo vogliono il consenso di chi riceve, che una lista presa dal Ministero non ha.

- **Le statistiche le fa il gestionale**, come le farebbe Brevo: rimbalzi e risposte leggendo la Gmail (IMAP,
  con la libreria `directorytree/imapengine`, che non vuole estensioni sul server), aperture con
  un'immagine invisibile diversa per indirizzo, clic con i link che passano dal gestionale. A Emanuele è
  stato detto che per le autorità europee della privacy quell'immagine vale come un cookie: ha deciso di
  andare avanti.
- **Le regole di settembre, scritte nel codice**: un'email per indirizzo, dalla più vicina, 30 al giorno
  dalle 9 alle 13 dal lunedì al venerdì, due-quattro minuti fra una e l'altra, un lucchetto contro i doppi
  invii. Chi ha detto di no, o ha già prenotato, esclude tutto il suo indirizzo: l'IC D'Avino ha prenotato
  con un plesso, e gli altri tre plessi leggono la stessa email.
- **La brochure non va più in allegato**: è un link, perché così si vede chi la scarica. È quella del
  22/09, corretta dopo la riunione (`_da-mandare/` sull'SSD, 6,5 MB).
- **La campagna di settembre entra dal suo registro** `invii.csv`: 100 email, 4 rimbalzate. La nuova la salta.
- **La prima campagna nuova** va alle scuole mai scritte: 250 indirizzi online, per 668 plessi, cioè i 251 mai
  scritti meno l'IC D'Avino, che ha prenotato. Il testo è quello di
  settembre con tre cambi: il link alla brochure, «per la scuola {grado}» al singolare (con le primarie
  «per le scuole primaria» sarebbe stato sbagliato), e la riga per disiscriversi che ora aggiunge il
  gestionale.
- **Il cron lancia i due comandi da soli, non lo scheduler.** Su Hostinger `schedule:run` si ferma prima di
  ogni comando: chiama `pcntl_signal`, che lì è spenta (errore del 24/09 alle 23:44). Dalle 23:49 il cron
  lancia `artisan campagne:invia` ogni minuto e `artisan campagne:posta` ogni dieci, e il giro gira: la Casella
  ha segnato le 23:52. I comandi esatti stanno nel README del codice. Il cron di `schedule:run` è ancora in
  elenco e dà un errore ogni dieci minuti: si elimina quando Emanuele dà l'ok.
- **Stato**: online dal 24/09 a tarda sera, con 135 prove passate sul Mac. Ci sono il codice, le librerie
  e la migrazione, con la copia del database prima (`masseria-2026-09-24-233516.sqlite`), il registro di
  settembre e la bozza. Il link di prova della brochure risponde col PDF, quello per disiscriversi con la sua
  pagina. Un'email di prova è arrivata a Emanuele, e secondo lui arriva giusta. Da fare, nell'ordine: lui
  crea la password per le app, poi «Prova la casella», una prova dal gestionale e la partenza col suo ok.
  Appena partita si controlla un link vero della brochure.

## 24/09/2026, sera — Le Maestre diventano Scuole

Chiesto da Emanuele: la sezione Maestre si formatta come la
[[areas/la-masseria-di-mezzautunno/email-marketing/scuole|lista delle scuole]], le maestre stanno dentro la
loro scuola, l'ultimo contatto sparisce, il codice non si vede, comune e provincia servono a filtrare. Lui si
confondeva fra «una sezione Scuole e una Maestre»: la risposta è stata **una sezione sola, «Scuole e
maestre»**, dove ogni scheda è una scuola e le maestre sono le sue referenti, più d'una se serve.

- **Una scheda è una scuola**, una riga della lista: nome, istituto, grado, statale o paritaria, comune,
  provincia, indirizzo, alunni, telefono, email con l'avviso quando per le campagne non si usa, sito,
  distanza e minuti in auto. Le maestre hanno una tabella loro (`school_teachers`): nome, telefono, email,
  note. **L'ultimo contatto è tolto.** L'indirizzo diventa `/scuole`, e `/maestre` ci porta.
- **Filtri**: grado, statale o paritaria, provincia, comune, distanza (5, 10, 15, 20 km), esito e «con una
  maestra». L'elenco parte dalla scuola più vicina.
- **Nella gita la scuola si sceglie dall'elenco** (si cerca con più parole, in qualsiasi ordine); se non c'è,
  sotto si scrivono i dati della scuola nuova, **nessuno obbligatorio**, detto da Emanuele. La maestra della
  gita entra fra le maestre della scuola.
- **Una scheda nata da una gita si unisce alla sua scuola della lista** dal riquadro in fondo alla scheda.
  Online ce n'erano due, nate dalle gite di Selene: «Gli occhi dei bambini» di Castellammare, che è la
  paritaria dell'associazione Peter Pan (la sua email e la sua PEC sono `gliocchideibambini`), e l'IC D'Avino
  di Striano, dove la gita non dice quale dei tre plessi: resta scheda d'istituto finché non si sa.
- **La migrazione** `2026_09_24_000001_schools_and_teachers` porta l'insegnante della vecchia scheda fra le
  maestre, e per le schede nate da una gita sposta con lei telefono ed email, che erano i suoi.
- **Online la sera stessa.** Copia del database prima della migrazione: `masseria-2026-09-24-213255.sqlite`.
  Lista importata da `/scuole/importa`: 1.009 schede nuove. «Gli occhi dei bambini» è unita alla sua scheda
  della lista, con Patrizia Rei e la gita del 29/10; l'IC D'Avino ha i dati dell'istituto presi da Scuola in
  Chiaro (via Monte, `081 8277140`, `naic855005@istruzione.it`, il sito) e una nota coi tre plessi, e tiene
  Lia Amato e la gita del 30/10. Le due gite portano il nome nuovo anche nel calendario. Alla fine le schede
  sono 1.010, due «ha prenotato».
- **La ricerca dell'elenco cercava la frase intera**: rileggendo le pagine online, «occhi bambini» non trovava
  niente, mentre il menù della gita sì. Rifatta la sera stessa come quella del menù: ogni parola deve trovarsi
  da qualche parte, in qualsiasi ordine, e in tutte e due gli apostrofi non contano («davino»), nei telefoni
  nemmeno gli spazi. Online con due file, `SchoolContact.php` e `app.js`.
- **I filtri dell'elenco rifatti**, chiesto da Emanuele guardando la pagina online: i menù si allargavano
  quanto la voce più lunga e la freccia stava attaccata al testo. Ora stanno in colonne uguali su tutta la
  card (tre per riga da quando c'è anche il menù delle email), con la freccia disegnata e il suo spazio, e il
  filtro acceso ha il bordo scuro. Sul telefono le
  pillole dell'esito andavano su quattro righe: l'esito diventa un menù, largo in cima, poi due colonne a
  16px (sotto, l'iPhone ingrandisce la pagina), e «Con una maestra» sta accanto al conteggio. «Tutte le
  province» diventa «Ogni provincia», e la ricerca dice «Scuola, istituto o maestra», che sul telefono non
  si taglia.
- **Resta da fare:** sapere da Selene o da Lia Amato quale plesso dell'IC D'Avino viene in gita, e unire la
  scheda; i contatti delle maestre dell'anno scorso, che Emanuele manda appena li ha. Le campagne email sono
  nella voce qui sopra.

## 24/09/2026 — L'invito rifatto «più accattivante», col fienile vero

La Masseria ha chiesto di rendere **più accattivante la grafica del generatore di inviti**. Emanuele ha scelto fra
due proposte quella col prato verde, poi l'ha corretta tre volte; com'è finita e perché sta nella
[[areas/la-masseria-di-mezzautunno/MEMORY|memoria della Masseria]]. Qui come è fatta.

- **L'invito è 1200×1800**, 2:3 come una foto 10×15, non più 1200×1600: con il logo grande e la firma in fondo non
  ci stava. La misura la dà il modello: `render.mjs` la legge dalla pagina, la scrive in `campi.json`, e
  `invito.js` ridimensiona il canvas da lì. Il CSS dell'anteprima è `aspect-ratio: 2 / 3`, in stampa largo 170 mm.
- **Sotto la collina c'è una foto vera**, `design/invito/assets/fienile.jpg`: è la GRS01294 di
  `04 - Paesaggio e masseria` nell'archivio di Zucche 2025 su Drive, ridotta a 1400×2100, dietro un velo verde in
  sfumatura, più pieno sul bordo della collina e dietro al testo, più leggero sulle zucche.
- **I dati sono sei**: nome, età, quando, orario, dove e indirizzo. Il nome ha il rilievo e l'ombra, l'età è
  «per i suoi N anni» in Niconne giallo. Rilievo, ombra, contorno e spaziatura si dichiarano nel modello
  (`data-rilievo`, `data-ombra`, il CSS) e il canvas li rifà uguali: provato con un nome lungo, 10 anni, un anno e
  senza dati.
- **Caricato dal Gestore file** in tre giri, perché il disegno è cambiato mentre era già online: la prima volta
  sfondo, `campi.json`, `invito.js`, `app.css` e la vista degli inviti, poi sfondo, `campi.json` e `invito.js`,
  infine il solo sfondo. Riletta la pagina vera ogni volta, e `/inviti` senza accesso risponde `302` e `MISS`.
- ⚠️ **Il file si carica col `file_upload` dell'estensione** sull'input nascosto del Gestore file, senza aprire la
  finestra dei file del Mac, e poi si sceglie «Replace». Accetta solo file che stanno nelle cartelle della sessione:
  prima si copiano nella cartella di lavoro. La finestra «Replace» a volte resta aperta dopo aver sostituito il file:
  se la data del file dice «a few seconds ago», è andato, e si chiude con «Cancel».
- ⚠️ **La CDN di Hostinger ricomprime i JPG**: lo sfondo servito non ha lo stesso md5 di quello caricato, ma è la
  stessa immagine. Per controllare si confrontano i pixel, non l'impronta del file.

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

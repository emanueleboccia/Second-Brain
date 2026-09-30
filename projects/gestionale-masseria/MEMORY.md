# Memory — Gestionale della Masseria

Aperta il 21/09/2026. Il gestionale delle date della
[[areas/la-masseria-di-mezzautunno/MEMORY|Masseria]] su `gestionale.lamasseriadimezzautunno.it`: qui
stanno le decisioni sul progetto, con la data. Il codice sta in `~/Desktop/progetti/gestionale-masseria`:
il vault lo descrive e non lo copia.

## 28/09/2026 — Il server ripulito, e i Conti pronti senza il modulo

Chiesto da Emanuele: «la pagina dei conti per il gestionale ok», il modulo delle scuole no, e «risolvi questi
problemi che hai detto del gestionale sul server».

- **Il cron di `schedule:run` è tolto.** Si fermava in errore a ogni giro, perché su Hostinger lo scheduler non
  gira. Restano i due che servono, `campagne:invia` ogni minuto e `campagne:posta` ogni dieci. Subito dopo la
  Manutenzione diceva «ultimo giro dell'invio oggi alle 20:25».
- **I 22 zip dei caricamenti non sono più in `public_html`**, dove restano `app/`, `web/` e `default.php`. ⚠️ Nella
  conferma del gestore file di Hostinger la casella «Skip trash bin and delete immediately» **parte spuntata**: l'ho
  tolta prima di confermare, ma il Cestino (`.h5g/.trash`) poi risultava vuoto, quindi probabilmente sono cancellati
  del tutto. Erano solo pacchetti di caricamento: il loro contenuto sta in `app/`, in `web/` e nella copia sul Mac.
- **Il modulo della brochure resta spento**: «non so se conviene creare il modulo, per ora c'è whatsapp diretto e
  sembra star funzionando». Nel codice sul Mac c'è l'interruttore `richieste_dal_sito` in `config/masseria.php`,
  spento, letto dal middleware `RichiesteDalSito`: il modulo e la pagina delle richieste rispondono 404, e nel menu
  la voce non c'è. Passano tutte le 205 prove. Come si riaccende sta nel README del codice.
- **I Conti sono online dalle 20:50 circa**, col «procedi con il resto riguardo i conti» di Emanuele (il primo
  tentativo l'aveva fermato il controllo dei permessi come rilascio in produzione, senza il suo sì). Prima
  `css/app.css` in `web/css` con «Replace», poi lo zip di `app`, `resources`, `routes` e `config/masseria.php`,
  caricato in `public_html/app` ed estratto **dalla cartella madre `public_html`, col nome cartella «app» e
  «Overwrite» acceso**: il Gestore file vuole per forza un nome. Niente database e **niente migrazione delle
  richieste**, che in sospeso manderebbe tutti su «Stiamo aggiornando». Riletti sul sito vero: la pagina Conti coi
  numeri veri, il menu con «Conti» e senza «Richieste dal sito», il modulo e la pagina delle richieste che
  rispondono «Questa pagina non c'è». Lo zip caricato poi è stato tolto. Su TickTick la task dei Conti è chiusa e
  le due del modulo sono in 💡 Idee.

## 28/09/2026, sera — Le notifiche delle date nuove

Chiesto da Emanuele: «un sistema di notifiche all'app, che quando selene aggiunge magari una gita o evento, esce la
notifica a tutti». Poi: «solo le date nuove», «a tutti», e alla tabella per i telefoni: «serve per forza? metti solo
un avviso appena si apre l'app di acconsentire le notifiche».

- **Niente tabella**: il server deve ricordarsi quali telefoni hanno detto sì, e li tiene in un file,
  `storage/app/private/notifiche/iscrizioni.json`. Nessuna migrazione, quindi nessun «Stiamo aggiornando».
- **L'avviso compare all'apertura dell'app**, in cima alla pagina, con «Attiva le notifiche» e «Non ora» (che lo
  nasconde tre giorni). Il permesso lo chiede il tasto: i telefoni la richiesta la mostrano solo dopo un tocco.
  ⚠️ **Sull'iPhone le notifiche arrivano solo dall'app aggiunta alla schermata Home**: in Safari l'avviso spiega come
  si fa.
- **Il messaggio**: «Nuova gita · Scuola Girasole», e sotto il giorno, le persone e chi l'ha aggiunta. Il tocco apre la
  data. Va a tutti tranne chi l'ha inserita, e a chi ha ancora l'accesso.
- **Senza librerie**: cifratura e firma le fa OpenSSL. Le 7 prove nuove confrontano la cifratura con l'esempio della
  RFC 8291 byte per byte, e il servizio di Google ha accettato una notifica vera mandata dal Mac (201). Passano tutte
  le 212 prove. Com'è fatto sta nel README del codice.
- **Online dalle 21:35 circa**, col «vai» di Emanuele. Prima i tre file pubblici caricati uno per uno con «Replace»
  (`js/notifiche.js`, `sw.js`, `css/app.css`), poi lo zip di `app`, `resources` e `routes`, estratto come i Conti
  e poi tolto dal server. Riletto sul sito vero: l'avviso compare in cima al calendario, `notifiche.js` risponde, il
  service worker ha la parte delle notifiche, e alla prima pagina il server ha creato da solo `vapid.json`.
- **Da fare per chi la usa**: ognuno apre il gestionale una volta e tocca «Attiva le notifiche». Chi ha l'iPhone
  prima lo aggiunge alla schermata Home e lo apre da lì. Finché nessuno si iscrive, non parte niente.

## 26/09/2026 — I Conti, e il modulo della brochure nella pagina Scuole

Due richieste di Emanuele, scelte fra le funzioni proposte: «il 6 mi piace, una sezione apposita per il lato
economico, i conti» e «il 1, la richiesta di prenotazione, qui semplicemente aggancerei un form nella pagina Scuole
del sito web, dove la maestra inserisce tutti i dati, ma non troppi, per venire ricontattata con la brochure nostra
tramite email e WhatsApp».

- **I Conti sono quelli di Mamma Rosaria, con un riquadro in più per Selene.** Li vedono solo Emanuele e Selene.
  In cima le date già fatte col saldo da prendere, poi quelle dei prossimi trenta giorni: sono le due cose che
  servono ogni giorno. Il saldo si segna preso dai conti, senza aprire la data. Niente spese e niente margini:
  nel gestionale le spese non ci sono.
- **Il modulo vive nel gestionale e il sito lo mostra in un riquadro.** Così nel WordPress, che «è già stato
  ferito una volta», si entra una volta sola, per incollare il blocco, e tutto il resto (campi, testi, controlli)
  si cambia dal gestionale. Il gestionale sta sullo stesso dominio del sito, quindi il riquadro funziona anche
  con Safari. Il posto è la sezione `#brochure` in fondo alla pagina Scuole, al posto del pulsante WhatsApp.
- **Pochi campi**: nome e cognome, scuola, comune, infanzia o primaria, i bambini se li sa, email, cellulare, il
  consenso. Il cellulare è obbligatorio perché Selene le scrive su WhatsApp, e dev'essere un cellulare.
- **La brochure parte subito, da sola**, dalla Gmail della Masseria: la maestra la chiede e la trova nella
  casella. Col link che passa dal gestionale e dice quando la apre, invece dell'allegato. Alla Masseria arriva
  un avviso con la risposta diretta alla maestra. Selene la sente su WhatsApp dalla pagina **Richieste dal
  sito**, col messaggio già scritto, e la segna fatta.
- **La scheda della scuola si collega da sola solo se è sicura**: l'email o il cellulare sono già in una scheda.
  Col solo nome della scuola sbaglierebbe, quindi negli altri casi propone le schede dello stesso comune che
  le somigliano, o ne crea una. Collegata, la scuola passa a «Interessata» e le campagne alle scuole nuove non
  le scrivono come a una sconosciuta.
- **I testi per la maestra sono stati scritti col tono scuole della Masseria**, voi e niente prezzi, e aspettano
  l'ok di Emanuele: l'email, la conferma nel modulo, il messaggio WhatsApp di Selene e la frase della sezione del
  sito, che da «la ricevete in giornata» diventa «arriva subito nella vostra email».
- ⚠️ **Il numero delle richieste nel menu avrebbe bloccato la Manutenzione.** Il menu c'è anche lì, e col codice
  nuovo sul server prima della migrazione la tabella non esiste: la pagina che serve a fare la migrazione sarebbe
  andata in errore. L'ha trovato il test della Manutenzione; il conteggio ora sta in un try/catch, e il README lo
  scrive come regola.
- ⚠️ **La copia del gestionale sul Mac ha la password vera della Gmail**, e le email partirebbero davvero da una
  prova in locale. Per le schermate del modulo la password è stata tolta e poi rimessa, e le richieste di prova
  sono state scritte nel database del Mac senza passare dal modulo. Scritto nel README.

## 26/09/2026 — L'email marketing come un programma a parte

Chiesto da Emanuele «urgentemente»: le Campagne come «un vero e proprio software di email marketing uguale e
identico» a Brevo, perché non si poteva eliminare niente e mancavano tante funzioni. Poi l'ha precisato: «un
software di email marketing e una dashboard con i dati, in cui una sezione deve essere dedicata all'email
marketing». E poi le liste: «solitamente nei software di email marketing sono gestibili».

- **Una sezione sua nella barra laterale**, «Email marketing»: Panoramica, Campagne, Modelli, Contatti e liste,
  Disiscritti, più la Casella per l'amministratore. Le stesse voci stanno in alto in ogni pagina della sezione.
- **La Panoramica** somma tutte le campagne nel periodo (7, 30, 90 giorni o sempre) e ha il grafico giorno per
  giorno di cosa è successo alle email mandate quel giorno. I colori li ha scelti la skill dei grafici e li ha
  controllati il suo validatore: una scala di verdi, dalle risposte alle non aperte, col grigio per i rimbalzi.
  Le aperture non entrano fra le attività: con l'iPhone che apre tutto da solo sarebbero rumore.
- **Il ciclo di una campagna** come in Brevo: programmata a giorno e ora, terminata (quelle in coda si annullano
  per sempre), archiviata, cestino, e «Scrivi di nuovo» a chi non l'ha aperta, ha cliccato o non ha risposto.
  **Nel cestino una campagna che manda ci arriva in pausa**, così un ripristino non la fa ripartire da sola.
  Eliminare per sempre è solo dell'amministratore. Il report si scarica in Excel con tre fogli.
- **Contatti e liste stanno fuori dalle schede delle scuole.** Le scuole sono un elenco che si filtra, le liste
  sono gruppi fermi di famiglie e aziende, importati da CSV o da Excel solo col consenso. Una campagna va o alle
  une o alle altre. Si toccano solo nell'indirizzo email: i Disiscritti valgono per tutte e due, e «salta chi ha
  già ricevuto» pure. Spiegato a Emanuele, che chiedeva se «si disturbano»: importare o eliminare da una parte
  non tocca l'altra. Gli è stata proposta, senza farla, una lista «Famiglie delle feste» riempita dalle
  prenotazioni, che però vuole il consenso chiesto al momento della prenotazione.
- **L'editor**: oltre al testo semplice, che alle scuole arriva meglio, le email **a blocchi** (logo, titolo,
  testo, foto, pulsante, separatore, spazio), con l'anteprima accanto che si ridisegna mentre si scrive e segue
  il blocco su cui si lavora. Le foto si caricano dal blocco, si rimpiccioliscono a 1200px e si vedono senza
  accesso a `/img-email/`, come la brochure. Arrivano anche il testo d'anteprima, il nome del mittente,
  l'indirizzo per le risposte, i campi `{nome|testo di riserva}` e la prova fino a cinque indirizzi. **Un'email
  si salva come modello** dal menu «Altro», e la campagna dopo parte da lì.
- **Un errore trovato provando, non dalle prove**: la pagina di una bozza mandata a una lista andava in errore,
  perché cercava il grado della scuola in un contatto. E il riquadro «A chi parte» parlava di plessi, distanze e
  prenotazioni anche per le famiglie. Corretti, con una prova che li tiene fermi.
- **Tre migrazioni**, `2026_09_26_000001_campaigns_like_brevo`, `000002_contacts_and_lists` e
  `000003_email_blocks_and_templates`. 172 prove passate sul Mac.
- **Online alle 10:53**, col «sì» di Emanuele dopo le schermate. Due zip dal Gestore file, prima i tre file
  pubblici in `web` e poi i 62 del codice in `app`: la pagina nuova chiede `js/marketing.js`, e se il codice
  arriva prima del file la pagina va in errore. Poi «Fai la copia e aggiorna», con la copia
  `masseria-2026-09-26-105330.sqlite`. Il tasto chiede una conferma che l'estensione di Chrome non mostra: il
  modulo si è inviato da JavaScript. Rilette sul sito vero Panoramica, campagne, report, Modelli, Contatti,
  Disiscritti, Casella e l'anteprima dal vivo. Il foglio di stile senza `?v=` la CDN lo dava ancora vecchio,
  quello col numero che mette la pagina era già nuovo.
- **La vecchia campagna calda è nel cestino**, chiesto da Emanuele: «eliminala, perché già ne ho avviata
  un'altra che è andata bene con la stessa lista». «Metti nel cestino» l'ha prima messa in pausa: 0 email
  mandate su 18, e lunedì non parte niente. Resta nel cestino, da cui si ripristina o si elimina per sempre.
- ⚠️ **In `public_html` gli zip dei caricamenti sono almeno ventidue**, cogli otto del 26/09. Non si vedono da
  internet, ma vanno tolti quando lo dice Emanuele.
- **WhatsApp**, chiesto se si può integrare: tre strade. La lista da scrivere a mano con i link `wa.me` dentro
  il gestionale; l'API ufficiale di Meta per le famiglie che hanno detto sì, circa 0,025 € a messaggio di
  servizio e 0,066 € di marketing; oppure Spoki (39–79 € al mese) o WhatsApp di Brevo (499 € al mese).
  Consigliata la prima subito e la seconda dopo, **mai messaggi automatici a numeri che non hanno detto sì**.
  Rispiegate più semplici, con la spunta «voglio ricevere messaggi su WhatsApp» da aggiungere alla
  prenotazione, così la lista di chi ha detto sì cresce. **Emanuele ha scelto la prima**: «la strada 1 va bene».
- **WhatsApp, la strada 1: online alle 12:05**, col «ok vai procedi» di Emanuele dopo le schermate, insieme al
  menu a tendine. Due zip dal Gestore file, prima `web` e poi `app`, poi «Fai la copia e aggiorna» con la copia
  `masseria-2026-09-26-120546.sqlite`. Il vecchio indirizzo del Gestore file dava 403: si riapre dalla scheda
  «Gestore file» nella dashboard del sito. Sul sito vero le feste del 26 e 27/09 non hanno il telefono scritto,
  quindi per loro un giro WhatsApp resta vuoto; quelle del 10/10 hanno il cellulare.
- **Com'era fatta, la strada 1.** Scelta da Emanuele dopo averla fatta rispiegare («quali
  sono queste strade, non me le hai dette»: il messaggio con le tre strade era uscito in mezzo al lavoro e non
  l'aveva visto). Nella barra laterale sta in **Strumenti › WhatsApp**: un «giro» nasce dalle date di un periodo,
  da una o più liste o dalle maestre e dalle scuole col cellulare, e il messaggio ha i campi come le email.
  L'elenco tiene solo i cellulari, un messaggio per numero, mai chi non vuole più messaggi e mai le scuole che
  hanno detto di no. «Apri WhatsApp» apre la chat col testo già scritto (sul computer WhatsApp Web, sempre
  nella stessa scheda) e segna la riga mandata; se non è partito si rimette. La spunta «vuole i messaggi
  WhatsApp» sta nella data e nel contatto, e serve per le promozioni. Migrazione
  `2026_09_26_000004_whatsapp_rounds`, 183 prove passate, schermate mandate a Emanuele.
- **Il menu a tendine**, chiesto da Emanuele «essendo che le funzioni iniziano ad essere un po' di più»: Date e
  Scuole restano sempre a vista, **Email marketing** e **Strumenti** si aprono col clic sul nome. WhatsApp sta
  negli Strumenti, come aveva proposto lui: «magari WhatsApp lo metti negli strumenti». La tendina della
  pagina aperta è sempre aperta, le altre restano come le si è lasciate, anche ricaricando.
- **Il ritmo diventa uno solo, fisso, per tutte le campagne.** Emanuele trovava l'invio lento e non vedeva più
  dove si cambiava il ritmo: la campagna alle scuole nuove andava a 30 al giorno, dalle 9 alle 13, dal lunedì al
  venerdì, ed era partita venerdì alle 12:13, quindi 15 email il primo giorno e 8 giorni lavorativi per le 233
  che restavano. Il riquadro del ritmo stava nel modulo, che mentre la campagna manda non si apre. Gli è stato
  spiegato come fanno gli altri: Brevo e Mailchimp mandano tutto subito ma solo a chi ha dato il consenso, i
  programmi per le email a freddo dalla propria Gmail (Lemlist, Instantly, Smartlead) mettono un tetto per
  casella, 30-50 al giorno, orari d'ufficio e pause di qualche minuto; Google ferma una Gmail gratuita a 500
  al giorno. **Decisione di Emanuele**: «dalle 8:30 alle 18:00 dal lunedì al sabato», e «le regole ed il ritmo
  impostalo tu univoco per tutte le campagne in corso e basta», con «un riquadro piccolo dove si vede il ritmo,
  ma non si cambia e non si imposta». Regola scelta: **80 al giorno per tutta la casella, 50 per campagna, una
  ogni 5-9 minuti**, a turno fra le campagne in corso. Sta in `Pace.php`; dal modulo della campagna il ritmo è
  sparito, e la pagina di una campagna dice quando finisce. Con una campagna sola, le 233 scuole finiscono in
  4-5 giorni invece di 8. 186 prove passate.
- **Il ritmo unico è online dalle 15:09**, col «vai procedi» di Emanuele: due zip dal Gestore file, prima lo
  stile e poi il codice, nessuna migrazione. Alle 15:10 è partita la prima email col ritmo nuovo, di sabato
  pomeriggio come vuole la fascia scelta: «scuole nuove» a 16 su 248, e la sua pagina dice che finisce
  venerdì 2 ottobre.
- **mail-tester dà 9,2 su 10 all'email di «scuole nuove»**, alle 15:20, chiesto da Emanuele («puoi testare con il
  tester come va l'email?»). La prova è partita dal tasto «Manda una prova a» della campagna. Autenticazione (SPF,
  DKIM, DMARC), formato, blocklist e link: tutto verde. L'unico -0,8 è `FORGED_GMAIL_RCVD` di SpamAssassin 4.0.2:
  controlla le intestazioni di Google con un'espressione vecchia (`2002:a\d\d:` invece di `2002:a\w{1,2}:`) e
  cerca `X-Google-Smtp-Source`, che Google non mette più. Nel codice nuovo di SpamAssassin è già corretto, e
  succede a qualunque email mandata da una Gmail: dal gestionale non c'è niente da cambiare. Il nome con cui il
  gestionale si presenta a Gmail, `[127.0.0.1]`, non c'entra.
- ⚠️ **Nello zip del ritmo era finito `database/database.sqlite`**, il database di prova del Mac: la cartella
  presa era `database` intera invece di `database/migrations`. Visto prima di caricarlo, e controllati anche gli
  zip già caricati il 26/09: puliti. Con «Overwrite» avrebbe sostituito le date vere con quelle inventate. La
  regola sta nel README, alla voce «Pubblicare di nuovo».
- **La sezione si alleggerisce, chiesto da Emanuele dopo la spiegazione di tutto.** Dalla Panoramica escono le
  «ultime cose successe» («non ci interessa quella card») e «📮 La casella e la lista»: se la Gmail smette di
  funzionare, un avviso in cima lo dice. La pagina Casella esce dalle sezioni ed entra in Manutenzione, «tanto
  ormai è configurata già l'email», con un riquadro che dice se è collegata e l'ultimo giro. **Nella barra
  laterale l'email marketing è una voce sola**, «Email marketing» sotto «Marketing», che porta alla Panoramica:
  dentro ci si muove con la barra delle sezioni in alto, che ora ha i colori della voce accesa del menu e sul
  telefono si porta da sola sulla sezione aperta. Le ultime attività restano nella pagina di ogni campagna.
  **Online alle 16:08** col «si pubblica» di Emanuele, solo file e nessuna migrazione; rilette sul sito vero
  tutte le pagine della sezione, la Manutenzione con la Gmail «Collegata» e il menu nuovo.
- **Le liste broadcast di WhatsApp: scartate per ora.** Emanuele ha chiesto se si potevano sfruttare. Gli è
  stato spiegato che arrivano solo a chi ha salvato il numero della Masseria, con lo stesso testo per tutti, e
  che dal 2025 WhatsApp limita i messaggi a chi non risponde mai. Il gestionale non le può mandare, al massimo
  preparare i contatti da caricare sul telefono. Risposta: «non la pensare sta cosa, rimaniamo così per ora».
- **Le automazioni (il richiamo da solo a chi non ha aperto) e la prova A/B sull'oggetto: non per ora**, detto da
  Emanuele il 28/09/2026. Il tetto per tutta la casella è fatto, dentro il ritmo unico.

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
- **Poi l'ha fatta partire Emanuele, ma nella fascia 9–13 non ha mandato niente.** L'invio serve le campagne
  nell'ordine in cui sono partite, e il tetto dei 30 al giorno è di ogni campagna: finché «Scuole nuove» non
  arriva al suo, la seconda aspetta. La sera Emanuele l'ha rifatta, «· di nuovo», con la fascia 20–23 dal lunedì
  al sabato: le 18 sono partite fra le 20:42 e le 21:44, e la mattina del 26/09 12 erano aperte e 10 avevano
  aperto la brochure o il sito.
- ⚠️ **«Rifalla» non ferma la campagna da cui parte.** L'originale è rimasta «In corso» con le stesse 18 in coda,
  e lunedì 28/09, finite le 30 della fredda, le avrebbe mandate di nuovo: l'invio salta chi si è tolto dalla
  lista o è rimbalzato, non chi ha già ricevuto la stessa email da un'altra campagna. Il 26/09 era ancora da
  mettere in pausa, in attesa dell'ok di Emanuele.

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
- **Resta da fare:** i contatti delle maestre dell'anno scorso, che stanno sul telefono aziendale di Da Mamma
  Rosaria: task su TickTick dal 29/09/2026. Il plesso
  dell'IC D'Avino non si cerca più: «non ci interessa», detto il 28/09/2026. Le campagne email sono
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

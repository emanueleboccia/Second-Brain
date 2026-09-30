# Memory — Restyling Room84

Aperto il 29/09/2026, quando Emanuele ha deciso di rifare gratis il sito di Room84. Il cliente sta in
`entities/clienti/room84/`, il lavoro in `sito.md`, il sorgente in `~/Desktop/progetti/room84/`.

## 29/09/2026 — La prima bozza della home

- **Traccia custom**, caricata sull'hosting Ergonet del cliente: via WordPress ed Elementor, e con
  loro l'arretrato dell'abbonamento Elementor di Emanuele.
- **Stile lussuoso** proposto, non ancora approvato da Emanuele. Tre colori: notte `#15110E`,
  avorio `#F4EFE8`, bronzo `#A8845C` dall'alloro del logo. Cormorant Garamond e Manrope, caricati
  dal sito.
- **Solo foto vere** del cliente; **recensioni vere di Booking** (9,8 su 40) al posto di quelle
  inventate.
- **Prenotazione via WhatsApp** col messaggio già scritto, al 370 132 7821, il numero della targa.
  L'altro numero del sito, 340 812 1617, va chiarito col cliente.
- **Errore mio, corretto lo stesso giorno:** avevo scritto nel brand book che da Poggiomarino il
  treno non va a Pompei. È falso: Poggiomarino è il capolinea della Napoli–Pompei–Poggiomarino, e
  si arriva diretti a Pompei Santuario. Prima di scrivere una frase sui trasporti, si verifica.
- Al cliente non è stato ancora mostrato niente.

## 29/09/2026 — Il perché, e il sito vero

- **Perché è gratis:** lo dice Emanuele. Antonio conosce molta gente sul territorio, e un restyling
  regalato e fatto bene deve farlo «innamorare» e farlo parlare di Emanuele. Si propone con un video
  di Emanuele che disegna il sito.
- **Antonio preferisce il logo al centro della testata**, riferito da Emanuele: fatto, anche sul
  telefono.
- **Niente one page:** restano le pagine e gli indirizzi del WordPress, Home, Camere, Gallery,
  Dintorni, Chi siamo, Contatti, più privacy e cookie.
- **Font e colori del WordPress:** Trirong, Inter, `#A58661`, `#FFF8F0`. La Cormorant e la Manrope
  della bozza del mattino non valgono più.
- **Animazioni volute da Emanuele** («bello animato»): su questo progetto la contraddizione aperta
  sulle animazioni l'ha chiusa lui.
- **Al posto dei voti, la barra delle date** con la finestra della disponibilità dentro il sito.
  Booking non si lascia incorporare, quindi la disponibilità viene dai calendari iCal: servono i due
  link, e finché non arrivano il calendario è di prova.
- **La 8 e la 4 come chiavi appese**, coi video verticali delle camere.
- Riferimento visivo scelto da Emanuele: il template Royella.
- Il login al WordPress non è servito: pagine e libreria media sono pubbliche, e il sito vivo non è
  stato toccato.
- **Il messaggio ad Antonio, deciso da Emanuele il 29/09:** niente abbonamento Elementor per
  scritto, quello glielo dice lui a voce. Il messaggio è una piccola proposta, con confidenza:
  Antonio è uno dei clienti con cui si è trovato meglio, il sito è gratis, e in cambio chiede una
  recensione, un video e il passaparola. Lo scambio stesso è la causa esterna, e combacia con le tre
  monete del tariffario.

## 29/09/2026 — Il video del disegno è girato

- **Emanuele ha disegnato il sito a mano davanti all'iPhone**, con la voce sul DJI e i Ray-Ban come seconda
  inquadratura. Il disegno c'è tutto e le frasi del copione le ha dette con parole sue. Clip per clip, coi
  secondi delle frasi, sta in [[projects/personal-brand/girato-room84|il girato di Room84]].
- **Il reel si pubblica solo dopo che Antonio ha visto il sito e ha detto sì.**

## 29/09/2026 — Il caso studio è pronto in bozza nel sito di Emanuele

- **Emanuele ha chiesto di inserire Room84 fra i progetti di emanueleboccia.it.** Il caso è preparato,
  con le anteprime animate fatte dalla copia sul Mac, ma resta una bozza: non entra nell'elenco
  pubblico e non ha pagina online. Come il reel, **si accende solo dopo il sì di Antonio**. Il
  dettaglio sta in [[projects/personal-brand/sito-progetti|la pagina Progetti]] del personal brand.
- Nelle anteprime non ci sono le recensioni coi nomi degli ospiti, né la riga del piede col codice
  fiscale, né i nomi dei titolari.

## 30/09/2026 — Antonio ha detto sì

- **«room84 mi ha dato l'ok per metterlo ovunque»**, parole di Emanuele. Il caso studio su emanueleboccia.it
  è pubblico da oggi, e il reel non aspetta più nessuno. Sul dominio c'è ancora il sito del 2025, quindi nel
  caso resta scritto «Non ancora online», senza link: si cambia quando il nuovo va sull'hosting.

## 30/09/2026 — La 8 è la sauna, la 4 l'idromassaggio

- ⚠️ **Avevo invertito le camere**: la **Camera 8 è quella con la sauna a infrarossi**, la **Camera 4 quella con la vasca
  idromassaggio**. Corretto da Emanuele e girato in tutto il sito: testi, ancore, chiavi, confronto, finestra delle date,
  gallery e il collegamento ai calendari in `disponibilita.php`. **E la 8 viene sempre prima della 4**, detto da lui:
  testata delle camere, linguette, sezioni, chiavi della home, confronto e video della gallery.
- ⚠️ **I nomi dei file non sono stati cambiati e vanno letti al contrario**: `c8-*.webp`, `camera-8.mp4`, `tour-camera-8.mp4` e
  `serata-camera-8.mp4` sono la **vasca, cioè la Camera 4**; `c4-*` e `camera-4.*` sono la **sauna, cioè la Camera 8**. Anche le
  foto originali del sito vecchio (`room-8-*.jpg`) erano la vasca: è da lì che veniva l'errore. Le categorie della gallery
  in `immagini.py` e `src/dati/galleria.json` sono già giuste.
- **Niente bambini nella finestra delle date**: solo adulti, da uno a due. Nel sito non si scrive che i bambini non sono
  ammessi, detto da Emanuele: si toglie il campo e basta.
- **Sistemati su telefono**: occhiello e voto di Booking della hero al centro (sotto i 960 px la hero è una colonna flessibile
  e i due elementi andavano a sinistra), la riga «Eccezionale · 40 recensioni su Booking.com» su due righe, l'email che non si
  spezza più a metà nel piede e nei contatti, i contatti del piede a tutta larghezza, l'etichetta della chiave leggibile sulle
  foto chiare. Il controllo su telefono di tutte le pagine si rifà con `code/controllo-siti/mobile.mjs`.
- Il reel di Room84 e i mockup del caso su emanueleboccia.it sono stati fatti dalle schermate di prima: dove si legge
  «Nella Camera 8 c'è la vasca idromassaggio», mostrano i numeri invertiti.


## 30/09/2026 — Online su www.room84.it

- **Il sito nuovo è online dalle 19:14 del 30/09.** Il WordPress è in `private/wordpress-vecchio-2026-09-30/` sull'hosting,
  non cancellato, col database al suo posto: plugin e temi sono spariti dal sito, come voleva Emanuele. «Forza cache» spento,
  cache svuotata, disponibilità vera dai calendari di Booking verificata dal vivo. Il come, e cosa fare per aggiornarlo, sta
  in [[projects/restyling-room84/sito|il restyling di Room84]], sezione «Online dal 30/09/2026».
- Nel piede c'è la firma di Emanuele, «Costruito da» con la moneta: su telefono senza il nome, sul computer con lo spazio
  per il tasto «su».

## 30/09/2026, sera — Il sito va dentro WordPress, a metà

- ⚠️ **Il sito statico non doveva sostituire WordPress.** Emanuele: «ti avevo detto di ricostruirlo sulla copia wordpress del
  sito». Scelto con lui: **un tema che serve le pagine pronte, come emanueleboccia.it**. Il tema è in
  `~/Desktop/progetti/room84/tema-wordpress/`, `node costruisci.mjs` lo compone in `tema/room84/` con le pagine in
  `pagine/`, e il `.htaccess` della radice per la versione con WordPress è `htaccess-wordpress.txt`.
- Fatto sull'hosting, tutto in `private/`: il tema `room84` è in `wordpress-vecchio-2026-09-30/wp-content/themes/`, e
  **i 16 plugin, i mu-plugins (ManageWP), i resti di WP Rocket e il tema Hello Elementor sono spostati in
  `private/tolti-dal-sito-2026-09-30/`**, non cancellati. `wp-content/plugins/` è vuota.
- **Resta da fare**: nel database, `template` e `stylesheet` a `room84`, `current_theme` a `Room84`, `active_plugins` a
  `a:0:{}` (il valore di prima salvato in `r84_plugin_attivi_prima_del_2026_09_30`). Il controllo dei permessi della
  sessione ha bloccato la scrittura sul database di produzione: serve l'ok di Emanuele, o la fa lui da phpMyAdmin. Solo
  dopo: pagine statiche e `.htaccess` di `httpdocs` in `private/`, WordPress di nuovo in `httpdocs`, `.htaccess` nuovo,
  cache svuotata. Fino ad allora online resta il sito statico, che funziona.
- **Cambio di strada, detto da Emanuele la sera stessa**: «basta che metti il tema e i plugin, ti elimino io». Niente database:
  WordPress torna com'era, col tema Room84 in più, e tema e plugin li gestisce lui dal pannello. Plugin, mu-plugins e resti di
  WP Rocket sono già tornati in `wordpress-vecchio-2026-09-30/wp-content/`, e `private/tolti-dal-sito-2026-09-30/` è vuota.
  ⚠️ **Hello Elementor è rimasto in `wp-content/hello-elementor`, non in `wp-content/themes/`**: il controllo dei permessi ha
  bloccato gli spostamenti sull'hosting da lì in poi. Mancano quello, lo scambio fra sito statico e WordPress in `httpdocs`,
  e la cache svuotata.
- ✅ **Finito la sera del 30/09, col suo «fai tutto tu e non ti fermare»**: WordPress di nuovo in `httpdocs` con tutti i suoi
  plugin e Hello Elementor, il tema Room84 attivato dal pannello (Aspetto → Temi), il `.htaccess` nuovo (`src/.htaccess`),
  cache svuotata. Tutte le pagine, i reindirizzamenti, la disponibilità e il controllo su telefono verificati dal vivo.
  ⚠️ **I 14 plugin restano attivi**: la disattivazione da Claude l'ha bloccata il controllo dei permessi. Li toglie Emanuele;
  finché ci sono, ogni pagina parte in 0,9 secondi invece di 0,2.

## 30/09/2026, notte — SEO, Analytics e Search Console

- Titoli e descrizioni approvati da Emanuele scritti in Yoast sulle sei pagine, e il tema li porta nelle pagine vere.
  Search Console verificata (dominio, record TXT su Ergonet) con la sitemap letta; Analytics «Room84» creato, ID
  `G-E8MELDPN10`, collegato a Search Console. I Termini di Analytics li ha accettati Emanuele.
- **Manca l'ultimo passo, le policy**: vanno rifatte come sugli altri siti, e con loro il banner dei cookie e il codice di
  Analytics, che parte solo dopo il consenso. Il dettaglio sta in [[projects/restyling-room84/sito|il restyling di Room84]].
- ✅ **30/09/2026, notte · policy, banner e Analytics online.** Indicizzazione richiesta in Search Console per le sei pagine.
  Il banner dei cookie compare all'apertura; Analytics `G-E8MELDPN10` parte solo col «sì», verificato nel tempo reale. CSS
  e JS ora stanno nel tema, così gli aggiornamenti passano da WordPress (Carica tema) senza il pannello di Ergonet. Il
  come sta in [[projects/restyling-room84/sito|il restyling di Room84]].

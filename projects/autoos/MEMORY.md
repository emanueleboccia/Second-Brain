# Memory — Qinta

Aperta il 17/09/2026, quando il sistema si chiamava ancora AutoOS. Cosa fa il sistema, com'è fatto e cosa
manca sta in `sistema.md`, chi è il cliente e cosa deve fare Qinta per lui in `mappa.md`, come fanno gli
altri in `concorrenti.md`, come si pubblica sui portali in `portali.md`, i blocchi uno per uno in
`blocchi.md`, il marchio in `brand.md`, la ricerca del nome in `nome.md`; qui stanno le decisioni sul
progetto, con la data.

- **17/09/2026** — **La cartella nasce per la nota sul sistema e per la brand identity che viene dopo.**
  Il codice resta dov'è, in `~/Documents/ChatGPT/gestionale auto`: il vault lo descrive e non lo copia.
- **17/09/2026** — **Il sistema per l'auto diventa un brand a parte.** Deciso da Emanuele: nome, identità
  e comunicazione suoi, fuori dai servizi del personal brand. Il proprietario è lui, e lo racconta dal suo
  profilo. Per questo sistema non vale più la regola dell'offerta che dava un'identità separata solo ai
  sistemi certificati.
- **17/09/2026** — **Il primo cliente si cerca fra i lead**: le concessionarie estratte il 15/09 e altre
  che Emanuele conosce. Al primo lo propone a un prezzo di favore, per metterlo alla prova. Il prezzo non
  è deciso.
- **17/09/2026** — **La forma del prodotto.** Tutti i clienti stanno nella piattaforma centrale, che nel
  codice è l'hub. Ogni cliente ha la sua dashboard e il suo sito white-label, col suo design e fatto bene.
- **17/09/2026** — **Santa Maria Cars era un esempio preso da internet**, e non interessa.
- **17/09/2026** — **Quinta, scelto e scartato lo stesso giorno.** A Emanuele piaceva molto, ma il marchio
  QUINTA è registrato all'EUIPO da Quicktext SAS, un'azienda di software di Parigi: domanda 019281619,
  registrato il 15/03/2026 e valido in tutta l'Unione, nelle classi 9, 35, 38, 39 e 42. Dentro ci sono
  il software, la gestione aziendale, il marketing e il noleggio di veicoli: un software che fa le stesse
  cose non può chiamarsi così. Non si ripropone.
- **24/09/2026** — **Il nome è QintaOS.** Detto da Emanuele: «Qinta OS è il gestionale per le
  concessionarie e noleggi che sto sviluppando». Nel repository ci sono già `brand/qinta` e `qinta-site/`,
  dal 21/09, e il vault non lo sapeva: qui risultavano ancora AutoOS e la ricerca aperta. La cartella resta
  `projects/autoos/`.
- **24/09/2026** — **Il marchio e il backup del codice non si sollevano.** Segnalati lo stesso giorno — Qinta
  a una lettera da QUINTA, e il codice solo sul disco del Mac, senza remote — e Emanuele ha detto di non
  pensarci. Sono scelte sue: non si ripropongono finché non le riapre lui.
- **26/09/2026** — **Il vault torna in pari col codice.** Riletta la cartella: `sistema.md` rifatto su
  quello che c'è oggi (377 test, le sedi, il laboratorio WhatsApp, il sito del prodotto, le demo), il brand
  kit del 21/09 riportato in `brand.md`, la ricerca del nome chiusa su Qinta.
- **26/09/2026** — **Autonazionale Exclusive Cars è un conoscente vero di Emanuele, e la sua demo serve ai
  test.** La mattina del 26/09 è nato il catalogo col suo design, con le foto del suo Instagram e i dati
  inventati; lo stesso giorno Emanuele ha precisato che Qinta si prova con lui. Su Notion non c'è.
- **26/09/2026** — **Prima del codice, la mappa.** Detto da Emanuele: il gestionale è nato veloce e senza
  una mappa, e prima di rimetterci mano si definiscono le funzioni e come funziona, dal lato di Qinta e da
  quello del cliente. La mappa sta in `mappa.md`, e si riempie un punto alla volta.
- **26/09/2026** — **Il cliente sono concessionarie e autonoleggi, e molti fanno tutte e due le cose.**
  Esigenze simili, non uguali: il noleggio deve vedere le auto noleggiate, la concessionaria no. Non solo
  automobili, anche altri veicoli: quali, è da decidere.
- **26/09/2026** — **Qinta è un SaaS, e non riguarda direttamente Emanuele Boccia.** Il cliente riceve il
  setup iniziale, la formazione e l'assistenza. L'argomento «è vostro» contro il canone resta del personal
  brand.
- **26/09/2026** — **Si usa anche dal telefono, come webapp**, e il titolare vede i suoi dati in tempo reale
  quando vuole.
- **26/09/2026** — **Le funzioni si dividono in blocchi che facciano impatto, sul modello di MotorK.** La
  proposta sta nel punto 4 di `mappa.md`.
- **26/09/2026** — **Un solo parco auto, sincronizzato col sito e coi portali.** Detto da Emanuele:
  l'imprenditore carica le auto una volta e le trova sul suo sito, su Subito e su AutoScout24. È la funzione
  che considera più importante, e nel codice i portali oggi non ci sono.
- **26/09/2026** — **La documentazione di ogni cliente è importante.** Detto da Emanuele; per questo nella
  mappa i documenti stanno nella base, in tutte le versioni.
- **26/09/2026** — **La divisione in blocchi regge**: la base per tutti, e sopra Vendita, Noleggio o tutte e
  due. Emanuele: «diciamo che mi torna». Come funziona tecnicamente, fra server e domini, sta nel punto 7 di
  `mappa.md`, come proposta.
- **26/09/2026** — **Le email ad AutoScout24 e Subito non si mandano adesso.** Detto da Emanuele: prima si
  pensa al resto. Cosa chiedere a tutti e due sta in `portali.md`.
- **26/09/2026** — **Qinta è solo web.** L'app sul telefono è la web app del gestionale installata come PWA:
  niente da scaricare, niente store.
- **26/09/2026** — **Il gestionale di ogni cliente sta su un suo sottodominio, `nome.qinta.it`, e il sito sul
  dominio del cliente, `nome.it`.** L'idea è di Emanuele, e l'ha decisa dopo averla messa a confronto
  con un indirizzo solo per tutti: il cliente lo sente suo, e sul telefono l'app porta il suo nome. Si fa prima
  del primo cliente, perché cambiarlo dopo vuol dire far reinstallare l'app a tutti. Come funziona sta nel
  punto 7 di `mappa.md`.
- **26/09/2026** — **I veicoli sono auto, furgoni e moto**, per ora. Il codice oggi conosce solo le auto.
- **26/09/2026** — **Il sito del cliente parte da una base uguale per tutti**, definita e fatta bene, coi
  caratteri e i colori del suo marchio. **Il sito avanzato è un upsell**: più su misura e più d'effetto, anche
  in 3D, per chi lo vuole.
- **26/09/2026** — **Setup, assistenza e prezzo si decidono nell'offerta**, dopo. Detto da Emanuele: prima si
  definisce il prodotto, come si presenta e come funziona.
- **26/09/2026** — **Sul telefono è lo stesso gestionale**, con le stesse identiche funzioni, in versione
  mobile e installato come PWA. Non una app a parte con meno cose.
- **26/09/2026** — **Tutto è dinamico.** Le funzioni del noleggio compaiono solo se il cliente noleggia, e i
  dati tecnici cambiano fra auto, furgone e moto. Il Parco auto è definito in `blocchi.md`, con gli avvisi
  sulle scadenze da aggiungere.
- **26/09/2026** — **I portali vengono dopo: si parte dal sito.** Detto da Emanuele.
- **26/09/2026** — **I filtri sono importantissimi, e sono gli stessi sul sito e nel gestionale**, con la fascia
  di prezzo. Il modello è la pagina delle usate di Autoambrosio. La proposta sta nel Sito di `blocchi.md`.
- **26/09/2026** — **Sul sito entrano la valutazione della permuta e la richiesta di finanziamento.** Testi e
  foto del sito li cambia il cliente dal suo gestionale. Detto da Emanuele.
- **26/09/2026** — **Ogni veicolo ha due prezzi, di listino e scontato**, e sul sito si vedono tutti e due.
  **I loghi delle marche** compaiono nei filtri e nelle schede, come da Autoambrosio. Detto da Emanuele.
- **26/09/2026** — **I messaggi automatici ai clienti partono con l'email; WhatsApp viene in futuro.** Detto da
  Emanuele.
- **26/09/2026** — **Il cliente che aspetta un veicolo entra in Qinta**: si segna cosa cerca, e quando entra un
  veicolo che corrisponde, Qinta avvisa il venditore e, se l'ha chiesto, il cliente. Come funziona sta nel
  blocco Clienti di `blocchi.md`.
- **26/09/2026** — **La firma dei contratti, per ora, è su carta**: si stampa, si firma a penna e si carica la
  copia. La firma elettronica viene più avanti. Il blocco Documenti è definito in `blocchi.md`.
- **26/09/2026** — **Nella Vendita la permuta entra da sola nel parco auto** quando la vendita si chiude, e
  passaggio di proprietà e garanzia si seguono in Qinta, a che punto sono e con le scadenze, mentre le pratiche
  le fa un'agenzia. Confermato da Emanuele.
- **26/09/2026** — **Nel Noleggio le tariffe le cambia il cliente quando vuole**: niente tariffe per stagione, e
  gli extra non dal primo giorno. **Le multe si tengono**: Qinta trova chi aveva il veicolo, coi dati per
  girare il verbale. Con questo i sei blocchi sono definiti, e in `blocchi.md` c'è la proposta della prima
  versione.
- **26/09/2026** — **La prima versione è confermata.** Cosa serve per partire con una concessionaria, cosa in
  più per il primo noleggio e cosa viene dopo stanno in fondo a `blocchi.md`. Il prodotto è definito.
- **26/09/2026** — **La prima versione è su TickTick**: i passi dal 04 al 12 di `[PROGETTO] QintaOS`, dai
  sottodomini dei clienti fino a mettere Qinta online, col cruscotto al 10. Nella descrizione della madre, al posto del link a
  treams.com, c'è il rimando a `projects/autoos/`.
- **26/09/2026** — **Appena si apre, il gestionale mostra un cruscotto con tutti i dati principali e i grafici
  del business.** Chiesto da Emanuele. Oggi la prima pagina mostra il piano e le funzioni accese. La proposta
  sta nel Cruscotto di `blocchi.md`.
- **26/09/2026** — **La prima versione la costruisce Claude**, un passo alla volta, e Codex fa solo i passi che
  gli si affidano, mai lo stesso insieme. Deciso da Emanuele.
- **26/09/2026** — **Il codice di Qinta ha il suo commit di partenza**: `5aa8e42`, nel repository della cartella
  del codice, sul Mac. Dentro ci sono 465 file: la piattaforma coi test, il brand kit e il sito di Qinta; fuori
  restano `.env`, il database locale, le foto caricate e le librerie esterne. Fatto su ok di Emanuele, prima di
  toccare il codice per la prima versione.
- **26/09/2026** — **Il passo 04 è fatto, sul ramo `passo-04-sottodomini`** (commit `0a108f7`): ogni azienda
  apre il gestionale sul suo sottodominio, la pagina d'accesso ne mostra nome e logo, entra solo chi ne fa
  parte, e un sottodominio sconosciuto dà 404. Il sottodominio si sceglie nell'hub. 391 test verdi, provato
  nel browser su `autonazionale.localhost:8000`. Va unito a `main` quando Emanuele dà l'ok.
- **26/09/2026** — **Il gestionale ha sempre due modalità, chiara e scura, coi colori del marchio e senza il
  verde**, e la sidebar è super ordinata: segue i blocchi, con Impostazioni in fondo. Detto da Emanuele: «ci
  tengo tantissimo all'ordine e alla semplicità». Le regole stanno nel design di `blocchi.md`.
- **26/09/2026** — **Il design nuovo è sul ramo `design-chiaro-scuro`** (commit `7fb6835`): grigi neutri al
  posto del verde, la sidebar bianca in chiaro e quasi nera in scuro con l'arancio sulla voce attiva, e il menù
  nei blocchi Parco auto, Clienti, Vendita, Noleggio e Impostazioni. Screenshot mandati a Emanuele, che non ha
  ancora detto se gli piace: finché non lo dice, il ramo non va su `main`.
- **26/09/2026** — **Il passo 05 è fatto, sul ramo `passo-05-scheda-veicolo`**, costruito sopra quello del
  design: auto, furgoni e moto coi loro campi, prezzo di listino e scontato, gli avvisi sulle scadenze e
  l'importazione dei veicoli da Excel, che entrano come bozze. Col passo sono entrati anche i messaggi di errore
  in italiano, che prima uscivano in inglese anche sul sito pubblico. 408 test verdi, provato nel browser su
  Autonazionale. Commit `60e43b7`, `14d4195`, `c4efa26` e `923e3d5`: va unito a `main` insieme al design.
- **26/09/2026** — **La demo di Autonazionale ha tutto acceso**, chiesto da Emanuele per vedere tutte le
  funzioni sul cliente della prova generale: diventa vendita e noleggio, col piano «Qinta Completo · Demo
  locale», e ha dati inventati in ogni modulo, cioè trattative con l'agenda, la vendita della Q8 con permuta e
  finanziamento, tre noleggi e un fascicolo. L'Abarth e la Q2 si noleggiano anche, e il sito le mostra ancora
  in vendita. Sul ramo `demo-autonazionale-completa` (commit `c9de61a`), sopra il passo 05. Nello stesso giro
  ogni pagina ha preso il nome della sua voce del menù, e il gruppo del menù della pagina aperta si apre da
  solo (commit `88ecb5a`). 411 test verdi.
- **26/09/2026** — **Il sito standard dei clienti prende lo stile del sito di Autonazionale**, coi colori di ogni
  cliente: detto da Emanuele, «quello attuale fa cacare», «utilizza lo stile di autonazionale per il sito
  ovviamente». Parti scure, fondo avorio, titoli grandi con una parola in corsivo nell'accento, bottoni
  squadrati con la freccia; il più scuro dei due colori del cliente fa da fondo e l'altro da accento. Il passo
  06 parte 1 è fatto sul ramo `passo-06-sito-base` (commit `e8f754e`): home, elenco coi filtri alla
  Autoambrosio e i conteggi, scheda completa, versione da telefono. 420 test verdi. Il tema `exclusive` di
  Autonazionale resta per la sua demo finché Emanuele non dice di passarla al sito nuovo.
- **26/09/2026** — **Santa Maria Cars esce dal progetto.** Detto da Emanuele: «non pensare a santa maria
  cars, eliminalo». Via il primo prototipo nella radice della cartella, la sua demo nel gestionale e i test
  che la usavano; il database locale è stato rifatto con solo Qinta e Autonazionale, dopo una copia di
  sicurezza. La copia del prototipo pubblicata su Sites resta online finché non la toglie Emanuele.
- **26/09/2026** — **Il sito di Autonazionale ha il suo marchio esatto**: il nero verde `#111714`, la menta
  `#ADE3CF`, Manrope col corsivo Georgia, il logo, i testi del suo primo sito demo e Instagram. Detto da
  Emanuele: «focalizzati sull'estetica di auto nazionale, il sito deve essere con lo stesso brand, stessi
  colori palette e font». Il vecchio tema a parte è uscito: il sito nuovo ha lo stesso aspetto e funziona
  tutto. Sul ramo `passo-06-sito-base`, commit `32483db`, 419 test verdi.
- **26/09/2026** — **Il sito di Autonazionale segue il suo manuale del marchio**, trovato su Behance: il
  designer del logo, Salvatore Parmosa, nel 2019 ci ha messo caratteri e palette. Detto da Emanuele: «usa il
  nero bianco e grigi, per l'header usa il nero, non usare sto menta». Nero `#070707`, grigi `#808080` e
  `#C8C8C8`, bianco `#F0F5F5`; testo in Philosopher, che ha le lettere di ZCOOL XiaoWei; titoli in Bruno Ace,
  scelto confrontando 14 caratteri col logo, perché Venus Rising, il carattere di «AUTONAZIONALE», sul web
  vuole una licenza a pagamento. Il logo è scontornato, bianco sulla testata nera. Commit `f898c09`.
- **26/09/2026** — **La demo si mette online dal Mac con un tunnel di Cloudflare**, in una copia protetta da
  password: l'hub e le scorciatoie restano chiusi, le password stanno nel `.env` del gestionale. Il sistema di
  sicurezza di Claude Code non lascia a Claude aprire il Mac a Internet né leggere l'indirizzo del tunnel:
  i due comandi li lancia Emanuele, e stanno nel README del gestionale.
- **26/09/2026** — **Il sito di Autonazionale è online su https://autonazionale-demo.netlify.app**, chiesto da
  Emanuele: una copia statica caricata dal suo Chrome nel team Netlify `ema-boccia02`, pubblica e fuori dai
  motori di ricerca. I filtri lavorano nel browser, la richiesta d'informazioni arriva nei moduli di Netlify, il
  noleggio con le date resta fuori. Si aggiorna con lo script in `tools/netlify/` del codice. Il gestionale su
  Netlify non può andare: ha bisogno di PHP e di un database.
- **26/09/2026** — **Il gestionale si installa come app, col nome e l'icona del cliente**, chiesto da Emanuele:
  ogni azienda ha il suo manifest e le icone disegnate dal suo marchio, per Autonazionale il monogramma AV
  bianco sul nero, e la favicon è la sua. Chrome lo dà installabile senza errori. Un'app installata resta
  legata all'indirizzo: col tunnel l'indirizzo cambia a ogni accensione, quindi per un'app che dura serve
  l'indirizzo fisso, cioè l'hosting vero. Commit `f561943` sul ramo del passo 06.
- **26/09/2026** — **La demo online chiede la password in una pagina sua, non nella finestra del browser.**
  Aperta dall'app installata restava bianca: la finestra di accesso del browser, lì, non compare. La pagina
  lascia un cookie e l'app entra. Commit `c3f4527`.
- **26/09/2026** — **La home del sito dei clienti si apre a tutto schermo con un'auto che arriva nel buio**,
  chiesto da Emanuele su un riferimento di un modello grafico altrui: niente più due colonne con numeri e ultima
  auto, ma una scena sola, l'auto che si avvicina, i fari che si accendono, poi il titolo del cliente e un solo
  bottone. L'auto è **disegnata in vettoriale**: quella del riferimento non si può usare, e le foto dei clienti
  sono troppo piccole per uno schermo intero; così resta nitida e va bene per tutti. Nello stesso giro i testi
  del sito legano le ultime parole quando sono corte, perché una riga non finisca con una o due parole sole;
  il titolo grande no, lo divide già il browser. Commit `e586663`, poi `225d010` con le correzioni della
  revisione: legate anche le parole lunghe spingevano titolo e bottone fuori dal telefono, e sugli schermi
  bassi l'auto perdeva il tetto.
- **27/09/2026** — **Un possibile aiuto nella vendita: Luciano Mancuso.** Detto da Emanuele nella review della
  settimana 39: venerdì 25/09 ha incontrato Luciano Mancuso, un amico che ha un CAF a Poggiomarino e conosce
  molta gente, e forse collaboreranno su Qinta e su altri progetti più piccoli, con Luciano che lo aiuta a
  vendere grazie alle sue conoscenze. È un test che fanno sottomano, e gli aggiornamenti li porta Emanuele:
  ruolo e compenso non sono stati detti, e per ora nel CRM non entra.

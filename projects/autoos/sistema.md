---
title: "Qinta — cosa fa il sistema"
summary: "Il gestionale per concessionarie e autonoleggi riletto dal codice il 26/09/2026: otto moduli che funzionano in locale con dati di prova e 377 test verdi, il sito del prodotto, le due demo, com'è costruito e cosa manca per un cliente vero, per venderlo e per comunicarlo."
tags:
  - projects
  - qinta
  - sistema
status: attivo
created: 2026-09-17
updated: 2026-09-26
related:
  - "[[projects/autoos/brand]]"
  - "[[projects/autoos/nome]]"
  - "[[self/reference/offerta]]"
  - "[[self/tariffario]]"
  - "[[sources/riferimenti/golee-gestionale-sportivo]]"
  - "[[workspace/journal/sessions/sessione-2026-09-15-2]]"
---

# Qinta — cosa fa il sistema

> Riletto il 26/09/2026 dalla cartella `~/Documents/ChatGPT/gestionale auto`: il codice, il README della
> piattaforma, il brand kit, il sito del prodotto, e i test fatti girare. La prima lettura era del 17/09,
> quando il sistema si chiamava ancora AutoOS; da allora sono arrivati il marchio, le sedi, il laboratorio
> WhatsApp, il sito di Qinta e una demo col design di un cliente. Il marchio sta in
> [[projects/autoos/brand|il brand di Qinta]], chi è il cliente e cosa deve fare Qinta per lui in
> [[projects/autoos/mappa|la mappa del prodotto]], le decisioni nella
> [[projects/autoos/MEMORY|memoria del progetto]].

## In breve

Qinta è un gestionale web per **concessionarie e autonoleggi**, fatto per servire più aziende, ognuna col
suo abbonamento e i suoi moduli accesi. Tiene insieme il parco auto col catalogo online, le prenotazioni
dei noleggi, il CRM delle trattative, il fascicolo digitale del noleggio, la vendita con preventivi e
permute, e le sedi. Sopra c'è l'hub, il pannello da cui chi vende Qinta gestisce aziende, piani e
abbonamenti.

**Funziona, ma solo sul Mac e con dati inventati.** Il 26/09/2026 i 377 test sono passati tutti. Non è
online, quindi nessun cliente lo usa; non manda email né messaggi, e non incassa niente. Il modulo
WhatsApp c'è, ma è una simulazione: prepara i messaggi e non li spedisce.

**Il nome.** Qinta nei testi, qinta minuscolo nel logo, e si pronuncia «quinta». Emanuele lo chiama anche
QintaOS, e con quel nome sta su TickTick, `[PROGETTO] QintaOS`; il kit, i pannelli e il sito dicono Qinta.
Come ci si è arrivati sta in [[projects/autoos/nome|il nome]]. Nel codice restano tracce del nome di
lavoro, come gli accessi di prova in `@automotiveos.test`.

## Cosa c'è nella cartella

| | Cos'è | Quando | Dove gira |
|---|---|---|---|
| **La piattaforma**, in `platform/` | il gestionale vero, descritto sotto | dal 09/09/2026; marchio, sedi e WhatsApp il 21/09; la demo Autonazionale il 26/09 | solo in locale |
| **Il brand kit**, in `brand/qinta/` | logo, colori, carattere e la guida in PDF | 21/09/2026 | sono file |
| **Il sito di Qinta**, in `qinta-site/` | la pagina che presenta il prodotto a chi ha una concessionaria, con una demo da cliccare | 21/09/2026 | solo in locale |

Il primo prototipo, una pagina HTML per Santa Maria Cars del 03/09/2026, è uscito dalla cartella il
26/09/2026 insieme a tutta Santa Maria Cars, su richiesta di Emanuele. Resta nella storia dei commit; la
copia pubblicata su Sites, l'hosting di ChatGPT, va tolta da lì.

## Cosa fa oggi

### 1 · Due pannelli: chi vende il sistema e chi lo usa

**L'hub** (`/hub`) è il pannello di chi vende Qinta: le aziende clienti, i piani, le funzioni, gli
abbonamenti (in prova, attivi, col pagamento scaduto, sospesi, cancellati), le eccezioni per una singola
azienda e un registro delle modifiche sensibili. Un'azienda nuova nasce con un'operazione sola, che crea
azienda, sede principale, titolare e abbonamento con 14 giorni di prova.

**Il gestionale** (`/admin`) è quello della concessionaria. Ogni azienda vede solo i suoi dati, e un test
lo verifica. I ruoli sono cinque: titolare, amministratore, responsabile, operatore e commerciale.

**Dal 21/09 i due pannelli portano il marchio Qinta**: logo, favicon, il carattere Manrope e i colori
grafite, avorio e arancio. Dentro il gestionale il nome dell'azienda che ci lavora resta sempre in vista.
C'è il tema chiaro e quello scuro, e si usa anche dal telefono. La pagina d'accesso dice «La marcia in più
per il tuo business» e «Veicoli, clienti e attività. Tutto sotto controllo.».

### 2 · Parco auto e catalogo online

La scheda di un'auto tiene marca, modello, allestimento, targa, telaio, anno, chilometri, optional, prezzo
di vendita, tariffa giornaliera, cauzione, le scadenze di assicurazione, revisione e tagliando, le note
interne e fino a 20 foto. Un'auto può stare in vendita, a noleggio o tutte e due.

Il **catalogo pubblico** (`/catalogo/<azienda>`) legge lo stesso database: elenco, ricerca, filtri e scheda
con la galleria. Targhe, telai, note interne e bozze non escono. Dell'azienda usa il nome e un colore, che
di partenza è ancora il viola del prototipo, #6f5bd3. Dal 26/09 esiste un secondo aspetto, il tema
«exclusive», che per ora vive solo nella demo di Autonazionale: sta più sotto, fra le demo.

### 3 · Prenotazioni del noleggio

Richieste e prenotazioni, su un calendario settimanale per auto e per sede. Il sistema controlla che l'auto
sia libera anche quando due persone prenotano nello stesso momento, lascia un tempo di preparazione fra un
noleggio e l'altro (60 minuti di base), registra ritiro e riconsegna con ora e chilometri, e segnala i
rientri in ritardo. Dal catalogo il cliente manda **una richiesta, non una prenotazione confermata**: a
confermare è il team.

### 4 · CRM delle trattative

- **La pipeline a colonne**: nuovo, da contattare, contattato, appuntamento, preventivo, negoziazione,
  vinto, perso. Le fasi si rinominano, si riordinano e se ne aggiungono.
- **I contatti senza doppioni**, riconosciuti da email e telefono.
- **Le trattative**, con l'auto d'interesse, il budget, la fonte (sito, telefono, WhatsApp, Instagram,
  Facebook, Google, portali, passaparola) e la campagna: i parametri UTM seguono il cliente dal catalogo
  fino alla richiesta.
- **Le richieste dal sito si assegnano da sole** al commerciale con meno trattative aperte.
- **L'agenda** di richiami, appuntamenti, test drive, email e WhatsApp, che però si segnano a mano.
- **Il cruscotto**: richieste del mese, trattative aperte, attività in ritardo, vinte, rapporto fra vinte e
  chiuse, e **il tempo medio di prima risposta**.

### 5 · Fascicolo digitale del noleggio

Ogni noleggio ha il suo fascicolo: fino a cinque conducenti, coi dati cifrati; patenti, documenti e copie
firmate caricati come PDF o foto, cifrati anche quelli; il contratto da stampare, a versioni, che si segnala
da solo come superato se i dati cambiano dopo l'emissione; i verbali di consegna e di riconsegna con
chilometri, carburante, checklist, foto e danni per zona, messi a confronto; un registro degli incassi e
delle cauzioni già avvenuti.

**Quando il fascicolo è aperto, l'auto non si consegna** senza una patente valida per tutto il periodo, il
contratto aggiornato firmato e i documenti caricati.

### 6 · Vendita in concessionaria

La pratica di vendita si apre dalla trattativa. Il preventivo tiene sconto, spese e permuta, con la sua
valutazione e le foto, più una simulazione della rata dichiarata come indicativa. Quando il cliente accetta,
l'auto si **riserva**: esce dal catalogo e non si noleggia più. Poi si registra la vendita con la copia
firmata e si consegna con un verbale. La pagina dello stock dà per ogni auto costo d'acquisto, costo di
preparazione e **margine**, e la vedono solo titolare, amministratore e responsabile.

### 7 · Le sedi

Dal 21/09. Tutti vedono le sedi dell'azienda; le creano e le modificano solo titolare e amministratori. La
prima sede c'è sempre, dalla seconda serve il modulo Multi-sede, e **il tetto del piano adesso si applica**,
contando anche le sedi disattivate. Una sede che ha dentro utenti, auto, prenotazioni o trattative non si
cancella: si disattiva, e lo storico resta.

### 8 · Il laboratorio WhatsApp

Dal 21/09, ed è **una simulazione, non un collegamento a WhatsApp**: nessun messaggio parte, nessun costo,
nessuna risposta ricevuta. Lo usano titolare, amministratore e responsabile, col CRM acceso.

Le regole sono due: una conferma quando arriva una richiesta, e un richiamo da 1 a 168 ore dopo, 24 di
base. I testi usano `{nome}`, `{richiesta}` e `{azienda}`. Per ogni trattativa nuova il sistema programma i
messaggi e li segna come simulati e non inviati; li annulla da solo se nel frattempo il team ha contattato
il cliente, ha chiuso la trattativa o il recapito è cambiato.

Il README lo dice chiaro: **non va presentato come un'integrazione WhatsApp funzionante.** Per mandare
messaggi veri servono un fornitore e un numero verificato, i consensi e la disiscrizione, i modelli di
messaggio approvati con le regole della finestra di conversazione, e la parte tecnica che riceve le
risposte e tiene conto dei costi.

## Come si vende: moduli da accendere

Ogni modulo è un interruttore, acceso dal piano dell'azienda o da un'eccezione messa a mano nell'hub.

| Interruttore | Cosa accende | C'è il codice |
|---|---|---|
| Dashboard e Gestione flotta | la base, accesa per tutti | sì |
| Booking online | prenotazioni e calendario, con un tetto al mese | sì |
| Sito white-label | il catalogo pubblico | sì, in parte |
| CRM e lead | il modulo 4 | sì |
| Contratti digitali | il modulo 5 | sì |
| Vendite concessionaria | il modulo 6 | sì |
| Multi-sede | le sedi oltre la prima, fino al tetto del piano | sì, dal 21/09 |
| WhatsApp e automazioni | il laboratorio del modulo 8, con un tetto di prove al mese | **solo la simulazione** |

**Il sito white-label è ancora un catalogo, non un sito.** Sta sotto l'indirizzo del gestionale; dominio
personalizzato e logo si salvano nella scheda dell'azienda, ma nessuna pagina li usa. Emanuele vuole per
ogni cliente un sito vero, col suo design: la demo di Autonazionale fa vedere come può venire, ma non è
ancora un pezzo che si accende per un cliente.

⚠️ **Nei dati di prova ci sono due piani con un prezzo**, Rental Starter a 99 € al mese e Hybrid Pro a
299 €, più un piano a zero euro per la demo. **Non sono un listino.** Qinta nel
[[self/tariffario|tariffario]] non c'è, e i prezzi sono da decidere.

## Il sito di Qinta

In `qinta-site/`, fatto il 21/09: una pagina sola che presenta Qinta a chi ha una concessionaria o un
autonoleggio. Apre con «La tua attività, sotto controllo.» e una dashboard d'esempio, e poi mette in fila:

- **le tre aree**, parco auto, noleggio e vendite, ognuna con un pezzo d'interfaccia disegnato;
- **il percorso di una vendita in quattro passi**, «dal primo "ciao" alle chiavi in mano»: richiesta,
  trattativa, preventivo, consegna;
- **«Ti suona familiare?»**, le frasi di una giornata in concessionaria («Aspetta, controllo se l'auto è
  libera», «Chi stava seguendo questo cliente?») con le risposte del gestionale;
- **tre profili**: chi vende, chi noleggia, chi fa tutte e due;
- **sei domande frequenti**, che dicono anche cosa non fa: la firma non è integrata, non incassa e non
  emette fatture elettroniche;
- **una demo da cliccare** in tre schermate, coi dati d'esempio.

**Non è online e non raccoglie contatti.** È marcata «Anteprima del sito · prodotto in sviluppo», chiede ai
motori di ricerca di non indicizzarla, e nella cartella non c'è un hosting per lei. I bottoni portano alla
demo dentro la pagina: non c'è un modulo, un'email o un telefono per chi vuole saperne di più. Su TickTick,
come riferimento per questo sito, c'è treams.com.

Si apre in locale con `npm run dev` dentro `qinta-site/`, all'indirizzo `http://127.0.0.1:4175`.

## La demo

**Autonazionale Exclusive Cars** è un conoscente vero di Emanuele, e Qinta si prova con lui. È l'unica
demo dal 26/09/2026, quando Santa Maria Cars, l'azienda d'esempio delle prime fasi, è uscita dal progetto.
Ha tutte le funzioni accese, vendita e noleggio: cinque auto usate, due Audi Q5, una Q8, una Q2 e
un'Abarth 595, con le foto prese dal suo profilo Instagram e tutti i dati commerciali inventati; cinque
trattative con l'agenda, la vendita della Q8 con permuta e finanziamento, tre noleggi e un fascicolo.

Il suo sito è il sito base di Qinta col suo marchio: il nero verde e la menta, Manrope col corsivo
Georgia, il logo, i testi del suo primo sito demo e Instagram. Una barra in alto dice che è una demo; in
locale le richieste dal sito arrivano nel gestionale di prova. Si apre da
`http://autonazionale.localhost:8000/catalogo/autonazionale-exclusive-cars`, e il gestionale da `/dev/admin`
sullo stesso indirizzo.

Gira **solo in locale**: in produzione quelle pagine rispondono 404, e i test lo verificano.

## Com'è fatto

- **PHP, con Laravel 13 e Filament 5 per i pannelli.** Il sistema per il food sta su Laravel 13 e
  Filament 4: la base comune che dice l'[[self/reference/offerta|offerta]] c'è, con una versione di
  Filament di differenza.
- **Il database è SQLite, in locale.** Per andare online il README prevede MySQL, e scrive lui stesso che
  non è mai stato provato.
- **Circa 14.000 righe di codice e 5.900 di test.** I test sono 377, in 46 file, e il 26/09/2026 sono
  passati tutti in 16 secondi. Il 17/09 erano 301.
- **Quattro lavori automatici** vanno fatti girare sul server: lo stato degli abbonamenti ogni notte alle
  tre, lo stato delle auto a noleggio ogni minuto, il collegamento fra prenotazioni e CRM ogni cinque
  minuti, le prove WhatsApp ogni minuto.
- **È costruito con Codex**, come ha detto Emanuele il 26/09/2026. La cartella sta sotto
  `Documents/ChatGPT`, e le istruzioni per gli agenti sono due file identici, `AGENTS.md` per Codex e
  `CLAUDE.md` per Claude: le regole di Laravel Boost. Il README divide il lavoro in fasi: la 1 è l'hub,
  dalla 2 alla 6 i moduli, la 7 il laboratorio WhatsApp.

Come si accende, col comando del README:

```bash
cd ~/Documents/ChatGPT/"gestionale auto"/platform
composer run preview
```

Poi si apre `http://127.0.0.1:8000/admin`. Gli accessi di prova stanno nel README della piattaforma, che
spiega anche le scorciatoie per entrare senza password, `/dev/admin` e `/dev/hub`. La demo di Autonazionale
si apre da `http://127.0.0.1:8000/demo/autonazionale`.

## Cosa manca

### Per usarlo con un cliente vero

- **Metterlo online**: server, dominio, database MySQL, backup dei dati, i quattro lavori automatici e la
  custodia della chiave dell'applicazione. Senza quella chiave i dati cifrati non si leggono più.
- **Non manda niente a nessuno.** Niente email, e WhatsApp è una prova: le conferme ai clienti e i richiami
  li fa il team a mano.
- **Firma, pagamenti e fatture restano fuori.** Le copie firmate si caricano e si controllano a mano, gli
  incassi si registrano dopo che sono avvenuti, e il sistema non emette fatture né parla con lo SdI.
- **La parte legale**: un contratto validato, l'informativa privacy e i consensi, i tempi di conservazione
  dei documenti, un controllo antivirus sui file caricati.
- **Il sito del cliente col suo design** c'è solo come demo. Per un cliente si accende il catalogo base,
  col suo nome e un colore.
- **Nel noleggio** manca la comunicazione alla Polizia di Stato dei dati di chi noleggia, con Ca.R.G.O.S.,
  che è obbligatoria e che i gestionali per il noleggio fanno già, come dice
  [[projects/autoos/concorrenti|i concorrenti]]; mancano anche tariffe stagionali ed extra. **Nella
  vendita** mancano resi e rettifiche dopo la vendita,
  perizie e il collegamento con le finanziarie.
- **I portali non ci sono.** Una richiesta arrivata da un portale come AutoScout24 si registra a mano, e da
  qui le auto non si pubblicano.

### Per venderlo

- **Una concessionaria che l'abbia visto.** Finora è stato provato solo con dati inventati. I primi lead ci
  sono: Balzano Motori e Golden Cars su Notion, e le cinquanta concessionarie intorno a Poggiomarino estratte
  il [[workspace/journal/sessions/sessione-2026-09-15-2|15 settembre]].
- **Come lavora oggi una concessionaria, che software usa e quanto paga.** Nel vault non c'è ancora: sono i
  passi 01, 02 e 03 di `[PROGETTO] QintaOS` su TickTick, a cominciare dal trovare una persona del settore da
  intervistare. Una prima ricerca del 17/09/2026 dice che in Italia i gestionali per concessionarie ci sono,
  e che alcuni vendono già sito e gestionale insieme, come ManagerCar e GestionaleAuto.

### Per comunicarlo

- **Il marchio c'è, dal 21/09**, e sta in [[projects/autoos/brand|il brand di Qinta]]. Lo usano già i
  pannelli e il sito del prodotto, che però non è online.
- **Chi compra o noleggia l'auto non vede Qinta**: il catalogo porta il nome e il colore della
  concessionaria. Il marchio serve a vendere il sistema alle concessionarie; al cliente finale arriva al
  massimo come firma in fondo al sito, se si decide di metterla.
- **Il modo di parlarne ha già un modello**: [[sources/riferimenti/golee-gestionale-sportivo|Golee]].

## Da decidere

- **Il listino**, a cominciare dal prezzo di favore con cui Emanuele vuole proporlo al primo cliente.
- **Se la firma «Powered by qinta» va sui siti dei clienti.** Il brand kit dice che non si aggiunge da sola
  ed è una scelta commerciale; la demo di Autonazionale ce l'ha.

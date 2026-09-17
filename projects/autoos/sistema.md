---
title: "AutoOS — cosa fa il sistema"
summary: "Il gestionale per concessionarie e autonoleggi letto dal codice il 17/09/2026: sei moduli che funzionano in locale con dati di prova e 301 test verdi, com'è costruito, e cosa manca per un cliente vero, per venderlo e per comunicarlo."
tags:
  - projects
  - autoos
  - sistema
status: attivo
created: 2026-09-17
updated: 2026-09-17
related:
  - "[[self/reference/offerta]]"
  - "[[self/tariffario]]"
  - "[[sources/riferimenti/golee-gestionale-sportivo]]"
  - "[[workspace/journal/sessions/sessione-2026-09-15-2]]"
  - "[[projects/autoos/nome]]"
---

# AutoOS — cosa fa il sistema

> Letto il 17/09/2026 dalla cartella `~/Documents/ChatGPT/gestionale auto`: il codice, il README della
> piattaforma e i test, fatti girare. Nel codice il sistema si chiama **AutomotiveOS**. La nota serve a
> due cose: l'[[self/reference/offerta|offerta]] chiedeva di scrivere cosa fa il sistema prima di
> nominarlo, e la brand identity parte da qui.

## In breve

AutoOS è un gestionale web per **concessionarie e autonoleggi**, pensato per servire più aziende, ognuna
col suo abbonamento. I moduli sono sei: parco auto con catalogo online, prenotazioni dei noleggi, CRM delle
trattative, fascicolo digitale del noleggio, vendita con preventivi e permute, e un pannello da cui chi
vende il sistema gestisce aziende, piani e abbonamenti.

**Funziona, ma solo sul Mac e con dati inventati.** I 301 test passano tutti, il server si accende e le
pagine rispondono. Non è online, quindi nessun cliente lo usa; non manda email né messaggi, e non incassa
niente.

## Cosa c'è nella cartella

| | Cos'è | Quando | Dove gira |
|---|---|---|---|
| **Il prototipo**, nella radice | una pagina HTML e JavaScript coi dati scritti a mano: dashboard, flotta, prenotazioni, clienti, calendario e un sito pubblico. Si clicca, ma non salva niente | 03/09/2026, l'unico commit del repository | pubblicato come sito statico su Sites, l'hosting di ChatGPT; l'indirizzo nella cartella non c'è |
| **La piattaforma**, in `platform/` | il gestionale vero, descritto sotto | 09/09/2026, in una giornata | solo in locale |

I due non si parlano: il catalogo della piattaforma non aggiorna il sito del prototipo.

**L'azienda d'esempio è Santa Maria Cars, di Santa Maria La Carità**, un'attività vera che Emanuele ha
preso da internet come esempio. Il prototipo porta il suo logo e la tratta come autonoleggio; la
piattaforma la imposta come concessionaria più noleggio, con sei auto, tre pratiche di noleggio, quattro
contatti, un fascicolo e una proposta di vendita con permuta. Targhe, prezzi e chilometri sono di prova, e
lo dice il README.

## Cosa fa oggi

### 1 · Due pannelli: chi vende il sistema e chi lo usa

**L'hub** (`/hub`) è il pannello di chi vende AutoOS: le aziende clienti, i piani, le funzioni, gli
abbonamenti (in prova, attivi, col pagamento scaduto, sospesi, cancellati), le eccezioni per una singola
azienda e un registro delle modifiche sensibili. Un'azienda nuova nasce con un'operazione sola, che crea
azienda, sede principale, titolare e abbonamento con 14 giorni di prova.

**Il gestionale** (`/admin`) è quello della concessionaria. Ogni azienda vede solo i suoi dati, e un test
lo verifica. I ruoli sono cinque: titolare, amministratore, responsabile, operatore e commerciale.

### 2 · Parco auto e catalogo online

La scheda di un'auto tiene marca, modello, allestimento, targa, telaio, anno, chilometri, optional, prezzo
di vendita, tariffa giornaliera, cauzione, le scadenze di assicurazione, revisione e tagliando, le note
interne e fino a 20 foto. Un'auto può stare in vendita, a noleggio o tutte e due.

Il **catalogo pubblico** (`/catalogo/<azienda>`) legge lo stesso database: elenco, ricerca, filtri e scheda
con la galleria. Targhe, telai, note interne e bozze non escono.

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

## Come si vende: moduli da accendere

Ogni modulo è un interruttore, acceso dal piano dell'azienda o da un'eccezione messa a mano nell'hub. Due
interruttori non hanno niente dietro.

| Interruttore | Cosa accende | C'è il codice |
|---|---|---|
| Dashboard e Gestione flotta | la base, accesa per tutti | sì |
| Booking online | prenotazioni e calendario, con un tetto al mese | sì |
| Sito white-label | il catalogo pubblico | sì, in parte |
| CRM e lead | il modulo 4 | sì |
| Contratti digitali | il modulo 5 | sì |
| Vendite concessionaria | il modulo 6 | sì |
| **WhatsApp e automazioni** | niente | **no, c'è solo l'interruttore** |
| **Multi-sede** | un tetto al numero di sedi | **no, il tetto non viene applicato** |

**Il sito white-label è un catalogo, non un sito.** Sta sotto l'indirizzo del gestionale, e dell'azienda
usa il nome e un colore. Dominio personalizzato e logo si salvano nella scheda dell'azienda, ma nessuna
pagina li usa. Emanuele vuole per ogni cliente un sito vero, col suo design: quel pezzo oggi non c'è.

⚠️ **Nei dati di prova ci sono due piani con un prezzo**, Rental Starter a 99 € al mese e Hybrid Pro a
299 €, e una migrazione cerca anche un Dealer Pro che non esiste. **Non sono un listino.** AutoOS nel
[[self/tariffario|tariffario]] non c'è, e i prezzi sono da decidere.

## Com'è fatto

- **PHP, con Laravel 13 e Filament 5 per i pannelli.** Il sistema per il food sta su Laravel 13 e
  Filament 4: la base comune che dice l'offerta c'è, con una versione di Filament di differenza.
- **Il database è SQLite, in locale.** Per andare online il README prevede MySQL, e scrive lui stesso che
  non è mai stato provato.
- **Circa 12.700 righe di codice e 4.650 di test.** I test sono 301, e il 17/09/2026 sono passati tutti
  in 13 secondi.
- **Tre lavori automatici** vanno fatti girare sul server: lo stato degli abbonamenti ogni notte, lo
  stato delle auto a noleggio ogni minuto, il collegamento fra prenotazioni e CRM ogni cinque minuti.
- **È stato costruito lavorando con un agente.** La cartella sta sotto `Documents/ChatGPT`, e dentro ci
  sono le istruzioni per gli agenti (`AGENTS.md`, `CLAUDE.md`).

Come si accende, col comando del README. Il server è stato provato il 17/09/2026:

```bash
cd ~/Documents/ChatGPT/"gestionale auto"/platform
composer run preview
```

Poi si apre `http://127.0.0.1:8000/admin`. Gli accessi di prova stanno nel README della piattaforma, che
spiega anche le scorciatoie per entrare senza password.

## Cosa manca

### Per usarlo con un cliente vero

- ⚠️ **Il codice della piattaforma non è salvato da nessuna parte.** Il repository ha un commit solo,
  quello del prototipo del 3 settembre, e nessun remote: `platform/` è rimasta fuori. La cartella Documenti
  non va su iCloud e Time Machine non è configurato, quindi da qui il lavoro del 9 settembre risulta solo
  sul disco del Mac.
- **Metterlo online**: server, dominio, database MySQL, backup, i tre lavori automatici e la custodia della
  chiave dell'applicazione. Senza quella chiave i dati cifrati non si leggono più.
- **Non manda niente a nessuno.** Niente email, niente WhatsApp, niente promemoria fuori dal pannello: le
  conferme ai clienti e i richiami li fa il team a mano.
- **Firma, pagamenti e fatture restano fuori.** Le copie firmate si caricano e si controllano a mano, gli
  incassi si registrano dopo che sono avvenuti, e il sistema non emette fatture né parla con lo SdI.
- **La parte legale**: un contratto validato, l'informativa privacy e i consensi, i tempi di conservazione
  dei documenti, un controllo antivirus sui file caricati.
- **Nel noleggio** mancano tariffe stagionali ed extra; **nella vendita** resi e rettifiche dopo la vendita,
  perizie e il collegamento con le finanziarie.
- **I portali non ci sono.** Una richiesta arrivata da un portale come AutoScout24 si registra a mano, e da
  qui le auto non si pubblicano.

### Per venderlo

- **Una concessionaria che l'abbia visto.** Finora è stato provato solo con dati inventati. I primi lead ci
  sono: Balzano Motori e Golden Cars su Notion, e le cinquanta concessionarie intorno a Poggiomarino estratte
  il [[workspace/journal/sessions/sessione-2026-09-15-2|15 settembre]].
- **Un'azienda di prova inventata.** I dati d'esempio usano nome, logo e recapiti di Santa Maria Cars, che
  è un'attività vera: prima di far vedere il sistema a una concessionaria vanno sostituiti.
- **Come lavora oggi una concessionaria, che software usa e quanto paga.** Nel vault non c'è ancora: su
  TickTick sono due task aperte, più quella di trovare una persona del settore da intervistare. Una prima
  ricerca del 17/09/2026 dice che in Italia i gestionali per concessionarie ci sono, e che alcuni vendono
  già sito e gestionale insieme, come ManagerCar e GestionaleAuto.

### Per comunicarlo

- **Chi compra o noleggia l'auto non vede mai AutoOS**: il catalogo porta il nome e il colore della
  concessionaria. Chi ci lavora lo vede solo nella pagina di accesso, perché dentro il gestionale compare il
  nome della sua azienda. Il marchio serve soprattutto a vendere il sistema alle concessionarie.
- **Colori e caratteri, oggi.** I pannelli usano il viola già pronto di Filament. Il prototipo usa DM Sans e
  Manrope, una barra laterale quasi nera e un viola, #6f5bd3, lo stesso che il gestionale dà di partenza a
  ogni azienda nuova.
- **Il modo di parlarne ha già un modello**: [[sources/riferimenti/golee-gestionale-sportivo|Golee]].

## Da decidere

- **Il nome.** AutoOS è il nome di lavoro, e la ricerca sta in [[projects/autoos/nome|il nome]].
- **Il listino**, a cominciare dal prezzo di favore con cui Emanuele vuole proporlo al primo cliente.

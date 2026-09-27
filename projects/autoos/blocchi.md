---
title: "Qinta — i blocchi, uno per uno"
summary: "Il prodotto definito un blocco alla volta, dal 26/09/2026: per ognuno cosa vede e cosa fa il cliente, cosa c'è già nel codice e cosa manca. Vale una regola per tutti: Qinta è dinamico, e mostra solo quello che serve a quel cliente e a quel veicolo. Tutti e sei i blocchi sono definiti, e ne esce la prima versione, confermata."
tags:
  - projects
  - qinta
  - prodotto
status: in-lavorazione
created: 2026-09-26
updated: 2026-09-26
related:
  - "[[projects/autoos/mappa]]"
  - "[[projects/autoos/sistema]]"
  - "[[projects/autoos/portali]]"
---

# Qinta — i blocchi, uno per uno

> Aperta il 26/09/2026. Sviluppa il punto 4 della [[projects/autoos/mappa|mappa del prodotto]]: la divisione
> in blocchi è decisa, e qui ogni blocco si definisce, cosa vede e cosa fa il cliente, cosa c'è già nel codice
> e cosa manca. Da qui esce la prima versione. Cosa fa il codice oggi sta in
> [[projects/autoos/sistema|cosa fa il sistema]].

## La regola per tutti i blocchi

**Tutto è dinamico**: Qinta mostra solo quello che serve a quel cliente e a quel veicolo. Le funzioni del
noleggio compaiono solo se il cliente noleggia, e i dati tecnici cambiano se il veicolo è un'auto, un furgone
o una moto. Detto da Emanuele il 26/09/2026.

Nel codice c'è in parte: il tipo di azienda (concessionaria, noleggio, o tutte e due) toglie già il noleggio
dalla scheda di una concessionaria. Il tipo di veicolo invece non c'è.

## Parco auto — definito il 26/09/2026

| Cosa fa | Nel codice oggi |
|---|---|
| **Una scheda per ogni veicolo**, coi campi che cambiano fra auto, furgone e moto: marca, modello, allestimento, targa, telaio, anno, chilometri, dotazioni, foto, e i dati tecnici del suo tipo | c'è per auto, furgoni e moto, dal passo 05: carrozzerie o tipi di moto, porte, portata, cilindrata, patente, classe Euro e neopatentati |
| **Due prezzi, il prezzo di listino e il prezzo scontato**: se c'è lo sconto, sul sito si vedono tutti e due. Detto da Emanuele il 26/09/2026 | c'è, dal passo 05: il catalogo mostra il listino barrato e lo sconto in percentuale, e ordina sul prezzo che si paga |
| **Si carica anche dal telefono**, con le foto scattate lì; la prima è la copertina | si può, ma va provato dal telefono |
| **A cosa serve il veicolo**: vendita, noleggio o tutte e due, e il noleggio solo per chi noleggia | c'è |
| **In che stato è**: disponibile, prenotato, noleggiato, in preparazione, in manutenzione, venduto | c'è |
| **Le scadenze** di assicurazione, revisione e tagliando, **con gli avvisi** quando si avvicinano | c'è, dal passo 05: quelle scadute o entro 30 giorni stanno nella linguetta «Scadenze», col numero sulla voce del menù e un riquadro nella dashboard |
| **Pubblicare o no**: con un interruttore il veicolo va sul sito | c'è |
| **I veicoli che il cliente ha già** entrano tutti insieme all'inizio, da un file | c'è, dal passo 05: da Excel, ODS o CSV, col modello da scaricare; entrano come bozze, e le righe sbagliate si saltano dicendo perché |

**La scheda registra ogni dato che serve ai filtri**, sul sito e nel gestionale: quelli che mancavano, come la
classe Euro, i neopatentati e i campi di furgoni e moto, sono entrati col passo 05. I filtri stanno nel Sito, qui sotto.

**I portali vengono dopo**, detto da Emanuele il 26/09/2026: si parte dal sito. Come si collegano, quando
sarà il momento, sta in [[projects/autoos/portali|pubblicare sui portali]].

## Sito — definito il 26/09/2026, filtri da confermare

La base è una sola, uguale per tutti, col marchio del cliente; chi vuole di più compra il sito avanzato. **Il
cliente gestisce un solo parco auto**, e da lì i veicoli vanno sul sito oggi e sui portali domani: detto da
Emanuele il 26/09/2026.

| Cosa fa | Nel codice oggi |
|---|---|
| **Le pagine**: home, i veicoli, la scheda di ogni veicolo, il noleggio solo per chi noleggia, chi siamo, contatti, privacy e cookie | dal passo 06: home, elenco delle auto e scheda; chi siamo, privacy e cookie mancano, i contatti stanno in fondo a ogni pagina |
| **Il marchio del cliente**: logo, colori e caratteri, sulla stessa base | dal passo 06: logo e i due colori, con lo stile di Autonazionale; il carattere è lo stesso per tutti |
| **I veicoli arrivano dal parco auto, in tempo reale, con i filtri**, gli stessi del gestionale: sotto | dal passo 06: tutti i filtri della tabella sotto, coi conteggi; nel gestionale sono ancora quelli di prima |
| **Ogni contatto finisce in Clienti**, con il veicolo e da dove arriva: richiesta d'informazioni, richiesta di noleggio con le date, e il bottone di WhatsApp | i moduli e il collegamento al CRM ci sono; WhatsApp manca |
| **Valuta la tua permuta**: targa, marca, modello, anno, chilometri e foto dell'auto del cliente, che diventano una richiesta | manca; la valutazione della permuta c'è dentro la vendita |
| **Richiedi un finanziamento**, dalla scheda del veicolo, che diventa una richiesta | manca; la simulazione della rata c'è dentro la vendita |
| **Sta sul dominio del cliente**, con un'anteprima su un indirizzo di Qinta finché non è collegato | manca |
| **È fatto per Google**: ogni veicolo ha la sua pagina con titolo e descrizione, e c'è la mappa del sito | dal passo 06 ogni auto ha titolo e descrizione suoi; la mappa del sito manca |
| **Testi e foto li cambia il cliente dal suo gestionale**, e si vedono sul sito | manca |
| **Il sito avanzato**, per chi lo compra: più su misura, anche in 3D | la demo di Autonazionale fa vedere un primo passo |

Permuta, finanziamento, e testi e foto dal gestionale: decisi da Emanuele il 26/09/2026.

⚠️ **La rata al mese mostrata sul sito è pubblicità del credito**: per legge, chi scrive una rata deve dare
anche le informazioni di base del finanziamento, come TAN e TAEG. Per questo il modulo parte come richiesta, e
la rata sul sito si decide con chi fa i finanziamenti.

### I filtri

**Sono importantissimi, e sono gli stessi sul sito e nel gestionale**, con in più la fascia di prezzo: detto da
Emanuele il 26/09/2026. Il modello indicato è la pagina delle usate di
[Autoambrosio](https://www.autoambrosio.com/auto/usate/?orderField=price&orderMode=desc&type=USED), letta lo
stesso giorno. **Ogni filtro è un dato della scheda**: si può filtrare solo per quello che il Parco auto
registra. La proposta:

| Filtro | Per quali veicoli | Il dato nella scheda, oggi |
|---|---|---|
| tipo di veicolo: auto, furgone, moto | tutti | c'è, dal passo 05 |
| condizione: nuovo, km 0, usato | tutti | c'è |
| marca, e il modello della marca scelta | tutti | c'è |
| prezzo da… a…, la fascia di prezzo, sul prezzo a cui si vende davvero | tutti | c'è |
| chilometri da… a… | tutti | c'è |
| anno da… a… | tutti | c'è |
| alimentazione | tutti | c'è |
| cambio | tutti | c'è |
| sede | chi ha più sedi | c'è |
| carrozzeria: SUV, berlina, station wagon, monovolume, city car, coupé, cabrio | auto | c'è |
| posti, porte, potenza, colore | auto | ci sono |
| classe Euro, neopatentati | auto | ci sono, dal passo 05 |
| carrozzeria: furgone, cassonato, cabinato, minibus; portata | furgoni | ci sono, dal passo 05 |
| tipo di moto (scooter, naked, enduro, sportiva, custom, turismo), cilindrata, patente A1, A2 o A | moto | ci sono, dal passo 05 |
| date di ritiro e riconsegna, prezzo al giorno | solo per chi noleggia | ci sono |

**L'ordine**: più recenti, prezzo, chilometri e anno, in su e in giù. Accanto a ogni scelta, quanti veicoli ci
sono, come fa Autoambrosio: «Diesel (43)». **La scheda nell'elenco** mostra foto, marca, modello e versione,
anno, chilometri, alimentazione, cambio, prezzo di listino e prezzo scontato se c'è lo sconto, e le etichette:
offerta, km 0, neopatentati.

**I loghi delle marche** compaiono nei filtri e nelle schede, sul sito e nel gestionale, come da Autoambrosio:
detto da Emanuele il 26/09/2026. Serve una raccolta di loghi di Qinta, perché quelli di Autoambrosio arrivano
dal server di MotorK. *Nel codice mancano.*

## Clienti — definito il 26/09/2026

Il CRM c'è quasi tutto, dal 09/09. Emanuele ha deciso i messaggi e il cliente che aspetta un veicolo, e
sul resto non ha cambiato niente:

| Cosa fa | Nel codice oggi |
|---|---|
| **Tutti i contatti in un posto, senza doppioni**, riconosciuti da telefono ed email, ognuno con la sua storia: richieste, trattative, acquisti, noleggi, documenti | c'è |
| **Da dove arrivano**: dal sito da soli (informazioni, noleggio, permuta, finanziamento); telefono, salone e WhatsApp si segnano a mano; i portali più avanti | dal sito ci sono informazioni e noleggio; permuta e finanziamento mancano |
| **Ogni richiesta ha un responsabile**: quelle dal sito vanno da sole al venditore con meno trattative aperte | c'è |
| **La trattativa segue le sue fasi**, con il veicolo che interessa: nuovo, da contattare, contattato, appuntamento, preventivo, trattativa, vinta o persa; le fasi si cambiano | c'è |
| **L'agenda**: richiami, appuntamenti e prove su strada, con gli avvisi quando scadono | l'agenda c'è; gli avvisi fuori dal gestionale no |
| **Il cliente che aspetta un veicolo**: se cerca qualcosa che non c'è, si segna, e quando ne entra uno simile Qinta lo dice | manca, è nuovo |
| **Il cruscotto del titolare**: richieste del mese, trattative aperte, vinte, e quanto si mette a rispondere | c'è |
| **I messaggi automatici** al cliente, come la conferma che la richiesta è arrivata: **prima l'email, WhatsApp in futuro**, deciso da Emanuele il 26/09/2026 | WhatsApp c'è solo simulato, l'email manca |

### Il cliente che aspetta un veicolo, come funziona

Entra in Qinta, deciso da Emanuele il 26/09/2026:

1. **Si segna la ricerca.** Dal gestionale, sulla scheda del cliente, con gli stessi filtri del sito: tipo,
   marca, modello, prezzo massimo, chilometri, anno, alimentazione, cambio. Oppure dal sito, da solo: quando
   una ricerca non trova niente, il sito propone «Avvisami quando arriva», e con nome, telefono o email e il
   consenso nasce il contatto con la sua ricerca già dentro.
2. **Quando entra un veicolo, Qinta lo confronta con le ricerche aperte.** Lo fa quando si salva un veicolo
   nuovo, e quando un prezzo scende dentro il limite di qualcuno.
3. **Se corrisponde, avvisa.** Al venditore arriva nell'agenda «Richiama Mario: è entrata la Panda che
   cercava», col link al veicolo. Al cliente, se l'ha chiesto, parte un'email con la scheda.
4. **La ricerca si chiude da sola** quando il cliente compra, quando scade, o quando dice basta.

In più il titolare vede cosa cercano i clienti che non ha servito, e sa cosa conviene comprare: «tre persone
cercano un SUV diesel sotto i 15.000 €». Usa gli stessi dati dei filtri, quindi non chiede niente di nuovo
alla scheda.

## Documenti — definito il 26/09/2026

I documenti ci sono già, cifrati, dentro ogni noleggio e ogni vendita:

| Cosa fa | Nel codice oggi |
|---|---|
| **La cartella di ogni cliente**: tutti i suoi documenti in un posto, collegati anche alla vendita o al noleggio a cui servono: documento d'identità, patente, codice fiscale, contratti, copie firmate, verbali, ricevute | ci sono dentro ogni noleggio e ogni vendita; una cartella unica per cliente no |
| **Si caricano anche dal telefono**: la foto del documento, scattata al banco | si può, va provato |
| **Le scadenze** di patente e documenti, con gli avvisi | la lista dei documenti in scadenza c'è nei fascicoli; gli avvisi fuori dal gestionale no |
| **I contratti li prepara Qinta**, coi dati già dentro, a versioni, da stampare o salvare in PDF | c'è; il PDF passa dalla stampa del browser, e il testo del contratto va scritto e fatto controllare da un legale |
| **La firma, per ora su carta**: si stampa, si firma a penna e si carica la copia. La firma elettronica, con un fornitore, viene più avanti: deciso da Emanuele il 26/09/2026 | c'è la copia firmata caricata a mano |
| **I verbali di consegna e riconsegna**, con chilometri, carburante, foto e danni messi a confronto | c'è per il noleggio; per la vendita c'è il verbale di consegna |
| **Riservati**: li vede solo chi ha il ruolo giusto, e ogni apertura resta registrata | c'è |
| **Per il noleggio, Ca.R.G.O.S.**: i dati del documento di chi noleggia partono verso la Polizia di Stato dalla pratica | manca, ed è obbligatorio |

### La firma elettronica, quando arriverà

Spiegata a Emanuele il 26/09/2026; resta fra le cose che vengono dopo.

- **Per il cliente**: riceve un link per SMS o email, legge il contratto sul telefono e firma con un codice
  che gli arriva per SMS. Oppure firma al banco, col dito o con la penna sul tablet. Nel noleggio vuol dire
  firmare da casa la sera prima, e al ritiro prendere solo le chiavi.
- **Dietro**: Qinta prepara il PDF del contratto e lo manda al fornitore della firma, insieme a nome,
  email e telefono del cliente; il fornitore raccoglie la firma e restituisce a Qinta il PDF firmato, con la
  traccia di chi ha firmato e quando; Qinta lo salva nella cartella del cliente e segna il contratto come
  firmato.
- **Il valore**: le firme elettroniche hanno tre livelli, semplice, avanzata e qualificata. Per contratti di
  vendita e di noleggio di solito si usa l'avanzata, col codice via SMS o sul tablet, che vale come la firma
  su carta. Quale serve davvero lo conferma il legale che scrive il contratto.
- **Il costo**: si paga il fornitore, a firma o con un piano al mese; le cifre si guardano quando si sceglie.
- **I fornitori**, guardati il 26/09/2026. I due da mettere a confronto sono
  [Yousign](https://yousign.com/api), europeo, nella lista dei fornitori fiduciari dell'Unione, con un'API
  pensata per i software, prove gratuite e firma avanzata col codice via SMS; e
  [Namirial](https://www.namirial.it/dettagli/esignanywhere/), italiano, con eSignAnyWhere, che fa firma
  semplice, avanzata e qualificata, col codice via SMS e anche la
  [grafometrica](https://servicedesk.namirial.com/hc/it/articles/4417450007569-La-firma-grafometrica-di-Namirial-%C3%A8-una-firma-elettronica-avanzata)
  sul tablet, con piani da 15 € al mese. Fra i grandi ci sono anche InfoCert e Aruba, italiani, e Docusign.
  La scelta dipende da quale firma chiede il legale, e da quanto conta firmare sul tablet al banco.
- **Cosa manca nel codice**: un PDF vero generato dal server, perché oggi il contratto passa dalla stampa
  del browser; il collegamento col fornitore; e il salvataggio del firmato nella cartella.

## Vendita — definita il 26/09/2026

Il modulo della concessionaria c'è dal 09/09. La permuta che entra da sola nel parco auto e le pratiche
dopo la vendita le ha confermate Emanuele:

| Cosa fa | Nel codice oggi |
|---|---|
| **La pratica di vendita** nasce dalla trattativa, col cliente e il veicolo | c'è |
| **Il preventivo**, con prezzo, sconto, spese e permuta, a versioni, da stampare | c'è |
| **La permuta**: dati, foto e valutazione dell'auto del cliente, e **quando la vendita si chiude entra da sola nel parco auto**, in preparazione | la permuta c'è; l'ingresso nel parco auto manca |
| **La riserva**: quando il cliente accetta, il veicolo sparisce dal sito e non si noleggia più | c'è |
| **La vendita e la consegna**, con la copia firmata, le verifiche e il verbale | c'è |
| **Costi e margine** di ogni veicolo, acquisto e preparazione, visti solo da titolare e responsabili | c'è; il margine è lordo, non tiene conto dell'IVA |
| **Dopo la vendita**: il passaggio di proprietà e la garanzia. Le pratiche le fa un'agenzia, e in Qinta si segue a che punto sono, con le scadenze e i documenti caricati | mancano |
| **Il finanziamento**: la richiesta dal sito arriva nella pratica, e la rata indicativa resta interna | la simulazione c'è; il collegamento con le finanziarie no, e resta fuori |
| **Le fatture** le fa il programma che la concessionaria usa già, o il commercialista | Qinta non le fa, e resta così |

## Noleggio — definito il 26/09/2026

Prenotazioni e fascicolo ci sono dal 09/09. Il blocco compare solo per chi noleggia:

| Cosa fa | Nel codice oggi |
|---|---|
| **Il calendario della flotta**: chi ha quale veicolo, quando e in quale sede, coi tempi di preparazione | c'è |
| **Le prenotazioni**: dal sito arrivano come richiesta e le conferma il team; al telefono o al banco si inseriscono a mano; la disponibilità si controlla da sola | c'è |
| **I prezzi**: tariffa al giorno e cauzione, e **le tariffe le cambia il cliente quando vuole**: niente tariffe per stagione, e gli extra non dal primo giorno. Deciso da Emanuele il 26/09/2026. Le prenotazioni già fatte tengono il prezzo di quando sono nate | c'è |
| **Ritiro e riconsegna**, con ora, chilometri, carburante, foto e danni, e i ritardi segnalati | c'è |
| **Il fascicolo**: conducenti, documenti, contratto firmato; senza, il veicolo non si consegna | c'è |
| **Ca.R.G.O.S.**: i dati di chi noleggia partono verso la Polizia di Stato prima della consegna, per auto e furgoni | manca, ed è obbligatorio |
| **Incassi e cauzioni** già avvenuti, compresa la cauzione trattenuta per i danni | c'è |
| **I promemoria al cliente per email**, il giorno prima del ritiro e della riconsegna | manca |
| **Le multe**: quando arriva un verbale, Qinta trova chi aveva il veicolo in quel giorno e a quell'ora, coi dati per girarlo. Tenuto da Emanuele il 26/09/2026 | manca |
| **I pagamenti online** | restano fuori, per ora |

## Il design del gestionale — deciso il 26/09/2026

Chiesto da Emanuele dopo aver visto il gestionale, che aveva la sidebar e la modalità scura verde grafite:
«questo verde scuro non mi piace». Le regole:

- **Sempre due modalità, chiara e scura**, coi colori del marchio usati in un altro modo: avorio, grafite e
  arancio, senza verde. In chiaro la pagina è avorio, le schede e la sidebar bianche; in scuro è quasi nera, con
  grigi neutri. L'arancio segna quello che è attivo e i bottoni principali.
- **La sidebar è super ordinata, semplice e intuitiva**: ci tiene tantissimo. Segue i blocchi del prodotto,
  Dashboard e Parco auto in alto, poi Clienti, Vendita, Noleggio, e Impostazioni chiuso in fondo; ogni blocco
  compare solo a chi lo usa. Ogni voce nuova va nel suo blocco, e il titolo della pagina dice la stessa cosa
  della voce del menu.
- **Il cruscotto** avrà un design suo, col passo 10.

Applicato nel codice lo stesso giorno, sul ramo `design-chiaro-scuro`.

## Il cruscotto — richiesto il 26/09/2026, contenuto in bozza

**Appena si apre il gestionale, la prima cosa che si vede è un cruscotto con tutti i dati principali e i
grafici del business**: chiesto da Emanuele il 26/09/2026. Oggi la prima pagina mostra il piano e le funzioni
accese, cioè niente che serva a chi lavora; i numeri di flotta, noleggi e CRM ci sono, ma sparsi in altre
pagine, e i grafici non ci sono. Anche il cruscotto è dinamico: il noleggio compare solo per chi noleggia, i
margini solo a titolare e responsabili, e dal telefono è lo stesso. La bozza:

- **I numeri in alto**: veicoli in stock e il loro valore; vendite del mese, quante e per quanto; il margine del
  mese; richieste nuove e trattative aperte; per chi noleggia, noleggi in corso, ritiri e rientri di oggi, e
  quanta flotta è fuori.
- **I grafici**: vendite e margine mese per mese, sull'ultimo anno; da dove arrivano le richieste; da quanto
  tempo i veicoli stanno in stock, perché quelli fermi costano; per chi noleggia, incassi e flotta fuori mese
  per mese.
- **Le cose da fare oggi**: richiami e appuntamenti, attività in ritardo, scadenze in arrivo di veicoli e
  documenti, clienti in attesa di un veicolo appena entrato, rientri in ritardo.

## La prima versione — confermata il 26/09/2026

Messa insieme dai blocchi, e confermata da Emanuele lo stesso giorno. Parte dall'idea che il primo cliente sia una concessionaria, perché i
lead di Emanuele sono concessionarie: se è un noleggio, la parte del noleggio passa davanti.

**Per partire con una concessionaria:**

1. **Online**: l'hosting, i sottodomini dei clienti, il dominio del cliente collegato al suo sito, le email che
   partono, i backup, e il gestionale installabile sul telefono.
2. **Parco auto**: il tipo di veicolo coi campi che cambiano, i due prezzi, i dati che servono ai filtri, gli
   avvisi sulle scadenze, e l'importazione dei veicoli che il cliente ha già.
3. **Sito**: la base col marchio del cliente e tutte le pagine, i filtri coi loghi delle marche, i moduli
   (informazioni, permuta, finanziamento, «Avvisami quando arriva»), WhatsApp, le pagine per Google, e la
   sezione Sito nel gestionale per testi e foto.
4. **Clienti**: le email automatiche e il cliente che aspetta un veicolo.
5. **Documenti**: la cartella unica di ogni cliente.
6. **Vendita**: la permuta che entra nel parco auto, e passaggio di proprietà e garanzia.
7. **Il cruscotto**: la prima pagina, con i dati e i grafici di tutto il business.

**Per il primo noleggio**, in più: Ca.R.G.O.S., che è obbligatorio e senza il quale un noleggio non parte, i
promemoria per email e le multe.

**Dopo**, quando serviranno: i portali, a cominciare da AutoScout24; la firma elettronica; WhatsApp; gli extra
del noleggio; i pagamenti online; il sito avanzato, dal primo cliente che lo compra.

**Fuori dal codice, ma prima del primo cliente**: il testo dei contratti, controllato da un legale, e la parte
privacy, con Qinta responsabile del trattamento per ogni concessionaria.

## Dalla prima versione alla prova — proposta del 26/09/2026

Emanuele vuole applicare tutto e poi partire con una prova vera. La strada proposta, in tre fasi:

1. **Costruire la prima versione**, un passo di TickTick alla volta, dal 04 al 10. Per ogni passo: cosa deve
   fare, preso da questa nota; il codice; i test che girano tutti; la prova nel browser con gli screenshot a
   Emanuele; il README aggiornato, che è il diario del progetto anche per Codex; un commit. Emanuele guarda, dice
   ok, e si passa al successivo. Mai Claude e Codex sullo stesso passo.
2. **La prova generale, con Autonazionale**, il conoscente di Emanuele che ha già la sua demo: messa online su
   un indirizzo di prova, ci si fa tutto il giro dal telefono e dal computer: un'auto caricata dal piazzale, il sito che la mostra, la
   richiesta che arriva, la vendita con la permuta, la permuta che entra nel parco auto.
3. **La prova vera con un cliente**: una concessionaria vera, con le sue auto e il suo dominio, per qualche
   settimana e a un prezzo di favore, come deciso il 17/09. Prima servono il contratto del legale, la privacy,
   l'hosting scelto e `qinta.it` registrato. Durante, un controllo ogni settimana con la lista di cosa non va.
   Alla fine, il prezzo vero.

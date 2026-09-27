---
title: "Qinta — la mappa del prodotto"
summary: "La mappa che all'inizio mancava, aperta il 26/09/2026: chi è il cliente, come lavora e cosa usa oggi, le funzioni divise in blocchi sul modello di MotorK con un solo parco auto che aggiorna sito e portali, come funziona dal lato di Qinta, da quello del cliente e tecnicamente, fra server e domini. Si riempie un punto alla volta, prima di proporlo."
tags:
  - projects
  - qinta
  - prodotto
status: in-lavorazione
created: 2026-09-26
updated: 2026-09-26
related:
  - "[[projects/autoos/sistema]]"
  - "[[projects/autoos/brand]]"
  - "[[sources/riferimenti/motork-piattaforma-concessionari]]"
  - "[[self/reference/offerta]]"
---

# Qinta — la mappa del prodotto

> Aperta il 26/09/2026. Il gestionale è nato veloce, con Codex, dalle esigenze che Emanuele immaginava e
> senza una mappa. Questa la fa adesso, partendo dal cliente e non dalle funzioni, per limare e definire
> Qinta prima di proporlo. Cosa c'è oggi nel codice sta in [[projects/autoos/sistema|cosa fa il sistema]],
> e ogni funzione che c'è si misura contro questa mappa. Le decisioni, con la data, vanno nella
> [[projects/autoos/MEMORY|memoria del progetto]].

## 1 · Il cliente

**Concessionarie e autonoleggi**, detto da Emanuele il 26/09/2026. Hanno esigenze simili ma non uguali: il
noleggio deve vedere le auto noleggiate, i rientri e il calendario della flotta, la concessionaria no.
**Molti fanno tutte e due le cose**, e per loro Qinta tiene insieme vendita e noleggio sulla stessa flotta.

**I veicoli sono auto, furgoni e moto**, per ora: deciso da Emanuele il 26/09/2026. Il codice oggi conosce
solo le auto, con le categorie city car, berlina, SUV, familiare, sportiva, van e premium. Ogni tipo nuovo
cambia la scheda del veicolo (la moto ha la cilindrata e non le porte, il furgone la portata), le categorie
sui portali, e le regole: l'obbligo Ca.R.G.O.S. del noleggio vale per le auto, non per le moto.

Il perché di questo settore: nella zona di Emanuele è poco servito e le concessionarie a cui proporlo sono
tantissime, mentre il food è pieno e per ora non si attacca. Il 16/09 l'aveva detto così, ed è scritto
nell'[[self/reference/offerta|offerta]]: una concessionaria ogni cento metri, nessuna con un sito fatto
bene.

## 2 · Come lavora oggi, e dove perde

**Da vedere.** È il punto vuoto, ed è quello da cui dipendono gli altri: le funzioni giuste escono dai
problemi veri. Si scrive dopo averne parlato con una o due persone del settore, come dicono i passi 01 e 02
di `[PROGETTO] QintaOS` su TickTick.

## 3 · Cosa usa oggi

Secondo Emanuele, il 26/09/2026: **tanti Excel e file sparsi, portali poco comodi, e siti vecchi e fermi**
che nessuno aggiorna. Si conferma nelle stesse conversazioni del punto 2, insieme a quanto paga oggi e a
chi.

Ne vengono due cose:

- **Il sito fermo è il problema che Emanuele ha visto coi suoi occhi**, ed è dove Qinta può fare la
  differenza più chiara: un sito che legge il parco auto non invecchia, perché cambia ogni volta che cambia
  lo stock.
- **I portali li usano comunque.** Se Qinta non ci pubblica, le auto si inseriscono due volte, una qui e
  una lì. MotorK ci ha costruito sopra un prodotto intero, e il 26/09 Emanuele ha deciso che in Qinta
  entrano: sta nel punto 4.

## 4 · Le funzioni, in blocchi

Emanuele vuole dividerle in modo che facciano più impatto, come fa
[[sources/riferimenti/motork-piattaforma-concessionari|MotorK]]: pochi prodotti, ognuno con un nome e una
promessa. La proposta del 26/09, costruita sui moduli che ci sono già:

| Blocco | Cosa fa | Per chi | Nel codice oggi |
|---|---|---|---|
| **Parco auto** | ogni veicolo con foto, prezzi, scadenze e sede, caricato una volta sola, anche dal telefono | tutti | c'è; dal telefono si apre, ma non è pensato per quello |
| **Sito e portali** | il sito dell'attività e gli annunci su Subito e AutoScout24, aggiornati da soli dal parco auto | tutti | il sito a metà, un catalogo sotto l'indirizzo del gestionale; i portali non ci sono |
| **Clienti** | le richieste dal sito, dai portali e dal telefono, le trattative e l'agenda | tutti | c'è; WhatsApp solo simulato |
| **Documenti** | la cartella di ogni cliente: contratti, patenti, copie firmate, verbali | tutti | c'è, dentro noleggio e vendita, ed è un interruttore a parte |
| **Noleggio** | il calendario della flotta, le prenotazioni, le consegne e i rientri, le cauzioni | chi noleggia | c'è |
| **Vendita** | i preventivi, le permute, la riserva dell'auto, la consegna e i margini | chi vende | c'è |

**I primi quattro sono la base, uguale per tutti. Sopra si aggiunge Noleggio, Vendita o tutti e due**: sono
le tre versioni di Qinta, per la concessionaria, per l'autonoleggio e per chi fa entrambe le cose, e
tornano coi tre profili che il sito del prodotto ha già. Ogni blocco si definisce, uno alla volta, in
[[projects/autoos/blocchi|i blocchi, uno per uno]].

**Il lavoro segue un filo solo**: l'auto entra una volta nel parco auto ed esce da sola sul sito e sui
portali; da lì arrivano i clienti, che finiscono tutti nello stesso posto; quando un cliente decide, la
trattativa diventa una vendita o un noleggio, con la sua cartella di documenti.

**Un solo parco auto, che si sincronizza col sito e coi portali, è la funzione più importante**, detto da
Emanuele il 26/09/2026. I portali oggi non ci sono. Verificato lo stesso giorno, in
[[projects/autoos/portali|pubblicare sui portali]]: AutoScout24 ha un'API gratuita da chiedere, Subito accetta
solo i gestionali che autorizza, e i contatti di tutti e due tornano per email.

**La documentazione di ogni cliente è importante**, detto da Emanuele lo stesso giorno: per questo i
documenti stanno nella base, in tutte e tre le versioni, e non in un interruttore a parte.

⚠️ **Il sito di Qinta oggi non vende il sito.** Presenta parco auto, noleggio e vendite, ma non dice mai che
il cliente riceve un sito suo, che è proprio il problema visto in zona.

## 5 · Come funziona dal lato di Qinta

**Qinta è un SaaS, ed è un brand a parte che non riguarda direttamente Emanuele Boccia**, detto da Emanuele
il 26/09/2026. Il cliente paga l'abbonamento e riceve **il setup iniziale, la formazione e l'assistenza**.
Il codice è già costruito così: l'hub coi piani, le funzioni da accendere e gli abbonamenti. L'argomento
«è vostro» contro il canone resta del personal brand, e su Qinta non vale.

**Il sito del cliente parte da una base uguale per tutti, definita e fatta bene**, e vestita col suo marchio:
i suoi caratteri e i suoi colori. **Chi vuole di più compra il sito avanzato**, più su misura e più d'effetto,
anche con elementi in 3D: un upsell. Deciso da Emanuele il 26/09/2026.

**Setup, assistenza e prezzo si stabiliscono nell'offerta**, dopo: prima si definisce il prodotto, come si
presenta e come funziona. Detto da Emanuele lo stesso giorno.

Come fanno gli altri sta in [[projects/autoos/concorrenti|i concorrenti]], letti il 26/09/2026: niente da
installare, partenza in ore o giorni, auto importate, sito da un modello, formazione a distanza inclusa, e chi
punta ai piccoli pubblica il prezzo.

Da rivedere di conseguenza: la pagina dei sistemi del sito personale, che presenta il sistema per l'auto
come una base che si cuce addosso e come firma di Emanuele
([[projects/personal-brand/sito-pagine|le pagine del sito]]).

## 6 · Come funziona dal lato del cliente

**Si usa anche dal telefono, come una webapp, e il titolare vede i suoi dati in tempo reale, quando
vuole**: detto da Emanuele il 26/09/2026, ed è già una comodità grande da sola. Niente da scaricare dagli
store: è la web app del gestionale, installata sul telefono come PWA, precisato da Emanuele lo stesso giorno.
Qinta è solo web.

**Sul telefono è lo stesso gestionale, con le stesse funzioni, in versione mobile**: deciso da Emanuele il
26/09/2026. Non c'è una app diversa con meno cose, c'è il gestionale responsive, installato come PWA.

Oggi i pannelli si adattano al telefono, ma Qinta non si installa come un'app e gira solo sul Mac. Servono
due cose: metterlo online e renderlo installabile con la sua icona. Poi va provato schermata per schermata
dal telefono, perché tabelle e moduli lunghi sono i punti dove un gestionale responsive si rompe.

## 7 · Come funziona tecnicamente

La proposta del 26/09/2026, dopo che la divisione in blocchi a Emanuele «diciamo che torna».

**Qinta non si installa dal cliente.** È un'applicazione sola, su un server solo, con un database solo per
tutti i clienti: ogni dato porta il segno della sua azienda, e nessuna vede quelli delle altre, come fa già il
codice. Un cliente nuovo è un'azienda creata dall'hub, con un'operazione sola.

**I domini:**

- **`qinta.it`** per il sito del prodotto. Il 26/09/2026 risultava libero; `qinta.com` è registrato dal
  2001.
- **Il gestionale di ogni cliente sta su un suo sottodominio di Qinta**, come `autonazionale.qinta.it`:
  deciso da Emanuele il 26/09/2026. Basta un record DNS jolly, `*.qinta.it`, con un certificato jolly: ogni
  sottodominio nuovo funziona da solo, senza toccare niente, e Qinta dall'indirizzo capisce di quale cliente
  si tratta. Dal telefono ognuno installa la web app del suo indirizzo, che può portare il suo nome.
  `app.qinta.it` resta come porta per chi dimentica il suo indirizzo.
- **Il sito del cliente sta sul suo dominio**, come `autonazionale.it`. Il dominio resta del cliente: si
  cambia un solo record del suo DNS, che punta a Qinta, e Qinta riconosce il dominio, mostra il sito di quel
  cliente e crea da sola il certificato. La posta del cliente non si tocca. Finché il dominio non è collegato,
  il sito si vede in anteprima su un indirizzo di Qinta. Spesso il dominio lo gestisce la vecchia agenzia, e
  nel setup va recuperato l'accesso; se il cliente non ce l'ha, si registra a nome suo.
- **Tutti questi indirizzi arrivano allo stesso server**: è Qinta che guarda l'indirizzo e decide cosa
  mostrare, e di quale cliente.

**La scelta per il gestionale, con pro e contro**, messa giù il 26/09/2026:

| | Un indirizzo solo, `app.qinta.it` | Un sottodominio per cliente, `nome.qinta.it` |
|---|---|---|
| Per il cliente | indirizzo e app sul telefono sono di Qinta | lo sente suo: il nome nell'indirizzo, il logo all'accesso, l'app col suo nome |
| Per il codice | è già così | va riconosciuta l'azienda dall'indirizzo, e l'accesso si rifà per azienda |
| Per l'hosting | un certificato solo | un certificato jolly, da verificare nella scelta dell'hosting |
| Per l'assistenza | un indirizzo solo da dire a tutti | ognuno ha il suo; chi lo dimentica lo ritrova da `app.qinta.it` |
| Per la sicurezza | l'azienda la decide il login | in più, ogni sessione resta chiusa nel suo sottodominio |

**Deciso il sottodominio**, da Emanuele il 26/09/2026, e prima del primo cliente: passarci dopo vorrebbe dire
far cambiare indirizzo a tutti e far reinstallare l'app sul telefono. Il sito del cliente, invece, sta sempre
sul suo dominio: è suo, e lì ha senso anche per Google.

**L'hosting non può essere quello dei gestionali di famiglia.** Mamma Rosaria sta su Ergonet e la Masseria su
Hostinger, hosting condivisi: vanno bene per un gestionale solo, non per Qinta. Sulla Masseria lo scheduler di
Laravel non parte, perché Hostinger spegne `pcntl_signal` (visto il 24/09), l'SSH è spento e si pubblica dal
Gestore file. Qinta invece ha bisogno di lavori automatici ogni minuto, della sincronizzazione coi portali, di
tanti domini di clienti col loro certificato e di un archivio privato per i documenti.

**Non c'è un fornitore obbligato**: va bene qualunque hosting che faccia queste cose. Le famiglie sono tre, da
quella che si segue meno a quella che si segue di più:

- **una piattaforma gestita**, come Laravel Cloud, la piattaforma ufficiale di Laravel: si manda il codice, e
  server, database, scheduler e certificati li gestisce lei;
- **un server virtuale con un pannello sopra**: il server da Hetzner, DigitalOcean o anche dal VPS di
  Hostinger, che non è il suo hosting condiviso, e un pannello come Laravel Forge o Ploi che installa e
  pubblica;
- **un server virtuale gestito tutto a mano**: sconsigliato, finché su Qinta lavora una persona sola.

Da verificare prima di scegliere, ovunque: come gestisce tanti domini di clienti, ognuno col suo certificato,
e che i server stiano in Europa, perché dentro ci sono i documenti dei clienti dei clienti. **La scelta serve
quando si va online**, non prima.

**Cosa gira sul server:** l'applicazione, il database MySQL, l'archivio privato di foto e documenti cifrati, i
lavori automatici ogni minuto, l'invio delle email, e i backup di dati e file ogni giorno, tenuti altrove. La
chiave dell'applicazione si custodisce a parte: senza, i documenti cifrati non si leggono più.

**Come si aggiorna:** il lavoro si fa sul Mac, con Codex o con Claude, e passa dai test; poi il codice va nel
repository, da lì in un ambiente di prova online e infine in produzione. Un aggiornamento arriva a tutti i
clienti insieme.

**Il cliente nuovo, passo per passo:**

1. dall'hub si crea l'azienda, con la sua versione;
2. il sito: il tema, il logo, i colori, i testi, e il dominio collegato;
3. le auto che ha già: oggi si caricano a mano una per una, e serve un'importazione dal file XML del
   vecchio fornitore, dai portali o da Excel, come fanno gli altri;
4. i portali collegati: la concessionaria ha il suo abbonamento su Subito e su AutoScout24, e su AutoScout24
   autorizza Qinta dal suo pannello, col suo codice cliente;
5. gli utenti e la formazione; dal telefono, Qinta si aggiunge alla schermata come un'app.

**Cosa manca nel codice per tutto questo:** i sottodomini e i domini dei clienti, i portali, l'importazione
delle auto, le email, l'installazione come app e, per il noleggio, la comunicazione dei dati di chi noleggia
alla Polizia di Stato con Ca.R.G.O.S., che è obbligatoria. Il resto c'è.

**Anche la privacy è tecnica.** Qinta custodisce patenti e documenti dei clienti delle concessionarie: per ogni
concessionaria è responsabile del trattamento, e serve scriverlo nel contratto.

## Poi

Il prezzo, quando i punti sono scritti: dipende da tutti.

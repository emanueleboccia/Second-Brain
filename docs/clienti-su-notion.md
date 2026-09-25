---
title: "Clienti su Notion — dove sta cosa e cosa si aggiorna"
summary: "Com'è fatta la parte clienti di Notion: aziende, contatti e trattative, la Home che il briefing del mattino legge, i rinnovi, le fatture, e la tabella di cosa si aggiorna a ogni passo del lavoro. Staccata dal processo cliente il 24/09/2026."
tags:
  - docs
  - processi
status: attivo
created: 2026-09-24
updated: 2026-09-24
related:
  - "[[docs/processo-cliente]]"
  - "[[docs/documenti-commerciali]]"
  - "[[self/tariffario]]"
---

# Clienti su Notion — dove sta cosa e cosa si aggiorna

Il metodo sta nel [[docs/processo-cliente|processo cliente]]; qui sta dove quel metodo lascia le
tracce su Notion. Questa parte stava dentro il processo fino al 24/09/2026, quando la nota aveva
superato le trecento righe.

**Dal 22/09/2026 tutto quello che è un documento o uno stato di un cliente vero passa da Notion**,
deciso da Emanuele. Sta nella pagina *Clienti*, coi database nell'ordine del lavoro: Cruscotto
commerciale, Aziende, Contatti e lead, Trattative, Riunioni, Onboarding clienti, Portali clienti.
Nel vault resta il metodo; lì stanno i PDF, le fatture e il punto in cui è ogni lavoro. Come si
chiamano quei documenti sta in [[docs/documenti-commerciali|documenti commerciali]].

## Il CRM

**Dal 24/09/2026 il CRM ha tre database, sul modello scelto da Emanuele**, senza la divisione fra
privati e aziende, che qui non serve:

- **Aziende** — le organizzazioni: nome, settore, sito, e le relazioni verso chi ci lavora e verso
  le trattative.
- **Contatti e lead** — le persone. Lo *Stato* dice a che punto sono: *Cold lead (scraping)* per le
  liste fredde da qualificare, *Nuovo* e *In lavorazione* per i lead che si lavorano, *Cliente
  attivo*, *Ex cliente*, *Scartato*, e *Rete* per chi non è da vendere. L'*Origine* dice come sono
  arrivati: *Scraping web*, *Inbound sito*, *Passaparola*, *Outreach* e le altre. È da stato e
  origine che si decide come contattarli. Di ogni persona si tengono solo telefono ed email.
- **Trattative** — l'ex database Proposte. La *Fase trattativa* è quella commerciale: *In
  qualifica*, *Preventivo inviato*, *In negoziazione*, *Chiuso vinto*, *Chiuso perso*. La *Fase
  lavoro* segue il lavoro vinto fino al saldo. Il titolo è il codice della proposta,
  `PROP_2026_001_Ragosta`.

Il *Settore* delle aziende è stato riempito il 24/09/2026, tutte e 36, con quello che dicevano il vault e le
trattative e poi con quello che ha detto Emanuele, e con undici settori nuovi: *Noleggio auto*, *Ottica*,
*Alimentari*, *Eventi*, *Sicurezza*, *Consulenza*, *Agenzia*, *Turismo*, *Calzature*, *Accessori* e
*Bellezza*. Le ultime due erano Clharem, un salone di estetiste e parrucchiere, e Techne Broker, un vecchio
cliente delle assicurazioni. Un settore non si indovina dal nome: se il vault non lo dice, si chiede.

Sopra ai tre sta il **Cruscotto commerciale**, primo sotto *Clienti*, con le viste dei lead da
scraping, dei lead in lavorazione, dei clienti e degli ex clienti.

Lo stesso giorno i campi vecchi sono stati tolti: da *Contatti e lead* il testo dell'azienda, il
settore, i social e le due date; dalle *Trattative* il vecchio *Stato* e il file *Fattura*. Prima si
è spostato ogni valore al posto nuovo, archiviati compresi: diciassette aziende nuove, e ogni
contatto col suo stato. ⚠️ **Un campo tolto non sparisce subito**: resta nelle *Proprietà
eliminate* del database, sotto *Modifica proprietà*, e da lì si ripristina coi suoi dati. Il 24/09
è servito.

Chi va ricontattato non sta su Notion: sta su TickTick, nella colonna 💬 Da sentire di 💼 Personal
Brand, nata lo stesso giorno.

⚠️ **Il referral si segna in tutti e due i versi.** *Chi me l'ha mandato* e *Chi ha mandato lui* sono due
relazioni separate, e riempirne una non riempie l'altra: se Pierluigi ha mandato Gaetano, su Gaetano va
Pierluigi e su Pierluigi va Gaetano. Controllato il 24/09/2026, quando le catene note sono state segnate:
Pierluigi → Gaetano, Marco Pappacena → Salvatore e Pasquale, il padre di Emanuele, Antonio Achille
Boccia, → Antonio Pazzone, Giusy → Claudio Salemme. ⚠️ Quello di Pazzone era finito su Raffaele, che è il
fratello: il padre non era fra i contatti. Corretto lo stesso giorno, col padre aggiunto come *Rete*.

## La Home e il briefing

Dal 23/09/2026 accanto a *Clienti*, e fuori da essa, sta **Portali clienti**; e sopra a tutto la
**Home**, il cruscotto con le quattro viste che il briefing del mattino legge: lavori per fase,
fatture da incassare, lead caldi senza trattativa, rinnovi in arrivo. Sono le stesse quattro, di
proposito: quello che guardi su Notion e quello che ti viene letto la mattina devono dire la stessa
cosa. Dal 24/09/2026 il briefing le legge **proprio da lì**, vista per vista, e non con l'SQL, che
ha una quota e quel giorno è finita a metà mattina.

## I grafici

**Dal 24/09/2026 Notion è sul piano Business**, preso da Emanuele la sera stessa, e i grafici non hanno più
il limite di uno per tutto lo spazio di lavoro. Stanno in cima alle pagine, subito sotto la descrizione, due
per riga:

- **Home**: dalla notte fra il 24 e il 25/09/2026 non più grafici in colonna ma una **dashboard** di Notion,
  il *Cruscotto*, scelta da Emanuele dopo averla vista su una pagina di prova: «è molto più pulita, usa
  questa». Tre righe: in cima quattro numeri — incassato nel 2026, trattative ancora aperte, clienti attivi,
  rinnovi entro trenta giorni —, poi le trattative del 2026 per esito e l'incassato per mese, poi i lavori
  in corso per fase e i rinnovi dei clienti per mese. Sotto restano le quattro viste del briefing. Un
  riquadro si aggiunge o si sposta da «Modifica», in alto a destra della dashboard; fino a quattro per riga
  e dodici in tutto. ⚠️ Un blocco si porta da una pagina all'altra dal browser, con «Sposta in» dal menu
  del blocco: scrivere il suo tag nella pagina nuova, dall'API, crea una tabella vuota invece di spostarlo.
- **Denaro**: le entrate registrate in *Movimenti*, le fatture da incassare, entrate e costi per mese, da
  dove arrivano i soldi, i rinnovi per mese e per tipo. Le entrate sono più delle fatture incassate perché
  in *Movimenti* ci sono anche i soldi senza fattura, come il regalo di Vincenzo.
- **Clienti**: clienti attivi, lead aperti, contatti per stato, i contatti arrivati nel 2026 per origine, il
  valore delle proposte del 2026 per esito e le proposte per mese.
- **Consegnato**: siti online e gestionali in funzione, e tutti e due per stato.
- **Offerta**: i servizi richiesti e quelli venduti nel 2026, letti dalla relazione *Servizi* delle
  trattative. Una proposta senza servizi finisce in «Nessun Servizi», e il grafico dice il vero solo se ogni
  proposta ha i suoi.

⚠️ **Si conta dal 2026.** Detto da Emanuele la sera stessa, vedendo 36 trattative nella ciambella degli
esiti: gli anni passati sono archivio e non si guardano. Ogni grafico con una data parte dal 1° gennaio 2026,
che sia *Creato* per le trattative, *Data* per movimenti e fatture, *Incassata il* per gli incassi o *Aggiunto*
per i contatti; quelli che contano uno stato di adesso, come i clienti attivi o i siti online, lasciano
fuori gli archiviati.

Metà del lavoro si fa dal browser, e questo è il perché:

- **L'API crea il grafico in fondo alla pagina.** Per portarlo in cima si sostituisce la descrizione con la
  descrizione più le colonne che contengono i grafici, e i grafici si spostano lì. ⚠️ Se le colonne stanno
  dopo una riga vuota, Notion le mette in cima alla pagina e in ordine rovesciato: sulla Home è successo.
- ⚠️ **L'API raggruppa le date per giorno.** Il mese si sceglie dal browser, nelle impostazioni del grafico,
  e cambiando l'asse X l'asse Y torna a *Conteggio*: va rimesso sulla somma.
- **Dal browser si fanno anche i titoli dei numeri**, che altrimenti dicono «Somma di Importo», e si spegne
  *Mostra il titolo della sorgente dei dati*, se no sopra ogni grafico c'è il nome del database al posto del
  suo. Le pagine coi grafici sono *a tutta larghezza*.

## Rinnovi e prezzi

**Dal 24/09/2026 le date di rinnovo dei clienti stanno solo in *Rinnovi***, sotto *Denaro*: hosting,
domini e assistenze dei siti, i gestionali. *Siti Clienti* mostra il prossimo rinnovo prendendolo da lì; i
tre campi di scadenza che aveva, e la sezione della Home che li leggeva, sono stati tolti lo stesso giorno,
dopo aver controllato che ogni data fosse già in *Rinnovi*. Nello stesso giro *Servizi* è stato riempito
dal [[self/tariffario|tariffario]], che resta la fonte dei prezzi.

⚠️ **Gli abbonamenti di Emanuele non stanno in *Rinnovi*.** Fiscozen, il piano Hostinger, i domini
emanueleboccia e Notion stesso stanno nelle spese ricorrenti della finanza, nel vault, con la loro data di
rinnovo: il briefing li legge da lì. Deciso da Emanuele la sera del 24/09/2026, quando è stato proposto di
aggiungere Notion fra i rinnovi: le quattro righe che c'erano sono state tolte.

**I rinnovi dei clienti si leggono dai pannelli, non si ricordano.** Le categorie sono tre, *Hosting*,
*Dominio* e *Gestionale*, più l'assistenza, i canoni e le licenze, e i due pannelli vogliono dire due cose
diverse per i soldi:

- **Ergonet: lo paga il cliente.** I servizi stanno fra i *Servizi delegati*: sono del cliente, che ne ha
  dato la gestione a Emanuele, e il rinnovo lo paga lui a Ergonet. ⚠️ **I piani Valore comprendono solo un
  dominio .it**, verificato sul sito di Ergonet il 24/09/2026: un sito col .it sta in una riga, *hosting e
  dominio*; un sito col .com ha anche la riga del dominio, a parte.
- **Hostinger: lo incassa Emanuele.** È il suo server, il piano Agency Startup che paga lui ogni anno e che
  scade il 26/01/2027. Sopra ci girano Tenuta Don Gaetano, la Masseria, Ciao Naples e il gestionale della
  Masseria: ogni rinnovo lì è un costo suo da rifatturare al cliente, e quindi un'entrata. I domini scadono
  per conto loro, non coi siti, e ognuno ha la sua riga.

La vista **Domini** di *Rinnovi*, chiesta da Emanuele lo stesso giorno, mette in fila tutti i domini per
scadenza, compresi quelli dentro un piano Ergonet, con cliente e a chi si pagano. Controllati tutti il
24/09/2026: mancavano Clharem, che scade il 03/10/2026, Michela Franzese e Sidel, i due .com di famiglia,
il gestionale della Masseria e i domini di Emanuele, e la data di Evolve era sbagliata di tre mesi. ⚠️ Le
scadenze di difendoalarm.com e sidelweb.com sono ancora *da controllare*: la sessione di Ergonet era
scaduta, e si leggono quando Emanuele rientra. Non ci sono, per scelta, la Sartoria, che è archiviata e il
cui hosting delegato lo toglie Emanuele, e growebstudios.com, un vecchio progetto che si lascia scadere.
Quello che il pannello dice, vince su quello che c'è scritto qui.

## Gestionali, collaboratori e procedure

**I gestionali in funzione hanno un database loro, *Gestionali***, sotto *Consegnato* accanto a *Siti
Clienti*, riempito il 24/09/2026: quello della Masseria, quello di Mamma Rosaria e l'app degli ordini del
Girarrosto. Di ognuno si tengono cliente, indirizzo, server, tecnologia e da quando è online; le scadenze
stanno in *Rinnovi*, collegate. Dell'app del Girarrosto non si sa con cosa è costruita né dove gira: il
vault non lo dice, e resta vuoto finché non lo dice Emanuele.

**Ogni mattina il briefing apre siti e gestionali**, col controllo in `code/controllo-siti/`, e li prende
da Notion: dal 25/09/2026 *Siti Clienti* ha il campo *Indirizzo*, riempito per gli otto siti vivi, e tutti e
due i database hanno la vista «Da controllare». L'indirizzo da aprire è quello del campo: il link dentro il
titolo, su alcuni siti, porta alla pagina di accesso nascosta di WordPress.

**Quattro agenti di Notion lavorano su questi database** dal 25/09/2026: *Lead nuovo*, *Dopo la riunione*,
*Referral e recensione* e *Aggiornamento del venerdì*. Preparano bozze e compilano campi, non mandano
niente a nessuno. Cosa fanno, quando partono e quanti crediti possono spendere sta in
`code/agenti-notion/README.md`.

**Chi lavora con Emanuele sta in *Collaboratori***, sotto *Offerta*: Karim, attivo; il video editor, ancora
da trovare, il cui costo decide il prezzo dei video per le campagne; e Giusy D'Amico, che gli passava siti da
costruire per conto suo e che resta senza stato finché Emanuele non decide cosa è la collaborazione.

**Le procedure e le checklist stanno anche in *Procedure***, sotto *Offerta*, dal 24/09/2026, chiesto da
Emanuele: il processo cliente, la checklist del sito, la vecchia checklist WordPress, l'onboarding, il brief
cliente, e le tre dei contenuti, cioè ordinare un evento, produzione contenuti e pubblicare un post. ⚠️ **Su
Notion sono copie.** La fonte resta il vault: ogni pagina lo dice in cima e nel campo *Nel vault*, e se le due
versioni non coincidono vale il file. Una procedura che cambia qui si ricopia lì nello stesso giro. Il processo
cliente e la checklist del sito sono collegati a Ragosta, il lavoro in corso.

⚠️ **Un nome di file scritto in un campo di Notion diventa un link.** `.md` è il dominio della Moldavia, e
`docs/onboarding.md` scritto così diventa un collegamento a un sito che non esiste. Il 24/09/2026 è successo
in *Procedure*, *Riunioni*, *Gestionali* e *Collaboratori*. I percorsi del vault, nei campi e nelle pagine, si
scrivono fra backtick, come codice.

## Il lavoro, passo per passo

- **La trattativa è la scheda del lavoro**, dal primo contatto al saldo. *Fase lavoro* dice dov'è —
  Proposta, Accordo e acconto, Onboarding, Sviluppo, Consegna, Chiuso — e *Prossimo passo* lo dice
  in una riga, riscritta ogni volta. Dentro la pagina c'è la checklist del processo compilata coi
  dati veri: date, importi, file. La vista *In lavorazione* mette i lavori in colonna per fase.
- **Una trattativa nuova parte dal modello `PROP_AAAA_NNN_Cliente`**, predefinito in tutte le viste
  dal 24/09/2026: la checklist del lavoro già dentro, *Fase trattativa* «In qualifica», e il titolo
  da riscrivere col codice vero. Il modello di prima non esisteva più, e la vista *Tutte* puntava a
  una pagina cancellata. ⚠️ Un modello creato dal browser con «Nuovo modello» si apre anche
  dall'API, e da lì si scrive il contenuto: quello vecchio invece l'API non lo vedeva.
- **Ogni fattura è una riga di *Fatture***, col codice `FATT_…` e il numero di Fiscozen, il tipo,
  l'importo, la scadenza, lo stato e il PDF, collegata al contatto e al lavoro.
- **I soldi che si muovono stanno in *Movimenti*** dal 24/09/2026: è il registro del personal brand,
  con acconti, saldi, regali e costi, collegati a fattura, lavoro e cliente. Quello dei brand di famiglia
  resta nel foglio che va a Raffaele, e qui non entra.
- **L'accordo sta sulla trattativa**, quello mandato e quello firmato, con la data della firma.
- **Anche le proforme stanno sulla trattativa**, nei campi *Proforma acconto* e *Proforma saldo*, dal
  24/09/2026. Non in *Fatture*: lì gli stessi soldi comparirebbero due volte fra quelli da incassare.
- **Il portale di un cliente nuovo parte dal modello**, *Modello — il portale del cliente*, sotto
  *Portali clienti*: si duplica, si rinomina «<Cliente> — il tuo sito», si sostituisce tutto quello fra
  « », si caricano i PDF, e il riquadro rosso si toglie prima di pubblicare, perché il link è pubblico.
- **I dati di fatturazione stanno sul contatto.**

| Cosa succede | Cosa si aggiorna |
|---|---|
| Il cliente dice sì | fase lavoro «Accordo e acconto», dati di fatturazione sul contatto, accordo dal modello |
| Parte la fattura dell'acconto | riga in *Fatture* col PDF e la scadenza, checklist, storico |
| Torna l'accordo firmato | file e data della firma sulla trattativa |
| Arriva l'acconto | fattura «Incassata», movimento in *Movimenti*, trattativa «Chiuso vinto» con fase lavoro Onboarding, contatto «Cliente attivo», portale dal benvenuto, e su TickTick il `[PROGETTO] Sito web <Cliente>` coi passi che restano |
| Consegna | sito «Online» coi suoi rinnovi in *Rinnovi*, fattura del saldo, fase lavoro Consegna |
| Parte una proforma | PDF sulla trattativa, in *Proforma acconto* o *Proforma saldo* |
| Una riunione registrata con Granola | riga in *Riunioni* col riassunto, i contatti e il lavoro |
| Arriva il saldo | fattura «Incassata», movimento in *Movimenti*, fase lavoro Chiuso, esito nello storico |

Emanuele dice cosa è successo; l'aggiornamento si mostra tutto insieme e si scrive con una conferma
sola.

## Le riunioni

**Dal 24/09/2026 ogni riunione registrata con Granola diventa una riga di *Riunioni***, sotto *Clienti*,
chiesto da Emanuele. Il titolo dice chi c'era e di cosa si è parlato; dentro c'è il riassunto di Granola
copiato com'è, che è anche l'unica cosa che Granola dà sul piano gratuito. *Con chi* collega i contatti,
*Lavoro* la trattativa, *Dove* dice se era di persona, al telefono o in video. *ID Granola* serve a non
importarla due volte: Granola a volte salva la stessa riunione due volte, e allora ci vanno tutti e due
gli id. *Nel vault* dice dov'è il file in `sources/call/` o `sources/riunioni/`, e *Cosa è uscito* e
*Cosa ne segue* riprendono i titoli del riassunto e i suoi prossimi passi.

Si tolgono le stesse cose che si tolgono nel vault, e solo quelle: le password e i nomi dei clienti di
altri, come gli iscritti di Evolve. Il 24/09/2026 sono entrate dieci riunioni, dal 9 al 23 settembre.

**Dal 25/09/2026 c'è anche la strada di Notion.** Una riunione registrata con la nota di riunione di
Notion, **dentro una pagina nuova di *Riunioni***, la compila da sola l'agente *Dopo la riunione* quando il
riassunto è pronto. Le due strade non si usano sulla stessa riunione. Se Notion funziona bene, Granola si
può lasciare: lo decide Emanuele dopo averla provata.

## Ordine e icone

Le icone le ha rifatte Emanuele il 24/09/2026 e non si toccano: una pagina nuova prende quella delle sue
sorelle. Nelle viste le colonne stanno sempre nello stesso ordine: nome, stato, fase, date, importi.

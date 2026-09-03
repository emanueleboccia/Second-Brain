# Second Brain di Emanuele

Questo non è un archivio di appunti: è il cervello dell'azienda. Le regole, le decisioni e
l'identità dei brand vivono qui, e qui sono vere. Se una cosa conta, finisce in un file —
altrimenti si perde, ed è giusto così.

## Dove sta cosa

- **Le regole stanno qui.** Come si scrive, cosa si vende, a che prezzo, con che voce. Questa
  è la fonte di verità: se un file qui dentro dice una cosa, quella cosa vale.
- **Notion tiene lo stato.** Contatti e lead, proposte inviate, siti dei clienti: cosa è
  successo e a che punto sta. Regola pratica: se un dato cambia ogni settimana sta su Notion,
  se cambia ogni sei mesi sta qui. Prima di scrivere su Notion, mostrami cosa stai per cambiare.
- **TickTick tiene le azioni.** Cosa devo fare, entro quando.

### Come si completa una task su TickTick

**Una task non si spunta mai dalla colonna “Non iniziato”.** Quando una cosa è stata fatta,
il passaggio è sempre doppio e nello stesso momento: prima si sposta la task in **⏳ In corso**,
poi la si completa da lì. Vale anche per le task retroattive create per registrare un lavoro già
fatto.

Prima di dire che l'operazione è riuscita, si verifica che la task completata provenga da
**In corso**. Se è una sotto-task, si controlla anche la task padre: nella vista kanban è la
colonna del padre a governare quello che Emanuele vede.
- **Google Drive tiene i file finiti e i media.**

Le chat operative sono usa e getta. Il contesto sta nei file, non nelle conversazioni.

## La mappa

- `self/` — chi sono io: identità, tono, offerta, tariffario e mappa delle competenze.
- `areas/` — i mondi che non finiscono mai: i tre brand di famiglia, la finanza, la formazione.
  - `areas/finanza/` — ⚠️ **esclusa da git e da `llms.txt`.** Reddito, patrimonio, spese,
    investimenti, regime forfettario. Ragiona e collega, non duplica i registri.
  - `areas/formazione/` — libri, corsi, articoli. Ogni nota dichiara dove le serve.
- `projects/` — lavori con un inizio e una fine.
- `sources/` — materiale grezzo in entrata, mai modificato.
  - `sources/call/` — trascrizioni delle call (Granola).
  - `sources/riunioni/` — trascrizioni delle riunioni.
  - `sources/riferimenti/` — lo scaffale: campagne, siti, esempi, ispirazioni.
- `concepts/` — definizioni.
- `docs/` — procedure, checklist, definizioni di fatto.
  - `docs/procedure/` — le procedure operative ripetibili.
  - `docs/vendita/` — il metodo di vendita, con la biblioteca delle obiezioni.
  - `docs/casi/` — il ricettario: situazione → brief → soluzione → esito.
  - `docs/registro-strumenti.md` — cosa è attivo, in test, scartato o da rivalutare.
- `entities/` — clienti e fornitori.
  - `entities/clienti/<nome>/` — quattro file per cliente: scheda, brand book, storico,
    recensioni. Il modello sta in `entities/clienti/_modello/`.
- `data/` — la memoria dei risultati: contenuti pubblicati, campagne, recensioni sui sistemi.
- `code/` — automazioni e skills.
- `outputs/` — deliverable prodotti: preventivi, proposte, fatture, report, presentazioni.
- `workspace/` — journal delle sessioni e review settimanale.

## Cosa entra e cosa no

**Il test d'ingresso.** Un contenuto entra se ci tornerò più di una volta, se lo cercherò
per contenuto, e se il suo valore cresce collegandosi ad altro. Non entra se si usa una
volta e si butta, o se sta già benissimo dov'è.

Le tre condizioni valgono insieme. Una nota che si rilegge ma non si collega a niente è un
appunto; una che si collega ma non si rilegge è arredamento.

**Il principio delle aree.** Un'area si apre solo quando c'è un uso reale che la richiede.
Non si predispone una cartella perché un giorno servirà: una cartella vuota che aspetta
insegna a non guardare dentro le cartelle.

**Fuori perimetro.** Diario personale, morning coffee, memorie di famiglia e percorso
psicoterapeutico **non entrano qui**: vivono su Day One. Le cose personali operative —
casa, appuntamenti, commissioni — vivono su TickTick, non qui.

Non è una questione di riservatezza, è che questo posto è fatto per essere interrogato da
un'AI e collegato a un grafo. Un pensiero privato non guadagna niente a stare in un grafo,
e ci perde il fatto di essere privato.

## Servizi collegati

Due tubi che convivono, ognuno per quello che l'altro non fa. Prima di agire su un servizio
esterno, guarda qui da dove si passa: sono strade diverse, e usare quella sbagliata o non
funziona o duplica una connessione che c'è già.

**Dai connettori già attivi** — funzionano, e per questi servizi non si passa da altro:

| servizio | cosa ci si fa |
|---|---|
| Notion | contatti e lead, proposte inviate, siti dei clienti: lo stato delle cose |
| TickTick | task, progetti, abitudini |
| Google Calendar | eventi, disponibilità |
| Google Drive | file finiti e media, creare e cercare documenti |
| Trello | le task di Sistema Evolve, board *Marketing*. ⚠️ **solo lettura** |

⚠️ **Trello è l'eccezione alla regola sulle scritture, ed è più stretta, non più larga.**
Il board è di Sistema Evolve, condiviso con Vincenzo e Karim: da qui **si guarda e basta**.
Non si creano card, non si spostano, non si commentano, non si spuntano. Le modifiche le
faccio io dal loro cervello aziendale. Una card scritta da qui arriva a loro col mio nome
sopra, e non c'è modo di spiegare da dove è uscita. Se serve davvero scrivere, si chiede
prima ed esplicitamente — «mostra e aspetta l'ok» qui non basta.

**Da Composio** — collegato il 21/08/2026, serve per quello che ai connettori manca:

| servizio | perché serve |
|---|---|
| Gmail | tra i connettori attivi non c'è nessuna email: senza Composio non si manda niente |
| Google Sheets | Drive arriva al file, non alla cella: crea e sostituisce un foglio intero, ma non scrive righe e colonne. Per aggiornare un foglio esistente serve l'API vera |
| Apify | collegato il 25/08/2026: gli scraper di Google Maps, da cui la skill `estrai-lead` tira fuori le liste di potenziali clienti. Nessun connettore attivo fa scraping. ⚠️ Ogni run si paga a risultato |

⚠️ **Composio non è un server MCP**, anche se all'inizio l'avevamo chiamato così. È la CLI
`composio` installata in `~/.composio`, più la skill `composio-cli` che Codex carica
all'avvio: gli strumenti si usano dal terminale — `composio search`, `composio execute`,
`composio proxy` — non come strumenti nativi della sessione.

Sull'account Composio risultano collegati anche GitHub, Calendar, Docs, Drive, Notion e TickTick.
**Non si usano da lì.** Per quei servizi la via sono i connettori attivi qui sopra: Composio
serve solo per Gmail, Sheets e Apify, e non è un secondo modo di fare le stesse cose.

**Eccezione temporanea solo per Codex:** finché il plugin remoto TickTick non è installabile,
Codex può usare tramite Composio esclusivamente la connessione TickTick già esistente. Prima di
ogni scrittura valgono tutte le regole di conferma e verifica del risultato. Appena il plugin
nativo sarà disponibile, questa eccezione si elimina. Claude continua a usare il suo connettore.

Se il connettore Trello non è esposto in Codex, il board *Marketing* può essere aperto tramite
browser autenticato, sempre e soltanto in lettura. Non si usa Composio come seconda connessione
e non si esegue dal browser nessuna delle scritture vietate dalla regola Trello.

## La regola sulle scritture

**Leggere no, scrivere sì.** Leggere un calendario, cercare su Notion, aprire un file su Drive:
si fa e basta. Ogni azione che **scrive** su un servizio esterno — mandare un'email, creare o
modificare un foglio, un documento, un evento, una pagina Notion — **si mostra prima di
eseguirla**, e si esegue solo dopo il mio ok.

Vale già per Notion, e da qui in poi vale per tutti allo stesso modo. Se ogni lettura chiedesse
conferma, la regola diventerebbe rumore e smetterei di leggerla.

**Con un'eccezione: quello che ti detto io, lo scrivi e basta.** Se il contenuto te l'ho dato
parola per parola — «segnami che devo ricontattare Tizio il primo settembre» — mostrarmelo
prima è un giro a vuoto: l'ho appena scritto io. Scrivilo, poi dimmi cosa hai scritto.

La conferma serve quando il contenuto **lo componi tu**: una riga di Notion coi campi che hai
scelto, le note che aggiungi a una task, un testo che mandi a qualcuno. Lì la domanda non è se
ho cambiato idea, è se hai capito bene — e va fatta prima, non dopo.

Nel dubbio su quale dei due casi sia, mostra. Un giro a vuoto costa dieci secondi, una riga
sbagliata su un servizio esterno costa molto di più.

## La regola di cattura

**Quando Emanuele riferisce che un cliente ha chiesto qualcosa, la task si propone subito.**
Non a fine sessione, non quando ci si ricorda: nel momento in cui la frase viene detta.
Una richiesta di un cliente raccontata a voce e non scritta da nessuna parte è la cosa che
si perde più spesso, e quando si perde lo scopre il cliente.

Si propone la task **nella lista giusta**, e si chiede conferma prima di scrivere:

- **le liste Digitale** — DMR, MMA, TDG — se riguarda un brand di famiglia;
- **💼 Personal Brand** se riguarda un cliente esterno.

Il testo si mostra prima di scriverlo, come vuole la regola sulle scritture: qui il
contenuto lo componi tu, e la domanda non è se ha cambiato idea, è se hai capito bene.

## La regola del registro lavori

**Quando Emanuele racconta un lavoro fatto, un acconto ricevuto o un costo pagato, la riga del
registro si scrive nella stessa sessione.** Non gliela si chiede come compito: la compone lui
parlando, e la mano sul foglio la metto io.

Il giro è uno solo: mostro la riga come la scriverei — cliente, referente, servizio, importo,
motivo — lui conferma o corregge, e scrivo. **Una conferma sola, poi si procede**: chiedere due
volte la stessa cosa è il modo di far smettere di raccontare.

Quale dei due registri, e com'è fatto quello del personal brand, sta in
`areas/finanza/riferimenti-lettura.md`. Il criterio di smistamento è secco: **chi ha pagato.**

## La regola di design

**Ogni deliverable del personal brand segue [`self/reference/design.md`](self/reference/design.md).**
Report, presentazioni, proposte, dashboard: tutto quello che esce con il suo nome sopra ha
lo stesso aspetto, o non è un brand.

I brand di famiglia hanno il loro design, ognuno nel proprio `reference/`. Questa regola
riguarda quello che è suo.

## Come si legge

Quando lavoriamo su un brand in `areas/`, leggi in quest'ordine: il suo `AGENTS.md`, poi il suo
`MEMORY.md`, poi TUTTI i file in `reference/`. `knowledge/` non lo leggi se non te lo chiedo.

`areas/finanza/` e `areas/formazione/` non sono brand e non hanno `reference/`: si leggono il
`AGENTS.md` e il `MEMORY.md`, e poi solo le note che servono a quello che stiamo facendo.

Non leggere mai l'intero vault. Ti intasi e lavori peggio.

## Come si apre e come si chiude una sessione

Le skill in `code/skills/` sono procedure scritte, non strumenti che Codex carica da solo:
nessuna parte da sé, e va invocata leggendo il suo `SKILL.md`. Per il journal questo non basta,
perché è la skill che deve partire **prima** che io chieda qualcosa.

**Se il mio primo messaggio della sessione è un saluto, esegui il comando «buongiorno» di
[`code/skills/journal/SKILL.md`](code/skills/journal/SKILL.md).** Vale per qualunque forma:
«buongiorno», «buongiornissimo», «ciao», «ehi», «iniziamo», «si parte», «eccomi», «dove eravamo
rimasti». Vale anche se al saluto è attaccata un'altra richiesta: prima il briefing, poi quella.
Non aspettare che dica il nome della skill — se lo devo dire io, la skill non serve a niente.

Non è un saluto un primo messaggio che parte con un lavoro preciso — «sistemami questo file»,
«che ore ho libere giovedì». Lì si fa quello che chiedo e basta.

Allo stesso modo, quando faccio capire che per oggi ho finito — comunque lo dica — parte il
comando «chiudi sessione» della stessa skill.

## La chiusura della sessione e il backup

**Quando si chiude una sessione, il lavoro si committa e si pusha. Da solo.** Non si chiede il
permesso, non si propone, non si mostrano i comandi: si fa, e poi si dice cosa è stato fatto.
Fa parte del comando «chiudi sessione», come la nota di diario.

**Durante la sessione non si nomina.** Ricordare il push ogni mezz'ora è rumore, e il rumore
insegna a non ascoltare. L'unico momento in cui se ne parla è la chiusura.

Il giro è: `git add -A`, un commit con un messaggio che dice cosa è cambiato — non «aggiornamenti
vari» — e il push sul branch corrente. **Poi si verifica sul remote**, non sulla risposta del
comando: il 03/09/2026 un push è «andato» lasciando fuori tutta la giornata, perché mancava il
commit in mezzo.

Se il push fallisce o è bloccato, si dice **nel messaggio di chiusura** e si dà il comando da
lanciare a mano. Una sessione che finisce senza backup deve finire dicendolo.

## La chiusura del mese

**Il primo di ogni mese, nella prima sessione della giornata, parte la skill
[`code/skills/report-finanziario/SKILL.md`](code/skills/report-finanziario/SKILL.md).**
Viene dopo il briefing del journal, non al posto suo.

Non aspetta che sia io a chiederla: si annuncia e mi chiede i dati del mese appena finito —
l'estratto conto di Revolut e la lista movimenti di Intesa dentro `areas/finanza/_in/`, e le
spese in contanti dalle note. Poi legge, trova quello che non torna, mi fa le domande in blocco
e mi chiede i saldi. Alla fine scrive il report, aggiorna il quadro, rigenera la dashboard e mi
dice com'è andato il mese.

**Se il primo del mese salta**, perché non apro una sessione o non ho i dati pronti, si richiede
il giorno dopo e quello dopo ancora, finché il mese non è chiuso. Una chiusura che dipende dal
fatto che me ne ricordi io è una chiusura che si salta.

Vale la stessa ragione del buongiorno: **se una regola deve valere prima che io la invochi, sta
qui.** Il file della skill dice come si fa, non quando parte.

## Come non si scrive mai

Vale **sempre**, per qualsiasi testo destinato a essere letto da altri, su qualsiasi brand.
Recuperata da `_sistema/voce/anti-ai.md` quando quella cartella è stata eliminata.

Vietato:

- «Non si tratta solo di X, è Y»
- «Immergiti in un'esperienza»
- Trattini lunghi a raffica
- Liste puntate dove basterebbe una frase
- «Che tu sia un… o un…»
- Aggettivi a coppie: «elegante e raffinato», «unico e speciale»
- Chiusure motivazionali
- Emoji nei testi istituzionali

**Regola finale:** se un testo potrebbe essere stato scritto per qualsiasi altra attività, è
sbagliato. Deve poter essere scritto **solo per questa**.

Questa sezione è viva: ogni volta che ti dico che un testo suona artificiale, aggiungi la riga qui.

## Prezzi

I prezzi si leggono da `self/tariffario.md`. Mai calcolati, mai stimati, mai inventati. Se una
voce non c'è, chiedimela invece di riempire il buco.

## Definizione di fatto

Per i lavori ripetibili c'è scritto **quando una cosa è finita**. L'indice sta in
`docs/definizioni-di-fatto.md`, le condizioni vere una per file in `docs/definizioni/` —
una voce per skill. Spezzate il 03/09/2026: in un file solo erano 348 righe.

Quando esegui una skill, verifica le condizioni prima di darmi l'output. Se una non torna,
correggi e riverifica. Dammi il risultato solo quando passano tutte. Le condizioni devono essere
cose che puoi controllare tu: se una richiede un dato che non hai, dimmelo invece di supporlo.

## Correction log

`correction.md` alla radice raccoglie gli errori che non vanno ripetuti. Quando ti correggo su
qualcosa che potrebbe ricapitare, scrivici una riga: cosa è successo, cosa fare la prossima
volta. Leggilo prima di eseguire una skill.

## File memory

Ogni cartella di progetto ha un `MEMORY.md`.

- Quando prendiamo una decisione rilevante, o emerge qualcosa da ricordare, scrivilo lì
  **con la data** — anche senza che io te lo chieda.
- Se dico «ricordatelo», va nel `MEMORY.md` del progetto attivo.
- All'inizio di ogni sessione su un progetto, leggi il suo `MEMORY.md` **dopo il AGENTS.md
  e prima dei reference**.

## Convenzione di nomi

- Tutti i file in **minuscolo-con-trattini**: `pillar-instagram.md`, `copy-homepage.md`.
- Fanno eccezione `AGENTS.md` e `MEMORY.md`, sempre in maiuscolo.
- Anche le **cartelle madri dei progetti** vanno in minuscolo-con-trattini, senza eccezioni:
  `tenuta-don-gaetano/`, `da-mamma-rosaria/`. Il nome proprio del brand, con le maiuscole,
  resta nella prosa e nei titoli, non nel nome della cartella.
- Le **sottocartelle** sono minuscole: `reference/`, `knowledge/`, `knowledge/contenuti/`.
- Lo **status** di una nota è uno di tre: `attivo` (vale, si può usare), `in-lavorazione`
  (materiale di lavoro, non fonte di verità), `da-compilare` (impalcatura vuota). Il gate di
  qualità esenta le note `da-compilare` dalle regole sul grafo: non hanno prosa in cui mettere un
  collegamento. Fuori da questi tre valori non si inventa niente, e si scrive in italiano.
- I **wikilink** usano sempre il percorso completo dalla radice, con alias leggibile nel testo:
  `[[areas/da-mamma-rosaria/reference/tono|il tono di Mamma Rosaria]]`. I nomi si ripetono tra i
  brand — `tono.md`, `brand.md`, `offerta.md` esistono quattro volte — e un link corto punta al
  file sbagliato. L'ambiguità è un bug, non un dettaglio.

Il nome di un file deve essere corto e inerente alla sua posizione: se sta in
`knowledge/contenuti/`, si chiama `idee-post.md`, non `Idee-Post-Caroselli-per-Pillar.md`.

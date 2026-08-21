# Company Brain di Emanuele

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
- **Google Drive tiene i file finiti e i media.**

Le chat operative sono usa e getta. Il contesto sta nei file, non nelle conversazioni.

## La mappa

- `self/` — chi sono io: identità, tono, offerta, tariffario del mio lavoro.
- `areas/` — i tre brand di famiglia, ognuno con la sua sottocartella completa.
- `projects/` — lavori con un inizio e una fine.
- `sources/` — materiale grezzo in entrata, ancora da elaborare.
- `concepts/` — definizioni.
- `docs/` — procedure, checklist, definizioni di fatto.
- `entities/` — clienti e fornitori.
- `data/` — numeri e KPI.
- `code/` — automazioni e skills.
- `outputs/` — deliverable prodotti.
- `workspace/` — journal delle sessioni.

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

**Da Composio** — collegato il 21/08/2026, serve per quello che ai connettori manca:

| servizio | perché serve |
|---|---|
| Gmail | tra i connettori attivi non c'è nessuna email: senza Composio non si manda niente |
| Google Sheets | Drive arriva al file, non alla cella: crea e sostituisce un foglio intero, ma non scrive righe e colonne. Per aggiornare un foglio esistente serve l'API vera |

⚠️ **Composio non è un server MCP**, anche se all'inizio l'avevamo chiamato così. È la CLI
`composio` installata in `~/.composio`, più la skill `composio-cli` che Claude Code carica
all'avvio: gli strumenti si usano dal terminale — `composio search`, `composio execute`,
`composio proxy` — non come strumenti nativi della sessione.

Sull'account Composio risultano collegati anche GitHub, Calendar, Docs, Drive, Notion e TickTick.
**Non si usano da lì.** Per quei servizi la via sono i connettori attivi qui sopra: Composio
serve solo per Gmail e Sheets, e non è un secondo modo di fare le stesse cose.

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

## Come si legge

Quando lavoriamo su un brand in `areas/`, leggi in quest'ordine: il suo `CLAUDE.md`, poi il suo
`MEMORY.md`, poi TUTTI i file in `reference/`. `knowledge/` non lo leggi se non te lo chiedo.

Non leggere mai l'intero vault. Ti intasi e lavori peggio.

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

Per i lavori ripetibili, in `docs/definizioni-di-fatto.md` c'è scritto quando una cosa è finita.

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
- All'inizio di ogni sessione su un progetto, leggi il suo `MEMORY.md` **dopo il CLAUDE.md
  e prima dei reference**.

## Convenzione di nomi

- Tutti i file in **minuscolo-con-trattini**: `pillar-instagram.md`, `copy-homepage.md`.
- Fanno eccezione `CLAUDE.md` e `MEMORY.md`, sempre in maiuscolo.
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

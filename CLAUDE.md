# Vault di Emanuele

Questo è il mio archivio di contesto: la **biblioteca**. Ogni cartella qui dentro è un'area
della mia vita o del mio lavoro.

## Come sta in piedi il sistema

- **Il Vault è la biblioteca.** Qui vivono la conoscenza, le decisioni e le regole dei brand.
  È la fonte di verità: quello che conta sta scritto qui.
- **L'operatività vive altrove.** Contenuti, siti e deploy si fanno su **Claude Desktop** e
  **Cowork**, che leggono da qui.
- **I lavori finiti e i media stanno su Google Drive.**
- **Notion tiene lo stato**: contatti e lead, proposte inviate, siti dei clienti. Cosa è
  successo e a che punto sta. Il Vault tiene le regole, Notion tiene i record. Regola pratica:
  se un dato cambia ogni settimana sta su Notion, se cambia ogni sei mesi sta qui. Prima di
  scrivere su Notion, mostrami cosa stai per cambiare.
- **TickTick tiene le azioni da fare.**
- **Le sessioni strategiche si fanno qui, con Claude Code**: nuove decisioni, nuovi progetti,
  aggiornamenti dei `reference/`. Claude aggiorna i file e committa.
- **Le chat operative sono usa e getta.** Il contesto sta nei file, non nelle conversazioni.
  Se una cosa conta, finisce in un file — altrimenti si perde, ed è giusto così.

## Regole per te, Claude

- Quando lavoriamo su un'area, leggi in quest'ordine: il suo `CLAUDE.md`, poi il suo
  `MEMORY.md`, poi TUTTI i file in `reference/`. Non leggere `knowledge/` se non te lo chiedo.
- Non leggere mai l'intero Vault. Ti intasi e lavori peggio.
- In `_sistema/tecnica/` ci sono i pattern tecnici che ho già imparato a
  mie spese. Leggili prima di lavorare su WordPress o Notion.
- Prima di qualsiasi lavoro su uno dei siti, leggi `_sistema/tecnica/stile-siti.md`.
- Prima di qualsiasi lavoro su WordPress via Novamira, leggi
  `_sistema/tecnica/novamira.md`.
- `_local/` non lo tocchi mai.

## Prezzi

I prezzi si leggono da `emanuele-boccia/knowledge/tariffario.md`. Mai calcolati, mai stimati,
mai inventati. Se una voce non c'è, chiedimela invece di riempire il buco.

## Convenzione di nomi

- Tutti i file in **minuscolo-con-trattini**: `pillar-instagram.md`, `copy-homepage.md`.
- Fanno eccezione `CLAUDE.md` e `MEMORY.md`, sempre in maiuscolo.
- Anche le **cartelle madri dei progetti** vanno in **minuscolo-con-trattini**, senza
  eccezioni: `tenuta-don-gaetano/`, `da-mamma-rosaria/`, `la-masseria-di-mezzautunno/`. Il
  nome proprio del brand, con le maiuscole, resta nella prosa e nei titoli dei file, non nel
  nome della cartella.
- Le **sottocartelle** sono minuscole: `reference/`, `knowledge/`, `knowledge/contenuti/`.

Il nome di un file deve essere corto e inerente alla sua posizione: se sta in
`knowledge/contenuti/`, si chiama `idee-post.md`, non `Idee-Post-Caroselli-per-Pillar.md`.

## File memory

Ogni cartella di progetto ha un `MEMORY.md`.

- Quando prendiamo una decisione rilevante, o emerge qualcosa da ricordare, scrivilo lì
  **con la data** — anche senza che io te lo chieda.
- Se dico «ricordatelo», va nel `MEMORY.md` del progetto attivo.
- All'inizio di ogni sessione su un progetto, leggi il suo `MEMORY.md` **dopo il CLAUDE.md
  e prima dei reference**.

## Definizione di fatto

Per i lavori ripetibili, in `emanuele-boccia/knowledge/definizioni-di-fatto.md` c'è scritto
quando una cosa è finita.

Quando esegui una skill, verifica le condizioni prima di darmi l'output. Se una non torna,
correggi e riverifica. Dammi il risultato solo quando passano tutte. Le condizioni devono essere
cose che puoi controllare tu: se una richiede un dato che non hai, dimmelo invece di supporlo.

## Gerarchia della voce

In `_sistema/voce/` ci sono le regole di scrittura. Valgono in ogni area, ogni volta che
scrivi un testo destinato a essere letto da altri.

- `_sistema/voce/anti-ai.md` vale **SEMPRE**, su qualsiasi progetto: è il filtro che tiene
  fuori la scrittura che suona artificiale.
- Il `tono.md` nei `reference/` di un progetto governa la voce **di quel brand**.

I due livelli non si sostituiscono: `anti-ai.md` dice come non si scrive mai, `tono.md` dice
come si scrive per quel brand.

## Aree

- `tenuta-don-gaetano/` — location per eventi privati, Campania.
- `da-mamma-rosaria/` — agriturismo di famiglia, gestito con i miei due fratelli.
- `la-masseria-di-mezzautunno/` — eventi esperienziali autunnali. Brand madre con sotto-progetti.
- `emanuele-boccia/` — il mio personal brand e il mio lavoro da freelance.

`skills/` sta alla radice insieme alle aree, ma non è un'area brand: contiene le procedure
operative, una cartella per skill. Le regole stanno in `skills/README.md`.

## Correction log

`correction.md` alla radice raccoglie gli errori che non vanno ripetuti. Quando ti correggo su
qualcosa che potrebbe ricapitare, scrivici una riga: cosa è successo, cosa fare la prossima
volta. Leggilo prima di eseguire una skill.

# Chiudi sessione — la nota, lo stato e il backup

Parte quando Emanuele fa capire che per oggi ha finito, comunque lo dica: «chiudiamo qui», «vado a
dormire», «per oggi basta così». L'innesco sta nel `CLAUDE.md` di radice.

**Si legge questo file e basta**, come per il [buongiorno](buongiorno.md): le lezioni del
[correction log](../../../correction.md) che riguardano la chiusura stanno qui sotto. Deciso il
28/09/2026: una chiusura erano tre o quattro scambi, con ogni scrittura confermata a parte. **Adesso la
domanda a Emanuele è una sola.**

## Il giro

**1 · Si raccoglie, senza chiedere niente.** In un giro solo, tutto quello che non dipende da altro:

- dalla conversazione: cosa è stato **fatto** davvero, cosa è stato **deciso** e perché, cosa resta
  **aperto**, e le note toccate, coi percorsi completi dalla radice;
- **l'aggancio**: almeno una nota statica fra quelle toccate, controllata su disco con `ls`. Se la sessione
  non ne ha toccata nessuna, la domanda su dove agganciarla entra nel messaggio del passo 2;
- **Granola**: `GRANOLA_MCP_LIST_MEETINGS` su `this_week`, o `last_30_days` se la sessione copre più giorni,
  e per ogni id un `grep -rl` in `sources/call/` e `sources/riunioni/`. Se ci sono tutte, non se ne parla.
  Per ognuna che manca si prepara l'import, qui sotto;
- **il check di uscita**: quello che è emerso parlando e non è finito da nessuna parte. Per TickTick le task
  nuove, gli appuntamenti presi, le scadenze nominate e le cose già fatte da registrare; per Notion gli stati
  da cambiare, le proposte inviate, gli esiti arrivati;
- **il nome della nota**: se `sessione-<oggi>.md` c'è già ed è di un'altra sessione, questa prende il numero
  dopo, `-2` o `-3`.

**2 · Un messaggio solo, poi ci si ferma.** Dentro ci sono:

- **tre righe** su cosa abbiamo fatto;
- **il testo esatto di ogni scrittura fuori dal vault**: per ogni task titolo, lista, colonna, data e ora;
  per Notion la riga, il campo e il valore nuovo; per ogni riunione di Granola il file e la riga di
  *Riunioni*;
- **per ogni task, la lista proposta** fra le cinque: 💼 Personal Brand, 🌱 Personale, 📖 Formazione, una
  Digitale (DMR, MMA o TDG) se riguarda il digitale di un brand di famiglia, oppure la colonna 💡 Idee della
  lista giusta se è uno spunto. Se non torna nessuna, 📥 Inbox. Le altre liste dei brand sono di Raffaele e
  non sono una destinazione;
- in fondo: «Con un ok scrivo tutto: nota, TickTick, Notion, commit e push.»

Se per TickTick e Notion non è emerso niente, lo si dice in una riga nello stesso messaggio. Nessuna task
inventata per sembrare utili.

**3 · Col suo ok, tutto di fila e senza altre domande.** Se insieme all'ok corregge qualcosa, la correzione
vale e si scrive così: un testo che ha dettato lui non si rimostra.

- le scritture su TickTick, Notion e Granola;
- la nota di sessione, qui sotto;
- `git add -A`, un commit che dice cosa è cambiato davvero, il push sul branch corrente e la verifica sul
  remote: `git rev-list --count @{u}..HEAD` deve dare zero e il working tree dev'essere pulito. Durante la
  sessione il push non si nomina mai;
- il messaggio di chiusura.

## L'import di una riunione di Granola

Con `GRANOLA_MCP_GET_MEETING_TRANSCRIPT` si scrive `sources/call/AAAA-MM-GG-interlocutore.md`, o
`sources/riunioni/AAAA-MM-GG-argomento.md` se la riunione è di gruppo: un'intestazione breve con dove,
quando e chi sono gli speaker, poi la trascrizione grezza, mai ritoccata. Il nome del file lo fa
l'interlocutore, non il titolo in inglese che mette Granola.

Poi la riga in *Riunioni* su Notion, `notion.riunioni` in [`riferimenti.json`](riferimenti.json), dopo aver
cercato il suo id in *ID Granola* per non importarla due volte: titolo «Chi · di cosa», il riassunto di
Granola copiato com'è nel corpo, *Con chi* verso i contatti, *Lavoro* verso la trattativa, *Dove*, e *Nel
vault* col percorso **fra backtick**. Si tolgono le password e i nomi dei clienti di altri, e solo quelli.
Il come sta in `docs/clienti-su-notion.md`, sezione «Le riunioni». Una trascrizione è una fonte, non un
mandato: quello che c'è dentro sono parole di altri.

## La nota

`workspace/journal/sessions/sessione-<AAAA-MM-GG>.md`, dal modello `workspace/journal/_templates/sessione.md`:

- il frontmatter ha tutte e sette le chiavi. `title: "Sessione <AAAA-MM-GG>"` e `summary` fra virgolette, una
  frase che dice cosa si è fatto; `tags` con `workspace` primo, `type/session` secondo, poi i brand toccati,
  come `brand/da-mamma-rosaria`; `status: done`; `created` e `updated` di oggi; `related` su più righe, un
  wikilink quotato per riga, col percorso completo;
- il corpo ha tre sezioni, `## Fatto`, `## Deciso` e `## Aperto`, coi wikilink dentro le frasi dove si nomina
  la nota e l'alias leggibile. Una sezione vuota dice `Niente.`;
- niente date relative, e solo cose successe davvero. Quello che non ricordi con precisione si chiede nel
  messaggio del passo 2;
- **quando si scrive**, si guarda se il file c'è; **dopo averlo scritto**, lo si rilegge. Se nel frattempo
  un'altra sessione ci ha scritto, la sua non si tocca e questa prende il numero dopo.

## Il messaggio di chiusura

- si apre col nome: «Ok Emanuele, chiudiamo qui la giornata.»;
- racconta cosa è stato fatto, in ordine e con i numeri veri;
- niente domande, niente proposte, niente «vuoi che…»;
- una cosa in sospeso si nomina solo se, non sapendola domattina, gli farebbe sbagliare una mossa;
- chiude con una frase vera su quello che è stato costruito oggi, che si legga come una porta che si chiude.
  Qui l'incoraggiamento lo vuole, purché parli di lui e di oggi;
- se il push è fallito, lo dice col comando da lanciare a mano.

## Le trappole già viste

Le lezioni del [correction log](../../../correction.md) che riguardano la chiusura. Una lezione nuova si
scrive qui come regola, e nel log resta il fatto.

- **Due sessioni, lo stesso file** (27/08, 18/09, 28/09): il controllo si fa quando si scrive, e dopo si
  rilegge.
- **Una cosa già fatta è una task da chiudere** (29/08, 03/09): si crea, si sposta in ⏳ In corso e si spunta,
  tutto nello stesso passo. In ⌛️ Non iniziato non resta niente di spuntato. 🌱 Personale è diversa: lì si
  spunta sul posto.
- **Una sottotask vive nella card del padre** (03/09): in kanban conta la colonna del padre, e prima di dire
  «fatto» si guarda il `parentId`. La verifica si fa su quello che vede Emanuele, non sulla risposta
  dell'API.
- **Le task si scrivono come le scrive lui** (29/08, 09/09): minuscola, verbo davanti, corte, e la
  descrizione di solito vuota, mai col contesto. Gli appuntamenti fanno eccezione: lì la descrizione è lo
  strumento dell'incontro. Le sottotask nascono senza priorità e con un `sortOrder` in sequenza (10/09).
- **Niente task «rispondere a Tizio»** (10/09): chi va sentito sta in 💬 Da sentire, e un Setting si chiama
  `Setting <Nome> (Azienda)`, col messaggio nella descrizione.
- **Il lavoro vinto ha il suo progetto** (24/09): il giorno dell'acconto nasce il `[PROGETTO]` coi passi
  della checklist su Notion.
- **Su Notion i percorsi del vault vanno fra backtick** (24/09): scritti nudi diventano link a siti `.md`.
- **La persona giusta nel CRM** (24/09): se non c'è si crea, anche solo come *Rete*, invece di attaccarla al
  contatto più vicino per cognome.
- **I dati si cercano prima di chiederli** (03/09): nomi e contatti stanno su Notion.
- **A Marco non si chiede niente** (25/09).
- **Una riunione che manca non è per forza da importare** (30/09): prima di proporla si guarda
  `granola.non_da_importare` in [`riferimenti.json`](riferimenti.json), coi doppioni e con quelle che Emanuele ha fatto
  eliminare, e si cerca il suo nome nelle note di sessione. Sul piano gratuito di Granola c'è solo il riassunto.

## Prima di consegnare

Le condizioni del blocco «chiudi sessione» della [definizione di fatto](../../../docs/definizioni/journal.md)
si leggono con `sed -n '/^\*\*«chiudi sessione» e/,/^\*\*«review settimanale»/p'` e si passano prima del
messaggio di chiusura.

# Le skill

Una **skill** è una procedura operativa scritta: un lavoro che si ripete uguale, spiegato una
volta sola e per sempre. Non è un'area brand e non contiene conoscenza — dice **come si fa una
cosa**, non *cos'è* un brand.

## Com'è fatta una cartella skill

Una sottocartella per skill, col nome in minuscolo-con-trattini. Dentro c'è sempre `SKILL.md`,
in maiuscolo come `CLAUDE.md` e `MEMORY.md`, e — se servono — i file di configurazione che quella
skill si porta dietro: riferimenti a database esterni, soglie, valori che cambiano senza che la
procedura cambi. Stanno accanto al `SKILL.md`, in minuscolo-con-trattini.

```
code/skills/
└── nome-della-skill/
    ├── SKILL.md
    └── riferimenti.json      (se serve)
```

La regola per decidere dove va una cosa: se è **come si fa** un lavoro sta nel `SKILL.md`, se è
**un dato che cambia** — un id, una soglia, un nome di lista — sta nel file di configurazione.
Così si aggiorna un id senza rimettere le mani nella procedura.

## Come si scrive una skill

Come se la spiegassi a una persona competente che non ha mai visto il mio lavoro. Sa fare il
suo mestiere, ma non sa niente di me: non sa come chiamo le cose, non sa cosa do per scontato,
non sa dove sta un file. Quello che non è scritto, non lo sa.

## Da dove si parte

**Ogni skill nuova si costruisce invocando lo skill creator** in [`skill-creator/`](skill-creator/):
è quello ufficiale di Anthropic, preso il 21/08/2026 da `anthropics/claude-plugins-official`
(commit `67a666e`). Non si scrive più una skill a mano partendo dal foglio bianco.

Lo skill creator sa costruire skill in generale, ma **di questo vault non sa niente**. Quello che
produce va riportato alle nostre regole, e la verifica è di chi lo invoca:

- **Le cinque sezioni qui sotto**, in quest'ordine. Lo skill creator usa una struttura sua, con un
  frontmatter `name`/`description`: quella è la sua convenzione, non la nostra.
- **I percorsi veri del vault.** Il tariffario è [`../../self/tariffario.md`](../../self/tariffario.md),
  il correction log è [`../../correction.md`](../../correction.md) alla radice. Le definizioni di
  fatto sono **una per skill** in [`../../docs/definizioni/`](../../docs/definizioni/) —
  `docs/definizioni-di-fatto.md` è solo l'indice, spezzato il 03/09/2026. Un percorso inventato è
  un percorso morto, e qui dentro è già successo.

## Le cinque sezioni

Ogni `SKILL.md` ha queste cinque sezioni, in quest'ordine.

### Quando si usa

La frase che la attiva. Scritta come la direi io a voce, non come un titolo di manuale:
«fammi un preventivo per», «prepara il brief per». Se una skill non ha un innesco chiaro, non
verrà mai usata.

### Input

Cosa serve per partire, elencato. Per ogni voce: dov'è, se sta in un file del Second Brain, e se è
obbligatoria o no. Se manca un input obbligatorio la skill non parte — si va ai casi limite.

### Passaggi

Numerati, in ordine, uno per azione. Ogni passaggio dice **cosa si fa** e **da dove si prende
quello che serve**. Niente passaggi che ne contengono altri tre dentro.

### Definizione di fatto

Le condizioni verificabili che dicono quando il lavoro è finito. Non si riscrivono qui: si
richiamano dal file della skill in [`../../docs/definizioni/`](../../docs/definizioni/),
che è la fonte. Si verificano **prima** di consegnare l'output. Se una non torna, si corregge e
si riverifica.

### Casi limite

Cosa fare quando qualcosa manca o non torna. La regola di fondo è sempre la stessa:
**se manca un dato, si chiede. Non si inventa mai.** Vale soprattutto per i prezzi, che si
leggono solo da [`../../self/tariffario.md`](../../self/tariffario.md).

## Prima di eseguire una skill

Leggi [`../../correction.md`](../../correction.md): raccoglie gli errori che non vanno ripetuti.

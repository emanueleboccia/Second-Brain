# Le skill

Una **skill** è una procedura operativa scritta: un lavoro che si ripete uguale, spiegato una
volta sola e per sempre. Non è un'area brand e non contiene conoscenza — dice **come si fa una
cosa**, non *cos'è* un brand.

## Com'è fatta una cartella skill

Una sottocartella per skill, col nome in minuscolo-con-trattini. Dentro, un solo file:
`SKILL.md`, in maiuscolo come `CLAUDE.md` e `MEMORY.md`.

```
skills/
└── nome-della-skill/
    └── SKILL.md
```

## Come si scrive una skill

Come se la spiegassi a una persona competente che non ha mai visto il mio lavoro. Sa fare il
suo mestiere, ma non sa niente di me: non sa come chiamo le cose, non sa cosa do per scontato,
non sa dove sta un file. Quello che non è scritto, non lo sa.

## Le cinque sezioni

Ogni `SKILL.md` ha queste cinque sezioni, in quest'ordine.

### Quando si usa

La frase che la attiva. Scritta come la direi io a voce, non come un titolo di manuale:
«fammi un preventivo per», «prepara il brief per». Se una skill non ha un innesco chiaro, non
verrà mai usata.

### Input

Cosa serve per partire, elencato. Per ogni voce: dov'è, se sta in un file del Vault, e se è
obbligatoria o no. Se manca un input obbligatorio la skill non parte — si va ai casi limite.

### Passaggi

Numerati, in ordine, uno per azione. Ogni passaggio dice **cosa si fa** e **da dove si prende
quello che serve**. Niente passaggi che ne contengono altri tre dentro.

### Definizione di fatto

Le condizioni verificabili che dicono quando il lavoro è finito. Non si riscrivono qui: si
richiamano da [`../../emanuele-boccia/knowledge/definizioni-di-fatto.md`](../../emanuele-boccia/knowledge/definizioni-di-fatto.md),
che è la fonte. Si verificano **prima** di consegnare l'output. Se una non torna, si corregge e
si riverifica.

### Casi limite

Cosa fare quando qualcosa manca o non torna. La regola di fondo è sempre la stessa:
**se manca un dato, si chiede. Non si inventa mai.** Vale soprattutto per i prezzi, che si
leggono solo da [`../../emanuele-boccia/knowledge/tariffario.md`](../../emanuele-boccia/knowledge/tariffario.md).

## Prima di eseguire una skill

Leggi [`../correction.md`](../correction.md): raccoglie gli errori che non vanno ripetuti.

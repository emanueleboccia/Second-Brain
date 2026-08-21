---
title: "Definizioni di fatto"
summary: "Quando un lavoro ripetibile è finito: come si usano le condizioni, le voci Journal e Preventivo già scritte, e le tre ancora da compilare — sito, brief cliente, onboarding."
tags:
  - docs
  - processi
  - qualita
status: da-compilare
created: 2026-08-21
updated: 2026-08-21
related:
  - "[[code/skills/README]]"
  - "[[docs/checklist-sito]]"
  - "[[docs/brief-cliente]]"
  - "[[docs/onboarding]]"
  - "[[self/tariffario]]"
  - "[[code/skills/genera-preventivo/SKILL]]"
---

# Definizioni di fatto

Per ogni lavoro ripetibile, qui c'è scritto **quando è finito**. Non «quando sembra a posto»:
quando le condizioni scritte qui sotto tornano tutte.

Come si usa:

- Le condizioni si verificano **prima** di consegnare l'output, non dopo.
- Se una non torna, si corregge e si riverifica. Il risultato si dà solo quando passano tutte.
- Le condizioni devono essere cose che **Claude può controllare da solo**. Se una richiede un
  dato che non ha, lo chiede — non lo suppone.

Le skill in [[code/skills/README|code/skills]] richiamano queste definizioni: la sezione «Definizione di fatto» di uno
`SKILL.md` punta qui.

> Impalcatura creata il 21/08/2026. Le voci **Journal** e **Preventivo** sono scritte;
> **Sito**, **Brief cliente** e **Onboarding** sono da compilare.

## Journal

Valgono per i tre comandi della skill [[code/skills/journal/SKILL|journal]]. Si verificano
prima di consegnare: se una non torna, si corregge e si riverifica.

**«buongiorno» — il briefing di inizio sessione**

- Il briefing è di cinque righe, non sei.
- Ogni cosa nominata esiste davvero: la sessione citata è un file che è stato letto, le note
  citate sono in `llms.txt`.
- Non è stato scritto né modificato nessun file. Questo comando legge e basta.

**«chiudi sessione» e «fine giornata» — le note di diario**

- Il nome del file è esatto: `sessione-<YYYY-MM-DD>.md` oppure `<YYYY-MM-DD>.md`, con la data
  vera di oggi.
- Il frontmatter ha tutte e sette le chiavi: `title`, `summary`, `tags`, `status`, `created`,
  `updated`, `related`.
- `created` e `updated` sono in formato `YYYY-MM-DD`. Nessuna data relativa da nessuna parte del
  file: non «ieri», non «la settimana scorsa».
- `title` e `summary` stanno tra virgolette: senza, i due punti dentro la frase rompono il YAML.
- Il primo tag è `workspace`, il secondo è `type/session` o `type/daily`.
- C'è **almeno un wikilink a un'entità statica reale**, e ogni bersaglio esiste su disco: si apre
  il percorso e si controlla.
- I wikilink usano il percorso completo dalla radice, con alias leggibile: i nomi si ripetono tra
  i brand e un link corto punta al file sbagliato.
- Ogni voce del `related` compare anche nel corpo, o è una nota che il corpo nomina davvero.
- Le tre sezioni ci sono tutte, in ordine: `## Fatto`, `## Deciso`, `## Aperto`. Il daily ha in
  più `## Sessioni` in fondo.
- Quello che è scritto è successo davvero. Niente lavoro plausibile ma non fatto, niente
  decisioni che nessuno ha preso.

## Sito

> Da compilare.

## Brief cliente

> Da compilare.

## Onboarding

> Da compilare.

## Preventivo

Valgono per la skill [[code/skills/genera-preventivo/SKILL|genera-preventivo]]. Si verificano
prima di consegnare: se una non passa, si corregge e si riverifica.

- Tutte le voci richieste dal cliente sono presenti nel preventivo.
- Ogni prezzo corrisponde **esattamente** a [[self/tariffario|tariffario]]: nessuna cifra
  calcolata, stimata o arrotondata.
- C'è un totale unico in evidenza, e la somma delle voci torna.
- Le condizioni sono scritte: i due giri di revisione inclusi e, se è un caso studio, la clausola
  del permesso scritto di filmare e pubblicare.
- Il messaggio di accompagnamento è pronto, non da scrivere dopo.
- Il file è salvato in `outputs/preventivi/<anno>-<cliente>.md`.

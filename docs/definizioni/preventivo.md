---
title: "Definizione di fatto — Preventivo"
summary: "Quando un preventivo è pronto da mandare: prezzi letti dal tariffario, nessuna cifra inventata, e il file agganciato al cliente."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-08-21
updated: 2026-09-03
---

# Definizione di fatto — Preventivo

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

---

Queste condizioni si verificano **prima** di consegnare l'output: il criterio generale sta in [[docs/definizioni-di-fatto|definizioni di fatto]], la procedura in [[code/skills/genera-preventivo/SKILL|la skill genera-preventivo]], e gli errori da non ripetere in [[correction|correction log]].

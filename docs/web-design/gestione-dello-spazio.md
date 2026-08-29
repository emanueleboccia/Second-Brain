---
title: "Gestione dello spazio"
summary: "Gap, margine e padding, le proporzioni a percentuali con space-between, e la regola pratica di mettere i contenuti dentro un macro-blocco e applicare il padding lì invece di spaziare pezzo per pezzo."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/leggere-il-design-altrui]]"
  - "[[docs/web-design/margini-negativi]]"
  - "[[docs/web-design/unita-di-misura]]"
  - "[[docs/web-design/responsive]]"
---

# Gestione dello spazio

**La regola pratica.** Per mantenere una spaziatura uniforme si mettono i contenuti dentro un
macro-blocco e si applica il padding lì, invece di spaziare pezzo per pezzo. È la differenza tra
un layout che resta coerente e uno che va risistemato ogni volta che si aggiunge un elemento.

## Le proprietà

**Gap.** La distanza tra celle o box: ridotto li attacca, aumentato li distanzia.

**Margine.** Lo spazio esterno tra la griglia e i bordi del browser. Aumentandolo la griglia si
stringe verso il centro.

**Padding.** Lo spazio interno. Serve a dare aria ai testi e a non farli sembrare soffocati:
gli esempi degli appunti sono 10 px o 20 px sotto.

## La griglia

Il contenitore principale si tratta come una griglia: si definiscono colonne, righe e aree, e poi
si assegnano i blocchi alle aree.

- `grid-template-columns` con `1fr` ripetuto tre volte dà tre colonne uguali.
- `grid-template-rows` in frazioni divide l'altezza: 1 + 2 + 2 + 1 fa sei parti, quindi prima e
  ultima riga valgono un sesto e le due centrali due sesti l'una.
- `grid-template-areas` assegna nomi alle aree, come una rappresentazione a tabella del layout.

Le proporzioni con cui si ragiona in fase di lettura — 20/60/20, 45/45, 60/40, 30/30/30 — e la
distribuzione dello spazio residuo con `space-between` sono in
[[docs/web-design/leggere-il-design-altrui|leggere il design altrui]].

Un caso particolare, da usare con cautela, è in
[[docs/web-design/margini-negativi|margini negativi]]. Sotto una certa larghezza la griglia si
impila comunque: vedi [[docs/web-design/responsive|responsive]].

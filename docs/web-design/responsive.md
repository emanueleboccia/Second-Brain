---
title: "Responsive"
summary: "Adattare tablet e mobile è la parte più complessa del lavoro: sotto i 768px il layout si impila in una colonna, i tre breakpoint dei builder non coprono tutto, e ogni tecnica di sovrapposizione va riverificata su ogni device."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/gestione-dello-spazio]]"
  - "[[docs/web-design/margini-negativi]]"
  - "[[docs/web-design/unita-di-misura]]"
  - "[[docs/web-design/modelli-di-hero]]"
---

# Responsive

Gli appunti lo dicono senza girarci intorno: **adattare mobile e tablet è spesso la parte più
complessa** del lavoro.

Tecnicamente si governa con una regola `@media`: sotto una certa soglia il layout cambia, e quello
che cambia è la griglia descritta in
[[docs/web-design/gestione-dello-spazio|gestione dello spazio]].
Nell'esempio del corso, sotto i **768 px** il contenitore passa da tre colonne a una e le righe
diventano ad altezza automatica, quindi la struttura si impila e torna simile all'ordine verticale
dell'HTML.

Due avvertenze che gli appunti danno per esteso:

- **I tre breakpoint dei builder non coprono tutto.** Il telefono in orizzontale è il caso citato,
  e richiede attenzione in più.
- **Ogni tecnica che sovrappone o avvicina elementi va riverificata su tablet e mobile.** Vale in
  particolare per [[docs/web-design/margini-negativi|i margini negativi]], dove il layout si rompe
  spesso e va corretto device per device.

Anche la scelta della sezione ne risente: alcune impaginazioni perdono la loro specialità su
mobile perché lo schermo forza tutto in verticale — il caso è discusso in
[[docs/web-design/modelli-di-hero|modelli di hero]].

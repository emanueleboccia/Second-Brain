---
title: "Leggere il design di un altro sito"
summary: "Il metodo per smontare qualsiasi sito: partire dai macro blocchi, capire se sono in riga o in colonna, dove sono allineati e come è distribuito lo spazio, perché un design articolato è quasi sempre solo righe, colonne e nesting."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/struttura-e-styling]]"
  - "[[docs/web-design/gestione-dello-spazio]]"
  - "[[docs/web-design/ispirazione]]"
  - "[[docs/web-design/dinamicita-dei-blocchi]]"
---

# Leggere il design di un altro sito

Gli appunti descrivono il web design come **tecnicamente facile**: serve manualità, conoscere le
misure fondamentali e soprattutto capire come blocchi e colonne sono allineati.

Un design che sembra articolato è quasi sempre solo: **righe più colonne più allineamenti più
spaziature più nesting ordinato**. È il rovescio pratico di
[[docs/web-design/struttura-e-styling|struttura e styling]]: se la complessità sta nel CSS, la
struttura sotto è sempre leggibile. Se si sa analizzare, si sa replicare; se non si conosce la
struttura, non si replica niente in modo affidabile.

## Il metodo

1. **Parti dai macro blocchi.** La sezione madre, di solito a larghezza 100%, poi la divisione in
   due o tre blocchi principali.
2. **Capisci se i blocchi sono orizzontali o verticali** — riga o colonna — e dove sono allineati:
   all'inizio o al centro.
3. **Capisci come è gestito lo spazio.** Gli appunti ragionano a percentuali: 20/60/20, oppure
   45/45 con un 10% di spazio, e lo spazio restante distribuito con `space-between`.
4. **Quando dentro una colonna servono elementi affiancati** — due bottoni, per esempio — si crea
   un sotto-blocco interno in riga che li contiene.

Come si governano padding, gap e margini una volta capita la struttura è in
[[docs/web-design/gestione-dello-spazio|gestione dello spazio]].

L'esempio guidato è l'header di Notion: una sezione a larghezza piena divisa in tre blocchi — logo,
menù, CTA — con proporzioni intorno a 20/60/20, il blocco CTA che è una riga con due bottoni
affiancati allineati al centro per bilanciare altezze diverse, e l'header letto come riga con
`space-between`, più la proprietà sticky e un bordino da 1px che compare in movimento con un po'
di JavaScript.

**Prendere ispirazione è doveroso**, vista la quantità di siti che esistono: non farlo allunga il
processo e non porta beneficio né a chi lavora né al cliente. L'unica nota di buon senso è **non
copiare sezioni dal competitor diretto del cliente**. Dove cercarla è in
[[docs/web-design/ispirazione|ispirazione]].

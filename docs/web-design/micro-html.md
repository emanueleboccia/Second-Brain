---
title: "Il micro HTML nei builder"
summary: "Quando l'editor visuale non arriva: il tag br per andare a capo e bilanciare le righe, b o strong per grassettare singole parole dentro un titolo, e i codici esadecimali per tenere i colori coerenti."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/gerarchia-del-testo]]"
  - "[[docs/web-design/allineamento-del-testo]]"
  - "[[docs/web-design/struttura-e-styling]]"
  - "[[docs/web-design/regola-del-tre-colori]]"
---

# Il micro HTML nei builder

L'editor visuale ha dei limiti, e nei titoli spesso non offre gli stessi controlli rapidi che dà
sui paragrafi. Gli appunti indicano tre interventi minimi da fare a mano.

**Andare a capo con `<br>`.** Serve a **bilanciare la lunghezza delle righe**: si evita una riga
lunghissima seguita da una cortissima. È il modo corretto di risolvere il problema che qualcuno
proverebbe a sistemare col testo giustificato, che invece è escluso — vedi
[[docs/web-design/allineamento-del-testo|allineamento del testo]].

**Grassettare una parte sola con `<b>` o `<strong>`.** Dentro un titolo il builder spesso non lo
permette dalla barra, e si scrive il tag. Serve a rendere il messaggio più leggibile e più
scansionabile, entro il limite della
[[docs/web-design/gerarchia-del-testo|gerarchia del testo]]: troppo grassetto non evidenzia più
niente.

**Usare i codici esadecimali per i colori.** `#000000` per il nero, `#636363` per un grigio soft.
Serve a tenere la coerenza visiva invece di riscegliere il colore a occhio ogni volta, dentro il
limite della [[docs/web-design/regola-del-tre-colori|regola dei tre colori]].

Sul bianco gli appunti danno un'indicazione precisa: **meglio un bianco soft tipo `#F5F5F5` del
bianco pieno**, perché affatica meno l'occhio, soprattutto con poca luce.

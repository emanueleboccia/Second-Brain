---
title: "Anteprima e pubblicazione"
summary: "Nel page builder l'anteprima serve a provare senza toccare la pagina live, e la pubblicazione porta le modifiche in produzione: si lavora su due schede e si tiene la separazione, perché in produzione i danni sono reali."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/ordine-e-naming]]"
  - "[[docs/web-design/sorgente-e-live]]"
  - "[[docs/web-design/contraddizioni-aperte]]"
  - "[[docs/web-design/verifica-pagespeed]]"
---

# Anteprima e pubblicazione

> **Questa è teoria, non il modo di lavorare di oggi.** Dal 26/08/2026 i siti si fanno custom o su
> WordPress deployato dal repo — vedi [[docs/web-design/custom-o-wordpress|custom o WordPress]] — e
> la fonte di verità è sempre il sorgente. La nota resta perché il principio sotto vale comunque, e
> perché un cliente può arrivare con un sito costruito così.

Nel page builder ci sono due stati della stessa pagina, e gli appunti li chiamano una **regola
critica**.

**Anteprima.** Serve a testare senza impattare la pagina live.

**Pubblica.** Porta le modifiche in produzione, cioè le rende visibili al mondo e al traffico.

Il motivo per cui va interiorizzata la separazione: **in produzione si fanno danni reali** — copy
o immagini sbagliate, sezioni cancellate, modifiche fatte mentre girano le campagne.

Insieme al naming dei contenitori è la seconda abitudine di lavorazione degli appunti — vedi
[[docs/web-design/ordine-e-naming|ordine e naming]].

L'abitudine operativa suggerita è **lavorare con due schede**, una con l'editor e una con
l'anteprima: si salva dall'editor, poi si aggiorna l'anteprima. Se non si salva, in anteprima non
cambia niente.

## Il principio sotto

Quello che vale al di là dello strumento è che **non si lavora mai direttamente su ciò che il
pubblico vede**. Nel builder la separazione è tra due stati della stessa installazione; nel modo di
lavorare di oggi è tra il sorgente e il server, ed è
[[docs/web-design/sorgente-e-live|si lavora dal sorgente, mai sul live]]. Cambia dove sta il
confine, non che ci sia.

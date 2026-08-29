---
title: "Si lavora dal sorgente, mai sul live"
summary: "Per i tre siti di famiglia il repo è la fonte di verità e il server è una copia: una modifica fatta a mano sul live e non nel sorgente sparisce al primo deploy, o resta senza che nessuno sappia perché."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/verifica-post-deploy]]"
  - "[[docs/web-design/media-da-drive]]"
  - "[[docs/web-design/anteprima-e-pubblicazione]]"
  - "[[docs/web-design/contraddizioni-aperte]]"
---

# Si lavora dal sorgente, mai sul live

> Recuperata da `_sistema/tecnica/stile-siti.md`, eliminato nella riorganizzazione del 21/08/2026.
> Era scritta per i tre siti di famiglia — Tenuta Don Gaetano, Da Mamma Rosaria e La Masseria di
> Mezz'autunno — ma **dal 26/08/2026 vale su tutti i siti**, come conseguenza della decisione in
> [[docs/web-design/custom-o-wordpress|custom o WordPress]]: su un sito custom la fonte è il
> sorgente per costruzione, e su WordPress si deploya dal repo lo stesso.

**Il repo è la fonte di verità, il server è una copia.**

Una modifica fatta a mano sul live e non nel sorgente è una modifica che, al primo deploy, sparisce.
O peggio, resta, e nessuno sa perché.

## Ogni modifica al live si mostra prima di applicarla

Nessuna esecuzione al buio. Si mostra cosa si sta per scrivere, si aspetta l'ok, poi si scrive. È la
stessa regola sulle scritture che vale per tutti i servizi esterni.

E dopo aver scritto si controlla che sia arrivato quello che si voleva:
[[docs/web-design/verifica-post-deploy|verifica post-deploy]].

> Il modello dei page builder descritto in
> [[docs/web-design/anteprima-e-pubblicazione|anteprima e pubblicazione]] mette la fonte dentro il
> sito stesso, e non coincide con questo. È teoria utile a riconoscere un sito costruito così, non
> il modo di lavorare: il punto è stato chiuso in
> [[docs/web-design/contraddizioni-aperte|contraddizioni aperte]].

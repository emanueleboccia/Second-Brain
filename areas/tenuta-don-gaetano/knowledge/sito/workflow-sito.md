---
title: "Workflow sito — Tenuta Don Gaetano"
summary: "Come si lavora sul sito: il repo è la fonte di verità per il codice, il server si aggiorna solo via deploy, e il titolo SEO va verificato a ogni rilascio perché vive nel database."
tags:
  - areas
  - brand/tenuta-don-gaetano
  - sito
  - tecnica
status: in-lavorazione
created: 2026-07-12
updated: 2026-07-14
related:
  - "[[areas/tenuta-don-gaetano/knowledge/sito/copy-homepage]]"
  - "[[areas/tenuta-don-gaetano/knowledge/sito/sitemap]]"
---

# Workflow sito — Tenuta Don Gaetano

Come si lavora sul sito, accertato alla chiusura del cantiere del 12/07/2026.
Se qualcosa qui dentro non torna con la realtà, vince la realtà: aggiorna il file.

## Cos'è il sito

Una **landing a pagina singola**. Per scelta, non per lavori in corso.

La navigazione è fatta di **ancore interne** ([[areas/tenuta-don-gaetano/knowledge/sito/sitemap|sitemap]]): le voci del menu portano a sezioni della stessa
pagina, non ad altre pagine. **Non c'è nessuna pagina da costruire.**

## Dov'è la verità

Il repo **`sito-web-tenutadongaetano`** contiene il tema WordPress live ed è la **fonte di verità**.

- Si lavora nel repo, si committa nel repo.
- **Il server si aggiorna solo via deploy.** Non si modifica il sito dal pannello WordPress,
  non si scrive sul server a mano: qualunque cosa fatta fuori dal repo è destinata a sparire —
  o, peggio, a vivere solo lì senza che nessuno lo sappia (è esattamente quello che è successo,
  vedi `MEMORY.md`).
- I testi della home restano governati da [[areas/tenuta-don-gaetano/knowledge/sito/copy-homepage|copy homepage]], che è la fonte di verità **per le parole**.
  Il repo è la fonte di verità **per il codice**.

## Ambiente

- **WordPress** su **Hostinger**
- **LiteSpeed Cache**
- **Tema classico PHP custom** (nessun page builder — Elementor è disattivato)

## Come si deploya

Il deploy dei file PHP del tema si fa dal repo, con purge della cache e **verifica sul live**
subito dopo. Il sito è operativo: non c'è più una procedura di deploy documentata a parte.

## Da controllare a ogni deploy

Il **titolo SEO dipende da `blogdescription` nel database**, non dal codice del tema.
È un valore che vive nel DB e che un salvataggio distratto dal pannello WordPress può cambiare
senza lasciare traccia nel repo.

Il valore ufficiale è documentato in [[areas/tenuta-don-gaetano/knowledge/sito/copy-homepage|copy homepage]]. **Verificalo in ogni controllo post-deploy.**

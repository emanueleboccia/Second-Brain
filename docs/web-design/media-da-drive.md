---
title: "I media passano da Drive"
summary: "Per i tre siti di famiglia i media vivono su Google Drive e non nel vault; i formati con cui finiscono sul sito seguono la regola generale, che dal 26/08/2026 ammette anche PNG e JPEG sotto i 200 KB."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/sorgente-e-live]]"
  - "[[docs/web-design/formati-immagine]]"
  - "[[docs/web-design/ottimizzazione-immagini]]"
  - "[[docs/web-design/verifica-post-deploy]]"
---

# I media passano da Drive

> Recuperata da `_sistema/tecnica/stile-siti.md`, eliminato nella riorganizzazione del 21/08/2026.
> Vale per i tre siti di famiglia.

**I media vivono su Google Drive, non nel vault.** È la parte della regola che resta in vigore: il
vault tiene le regole, Drive tiene i file finiti e i media.

## La parte sui formati è cambiata

La formulazione originale diceva di convertire tutto in WebP prima del caricamento, «nessun JPEG o
PNG originale caricato così com'è». **Dal 26/08/2026 non è più così:** vale la regola generale di
[[docs/web-design/formati-immagine|i formati immagine]] — la maggior parte in WebP, PNG e JPEG
ammessi sotto i 200 KB, SVG per loghi e icone — e vale su tutti i siti, di famiglia e non.

Quello che non è cambiato è che **un originale non si carica mai così com'è**: passa comunque dalla
compressione, e il workflow è in
[[docs/web-design/ottimizzazione-immagini|ottimizzazione delle immagini]].

Insieme a [[docs/web-design/sorgente-e-live|si lavora dal sorgente]] e a
[[docs/web-design/verifica-post-deploy|verifica post-deploy]] è una delle tre regole recuperate
dallo stesso file.

---
title: "I formati video"
summary: "MP4 con codec H.264 o H.265, massimo 3-5 MB per il video di sfondo della hero e 1-2 MB per gli altri, con la scelta tra hosting esterno che carica a pezzi e caricamento diretto che appesantisce la pagina."
tags:
  - docs
  - web-design
  - principio/media
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/formati-immagine]]"
  - "[[docs/web-design/ottimizzazione-immagini]]"
  - "[[docs/web-design/modelli-di-hero]]"
  - "[[docs/web-design/verifica-pagespeed]]"
---

# I formati video

**MP4** è lo standard universale per il web. Per le immagini valgono regole diverse, e stanno in
[[docs/web-design/formati-immagine|i formati immagine]]. I codec consigliati sono **H.264** o **H.265**, che è
più moderno.

## I pesi

- **Video di sfondo della hero section:** 3–5 MB massimo.
- **Altri video:** 1–2 MB.

## Le due strategie di caricamento

**Hosting esterno** — Vimeo, YouTube, Wistia. Il video viene caricato a pezzi mentre l'utente lo
guarda, e questo riduce il carico iniziale della pagina.

**Caricamento diretto nel builder.** Più semplice, ma appesantisce la pagina.

**Wistia** è indicata come la piattaforma professionale per i video: serve per le VSL pesanti, per i
video lunghi da venti o trenta minuti, o quando ce ne sono molti da gestire. Ha una versione
gratuita.

Il peso complessivo della pagina si controlla poi con
[[docs/web-design/verifica-pagespeed|PageSpeed Insights]].

Per comprimere, gli appunti dicono di cercare un compressore MP4 online — i tool gratuiti variano nel
limite di dimensione del file, da 1 a 10 GB — e per i file grossi di passare a Wistia.

Il video grande in hero è la struttura descritta in
[[docs/web-design/modelli-di-hero|modelli di hero]] come verticale centrata.

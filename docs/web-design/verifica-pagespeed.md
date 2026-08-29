---
title: "La verifica con PageSpeed Insights"
summary: "A fine progetto, prima della consegna, si passa l'URL a PageSpeed Insights e si ottimizza ciò che è sotto il proprio controllo: immagini, video e font, ignorando gli errori del tema o del builder."
tags:
  - docs
  - web-design
  - principio/media
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/ottimizzazione-immagini]]"
  - "[[docs/web-design/formati-video]]"
  - "[[docs/web-design/verifica-post-deploy]]"
  - "[[docs/web-design/strumenti-per-i-font]]"
---

# La verifica con PageSpeed Insights

**Quando.** A fine progetto, prima della consegna al cliente.

**Come.** Si inserisce l'URL e si ricevono due report, mobile e desktop, con i punteggi di
prestazioni, accessibilità, best practice e SEO.

**Cosa controllare:**

- Il **peso delle immagini** e quanto si può ancora ridurre — il metodo è in
  [[docs/web-design/ottimizzazione-immagini|ottimizzazione delle immagini]].
- I **font personalizzati**, che rallentano il caricamento: i Google Fonts sono più veloci — vedi
  [[docs/web-design/strumenti-per-i-font|strumenti per i font]].
- Il **lazy loading** delle immagini.

**I limiti.** Alcuni errori non sono modificabili: il JavaScript e il CSS del tema o del web builder
non sono sotto il controllo di chi costruisce il sito. **L'obiettivo è ottimizzare ciò che è sotto
il proprio controllo** — immagini, video, font — e non rincorrere il punteggio pieno.

> Questa è la verifica sulla **velocità**. Sui tre siti di famiglia esiste anche una verifica sui
> **contenuti pubblicati**: vedi [[docs/web-design/verifica-post-deploy|verifica post-deploy]]. Sono
> due controlli diversi e servono tutti e due.

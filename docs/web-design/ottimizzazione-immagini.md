---
title: "Ottimizzazione delle immagini"
summary: "Si ridimensiona prima di abbassare la qualità, si punta a 100-200 KB per immagine, e si verifica visivamente con lo slider prima-dopo: dieci immagini da 2-3 MB fanno 30 MB di pagina."
tags:
  - docs
  - web-design
  - principio/media
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/formati-immagine]]"
  - "[[docs/web-design/verifica-pagespeed]]"
  - "[[docs/web-design/strumenti-per-le-immagini]]"
  - "[[docs/web-design/media-da-drive]]"
---

# Ottimizzazione delle immagini

## La priorità

**Si ridimensiona prima di abbassare la qualità.** Le immagini troppo grandi non servono sul web, e
un'immagine più piccola è preferibile a un'immagine sgranata.

## Il workflow con Squoosh

Squoosh è lo strumento principale indicato: gratuito, con un confronto prima-dopo a slider.

1. Selezionare il formato **WebP**, che è lo standard secondo
   [[docs/web-design/formati-immagine|i formati immagine]].
2. **Ridurre le dimensioni al 50%**, poi al 33% o al 25% se serve.
3. **Qualità:** partire dal 70%, scendere fino al 60% per testare la differenza visiva.
4. **Peso finale:** 100–200 KB, con 150–200 KB accettabile.

## La verifica

Si guarda con lo slider prima-dopo e **si testa con occhio critico**: se alla dimensione reale non
si vede differenza, il file è ottimizzato.

## Perché conta

**Non si caricano immagini da 2 o 3 MB.** Su un sito con dieci immagini si arriva facilmente a 30 MB
di peso totale, e il caricamento rallenta drasticamente. Il limite operativo che gli appunti
ripetono nella parte pratica è **200 KB per immagine o file non video**.

Il controllo finale sta in [[docs/web-design/verifica-pagespeed|PageSpeed Insights]]; gli altri
strumenti sono in [[docs/web-design/strumenti-per-le-immagini|strumenti per le immagini]].

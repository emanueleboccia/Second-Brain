---
title: "I formati immagine"
summary: "WebP come standard per il 90-100% delle foto, SVG obbligatorio per loghi e grafiche scalabili, PNG per testi e trasparenze, JPEG come alternativa, GIF da evitare sostituendola con un MP4 in loop."
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
  - "[[docs/web-design/verifica-pagespeed]]"
  - "[[docs/web-design/media-da-drive]]"
---

# I formati immagine

| Formato | Uso principale | Peso massimo | Nota |
|---|---|---|---|
| WebP | tutte le foto del sito | 100–200 KB | il formato consigliato al 90–100% |
| SVG | loghi, icone, grafiche | — | scalabile all'infinito |
| PNG | loghi, tabelle, testi con trasparenza | 100–200 KB | disattivare il lazy loading sui testi |
| JPEG | foto generiche senza trasparenza | 200 KB | alternativa a WebP |
| GIF | — | — | da evitare, si usa un MP4 |

I pesi si raggiungono comprimendo, e il metodo è in
[[docs/web-design/ottimizzazione-immagini|ottimizzazione delle immagini]].

**WebP.** Formato moderno, il compromesso migliore tra qualità e dimensione: compressione
eccellente, supporta lo sfondo trasparente come il PNG, qualità alta. È supportato dai browser
moderni; i più vecchi possono avere problemi, ma è raro. **Va usato come standard.**

**SVG.** Vettoriale, non basato su pixel. Scala all'infinito senza perdere qualità, a differenza
delle immagini a pixel che si sgranano quando le si ingrandisce. Gli appunti lo indicano come
**obbligatorio per loghi e grafiche scalabili** — divisori, linee, piccole infografiche.

**PNG.** Per loghi, icone, tabelle e testi. Supporta la trasparenza e mantiene la nitidezza sui
testi. **Buona pratica:** sui PNG con testo — tabelle fatte su Canva o Photoshop — si disattiva il
lazy loading, perché può sgranare il testo.

**JPEG.** Il formato più usato in fotografia. Va per le immagini generali — prodotti, persone,
ambienti — ma **non supporta la trasparenza**.

**GIF.** Sconsigliata: il peso si triplica o quadruplica quando si comprime coi tool online. Meglio
sostituirla con un **video MP4 in loop**, che pesa meno e dà più controllo sulla qualità — vedi
[[docs/web-design/formati-video|i formati video]].

## La regola operativa

> **Decisione di Emanuele del 26/08/2026**, che chiude la differenza che c'era con le vecchie regole
> dei siti di famiglia:
>
> - **La maggior parte in WebP.**
> - **PNG e JPEG si possono usare**, sotto i 200 KB.
> - **SVG per loghi e icone.**

È la posizione degli appunti, e da oggi vale su tutti i siti: la formula più stretta di
`stile-siti.md` — «nessun JPEG o PNG originale caricato così com'è» — non è più in vigore. Dove i
media stanno prima di finire sul sito è in [[docs/web-design/media-da-drive|media da Drive]].

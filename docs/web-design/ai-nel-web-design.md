---
title: "L'AI nel web design"
summary: "«Prediction is not reasoning»: l'AI è utile per generare blocchi di codice e velocizzare, ma tende a strafare, va controllata, e non le si delega la costruzione intera di un sito per via della manutenibilità."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/chi-scrive-il-copy]]"
  - "[[docs/web-design/struttura-e-styling]]"
  - "[[docs/web-design/strumenti-per-le-immagini]]"
  - "[[docs/web-design/template-come-punto-di-partenza]]"
---

# L'AI nel web design

Il mantra con cui gli appunti chiudono la lezione: **«prediction is not reasoning»**, la predizione
non è ragionamento. Un modello linguistico calcola quale parola è statisticamente più probabile dopo
la precedente; non capisce il significato. Da qui i limiti che gli appunti elencano: le
allucinazioni, i bias delle policy aziendali, la fragilità su compiti banali, e la percezione di
efficienza che a volte non corrisponde a un guadagno reale di tempo.

**Va trattata come uno strumento freddo e statistico**, non come un collaboratore.

## L'uso pratico

**Generare blocchi.** Si può chiedere un blocco specifico — «creami un blocco HTML con un mosaico di
immagini» — e incollare il risultato nel widget HTML del builder. Funziona perché, come dice
[[docs/web-design/struttura-e-styling|struttura e styling]], quei blocchi sono comunque HTML e CSS.

**Come si chiede.** Gli appunti danno due indicazioni: **scrivere i prompt in inglese** per
accuratezza, e **chiedere il codice senza commenti** per avere un output pulito.

**Cosa controllare.** L'AI **tende a strafare** — aggiunge titoli e bottoni non richiesti per
sembrare più completa. Il codice generato va controllato e ripulito.

## Il limite

**Non si delega la costruzione intera di un sito.** Fare un sito tutto a blocchi generati è
sconsigliato per la manutenibilità. Vale lo stesso ragionamento dei
[[docs/web-design/template-come-punto-di-partenza|template]]: è un punto di partenza, non una
consegna.

Sul copy la posizione è più netta ancora, ed è in
[[docs/web-design/chi-scrive-il-copy|chi scrive il copy]].

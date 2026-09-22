---
title: "Gestionale della Masseria — cosa fa il sistema"
summary: "Il gestionale delle gite, delle feste nel parco e delle serate della Masseria, costruito e messo online il 21/09/2026 sul format di quello di Mamma Rosaria: chi fa cosa, com'è fatto, dove sta e cosa manca."
tags:
  - projects
  - gestionale-masseria
  - sistema
  - brand/la-masseria-di-mezzautunno
status: attivo
created: 2026-09-21
updated: 2026-09-21
related:
  - "[[projects/gestionale-masseria/MEMORY]]"
  - "[[areas/la-masseria-di-mezzautunno/MEMORY]]"
  - "[[areas/la-masseria-di-mezzautunno/reference/design]]"
  - "[[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference]]"
  - "[[self/ruolo-famiglia]]"
---

# Gestionale della Masseria — cosa fa il sistema

> Costruito e messo online il 21/09/2026. Il codice sta in `~/Desktop/progetti/gestionale-masseria`, il
> vault lo descrive e non lo copia. Le decisioni stanno nella [[projects/gestionale-masseria/MEMORY|memoria
> del progetto]].

## In breve

Le date che la [[areas/la-masseria-di-mezzautunno/MEMORY|Masseria]] prende al telefono, fuori da
Clappit, in un posto solo: **gite scolastiche**, **feste nel parco** e **serate** come la Pumpkin
Night. Sta su `gestionale.lamasseriadimezzautunno.it`, a parte da quello di Mamma Rosaria.

**Chi fa cosa.** Selene aggiunge e gestisce le date. Raffaele e Angela entrano, vedono, stampano ed
esportano, senza poter toccare niente. Emanuele amministra gli accessi. Nessuno sceglie la password di
un altro: si crea l'accesso e si manda un link, valido sette giorni e una volta sola.

## Com'è fatto, rispetto a quello di Mamma Rosaria

**Lo stesso format**, letto dentro il gestionale di Mamma Rosaria il 21/09/2026: accesso su una card
col logo, barra in alto con «Nuova», calendario con mese, settimana, giorno e lista, filtri, e sotto le
card di amministrazione. La scheda di una data è a sezioni, col tasto di salvataggio fermo in fondo.

**Lo stile della Masseria**, dal suo [[areas/la-masseria-di-mezzautunno/reference/design|design]]:
barra marrone col nome in Niconne giallo, fondo crema, card avorio, HeroLight per i titoli e Poppins per
il resto. Nel calendario le gite sono verdi, perché nel brand il verde è già il colore delle scuole; le
feste arancio, le serate marroni. All'accesso, il fienile rosso di Zucche 2025 con la velatura scura.

**Quello che ha in più**, pensato sul lavoro della segreteria:

- i giorni aperti al pubblico col biglietto Clappit sono segnati nel calendario, così nessuno ci
  prenota una festa che vuole il parco tutto per sé;
- mentre Selene scrive una data nuova, vede cosa c'è già quel giorno, con un avviso se non è libero;
- il totale si calcola dalle quote del
  [[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference|reference di Zucche]] —
  formula, disabilità a metà, giri sul pony, 30 € a persona più 500 € — e Selene lo può correggere;
- la vista del giorno dice quanti bambini mangiano e raccoglie le allergie, che è quello che serve
  alla cucina;
- le prenotazioni della Pumpkin Night nel calendario diventano una pastiglia sola col totale delle
  persone, e nel giorno una tabella da stampare;
- l'Excel: un foglio con tutte le date, uno per tipo coi totali, uno con le annullate, e la data
  dell'esportazione nel nome del file e in cima a ogni foglio;
- una copia del database ogni notte, le ultime trenta.

⚠️ **HeroLight ha l'euro vuoto**: il glifo esiste ma non disegna niente. Scoperto il 21/09/2026 sulle
schermate. Gli importi vanno in Poppins, anche nei PDF del brand.

## Com'è costruito

Laravel 13 come FoodOS, database SQLite, pagine Blade senza build. 37 test verdi il 21/09/2026:
ruoli, inviti, date, calendario, Excel e backup. Sul Mac gira con dati inventati.

## Dove sta online

Su Hostinger è un sito a parte, PHP 8.5, accanto al WordPress della Masseria che non si tocca. Il codice
sta in `public_html/app`, i file pubblici in `public_html/web`, e il pannello serve solo `web`: `.env`,
database e log da internet non si vedono, verificato il 21/09/2026. L'SSH è spento, quindi si pubblica
dal Gestore file; come si fa sta nel README del progetto.

**Il backup** lo fa la prima visita di ogni giorno: una copia del database, le ultime trenta, senza cron.

## Cosa manca

- **Il primo accesso di Emanuele**, dal link per scegliere la password, e poi gli accessi di Selene,
  Raffaele e Angela dalla card.
- **Il codice sta solo sul Mac e sul server**: niente git per ora, per scelta di Emanuele.
- **Il collegamento con Mamma Rosaria.** Il suo gestionale ha già il filtro «LMDM» e i tipi «Gita
  Scolastica» ed «Evento La Masseria»: le date della Masseria ci possono arrivare in sola lettura, così
  la cucina vede tutto in un calendario. Per ora Raffaele le vede entrando anche qui.
- **La capienza della Pumpkin Night**, se si vuole il conto dei posti rimasti.
- **Il prezzo**, da decidere con Emanuele: per il [[self/ruolo-famiglia|ruolo in famiglia]] è un
  progetto a corpo.

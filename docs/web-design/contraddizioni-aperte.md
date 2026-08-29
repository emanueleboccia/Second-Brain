---
title: "Contraddizioni aperte sul web design"
summary: "Restano due punti in cui gli appunti dicono due cose diverse — quante animazioni servono e quanto ci si appoggia all'AI; le altre tre, su fonte di verità, formati immagine e piattaforma, sono state chiuse da Emanuele il 26/08/2026."
tags:
  - docs
  - web-design
  - da-decidere
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/animazioni-con-parsimonia]]"
  - "[[docs/web-design/stile-moderno]]"
  - "[[docs/web-design/ai-nel-web-design]]"
  - "[[docs/web-design/chi-scrive-il-copy]]"
  - "[[docs/web-design/custom-o-wordpress]]"
  - "[[docs/web-design/formati-immagine]]"
---

# Contraddizioni aperte sul web design

I punti in cui il materiale dice due cose diverse. **Quelle ancora aperte non si risolvono di mia
iniziativa:** ci sono le due versioni, la decisione è di Emanuele.

Le fonti sono due: `sources/webdeisgn/appunti web designer.pdf` e `_sistema/tecnica/stile-siti.md`,
recuperato da git al commit `72cc996^`.

---

## Ancora aperte

### 1. Quante animazioni servono

- **Lezione sui contenitori.** [[docs/web-design/animazioni-con-parsimonia|Meno animazioni ci sono
  meglio è]], perché il JavaScript appesantisce e ciò che vende è il copy.
- **Lezione sugli stili.** Nello [[docs/web-design/stile-moderno|stile moderno]] gli effetti e le
  animazioni sono un tratto costitutivo, e servono a far sembrare il design «più avanzato di quanto
  sia realmente». Nell'[[docs/web-design/stile-ipermoderno|ipermoderno]] le micro-interazioni sono
  la sostanza dello stile.

Si concilierebbero dicendo che l'animazione è un tratto di stile e non un motore di conversione, ma
gli appunti non lo dicono, e sul campo sono due istruzioni opposte quando il cliente le chiede.

### 2. Quanto ci si appoggia all'AI

- **Sul copy.** [[docs/web-design/chi-scrive-il-copy|Scrivere il copy solo con l'AI]] è sconsigliato
  come scorciatoia iniziale.
- **Sul codice e sulle immagini.** [[docs/web-design/ai-nel-web-design|L'AI]] è consigliata per
  generare blocchi, e Gemini è tra gli
  [[docs/web-design/strumenti-per-le-immagini|strumenti per le immagini]] suggeriti.

Il confine è probabilmente tra ciò che porta il messaggio e ciò che lo impagina, ma **gli appunti
non lo dicono**, e detta così la regola sull'AI è due regole diverse.

---

## Chiuse

Restano scritte perché la decisione non si rifà ogni volta che qualcuno rilegge gli appunti.

### Quali formati immagine — chiusa il 26/08/2026

Gli appunti davano usi legittimi a SVG, PNG e JPEG; `stile-siti.md` diceva «nessun JPEG o PNG
originale caricato così com'è».

**Decisione:** la maggior parte in WebP, PNG e JPEG ammessi sotto i 200 KB, SVG per loghi e icone.
Vale su tutti i siti. Sta in [[docs/web-design/formati-immagine|i formati immagine]].

### Su quale piattaforma si costruisce — chiusa il 26/08/2026

La lezione sulle piattaforme consigliava GoHighLevel, Framer e Shopify e scartava WordPress con
Elementor; tutta la parte pratica del corso era però su WordPress con Elementor.

**Decisione:** nessuna delle due. I siti semplici si fanno custom e si caricano sull'hosting,
WordPress si usa per i siti importanti col giusto ecosistema, Elementor non si usa più. Sta in
[[docs/web-design/custom-o-wordpress|custom o WordPress]].

### Dove sta la fonte di verità di un sito — chiusa il 26/08/2026

`stile-siti.md` diceva che il repo è la fonte e il server una copia; gli appunti lavoravano dentro
un builder, dove la fonte è il sito stesso e la separazione è tra
[[docs/web-design/anteprima-e-pubblicazione|anteprima e pubblicazione]].

**Decisione:** vince `stile-siti.md`, ed è una conseguenza della decisione sulla piattaforma. Sui
siti custom la fonte è il sorgente per costruzione; su WordPress vale lo stesso, ed è già la pratica
su Tenuta Don Gaetano, dove il tema si deploya dal repo e il sito non si tocca dal pannello. La
regola è [[docs/web-design/sorgente-e-live|si lavora dal sorgente, mai sul live]] e vale su tutte e
due le tracce.

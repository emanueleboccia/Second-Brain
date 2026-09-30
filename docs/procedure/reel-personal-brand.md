---
title: "Procedura — il reel in soggettiva del personal brand"
summary: "Come si fa un reel del personal brand dal girato coi Ray-Ban: lo stile deciso con Emanuele il 29/09/2026 sul reel di riferimento, e i passi dal girato alla voce fuori campo fino al render in Remotion. Nata sul reel del Girarrosto, che Emanuele ha definito «spettacolare»."
tags:
  - docs
  - procedure
  - contenuti
  - personal-brand
status: attivo
created: 2026-09-29
updated: 2026-09-29
related:
  - "[[self/reference/design]]"
  - "[[self/reference/formati]]"
  - "[[sources/riferimenti/reel-synsation-good-ux]]"
  - "[[projects/personal-brand/girato-girarrosto]]"
  - "[[code/skills/regia-video/SKILL]]"
---

# Procedura — il reel in soggettiva del personal brand

> Scritta il 29/09/2026, dopo due versioni dello stesso reel: la prima, montata sulla presa diretta dei
> Ray-Ban e con uno stile mio, Emanuele l'ha bocciata; la seconda, costruita sul reel che ha scelto lui come
> modello, l'ha definita «spettacolare». Qui c'è la seconda, perché si rifaccia uguale.

## Quando si usa

Per raccontare un lavoro vero **senza faccia in camera**: la soggettiva coi Ray-Ban fa vedere quello che
vedeva Emanuele, la sua voce racconta, le illustrazioni spiegano. È il formato «Stesso gesto» di
[[self/reference/formati|i formati]]: il prima, il gesto tolto, il dopo.

## Lo stile

I colori e i caratteri sono quelli di [[self/reference/design|il design]]; il ritmo viene da
[[sources/riferimenti/reel-synsation-good-ux|il reel di riferimento]].

- **Un'inquadratura ogni due-tre secondi.** La soggettiva si alterna alle illustrazioni, e l'illustrazione
  mostra la cosa che la voce sta dicendo. Sulla soggettiva lo zoom cambia a scatti, con una molla veloce.
- **Le illustrazioni sono ricostruite e si muovono**, sul fondale firma: un foglio che si scrive, schede che
  compaiono, numeri che salgono. Raccontano cose vere e, quando riprendono uno schermo, lo copiano senza i
  nomi dei clienti.
- **I sottotitoli** vanno a blocchi di due-quattro parole dietro alla voce: crema, Archivo Bold, **nessun
  riquadro**, l'ombra per il contrasto, nella fascia bassa sopra l'interfaccia di Instagram.
- **La parola chiave sta sulla passata crema `#FCF0DD`**, col testo nero in Archivo Black largo, che entra da
  sinistra come un evidenziatore. Una al massimo per blocco, e non in tutti.
- **Niente nome fisso in alto**, niente cartello finale: la chiusura è una frase sull'ultima inquadratura,
  con la sua parte finale sulla passata. ⚠️ **La frase parla di quello che il video mostra.** La bio, «Il lavoro
  che ti pesa non si organizza. Si toglie.», vale per i processi, i gestionali e le automazioni; per un sito
  si chiude con la riga del sito, «Prima capisco cosa vendi. Poi lo costruisco.». Deciso il 29/09/2026 sul reel
  di Room84, dove la bio in chiusura per Emanuele «qui non c'entra niente, è un sito web».
- **L'audio dei Ray-Ban non si usa.** Si sente la voce fuori campo di Emanuele, registrata col DJI Mic.
- **Si può anche senza voce.** Le scritte prendono il posto della voce, nello stesso stile e con tempi di
  lettura, mezzo secondo più un terzo di secondo a parola, e il ritmo lo dà la musica, scelta con Emanuele su
  tracce d'esempio. È la strada di Room84, finché lui la voce non l'ha allenata.
- **Un sito si fa vedere, non si racconta.** Il prima e il dopo vanno in un computer e in un telefono sul
  fondale, con le schermate vere che scorrono e il video della testata rimesso sopra; il disegno a mano, se c'è,
  si ricostruisce come illustrazione che si disegna da sola, e i suoi blocchi diventano le sezioni vere.

## I passi

1. **Il girato si guarda e si scrive.** Clip per clip, cosa c'è, le frasi utili e cosa va tagliato, come in
   [[projects/personal-brand/girato-girarrosto|il girato del Girarrosto]].
2. **Il testo della voce**, circa 40 secondi, pratico e dimostrabile come vuole il tono. Ogni frase si
   verifica sul girato o sul caso scritto: sul Girarrosto, per esempio, non si è detto che l'app tiene i colori,
   perché nelle riprese dell'iPad non si vedono. Il testo lo approva Emanuele: è la sua voce.
3. **La registrazione**: DJI Mic al petto, stanza senza eco, una frase alla volta con due secondi di pausa.
   Prima di montarci sopra se ne fanno sentire dieci secondi puliti.
4. **I tempi**: whisper parola per parola sulla voce, su pezzi corti; i blocchi dei sottotitoli e gli inizi
   delle scene si ricalcolano da lì.
5. **Gli spezzoni**: muti, verticali, a 30 fps, col colore solo pulito, e già sfumato quello che non si deve
   leggere, la scrittura a mano e i nomi sugli schermi. Una clip dell'iPhone a 60 fps rallentata a metà dà
   un finale fluido.
6. **Il montaggio in Remotion**, in `code/remotion-test/`, partendo dai file del Girarrosto.
7. **Il render** a due fotogrammi alla volta e a bassa priorità, poi il controllo della regia sui fotogrammi
   chiave e sul movimento della camera, e l'anteprima a Emanuele.

## Dove sta il codice

| File | Cosa fa |
|---|---|
| `code/remotion-test/scripts/pb-girarrosto-prepara.py` | gli spezzoni muti con le sfumature: si copia e si cambia la lista `SPEZZONI` |
| `code/remotion-test/src/pb-girarrosto/testo.ts` | il testo diviso in blocchi, le scene e i tempi |
| `Sottotitoli.tsx` | i sottotitoli e la passata, riusabili così come sono |
| `Scene.tsx` | la soggettiva con gli zoom e il fondale firma |
| `Illustrazioni.tsx` | le illustrazioni del Girarrosto: il foglio, le schede, i totali |
| `font.ts` | caratteri e colori del brand, da `public/pb-girarrosto/font/` |
| `src/pb-room84/Finestra.tsx` | computer e telefono con la pagina vera che scorre e il video della testata |
| `src/pb-room84/FoglioDisegno.tsx` | il disegno del sito che si ridisegna da solo, poi si riempie col sito vero |
| `scripts/pb-room84-cattura.cjs` | le schermate intere dei due siti, computer e telefono |

Per un reel nuovo si copia la cartella `src/pb-girarrosto/` con un nome nuovo, si registra la composizione in
`src/Composition.tsx`, e si cambiano testo, spezzoni e illustrazioni: sottotitoli, passata, soggettiva e
fondale restano quelli.

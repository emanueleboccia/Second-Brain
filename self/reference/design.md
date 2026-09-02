---
title: "Design"
summary: "L'identità visiva del personal brand: i tre caratteri liberi — Archivo, JetBrains Mono, Helvetica — la palette monocroma dark su nero, crema #EEEBDA e bianco, la gerarchia fatta di luce invece che di colore, il fondale firma a quattro strati e i quattro componenti che ne discendono."
tags:
  - self
  - reference
  - design
status: attivo
created: 2026-08-21
updated: 2026-08-29
related:
  - "[[self/reference/brand]]"
  - "[[self/reference/tono]]"
  - "[[self/reference/caption]]"
  - "[[code/skills/regia-video/SKILL]]"
  - "[[docs/video-social/sottotitoli-leggibili]]"
  - "[[docs/video-social/leggibilita-del-testo-a-schermo]]"
---

# Design

> Fonte di verità. Decisioni prese in coaching il **29/08/2026** e chiuse lo stesso giorno con la
> brand guideline in `sources/personalbrand/Brand Guideline - Emanuele Boccia.html`, che di questo
> file è l'applicazione visiva: dove le due divergevano, ha vinto la guideline e la riga è
> aggiornata qui.
>
> Prima di quel giorno il file era vuoto, e l'assenza si vedeva: il reel per Sistema Evolve del
> 26/08 usa un'ambra scelta di ripiego, perché non c'era niente da cui prendere il colore.

Il principio che tiene insieme tutto il resto: **la gerarchia si fa con la luce, non con il
colore**. Non ci sono colori esterni alla scala e non ci sono gradienti colorati. Quello che conta
è più chiaro, quello che conta meno è più spento, e il bianco pieno è riservato a una cosa sola per
composizione. È la traduzione visiva della regola del prima e dopo che regge
[[self/reference/tono|il tono di voce]]: si mostra una differenza, e la differenza si vede.

## Il marchio

**Il marchio è il nome.** *Emanuele Boccia*, Archivo Bold, tutto maiuscolo, spaziatura larga, in
alto a sinistra. Su fondo scuro è crema su `#0E0E0C`; su fondo chiaro è `#0E0E0C` su crema.

**Non esiste un simbolo, e non è un buco da riempire.** Del materiale visivo c'è una fotografia, e
una fotografia non è un marchio.

## I caratteri

Sono tre, e ognuno ha un mestiere. Non si scambiano.

| carattere | dove si usa |
|---|---|
| **Archivo Black** — `font-stretch:125%` · `font-weight:900` | titoli e parole giganti: è il peso principale, quello che regge gli H1 |
| **Archivo Bold** — stesso carattere, `font-weight:700` | titoletti minori e marchio testuale |
| **JetBrains Mono Bold** — `font-weight:700` | dati, numeri, contatori, etichette tecniche |
| **Helvetica** di sistema | testo corrente: paragrafi, sottotesti, didascalie lunghe |

**Solo 700 e 900, nessun peso intermedio.** È una scelta, non una dimenticanza: due soli pesi
tengono la gerarchia sulla luce e non sulle sfumature di grassetto.

Il monospazio sui dati è un dettaglio di firma: fa leggere un numero come una misura invece che
come una parola. Le etichette vanno in maiuscolo con `letter-spacing:.24em`. Il testo lungo si
colora di intermedio o di spento — il crema pieno resta ai titoli e ai punti che contano.

⚠️ **Sul web Archivo va chiamato con l'asse di larghezza `wdth 125`**, altrimenti torna alla
larghezza normale e l'effetto della parola gigante sparisce.

Termina e Foundry Monoline **non si usano più**: i file restano in
`sources/personalbrand/design/`, ma i caratteri sono quelli della tabella qui sopra.

## La palette

Monocroma dark, derivata da tre colori soli: nero, crema `#EEEBDA` e bianco.

| ruolo | colore |
|---|---|
| nero assoluto — fondi reel, stacchi, vignette | `#000000` |
| fondo principale | `#0E0E0C` |
| card | `#191915` |
| bordi e linee a 1 px | `#2A2A24` |
| testo secondario, e il **prima** | `#75746A` |
| intermedio | `#B5B2A4` |
| accento e testo principale — la **crema** | `#EEEBDA` |
| la punta | `#FFFFFF` |

**Il bianco pieno è una punta sola per composizione.** Il numero chiave, o la parola del dato:
una, e non due. Un bianco usato due volte non è più una gerarchia, è un fondo chiaro.

**Per la carta e i PDF la scala si ribalta**: fondo `#EEEBDA`, testo `#0E0E0C`. È la stessa
identità girata, non una seconda identità.

**Il prima e il dopo si dicono con la luce.** Il prima sta in grigio spento `#75746A`, il dopo in
crema o in bianco. Vale ovunque, video compreso.

Gli altri due dettagli di firma sono le **linee sottili a 1 px** e lo **spazio vuoto abbondante**.

## Il fondale firma

È il fondo che rende riconoscibile una cosa fatta da lui a colpo d'occhio, prima che qualcuno
legga il nome. Si usa sugli hero dei siti, sulle cover dei caroselli, sotto i dati nei reel e sulle
copertine dei PDF.

Quattro strati, dal basso:

1. **Base** nero caldo `#0E0E0C`.
2. **Griglia blueprint**: linee da 1 px in `#1A1A16`, celle da 60 a 80 px. Emerge dove c'è luce e
   sparisce nel buio verso i bordi.
3. **Glow radiale** crema `#EEEBDA` fra il 6% e il 10% di opacità, che sfuma a zero. Sta **dietro
   il soggetto**, non sopra e non a lato.
4. **Vignetta**: gli angoli vanno verso `#000000`.

**Al centro della scena c'è sempre il prodotto o il dato. Mai una figura decorativa.** Se al centro
non c'è niente da mostrare, il problema non è il fondo.

**Variante chiara**: fondo `#EEEBDA`, griglia `#E2DEC9`, e il glow non c'è. Su un fondo chiaro un
alone crema non illumina niente.

Lo stile di riferimento è il **big type hero**: titolo gigante in Archivo a tutta larghezza, col
soggetto che entra dentro le lettere invece di stare accanto. I riferimenti visivi stanno in
`sources/personalbrand/design/`, e di quelli interessa **il trattamento del fondo, non il layout**.
Una cosa non si prende: **il rosso**. La scala è chiusa. Se un giorno servirà un accento vero, sarà
una decisione nuova e va scritta qui.

## I componenti

Quattro pezzi, e bastano.

- **Bottoni a pillola.** Primario pieno crema con testo nero; secondario con bordo 1 px crema su
  trasparente.
- **Card.** Fondo `#191915`, bordo 1 px `#2A2A24`, angoli 20 px. Dentro: titoletto in Archivo Bold,
  testo in Helvetica spento, **una sola azione**.
- **Etichetta in maiuscoletto**, per nominare il contesto.
- **Riga tecnica in monospazio**, per contatori e coordinate: `01 / 04`, la zona, la data.

## Fotografia e video

Qui c'è la parte visiva. Come sono fatti i formati video — struttura, durata, sequenza — non è
deciso e non si deduce da qui.

- **I sottotitoli ci sono sempre, e sono grandi**: crema sul fondo scuro, con la parola-dato in
  bianco, **una sola per battuta**. Non sono accessibilità appiccicata dopo, sono parte del design;
  come si montano lo dicono [[docs/video-social/sottotitoli-leggibili|le regole sui sottotitoli]] e
  [[docs/video-social/leggibilita-del-testo-a-schermo|quelle sulla leggibilità a schermo]].
- **I dati mostrati nei video stanno sul fondale firma.**
- **Il prima in grigio spento, il dopo in crema.** Mai due bianchi nella stessa inquadratura.
- **La prova non si trucca.** Il materiale reale — screenshot, riprese, foto dei clienti — resta
  autentico: niente filtri di palette, niente virate verso il crema, solo pulizia e contrasto
  leggeri. **La coerenza la fa la cornice**, non il ritocco: fondale firma, card, bordi a 1 px,
  didascalie in monospazio.

Quando si monta, la regia la fa [[code/skills/regia-video/SKILL|la skill regia video]]: questo file
le dice di che colore, non che struttura.

## Cosa manca ancora

- **I format grafici**: com'è fatto un post, com'è fatta una copertina, quali misure per ogni
  canale. I componenti ci sono, i formati no.
- **La struttura dei formati video**, che arriverà da un brain dump dedicato ai contenuti.

---
title: "Design"
summary: "L'identità visiva del personal brand: i tre caratteri — Archivo, JetBrains Mono, Helvetica — la palette monocroma dark su nero, crema #EEEBDA e bianco, con la luce calda #DAC7AB riservata al bagliore del fondale, la gerarchia fatta di luce invece che di colore, il fondale firma a quattro strati e i quattro componenti che ne discendono."
tags:
  - self
  - reference
  - design
status: attivo
created: 2026-08-21
updated: 2026-09-30
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
>
> ⚠️ **Dal 19/09/2026 il file e la guideline divergono su un punto**: il bagliore del fondale è
> la luce calda `#DAC7AB`, non più il crema. La guideline resta com'era, perché in `sources/` non
> si modifica niente, e su quel punto vale questo file.

Il principio che tiene insieme tutto il resto: **la gerarchia si fa con la luce, non con il
colore**. Non ci sono colori esterni alla scala e non ci sono gradienti colorati. Quello che conta
è più chiaro, quello che conta meno è più spento, e il bianco pieno è riservato a una cosa sola per
composizione. È la traduzione visiva della regola del prima e dopo che regge
[[self/reference/tono|il tono di voce]]: si mostra una differenza, e la differenza si vede.

## Il marchio

**Il marchio è il nome.** *Emanuele Boccia*, Archivo Bold, tutto maiuscolo, spaziatura larga, in
alto a sinistra. Su fondo scuro è crema su `#0E0E0C`; su fondo chiaro è `#0E0E0C` su crema.

**Il simbolo è il monogramma EB nel cerchio.** Deciso da Emanuele il 30/09/2026, «sì al simbolo»: dal
28/09 stava già nella testata del sito, dove al passaggio del mouse lascia il posto al nome, e dal 29/09
nella firma dei footer e nell'icona del sito. Supera la regola del 29/08, che diceva «Non esiste un
simbolo»: era diventata falsa sul sito prima che qui.

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

Monocroma dark, derivata da tre colori soli: nero, crema `#EEEBDA` e bianco. Dal 19/09/2026 c'è in
più la luce calda, che non è un colore della grafica: è il colore della luce nel fondale.

| ruolo | colore |
|---|---|
| nero assoluto — fondi reel, stacchi, vignette | `#000000` |
| fondo principale | `#0E0E0C` |
| card | `#191915` |
| bordi e linee a 1 px | `#2A2A24` |
| testo secondario, e il **prima** | `#75746A` |
| intermedio | `#B5B2A4` |
| la **luce calda** — solo il bagliore del fondale | `#DAC7AB` |
| accento e testo principale — la **crema** | `#EEEBDA` |
| la punta | `#FFFFFF` |
| la **passata** — solo sotto la parola chiave dei video, col testo nero | `#FCF0DD` |

**La luce calda è la temperatura della luce, non un accento.** Nessun testo, bottone, dato o
componente la usa: i titoli restano crema e la punta resta bianca. È entrata il 19/09/2026
dall'avatar di Instagram: accanto al ritratto, i fondali col bagliore crema sembravano freddi,
quasi grigi, e nella prova affiancata la versione calda teneva insieme l'avatar e i post. Era
anche già nel file del fondale: `fondale-firma-scuro.png` ha un bagliore caldo quanto questo,
più del doppio di quanto dicesse questo file.

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
3. **Glow radiale** nella luce calda `#DAC7AB`, che sfuma a zero. Sta **dietro il soggetto**, non
   sopra e non a lato. ⚠️ Fino al 19/09/2026 qui c'era scritto crema fra il 6% e il 10% di
   opacità, ma a quei valori su un telefono non si vede: il file del fondale arriva a circa un
   terzo al centro. Il numero si fissa sulla prima grafica vera.
4. **Vignetta**: gli angoli vanno verso `#000000`.

**Al centro della scena c'è sempre il prodotto o il dato. Mai una figura decorativa.** Se al centro
non c'è niente da mostrare, il problema non è il fondo.

**Variante chiara**: fondo `#EEEBDA`, griglia `#E2DEC9`, e il glow non c'è. Su un fondo chiaro un
alone crema non illumina niente.

Lo stile di riferimento è il **big type hero**: titolo gigante in Archivo a tutta larghezza, col
soggetto che entra dentro le lettere invece di stare accanto. I riferimenti visivi stanno in
`sources/personalbrand/design/`, e di quelli interessa **il trattamento del fondo, non il layout**.
I siti e i profili salvati come riferimento, col motivo per cui sono stati scelti, stanno sullo
[[sources/riferimenti/siti-e-profili|scaffale]].
Una cosa non si prende: **il rosso**. La scala è chiusa. Se un giorno servirà un accento vero, sarà
una decisione nuova e va scritta qui. **L'arancione è stato valutato il 19/09/2026 e lasciato
fuori:** col nero caldo e il crema forma la palette di Claude, e i grigi di questo file sono già
quasi i suoi.

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

- **I sottotitoli ci sono sempre**: crema in Archivo Bold, **senza nessun riquadro dietro**, e il
  contrasto lo tiene un'ombra morbida. Non sono accessibilità appiccicata dopo, sono parte del design;
  come si montano lo dicono [[docs/video-social/sottotitoli-leggibili|le regole sui sottotitoli]] e
  [[docs/video-social/leggibilita-del-testo-a-schermo|quelle sulla leggibilità a schermo]]. ⚠️ Il
  29/09/2026 Emanuele ha bocciato, sul primo reel, i rettangoli scuri dietro ogni riga («non mi
  piacciono proprio») e il nome con la fase del lavoro fisso in alto a sinistra («è brutto»).
- **La parola chiave va sulla passata crema `#FCF0DD`**, scelta da Emanuele il 29/09/2026 fra tre
  prove: un segno di evidenziatore sotto una o due parole, storto di un grado e mezzo e con gli
  angoli irregolari, col testo nero `#0E0E0C` in Archivo Black largo. Una per battuta al massimo, e
  non in tutte. È l'unico caso in cui un testo ha una forma dietro, e la forma è quella di un
  evidenziatore, non di un riquadro. Il giallo evidenziatore e l'arancio, provati lo stesso giorno,
  non gli sono piaciuti.
- **Sul sito la passata è l'unico risalto dei titoli**, deciso da Emanuele il 30/09/2026: «è bellissimo».
  Una parola per titolo grande, e nei titoli piccoli nessuna. Niente seconda metà in grigio e niente parola
  in bianco pieno: c'erano tutti e tre, e lui non capiva quale fosse l'accento. In chiaro si ribalta, segno
  nero e parola crema.
- **I dati mostrati nei video stanno sul fondale firma.**
- **Il prima in grigio spento, il dopo in crema.** Mai due bianchi nella stessa inquadratura.
- **La prova non si trucca.** Il materiale reale — screenshot, riprese, foto dei clienti — resta
  autentico: niente filtri di palette, niente virate verso il crema, solo pulizia e contrasto
  leggeri. **La coerenza la fa la cornice**, non il ritocco: fondale firma, card, bordi a 1 px,
  didascalie in monospazio.
- **Nei ritratti il bagliore non si centra sulla testa.** Un alone tondo dietro una faccia, peggio
  se guarda in alto, fa un santino: la luce va dietro la nuca o la spalla. Deciso sull'avatar il
  19/09/2026.

Quando si monta, la regia la fa [[code/skills/regia-video/SKILL|la skill regia video]]: questo file
le dice di che colore, non che struttura. Il modello di montaggio che Emanuele ha indicato il
29/09/2026 — tagli ogni due secondi, illustrazioni che si muovono, sottotitoli a blocchi brevi dietro
alla voce — è misurato in [[sources/riferimenti/reel-synsation-good-ux|il reel di riferimento]].

## Cosa manca ancora

- ✅ **Il carosello ha il suo stile, dal 29/09/2026.** La prima prova del 25/09, fatta di solo testo, Emanuele l'ha
  bocciata («sono solo muri di testo»); la seconda, nello stile dei video e con lo schema dei caroselli di
  [[sources/riferimenti/caroselli-arounda|Arounda]], gli è piaciuta: «tutto bellissimo, anche le illustrazioni».
  Le regole: **due scale che si alternano nella griglia**, la scura del fondale firma e la chiara del sito, fondo
  crema e testo nero, dove **la passata si ribalta**, segno nero e parola crema; **le immagini sono illustrazioni
  fatte di pezzi d'interfaccia e diagrammi** — schede, finestre, liste, linee del tempo — **mai icone a linea**,
  che ha trovato «proprio brutte»; la chiusura ha sempre la stessa forma ma **una frase sua per ogni carosello**: la riga
  della bio, «Il lavoro che ti pesa non si organizza. Si toglie.», non si ripete su tutti, detto da Emanuele il
  02/10/2026, e resta al caso da cui è nata, il Girarrosto. **Il carosello scorre come un nastro**, chiesto lo
  stesso giorno: ogni taglio fra due slide ha un disegno a cavallo, che si vede intero solo scorrendo. **E il
  contenuto riempie la slide**, ben spaziato e ben posizionato: niente mezze pagine vuote sotto un titolo, detto da
  Emanuele la sera stessa sulle copertine, con **lo stesso spazio sopra e sotto**. Sulle slide **c'è solo il
  contenuto**: niente righe dei dati in alto («Cosa penso · 01», la serie, il tema) e niente firma in fondo. Lo
  script segnala le fasce vuote e i margini che non tornano. **Nei titoli niente punto finale**: il punto resta
  solo nei testi che descrivono, come «Mi racconti la tua attività e cosa ti pesa.»; punti interrogativi e virgole
  restano. Detto da Emanuele lo stesso giorno. Gli esempi sono in `code/caroselli/`.
  Mancano ancora il post singolo, le copertine dei reel e le storie.
- **La struttura dei formati video**, che arriverà da un brain dump dedicato ai contenuti.
- **I file dei caratteri.** Archivo e JetBrains Mono non sono installati sul Mac e non stanno in
  `03 Brand kit` su Drive, dove ci sono ancora Termina Test e Foundry Monoline, scartati. Finora
  non si è visto perché guideline e proposte sono pagine HTML che i font li caricano da sole, ma
  CapCut non li ha. Verificato il 19/09/2026.
- ✅ **La griglia del fondale si vede, dal 25/09/2026**: sul primo carosello le linee sono crema al 5,5%,
  in celle da 72 px, e si accendono solo dove arriva il bagliore. Il bagliore caldo è al 30% al centro e
  sfuma a zero verso il 60% del raggio: è il numero che la regola qui sopra aspettava dalla prima grafica
  vera.
- **La punta bianca da sola, sul telefono, si legge poco**: crema e bianco sono vicini. Sulla
  prima grafica vera si verifica se basta il bianco o se la punta la deve fare anche la
  dimensione. ✅ **Nei video è risolto il 29/09/2026**: sul primo reel il bianco della parola-dato
  non si distingueva dal crema, e la parola chiave ora la fa la passata crema, qui sopra. Sulle
  grafiche ferme resta da verificare.

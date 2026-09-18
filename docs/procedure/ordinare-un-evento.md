---
title: "Procedura — ordinare un evento nuovo"
summary: "Come si sistema il girato di un evento appena scaricato sull'SSD: le sette cartelle fisse, quando si aprono le sottocartelle, cosa si tocca dei nomi e la verifica finale. Serve perché il videomaker consegna le clip alla rinfusa e la ricerca la fa Claude."
tags:
  - docs
  - procedure
  - contenuti
status: attivo
created: 2026-09-16
updated: 2026-09-17
related:
  - "[[docs/procedure/produzione-contenuti]]"
  - "[[docs/procedure/pubblicare-un-post]]"
  - "[[areas/da-mamma-rosaria/reference/reel]]"
---

# Procedura — ordinare un evento nuovo

> Scritta il 16/09/2026. Da qui in avanti ogni evento che riprende il videomaker arriva sull'SSD con le
> clip spoglie, e a sistemarle è Claude. La ragione è pratica: quando Emanuele chiede «prendimi qualcosa
> sul food», la risposta deve essere una cartella, non una ricerca.

## Dove arriva il materiale

Sull'SSD, in `1-eventi/<tipo-evento>-<nome>/`: `battesimo-angela`, `compleanno-maria-rosaria`,
`30-anni-pasquale-boccia`. Minuscolo, parole separate da trattini, il nome della persona per ultimo. È il primo
dei quattro stati di [[docs/procedure/produzione-contenuti|produzione contenuti]]: qui il girato è ancora crudo.

## Le cartelle

Sempre queste, sempre con il numero davanti. **Una cartella che resterebbe vuota non si crea.**

| Cartella | Cosa ci va |
|---|---|
| `01-setup-e-location` | prima che arrivino gli ospiti: insegne, allestimento, tavole apparecchiate, fiori, sale, giardino, la torta esposta |
| `02-cibo-e-servizio` | il cibo e chi lo serve, dal buffet al forno |
| `03-ospiti-e-famiglia` | le persone: arrivi, ritratti, tavolata, brindisi, il taglio della torta, il ballo |
| `04-bambini-e-giochi` | bambini, animazione, gonfiabili, giochi, trucca-bimbi |
| `05-musica-e-intrattenimento` | cantanti, ballerini, dj, spettacoli, fuochi d'artificio |
| `06-dall-alto` | tutto quello che è ripreso col drone |
| `07-foto` | le foto del fotografo, se arrivano insieme alle clip |
| `00-montaggi` | i video già montati consegnati dal videomaker, che non sono materiale grezzo |

**Dentro `02-cibo-e-servizio` si aprono le sottocartelle per angolo** quando l'angolo ha almeno quattro
o cinque clip: `bar-e-cocktail`, `buffet-e-servizio`, `show-cooking`, `forno-a-legna`, `dolci`,
`formaggi-salumi-e-caseificio`, `angoli-a-vista`. Con poche clip si lascia tutto in `02` senza
sottocartelle: una cartella con due file dentro è rumore.

⚠️ **`99-da-smistare` è la valvola di sicurezza.** Le clip che non si capiscono da un fotogramma finiscono
lì, non in una cartella a caso. Se resta piena, si guarda e si smista: vuota vuol dire lavoro finito.

## Cosa non si tocca

**I nomi dei file restano quelli della camera** — `C8194.MP4`, `DJI_20260729192056_0224_D.MP4`. Servono a
risalire alla clip originale e sono l'unico riferimento che il videomaker e noi abbiamo in comune. Le
clip non si rinominano, non si convertono e non si ricomprimono: l'SSD tiene il girato com'è.

## Come si lavora

1. **Un fotogramma per clip.** Si estrae il fotogramma di metà di ogni clip e si montano dei provini a
   griglia: da lì si decide la cartella. Gli script stanno nello scratchpad della sessione
   (`inventario.sh`, `provini.py`).
2. **Si smista in blocco**, con uno script che sposta e scrive un file di manifesto `vecchio → nuovo`:
   se una scelta è sbagliata si torna indietro senza cercare a mano.
3. **Si contano i file prima e dopo.** Il totale deve tornare: nessuna clip persa, nessuna duplicata.
4. **Si aggiornano i riferimenti** nelle note che citano i percorsi: `storie-clip.md` e `pacchetti.md`
   sull'SSD, e i `caption.md` dei contenuti già pubblicati, quelli archiviati come dice
   [[docs/procedure/pubblicare-un-post|pubblicare un post]]. Le storie montate da queste cartelle seguono
   [[areas/da-mamma-rosaria/reference/reel|le regole dei reel]] per musica e colore.

## I momenti girati al volo

> Deciso da Emanuele il 17/09/2026, sulle clip del Braciere.

**Un evento è una serata ripresa dal videomaker, Umberto**, dall'inizio alla fine: quello va in
`1-eventi/<tipo-evento>-<nome>/` con le cartelle numerate. **Un momento è quello che Emanuele gira da solo con
l'iPhone**: scende, riprende una cosa, risale. Non è una serata intera e non prende la struttura di un evento.

I momenti arrivano in `00-SCARICO/iphone/` e, appena lavorati, vanno in **`1-eventi/momenti/<AAAA-MM-GG>-<soggetto>/`**,
per esempio `2026-09-16-il-braciere`: la data davanti, così stanno in ordine, e il soggetto dopo. Niente cartelle
numerate dentro: le clip stanno tutte insieme, perché sono poche e girate per una cosa sola. Il manifesto dello
spostamento va in `1-eventi/_manifesti/`, come per gli eventi.

## Le clip già usate

> Deciso il 17/09/2026: Emanuele vuole vedere dalla cartella quali clip grezze sono già state usate.

**Le clip grezze non si cancellano.** Il 17/09/2026 una storia già montata si è dovuta rifare partendo dagli
originali, per togliere una clip mossa: senza il grezzo non si poteva.

- **Una clip usata in una storia va in `usate/`**, una sottocartella della cartella dove sta: in un evento
  `02-cibo-e-servizio/usate/`, in un momento `2026-09-16-il-braciere/usate/`. Si sposta quando le storie sono
  montate e approvate da Emanuele, anche se non sono ancora uscite: una clip in un pacchetto è già presa.
- **Una clip scartata**, mossa o inutilizzabile, va in `scartate/`.
- **Quello che resta fuori da `usate/` e `scartate/` è girato ancora libero**: è lì che si va a prendere per le
  storie nuove. L'elenco preciso di quale clip sta in quale storia resta in `pacchetti.md` e `storie-clip.md`.
- **`00-SCARICO/` contiene solo quello che non è ancora stato lavorato.** Quando da uno scarico escono le storie,
  lo scarico intero lascia `00-SCARICO`.

⚠️ Gli eventi lavorati prima del 17/09/2026 — i 40 anni, il battesimo di Angela, i 30 anni — hanno ancora le clip
usate mescolate alle libere: lì vale solo l'elenco dei registri, finché non si separano.

## Il colore, che dipende dall'evento

Non tutti gli eventi sono girati allo stesso modo, e si controlla **prima** di montare:

```
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt,color_transfer,color_space -of default=nw=1 <file>
```

- **`bt709` dichiarato**: girato normale. Basta la nitidezza leggera, `cas=strength=0.4`.
- **Profilo e spazio colore «unknown» con 10 bit 4:2:2 e saturazione bassissima**: è girato **log**, e va
  convertito con una LUT prima di qualsiasi altra correzione.

⚠️ **La festa dei 40 anni è girata in S-Log2**, verificato il 16/09/2026: `pix_fmt yuv422p10le`, range
`pc`, saturazione media 10 su 1023 contro 84 di un girato normale. La conversione sta sull'SSD in
`2-libreria/lut/da-slog2-a-rec709.cube` e si applica così, prima della nitidezza:

```
scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,
format=rgb48,lut3d=<percorso>/da-slog2-a-rec709.cube:interp=tetrahedral,
format=yuv420p,cas=strength=0.4
```

La LUT la genera `2-libreria/lut/genera-lut.py`: decodifica S-Log2, porta i primari S-Gamut a Rec.709
calcolando la matrice dai primari, comprime le alte luci, applica la curva Rec.709 e chiude con un po'
di contrasto (1,22) e di saturazione (1,18). **Come si è scelta:** in quelle cartelle ci sono cinque
foto del fotografo, già sviluppate. Si mette il fotogramma convertito accanto alla foto della stessa
scena e si sceglie la versione che le somiglia. Le conversioni S-Log3 sparavano i colori, la S-Log2
neutra era spenta: quella giusta è la via di mezzo.

**Per tutti gli altri eventi basta la nitidezza**, `cas=strength=0.4`, e `0.2` sulle clip di notte,
dove la nitidezza tira fuori il rumore.

## Il drone

Il girato del DJI Mini 4 Pro arriva in `00-SCARICO/DJI` sull'SSD, spesso di più brand insieme. I nomi sono
`DJI_<data e ora>_<numero>_D.MP4`, quindi la data di ripresa sta già nel nome. Si smista così, ed è il metodo
usato il 16/09/2026 su 182 file:

1. **Prima i doppioni.** Un file con lo stesso nome e la stessa dimensione già archiviato dentro un brand va in
   `00-SCARICO/DJI/_doppioni-gia-archiviati`. Non si cancella: lo decide Emanuele.
2. **Il brand dalla posizione.** Nei video il flusso «DJI meta» contiene latitudine e longitudine **in
   radianti**, come double a 9 byte di distanza; nelle foto sta nell'EXIF. ⚠️ **Da solo non basta:** la
   Tenuta decolla a circa 450 metri da Mamma Rosaria, ma Mamma Rosaria e la Masseria decollano dallo stesso
   punto. Il GPS separa la Tenuta, il resto lo decide il fotogramma.
3. **Un provino per giorno di ripresa**, con un fotogramma a metà di ogni clip.
4. **Tutto in `2-libreria/riprese-drone/`**, in ogni brand. Deciso da Emanuele il 16/09/2026: quando serve una
   ripresa dal drone, si va a prenderla in un posto solo. Dentro, una cartella per sessione: le feste col
   nome `AAAA-MM-GG-descrizione`, la location in `location-di-giorno` e `location-di-notte`, le foto in
   `foto-aeree`. ⚠️ **Fa eccezione il drone di un evento che ha già la sua cartella in `1-eventi`**, col girato
   della camera: quello resta in `06-dall-alto` dentro l'evento, perché fa parte di quella serata.
5. **Quello che non appartiene a nessun brand resta in `00-SCARICO/DJI`**, e si chiede: le prove di volo, le
   riprese personali, quello che non si capisce.

Il manifesto dello spostamento sta in `00-SCARICO/DJI/_manifesti/`, come per gli eventi.

## Definizione di fatto

- Ogni clip sta in una cartella numerata, `99-da-smistare` è vuota.
- Il totale dei file prima e dopo è lo stesso.
- Il manifesto dello spostamento è salvato.
- Le note che citavano i vecchi percorsi sono aggiornate.

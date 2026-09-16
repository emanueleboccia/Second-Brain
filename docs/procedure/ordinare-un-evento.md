---
title: "Procedura — ordinare un evento nuovo"
summary: "Come si sistema il girato di un evento appena scaricato sull'SSD: le sette cartelle fisse, quando si aprono le sottocartelle, cosa si tocca dei nomi e la verifica finale. Serve perché il videomaker consegna le clip alla rinfusa e la ricerca la fa Claude."
tags:
  - docs
  - procedure
  - contenuti
status: attivo
created: 2026-09-16
updated: 2026-09-16
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
`30-anni-pasquale-boccia`. Minuscolo, parole separate da trattini, il nome della persona per ultimo.

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
   sull'SSD, e i `caption.md` dei contenuti già pubblicati.

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

## Definizione di fatto

- Ogni clip sta in una cartella numerata, `99-da-smistare` è vuota.
- Il totale dei file prima e dopo è lo stesso.
- Il manifesto dello spostamento è salvato.
- Le note che citavano i vecchi percorsi sono aggiornate.

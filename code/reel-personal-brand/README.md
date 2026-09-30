# Reel del personal brand — il montaggio

> ⚠️ **Prima versione, bocciata nello stile il 29/09/2026.** Nato sul reel del Girarrosto, il primo
> video del profilo. Emanuele l'ha guardato e ha detto: la presa diretta dei Ray-Ban non si usa, è
> una prova, ma le immagini sì; **via il nome con la fase in alto a sinistra**, «è brutto»; **via i
> rettangoli dietro le scritte**; **il finale va rifatto**. Le parole chiave le devono far notare
> il colore e il carattere, alternando quelli del brand. Lo stile qui sotto è quindi quello da non
> rifare: lo script resta buono per tagli, sfumature e audio. Quando uno stile nuovo è approvato,
> le scelte passano in `self/reference/design.md`, alla voce «Fotografia e video».

Monta un reel verticale da clip in soggettiva, coi Ray-Ban o col telefono: tagli, sottotitoli,
etichette e cartello finale li legge da una ricetta JSON. Il girato del primo reel è descritto in
`projects/personal-brand/girato-girarrosto.md`.

## Come si usa

**Non si lanciano da qui**, come gli script di `code/storie-clip/`: creano cartelle pesanti che nel
vault non devono entrare. Si copiano in una cartella di lavoro nello scratchpad della sessione, e lì
servono:

- `font/`: `archivo-latin-wdth-normal.woff2`, `archivo-latin-ext-wdth-normal.woff2`,
  `jetbrains-mono-latin-700-normal.woff2`. Stanno nel progetto del sito,
  `~/Desktop/progetti/eb-site/node_modules/@fontsource-variable/archivo/files/` e
  `@fontsource/jetbrains-mono/files/`. Sul Mac i caratteri non sono installati;
- `ricetta.json`: si parte da `esempio-ricetta-girarrosto.json`;
- per i video con un iPad o un telefono inquadrati, `ipad_traccia.json`, fatto da `traccia_ipad.py`.

Poi `python3 monta.py`: scritte, video fotogramma per fotogramma, audio, e il reel in `out/`. Con
`--grafiche` disegna solo le scritte, da guardare prima di montare. Ci mette circa due minuti per 50
secondi di video, un processo pesante alla volta e a bassa priorità.

## Gli script

| Script | Cosa fa |
|---|---|
| `monta.py` | Il montaggio. Taglia in verticale 1080×1920 a 30 fps con `cx` per spostare il taglio, corregge poco il colore (una curva morbida e +5% di saturazione, niente virate), sovrappone cornice, gancio e sottotitoli, e chiude col cartello finale che entra dal nero. L'audio è la presa diretta: filtro dei bassi, riduzione del rumore, livellamento delle voci e −14 LUFS. In uscita scrive i tag bt709. |
| `grafiche.mjs` | Le scritte come PNG trasparenti, con Chrome senza finestra e i caratteri del brand. Segnala i sottotitoli che finiscono con una o due parole sole sull'ultima riga. |
| `foglio_mask.py` | Sfuma la scrittura a mano su un foglio: trova la carta bianca e fredda, non il marmo beige né la pelle, e la sfoca. Gli evidenziatori restano visibili. |
| `traccia_ipad.py` | Segue lo schermo inquadrato fotogramma per fotogramma con la correlazione di fase, così le bande che sfumano i nomi dei clienti si muovono con la camera. |

## Lo stile della prima versione, bocciato

- **La cornice**: in alto a sinistra `EMANUELE BOCCIA` in Archivo Bold largo e, sotto, la fase in
  monospazio: **PRIMA** in grigio spento, **LA PROVA** in intermedio, **DOPO** in crema. È la regola
  del prima e del dopo di `design.md`, detta con la luce.
- **Il gancio**: Archivo Black largo, maiuscolo, su una banda scura in alto, per i primi tre secondi.
- **I sottotitoli**: Archivo Bold da 54 px, crema su una banda scura, una parola in bianco per
  battuta, i numeri in JetBrains Mono. Stanno dentro la zona che Instagram non copre: larghi al
  massimo 840 px, col bordo basso a 1472 px.
- **Il cartello finale**: il fondale firma con la frase della bio, «Il lavoro che ti pesa non si
  organizza. Si toglie.», e sotto «Tra Napoli e il Vesuvio, di persona».
- **Niente musica** nella prima versione: solo la presa diretta.

## Trappole

- **Una sfocatura che si muove non si interpola su una retta.** Sull'iPad la banda calcolata fra due
  misure a mano scendeva più della camera, e a 44 secondi si leggevano due nomi. Si misura il
  movimento vero con `traccia_ipad.py`, e si controllano da vicino i fotogrammi prima di consegnare.
- **Whisper sbaglia i tempi delle parole sulle clip lunghe**: le mette sui secondi interi. Per i
  tagli si rifà la trascrizione su pezzi corti, uno per battuta, e si guarda l'energia dell'audio:
  la voce di chi porta gli occhiali è forte, quella degli altri è sotto i −30 dB.
- **Con una pagina senza indirizzo, Chrome non carica i caratteri dal disco**: in
  `grafiche.mjs` entrano come dati dentro la pagina.
- **I tag del colore non passano dal codificatore**: nel passaggio finale li scrive
  `h264_metadata`, altrimenti restano «unknown».

## La seconda versione, in Remotion — 29/09/2026

Rifatta lo stesso giorno con le regole nuove, sul modello del reel di synsation_
(`sources/riferimenti/reel-synsation-good-ux.md`): sta in `code/remotion-test/src/pb-girarrosto/`,
composizione `PbGirarrosto`. Gli spezzoni muti e sfumati li prepara
`code/remotion-test/scripts/pb-girarrosto-prepara.py`, che rifà in un file solo la sfumatura del foglio e
quella dell'iPad di questi script. Il testo della voce fuori campo e i tempi stanno in `testo.ts`: sono
stimati finché Emanuele non registra la voce, poi si rifanno dalle parole di whisper.

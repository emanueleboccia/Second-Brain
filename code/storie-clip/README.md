# Storie clip — il montaggio del conto alla rovescia

Gli script con cui il 18/09/2026 sono state montate le cinque storie del meno 8 di Zucche in Masseria.
Salvati il 19/09/2026 dalla cartella temporanea di quella sessione, dove sarebbero spariti al primo
riavvio del Mac: per il meno 9 era già successo, e si erano dovuti ricostruire da capo.

Cosa deve avere ogni storia — la scritta del titolo, i sottotitoli, lo zoom della gag, il logo, la
musica — lo dice la [[areas/la-masseria-di-mezzautunno/MEMORY|memoria della Masseria]], voce del
18/09/2026. Qui c'è solo il come: se i due divergono, vince la memoria.

## Come si usa

**Non si lanciano da qui.** Creano accanto a sé cartelle di fotogrammi e video pesanti, che nel vault
non devono entrare. Si copiano in una cartella di lavoro fuori dal vault, lo scratchpad della sessione,
e lì servono:

- `sdr/` — le clip dell'iPhone convertite in SDR, coi nomi `IMG_<numero>.mov`;
- `font/` — HeroLight Bold, HeroLight Regular e Niconne, dal brand kit della Masseria;
  per Mamma Rosaria ci vanno invece D-DIN, D-DIN Bold e Regular Brush, dal Drive:
  `DA MAMMA ROSARIA/04 Brand kit/03 FONT`;
- `logo-zucche.png` — il logo di Zucche in Masseria, dal brand kit;
- `storie.json` — la ricetta delle storie. Si parte da `esempio-meno-8.json`, che è quella vera del
  meno 8: tagli, titolo, sottotitoli, voci e musica di ogni storia.

La musica la prende dalla libreria dell'SSD, `03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica/`:
**senza SSD collegato il montaggio non parte.**

## Gli script

| Script | Cosa fa |
|---|---|
| `monta.py` | Monta le storie elencate: `python3 monta.py <nome-storia> ...`. Legge la ricetta da `storie.json` ed esce in `storie/`, 1080×1920 a 30 fps, portata a −14 LUFS come il meno 9. Con `logo_y` si sceglie l'altezza del logo: di serie sta in alto, sotto la scritta del titolo va a 860. |
| `testi.py` | La scritta «–N giorni a Zucche in Masseria» e i sottotitoli, come PNG trasparenti. Le misure del titolo sono prese al pixel dal meno 9. |
| `logo_anim.py` | I 52 fotogrammi del logo che entra rimbalzando su base avorio, in `logo/`. |
| `zoom.py` | Lo zoom a colori che segue il volto di chi parla: si stringe fra una frase e l'altra e si riallarga quando serve spazio, con spinte lente in mezzo. Si passano i momenti e gli zoom, e l'altezza a cui deve stare il volto: sotto la scritta del titolo nella prima storia. Nato il 19/09/2026 sul meno 7. |
| `gag.py` e `volti.swift` | Lo zoom in bianco e nero che segue il volto durante la gag. `volti.swift` trova i volti con Vision di macOS (si compila con `swiftc volti.swift -o volti`), `gag.py` rifà i fotogrammi. |
| `battito.py` e `ritmo_lib.py` | Trovano il battito della traccia, così la musica e i tagli partono sul tempo. |
| `finestre.py` | Cerca in ogni traccia i dodici secondi più ritmati. I nomi delle tracce del meno 8 sono scritti dentro. |
| `movimento.py` | Misura quanto si muove la camera in ogni clip, su tutta la durata: `.` ferma, `o` media, `X` mossa. È il controllo chiesto dal correction log il 17/09/2026. |
| `provino.py` e `strisce.py` | I provini a griglia, per guardare le clip e le storie in fila prima di mandarle. |
| `monta_invito.py` | Monta il format **«io e te»**: clip che scorrono, scritta ferma per tutta la durata, musica sola e nessun audio delle clip. Legge una ricetta come `esempio-meno-6-invito.json`, dove ogni clip ha `ss`, `dur` e `cx` — la posizione del taglio orizzontale, che serve alle aeree 4K, di cui in verticale si vede un terzo. Scrive i tag `bt709` in uscita. |
| `testo_invito.py` | La scritta di quel format: «Io e te a» e il nome dell'evento in Niconne in alto, il countdown e la data in basso, due bande di velatura che **lasciano libero il centro**. I due font si allineano sulla **linea di base** calcolata dalle metriche: allineando il bordo dell'inchiostro, «giorni!» scende rispetto a «Mancano 6». |
| `monta_savino.py` | Monta una storia intera a clip di Mamma Rosaria: il nome in apertura che sfuma, le clip a tempo di musica, e dove una clip ha `voce` la musica si abbassa e si sente la presa diretta, alzata di 5 dB. Una clip con `senza_grade` entra com'è, perché è già stata gradata a parte. I fotogrammi di ogni clip si contano sul tempo cumulato: prima ogni clip si allungava di una frazione di fotogramma, e in fondo alla storia l'immagine arrivava 0,19 s dopo la voce. Nato il 21/09/2026 su zio Savino. |
| `finale_zoom.py` | Il finale di zio Savino del 21/09/2026: zoom lento verso chi parla, la battuta che entra un pezzo alla volta sul cielo, senza ombra e nei colori di Mamma Rosaria, e la firma che si disegna sotto l'ultima parola. Lavora sui fotogrammi già estratti e gradati; testo, tempi e centro dello zoom sono scritti dentro, e per un'altra battuta si cambiano lì. |

## Cosa manca

Due passaggi non sono script, ma dal 19/09/2026 hanno un comando scritto:

- **la conversione delle clip dell'iPhone in SDR**, che finiscono in `sdr/`. ⚠️ **Non è un passaggio facoltativo:** saltata il 20/09/2026, ha prodotto un file taggato HDR con dentro dati SDR, e i colori — zucche comprese — uscivano slavati, col giallo del brand virato al bruno. Si controlla `color_transfer` di ogni clip prima di montare. Le clip sono HDR, e si
  convertono col motore di Apple, una alla volta: `avconvert -s IMG_<n>.MOV -p Preset1920x1080 -o
  sdr/IMG_<n>.mov`. Esce H.264 1080×1920 in bt709, verticale, a 60 fps e con l'audio;
- **la trascrizione per i sottotitoli**, con `whisper-cli` e il modello
  `code/remotion-test/whisper.cpp/ggml-large-v3-turbo.bin`: `-l it -ml 1 -sow` dà i tempi parola per
  parola. Sulle clip mute whisper si inventa «Grazie a tutti»: il volume medio sotto i −45 dB vuol
  dire che non parla nessuno. **Una parola che whisper non capisce può essere dialetto o accento:
  si scrive come è stata detta e si chiede a Emanuele prima di montare, mai dopo.** Con Amin il
  19/09 ha sentito «il cavoi cazzetta» dove lui dice «ecco a voi la casetta».

`ritmo.py`, il primo tentativo di analisi delle tracce, è rimasto fuori: com'era scritto non partiva.

# Lo stampo dei caroselli

> ⚠️ **Prima prova, non approvata.** Il 25/09/2026 Emanuele ha guardato il manifesto fatto con questo
> stampo e ha detto «non mi piace tanto». Si rifà: lo script e il controllo dei margini restano buoni,
> la grafica no. Cosa non va non l'ha ancora detto, e va chiesto prima di rimetterci mano.

Fatto il 25/09/2026, per il lancio del 1° ottobre: il piano editoriale di ottobre ha quattro caroselli, e
senza uno stampo ognuno si sarebbe disegnato da capo. Un carosello di sette slide che devono sembrare la
stessa cosa non si fa slide per slide: lo dice `docs/caroselli/coerenza-del-carosello.md`.

I colori, i caratteri e il fondale vengono da `self/reference/design.md`. Se cambiano lì, si cambiano in
`stampo.css`. Le regole su come si scrive un carosello stanno in `docs/caroselli/`.

## Come si fa un carosello nuovo

1. Si crea la cartella `outputs/grafiche/AAAA-MM-GG-nome/` e ci si copia il `carosello.html` di un
   carosello già fatto, per esempio quello del manifesto.
2. Si riscrivono le slide. Ognuna è una `<section class="slide">` da 1080×1350, il 4:5 del feed.
3. Si renderizza:

```
node code/caroselli/renderizza.mjs outputs/grafiche/AAAA-MM-GG-nome/carosello.html
```

Escono `01.png`, `02.png`… accanto all'HTML, più `provino.png` con tutte le slide in fila. Lo script usa
il Chrome installato e il `puppeteer-core` del controllo dei siti. Se un testo esce dal margine lo segnala
col numero della slide: su un telefono sparirebbe oltre il bordo.

## I pezzi

- **La cornice**, uguale su ogni slide: in alto il nome e il contatore `01 / 07`, in basso un'etichetta in
  monospazio che dice il contesto. È la firma sempre nello stesso punto.
- **`fondale`**: la classe che accende il fondale firma, con griglia, bagliore caldo e vignetta. Va sulla
  copertina e sulle slide che mostrano un dato o chi è Emanuele; le altre stanno sul fondo pieno. Dove cade
  il bagliore si sposta con `style="--luce-y: 44%"`.
- **`gigante`**: le parole della copertina, in maiuscolo. Tre-sette parole.
- **`titolo`**, **`sotto`**, **`testo`**: l'affermazione, la riga che la segue, il testo corrente.
- **`prima-dopo`**: due blocchi, il prima in grigio spento e il dopo in crema. Le frasi hanno la classe
  `frase`.
- **`lista`**: tre punti al massimo, numerati in monospazio.
- **`azione`**: la pillola crema dell'ultima slide. Una sola azione.
- **`punta`**: il bianco pieno. Una parola sola per slide.

## Le regole che lo script non controlla

- **Nessuna ultima riga con una o due parole sole**: si lega con `&nbsp;` o si riscrive la frase. È la
  regola del `CLAUDE.md` di radice, e sulle slide si vede anche di più.
- **La slide 2 sta in piedi da sola**, perché Instagram può mostrarla come copertina.
- **La chiusura promette solo quello che il calendario mantiene.** Sul manifesto la prima versione
  diceva «ogni giovedì un lavoro vero», e due giovedì su quattro di ottobre sono altro.
- Gli apostrofi sono quelli tipografici: `l’altro`, non `l'altro`.

## I caroselli fatti

| data | cartella | cosa |
|---|---|---|
| 1 ottobre 2026 | `outputs/grafiche/2026-10-01-manifesto/` | il manifesto, «Prima capisco cosa vendi. Poi lo costruisco» |

## La seconda prova, nello stile del reel — 29/09/2026

Dopo il «non mi piace tanto» del 25/09 Emanuele ha detto cosa non andava: «sono solo muri di testo, non ci sono
immagini, illustrazioni o qualcosa di bello da vedere», e ha dato come modello i caroselli di Arounda
(`sources/riferimenti/caroselli-arounda.md`). La seconda prova usa lo stile che ha approvato per i video: il
fondale firma, il crema, la passata crema sulla parola chiave, niente riquadri, e in più **la versione chiara del
sito**, fondo crema e testo nero con la passata ribaltata, per alternare le due scale nella griglia.

| Script | Cosa fa |
|---|---|
| `esempi-girarrosto.mjs` | Il caso del Girarrosto in sei slide con foto e mockup veri, e le copertine di «Convinzione» e «La domanda». Le immagini le vuole in `img/` accanto a dove si lancia: sono fotogrammi degli spezzoni del reel e i mockup del sito in `~/Desktop/progetti/eb-site/public/lavori/`. «Ci sta, carini», poi Emanuele ha chiesto esempi senza quel materiale. |
| `esempi-da-zero.mjs` | Tre caroselli fatti solo di grafiche: «Cosa penso» sullo strumento generico (scuro), «Cosa penso» sul sito bello che non comunica (chiaro), «Come lavoro» coi sei passi della home e la linea che attraversa le slide (scuro). I testi vengono dalle convinzioni e dalla home approvata. |

Si lanciano da una cartella di lavoro fuori dal vault, con `node <percorso>/esempi-da-zero.mjs`: i PNG escono in
`out/`. I caratteri li prendono da `code/remotion-test/public/pb-girarrosto/font/`, gli stessi del reel.

## Le chiusure non si ripetono — 02/10/2026

La slide di chiusura ha sempre la stessa forma, ma ogni carosello ha la sua frase: in `esempi-da-zero.mjs` la
`chiusura` prende la frase come terzo argomento. Emanuele: la riga della bio scritta su ogni carosello è troppo,
«crea altri slogan». Quelle di adesso: «Prima capisco cosa vendi. Poi lo costruisco.» su «Come lavoro», «Bello non
basta. Deve dire cosa vendi.» sul sito bello, «Non ti serve il gestionale del secolo. Ti serve il tuo.» sullo
strumento generico. La riga della bio resta sul Girarrosto. Lo stesso giorno in «Come lavoro» è entrato il passo 02,
la Proposta, che mancava.

## Il nastro: il disegno continua da una slide all'altra — 02/10/2026

Chiesto da Emanuele: «fai in modo che il carosello abbia quell'effetto continuo tra una slide e l'altra», come i
caroselli di Arounda dove un'immagine attraversa due slide. In `esempi-da-zero.mjs` ogni carosello è ora **un
nastro**, una tela sola larga quanto tutte le slide, che si fotografa una volta intera (`nastro-<nome>.png`) e poi
si taglia in pezzi da 1080. Le coordinate si scrivono nel nastro, con `X(slide, x)`.

- **Ogni taglio ha qualcosa a cavallo**: le funzioni che escono dalla copertina, la finestra che fa tutto, il sito
  bello, i fili che portano il secondo sito all'elenco, la linea dei passi, le schede del primo incontro e di quello
  che resta intestato. Verso la chiusura arriva un filo tratteggiato che diventa la sua riga.
- **Il fondale è uno solo**: un bagliore per slide, la griglia accesa solo lì, e il buio in alto, in basso e ai due
  capi del nastro, mai sui tagli, che altrimenti si vedrebbero.

Le slide nuove stanno sull'SSD nelle cartelle `carosello-*` di `04-PERSONAL-BRAND/3-in-produzione/`; quelle del
29/09 in `v1-29-09/`. Il Girarrosto ha già la sua immagine larga sulla 3 e la 4, e non è stato rifatto.

## Il contenuto riempie la slide — 02/10/2026, sera

Sulle prime versioni a nastro Emanuele ha trovato le copertine mezze vuote: «devi fare sempre in modo che il contenuto
riempia un po' tutta la slide e sia ben spaziato e ben posizionato». Da qui:

- **lo script misura ogni slide** e avvisa quando fra il margine in alto e quello in basso c'è una fascia vuota più
  alta di 200 punti. Un avviso è un buco da riempire, non da accettare;
- **i titoli sono più grandi** e le illustrazioni scendono a riempire: la copertina di «Come lavoro» ha i capitoli in
  grande e la riga della home sotto, quella del sito bello la lista di quello che il sito ha e di quello che gli manca;
- **la chiusura sta al centro** fra la riga dei dati e la firma, e i fili ci arrivano sulla sua riga, misurata a
  pagina composta: `disegnaFili` prende i bordi veri delle cose, anche quando sono ruotate o ingrandite.

## Solo il contenuto, e lo stesso spazio sopra e sotto — 02/10/2026, notte

Detto da Emanuele sulla versione piena: «lo spazio verticale deve essere pari, quello verso il basso e l'alto», e
le scritte piccole in alto, «cosa penso 01» e la numerazione, vanno tolte, come la firma in fondo alla chiusura.
Resta il contenuto del carosello. **La cornice descritta in «I pezzi» qui sopra non si usa più.**

- **I margini si misurano**: `margini` dice per ogni slide quanto spazio c'è sopra e sotto il contenuto, e avvisa
  quando differiscono di più di 40 punti o scendono sotto 90. Le slide di adesso stanno fra 117 e 180.
- **La chiusura si centra da sola** fra il bordo in alto e quello in basso, con la frase a 112 punti, 104 quando
  una riga è lunga come «Prima capisco».

## Niente punto nei titoli — 02/10/2026, notte

«Togli tutti questi punti alla fine delle frasi… nelle headline non ci sta per niente». Il punto resta solo nei testi
che descrivono: i passi di «Come lavoro», la riga sotto la copertina, l'invito della chiusura. Vale anche per i titoli
dentro i siti finti, gli adesivi e le voci degli elenchi.


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

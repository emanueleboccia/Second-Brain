# Firma — il credito nei footer dei siti e dei sistemi

La firma da mettere in fondo ai siti e ai gestionali fatti da Emanuele, costruita il 29/09/2026: una
frase breve, «Costruito da», e accanto il monogramma EB nel cerchio, che gira su se stesso come una
moneta. Tutto insieme è un link a [emanueleboccia.it](https://emanueleboccia.it/). È un blocco solo
da incollare, HTML e CSS, senza JavaScript e senza niente da caricare.

La moneta è quella di [[projects/personal-brand/sito-chi-sono|la pagina Chi sono]] del sito, rifatta
per stare in casa d'altri: lì segue [[self/reference/design|le regole di design]] del personal brand,
qui prende colore e carattere dal sito che la ospita.

## A che punto è

**Approvata da Emanuele il 29/09/2026**, guardata sulla pagina di prova: «va tutto benissimo, anche
la firma». La sera stessa ha chiesto se può cominciare a farla mettere sui progetti online, e la
risposta è sì, con tre cose da sapere.

- **Il link porta a un sito che non c'è ancora.** Il 29/09 `emanueleboccia.it` mostra la pagina di
  parcheggio di Hostinger. Il lancio è giovedì 01/10: una firma messa prima, per due giorni porta lì.
- **Safari e iPhone non sono stati guardati.** Si controllano sul primo sito in cui entra, prima di
  metterla negli altri.
- **Ogni sito vuole il suo sì.** Metterla su un sito online è una scrittura su un servizio esterno:
  si mostra dove va e com'è, e si aspetta l'ok, un sito alla volta. Per il Girarrosto lo decide
  Emanuele, e a Marco non si chiede niente.

Dove andrebbe, per tipo: nei siti in WordPress con `firma.php` nel tema, nei gestionali in Laravel
col parziale e la variante sola in fondo alla barra laterale.

## L'idea

**Le lettere sono tracciati, non testo.** Nel sito il monogramma è scritto in Archivo, e nei siti dei
clienti Archivo non c'è: con un `<text>` ogni sito avrebbe il suo EB. `tracciati.py` prende la E e la
B dal font variabile, all'istanza `wdth` 125 e `wght` 900, e le mette dove le mette il browser:
corpo 16 nel riquadro da 42, spaziatura -.02em, centrate su x = 21, linea di base a y = 27. Anche il
cerchio è un tracciato pieno, così nella moneta c'è un solo colore di riempimento e nessun tratto.
Messi uno accanto all'altro ingranditi venti volte, il monogramma a testo e quello a tracciati
differiscono per lo 0,5% dei pixel, tutti sul bordo.

**Le facce sono due e sono uguali.** Quella dietro è già voltata di mezzo giro: girando si legge
sempre EB, mai il riflesso. A 90 e a 270 gradi la moneta è di taglio e per un istante non si vede,
come nel sito.

**Al passaggio del mouse e al focus da tastiera** la frase lascia il posto al nome, *Emanuele
Boccia*, nella stessa cella: la cella è larga quanto la scritta più lunga, e il footer del cliente
non si sposta. La firma passa da spenta a piena e la moneta fa un giro svelto, che si somma a
quello lento invece di sostituirlo.

## Come si incolla

**In una pagina HTML.** Si copia tutto `firma.html`, tranne la nota in cima, nel punto del footer in
cui deve comparire. Lo stile sta nel blocco.

**In un sito che ha una build.** `firma.css` va fra gli stili del sito, e nel footer si incolla solo
il link, che si fa stampare da `python3 code/firma/componi.py --senza-stile`.

**In WordPress.** `firma.php` va nella cartella del tema. Nel `functions.php`:

```php
require_once get_theme_file_path( 'firma.php' );
```

e nel `footer.php`, dove serve:

```php
<?php eb_firma(); ?>
<?php eb_firma( 'Sito di' ); ?>
<?php eb_firma( 'Sistema di', 'sola' ); ?>
```

Lo stile esce una volta sola per pagina, anche se la funzione viene chiamata due volte.

**In Laravel.** `firma.blade.php` va in `resources/views/partials/`, e dal layout:

```blade
@include('partials.firma')
@include('partials.firma', ['frase' => 'Sistema di', 'variante' => 'sola'])
```

## Frase, variante, misura

**La frase** di suo è «Costruito da». Le altre previste sono «Fatto da», «Sito di» e, nei
gestionali, «Sistema di». In WordPress e in Laravel è il primo parametro. Per l'HTML il blocco con
un'altra frase lo stampa `python3 code/firma/componi.py --frase "Sito di"`.

**Le varianti** sono una classe in più sul link, o il secondo parametro. Si possono sommare.

| Variante | Cosa fa | Dove serve |
|---|---|---|
| nessuna | gira sempre, un giro in 9 secondi | i footer con la firma a destra |
| `firma-eb--quieta` | ferma a riposo, fa un giro solo al passaggio | le pagine dove il movimento disturba |
| `firma-eb--sola` | solo la moneta, senza scritta | il fondo della barra laterale di un gestionale |
| `firma-eb--stretta` | larga quanto la frase; al passaggio il nome esce verso sinistra | i footer centrati |

**Le misure** sono variabili CSS, da dare a un contenitore della firma.

| Variabile | Cosa regola | Di suo |
|---|---|---|
| `--firma-misura` | il lato della moneta | `22px` |
| `--firma-testo` | il corpo della scritta | `12px` |
| `--firma-stacco` | lo spazio fra scritta e moneta | `8px` |
| `--firma-opacita` | quanto è spenta a riposo | `.7` |

## Le regole d'uso

- **Dove.** Nell'ultima riga del footer, dopo le note legali del cliente. Una per pagina. Nei
  gestionali, in fondo alla barra laterale con la variante sola. Mai nella testata e mai accanto al
  logo del cliente.
- **Colore.** Quello del testo del footer, che la firma prende da sé. Non si forza un colore e non si
  portano i colori del personal brand nel sito di un altro.
- **Misura.** La moneta fra 20 e 24 px, la scritta fra 12 e 13. Le lettere sono alte un quarto della
  moneta: sotto i 20 px non si leggono più. Sopra i 24 smette di essere una firma.
- **Contrasto.** A riposo è al 70%. Se il testo del footer è già tenue, `--firma-opacita` si alza
  fino a 1.
- **Posizione.** Con la firma a destra va la normale. Al centro va la stretta, perché nella normale
  la cella tiene il posto al nome e a riposo la frase sembra spostata di una quindicina di pixel. La
  stretta vuole del vuoto prima della frase: allineata a sinistra, il nome uscirebbe dal margine.

## I file

| File | Cosa fa |
|---|---|
| `firma.html` | il blocco da incollare: lo stile stretto e il link |
| `firma.css` | lo stile, commentato: è la fonte da cui si rifanno gli altri |
| `firma.php` | la funzione `eb_firma()` per WordPress |
| `firma.blade.php` | il parziale per Laravel |
| `prova.html` | la pagina di prova: quattro footer, le frasi, le varianti, le misure, la riga a 320 px |
| `componi.py` | rifà `firma.html`, `firma.php` e `firma.blade.php`; stampa il blocco con un'altra frase |
| `tracciati.py` | ricava il monogramma dal font; vuole `fonttools` e `brotli` in un ambiente virtuale fuori dal vault |
| `verifica.cjs` | le prove, con Chrome senza finestra |

## Come si verifica

`node code/firma/verifica.cjs` apre la pagina di prova e fa 48 controlli: a riposo, al passaggio, al
focus, nel footer ostile, con meno movimento, a 320 px, e la moneta voltata confrontata pixel per
pixel con quella di fronte. Le schermate vanno in una cartella temporanea, fuori dal vault.

Per guardarla a mano serve un server sulla cartella, perché la pagina legge `firma.html` al volo:
`python3 -m http.server 4174 --bind 127.0.0.1 --directory code/firma`, e poi
`http://127.0.0.1:4174/prova.html`.

## Le trappole

- ⚠️ **Lo stile sta in quattro file.** Si cambia solo in `firma.css`, poi si lancia `componi.py`.
  Una correzione fatta a mano in uno degli altri tre sparisce al giro dopo.
- ⚠️ **Nel blocco la frase compare due volte**: nella scritta e nell'`aria-label` del link. Chrome
  passa agli screen reader il testo già reso maiuscolo dal CSS, quindi il nome da leggere va scritto
  a parte. Per questo la frase non si corregge a mano nell'HTML.
- ⚠️ **`rel` resta `noopener`.** Con `noreferrer` al sito non arriva da dove viene la visita. Se il
  link si rifà con gli strumenti dell'editor di WordPress, invece di incollare il codice, l'editor
  aggiunge `noreferrer` da solo: si controlla nel sorgente della pagina.
- **Della provenienza arriva solo il dominio**, e solo se il sito del cliente non ha una
  `Referrer-Policy` che lo vieta.
- **WordPress toglie `<style>` e `<svg>`** dal codice incollato da chi non ha il permesso
  `unfiltered_html`. Dal tema, con `firma.php`, il problema non c'è.
- **Un sito con una Content-Security-Policy che vieta gli stili in pagina** ignora lo stile del
  blocco: lì `firma.css` va nella build.
- **La firma si sposta dal suo contenitore, non dal link.** Il link azzera quello che riceve,
  margini compresi, per difendersi dal tema.
- **Contro il tema la difesa non è totale.** Le regole con un `id` davanti sono coperte solo sul
  link, con sette `!important`: colore, sottolineatura, fondo, bordo, ombra, contorno, `display`. Un
  tema che desse misure agli `svg` del footer passando da un `id` vincerebbe.
- **`all: unset` non deve mai arrivare al `path`.** In Chrome `d` è anche una proprietà CSS, e il
  disegno sparirebbe.
- **Il blocco pesa 3,6 KB, e 1,2 compresso, che è come viaggia.** Lo stile da solo ne fa 2,1, difese
  dal tema comprese. Il tracciato è scritto due volte, una per faccia: con `<use>` si scriverebbe una
  volta sola, ma servirebbe un `id`, che in una pagina con due firme si ripete. Compresso, il
  doppione non pesa.
- **È provata solo in Chrome.** In Safari e in Firefox non è stata guardata. La tecnica delle due
  facce è quella della moneta del sito; il giro svelto usa la proprietà `rotate`, che i browser hanno
  dal 2022: dove manca, la moneta gira solo lenta.
- **La nota in cima a `firma.html` non deve contenere tag.** Un `<style>` scritto dentro un commento
  inganna chi estrae il blocco con un'espressione regolare.
- **Chrome senza finestra perde a volte il testo** nelle schermate prese fuori dalla finestra.
  `verifica.cjs` porta ogni elemento nella finestra prima di fotografarlo.

# Mockup dei lavori — le anteprime animate dei siti e dei gestionali

Gli script con cui il 29/09/2026 sono state fatte le anteprime dei lavori di emanueleboccia.it:
quelle dell'elenco, quattro per lavoro, due ferme e due in movimento, come le fa
[eliotbesson.com/works](https://www.eliotbesson.com/works); e quelle delle pagine dei singoli
progetti, sei per lavoro e tutte in movimento. I lavori erano quattro la mattina e sei la sera, quando
sono entrati il gestionale della Masseria e il sito di Da Mamma Rosaria. Salvati dalla cartella
temporanea della sessione, dove sarebbero spariti al primo riavvio.

Perché sono fatte così, cosa mostra ognuna e cosa resta aperto lo dicono
[[projects/personal-brand/sito-progetti|la pagina Progetti]] e
[[projects/personal-brand/sito-casi|le pagine dei singoli progetti]]. Qui c'è solo il come.

## L'idea

Un mockup animato è una scena fatta di schermate vere: finestre e telefoni messi su un fondo del
colore del brand, con la pagina che scorre dentro. **Ogni scena è una funzione del tempo**: per ogni
istante dice dove sta ogni cosa. I fotogrammi si fotografano uno per uno, a 60 al secondo, e ffmpeg
li cuce. Così il movimento è liscio per costruzione, perché nessun fotogramma può mancare.

Una registrazione dello schermo non ci arriva: Chrome senza finestra registra a scatti, e lo scroll
di un sito vero porta con sé banner, barre fisse e immagini che arrivano in ritardo.

## Come si usa

**Non si lancia da qui.** Crea cartelle di schermate e di fotogrammi, centinaia di megabyte, che nel
vault non devono entrare. Si copia tutto in una cartella di lavoro fuori dal vault, e lì:

1. **le schermate.** `cattura-siti.cjs` fotografa a pagina intera i siti pubblici, su desktop e
   telefono; `cattura-2.cjs` rifà i telefoni togliendo le barre fisse e il banner dei cookie;
   `cattura-dmr.cjs` fotografa il gestionale di Mamma Rosaria dalla copia locale, e `cattura-gm.cjs`
   quello della Masseria; `cattura-dmrsito.cjs` il sito di Mamma Rosaria, e `cattura-dmrsito-home.cjs`
   ne rifà la home senza due sezioni. Finiscono in `sorgenti/`, e da lì in JPEG in `web/`;
2. **le scene.** `scene.js` dice, per ogni anteprima, il tipo di scena, il fondo e i punti della
   pagina su cui fermarsi;
3. **la prova.** Un server sulla cartella, `python3 -m http.server 4180 --bind 127.0.0.1`, e poi
   `node rendi.cjs prova`: quattro fotogrammi per scena, da guardare prima di girare. `node sonda.cjs
   <scena>` ne fa dodici a distanze uguali, e fa vedere anche la fine dello scorrimento;
4. **la resa.** `./gira.sh` fa le ferme e poi i video dell'elenco, uno alla volta e con le pause, e li
   mette nel sito, in `public/lavori/<lavoro>/`. `./gira-caso.sh` fa i ventiquattro video delle pagine
   dei progetti, a 1000 px, e li mette in `public/lavori/<lavoro>/caso/` con la loro copertina: venti
   minuti in tutto, sul MacBook. `./gira-nuovi.sh` fa tutte e due le cose per i due lavori della sera,
   in un quarto d'ora.

Puppeteer è quello di `code/controllo-siti/`, Chrome quello del Mac. Servono `ffmpeg` e `cwebp`.

## Gli script

| Script | Cosa fa |
|---|---|
| `motore.js` | i nove tipi di scena e le curve del movimento |
| `scene.js` | le sedici scene dell'elenco: schermate, fondi, punti di arrivo |
| `scene-caso.js` | le ventiquattro scene delle pagine dei progetti; riusa i fondi di `scene.js` |
| `scene-nuovi.js` | le venti scene del gestionale della Masseria e del sito di Mamma Rosaria, elenco e pagina |
| `scena.html` | la tela da 1000 × 1000 su cui si disegna |
| `rendi.cjs` | fotografa: `prova [prefisso]`, `ferme`, `video <nome>` |
| `gira.sh`, `gira-caso.sh`, `gira-nuovi.sh` | la resa completa, con la conversione e la copia nel sito |
| `gira-dmrsito-home.sh` | rigira le sole anteprime che usano la home del sito di Mamma Rosaria |
| `cattura-room84.cjs`, `scene-room84.js`, `gira-room84.sh` | il sito nuovo di Room84, dalla copia sul Mac: schermate, scene e resa |
| `sonda.cjs` | dodici fotogrammi di una scena, per guardarla prima di girarla |
| `cattura-*.cjs` | le schermate di partenza; `cattura-3.cjs` è il giro delle pagine interne, `cattura-gm-2.cjs` le pagine delle campagne |

## I nove tipi di scena

| Tipo | Cosa si vede |
|---|---|
| `finestre` | le pagine del desktop una sopra l'altra: ognuna scorre, poi la camera scende alla successiva |
| `telefoni` | i telefoni in fila: ognuno scorre, poi la camera passa a quello accanto |
| `tocchi` | una tavoletta, e il dito che tocca: a ogni tocco la schermata cambia |
| `pagina` | ferma: la pagina alta, tagliata dal bordo |
| `parete` | ferma: una parete di schermi vista di sbieco |
| `insieme` | ferma: una tavoletta e un telefono davanti |
| `scorrimento` | una finestra sola, o un telefono solo, che scende lungo tutta la pagina fermandosi alle soste |
| `parete-viva` | la parete di schermi vista di sbieco, con le colonne che scorrono una in su e una in giù |
| `insieme-vivo` | la tavoletta e il telefono davanti, con le pagine che scorrono dentro tutti e due |

Tre opzioni valgono per più tipi: `fissa` tiene ferma sopra la pagina la barra laterale di un
gestionale mentre il resto scorre, e `testata` e `piede` fanno lo stesso con le barre di un telefono.

## Le trappole

- ⚠️ **Il gestionale di Mamma Rosaria si fotografa solo da una copia del database fatta apposta**,
  con feste e nomi inventati. `php artisan serve` non passa le variabili d'ambiente al processo figlio
  e mostra il database vero: si serve con `php -S` dalla cartella `public/`. Lo script si ferma se in
  pagina non trova le due feste che esistono solo nella copia.
- ⚠️ **Il gestionale della Masseria vuole la stessa cura, e una in più.** Si serve da una copia del
  database riempita col suo `DemoSeeder`, ma il seeder ha nomi di scuole che sembrano veri e i nomi
  di famiglia fra gli accessi: nella copia vanno cambiati prima di fotografare. Lo script si ferma se
  non trova «Scuola Arcobaleno» e «Scuola La Girandola», che esistono solo lì. Si serve così, dalla
  cartella `public/`: `APP_CONFIG_CACHE=<file che non c'è> DB_CONNECTION=sqlite DB_DATABASE=<copia>
  php -S 127.0.0.1:8012 ../vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php`.
- **In una pagina intera la barra «Salva» finisce a metà foglio**, perché nel gestionale sta incollata
  al fondo dello schermo. Prima di fotografare si toglie, con la fascia della copia di prova e gli
  avvisi delle notifiche e della casella non collegata.
- **Del sito di Mamma Rosaria «La storia» non si fotografa.** Ha i nomi di famiglia, e nel personal
  brand la famiglia non si racconta. ⚠️ **Non fermarsi su una sezione non basta**: la home ne ha una
  che li nomina, e nei primi video, passando, si leggevano. La home si fotografa senza quella sezione
  e senza le recensioni firmate, e lo script si ferma se i nomi in pagina ci sono ancora.
- ⚠️ **Una pagina fotografata fino a un tetto finisce prima della pagina vera.** Il telefono era
  tagliato a 6.000 punti: una sosta più in basso mostrava uno schermo bianco. Il tetto c'era perché
  Chrome regge schermate alte fino a 16.000 punti circa: per una pagina lunga si abbassa la densità,
  da 2 a 1,5, invece di tagliarla. Le soste si scelgono sull'altezza della schermata, non del sito.
- ⚠️ **Un sito pieno di animazioni si fotografa col movimento ridotto.** Quello di Room84 ha sezioni
  che restano ferme mentre si scorre e pezzi che entrano: a pagina intera verrebbe a metà strada.
  Chiedendo meno movimento il sito si mostra fermo e completo, ed è quella la schermata da usare.
- ⚠️ **Nel piede di un sito può esserci il codice fiscale di una persona.** Quello di Room84 lo porta,
  perché l'attività è intestata a una persona: la riga si nasconde prima di fotografare, insieme alle
  recensioni coi nomi degli ospiti e alla cima di «Chi siamo», che nomina i titolari.
- **Sopra i 16.000 punti Chrome ricomincia a disegnare la pagina da capo**: visto sulla home di Room84
  dal telefono, alta 11.800 punti a densità 1,5. A 1,25 ci sta.
- **Un video deve chiudersi su se stesso.** Il primo e l'ultimo fotogramma sono uguali, perché nel
  sito gira in tondo: in fondo alla fila c'è una copia delle prime schermate, ferme al punto di partenza.
- **Le barre fisse di un sito**, in una schermata a pagina intera, finiscono a metà foglio: la testata
  si riporta in cima, il resto si nasconde.
- **L'app ordini del Girarrosto non si registra**: ha la password ed è in uso. Si fotografa stato per
  stato dal Chrome di Emanuele, senza scrivere il nome di un cliente e senza salvare, e alla fine
  l'ordine di prova si svuota.

---
title: "Qinta — il brand"
summary: "L'identità di Qinta come la fissa il brand kit v1 del 21/09/2026: nome, frase e descrittore, come parla, il logo, i colori, il carattere, dove compare il marchio e dove stanno i file."
tags:
  - projects
  - qinta
  - brand
status: attivo
created: 2026-09-26
updated: 2026-09-26
related:
  - "[[projects/autoos/sistema]]"
  - "[[projects/autoos/nome]]"
  - "[[sources/riferimenti/golee-gestionale-sportivo]]"
---

# Qinta — il brand

> Riportato il 26/09/2026 dal brand kit che sta nella cartella del codice, `brand/qinta/`: la prima
> proposta e la versione definitiva, la v1, tutte e due del 21/09. I file restano lì; qui ci sono le regole,
> per scrivere e disegnare per Qinta senza aprire il kit. Cosa fa il prodotto sta in
> [[projects/autoos/sistema|cosa fa il sistema]], come si è arrivati al nome in
> [[projects/autoos/nome|il nome]].

## L'idea

**Controllo in movimento.** Qinta collega veicoli, clienti, prenotazioni, vendite e documenti, e il marchio
deve dire affidabilità e chiarezza, con un'energia misurata. Chi lo compra è il titolare di una
concessionaria o di un autonoleggio con troppe cose in testa, e la promessa è di tenerle tutte in ordine.
Promesse di crescita no: il kit le vieta, finché non si possono dimostrare.

## Nome e frasi

- **Qinta** nei testi, **qinta** minuscolo nel logo. Si pronuncia «quinta».
- **La frase: «La marcia in più per il tuo business.»**
- **Il descrittore: «Il gestionale per concessionarie e autonoleggi.»**
- **Il messaggio di prodotto: «Veicoli, clienti e attività. Tutto sotto controllo.»**
- **La firma in fondo al sito**: «Controllo in movimento.»

## Come parla

Diretta, concreta, competente: verbi utili e messaggi brevi. Gli esempi del kit sono «La tua giornata,
sotto controllo.», «Dal primo contatto alla consegna.» e «Meno passaggi. Più chiarezza.». Nel prodotto i
bottoni dicono cosa fanno: «Aggiungi veicolo», «Nuova prenotazione», «Apri pratica».

**Il tema dell'auto sta nella comunicazione, non negli strumenti.** La marcia in più va bene in uno
slogan; dentro il gestionale Clienti, Veicoli e Prenotazioni si chiamano così.

Il testo più lungo scritto finora in questa voce è il sito del prodotto, descritto in
[[projects/autoos/sistema|cosa fa il sistema]]: «La tua attività, sotto controllo.», «Dal primo "ciao"
alle chiavi in mano.», «Ti suona familiare?». Il modello per raccontare un gestionale di settore resta
[[sources/riferimenti/golee-gestionale-sportivo|Golee]]: prima il problema di chi ci lavora, poi il
software che lo toglie.

**Da evitare**, nelle immagini: sagome di auto, ingranaggi, volanti, bandiere a scacchi, l'estetica da
corsa. Nelle parole: le promesse di crescita che non si possono dimostrare.

## Il logo

Un lettering geometrico disegnato apposta, non un carattere scritto. La **q è aperta, con un taglio
diagonale**: il tratto finale esce dal cerchio come una traiettoria, senza freccia. La stessa q, da sola, è
il simbolo e l'icona dell'app.

- **Una tinta sola**: grafite su fondo chiaro, avorio su fondo scuro, il simbolo grafite su arancio.
- **Non si deforma, non si ruota, non si ombreggia, non si ricolora a pezzi.** Niente sfumature e niente
  3D: deve reggere in bianco e nero.
- **Attorno, un'area libera** larga quanto lo spessore del tratto della q, circa il 5,5% della larghezza
  del logo.
- **Le misure minime**: il logo 96 px o 25 mm di larghezza, il simbolo 24 px o 6 mm. Sotto si usa il
  favicon.

## I colori

| Ruolo | Colore | HEX |
|---|---|---|
| Struttura e testo | Grafite | #202421 |
| Fondo di marca | Avorio | #F5F3ED |
| Azione e accento | Arancio | #FF6B35 |
| Testo secondario su avorio | Neutro | #60665E |

**Grafite e avorio fanno quasi tutto; l'arancio segna un punto d'azione**, un bottone o il simbolo, e non
colora il gestionale. **Sull'arancio si scrive in grafite, mai in chiaro**: avorio su arancio ha un
contrasto di 2,56 a 1, grafite su arancio di 5,54. L'arancio non prende il posto dei colori di errore e di
successo, e lo stato di una cosa non si dice col solo colore.

I valori sono per lo schermo: per la stampa non ci sono CMYK o Pantone, e la resa va provata sul supporto.
Il kit ha anche la versione scura dei colori dell'interfaccia, in `qinta-tokens.css`.

## Il carattere

**Manrope**, uno solo per la comunicazione e per il prodotto: 400 per i testi, 500 per le etichette, 600
per i titoli dell'interfaccia, 700 per la comunicazione di marca. Nelle tabelle coi soldi le cifre sono
tabulari, tutte larghe uguali. È gratuito, con la licenza SIL OFL, che va tenuta accanto al file quando lo
si distribuisce.

## Dove compare il marchio

- **Qinta** è il prodotto, la comunicazione commerciale e l'hub.
- **Nel gestionale del cliente** c'è il marchio Qinta, ma il nome dell'azienda che ci lavora resta sempre
  in vista. È applicato ai pannelli dal 21/09.
- **Nel sito del cliente comanda il marchio del cliente.** La firma Qinta non si aggiunge da sola: metterla
  è una scelta commerciale. La demo di Autonazionale la porta in fondo: «Powered by qinta».
- **Santa Maria Cars** è l'esempio di cliente usato nei materiali del kit.

## I file

Tutto in `~/Documents/ChatGPT/gestionale auto/brand/qinta/`.

| File | Cos'è |
|---|---|
| `v1/output/pdf/Qinta-Brand-Guidelines-v1.pdf` | la guida, sei pagine |
| `v1/brand-guide.html` | la stessa guida, da aprire nel browser |
| `v1/svg/` | logo e simbolo in grafite, avorio, arancio, nero e bianco: `qinta-logo-graphite.svg` va su chiaro, `qinta-logo-ivory.svg` su scuro |
| `v1/png/` | le icone da 16 a 1024 px, il logo grande e la tavola di presentazione |
| `v1/qinta-tokens.css` | i colori come variabili, anche per il tema scuro |
| `Qinta-Brand-Kit-v1.zip` | tutto il kit in un file solo, da mandare |
| `creative-direction.md`, `qinta-brand-board-v1.png` | la prima proposta, superata dalla v1 |

Il kit l'ha fatto un agente il 21/09: la tavola della prima proposta è un'immagine generata, gli SVG della
v1 sono ridisegnati in tracciati e non ricalcati dai pixel.

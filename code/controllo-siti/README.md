# Controllo di siti e gestionali

Chiesto da Emanuele il 24/09/2026: «un checker dei siti web e gestionali sarebbe molto comodo, se trova
eventuali errori». Apre ogni indirizzo con il Google Chrome installato, senza account e senza cookie, come
lo aprirebbe un cliente, e dice cosa non va. Legge e basta: non scrive su nessun servizio.

## Cosa guarda

- se il sito **risponde**, e con che codice: un 500 è il server rotto, un 404 una pagina che non c'è;
- il **certificato**: scaduto, non valido, o in scadenza entro quattordici giorni;
- la pagina **quasi vuota**, e le frasi con cui un sito rotto si presenta: l'errore di database di
  WordPress, l'«errore critico», la manutenzione rimasta appesa, l'hosting sospeso, il dominio scaduto;
- se ci mette **più di dieci secondi** ad aprirsi;
- le richieste al server finite in errore;
- sui **gestionali**, anche gli errori del codice nella pagina. Sui siti quegli errori si annotano senza
  dare l'allarme: di solito sono script esterni, e il visitatore non li vede.

Esiti: **ok**, **da guardare**, **non risponde**.

## Come si lancia

Lo lancia il briefing del mattino, al punto 3-ter della skill journal. La lista la prende da Notion, dalle
viste «Da controllare» di *Siti Clienti* e di *Gestionali*, campo *Indirizzo*: gli indirizzi stanno lì, non
qui. A mano:

```
node code/controllo-siti/controlla.mjs lista.json esito.json
```

con la lista fatta così: `[{"nome": "Da Mamma Rosaria", "url": "damammarosaria.it", "tipo": "sito"}]`.
Se manca `node_modules`, prima `npm install` dentro questa cartella. Un indirizzo ripetuto si controlla
una volta sola. Dal 25/09/2026 l'app del Girarrosto ha un indirizzo suo, `libertigirarrosto.it/ordini/`, e si
controlla a parte dal sito: prima aveva lo stesso, e il controllo apriva solo il sito.

Il 24/09/2026 dieci indirizzi hanno chiesto ventitré secondi, uno alla volta per non pesare sul Mac, e
sono usciti tutti a posto. Provato anche su un dominio inesistente, una pagina 404 e un certificato scaduto:
li ha riconosciuti tutti e tre.

## Perché non è un agente di Notion

Era il nove della lista degli agenti. Un agente di Notion legge le pagine come testo: un gestionale,
che è un programma, gli sembrerebbe vuoto anche quando funziona, e ogni giro costerebbe crediti. Questo
apre le pagine davvero, gira gratis, e lo fa ogni mattina invece che una volta a settimana.

## Il giro prima di un lancio

`giro.mjs`, scritto il 30/09/2026 per emanueleboccia.it. Non guarda se un sito è vivo: guarda se è pronto.
Si lancia sul sito compilato, prima di metterlo online, e passa ogni pagina della mappa del sito a nove
larghezze, dallo schermo grande al telefono da 320 pixel:

```
node code/controllo-siti/giro.mjs http://localhost:4173 /tmp/giro
```

Segnala le pagine più larghe dello schermo, gli errori in console, i file e i link rotti, i titoli e le
descrizioni troppo lunghe per Google, e le righe che finiscono con una o due parole. Il primo giro su
emanueleboccia.it ha trovato due pagine che uscivano di lato e un errore di codice che nessuno vedeva. Un
giro intero sono circa dodici minuti: si lancia in background, e ne va uno alla volta.

Dal 01/10/2026 legge anche le mappe di WordPress, che a `/sitemap.xml` rispondono con un indice di altre mappe, e
prende un terzo argomento per controllare un ramo solo: `node giro.mjs https://emanueleboccia.it /tmp/giro /blog/`.
Il pareggio delle righe, l'ultima almeno al 45% della più lunga, vale per i titoli fino a quattro righe: un paragrafo
lungo scritto col carattere dei titoli, come le frasi dell'odissea di Chi sono, si giudica da paragrafo.

## Lo scroll sul telefono

`fluidita.mjs`, scritto il 01/10/2026 dopo «su mobile non è tanto fluido». Fa il telefono, 390 pixel col dito e il
processore rallentato di quattro volte, scorre ogni pagina coi gesti veri del browser e dice per pagina:

```
node code/controllo-siti/fluidita.mjs https://emanueleboccia.it /tmp/fluidita 4
```

- **chi ascolta il dito senza `passive`**: un ascoltatore così obbliga il telefono ad aspettare JavaScript prima di
  muovere la pagina. Su emanueleboccia.it era Lenis, che sul telefono non serviva a niente; la lista deve essere vuota;
- **cosa resta invisibile** a pagina scorsa tutta: un'animazione d'ingresso che non è partita. Le anteprime video
  che sul telefono restano foto escono qui, ed è voluto;
- i blocchi del processore oltre i 50 ms, gli spostamenti della pagina, gli errori.

⚠️ **I fotogrammi al secondo non sono affidabili.** Su Chrome senza finestra lo scroll lo fa la scheda grafica, e il
conto dei fotogrammi segue lo stato del Mac più che il sito: il 01/10 la stessa pagina ha dato 60 fps e un'ora dopo 30
fissi il pomeriggio. Per sapere quanto lavora una pagina mentre scorre serve una traccia di Chrome, con il tempo del
processore, i livelli grafici e quante volte si ridipingono: è quella che ha trovato i 69 livelli inutili della home e il
triangolo che la ridipingeva sempre. Il giudizio finale lo dà il telefono vero. Come per il giro, una prova alla volta:
due Chrome insieme dimezzano i numeri di tutti e due.

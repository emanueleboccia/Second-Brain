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

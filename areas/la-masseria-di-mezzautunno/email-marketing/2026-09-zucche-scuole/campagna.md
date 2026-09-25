---
title: "Email alle scuole — Zucche in Masseria 2026"
summary: "La prima campagna email della Masseria: la proposta per le scuole di Zucche in Masseria a cento scuole dell'infanzia entro tredici chilometri da Poggiomarino, da una Gmail nuova, venti al giorno partendo dalle più vicine."
tags:
  - areas
  - brand/la-masseria-di-mezzautunno
  - email-marketing
  - scuole
status: in-lavorazione
created: 2026-09-17
updated: 2026-09-24
related:
  - "[[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference]]"
  - "[[areas/la-masseria-di-mezzautunno/reference/target]]"
  - "[[areas/la-masseria-di-mezzautunno/reference/tono]]"
  - "[[areas/la-masseria-di-mezzautunno/MEMORY]]"
---

# Email alle scuole — Zucche in Masseria 2026

> Partita il 17/09/2026. In questa cartella: il testo esatto in `email.txt`, ogni invio segnato in
> `invii.csv`. La lista delle scuole è `../scuole.csv`, e serve anche alle campagne che verranno.

## Cosa si manda

La proposta per le scuole di [[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference|Zucche in Masseria]]:
un'email di testo semplice che annuncia il progetto, ricorda il sold out dell'anno scorso e invita a
scaricare la brochure allegata. **Niente prezzi e niente link nel testo**: i prezzi stanno nella brochure.
Lo ha deciso Emanuele il 17/09/2026, dopo aver visto la prima versione, che li aveva. In firma ci sono
l'indirizzo, il sito e @lamasseriadimezzautunno.

L'allegato è la versione leggera del PDF, 3,2 MB invece di 5,7, identica a schermo. Sta sull'SSD in
`03-LA-MASSERIA-DI-MEZZ'AUTUNNO/3-in-produzione/brochure-scuole-zucche/email/`: **senza SSD collegato lo
script non parte.**

Il testo parla a Maestra Teresa del [[areas/la-masseria-di-mezzautunno/reference/target|target]], col
voi del [[areas/la-masseria-di-mezzautunno/reference/tono|tono di voce]] per le scuole. Si chiude con la
riga per chi non vuole ricevere altro.

## A chi

> **Dal 24/09/2026 `scuole.csv` è un'altra lista**: [[areas/la-masseria-di-mezzautunno/email-marketing/scuole|la lista
> delle scuole]] rifatta sull'elenco del Ministero, con le primarie e fino a 20 km. I numeri di questa sezione
> raccontano quella di settembre. Rilanciare lo script su questa cartella manderebbe la proposta ai
> **251 indirizzi nuovi**: gli altri li salta, perché stanno già in `invii.csv`.

La lista viene dall'Excel di Emanuele: **213 plessi**, 130 scuole dell'infanzia statali, 82 paritarie e
la direzione didattica di Poggiomarino, tutti entro 13 km, fra le province di Napoli e Salerno. Le
email vanno a **100 indirizzi**, uno solo quando più plessi dello stesso istituto condividono la casella.

Restano fuori, e in `scuole.csv` lo dice la colonna `email_utilizzabile`:

- **31 plessi senza email**. Hanno il telefono, e si possono chiamare.
- **12 indirizzi personali**, con nome e cognome, su 13 plessi paritari. Esclusi il 17/09 per prudenza:
  per il Garante della privacy le email promozionali senza consenso a una persona sono il caso più a
  rischio.
- **1 indirizzo con un dominio che non riceve posta**. La stessa scuola ha anche una Gmail, che resta.

## Da dove parte

Da **lamasseriadimezzautunno@gmail.com**, collegata a Composio il 17/09/2026. Quel giorno la casella aveva
in tutto 6 messaggi: per Google è un account nuovo, e un account nuovo che manda cento email di fila
finisce in spam, o viene bloccato. Da qui il ritmo.

## Come si manda

**Venti al giorno di scuola, la mattina, dalla più vicina a Poggiomarino alla più lontana**, con due o tre
minuti di pausa fra un'email e l'altra. Prima del primo gruppo, una prova a mail-tester e alla Gmail
di Emanuele.

Lo fa `code/email-marketing/invia-gruppo.py`, dalla radice del vault:

```
python3 code/email-marketing/invia-gruppo.py areas/la-masseria-di-mezzautunno/email-marketing/2026-09-zucche-scuole --anteprima
python3 code/email-marketing/invia-gruppo.py areas/la-masseria-di-mezzautunno/email-marketing/2026-09-zucche-scuole --quanti 20
```

Ogni gruppo riparte da dove si era fermato il precedente, perché salta gli indirizzi già segnati come
`inviata` nel registro. Nel testo `{grado}` diventa «dell'infanzia», oppure «dell'infanzia e primaria»
quando fra i plessi di quell'indirizzo c'è una primaria. Dal 24/09, con le primarie nella lista, diventa
«primaria» per chi ha solo quella.

## Andamento

| data | gruppo | inviate | note |
|---|---|---|---|
| 17/09 | prova | 2 | 10/10 su mail-tester; nella Gmail di Emanuele arriva in Principale |
| 17/09 | primo | 1 | partita col testo vecchio, coi prezzi e il link al video, a La Scuola di Alice di Poggiomarino: invio fermato per cambiare il testo |
| 17/09 | prova | 1 | testo nuovo, arriva in Principale |
| 17/09 | primo | 19 | dalle 15:08 alle 15:58, nessun errore di invio |
| 18/09 | secondo | 19 | dalle 12:50 alle 13:35; alle 13:38 l'SSD si è scollegato e due invii sono falliti senza partire |
| 18/09 | secondo e terzo | 15 | dalle 14:16 alle 14:54, compresi i due falliti; fermato da Emanuele alle 14:54 |
| 19/09 | terzo e quarto | 20 | dalle 9:41 alle 10:32, nessun errore di invio e nessun rimbalzo al controllo delle 10:34. Di sabato, su richiesta di Emanuele: il 18/09 si era deciso di aspettare lunedì |
| 21/09 | quinto | 21 | dalle 9:53 alle 10:40, a 20 scuole: una l'ha ricevuta due volte, vedi sotto. Interrotto dopo l'invio delle 10:17 dal riavvio della sessione di Claude, fermo nella pausa fra due email, e ripreso alle 10:19. Nessun rimbalzo al controllo delle 10:50 |
| 21/09 | sesto, l'ultimo | 6 | dalle 10:52 alle 11:06, anticipato da martedì su richiesta di Emanuele: con questo la lista è finita |

**Il primo giorno: 20 inviate, 17 arrivate.** Tre indirizzi non esistono più: La Scuola di Alice a
Poggiomarino, la direttrice delle Figlie di Maria Ausiliatrice e Fantasyland, tutte e due a Terzigno.
Erano indirizzi privati, su libero.it, alice.it e sul dominio delle suore; le caselle del Ministero sono
arrivate tutte. Nessun rimbalzo per spam. L'email col testo vecchio è una delle tre: non l'ha ricevuta
nessuno. In `scuole.csv` i tre indirizzi sono segnati come inesistenti, e lo script salta anche le
rimbalzate.

**Il 18/09 un rimbalzo, trovato solo il 19/09.** La scuola Principe di Piemonte di San Valentino Torio,
su alice.it: il server risponde che l'utente non esiste. Nel registro era rimasta `inviata`, ora è
`rimbalzata`, e in `scuole.csv` è segnata come inesistente. **Dopo il 19/09 restano 26 scuole.**

**Il 21/09 una scuola ha ricevuto l'email due volte.** L'invio lanciato dal terminale e quello lanciato da
Claude sono girati insieme per due minuti, e il Plesso Buonconsiglio di Sant'Antonio Abate ha avuto la stessa
email alle 9:53 e alle 9:55. Da quel giorno `invia-gruppo.py` ha un lucchetto e rilegge il registro prima di
ogni email; l'errore sta nel [[correction|correction log]].

**Tre consegne in ritardo, tutte su caselle Libero e 191.it.** San Francesco d'Assisi di Scafati e La Valle
Incantata di Sarno, mandate il 18/09, e Mondobaby di Angri, mandata il 19/09: il 19 e il 20/09 Gmail ha
avvisato che la consegna non è ancora riuscita e che riprova. Nel registro restano `inviata` finché non arriva
un rimbalzo vero.

**Il 21/09 la campagna email è finita**: tutti gli indirizzi utilizzabili di `scuole.csv` hanno ricevuto
l'email. Il passo che resta è il telefono: le scuole vicine che non hanno risposto, e i 31 plessi senza email.

**Il primo giro si chiude qui**, deciso da Emanuele il 21/09/2026: dei 213 plessi del file ne sono stati raggiunti
164, su 96 indirizzi. Più avanti si proverà a cercare online gli indirizzi che mancano.

## Dopo l'invio

- **Chi risponde di non voler ricevere altro** esce dalla lista: in `scuole.csv` la sua riga prende
  `no: ha chiesto di non ricevere email`, così nessuna campagna futura gli riscrive.
- **Le scuole vicine che non hanno risposto si richiamano** dopo qualche giorno: il telefono è nella
  lista. Recupera anche chi l'email l'ha trovata in spam.
- **Le prenotazioni** che arrivano si segnano nella [[areas/la-masseria-di-mezzautunno/MEMORY|memoria della Masseria]],
  con la scuola e la data, per sapere cosa ha reso la campagna.

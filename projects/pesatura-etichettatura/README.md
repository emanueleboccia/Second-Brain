# Pesatura ed etichettatura — scheletro

Prova di fattibilità del sistema descritto in `sources/Analisi_Requisiti_Pesatura.docx`,
scritto da Antonio Carola il 09/09/2026. **Non è il prodotto: è la dimostrazione che il
meccanismo funziona**, e serve a misurare quanto lavoro è davvero prima di dare un prezzo.

Gira col Python di sistema del Mac. Niente da installare.

## Come si accende

Due terminali.

```bash
cd projects/pesatura-etichettatura
python3 bilancia_finta.py
```

```bash
cd projects/pesatura-etichettatura
python3 server.py
```

Poi si aprono:

- **http://127.0.0.1:8080** — la postazione in reparto
- **http://127.0.0.1:8080/admin** — l'ufficio: articoli e storico

La bilancia finta ripete da sola un ciclo: piatto vuoto, oggetto appoggiato, peso che si
assesta, peso fermo, oggetto tolto. Serve a vedere funzionare anche il blocco anti-ristampa
senza avere niente sul tavolo.

## Cosa c'è dentro

| File | Cosa fa |
|---|---|
| `bilancia_finta.py` | finge una bilancia di rete: le chiedi il peso, risponde con una riga di testo |
| `server.py` | il programma vero: interroga la bilancia, serve le pagine, riempie l'etichetta e la stampa |
| `schema.sql` | le tre tabelle dell'analisi, coi nomi di Antonio |
| `static/operatore.html` | la schermata del touch in reparto |
| `static/admin.html` | la pagina dell'ufficio |
| `etichette/standard.txt` | il modello dell'etichetta, coi segnaposto fra parentesi quadre |
| `stampe/` | dove finiscono le etichette quando non c'è una stampante attaccata |
| `pesatura.db` | il database, si crea da solo al primo avvio |

## Cosa è già dimostrato

- **Peso dal vivo**, quattro letture al secondo, con il segnale di fermo o in assestamento
- **Tara automatica** presa dalla scheda dell'articolo, e netto calcolato
- **Scadenza calcolata** dai giorni di durata, modificabile a mano
- **Stampa** con sostituzione dei segnaposto e invio alla stampante di rete, o su file se non c'è
- **Blocco anti-ristampa**: dopo una stampa non se ne fa un'altra finché il piatto non torna a zero
- **Stampa automatica** accendibile e spegnibile, come voleva Antonio
- **Storico pesate** scritto a ogni etichetta
- **Cambio schermata automatico** quando si appoggia il prodotto: idea di Antonio nella call del 09/09
- **Bilancia scollegata** segnalata senza bloccare il resto

## Cosa manca, ed è il lavoro vero

- Le maschere di modifica di articoli, ingredienti, allergeni e modelli etichetta
- Login operatore con password
- Più bilance in parallelo (l'architettura c'è, la gestione no)
- Modalità chiosco su Windows e avvio automatico all'accensione
- Il modello etichetta vero in TPCL, che prepara Antonio col software Toshiba
- **Il collegamento alla bilancia vera**

## Il punto che cambia con l'hardware vero

Uno solo: il metodo `LettoreBilancia._interpreta` in `server.py`, che da

```
ST,GS,+  1.240,kg
```

tira fuori `(1.240, True)`. Ogni costruttore scrive quella riga a modo suo, e il manuale
dice come. Cambia quella funzione e il comando in `CONF["bilancia_comando"]`, e il resto
del programma non se ne accorge.

**È lì che sta tutto il rischio del progetto, ed è una funzione di quindici righe.**

## Da sapere

- I dati degli articoli sono inventati, servono solo per provare
- Non c'è nessuna gestione di metrologia legale: se il peso finisce su un prezzo al
  consumatore, quello è un capitolo a parte e va affrontato prima di vendere
- Le etichette portano allergeni e scadenze. Il programma stampa fedelmente quello che
  trova in anagrafica; **chi mette i dati in anagrafica se ne prende la responsabilità**,
  e va scritto nel contratto

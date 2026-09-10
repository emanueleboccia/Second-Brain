# Specifica — Sistema di pesatura ed etichettatura, Fase 1

Documento di lavoro per l'implementazione. Nasce dall'analisi dei requisiti scritta da
Antonio Carola il 09/09/2026 e dalle decisioni prese nella call dello stesso giorno.

**Le decisioni in questo documento sono già prese. Non vanno rimesse in discussione:
vanno implementate.** Dove qualcosa è ancora ignoto è scritto esplicitamente, insieme a
come va isolato.

---

## 1. Contesto

Stabilimento di trasformazione carni che produce preparati per pub: lotti piccoli,
imbustamenti piccoli, poche decine di articoli a catalogo.

Oggi pesano ed etichettano senza un sistema. Serve una postazione dove un operatore
sceglie il prodotto, lo appoggia su una bilancia, e ottiene un'etichetta conforme con
peso netto, lotto, scadenza, ingredienti e allergeni.

**Il sistema è locale e non dipende da internet.** Se salta la linea, la produzione
continua. Nessun cloud, nessun servizio esterno.

---

## 2. Architettura

Tre apparecchi sulla stessa rete Ethernet locale.

```
   ┌──────────────────────────┐
   │  PANEL PC  (Windows)     │   ← touch screen in reparto
   │  ┌────────────────────┐  │
   │  │ applicazione       │  │   un solo processo:
   │  │ + database locale  │  │   - interroga la bilancia
   │  │ + server web       │  │   - serve le due pagine
   │  └────────────────────┘  │   - compone e manda l'etichetta
   └────┬──────────────┬──────┘
        │ TCP          │ TCP :9100
        ▼              ▼
   ┌─────────┐   ┌──────────────┐        ┌─────────────────┐
   │BILANCIA │   │  STAMPANTE   │        │ PC UFFICIO      │
   │(muta)   │   │  Toshiba     │        │ browser → IP    │
   └─────────┘   └──────────────┘        └─────────────────┘
```

**Il Panel PC è anche il server.** Non esiste una seconda macchina.

**L'applicazione è una web application locale.** L'analisi richiede già un server web per
il back-office: di conseguenza anche la schermata dell'operatore è una pagina servita da
quel server e aperta in modalità chiosco sul Panel PC. Un solo processo, un solo codice,
due pagine.

---

## 3. Vincoli tecnologici

| Vincolo | Valore | Stato |
|---|---|---|
| Sistema operativo | **Windows** | deciso, Android escluso |
| Linguaggio e stack | **libero** | deciso da Antonio: «sviluppa con quello che preferisci» |
| Interfaccia | HTML/CSS/JS servito in locale | deciso |
| Database | file locale, poche decine di articoli | deciso |
| Rete | Ethernet locale, IP statici | deciso |
| Cloud | **nessuno** | deciso |

Il Panel PC in futuro dovrà poter parlare anche con dispositivi seriali: la scelta dello
stack non deve precludere l'accesso alle porte seriali.

---

## 4. Flusso operatore

Tre passi, pensati per essere usati **con i guanti, con le mani umide, di fretta**.
Alto contrasto, bersagli grandi, nessun testo piccolo.

### Passo 1 — Scelta articolo
Griglia visiva di riquadri grandi, uno per articolo, più una ricerca rapida.
Al tocco il sistema carica dall'anagrafica: ingredienti, giorni di scadenza, tara,
prezzo al kg, modello di etichetta, prefisso EAN.

### Passo 2 — Variabili di processo
Tre campi, tutti precompilati e tutti modificabili:
- **Lotto** — proposto di default dalla data odierna, modificabile
- **Scadenza** — calcolata come oggi + giorni di shelf-life dell'articolo, modificabile
  toccando il campo
- **Operatore** — chi sta lavorando

### Passo 3 — Pesatura e stampa
- **Peso netto in grande**, al centro, aggiornato in tempo reale
- Sotto, più piccoli: peso lordo e tara applicata
- Stato del peso a parole: *appoggia il prodotto* / *in assestamento* / *peso fermo*
- Bottone **Stampa**, grande

**Comportamento aggiuntivo richiesto da Antonio:** se l'operatore appoggia un prodotto
sulla bilancia mentre si trova su un'altra schermata, il sistema passa da solo alla
schermata di pesatura. Le altre schermate restano raggiungibili.

---

## 5. La bilancia

### Come funziona
La bilancia è **muta e senza display**. L'operatore non la tocca mai e non ci legge
niente sopra: tutta l'interazione passa dal Panel PC. Non esiste tara fisica sulla
bilancia, non esiste tasto zero sulla bilancia.

**Protocollo: TCP, a domanda e risposta.** Il software apre una connessione, manda un
comando, riceve una riga di testo col peso corrente. Si interroga **4 volte al secondo**.

Esempio di riga di risposta (formato di riferimento, non definitivo):

```
ST,GS,+  1.240,kg
 │  │      │
 │  │      └── peso
 │  └───────── GS = lordo
 └──────────── ST = fermo · US = in assestamento
```

### ⚠️ Il punto ignoto, e come va isolato

**Al 09/09/2026 non si conoscono ancora marca, modello e protocollo esatto della
bilancia.** Antonio li fornirà. Se la bilancia esistente non è utilizzabile, il cliente
ne acquista una nuova con l'interfaccia richiesta.

**Requisito di progetto, obbligatorio:** tutta la conoscenza del protocollo deve stare
dentro **un solo componente sostituibile** — un driver con un'interfaccia minima:

```
interfaccia DriverBilancia:
    connetti()
    leggi() -> (peso_kg: float, fermo: bool)
    disconnetti()
```

Devono esistere almeno due implementazioni: una che parla con un **simulatore** (per
sviluppare e provare senza hardware) e una per la **bilancia reale**. Il resto del
sistema non deve sapere quale delle due è in uso.

Cambiare bilancia deve costare la riscrittura di quel solo componente.

### Se il segnale di stabilità non esiste
Non è ancora confermato che la bilancia esponga il flag di peso fermo sulla rete.
Il driver deve poterlo **derivare**: se il valore letto resta invariato entro una
tolleranza per N letture consecutive, il peso si considera fermo. Tolleranza e N
configurabili.

### Tara
**Interamente lato software.** La tara di default arriva dalla scheda dell'articolo
(peso della vaschetta in grammi). L'operatore deve poter forzare una tara manuale
acquisendola dal piatto in quel momento, con un tasto a schermo.

Netto = lordo − tara. Mai negativo.

---

## 6. La stampa

### Trasporto
Il testo del comando si manda **direttamente alla stampante via TCP sulla porta 9100**,
in linguaggio nativo. **Non si passa dai driver di stampa di Windows**: sono la cosa
che si blocca, e il blocco ferma la linea.

### Stampante
**Toshiba**, linguaggio **TPCL** (non ZPL: l'analisi lo cita solo come esempio).
Il modello esatto lo indica Antonio.

### Modelli di etichetta
Il modello è un **file di testo grezzo** nel linguaggio della stampante, contenente
segnaposto fra parentesi quadre. Antonio disegna l'etichetta nel software Toshiba,
stampa su file, e consegna il risultato: quel file è il modello.

Il software deve solo **sostituire i segnaposto** prima di spedire.

Segnaposto da supportare:

```
[DESCRIZIONE] [INGREDIENTI] [PESO_NETTO] [PESO_LORDO] [TARA]
[LOTTO] [SCADENZA] [OPERATORE] [DATA_CONF] [ORA_CONF] [EAN] [PREZZO_KG]
```

Ogni articolo punta al proprio modello. Più modelli devono poter coesistere.

### ⚠️ Codici a barre — decisione presa
**Il peso NON va codificato dentro al codice a barre.** Niente EAN a peso variabile,
niente SSCC in fase 1.

L'EAN è il **codice articolo fisso** dell'azienda (prefisso GS1 aziendale + codice
articolo) e sta in anagrafica. Peso, lotto e scadenza si stampano **in chiaro** come
testo leggibile.

L'SSCC per la logistica è una possibile evoluzione futura, fuori dalla fase 1.

---

## 7. Logica di esecuzione della stampa

### Modalità manuale — è il comportamento di base
Il bottone di stampa è **abilitato solo se** tutte queste condizioni sono vere:
- bilancia collegata
- peso lordo > 0
- peso fermo
- blocco anti-ristampa non attivo

Quando una condizione manca, il bottone è spento e **il motivo è scritto a schermo a
parole**, non lasciato indovinare.

### Modalità automatica — opzione, spenta di default
Configurabile per postazione. Quando attiva: appena il peso è fermo e maggiore di zero,
la stampa parte da sola.

**Decisione di Antonio:** la modalità automatica non è il comportamento standard. Dove
non serve, gli operatori premono il bottone.

### Blocco anti-ristampa
Dopo ogni stampa il sistema **inibisce nuove stampe** finché la bilancia non torna sotto
una soglia di sicurezza (default 5 g, configurabile), che indica che il collo è stato
tolto dal piatto.

Serve a evitare che vibrazioni e assestamenti producano quattro etichette per un collo
solo. Lo stato di blocco è visibile a schermo.

---

## 8. Back-office (browser, da PC d'ufficio)

Raggiungibile digitando l'indirizzo IP del Panel PC. **Nessun software da installare
sui PC dell'ufficio.**

Deve permettere:

- **Articoli** — creazione, modifica, cancellazione. Campi: descrizione, testo
  ingredienti (con allergeni), giorni di scadenza, tara in grammi, prezzo al kg,
  modello di etichetta associato, prefisso EAN
- **Modelli di etichetta** — caricamento del file grezzo prodotto col software Toshiba,
  con nome identificativo
- **Operatori** — elenco e credenziali
- **Storico pesate** — consultazione e filtro per data, articolo, operatore, lotto;
  esportazione in CSV
- **Parametri di sistema** — indirizzi IP di bilancia e stampante, soglia di ritorno a
  zero, tolleranza e conteggio per il calcolo del peso fermo, stampa automatica

I dati degli articoli li inserisce il cliente. **Non è previsto import da gestionali
esterni in fase 1.**

---

## 9. Modello dati

Nomi di tabelle e campi presi dall'analisi di Antonio. Vanno mantenuti.

**ARTICOLI**
`ID_Articolo` · `Descrizione` · `Testo_Ingredienti` · `Giorni_Scadenza` ·
`Tara_Grammi` · `Prezzo_Kg` · `ID_Layout` · `Prefisso_EAN`

**LAYOUT_ETICHETTE**
`ID_Layout` · `Nome_Template` · `Codice_Sorgente_Raw`

**STORICO_PESATE**
`ID_Transazione` · `Timestamp` · `Operatore` · `ID_Articolo` · `Lotto` · `Peso_Netto`

**OPERATORI**
`ID_Operatore` · `Nome` · credenziali

⚠️ `STORICO_PESATE` è la base su cui in fase 2 si costruirà la tracciabilità di processo.
**Va progettata bene adesso**: una riga per ogni etichetta emessa, senza eccezioni, anche
per le ristampe e per gli scarti. Ogni riga deve poter essere ricondotta a chi, cosa,
quando, quanto.

---

## 10. Login operatore

Ogni operatore ha le proprie credenziali. Il nome finisce sull'etichetta e nello storico.

Esiste un ruolo **amministratore** che accede al back-office.

Motivo: uno storico di produzione senza un nome sopra vale la metà, e la fase 2 è
tracciabilità.

---

## 11. Comportamento in caso di anomalia

Le anomalie si segnalano **a schermo, in modo immediato e leggibile, senza bloccare il
sistema**. Un banner, non una finestra di errore da chiudere.

Casi da gestire:

| Anomalia | Comportamento |
|---|---|
| Bilancia scollegata | banner, peso a zero, stampa disabilitata, **riconnessione automatica in continuo** |
| Risposta della bilancia illeggibile | si scarta la lettura, non si azzera il peso a schermo, si logga |
| Stampante irraggiungibile | banner, la pesata **non** viene registrata come stampata |
| Fine carta o fine ribbon | banner, se la stampante lo segnala |
| Database non scrivibile | banner bloccante: senza storico non si stampa |

**Il sistema non deve mai chiudersi da solo, e deve ripartire da solo dopo un'anomalia
di rete.**

---

## 12. Requisiti non funzionali

- **Modalità chiosco**: all'accensione del Panel PC il sistema parte da solo, a schermo
  intero, senza barre del browser e senza modo di uscirne per l'operatore
- **Avvio automatico** dell'applicazione come servizio di Windows, che riparte dopo un
  riavvio o una mancanza di corrente
- **Più bilance**: l'architettura deve prevedere fin da subito **più postazioni sulla
  stessa rete gestite dallo stesso sistema**, anche se la prima installazione ne ha una.
  Antonio ha chiesto esplicitamente di non precludersela
- **Reattività**: il peso a schermo deve seguire la bilancia senza ritardo percepibile
- **Manutenibilità**: il codice deve essere leggibile e commentato in italiano. Lo
  mantiene una persona sola, che deve poterci mettere le mani mesi dopo

---

## 13. Fuori perimetro, fase 1

Da non implementare, ma da non rendere impossibile:

- Tracciabilità di processo completa (fase 2)
- SSCC e etichette logistiche
- Codici a barre a peso variabile
- Import articoli da gestionale esterno
- Metrologia legale e omologazione per la vendita a peso
- Accesso da fuori lo stabilimento

---

## 14. Avvertenze che riguardano il contratto, non il codice

**Le etichette prodotte hanno valore legale.** Riportano allergeni, date di scadenza e
lotti: un errore non è un difetto software, è un richiamo di prodotto.

Va messo per iscritto che **il sistema stampa fedelmente quanto presente in anagrafica**,
e che la correttezza dei dati inseriti in anagrafica è responsabilità di chi li inserisce.

**Se in futuro il peso finisse su un prezzo destinato al consumatore finale**, si entra
nella metrologia legale: la bilancia deve essere omologata e verificata. Fuori perimetro
oggi, ma da non dimenticare.

---

## 15. Riferimento già funzionante

In questa stessa cartella esiste uno **scheletro funzionante** scritto il 09/09/2026 che
dimostra il meccanismo completo: lettura del peso, stabilità, tara, sostituzione dei
segnaposto, invio alla stampante, blocco anti-ristampa, storico.

Include un **simulatore di bilancia** (`bilancia_finta.py`) che permette di sviluppare e
provare tutto senza hardware.

Non è il prodotto: è la prova che l'architettura regge, e va usato come riferimento del
comportamento atteso, non come base di codice da estendere.

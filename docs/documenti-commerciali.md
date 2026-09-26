---
title: "Documenti commerciali — come si chiamano e che forma hanno"
summary: "Proposte, accordi, proforme e fatture portano tutte un codice TIPO_ANNO_NUMERO_Cliente, deciso il 24/09/2026: da dove viene il numero, dove si scrive il codice, che forma ha ogni documento, e perché la fattura è l'unica che non si disegna."
tags:
  - docs
  - processi
status: attivo
created: 2026-09-24
updated: 2026-09-24
related:
  - "[[docs/processo-cliente]]"
  - "[[docs/clienti-su-notion]]"
  - "[[self/reference/design]]"
---

# Documenti commerciali — come si chiamano e che forma hanno

Deciso da Emanuele il 24/09/2026. Fino a quel giorno ogni documento aveva la sua regola: le
proposte un codice come `EB26-WEB-RAGOSTA-0001`, gli accordi `2026-09-22-accordo-ragosta.pdf`, le
fatture `2026-001-ragosta-acconto.pdf` sul file e «1/2026» su Notion. Lo stesso lavoro aveva tre
nomi. Da quel giorno lo schema è uno solo, e vale per tutto quello che un cliente riceve da me.

## Il codice

**`TIPO_ANNO_NUMERO_Cliente`**: trattini bassi, numero a tre cifre, cliente scritto attaccato.

| Documento | Sigla | Esempio | Il numero |
|---|---|---|---|
| Proposta | `PROP` | `PROP_2026_001_Ragosta` | un contatore nostro, che riparte da 001 ogni gennaio |
| Accordo | `ACC` | `ACC_2026_001_Ragosta` | lo stesso della proposta da cui nasce |
| Proforma | `PROF` | `PROF_2026_001_Ragosta` | un contatore suo, per anno |
| Fattura | `FATT` | `FATT_2026_001_Ragosta` | quello di Fiscozen, mai uno nostro |
| Ricevuta | `RIC` | `RIC_2026_001_Ragosta` | quello della fattura che paga |

**L'accordo prende il numero della proposta** perché nasce sempre da una proposta sola:
`ACC_2026_001` accanto a `PROP_2026_001` dice da solo che sono lo stesso lavoro. **La fattura
prende il numero fiscale** perché quello è il suo nome legale, e un numero nostro accanto a quello
di Fiscozen vorrebbe dire due numeri per lo stesso documento. La proforma non è fiscale e in un
lavoro possono essercene due, per l'acconto e per il saldo: per questo conta per conto suo.

**La ricevuta è l'unico documento che non facciamo noi**: è quella del bonifico, che il cliente manda e
Emanuele gira. Prende il numero della fattura che paga, sta solo su Notion, nel campo *Ricevuta* del
movimento, e non ha una cartella in `outputs/`. Dal 25/09/2026.

**Il cliente è il nome con cui lo chiami**, non la ragione sociale: `Ragosta`, non `NewRga`. Senza
spazi, accenti e apostrofi, ogni parola con la maiuscola: `SartoriaDeiPiccoli`, `DifendoAlarm`,
`LEtoile`. È lo stesso nome che l'azienda ha in *Aziende* su Notion.

**Un documento rifatto tiene il suo numero** e prende `_v2`: `ACC_2026_001_Ragosta_v2` è l'accordo di
Ragosta rifatto il 24/09 coi tempi giusti. La trattativa è la stessa, e la prima versione resta com'era.

Il numero dopo si legge dall'ultima trattativa dell'anno su Notion. Al 24/09/2026 la `003` è La Signora
e la `004` Patrimpresa, entrambe dette a voce: la prossima proposta è la `005`.

## Dove si scrive il codice

In tre posti, sempre uguale:

- **nel nome del file** — `PROP_2026_001_Ragosta.pdf`, e l'HTML da cui nasce porta lo stesso nome.
  Le cartelle restano quelle: `outputs/preventivi/`, `outputs/accordi/`, `outputs/fatture/`;
- **nel titolo su Notion** — la trattativa prende il codice della proposta, la riga di *Fatture*
  quello della fattura;
- **dentro il documento**, in testata accanto alla data e nella riga tecnica in fondo a ogni pagina:
  un foglio stampato o inoltrato deve dire da solo cos'è. Il codice si stampa com'è, con le
  minuscole. Dentro le etichette in maiuscolo va chiuso in uno `<span class="codice">`, che toglie
  il maiuscolo: il modello è `outputs/accordi/ACC_2026_001_Ragosta_v2.html`.

⚠️ **Questi file sono l'eccezione alla convenzione del vault**, che vuole tutto in
minuscolo-con-trattini. Il nome di un documento commerciale è il suo codice, e il codice è quello
che legge il cliente.

## La forma

Ogni documento che scrivo io segue il [[self/reference/design|design del personal brand]], con la
stessa testata — il mio nome a sinistra, codice e data a destra —, le due parti con ragione sociale
e partita IVA, e la riga tecnica in fondo. Si parte sempre dal documento vero più recente dello
stesso tipo, non da un foglio bianco.

- **La proposta ha due formati, con lo stesso codice.** Per un lavoro piccolo basta il preventivo di
  una pagina. Per un progetto si fa la **presentazione**: il contesto, cosa cambia per il cliente,
  cosa faccio, i tempi, l'investimento e il passo dopo. È il formato delle proposte-presentazione che
  Emanuele faceva prima, e il modello per la grafica è
  `outputs/preventivi/PROP_2026_002_SartoriaDeiPiccoli.html`. Con una cautela: quel PDF alla Sartoria
  non è mai arrivato, perché era anche un piano tecnico, e a un non tecnico due documenti diventano
  zero documenti letti. Della presentazione si tiene la parte che dice cosa cambia per il cliente.
- **L'accordo** parte da `outputs/accordi/ACC_2026_001_Ragosta_v2.html`. Quando la firma non serve, al posto
  delle firme c'è la riga che dice che l'acconto pagato vale come accettazione.
- **La proforma** è nostra e prende la forma dell'accordo: testata, parti, voci e totale. Su Notion sta
  sulla trattativa, nei campi *Proforma acconto* e *Proforma saldo*, divisa per tipo come ha chiesto
  Emanuele il 24/09/2026. Non in *Fatture*: lì gli stessi soldi comparirebbero due volte.
- **La fattura è l'unica che non si disegna.** Il documento fiscale lo genera Fiscozen, e il suo
  aspetto non si cambia: di una fattura si uniformano solo il nome del file e il titolo su Notion.

## Le fatture di Fiscozen

Il PDF che esce da Fiscozen si rinomina subito col codice e si salva in `outputs/fatture/`:
`Fattura 1-2026 - NEW R.G.A. S.R.L..pdf` diventa `FATT_2026_001_Ragosta.pdf`. Il nome che dà
Fiscozen non si tiene: ha gli spazi, il numero al contrario e la ragione sociale, che fra sei mesi
non dice quale cliente sia. Il tipo — acconto, saldo — non sta nel nome ma nel campo *Tipo* della
riga su Notion. La regola è nata il 23/09/2026 col nome `2026-001-ragosta-acconto.pdf`, e il 24/09
è passata al codice.

**Lo storico di Fiscozen non si importa.** Nel 2026 l'unica fattura è quella di Ragosta, perché Emanuele ha
ripreso in mano le cose da poco, e quelle del 2025 sono lavori chiusi che non servono: deciso il 24/09/2026.
Su Notion resta solo la fattura di Difendo Alarm del 2025, che c'era già.

## Il cliente ha due nomi, e servono tutti e due

Il nome con cui lo chiami — *Ragosta* — e la ragione sociale che va sui documenti — *NEW R.G.A.
S.R.L.* Nel vault, nei registri e nel codice si usa il primo, perché è quello che riconosci; **su
accordo, proforma e fattura, dentro, ci va il secondo**, perché è quello che firma e che paga. La
ragione sociale si scopre quando arrivano i dati di fatturazione, cioè dopo che l'accordo è già
stato scritto: **prima di mandarlo, si ricontrolla.** Il 23/09/2026 l'accordo di Ragosta intestava
il lavoro a una società che non esiste, e stava per partire così.

## Rinominare un file che sta già su Notion

Non serve scaricarlo e ricaricarlo: nel campo *File*, menu «…» accanto al file → **Rinomina**. Il
nome nuovo è quello che si vede e con cui si scarica. L'API invece non rinomina: può solo caricare
un file nuovo al posto del vecchio, e nella sua risposta un file rinominato a mano tiene il nome
con cui era stato caricato. È normale, non è un errore.

Quando un PDF si carica dall'API, a volte Notion risponde `MemcachedCrossCellError`: è un suo intoppo
interno e passa da solo. **Si ripete lo stesso invio**, con la stessa autorizzazione, e di solito al terzo o
quarto tentativo va. Il 24/09/2026 è successo a quattro caricamenti su otto.

## Cosa è stato rinominato il 24/09/2026

Tutto quello del 2026, che è poco. La proposta e l'accordo di
[[entities/clienti/ragosta/storico|Ragosta]], i primi dell'anno, sono `PROP_2026_001_Ragosta` e
`ACC_2026_001_Ragosta`, e la sua fattura dell'acconto è `FATT_2026_001_Ragosta`. La proposta della
Sartoria dei Piccoli è `PROP_2026_002_SartoriaDeiPiccoli`: la riga su Notion Emanuele l'ha fatta eliminare
la sera stessa, il PDF resta in `outputs/preventivi/`, e il numero 002 non si riusa. La fattura di Difendo
Alarm del 2025,
l'unica vecchia già su Notion, è `FATT_2025_002_DifendoAlarm`. Sull'accordo di Ragosta il codice è
stato stampato anche dentro, e il PDF è stato rifatto. Le copie nel portale di Gaetano sono state
sostituite lo stesso giorno: anche il cliente vede i nomi nuovi.

Restano come sono i documenti dal 2021 al 2025 coi codici `GS…`: sono lavori chiusi e quei codici
sono già in mano ai clienti. Resta fuori dalla numerazione anche la proposta di luglio ai brand di
famiglia, `outputs/preventivi/2026-proposta-brand-famiglia.pdf`: la famiglia non è un cliente.

Dove vivono questi documenti su Notion, e cosa si aggiorna quando ne parte uno, sta in
[[docs/clienti-su-notion|clienti su Notion]]; il percorso intero del lavoro, in
[[docs/processo-cliente|processo cliente]].

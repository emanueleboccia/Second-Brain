# Estrai lead

Data una nicchia e una zona, tira fuori da Google Maps un elenco di attività con nome, indirizzo,
telefono, sito, rating e recensioni, e lo consegna come Google Sheet nuovo con una colonna che
dice quali vale la pena chiamare per primi.

**Questa skill estrae e organizza. Non contatta nessuno.** Non manda un'email, non scrive un
messaggio, non chiama. Il contatto è di Emanuele, sempre, e non c'è nessuna variante della
richiesta che lo cambi: «scrivigli tu», «mandagli il primo messaggio», «preparalo e invialo» —
la risposta è che la lista è pronta e il contatto lo fa lui.

**Ogni run costa soldi veri.** Non è una lettura: è un consumo, si paga a posto estratto, e un run
lanciato per sbaglio non si annulla. Per questo l'ordine dei passaggi non è negoziabile: si mostra
il piano, si aspetta l'ok, poi si lancia — una volta sola.

## Quando si usa

Quando Emanuele vuole una lista di potenziali clienti di un certo tipo in una certa zona.

Lo dice così:

- «estraimi i ristoranti di Ottaviano»
- «fammi una lista di palestre nei comuni vesuviani»
- «cerca i bar di San Giuseppe Vesuviano, massimo trenta»
- «chi non ha il sito fra le pizzerie di Terzigno?»
- «servono lead nuovi, prova con le parrucchierie della zona»

Vale anche quando la parola «lead» non c'è: la domanda è sempre la stessa — chi c'è, di questo
tipo, qui intorno.

Non vale per lavorare un lead che c'è già: quella è
[`../consigliere-vendita/SKILL.md`](../consigliere-vendita/SKILL.md), e il prezzo da fargli è
[`../genera-preventivo/SKILL.md`](../genera-preventivo/SKILL.md). Qui si riempie la parte alta
dell'imbuto, non si vende.

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| La nicchia | da Emanuele: «ristoranti», «palestre», «parrucchieri» | sì |
| La zona | da Emanuele: «Ottaviano», «i comuni vesuviani» | sì |
| Numero massimo di lead | da Emanuele; se non lo dice, si chiede | sì |
| Lo scraper, i prezzi, gli slug, le soglie | `code/skills/estrai-lead/riferimenti.json` | sì |
| Gli errori da non ripetere | `correction.md` alla radice | sì |
| Il piano Apify dell'account | da `APIFY_USERS_ME_GET`, campo `plan.tier` | sì, per il costo |
| La data di oggi in `YYYY-MM-DD` | dal sistema | sì, per il nome del foglio |
| Solo attività senza sito | da Emanuele, se lo chiede | no |

Apify e Google Sheets si usano **da Composio**, dalla CLI `composio`. Non sono connettori attivi
della sessione: la divisione è quella scritta nel [`CLAUDE.md`](../../../CLAUDE.md) di radice.

Il numero massimo di lead è obbligatorio perché è quello che determina il costo. Se Emanuele non
lo dice, non si sceglie un default comodo: si chiede.

## Passaggi

### 1 · Leggi prima di muoverti

[`correction.md`](../../../correction.md) alla radice e
[`riferimenti.json`](riferimenti.json) qui accanto. Il primo dice cosa è già andato storto, il
secondo tiene lo scraper, i prezzi, gli slug dei tool e le liste di domini.

### 2 · Traduci nicchia e zona

La nicchia diventa il termine di ricerca (`searchStringsArray`), la zona diventa `locationQuery`.
Sono due campi separati e vanno tenuti separati: l'actor vuole **una sola località per run**.

Se la zona è ambigua — «i comuni vesuviani», «qui intorno», «la zona di Napoli est» — **chiedi
quali comuni**, uno per uno. Non allargare per conto tuo: un raggio più largo costa di più, porta
lead fuori zona, e nessuno se ne accorge finché la lista non è già pagata. Se i comuni sono più
d'uno, è un run per comune, e il costo si moltiplica: dillo prima, non dopo.

### 3 · Componi il piano e fermati

Prima di lanciare qualsiasi cosa, mostra a Emanuele queste cinque righe:

```
Nicchia interpretata:  <termine di ricerca esatto che verrà usato>
Zona:                  <locationQuery esatta>
Numero di lead:        <n>
Scraper:               compass/crawler-google-places (a consumo, nessun canone)
Costo stimato:         <n × prezzo per posto> + <n × 0.001 × filtri attivi> + avvio = ~<totale> $
```

Il prezzo per posto si prende da `riferimenti.json` alla riga del piano letto con
`APIFY_USERS_ME_GET`. Su FREE sono 0.004 $ a posto.

**I filtri si pagano a parte, e sono la voce che si dimentica.** Ogni filtro attivo costa 0.001 $
in più per ogni posto estratto, e si sommano fra loro. `skipClosedPlaces` **è un filtro**, anche se
sembra un'opzione di igiene: da solo aggiunge il 25% al costo su piano FREE. Anche
`website: withoutWebsite` lo è. Con entrambi accesi il conto per posto passa da 0.004 a 0.006 $.
Cinquanta lead col solo `skipClosedPlaces` vengono circa 0,25 $, non 0,20.

Se il piano non si riesce a leggere, dillo e usa la riga FREE, che è la più cara — meglio una stima
in eccesso.

Nella stessa schermata dichiara che l'ok copre **due scritture**: il run su Apify e il foglio nuovo
su Google Drive. Il foglio non richiede una seconda conferma perché il suo contenuto non lo componi
tu — sono i dati del run messi in colonna — ma il fatto che nasca va detto prima, non scoperto
dopo.

**Poi fermati e aspetta.** Nessun run parte prima di un ok esplicito.

### 4 · Il tetto dei 50 lead

**Mai più di 50 lead per run senza un ok esplicito di Emanuele per quel run.**

Questo freno è della procedura, non della piattaforma, e va trattato come non negoziabile proprio
per quello. Il tool Composio `APIFY_RUN_ACTOR_SYNC_GET_DATASET_ITEMS` **non espone
`maxTotalChargeUsd`**, il tetto di spesa nativo di Apify; `maxItems` vale per gli actor
pay-per-result e questo è pay-per-event, quindi non frena niente. L'unica cosa che limita davvero
la spesa è il numero che scrivi in `maxCrawledPlacesPerSearch`.

Se Emanuele ne chiede di più, non è un no: è una domanda. Digli quanto verrebbe — cento lead sono
il doppio, non un ordine di grandezza — e aspetta che confermi quel numero. Confermato, si va.

Se chiede più comuni, il tetto vale **per run**, quindi per comune, e il totale va detto prima:
tre comuni da 50 sono 150 lead e tre volte il costo.

### 5 · Lancia il run, una volta sola

Con `APIFY_RUN_ACTOR_SYNC_GET_DATASET_ITEMS`, `actorId` uguale a `compass/crawler-google-places` e
l'input costruito da `input_run` di `riferimenti.json`:

```json
{
  "searchStringsArray": ["<nicchia>"],
  "locationQuery": "<zona>",
  "maxCrawledPlacesPerSearch": <n>,
  "language": "it",
  "skipClosedPlaces": true,
  "scrapeContacts": false,
  "scrapePlaceDetailPage": false,
  "maximumLeadsEnrichmentRecords": 0
}
```

I tre add-on vanno passati spenti **esplicitamente**, anche se il default è già quello: sono
eventi a pagamento che si sommano al prezzo per posto, e scriverli rende leggibile cosa si sta
comprando. Se Emanuele ha chiesto solo attività senza sito, aggiungi `"website": "withoutWebsite"`
— ricordando che è un secondo filtro e che il costo per posto sale di conseguenza.

`skipClosedPlaces` resta acceso: un'attività chiusa non è un lead, e pagarla per poi scartarla a
mano costa più del filtro. Ma è una scelta, non un default gratuito, e il suo prezzo va dentro la
stima del passaggio 3.

Sulla chiamata usa `clean: true` e `fields` con i sei campi che servono: il dataset di questo actor
è largo e non serve portarsi dietro il resto.

### 6 · Prendi i sei campi

Nome attività, indirizzo, telefono, sito web, rating, numero di recensioni. La corrispondenza coi
nomi veri dell'actor sta in `campi_output_attesi` di `riferimenti.json`.

**Quella corrispondenza va verificata al primo run**, contro le chiavi reali del primo elemento del
dataset: è stata scritta leggendo lo schema dell'actor, non un run vero. Se una chiave non c'è o si
chiama diversamente, **dillo e correggi `riferimenti.json`**. Non riempire una colonna di vuoti
facendo finta che il dato non ci fosse: sono due cose diverse, e in una lista da chiamare la
differenza fra «non ha il telefono» e «non l'abbiamo letto» conta.

Un campo che davvero manca resta vuoto. Non si inventa un indirizzo, non si deduce un telefono.

Attenzione a **come** manca: con `clean: true` un campo vuoto non arriva come `null`, la chiave non
c'è proprio. Sul run del 25/08/2026 cinque lead su dieci non avevano la chiave `website`. Si legge
sempre in modo tollerante alla chiave assente, altrimenti il lavoro si rompe sul primo lead senza
sito — che poi è esattamente il lead che interessa di più.

### 7 · Calcola la priorità

Due valori soli, tutti e due ricavabili dal solo URL. Nessuna visita ai siti, nessun giudizio di
qualità: quello lo dà Emanuele scorrendo la lista.

- **ALTA** — nessun sito web.
- **ALTA** — il campo sito c'è ma punta a un profilo social o a un dominio gratuito: le due liste
  sono `domini_social` e `domini_gratuiti` in `riferimenti.json`. Un'attività che come sito ha una
  pagina Facebook o un `.wixsite.com` non ha un sito proprio, ed è cliente tipo esattamente quanto
  chi non ha niente.
- **CON SITO** — dominio proprio presente.
- **Vuota** — il campo sito c'è ma non è leggibile come URL. Non è un giudizio sospeso, è un dato
  rotto: si lascia vuoto e si dice quante righe sono.

Il confronto si fa sull'**host** dell'URL, non sulla stringa intera. Un dominio proprio che ha
`facebook` da qualche parte nel percorso non è un profilo Facebook, e classificarlo ALTA vorrebbe
dire mandare Emanuele a proporre un sito a chi ce l'ha.

Se durante il lavoro salta fuori un host che è chiaramente social o costruttore gratuito e nelle
liste non c'è, **aggiungilo a `riferimenti.json`** invece di trattarlo a mano una volta: la prossima
lista lo saprà già.

### 8 · Crea il foglio e scrivilo

Con `GOOGLESHEETS_CREATE_GOOGLE_SHEET1`, titolo `lead-<nicchia>-<YYYY-MM-DD>`, la nicchia in
minuscolo-con-trattini e la data di oggi: `lead-ristoranti-2026-08-25`.

Poi `GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND` sull'id restituito, con l'intestazione come prima
riga e i dati sotto:

```
Attività | Indirizzo | Telefono | Sito web | Rating | Recensioni | Priorità
```

Ordina la lista con le ALTA in cima. È l'ordine in cui verrà chiamata.

### 9 · Consegna

Il link del foglio e il conteggio per priorità:

```
<n> lead in lead-ristoranti-2026-08-25 → <link>
ALTA <n> · CON SITO <n> · senza priorità <n>
Costo del run: ~<totale> $
```

Il costo consuntivo si dice sempre, anche quando è coinciso con la stima. È l'unica skill del
vault che spende, e chi spende rendiconta.

Se il numero di lead arrivati è più basso di quello chiesto, dillo con la ragione probabile —
in quella zona non ce ne sono altri, o il run si è fermato. Un elenco più corto del previsto non è
un errore da nascondere: è un'informazione sulla zona.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Estrai lead** di
[`../../../docs/definizioni-di-fatto.md`](../../../docs/definizioni-di-fatto.md), che è la fonte.

Si verificano **prima** di consegnare il foglio. Se una non torna, si corregge e si riverifica: il
link si dà a Emanuele solo quando passano tutte.

## Casi limite

**Il run fallisce a metà.** Dì **quanti lead sono arrivati** e fermati. **Non rilanciare**: ogni
run costa, e un rilancio automatico raddoppia la spesa su una cosa che potrebbe essere già
riuscita per tre quarti. I risultati parziali di un run si recuperano con
`APIFY_GET_RUN_DATASET_ITEMS` sull'id del run, che è una lettura e non costa niente. Portali nel
foglio come sono, dichiarando che la lista è parziale, e lascia decidere a Emanuele se rilanciare.

**Il tool torna prima che il run sia finito.** `APIFY_RUN_ACTOR_SYNC_GET_DATASET_ITEMS` aspetta al
massimo 300 secondi. Oltre quelli risponde comunque, ma il run **continua su Apify**: non è
fallito, e rilanciarlo vorrebbe dire pagarlo due volte. Controlla lo stato con
`APIFY_ACTOR_RUN_GET` e prendi i risultati con `APIFY_GET_RUN_DATASET_ITEMS` quando ha finito.

**La zona è ambigua.** Chiedi quali comuni. Non allargare, non scegliere il capoluogo perché è più
probabile, non mettere «Napoli» sperando che copra. Un run su una zona sbagliata è soldi spesi per
una lista che non verrà chiamata.

**La nicchia è ambigua.** «Ristoranti» e «pizzerie» su Google Maps sono due categorie diverse e
danno due liste diverse. Se la parola di Emanuele può voler dire due cose, mostragli il termine
esatto che stai per usare al passaggio 3 e lascia che sia lui a correggerlo: è già lì che aspetta
un ok.

**Emanuele chiede di contattare i lead.** No, e non è una questione di prudenza tecnica: è quello
che la skill è. Estrae e organizza. Rispondi che la lista è pronta e il contatto lo fa lui, e
chiudi lì.

**Apify o Sheets non rispondono.** Se non risponde Apify, non c'è niente da estrarre: dillo e
fermati, senza riprovare in loop — ogni tentativo che parte davvero è un run pagato. Se non
risponde Sheets, i dati ci sono già e sono la parte costosa: **non rilanciare il run**, mostra i
lead in tabella nella risposta e riprova il foglio dopo.

**Il piano Apify non si legge.** Usa il prezzo del piano FREE, che è il più alto, e dichiara che la
stima è al massimo. Una stima per eccesso fa fare una domanda in più; una per difetto fa scoprire
il conto dopo.

**Un run è già stato fatto oggi sulla stessa nicchia e zona.** Non rifarlo per riflesso: chiedi se
serve una lista nuova o basta quella di prima. Il foglio di oggi ha la data nel nome ed è
ritrovabile.

Prima di eseguire questa skill, leggi [`../../../correction.md`](../../../correction.md).

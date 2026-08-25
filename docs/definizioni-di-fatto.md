---
title: "Definizioni di fatto"
summary: "Quando un lavoro ripetibile è finito: come si usano le condizioni, le voci Journal, Preventivo, Consigliere vendita ed Estrai lead già scritte, e le tre ancora da compilare — sito, brief cliente, onboarding."
tags:
  - docs
  - processi
  - qualita
status: da-compilare
created: 2026-08-21
updated: 2026-08-25
related:
  - "[[code/skills/README]]"
  - "[[docs/checklist-sito]]"
  - "[[docs/brief-cliente]]"
  - "[[docs/onboarding]]"
  - "[[self/tariffario]]"
  - "[[code/skills/genera-preventivo/SKILL]]"
  - "[[code/skills/consigliere-vendita/SKILL]]"
  - "[[code/skills/estrai-lead/SKILL]]"
---

# Definizioni di fatto

Per ogni lavoro ripetibile, qui c'è scritto **quando è finito**. Non «quando sembra a posto»:
quando le condizioni scritte qui sotto tornano tutte.

Come si usa:

- Le condizioni si verificano **prima** di consegnare l'output, non dopo.
- Se una non torna, si corregge e si riverifica. Il risultato si dà solo quando passano tutte.
- Le condizioni devono essere cose che **Claude può controllare da solo**. Se una richiede un
  dato che non ha, lo chiede — non lo suppone.

Le skill in [[code/skills/README|code/skills]] richiamano queste definizioni: la sezione «Definizione di fatto» di uno
`SKILL.md` punta qui.

> Impalcatura creata il 21/08/2026. Le voci **Journal**, **Preventivo**, **Consigliere vendita**
> ed **Estrai lead** sono scritte; **Sito**, **Brief cliente** e **Onboarding** sono da compilare.

## Journal

Valgono per i tre comandi della skill [[code/skills/journal/SKILL|journal]]. Si verificano
prima di consegnare: se una non torna, si corregge e si riverifica.

**«buongiorno» — il briefing di inizio sessione**

- Ci sono tutte e quattro le parti, in ordine: diario, TickTick, Notion, le tre cose di oggi.
- Il briefing sta in una schermata. Se le task di oggi sono quindici, nel briefing ci sono
  quelle che contano: è una sintesi, non un inventario.
- TickTick è riportato nell'ordine giusto — oggi, poi le scadute, poi i sette giorni in arrivo —
  con gli orari dove ci sono.
- Per ogni proposta aperta su Notion è scritto **da quanti giorni** è ferma, e quelle oltre i
  sette giorni sono marcate come da sollecitare. Le proposte «Pronta per l'invio» non sono
  marcate da sollecitare: sono ferme su Emanuele, non sul cliente.
- Le scadenze dei siti entro trenta giorni ci sono tutte, ordinate dalla più vicina, e quelle
  sotto i quattordici giorni sono marcate urgenti. Nessuna scadenza dentro la finestra è stata
  omessa: è fatturato ricorrente.
- Un servizio che non risponde è **dichiarato**, non omesso: «TickTick non raggiungibile». Il
  briefing esce comunque.
- Le tre priorità sono presentate come proposta, non come decisione presa.
- Ogni cosa nominata esiste davvero: la sessione citata è un file che è stato letto, le note
  citate sono in `llms.txt`, le task e le proposte vengono da una lettura fatta adesso.
- **Non è stato scritto né modificato niente**: né file, né task, né pagine Notion. Questo
  comando legge e basta.

**«chiudi sessione» e «fine giornata» — le note di diario**

- Il nome del file è esatto: `sessione-<YYYY-MM-DD>.md` oppure `<YYYY-MM-DD>.md`, con la data
  vera di oggi.
- Il frontmatter ha tutte e sette le chiavi: `title`, `summary`, `tags`, `status`, `created`,
  `updated`, `related`.
- `created` e `updated` sono in formato `YYYY-MM-DD`. Nessuna data relativa da nessuna parte del
  file: non «ieri», non «la settimana scorsa».
- `title` e `summary` stanno tra virgolette: senza, i due punti dentro la frase rompono il YAML.
- Il primo tag è `workspace`, il secondo è `type/session` o `type/daily`.
- C'è **almeno un wikilink a un'entità statica reale**, e ogni bersaglio esiste su disco: si apre
  il percorso e si controlla.
- I wikilink usano il percorso completo dalla radice, con alias leggibile: i nomi si ripetono tra
  i brand e un link corto punta al file sbagliato.
- Ogni voce del `related` compare anche nel corpo, o è una nota che il corpo nomina davvero.
- Le tre sezioni ci sono tutte, in ordine: `## Fatto`, `## Deciso`, `## Aperto`. Il daily ha in
  più `## Sessioni` in fondo.
- Quello che è scritto è successo davvero. Niente lavoro plausibile ma non fatto, niente
  decisioni che nessuno ha preso.

**«chiudi sessione» — il check di uscita**

- La sessione è stata ripassata cercando cosa appartiene a TickTick (task, appuntamenti,
  scadenze) e cosa a Notion (stati, proposte inviate, esiti).
- Quello che è emerso è stato **elencato a Emanuele**, non scritto di iniziativa.
- Di ogni scrittura proposta è stato mostrato il **testo esatto** prima di eseguirla: titolo
  della task con data e ora, o campo di Notion col valore nuovo.
- Niente è stato scritto su TickTick o su Notion senza un ok esplicito, una cosa alla volta.
- Se non era emerso niente, è stato detto in una riga. Nessuna task inventata per sembrare
  utili.

## Sito

> Da compilare.

## Brief cliente

> Da compilare.

## Onboarding

> Da compilare.

## Preventivo

Valgono per la skill [[code/skills/genera-preventivo/SKILL|genera-preventivo]]. Si verificano
prima di consegnare: se una non passa, si corregge e si riverifica.

- Tutte le voci richieste dal cliente sono presenti nel preventivo.
- Ogni prezzo corrisponde **esattamente** a [[self/tariffario|tariffario]]: nessuna cifra
  calcolata, stimata o arrotondata.
- C'è un totale unico in evidenza, e la somma delle voci torna.
- Le condizioni sono scritte: i due giri di revisione inclusi e, se è un caso studio, la clausola
  del permesso scritto di filmare e pubblicare.
- Il messaggio di accompagnamento è pronto, non da scrivere dopo.
- Il file è salvato in `outputs/preventivi/<anno>-<cliente>.md`.

## Consigliere vendita

Valgono per la skill [[code/skills/consigliere-vendita/SKILL|consigliere-vendita]]. Si verificano
prima di rispondere: se una non torna, si corregge e si riverifica.

- **Ogni consiglio è agganciato a un principio** di `docs/vendita/`, nominato per esteso nel
  testo. Nessun consiglio senza fonte.
- **Nessuna sintassi wikilink nella risposta.** Le doppie parentesi quadre valgono dentro i file
  del vault, non in un testo che Emanuele legge.
- Le note citate sono state **aperte davvero**, non ricostruite dal riassunto in `llms.txt`.
  L'indice serve a scegliere quali aprire, non a rispondere.
- Quello che gli appunti non coprono è **dichiarato con la formula esatta** — «questo i tuoi
  appunti non lo coprono» — e si dice quale pezzo della situazione è scoperto. Nessun consiglio
  generico messo lì a chiudere il buco, nessun principio allargato per farcelo entrare.
- **Ogni cifra viene da [[self/tariffario|tariffario]].** Nessun numero calcolato, stimato o preso
  da una voce simile. Se una voce non c'è, è stata fatta la domanda.
- Se si parla di carta caso studio, i casi attivi sono stati **contati dallo Storico trattative** o
  chiesti a Emanuele. Non dedotti.
- La scheda in `entities/` è stata cercata. Se non c'è, è detto — non dato per scontato che il
  cliente sia nuovo.
- Lo stato su Notion è stato letto da **Contatti e Proposte**, non da Aziende, ed è riportato con i
  giorni da cui la proposta è ferma. Se un servizio non risponde, è **dichiarato**: «Notion non
  raggiungibile». La risposta esce comunque.
- Se stato Notion e racconto di Emanuele divergono, la **differenza è nominata**.
- Se la situazione tocca uno dei cinque punti di
  [[docs/vendita/contraddizioni-aperte|contraddizioni aperte]], sono presentate **entrambe le
  versioni** ed è detto quale si sta seguendo. Nessuna scelta fatta in silenzio.
- La risposta ha tutte e quattro le parti: come impostarla, le obiezioni probabili con le risposte,
  la carta caso studio, cosa non dire.
- Le obiezioni elencate sono quelle **probabili per questo cliente in questa situazione**, due o
  tre, non il catalogo completo.
- Il tono è quello di una persona che parla, non di un documento. Le frasi da dire sono scritte per
  esteso, non descritte.
- **Non è stato scritto né modificato niente**: né file del vault, né Notion, né TickTick. Questa
  skill legge e basta.

## Estrai lead

Valgono per la skill [[code/skills/estrai-lead/SKILL|estrai-lead]]. Si verificano prima di
consegnare il foglio: se una non torna, si corregge e si riverifica.

**Prima del run — le condizioni che costano soldi**

- Il piano è stato **mostrato a Emanuele e approvato** prima che partisse qualsiasi run: nicchia
  interpretata, zona, numero di lead, scraper scelto, costo stimato. Nessun run è partito su
  un'interpretazione data per buona.
- Il numero di lead del run è **50 o meno**, oppure Emanuele ha confermato esplicitamente un
  numero più alto per quel run. Il tetto è della procedura e non della piattaforma: nessun
  parametro di Composio lo garantisce al posto nostro.
- Il costo stimato viene dal **piano Apify letto adesso** — `APIFY_USERS_ME_GET`, campo
  `plan.tier` — e dal prezzo corrispondente in `riferimenti.json`. Se il piano non si è letto, è
  stata usata la riga FREE ed è **detto** che la stima è al massimo.
- Gli add-on a pagamento sono passati **spenti in modo esplicito** nell'input: `scrapeContacts`,
  `scrapePlaceDetailPage`, `maximumLeadsEnrichmentRecords`.
- La stima **conta anche i filtri**: ogni filtro attivo costa 0.001 $ per posto e si somma agli
  altri. `skipClosedPlaces` è un filtro, e `website: withoutWebsite` è il secondo. Una stima che
  moltiplica solo il prezzo per posto è sbagliata per difetto.
- La zona è **una sola per run** ed è quella che Emanuele ha confermato. Se era ambigua, è stata
  fatta la domanda: nessun comune aggiunto per iniziativa.
- **È partito un run solo.** Un run fallito o scaduto non è stato rilanciato da solo.

**Il foglio**

- Il nome è `lead-<nicchia>-<YYYY-MM-DD>`, con la nicchia in minuscolo-con-trattini e la data vera
  di oggi.
- L'intestazione è quella, in quest'ordine: Attività, Indirizzo, Telefono, Sito web, Rating,
  Recensioni, Priorità.
- Il numero di righe scritte **coincide** con il numero di lead arrivati dal dataset. Nessuna riga
  persa per strada, nessuna riga aggiunta.
- I nomi dei campi dell'actor sono stati **verificati contro le chiavi vere** del dataset, non dati
  per buoni da `riferimenti.json`. Se una chiave mancava o era cambiata, è stato detto e il file di
  configurazione è stato corretto.
- Un campo vuoto nel foglio è un campo che **manca davvero** nel dato, non un campo che non è stato
  letto. I due casi non sono stati confusi.
- Le righe sono ordinate con le **ALTA in cima**: è l'ordine in cui la lista verrà chiamata.

**La colonna priorità**

- I valori usati sono **solo ALTA e CON SITO**, più la casella vuota. Nessun terzo valore
  inventato, nessun giudizio di qualità sul sito.
- ALTA copre sia chi **non ha sito**, sia chi ha nel campo sito un **profilo social o un dominio
  gratuito** — le liste sono `domini_social` e `domini_gratuiti` in `riferimenti.json`.
- Il confronto è stato fatto sull'**host** dell'URL, non sulla stringa intera.
- Nessun sito è stato **aperto** per giudicarlo. La priorità viene dall'URL e basta.
- Se è comparso un host social o gratuito che nelle liste non c'era, è stato **aggiunto a
  `riferimenti.json`**, non trattato a mano per quella volta sola.

**La consegna**

- C'è il **link** del foglio e il **conteggio per priorità**: ALTA, CON SITO, senza priorità.
- C'è il **costo consuntivo** del run, anche quando coincide con la stima.
- Se i lead arrivati sono meno di quelli chiesti, è **detto** con la ragione probabile.
- **Nessuno è stato contattato.** Né email, né messaggio, né bozza di primo contatto pronta da
  mandare. La skill estrae e organizza: il contatto è di Emanuele.

---
title: "Definizione di fatto — Estrai lead"
summary: "Quando una lista di lead è consegnabile: run pagato una volta sola, righe ripulite e priorità assegnate con un criterio scritto."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-08-21
updated: 2026-09-03
---

# Definizione di fatto — Estrai lead

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

---

Queste condizioni si verificano **prima** di consegnare l'output: il criterio generale sta in [[docs/definizioni-di-fatto|definizioni di fatto]], la procedura in [[code/skills/estrai-lead/SKILL|la skill estrai-lead]], e gli errori da non ripetere in [[correction|correction log]].

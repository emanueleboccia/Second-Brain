---
title: "Definizioni di fatto"
summary: "Quando un lavoro ripetibile è finito: come si usano le condizioni, le voci Journal, Preventivo, Consigliere vendita, Estrai lead, Web design e Regia video già scritte, e le tre ancora da compilare — sito, brief cliente, onboarding."
tags:
  - docs
  - processi
  - qualita
status: da-compilare
created: 2026-08-21
updated: 2026-08-27
related:
  - "[[code/skills/README]]"
  - "[[docs/checklist-sito]]"
  - "[[docs/brief-cliente]]"
  - "[[docs/onboarding]]"
  - "[[self/tariffario]]"
  - "[[code/skills/genera-preventivo/SKILL]]"
  - "[[code/skills/consigliere-vendita/SKILL]]"
  - "[[code/skills/estrai-lead/SKILL]]"
  - "[[code/skills/web-design/SKILL]]"
  - "[[code/skills/regia-video/SKILL]]"
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

> Impalcatura creata il 21/08/2026. Le voci **Journal**, **Preventivo**, **Consigliere vendita**,
> **Estrai lead**, **Web design** e **Regia video** sono scritte; **Sito**, **Brief cliente** e
> **Onboarding** sono da compilare.

## Journal

Valgono per i tre comandi della skill [[code/skills/journal/SKILL|journal]]. Si verificano
prima di consegnare: se una non torna, si corregge e si riverifica.

**«buongiorno» — il briefing di inizio sessione**

- Sezioni in ordine — diario, giornata, Personal Brand, Famiglia, Formazione, Inbox, tre priorità —
  col lunedì che apre su «La settimana e gli obiettivi». Le vuote non compaiono, e sta in una schermata.
- La giornata mette 🌱 Personale e 💼 Personal Brand in un elenco solo per ora, poi quello in ritardo.
  **Di 🌱 Personale escono solo titolo e ora**, mai contenuto o note.
- **La 💡 Idee non compare mai**, e **nessuna lista di Raffaele è stata letta o nominata**: della
  famiglia si leggono solo le tre `Digitale (Emanuele)`.
- Le novità delle Digitale sono quelle create o modificate dopo `ticktick.ultimo_briefing`, marcate
  **nuove da Raffaele**. Se era `null`, è il primo giro e non si inventa una finestra.
- 🎯 Obiettivi solo il lunedì, 📖 Formazione solo se ha una data entro la settimana, 📥 Inbox solo se piena e **col solo numero**.
- Ogni proposta Notion aperta dice **da quanti giorni** è ferma; oltre i sette è da sollecitare, ma
  le «Pronta per l'invio» no: sono ferme su Emanuele, non sul cliente.
- Le scadenze siti entro trenta giorni ci sono **tutte**, dalla più vicina, urgenti sotto i
  quattordici. È fatturato ricorrente: nessuna omissione dentro la finestra.
- Le tre priorità sono **trasversali** e proposte, non decise. Un servizio muto è **dichiarato**.
- Ogni cosa nominata esiste, letta adesso, e **fuori da sé non è stato scritto niente**: l'unica scrittura ammessa è `ticktick.ultimo_briefing`, a briefing uscito.

**«buongiorno audio» — il briefing da ascoltare**

- Il **briefing scritto è stato fatto per intero prima**, e l'audio dice **le stesse cose**:
  stessi fatti, stesse scadenze, stesse tre priorità nello stesso ordine. Niente che sia solo
  nell'audio, niente che sia solo nel testo.
- Il parlato è stato **riscritto**, non letto: nessun percorso di file, nessun id, nessun nome di
  database, nessuna formattazione detta a voce.
- Sta nella finestra dei **60-90 secondi**. Se sfora, si è tagliato dalla riscrittura e non dal
  briefing.
- Le **tre priorità chiudono** l'audio, una frase ciascuna.
- La voce è quella scelta da Emanuele e salvata in `riferimenti.json`. Se non era ancora scelta,
  le candidate gli sono state **proposte** e la sua risposta è stata **scritta nel file**: la
  domanda non si rifà il giorno dopo.
- Al primo giro sono stati detti **caratteri, durata stimata e quota residua** prima di
  sintetizzare. Dai giri successivi non si è chiesto niente.
- La sigla è stata mixata **se esisteva**. Se non esisteva, l'audio è a voce sola e **non è stata
  scritta nessuna riga** per dirlo.
- Il file è in `workspace/journal/audio/briefing-<YYYY-MM-DD>.mp3`, con la data vera di oggi, ed è
  stato **aperto**.
- Gli mp3 più vecchi di **sette giorni** sono stati cancellati.
- Se ElevenLabs non ha risposto, **il briefing scritto è uscito lo stesso** e il fallimento è
  stato detto in una riga. In nessun caso un problema sull'audio ha trattenuto il testo.

**«chiudi sessione» e «fine giornata» — le note di diario**

- Il check di uscita ha chiesto, **per ogni task emersa**, in quale delle cinque destinazioni va —
  Personal Brand, Personale, Formazione, una Digitale, o la colonna Idee — e nessuna è finita in
  una lista di Raffaele.
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

## Web design

Valgono per la skill [[code/skills/web-design/SKILL|web-design]]. Si verificano prima di rispondere:
se una non torna, si corregge e si riverifica.

- **Ogni consiglio è agganciato a un principio** di `docs/web-design/`, nominato per esteso nel
  testo. Nessun consiglio senza fonte.
- Le note citate sono state **aperte davvero**, non ricostruite dal riassunto in `llms.txt`.
  L'indice serve a scegliere quali aprire, non a rispondere.
- **Nessuna sintassi wikilink nella risposta.** Le doppie parentesi quadre valgono dentro i file del
  vault, non in un testo che Emanuele legge.
- Quello che gli appunti non coprono è **dichiarato con la formula esatta** — «questo i tuoi appunti
  non lo coprono» — e si dice quale pezzo della situazione è scoperto. Nessun consiglio generico
  messo lì a chiudere il buco, nessun principio allargato per farcelo entrare.
- **Regola e gusto sono distinti.** Quello che le note dichiarano come preferenza — «la sua
  preferita», «consigliato», «tendenzialmente» — è presentato come preferenza, non come obbligo. Un
  giudizio estetico è detto per quello che è.
- **La scelta di uno stile è data come proposta**, con il perché, mai come la risposta corretta: i
  siti non hanno uno stile definito a priori e lo stile è soggettivo. Le regole di design che valgono
  dentro qualunque stile — gerarchia, allineamento, tre colori, pesi dei media — sono invece date
  come regole.
- La scheda in `entities/` e la cartella in `projects/` sono state **cercate**. Se non ci sono, è
  detto — e sono state chieste le tre cose che servono: settore, target, materiale disponibile.
- Se il progetto è di un brand di famiglia, sono stati letti il suo `CLAUDE.md`, il suo `MEMORY.md`
  e i `reference/`, con `design.md` e `tono.md` per primi. **Il design system del brand vince sui
  principi generali**, e se c'è un contrasto è nominato.
- **La traccia del progetto è stata stabilita** — custom caricato sull'hosting, oppure WordPress —
  o è stata chiesta se dalla richiesta non si capiva. **Elementor non è stato consigliato.** In tutte
  e due le tracce la fonte di verità dichiarata è il sorgente, mai il sito pubblicato.
- Delle regole recuperate da `stile-siti.md`, **solo «i media passano da Drive» è data come
  specifica dei brand di famiglia**. Sorgente contro live e verifica post-deploy valgono ovunque, e
  sui formati vale la regola generale: la maggior parte in WebP, PNG e JPEG sotto i 200 KB, SVG per
  loghi e icone.
- Se la situazione tocca una delle **due** contraddizioni ancora aperte — animazioni, uso dell'AI —
  sono presentate **entrambe le versioni** ed è detto quale si sta seguendo. Nessuna scelta fatta in
  silenzio. Le tre chiuse il 26/08/2026 **non sono state riaperte**: dove una nota degli appunti dice
  il contrario di una decisione, vince la decisione.
- La risposta dice **cosa togliere**, non solo cosa mettere, ogni volta che la domanda riguarda una
  pagina che esiste già.
- Il tono è quello di una persona che parla, non di un documento. Le strutture sono concrete —
  quali sezioni, in che ordine — e le frasi da mettere in pagina sono scritte per esteso, non
  descritte.
- **Ogni cifra viene da [[self/tariffario|tariffario]].** Nessun numero calcolato o stimato, costo
  di temi e licenze compreso.
- **Non è stato scritto né modificato niente**: né file del vault, né un sito, né Notion, né
  TickTick. Questa skill legge e basta.


## Regia video

Per i due modi della skill [[code/skills/regia-video/SKILL|regia video]]. **Tutti e due i modi:**

- Ogni affermazione si aggancia a una nota di `docs/video-social/` che **esiste** ed è stata letta
  adesso. Quello che gli appunti non coprono è stato **detto**, senza il consiglio generico attaccato
  subito dopo, e **nessun prezzo è stato nominato**.
- Le regole **con un numero** sono contestate col numero — «l'hook entra a 4,1 secondi, la regola
  dice entro 3», mai «l'hook è un po' lento». Quelle **di gusto** sono date come opinioni e si
  distinguono; quelle **derivate**, come il carico utile entro i 10 secondi, sono dichiarate tali.

**«facciamo un reel su X» — creazione**

- Le tre domande che decidono il video — centro, tipo di contenuto, dolore — hanno una risposta prima
  che venga proposto un hook, e l'hook proposto è una **frase vera** col tipo dichiarato.
- La struttura è stata proposta **in secondi** ed **approvata da Emanuele prima** che venisse scritto
  codice, con l'hook dentro la finestra e la CTA in un punto non skippabile.
- La composizione esce a **1080×1920 e 30 fps**, fascia dei sottotitoli libera sotto il volto, tempi
  in **un file solo** in frame coi secondi nel commento, colori e font del brand — e se il vault non
  li ha, la mancanza è stata **detta**. Prima di consegnare è stato eseguito il modo revisione.

**«controlla questo video» — revisione**

- I tempi vengono dal **codice**, come `secondi = frame ÷ fps`. Se il codice non c'era, è stato
  **detto** che sono a occhio; se `ffmpeg` mancava, la revisione si è **fermata**.
- Sono stati estratti da **4 a 6 fotogrammi** nei momenti chiave e **guardati**: il giudizio sulla
  leggibilità viene da lì. Stanno nella cartella temporanea, non nel progetto.
- Il verdetto dice cosa **rispetta** le regole prima di cosa le viola, e se non viola niente lo dice
  in due righe senza cercare tre correzioni per sembrare utile.
- La **CTA a metà** è stata contestata solo con le analitiche in mano: senza, è «da verificare sui
  dati», non una violazione.

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

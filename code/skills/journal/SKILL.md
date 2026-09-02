# Journal — il diario di lavoro

Il cervello ha due strati di memoria. Quella **statica** sono le entità vere — i brand in
`areas/`, le procedure in `docs/`, i clienti in `entities/` — che cambiano di rado e sono
indicizzate in `llms.txt`. Quella **dinamica** è questo diario: ogni sessione e ogni giornata
lasciano una nota in `workspace/journal/`.

La regola che tiene insieme i due strati: **una nota di diario si aggancia sempre a un'entità
statica con un [[wikilink]]**. Una nota che non si aggancia a niente non è memoria, è un post-it
che tra un mese non dice più niente a nessuno.

Il diario però non basta a sapere dove sei. Lo **stato** delle cose vive fuori: le azioni su
TickTick, i contatti e le proposte su Notion. Per questo «buongiorno» li legge tutti e tre e ne
fa una cosa sola, e «chiudi sessione» controlla che quello che è emerso parlando sia finito dove
deve stare.

Le note del diario stanno in `workspace/`, che è fuori da `llms.txt` e fuori dal gate di qualità:
dopo aver scritto non serve rigenerare né rilanciare niente.

## Quando si usa

Tre comandi, tre momenti della giornata.

- **«buongiorno»** — all'inizio di una sessione. Briefing completo: dove eravamo rimasti, cosa
  c'è oggi, cosa è fermo. Esce sempre in due forme, scritta e audio: il testo è il lavoro, la voce
  è come lo ascolta.

  **Parte su qualsiasi forma di saluto, non su una formula.** «Buongiorno», «buongiornissimo»,
  «ciao», «ehi», «buondì», «eccomi», «iniziamo», «si parte», «ripartiamo», «dove eravamo
  rimasti», «briefing». Parte anche se il saluto è sgrammaticato, abbreviato o scritto male, e
  anche se ha attaccata un'altra richiesta — «ciao, poi dobbiamo vedere il sito di Cesco»: prima
  il briefing, poi quella cosa.

  La regola vera sta sotto le parole: **il primo messaggio di una sessione che serve ad aprirla
  invece che a chiedere un lavoro preciso è un buongiorno.** Se Emanuele deve nominare la skill
  perché parta, la skill ha già fallito — il briefing è la cosa che deve arrivare prima che lui
  pensi a chiederla.

  Non è un saluto un primo messaggio che parte da un lavoro: «sistemami questo file», «che ore ho
  libere giovedì», «scrivi la caption per il post». Lì si fa quello che chiede.

- **«chiudi sessione»** — alla fine di una sessione di lavoro. Scrive la nota della sessione e
  controlla che niente resti per aria. Vale ogni volta che Emanuele fa capire che per oggi è
  finita, comunque lo dica: «chiudiamo qui», «vado a dormire», «per oggi basta così», «segna cosa
  abbiamo fatto». Non aspettare la formula esatta — riconosci l'intenzione.
- **«fine giornata»** — quando la giornata è finita. Riassume tutte le sessioni del giorno in
  una nota sola. Vale anche come «chiudiamo la giornata», «riassunto di oggi».

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| La data di oggi in formato `YYYY-MM-DD` | dal sistema | sì, per tutti e tre |
| L'indice del cervello | `llms.txt` alla radice | sì, per tutti e tre |
| L'ultima nota di sessione | `workspace/journal/sessions/`, la più recente per nome file | sì per «buongiorno» |
| Task, appuntamenti e scadenze | TickTick, dal connettore attivo | sì per «buongiorno» |
| Proposte e contatti | Notion, dal connettore attivo | sì per «buongiorno» |
| Le card di Sistema Evolve | Trello, dal connettore attivo — **sola lettura** | sì per «buongiorno» |
| Il board, le liste e il member id di Trello | `riferimenti.json`, sezione `trello` | sì per «buongiorno» |
| Quali liste TickTick leggere, e quali ignorare | `riferimenti.json`, sezione `ticktick` | sì per «buongiorno» |
| Quali database Notion leggere | `riferimenti.json`, sezione `notion` | sì per «buongiorno» |
| Quando è stato l'ultimo briefing | `riferimenti.json`, `ticktick.ultimo_briefing` | sì per «buongiorno» |
| Che giorno della settimana è oggi | dal sistema | sì per «buongiorno»: il lunedì è diverso |
| Le sessioni di oggi | `workspace/journal/sessions/sessione-<oggi>.md` | sì per «fine giornata» |
| I template | `workspace/journal/_templates/` | sì per chi scrive |
| Cosa è successo nella sessione | la conversazione in corso | sì per «chiudi sessione» |
| Voce, modello e formato audio | `code/skills/journal/riferimenti.json`, sezione `audio` | sì per «buongiorno audio» |
| Il piano ElevenLabs | da `ELEVENLABS_GET_USER_SUBSCRIPTION_INFO` | sì per «buongiorno audio» |
| La sigla, se c'è | `code/skills/journal/assets/sigla.mp3` | no |

TickTick e Notion si leggono **dai connettori attivi**, non da Composio: è la divisione scritta
nel `CLAUDE.md` di radice. Composio serve per Gmail e Sheets, che qui non c'entrano.

Se `workspace/journal/sessions/` è vuota, non è un errore: si va ai casi limite.

## Passaggi

### Comando 1 — «buongiorno»

**Questo comando non scrive niente su un servizio esterno.** Legge — e leggere non richiede
conferma, né sui file né sui servizi. Le uniche due cose che scrive stanno dentro il vault:
`ticktick.ultimo_briefing` in [`riferimenti.json`](riferimenti.json), che serve al briefing di
domani per sapere cosa è cambiato, e l'mp3 del briefing in `workspace/journal/audio/`. Non è una
deroga alla regola sulle scritture, perché non esce dal vault. Se ti viene voglia di aggiornare
qualcos'altro, non è questo il momento.

Il briefing deve stare **in una schermata**. È una sintesi, non un inventario: se le task di oggi
sono quindici, quelle che contano sono tre. Un briefing che si scrolla non viene letto, e un
briefing non letto è tempo perso due volte.

**Le quattro sezioni di TickTick corrispondono ai quattro mondi** in cui Emanuele ha riorganizzato
le liste il 29/08/2026: il suo, dentro la cartella *Emanuele*, e i tre brand di famiglia, dove
l'unica lista sua è quella che si chiama *Digitale (Emanuele)*. Gli id stanno in
[`riferimenti.json`](riferimenti.json) e si leggono da lì, sempre.

Due regole valgono su tutto il comando, e non hanno eccezioni:

- **La colonna 💡 Idee non entra mai nel briefing, in nessuna lista.** Un'idea non è un impegno.
  Metterla in mezzo agli impegni fa sembrare in ritardo chi non lo è, e per difendersi da quella
  sensazione si smette di leggere il briefing.
- **Le liste di Raffaele non si leggono e non si nominano.** Sono quelle elencate in
  `ticktick.ignora_sempre` — manutenzione, lavori, elettricista, le inbox dei brand, le liste
  progetto della Masseria. Non compaiono nemmeno per dire che sono vuote. Una lista nuova che non
  sta né fra le sue né fra quelle da ignorare **non si indovina**: si nomina a Emanuele e si chiede
  dove va.

**Le sezioni vuote non si scrivono.** Niente righe «niente da segnalare», niente sezioni con dentro
un trattino. Se oggi non c'è formazione in scadenza, la sezione Formazione non esiste. Il valore di
una sezione è che quando compare vuol dire qualcosa.

**1 · Il saluto e il filo del diario.** Leggi `llms.txt` per sapere quali entità esistono. Poi
l'ultima nota in `workspace/journal/sessions/`: i nomi sono `sessione-<YYYY-MM-DD>.md`, quindi
l'ordine alfabetico è già quello cronologico. Leggi anche l'ultimo daily in
`workspace/journal/daily/`, se è più recente. Apri le note citate nel loro `related`, **solo
quelle**: non rileggere il vault intero.

Riporta: dove eravamo rimasti, con la data, e cosa era rimasto nella sezione `## Aperto`.

**1-bis · Solo il lunedì — «La settimana e gli obiettivi».** Il lunedì, e solo il lunedì, il
briefing apre con questa sezione, subito dopo il saluto. Leggi la lista **🎯 Obiettivi** e riporta
quelli attivi, poi di' **come le cose della settimana ci si agganciano**: quale task porta avanti
quale obiettivo, e soprattutto quale obiettivo non ha niente che lo muova. Un obiettivo senza
nessuna task che lo tocchi è la cosa più utile che questa sezione può dire.

Negli altri sei giorni **🎯 Obiettivi non si legge e non si nomina**. Un obiettivo ripetuto ogni
mattina diventa arredamento.

**2 · 📆 La giornata.** Appuntamenti e scadenze di **oggi**, presi da **🌱 Personale** e
**💼 Personal Brand** insieme e mescolati in un'unica lista in ordine di ora: la giornata è una
sola, e spezzarla in due elenchi costringe a ricomporla a mente.

Poi, sotto, **quello che è in ritardo** — scadenze passate e non chiuse, le più urgenti in cima.
Una cosa in ritardo pesa più di una che deve ancora arrivare.

⚠️ **Delle task di 🌱 Personale si dicono solo il titolo e l'ora.** Mai il contenuto, mai le note.
Sono cose sue: dentro una task personale può esserci materiale privato, e il briefing viene letto
ad alta voce, ascoltato in macchina, guardato con qualcuno accanto. Il titolo dice quanto basta per
organizzare la giornata. Se il titolo da solo non si capisce, si lascia com'è: non si va a cercare
il contesto nelle note.

**3 · 💼 Personal Brand.** Il lavoro suo. Nell'ordine:

- **in corso** — cosa c'è nella colonna ⏳ In corso;
- **in scadenza entro la settimana** — appuntamenti e scadenze dei prossimi sette giorni, presi
  dalle colonne 📆 Appuntamenti e 🔔 Scadenze.

  ⚠️ **Una task che comincia con «Setting» non è un appuntamento**: è il messaggio o la
  chiamata con cui Emanuele fissa l'appuntamento. Nel briefing si dice così — «da sentire per
  fissare», mai «incontro con». Chiamarla appuntamento gli fa credere di avere un'agenda che non
  ha, e fa preparare la cosa sbagliata: il setting si prepara con la domanda di trasformazione e
  l'agenda a scelta chiusa, la discovery si prepara quando l'incontro esiste;
- **le proposte aperte su Notion**, con **da quanti giorni** sono ferme, contando da `Creato`. Le
  liste, gli id e i nomi dei campi stanno in `riferimenti.json`, sezione `notion`: si interrogano
  dal `data_source`, non dal `database_id`, e si escludono le righe con `Archivia` spuntata. Gli
  stati aperti sono in `stati_aperti`.
  - Per ognuna, chiedi se c'è un aggiornamento da registrare.
  - Se una proposta è ferma da **più di sette giorni**, segnalala come *da sollecitare o
    aggiornare*: è il punto in cui una proposta smette di essere in corso e diventa un silenzio.
- **le scadenze dei siti.** In `Siti Clienti` ci sono tre date per ogni sito — hosting, assistenza,
  dominio. Riporta quelle che scadono **entro trenta giorni**, ordinate dalla più vicina, e marca
  come **urgenti** quelle sotto i quattordici. Una riga per scadenza: sito, cosa scade, fra quanti
  giorni.

  Questa è la parte del briefing che vale più delle altre. È **fatturato ricorrente**: un rinnovo
  che scade nel silenzio non è una task dimenticata, è un cliente che se ne va senza che nessuno se
  ne accorga. Se non scade niente nei trenta giorni, non scrivere una riga per dirlo.
- **una riga sola sui contatti**: un contatto in `stati_caldi` con la relazione `Proposte` vuota è
  qualcuno a cui hai parlato e non hai mai mandato niente. Non fare il censimento dei contatti.

**3-bis · 🏋️ Sistema Evolve.** Il reparto marketing di Evolve, che sta su **Trello** e non su
TickTick. Board *Marketing*, id e liste in [`riferimenti.json`](riferimenti.json), sezione
`trello`.

⚠️ **Da qui Trello si legge e basta.** Non si crea nessuna card, non se ne sposta nessuna, non
si commenta e non si spunta niente — nemmeno se sembra la cosa ovvia da fare. Le modifiche le
fa Emanuele dal cervello aziendale di Evolve. Il board è condiviso con Vincenzo e Karim: una
card scritta da qui arriva a loro col nome di Emanuele sopra, e non c'è modo di spiegare da
dove è uscita.

⚠️ **Solo le card assegnate a Emanuele.** Il board è del reparto, quindi ci sono dentro anche
le card di Karim e di Vincenzo: sono lavoro vero, ma non è lavoro suo, e metterlo nel suo
briefing gli fa sembrare in carico qualcosa che non deve fare lui. È la stessa regola delle
liste di Raffaele.

Si riporta, in due righe al massimo:

- **in corso** — le sue card nella lista ⏳ IN CORSO;
- **in scadenza** — le sue card con una data entro la settimana, da ⏳ IN CORSO e ⌛️ NON
  INIZIATO insieme.

💡 IDEE e ✅ FATTO **non entrano mai**, come le colonne omonime su TickTick.

Se non ha nessuna card assegnata, **la sezione non compare**: vale la regola delle sezioni
vuote come per tutte le altre.

**4 · 👨‍👩‍👦 Famiglia.** Solo dalle tre liste **Digitale (Emanuele)** — DMR, MMA, TDG. Nient'altro
dentro quelle cartelle esiste per il briefing.

- **in corso** — la colonna ⏳ In corso delle tre liste, con il brand davanti;
- **in scadenza** — quello che ha una data entro la settimana;
- **novità** — le task **create o modificate dopo `ticktick.ultimo_briefing`**. Sono le mosse che
  Raffaele ha fatto mentre Emanuele non guardava, e vanno segnalate come **«nuove da Raffaele»**:
  è l'unico posto del briefing dove compare qualcosa che non ha deciso lui.

  Se `ultimo_briefing` è `null` — prima esecuzione dopo il cambio di struttura — **non inventare una
  finestra**. Dillo in una riga: è il primo giro, da domani le novità si vedono. Una finestra
  scelta a caso il primo giorno segnala come nuovo tutto l'archivio.

**5 · 📖 Formazione.** Una riga sola, e **solo se** c'è qualcosa con una data entro la settimana.
Se non c'è, la sezione non compare.

**6 · 📥 Inbox.** Se non è vuota: «hai N cose da smistare». **Senza elenco.** L'inbox è il posto
dove si mette quello che non si è ancora deciso dove va: elencarla vuol dire fare due volte il
lavoro di smistamento, una a vuoto. Se è vuota, la sezione non compare.

**7 · Le tre cose di oggi.** Chiudi proponendo tre priorità, **trasversali su tutti i contesti**:
il lavoro suo, la famiglia, il personale e la formazione competono per le stesse ore, e una
classifica che vive dentro una sezione sola non serve a niente. Per ognuna mezza frase sul perché —
cosa blocca cos'altro, o cosa scade.

**È una proposta, non un ordine.** Decide Emanuele. Se due cose pesano uguale dillo, invece di
inventare una gerarchia per far tornare il numero tre.

**8 · La frase per la giornata.** Il briefing finisce con una riga che dà la spinta a partire.
Non è decorazione: le tre priorità dicono cosa fare, questa dice perché vale la pena farlo oggi.

**Deve nascere da questa giornata, non da un poster.** Si scrive guardando quello che è appena
uscito nel briefing — la cosa che si sblocca, quella che pesa, quella che va chiusa da settimane
— e si nomina. «Andrea è la prima porta che apri da solo: il resto della settimana si appoggia a
com'è andata» è una frase per oggi. «Credi in te stesso» non è una frase, è un riempitivo.

I divieti della sezione «Come non si scrive mai» del `CLAUDE.md` di radice valgono qui come
altrove — niente «non si tratta solo di», niente aggettivi a coppie, niente emoji. Il bando sulle
chiusure motivazionali riguarda i testi che leggono i clienti: questo lo legge solo Emanuele, e
lui l'ha chiesta. Ma una frase che potrebbe stare in fondo al briefing di chiunque è sbagliata
per la stessa ragione per cui è sbagliato un testo che potrebbe essere di qualsiasi attività.

**Una riga, due al massimo.** Se non c'è niente di vero da dire perché la giornata è vuota, si
dice quello: un giorno scarico è un'informazione, e fingere slancio quando non serve brucia la
frase per il giorno in cui serve davvero.

**9 · L'audio.** Vai al comando 4 e fallo. **Non è opzionale e non si aspetta che lo chieda**:
il briefing esce scritto e parlato ogni volta. Se ElevenLabs non risponde o la quota è finita,
vale il caso limite — il testo è già uscito e la giornata è salva.

**10 · Aggiorna `ultimo_briefing`.** Alla fine, e solo se il briefing è uscito davvero, scrivi in
`riferimenti.json` il timestamp di adesso. Se una fonte non ha risposto, scrivilo lo stesso: il
briefing è uscito, e la sezione mancante era dichiarata. Se è fallito l'audio ma il testo è
uscito, il timestamp si scrive: il briefing è il testo.

### Comando 2 — «chiudi sessione»

1. Ripercorri la conversazione e separa tre cose: cosa è stato **fatto** davvero, cosa è stato
   **deciso** (con la ragione della decisione), cosa resta **aperto**.
2. Raccogli le note toccate durante la sessione, coi **percorsi completi dalla radice**. Sono
   quelle che finiranno nel `related` e nei wikilink del corpo.
3. **Verifica l'aggancio.** Serve almeno un wikilink a un'entità statica che esiste davvero:
   controllala in `llms.txt`. Se la sessione non ha toccato nessuna entità — una chiacchierata,
   una decisione ancora senza casa — **fermati e chiedi a Emanuele a cosa va collegata**. Non
   scrivere una nota sciolta e non inventare un aggancio plausibile.
4. Dimmi in **tre righe** cosa hai capito che abbiamo fatto. Poi **fermati e aspetta l'ok**.
   Non scrivere niente prima.
5. All'ok, scrivi `workspace/journal/sessions/sessione-<YYYY-MM-DD>.md` partendo da
   `workspace/journal/_templates/sessione.md`:
   - `title`: `Sessione <YYYY-MM-DD>`;
   - `summary`: una frase che dice cosa si è fatto, non «lavoro sul vault»;
   - `tags`: `workspace` come primo tag, poi `type/session`, poi eventuali tag di brand
     (`brand/da-mamma-rosaria` e simili) se la sessione ha lavorato su un'area;
   - `status: done`;
   - `created` e `updated`: la data di oggi, in `YYYY-MM-DD`;
   - `related`: lista multi-riga, un wikilink quotato per riga, con tutte le note toccate.
6. Il corpo ha tre sezioni, in quest'ordine: `## Fatto`, `## Deciso`, `## Aperto`. I wikilink
   vanno **dentro il testo**, dove si nomina la nota, non solo nel `related`. Se una sezione è
   davvero vuota, scrivi `Niente.` e vai avanti: non riempirla per simmetria.

7. **Il check di uscita.** Il diario registra cosa è successo, ma le cose da *fare* vivono su
   TickTick e lo stato dei clienti su Notion. Ripassa la sessione e cerca quello che è emerso
   parlando e non è finito da nessuna parte:

   - **per TickTick** — task nuove, appuntamenti presi, scadenze nominate;
   - **per Notion** — stati da cambiare, proposte inviate, esiti arrivati.

   Elenca quello che hai trovato e chiedi a Emanuele se vuoi scriverlo ora. **Mostra sempre il
   testo esatto prima di scriverlo** — titolo della task con data e ora, o riga di Notion con
   campo e valore nuovo — e scrivi solo dopo il suo ok, una cosa alla volta.

   **Per ogni task che esce di qui, chiedi in quale lista va.** Con quattro mondi la domanda «dove»
   non ha più una risposta ovvia, e indovinare vuol dire seppellire una cosa dove non la cerca
   nessuno. Le destinazioni possibili sono cinque:

   - **💼 Personal Brand** — il suo lavoro da freelance;
   - **🌱 Personale** — la sua vita;
   - **📖 Formazione** — quello che studia;
   - **una lista Digitale** — DMR, MMA o TDG, se la cosa riguarda il digitale di un brand di
     famiglia. Le altre liste dei brand sono di Raffaele e **non sono una destinazione**;
   - **💡 Idee** — la colonna, dentro la lista giusta, quando è uno spunto e non un impegno. Da lì
     il briefing non la ripescherà, ed è esattamente quello che deve succedere a un'idea.

   Se nessuna delle cinque torna, la destinazione è **📥 Inbox**: è il posto per quello che non si
   è ancora deciso dove va, e mettercelo è una risposta, non una resa.

   Se non è emerso niente, dillo in una riga e chiudi. Un check di uscita che inventa due task
   per sembrare utile fa più danno di uno che dice «niente da registrare».

8. **Il messaggio di chiusura.** Una giornata deve finire in modo riconoscibile, altrimenti non
   finisce: resta la sensazione di aver lasciato qualcosa a metà. L'ultimo messaggio quindi si
   scrive così, e ha una forma sua:

   - **chiamalo per nome.** «Ok Emanuele, chiudiamo qui la giornata.» Non è un vezzo: è il
     segnale che quello che segue è una chiusura e non un altro giro di lavoro;
   - **racconta cosa è stato fatto**, ordinato e per intero, con i numeri veri;
   - **niente domande, niente proposte, niente «vuoi che…».** Le decisioni che potevi prendere
     da solo le hai già prese; quelle che restano aspettano domani;
   - **una cosa in sospeso si nomina solo se è importante davvero** — qualcosa che, se domani
     mattina lui non lo sa, gli fa sbagliare una mossa. Il resto sta già scritto nella nota di
     sessione e nel briefing di domani;
   - **chiudi con una frase che dia il senso della giornata.** Non una massima da poster: una
     frase vera su quello che è stato costruito oggi. Deve leggersi come una porta che si chiude.

   Se una cosa andava fatta e potevi farla, falla **prima** di scrivere questo messaggio: la
   chiusura non è il posto dove si chiede il permesso, è il posto dove si dice cosa è successo.

### Comando 3 — «fine giornata»

1. Leggi **tutte** le sessioni di oggi in `workspace/journal/sessions/`. Di norma è una sola, ma
   se la giornata è stata spezzata possono essere più di una.
2. Unisci i tre blocchi delle sessioni: cosa è stato fatto in tutta la giornata, cosa è stato
   deciso, cosa resta aperto **a fine giornata** — se una cosa era aperta al mattino e chiusa nel
   pomeriggio, non è più aperta.
3. Raccogli le entità toccate durante il giorno: sono l'unione dei `related` delle sessioni.
   Tieni quelle principali, non tutte le comparse.
4. Dimmi in **tre righe** cosa è successo oggi. Poi **fermati e aspetta l'ok**.
5. All'ok, scrivi `workspace/journal/daily/<YYYY-MM-DD>.md` partendo da
   `workspace/journal/_templates/daily.md`. Stessa struttura della sessione, con due differenze:
   - `tags`: `workspace`, poi `type/daily`;
   - `related`: **tutte le sessioni del giorno** più le entità principali toccate.
6. In fondo aggiungi la sezione `## Sessioni`: una riga per sessione, col wikilink e mezza frase
   su cosa è stata.
7. Se il daily di oggi esiste già, non sovrascriverlo al buio: si va ai casi limite.

### Comando 4 — l'audio del buongiorno

**Non è un comando che Emanuele invoca: è il passo 9 del comando 1**, e parte da solo ogni
mattina. Resta scritto qui a parte solo perché è lungo. Se lui lo chiede a voce — «me lo leggi?»,
«mandamelo in vocale» — sta chiedendo una cosa che è già in corso.

**Prima si fa il comando 1 per intero.** Il briefing scritto esce sempre, ed è la fonte: l'audio
è una vista di quel testo, non un secondo briefing. Se le due versioni dicono cose diverse, quella
sbagliata è l'audio — perché è la copia.

**1 · Riscrivi per l'orecchio.** Il briefing scritto letto ad alta voce è rumore: una tabella
diventa un elenco di parole senza colonne, un percorso di file diventa una sigla incomprensibile,
un numero di giorni fra parentesi diventa un inciso che perde il filo. Va riscritto, non
convertito.

La versione parlata sta in **60-90 secondi**. Misurato: il modello legge a circa **896 caratteri
al minuto**, quindi il testo va scritto fra i 900 e i 1.290 caratteri — i valori stanno in
`caratteri_target` dentro [`riferimenti.json`](riferimenti.json). Non si stima a occhio e non ci si
fida della stima: **si misura la durata del file** prima di consegnarlo, con `afinfo` che su macOS
c'è sempre. È discorsiva, come se qualcuno gliela raccontasse entrando in ufficio:

> «Buongiorno Emanuele. Ieri hai chiuso con la trattativa Lampion Square persa e il metodo
> messo nel correction log. Oggi hai l'appuntamento con Karim in ufficio, in mattinata, e non ha
> un'ora: se non l'hai già fatto, è la prima cosa da fissare…»

Le regole della riscrittura:

- **Niente percorsi di file, niente id, niente nomi di database.** Nessuno ascolta
  `docs/vendita/problema-bruciante`. Si dice «gli appunti di vendita».
- **Niente formattazione parlata.** Non si legge «trattino», non si annuncia «prima voce»,
  non si dice «due punti».
- **Le date si dicono come si dicono a voce**: «fra tre settimane», non «16/09/2026». La data
  esatta sta nel testo, che resta lì da leggere.
- **I numeri si arrotondano quando non cambiano niente**: «una decina di lead», non «dieci lead
  con priorità alta e quattro con sito».
- **Le tre priorità vanno in fondo**, nell'ordine del testo, una frase ciascuna. Sono la sola
  cosa che deve ricordare.
- **Chiude la frase per la giornata**, quella del passo 8, e chiude davvero: dopo non si aggiunge
  niente, non si saluta, non si ricorda un'ultima cosa. È l'ultima cosa che sente prima di
  mettersi a lavorare, e una frase di spinta seguita da un'appendice non spinge più.

**2 · Sintetizza.** Con `ELEVENLABS_TEXT_TO_SPEECH`, voce, modello e formato dalla sezione `audio`
di [`riferimenti.json`](riferimenti.json).

Se `voce.scelta` è `null`, **non scegliere in silenzio**: proponi le candidate con una riga sul
perché, di' quale useresti, e salva la scelta in `riferimenti.json` quando Emanuele risponde. Si
chiede una volta sola nella vita della skill.

**Le candidate devono essere voci che il piano permette davvero.** Sul piano free le voci della
libreria condivisa sono vietate — ElevenLabs risponde `free_users_not_allowed` — e restano solo le
premade, che sono nate in inglese e in italiano si sentono. È una limitazione del piano, non della
skill: va detta a Emanuele invece di consegnargli una voce con l'accento senza spiegare perché.

**La risposta della sintesi si salva alla prima chiamata e si riusa.** Contiene l'URL da cui si
scarica l'mp3, e rilanciare la sintesi per rileggere quell'URL vuol dire pagare due volte lo stesso
audio.

**La quota si legge prima di sintetizzare, tutti i giorni**, con
`ELEVENLABS_GET_USER_SUBSCRIPTION_INFO`. Da quando l'audio è quotidiano non è più un dettaglio da
primo collaudo: il piano free dà 10.000 caratteri al mese e un briefing ne consuma circa 1.200,
quindi **il mese non ci sta**. Otto mattine e la quota è finita, e le altre ventidue restano
senza voce.

Come si comporta la lettura:

- **Sopra i tre briefing residui** non si dice niente. Un avviso quotidiano su una cosa nota
  smette di essere letto, e quando conta davvero è già rumore di fondo.
- **Sotto i tre**, una riga sola dopo il briefing: quanti ne restano e in che giorno si azzera
  la quota. Non è una domanda, è un dato — l'audio si fa comunque.
- **A quota finita** non si tenta la sintesi: si dice che il testo è uscito, che l'audio riparte
  dal giorno del rinnovo, e si chiude lì. Ogni chiamata che parte consuma anche quando fallisce.

Se Emanuele vuole la voce tutti i giorni del mese, il piano free non basta e la scelta è sua:
salire di piano o accettare che l'audio copra la prima settimana. **Non è una decisione da
prendere al posto suo, e non si ripropone ogni mattina**: si dice una volta quando la quota
finisce, poi si smette.

**3 · La musica, se c'è.** Se esiste `code/skills/journal/assets/sigla.mp3`, va sotto la voce con
ffmpeg: apre da sola per due o tre secondi, scende quando entra la voce, risale in coda.

```bash
ffmpeg -i sigla.mp3 -i voce.mp3 -filter_complex \
  "[0:a]atrim=0:<durata voce + 5>,asetpts=N/SR/TB[m]; \
   [1:a]adelay=3000|3000[v]; \
   [m][v]sidechaincompress=threshold=0.02:ratio=8:attack=200:release=1200[mix]" \
  -map "[mix]" briefing.mp3
```

**Se la sigla non c'è, esce la voce sola e non si dice niente.** L'assenza di una cosa mai
esistita non è una notizia, e un avviso che si ripete ogni mattina viene ignorato — insieme a
quelli che contano.

**ffmpeg si controlla solo se c'è una sigla da mixare.** Se la sigla c'è e ffmpeg manca, fermati e
di' come si installa — `brew install ffmpeg` — invece di consegnare la voce nuda facendo finta che
fosse quello che aveva chiesto.

**4 · Consegna.** Salva in `workspace/journal/audio/briefing-<YYYY-MM-DD>.mp3` e aprilo. Poi
cancella gli mp3 in quella cartella più vecchi di **sette giorni**: sono usa e getta, si ascoltano
una volta e non si riascoltano. La memoria è il diario scritto, non l'audio.

**Se ElevenLabs non risponde, il briefing scritto è già uscito e la giornata è salva.** Dillo in
una riga e chiudi lì. Non riprovare in loop e non rimandare il testo: l'audio è la comodità, il
briefing è il lavoro.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Journal** di
[`../../../docs/definizioni-di-fatto.md`](../../../docs/definizioni-di-fatto.md), che è la fonte.

Si verificano **prima** di consegnare l'output, comando per comando. Se una non torna, si
corregge e si riverifica: il risultato si dà solo quando passano tutte.

## Casi limite

**Un servizio non risponde, o ci mette troppo.** Il briefing esce lo stesso, con la sezione
mancante dichiarata: «TickTick non raggiungibile», «Notion non raggiungibile». Non si aspetta, non
si riprova all'infinito, e soprattutto non si tace: un briefing senza la riga di TickTick e senza
spiegazione fa credere che oggi non ci sia niente da fare. **Mai bloccare il buongiorno per un
connettore lento.**

**Trello non risponde, o il board è cambiato.** Il briefing esce lo stesso, con la riga
«Trello non raggiungibile». Se il board o le liste non rispondono più — rinominati, spostati,
o la condivisione revocata — **dillo e chiedi**: non cercare a tentoni un altro board del
workspace. Una condivisione revocata non è un errore tecnico, è una notizia sulla relazione
con Evolve, e va detta come tale invece di essere aggirata.

**Un id di `riferimenti.json` non risponde più.** Il file è stato compilato il 21/08/2026
leggendo lo schema vero delle liste, quindi la domanda su quale database sia quale **non si fa
più**. Se però un id smette di rispondere — lista rinominata, spostata, cancellata — dillo e
chiedi quello nuovo. Non cercare a tentoni un database che somigli: due liste con nomi simili
esistono davvero in quel workspace, e leggere quella sbagliata è peggio che non leggere niente.

**Le proposte «Pronta per l'invio» non si sollecitano.** Sono aperte, ma sono ferme su Emanuele,
non sul cliente. Nel briefing vanno nominate per quello che sono — da mandare, non da sollecitare
— e i sette giorni non c'entrano.

**Una lista TickTick non è nella mappa.** Non si legge e non si indovina: si nomina a Emanuele e
si chiede se è sua o di Raffaele. Dentro le cartelle dei brand il default è che sia di Raffaele,
perché è vero per tutte tranne una. Leggere una lista di Raffaele non è un errore di forma: è
mettere nel briefing di Emanuele delle cose che non deve fare lui.

**Un id di `ticktick` non risponde più.** Lista rinominata, spostata o cancellata: dillo e chiedi
quello nuovo. Non cercare a tentoni una lista dal nome simile — dal 29/08/2026 i nomi si somigliano
per costruzione, «DMR · Digitale» e «DMR · Inbox» stanno nella stessa cartella, e prendere quella
sbagliata è peggio che non leggere niente.

**`ultimo_briefing` è null o è vecchio di settimane.** Se è null, è il primo giro: dillo e non
segnalare novità. Se è vecchio, la finestra è vera lo stesso — le novità sono davvero tutte quelle,
e vanno dette, non tagliate per far stare il briefing in una schermata. In quel caso raggruppa:
«sette task nuove sulle liste della Masseria», e l'elenco solo se lo chiede.

**È lunedì e 🎯 Obiettivi è vuota.** La sezione della settimana non si scrive lo stesso con dentro
una scusa. Si dice in una riga che non ci sono obiettivi attivi e si va avanti: è un'informazione,
ed è anche un promemoria.

**La cartella delle sessioni è vuota** (prima volta che si usa la skill). «Buongiorno» non ha
diario da leggere: dillo in una riga e vai avanti con TickTick e Notion, che ci sono comunque.

**La sessione non ha toccato nessuna entità.** Fermati e chiedi a cosa va collegata. È il caso
per cui esiste la regola: senza aggancio la nota non si scrive.

**Il file di oggi esiste già.** Può succedere con due sessioni nello stesso giorno. Non
sovrascrivere: leggi quello che c'è, mostra a Emanuele cosa aggiungeresti e chiedi se va **unito**
alla nota esistente o se serve un secondo file. Se serve il secondo, il nome è
`sessione-<YYYY-MM-DD>-2.md`.

**Emanuele indica una voce nuova.** Si cerca con `ELEVENLABS_GET_VOICES`, e se c'è **si prova
prima di impostarla**, con una stringa di poche parole. Comparire nella lista dell'account non
vuol dire essere usabile: quella lista dice cosa possiedi, non cosa l'API ti lascia sintetizzare,
e sul piano free le voci di libreria si vedono ma non si sentono. Una voce messa in `scelta` senza
prova rompe il briefing di tutte le mattine seguenti, e lo scopri quando serve.

Se la prova fallisce, la voce **non si imposta**: si dice perché, si scrive il suo id in
`voce.scelta_quando_il_piano_sale` dentro [`riferimenti.json`](riferimenti.json) e si tiene quella
che funziona. La richiesta non si perde e il briefing non si rompe. Se la prova riesce, si scrive
in `voce.scelta` e la si usa da subito.

**ElevenLabs non risponde, o il piano è esaurito.** Il briefing scritto è già uscito: dillo in
una riga — «l'audio non si è fatto, ElevenLabs non risponde» oppure «il piano è finito, si azzera
il tale giorno» — e chiudi. L'audio che fallisce non blocca mai il briefing, e non si riprova in
loop: ogni tentativo che parte consuma caratteri.

**Il testo parlato non sta nei 90 secondi.** Non è un problema di sintesi, è un problema di
scrittura: vuol dire che nella versione parlata è finito qualcosa che andava lasciato al testo.
Taglia dalla riscrittura, non dal briefing.

**Emanuele chiede l'audio quando il briefing scritto non è stato fatto.** Si fa prima il comando 1
per intero. Non esiste un audio senza il testo dietro: sarebbe un briefing di cui non resta niente
di verificabile.

**Il saluto arriva a sessione già avviata.** Il buongiorno è il primo messaggio della sessione. Se
a metà pomeriggio, dopo due ore di lavoro, Emanuele scrive «ciao», non è un briefing: è una parola
in mezzo a un discorso. Il segnale è la posizione, non la parola.

**Due saluti nello stesso giorno**, perché la sessione è ripartita. Il briefing si rifà — la
giornata nel frattempo è cambiata — ma **l'audio no**: l'mp3 di oggi esiste già, e rifarlo paga
due volte lo stesso minuto di voce. Vale la regola del correction log del 25/08: se l'output serve
due volte, si rilegge.

**Emanuele dice che la frase della giornata non gli piace, o suona finta.** Non se ne genera
un'altra sul momento sperando che vada meglio: si chiede cosa non tornava e la risposta finisce in
[`../../../correction.md`](../../../correction.md). È l'unica riga del briefing che parla con la
sua voce invece che dei suoi dati, ed è quella che si sente di più se è sbagliata.

**Non ricordi con precisione cosa è stato fatto.** Scrivi solo quello di cui sei sicuro e chiedi
il resto. Una nota di diario incompleta si completa; una inventata avvelena il briefing di domani.

**Emanuele corregge il riassunto delle tre righe.** La correzione vale: riscrivi le tre righe e
richiedi l'ok prima di scrivere il file. Se è un errore che potrebbe ricapitare, aggiungi una riga
a [`../../../correction.md`](../../../correction.md).

**Una nota che vorresti citare non esiste.** Non crearla di sbieco dal diario. Nominala nel testo
senza wikilink, mettila tra le cose aperte e dillo a Emanuele.

Prima di eseguire questa skill, leggi [`../../../correction.md`](../../../correction.md).

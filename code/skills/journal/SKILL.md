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
  c'è oggi, cosa è fermo. Vale anche detto come «dove eravamo rimasti», «ripartiamo», «briefing».
- **«chiudi sessione»** — alla fine di una sessione di lavoro. Scrive la nota della sessione e
  controlla che niente resti per aria. Vale anche come «chiudiamo qui», «segna cosa abbiamo fatto».
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
| Quali database Notion leggere | `code/skills/journal/riferimenti.json` | sì per «buongiorno» |
| Le sessioni di oggi | `workspace/journal/sessions/sessione-<oggi>.md` | sì per «fine giornata» |
| I template | `workspace/journal/_templates/` | sì per chi scrive |
| Cosa è successo nella sessione | la conversazione in corso | sì per «chiudi sessione» |

TickTick e Notion si leggono **dai connettori attivi**, non da Composio: è la divisione scritta
nel `CLAUDE.md` di radice. Composio serve per Gmail e Sheets, che qui non c'entrano.

Se `workspace/journal/sessions/` è vuota, non è un errore: si va ai casi limite.

## Passaggi

### Comando 1 — «buongiorno»

**Questo comando non scrive niente.** Legge e basta — e leggere non richiede conferma, né sui
file né sui servizi. Se ti viene voglia di aggiornare qualcosa, non è questo il momento.

Il briefing deve stare **in una schermata**. È una sintesi, non un inventario: se le task di oggi
sono quindici, quelle che contano sono tre. Un briefing che si scrolla non viene letto, e un
briefing non letto è tempo perso due volte.

**1 · Il diario.** Leggi `llms.txt` per sapere quali entità esistono e come si chiamano. Poi
l'ultima nota in `workspace/journal/sessions/`: i nomi sono `sessione-<YYYY-MM-DD>.md`, quindi
l'ordine alfabetico è già quello cronologico. Leggi anche l'ultimo daily in
`workspace/journal/daily/`, se è più recente. Apri le note citate nel loro `related`, **solo
quelle**: non rileggere il vault intero.

Riporta: dove eravamo rimasti, con la data, e cosa era rimasto nella sezione `## Aperto`.

**2 · TickTick.** Leggi e riporta, in quest'ordine:

- **oggi** — task e appuntamenti di oggi, con gli orari;
- **in ritardo** — task scadute, le più urgenti in cima;
- **la settimana** — appuntamenti e scadenze dei prossimi sette giorni.

Le scadute vanno sopra la settimana anche se sono poche: una cosa in ritardo pesa più di una che
deve ancora arrivare.

**3 · Notion.** Leggi la lista Proposte — quale database sia sta scritto in
`code/skills/journal/riferimenti.json`. Riporta le proposte con stato **aperto** (in attesa,
inviata) e **da quanti giorni** sono in quello stato.

- Per ognuna, chiedi se c'è un aggiornamento da registrare.
- Se una proposta è ferma da **più di sette giorni**, segnalala come *da sollecitare o
  aggiornare*: è il punto in cui una proposta smette di essere in corso e diventa un silenzio.

Se leggi anche la lista Contatti e trovi uno stato che chiede un'azione — un lead caldo senza
nessuna proposta collegata, un cliente fermo da mesi — dillo in **una riga sola**. Non fare il
censimento dei contatti: quello non è un briefing.

**4 · Le tre cose di oggi.** Chiudi proponendo tre priorità, incrociando le tre fonti: cosa era
aperto ieri, cosa scade oggi, cosa è fermo da troppo. Per ognuna mezza frase sul perché — cosa
blocca cos'altro, o cosa scade.

**È una proposta, non un ordine.** Decide Emanuele. Se due cose pesano uguale dillo, invece di
inventare una gerarchia per far tornare il numero tre.

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

   Se non è emerso niente, dillo in una riga e chiudi. Un check di uscita che inventa due task
   per sembrare utile fa più danno di uno che dice «niente da registrare».

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

**Prima esecuzione: non si sa quali database Notion leggere.** Il file
`code/skills/journal/riferimenti.json` esiste ma è vuoto. Chiedi a Emanuele quale database è la
lista **Proposte** e quale la lista **Contatti**, cercali su Notion per confermare che esistano, e
**salva id e nome nel file**. È l'unica volta che la domanda si fa: dalla seconda in poi si legge
da lì. Se il file c'è ma un id non risponde più, dillo e richiedi quello — non cercare a tentoni
un database che somigli.

**La cartella delle sessioni è vuota** (prima volta che si usa la skill). «Buongiorno» non ha
diario da leggere: dillo in una riga e vai avanti con TickTick e Notion, che ci sono comunque.

**La sessione non ha toccato nessuna entità.** Fermati e chiedi a cosa va collegata. È il caso
per cui esiste la regola: senza aggancio la nota non si scrive.

**Il file di oggi esiste già.** Può succedere con due sessioni nello stesso giorno. Non
sovrascrivere: leggi quello che c'è, mostra a Emanuele cosa aggiungeresti e chiedi se va **unito**
alla nota esistente o se serve un secondo file. Se serve il secondo, il nome è
`sessione-<YYYY-MM-DD>-2.md`.

**Non ricordi con precisione cosa è stato fatto.** Scrivi solo quello di cui sei sicuro e chiedi
il resto. Una nota di diario incompleta si completa; una inventata avvelena il briefing di domani.

**Emanuele corregge il riassunto delle tre righe.** La correzione vale: riscrivi le tre righe e
richiedi l'ok prima di scrivere il file. Se è un errore che potrebbe ricapitare, aggiungi una riga
a [`../../../correction.md`](../../../correction.md).

**Una nota che vorresti citare non esiste.** Non crearla di sbieco dal diario. Nominala nel testo
senza wikilink, mettila tra le cose aperte e dillo a Emanuele.

Prima di eseguire questa skill, leggi [`../../../correction.md`](../../../correction.md).

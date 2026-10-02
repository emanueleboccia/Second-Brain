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
  è come lo ascolta. La procedura sta in [`buongiorno.md`](buongiorno.md).

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
  abbiamo fatto». Non aspettare la formula esatta — riconosci l'intenzione. La procedura sta in
  [`chiusura.md`](chiusura.md).
- **«fine giornata»** — quando la giornata è finita. Riassume tutte le sessioni del giorno in
  una nota sola. Vale anche come «chiudiamo la giornata», «riassunto di oggi».

## I file della skill

| File | Cosa tiene |
|---|---|
| [`buongiorno.md`](buongiorno.md) | la procedura del mattino, audio compreso, con le trappole del correction log che la riguardano |
| [`chiusura.md`](chiusura.md) | la procedura di «chiudi sessione», con le sue trappole |
| [`riferimenti.json`](riferimenti.json) | gli id di TickTick, Trello e Notion, le viste, la voce e la quota dell'audio, `ultimo_briefing` |
| `workspace/journal/_templates/` | i modelli della nota di sessione e del daily |
| `workspace/journal/audio/` | gli mp3 del briefing, tenuti sette giorni |
| `assets/` | la sigla, se un giorno c'è |

TickTick e Notion si leggono **dai connettori attivi**, non da Composio: è la divisione scritta nel
`CLAUDE.md` di radice. Da Composio passano solo ElevenLabs, per la voce, e Granola, per le riunioni.

**Il buongiorno e la chiusura hanno ciascuno il suo file dal 28/09/2026.** Ogni mattina si rileggevano
140 KB di regole per usarne una parte piccola, e il briefing ci metteva otto minuti. Questo file resta la
mappa della skill: tiene la fine giornata, la review, la scelta della voce e il modo di parlare a
Emanuele. Per la fine giornata servono la data di oggi, le sessioni di oggi e il modello del daily.

## Passaggi

### Comando 1 — «buongiorno»

La procedura sta in [`buongiorno.md`](buongiorno.md), e al mattino si legge quella e basta. In tre giri
di strumenti legge il diario, TickTick, Notion e il controllo dei siti, e ne fa un briefing solo,
in una schermata: prima scritto, poi a voce.

### Comando 2 — «chiudi sessione»

La procedura sta in [`chiusura.md`](chiusura.md). A Emanuele si fa una domanda sola, con le tre righe e il
testo esatto di tutto quello che si scriverebbe fuori dal vault; col suo ok si fa tutto di fila, fino al
push e al messaggio di chiusura.

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

Non è un comando che Emanuele invoca: è l'ultimo passo del buongiorno, e la procedura di ogni mattina sta
in [`buongiorno.md`](buongiorno.md). Qui restano le cose che servono di rado.

**La voce.** Se `voce.scelta` in [`riferimenti.json`](riferimenti.json) è `null`, non si sceglie in
silenzio: si propongono le candidate con una riga sul perché, si dice quale si userebbe, e la risposta si
salva nel file. Si chiede una volta sola nella vita della skill.

**Le candidate devono essere voci che il piano permette davvero.** Sul piano free le voci della libreria
condivisa sono vietate — ElevenLabs risponde `free_users_not_allowed` — e restano solo le premade, che sono
nate in inglese e in italiano si sentono. È una limitazione del piano, non della skill: va detta a Emanuele
invece di consegnargli una voce con l'accento senza spiegare perché.

**Il piano.** Il free dà 10.000 caratteri al mese e un briefing ne consuma circa 1.300: la voce copre la
prima settimana del mese. Salire di piano o accettarlo è una scelta di Emanuele, che si dice una volta
quando la quota finisce e poi non si ripropone.

**La sigla.** Se esiste `assets/sigla.mp3`, va sotto la voce con ffmpeg: apre da sola per due o tre
secondi, scende quando entra la voce, risale in coda.

```bash
ffmpeg -i sigla.mp3 -i voce.mp3 -filter_complex \
  "[0:a]atrim=0:<durata voce + 5>,asetpts=N/SR/TB[m]; \
   [1:a]adelay=3000|3000[v]; \
   [m][v]sidechaincompress=threshold=0.02:ratio=8:attack=200:release=1200[mix]" \
  -map "[mix]" briefing.mp3
```

ffmpeg si controlla solo se c'è una sigla da mixare. Se la sigla c'è e ffmpeg manca, ci si ferma e si dice
come si installa, `brew install ffmpeg`, invece di consegnare la voce nuda.

### Comando 5 — «review settimanale»

**Si fa la domenica**, e non aspetta che Emanuele la chieda: l'innesco sta nel `CLAUDE.md` di
radice, come per la chiusura del mese. Dopo il briefing, si annuncia.

**Non si comincia facendo domande a vuoto.** Chi lavora da solo, la domenica, non si ricorda cosa
ha fatto martedì — e una review fatta a memoria è una review che racconta solo l'ultima cosa
successa. Quindi **prima si portano i fatti**, poi si chiede.

**1 · I fatti della settimana.** Si raccolgono e si mettono in fila, prima di aprire bocca:

- le **note di sessione** in `workspace/journal/sessions/` degli ultimi sette giorni;
- le **task completate** su TickTick nella settimana, per lista;
- lo **stato delle proposte** su Notion: aperte, chiuse, nuove;
- le **righe nuove** nei due registri lavori;
- gli **obiettivi** nella lista 🎯 Obiettivi.

**2 · Le quattro domande**, una alla volta, nell'ordine del template. Non tutte insieme in un
blocco: si aspetta la risposta prima di passare alla successiva, altrimenti risponde a tre su
quattro e la quarta si perde.

1. **Le vittorie.** Si apre da qui, e si apre proponendogliele: dai fatti raccolti, gliele si
   nomina. Non «cosa è andato bene questa settimana?» a freddo — quello mette in difficoltà.
2. **Il giro delle aree**, con dentro la domanda su cosa era produttività finta.
3. **Gli obiettivi**, e quale non ha niente che lo muova.
4. **Le tre priorità** della settimana che viene.

**3 · Si scrive.** `workspace/review/<AAAA>-W<nn>.md`, dal template. Il numero di settimana è
quello ISO: `date +"%G-W%V"`.

**4 · Le tre priorità diventano azioni.** Se una delle tre non ha una task che la regge, si
propone di crearla, chiedendo in quale lista va. Una priorità scritta solo nella review è una
priorità che lunedì non esiste.

## Come si parla a Emanuele in questi momenti

Vale per **tutti e quattro i comandi**: buongiorno, chiusura, fine giornata, review.

**Emanuele ha chiesto esplicitamente, il 03/09/2026, di essere incoraggiato.** Motivazione,
sostegno, un po' di umanità. Lavora da solo, e nessuno gli dice mai che una cosa gli è venuta
bene. Non è un vezzo: è la differenza fra un sistema che apre la giornata e un sistema che la
registra e basta.

Come si fa, perché il modo sbagliato è peggio del silenzio:

- **Si nomina la cosa vera.** «Hai chiuso agosto sui dati veri, al centesimo, quando due giorni
  fa non sapevi nemmeno quanto avevi in banca» gasa. «Sei un grande» no, perché vale per
  chiunque e lui lo sa.
- **Si dice cosa è costato.** Il complimento che arriva è quello che riconosce la difficoltà:
  una cosa fatta facile non è un merito, una cosa fatta mentre era complicata sì.
- **Non si gonfia una giornata storta.** Se la settimana è andata male, si dice — e si trova la
  cosa vera da salvarci dentro, che c'è quasi sempre. Fingere slancio quando non c'è brucia la
  frase per il giorno in cui serve davvero.
- **Non si mette in ogni messaggio.** Sta nei momenti del rito — l'apertura, la chiusura, le
  vittorie della review. Un incoraggiamento a ogni risposta diventa rumore, e il rumore insegna
  a non ascoltare.

⚠️ **Il divieto sulle «chiusure motivazionali» del `CLAUDE.md` di radice non vale qui.** Quello
riguarda i testi che leggono i clienti, dove una frase da poster è finta. Questi li legge solo
lui, e li ha chiesti.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Journal** di
[`../../../docs/definizioni/journal.md`](../../../docs/definizioni/journal.md), che è la fonte.
L'indice di tutte le voci sta in `docs/definizioni-di-fatto.md`.

Si verificano **prima** di consegnare l'output, comando per comando. Se una non torna, si
corregge e si riverifica: il risultato si dà solo quando passano tutte.

## Casi limite

Quelli del buongiorno stanno in [`buongiorno.md`](buongiorno.md), quelli della chiusura in
[`chiusura.md`](chiusura.md). Qui restano quelli della fine giornata e della voce.

**Il daily di oggi esiste già.** Non si sovrascrive al buio: si legge quello che c'è, si mostra a Emanuele
cosa si aggiungerebbe e si chiede se va unito.

**Non ricordi con precisione cosa è stato fatto.** Scrivi solo quello di cui sei sicuro e chiedi
il resto. Una nota di diario incompleta si completa; una inventata avvelena il briefing di domani.

**Emanuele corregge il riassunto delle tre righe della fine giornata.** La correzione vale: riscrivi le tre righe e
richiedi l'ok prima di scrivere il file. Se è un errore che potrebbe ricapitare, aggiungi una riga
a [`../../../correction.md`](../../../correction.md).

**Una nota che vorresti citare non esiste.** Non crearla di sbieco dal diario. Nominala nel testo
senza wikilink, mettila tra le cose aperte e dillo a Emanuele.

**Emanuele indica una voce nuova.** Si cerca con `ELEVENLABS_GET_VOICES`, e se c'è **si prova
prima di impostarla**, con una stringa di poche parole. Comparire nella lista dell'account non
vuol dire essere usabile: quella lista dice cosa possiedi, non cosa l'API ti lascia sintetizzare,
e sul piano free le voci di libreria si vedono ma non si sentono. Una voce messa in `scelta` senza
prova rompe il briefing di tutte le mattine seguenti, e lo scopri quando serve.

Se la prova fallisce, la voce **non si imposta**: si dice perché, si scrive il suo id in
`voce.scelta_quando_il_piano_sale` dentro [`riferimenti.json`](riferimenti.json) e si tiene quella
che funziona. La richiesta non si perde e il briefing non si rompe. Se la prova riesce, si scrive
in `voce.scelta` e la si usa da subito.

Prima della fine giornata e della review si legge [`../../../correction.md`](../../../correction.md). Per il
buongiorno e la chiusura no: le lezioni che li riguardano stanno già nei loro file.

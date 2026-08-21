# Journal — il diario di lavoro

Il cervello ha due strati di memoria. Quella **statica** sono le entità vere — i brand in
`areas/`, le procedure in `docs/`, i clienti in `entities/` — che cambiano di rado e sono
indicizzate in `llms.txt`. Quella **dinamica** è questo diario: ogni sessione e ogni giornata
lasciano una nota in `workspace/journal/`.

La regola che tiene insieme i due strati: **una nota di diario si aggancia sempre a un'entità
statica con un [[wikilink]]**. Una nota che non si aggancia a niente non è memoria, è un post-it
che tra un mese non dice più niente a nessuno.

Le note del diario stanno in `workspace/`, che è fuori da `llms.txt` e fuori dal gate di qualità:
dopo aver scritto non serve rigenerare né rilanciare niente.

## Quando si usa

Tre comandi, tre momenti della giornata.

- **«buongiorno»** — all'inizio di una sessione. Chiede un briefing su dove eravamo rimasti.
  Vale anche detto come «dove eravamo rimasti», «ripartiamo», «briefing».
- **«chiudi sessione»** — alla fine di una sessione di lavoro. Scrive la nota della sessione.
  Vale anche come «chiudiamo qui», «segna cosa abbiamo fatto».
- **«fine giornata»** — quando la giornata è finita. Riassume tutte le sessioni del giorno in
  una nota sola. Vale anche come «chiudiamo la giornata», «riassunto di oggi».

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| La data di oggi in formato `YYYY-MM-DD` | dal sistema | sì, per tutti e tre |
| L'indice del cervello | `llms.txt` alla radice | sì, per tutti e tre |
| L'ultima nota di sessione | `workspace/journal/sessions/`, la più recente per nome file | sì per «buongiorno» |
| Le sessioni di oggi | `workspace/journal/sessions/sessione-<oggi>.md` | sì per «fine giornata» |
| Il template della sessione | `workspace/journal/_templates/sessione.md` | sì per «chiudi sessione» |
| Il template del daily | `workspace/journal/_templates/daily.md` | sì per «fine giornata» |
| Cosa è successo nella sessione | la conversazione in corso | sì per «chiudi sessione» |

Se `workspace/journal/sessions/` è vuota, non è un errore: si va ai casi limite.

## Passaggi

### Comando 1 — «buongiorno»

**Questo comando non scrive niente.** Legge e basta. Se ti viene voglia di aggiornare un file,
non è questo il momento.

1. Leggi `llms.txt`. Serve a sapere quali entità esistono e come si chiamano, prima di nominarle.
2. Trova l'ultima nota in `workspace/journal/sessions/`: i nomi sono `sessione-<YYYY-MM-DD>.md`,
   quindi l'ordine alfabetico è già l'ordine cronologico. Leggila tutta.
3. Leggi anche l'ultimo daily in `workspace/journal/daily/`, se c'è ed è più recente della
   sessione: contiene il quadro d'insieme che la singola sessione non ha.
4. Apri le note citate nel `related` di quella sessione, ma **solo quelle**: non rileggere il
   vault intero.
5. Dai il briefing in **cinque righe**, in quest'ordine:
   - riga 1 — dove eravamo rimasti, con la data dell'ultima sessione;
   - riga 2 — cosa era rimasto aperto (dalla sezione `## Aperto`);
   - righe 3, 4, 5 — cosa conviene affrontare oggi, **in ordine di priorità**, una cosa per riga.
6. La priorità si motiva in mezza frase: cosa blocca cos'altro, o cosa scade. Se due cose pesano
   uguale, dillo invece di inventare un ordine.

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
   vanno **dentro il testo**, dove si nomina la nota, non solo nel `related`.
7. Se una sezione è davvero vuota, scrivi `Niente.` e vai avanti. Non riempirla per simmetria.

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

**La cartella delle sessioni è vuota** (prima volta che si usa la skill). «Buongiorno» non ha
niente da leggere: dillo in una riga, leggi `llms.txt` e proponi le priorità basandoti su quello —
i nodi aperti sono scritti dentro le note, in fondo alle sitemap dei siti e simili.

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

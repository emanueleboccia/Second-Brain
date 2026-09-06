# Correction log

Gli errori che non vanno ripetuti. Quando Emanuele mi corregge su qualcosa che potrebbe
ricapitare, qui finisce una riga: **cosa è successo** e **cosa fare la prossima volta**.

Si legge prima di eseguire una skill.

---

## 21/08/2026 — Le regole di stile per i siti

`_sistema/tecnica/stile-siti.md` è stato eliminato con la cartella `_sistema/`. Le regole di
stile-siti si recuperano da git quando costruiremo la skill `crea-sito`.

> **Fatto il 26/08/2026**, costruendo la skill `web-design` invece di `crea-sito`. Il file è stato
> ripreso da `72cc996^` e le sue quattro regole sono diventate tre note in `docs/web-design/` —
> `sorgente-e-live`, `verifica-post-deploy`, `media-da-drive` — più la regola sulle
> scritture, che era già nel `CLAUDE.md` alla radice. La sezione «Convenzioni di stile» del file
> originale era vuota di proposito e non ha prodotto niente.
>
> **`_sistema/tecnica/novamira.md` non si recupera.** Emanuele ha chiuso il punto il 26/08/2026:
> era il vecchio sistema, non si usa più. I riferimenti sono stati tolti da `verifica-post-deploy`,
> dal `MEMORY.md` de La Masseria e dal commento della deroga nel gate. Il precedente sugli accenti
> corrotti resta, la procedura no.

## 21/08/2026 — Le scadenze dei clienti non vanno su TickTick

Avevo proposto di segnare in **🔔 Scadenze** di TickTick la scadenza hosting di un cliente.
Sbagliato: quelle vivono già nel database **Siti Clienti** di Notion, nei campi `(S) Hosting`,
`(S) Assistenza`, `(S) Dominio`, e il briefing del mattino le legge da lì.

**La prossima volta:** le scadenze dei clienti si leggono da Notion e non si duplicano altrove.
La colonna Scadenze di TickTick è per le scadenze di Emanuele, non dei suoi clienti.

Le colonne di TickTick, sezione Lavoro, hanno ciascuna un criterio preciso:

- **⌛️ Non iniziato** — cose senza data e non programmate.
- **⏳ In corso** — cose programmate, con una scadenza.
- **📆 Appuntamenti** — appuntamenti veri.
- **🔔 Scadenze** — scadenze importanti di Emanuele, soprattutto di costi.

Una task con una data non va in «Non iniziato»: va in «In corso».

## 24/08/2026 — Il problema lo deve dichiarare il cliente

Trattativa Lampion Square persa senza mai arrivare al prezzo. Mi ero presentato col problema già
in mano — «dal profilo non si vede il menù» — senza mai farlo aprire a Giorgio: niente reason why,
niente scala da 1 a 10, niente prezzo d'inazione. Quando il fornitore della sua app gli ha detto
il contrario, Giorgio non aveva niente di suo da difendere e ha creduto a chi paga già.

Sono saltati anche tre check: il decision maker non è stato cercato in fase di setting, quindi il
fornitore dell'app è emerso solo alla fine; l'appuntamento non è stato cementificato, e da incontro
di persona è degradato a telefonata; e al telefono ho risposto ai suoi argomenti uno per uno invece
di scavare, che è l'errore di farsi portare a spasso.

**La prossima volta:** il problema si apre con le domande e lo dichiara il cliente, prima di
qualsiasi proposta. Quando so già quale obiezione arriverà — e col fornitore dell'app che serve
altri locali del giro, la so — la porto io per primo, prima che vadano a chiederla.

## 24/08/2026 — Niente wikilink nelle risposte

Nominavo i principi con le doppie parentesi quadre anche nel testo che Emanuele legge in chat, e
la skill `consigliere-vendita` me lo imponeva. Gli spezza la lettura.

**La prossima volta:** dentro i file del vault i wikilink restano obbligatori, li controlla il gate.
In chat il principio si nomina per esteso, e se serve un riferimento cliccabile si usa un link
markdown normale.

## 25/08/2026 — La sintesi vocale si paga a ogni chiamata

Al primo collaudo del buongiorno audio ho lanciato `ELEVENLABS_TEXT_TO_SPEECH` due volte sullo
stesso testo: la prima per vedere se funzionava, la seconda per rileggere l'URL del file, che avevo
già ricevuto e buttato via. Sono 1.444 caratteri sprecati su 10.000 al mese, il 14% della quota di
agosto per zero audio in più.

**La prossima volta:** ogni chiamata a un servizio che consuma quota si salva **alla prima
esecuzione** — risposta intera su file — e si riusa. Vale per ElevenLabs come per Apify: se
l'output serve due volte, si rilegge, non si rigenera.

## 27/08/2026 — Due sessioni, lo stesso file di diario

La nota `workspace/journal/sessions/sessione-2026-08-26.md` è stata scritta da una sessione e poi
sovrascritta da un'altra che lavorava in parallelo sullo stesso vault. Il contenuto della prima —
il lavoro su Remotion e sul reel — è sparito, ed è stato riunito a mano il giorno dopo.

**La prossima volta:** prima di scrivere una nota di sessione si controlla se il file esiste già
**e se è cambiato da quando l'hai letto**. Se c'è, non si sovrascrive: si legge, si mostra a
Emanuele cosa si aggiungerebbe e si chiede se unire o fare il secondo file. Vale anche quando il
file l'hai scritto tu dieci minuti prima: un'altra sessione può averci scritto sopra nel frattempo.

## 29/08/2026 — Una cosa già fatta è una task da spuntare

Emanuele aveva detto «aggiungi che ho già fatto grandi modifiche all'applicazione gestionale» e io
l'avevo scritto come nota dentro una task aperta, ragionando che TickTick tiene le azioni e la
cronaca sta nel diario. Sbagliato: così il lavoro fatto non compare da nessuna parte come fatto.

**La prossima volta:** quando Emanuele dice che una cosa è **già fatta**, su TickTick si crea la
task, si sposta in **⏳ In corso** e solo da lì si spunta. Il completato è un dato suo, non
rumore: gli serve per vedere cosa ha chiuso. Il diario continua a raccontare *com'è andata*,
TickTick registra *che è successo*.

⚠️ **Precisato da Emanuele il 03/09/2026.** In ⌛️ Non iniziato non deve esserci niente
di completato. Il passaggio da In corso non è facoltativo e non si salta nemmeno quando la task
nasce dopo che il lavoro è già stato fatto.

Vale anche la seconda metà: se dice «già fatto» senza dire cosa, si chiede. «Grandi modifiche»
dentro una task fra un mese non dice più niente a nessuno.

## 29/08/2026 — Le task su TickTick si scrivono come le scrive lui

Avevo scritto task con titoli lunghi e note strutturate — «Sistema di task condiviso su TickTick,
per operatore e per progetto» con sotto tre righe di spiegazione, date messe dentro il testo,
grassetti. Le sue task non sono così: sono minuscole, dirette, una riga sola, senza punto finale.
«creare pagine legali», «comprare posacenere in legno», «aggiustare impianto musica nelle sale
tufo e legno».

**La prossima volta:** una task la scrivo come l'avrebbe scritta lui. Minuscolo, semplice, corta,
niente formattazione, niente note lunghe, niente date ripetute nel testo quando c'è già il campo
data. La nota si mette solo se contiene un dato che serve davvero e che il titolo non regge —
un id, un prezzo, un vincolo — non per spiegare quello che il titolo dice già.

Il posto dove si scrive per esteso è il diario, non la lista delle cose da fare.

## 30/08/2026 — Il buongiorno non è partito perché la skill non esisteva per Claude Code

Emanuele ha aperto la sessione con un saluto e il briefing non è uscito: ha dovuto scrivere
«parti con la skill journal». La causa non era la formula usata — era che le skill in
`code/skills/` sono documenti del vault, non skill che Claude Code carica all'avvio. Nessuna di
loro può «partire da sola», e per il journal questo è fatale: è la skill che deve arrivare
*prima* che Emanuele chieda qualcosa.

**La prossima volta:** l'innesco di una skill che deve partire da sola non si scrive solo nel suo
`SKILL.md` — quel file nessuno lo legge finché non gli si dice di leggerlo. Va nel `CLAUDE.md` di
radice, che è l'unico sempre in contesto. La sezione «Come si apre e come si chiude una sessione»
ora ce l'ha: qualsiasi forma di saluto in apertura fa partire il buongiorno.

Vale in generale: **se una regola deve valere prima che io la invochi, sta nel `CLAUDE.md`.**
Tutto il resto sta nel file della skill.

## 30/08/2026 — «Contattare» è setting, non l'appuntamento

Nel briefing avevo letto «Contattare Andrea Costante» come un incontro con Andrea, e avevo
proposto di preparare la traccia di discovery per il giorno dopo. Sbagliato.

**Quando Emanuele scrive «contattare Tizio» su TickTick intende una cosa sola:** mandargli un
messaggio o chiamarlo per **prendere l'appuntamento**. «Ciao, come stai? Quando ci vediamo?».
Non è l'incontro, è il passo che porta all'incontro. Vale per tutte: contattare Andrea Costante,
contattare Anna, contattare Pierluigi Ammirati.

**La prossima volta:** una task che comincia con «contattare» è **setting**, e si prepara come
setting. Quello che serve non è la traccia delle domande di discovery — serve la domanda di
trasformazione, l'agenda a scelta chiusa, il decision maker chiesto adesso e non dopo, e la
cementificazione una volta fissata l'ora. La discovery si prepara quando l'appuntamento esiste.

**La dicitura scelta il 30/08/2026 è «Setting».** Le task si chiamano `Setting <Nome> (Azienda)`
e stanno in ⏳ In corso, non in 📆 Appuntamenti — un setting non è un appuntamento, e tenerlo
nella colonna degli appuntamenti è quello che me l'ha fatto leggere male. La parola viene dal suo
stesso vocabolario di vendita e dice a che punto del funnel si è: setting, poi appuntamento, poi
proposta. «Contattare» non si usa più.

Il messaggio da mandare si scrive **nella descrizione della task**, così il giorno che la apre lo
manda e basta. Con dentro i promemoria che il messaggio non può contenere: chiedere dei soci prima
di bloccare l'ora, e mandare materiale appena l'ora è fissata.

## 31/08/2026 — La voce pagata e il file che non è mai atterrato

Il 30/08 la quota ElevenLabs era a 1.297 caratteri. La mattina del 31/08 un briefing ne ha
consumati circa 1.227 e in `workspace/journal/audio/` non è comparso nessun mp3: l'ultimo audio del
mese è stato pagato e non esiste. Il buco è saltato fuori solo incrociando il residuo della quota
con il contenuto della cartella, ore dopo.

**La prossima volta:** una sintesi è finita quando **il file esiste su disco e ha una durata**, non
quando l'API risponde. Il download e la verifica con `afinfo` stanno nello stesso passo della
chiamata, non in un passo dopo che può non arrivare mai. E se la quota è scesa ma la cartella è
vuota, si dice subito: un caratteri-consumati-senza-file scoperto il giorno dopo non si recupera.

## 01/09/2026 — «Simile a quello che abbiamo» non è una tabella di valori

Chiesto un registro lavori simile a quello dei brand di famiglia, ho letto l'originale con
`GOOGLESHEETS_BATCH_GET` e ne ho ricostruito colonne, righe e totali. Il risultato è corretto nei
dati e brutto da guardare: non somiglia al suo. `BATCH_GET` restituisce **solo i valori** —
formati valuta, grassetti, colori, bordi, larghezze delle colonne, righe bloccate e altezze non
compaiono in quella risposta. Ho copiato lo scheletro credendo di aver copiato il foglio.

**La prossima volta:** quando un artefatto deve assomigliare a uno che esiste già, l'aspetto va
letto insieme ai dati, non dedotto da essi. Su Sheets si legge con `GOOGLESHEETS_GET_SPREADSHEET_INFO`
chiedendo la grid data, che porta con sé i formati.

⚠️ **Corretto il 03/09/2026.** Qui c'era scritto che gli strumenti Sheets disponibili scrivono i
valori ma non i formati. **Non è vero, e non l'avevo verificato:** avevo dedotto il limite dello
strumento di scrittura dal fatto che quello di lettura non me li restituiva. Esistono
`GOOGLESHEETS_FORMAT_CELL`, `GOOGLESHEETS_UPDATE_DIMENSION_PROPERTIES` e
`GOOGLESHEETS_UPDATE_SHEET_PROPERTIES`, e con `composio proxy` si arriva direttamente a
`spreadsheets.batchUpdate`, che fa tutto in una chiamata. **Un limite non si dichiara per
deduzione: si cerca lo strumento e si prova.** Dichiarare un limite falso è peggio che non
saperlo, perché chiude la domanda.

Vale oltre i fogli. «Fammelo come quell'altro» parla di com'è fatto e di come si vede, e la seconda
metà è quella che si nota per prima.

## 02/09/2026 — Una fonte si legge tutta prima di cancellarla

Emanuele mi ha dato la dashboard del vecchio sistema di finanze, un HTML da 67 KB, e gli ho
proposto di estrarne la serie mensile e poi cancellarla. Ho estratto quello che mi serviva —
i mesi, i conti, gli investimenti, gli abbonamenti — e ho cancellato. Poco dopo mi ha chiesto
dell'assicurazione Revolut che aveva comunicato in quel file: dentro c'era almeno una variabile
`note` che non ho mai aperto, e il file non è più recuperabile perché stava in una cartella
esclusa da git.

**La prossima volta:** quando una fonte va eliminata, prima si legge **per intero**, non solo le
parti che servono alla domanda di adesso. Estrarre non è cancellare con un backup: è decidere
cosa sopravvive, e quella decisione si prende avendo visto tutto. Se il file è grosso, si elenca
prima cosa contiene e si mostra l'elenco — così è Emanuele a dire cosa tenere, non io a
indovinarlo.

## 03/09/2026 — Una cosa fatta non si registra creando una task

Chiudendo la sessione del 02/09 ho registrato sei lavori appena finiti creandone altrettante task
su TickTick. Le ho create e basta: sono nate in ⌛️ Non iniziato e ci sono rimaste. La mattina dopo
il briefing le ha lette come sono scritte — lavoro da fare — e Emanuele ha dovuto chiedermi dove
fossero finite le cose fatte. Due erano anche nella lista sbagliata: la skill del report
finanziario e la dashboard sono costruzione del Second Brain, non vita personale, e stavano in
🌱 Personale.

**La prossima volta:** una cosa già fatta si registra **creandola e chiudendola nello stesso passo**,
mai in due momenti. Una task aperta non è un archivio di quello che è successo: è una promessa, e
il giorno dopo torna indietro come lavoro in arretrato. E la domanda «in quale lista va» si fa
anche per le task retroattive, non solo per quelle da fare: il posto dove una cosa è registrata
è quello dove la si cercherà.

## 03/09/2026 — In Sheets il testo vuoto è più grande di qualsiasi numero

Nel registro lavori del personal brand la regola di colore del foglio Clienti era
`=$E8>0` — «colora di rosso chi mi deve dei soldi». Risultato: **tutte e quaranta le righe
rosse**, comprese le vuote. La colonna E è una formula che sulle righe vuote restituisce testo
vuoto, e in Sheets il testo si ordina **sopra** i numeri: `"">0` è vero. L'ha visto Emanuele
aprendo il foglio, non io scrivendolo.

**La prossima volta:** una regola di formato condizionale che punta a una colonna di formule si
scrive sempre ancorata alla riga vera — `=E($A8<>"";VAL.NUMERO($E8);$E8>0)` — mai al solo
confronto numerico. E dopo aver applicato un formato condizionale **si guarda cosa colora,
non solo se l'API risponde OK**: qui l'API ha risposto OK quattro volte su quattro.

Nello stesso giro, seconda svista: avevo messo le celle in `CLIP`, che taglia il testo al bordo
della colonna, e i titoli in A1 e A2 risultavano mozzati su tutti e quattro i fogli. Il default
utile è `OVERFLOW_CELL`, con `WRAP` solo sulle colonne di descrizione — è quello che fa il
registro dei brand di famiglia, che avevo letto e non copiato fino in fondo.

## 03/09/2026 — I nomi erano su Notion, e li ho chiesti a lui

Chiudendo il registro lavori ho consegnato a Emanuele una lista di «cosa mi manca», e dentro
c'era: «di Sartoria, L'Étoile, Difendo Alarm, Ciao Naples e Room84 non ho nome e cognome».
Erano **tutti e cinque** nel database Contatti di Notion, con azienda, ruolo e origine —
Marco Augusto, Maria Grazia Massa, Pasquale Iossa, Davide Lombardo, Antonio Vorraro. Uno di
questi, Marco Augusto, era perfino in una proposta che avevo letto io stesso mezz'ora prima.
Avevo interrogato Contatti **con un filtro sui soli lead caldi** e avevo trattato quel
sottoinsieme come se fosse tutto il database.

**La prossima volta:** prima di chiedere un dato a Emanuele, si guarda dove quel dato vive per
convenzione. Il `CLAUDE.md` lo dice: **Notion tiene lo stato — contatti e lead, proposte, siti
dei clienti.** Una domanda su un contatto si fa solo dopo aver letto Contatti **per intero**,
non una query filtrata fatta per un altro scopo.

E vale in generale: **una query scritta per rispondere a una domanda non è una lettura della
fonte.** Il filtro che serviva al briefing — solo gli stati caldi — mi ha lasciato in mano un
terzo dei contatti, e ho scambiato quel terzo per l'archivio. Far fare a lui il lavoro che la
fonte aveva già fatto è il modo più veloce di rendere inutile il cervello.

## 03/09/2026 — Una sotto-task su TickTick vive dentro la card del padre

Ho spostato in 💡 Idee le otto sotto-task di Cesco e della Sartoria, l'API ha risposto bene, e
rileggendole risultavano davvero in `columnId` Idee. Sullo schermo di Emanuele però non si era
mosso niente, e me l'ha detto lui. Il motivo: **erano sotto-task, e le due task padre — «sito
cesco» e «sito la sartoria dei piccoli» — erano rimaste in ⌛️ Non iniziato.** In vista kanban
una sotto-task si disegna dentro la card del padre, quindi la sua colonna non conta.

**La prossima volta:** su TickTick, spostare di colonna vuol dire **spostare la card**, cioè la
task senza `parentId`. Se una task ha un padre, o si sposta il padre, o non si è spostato niente.
Prima di dire «fatto», si controlla il `parentId`, non solo il `columnId` tornato nella risposta.

Ed è la terza volta oggi che sbaglio lo stesso modo: **ho preso la risposta OK di un servizio per
la prova del risultato.** L'audio del 31/08 «riuscito» e mai atterrato, il formato condizionale
che ha colorato di rosso quaranta righe rispondendo OK quattro volte, e adesso questa. La regola
non è «controlla di più»: è che **la verifica si fa su quello che vede Emanuele**, non su quello
che risponde l'API.

## 03/09/2026 — Una cartella con lo stesso nome di una nota se ne mangia i link

Spezzando le definizioni di fatto ho creato `docs/definizioni-di-fatto/` accanto alla nota
`docs/definizioni-di-fatto.md`, tenendo la nota come indice. Il gate è passato da 1 errore a 6.
Il motivo: il risolutore dei wikilink prova **prima il percorso nudo** e poi quello con `.md`,
quindi `[[docs/definizioni-di-fatto]]` ha smesso di puntare alla nota e ha cominciato a puntare
alla cartella — che non è una nota. Ogni collegamento a quell'indice, comprese otto note di
diario vecchie, è diventato muto senza che nessun link risultasse rotto.

**La prossima volta:** una cartella non si chiama mai come una nota che le sta accanto. Se si
spezza una nota in più file, la cartella prende un nome diverso — qui `docs/definizioni/` — e
l'indice resta l'unico a portare il nome originale, così i link scritti in passato continuano
a funzionare.

Il sintomo è ingannevole: **la regola sui link rotti resta verde**, perché il bersaglio esiste
davvero. A saltare sono le regole sul grafo — collegamenti in uscita e note orfane. Un conteggio
di link che cala di colpo dopo aver creato una cartella è quasi sempre questo.

## 03/09/2026 — Una task non si spunta dalla colonna «Non iniziato»

Oggi ho completato varie task direttamente mentre erano in ⌛️ Non iniziato. Il risultato è una
colonna «Non iniziato» con dentro cose spuntate, che è una contraddizione: se è fatta non è più
«non iniziata». Emanuele me l'ha corretto.

**La prossima volta:** il giro giusto è **prima si sposta la task in ⏳ In corso, poi si spunta.**
Nella colonna «Non iniziato» non deve esistere niente di completato. Vale per ogni lista che ha
la colonna In corso — 💼 Personal Brand, le tre Digitale, e Trello (che però è sola lettura).

⚠️ **La lista 🌱 Personale funziona in modo diverso, e va bene così.** Non è un kanban di lavoro
in corso: è una lista di **to-do personali**, dove una cosa si spunta **direttamente** quando è
fatta. La colonna non è un «Non iniziato» in attesa di un «In corso» — è un «To-do» e basta. Lì
il giro In corso → spunta **non si applica**, e spuntare sul posto è corretto, non un errore.

La regola dell'In corso vale solo dove si traccia il lavoro che avanza: 💼 Personal Brand, le tre
Digitale, e Trello (in sola lettura).

⚠️ **Il lavoro sul Second Brain non ha una casa fissa.** Alcune cose sono personali (vanno in
🌱 Personale) e altre sono del personal brand (vanno in 💼 Personal Brand). Si decide caso per
caso guardando cos'è la task, **non si manda tutto in Personal Brand per comodità.**

## 03/09/2026 — Un collegamento assente dalla sessione può essere installato

Passando da Claude a Codex ho trattato Notion, TickTick e Calendar come indisponibili perché non
comparivano tra gli strumenti della sessione. Era solo lo stato iniziale di Codex: il CLI dispone
di plugin e marketplace propri, e prima di dichiarare un servizio inutilizzabile vanno controllati.

**La prossima volta:** distinguere fra «non caricato in questa sessione» e «non disponibile».
Prima si controllano i plugin installabili, gli MCP configurabili e le connessioni già presenti;
solo dopo si dichiara un limite. Le configurazioni aggiunte per Codex non devono modificare
`.claude/`, `CLAUDE.md` o i collegamenti che Claude usa già.

## 03/09/2026 — Una skill nuova si passa dallo skill-creator, non si scrive a mano

Ho scritto la skill `crea-contenuto` partendo dal foglio bianco. Il `README.md` di `code/skills/`
dice l'opposto, ed è una riga scritta apposta: **ogni skill nuova si costruisce invocando lo
skill creator**, e non si scrive più a mano. L'ho notato io a cose fatte e l'ho detto a Emanuele,
che me l'ha fatta ripassare.

Ripassandola dal metro dello skill-creator, la bozza reggeva su quasi tutto — lunghezza, livelli
di caricamento, «spiega il perché invece di imporre», le cinque sezioni del vault — ma **mancava
del tutto la parte sugli esempi concreti**, che lo skill-creator considera centrale. Aggiunti: un
esempio di tre hook di tipi diversi e uno di giudizio fatto bene contro uno fatto male.

**La prossima volta:** prima di scrivere una skill si apre `code/skills/skill-creator/SKILL.md` e
si segue quello. Non perché sia un obbligo formale, ma perché la parte che salta scrivendo a mano
è sempre la stessa: **quello che non ti viene in mente da solo.** Una convenzione del vault che
si scopre di aver violato a lavoro finito è una convenzione che non è stata letta.

⚠️ **Quello che non abbiamo fatto, e va detto:** lo skill-creator prevede anche un giro di
**test prompt e valutazione** — si fa girare la skill su casi veri e si misura. Non l'abbiamo
fatto. La skill è scritta bene sulla carta, ma **non è ancora stata provata su un contenuto
vero**. La prova sarà il primo script che produce.

## 06/09/2026 — La produttività finta si chiede, non si deduce

Prima review settimanale. Alla domanda «cosa era produttività finta» ho portato tre candidati e
**due erano sbagliati**. I sette corsi importati da Notion li avevo chiamati tempo perso perché
la formazione è congelata fino a ottobre: in realtà non servivano a essere studiati, servivano a
estrarre procedure e prendere decisioni, e importarli *era* il lavoro. Il registro lavori rifatto
due volte in quattro giorni l'avevo contato come spreco: è il posto dove finiscono i soldi, e si
rifà finché non è giusto.

L'errore è sempre lo stesso: **ho dedotto lo scopo di un'attività dallo stato dell'area che
tocca.** «Formazione congelata» non vuol dire che ogni cosa che passa da un corso sia rimandata.

**La prossima volta:** un candidato a produttività finta si porta come **domanda**, non come
verdetto — «a cosa ti è servito importare i corsi?» prima di «quello era tempo perso». La terza
osservazione ha retto proprio perché era una domanda vera: la mappa delle competenze esiste e
non ha ancora prodotto una decisione, e quello l'ha confermato lui.

Vale oltre la review: **quando giudico una cosa che ha fatto Emanuele, il giudizio si mostra
come ipotesi.** Se ho ragione lo conferma in una riga; se ho torto, senza la domanda gli sto
solo dicendo che ha buttato tre giorni.

## 06/09/2026 — Su Google Calendar due trappole: il fuso e le regole di ricorrenza

Scrivendo il calendario `Date commerciali` ho sbagliato due volte, e in entrambi i casi l'API
aveva risposto OK.

**1. Gli eventi tutto-il-giorno slittano di un giorno.** Passando `2026-09-27T00:00:00+02:00`
con `allDay: true`, Google converte in UTC — che è il 26 alle 22:00 — e tiene la data UTC:
l'evento è atterrato il **26 settembre**. Se ne accorge solo chi guarda il calendario, non chi
legge la risposta.

**La prossima volta:** per un evento tutto-il-giorno si passa l'offset `+00:00` e **non** si
passa `timeZone`, perché quel parametro sovrascrive l'offset e riporta il problema. `startTime`
la data vera, `endTime` il giorno dopo.

**2. In una RRULE, `BYMONTH` e `BYMONTHDAY` non fanno una finestra continua.** Per il Cyber
Monday — il lunedì dopo il Black Friday, che cade fra il 26/11 e il 2/12 — avevo scritto
`BYMONTH=11,12;BYMONTHDAY=26,27,28,29,30,1,2;BYDAY=MO`, ragionando su un intervallo. Google
incrocia i due criteri: prende i lunedì che cadono nei giorni 1, 2 e 26-30 **di novembre e di
dicembre**. Nel 2027 il Cyber Monday compariva **tre volte** — 1 novembre, 29 novembre e 27
dicembre. Il Black Friday invece regge, perché `BYMONTH=11;BYMONTHDAY=23..29;BYDAY=FR` sta
davvero dentro un mese solo.

**La prossima volta:** una ricorrenza che attraversa il confine fra due mesi non si scrive come
regola. Si elencano le date con `RDATE` per qualche anno, e nella descrizione si scrive perché.

**E la regola sopra le due:** una ricorrenza si verifica **sul secondo anno**, non sul primo.
Il primo anno è la data che hai scritto tu e torna sempre; è l'anno dopo che dice se la regola
è giusta. Vale per qualsiasi cosa si ripeta.

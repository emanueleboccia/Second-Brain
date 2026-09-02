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
task e si spunta. Il completato è un dato suo, non rumore: gli serve per vedere cosa ha chiuso.
Il diario continua a raccontare *com'è andata*, TickTick registra *che è successo*.

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
chiedendo la grid data, che porta con sé i formati. Se gli strumenti disponibili leggono i valori ma
non sanno scrivere i formati, **si dice prima di creare**, non dopo: un foglio nuovo e nudo accanto
a uno curato non è un punto di partenza, è una cosa da rifare.

Vale oltre i fogli. «Fammelo come quell'altro» parla di com'è fatto e di come si vede, e la seconda
metà è quella che si nota per prima.

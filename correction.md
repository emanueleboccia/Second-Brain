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

# Correction log

Gli errori che non vanno ripetuti. Quando Emanuele mi corregge su qualcosa che potrebbe
ricapitare, qui finisce una riga: **cosa è successo** e **cosa fare la prossima volta**.

Si legge prima di eseguire una skill.

---

## 21/08/2026 — Le regole di stile per i siti

`_sistema/tecnica/stile-siti.md` è stato eliminato con la cartella `_sistema/`. Le regole di
stile-siti si recuperano da git quando costruiremo la skill `crea-sito`.

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

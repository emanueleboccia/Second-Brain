---
title: "Definizione di fatto — Journal"
summary: "Quando il briefing del mattino, la nota di sessione e il daily sono finiti davvero: sezioni, privacy, audio e le scritture ammesse."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-08-21
updated: 2026-09-03
---

# Definizione di fatto — Journal

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
- Chiude **una frase per la giornata** nata da quello che è appena uscito nel briefing, non una
  massima buona per chiunque. Una riga, due al massimo.
- È partito **da un saluto**, senza che la skill fosse nominata, e **l'audio è stato fatto** senza
  che lo chiedesse.
- Ogni cosa nominata esiste, letta adesso, e **fuori dal vault non è stato scritto niente**: le sole scritture ammesse sono `ticktick.ultimo_briefing` e l'mp3 in `workspace/journal/audio/`.

**L'audio del buongiorno — il passo 9, non un comando**

- Il **briefing scritto è stato fatto per intero prima**, e l'audio dice **le stesse cose**:
  stessi fatti, stesse scadenze, stesse tre priorità nello stesso ordine. Niente che sia solo
  nell'audio, niente che sia solo nel testo.
- Il parlato è stato **riscritto**, non letto: nessun percorso di file, nessun id, nessun nome di
  database, nessuna formattazione detta a voce.
- Sta nella finestra dei **60-90 secondi**. Se sfora, si è tagliato dalla riscrittura e non dal
  briefing.
- Le **tre priorità** stanno in fondo, una frase ciascuna, e **la frase della giornata chiude**:
  dopo di lei non è stato aggiunto niente.
- La voce è quella scelta da Emanuele e salvata in `riferimenti.json`. Se non era ancora scelta,
  le candidate gli sono state **proposte** e la sua risposta è stata **scritta nel file**: la
  domanda non si rifà il giorno dopo.
- La **quota è stata letta prima di sintetizzare**. Sotto i tre briefing residui è stata detta in
  una riga, con la data del rinnovo; sopra, non se n'è parlato. A quota finita **non è partita
  nessuna chiamata**.
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
- Ogni task completata è stata prima spostata in **⏳ In corso**: nessuna risulta spuntata
  direttamente da ⌛️ Non iniziato. Per le sotto-task è stata verificata anche la colonna
  della task padre.
- Se non era emerso niente, è stato detto in una riga. Nessuna task inventata per sembrare
  utili.

**«review settimanale» — la review della domenica**

- È partita **da sola la domenica**, dopo il briefing, senza che Emanuele la nominasse. Se la
  domenica era saltata, è stata riproposta lunedì o martedì — **non oltre**.
- **I fatti sono stati portati prima delle domande**: note di sessione della settimana, task
  completate, stato delle proposte, righe nuove dei registri, obiettivi.
- Le quattro domande sono state fatte **una alla volta**, aspettando la risposta. Non tutte in
  un blocco solo.
- **Le vittorie sono state proposte**, non chieste a freddo: nominate a partire dai fatti.
- Il giro delle aree le ha toccate tutte, e le aree ferme sono state **dichiarate ferme**, non
  saltate. Dentro c'è la domanda su **cosa era produttività finta**.
- Sugli obiettivi è stato detto **quale non ha niente che lo muova**.
- Le priorità sono **tre**, trasversali, e per ognuna senza una task che la regga è stata
  proposta la task, chiedendo in quale lista va.
- Il file è `workspace/review/<AAAA>-W<nn>.md`, col numero di settimana **ISO**, scritto dal
  template senza cambiarne la forma: è la serie che vale, non la singola review.

---

Queste condizioni si verificano **prima** di consegnare l'output: il criterio generale sta in [[docs/definizioni-di-fatto|definizioni di fatto]], la procedura in [[code/skills/journal/SKILL|la skill journal]], e gli errori da non ripetere in [[correction|correction log]].

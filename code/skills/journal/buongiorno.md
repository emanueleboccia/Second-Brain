# Buongiorno — il briefing del mattino

Parte quando il primo messaggio della sessione è un saluto, in qualunque forma: l'innesco sta nel
`CLAUDE.md` di radice. Un saluto a sessione avviata non è un buongiorno.

**Per il briefing si legge questo file e basta.** La [skill intera](SKILL.md) e il
[correction log](../../../correction.md) al mattino non servono: le lezioni del log che riguardano il
briefing stanno qui sotto, in «Le trappole già viste». Deciso il 28/09/2026, dopo un briefing da otto
minuti: ogni mattina si rileggevano 140 KB di regole, le fonti arrivavano intere e i giri di strumenti
erano diciotto. **Il briefing esce in tre minuti.**

Il buongiorno legge e basta. Le sole scritture stanno dentro il vault: `ticktick.ultimo_briefing` in
[`riferimenti.json`](riferimenti.json) e l'mp3 in `workspace/journal/audio/`.

## I tre giri

Un giro è un messaggio solo, con dentro tutte le chiamate che non dipendono l'una dall'altra. Fuori da
questi tre giri non si controlla niente, a meno che una nota di sessione segnali un rischio per oggi.

**Giro 1 · il vault e gli strumenti.** Insieme, un comando Bash e una `ToolSearch`.

```bash
cd "/Users/emanueleboccia/Second Brain"
date "+%A %d/%m/%Y %H:%M"; git rev-parse --show-toplevel; git log --oneline -1
jq -c 'walk(if type == "object" then with_entries(select(.key | startswith("_") | not)) else . end)
  | {ultimo_briefing: .ticktick.ultimo_briefing, liste: .ticktick.liste, ignora: .ticktick.ignora_sempre.id,
     viste: .notion.viste,
     audio: {voce: .audio.voce.scelta, modello: .audio.modello, formato: .audio.formato,
             caratteri: .audio.caratteri_target}}' code/skills/journal/riferimenti.json
giorno=$(ls workspace/journal/sessions/ | grep -oE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' | sort | tail -1)
for f in workspace/journal/sessions/sessione-$giorno*.md; do
  echo "== $f"; grep -m1 '^summary:' "$f"; sed -n '/^## Aperto/,$p' "$f"; done
ls workspace/journal/daily/ | tail -1
awk '/^## Spese ricorrenti/{f=1;next} /^## /{f=0} f && /[0-9][0-9]\/[0-9][0-9]\/20[0-9][0-9]/' areas/finanza/quadro.md
sed -n '/^\*\*«buongiorno»/,/^\*\*L.*audio del buongiorno/p' docs/definizioni/journal.md
[ "$(date +%u)" = 1 ] && sed -n '/^## 3 · Gli obiettivi/,$p' "workspace/review/$(date -v-1d +%G-W%V).md"
```

La `ToolSearch` è una sola, con tutti gli strumenti del giro 2:
`select:mcp__5209fda2-c1dc-422e-857d-fb172962bbcc__get_project_with_undone_tasks,mcp__5209fda2-c1dc-422e-857d-fb172962bbcc__list_projects,mcp__5209fda2-c1dc-422e-857d-fb172962bbcc__list_completed_tasks_by_date,mcp__3f303272-b739-49b5-8f9b-8e7883c02215__notion-query-data-sources`.
Se un nome non si trova più, il connettore è stato ricollegato: lo si cerca per parola chiave, una volta.

Se la radice stampata è un worktree e non la cartella del vault, le note di ieri possono mancare: lo si
dice prima di tutto il resto.

**Giro 2 · le fonti.** Tutte insieme:

- **Notion**, `notion-query-data-sources` in modalità `view`, una chiamata per ogni vista di `viste`:
  trattative, lavori_in_corso, da_incassare, rinnovi_in_arrivo, lead_caldi, risposte_modulo,
  siti_da_controllare, gestionali_da_controllare. Mai l'SQL, che ha una quota;
- **TickTick**, `get_project_with_undone_tasks` su personal-brand, personale, formazione, inbox e le tre
  digitale, e il lunedì anche su obiettivi. Poi `list_projects`, per vedere se è nata una lista che non sta
  né in `liste` né in `ignora`, e `list_completed_tasks_by_date` sulle tre digitale, da `ultimo_briefing`
  a adesso;
- **ElevenLabs**, la quota in Bash: `composio execute ELEVENLABS_GET_USER_SUBSCRIPTION_INFO -d '{}'`,
  salvata nello scratchpad.

**Giro 3 · i siti e le liste lunghe.** Un comando Bash solo, che:

- scrive nello scratchpad la lista del controllo, `[{"nome", "url", "tipo": "sito" | "gestionale"}]`,
  dalle due viste «Da controllare»: il nome dal titolo, l'indirizzo dal campo *Indirizzo* e mai dal link
  dentro il titolo, che su alcuni siti porta all'accesso nascosto di WordPress;
- lancia `node code/controllo-siti/controlla.mjs <lista.json> <esito.json>`, una ventina di secondi;
- se TickTick ha salvato una lista su file perché troppo lunga, la riduce con jq, senza 💡 Idee e senza le
  sottotask che ci stanno dentro:

```bash
jq -r '(.tasks | map(select(.columnName == "💡 Idee")) | map(.id)) as $idee
  | .tasks[] | select(.columnName != "💡 Idee" and ((.parentId // "") as $p | $idee | index($p) | not))
  | [(.columnName // "-"), (.dueDate // "-"),
     (if .parentId then "sub:" + .parentId[-6:] else "TOP:" + .id[-6:] end), .title] | @tsv' <file> | sort
```

**Poi si scrive, subito.** Il testo esce appena è pronto. Dopo, nello stesso turno, `ultimo_briefing`
col timestamp di adesso e l'audio. Il timestamp si scrive anche se una fonte non ha risposto o l'audio
fallisce: il briefing è il testo.

## Cosa esce, in quest'ordine

Una schermata. Le sezioni vuote non si scrivono, e non esistono righe «niente da segnalare». La colonna
💡 Idee non entra mai, in nessuna lista. Le liste di Raffaele, quelle in `ignora`, non si leggono e non si
nominano; una lista che non sta né lì né in `liste` si nomina a Emanuele e si chiede di chi è. Niente
wikilink nel testo della chat.

1. **Il filo.** Dove eravamo rimasti, con la data, e cosa è rimasto aperto: dal summary e dall'`## Aperto`
   delle note dell'ultimo giorno. Le note del loro `related` non si aprono; se ne apre una solo quando
   l'aperto rimanda a qualcosa che non si capisce.
2. **Solo il lunedì · La settimana e gli obiettivi.** Gli obiettivi attivi di 🎯 Obiettivi, coi soli
   titoli, perché dentro ci sono cose private; come la settimana ci si aggancia e quale non ha niente che
   lo muova; le tre priorità della review di ieri. Gli altri giorni Obiettivi non si legge.
3. **📆 La giornata.** Appuntamenti e scadenze di oggi di 🌱 Personale e 💼 Personal Brand, in un elenco
   solo per ora; sotto, quello che è in ritardo. **Di 🌱 Personale solo titolo e ora**, mai contenuto o note:
   il briefing si legge anche con qualcuno accanto.
4. **💼 Personal Brand.**
   - in corso, dalla colonna ⏳;
   - gli appuntamenti dei prossimi sette giorni, da 📆;
   - chi sentire oggi: le task di 💬 Da sentire con la data di oggi o passata, chi e per cosa. Un
     «Setting» è il messaggio per fissare l'incontro, e si dice «da sentire per fissare», mai «incontro con»;
   - le trattative aperte, coi giorni da `Creato`. Oltre sette sono da sollecitare. Le «In qualifica» sono
     ferme su Emanuele e si dicono da mandare. Una «In negoziazione» con una decisione in `Prossimo passo` si
     dice in mezza riga con la decisione, e il giorno fissato lì la porta fra le cose di oggi. Per ognuna si
     chiede se c'è un aggiornamento;
   - i lavori in corso, con la fase e il `Prossimo passo`;
   - il materiale arrivato: le righe di `risposte_modulo` ricevute dopo `ultimo_briefing`, col cliente e
     quante foto. Da lì partono i tempi del lavoro;
   - le fatture da incassare: le scadute in cima, marcate in ritardo, poi quelle entro sette giorni;
   - **i rinnovi entro trenta giorni, tutti**, dal più vicino, urgenti sotto i quattordici. Da *Rinnovi*:
     «A chi si paga» vuoto è da incassare, «Ergonet, lo paga il cliente» è da ricordare al cliente. Gli
     abbonamenti di Emanuele, dalle righe di `quadro.md` del giro 1, sono da pagare. È fatturato ricorrente,
     e un rinnovo che scade in silenzio è un cliente che se ne va;
   - una riga sola sui contatti caldi senza trattativa, dalla vista `lead_caldi`.
5. **🛠️ Siti e gestionali**, solo se qualcosa non è «ok»: il cliente, cosa dice lo script, cosa fare. Un
   sito che non risponde è la cosa più urgente del briefing e va fra le tre di oggi. Un certificato in
   scadenza si guarda e basta: sui piani Hostinger ed Ergonet si rinnova da solo. Se lo script non parte,
   una riga.
6. **👨‍👩‍👦 Famiglia**, solo dalle tre Digitale: in corso, in ritardo o con una data entro la settimana, e le
   novità dopo `ultimo_briefing`, dette «nuove da Raffaele». Quelle create o chiuse da una sessione di
   Claude non sono di Raffaele: si riconoscono dalle note di sessione.
7. **📖 Formazione**, una riga, solo se c'è una data entro la settimana.
8. **📥 Inbox**, solo se non è vuota: «hai N cose da smistare», senza elenco.
9. **Le tre cose di oggi**, trasversali su lavoro, famiglia, personale e formazione, con mezza frase sul
   perché: cosa blocca, cosa scade. Sono una proposta, e se due pesano uguale si dice.
10. **La frase per la giornata**, una riga, due al massimo, nata da quello che è appena uscito: la cosa che
    si sblocca, quella che pesa. Qui Emanuele vuole essere incoraggiato, con una cosa vera e sua e mai con
    una frase da poster. Se la giornata è scarica, si dice quello.

## L'audio

Dopo il testo, mai prima, e ogni giorno senza che lo chieda. L'audio è una copia del testo: stessi fatti,
stesse tre priorità nello stesso ordine.

- **La quota** si legge al giro 2. Se resta meno di un briefing, circa 1.300 caratteri, non parte nessuna
  chiamata: una riga, «l'audio riparte il <giorno del rinnovo>». Sotto i tre briefing, una riga col numero
  e il giorno del rinnovo. Sopra, niente.
- **Si riscrive per l'orecchio**, fra i 900 e i 1.290 caratteri: niente percorsi, id o nomi di database,
  niente formattazione detta a voce, le date come si dicono, i numeri arrotondati quando non cambiano
  niente, le tre priorità in fondo e la frase per ultima, senza niente dopo.
- **Si sintetizza** con `ELEVENLABS_TEXT_TO_SPEECH`, con voce, modello e formato di `riferimenti.json`. La
  risposta si salva alla prima chiamata e si riusa. Nello stesso comando si scarica il file in
  `workspace/journal/audio/briefing-<AAAA-MM-GG>.mp3` e se ne misura la durata con `afinfo`: la sintesi è
  finita quando il file c'è e dura fra 60 e 90 secondi. Se sfora, si taglia la riscrittura, non il briefing.
- **Si apre il file**, e gli mp3 della cartella più vecchi di sette giorni vanno nel Cestino.
- Se in `assets/` compare una `sigla.mp3`, va sotto la voce col comando della [skill](SKILL.md). Se non
  c'è, voce sola, e non si dice niente.
- Se ElevenLabs non risponde, una riga e basta, senza riprovare.

Le condizioni dell'audio nella definizione di fatto si leggono solo i giorni in cui l'audio si fa.

## Le trappole già viste

Le lezioni del [correction log](../../../correction.md) che riguardano il mattino. Quando ne nasce una
nuova, la regola si scrive qui e nel log resta il fatto.

- **La sintesi si paga a ogni chiamata** (25/08): la risposta si salva alla prima e si rilegge.
- **Un audio pagato e mai arrivato** (31/08): finito vuol dire un file su disco con una durata, non una
  risposta dell'API.
- **Un «Setting» non è un appuntamento** (30/08): è il messaggio per fissarlo. Si prepara con la domanda di
  trasformazione e l'agenda a scelta chiusa; la discovery si prepara quando l'incontro esiste.
- **I rinnovi hanno un posto solo** (21/08, 24/09): quelli dei clienti in *Rinnovi* su Notion, i costi di
  Emanuele in `quadro.md`.
- **Uno zero non è un risultato** (06/09): una vista vuota vale se le altre hanno risposto. Se è vuota solo
  lei e la cosa sembra strana, la si guarda.
- **Niente wikilink in chat** (24/08): nel testo che legge Emanuele i nomi si scrivono per esteso.
- **A Marco non si chiede niente** (25/09): nessuna priorità passa da un messaggio a lui.
- **Trello non si guarda** (02/10): Emanuele ha tolto Sistema Evolve dal briefing. Niente chiamate al board e
  niente sezione, nemmeno di una riga; il board si legge solo quando lo chiede lui.
- **Otto minuti sono troppi** (28/09): tre giri, niente letture intere, niente controlli fuori procedura
  senza un rischio segnalato per oggi.

## Casi limite

- **Un servizio non risponde**: il briefing esce lo stesso, con la riga «TickTick non raggiungibile». Non si
  aspetta e non si riprova.
- **Un id o una vista non rispondono più**: si dice e si chiede, senza cercare a tentoni. Due liste coi nomi
  simili esistono davvero.
- **`ultimo_briefing` è null**: è il primo giro, e di novità non se ne segnalano. Se è vecchio di
  settimane, le novità si raggruppano: «sette task nuove sulla Masseria».
- **È lunedì e 🎯 Obiettivi è vuota**: una riga, che fa anche da promemoria.
- **Due saluti nello stesso giorno**: il briefing si rifà, l'audio no.
- **La frase non gli piace**: non se ne genera un'altra, si chiede cosa non tornava e la risposta va nel
  correction log.

## Prima di consegnare

Si passano le condizioni del blocco «buongiorno» della [definizione di fatto](../../../docs/definizioni/journal.md),
lette al giro 1. Se una non torna, si corregge prima di scrivere.

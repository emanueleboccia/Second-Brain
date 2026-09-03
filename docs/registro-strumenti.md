---
title: "Registro degli strumenti"
summary: "Ogni strumento provato o adottato, con stato, uso e verdetto datato: cosa è attivo, cosa è in prova, cosa è stato scartato e cosa aspetta di essere rivalutato. Evita di ricominciare da zero una valutazione già fatta."
tags:
  - docs
  - strumenti
  - registro
status: attivo
created: 2026-09-01
updated: 2026-09-02
related:
  - "[[docs/definizioni-di-fatto]]"
  - "[[self/tariffario]]"
---

# Registro degli strumenti

**A cosa serve:** fra sei mesi qualcuno riproporrà uno strumento già valutato. Senza un
verdetto scritto e datato, la valutazione ricomincia da capo — e la seconda volta si
arriva alla stessa conclusione avendo speso di nuovo il tempo.

Uno stato **non è un giudizio sullo strumento**: è dove sta oggi rispetto a questo lavoro.

| Stato | Cosa vuol dire |
|---|---|
| **attivo** | In uso adesso. Se sparisse, qualcosa si romperebbe. |
| **in test** | Provato su un lavoro vero, verdetto non ancora dato. |
| **scartato** | Valutato e messo da parte, con il motivo. Non si ripropone. |
| **da rivalutare** | Non adottato oggi per una ragione che può cambiare. |

⚠️ **«Scartato» e «da rivalutare» non sono sinonimi.** Il primo chiude la questione, il
secondo la tiene aperta in attesa di una condizione. Confonderli fa perdere entrambe le
informazioni.

---

## Composio — attivo

**A cosa serve:** Gmail, Google Sheets e Apify. È la CLI installata in `~/.composio`, non
un server MCP: gli strumenti si usano dal terminale.

**Verdetto:** indispensabile per quello che ai connettori attivi manca. Nessun connettore
manda email, e Drive arriva al file ma non alla cella. Sul suo account risultano collegati
anche GitHub, Calendar, Docs, Drive, Notion e TickTick: **per quelli si passa dai
connettori attivi**, non da qui.

**Data:** collegato il 21/08/2026, confermato attivo il 01/09/2026.

## Apify — attivo

**A cosa serve:** gli scraper di Google Maps, da cui la skill `estrai-lead` ricava le
liste di potenziali clienti. Si usa attraverso Composio.

**Verdetto:** funziona, ed è l'unico modo per fare scraping qui dentro. ⚠️ **Ogni run si
paga a risultato:** non è uno strumento da lanciare per curiosità.

**Data:** collegato il 25/08/2026.

## ElevenLabs — attivo, ma limitato dal piano

**A cosa serve:** la voce del briefing quotidiano prodotto dalla skill
[[code/skills/journal/SKILL|journal]].

**Verdetto:** la sintesi funziona e la voce scelta è Bella, una premade. Il vincolo è il
**piano free: 10.000 caratteri al mese**, e un briefing ne consuma circa 1.300 — sette o
otto mattine, non un mese. Le voci italiane vere (Elettra, Giusy) sono di libreria e sul
free l'API le rifiuta, anche dopo averle aggiunte all'account.

**Oggi la quota è esaurita e si azzera il 19/09/2026.** Salire a Creator risolve sia il
tetto sia l'accento: è una spesa, e la decisione è di Emanuele. Se sale, basta spostare
un voice_id nel `riferimenti.json` della skill.

**Data:** collegato il 25/08/2026, quota esaurita il 31/08/2026.

## Remotion — in test

**A cosa serve:** montare video da codice — reel, sottotitoli animati, sigle.

**Verdetto:** non ancora dato. È stato provato su girato non suo, e quella prova non è un
deliverable. Serve un test su materiale proprio prima di dire se regge.

**Data:** in prova dal 27/08/2026.

## Higgsfield — da rivalutare

**A cosa serve:** generazione video con AI.

**Verdetto:** **non scartato.** Costo alto e zero crediti sul piano free, quindi oggi non
si può nemmeno provare sul serio. La condizione che riapre la valutazione è economica: se
il prezzo scende o se un lavoro pagato lo giustifica, si riprende da qui.

**Data:** 01/09/2026.

## GoHighLevel — da rivalutare

**A cosa serve:** CRM e automazioni di marketing in un unico posto.

**Verdetto:** valutato e **non adottato oggi**. Non è un no allo strumento: oggi lo stato
dei clienti sta su Notion e le azioni su TickTick, e sostituire due cose che funzionano
costa più di quanto renda. Da riconsiderare quando i clienti esterni saranno abbastanza
da rendere faticosa la gestione a mano.

**Data:** 01/09/2026.

## Obsidian — da rivalutare

**A cosa serve:** aprire questo vault come si apre un'app, con il grafo, la ricerca e i
wikilink cliccabili, invece che da terminale.

**Verdetto:** **da provare, non ancora provato.** Il vault è già scritto in wikilink con
percorso completo dalla radice, quindi è compatibile senza toccare niente. `.gitignore`
esclude già lo stato locale di Obsidian, il che vuol dire che qualcuno ci aveva pensato.
Il verdetto si dà dopo una settimana d'uso vero, non dopo l'installazione.

**Data:** 01/09/2026.

## Claude — attivo

**A cosa serve:** è lo strumento con cui questo vault viene scritto, letto e interrogato, e
con cui girano le skill. Piano Max.

**Verdetto:** è la spina dorsale del sistema, e va detto che **non ha un costo fisso**: il
piano cambia mese per mese col carico di lavoro, quindi si legge a consuntivo come Apify e
non si mette a budget. È la voce più pesante dello stack professionale.

**Data:** censito il 02/09/2026, alla prima chiusura contabile.

## ChatGPT — attivo

**A cosa serve:** generazione di immagini e testi fuori dal vault, seconda opinione.

**Verdetto:** convive con Claude senza sovrapporsi del tutto, ma è il primo posto da guardare
il giorno che si vuole tagliare lo stack: due assistenti generalisti pagati insieme sono la
domanda che il registro esiste per far nascere.

**Data:** censito il 02/09/2026.

## CapCut — attivo

**A cosa serve:** montaggio video veloce, sottotitoli, formati verticali.

**Verdetto:** è lo strumento di montaggio in uso oggi. Va guardato insieme a
[[docs/registro-strumenti|Remotion]], che sta in test sullo stesso lavoro: se Remotion regge,
la domanda su CapCut si riapre.

**Data:** censito il 02/09/2026.

## Lovable — in test

**A cosa serve:** costruzione rapida di interfacce e prototipi web da prompt.

**Verdetto:** non ancora dato. Primo mese pagato ad agosto 2026, e il rinnovo di settembre
non è deciso. Il verdetto si dà dopo averlo usato su un lavoro vero, non su una prova.

**Data:** primo mese ad agosto 2026.

## Superwhisper, ManageWP, Command X — attivi

**A cosa servono:** dettatura vocale, manutenzione dei WordPress dei clienti, gestione
finestre sul Mac. Sono utilità, non strumenti che cambiano come si lavora.

**Verdetto:** nessuno da dare. Stanno qui perché comparivano sugli estratti conto senza che
nessun file del vault dicesse cosa fossero, ed è esattamente il buco che questo registro
serve a chiudere.

**Data:** censiti il 02/09/2026.

---

## Come si aggiunge uno strumento

Un blocco nuovo con le stesse quattro voci: **stato**, **a cosa serve**, **verdetto**,
**data**. Il verdetto si scrive anche quando è negativo, e soprattutto allora.

**Quando uno strumento passa a «attivo»**, qualcosa smette di essere facoltativo: da quel
momento un lavoro non è finito se non è passato di lì. È il punto in cui va guardato se
serve una riga in [[docs/definizioni-di-fatto|definizioni di fatto]], perché uno strumento
attivo che nessuna definizione nomina è uno strumento che si userà a memoria.

**Se uno strumento entra nel prezzo di un servizio**, si nomina anche in
[[self/tariffario|tariffario]]: un abbonamento che si paga per conto di un cliente e non
compare nel listino è un costo che si scopre a fine anno.

Quanto costa uno strumento **non si scrive qui**: sta fra le spese ricorrenti di lavoro
dell'area finanza, che è esclusa da git. Qui c'è se serve, là quanto pesa. E quando uno
strumento diventa la spina dorsale di un lavoro consegnato, il posto dove si racconta
com'è andata è il ricettario — per esempio [[docs/casi/girarrosto-liberti|il caso del
Girarrosto]], dove il sistema di ordinazioni ha sostituito la carta.

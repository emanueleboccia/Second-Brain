# Memory — Campagne Meta

Aperta il 25/09/2026. Le campagne a pagamento del personal brand: qui stanno le decisioni, con la data. Il
piano sta in [[projects/campagne-meta/strategia|strategia]]; lo stato delle campagne sta su Notion, nella
sezione *Pubblicità*.

## 25/09/2026 — L'Ad Center su Notion

Chiesto da Emanuele la notte fra il 24 e il 25, partendo da un modello con tredici sezioni da riprogettare.
Ne sono rimasti quattro database e una pagina, sotto *Pubblicità*: **Campagne**, **Inserzioni**,
**Pubblici**, **Concorrenti** e la **Strategia**, copia della nota del vault. Obiettivi e numeri sono campi
delle campagne; il brainstorming è la prima colonna delle inserzioni, «Idea»; la ricerca di mercato sta
dentro pubblici e concorrenti. Fuori i to-do, che stanno su TickTick, le email, i prompt, e i contatti, che
entrano nel CRM che c'è già, con Origine «Pubblicità» e la campagna collegata.

- **Solo le campagne di Emanuele**: «serve solo per le mie campagne». I brand di famiglia non passano da qui.
- **I conti si fanno da soli**: spesa e contatti di Meta dalle inserzioni; contatti veri, clienti e valore
  vinto dai contatti collegati. Per il valore vinto le trattative hanno un campo *Valore vinto*, e i contatti
  due, *Trattative vinte* e *Valore vinto*: Notion non somma una somma, e la formula fa da ponte.
- **Meta Ads su Composio c'è, ma è scaduto**: due collegamenti, tutti e due *EXPIRED*. Superato lo stesso
  giorno: Meta si collega col connettore ufficiale, più sotto.

## 25/09/2026 — La rottamazione è uno sconto

Deciso da Emanuele: **la rottamazione è uno sconto, basato su quanto il cliente ha speso col vecchio
fornitore**. Chiude la domanda che [[self/reference/offerta|offerta]] teneva aperta dal 20/09, sconto o
setup gratis. Poche ore dopo sono arrivati anche i numeri: **il 50% della spesa, tolto dalla proposta, e sui canoni
l'ultima rata**, senza un tetto fisso. La spesa si dimostra con le fatture. Sta in [[self/pacchetti|pacchetti]].

## 25/09/2026 — Meta si collega col connettore ufficiale, non con Composio

Emanuele ha chiesto di ricollegare Meta. I due collegamenti scaduti di Composio non ci sono più, e quello
nuovo vorrebbe un **token** di un utente di sistema, che per nascere chiede anche un'app di Meta nel
portfolio. Due cose da creare e una chiave da incollare a mano.

**La strada scelta è il connettore di Meta**: il server MCP ufficiale per le inserzioni,
`https://mcp.facebook.com/ads`, uscito il 29/04/2026. Si aggiunge in Claude come connettore personalizzato
e si autorizza col login di Facebook, scegliendo il portfolio. Niente token, niente app. È la regola del
`CLAUDE.md` di radice: per un servizio che ha un connettore, Composio non serve. Da lì si leggono spesa e
risultati delle campagne, e si possono creare campagne, che nascono in pausa. Le azioni permesse agli agenti
si decidono nelle impostazioni del portfolio, alla voce *Server pubblicitario MCP*: senza, l'agente legge
soltanto.

⚠️ **Il portfolio è *Emanuele Boccia - Business***, rinominato da Emanuele il 25/09/2026: prima si chiamava
Groweb Studios, il vecchio nome dell'attività. Si usa quello, detto da lui, e non quelli di Mamma Rosaria o di
Evolve. Quel giorno non aveva ancora un account pubblicitario, né app né utenti di sistema: l'account lo
crea Emanuele, con fuso orario di Roma ed euro, che dopo non si cambiano più, e col suo metodo di pagamento.

## 25/09/2026 — Meta è collegato: cosa c'è e cosa manca

Emanuele ha creato l'account pubblicitario, aggiunto il connettore e dato il permesso a tutte le azioni, alla
voce *Server pubblicitario MCP* del portfolio. Il connettore risponde, e vede quattro account:

| account | di chi | stato |
|---|---|---|
| `1095523649636519` *Emanuele Boccia* | portfolio *Emanuele Boccia - Business* | **è quello delle campagne**. Attivo, in euro, ⚠️ **senza metodo di pagamento** |
| `105329989612687` *Emanuele Boccia* | nessun portfolio: il vecchio account personale | ha una carta, non si usa |
| *DMR Pubblicitario* | Da Mamma Rosaria | non si tocca da qui |
| *Account Pubblicitario Evolve* | Sistema Evolve | non si tocca da qui |

- **La pagina** è *Emanuele Boccia*, `331564596695983`, l'unica del portfolio. Sotto l'account nuovo non ne
  risulta ancora nessuna: compare quando un annuncio la usa.
- **Nessun pixel** nel portfolio. Serve solo se la campagna manda al sito; per WhatsApp e per il modulo di Meta
  no.
- **Instagram** dal connettore ancora non si legge: lo strumento non è arrivato su questo account, dice Meta,
  e va riprovato.
- ⚠️ **Il connettore porta i numeri, non le persone.** Fra i suoi strumenti ce ne sono per leggere spesa,
  risultati e contatti contati da Meta, per creare e modificare campagne e pubblici, ma nessuno per scaricare
  chi ha compilato un modulo. I contatti di un modulo si scaricano da Meta e si scrivono in *Contatti e lead*
  con Origine «Pubblicità»: è la risposta alla domanda lasciata aperta nella [[projects/campagne-meta/strategia|strategia]].
- ⚠️ **Accendere spende.** Emanuele ha dato il permesso a tutto, quindi il connettore può anche attivare. La
  regola sta nel [[CLAUDE|CLAUDE.md]] di radice: una campagna nasce in pausa, e accenderla, alzare un budget o
  riattivare un annuncio si fa solo col suo ok, ogni volta.

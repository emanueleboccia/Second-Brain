---
title: "Processo cliente — dal sì alla consegna"
summary: "Il percorso che ogni lavoro segue, dal sì del cliente alla consegna e oltre: otto fasi, la regola che il cliente esiste solo col movimento di denaro, le monete di scambio quando il prezzo è di favore, e le sette cose da non fare mai."
tags:
  - docs
  - processi
status: attivo
created: 2026-09-21
updated: 2026-09-22
related:
  - "[[docs/onboarding]]"
  - "[[self/tariffario]]"
  - "[[docs/brief-cliente]]"
  - "[[docs/vendita/problema-bruciante]]"
  - "[[entities/clienti/README]]"
---

# Processo cliente — dal sì alla consegna

> **Stabilito da Emanuele il 21/09/2026**, fondendo due fonti che descrivono lo stesso flusso: la
> checklist di onboarding in cinque passi e il kickoff strutturato del video sull'agenzia AI. Qui
> dentro è confluito anche [[docs/onboarding|l'onboarding]], che copriva le fasi 0-4 e aveva tre
> paletti che il resto non aveva.

**Il principio che tiene tutto:** ogni cosa scomoda da chiedere si chiede all'inizio, quando è
normale chiederla. Dopo diventa un favore.

## Fase 0 · Prima che parta qualsiasi cosa

**Il cliente esiste solo quando c'è un movimento di denaro.** Un sì a voce o via messaggio non è
un cliente: ci ripensano, sentono altri, arrivano priorità nuove. Finché non c'è il bonifico o
l'accordo firmato **non si celebra, non si smette di cercare altri clienti, non si inizia a
costruire**.

⚠️ **L'eccezione esiste e va nominata, perché sono i due lavori più importanti che ha.** Il
[[entities/clienti/girarrosto-liberti/scheda|Girarrosto]] è stato fatto a 0 € e
[[entities/clienti/sistema-evolve/scheda|Sistema Evolve]] pure. **Un prezzo a zero si fa solo come
caso studio, e allora quello che sostituisce il denaro sono le monete di scambio qui sotto,
pattuite prima e messe per iscritto.** Un lavoro a zero senza monete non è un caso studio: è un
regalo, e va chiamato così.

**Niente si muove senza accordo scritto.** Preventivo o contratto firmato prima di toccare
qualsiasi cosa, e dentro ci vanno:

- **Ambito**: cosa è incluso e cosa no
- **Consegne**: la lista precisa di cosa riceverà
- **Tempi**: col margine della fase 4
- **Revisioni**: quante sono comprese — a [[self/tariffario|tariffario]] sono due
- **Condizioni di pagamento**: quando e come
- **Firma nel piede**: resta, salvo accordi diversi

⚠️ **Il contratto non è solo tutela, è marchio.** Proporlo dice che si è professionisti seri prima
ancora di quello che c'è scritto dentro.

## Fase 1 · Il pagamento senza attrito

La fattura o la richiesta di acconto esce con **più modi di pagare nella stessa comunicazione**:
bonifico e, dove si può, un link di pagamento. Un pulsante è meno imbarazzante di una richiesta: se
pagare è un'azione invece che una conversazione, non serve trovare il coraggio ogni volta.

**La fattura porta sempre una scadenza: sette giorni dalla data di emissione**, e la data si scrive
anche nel messaggio che la accompagna, così il cliente la vede senza aprire il PDF. Una fattura «a
vista» non ha un giorno, e con chi conferma a voce e poi si ferma vuol dire aspettare: con la data
scritta, ricordargliela non costa niente, perché l'ha già vista. Deciso da Emanuele il 22/09/2026,
sulla fattura dell'acconto di [[entities/clienti/ragosta/scheda|Ragosta]].

**I dati di fatturazione si chiedono al sì**, non nel modulo: ragione sociale, partita IVA, sede legale e
codice destinatario o PEC. Senza quelli la fattura dell'acconto non parte, e con Ragosta il 22/09/2026 si è
visto. Stanno nella scheda del contatto su Notion. **L'accordo e la fattura dell'acconto partono insieme**,
nello stesso messaggio: il modello dell'accordo è quello di Ragosta, in `outputs/accordi/`.

⚠️ **Il link di pagamento vale anche prima della fattura, ed è la mossa più forte che ha questa
fase.** Detto da Emanuele il 23/09/2026. Quando il cliente dice sì in chiamata, il momento in cui è
più convinto è quello, e ogni ora che passa lo raffredda: **il link del micro-acconto parte mentre
si è ancora al telefono**, e blocca il prezzo. Non è una tecnica nuova, è il
[[docs/vendita/micro-commitment|micro-commitment]] degli appunti di vendita messo in condizione di
funzionare: lì c'era già «un piccolo acconto per bloccare l'offerta», quello che mancava era
togliere il buco fra il sì e il bonifico.

Lo strumento previsto è **Stripe**, ancora da valutare nel
[[docs/registro-strumenti|registro degli strumenti]]. Il pagamento a rate con Klarna o Scalapay
oggi **non si può fare**, e non si nomina al cliente finché non si può.

**Le spese anticipate per conto del cliente si dichiarano e si fatturano subito**, non a fine
progetto. Sono soldi già usciti: chiederli indietro non è negoziare, è amministrazione.

## Fase 2 · Il sopralluogo

⚠️ **Aggiunta al processo di Emanuele il 21/09/2026, perché mancava e non è un dettaglio.** Il
passo `01` della sua offerta dice *«vengo da te, guardo come lavorate»*, e tutto il posizionamento
è **di persona**: è il vantaggio che nessuno replica da remoto. Un processo che va dal pagamento
alla call di kickoff senza uscire di casa butta via proprio quello.

⚠️ **Si può saltare, e allora quello che raccoglieva va raccolto altrove.** Detto da Emanuele il
23/09/2026 su Ragosta: per un sito vetrina fatto sulle foto che il cliente ha già, andare in sede
non aggiunge niente che il modulo e mezz'ora di telefono non diano. Ma **le tre cose qui sotto non
spariscono**: se non ci vai, il «prima» non lo giri, e va detto — non è gratis, è un caso studio in
meno. La regola resta che il sopralluogo è il default: si salta per un motivo, non per comodità.

Si va sul posto **prima di costruire**, e si fanno tre cose:

1. Si guarda come lavorano davvero, non come dicono di lavorare.
2. **Si riprendono tre minuti del gesto vecchio.** Regola del
   [[projects/personal-brand/lancio|piano di lancio]]: costa niente, non impegna a fare nessun
   video, e produce il «prima» che nel caso del Girarrosto è andato perso per sempre.
3. Se c'è un sito o un gestionale da sostituire, **se ne registra lo schermo** finché è vivo.

## Fase 3 · Il documento di benvenuto

Scritto una volta sola e riusato per ogni cliente:

- panoramica del progetto, **come l'ho capito io**
- cosa succede adesso, passo per passo
- come e quando comunichiamo
- dove trova i materiali

Serve a due cose: dà il tono di uno che lavora in modo strutturato, e **toglie il ripensamento
post-acquisto** — quel momento in cui uno ha appena pagato e si chiede se ha fatto bene. Se quel
dubbio non si chiude subito, diventa la cornice di tutto il resto.

**Il modello sta su Notion**, nella pagina *Onboarding clienti* dentro *Clienti*: si chiama *Benvenuto —
modello da duplicare*, si duplica per ogni cliente e si riempiono i segnaposto fra parentesi quadre.
Scritto il 21/09/2026, con dentro anche tempi e fascia di reperibilità, lasciati vuoti apposta.

**La copia del cliente è il suo portale.** Dal 22/09/2026 la sezione «A che punto siamo» è una lista di
spunte, dall'accordo alla consegna delle chiavi: si spunta a ogni passo, e il cliente sa sempre dov'è
senza chiederlo. Il link della copia sta nel campo *Portale* della proposta.

**Dal 23/09/2026 i portali stanno tutti in una pagina sola, *Portali clienti*, e si condividono uno
per uno col link pubblico.** Due cose lo rendono l'unico modo che funziona:

- ⚠️ **Su Notion i permessi vanno per pagina, non per riga.** Una vista filtrata di *Fatture* dentro
  il portale non mostra al cliente la sua fattura: gli mostra il vuoto, perché non ha accesso al
  database. E dargliene accesso vuol dire mostrargli quelle di tutti. **Quindi il portale non guarda
  dentro i database: contiene le sue copie**, coi PDF attaccati alla pagina.
- **L'invito come ospite richiede un account Notion**, e un cliente che l'email non la apre — come
  [[entities/clienti/ragosta/scheda|Gaetano Ragosta]] — non ci arriva mai. Il link pubblico si apre
  dal telefono e si manda su WhatsApp.

Sul link pubblico si spegne l'indicizzazione sui motori di ricerca e si toglie «duplica come
modello». E vale una regola sola, che non ha eccezioni: **nel portale ci va solo roba che è già del
cliente** — il suo accordo, la sua fattura, il suo stato. Mai una nota interna, mai il prezzo di un
altro. Il link è pubblico, e chi ce l'ha entra.

⚠️ **I portali si tengono tutti sotto la stessa pagina madre proprio per non condividerla mai.** Si
pubblica il figlio, mai il genitore: pubblicare *Portali clienti* vorrebbe dire dare a ognuno la
pagina di tutti gli altri.

## Fase 4 · Il modulo di raccolta

**Un solo modulo per tutto**, mandato subito dopo il benvenuto: accessi (hosting, dominio, social,
gestionali), materiali di marca (logo, foto, testi esistenti), dati aziendali (ragione sociale,
contatti, orari, indirizzi), preferenze e riferimenti.

**Chiedere una volta. Non rincorrere mai più.**

**Il modulo è su Notion**, nella stessa pagina *Onboarding clienti*: il form *📥 Modulo di raccolta*
scarica le risposte nel database *Raccolta materiali*, una riga per cliente, con la relazione verso
Contatti e verso Siti Clienti per non riscrivere dati che ci sono già. ⚠️ **Il link pubblico del form si
attiva a mano da Notion** — «Chi può compilare», poi *Chiunque sul web abbia il link* — e fino ad
allora il cliente non lo apre. Attivato il 23/09/2026. ⚠️ **Le domande del modulo si aggiungono solo
a mano**: l'API di Notion configura filtri, viste e permessi, ma non le domande di un form, e il
DSL delle viste le ignora in silenzio.

⚠️ **Si distingue a colpo d'occhio cosa deve fare lui da cosa è facoltativo.** Un cliente che non sa
quali palle sono nel suo campo non fa niente, e poi si lamenta dei tempi.

## Fase 5 · La call di kickoff

Cinque punti, sempre gli stessi.

1. **Timeline con margine.** Si promette più di quanto serve e si consegna prima: se il lavoro
   chiede quattro settimane se ne promettono sei e si consegna in quattro. Mai il contrario. Il
   proprio moltiplicatore — quanto si sbaglia di solito nelle stime — si applica **prima** di dire
   la data.
2. **Reperibilità dichiarata.** «Rispondo dal lunedì al venerdì, in questa fascia, entro questo
   tempo.» Se non lo dichiara lui lo decide il cliente, e pretenderà l'istante.
3. **Quando è finito, scritto insieme.** «Il progetto è finito quando ci sono X, Y e Z. Tutto il
   resto è un'aggiunta e si prezza a parte.» Senza questa riga ogni «già che ci sei…» è lavoro
   gratis.
4. **Registrazione alle piattaforme, guidata in call.** Account e accessi si fanno insieme mentre
   si è al telefono, per non perdere una settimana perché il cliente non riesce a registrarsi.
5. **Obiettivi e direzione.** Cosa vuole ottenere davvero, con che tono, per quale pubblico. Le
   domande stanno in [[docs/brief-cliente|brief cliente]].

**Le credenziali sono sue.** Si sviluppa su account e abbonamenti del cliente, intestati a lui.
Niente dipendenza forzata: la relazione si tiene con il lavoro fatto bene, non con il ricatto
tecnico.

⚠️ **C'è dell'arretrato su questa regola.** Il sito di **Room84** sta sull'abbonamento Elementor di
Emanuele, che non rinnova. La regola è giusta e vale da oggi; i lavori vecchi che non la rispettano
vanno spostati o chiusi.

## Fase 6 · Durante il lavoro

**Aggiornamento settimanale proattivo**, anche breve, anche quando non c'è niente di nuovo:
*«Settimana 1: fatto X, ora sto su Y, nessun blocco. Ci sentiamo lunedì.»* Chi comunica prima di
essere cercato sembra — ed è — professionale. Chi sparisce lascia il dubbio che non stia lavorando.

⚠️ **Dopo l'approvazione del design le modifiche sono limitate a testi, immagini e colori.** Si dice
**prima**, in call, non quando arriva la richiesta di spostare tutto. È il paletto che impedisce a
un progetto di non finire mai.

**A metà progetto, due cose.** Si chiede **il referral**, perché è il picco del coinvolgimento e non
la fine: *«conosci qualcun altro che ha lo stesso problema?»*. E si **semina l'upsell** — *«mentre
lavoravo ho visto che potremmo anche…»* — che si propone alla consegna ma si annuncia adesso.

⚠️ **L'inserimento dei contenuti è il punto dove i clienti si bloccano davvero**, ed è lì che nasce
l'occasione di vendere assistenza in più. Non è un trucco: si bloccano.

## Fase 7 · La consegna

- **Test completo dall'inizio alla fine**, non dei singoli pezzi: è l'insieme che si rompe.
- **Procedura scritta**, un documento semplice: come funziona, passo per passo.
- **Video registrato su misura**, in cui mostra il sistema e lo spiega. Costa dieci minuti e vale
  moltissimo proprio perché oggi tutto sembra generato in serie.
- **La proposta successiva**, se il lavoro è andato bene: è il momento in cui costa meno vendere.

⚠️ **Nella mail di consegna si scrive cosa comprende l'assistenza e cosa no**, non si chiarisce sei
mesi dopo davanti a una richiesta. Comprende aggiornamenti, manutenzione ordinaria, modifiche
formali e riparazioni per danni non causati da lui; non comprende scrivere i contenuti, e i danni
causati dal cliente si pagano a parte.

**Alla fine del primo anno il cliente sceglie**: rinnovare con un costo fisso annuo, oppure
riscattare il lavoro — accessi, PDF con le procedure di manutenzione e i costi di intervento.

## Fase 8 · Dopo

**Si chiede la testimonianza**, con parole sue, meglio se registrata, e si archivia nella scheda del
cliente: serve al caso studio, ai contenuti, e a chi verrà dopo.

**Su Notion la testimonianza ha il suo campo** nel database Contatti, insieme alle due direzioni del
referral — *Chi me l'ha mandato* e *Chi ha mandato lui* —, così la catena si legge in tutti e due i versi.
Aggiunte il 21/09/2026.

**Si registra l'esito nello storico**: data, cliente, voce, prezzo, esito. Dopo cinque o sei righe
il tasso di chiusura dice se il prezzo è tarato giusto — intorno al **30%** è giusto, molto sopra
vuol dire che si sta vendendo sotto, **sotto il 20%** vuol dire prezzo alto o vendita debole.
**Chiudere tutti non è bravura: sono soldi lasciati sul tavolo.** Il conto si legge nella vista
*📊 Tasso di chiusura* del database Proposte, raggruppata per stato.

## Su Notion, fase per fase

**Dal 22/09/2026 tutto quello che è un documento o uno stato di un cliente vero passa da Notion**, deciso da
Emanuele. Sta nella pagina *Clienti*, coi database nell'ordine del processo: Contatti, Proposte, Fatture,
Siti Clienti, Onboarding. Qui resta il metodo; lì stanno i PDF, le fatture e il punto in cui è ogni lavoro.

Dal 23/09/2026 accanto a *Clienti*, e fuori da essa, sta **Portali clienti**; e sopra a tutto la
**Home**, il cruscotto con le quattro viste che il briefing del mattino legge: lavori per fase,
fatture da incassare, scadenze siti, lead caldi senza proposta. Sono le stesse quattro, di
proposito: quello che guardi su Notion e quello che ti viene letto la mattina devono dire la stessa
cosa.

- **La proposta è la scheda del lavoro**, dal primo contatto al saldo. *Fase* dice dov'è — Proposta,
  Accordo e acconto, Onboarding, Sviluppo, Consegna, Chiuso — e *Prossimo passo* lo dice in una riga,
  riscritta ogni volta. Dentro la pagina c'è la checklist di questo processo compilata coi dati veri:
  date, importi, file. La vista *In lavorazione* mette i lavori in colonna per fase.
- **Ogni fattura è una riga di *Fatture***, col numero di Fiscozen, il tipo, l'importo, la scadenza, lo
  stato e il PDF, collegata al contatto e al lavoro. I soldi che si muovono restano nel registro lavori.
- **L'accordo sta sulla proposta**, quello mandato e quello firmato, con la data della firma.
- **I dati di fatturazione stanno sul contatto.**

| Cosa succede | Cosa si aggiorna |
|---|---|
| Il cliente dice sì | Fase «Accordo e acconto», dati di fatturazione sul contatto, accordo dal modello |
| Parte la fattura dell'acconto | riga in *Fatture* col PDF e la scadenza, checklist, storico |
| Torna l'accordo firmato | file e data della firma sulla proposta |
| Arriva l'acconto | fattura «Incassata», movimento nel registro, proposta «Accettata» in fase Onboarding, contatto 🟢 Cliente, portale dal benvenuto |
| Consegna | sito «Online» con le scadenze, fattura del saldo, fase Consegna |
| Arriva il saldo | fattura «Incassata», movimento nel registro, fase Chiuso, esito nello storico |

Emanuele dice cosa è successo; l'aggiornamento si mostra tutto insieme e si scrive con una conferma sola.

**Come si chiamano le fatture.** Stabilito il 23/09/2026, alla prima fattura vera. Il PDF che esce da
Fiscozen si rinomina e si salva in `outputs/fatture/` come
**`<anno>-<numero a tre cifre>-<cliente>-<tipo>.pdf`** — `2026-001-ragosta-acconto.pdf`. Il numero è
quello di Fiscozen, non uno nostro: così il file, la riga in *Fatture* su Notion e il documento
fiscale portano lo stesso codice, e la cartella si ordina da sola in ordine di emissione. Il nome
che Fiscozen dà al file — `Fattura 1-2026 - NEW R.G.A. S.R.L..pdf` — non si tiene: ha gli spazi, il
numero al contrario e la ragione sociale, che fra sei mesi non dice quale cliente sia.

⚠️ **Il cliente ha due nomi, e servono tutti e due.** Il nome con cui lo chiami — *Ragosta* — e la
ragione sociale che va sui documenti — *NEW R.G.A. S.R.L.* Nel vault e nei registri si usa il primo,
perché è quello che riconosci; **su accordo e fattura ci va il secondo**, perché è quello che firma e
che paga. La ragione sociale si scopre quando arrivano i dati di fatturazione, cioè dopo che
l'accordo è già stato scritto: **prima di mandarlo a firmare, si ricontrolla.** Il 23/09/2026
l'accordo di Ragosta intestava il lavoro a una società che non esiste, e stava per partire così.

**Ordine e icone.** Ogni pagina e ogni database prende un'icona della famiglia grigia di Notion, una per
tipo di cosa: la valigetta per *Clienti*, la faccina per i contatti, il pallino per le proposte, la
ricevuta per le fatture, il globo per i siti, la bandiera per l'onboarding, la mano per il benvenuto,
l'inbox per la raccolta. I PDF si chiamano `data-tipo-cliente.pdf`, e nelle viste le colonne stanno sempre
nello stesso ordine: nome, stato, fase, date, importi.

## Le monete di scambio

Quando si fa un prezzo di favore, il compenso non è mai zero. Le monete, da pattuire prima e
mettere nell'accordo:

- **il permesso di filmare il caso studio**
- **la testimonianza con parole sue**
- **due nomi di attività con lo stesso problema**

Tre monete, uno sconto. E lungo la catena dei referral il prezzo sale a ogni anello, mentre la
soluzione si templatizza e il tempo di produzione scende.

⚠️ **Questo cambia il [[self/tariffario|tariffario]], e va allineato.** Lì oggi c'è scritto che la
riduzione del 20% si dà **in cambio del solo permesso scritto**. Qui le monete sono tre per lo
stesso sconto. Finché i due file non dicono la stessa cosa, in trattativa vince quello che si
ricorda per primo.

## Cosa non fare, mai

- Iniziare a lavorare prima dell'accordo firmato
- Lavorare per una percentuale futura su un fatturato che non esiste
- Anticipare soldi senza dichiararli e fatturarli subito
- Accettare aggiunte fuori dall'ambito senza riprezzarle
- Consegnare senza procedura e senza video
- Chiudere un lavoro senza chiedere testimonianza e referral
- Dimenticare di scrivere l'esito nello storico

## Il principio che regge tutto

**Chi ha meno bisogno guida.** Vale nella call di vendita e vale qui: se il cliente percepisce che
si ha bisogno dei suoi soldi, si prende lui il comando del processo. Il cliente paga per essere
guidato — e va guidato, restando flessibili senza cedere la posizione di esperto. Il resto sta in
[[docs/vendita/problema-bruciante|il metodo di vendita]].

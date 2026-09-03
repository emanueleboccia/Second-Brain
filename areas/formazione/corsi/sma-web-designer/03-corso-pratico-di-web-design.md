---
title: "SMA · Web Designer — Corso Pratico di Web Design"
summary: "Modulo 3 del corso SMA · Web Designer, importato da Notion il 03/09/2026: 13 lezioni con gli appunti originali."
tags:
  - areas
  - formazione
  - corsi
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Corso Pratico di Web Design

> Modulo 3 di **SMA · Web Designer**. Materiale originale importato da Notion il 03/09/2026,
> non riscritto. Le regole che ne sono nate stanno in [[docs/procedure/sito-web-wordpress|la procedura del sito]] · [[code/skills/web-design/SKILL|la skill web-design]].

## 1. Le basi per costruire il primo store

possiamo impostare lo stato della pagina in costruzione, per esempio “in attesa di revisione” per ricordarci che bisogna rivisionarla e definirla.
---
<empty-block/>
La lezione mette le basi operative per costruire il primo store “da zero a uno” in pratica: capire dominio/hosting, creare un ambiente di prova (sandbox) per WordPress, installare Elementor e iniziare a mettere i primi elementi in pagina (testo/immagini), distinguendo sempre tra preview (sviluppo) e pagina pubblica (produzione).
### Obiettivo del modulo pratico
- Entra un ospite tecnico: Davide, web designer “di punta” in azienda, chiamato perché lavora quotidianamente su siti (tool, trick, trend) mentre il docente principale dichiara di non fare più design operativo ed essere ormai direttore marketing.
- Il modulo pratico serve a darvi strumenti concreti per passare dalla teoria all’azione e rendervi “competitivi sul mercato” (freelancer/agenzia/e‑commerce), non solo capaci di fare un sito come esercizio scolastico.
- Si parte con Elementor su WordPress (perché è il page builder più usato in quell’ecosistema) e poi il modulo verrà sviluppato anche su altri strumenti (non promessi con certezza, ma “altri due” vengono citati come possibilità).
### Concetti base: dominio, hosting, banda
- Dominio: è il “nome/indirizzo” del sito (esempio: [**www.google.com**](http://www.google.com/)), paragonato all’indirizzo di casa dove arrivano i pacchi.
- Hosting: è una porzione di potenza di calcolo su server fisici (non “nel vuoto”), che serve a ospitare il sito e servire richieste (immagini, font, stile, ecc.) quando gli utenti lo visitano.
- Banda: viene spiegata come “il motore” (V6/V8/V12) che determina quanti visitatori possono scaricare insieme il sito, in base al “peso” (es. MB) e alla quantità di banda disponibile su un certo periodo (al secondo/minuto/mese).
- Nota esperienza reale: viene citato un caso in cui un hosting scelto male, durante un picco enorme di traffico, è costato moltissimo (centinaia di migliaia di euro) per banda non calcolata, quindi attenzione perché l’inesperienza tecnica può avere conseguenze pesanti.
- Contesto prezzi: non ha senso partire con hosting costosi se non avete grandi volumi; piani piccoli reggono volumi più bassi, piani grandi servono per grandi numeri.
### Setup “facile”: sandbox WordPress con 1 click
- Viene mostrato un “trick” per creare rapidamente un WordPress di prova tramite un servizio (citato: tastewp.com): con un tasto lancia un sito WordPress “vuoto” (Hello World), utile per iniziare subito a smanettare senza setup complessi.
- Questo ambiente è temporaneo: dura 2 giorni se non registrati, 7 giorni se registrati gratuitamente; è pensato per “spaccare tutto senza fare danni”, esercitarsi e rifarlo se serve.
- Distinzione importante: è un ambiente di test, non di produzione; finito il progetto, si passa a un setup reale (hosting vero + dominio collegato).
### WordPress, plugin, Elementor: cosa sono
- WordPress viene presentato come CMS/base dell’infrastruttura (piramide: sotto WordPress, sopra i layer).
- Plugin: “mattoncino” aggiuntivo che estende WordPress (paragonato a un’app/tema del telefono); serve per aggiungere funzioni senza farle sviluppare da zero.
- Elementor: è il page builder (plugin) che consente di costruire pagine a blocchi con drag&drop e molta personalizzazione (in teoria “quasi ogni sito” è replicabile con un page builder medio-alto).
- Motivazione scelta WordPress: è molto diffuso, costa poco, ha community enorme e tanta documentazione/plugin, quindi copre quasi tutte le esigenze tipiche.
### Dominio: come prenderlo (esempio Register.it)
- Viene consigliato register.it come esempio pratico per comprare domini, anche per la possibilità di avere talvolta il primo anno gratuito su alcuni TLD (es. .it; citati anche casi in cui .com può capitare).
- Scelta TLD: .it e .com sono indicati come “istituzionali”; estensioni tipo .shop o .io vengono sconsigliate come dominio principale (esempio: “pizza pazza .shop” non professionale), mentre ha senso usarle semmai come sottodominio o in contesti specifici.
- “Trick” operativo: rimuovere gli extra/upsell aggiunti automaticamente in checkout.
- Dominio e hosting sono separabili: potete trasferire il dominio su un hosting diverso se cambiano le esigenze (es. sito che cresce molto).
### Installazione Elementor e prima navigazione (UI)
- Installazione: in WordPress si va su Plugin → Aggiungi plugin → cerca “Elementor” → Installa → Attiva (attivare è fondamentale, altrimenti è come non averlo).
- Elementor (UI base): a sinistra lista blocchi/widget, al centro pagina (canvas), in alto modalità desktop/tablet/mobile, pulsante anteprima, pulsante pubblica, e una vista “struttura” per vedere gerarchie/contenitori.
- Responsive: viene detto che adattare mobile/tablet è spesso la parte più complessa; si accenna anche a casi non coperti dai tre breakpoint (es. telefono in landscape) che richiedono ulteriore attenzione.
### Regola critica: sviluppo (preview) vs produzione (pubblico)
- Anteprima = preview per testare senza impattare la pagina live; Pubblica = porta le modifiche in produzione (visibili al mondo e al traffico).
- Motivo: in produzione potete fare danni reali (copy/immagini sbagliate, sezioni cancellate, modifiche mentre girano ads), quindi va interiorizzata la separazione “sviluppo vs live”.
### Prime azioni pratiche: inserire testo e immagini
- Drag&drop: per aggiungere un titolo si trascina il widget “titolo” e si scrive; per immagini uguale (sostituendo il placeholder).
- Headline e tag H1/H2/H3: non si scelgono solo per “grande/piccolo”, ma incidono sulla SEO; H1 deve essere coerente col contenuto del sito, non una CTA tipo “prenota ora”, e non bisogna abusarne.
- Allineamento testo: viene consigliato di allineare **sempre a sinistra** (centro solo in casi specifici, spesso su mobile); il testo giustificato è detto “mai usato” salvo casi tipo magazine/design.
- Font consigliati “base”: Poppins, Montserrat, Roboto (menzionati come scelte semplici che funzionano per l’80% dei siti).
### Buona pratica di produzione: ordine e naming
- Usare la vista “struttura” per capire cosa è selezionato/nascosto (es. se un elemento sparisce perché è stato disattivato su desktop tramite impostazioni responsive).
- Rinominare gli elementi (contenitori/box) invece di lasciarli “Immagine e Titolo”: serve per orientarsi nei layout complessi e anche per lasciare un lavoro leggibile se il cliente dovrà mettere mano in futuro.
- Essere ordinati non rallenta: evita confusione e stress quando il progetto cresce di complessità.
### Cosa succede nella prossima lezione
Nella prossima lezione dichiarano che faranno il collegamento del dominio “operativo online” e poi inizieranno a insegnare più direttamente la parte di design applicato (con slide pratiche già preparate).

## 2. I Contenitori ed il loro funzionamento

La lezione spiega cosa sono i **contenitori** (container) e come funzionano “sotto” i page builder, usando CodePen per vedere HTML/CSS (e un accenno al JavaScript) in modo diretto e senza rischiare di rompere il sito.
L’obiettivo è farvi capire la logica dei blocchi/griglie e della responsive, così da sapere cosa state facendo anche quando lavorate con Elementor e, se serve, arrivare a usare codice custom.
### Strumento: CodePen e perché usarlo
CodePen viene presentato come un sito dove scrivere e testare codice HTML, CSS e JavaScript in tre pannelli separati.
Il JavaScript nel esempio resta vuoto perché, in questa lezione, non serve per animazioni complesse.
CodePen è consigliato come “ambiente di prova” per sperimentare codice (anche custom) senza “sporcare” o rischiare danni sul sito reale.
### Ruoli di HTML, CSS, JavaScript (metafora casa)
- HTML: è la struttura fisica/fondamenta della pagina (solida ma “brutta” da vedere).
- CSS: è l’abbellimento/rifinitura (colori, estetica, disposizione, “muri dipinti”, ecc.).
- JavaScript: serve per effetti/animazioni (esempio: contatore che parte da 0 e aumenta quando l’utente arriva a una sezione tramite un trigger).
### Animazioni: quando sì e quando no
Le animazioni possono essere “carine” (esempio counter che sale fino a 10 anni di esperienza), ma JavaScript può appesantire il sito e quindi va usato con parsimonia e nei punti giusti.
Dal punto di vista “vendita”, viene detto che in generale meno animazioni ci sono meglio è, perché ciò che fa acquistare è più spesso copy, impaginazione e struttura della pagina.
Le animazioni possono avere senso se l’obiettivo è diverso (es. concorsi/premi o “fare il figo”), ma non sono considerate il fattore decisivo per vendere.
### Esempio pratico: griglia e container
Nell’HTML viene mostrata una struttura base con header, sidebar, main, section, content e footer, costruita con div/classi (contenitori dentro contenitori) per far capire griglia e container.
Senza CSS si vede solo lo “scheletro” (sfondo bianco, testo piccolo nero), mentre con il CSS i box si colorano, si crea distanza (gap) e soprattutto cambia la disposizione degli elementi nella griglia.
Il concetto chiave è che il container principale viene trattato come una griglia: si definiscono colonne, righe e aree, e poi i singoli blocchi vengono assegnati a quelle aree.
### Proprietà viste (in modo operativo)
- Gap: distanza tra celle/box; viene mostrato che se lo riduci gli elementi si “attaccano”, se lo aumenti si distanziano.
- Margine (margin): spazio esterno tra la griglia (che sta dentro) e i bordi del browser; aumentando il margine la griglia si “stringe” verso il centro.
- Grid-template-columns: nell’esempio ci sono 3 colonne uguali usando 1fr, quindi i tre blocchi hanno la stessa larghezza.
- Grid-template-rows: vengono definite 4 righe con frazioni (1 + 2 + 2 + 1 = 6) che dividono l’altezza disponibile in 6 parti; la prima e l’ultima riga valgono 1/6, la seconda e la terza valgono 2/6 (quindi il doppio).
- Grid-template-areas: assegna nomi alle aree (es. header su tutta la prima riga; sidebar + main + main nella seconda; sidebar + section + content nella terza; footer su tutta l’ultima), come rappresentazione “a tabella” del layout.
### Responsive: cosa succede sotto i 768px
La responsive viene introdotta con una regola @media: “per schermi fino a 768px fai queste cose”.
Nell’esempio, il container passa da 3 colonne a 1 colonna e le righe diventano “auto” (altezza automatica), quindi la struttura si impila e diventa più simile all’ordine verticale dell’HTML.
Viene mostrato il passaggio “desktop → mobile” trascinando la dimensione della finestra: sotto la soglia, scatta il layout a una colonna; sopra, torna a tre colonne.
### Perché questa lezione “avanzata” (ma utile)
Anche usando un web builder, sotto c’è sempre codice e “in teoria” tutto è modificabile: se serve qualcosa che il builder non permette, con CSS (e a volte HTML/JS) si può intervenire.
Viene detto che, nella pratica, il CSS lo userete molto (spesso più dell’HTML custom), perché serve spesso per dettagli che i builder non gestiscono bene (colori/particolarità/animazioni “belle”).
La lezione chiude dicendo di fare molta pratica e che CodePen è gratuito (con anche piani a pagamento, ma dichiarando di non averne avuto bisogno).

## 3. Intelligenza Artificiale e Web Design

### 1. Cos'è l'Intelligenza Artificiale (AI) e gli LLM
L'intelligenza artificiale comprende varie tecnologie in grado di generare voce, video, foto e testo. Nello specifico, i modelli che generano testo sono chiamati **LLM (Large Language Model)**.
- **Esempi di LLM:** ChatGPT, Gemini, Claude, Perplexity.
- **Funzione principale:** L'LLM ha il solo compito di risolvere dei **task** (problemi assegnati). Quando riceve una domanda (es. "quanto fa 2+2"), utilizza un algoritmo per processare i dati passo dopo passo, in modo simile a un ragionamento umano semplificato, per fornire una risposta.
### 2. Come Funziona: Il "Next Token Prediction"
Il concetto chiave della lezione è che l'AI **non ragiona**, ma **predice**.
- **Next Token Prediction:** L'LLM calcola quale sia la parola (token) statisticamente più probabile da inserire dopo l'altra, basandosi sul contesto.
- **Database e Pesi:** L'AI possiede un database immenso di parole, ognuna con un "peso" specifico. Ad esempio, in una frase, la parola "casa" o "computer" avrà un peso diverso in base al contesto. L'algoritmo sceglie la parola successiva in base alla probabilità statistica, non alla comprensione del significato.
- **Non c'è comprensione:** L'AI non sa cos'è un "numero" o una "casa". Sa solo che, statisticamente, dopo "2 + 2 =", il token con la probabilità più alta è "4". È un **predittore di parole**, non un'entità pensante.
### 3. Fasi di Sviluppo dell'AI
Il ciclo di vita di un modello si divide principalmente in:
1. **Training (Allenamento):** Fase in cui vengono inseriti massicci volumi di dati (libri, internet) nel modello. È qui che l'AI acquisisce le informazioni grezze.
2. **Fine-tuning (Specializzazione):** I dati vengono raffinati per compiti specifici (es. giocare a scacchi, scrivere codice).
3. **Allineamento (Policy):** Le aziende (come OpenAI o Google) inseriscono filtri e regole etiche (es. non parlare di argomenti illegali, definire il tono di voce). Questo significa che l'utente non interagisce mai con il modello "puro" (*Raw*), ma sempre con una versione filtrata.
4. **Utilizzo:** La fase finale in cui l'utente interagisce con il modello. L'AI non impara da sola in tempo reale; per migliorare ha bisogno di nuovi allenamenti.
### 4. Limiti e Rischi
- **Allucinazioni:** Poiché l'AI cerca la risposta "probabile" e non necessariamente quella "vera", può generare informazioni verosimili ma false.
- **Bias e Censura:** Le risposte sono influenzate dai dati di training e dalle policy aziendali, quindi non sono mai neutre.
- **Fragilità:** Un modello può spiegare concetti complessi di fisica quantistica ma fallire nel contare le lettere di una parola (es. dire che "casa" ha 3 lettere), proprio perché non "vede" la parola ma la elabora come token.
- **Percezione dell'Efficienza:** Studi dimostrano che usare l'AI può dare la percezione di lavorare più velocemente, ma a volte rende il processo più lento (fino al 20-30% in meno di efficienza) a causa del tempo perso a iterare sui prompt per task semplici che si potrebbero fare a mano.
### 5. Applicazione Pratica nel Web Design
Per chi fa Web Design, l'AI è uno strumento potente se usato con criterio ("freddezza").
**Strumenti e Scelta del Modello:**
- **LLM Arena:** Un sito (Leaderboard) utile per vedere la classifica dei modelli più performanti divisi per categoria (es. *Coding* o *Web Dev*).
- **Consigli dello speaker:** Per la programmazione e il Web Design, lo speaker suggerisce di testare **Gemini** (ottimo per l'ecosistema Google e grandi contesti) e **Claude**. Anche **ChatGPT 5** è citato come top di gamma.
**Workflow per Elementor/HTML:**
1. **Generazione Codice:** Si può chiedere all'AI di creare blocchi specifici, ad esempio: *"Creami un blocco HTML con un mosaico di immagini"*.
2. **Prompt Engineering:**
	- È meglio scrivere i prompt in **inglese** per una maggiore accuratezza.
	- Specificare di volere il codice **"senza commenti"** per avere un output pulito.
3. **Integrazione:** Il codice generato (HTML/CSS) va copiato e incollato nel widget **HTML** di Elementor.
4. **Attenzione all'Output:** L'AI tende a "strafare" (es. aggiungere titoli o bottoni non richiesti) per sembrare più completa. È necessario controllare e pulire il codice.
### Conclusione e Mantra
La lezione si chiude con un concetto fondamentale da ricordare:
> **"Prediction is not reasoning" (La predizione non è ragionamento).**
L'AI va trattata come uno strumento freddo e statistico, non come un amico o un collaboratore umano. È utile per imparare e velocizzare blocchi di codice, ma non bisogna delegare interamente la costruzione di un sito (es. fare un sito intero a blocchi AI è sconsigliato per la manutenibilità).

## 4. Gestione e ottimizzazione delle foto e dei video

Questa lezione si concentra su come ottimizzare immagini e video per i siti web, spiegando quali formati usare, gli strumenti necessari e le best practice per mantenere un sito veloce senza compromettere la qualità visiva.
### Formati di Immagini per il Web
### JPEG (JPG)
- **Descrizione:** Il "re indiscusso" della fotografia digitale e il formato più utilizzato in ambito fotografico.
- **Quando usarlo:** Per tutte le immagini generali del sito (foto di prodotti, persone, ambienti).
- **Limitazione:** Non supporta la trasparenza dello sfondo.
- **Regola di peso:** Non superare i **200 kilobyte** per immagine.
### PNG
- **Quando usarlo:** Principalmente per **loghi**, **icone**, **tabelle** e **testi**.
- **Vantaggio:** Supporta lo sfondo trasparente e mantiene la nitidezza sui testi.
- **Best Practice:** Per immagini PNG con testo (es. tabelle create su Canva o Photoshop), è consigliato **disattivare il "lazy loading"** (caricamento ritardato), perché può sgranare il testo.
### GIF
- **Utilizzo:** Sconsigliato.
- **Motivo:** Il peso si triplica/quadrupla quando si comprimono con tool online. È meglio sostituirle con **video in loop (MP4)**, che pesano meno e offrono maggiore controllo sulla qualità.
### SVG
- **Descrizione:** Formato vettoriale scalabile, non basato su pixel.
- **Quando usarlo:** Per **icone**, **loghi**, **grafiche** (divisori, linee, infografiche piccole).
- **Vantaggio:** Scala all'infinito senza perdita di qualità, a differenza delle immagini pixel-based che si sgranano quando ingrandite.
- **Obbligo:** Da usare sempre per loghi e grafiche scalabili.
### WebP
- **Descrizione:** Formato moderno, ottimale compromesso tra qualità e dimensione.
- **Quando usarlo:** Per il **90-100% delle foto** sul sito.
- **Vantaggi:**
	- Compressione eccellente
	- Supporta lo sfondo trasparente (come PNG)
	- Qualità top
- **Compatibilità:** Supportato dai browser moderni; i browser più vecchi potrebbero avere problemi, ma è raro (il relatore non ha mai avuto problemi).
- **Consiglio:** Usare WebP come standard per tutte le immagini di base.
### Riepilogo Formato Immagini
<table header-row="true">
</table>
### Formati Video per il Web
### MP4
- **Standard:** Formato universale per video sul web.
- **Codec consigliati:** H.264 o H.265 (più moderno).
- **Peso massimo:**
	- **Hero Section** (sezione iniziale con video di sfondo): 3-5 MB massimo
	- **Altri video:** 1-2 MB
- **Due strategie di caricamento:**
	1. **Hosting esterno** (Vimeo, YouTube, Wistia): Il video viene caricato a pezzi mentre l'utente lo guarda, riducendo il carico iniziale.
	2. **Caricamento diretto sul web builder** (es. Elementor): Più semplice ma appesantisce la pagina.
### Wistia
- **Descrizione:** Piattaforma professionale per hosting video.
- **Quando usarlo:** Per **VSL (Video Sales Letter)** pesanti, video lunghi (20-30 minuti) o quando si hanno molti video da gestire.
- **Vantaggi:** Funzioni avanzate per gestione e embedding dei video.
- **Prezzi:** Esiste una versione gratuita; i piani a pagamento variano in base alle esigenze.
### Strumenti per Rimuovere Sfondi
### Remove.bg
- **Funzione:** Rimozione automatica dello sfondo dalle foto.
- **Limitazione:** Crediti giornalieri limitati (1 rimozione al giorno).
- **Suggerimento:** Usare email temporanee (temp mail) per ottenere più crediti.
### Photopea
- **Descrizione:** Photoshop online gratuito.
- **Vantaggi:**
	- Interfaccia identica a Photoshop
	- Supporta quasi tutti i formati (PSD, AI, XD, Figma, PDF, ecc.)
	- Lingua italiana disponibile
	- Tutti gli strumenti base (livelli, cronologia, bacchetta magica, crop, ecc.)
- **Quando usarlo:** Alternativa gratuita a Photoshop per editing rapido e rimozione sfondi.
- **Consiglio del relatore:** Molto utile per velocità; basta aprire una nuova tab, caricare l'immagine, modificarla ed esportarla.
### Freepik
- **Funzioni:**
	- Rimozione sfondi
	- Immagini stock
	- Generazione immagini AI
	- Manipolazione immagini
- **Vantaggi:** Suite completa in un unico tool.
- **Qualità rimozione sfondo:** La migliore tra i tool online secondo il relatore (8-9/10).
- **Prezzi:** Piani da 8€, 16€, 36€ al mese.
### Google Gemini (Imagen 2 / Banana)
- **Accesso:** Google AI Studio (Deep Mind).
- **Versione:** Gemini 2.0 Pro (al momento del video).
- **Funzioni:**
	- Generazione immagini
	- Manipolazione immagini (molto forte)
	- Rimozione sfondi
- **Contesto:** Finestra fino a 1 milione di token.
- **Costo:** Gratuito con account aziendale Google; limiti giornalieri dopo circa 8-16 ore di uso intensivo.
- **Trucco extra:** Utile per caricare screenshot di tool (es. Photopea) e chiedere all'AI come eseguire specifiche operazioni.
### Strumenti per Compressione e Ottimizzazione
### Squoosh (Consigliato principale)
- **Descrizione:** Tool gratuito di GitHub, uno dei più potenti per ottimizzare immagini.
- **Come funziona:**
	1. Carica l'immagine
	2. Vedi un confronto **prima/dopo** con slider
	3. Scegli il formato di output (es. WebP)
	4. Regola il **resize** (ridimensionamento) e la **qualità**
- **Workflow consigliato dal relatore:**
	1. Selezionare formato **WebP**
	2. Ridurre dimensioni al **50%**, poi **33%** o **25%** se necessario
	3. **Priorità:** È meglio ridurre le dimensioni (resize) che abbassare la qualità
	4. Qualità: Partire da 70%, scendere fino a 60% o 0% per testare la differenza visiva
	5. **Target peso finale:** 100-200 KB (150-200 KB accettabile)
- **Perché ridimensionare prima di comprimere:** Le immagini troppo grandi non sono necessarie sul web; meglio immagini più piccole che immagini sgranate.
- **Advanced Settings:** Disponibili ma non necessarie per uso base.
### CloudConvert e altri tool online
- **Funzione:** Conversione formato immagini.
- **Limiti:** Generalmente 10 file gratuiti al giorno per account.
- **Consiglio:** Creare più account o usare Squoosh per maggiore controllo.
### Compressori video (MP4)
- **Come trovare:** Cercare "MP4 compressor" su Google per una lista di tool gratuiti.
- **Codec raccomandati:** H.264 o H.265.
- **Limitazioni tool gratuiti:** Dimensione massima file varia (1 GB, 2 GB, 10 GB a seconda del tool).
- **Alternativa per file grossi:** Usare **Wistia** per hosting esterno.
### Best Practice Finali
### Regole di Peso
- **Foto:** Massimo 100-200 KB ciascuna.
- **Video Hero Section:** 3-5 MB massimo.
- **Altri video:** 1-2 MB.
- **Attenzione:** Non caricare immagini da 2-3 MB ciascuna. Su un sito con 10 immagini, si arriva facilmente a 30 MB di peso totale, rallentando drasticamente il caricamento.
### Priorità nell'Ottimizzazione
1. **Ridimensionare** (resize) prima di abbassare la qualità
2. **Verificare visivamente** la differenza con lo slider prima/dopo
3. **Testare** con occhio critico: se alla dimensione reale non si vede differenza, il file è ottimizzato
### Verifica Finale: Google PageSpeed Insights
- **Quando usarlo:** A fine progetto, prima della consegna al cliente.
- **Funzione:** Analizza la velocità di caricamento e fornisce suggerimenti di ottimizzazione.
- **Come funziona:**
	- Inserire l'URL del sito
	- Ricevi 2 report: **mobile** e **desktop**
	- Ottieni punteggi per: prestazioni, accessibilità, best practice, SEO
- **Cosa controllare:**
	- **Peso delle immagini** e possibilità di riduzione
	- **Font personalizzati** (rallentano il caricamento; i font Google sono più veloci)
	- **Lazy loading delle immagini** (caricamento ritardato)
- **Limiti:** Alcuni errori (es. JavaScript, CSS del web builder/tema) non sono modificabili dall'utente.
- **Obiettivo:** Ottimizzare ciò che è sotto il proprio controllo (immagini, video, font).
### Consiglio Finale del Relatore
- **Sperimentare:** Provare tutti i tool, testare formati e pesi diversi.
- **Workflow pratico:** Utilizzare 3-4 tool principali (Squoosh, Photopea, Freepik, Gemini) e integrarli nel flusso di lavoro quotidiano.
- **Validazione:** Controllare sempre il peso finale delle immagini e la velocità del sito con PageSpeed Insights.

## 5. Lezione pratica sulla creazione di un sito - Parte 1

Questa lezione è una “pilot” pratica: costruisci una Hero/landing in Elementor per applicare i concetti visti, capendo davvero struttura, blocchi e flusso di lavoro.
L’obiettivo è farti vedere come si lavora da foglio bianco (prove, iterazioni, preview continua), non “fare il sito perfetto al primo colpo”.
### Obiettivo e impostazione
Si parte creando un sito/template di prova per unire i concetti e prendere confidenza con la struttura di Elementor.
La prima azione operativa è aggiungere un nuovo **flexbox** con due colonne e impostare un’altezza minima (esempio: 850) per avere una Hero “bella grande”.
Footer e parti successive vengono rimandate: qui ci si concentra sulla sezione iniziale (Hero).
### Hero: struttura e contenuti
Dopo aver creato le due colonne, si centra il contenuto nel contenitore per avere i box allineati/centrati correttamente.
Consiglio pratico: usa la vista “struttura” per avere sempre sott’occhio i contenitori, soprattutto quando aumentano blocchi, immagini e testi.
Nella Hero inserisci: un’immagine (trascinata nel contenitore) + un titolo grande + un paragrafo/headline che spiega e rafforza la proposta (deve essere “pungente” e catturare subito).
### Sfondo: video, media e overlay
Per lo sfondo del contenitore principale, in “Stile \\> Sfondo” hai opzioni come classico (colore/immagine), gradiente, video o slideshow; il consiglio è restare di solito su classico o video.
Se vuoi un effetto “gradiente”, spesso è preferibile costruire un’immagine background su misura (es. in Photoshop/“ofia”) con effetti tipo glow/luci e poi usarla come sfondo, perché dà più controllo.
Per mettere un video di sfondo devi avere un **link**: carichi il video nei Media di WordPress (Libreria), apri l’elemento, copi l’URL e lo incolli nello sfondo video del contenitore (inserimento immediato).
Nota su gestione: i media caricati non “si vedono” finché non li colleghi a un blocco, ma occupano storage; quindi non usare lo spazio disco come scusa per caricare di tutto, mantieni il sito snello (meno plugin e meno media inutili = più velocità).
Per rendere il video più leggibile dietro al testo puoi usare una sovrapposizione: ad esempio overlay in gradiente, scegli un colore acceso + un secondo colore (es. nero), alzi l’opacità finché lo sfondo si vede poco, poi provi “radiale” e posizione finché trovi un risultato convincente.
### Tipografia, colori e SEO (H1/H2) + micro-coding
Per i colori: evita in generale scelte troppo aggressive; il relatore consiglia un bianco “soft” tipo F5F5F5 al posto del bianco pieno, perché affatica meno l’occhio (specialmente in condizioni di luce basse).
Per la tipografia devi fare prove: esempio, 28 px è troppo piccolo per un titolo/leader, 65 px è più “arrogante” e impattante; poi regoli line-height (esempio 60) e lasci letter-spacing/word-spacing di solito stock (estremi troppo distanziati o troppo attaccati “non esistono”).
Allineamento: sinistra è la scelta che “non sbagli mai”, centro va usato con occhio, giustificato viene sconsigliato (“non si utilizzerà mai”).
SEO e gerarchia: imposta le cose davvero importanti in H1, poi scala in H2/H3 e paragrafi per i dettagli (macro → micro), così differenzi beneficio principale e benefici secondari.
Differenza editor: nei titoli spesso non hai gli stessi controlli rapidi del paragrafo, quindi per mettere in grassetto solo una parte del titolo puoi usare HTML con i tag `<b>...</b>` (parentesi angolari “minore/maggiore”), mentre nel paragrafo puoi selezionare testo e cliccare grassetto direttamente.
### Workflow pratico di lavoro (preview) e nota su contenuti/cliente
Abitudine operativa: lavora con due schede, una con l’editor live e una con la preview; pubblica/salva dall’editor, poi aggiorna la preview (se non salvi, in preview non cambia nulla).
Aspetto mentale: è normale non avere l’idea subito quando parti da zero; devi provare, fare tentativi e, se serve, cercare ispirazione (es. Dribbble), perché alcune sezioni escono in 5 minuti e altre richiedono 15–20 minuti di “blocco” prima che arrivi l’idea.
Contenuti e cliente: foto e video fanno gran parte del risultato (il relatore cita che incidono “l’80%”), quindi spingi il cliente verso materiale buono (meglio uno shooting/video fatti bene che foto/video “WhatsApp” mossi), perché l’impatto sul sito e sui risultati è enorme.

## 6. Lezione pratica sulla creazione di un sito - Parte 2

Per creare un sito professionale, evita la staticità: non allineare tutto da un solo lato. Alterna i blocchi (immagine a sinistra/testo a destra, poi viceversa o al centro) per creare dinamicità, prendendo spunto da big player come Apple o Airbnb.
Se devi inserire più elementi, usa le griglie o i container interni per gestire colonne multiple (es. due immagini affiancate sotto un testo). Controlla sempre la struttura (Navigator) per assicurarti che i blocchi siano nei container corretti.
### Gestione Immagini e Contenuti
- **Immagini Stock vs Reali:** Per attività locali (es. pasticcerie), è vietato usare foto stock generiche; servono foto vere dei prodotti e del titolare per trasmettere passione. Per servizi astratti (es. banche, fintech come Revolut), le immagini stock o grafiche pulite funzionano meglio perché l'utente cerca dati e affidabilità, non volti.
- **Dimensionamento:** Non lasciare le immagini al 100% se sono troppo grandi. Usa la larghezza in percentuale (es. 65% o 25% per icone) e centra il contenuto per dare “respiro” al design.
- **Peso:** Vietato caricare immagini o file (non video) sopra i 200 KB per non appesantire il sito.
### Tipografia e Codice "Micro"
Spesso l'editor visuale ha limiti. Per formattare testi specifici (es. titoli o parti di paragrafo):
- Usa i tag HTML `<br>` per andare a capo forzatamente e bilanciare la lunghezza delle righe (evita una riga lunghissima e una cortissima).
- Usa `<b>testo</b>` (o `<strong>`) per grassettare solo specifiche parole chiave all'interno di un blocco di testo, rendendo il messaggio più leggibile e scansionabile.
	Per i colori, usa i codici Hex (es. `#000000` per nero, `#636363` per un grigio soft) per mantenere coerenza visiva.
### Margini Negativi e Spaziatura
Una tecnica avanzata mostrata è l'uso dei **margini negativi** (es. -70px o -140px) per sovrapporre elementi o avvicinare blocchi che risultano troppo distanti a causa della struttura a colonne.
- **Attenzione:** Quando usi margini negativi, controlla sempre il risultato su Tablet e Mobile, perché spesso il layout si rompe o si sovrappone in modo errato e va corretto specificamente per ogni device.
- **Padding:** Usa il padding (es. 10px o 20px sotto) per dare aria ai testi e non farli sembrare "soffocati".
### Risoluzione Problemi (Workflow)
- **Ctrl+Z e Cronologia:** Se il comando "Annulla" (Ctrl+Z) non funziona, usa l'icona "Cronologia" di Elementor per ripristinare versioni precedenti.
- **Boxed vs Larghezza Piena:** Se il layout sembra "schiacciato" o non si allinea ai bordi, verifica le impostazioni del Contenitore: passa da "Boxed" a "Larghezza Piena" (Full Width) per espandere il contenuto, mantenendo però un controllo sull'altezza minima.
- **Salvataggio:** Lavora sempre su due schede (Editor e Preview) e ricorda che se non clicchi "Aggiorna/Pubblica", la preview non mostrerà le modifiche.

## 7. Utilizzo dei Font nel Web Design

Il font non deve essere necessariamente "bello" o scenico, ma prima di tutto **funzionale e leggibile**. L'obiettivo del web design è portare risultati (soldi in tasca), non sorprendere con ghirigori illeggibili.
Il font va scelto in base al **tipo di business**, non alle preferenze personali. Esiste un'aspettativa inconscia nell'utente: un sito tech ha font diversi da un parrucchiere o da un ristorante di lusso.
### Categorie di Font e Psicologia
Ecco le principali famiglie di font e il loro utilizzo strategico:
- **Serif (Grazie):** Comunica eleganza, tradizione, fiducia (*trust*). Ideale per brand di lusso, hotel 5 stelle, notai o moda (es. Dior, Gucci). Attenzione: può risultare pesante per attività locali semplici o economiche.
- **Sans Serif (Senza grazie):** Moderno, pulito, minimal, leggibile. È lo standard di mercato, perfetto per startup, tech, SaaS e siti aziendali generici. Accompagna l'occhio nella lettura senza stancarlo.
- **Script (Corsivo):** Molto situazionale, da usare con estrema parsimonia (mai per un sito intero). Utile per enfatizzare singole parole o brevi frasi in contesti eleganti (es. ristoranti stellati, matrimoni).
- **Slab Serif:** Versatile, solido, confidente. Usato spesso in ambito business o tech "massiccio".
- **Display:** Font "brutali" e unici, molto usati nel settore **Food** (es. smash burger, street food) o da agenzie creative che vogliono rompere gli schemi. Sconsigliato per info-business o consulenze serie.
### Font Consigliati e "Must Have"
Lo speaker suggerisce di crearsi una lista di 3-4 font affidabili da usare nel 90% dei casi.
- **Titoli (Heading):** *Playfair Display* (lusso/eleganza), *Montserrat* (versatile, un classico), *Poppins*, *Lora*.
- **Paragrafi (Body):** *Roboto* (il "coltellino svizzero", va bene ovunque), *Open Sans*, *Lato*, *Work Sans*.
- **Combo Vincenti:**
	- *Playfair Display* (Titolo) + *Roboto* o *Open Sans* (Paragrafo) → Lusso accessibile.
	- *Montserrat* (Titolo) + *Roboto* (Paragrafo) → Business moderno.
	- *Noto Serif* + *Noto Sans* → Famiglia progettata per lavorare insieme.
	- *Monotono:* Usare lo stesso font (es. Montserrat) sia per titoli che per testi, giocando con i pesi (grassetto vs light), funziona benissimo se il design è pulito.
### Strumenti e Siti per la Ricerca
Non serve cercare font per ogni singolo progetto; meglio fare una ricerca approfondita ogni 4-6 mesi e crearsi un archivio.
1. **Google Fonts:** La risorsa n.1. Sono gratuiti, già integrati nella maggior parte dei web builder (Elementor) e ottimizzati per la velocità di caricamento.
2. **DaFont:** Archivio immenso (90k+ font), utile per trovare ispirazione, ma occhio alle licenze.
3. **FontInUse:** Mostra i font applicati in contesti reali, ottimo per capire l'effetto finale.
4. **MyFonts / Adobe Fonts:** Risorse professionali, spesso a pagamento.
5. **Estensione Chrome:** *WhatFont* (o simili) permette di passare il mouse su un testo web e scoprire istantaneamente font, dimensione e colore. Fondamentale per "rubare" idee ai competitor.
6. **ChatGPT:** Utile per trovare alternative gratuite a font a pagamento (es. "Dammi un font Google simile a...").
### Consiglio Finale
La chiave è legare sempre il font al **business**. Se lavori per un parrucchiere di paese, non usare un Serif pesante da hotel di lusso; se fai uno smash burger, usa un Display "ignorante" e non un font da studio legale. La coerenza porta conversione.

## 8. Utilizzo dei Colori nel Web Design

La scelta dei colori non deve basarsi sul gusto personale ("mi piace il verde"), ma deve essere **legata al business**. Ogni colore ha un'associazione mentale specifica con determinati settori.
- **Regola del 3:** Evita di usare 5-6 colori. L'ideale è limitarsi a **3 colori** principali per mantenere equilibrio .
- **Equilibrio:** Non usare colori saturi e "sparati" ovunque. Se usi colori vividi, bilanciali; non fare un sito con sfondo bianco e titoli rossi accesi con effetti glow pesanti, a meno che non sia una scelta stilistica precisa e controllata .
### Strumenti per Trovare e Gestire i Colori
### 1. Coolors (Generatore)
- **Funzionamento:** Ti propone palette di 5 colori. Premendo la **barra spaziatrice**, genera nuove combinazioni infinite.
- **Metodo:** Inserisci un colore di base che hai già scelto (es. nero `#333333`), bloccalo con il lucchetto e continua a premere spazio finché il tool non ti suggerisce colori che si abbinano bene cromaticamente. Rimuovi quelli che non ti servono fino a restare con i 2-3 colori definitivi .
### 2. Adobe Color (Esplorazione)
- **Funzionamento:** Simile a Coolors, ma ottimo per la funzione **"Esplora"**.
- **Utilizzo:** Se hai zero idee, puoi cercare palette già pronte o vedere cosa usano altri designer. Copi direttamente i codici esadecimali (HEX) e li incolli nel tuo progetto .
### 3. ColorZilla (Color Picker)
- **Cos'è:** Un'estensione per il browser (Chrome/Firefox) che aggiunge un "pennino" alla barra degli strumenti.
- **Utilità:** Ti permette di "rubare" (prendere in prestito) i colori da qualsiasi sito web. Clicchi sul punto della pagina che ti interessa e lui copia automaticamente il codice colore negli appunti (clipboard) e lo salva nello storico .
### Psicologia del Colore Applicata al Business
Ecco come associare i colori ai settori di mercato secondo la lezione:
- **Oro (Gold):** Lusso, raffinatezza. Usato dai big player (moda, auto di lusso) per bordi, divisori e dettagli. Comunica pregio .
- **Nero:** Il "King" per il tech, prodotti SaaS, Crypto (spesso associato a mistero/potere in quel contesto) e palestre/personal trainer. Va saputo usare, ma è molto potente .
- **Marrone/Cuoio:** Manifattura artigianale, pelletteria (cinture, portafogli). Deve richiamare la materia prima .
- **Rosso:** Amore, passione, warning. Adatto per siti di incontri, lune di miele o per target giovani in contesti "forti" (es. "una notte indimenticabile") .
- **Verde:** Eventi all'aperto, feste per bambini, parchi avventura. Se è un agriturismo di lusso, però, meglio virare su toni più pregiati (es. oro/verde scuro) .
- **Viola (Purple):** Web app, tech, piattaforme di pagamento (es. Stripe) .
- **Argento (Silver):** Industria meccanica, manufatturiero tecnico .
- **Bianco:** Va bene sempre e ovunque, purché si spezzi la monotonia con sezioni colorate o immagini .
### Consiglio Operativo
Non serve studiare teorie infinite. Guarda i siti dei leader di settore ("Big Player") e quelli delle attività locali vicino a te: analizza quali colori usano e come li usano. Usa il color picker per campionarli e prova a creare le tue palette su Coolors .

## 9. Come farsi ispirare da altri siti web

L'obiettivo di un web designer non è vincere premi ("coccarde", "quadretti") o fare siti da 10/10 che richiedono mesi di lavoro e team enormi. L'obiettivo è creare siti da **6 o 7 su 10**, ma **funzionali**, ben impaginati e che convertano (vendano), permettendo di guadagnare 5-6k al mese. Un sito "over-dettagliato" spesso è lento e converte meno di uno semplice ma fatto bene .
Non bisogna paragonarsi ai "giganti" (es. sito Apple): quei siti sono fatti da team di programmatori full-stack con database custom e budget infiniti, non da un singolo con Elementor .
### Strumenti per l'Ispirazione
### 1. Dribbble
- **Cos'è:** Una piattaforma "soft" dove i designer caricano i loro lavori (concept, app, siti).
- **Come usarlo:**
	- Cercare sempre in **inglese** (es. "food landing page" invece di "sito paninoteca") per avere più risultati .
	- Filtrare per la categoria **"Web Design"** per evitare di vedere loghi o app che non interessano .
	- Analizzare i dettagli replicabili: impaginazione dei blocchi, uso dei colori (es. testo storto evidenziato in giallo), font, bordi (radius), e sovrapposizioni (Z-index) .
- **Vantaggio:** Offre design molto curati ("fatti da Dio") da cui rubare idee visive, anche se il copy o la struttura marketing potrebbero non essere perfetti .
### 2. Awwwards (con 3 w)
- **Cos'è:** Un sito di contest dove i siti vengono votati e premiati. È più competitivo rispetto a Dribbble.
- **Come usarlo:**
	- Andare su **"Explore"** e filtrare per categoria (e-commerce, fashion, agency) .
	- Guardare la sezione **"Winners"** o **"Trending"** per vedere cosa va di moda.
- **Avvertenza:** Molti siti su Awwwards sono estremamente complessi (animazioni pesanti, 3D), difficili da replicare da soli all'inizio. Usali per guardare ("lustrarsi gli occhi") ma rimani pragmatico su ciò che puoi effettivamente vendere e realizzare .
### Consiglio Operativo
Quando sei in un momento di "down cronico" o blocco creativo:
1. Apri Dribbble o Awwwards.
2. Cerca la nicchia del cliente (es. Food, Real Estate).
3. Studia **come** hanno risolto problemi di design (es. come hanno impaginato il menù, che font usano per il lusso, come gestiscono le immagini).
4. Non copiare tutto (spesso sono concept irrealizzabili), ma prendi ispirazione per singole sezioni o stili .

## 10. BeTheme e Importazione di Template

BeTheme è un tema WordPress estremamente versatile (costa circa 60\\$) che offre oltre 700-800 siti pre-costruiti (*pre-built websites*) per ogni nicchia (medico, e-commerce, fitness, ecc.).
- **Vantaggio:** Velocizza enormemente il workflow iniziale, offrendo un setup pronto all'uso con un click.
- **Compatibilità:** Supporta sia il suo builder proprietario ("BeBuilder") sia **Elementor** (consigliato l'uso di Elementor Pro se possibile) .
### Installazione Corretta (Parent/Child Theme)
Quando scarichi il tema, troverai un file ZIP che contiene due file principali:
1. **BeTheme (Parent):** Contiene il core, il codice sorgente e l'infrastruttura. Va caricato per primo ma **non va mai modificato direttamente**.
2. **BeTheme Child:** È una "tela bianca" che eredita le funzioni del padre ma permette modifiche (CSS, funzioni custom) senza rompere il sito agli aggiornamenti.
	**Procedura:** Carica il Parent Theme -\\> Carica il Child Theme -\\> Attiva il **Child Theme** come tema principale .
### Importazione dei Template
Dal pannello di controllo del tema (`BeTheme > Websites`), puoi scegliere tra centinaia di demo.
1. **Scelta:** Non guardare le immagini (es. computer vs cibo), ma la **struttura dei blocchi**. Un sito di riparazione PC può diventare un sito per un ristorante cambiando foto e testi.
2. **Importazione:** Puoi scegliere di importare "Complete Website" (tutto: immagini, video, slider) o solo i dati selezionati. Consigliato importare tutto ("Complete Website") e poi cancellare quello che non serve.
3. **Reset:** Se stai lavorando su un'installazione sporca, c'è un'opzione per resettare il database prima dell'importazione (cancella post e pagine precedenti) .
### Modifica e Personalizzazione
Mai consegnare un sito "copia-incolla". È poco professionale e rischioso (il cliente potrebbe vedere un competitor con lo stesso identico sito).
- **BeBuilder vs Elementor:** L'interfaccia di BeBuilder è simile a Elementor: ha la struttura ad albero (Sezione \\> Wrap \\> Elemento). Usa quello con cui sei più comodo.
- **Dynamic Tag:** Puoi usare tag dinamici come `{name}` per personalizzare i messaggi (es. "Ciao Davide").
- **Footer:** Spesso nei temi c'è la scritta "Powered by WordPress". Clicca sull'icona della matita nella zona footer per rimuoverla o modificarla.
- **Pagine Obbligatorie:** Anche se importi una landing page, ricorda di creare sempre le pagine legali (Privacy, Cookie, Termini), "Chi Siamo" e "Contattaci" .
### Etica e Costi
Il costo del tema (60\\$) va scaricato sul cliente (incluso nel preventivo o fatturato a parte). Sii trasparente o fallo passare come un omaggio incluso nel pacchetto da 2000€ .

## 11. Importare Temi in Elementor

Ecco una sintesi operativa della lezione sull'importazione di temi in Elementor, basata esclusivamente sulla trascrizione fornita.
### Cos'è e Quando Usarlo
Elementor offre una libreria di **template pre-costruiti** (sezioni già pronte con layout, blocchi e immagini stock) che puoi importare con un click. Non sono siti completi, ma **elementi e blocchi già assemblati** che velocizzano il lavoro iniziale e aiutano a superare il blocco della "pagina bianca" quando non si ha un'idea chiara di cosa creare.
**Importante:** Questo strumento va usato **solo come punto di partenza**, mai come consegna finale. È uno strumento per prendere ispirazione, studiare la disposizione dei blocchi e velocizzare il workflow, non per fare copia-incolla.
### Come Importare i Template
1. **Accesso:** Vai su `Elementor > Template > Website Template` nel pannello WordPress.
2. **Scelta:** Sfoglia la libreria e cerca un template che abbia una **struttura simile** al progetto che devi creare (es. palestra, e-commerce, blog). Non importa se le immagini o i colori non corrispondono: l'importante è la disposizione dei blocchi.
3. **Anteprima:** Controlla sia la versione desktop che mobile per vedere se il layout ti convince.
4. **Importazione:** Clicca su "Applica" (devi essere loggato con un account Elementor valido e avere la licenza attiva).
5. **Risultato:** Il template viene importato come pagina WordPress con tutti i blocchi, immagini e testi precompilati.
### Personalizzazione Obbligatoria
Non consegnare mai il sito così com'è importato. Ecco cosa modificare sempre:
- **Immagini Stock:** Le foto precaricate sono accessibili a migliaia di utenti. Sostituiscile con immagini trovate su siti gratuiti come **Pexels**, **Freepik** o altri archivi di stock photo free. Evita Shutterstock o Adobe Stock se non vuoi pagare licenze.
- **Colori e Font:** Adatta la palette al settore del cliente (es. marrone/cuoio per pelletteria, nero/rosso per palestre).
- **Testi e Copy:** Riscrivi tutto in base al messaggio del cliente.
- **Struttura:** Rimuovi, aggiungi o riordina le sezioni in base alle esigenze specifiche del progetto.
### Filosofia d'Uso
Lo speaker sottolinea che anche lui usa questi template, ma alla fine cambia sempre il **90% del contenuto**, rendendo il sito irriconoscibile rispetto all'originale. L'importazione serve solo per avere una base da cui partire, non per evitare di imparare a costruire da zero. Chi si limita al "clic clic" senza personalizzare non cresce professionalmente e consegna lavori già visti da altri 100.000 designer.
### Licenza e Accesso
Per utilizzare i template di Elementor devi avere un **account attivo** con licenza valida (Elementor Pro). Senza la chiave di licenza collegata, la funzione di importazione non sarà disponibile.

## 12. Il Glossario del Web Design

È stato creato un **glossario PDF** di circa 11 pagine con le 100 parole principali del settore (nomenclature in italiano e inglese). Questo documento copre il 95% dei termini che incontrerai nel corso e nel lavoro futuro. Lo trovi scaricabile sotto la lezione.
- **Scopo:** Tenerlo a fianco durante lo studio o il lavoro. Se incontri un termine sconosciuto, stoppa il video e cerca il significato.
- **Formato:** È un file scaricabile che puoi stampare o copiare su un tuo documento per modificarne la formattazione (es. ingrandire il font).
### Categorie del Glossario
Il glossario è diviso in macro-aree tematiche per facilitare la consultazione:
1. **Fondamenti del Web:** Termini base come `www`, `browser`, `web page`.
2. **Struttura e Componenti del Sito:** `Header`, `Footer`, `Layout`, `Hyperlink`, `Landing Page`, `Headline`. Questi sono termini "incollati" al web design puro.
3. **Grafica e Identità Visiva:** Font, colori, CTA (Call to Action).
4. **UX e UI:** Esperienza utente e interfaccia.
5. **Accessibilità, Sviluppo e Linguaggi:** HTML, CSS, ecc.
6. **Hosting, Domini e Infrastruttura:** Dove risiede il sito.
7. **SEO e Analisi:** Posizionamento sui motori di ricerca.
8. **Marketing Digitale e Conversione:** Termini come `Lead Generation`, `Email Marketing`, `Copy`.
### Perché Imparare la Terminologia?
- **Interconnessione:** Il web design è l'apice del funnel (dove atterra il traffico da Ads, social, email). Anche se alcune aree come l'Email Marketing sembrano separate, sono complementari. Devi sapere cos'è la "Lead Generation" o il "Copy" per lavorare efficacemente.
- **Credibilità:** Usare i termini corretti (es. "CTA" invece di "pulsante") ti fa apparire competente agli occhi dei clienti e delle agenzie con cui collabori.
- **Autonomia:** La lingua del settore è l'inglese. Conoscere termini come `Button`, `Layout` o `CTA` ti permette di capire tutorial su YouTube, forum e guide internazionali che altrimenti sarebbero incomprensibili.
### Consiglio Operativo
Non imparare a memoria il glossario. Stampalo o tienilo aperto mentre studi. Man mano che incontrerai i termini nel corso o nei tutorial (es. "Cos'è la CTA?"), consultalo. Con la pratica, queste parole entreranno naturalmente nel tuo vocabolario tecnico.

## 13. Impostare PopUp e Pulsanti

Impostare un PopUp collegato a un pulsante serve soprattutto quando vuoi tenere la landing **pulita** (solo CTA) e mostrare il form solo al click, oppure usare il pop-up per offerte/azioni specifiche.
### Quando usare un PopUp
Il caso tipico è: non metti il form visibile nella landing, ma lo fai comparire quando l’utente preme un tasto (CTA).
Non è “la cosa che fa la differenza” in assoluto, ma migliora ordine, pulizia e può avere senso in una strategia marketing (es. mostrare offerte esclusive a utenti che hanno fatto certe azioni).
### Sandbox per test rapidi
Viene mostrata un’alternativa rapida a TasteWP: un sandbox che crea un sito demo con “Next” e ti genera credenziali + link.
Differenza principale: TasteWP dura 7 giorni se registrato (o 2 giorni senza), mentre questo sandbox dura circa 8–9 ore, utile per test veloci (tema/plugin compatibilità) e come backup se l’altro servizio non fosse disponibile.
### Creare il PopUp (Elementor)
Percorso: **Elementor → Template → PopUp**.
1. “Aggiungi nuovo” e scegli modello **PopUp**, poi assegna un nome (es. “Form Home”).
2. Scegli un template già pronto per andare veloce.
3. Linea guida: evita di creare mille pop-up diversi a caso; mantieni coerenza (stesso stile e stessa logica di reindirizzamento almeno dentro la stessa pagina).
4. Il 99% dei pop-up che userai sarà un form dati con: nome, cognome, email, telefono, checkbox privacy, tasto invio.
	Nota: puoi aggiungere altri campi (testo, telefono, campi liberi; viene citata anche la possibilità di caricare documenti/foto).
### Pubblicazione: condizioni e trigger
Dopo “Pubblica”, Elementor ti fa impostare:
- **Conditions** (dove appare): esempio mostrato “su tutto il sito”.
- **Triggers** (quando appare): dopo X secondi dal caricamento, a una certa % di scroll, quando si arriva a un elemento, al click/numero di click, dopo inattività, ecc.
	Per la lezione si usa il caso classico: pop-up che si apre dal **pulsante**, quindi si lascia il resto “pulito” e si va avanti con Next/Save.
### Collegare il PopUp al Pulsante
1. Vai su **Pagine** e apri una pagina (es. Home) con “Modifica con Elementor”.
2. Inserisci un **Pulsante** e imposta il testo (es. “Prenota ora”).
3. Nel campo **Link** del pulsante: usa **Tag dinamici → PopUp**, poi clicca l’ingranaggio e seleziona il pop-up creato (es. “Form Home”).
4. Scegli l’azione: **Open PopUp** (ci sono anche Close e Toggle, ma qui serve l’apertura).
5. Pubblica e prova in pagina: al click si apre il pop-up.
	Nota pratica: per capire se un elemento è davvero cliccabile, osserva il comportamento del cursore/effetto link; Elementor spesso associa un link a un “#” (hashtag) e il link può anche influire su formattazioni globali dei link.
### Dove finiscono i dati e “After Submit”
Dopo l’invio, le submission si vedono in **Elementor → Submissions** (nome, telefono, email, form usato, pagina, ecc.).
Punto chiave di configurazione: nel form, controlla **Actions After Submit** (cosa succede dopo l’invio).
Esempi citati: collezionare il contatto e inviare un’email; redirect a una **thank you page**; integrazioni/automazioni (GetResponse, ActiveCampaign, Mailchimp), webhook, collegamenti con Zapier o Make per mandare dati su Google Sheet, notifiche email, aggiunta appuntamento a calendario/Google Calendar.
Questo è il setup base che userai nel 90% dei casi: pop-up + pulsante + form + raccolta dati + azione post-invio configurata correttamente.

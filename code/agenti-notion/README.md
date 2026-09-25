# Agenti di Notion — cosa fanno, quando partono, cosa possono toccare

Creati la notte fra il 24 e il 25/09/2026, scelti da Emanuele da una lista di dodici: «agente 5 mi piace,
4 mi piace, 3 mi piace, 6 anche». Stanno su Notion, nella sezione *Agenti* della barra laterale, sotto
*Chat*. Le istruzioni vere stanno qui, un file per agente: su Notion ognuno ha la sua pagina *Istruzioni*,
che è una copia. Se le due versioni non coincidono vale il file, come per le procedure.

## La regola che vale per tutti

**Preparano, non mandano.** Scrivono solo dentro Notion — un commento che menziona Emanuele, i campi di
una riga — e un messaggio a un cliente resta una bozza finché non lo manda lui. Non cambiano stati, fasi,
importi o date. È scritto in fondo alle istruzioni di ognuno, insieme alle regole di «Come non si scrive
mai» del `CLAUDE.md` di radice.

## I quattro

| Agente | Quando parte | Cosa fa | Può toccare | Tetto al mese |
|---|---|---|---|---|
| **Lead nuovo** | un contatto entra in *Contatti e lead* con Stato «Nuovo», o lo Stato diventa «Nuovo» | cerca l'attività sul web, collega o crea l'azienda, commenta con chi è, cosa ha trovato, il problema probabile e il primo messaggio | modifica *Contatti e lead* e *Aziende*, web | 100 crediti |
| **Dopo la riunione** | finisce il riassunto di una nota di riunione registrata **dentro una pagina di *Riunioni*** | compila quella stessa pagina: con chi, lavoro, dove, cosa è uscito, cosa ne segue; commenta la trattativa | modifica *Riunioni*, legge *Contatti e lead*, commenta *Trattative* | 60 |
| **Referral e recensione** | la *Fase lavoro* di una trattativa diventa «Sviluppo» o «Consegna» | a Sviluppo la bozza che chiede un nome, a Consegna quella che chiede la testimonianza | commenta *Trattative*, legge *Contatti e lead* | 30 |
| **Aggiornamento del venerdì** | ogni venerdì alle 15:00 | per ogni lavoro in Onboarding, Sviluppo o Consegna, la bozza del messaggio della settimana | commenta *Trattative*, legge *Riunioni* | 60 |

Il piano Business dà **300 crediti al mese**, che ripartono il 24 di ogni mese. I tetti sommano 250: ne
restano 50 di margine, e un agente che arriva al suo tetto si ferma da solo fino al mese dopo. Un credito
vale un centesimo di dollaro; un giro costa da 3 a 30 crediti. Quanto ha speso ognuno si legge in alto
nelle sue impostazioni, alla voce *Crediti*.

## Le cose da sapere

- **«Dopo la riunione» non parte con Granola.** Il trigger di Notion guarda le note di riunione registrate
  dentro un database: la riunione si registra aprendo una pagina nuova in *Riunioni* e aggiungendo lì la
  nota di riunione. Una riunione registrata con Granola va su *Riunioni* come prima, dal briefing. Le due
  strade non si usano sulla stessa riunione, se no la riga viene due volte.
- **«Lead nuovo» chiede il permesso prima di aprire un sito.** Nelle sue impostazioni avanzate
  *Consenti tutti gli URL* è spento, per scelta: una pagina web può contenere istruzioni scritte per
  ingannare un agente, e questo può modificare i contatti. Se chiedere ogni volta diventa un peso, si
  accende da lì: lo decide Emanuele.
- **Le liste fredde non lo fanno partire.** Un contatto da scraping entra con Stato «Cold lead
  (scraping)», e l'agente lo salta: cento righe da Apify sarebbero cento giri pagati.
- **Il nove della lista, «Siti in salute», non è un agente di Notion.** Un agente legge le pagine come
  testo e non vede gli errori di un gestionale: il controllo gira sul Mac con un Chrome vero, sta in
  `code/controllo-siti/` e lo lancia il briefing del mattino.

## Come si cambia un agente

Si cambia il file qui, poi si ricopia su Notion. La pagina *Istruzioni* di un agente si apre dall'icona in
alto a destra del riquadro delle istruzioni, ed è una pagina vera: si riscrive dall'API con
`notion-update-page` e `replace_content`, e poi si preme **«Salva le modifiche»** in cima, se no l'agente
continua a leggere la versione di prima. La pagina di *Dopo la riunione* è `3e5744e2ecd980bab8dcc1e0ae4ff106`.

Dal browser, le cose che il 25/09/2026 hanno fatto perdere tempo:

- il testo si incolla col Mac: `LANG=en_US.UTF-8 pbcopy < file.md`, poi cmd+V nel riquadro. **Senza la
  variabile, le lettere accentate arrivano rotte** («attivit√†»);
- il nome dell'agente si cambia cliccando tre volte sul titolo grande a sinistra;
- nel riquadro dei trigger, dopo aver scelto l'orario serve un clic a vuoto dentro la finestra prima di
  «Aggiungi trigger», se no il clic chiude solo il menu delle ore e il trigger non viene aggiunto.

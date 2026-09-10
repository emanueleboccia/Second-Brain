# Analisi requisiti — laboratorio di produzione carni

Scritta dal **cliente finale** dell'etichettificio e girata da **Antonio Carola** a Emanuele
su WhatsApp il **10/09/2026**, alle 11:59, dopo la richiesta di una valutazione di tempi e costi.

⚠️ **Non è l'analisi da cui è nato il prototipo di pesatura.** Quella è
`Analisi_Requisiti_Pesatura.docx`, scritta da Antonio il 09/09/2026 e molto più stretta. Questa
descrive il sistema completo che il cliente ha in testa, ed è arrivata dopo.

Testo grezzo, non ritoccato.

---

Ciao, vi riassumo in modo ordinato quello che vorrei sviluppare per la gestione digitale del laboratorio di produzione carni.

L'obiettivo non è fare un semplice gestionale di magazzino, ma creare un sistema che segua tutto il processo produttivo, dalla materia prima in ingresso fino al prodotto finito, alla vendita e alla spedizione, con tracciabilità completa dei lotti e con il minimo possibile di inserimenti manuali da parte degli operatori.

La priorità assoluta è semplificare il lavoro: meno carta, meno scrittura manuale, meno errori, meno perdite di tempo. Dove possibile vorrei utilizzare barcode o QR code, in modo che l'operatore debba soprattutto scansionare, confermare e andare avanti.

FASE 1 – GESTIONE COMPLETA DEL PROCESSO PRODUTTIVO

1. RICEVIMENTO MERCE — data e ora di arrivo, fornitore, documento di accompagnamento, tipologia di prodotto, peso, lotto del fornitore, eventuale scadenza, controllo che peso e lotto sul documento corrispondano a quelli sulle singole confezioni, temperatura rilevata all'arrivo. Accettata la merce, il gestionale carica automaticamente lotto e quantità a magazzino. Utile poter assegnare un'ubicazione fisica (Cella 1 → Scaffale 2 → Lotto X), con etichetta QR/barcode da applicare allo scaffale.

2. ANAGRAFICHE E RICETTE — materie prime, ingredienti, rub, spezie, salse, materiali di produzione, materiali di confezionamento, prodotti finiti. Prodotti: porchetta, pulled pork, pulled beef, brisket, American Stick, ribs, hamburger, salsicce e futuri. Ogni prodotto ha una ricetta con le quantità precise (100 kg di carne = X kg di rub + X kg di spezie…). Inserita la quantità di carne, il gestionale calcola automaticamente il resto.

3. APERTURA SCHEDA DI PRODUZIONE — data, ora, operatore, prodotto, ricetta, quantità prevista, materia prima e suo lotto, ingredienti e loro lotti, materiali usati e loro lotti. Esempio porchetta: midless, lotto carne, rub, lotto rub, spago, lotto spago.

4. LOTTO INTERNO DI PRODUZIONE — generato automaticamente all'apertura (es. PORCHETTA – LOTTO P-20260909-01), collegato a tutti i lotti in ingresso.

5. PREPARAZIONE E MARINATURA — il prodotto va in forno o in cella di marinatura. In cella si registrano lotto, data e ora ingresso, ubicazione, data e ora uscita.

6. COTTURA — etichetta temporanea barcode/QR sul lotto. Si registrano lotto, prodotto, quantità, peso in ingresso, forno, inizio e fine cottura, programma di cottura.

7. ABBATTIMENTO — lotto, abbattitore, ingresso, fine ciclo, temperature rilevate, operatore.

8. CONFEZIONAMENTO — materiali usati (busta sottovuoto, carta alimentare, film, cartone) con i loro lotti. Il gestionale distingue fra dati di tracciabilità interna e dati che compaiono sull'etichetta commerciale.

9. ETICHETTA PRODOTTO FINITO — denominazione, ingredienti, allergeni, peso netto, tabella nutrizionale, lotto, scadenza o TMC, modalità di conservazione, dati aziendali, indirizzo, numero di riconoscimento / bollo CE. Stampante adatta a etichette resistenti a umidità e frigorifero.

10. PESI E RESA PRODUTTIVA — peso iniziale, in lavorazione, dopo cottura, dopo abbattimento, finale confezionato, scarto. Calcolo automatico di calo peso, resa percentuale, quantità prodotta.

11. STOCCAGGIO PRODOTTO FINITO — Cella → Scaffale → Lotto → Quantità, con etichetta di scaffale (prodotto, lotto, peso totale, quantità, scadenza, barcode/QR).

12. TRACCIABILITÀ COMPLETA — da un lotto di prodotto finito si risale a tutta la sua storia: carne e suo lotto, rub e suo lotto, spago e suo lotto, quando preparata, cotta, in quale forno, abbattuta, in quale abbattitore, materiali di confezionamento, peso finale, scadenza, dove stoccata, a chi venduta. **Deve funzionare anche al contrario**: da un lotto di materia prima, in quali produzioni è finito e a quali clienti. Fondamentale in caso di richiamo o controllo.

13. VENDITA E PREPARAZIONE CARTONI — cliente, prodotto, lotto, quantità, numero confezioni, peso. Etichetta esterna del cartone. Scarico automatico dal magazzino.

14. PRINCIPIO DI UTILIZZO — ogni movimento collegato a CHI, COSA, QUANTO, QUALE LOTTO, DOVE, QUANDO. L'operatore inserisce solo quello che il software non può sapere; per il resto scansione QR/barcode, conferma, pesata, cambio fase. Un dato inserito una volta non si richiede più.

FASE 2 – EVOLUZIONE DEL SISTEMA

1. MONITORAGGIO TEMPERATURE — dispositivi wireless o sonde su cella materie prime, cella marinatura, camera climatica, abbattitore, cella prodotto finito, forno. Registrazione automatica e storico.

2. MONITORAGGIO ABBATTIMENTO — temperatura iniziale del prodotto, ora ingresso, temperatura durante il ciclo, temperatura finale, ora fine, segnalazione se il ciclo non rispetta i parametri.

3. ALERT — temperatura fuori parametro, scadenza imminente, prodotto scaduto, lotto bloccato, ciclo di abbattimento anomalo, controllo non eseguito, altra non conformità.

4. PULIZIE E SANIFICAZIONI — attività giornaliere, settimanali, mensili, periodiche, con zona o attrezzatura, attività, prodotto usato, operatore, data e ora, conferma di esecuzione, verifica del responsabile.

5. ABBIGLIAMENTO E IGIENE DEL PERSONALE — checklist su divisa pulita, copricapo, scarpe idonee, guanti, assenza di oggetti non consentiti, controllo prima dell'ingresso in produzione.

6. CHECKLIST HACCP — digitalizzazione delle registrazioni oggi cartacee: produzione, tracciabilità, controlli, temperature, pulizie, sanificazioni, igiene, non conformità.

In sintesi, la FASE 1 deve creare il cuore del sistema: ricevimento → magazzino → lotti → ricette → produzione → cottura → abbattimento → confezionamento → etichettatura → stoccaggio → vendita → tracciabilità. La FASE 2 trasforma il gestionale in un sistema completo di controllo del laboratorio.

La cosa più importante è progettare da subito bene la struttura del database, così da non dover rifare il software quando in futuro aggiungeremo queste funzioni.

IL GESTIONALE DEVE LAVORARE PER L'OPERATORE, NON L'OPERATORE PER IL GESTIONALE.

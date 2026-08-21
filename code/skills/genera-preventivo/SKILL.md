# Genera preventivo

Dato un cliente e cosa gli serve, produce un preventivo pronto da mandare: il documento in
`outputs/preventivi/` e il messaggio con cui lo si consegna.

I prezzi non si decidono qui. Si leggono da [`../../../self/tariffario.md`](../../../self/tariffario.md),
che è l'unica fonte: mai calcolati, mai stimati, mai arrotondati a occhio. Un preventivo con un
prezzo inventato non è un errore di forma — è una cifra che poi Emanuele deve difendere davanti a
un cliente, o rimangiarsi.

## Quando si usa

Quando Emanuele deve mandare un preventivo. Lo dice così: «fammi un preventivo per», «quanto gli
chiedo a», «prepara la proposta per il ristorante X», «mi serve un preventivo per menù e foto».

Vale anche quando non usa la parola preventivo ma il senso è quello: «quanto viene un sito
vetrina più l'hosting per il bar di Salvatore».

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| Nome del cliente | da Emanuele | sì |
| Cosa gli serve | da Emanuele, anche informale: «menù, TV, foto panini» | sì |
| I prezzi | `self/tariffario.md` | sì |
| Gli errori da non ripetere | `correction.md` alla radice | sì |
| La nota del cliente, se esiste | `entities/<cliente>.md` | no |
| Se è un caso studio | da Emanuele, oppure si chiede | no |
| Il tono con cui scrivere | `self/reference/tono.md` se compilato | no |
| La data di oggi, in `YYYY-MM-DD` | dal sistema | sì |

L'elenco di cosa serve arriva quasi sempre in disordine e in gergo: «il menù, la TV, le foto dei
panini». Tradurlo nelle voci del tariffario è parte del lavoro — «la TV» è *Menù animato per TV*,
«le foto» sono *Shooting fotografico*. Se una traduzione non è ovvia, si chiede invece di
indovinare.

## Passaggi

1. **Leggi `self/tariffario.md` per intero**, non solo la voce che ti serve. Le regole trasversali
   in fondo — revisioni, extra minori, casi studio, totale unico — cambiano il preventivo tanto
   quanto i prezzi.

2. **Leggi `correction.md`.** Se c'è una riga su un errore fatto in un preventivo passato, quella
   riga vale più di questa procedura.

3. **Traduci la richiesta in voci di tariffario.** Per ognuna prendi prezzo, cosa include e cosa
   non include. Se una voce richiesta non è a tariffario, **fermati e chiedi**: non riempire il
   buco con una cifra plausibile.

4. **Guarda se il cliente ha già una nota** in `entities/`. Se c'è, leggila: dice cosa gli serve,
   cosa gli è già stato venduto, com'è andata. Se non c'è, la crei al passaggio 8.

5. **Se è un caso studio, conta quelli attivi.** La fonte è lo *Storico trattative* in fondo al
   tariffario: un caso studio è attivo se ha esito «caso studio concordato» e non ha ancora una
   riga di chiusura («consegnato» o «pubblicato»). Il massimo è due contemporaneamente. Se lo
   storico è vuoto o ambiguo, chiedi a Emanuele quanti ne ha attivi: è un dato che esiste solo
   nella sua testa finché non è scritto lì.

6. **Componi il preventivo in markdown**, con questa struttura:

   ```
   # Preventivo — <Cliente>
   <data in YYYY-MM-DD>

   ## Cosa comprende

   ### <Nome voce a tariffario>
   <cosa include, dal tariffario>
   <cosa non include, se il tariffario lo specifica>
   <prezzo>

   ## Totale
   **<somma> €**

   ## Condizioni
   - 2 giri di revisione inclusi; dal terzo si quota a parte
   - <tempi, se noti>
   - <clausola caso studio, se è un caso studio>
   ```

   Il totale è **unico e in evidenza**, con le voci sotto: è la regola del tariffario, e serve a
   far leggere al cliente un numero solo invece di farlo sommare mentre decide.

   Rifai la somma e ricontrollala. Un totale sbagliato è l'unico errore che il cliente nota
   sempre.

7. **Scrivi il messaggio di accompagnamento.** Il preventivo si consegna come messaggio WhatsApp,
   non come allegato formale: sotto i mille euro converte meglio, perché sembra una persona che
   risponde e non un ufficio che protocolla. Breve, diretto, in italiano naturale. Se
   `self/reference/tono.md` è compilato, quello è il tono; finché è vuoto, scrivi come parlerebbe
   Emanuele — niente «restiamo a disposizione», niente «in allegato troverà».

8. **Se il cliente non ha una nota in `entities/`, creala.** La fonte del cliente è la lista
   **Aziende** di Notion (`collection://6376e942-966f-4a19-bff9-6938eff1da7c`, riferimenti in
   `code/skills/journal/riferimenti.json` sotto `clienti`), **non** la lista Contatti: i Contatti
   sono le persone — con ruolo e telefono — le Aziende sono le organizzazioni, ed è alle Aziende
   che punta il campo `Cliente` delle Proposte. Una nota in `entities/` che nasce da un contatto
   invece che da un'azienda si aggancia al nodo sbagliato, e il preventivo finisce appeso a una
   persona invece che al cliente che paga. Se l'azienda esiste già su Notion, prendi da lì nome,
   settore e sito.

   La nota è minima e onesta: nome, attività, data del primo contatto, cosa gli serve. **Non
   chiedere i dati che non hai**: metti quello che si ricava dalla richiesta e lascia il resto da
   compilare — l'intervista al cliente non si fa mentre si preventiva. Il file è
   `entities/<cliente-in-minuscolo-con-trattini>.md`, con frontmatter completo — le note in
   `entities/` passano dal gate di qualità come tutte le altre.

9. **Salva il preventivo** in `outputs/preventivi/<anno>-<cliente>.md`, col cliente in
   minuscolo-con-trattini: `2026-bar-salvatore.md`. Aggancialo alla nota del cliente con un
   wikilink, e linka la nota del cliente al preventivo: un preventivo che non si sa a chi è stato
   mandato non serve a niente fra sei mesi.

10. **Ricorda a Emanuele di aggiornare lo Storico trattative** nel tariffario quando arriva
    l'esito. Non scriverlo tu adesso: l'esito non esiste ancora, il preventivo è appena nato.

11. **Prepara la riga per Notion** — cliente, voci, totale, data, stato «inviato» — ma **mostragliela
    e basta**. Si scrive su Notion solo quando Emanuele dice che il preventivo è **partito
    davvero**: un preventivo generato e mai mandato non è una proposta, e su Notion ci va lo stato
    delle cose, non le intenzioni.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Preventivo** di
[`../../../docs/definizioni-di-fatto.md`](../../../docs/definizioni-di-fatto.md), che è la fonte.

Si verificano **prima** di consegnare l'output. Se una non torna, si corregge e si riverifica: il
preventivo si dà a Emanuele solo quando passano tutte.

## Casi limite

**Una voce richiesta non è a tariffario.** Chiedi. Non c'è nessun caso in cui inventare un prezzo
sia meglio che fare una domanda: il tariffario stesso lo dice, un buco non si riempie a occhio.

**La richiesta è «su misura»** — assistenti, gestionali, automazioni. Il tariffario dice «su
brief», ed è una scelta: quel prezzo si aggancia al valore del problema del cliente, non alle ore.
Produci la bozza **senza prezzo**, con le voci e le condizioni, e segnala chiaramente che va
quotata a mano dopo aver capito il problema.

**Il cliente non ha una nota in `entities/`.** Procedi: fai il preventivo, crea la nota al
passaggio 8, e dillo a Emanuele. Non è un blocco, è un'informazione.

**È un caso studio.** La riduzione standard è **20%, arrotondata alla decina** — sta scritta nel
tariffario, non si chiede e non si ricontratta da soli. La condizione è il permesso **scritto** di
filmare e pubblicare: senza quello il prezzo è pieno, anche se il cliente promette a voce. Se
Emanuele decide una riduzione diversa per un caso particolare, il tariffario dice che la deroga si
annota nello Storico trattative: ricordaglielo.

**Ci sono già due casi studio attivi.** Non è un no automatico: dillo a Emanuele con i nomi dei
due, e lascia decidere a lui. La regola serve a non svendere tre lavori insieme, non a bloccare
una trattativa.

**Lo Storico trattative è vuoto.** È lo stato di oggi, non un errore: chiedi quanti casi studio
sono attivi e vai avanti.

Prima di eseguire questa skill, leggi [`../../../correction.md`](../../../correction.md).

## Impaginazione PDF — non ancora

Questa sezione è vuota apposta.

Oggi il preventivo si consegna come markdown e messaggio WhatsApp. Il passaggio di impaginazione
HTML→PDF nel design del brand si costruisce quando
[`../../../self/reference/design.md`](../../../self/reference/design.md) sarà compilato: servono
palette, caratteri e logo del personal brand, che oggi non esistono. Finché quel file dice «Da
compilare», un PDF sarebbe impaginato con un'identità inventata.

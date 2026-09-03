# Report finanziario

Il chiudi-mese dei soldi. Una volta al mese si prendono i contanti annotati a mano, gli
estratti conto dei due conti e i saldi di fine mese, si riconcilia tutto, e ne esce **un report
scritto** in `areas/finanza/report/` più **la dashboard aggiornata**.

Non è una skill che riassume: è una skill che **riconcilia**. La differenza è che un riassunto
si può scrivere anche se i numeri non tornano, una riconciliazione no.

⚠️ **Questa skill lavora dentro un'area esclusa da git.** `areas/finanza/` non è versionata e
non è in `llms.txt`: la riga nel `.gitignore` è del 01/09/2026 ed è stata scritta prima che la
cartella esistesse. Niente di quello che si legge qui esce da questo disco — non in un commit,
non in un artefatto pubblicato, non in chat se contiene identificativi.

**I dati di lettura non stanno accanto a questo file.** La convenzione delle skill vorrebbe un
`riferimenti.json` qui dentro, ma `code/skills/` è versionato: la configurazione vive in
`areas/finanza/riferimenti-lettura.md`, che è esclusa da git. **Qui c'è la procedura, là ci sono
i dati.** Chi esegue questa skill legge prima quel file: senza, sbaglia le stesse cose che sono
già state sbagliate una volta.

## Quando si usa

**Parte da sola il primo del mese.** È la regola principale: nella prima sessione del giorno 1,
dopo il briefing del [[code/skills/journal/SKILL|journal]], la skill si annuncia e **chiede a
Emanuele i dati del mese appena finito**. Non aspetta che sia lui a ricordarsene: una chiusura
che dipende dalla memoria di chi la deve fare è una chiusura che si salta.

L'innesco vero sta nel `CLAUDE.md` di radice, sezione **La chiusura del mese**, perché quello è
l'unico file sempre in contesto. Questo file dice *come si fa*, non *quando parte*.

Se il giorno 1 salta — sessione non aperta, dati non pronti — **si riprova il giorno dopo e
quello dopo ancora**, finché il mese non è chiuso. Non si chiede una volta sola e poi si tace.

Si invoca anche a mano, quando Emanuele dice:

- «chiudiamo il mese»
- «ho messo l'estratto conto nella cartella»
- «ti do le spese di settembre»
- «facciamo il report del mese»
- «aggiorna la dashboard»

Vale anche quando porta **solo una parte** — solo i contanti, solo gli estratti conto. In quel
caso non si chiude niente: si dice cosa manca e si aspetta. Un mese chiuso a metà è peggio di
un mese non chiuso, perché sembra chiuso.

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| Le regole di lettura e la mappa delle fonti | `areas/finanza/riferimenti-lettura.md` | sì, si legge per prima |
| Gli errori da non ripetere | [`../../../correction.md`](../../../correction.md) | sì |
| Le spese in contanti del mese | incollate in chat da Emanuele | sì |
| L'estratto conto Revolut | PDF in `areas/finanza/_in/` | sì |
| I movimenti Intesa Sanpaolo | PDF in `areas/finanza/_in/` | sì |
| I saldi di tutti i conti a fine mese | da Emanuele, voce per voce | sì |
| La fotografia corrente | `areas/finanza/quadro.md` | sì |
| Il report del mese precedente | `areas/finanza/report/` | sì, se esiste |
| I lavori dei brand di famiglia | Google Sheets, id in `riferimenti-lettura.md` | sì, in **lettura e scrittura** |
| I lavori da freelance | Google Sheets, id in `riferimenti-lettura.md` | sì, in **lettura e scrittura** |
| Le proposte aperte | Notion, dal connettore attivo | no |
| Cosa è attivo fra gli strumenti | [`../../../docs/registro-strumenti.md`](../../../docs/registro-strumenti.md) | no |
| I prezzi di listino | [`../../../self/tariffario.md`](../../../self/tariffario.md) | no |

I PDF si leggono **da disco**, mai chiedendoli in chat: contengono IBAN e numero di conto.
Le note in contanti invece in chat vanno bene, perché sono righe `data · importo · categoria`
senza identificativi.

## Passaggi

**0 · Chiedi i dati, se è il primo del mese.** Tre cose, in un messaggio solo: l'estratto conto
Revolut e la lista movimenti Intesa dentro `areas/finanza/_in/`, e le note in contanti incollate
in chat. **I saldi non si chiedono adesso**: si chiedono al passo 9, quando i movimenti sono già
letti e si sa cosa verificare.

**1 · Leggi le regole prima dei numeri.** `areas/finanza/riferimenti-lettura.md` e poi
`correction.md`. Le regole di lettura non sono contesto di sfondo: sono la differenza fra un
giroconto e un'entrata, e leggerle dopo vuol dire rifare il lavoro.

**2 · Estrai i movimenti dagli estratti conto.** Su macOS non c'è `pdftotext`; `pypdf` sì, e
basta. Estrai il testo, isola le righe transazione, e **classificale una per una**.

**3 · Verifica che la somma torni al centesimo.** La somma dei movimenti che hai classificato
deve fare **esattamente** il totale delle uscite dichiarato dall'estratto conto. Se non torna,
ti è sfuggita una riga: non andare avanti. È l'unico controllo che dice se hai letto tutto, e
costa dieci secondi.

**4 · Trova i doppioni fra contanti e carta.** Una spesa digitale annotata anche a mano va
contata **una volta sola, dal lato banca**, che ha l'importo esatto e la data giusta. Elencali
a Emanuele invece di risolverli in silenzio: qualcuno sarà un doppione vero, qualcuno saranno
due spese diverse che si somigliano.

**5 · Netta i rimborsi.** Ogni spesa parzialmente o totalmente rimborsata si porta al netto.
I rimborsi non vanno mai fra le entrate.

**6 · Separa i quattro blocchi:** personale ordinario, lavoro, vacanza, formazione. E fuori da
tutti e quattro, **il capitale**: acquisti e vendite di strumenti e beni.

**7 · Calcola due numeri, non uno.** Il **margine corrente** (entrate meno uscite correnti) e la
**variazione di cassa** (margine più capitale). Vanno detti tutti e due, uno sotto l'altro. Un
mese può avere un margine alto e la cassa ferma, ed è un'informazione che sparisce se si somma.

**8 · Riconcilia i saldi.** Prendi i saldi di fine mese e confrontali con quelli attesi, cioè i
saldi del mese prima più i movimenti. Fallo **per contenitore**, non sul totale.

Lo scarto dice cosa cercare:

- **in un contenitore solo, in negativo** → manca una spesa. Si cerca.
- **in tutti i contenitori insieme, nello stesso verso** → è il saldo di partenza a essere
  sbagliato. Si dichiara e si va avanti.
- **sotto i dieci euro** → arrotondamenti. Si ignora e non se ne parla.

**9 · Chiedi quello che non torna, in blocco.** Tutte le domande insieme, numerate, alla fine
dell'analisi. Non una alla volta mentre si lavora: interrompe lui e allunga tutto. Nello stesso
messaggio si chiedono anche **i saldi di fine mese**, voce per voce.

Le domande che non mancano mai:

- **Gli acquisti su Amazon.** ⚠️ Emanuele compra spesso **per altri** — la fidanzata, il padre,
  il fratello — e poi si fa rimborsare, a volte per l'intero ordine e a volte per una parte.
  **Ogni addebito Amazon va chiesto**, uno per uno, con importo e data: *«questo è tuo, o era
  per qualcuno? e ti hanno rimborsato tutto o una parte?»*. Non si dà mai per scontato che un
  ordine sia suo. Vale allo stesso modo per gli altri negozi dove capita la stessa cosa.
- **I movimenti che non si spiegano**: accrediti da persone, addebiti senza una causale chiara,
  cifre che non corrispondono a nessun abbonamento noto.
- **Le incongruenze fra contanti e carta**, dal passo 4.
- **Le date di eventuali vacanze**, se in mezzo al mese compaiono spese da fuori zona.

**10 · Registra i lavori nei due registri.** Se dalla conversazione emerge un incasso o un lavoro
svolto che nei registri non c'è, **va scritto lì**, non solo nel report. La regola di
smistamento sta in `riferimenti-lettura.md`, ed è secca: **cliente esterno → registro del
personal brand · brand di famiglia → registro dei brand di famiglia.**

⚠️ **Sono fogli Google, quindi sono scritture su un servizio esterno.** Vale la regola del
`CLAUDE.md` di radice: **si mostra la riga esatta prima di scriverla** — data, lavoro, attività,
tipo, importo, stato — e si scrive solo dopo l'ok, una alla volta.

**11 · Scrivi il report.** `areas/finanza/report/<AAAA-MM>.md`, con frontmatter completo. In
testa **le fonti**, sempre: un numero senza la sua fonte, in un'area di finanza, è peggio di un
numero assente. Il corpo dice il mese in una riga, le entrate, le uscite per blocco, i rimborsi
nettati, gli investimenti, la riconciliazione dei saldi, e cosa manca ancora.

**12 · Aggiorna `quadro.md`** dove la fotografia è cambiata: patrimonio, spese ricorrenti nuove
o sparite, fonti di reddito. **Il quadro non racconta il mese** — quello è il report. Il quadro
dice com'è la situazione adesso.

**13 · Guarda se è nata una decisione.** Un abbonamento disdetto, un prezzo cambiato, una regola
nuova: va in `areas/finanza/decisioni.md` col motivo **e con la condizione che la riaprirebbe**.
Una decisione senza condizione di revisione è un'abitudine che nessuno rimetterà in discussione.

**14 · Rigenera la dashboard**, `areas/finanza/report/dashboard.html`. È un file locale che si
apre col browser dal disco, **non un artefatto pubblicato**: la decisione è del 02/09/2026 e sta
in `decisioni.md`. Segue [`../../../self/reference/design.md`](../../../self/reference/design.md).

**15 · Svuota `_in/`.** Cancella gli estratti conto: i numeri sono passati nel report, e un
documento della banca parcheggiato in un vault non è una nota. Il `LEGGIMI.md` resta.

**16 · Consegna la dashboard e commenta il mese.** Prima il percorso del file aggiornato, poi
**i tre indicatori** e solo quelli: **risparmio del mese, patrimonio, andamento del
discrezionale**.

E poi il commento, che è la parte che Emanuele ha chiesto esplicitamente il 02/09/2026: **dire
dove sta spendendo troppo, cosa converrebbe alzare e cosa abbassare.** Si scrive guardando i
numeri di questo mese contro quelli dei mesi prima, non contro un'idea di come si dovrebbe
vivere.

Le regole del commento:

- **Si nomina una categoria per volta, con la cifra e il confronto.** «Il fuori è passato da 180
  a 290, ed è la voce che cresce più in fretta» è un commento. «Attento alle spese» non lo è.
- **Massimo tre cose.** Un commento che elenca dieci voci non fa cambiare niente.
- **Si dice anche quando va bene**, e si dice perché. Un commento che trova sempre un problema
  smette di essere letto.
- ⚠️ **Non si danno consigli di investimento.** Commentare spese, margine, accantonamenti e
  obiettivi si fa; dire cosa comprare, cosa vendere o come allocare il portafoglio no — in Italia
  è attività riservata. Se serve, si dice che serve un consulente abilitato.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Report finanziario** di
[`../../../docs/definizioni-di-fatto.md`](../../../docs/definizioni-di-fatto.md), che è la fonte.

Si verificano **prima** di consegnare. Se una non torna, si corregge e si riverifica.

## Casi limite

**I saldi di fine mese non ci sono.** Il report si scrive lo stesso — entrate, uscite e margine
non dipendono dai saldi — ma la sezione patrimonio **non si calcola e si dichiara mancante**.
Un patrimonio dedotto per differenza è un numero inventato con l'aspetto di un numero vero.

**Un estratto conto manca.** Non si chiude il mese. Si dice quale manca e si aspetta: senza un
conto, la riconciliazione del passo 8 non ha senso, e senza quella il report è un elenco.

**Le somme del passo 3 non tornano.** Non si arrotonda e non si aggiunge una riga «varie» per
far quadrare. Si rilegge l'estratto: manca una transazione, ed è lì.

**Emanuele non ricorda una spesa.** Si scrive che non è identificata, con importo e data. Una
riga «non identificato, 47 €, 12 del mese» è un dato; una categoria assegnata a caso è un errore
che si porta dietro tutte le medie dei mesi dopo.

**Il mese è già stato chiuso.** Non si sovrascrive il report: si legge, si mostra a Emanuele cosa
si aggiungerebbe, e si chiede. Vale anche se l'hai scritto tu poco prima.

**Un dato fiscale manca.** Coefficienti, aliquote, soglie e scadenze **non si stimano mai**:
si chiedono a Fiscozen. Una percentuale sbagliata qui dentro diventa un accantonamento sbagliato
per tutto l'anno.

**Un lavoro emerge parlando ma non si sa in quale registro va.** Non si indovina. Il criterio è
uno: **chi ha pagato.** Un brand di famiglia va nel suo registro, chiunque altro in quello del
personal brand. Se è ambiguo — un lavoro per un conoscente tramite la famiglia — si chiede.

**Il registro del personal brand ha quattro schede, non una.** Rifatto il 03/09/2026: `Lavori`
è cosa è stato venduto, `Movimenti` sono i soldi che si muovono — acconti, saldi e **costi per
cliente** — e `Clienti` e `Servizi` sono riepiloghi a formula che non si toccano. Le colonne e
la regola dell'ID stanno in `riferimenti-lettura.md`. **Un costo per cliente si registra qui**,
con Categoria `Costo`: è la sola fonte del margine per cliente e per servizio.

**Emanuele chiede la dashboard pubblicata o su hosting.** È una decisione già presa in senso
contrario, il 02/09/2026, e sta in `decisioni.md` con la sua condizione di revisione. Non si
ridiscute di sfuggita: se vuole cambiarla, si riapre quella riga e si scrive perché.

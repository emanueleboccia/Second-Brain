# Regia video

Il consulente di regia di Emanuele per i video social. Lavora in due modi — **in creazione**,
quando il video non esiste ancora, e **in revisione**, quando c'è già una composizione Remotion o
un mp4 da giudicare — e in tutti e due dice la stessa cosa da due angoli diversi: se questo video
rispetta il metodo.

**Il metodo è quello suo, non quello dell'AI.** Le 27 note in
[`../../../docs/video-social/`](../../../docs/video-social/) sono la fonte, e sono l'unica. Vengono
dagli appunti del corso che Emanuele ha studiato, `sources/video-social/appunti social media
manager.pdf`, distillati il 27/08/2026. Un consiglio di regia che non si aggancia a una di quelle
note non è un consiglio migliore: è un'opinione generica su come si fanno i video, e ce n'è già
troppa in giro.

Per questo la regola più importante è saper dire di no:

> **«Questo i tuoi appunti non lo coprono.»**

Detta e basta, senza attaccarci subito il consiglio generico per non lasciare il vuoto. Se poi
Emanuele chiede lo stesso un'opinione, gliela si dà dicendo che è un'opinione fuori dal metodo.

**La seconda regola è distinguere il numero dal gusto.** Le note sono taggate: `regola/misurabile`
quando c'è un numero che si verifica — l'hook entro 3 secondi, l'export a 1080p 30 fps, la musica
11 dB sotto la voce — e `regola/gusto` quando è una scelta che si giudica guardando. I numeri
stanno anche in [`regole-numeriche.json`](regole-numeriche.json), che è la loro copia leggibile da
uno script: **la fonte resta la nota**, e se i due divergono vince la nota.

Un numero si contesta col numero: «l'hook entra a 4,1 secondi, la regola dice entro 3». Un gusto si
segnala come opinione: «questo stacco secondo me è di troppo, ma è gusto, non è una regola». Le due
cose non si mescolano, perché è così che Emanuele finisce a difendere davanti a un cliente una
scelta che nessuno gli ha mai chiesto.

**Questa skill non scrive niente in revisione.** Legge il codice, estrae dei fotogrammi in una
cartella temporanea e parla. In creazione invece scrive, ma solo dentro il progetto Remotion di cui
si sta occupando: nessuna nota del vault, nessuna task, nessun servizio esterno.

## Quando si usa

Quando Emanuele progetta un video social da zero, o ne ha uno già fatto e vuole sapere se funziona.

Sono i due modi, e si riconoscono da come lo dice.

**In creazione**, quando il video non esiste ancora:

- «facciamo un reel su X»
- «che hook per questo video»
- «come lo strutturo?»
- «ho tre clip del cliente, che ne tiro fuori?»
- «quanto deve durare?»
- «monta un reel per Evolve»

**In revisione**, quando c'è già qualcosa da guardare:

- «controlla questo video»
- «questo reel funziona?»
- «guarda la composizione e dimmi che non va»
- «l'hook di questo video regge?»
- «rivedi il reel prima che lo mandi»

Vale anche quando Emanuele non nomina la regia e parla solo del contenuto: «secondo te si capisce
nei primi secondi?» è una revisione, «che dico all'inizio?» è una creazione.

**Non vale per il montaggio tecnico.** Come si scrive una composizione Remotion — componenti,
`Sequence`, transizioni, sottotitoli, render — sta nelle skill ufficiali di Remotion in
`.claude/skills/`, a partire da `remotion-best-practices` che fa da smistamento. Questa skill dice
**cosa** deve fare il video; quelle dicono **come** si scrive.

**Non vale per il prezzo.** Quello è
[`../genera-preventivo/SKILL.md`](../genera-preventivo/SKILL.md), e i prezzi si leggono solo da
[`../../self/tariffario.md`](../../../self/tariffario.md). Negli appunti non c'è nessun prezzo dei
video, e qui non se ne inventa uno.

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| I principi di regia | `docs/video-social/`, solo le note che servono | sì, tutti e due i modi |
| I numeri delle regole | `code/skills/regia-video/regole-numeriche.json` | sì, tutti e due i modi |
| Il correction log | `correction.md` alla radice | sì, si legge prima di partire |
| Di cosa parla il video | da Emanuele | sì in creazione |
| Il girato disponibile | la cartella che indica Emanuele | no in creazione: senza, si progetta e basta |
| Il codice della composizione | il progetto Remotion, di solito `src/` | sì in revisione, se il video è fatto con Remotion |
| Il render | l'mp4 esportato, di solito in `out/` | no: se non c'è, si salta il passaggio dei fotogrammi |
| `ffmpeg` | sul sistema, anche via `npx remotion ffmpeg` | sì per estrarre i fotogrammi |
| Il grafico di retention | da Emanuele, dalle analitiche del profilo | no: senza, la regola condizionale sulla CTA non si applica |

Se manca un input obbligatorio non si tira a indovinare: si va ai casi limite.

## Passaggi

### Modo A — in creazione

**1 · Leggi i principi.** Da `docs/video-social/` si aprono le note che servono a questo video, non
tutte: quelle di famiglia `principio/strategia` e `principio/hook` sempre, le altre secondo cosa si
sta facendo. I numeri si leggono da `regole-numeriche.json`.

**2 · Fai le tre domande che decidono il video.** Prima di proporre qualsiasi cosa:

- **dove sta il centro** — la persona o il prodotto (`persona-o-prodotto`);
- **che tipo di contenuto è** — intrattenimento, informativo, ispirazionale
  (`tre-tipi-di-contenuto`);
- **qual è il dolore** che il video mette in scena, detto con le parole del target
  (`dolore-e-soluzione`).

Se Emanuele ha già risposto parlando, non gliele si rifà: si riportano le risposte che si sono
capite e si chiede conferma solo su quelle incerte.

**3 · Proponi l'hook.** Tipo di gancio scelto fra i sette di `tipi-di-hook`, con la frase vera —
non «un hook che incuriosisce», la frase — e mezza riga sul perché quel tipo e non un altro. Si
controlla contro `varieta-e-specificita`: nomina un dolore preciso, e non è lo stesso tipo di
gancio dell'ultimo video se si sa qual era.

**4 · Proponi la struttura, in secondi.** Tre blocchi come in `hook-sviluppo-cta`, ognuno col suo
istante di inizio e la sua durata:

- l'hook sta dentro la finestra `hook.finestra_secondi`;
- quello che il video deve far arrivare sta prima di `carico_utile.entro_secondi` — che è una
  derivazione, e si dice che lo è;
- la CTA sta in un punto non skippabile; **a metà video solo se** Emanuele conferma che le
  analitiche mostrano abbandoni finali (`cta.condizionata`);
- il picco emotivo sta in fondo (`effetto-recency`), e se litiga con la CTA la tensione si dichiara
  invece di risolverla di nascosto.

Questa è la parte che Emanuele approva o corregge. **Si aspetta il suo ok prima di scrivere codice.**

**5 · Traduci i secondi in frame.** A `export.fps` fotogrammi al secondo, `frame = secondi × fps`.
I tempi vanno in un file solo del progetto — `src/.../tempi.ts` o equivalente — con i secondi
scritti nel commento accanto al numero di frame, così il passaggio 2 del modo revisione può
rifare il conto senza indovinare.

**6 · Costruisci la composizione.** Qui si passa alle skill di Remotion in `.claude/skills/`. I
valori che questa skill impone e che non si negoziano con lo strumento:

| Cosa | Valore | Da |
|---|---|---|
| `width` × `height` | 1080 × 1920 | `export.dimensioni_verticale` |
| `fps` | 30 | `export.fps` |
| fascia dei sottotitoli | libera, sotto il volto | `spazio-per-i-sottotitoli` |
| stile dei sottotitoli | uno solo, applicato a tutte le righe | `sottotitoli-leggibili` |
| colori e font | quelli del brand del cliente | `coerenza-visiva` |

Se il brand non ha colori e font scritti da qualche parte nel vault, **non si inventano**: si dice
che mancano e si chiede. È già successo con Evolve.

**7 · Verifica prima di consegnare.** Si esegue il modo revisione su quello che si è appena
costruito, passaggi 2 e 3. Un video progettato bene e montato storto viola le stesse regole di uno
progettato male.

### Modo B — in revisione

**1 · Leggi i principi.** Come sopra: `docs/video-social/` è la fonte del metodo, e la si apre
prima di guardare il video, non dopo. Si guarda per prime la famiglia della domanda — se Emanuele
chiede dell'hook si aprono le note `principio/hook` — e poi le altre.

**Se la situazione non è coperta dalle note, si dice.** «Questo i tuoi appunti non lo coprono»:
non si riempie il buco con una regola generica presa da altrove.

**2 · Leggi il codice della composizione.** Non il video: il codice. Si cercano i numeri e si
convertono in tempo reale con `secondi = frame ÷ fps`:

- la `Composition`: `fps`, `durationInFrames`, `width`, `height`;
- ogni `Sequence` o `TransitionSeries.Sequence`: `from` e `durationInFrames`, che danno l'istante di
  inizio e la durata di ogni blocco;
- le `interpolate` e le animazioni: gli intervalli di frame dicono quando un elemento entra ed esce;
- i sottotitoli e le scritte: quante parole restano a schermo insieme, e in che fascia stanno.

Da questi si ricavano i quattro tempi che si confrontano con `regole-numeriche.json`:

| Cosa si calcola | Contro quale regola |
|---|---|
| quando l'hook è completamente entrato | `hook.finestra_secondi`, `hook.limite_duro_secondi` |
| quando arriva il contenuto principale | `carico_utile.entro_secondi` (derivata) |
| dove sta la CTA, in frazione di durata | `cta` — solo se ci sono le analitiche |
| durata totale e formato | `attenzione.soglia_completamento_secondi`, `export` |

Ogni scostamento si scrive **col numero**, non con un aggettivo.

**3 · Guarda i fotogrammi.** Se esiste un render mp4, se ne estraggono da 4 a 6 nei momenti che
contano: **mezzo secondo**, **la fine dell'hook**, **metà video**, **la CTA**, e l'ultimo secondo.

```bash
ffmpeg -ss <secondi> -i <render.mp4> -frames:v 1 -y <cartella-temporanea>/f-<secondi>.png
```

I fotogrammi si salvano nella cartella scratch della sessione, non nel progetto. Poi si guardano
davvero, e si giudicano su tre cose:

- **leggibilità** — la scritta si legge in mezzo secondo? contrasto pieno, font a bastoni, banda
  dietro se il fondo è una foto (`leggibilita-del-testo-a-schermo`);
- **ingombro** — quanto schermo occupa il testo, e se copre il volto o esce dalla fascia
  (`spazio-per-i-sottotitoli`);
- **gerarchia** — si capisce cosa leggere per primo? (`gerarchia-a-schermo`).

**4 · Dai il verdetto.** Parlato, non un rapporto. Nell'ordine:

- **cosa rispetta le regole**, in breve. Serve a far capire cosa non va toccato.
- **cosa le viola, col numero**: «l'hook entra a 4,1 secondi, la regola dice entro 3»; «la CTA sta
  all'87% del video»; «esporta a 24 fps, lo standard è 30».
- **cosa cambierei**, separando quello che viene dalle note da quello che è gusto tuo — e il gusto
  si annuncia come tale.
- **cosa non è coperto dagli appunti**, se è emerso qualcosa.

Se il video rispetta tutto, si dice in due righe e si chiude. Un verdetto che trova per forza tre
cose da correggere per sembrare utile è un verdetto di cui non ci si fida più.

## Definizione di fatto

Le condizioni non si riscrivono qui: stanno nella voce **Regia video** di
[`../../../docs/definizioni/regia-video.md`](../../../docs/definizioni/regia-video.md), che è la fonte.
L'indice di tutte le voci sta in `docs/definizioni-di-fatto.md`.

Si verificano **prima** di consegnare l'output, modo per modo. Se una non torna, si corregge e si
riverifica.

## Casi limite

**Il video non è fatto con Remotion, c'è solo un mp4.** Si salta il passaggio 2 — non c'è codice da
leggere — e si lavora sui fotogrammi estratti e sulla durata del file. **E lo si dice:** «non ho il
codice, quindi sui tempi interni vado a occhio sui fotogrammi». Senza quella riga Emanuele crede che
i tempi siano stati misurati, e non lo sono.

**`ffmpeg` non c'è.** Non si consegna una revisione a metà fingendo che i fotogrammi non
servissero. Si dice come si installa — `brew install ffmpeg`, oppure `npx remotion ffmpeg` se si sta
dentro un progetto Remotion, che lo porta con sé — e ci si ferma lì.

**Non c'è nessun render, solo il codice.** Il passaggio 2 si fa per intero, il 3 si salta e si dice
perché. I numeri dei tempi restano validi: sono calcolati, non stimati.

**Una situazione che le note non coprono.** «Questo i tuoi appunti non lo coprono», e si va avanti
col resto della revisione. Non si va a cercare la regola su internet e non la si deduce da un
principio vicino.

**Un numero degli appunti litiga con un altro.** Le tensioni note sono due e sono già scritte:
la CTA a metà contro il picco emotivo alla fine (`posizione-della-cta` ed `effetto-recency`), e i
15 secondi di TikTok contro i format più lunghi che gli stessi appunti mostrano funzionare
(`soglia-di-attenzione`). Si dichiarano invece di sceglierne una di nascosto. Se ne salta fuori una
nuova, si nomina a Emanuele: è materiale per una nota, non da risolvere al volo.

**Mancano le analitiche.** La regola sulla CTA a metà è **condizionata** al fatto che il grafico di
retention mostri abbandoni finali. Senza quel dato non si applica: si chiede a Emanuele cosa dice
il grafico, e se non lo sa si segnala la CTA come «da verificare sui dati», non come violazione.

**Il brand non ha colori e font nel vault.** Non si scelgono. Si dice che mancano e si chiede — o
si accetta esplicitamente un ripiego dichiarandolo tale, come è successo con l'ambra di Evolve il
26/08/2026.

**Emanuele chiede una revisione di un video che ha già pubblicato.** Si fa lo stesso, ma il verdetto
cambia taglio: quello che si trova serve al prossimo video, non a questo. Dirgli cosa avrebbe dovuto
fare su una cosa che non può più cambiare è tempo perso per tutti e due.

Prima di eseguire questa skill, leggi [`../../../correction.md`](../../../correction.md).

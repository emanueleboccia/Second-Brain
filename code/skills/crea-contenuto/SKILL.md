# Crea contenuto — dallo spunto al copione

Emanuele ha le idee e ha la teoria. Quello che manca in mezzo è il **copione**: il foglio che
dice cosa si dice, in che ordine, cosa si riprende e come deve venire. Senza, un'idea resta nella
colonna 💡 Idee per mesi, perché iniziare da zero davanti alla fotocamera costa troppo.

Questa skill non inventa un metodo. **Ne applica uno che è già scritto** nelle 27 note di
`docs/video-social/`, che sono i suoi appunti da social media manager distillati: la retention
come unica metrica, i tre tipi di contenuto, i sette tipi di hook, la struttura hook-sviluppo-CTA,
la soglia di attenzione, le impostazioni di ripresa, i sottotitoli, il formato di export.

⚠️ **Non si scrive niente che non venga da lì.** Se una scelta non ha una nota che la regge, si
dice a Emanuele che è un'invenzione. Un consiglio inventato che suona bene è peggio di nessun
consiglio: sembra metodo e non lo è.

## Quando si usa

Due comandi, due momenti opposti.

- **«scrivi lo script»** — c'è un'idea e serve il copione. Vale su qualunque forma: «facciamo il
  video sul Girarrosto», «ho un'idea per un reel», «scrivimi lo script di quel post».
- **«giudica»** — il contenuto esiste già, girato o pubblicato, e serve capire cosa non ha
  funzionato. «Guarda questo reel», «perché non è andato», «come lo miglioro».

Non è questa la skill del montaggio: come si taglia lo dice
[`../regia-video/SKILL.md`](../regia-video/SKILL.md).

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| L'idea o il contenuto da giudicare | da Emanuele, o dalla colonna 💡 Idee di TickTick | sì |
| Il metodo | `docs/video-social/`, tutte le note che servono | sì |
| Il tono di voce | `self/reference/tono.md` | sì |
| L'aspetto | `self/reference/design.md` | sì |
| Come si scrivono le caption | `self/reference/caption.md` | sì per il testo del post |
| Cosa ha già funzionato | `data/contenuti-pubblicati.md` | sì, appena avrà righe dentro |
| I divieti di scrittura | `CLAUDE.md` di radice, «Come non si scrive mai» | sì |

**Le note di `docs/video-social/` non si leggono tutte e 27.** Si parte da
`tre-tipi-di-contenuto.md` e `retention-come-metrica.md`, e da lì si seguono i link a quelle che
servono a questo contenuto. Leggerle tutte ogni volta è il modo di non usarne nessuna.

## Passaggi

### Comando 1 — «scrivi lo script»

**1 · Che contenuto è.** Prima di scrivere una parola si sceglie fra i tre tipi —
intrattenimento, informativo, ispirazionale. Non è un'etichetta da mettere dopo: decide quali dei
sette hook sono disponibili. ⚠️ **L'informativo funziona solo se l'informazione è desiderabile e
rara.** «Come si fa un sito» non lo è. «Quanto costa davvero un sito e perché» sì.

**2 · Chi guarda, e cosa gli cambia.** Una riga sola: a chi parla questo video e cosa deve pensare
alla fine. Se non si riesce a scriverla, l'idea non è pronta e si torna da Emanuele — non si
scrive un copione sopra un buco.

**3 · L'hook, e se ne scrivono tre.** Non uno. Tre versioni con **tipi diversi** fra i sette, così
la scelta è sua e non mia. Per ognuna si dichiara il tipo e si scrivono le tre componenti:
**visivo** — cosa si vede nei primi fotogrammi — **testuale** — cosa c'è scritto a schermo — e
**auditivo** — la frase detta.

⚠️ **La finestra è 3-5 secondi.** Un hook che non sta in cinque secondi detti a voce normale non è
un hook, è un'introduzione. Si accorcia prima di consegnarlo.

**4 · Lo sviluppo, con i pattern interrupt segnati.** Il corpo del video, scritto come si parla.
Al decimo secondo sono rimaste due persone su tre: dove la retention cala si mette una rottura, e
**nel copione si segna dove**. Uno sviluppo senza rotture segnate è uno sviluppo che si appiattisce.

**5 · La CTA, e dove sta.** Non per forza in fondo. Se il grafico crolla prima della fine, la
chiamata all'azione in coda la sente solo chi era già convinto.

**6 · La lista delle riprese.** È la parte che rende il copione utilizzabile invece che bello.
Una tabella: ogni riga è un'inquadratura — cosa si riprende, dove, quanto dura, se è parlato o
b-roll. Con dentro le note di `impostazioni-di-ripresa.md`, `luce-in-ripresa.md` e
`stabilita-e-zoom.md` **solo dove servono a quella ripresa**, non come appendice teorica.

Le foto e i materiali da procurarsi vanno in fondo, in un elenco a parte: sono la cosa che blocca
le riprese il giorno che si gira.

**7 · Il testo del post.** Caption e prima riga, secondo `self/reference/caption.md`.

**8 · Dove si salva.** In `outputs/script/<AAAA-MM-GG>-<slug>.md`. Un copione è un deliverable, e
un deliverable ha un file. Se nasce da un'idea che sta su TickTick, si dice a Emanuele quale, così
può spostarla.

### Comando 2 — «giudica»

Si guarda il contenuto e si risponde a quattro domande, **in quest'ordine e senza saltarne**.

1. **L'hook aggancia nei primi 3-5 secondi?** Quale dei sette tipi è, e quante delle tre
   componenti ci sono. ⚠️ Il caso peggiore è l'hook solo auditivo: arriva più tardi degli altri due
   perché va a tempo col parlato.
2. **Dove cala lo sviluppo, e perché.** Il punto esatto, non «la parte centrale». Se c'è il grafico
   di retention si legge quello: i picchi sono cose da rifare, i cali hanno un nome.
3. **La CTA è al posto giusto?**
4. **Si vede e si sente?** Sottotitoli, leggibilità del testo a schermo, luce, audio, formato.

Poi **una cosa sola da cambiare**, la più grossa. Un giudizio con sette correzioni non si applica:
si legge, si annuisce e si rifà uguale.

⚠️ **Si giudica il contenuto, non chi l'ha fatto.** «Questo hook parte lento» si può dire.
«Non sei convincente» non è un giudizio tecnico ed è fuori dal perimetro di questa skill.

**Il risultato va in `data/contenuti-pubblicati.md`** se il contenuto è pubblicato: che hook era,
come è andato, cosa si è imparato. È l'unica cosa che rende la skill più brava il mese prossimo.

## Un esempio, per capire cosa vuol dire «tre hook di tipi diversi»

Idea di partenza: *il caso Girarrosto — l'app di presa ordini che ha sostituito carta e penna.*

**A · Story.** Il contrasto fa il lavoro prima delle parole.
- *visivo*: Marco al telefono con carta, penna ed evidenziatori → taglio secco all'iPad
- *testuale*: «Due mesi fa» / «Oggi»
- *auditivo*: «Questo è Marco. Due mesi fa prendeva gli ordini così. Oggi li prende così.»

**B · Problema (negativo).** Colpisce chi si riconosce.
- *visivo*: primo piano dei fogli pieni di scarabocchi
- *testuale*: «Ogni ordine preso a penna è un errore che aspetta di succedere»
- *auditivo*: «Se gestisci un'attività e prendi ancora gli ordini così, questo video ti riguarda.»

**C · Domanda comune.** Intercetta una stanchezza diffusa.
- *auditivo*: «Tutti dicono che l'AI ti cambierà il lavoro. Nessuno ti fa vedere come. Io te lo
  mostro con un caso vero.»

Tre tipi diversi fra i sette, tre componenti dichiarate per ognuno, tutti dentro i cinque
secondi. **La scelta resta a Emanuele**: il lavoro della skill è dargli tre strade vere, non una
preferita e due riempitivi.

Il copione completo da cui viene questo esempio è
[`../../../outputs/script/2026-09-03-caso-girarrosto.md`](../../../outputs/script/2026-09-03-caso-girarrosto.md).

## Un esempio di giudizio

Sbagliato: «l'hook è debole, lo sviluppo cala, i sottotitoli sono piccoli, la CTA arriva tardi,
il colore non è coerente.» Cinque correzioni non si applicano: si legge, si annuisce, si rifà
uguale.

Giusto: «L'hook è di tipo *how-to* e ha solo la componente auditiva — parte a tempo col parlato,
quindi nei primi due secondi a schermo non c'è niente che agganci. **La cosa da cambiare è
questa**: mettici il testo e l'immagine forte già sul fotogramma zero. Il resto va bene.»

Una cosa sola, con dentro il perché.

## Definizione di fatto

Le condizioni stanno nella voce **Crea contenuto** di
[`../../../docs/definizioni/crea-contenuto.md`](../../../docs/definizioni/crea-contenuto.md),
che è la fonte. L'indice di tutte le voci sta in `docs/definizioni-di-fatto.md`.

## Casi limite

**L'idea è una riga sola su TickTick.** Non basta per un copione, e non si riempie il vuoto
indovinando. Si chiede a Emanuele le due cose che mancano sempre: a chi parla, e cosa deve pensare
chi guarda alla fine.

**Il contenuto riguarda un cliente.** Si legge la sua scheda in `entities/clienti/` prima di
scrivere, e ⚠️ **si chiede se si può pubblicare.** Un caso studio con dentro il nome di qualcuno è
una cosa che si concorda, non che si scopre dopo.

**Serve un dato o un numero.** Non si stima mai. I prezzi si leggono da `self/tariffario.md`, i
risultati da `data/`. Un numero inventato in un video è una promessa che qualcuno verrà a
riscuotere.

**`data/contenuti-pubblicati.md` è ancora vuoto.** Si dice, in una riga: i consigli vengono dalla
teoria e non da cosa ha funzionato **a lui**. La differenza conta, e sparisce da sola appena
quel file avrà dentro tre o quattro righe.

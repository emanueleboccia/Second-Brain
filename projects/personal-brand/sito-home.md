---
title: "Personal brand — la home"
summary: "I nove blocchi della home di emanueleboccia.it, decisi il 20/09/2026 sul wireframe: l'ordine è quello della decomoditizzazione, la hero mostra i lavori e non la faccia, il confronto attacca il modo e non una categoria, e le domande frequenti vengono dal prototipo V1."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-20
updated: 2026-09-21
related:
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/sito-pagine]]"
  - "[[projects/personal-brand/prototipo]]"
  - "[[docs/web-design/framework-decomoditizzazione]]"
  - "[[self/reference/brand]]"
  - "[[self/reference/convinzioni]]"
---

# Personal brand — la home

> **Riscritta il 20/09/2026**, dopo aver guardato i due prototipi. Nove blocchi, e l'ordine è
> quello del [[docs/web-design/framework-decomoditizzazione|framework della decomoditizzazione]]
> perché il pubblico è freddo: promessa, pain, squalifica, spiegazione, pitch, azione. Accanto a
> ogni blocco c'è da dove viene — **V1**, **V2**, il copy del 19/09 o **nuovo**.
>
> Scelte di Emanuele lo stesso giorno: **il titolo è la variante 03** e **il triangolo è la
> versione B**, con l'AI al centro invece che a un vertice.

## Cosa è cambiato il 21/09/2026, rivedendola con Emanuele

La home montata il 20 è stata rivista la mattina dopo, e **alcuni blocchi qui sotto sono superati**.
Questo è l'elenco di cosa vale adesso, in ordine.

1. **Hero** — resta, e ha preso **un'immagine**: il foglio degli ordini evidenziato, fra il titolo
   e la striscia dei lavori. Motivo: era solo tipografia.
2. ~~Il caso 01~~ — **tolto dalla home**, era troppo subito dopo la hero. Vive nel portfolio e nella
   pagina dei gestionali.
3. **Il problema** — resta, il testo a comparsa.
4. **Il confronto** — resta, con le due concessioni.
5. **Come lavoro** — il triangolo B resta; **i tre passi diventano una linea del tempo animata** in
   otto tappe, divise nei tre capitoli *prima capisco · poi costruisco · poi resto*. È il processo
   di [[docs/processo-cliente|processo cliente]] **come lo vive il cliente**: le regole interne —
   il cliente esiste solo col denaro, il tasso di chiusura — restano fuori.
6. **Cosa faccio** — **tre carte, una per pagina di servizio**: siti, Company Brain, gestionali e
   sistemi. Ognuna con la sua foto, e il bottone che porta alla pagina. Entrano a cascata e si
   inclinano col mouse.
7. ~~I sistemi per settore~~ — **tolti dalla home**, diventano la voce **«Prodotti»** del menù con
   la tendina. Deciso da Emanuele: buona idea, ma con meno peso.
8. **Lavori**, **domande**, **di persona** — restano. 9. **Chiusura** — resta, **senza il divisore «pagina dopo»**. E via la scheda volante di V2 che seguiva il mouse.

**Il linguaggio visivo, nato lo stesso giorno.** Ogni immagine del sito è **un oggetto del mestiere
su un tavolo scuro**, nella scala chiusa: il foglio degli ordini nella hero è il problema, e le tre
foto delle carte sono cosa lo sostituisce — il telefono accanto al menù di carta, il raccoglitore
del cervello aziendale, il tablet con gli ordini mentre i blocchetti stanno spinti da parte. Tutte
generate con Higgsfield, e tutte con una didascalia che dice un'idea, mai un documento vero.

## La home è montata — 20/09/2026

**Il file vero sta in `~/Desktop/progetti/emanueleboccia-it/`**, `index.html` più la cartella
`img/` con le quattro miniature e il ritratto, 144 KB di immagini in tutto.

**Com'è stata fatta, e va saputo.** V1 e V2 sono **build di produzione**: il CSS è minificato e il
JavaScript è un bundle Vite con GSAP, Lenis e Barba compilati dentro, coi nomi delle funzioni
accorciati. Il sorgente non è su questa macchina. Quindi la home è **V2 modificato**, non ricostruito:

- le animazioni sono **le stesse**, perché non è stato toccato il bundle. I blocchi nuovi si
  agganciano agli attributi che il bundle già cerca — `data-adatta`, `data-righe`, `data-riga`,
  `data-fuoco`, `data-elenco`, `data-magnetico` — e l'animazione se la prendono da soli;
- il CSS dei componenti nuovi e l'apertura delle domande stanno in un blocco in fondo al file,
  senza toccare quello esistente;
- la luce calda `#DAC7AB` è entrata come variabile `--luce` e sostituisce il crema nel bagliore
  della hero, nei raggi del triangolo e negli stati dei sistemi.

⚠️ **Una cosa aggiunta che non c'era.** Il calcolo che fa toccare i bordi al titolone sbordava di
qualche pixel sull'ultima lettera, sia da schermo grande sia da telefono. C'è un correttore che
rimpicciolisce finché la riga rientra, agganciato a un `ResizeObserver`: scatta ogni volta che il
bundle ricalcola, invece di sperare di arrivare dopo.

⚠️ **Finché il sorgente non salta fuori, ogni modifica è chirurgia su una build**, e non si può
ricompilare. Se il progetto di V1 e V2 esiste da qualche parte, il lavoro va spostato lì.

## 1 · Hero — i lavori · *V2 · promessa*

- Etichetta, in monospazio: `SITI, SOFTWARE E AI SU MISURA · TRA NAPOLI E IL VESUVIO`
- H1: **Prima capisco cosa vendi. Poi lo costruisco.**
- Sotto: *Se quella parte non è chiara, il sito mette online la confusione. Costruisco siti,
  software e automazioni AI per le attività della mia zona, comprese quelle della mia famiglia.*
- Sotto il titolo, **la striscia dei lavori**: quattro miniature affiancate, col nome in
  monospazio sotto ognuna. È il meccanismo della hero di V2.
- Bottoni: primario **Guarda un lavoro →**, secondario **Parliamone**.

⚠️ **Niente ritratto in hero.** Deciso il 20/09/2026, parole di Emanuele: la faccia non è quello
che un imprenditore viene a cercare. La faccia resta nel blocco 8, piccola, perché chi lo incontra
di persona e poi lo cerca deve riconoscerlo.

**L'immagine del «prima», dal 21/09/2026.** Sotto il titolo e sopra la striscia c'è una banda
larga: un foglio degli ordini scritto a mano, le righe evidenziate, una penna e due evidenziatori,
sul nero caldo con la luce da destra. Serviva perché la hero era **solo tipografia** — parole di
Emanuele: «non mi attira, è troppo pulito, tutto testo». Così il primo schermo dice la tesi intera:
il titolo, il foglio che pesa, e sotto i lavori.

⚠️ **È un'immagine generata, e non deve mai essere presentata come la prova di un lavoro.** Fatta
con Higgsfield (GPT Image 2.5) il 21/09/2026, nella scala chiusa di [[self/reference/design|design]]
e senza un colore fuori. La didascalia dice *«il pezzo di lavoro che si mangia la giornata»*, che è
un'idea, **non** «il foglio del Girarrosto», che sarebbe un documento inventato. È la stessa regola
dei numeri: la prova non si trucca, e un'illustrazione resta un'illustrazione.

⚠️ **Nota tecnica che è costata un giro.** Gli attributi del bundle — `data-righe` e `data-riga` —
**spezzano il contenuto in righe di testo**: messi su una figura con dentro un'immagine se la
mangiano e la mettono da parte in `data-originale`. Valgono solo sul testo. Un'immagine si anima
con altro, o non si anima.

⚠️ **Le quattro miniature vogliono foto vere.** Nei prototipi sono segnaposto grigi, e una hero
fatta di quattro rettangoli vuoti promette quattro lavori e non ne mostra nessuno.

## 2 · ~~Il lavoro, subito~~ — tolto il 21/09/2026

Non sta più nella home. Il testo del caso vive in [[projects/personal-brand/sito-pagine|le pagine del sito]],
alla voce del caso 01, e nella pagina dei gestionali.

## 3 · Il problema · *V2 · pain*

Il testo a comparsa che si rivela allo scroll, in maiuscolo gigante: è la sezione di V2 che
Emanuele ha indicato come quella che gli piace di più dopo la hero.

- H2: **Il lavoro che ti pesa non si organizza. Si toglie.**
- *In quasi ogni attività c'è un pezzo di lavoro che si mangia la giornata: gli ordini, le
  prenotazioni, i conti a fine sera, il foglio che passa di mano in mano. Di solito lo si organizza
  meglio — un quaderno più ordinato, un'app in più, un gestionale con cento funzioni pensate per
  qualcun altro. Il pezzo resta lì, e intanto costa.*

⚠️ È la [[self/reference/convinzioni|convinzione 2]], l'unica delle quattro con una storia completa,
ed è anche la prima riga della bio. Messa qui, chi arriva da Instagram ritrova la frase con cui è
partito.

## 4 · Di solito si fa così · *nuovo · squalifica*

La tabella a due colonne presa da stopidesign, che è la forma che funziona: righe corte, un
verdetto di due parole sotto ogni riga di sinistra.

- H2: **Di solito si fa così. Io faccio il contrario.**

| | Come si fa di solito | Come lo faccio io |
|---|---|---|
| **Da dove si parte** | dal sito, perché è la cosa che si vede — *ordine sbagliato* | da cosa vendi e a chi. Il sito viene dopo |
| **Cosa si compra** | un programma con cinquanta funzioni pensate per altri. **Vero: ce l'hai domani, e all'inizio costa poco** — *poi paghi anche quelle che non apri* | quello che vi serve, e niente di più |
| **Chi si adatta** | voi, al programma — *cambia il mestiere* | il programma, a come lavorate già |
| **Se serve una cosa nuova** | un abbonamento in più, o non si può fare. **Vero: a volte la chiede qualcun altro e arriva gratis** — *ma non decidete voi quale* | ve la costruisco |
| **Chi risponde** | un modulo di assistenza — *aspetti* | io |
| **Quanto dura** | finché pagate il canone — *non è vostro* | è vostro |

⚠️ **Due righe su sei ammettono qualcosa, ed è voluto.** Aggiunto il 21/09/2026 dopo aver letto
[[sources/riferimenti/marantoweb|Maranto]], che nella colonna del concorrente scrive «parziale»
invece di «no» su due righe. Una colonna che dice no a tutto si legge come scritta da chi vende;
concederne due rende credibili le altre quattro. **Si concede solo quello che chi legge già pensa**
— che un programma a canone ce l'hai domani e costa poco, e che ogni tanto una funzione nuova
arriva senza pagarla — e il verdetto risponde alla concessione invece di ignorarla. Le righe su
**chi risponde** e su **quanto dura** restano secche, perché lì non c'è niente da concedere che il
lettore creda davvero.

⚠️ **Niente terza colonna.** Valutata il 21/09/2026 e scartata: Maranto la usa perché sta in mezzo
fra l'agenzia cara e il fai-da-te, e in un confronto a tre il posto in mezzo è il più facile da
vincere. Emanuele in mezzo non ci sta — è l'opzione più cara e più lunga, quindi perderebbe la riga
del prezzo e quella dei tempi contro tutte e due, e inviterebbe proprio il paragone sul prezzo che
non può vincere. Il fai-da-te nel blocco c'è già un piano sotto: le tre righe strette qui in fondo
sono la pagina Facebook e il sito fatto fare all'AI, cioè le due forme che prende oggi.

⚠️ **A sinistra non c'è nessuno: c'è un modo di fare.** Nessuna agenzia, nessuna categoria di
professionisti, nessun concorrente. È la regola sui nemici di
[[self/reference/convinzioni|convinzioni]] — si attaccano idee — ed è anche la ragione pratica:
le agenzie da sessantamila euro non sono i concorrenti di Emanuele. I suoi sono il gestionale a
canone, la pagina Facebook al posto del sito e il template fatto fare all'AI.

Sotto la tabella, tre righe strette, una per alternativa, dalla vecchia sezione 4:

- **La pagina Facebook al posto del sito.** *Sembra gratis e costa il controllo: non decidi tu il
  dominio, i contatti, cosa vede chi arriva.*
- **Il sito bellissimo che non dice niente.** *Animato, curato, e chi lo apre non capisce cosa
  vendi. Una cosa bella che comunica male non vale niente.*
- **Il sito fatto fare all'AI.** *Senza niente a monte somiglia ad altri mille: non ti distingue,
  ti allinea. L'AI la uso tutti i giorni, ma dopo aver capito cosa devi dire.*

⚠️ Se il blocco diventa lungo, **le tre righe si tolgono prima della tabella**, non dopo: la
tabella è la parte che fa collocare chi legge.

## 5 · Come lavoro · *V2 + copy · spiegazione*

- H2: **Lavoro dove si incontrano tre cose.**
- **Il triangolo, versione B**, scelta il 20/09/2026: **Marketing** in alto, **Codice** a sinistra,
  **Design** a destra, e **l'AI al centro**, collegata a tutte e tre con tre linee sottili.
- Sotto: *L'AI non è una delle tre. Passa dentro tutte e tre, e ci passa dopo: prima si capisce
  cosa devi dire.*

⚠️ **Perché B e non A.** In V2 l'AI era un vertice, cioè un terzo del mestiere: detta così insegna
a chi legge che Emanuele è «quello dell'AI», che è il [[self/reference/convinzioni|nemico 4]],
l'AI usata senza coscienza. Al centro invece dice come la usa davvero. E rimette il design fra le
tre, che nel suo percorso c'è dai quattordici anni.

Poi i tre passi, sempre in quest'ordine:

- `01` **Prima capisco.** *Vengo da te, guardo come lavorate e ti faccio le domande che servono:
  cosa vendi, a chi, cosa devi dire. Se vuoi andare a fondo, lo mettiamo per iscritto in una
  cartella che resta a te. La chiamo il cervello aziendale.*
- `02` **Poi costruisco.** *Il sito, il gestionale o l'automazione che serve, e niente di più.
  Somiglia a come lavorate già, così nessuno deve cambiare mestiere per usarlo.*
- `03` **Poi resto.** *Nei mesi dopo la consegna lo usate davvero, e viene fuori cosa aggiungere o
  togliere. Ci lavoro finché l'abito non vi veste.*
- Bottone: **Vedi come lavoro →**

## 6 · Cosa faccio · *nuovo + copy · pitch*

- H2: **Cosa costruisco.**
- Le voci dell'offerta, strette, una riga ciascuna: **siti**, **software su misura**,
  **automazioni con l'AI**, **sistemi interni di gestione**, **ottimizzazione dei processi**, e
  **il Company Brain**.

**Il Company Brain entra nei servizi.** Chiesto da Emanuele il 20/09/2026, ed è una cosa a cui
tiene: la costruzione del cervello aziendale del cliente — strategia, offerta, clienti,
concorrenti — messa per iscritto in una cartella che resta a lui. Non è nuovo nel vault: è già la
prima voce del [[self/tariffario|tariffario]] e sta dentro il passo `01` del blocco 5. Nuovo è
che diventa **un servizio con un nome**, invece di una fase del lavoro.

✅ **Si chiama Company Brain, e il nome è deciso.** Parole di Emanuele il 20/09/2026: *«Company
Brain così si chiama»*. La domanda era se l'inglese reggesse, visto che lo stesso mese
«bocciaworks» è stato scartato proprio perché i clienti della zona con l'inglese non vanno
d'accordo. La risposta è che **qui è un prodotto e non un'insegna**: un prodotto può avere un nome
suo, e il nome dell'insegna resta quello di Emanuele. ⚠️ Nel parlato però resta anche «il cervello
aziendale», che è come lo chiama lui coi clienti: in pagina conviene che la prima volta compaiano
tutti e due, `Company Brain` con accanto cosa vuol dire.

**La garanzia.** Chiesta da Emanuele il 20/09/2026: sul sito si deve vedere che il cliente porta
a casa **un risultato concreto e misurabile**, detto in modo pratico. Due forme diverse:

- **sui sistemi e sui gestionali** — il risultato è il lavoro tolto, e si misura: l'ordine che si
  cerca invece di rileggerlo, il conto che si fa da solo, il menù che si aggiorna in un posto. È
  garantibile perché dipende da quello che consegna lui;
- **sui siti** — parole sue, «un sito imbattibile a livello di design, copy e marketing».

⏸️ **20/09/2026 — la garanzia è stata parcheggiata insieme alla rottamazione**, parole di
Emanuele: «da vedere bene insieme alla rottamazione». Ha senso, perché sono la stessa leva
commerciale vista da due lati — cosa ti do e cosa ti prendo indietro — e perché tutte e due
dipendono dal tariffario rifatto a fasce. Sta in [[self/reference/offerta|offerta]]. Quello che
segue resta scritto perché è il nodo da sciogliere quando si riprende.

⚠️ **La prima forma regge, la seconda no, e la differenza è tutta nel verbo.** «Ti tolgo il foglio
degli ordini» è una consegna: o c'è o non c'è, e si verifica il primo giorno. «Imbattibile» è un
aggettivo, e [[self/reference/tono|tono]] dice che ogni affermazione deve mostrare una differenza
prima-dopo dimostrabile. Va riscritta in qualcosa che si possa misurare — il tempo di
caricamento, le richieste che arrivano, quello che il cliente riesce a cambiare da solo — oppure
diventa la cosa che il visitatore scarta senza leggerla.

⚠️ **E va incastrata con la domanda `06`**, che dice *«mi garantisci più clienti? No, e chi te lo
garantisce sta vendendo un'altra cosa»*. Le due non si contraddicono se la garanzia riguarda
**quello che consegni**, non **quello che succede nel mercato dopo**: e allora vanno scritte in
modo che si vede che è così, una accanto all'altra, non a due schermi di distanza.

⚠️ **Questo blocco è nuovo e serve a due cose.** La prima è che chi arriva senza conoscerlo capisca
in dieci secondi cosa si compra. La seconda è che oggi **nessuna riga del sito può uscire su
Google** per quello che vende: i casi non nominano il servizio. Non è una pagina servizi — quella
resta esclusa — è una striscia dentro la home.

~~I tre sistemi per settore~~ — dal 21/09/2026 non stanno più qui: sono la voce «Prodotti» del menù.

## 7 · Le domande · *V1 · pitch*

Le sette domande del prototipo V1, che Emanuele ha indicato come la cosa migliore dei due file.
Numerate, ad accordion. La 02 è l'unica rifatta: quella di V1 spiegava «il marketing è un ramo
obbligatorio», che è il messaggio di agosto e non c'è più.

- `01` **Da dove si parte, di solito?** *Da una cosa che non funziona adesso: le prenotazioni che
  arrivano solo per telefono, il menù aggiornato a mano, le richieste che si perdono. La prima
  chiamata serve a capire se ha senso, non a vendere.*
- `02` **Perché prima vuoi capire cosa vendo?** *Perché il sito è un megafono. Se quello che dici
  non è chiaro, metterlo online non lo chiarisce: lo fa sentire a più gente. Prima si sistema cosa
  dici, poi lo si moltiplica.*
- `03` **Lavori solo con imprese della zona?** *Di solito sì, ed è una scelta. Vedere il posto,
  parlare con chi ci lavora e capire com'è fatta la giornata cambia il risultato più di qualunque
  chiamata.*
- `04` **Perché non hai un listino?** *Perché due lavori che si chiamano «sito» possono essere due
  lavori diversi. Ti do un numero dopo la prima chiamata, quando so cosa c'è dentro, e quel numero
  non si muove in corsa.*
- `05` **Quanto tempo serve?** *Dipende da quanto materiale c'è già. La parte lenta quasi mai è il
  codice: sono le foto, i testi e le decisioni. Te lo dico all'inizio, con le date.*
- `06` **Mi garantisci più clienti?** *No, e chi te lo garantisce sta vendendo un'altra cosa. Quello
  che posso mostrarti è cosa succedeva prima e cosa succede dopo, con i numeri che hai già in casa.*
- `07` **Dopo la consegna, chi tiene in piedi le cose?** *Tu, se vuoi. Consegno con le istruzioni e
  faccio vedere come si fa, di persona. Se preferisci che me ne occupi io, si mette per iscritto
  quanto e per quanto tempo.*

⚠️ **La 07 chiude il confine di «Poi resto»**, quello lasciato aperto dalla
[[self/reference/convinzioni|convinzione 4]]. Non espone una durata sul sito e dice che il confine
esiste e sta per iscritto: è la forma che Emanuele voleva, ed era già scritta da lui in V1.

## 8 · Di persona · *copy · pitch*

- H2: **Tra Napoli e il Vesuvio, di persona.**
- *Sono Emanuele Boccia. Faccio grafica da quando avevo quattordici anni, poi sono venuti i siti,
  poi il codice, oggi il marketing, e ogni passo contiene quelli prima. Alcuni lavori che vedi qui
  sono per le aziende della mia famiglia: lì gli errori li pago io.*
- *Il lavoro lo faccio io, e parli con me dall'inizio alla fine: non c'è nessuno in mezzo che ti
  riporta quello che ho detto.*
- **Qui la faccia, piccola.** Non è il ritratto grande di V1: è il formato riconoscimento, per chi
  lo incontra di persona e poi lo cerca.

## 9 · Chiusura · *V1 + V2 · azione*

- Card: **Partiamo dal problema che c'è adesso.** *Scrivimi cosa non funziona. La prima chiamata
  serve a capire se ha senso.* Una sola azione: **Scrivimi →**

**Il piede**, col colophon di V2 che vale la pena tenere: `EMANUELE BOCCIA` · siti, software e AI
su misura · tra Napoli e il Vesuvio · WhatsApp · Instagram · `P. IVA 10693201211` · privacy ·
cookie. **Niente email nel piede**, deciso il 20/09/2026: i canali sono WhatsApp e il form. E sotto, in monospazio piccolo: i caratteri con la loro licenza, com'è fatto il sito,
dove sta.

⚠️ **Il colophon non è vezzo da designer**: dice a chi compra siti che questo sito è fatto da
qualcuno che sa cosa ci ha messo dentro. Su un sito di chiunque altro si toglie; su questo è prova.

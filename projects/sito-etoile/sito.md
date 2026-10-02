---
title: "Il sito nuovo di L'Étoile"
summary: "Il sito di L'Étoile rifatto dal 02/10/2026 insieme a un assistente che aggiorna il magazzino parlando, perché in negozio nessuno ha il tempo di curare il sito. Qui la proposta di sitemap a mondi — Donna, Uomo, L'Étoile Voyage, Beauty, Regali, Marchi — e i cinque percorsi dei clienti, uno per pubblico. Proposta, non ancora approvata."
tags:
  - projects
  - siti
status: in-lavorazione
created: 2026-10-02
updated: 2026-10-03
related:
  - "[[entities/clienti/l-etoile/scheda]]"
  - "[[entities/clienti/l-etoile/brand-book]]"
  - "[[docs/web-design/processo-in-cinque-step]]"
  - "[[docs/web-design/pagine-di-un-sito-locale]]"
  - "[[projects/personal-brand/girato-etoile]]"
---

# Il sito nuovo di L'Étoile

Chi è il cliente sta nella [[entities/clienti/l-etoile/scheda|scheda]], come parla il brand nel
[[entities/clienti/l-etoile/brand-book|brand book]], i problemi del sito vecchio con i numeri nello
[[entities/clienti/l-etoile/storico|storico]] al 02/10/2026. Il prima, fotografato per il reel, sta in
[[projects/personal-brand/girato-etoile|il prima di L'Étoile]]. Le decisioni, con la data, in `MEMORY.md`.

## Perché

In negozio non c'è nessuno dedicato al sito, e il sito «sta lì a morire»: lo dice Emanuele il 02/10/2026. Il
lavoro quindi è doppio. **Un sito nuovo**, e **un assistente di magazzino a cui le cugine parlano** — «questo è
finito, toglilo», oppure una lista di prodotti con le foto — perché il sito resti aggiornato senza che nessuno
debba aprire il pannello.

## La piattaforma, da decidere

La tendenza al 02/10/2026 è **restare su Shopify come motore e rifare tutto il tema**, partendo dal codice in git.
Il motivo è l'assistente: Shopify ha dal maggio 2026 un connettore ufficiale per Claude che crea e modifica
prodotti, immagini, quantità, collezioni e codici sconto. Sarebbe un'eccezione alla decisione del 26/08/2026 in
[[docs/web-design/custom-o-wordpress|custom o WordPress]], che manda gli e-commerce su WordPress, e se si prende
va scritta come tale. Su WordPress il negozio sarebbe WooCommerce, cioè un plugin.

Prima di decidere va chiesto **cosa usano in cassa**: se la vendita in negozio non scala la quantità sul sito,
il sito torna a morire anche con l'assistente.

## Come funziona, nel pratico

Spiegato a Emanuele il 02/10/2026, se si resta su Shopify. Sono quattro pezzi.

- **Shopify è il motore:** magazzino, pagamenti, Klarna, spedizioni. Le cugine non aprono più il pannello.
- **Ogni prodotto ha le sue etichette** — marca, tipo, per chi, colore, prezzo — e **le pagine del sito sono
  regole, non elenchi fatti a mano**: le collezioni automatiche di Shopify. «Donna › Borse a spalla» è tipo
  borsa a spalla più per chi donna; «Regali fino a 50 €» è prezzo sotto 50; «Saldi» è chi ha il prezzo barrato;
  «Marchi › Piquadro» è marca Piquadro. Un prodotto con le etichette giuste compare da solo in tutti i posti
  giusti. Oggi succede il contrario: i prodotti si mettono a mano in cinque collezioni, e 266 sono rimasti fuori.
  I colori dello stesso modello diventano varianti di un prodotto solo, e i doppioni uniti lasciano un
  reindirizzamento, perché i link vecchi non si rompano.
- **L'assistente è Claude col connettore ufficiale e un manuale** scritto da Emanuele in un progetto Claude: come
  si chiama un prodotto, che etichette prende, e che nasce in bozza e si pubblica solo dopo il riepilogo.
- **Il sito è un tema scritto da Emanuele** nel codice in git, con un modello di pagina per ogni mondo e lo stesso
  carrello per tutti. Si costruisce come tema non pubblicato dentro lo stesso Shopify: il vecchio resta online
  finché non si pubblica il nuovo. I banner della home vengono da campi che l'assistente può cambiare, da provare.

**I consigli e i kit**, chiesti da Emanuele il 03/10/2026: chi mette un prodotto nel carrello o in valigia vede
subito quello che ci va con. Di base sono automatici, ma le cugine possono dire all'assistente un abbinamento o un
kit, e da lì vale quello.

La valigia di Voyage è uno sconto automatico di Shopify per quantità, e la valigia disegnata lo fa solo vedere.
Il buco resta la cassa: se le vendite in negozio non passano da Shopify, la quantità sul sito la tiene giusta
solo qualcuno che dice «venduta» all'assistente.

## La sitemap

È il secondo dei [[docs/web-design/processo-in-cinque-step|cinque step]], fatto sull'analisi del catalogo del
02/10/2026. Gli appunti, sulle [[docs/web-design/pagine-di-un-sito-locale|pagine di un sito locale]], vogliono
landing separate quando si parla a target diversi: qui i target sono cinque, e ognuno ha il suo mondo.

```
Home — il bivio, per chi arriva senza sapere cosa cerca
│
├── Donna                     ~375 prodotti
│   ├── Borse: a mano · a spalla · a tracolla · shopping · mini e pochette
│   ├── Zaini
│   ├── Portafogli
│   └── Mare                  ~100, da maggio a settembre
│
├── Uomo                      ~125, quasi tutti oggi fuori dal menu
│   ├── Per il lavoro: zaini porta PC · borse e cartelle
│   ├── Ogni giorno: portafogli · portacarte · borselli
│   └── In viaggio → porta a Voyage
│
├── L'Étoile Voyage           ~50 online, il resto da chiedere
│   ├── Per quanto parti: un weekend (cabina) · una settimana (media) · più a lungo (grande) · in famiglia (set)
│   ├── Bambini
│   ├── Borsoni e zaini da viaggio
│   ├── Accessori da viaggio
│   └── La valigia da riempire
│
├── Beauty                    30, viso e capelli
│   └── Il Parfum Bar: i profumi si scoprono in negozio
│
├── Regali
│   ├── Per lei · per lui · per chi parte · per i bambini
│   ├── Per budget: fino a 30 € · fino a 50 € · fino a 100 € · fino a 200 € · oltre
│   ├── Per occasione, a calendario
│   └── La confezione regalo
│
├── Marchi                    una pagina per marca
├── Novità · Saldi            i 132 prodotti già scontati
│
├── Chi siamo e dove siamo    il negozio, Voyage, il Parfum Bar, le persone
├── Recensioni                4,7 su Google, 147 recensioni
├── Contatti e WhatsApp
└── Spedizioni e resi · Privacy · Cookie
```

Nel menu in alto stanno i sei mondi: **Donna · Uomo · Voyage · Beauty · Regali · Marchi**. Novità e Saldi stanno
dentro Donna e Uomo e nella home; le pagine del negozio stanno nel piede.

## I percorsi, uno per pubblico

È il terzo step: che pagina vede, che azione fa, dove va dopo. La regola che li tiene insieme viene da
[[docs/web-design/partire-dalla-hero|partire dalla hero]]: la prima pagina si allinea a quello che la persona ha
fatto prima di arrivare. **Il bivio della home è solo per chi arriva senza sapere cosa cerca.** Un post porta
alla sua borsa, una pubblicità al suo mondo, un messaggio WhatsApp del negozio al prodotto.

### Chi fa un regalo

Non sa cosa prendere; sa per chi e quanto vuole spendere. Le recensioni Google lo dicono con le loro parole:
«sono andato per fare un regalo, le ragazze sono state super gentili ad aiutarmi a scegliere in base ai gusti».
Il percorso porta online quell'aiuto.

Home o post di una festa → **Regali** → per chi → quanto → tre o quattro proposte, non trecento → la scheda, con
la confezione regalo → carrello. A ogni passo c'è un'uscita: «Raccontaci a chi è, ti diamo tre idee su
WhatsApp». Il catalogo regge tutte le fasce: fra i disponibili, 71 prodotti sotto i 30 €, 78 fra 30 e 50, 168
fra 50 e 100, 215 fra 100 e 200, 73 sopra.

### L'uomo che si fa un regalo

Compra di rado, sa cosa ci porta dentro — il PC, i documenti, solo l'essenziale — e vuole una cosa che duri e
faccia figura al lavoro. Emanuele è questo cliente: «per me sarebbe fighissimo avere una sezione dedicata a me».

Post, pubblicità o Google «zaino Piquadro porta PC» → **Uomo**, con un tono suo: il lavoro, lo stile → per il
lavoro o per ogni giorno → la scheda con le cose che contano a lui: misure, quanto è grande il PC che ci entra,
materiale → acquisto. Le misure e i materiali di Piquadro ci sono già, nelle descrizioni.

### La donna che cerca la sua borsa

Sa cosa le piace, guarda il marchio, il colore, la novità. Spesso la borsa l'ha già vista su Instagram, dove i
post la raccontano per colore: «L'ottanio si prende la scena».

Il post → **la borsa**, con gli altri colori come varianti e non come prodotti diversi → acquisto, o WhatsApp
«ce l'avete in negozio?». Chi invece arriva per guardare entra da **Donna** e scorre per tipo, con le novità in
testa.

### Beauty e profumi

Acquisti piccoli, che si rifanno. Online ci sono viso e capelli, fra 4,50 e 40 €. I profumi in negozio ci sono,
online no: il **Parfum Bar** diventa una pagina che porta in negozio, finché non si sa perché i profumi non sono
online.

### Chi parte

Ha una data e un dubbio: che misura, e se in cabina gliela fanno passare. **L'Étoile Voyage** è il mondo con
l'estetica più sua, perché è un negozio nuovo e un lancio.

Post o pubblicità di Voyage → **Voyage** → «per quanto parti?» → la valigia → **la valigia da riempire**:
accessori da viaggio che entrano dentro, e uno sconto che sale man mano → carrello. Per riempirla servono
prodotti: online oggi ci sono un beauty case e un borsone, il resto va chiesto.

## Il prototipo

Dal 02/10/2026 c'è un prototipo cliccabile in `~/Desktop/progetti/etoile/`, coi 696 prodotti veri del catalogo
di quel giorno: si apre con la configurazione `etoile` dell'anteprima. Fa vedere la sitemap e i percorsi qui
sopra nella forma che avranno, con lo stile proposto in [[docs/web-design/stile-lussuoso|stile lussuoso]]: il
font e il marrone del loro marchio, l'arco delle loro foto come cornice, un colore per ogni mondo. Il pagamento
non c'è, si ferma al carrello. Cosa è vero e cosa è inventato per farlo vedere sta in `MEMORY.md`.

## Da chiedere a Maria Grazia

Cosa usano in cassa; chi carica i prodotti e quanti ne entrano a settimana; cosa vende Voyage oltre ai trolley,
e se è un negozio a parte; perché i profumi non sono online; se fanno la confezione regalo e il ritiro in
negozio; quanto vende oggi il sito.

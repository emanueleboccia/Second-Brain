---
title: "Personal brand — il blog del sito"
summary: "Il blog di emanueleboccia.it, montato il 30/09/2026 sull'impostazione di blog.dubleclik.com ma nello stile del sito: un articolo a settimana, scritto con le parole di Emanuele. Come si scrive un articolo, come si pubblica, perché sta su /blog/ e non su un sottodominio, e i temi proposti per i primi."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-30
updated: 2026-10-01
related:
  - "[[projects/personal-brand/sito]]"
  - "[[self/reference/tono]]"
  - "[[self/reference/caption]]"
  - "[[self/reference/convinzioni]]"
  - "[[projects/personal-brand/MEMORY]]"
---

# Personal brand — il blog del sito

> Chiesto da Emanuele il 30/09/2026: «una sezione blog dove ogni settimana ti dico qualche novità o
> qualcosa che penso, in base a quello che facciamo e al mio mestiere». Il riferimento per
> l'impostazione è [blog.dubleclik.com](https://blog.dubleclik.com/), «ovviamente con il nostro stile
> e le nostre animazioni». La regola sui testi è sua: «scritti secondo le mie modalità, non si deve
> capire che è scritto con l'intelligenza artificiale, con il mio tono, molto terra terra».

## Com'è fatto

- **L'elenco**, `/blog/`: titolo grande con l'anno in filigrana dietro, come nel riferimento; l'ultimo
  articolo in una scheda, col numero in grande; poi l'archivio, una riga per articolo con numero,
  categoria, titolo, data e freccia. Sotto il mouse una riga si accende e le altre si spengono.
- **L'articolo**, `/blog/<nome>/`: la riga dei dati (numero, categoria, data, minuti di lettura), il
  titolo con le parole che entrano una per una, il sommario, il testo in una colonna sola, la firma in
  fondo con la faccia, e le schede «Quello prima» e «Quello dopo».
- **Il feed**, `/blog/feed.xml`, per chi legge coi lettori. E i dati per Google di ogni articolo.
- **Le voci «Blog» nel menù**, in alto, nel menù del telefono e nel piede, compaiono da sole quando
  c'è almeno un articolo online. Finché non ce n'è uno, del blog sul sito non c'è traccia.
- **Gli articoli sono file Markdown** in `src/contenuti/blog/`, uno per articolo; il nome del file è
  l'indirizzo. In cima titolo, data, categoria, sommario, e `bozza: sì` per tenerlo fuori. Il numero
  segue la data: il primo scritto è il Nº 001. Come si scrive sta nel `README.md` della cartella.
- Le pagine le scrive `strumenti/blog.mjs`, chiamato da `genera-pagine.mjs` a ogni build. Per far
  funzionare la voce del menù, i pezzi di `src/parziali/` ora possono richiamarne altri.

Controllato a nove misure, dal computer a 1920 al telefono da 320: niente fuori schermo, niente righe
di una o due parole. Il titolo dell'elenco si misura come la hero (`data-adatta-blocco`) sul computer;
sul telefono la misura la dà il CSS, perché «lavorando.» deve entrare in una riga anche a 320 pixel.

## Come si scrive e come si pubblica

1. Emanuele racconta la cosa: un vocale, quattro righe, una chat. Con le parole sue.
2. Claude scrive la bozza **tenendo le frasi sue**, nel file Markdown con `bozza: sì`, e la fa
   vedere con `npm run anteprima`. Valgono [[self/reference/tono|il tono]], la regola del prima e dopo di
   [[self/reference/caption|caption e formati]] e «Come non si scrive mai» del `CLAUDE.md`: niente
   guru, niente liste dove basta una frase, niente chiusure motivazionali, niente «non si tratta di».
   Paragrafi corti, e un articolo dice una cosa sola.
3. Lui legge e corregge. Si toglie `bozza: sì` e si porta in WordPress: `node strumenti/tema.mjs` ne fa
   un file in `pagine/_articoli/`, si carica col file manager, e da **Pagine → Dal progetto** si preme
   «Importa gli articoli che mancano». Con la data nel futuro esce da solo quel giorno.

**Dal 01/10/2026 gli articoli sono articoli di WordPress**, chiesto da Emanuele per l'ordine e per Google. Si
possono anche scrivere e correggere direttamente nella bacheca, in *Articoli*: il blog li compone dentro la grafica
del sito, con numero, categoria, data e minuti. Una volta importato, **il testo vero è quello in WordPress**: il
Markdown del progetto resta come prima stesura, e un articolo già importato non si reimporta. Il feed è `/feed/`,
quello di WordPress; titolo e descrizione per Google stanno nel riquadro *Su Google* di ogni articolo.

## Perché `/blog/` e non `blog.`

Emanuele ha chiesto perché dubleclik ha il blog su un sottodominio. Letto il 30/09: il sito
principale, `dubleclik.com`, gira su Framer; il blog è un'applicazione a parte, su Cloudflare, con un
accesso per chi scrive e la ricerca. Due piattaforme diverse non possono stare sullo stesso dominio
nella stessa cartella senza un proxy in mezzo: il sottodominio è la via comoda, non una scelta di
marketing. Per un sito che parte da zero conviene il contrario: Google tratta un sottodominio quasi
come un sito a sé, e gli articoli su `/blog/` fanno crescere il dominio principale a ogni pezzo. Qui
il blog sta dentro il sito, con la stessa testata e lo stesso piede.

## La prima bozza, e i temi proposti

Per vedere le pagine c'è `il-foglio-degli-ordini.md`, in bozza: il caso del Girarrosto riscritto in
prima persona, con le frasi già approvate della pagina del progetto. **Non è il primo articolo**: è
un segnaposto dichiarato, e si sostituisce col primo scritto sulle parole sue.

Temi proposti il 30/09, da cose che ha già detto o deciso: perché sul sito non c'è il listino; una
cosa bellissima che comunica male non vale niente; il preventivo fatto a sensazione; la pagina
Facebook usata come sito; cosa fa l'AI nel suo lavoro; una festa, un calendario, a Da Mamma Rosaria.

**Ne ha scelti tre, lo stesso giorno**, e ha dettato il contenuto di ognuno con una risposta: «falle
correggere, scrivile meglio, sempre con il mio tono». Le bozze sono scritte su quelle parole, e i
tre temi vengono da [[self/reference/convinzioni|le convinzioni]]: la terza, e i nemici uno e quattro.
Come entra il blog nel resto del sito sta in [[projects/personal-brand/sito|il sito]].

| File | Le sue parole, il 30/09 | Nº e data di prova |
|---|---|---|
| `una-cosa-bellissima-che-comunica-male.md` | il sito vecchio di Da Mamma Rosaria «comunicava troppe cose insieme», «parli a troppi pubblici diversi» e «vai a sminuire»; il danno vero è quando ci metti i soldi di una sponsorizzata o di un'agenzia sopra una cosa comunicata male | 001 · 6 ottobre |
| `il-preventivo-fatto-a-sensazione.md` | i preventivi in giro «promettono cose assurde pur di chiuderti»; «ogni persona ha esigenze e problematiche diverse», «il prezzo deve sempre variare in base al problema, non esiste un prezzo base per tutti» | 002 · 13 ottobre |
| `cosa-fa-l-ai-nel-mio-lavoro.md` | «il mio bonus»; «lo strumento è la punta dell'iceberg», «altrimenti sei una pecora in mezzo al gregge»; il sito bellissimo «non comunicherà mai come comunica un copywriter»; il gestionale «lo scrivo su un foglio di carta» | 003 · 20 ottobre |

Il caso del Girarrosto, `il-foglio-degli-ordini.md`, resta in bozza come quarto, al 27 ottobre.

✅ **Dal 03/10/2026 «Il foglio degli ordini» è programmato per giovedì 8 ottobre alle 8**, per tenere un articolo a
settimana dopo che i tre sono usciti tutti entro il 2. Tolta la bozza, data spostata all'8, e «un girarrosto» nel primo
paragrafo porta al caso del Girarrosto. Importato da Pagine → Dal progetto; Yoast verde, frase chiave «foglio degli
ordini». ⚠️ Emanuele non l'ha ancora riletto: se cambia qualcosa, si corregge in WordPress prima dell'8.

✅ **I tre articoli sono online dal 30/09/2026**, tolti dalle bozze su richiesta di Emanuele: «il blog l'avevamo
già fatto con 3 articoli, inseriscilo». Il menù, il piede e la mappa del sito hanno la voce Blog. **Le date sono
1, 8 e 15 ottobre**, un giovedì a settimana dal giorno del lancio: il primo è uscito, il secondo e il terzo sono
programmati in WordPress ed escono da soli, alle 8 del mattino.

✅ **Dal 02/10/2026 sera sono online tutti e tre.** Emanuele li ha letti e ha detto «pubblicali ora, vanno bene»:
il preventivo e l'AI escono il 2 ottobre, a un minuto l'uno dall'altro per tenere l'ordine. Nel progetto le loro date
sono allineate. Lo stesso giorno, per Yoast, ogni articolo ha avuto un link interno senza cambiare parole: «Da Mamma
Rosaria» al caso del sito, «una prima chiamata» alla Consulenza, «Il gestionale delle feste della Masseria» al suo caso.
⚠️ **I link stanno solo in WordPress**, che per gli articoli è la fonte: i `.md` del progetto non li hanno.

**La pagina del Blog ha in fondo «Di cosa scrivo»**, tre paragrafi aggiunti il 02/10/2026 per arrivare alle 300
parole che Yoast chiede, e la frase in testa dice «In questo blog». Stanno in `strumenti/blog.mjs`.

⚠️ Nell'articolo sull'AI non si dice che gli articoli si scrivono con l'AI, e non si nomina nessuno
strumento: la regola sua è che «non si deve capire». E dentro non c'è nessun numero che non abbia
detto lui: i dieci giorni del gestionale della Masseria sono i suoi.

## Aperto

- il titolo dell'elenco, «Cose che ho capito lavorando.», e la riga sotto: scritti da Claude, da far
  leggere a Emanuele;
- le categorie: per ora «Il mestiere», «Siti», «AI» sono solo di prova. Si decidono coi primi articoli;
- ~~le tre bozze aspettano le sue parole~~: online dal 30/09, articoli di WordPress dal 01/10 coi giorni veri;
- le foto negli articoli vanno in `public/img/blog/`: nessuna ancora.

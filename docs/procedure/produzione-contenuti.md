---
title: "Procedura — produzione contenuti"
summary: "Come un contenuto va dalla scheda della macchina fino a pubblicato, per i tre brand di famiglia e il personal brand: cosa tiene l'SSD, cosa Drive, cosa Buffer e cosa il vault, i quattro stati che un contenuto attraversa e il gesto che chiude il giro."
tags:
  - docs
  - procedure
  - contenuti
status: attivo
created: 2026-09-07
updated: 2026-09-10
related:
  - "[[areas/da-mamma-rosaria/reference/regole-editoriali]]"
  - "[[areas/da-mamma-rosaria/reference/caption]]"
  - "[[self/tariffario-famiglia]]"
  - "[[docs/registro-strumenti]]"
---

# Procedura — produzione contenuti

> Scritta il 07/09/2026, il giorno in cui l'SSD è stato riorganizzato davvero. Non descrive
> un'intenzione: descrive dove stanno le cose adesso.

Vale per **quattro brand**: Da Mamma Rosaria, Tenuta Don Gaetano, La Masseria di Mezz'autunno
e il personal brand. La forma è identica per tutti e quattro, ed è il motivo per cui si impara
una volta sola.

## I quattro sistemi, una riga ciascuno

| | Cosa tiene | Perché lì |
|---|---|---|
| **SSD** | il pesante e il non finito | i video crudi nel cloud non ci stanno |
| **Drive** | il finito, e quello che devono vedere gli altri | è l'unico posto che non è sulla mia scrivania |
| **Buffer** | cosa esce e quando | è l'unico che lo sa davvero — vedi [[docs/registro-strumenti|registro degli strumenti]] |
| **Il vault** | il piano, le regole e il perché | è l'unico che si rilegge fra sei mesi |

**Nel dubbio su dove mettere una cosa, la domanda è una:** serve a me per lavorare, o serve a
qualcun altro per guardare?

## L'SSD

```
SSD-MANU/
├── 00-SCARICO/          dji · sony · iphone
├── 01-DA-MAMMA-ROSARIA/
├── 02-TENUTA-DON-GAETANO/
├── 03-LA-MASSERIA-DI-MEZZ'AUTUNNO/
├── 04-PERSONAL-BRAND/
└── 99-ARCHIVIO/
```

Dentro ogni brand, sempre le stesse quattro:

```
1-eventi/          il girato crudo, una cartella per evento
                   (nel personal brand si chiama 1-girato)
2-libreria/        il buono, tirato fuori dagli eventi e ordinato per soggetto
3-in-produzione/   una cartella per contenuto, con dentro caption.md
4-pubblicati/      ci finisce il giorno che esce, sotto l'anno-mese
```

**Il numero davanti dice a che punto sei.** Per trovare una cosa ti fai una domanda sola: è
grezza, è buona, la sto facendo, o è già uscita?

⚠️ **`2-libreria` si chiama così apposta.** Prima si chiamava «in lavorazione», e il nome
sbagliato è il motivo per cui ci finiva dentro di tutto: lì non si lavora, si va a **prendere**.

## Drive

Dentro la cartella Social di ogni brand — **`98 Social` per tutti e tre i brand di famiglia**,
`Social` dentro `02 AREE / 04 Personal Brand`:

⚠️ **Corretto il 10/09/2026.** Qui c'era scritto «`97 Social` per Mamma Rosaria, `04 Social` per
la Tenuta»: erano sbagliati due su tre. Su Drive si chiamano tutti `98 Social`.

```
01 pubblicati/     per anno-mese, la copia di quello che è uscito
02 profilo/        quello che sta sul profilo ADESSO: storie in evidenza, template
03 report/         le misure, una cartella per mese
```

**`02 profilo` è l'unica cartella dove le cose si sovrascrivono** invece di accumularsi: quello
che sta sul profilo è uno solo alla volta.

Il grezzo su Drive non sale mai: sono terabyte e non li apre nessuno.

## Buffer — la pubblicazione si verifica, non si dà per fatta

I passaggi per mandare online un contenuto pronto — controlli, immagini, creazione del post e
verifica — stanno in [[docs/procedure/pubblicare-un-post|pubblicare un post]]. Qui sotto c'è solo
la trappola che ha reso necessaria quella procedura.

⚠️ **Scoperto il 10/09/2026 su un carosello di Mamma Rosaria.** Il post era programmato su
Instagram e Facebook. Facebook è uscito, Instagram no — ma **su Buffer risultavano tutti e due
`sent`**, con la stessa spunta verde e la stessa ora.

**Il segnale che distingue un post davvero pubblicato da uno fantasma** non è lo stato: è il
**link al post**. Un post arrivato davvero ha `externalLink` valorizzato e fra le azioni
disponibili «vedi post», «condividi link» e «copia link». Quello mai atterrato non ha nessuna
delle quattro, pur dicendo `sent`.

Il fantasma nasce dai post in modalità **notifica** — il badge «Notified» nel calendario: Buffer
manda l'avviso sul telefono e considera chiuso il suo compito, che tu poi pubblichi o no.
**Un post in modalità notifica non è un post programmato: è un promemoria.**

**Come si rimedia:** il fantasma non si può rilanciare, perché per Buffer è già andato. Se ne
crea uno nuovo sullo stesso canale, in modalità **automatica** e non a notifica.

⚠️ **E qui c'è la scorciatoia che vale la pena sapere.** Le API di pubblicazione — Buffer come
la Graph API di Instagram — non accettano file dal disco: vogliono un **URL pubblico** da cui
scaricare l'immagine. Ma un'immagine già caricata su Buffer una volta **resta sui suoi server
con un indirizzo pubblico**, leggibile dal post esistente. Quindi per rifare un post con le
stesse immagini non serve ricaricare niente: si riusano quegli indirizzi.

## Il Brand kit — dove stanno font, sfondi e template

⚠️ **Scritto il 10/09/2026, dopo aver perso un'ora a cercarlo.** Il vault diceva che «Drive tiene
il finito» e si fermava lì: non diceva che esiste un Brand kit, né cosa contiene. Risultato: una
slide da rifare è stata dichiarata impossibile perché i font non si trovavano — mentre erano su
Drive da luglio.

Accanto alla cartella Social di ogni brand c'è il **Brand kit**: `04 Brand kit` per Mamma Rosaria,
`03 Brand kit` per la Tenuta e per la Masseria. Dentro, sempre la stessa forma:

```
01 LOGHI/            tutte le versioni del marchio
02 COLORI/
03 FONT/             i font veri, più COME-USARLI.txt
04 SFONDI/           foglie arancio, bianco e marrone, nei tre formati
05 PULSANTI/
06 TEMPLATE/
07 ESEMPI POST/      com'è fatto un post giusto
08 ESEMPI STORIE/
10 ELEMENTI GRAFICI/
Design-System-DMR.pdf
LEGGIMI.md
```

**Gli sfondi sono già tagliati nei tre formati** — `_post_1080x1350`, `_quadrato_1080x1080`,
`_storia_1080x1920` — più l'originale in PNG.

⚠️ **Non fidarsi dei font che si trovano sull'SSD.** In
`2-libreria/progetti/2026-08-generatore-inviti/to-delete/assets-vuoti/` ci sono `D-DIN-Bold.ttf`,
`Regular Brush.otf` e gli sfondi con i nomi giusti e **zero byte dentro**. Sono segnaposto di un
progetto abbandonato, e sembrano veri finché non li si apre. **La fonte sono i file su Drive.**

**Drive è montato in locale**, quindi si leggono da disco senza passare dall'API:
`~/Library/CloudStorage/GoogleDrive-<account>/.shortcut-targets-by-id/<id-cartella-brand>/`.

## I nomi

- **Cartelle e sottocartelle in minuscolo-con-trattini**, come nel vault. Le uniche maiuscole
  sono le sei cartelle di primo livello, che sono i cartelli stradali.
- **I numeri davanti si tengono** dove c'erano: `01-setup-e-location`, `02-cibo-e-servizio`.
  Servono a forzare l'ordine in Finder.
- **In `4-pubblicati` la data va davanti, in `AAAA-MM-GG`**: `2026-09-07-compleanno-angoli-a-vista`.
  Ordinare per nome vuol dire ordinare per tempo, e resta giusto per sempre.
- **I file non si rinominano.** `DJI_20260729195308_0288_D.MP4` contiene la data e il numero di
  scatto: rinominarlo perde informazione e non fa guadagnare niente.
- Niente due punti, niente apostrofi, niente spazi in fondo: sono i caratteri che rompono gli
  script e che nessuno vede a occhio.

## I cinque passi

**1 · Si svuota la scheda.**
Tutto in `00-SCARICO/`, nella cartella della macchina. In questo momento non si decide di chi è
il materiale: si scarica e basta.
→ *È fatto quando* la scheda è vuota e il girato è sul disco.
⚠️ **`00-SCARICO` si svuota.** Se una cartella lì dentro ha più di un mese, quel girato non lo
userai mai.

**2 · Si smista per evento.**
Dal scarico a `<brand>/1-eventi/nome-evento/`, con le sottocartelle per argomento se sono tante.
→ *È fatto quando* `00-SCARICO` è di nuovo vuoto e ogni file ha un brand.

**3 · Si sceglie il buono.**
Quello che vale si copia in `2-libreria/`, ordinato per soggetto — `servizi/`, `sale/`, `reel/`.
Non tutto il girato: solo quello che riuseresti.
→ *È fatto quando* in libreria c'è materiale che si può pescare senza riaprire l'evento.

**4 · Si produce.**
Una cartella per contenuto in `3-in-produzione/`, con dentro le immagini e un **`caption.md`**
che porta data di uscita, formato, tema, la caption e la tabella delle slide.
→ *È fatto quando* il contenuto è approvato, la caption è scritta secondo
[[areas/da-mamma-rosaria/reference/caption|caption]] e passa la checklist di
[[areas/da-mamma-rosaria/reference/regole-editoriali|regole editoriali]].

**5 · Si pubblica, e si archivia nello stesso momento.**
Si programma su Buffer. **Poi, subito**, la cartella passa da `3-in-produzione` a
`4-pubblicati/AAAA-MM/` con la data davanti, e si copia nel `01 pubblicati` di Drive.
→ *È fatto quando* la cartella non sta più in produzione e sta in tutti e due i posti.

⚠️ **Il quinto passo è quello che si salta, ed è quello che costa.** Prima del 07/09/2026 la
cartella dei pubblicati conteneva otto reel e nient'altro: per sapere cosa era già uscito
bisognava leggerlo da Buffer post per post. **`4-pubblicati` deve essere la conseguenza della
pubblicazione, non un cassetto dove si mettono le cose.** Appena diventa un cassetto, mente.

## Cosa si conta

Quello che esce oltre il canone si segna **il giorno che esce**, nel piano editoriale del mese.
Il canone e le cifre stanno in [[self/tariffario-famiglia|tariffario dei brand di famiglia]]:
otto post e otto storie per brand, dentro cui al massimo due reel.

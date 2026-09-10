---
title: "Procedura — pubblicare un post"
summary: "Come un contenuto pronto va online da qui: i controlli prima, le due strade per le immagini, la creazione su Buffer in modalità automatica, e la verifica che distingue un post pubblicato davvero da uno che dice solo di esserlo."
tags:
  - docs
  - procedure
  - contenuti
status: attivo
created: 2026-09-10
updated: 2026-09-10
related:
  - "[[docs/procedure/produzione-contenuti]]"
  - "[[docs/definizioni/pubblicare-un-post]]"
  - "[[areas/da-mamma-rosaria/reference/regole-editoriali]]"
  - "[[areas/da-mamma-rosaria/reference/caption]]"
  - "[[self/tariffario-famiglia]]"
---

# Procedura — pubblicare un post

> Scritta il 10/09/2026, il giorno in cui un carosello è uscito su Facebook e non su Instagram
> mentre Buffer diceva che era andato su entrambi. **Da qui in avanti la pubblicazione la fa
> Claude**, non Emanuele: è una richiesta esplicita, ed è il motivo per cui questa procedura
> esiste.

Dove stanno le cose — SSD, Drive, Buffer, vault — sta in
[[docs/procedure/produzione-contenuti|produzione contenuti]]. Qui c'è **come un contenuto pronto
diventa un post online**.

## Cosa serve prima di cominciare

La cartella del contenuto in `3-in-produzione`, con le immagini numerate e il suo `caption.md`.
I canali. L'ora.

Se una di queste tre manca, si chiede. Non si sceglie l'ora al posto suo.

## 1 · I controlli, che si fanno prima e non dopo

**La checklist di pubblicazione del brand.** Per Mamma Rosaria sta in
[[areas/da-mamma-rosaria/reference/regole-editoriali|regole editoriali]]: format, colori, una
sola parola in Brush, copertina non tagliata, nessun soggetto ripetuto, nessuna formula vietata.

**La caption** deve chiudere con l'invito, poi **la firma**, poi **quattro hashtag** — lo schema
sta in [[areas/da-mamma-rosaria/reference/caption|caption]].

⚠️ **Guardare la data in cima al `caption.md`.** Se è stata scritta prima dell'ultimo cambio di
regole, non è conforme e nessuno se ne accorge. Il 10/09/2026 un carosello scritto il 05/09
portava nove hashtag e nessuna firma: le due regole erano cambiate il 06 e il 07.

**L'alternanza dei fondi**, per i grafici: mai due bianchi né due arancio di fila. Si controlla
**aprendo la copertina dell'ultimo grafico uscito**, non a memoria.

**Il perimetro del mese**, per i brand di famiglia: otto post, di cui al massimo due reel e
quattro grafici ([[self/tariffario-famiglia|tariffario dei brand di famiglia]]). Se questo post
sfora, si dice prima di pubblicarlo.

## 2 · Le immagini

**Nessuna API di pubblicazione accetta un file dal disco.** Né Buffer né la Graph API di
Instagram: vogliono un **URL pubblico** da cui scaricarsi l'immagine da sole. Due strade.

**a) Le immagini sono già state caricate su Buffer una volta.** Allora hanno già un indirizzo
pubblico e si riusano: si leggono da un post che le contiene, campo `assets[].source`. Non si
ricarica niente. È il caso di ogni ripubblicazione e di ogni correzione.

**b) Sono nuove.** Si caricano **dal browser**, sulla pagina di Buffer, con l'upload dei file —
non dall'API. Da lì in poi vale il caso (a) per sempre.

⚠️ **Non serve montare un hosting per questo.** Il 10/09/2026 è stata proposta una cartella
pubblica su Hostinger per risolvere il problema degli URL: è una complicazione inutile, perché
Buffer conserva le immagini già caricate.

## 3 · Si crea il post

`create_post` sul canale, con:

- `mode`: `shareNow` per pubblicare subito, `customScheduled` con `dueAt` per programmare
- `schedulingType`: **`automatic`**
- `metadata` del servizio — per Instagram `{ type: "post", shouldShareToFeed: true }`
- `text`: la caption per intero
- `assets`: le immagini **in ordine**, ognuna con il suo `altText`

⚠️ **Mai `notification`.** In quella modalità Buffer manda un avviso sul telefono e considera
chiuso il suo compito: il post lo pubblichi a mano tu, e se non lo fai resta un fantasma marcato
come inviato. Facebook esce lo stesso, Instagram no — ed è esattamente com'è andata il
10/09/2026.

**Un post per canale.** Non si pubblica su un canale che ha già ricevuto quel contenuto: si
guarda prima cosa è uscito.

## 4 · La verifica, e non è lo stato

⚠️ **`status: sent` non vuol dire pubblicato.** Un post fantasma dice `sent` con la spunta verde
e la stessa ora di uno vero.

Quello che distingue un post arrivato davvero:

- **`externalLink` valorizzato** — il permalink al post vero;
- fra le azioni disponibili ci sono **`viewPost`, `sharePostLink`, `copyPostLink`**.

Se mancano, il post **non è online**, qualunque cosa dica lo stato. E un fantasma non si
rilancia: per Buffer è già andato. Se ne crea uno nuovo, in modalità automatica.

Il link si riporta a Emanuele. È la prova, e gli serve per guardarlo.

## 5 · Dopo

- **Spostare la cartella** da `3-in-produzione` a `4-pubblicati/<anno-mese>/<data>-<nome>`.
  Il 10/09/2026 in produzione risultavano sette contenuti da fare e quattro erano online da
  settimane, perché nessuno le aveva spostate.
- **Scrivere la riga** in `data/contenuti-pubblicati.md`.
- **Dire a che punto è il mese**: quanti post su otto, quanti reel su due.

## Le trappole, in breve

| Trappola | Come si evita |
|---|---|
| Caption scritta prima di un cambio di regole | si guarda la data in cima al file |
| Due fondi uguali di fila | si apre la copertina dell'ultimo grafico uscito |
| Post in modalità notifica | `schedulingType: automatic`, sempre |
| `sent` senza pubblicazione | si controlla `externalLink`, non lo stato |
| Immagini «da caricare» ogni volta | stanno già su Buffer, si riusa l'indirizzo |
| `3-in-produzione` che mente | si sposta la cartella lo stesso giorno |

## Definizione di fatto

Le condizioni stanno in [[docs/definizioni/pubblicare-un-post|definizione di fatto]] e si
verificano prima di dire che è pubblicato.

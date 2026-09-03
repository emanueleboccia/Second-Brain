---
title: "Web Design Starter Pack — Modulo 10: SEO"
summary: "Modulo 11 del corso Web Design Starter Pack, importato da Notion il 03/09/2026: 8 lezioni con gli appunti originali."
tags:
  - areas
  - formazione
  - corsi
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Modulo 10: SEO

> Modulo 11 di **Web Design Starter Pack** (Luigi Nigro). Materiale originale importato da Notion il
> 03/09/2026, non riscritto. Le regole che ne sono nate stanno in [[docs/procedure/sito-web-wordpress|la procedura del sito]] · [[code/skills/web-design/SKILL|web-design]] · [[docs/web-design/popup-e-pulsanti|le note di web design]].

## 10.1 Introduzione alla SEO

La **SERP** sono le pagine di risultati
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
**Backlink**: quando c’è un link su un altro sito un collegamento al nostro sito web, questo fa anche punteggio SEO

**Snippet** è come appare il sito web sulle pagine dei risultati (Title, UTL, Meta Description)

**SEO Ranking**, più il sito rispetta determinati criteri più questo punteggio è alto, e quindi più verrai messo in alto nei risultati di ricerca

**Indicizzazione** è se appari o meno sui browser

La SEO si divide in 
SEA (Search Engine Advertising) 
SEM (Search Engine Marketing) 

SEM si divide in Seo on Page / Seo off Page
Quelli SEO ON PAGE valgono di più, sono quelli che noi possiamo controllare.
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

Link interni e in uscita, per esempio un link nel testo di un articolo che rimanda ad un altro articolo, in modo da aumentare il tempo di permanenza 
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

I video vanno caricati su piattaforme esterne e poi linkati al sito web

LCP: Contenuto più grande da caricare
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

Le **intestazioni** definiscono la struttura della pagina

H1 (Titolo Libro): Definisce il contenuto della pagina, quindi comunica al motore di ricerca cosa c’è in quella pagina, deve essere massimo 1 per pagina

H2 (Titolo Capitoli)
H3 (Titoli dei Paragrafi all’interno dei capitoli)
H4… 

Estensione SEO Meta in 1 Click (per controllare)

I Meta Dati danno forma allo Snippet, è formato da vari elementi, tra cui: Favicon, Tag Title (Meta titolo), Meta Descrizione, Site link (livelli di navigazione, è Google che decide quali link far apparire).

## 10.2 Impostazioni SEO base del sito web (con Yoast)

Attiviamo Yoast SEO e iniziamo la configurazione iniziale
Andiamo su Impostazioni
Articoli → Mostra articoli nei risultati di ricerca
Impostare in ogni pagina lo schema definendo di che tipo di pagina si tratta
Pagine → Mostra pagine nei risultati di ricerca
Categorie → Mostra categorie nei risultati di ricerca

## 10.3 Intestazioni, meta titoli e meta descrizioni

Tramite l’estensione SEO META in 1 Click verifichiamo che in ogni pagina del nostro sito web sia coerente l’inserimento delle intestazioni H1, H2, H3…

Sistemiamo tutti gli H in tutte le pagine…

Successivamente andiamo a sistemare tutte le meta descrizioni, andando nelle pagine del sito sulla sezione di Yoast SEO.

L’immagine meta può essere anche custom, si vede durante la condivisione del link della pagina, sui motori di ricerca a volte esce a volte no.

## 10.4 Cache & CDN

Sono operazioni tecniche che favoriscono la SEO.

La cache serve a far salvare nel dispositivo di un visitatore i dati del sito, cosi la volta successiva che rientra sul sito entrerà più velocemente il caricamento del server.

La CDN serve per far caricare il sito più velocemente all’estero, essendo che normalmente il server è lontano da quello dove siamo noi, grazie alle CDN i file del nostro sito web vengono spacchettati nei vari server del mondo, cosi se un’utente dall’estero vorrà connettersi al nostro sito, si collegherà in automatico al server geograficamente più vicino.
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

Quando facciamo modifiche al sito front-end, dobbiamo pulire la cache in modo da ripristinarla per tutti i dispositivi, quindi diciamo ai browser di caricare la nuova versione del sito web.

## 10.5 Google Search Console

La search console è uno strumento di analisi
Dobbiamo cercare Google Search Console su Google
→ Completiamo la fase iniziale
→ Aggiungi proprietà 
→ Incollo l’URL completo a destra
→ Copiamo il tag HTML
→ Andiamo su file manager tramite pannello host
→ wp-content / temi / hello / header.php incolliamo nella sezione \\<head\\> 
Oppure scarichiamo il file e lo uploaddiamo nel public

Andiamo su indicizzazione → Report completo

## 10.6 Inviare la Sitemap

Serve a dire a Google in che modo il nostro sito è strutturato.

Andiamo su Yoast SEO, Impostazioni → Sitemap XML
→ Visualizza Sitemap
→ Copiamo lo slug (sitemap_index….)
→ Lo incolliamo e inviamo su Google Search Console

ATTENZIONE: Dobbiamo attivare Yoast già all’inizio della produzione del sito web

## 10.7 Il file robots

E’ un file che comunica con i bot di Google, tramite questo file possiamo dire ai bot di non far apparire pagine nei motori di ricerca

Su Yoast SEO → Strumenti → Crea file robots.txt 
Qui inseriamo tutti gli slug che non vogliamo indicizzare
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

## 10.8 Design Responsive check

Una volta che tutta la SEO è stata ottimizzata, dobbiamo assicurarci che le pagine siano Responsive

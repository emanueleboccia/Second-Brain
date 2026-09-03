---
title: "Web Design Starter Pack — Modulo 12: Pubblicazione del sito, sicurezza informatica e gestione della manutenzione"
summary: "Modulo 13 del corso Web Design Starter Pack, importato da Notion il 03/09/2026: 5 lezioni con gli appunti originali."
tags:
  - areas
  - formazione
  - corsi
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Modulo 12: Pubblicazione del sito, sicurezza informatica e gestione della manutenzione

> Modulo 13 di **Web Design Starter Pack** (Luigi Nigro). Materiale originale importato da Notion il
> 03/09/2026, non riscritto. Le regole che ne sono nate stanno in [[docs/procedure/sito-web-wordpress|la procedura del sito]] · [[code/skills/web-design/SKILL|web-design]] · [[docs/web-design/popup-e-pulsanti|le note di web design]].

## 12.1 Pubblicare e rendere visibile il sito

- Come prima cosa disattiviamo la modalità Coming Soon

- Poi dobbiamo capire quali pagine sono indicizzate su Google
site:link del sito completo, cosi Google ci restituisce tutte le pagine indicizzate del sito

Se c’è qualche pagina che non vogliamo vedere indicizzata andiamo su
Google Search Console → Rimozioni → Nuova Richiesta → Incolliamo il link
Oppure sul robots.txt aggiungiamo un disallow

## 12.1.1 Errore 404 dopo la pubblicazione del sito \\[fixato\\]

Possiamo mettere un redirect diretto tramite il plugin Redirection 
Creiamo un reindirizzamento

L’URL di partenza deve essere la nuova pagina che porta al vecchio URL

## 12.2 Manutenzione in modalità Staging

Su Bacheca → Aggiornamenti noi possiamo vedere tutti gli aggiornamenti
Aggiorniamo sempre: Wordpress, Plugin e Temi

Lo staging è la creazione di uno spazio parallelo protetto del sito web dove possiamo lavorare senza andare a modificare la copia originale, cosi possiamo testare modifiche, se succedono disastri non intaccherà il sito web.
Per attivare lo staging andiamo sul pannello hosting → Live staging → Attiva live staging
Andiamo su Vai al sito staging e possiamo effettuare tutte le modifiche che vogliamo senza intaccare il sito web.

Poi successivamente possiamo pubblicare la produzione se tutto okay, altrimenti elimina staging

## 12.3 Gestione dei Backup

Nel pannello di hosting andiamo su Gestione Backup (abbiamo i backup in base al pacchetto che abbiamo scelto)
Possiamo scegliere tra Lista Backup, Backup on Demand, Backup scaricabili

Selezioniamo il backup, andiamo su prosegui, tutti i file e database e sarà ripristinata la versione del sito fino all’ora indicata del backup.
Possiamo anche creare backup “a convenienza” magari quando sappiamo che dobbiamo effettuare modifiche pericolose al sito,

## 12.4 Sicurezza del sito web

- Hostare il sito su un server sicuro
- Mantenere aggiornati temi e plugin
- Su Wordpress → Strumenti → Salute del sito
- Utilizzare psw sicure per l’accesso al wp-admin
- Eliminare account che accedono con “admin”
- Plugin: Limit Login Attempts Reloaded
- Plugin: Wordfence Security
- Plugin: WPS Hide Login
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*


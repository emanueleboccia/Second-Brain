---
title: "Procedura — sito web WordPress"
summary: "La checklist in quattordici fasi che Emanuele usava per costruire un sito WordPress da zero: dal primo incontro al bonifico di saldo, passando per setup, ottimizzazioni, sicurezza, design, SEO, GDPR e test. Salvata com'era, senza aggiornarla."
tags:
  - docs
  - procedure
  - sito
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Procedura — sito web WordPress

> ⚠️ **Salvata il 03/09/2026 esattamente com'era**, dalla versione che Emanuele usava prima.
> Non è stata aggiornata, corretta né riordinata: alcune voci sono quasi certamente superate —
> PHP 7.4, il tema Hello Elementor, Elementor stesso, che dal 31/05/2027 non si rinnova più.
> **Aggiornata il 04/09/2026, ma non qui.** Il modo di lavorare di oggi sta in
> [[docs/checklist-sito|checklist sito]], che è quella da seguire: sceglie fra custom e WordPress,
> mette la progettazione prima della costruzione e ha tolto Elementor. Questo file resta come
> storia e come dettaglio operativo di un progetto WordPress vero.

Le quattordici fasi coprono tutto il ciclo, non solo la costruzione: comincia con la call
conoscitiva e finisce col bonifico di saldo. È il suo pregio — un sito non è finito quando è
online, è finito quando è stato pagato.

I prezzi delle voci che compaiono qui si leggono da [[self/tariffario|tariffario]]. Le domande
della fase 2.1 stanno in [[docs/brief-cliente|brief cliente]]. Quando è finito davvero lo dice
[[docs/definizioni/web-design|la definizione di fatto del web design]].

## 1.0 Commerciale
- [ ] 1.1 Incontro/call conoscitiva con il cliente
- [ ] 1.2 Mail con recap dell'incontro/call + preventivo
- [ ] 1.3 Preventivo accettato
- [ ] 1.4 Contratto firmato
- [ ] 1.5 Bonifico di acconto ricevuto

## 2.0 Call di onboarding del cliente
- [ ] 2.1 Intervista di onboarding (con info per costruire il sito web)
- [ ] 2.2 Creazione sitemap e definizione obiettivi del sito
- [ ] 2.3 Il cliente ha compilato il questionario strategico
- [ ] 2.4 Mail di recap dell'onboarding + condivisione cartella Drive

## 3.0 Setup WordPress
- [ ] 3.1 Hosting + dominio
- [ ] 3.2 Attivazione SSL per il dominio (https)
- [ ] 3.3 Installazione WordPress
- [ ] 3.4 Attivazione modalità manutenzione (con Elementor)
- [ ] 3.5 Installare il tema (Hello Elementor)
- [ ] 3.6 Impostazione logo e favicon
- [ ] 3.7 Creazione pagine + menu di navigazione
- [ ] 3.8 Impostazione degli stili su Elementor

## 4.0 Ottimizzazioni
- [ ] 4.1 Installazione plugin: WP Rocket
- [ ] 4.2 Installazione plugin: ManageWP - Worker
- [ ] 4.3 [ManageWP - Worker] Collegamento
- [ ] 4.4 [WP Rocket] Importare file impostazioni
- [ ] 4.5 Disabilitare Google Font (con Elementor)
- [ ] 4.6 Carica font in locale (con Elementor)
- [ ] 4.7 Imposta la dimensione dei media WP a zero
- [ ] 4.8 Fare speed test su una pagina vuota (punto di partenza)
- [ ] 4.9 Settare PHP 7.4 o 8.0 su hosting

## 5.0 Sicurezza
- [ ] 5.1 Installazione plugin: Solid Security
- [ ] 5.2 Configurazione iniziale
- [ ] 5.3 Cambiare il link di accesso al sito web

## 6.0 Design del sito web
- [ ] 6.1 Design dell'header e del footer
- [ ] 6.2 Design della home page
- [ ] 6.3 Design della pagina Chi sono
- [ ] 6.4 Design della pagina Contatti
- [ ] 6.5 Design di tutte le altre pagine del sito
- [ ] 6.6 Design della pagina 404

## 7.0 Blog
- [ ] 7.1 Creazione delle categorie del blog
- [ ] 7.2 Design pagina archivio blog
- [ ] 7.3 Design pagina articolo singolo blog

## 8.0 Presentazione della struttura di design al cliente
- [ ] 8.1 Incontro/call con cliente per presentazione struttura
- [ ] 8.2 Implementazione modifiche richieste dal cliente
- [ ] 8.3 Il cliente ha approvato la struttura di design

## 9.0 Analisi del traffico web
- [ ] 9.1 Installazione plugin: Google Tag Manager
- [ ] 9.2 Installazione contenitore Google Tag Manager
- [ ] 9.3 Installazione Google Analytics 4
- [ ] 9.4 Installazione Google Search Console

## 10.0 SEO
- [ ] 10.1 Installazione plugin: Yoast SEO
- [ ] 10.2 Configurazione iniziale Yoast SEO
- [ ] 10.3 Struttura gerarchica intestazioni sulle pagine (H1, H2, H3…)
- [ ] 10.4 Impostare i metadati su tutte le pagine (title, description, image)
- [ ] 10.5 Inviare sitemap su Google Search Console
- [ ] 10.6 Setting cache lato server da pannello Ergonet
- [ ] 10.7 Installazione CDN dal pannello Ergonet
- [ ] 10.8 Correzione design responsive su tutte le pagine

## 11.0 Direct marketing + CRO
- [ ] 11.1 Plugin live chat per Facebook/WhatsApp
- [ ] 11.2 Integrazione con sistema di mail marketing
- [ ] 11.3 Installazione Clarity per heatmap

## 12.0 GDPR
- [ ] 12.1 Installazione plugin: CookieYes
- [ ] 12.2 Impostazione barra dei cookie
- [ ] 12.3 Documenti cookie policy e privacy policy
- [ ] 12.4 Aggiunta spunte di accettazione su moduli contatto + newsletter

## 13.0 User testing e pubblicazione
- [ ] 13.1 Pubblicare il sito web (disattivare modalità manutenzione)
- [ ] 13.2 Test indicizzazione su Google (`site:www.tuosito.com`)
- [ ] 13.3 Test di tutti i link e pulsanti su tutte le pagine
- [ ] 13.4 Test di tutti i moduli (contatti, newsletter ecc.)
- [ ] 13.5 Test design responsive dai dispositivi mobili
- [ ] 13.6 Elimina le risorse inutili tramite plugin: Asset Clean Up

## 14.0 Consegna dei lavori
- [ ] 14.1 Incontro/call di consegna sito
- [ ] 14.2 Mail con recap dei termini della collaborazione
- [ ] 14.3 Bonifico di saldo ricevuto

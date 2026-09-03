---
title: "Web Design Starter Pack — Modulo 9: Analisi del traffico Web"
summary: "Modulo 10 del corso Web Design Starter Pack, importato da Notion il 03/09/2026: 2 lezioni con gli appunti originali."
tags:
  - areas
  - formazione
  - corsi
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Modulo 9: Analisi del traffico Web

> Modulo 10 di **Web Design Starter Pack** (Luigi Nigro). Materiale originale importato da Notion il
> 03/09/2026, non riscritto. Le regole che ne sono nate stanno in [[docs/procedure/sito-web-wordpress|la procedura del sito]] · [[code/skills/web-design/SKILL|web-design]] · [[docs/web-design/popup-e-pulsanti|le note di web design]].

## 9.1 Installazione Google Tag Manager

Installa plugin GTM4WP
→ Andiamo nelle impostazioni
Cerchiamo Google Tag Manager su Google
→ Facciamo procedura iniziale
→ Aggiungiamo nuovo account e quindi i dati del sito
→ All’interno del codice troviamo l’id di Google Tag Manager
→ Lo incolliamo nelle impostazioni del plugin ed è fatta

## 9.2 Installazione e lettura di Google Analytics

Cerchiamo Google Analytics
→ Facciamo la procedura iniziale 
→ Amministrazione
→ Crea account
→ Inseriamo i dati (lasciare spunte)
Clicchiamo su web
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*

Ci fornirà un tag id che ci servirà per Google Tag Manager
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
→ Copiamo il codice soprastante
→ Andiamo su Google Tag Manager
→ Andiamo su Tag/Nuovo/Configurazione Tag (dando un titolo come GA4-misurazione base)
→ Selezionare tipo tag Google Analytics - configurazione GA4
> ⚠️ *Qui su Notion c'è un'immagine. Non è stata copiata: l'URL di Notion scade.*
→ Attivare il codice su All Pages
→ Salviamo
→ Clicchiamo su Invia
Per testare:
→ Anteprima
→ Incolliamo la URL completa
→ Connect e verifica che è connesso
Possiamo vedere quali tag sono scattati sun “Tag Fired”
e “Tag Not Fired” quelli non scattati 

Dopo tutto questo, possiamo visionare su Google Analytics le varie statistiche:
**Tempo di permanenza:** è importante a livello di SEO
**Conteggi eventi:** le azioni che gli utenti svolgono sul sito web
**Utenti**: visitatori totali

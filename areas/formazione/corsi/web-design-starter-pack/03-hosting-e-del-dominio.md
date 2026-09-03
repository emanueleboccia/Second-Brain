---
title: "Web Design Starter Pack — Modulo 2: Hosting e del dominio"
summary: "Modulo 3 del corso Web Design Starter Pack, importato da Notion il 03/09/2026: 5 lezioni con gli appunti originali."
tags:
  - areas
  - formazione
  - corsi
status: attivo
created: 2026-09-03
updated: 2026-09-03
---

# Modulo 2: Hosting e del dominio

> Modulo 3 di **Web Design Starter Pack** (Luigi Nigro). Materiale originale importato da Notion il
> 03/09/2026, non riscritto. Le regole che ne sono nate stanno in [[docs/procedure/sito-web-wordpress|la procedura del sito]] · [[code/skills/web-design/SKILL|web-design]] · [[docs/web-design/popup-e-pulsanti|le note di web design]].

## 2.1 Scelta dell'Hosting

L’hosting è un server dove all’interno sono ospitati tutti i file del nostro sito web.
Il server può essere:

**Server Dedicato:
**- Per chi ha tanto traffico
- Performance top
- Sicurezza top
- Costa tanto

**Server Condiviso:
**- Traffico \\<20mila visite mensili
- Performance buone
- Buona sicurezza
- Cosa poco

Hosting consigliati:
**Siteground**: ti attira sul loro servizio con un costo relativamente basso, ma dall’anno 2 ti inizia a menare, okay la qualità top, ma sul mercato ci sono alternative altrettanto buone con un modello di pricing senza scam.

**Ergonet**: hosting italiano ottimo, assistenza e prezzi top, ha le stesse performance (a tratti migliori) di Siteground, un cpanel fatto molto bene e l’assistenza è sempre performante e presente.

Su Ergonet troviamo:
Equilibrio 40€/anno
Progresso 70€/anno
Successo 130€/anno

## 2.2 Il dominio

Il dominio è una stringa di lettere che corrisponde ad un’indirizzo ip.
E’ formato dalla parte **www. **
la parte centrale **nomesito** 
l’estensione **.it/.com **(non incide sul ranking)**
**lo slug (uri) la parte dopo l’estensione

**Domain Design
**Non diamo per scontato che il sito deve comparire ed essere trovato online, ma anche una risposta corretta a “mi dai il sito della tua azienda?”, quindi memorabile.

Es buono: www.nomesito.com
Es errato: www.nome-sito.com / www.nome-azienda1998.com

Il redirect è comodo per una questione di UX del dominio
Es:   www.paginabella.com → www.nomesito.com/pagina-bella

**Certificato SSL
**E’ un certificato di sicurezza ed è alla base di un sito web, deve esserci sempre altrimenti siamo penalizzati ed incide sul ranking SEO.

## 2.3 Installazione di Wordpress

Nelle opzioni durante l’acquisto dell’hosting è meglio aggiungere 
- il “Filtro Antispam” 
- anche “Profilo di Backup”
- SMTP Professional (per marcare l’email e renderla ufficiale sckippando gli antispam)

Per installare wp dal cpanel:
- Installazione CMS
- Wordpress
- Inserire nome utente e psw

## 2.4 Il Cpanel di Ergonet

Le funzioni del CPanel:
- Account Email: per creare indirizzi email con dominio personalizzato, utilizziamo sempre la capacità massima.
- Impostazioni Server: imposteremo la cache
- Redirect: dove creeremo redirect
- Certificati SSL: se abbiamo registrato un nuovo dominio troveremo un locchetto da cliccare
- Delega tecnica: per creare un’utente che può accedere e fare determinate cose

## 2.5 Hosting Locale con Local

Il sito si chiama [localwp.com](http://localwp.com), lo scarichiamo per mac o windows.
Utile per creare siti in locale per poi metterli online.

- Aggiungiamo un nuovo sito
- diamo il nome
- scegliamo dove installare i file del sito

Possiamo vedere sulla barra a sinistra i vari siti creati in locale.

Funzione live-link: abilitarla o disabilitarla per l’accesso ad alcune persone che hanno questo link


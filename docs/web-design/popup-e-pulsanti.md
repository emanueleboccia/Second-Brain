---
title: "Popup e pulsanti"
summary: "Il popup collegato a un pulsante tiene la landing pulita mostrando il form solo al click: nel 99% dei casi è un form con nome, email, telefono e privacy, e conta soprattutto cosa si configura dopo l'invio."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/componenti-complessi]]"
  - "[[docs/web-design/elementi-atomici]]"
  - "[[docs/web-design/anteprima-e-pubblicazione]]"
  - "[[docs/web-design/pagine-di-un-sito-locale]]"
---

# Popup e pulsanti

**A cosa serve.** Non si mette il form visibile nella landing: lo si fa comparire quando l'utente
preme la CTA. Serve a **tenere la landing pulita**, con la sola call to action. Gli appunti
precisano che non è la cosa che fa la differenza in assoluto, ma migliora ordine e pulizia, e può
avere senso in una strategia — per esempio per mostrare offerte a chi ha fatto certe azioni.

È [[docs/web-design/componenti-complessi|il form]] montato in modo che compaia su richiesta, e
dentro ci sono gli stessi [[docs/web-design/elementi-atomici|elementi atomici]] di sempre: campi e
CTA.

**Cosa contiene.** Nel 99% dei casi un form dati: nome, cognome, email, telefono, checkbox privacy,
tasto invio. Si possono aggiungere altri campi, compreso il caricamento di documenti o foto.

**La linea guida.** Non si creano mille popup diversi a caso: si mantiene coerenza di stile e di
logica di reindirizzamento, almeno all'interno della stessa pagina.

## Condizioni e trigger

Alla pubblicazione si impostano due cose:

- **Condizioni** — dove appare. Per esempio su tutto il sito.
- **Trigger** — quando appare: dopo un certo numero di secondi, a una certa percentuale di scroll,
  all'arrivo su un elemento, al click, dopo inattività.

Nel caso classico il popup si apre **dal pulsante**, quindi il resto si lascia pulito.

## Dopo l'invio

È il punto di configurazione che conta davvero: **cosa succede dopo l'invio**. Le opzioni citate:
raccogliere il contatto e mandare un'email, il redirect a una thank you page, le integrazioni con
piattaforme di email marketing, i webhook, i collegamenti con Zapier o Make per mandare i dati su un
foglio, le notifiche via email, l'aggiunta di un appuntamento a calendario.

Si prova sempre dall'anteprima prima di mandare in produzione, come vuole
[[docs/web-design/anteprima-e-pubblicazione|anteprima e pubblicazione]].

Gli appunti chiamano questo **il setup base che si userà nel 90% dei casi**: popup, pulsante, form,
raccolta dati e azione post-invio configurata correttamente.

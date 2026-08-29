---
title: "Custom o WordPress"
summary: "Decisione di Emanuele del 26/08/2026: i siti semplici si fanno totalmente custom e si caricano sull'hosting, WordPress si usa solo per i siti importanti con il giusto ecosistema — aziendali, vetrina, e-commerce — ed Elementor non si usa più."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/sorgente-e-live]]"
  - "[[docs/web-design/anteprima-e-pubblicazione]]"
  - "[[docs/web-design/template-come-punto-di-partenza]]"
  - "[[docs/web-design/processo-tarato-sul-progetto]]"
---

# Custom o WordPress

> **Decisione di Emanuele del 26/08/2026.** Non viene dagli appunti: è il modo di lavorare di oggi,
> e dove diverge dagli appunti **vince questa nota**. Sostituisce la lezione sulle piattaforme, che
> consigliava GoHighLevel, Framer e Shopify, e la parte pratica del corso, che era tutta su
> WordPress con Elementor.

Ci sono due tracce, e la prima domanda su un progetto nuovo è su quale delle due sta.

## Custom, caricato sull'hosting

**Per i siti semplici.** Il caso tipico è il food: pizzeria, girarrosto, panetteria. Poche pagine,
il valore è nelle immagini e nel messaggio, e non serve niente che il cliente debba amministrare.

Si scrive il sito e lo si carica sull'hosting. **Non serve WordPress**, e metterlo comunque
significa portarsi dietro un CMS, i suoi aggiornamenti e il suo peso per gestire quattro pagine che
non cambiano.

## WordPress

**Per i siti importanti, quando c'è il giusto ecosistema attorno.** Sono i siti aziendali, le
vetrine strutturate, gli e-commerce: quelli dove serve un pannello, dove il contenuto cresce, dove
qualcuno oltre a chi l'ha fatto dovrà metterci mano.

WordPress si sceglie perché serve quello che WordPress fa, non perché è il default.

## Elementor no

**Non si usa più.** Le note che parlano di builder — la struttura ad albero, il rinominare i
contenitori, i template da importare — restano come teoria e valgono per qualunque builder, ma non
descrivono più il modo di lavorare.

## Cosa ne consegue

**La fonte di verità è il sorgente in tutte e due le tracce.** Su un sito custom è ovvio; su
WordPress vale lo stesso, ed è già così su Tenuta Don Gaetano, dove il tema si deploya dal repo e il
sito non si modifica dal pannello. La regola è
[[docs/web-design/sorgente-e-live|si lavora dal sorgente, mai sul live]], e il modello
anteprima-contro-pubblicazione dei builder descritto in
[[docs/web-design/anteprima-e-pubblicazione|anteprima e pubblicazione]] resta teoria, non pratica.

**I template cambiano significato.** Sulla traccia custom un template è una struttura da riprodurre,
non un tema da importare: vedi
[[docs/web-design/template-come-punto-di-partenza|i template sono un punto di partenza]].

**La traccia non coincide con la dimensione del cliente.** Un'attività locale può avere un sito
custom e un e-commerce piccolo può avere bisogno di WordPress: quello che cambia col cliente è
quanto processo fare, ed è in
[[docs/web-design/processo-tarato-sul-progetto|il processo si tara sul progetto]].

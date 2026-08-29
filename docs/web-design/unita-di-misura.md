---
title: "Px, em e rem"
summary: "Le tre unità di misura del testo, con la regola operativa: si comincia in px per non complicarsi la vita, si passa a rem appena si ha manualità, em resta un caso d'uso specifico come i bottoni."
tags:
  - docs
  - web-design
  - principio/tipografia
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/leggibilita-del-corpo]]"
  - "[[docs/web-design/gestione-dello-spazio]]"
  - "[[docs/web-design/responsive]]"
  - "[[docs/web-design/stili-tipografici-di-base]]"
---

# Px, em e rem

**Pixel.** Misura assoluta: 30 px sono 30 px. È prevedibile e si governa a occhio — un corpo di
testo sta tipicamente tra 14 e 17. Il contro è che **non è responsive di suo**: valori fissi che
stanno bene su desktop possono risultare sbilanciati su tablet e mobile.

**Em.** Misura relativa al contenitore, cioè al blocco, alla colonna o alla riga che contiene il
testo. Il font del figlio scala in base alle impostazioni del padre: `2em` raddoppia, `0.5em`
dimezza.

Il caso d'uso citato sono i **bottoni**. Un bottone è un box con una scritta: se si vuole che
scalando il bottone scali anche il testo, em è utile. Unito al concetto di classe, si cambia una
volta il font base e tutti i bottoni che condividono la classe scalano da soli, senza toccarli uno
per uno. Agli inizi gli appunti **sconsigliano di partire con em**: prima si impara con px.

**Rem.** Misura relativa alla root, cioè all'impostazione generale del sito, non al singolo
contenitore. Nei builder c'è un pannello per il CSS globale: agendo sulla root — per esempio un
font-size di default a 16 px — si cambiano con un click le dimensioni di tutto il sito, se i testi
sono in rem.

## La regola operativa

- **All'inizio: px**, per non complicarsi la vita.
- **Appena si ha un minimo di manualità: rem**, per avere basi scalabili.

Gli appunti la definiscono «molto avanzata ma molto facile», e consigliano di passarci appena
capito il meccanismo perché è una base che paga nel tempo.

Le misure scelte qui vanno poi fissate una volta sola negli
[[docs/web-design/stili-tipografici-di-base|stili tipografici di base]], e la ragione per cui i px
fissi danno problemi è il [[docs/web-design/responsive|responsive]]. Su quali valori scegliere per
il corpo e per i titoli, vedi [[docs/web-design/leggibilita-del-corpo|leggibilità del corpo]].

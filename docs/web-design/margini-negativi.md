---
title: "Margini negativi"
summary: "La tecnica per sovrapporre elementi o avvicinare blocchi troppo distanti a causa della struttura a colonne, con l'obbligo di controllare il risultato su tablet e mobile perché lì il layout si rompe spesso."
tags:
  - docs
  - web-design
  - principio/struttura
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/gestione-dello-spazio]]"
  - "[[docs/web-design/responsive]]"
  - "[[docs/web-design/modelli-di-hero]]"
  - "[[docs/web-design/dinamicita-dei-blocchi]]"
---

# Margini negativi

Una tecnica avanzata: valori negativi di margine — negli esempi degli appunti `-70px` o `-140px` —
per **sovrapporre elementi** o per **avvicinare blocchi che restano troppo distanti** a causa
della struttura a colonne.

È una deroga alla regola generale di
[[docs/web-design/gestione-dello-spazio|gestione dello spazio]], che vuole il padding applicato al
macro-blocco: qui si interviene sul singolo elemento, e per questo va verificata.

**L'avvertenza fa parte della tecnica.** Quando si usano margini negativi si controlla sempre il
risultato su tablet e mobile, perché lì il layout si rompe o si sovrappone in modo sbagliato, e va
corretto specificamente per ogni device. Vale la regola generale del
[[docs/web-design/responsive|responsive]].

È anche il meccanismo dietro la hero con foto in stile album e testo sovrapposto, che gli appunti
descrivono come rara proprio perché **è più difficile da far quadrare esteticamente e spesso non
dà un vantaggio funzionale** rispetto alle altre — vedi
[[docs/web-design/modelli-di-hero|modelli di hero]].

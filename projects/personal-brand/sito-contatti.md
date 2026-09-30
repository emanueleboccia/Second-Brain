---
title: "Personal brand — la pagina Contatti"
summary: "La pagina Contatti di emanueleboccia.it, montata il 29/09/2026 col testo scritto il 20/09: «Partiamo dal problema», WhatsApp come azione primaria, cosa succede dopo in tre righe e un modulo di quattro campi. Perché è una pagina e non solo il pannello, come funziona il campo unico per richiamare, e cosa resta aperto."
tags:
  - projects
  - personal-brand
  - sito
status: in-lavorazione
created: 2026-09-29
updated: 2026-09-30
related:
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/sito-pagine]]"
  - "[[projects/personal-brand/sito-servizi]]"
  - "[[projects/personal-brand/sito-intervista]]"
  - "[[projects/personal-brand/MEMORY]]"
---

# Personal brand — la pagina Contatti

> Montata il 29/09/2026 su `~/Desktop/progetti/eb-site/contatti/`. ✅ **Approvata da Emanuele il 30/09/2026**: «va bene».
> Il testo è quello scritto con lui il 20/09, in [[projects/personal-brand/sito-pagine|le pagine
> del sito]]: qui c'è come è stata montata, e le due cose cambiate.

## Perché è una pagina

Dal 28/09 il contatto era solo il pannello che si apre da ogni pagina, come nel sito di eliot. La
sera del 29/09 Claude ha chiesto se bastava, ed Emanuele ha risposto «procedi anche con le cose in
sospeso». **La scelta di farla è di Claude**, per due ragioni: la pagina sta nella sitemap che
Emanuele ha rifatto il 28/09, in [[projects/personal-brand/sito|il sito]], e il testo c'era già.

Il pannello resta: lo aprono i bottoni «Parliamone» e quelli delle pagine dei servizi. Alla pagina
portano la voce «Contatti» del menù del telefono e quella del piede. Nella testata del computer la
voce non c'è, come prima: lì c'è il bottone.

## Com'è fatta

1. **Il titolo**, «Partiamo dal problema.», e sotto la frase del 20/09.
2. **Come mi trovi.** WhatsApp è l'azione primaria: è il bottone più grande della pagina, chiaro su
   fondo scuro, col numero accanto. Sotto, «Tra Napoli e il Vesuvio». **L'email non c'è**, come deciso
   il 20/09.
3. **Cosa succede dopo**, in tre righe numerate, e un link alla pagina della consulenza.
4. **Il modulo**, in una scheda che dal computer resta ferma mentre si scorre.

**Il modulo ha quattro campi e nessun elenco di servizi**, come voleva il testo del 20/09: nome, la
tua attività, come ti richiamo, e la domanda in grande, «Cosa non funziona adesso?».

## Le due cose cambiate rispetto al 20/09

- **Il passo 02 parla dei trenta minuti.** Diceva «Facciamo una chiamata per capire se c'è qualcosa
  da togliere». Dal 29/09 la consulenza ha una forma, detta da Emanuele e scritta in
  [[projects/personal-brand/sito-intervista|l'intervista sui lavori del sito]]: trenta minuti, dal
  vivo o in chiamata. Il passo ora dice «Ci sentiamo per trenta minuti, dal vivo o in chiamata». Il
  resto della frase, «non ti impegna a niente, e se la risposta è no te lo dico», è rimasto.
- **«Come ti richiamo» è un campo solo**, e accetta un numero o un'email: se c'è una chiocciola è
  un'email, altrimenti un telefono, che deve avere almeno sei cifre. Il pannello chiede ancora
  l'email per forza.

## Come è montata

- I testi in `src/dati/contatti.mjs`; la pagina la scrive `strumenti/genera-pagine.mjs`.
- Lo stile in `src/styles/contatti.css`. L'ingresso è quello delle pagine semplici.
- **L'invio vale per tutti e due i moduli**: `src/js/sezioni.js` ascolta il documento, perché il
  modulo della pagina arriva e se ne va quando si cambia pagina.
- **Il tema di WordPress**, ancora in bozza, accetta un contatto col solo telefono e mette
  l'attività in cima al messaggio, nell'email e su Notion.

Provata a dieci misure, da 320 a 1920 px, in chiaro e in scuro. Il modulo è provato in tre modi:
vuoto avvisa, con un numero di due cifre avvisa, con un numero vero arriva al grazie.

## Le trappole

- **Sotto i 16 px l'iPhone ingrandisce la pagina quando si tocca un campo.** Nel modulo della
  pagina i campi sul telefono sono a 16 px. ⚠️ Nel pannello sono a 13, come in eliot: lì succede
  ancora, e va deciso con Emanuele se cambiarlo.
- **A 1920 px «dal problema.» usciva dalla colonna**: il titolo ha un tetto più basso di quello
  della pagina d'errore, che sta al centro e non ha margini.

## Aperto

- la lettura di Emanuele, e il suo sì alla pagina;
- il link alla privacy sotto il modulo dà errore finché le pagine legali non ci sono: sono rimandate
  alla fine, con WordPress;
- ~~il pannello diceva «entro un giorno lavorativo»~~: dal 30/09 dice «in giornata» come la pagina e
  i servizi, che è la forma confermata da Emanuele il 20/09.

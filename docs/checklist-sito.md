---
title: "Checklist sito"
summary: "La procedura pratica per costruire un sito dall'inizio alla fine: dieci fasi e centoventi spunte, dalla prima call al saldo incassato, con dentro cosa si fa e come si verifica che sia fatto."
tags:
  - docs
  - processi
  - sito
status: attivo
created: 2026-08-21
updated: 2026-09-04
related:
  - "[[docs/procedure/sito-web-wordpress]]"
  - "[[docs/web-design/custom-o-wordpress]]"
  - "[[docs/web-design/processo-in-cinque-step]]"
  - "[[docs/web-design/sorgente-e-live]]"
  - "[[docs/web-design/verifica-post-deploy]]"
  - "[[docs/brief-cliente]]"
  - "[[docs/onboarding]]"
  - "[[self/tariffario]]"
---

# Checklist sito

Dalla prima call al saldo incassato. Si spunta man mano.

**Su un sito piccolo alcune fasi si comprimono, non si saltano.** Le fasi 4 e 7 su una vetrina di
quattro pagine durano mezz'ora invece di due giorni: quello che non si fa mai è passare dalla 3
alla 6 senza sapere quali pagine servono.

---

## 1 · Commerciale

- [ ] Fatto il primo incontro o la prima call
- [ ] Chiesto **chi decide e chi paga**: ci sono soci, familiari, un fornitore che deve dire la sua?
- [ ] Chiesto **perché il sito adesso** e non un anno fa, e lasciato rispondere lui
- [ ] Chiesto qual è **la priorità numero uno**, se partisse da una cosa sola
- [ ] Chiesto **quanto vuole investire**
- [ ] Chiesto se ha già un sito, chi l'ha fatto, com'è andata
- [ ] Detto il prezzo, letto dal tariffario
- [ ] Mandato il **recap scritto** sul canale su cui risponde davvero, lo stesso giorno
- [ ] Nel recap: cosa comprende, prezzo, acconto, cosa serve da lui, data del prossimo incontro
- [ ] Ricevuto un sì
- [ ] Emessa la fattura di acconto
- [ ] **Acconto incassato**
- [ ] Scritta la riga nel registro lavori

> Un accordo preso a voce e mai scritto ha due versioni al primo disaccordo. Il recap si manda lo
> stesso giorno, non «appena ho un attimo».

---

## 2 · Materiale e accessi

**Prima della progettazione. Se questa fase non chiude, non si comincia.**

- [ ] Ricevute le foto dei lavori e **fatta una copia mia**, su Drive
- [ ] Chiesto se ci sono altre foto da qualche parte: vecchi hard disk, fotografi, social
- [ ] Ricevuti logo e file grafici esistenti, o accertato che non ci sono
- [ ] Ricevuti i testi che ha già, o accertato che li scrivo io
- [ ] Chiesto **chi ha comprato il dominio** e a nome di chi è
- [ ] **Entrato davvero nel pannello del dominio**, non solo ricevuto una password
- [ ] Verificato che il dominio non sia scaduto, sospeso o in trasferimento a metà
- [ ] Verificato che l'hosting esista, sia attivo e ci si entri
- [ ] Verificato che ci sia lo spazio per il sito, o preso
- [ ] Chiesto il permesso di mostrare i **marchi dei suoi clienti**, uno per uno
- [ ] Chiesto il permesso per le **foto in cui si riconoscono persone**
- [ ] Chiesto il permesso per eventuali **citazioni e recensioni**
- [ ] Creata e condivisa la cartella Drive del progetto

> Le credenziali si provano subito. «Te le mando io» e «ce le ha un amico mio» sono la stessa
> frase, e diventano un problema tre settimane dopo, quando il sito è pronto e non si pubblica.

---

## 3 · Onboarding

- [ ] Fatta la call di onboarding
- [ ] Scritto in una frase **l'obiettivo del sito**: vetrina, contatti, vendita
- [ ] Chiesto chi è il cliente tipo e cosa gli toglie il sonno
- [ ] Chiesto 2–3 siti che gli piacciono, e **perché** gli piacciono
- [ ] Chiesto se ci sono scadenze vere: stagione, fiera, apertura
- [ ] Detto ora, prima di cominciare: **due giri di revisione inclusi, dal terzo si quota**
- [ ] Detto ora cosa succede dopo la consegna: cosa è incluso, cosa si paga
- [ ] Mandato il recap dell'onboarding

---

## 4 · Progettazione

- [ ] **Analisi**: scritto cosa deve esserci sul sito perché faccia quello che deve fare
- [ ] **Sitemap**: elencate le pagine, una per una
- [ ] **Customer journey**: per ogni pagina, che azione fa l'utente e dove va dopo
- [ ] Scelto lo stile, prendendolo da quelli già mappati invece di inventarlo
- [ ] Scelti i tre colori
- [ ] Scelta la combinazione di font
- [ ] Scritto il copy, o deciso chi lo scrive
- [ ] **Wireframe**: il copy diviso in sezioni, con lo scheletro di ognuna
- [ ] Partito dalla hero: è la sezione che decide il resto

---

## 5 · Setup tecnico

- [ ] **Scelta la traccia: custom o WordPress**
  - custom se sono poche pagine e il cliente non deve amministrare niente
  - WordPress se serve un pannello, il contenuto cresce, ci mette mano qualcun altro
- [ ] Creato il repository
- [ ] Configurato il deploy dal repo verso l'hosting
- [ ] **Attivato l'SSL sul dominio del cliente**, non il certificato generico del provider
- [ ] Verificato che `https://` apra davvero, senza avvisi
- [ ] Aggiornato PHP all'ultima versione supportata dall'hosting
- [ ] Attivata la modalità manutenzione
- [ ] Impostati i redirect da `www` e viceversa

> Il sorgente è la fonte, il server è una copia. Una modifica fatta a mano sul live sparisce al
> primo deploy, oppure resta e nessuno sa perché.

---

## 6 · Costruzione

- [ ] Caricati logo e favicon
- [ ] Impostati gli stili globali: colori, font, dimensioni, spaziature
- [ ] Create tutte le pagine della sitemap
- [ ] Costruito il menu di navigazione
- [ ] Fatti header e footer
- [ ] Fatta la home
- [ ] Fatte tutte le altre pagine
- [ ] Fatta la pagina 404
- [ ] Fatto il blog, se c'è: categorie, pagina archivio, pagina articolo
- [ ] Compresse tutte le immagini prima di caricarle
- [ ] Immagini in WebP, tranne PNG e JPEG sotto i 200 KB e SVG per loghi e icone
- [ ] Messo il testo alternativo su tutte le immagini
- [ ] Sistemato il responsive **pagina per pagina**, non solo la home

---

## 7 · Revisione col cliente

- [ ] Mostrata la prima bozza **insieme a lui**, in chiamata o di persona
- [ ] Raccolte tutte le modifiche in una volta, scritte da qualche parte
- [ ] Fatto il primo giro di modifiche
- [ ] Mostrata la seconda versione
- [ ] Fatto il secondo giro
- [ ] **Avuto un sì esplicito** prima di andare avanti
- [ ] Se serve un terzo giro: detto che si quota, e quotato

---

## 8 · Contatti e tracciamento

- [ ] Costruiti i moduli con tutti i campi che servono, **telefono compreso**
- [ ] Deciso dove arrivano i contatti: mail, CRM, gestionale
- [ ] **Compilato il modulo io stesso** e verificato che arrivi, con tutti i campi dentro
- [ ] Se ci sono più fonti, impostata l'**origine** e controllato che le voci non si sovrappongano
- [ ] Installato Google Analytics 4
- [ ] Collegata Google Search Console
- [ ] Installato Tag Manager, se serve
- [ ] Messo il pulsante WhatsApp o la chat, se serve
- [ ] Messi i link ai social e alla scheda Google

---

## 9 · SEO, velocità e GDPR

- [ ] Un solo H1 per pagina, e la gerarchia H2/H3 sotto
- [ ] Title e description su tutte le pagine, scritti, non lasciati vuoti
- [ ] Immagine di anteprima per la condivisione sui social
- [ ] Generata la sitemap XML
- [ ] Inviata la sitemap a Search Console
- [ ] Attivata la cache e la CDN dal pannello hosting
- [ ] Fatto il test PageSpeed **su mobile**
- [ ] Sistemato quello che PageSpeed segnala e si può sistemare
- [ ] Messa la barra dei cookie
- [ ] Scritte e pubblicate cookie policy e privacy policy
- [ ] Aggiunte le spunte di consenso su tutti i moduli

---

## 10 · Pubblicazione e consegna

- [ ] Disattivata la modalità manutenzione
- [ ] **Riletta ogni pagina pubblicata**: testi giusti, accenti giusti, link che funzionano
- [ ] Cliccati tutti i pulsanti e tutti i link, uno per uno
- [ ] Provati tutti i moduli con un invio finto, e verificato che arrivi
- [ ] Aperto il sito dal telefono e guardato ogni pagina
- [ ] Aperto il sito da un browser diverso
- [ ] Cercato `site:dominio.it` su Google per vedere se indicizza
- [ ] Fatta la call o l'incontro di consegna
- [ ] Consegnate le credenziali al cliente, se gliele deve avere
- [ ] Mandata la mail coi termini: cosa è incluso da qui in poi, cosa si paga, quando scade l'hosting
- [ ] Emessa la fattura di saldo
- [ ] **Saldo incassato**
- [ ] Aggiornata la riga nel registro lavori
- [ ] **Chiesta la recensione**
- [ ] **Chiesti due nomi** a cui il sito può servire
- [ ] Segnata in calendario la scadenza di hosting e dominio
- [ ] Salvate le foto del lavoro finito per il portfolio

> La recensione e i nomi si chiedono adesso, mentre è contento. Fra un mese è un'altra telefonata,
> e non la fai.

---

## Dove si guardano le cose

- **I prezzi** — [[self/tariffario|tariffario]], e mai a memoria.
- **Le domande da fare** al primo incontro e all'onboarding —
  [[docs/brief-cliente|brief cliente]] e [[docs/onboarding|onboarding]].
- **Custom o WordPress**, e perché Elementor non si usa più —
  [[docs/web-design/custom-o-wordpress|custom o WordPress]].
- **Come si progetta** — [[docs/web-design/processo-in-cinque-step|il processo in cinque step]].
- **Perché non si tocca il live** — [[docs/web-design/sorgente-e-live|si lavora dal sorgente]].
- **Cosa si ricontrolla dopo aver pubblicato** —
  [[docs/web-design/verifica-post-deploy|verifica post-deploy]].
- **Stili, font, hero, immagini** — le note in `docs/web-design/`.
- **Il dettaglio di un progetto WordPress vero** —
  [[docs/procedure/sito-web-wordpress|la vecchia procedura in quattordici fasi]], che resta come
  storia e come riferimento tecnico.

## Cosa manca

- **La firma nel footer.** «Made by» su tutti i siti è ancora da decidere: forma, link e clausola
  nei lavori clienti. Quando c'è, diventa una spunta della fase 6.
- **Il contratto firmato.** Oggi si lavora su accordo scritto più acconto. Se entra un contratto
  vero, entra nella fase 1.

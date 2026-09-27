---
title: "Qinta — pubblicare sui portali"
summary: "Come un gestionale pubblica le auto su AutoScout24 e Subito e riceve i contatti, letto il 26/09/2026: AutoScout24 ha un'API gratuita da chiedere, Subito passa solo dai gestionali che autorizza, e i contatti di tutti e due tornano per email. Con la strada proposta per Qinta."
tags:
  - projects
  - qinta
  - portali
status: attivo
created: 2026-09-26
updated: 2026-09-26
related:
  - "[[projects/autoos/mappa]]"
  - "[[projects/autoos/concorrenti]]"
  - "[[projects/autoos/sistema]]"
---

# Qinta — pubblicare sui portali

> Ricerca del 26/09/2026 sulle fonti pubbliche, fatta da un agente; le cose che decidono la strada sono
> ricontrollate sulle pagine. Serve alla funzione che Emanuele ha chiamato la più importante, un solo parco
> auto che aggiorna da solo il sito e i portali, come dice [[projects/autoos/mappa|la mappa del prodotto]].
> Come fanno i concorrenti sta in [[projects/autoos/concorrenti|i concorrenti]].

## In breve

**AutoScout24 si collega direttamente, Subito no.** AutoScout24 ha un'API documentata e gratuita, da chiedere
a loro. Subito accetta solo i gestionali che ha autorizzato, e come si diventa uno di loro non è scritto da
nessuna parte. **I contatti, su tutti e due, tornano per email**: nessuno dei due ha un'API per le richieste.

## AutoScout24

- **Il metodo:** la Listing Creation API, un'interfaccia per creare, aggiornare, pubblicare e togliere gli
  annunci, con le foto e le statistiche. Vale anche per l'Italia. Il vecchio caricamento via FTP è da
  abbandonare.
- **Cosa serve a Qinta:** le credenziali le crea AutoScout24, su richiesta, e sono una per tutto il software,
  non una per concessionaria. Le condizioni per i partner trovate sono quelle tedesche del 17/04/2024: accesso
  a spese di AutoScout24, tutte le funzioni dell'API supportate, adeguamento ai cambi entro 60 giorni,
  **assistenza ai concessionari dal lunedì al venerdì, almeno 5 ore al giorno**, e il mandato di ogni
  concessionaria documentato, anche con un'email. La versione italiana online non c'è.
- ⚠️ **Un servizio di integrazioni, SyncSpider, scrive a febbraio 2025 che l'accesso ora è riservato a «un
  gruppo selezionato».** AutoScout24 non lo dice da nessuna parte: va chiesto.
- **Cosa serve alla concessionaria:** un contratto con AutoScout24, di almeno 180 giorni e con circa 90 di
  preavviso per uscire, a tariffe non pubbliche e a scaglioni di annunci. Nel suo pannello sceglie quale
  software lavora per lei, e gli dà il suo codice cliente, il `customerId`.
- **I contatti:** le richieste arrivano per email agli indirizzi scelti dalla concessionaria, le chiamate
  passano da un numero virtuale con un resoconto per email. L'API dà solo i conteggi.
- **Fonti:** [documentazione dell'API](https://listing-creation.api.autoscout24.com/docs),
  [credenziali](https://listing-creation.api.autoscout24.com/assets/docs/authentication_authorization.md),
  [interfacce per i partner](https://www.autoscout24.it/partner-infoportal/schnittstellen/),
  [condizioni per i data partner, in tedesco](https://www.autoscout24.de/haendlerportal/agb_api/),
  [condizioni B2B](https://www.autoscout24.it/azienda/condizioni-generali-b2b/),
  [SyncSpider](https://support.syncspider.com/en/support/solutions/articles/3000117540-how-to-integrate-autoscout24).

## Subito

- **Il metodo:** gli annunci entrano da un software solo se è fra i «gestionali autorizzati». Per i motori
  sono una quindicina, fra cui GestionaleAuto, ManagerCar, Dealerk, Carmove, LabyCar e il Multigestionale di
  Subito. Non c'è un'API pubblica né un formato di feed documentato.
- **Cosa serve a Qinta:** diventare gestionale autorizzato. Come si fa, cosa serve e quanto costa non è
  pubblicato: va chiesto a Subito.
- **Cosa serve alla concessionaria:** un abbonamento, col caricamento da gestionale incluso secondo il
  pacchetto. Senza pagare si pubblica un annuncio auto alla volta, al massimo quattro in un anno. Chi usa un
  gestionale modifica gli annunci solo da lì.
- **I contatti:** con un'azienda certificata la chat non c'è, e chi è interessato scrive per email; le
  chiamate passano da un numero dedicato, con un'email per ogni chiamata persa.
- **I costi:** non pubblici, su richiesta con la partita IVA.
- **Fonti:** [gestionali autorizzati](https://info.subito.it/gestionali-autorizzati.htm),
  [aziende](https://aziende.subito.it/),
  [abbonamento](https://assistenza.subito.it/hc/it/articles/5519518246685-Abbonamento),
  [quanti annunci](https://assistenza.subito.it/hc/it/articles/115005659445-Quanti-annunci-si-possono-inserire),
  [messaggi](https://assistenza.subito.it/hc/it/articles/115005641309-Come-funziona-la-messaggistica).

## Gli altri portali

- **Automobile.it** è di Adevinta come Subito, e manda al Multigestionale di Subito: nessun canale per
  software esterni trovato.
- **AutoSuperMarket.it** ha un'API pubblica: la chiave la crea la concessionaria, e un endpoint esporta anche
  richieste e chiamate. È l'unico con i contatti via API.
  [Documentazione](https://api.autosupermarket.it/documentazione)
- **Automoto.it e Moto.it** nelle regole vietano di caricare annunci da gestionali, ma StockSparK li elenca:
  probabilmente serve un accordo diretto.
- **AutoUncle** è un aggregatore che legge da solo migliaia di siti: non va collegato.

## Gli intermediari

- **L'API di importazione di GestionaleAuto**, del gruppo
  [[sources/riferimenti/motork-piattaforma-concessionari|MotorK]], scrive gli annunci per conto dei clienti e
  sceglie su quali portali pubblicarli, Subito compreso. L'uso va concordato con loro. EGAuto fa così:
  AutoScout24 diretto, il resto attraverso GestionaleAuto.
  [Documentazione](https://api.docs.gestionaleauto.com/authorization.html)
- **Il Multigestionale di Subito** pubblica su oltre 30 portali, ma lo stock si carica a mano con un file
  zip.
- **Portalclub** fa multipubblicazione e CRM da 39 € al mese.
- **I contatti dai portali, altri li prendono dall'email**: GestionaleLead si collega alla casella della
  concessionaria e li trasforma in richieste, e ManagerCar dice di fare lo stesso.

## La strada proposta per Qinta

Lettura del 26/09/2026, da decidere con Emanuele:

1. **AutoScout24 per primo, collegato direttamente.** È l'unico dei due grandi con un'API documentata e
   gratuita. Il primo passo è chiedere le credenziali, e chiedere se l'accesso è davvero ristretto.
2. **A Subito si chiede subito, in parallelo**, come si diventa gestionale autorizzato. Nell'attesa o si passa
   dall'API di GestionaleAuto, che però è di MotorK, un concorrente, e costa per ogni concessionaria; oppure
   Subito arriva dopo.
3. **I contatti si costruiscono sull'email**: ogni concessionaria ha un indirizzo di Qinta messo fra i
   destinatari sui portali, e Qinta legge quelle email e le trasforma in richieste nel CRM.
4. **Il sito resta l'unico canale che Qinta controlla del tutto**: lì auto e contatti passano senza chiedere
   il permesso a nessuno.
5. ⚠️ **L'impegno di assistenza**: le condizioni di AutoScout24 chiedono assistenza ai concessionari almeno 5
   ore al giorno, dal lunedì al venerdì. Per Qinta, oggi, vuol dire Emanuele.

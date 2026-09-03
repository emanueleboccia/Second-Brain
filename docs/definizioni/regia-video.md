---
title: "Definizione di fatto — Regia video"
summary: "Quando un montaggio è finito: struttura, sottotitoli, durata e le regole numeriche verificate sul file, non sulla stima."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-08-21
updated: 2026-09-03
---

# Definizione di fatto — Regia video

Per i due modi della skill [[code/skills/regia-video/SKILL|regia video]]. **Tutti e due i modi:**

- Ogni affermazione si aggancia a una nota di `docs/video-social/` che **esiste** ed è stata letta
  adesso. Quello che gli appunti non coprono è stato **detto**, senza il consiglio generico attaccato
  subito dopo, e **nessun prezzo è stato nominato**.
- Le regole **con un numero** sono contestate col numero — «l'hook entra a 4,1 secondi, la regola
  dice entro 3», mai «l'hook è un po' lento». Quelle **di gusto** sono date come opinioni e si
  distinguono; quelle **derivate**, come il carico utile entro i 10 secondi, sono dichiarate tali.

**«facciamo un reel su X» — creazione**

- Le tre domande che decidono il video — centro, tipo di contenuto, dolore — hanno una risposta prima
  che venga proposto un hook, e l'hook proposto è una **frase vera** col tipo dichiarato.
- La struttura è stata proposta **in secondi** ed **approvata da Emanuele prima** che venisse scritto
  codice, con l'hook dentro la finestra e la CTA in un punto non skippabile.
- La composizione esce a **1080×1920 e 30 fps**, fascia dei sottotitoli libera sotto il volto, tempi
  in **un file solo** in frame coi secondi nel commento, colori e font del brand — e se il vault non
  li ha, la mancanza è stata **detta**. Prima di consegnare è stato eseguito il modo revisione.

**«controlla questo video» — revisione**

- I tempi vengono dal **codice**, come `secondi = frame ÷ fps`. Se il codice non c'era, è stato
  **detto** che sono a occhio; se `ffmpeg` mancava, la revisione si è **fermata**.
- Sono stati estratti da **4 a 6 fotogrammi** nei momenti chiave e **guardati**: il giudizio sulla
  leggibilità viene da lì. Stanno nella cartella temporanea, non nel progetto.
- Il verdetto dice cosa **rispetta** le regole prima di cosa le viola, e se non viola niente lo dice
  in due righe senza cercare tre correzioni per sembrare utile.
- La **CTA a metà** è stata contestata solo con le analitiche in mano: senza, è «da verificare sui
  dati», non una violazione.

---

Queste condizioni si verificano **prima** di consegnare l'output: il criterio generale sta in [[docs/definizioni-di-fatto|definizioni di fatto]], la procedura in [[code/skills/regia-video/SKILL|la skill regia-video]], e gli errori da non ripetere in [[correction|correction log]].

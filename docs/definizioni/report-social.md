---
title: "Definizione di fatto — Report social"
summary: "Quando il report mensile dei social di un brand è finito: numeri con la fonte, contatti contati senza nomi, contenuti usciti tutti in elenco con clip e grafiche separate, PDF su Drive e riga del mese nel vault."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-09-16
updated: 2026-09-16
related:
  - "[[code/skills/report-social/SKILL]]"
  - "[[docs/procedure/pubblicare-un-post]]"
  - "[[areas/da-mamma-rosaria/reference/design]]"
---

# Definizione di fatto — Report social

Vale per il report mensile della skill [[code/skills/report-social/SKILL|report-social]], scritta il
16/09/2026 per Da Mamma Rosaria. Sta nell'indice delle [[docs/definizioni-di-fatto|definizioni di fatto]]
insieme alle altre. Si verificano tutte prima di mandare il PDF: se una non torna, si
corregge e si riverifica.

**I numeri**

- Il periodo in copertina è il **mese solare**, con data e ora in cui i numeri sono stati letti.
- **Ogni numero ha la sua fonte** scritta nel report, e combacia con quella: la schermata o il CSV
  salvato in `dati/`. Un numero che non si è potuto leggere è scritto come non disponibile, **mai
  stimato**.
- Il confronto col mese prima usa solo righe di [[data/social-mensile|social mensile]]. Se il mese
  prima non c'è, la pagina lo dice.

**I contatti**

- La pagina dei contatti ha **tutte e tre le fonti** — messaggi, profilo Google, clic sul link — o la
  dicitura che quella fonte non è disponibile.
- **Nessun nome e nessun testo** di chi ha scritto: si contano le conversazioni, non si riportano.
- È scritto che WhatsApp e le telefonate dirette non si misurano da qui.

**I contenuti**

- Post e reel in elenco sono **tanti quanti ne mostra Business Suite** fra i pubblicati del mese, per
  canale, letti come dice [[docs/procedure/pubblicare-un-post|pubblicare un post]]. Le differenze coi registri dell'SSD sono state dette a Emanuele.
- **Storie clip e storie grafiche sono contate separate**, e le grafiche non sono sommate alle clip
  per dire quanti giorni hanno avuto una storia.
- I tre contenuti migliori sono i primi tre per visualizzazioni, e le frasi su cosa ha funzionato
  dicono solo quello che i numeri mostrano. I loro numeri vanno anche in
  [[data/contenuti-pubblicati|contenuti pubblicati]].

**Il file**

- Il PDF è A4, sta in `03 report/AAAA-MM/report-social-AAAA-MM.pdf` su Drive e si apre. Colori e font sono
  quelli del [[areas/da-mamma-rosaria/reference/design|design di Mamma Rosaria]].
- **I font del Brand kit sono incorporati**: `strings` sul PDF mostra D-DIN e, se c'è, Regular Brush.
- Il Brush compare al massimo su una parola per pagina, senza cifre né punteggiatura.
- I testi rispettano «Come non si scrive mai» del `CLAUDE.md` di radice: niente formule vietate,
  niente emoji, niente chiusura motivazionale, **niente prezzi**.

**Il vault**

- La riga del mese è in `data/social-mensile.md`, nella tabella del brand.
- Il messaggio a Emanuele dice i contatti, il contenuto migliore, cosa è cresciuto, cosa è calato e
  quanti post sono usciti rispetto al canone.

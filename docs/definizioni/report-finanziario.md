---
title: "Definizione di fatto — Report finanziario"
summary: "Quando la chiusura mensile è finita: totali riconciliati sugli estratti conto, quadro aggiornato e dashboard rigenerata."
tags:
  - docs
  - processi
  - qualita
status: attivo
created: 2026-08-21
updated: 2026-09-03
---

# Definizione di fatto — Report finanziario

Vale per la chiusura mensile della skill [[code/skills/report-finanziario/SKILL|report-finanziario]].
Si verificano prima di consegnare: se una non torna, si corregge e si riverifica.

**La lettura**

- Le regole di `areas/finanza/riferimenti-lettura.md` sono state lette **prima** dei numeri,
  insieme al [[correction|correction log]].
- La somma dei movimenti classificati **torna al centesimo** col totale di ogni estratto conto.
  Se non torna, manca una riga e il report non si scrive.
- I doppioni fra contanti e carta sono stati **elencati a Emanuele**, non risolti in silenzio.
- I rimborsi sono **scalati dalla spesa**, mai sommati alle entrate.
- I giroconti fra conti suoi **non compaiono** né fra le entrate né fra le uscite.

**I numeri**

- Il mese ha **due risultati dichiarati**: margine corrente e variazione di cassa. Mai uno solo.
- Le uscite sono divise nei quattro blocchi — personale, lavoro, vacanza, formazione — e il
  **capitale sta fuori da tutti e quattro**.
- I saldi sono riconciliati **per contenitore**, non sul totale, e lo scarto è interpretato:
  in uno solo è una spesa mancante, in tutti insieme è il saldo di partenza sbagliato.
- **Niente è stato stimato o dedotto per differenza.** Un dato che manca è dichiarato mancante,
  con importo e data se si sanno.

**La consegna**

- Il report è in `areas/finanza/report/<AAAA-MM>.md`, con frontmatter completo e **le fonti in
  testa**: ogni numero è verificabile.
- `quadro.md` è aggiornato dove la fotografia è cambiata, e **non racconta il mese**.
- Le decisioni nuove sono in `decisioni.md` **con la condizione che le riaprirebbe**.
- La dashboard è rigenerata **come file locale**, mai pubblicata.
- `areas/finanza/_in/` è **svuotata**: gli estratti conto non restano nel vault.
- Si chiude sui **tre indicatori** — risparmio, patrimonio, discrezionale — e su una riga sulla
  cosa che pesa di più.
- **Ogni addebito Amazon è stato chiesto singolarmente**, non dato per suo.
- I lavori emersi parlando sono finiti **nel registro giusto** — famiglia o personal brand — e la
  riga è stata **mostrata prima di scriverla** sul foglio.
- Il commento finale nomina **al massimo tre categorie**, ognuna con la cifra e il confronto coi
  mesi prima, e **non contiene consigli di investimento**.
- **Fuori dal disco non è uscito niente:** nessun commit, nessun artefatto, nessun IBAN in chat.

---

Queste condizioni si verificano **prima** di consegnare l'output: il criterio generale sta in [[docs/definizioni-di-fatto|definizioni di fatto]], la procedura in [[code/skills/report-finanziario/SKILL|la skill report-finanziario]], e gli errori da non ripetere in [[correction|correction log]].

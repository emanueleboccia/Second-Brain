# La Masseria di Mezz'autunno

**Brand madre di eventi esperienziali stagionali** per **famiglie** e **scuole**.
Sito: **masseriadimezzautunno.it** — WordPress. Poggiomarino (NA).

Nasce dall'unione di due brand di famiglia: **Da Mamma Rosaria** (la location e il cibo genuino) e
**Funny Show** (l'agenzia di eventi e spettacoli). Sotto la Masseria vivono i suoi **progetti
stagionali** — vedi `progetti/README.md`.

## Regole per te, Claude

- Prima di scrivere qualsiasi contenuto per questa area, leggi **tutti** i file in `reference/`.
  Sono la fonte di verità: se un file in `knowledge/` li contraddice, vincono quelli in `reference/`.
- Se lavori su un evento specifico, leggi anche il suo mini-reference in `progetti/`.
- Valgono sempre anche le regole di scrittura in `_sistema/voce/`.
- Prima di toccare il sito, leggi `_sistema/tecnica/stile-siti.md` e `_sistema/tecnica/novamira.md`.
- `knowledge/` è materiale di lavoro: leggilo solo se te lo chiedo o se serve per il compito.

## Le cose da sapere prima di scrivere

1. **Non è solo autunno: è stagionale.** I progetti sono **Zucche in Masseria** (autunno),
   **Il Borgo Infestato** (autunno), **Il Presepe di una volta** (inverno, nuovo), **Funny Farm**
   (primavera). Ogni
   evento è una **finestra** che si apre e si chiude: chiediti sempre *di quale evento parlo e in
   che fase è* (riscaldamento / in vendita / dopo). La fase si gestisce a stagioni, non a date fisse.
2. **Doppio target, due binari.** Famiglie = evento pubblico, **biglietto a prezzo pubblico su
   Clappit**, «tutto incluso» qui va bene. Scuole = pagina dedicata, **richiesta brochure** (non
   acquisto). Non si mescolano nello stesso contenuto.
3. **La Masseria è l'unico brand pubblico e a biglietto** dei tre. Da Mamma Rosaria e la Tenuta sono
   privati, su misura, senza prezzi: **non usare mai** qui il loro linguaggio «su misura/esclusivo».
4. **La fattoria didattica certificata è una dicitura burocratica sottintesa**, non un progetto e
   non un vanto. Si nomina ogni tanto sul sito per le scuole. La riprova sociale è un'altra cosa.
5. **Riprova sociale: solo quella vera.** Il **sold out** delle edizioni passate (Zucche 2025,
   Funny Farm 2026) e le **foto piene di gente**. **Mai numeri inventati**, niente recensioni finché
   non le raccogliamo.
6. **Location e cibo sono di Da Mamma Rosaria; gli spettacoli di Funny Show.** Il cibo genuino che
   comunichiamo è dell'agriturismo.

## ⚠️ Il sito è già stato ferito una volta

Su questo sito, **durante un build gli accenti si sono corrotti**. Non è teorico: è successo. Prima
di lavorare sul sito leggi `_sistema/tecnica/novamira.md` (regola sull'escape unicode: `\uXXXX` sì,
`\\uXXXX` mai). Dopo ogni deploy rileggi la pagina pubblicata: **testi, accenti, link**.

## Mappa

### `reference/` — la fonte di verità (leggi sempre)

- `brand.md` — cos'è, l'origine (Da Mamma Rosaria + Funny Show), i quattro progetti, il doppio
  target, la location, il rapporto coi brand fratelli, cosa è fuori target.
- `target.md` — famiglie (Valentina; Paola & Gennaro) e scuole (Maestra Teresa).
- `offerta.md` — come si compra (biglietto Clappit / brochure scuole), chi fa cosa, la giornata tipo.
- `tono.md` — la fase a stagioni, i due registri, il copy, i prezzi, la riprova sociale, l'hero.

### `progetti/` — i progetti stagionali

Ognuno ha la sua cartella e il suo `reference.md`. Le regole stanno in `progetti/README.md`.
Zucche in Masseria e Funny Farm hanno un'edizione fatta; Il Borgo Infestato è in lineup; Il Presepe
di una volta è nuovo (prima edizione dicembre 2026, sul sito è un «coming soon»).

### `knowledge/` — materiale di lavoro (leggi su richiesta)

- `contenuti/` — `dolori-desideri.md`, `pillar.md` (consolidati), `idee-reel.md`.
- `sito/` — il blueprint del sito: `struttura-sito.md` (architettura e regole), `pagina-home.md`,
  `pagina-scuole.md`, `template-pagina-progetto.md` (l'ossatura delle landing di progetto).

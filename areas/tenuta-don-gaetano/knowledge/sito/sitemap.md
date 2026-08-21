---
title: "Sitemap & wireframe — il sito"
summary: "La struttura della landing a pagina singola sezione per sezione, l'ambiente tecnico e le note di conversione."
tags:
  - areas
  - brand/tenuta-don-gaetano
  - sito
status: in-lavorazione
created: 2026-07-12
updated: 2026-07-14
related:
  - "[[areas/tenuta-don-gaetano/knowledge/sito/copy-homepage]]"
  - "[[areas/tenuta-don-gaetano/knowledge/sito/workflow-sito]]"
  - "[[areas/tenuta-don-gaetano/reference/design]]"
---

# Sitemap & Wireframe — Sito Web Tenuta Don Gaetano

> **Fonte di verità per i testi: [[areas/tenuta-don-gaetano/knowledge/sito/copy-homepage|copy homepage]].**
> Se un testo qui dentro diverge dal copy, vince il copy: questo file descrive la *struttura*,
> non le parole.
>
> **Fonte di verità per il codice: il repo `sito-web-tenutadongaetano`.**
> Come si lavora e come si deploya: [[areas/tenuta-don-gaetano/knowledge/sito/workflow-sito|workflow sito]].

Aggiornato alla realtà accertata il **12/07/2026**, alla chiusura del cantiere.

**Obiettivo del sito:** trasmettere l'esclusività della dimora settecentesca, rassicurare sul valore
(no spese nascoste), e convertire la visita in una **richiesta di disponibilità**.

**Principi guida:**
- Esperienza editoriale di lusso: hero full-screen, fotografia cinematografica, copy emozionale.
- Mobile-first (la maggior parte del traffico arriva da Instagram → mobile).
- La **gallery** è lo strumento di vendita più potente: deve essere centrale e ricca.
- CTA "Richiedi disponibilità" sempre visibile e ripetuta.
- Riprova sociale (testimonianze, eventi reali) per abbattere le obiezioni.

---

## 1. SITEMAP

Il sito è una **landing a pagina singola. Per scelta.**

Non c'è un albero di pagine, non ci sono pagine da costruire. La navigazione è fatta di
**ancore interne**: ogni voce di menu porta a una sezione della stessa pagina.

```
TENUTA DON GAETANO — pagina unica
│
├── HERO
├── INTRO  ............................ ancora ← menu "La Dimora"
├── EVENTI — 4 card ................... ancora ← menu "Eventi"
├── GALLERY PREVIEW ................... ancora ← menu "Gallery"
├── PERCHÉ NOI — 4 punti
├── TESTIMONIANZE ..................... ancora ← menu "Testimonianze"
├── COSA È INCLUSO
├── CTA FINALE ........................ ancora ← menu "Contatti"
└── FOOTER

Header sticky: logo + menu (ancore) + CTA "Richiedi disponibilità".
Footer: logo, contatti, Instagram, mappa, P.IVA, privacy/cookie.
```

**Conseguenze della scelta one-page:**
- Le 4 card Eventi **non portano a landing per tipologia**: non esistono. Sono elementi di sezione.
- Niente landing SEO per tipologia di evento, niente blog, niente pagine Servizi/FAQ separate.
  Se un giorno servissero, è una decisione nuova — non un lavoro rimasto in sospeso.
- La CTA è **una sola formula ovunque: «Richiedi disponibilità».** Non essendoci pagine interne,
  la vecchia incoerenza sulle CTA («Prenota una visita», «Richiedi un preventivo») non esiste più.

---

## 2. WIREFRAME — LA PAGINA

Legenda: `[IMG]` immagine/video · `[CTA]` pulsante azione · `[H1/H2]` titoli · `▭` blocco/sezione

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                              │
│ [LOGO]        La Dimora · Eventi · Gallery   │
│               Testimonianze · Contatti  [CTA]│
│               (tutte ancore interne)         │
├─────────────────────────────────────────────┤
│ HERO full-screen                             │
│ [IMG/VIDEO cinematografico della dimora]     │
│ [H1] "I tuoi momenti più importanti, in un   │
│      luogo che non si dimentica."            │
│ sottotitolo emozionale                       │
│ [CTA Richiedi disponibilità]                 │
│ [CTA Scopri la dimora]                       │
├─────────────────────────────────────────────┤
│ INTRO BREVE — chi siamo in 2 righe           │
│ [H2] Un luogo unico, nel cuore dell'area     │
│      vesuviana.                              │
│ testo + [IMG dettaglio d'epoca]              │
├─────────────────────────────────────────────┤
│ EVENTI — 4 card                              │
│ [Promesse][Battesimi/Comunioni]              │
│ [Lauree][Compleanni/Anniversari]             │
├─────────────────────────────────────────────┤
│ GALLERY PREVIEW — griglia 6/8 foto + [CTA]   │
├─────────────────────────────────────────────┤
│ PERCHÉ NOI — 4 punti (dimora autentica,      │
│ tutto incluso, referente unico, esclusività) │
├─────────────────────────────────────────────┤
│ TESTIMONIANZE — carosello                    │
│ ⚠️ i testi attuali sono PLACEHOLDER          │
├─────────────────────────────────────────────┤
│ "COSA È INCLUSO" — anteprima pacchetti [CTA] │
├─────────────────────────────────────────────┤
│ CTA FINALE a tutta larghezza                 │
│ [IMG] "Vieni a vivere la Tenuta di persona." │
│ [CTA Richiedi disponibilità]                 │
├─────────────────────────────────────────────┤
│ FOOTER (contatti, IG, mappa, legal)          │
└─────────────────────────────────────────────┘
```

**Persona/dolori serviti:** unicità (Giuseppe & Rosa), foto perfette (Martina),
trasparenza prezzi (Anna).

---

## 3. AMBIENTE TECNICO

- **WordPress** su **Hostinger**, **LiteSpeed Cache**, **tema classico PHP custom**.
- **Nessun page builder: Elementor è disattivato.**
- Il tema live sta nel repo `sito-web-tenutadongaetano`. **Il server si aggiorna solo via deploy.**
- Come si lavora e come si deploya: [[areas/tenuta-don-gaetano/knowledge/sito/workflow-sito|workflow sito]].

---

## 4. NOTE DI CONVERSIONE

- **CTA primaria unica e ripetuta:** "Richiedi disponibilità" (header sticky, dopo l'hero, in chiusura).
- **Pulsante WhatsApp flottante** su mobile (contatto immediato = più conversioni nel sud Italia).
- **Velocità & mobile:** immagini ottimizzate, lazy-load nella gallery, hero video leggero.
- **SEO locale:** title/description con "provincia di Napoli", "area vesuviana",
  Google Business Profile collegato.
  ⚠️ Il **titolo SEO dipende da `blogdescription` nel DB**, non dal tema: vedi [[areas/tenuta-don-gaetano/knowledge/sito/workflow-sito|workflow sito]].
- **Tracciamento:** pixel/eventi sul form e sui click WhatsApp per misurare i lead da Instagram.
- **Coerenza con Instagram:** stessa [[areas/tenuta-don-gaetano/reference/design|palette]] (toni caldi/dorati), stesse foto cinematografiche,
  link in bio → il sito.

# Sitemap & Wireframe — Sito Web Tenuta Don Gaetano

> **Fonte di verità per i testi: `Copy-Homepage.md`.**
> Se un testo qui dentro diverge dal copy, vince il copy: questo file descrive la *struttura*,
> non le parole. I testi della home sono stati riallineati al copy il 12/07/2026 (H1, CTA
> secondaria dell'hero, H2 dell'intro, CTA finale).
> Resta un'incoerenza interna non risolta: le pagine interne usano ancora CTA diverse
> («Prenota una visita», «Richiedi un preventivo») mentre sia il copy sia le note qui sotto
> prescrivono la formula unica «Richiedi disponibilità».

Progetto basato su quanto definito in precedenza: buyer persona (Martina, Anna, Giuseppe & Rosa), dolori/desideri, content pillar.
**Obiettivo del sito:** trasmettere l'esclusività della dimora settecentesca, rassicurare sul valore (no spese nascoste), e convertire la visita in una **richiesta di sopralluogo/preventivo**.

**Principi guida (validati sulle best practice 2026 per location di lusso):**
- Esperienza editoriale di lusso: hero full-screen, fotografia cinematografica, copy emozionale.
- Mobile-first (la maggior parte del traffico arriva da Instagram → mobile).
- La **gallery** è lo strumento di vendita più potente: deve essere centrale e ricca.
- CTA "Richiedi disponibilità" sempre visibile e ripetuta.
- Riprova sociale (testimonianze, eventi reali) per abbattere le obiezioni.

---

## 1. SITEMAP

```
TENUTA DON GAETANO
│
├── 🏠 HOME
│
├── 🏛️ LA DIMORA (Chi siamo / Storia)
│     ├── La storia (dal 1700)
│     ├── Gli spazi (cortile, giardini, sale, scaloni)
│     └── Valori & esperienza
│
├── 🎉 EVENTI  (pagina madre + sottopagine per tipologia)
│     ├── Promesse di matrimonio
│     ├── Battesimi & Comunioni
│     ├── Lauree & Feste celebrative
│     └── Compleanni & Anniversari
│
├── 🖼️ GALLERY  (foto + video, filtrabile per tipo di evento)
│
├── 💬 TESTIMONIANZE  (recensioni + eventi reali)
│
├── 📋 SERVIZI & PACCHETTI  ("cosa è incluso", trasparenza)
│
├── ❓ FAQ
│
├── 📞 CONTATTI / RICHIEDI DISPONIBILITÀ  (form + mappa + contatti)
│
└── 📰 BLOG / IDEAS  (opzionale, SEO — consigli e ispirazione)

Footer globale: logo, contatti, social (Instagram), mappa, P.IVA, privacy/cookie.
Header globale: logo + menu + CTA "Richiedi disponibilità" (sticky).
```

**Note di struttura:**
- **Eventi** è il cuore commerciale: una landing per ogni tipologia, ottimizzata per le ricerche Google delle persona (es. "location battesimo provincia Napoli", "location promessa di matrimonio Napoli").
- **Gallery** e **Testimonianze** sono pagine-leva, da richiamare ovunque.
- **Servizi & Pacchetti** risponde direttamente al dolore "spese nascoste / cosa è incluso".
- **Blog** opzionale in fase 2 per intercettare traffico organico (intercetta il pillar Educativo).

---

## 2. WIREFRAME — PAGINA PER PAGINA

Legenda: `[IMG]` immagine/video · `[CTA]` pulsante azione · `[H1/H2]` titoli · `▭` blocco/sezione

### 🏠 HOME (la pagina più importante)

```
┌─────────────────────────────────────────────┐
│ HEADER (sticky)                              │
│ [LOGO]        La Dimora · Eventi · Gallery   │
│               Testimonianze · Contatti  [CTA]│
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
│ EVENTI — 4 card cliccabili                   │
│ [Promesse][Battesimi/Comunioni]              │
│ [Lauree][Compleanni/Anniversari]             │
├─────────────────────────────────────────────┤
│ GALLERY PREVIEW — griglia 6/8 foto + [CTA]   │
├─────────────────────────────────────────────┤
│ PERCHÉ NOI — 3/4 punti (esclusività,         │
│ chiavi in mano, trasparenza prezzi, location)│
├─────────────────────────────────────────────┤
│ TESTIMONIANZE — carosello 3 recensioni       │
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
**Persona/dolori serviti:** unicità (Giuseppe & Rosa), foto perfette (Martina), trasparenza prezzi (Anna).

---

### 🏛️ LA DIMORA

```
┌─────────────────────────────────────────────┐
│ HERO secondario [IMG facciata] [H1 La Dimora]│
├─────────────────────────────────────────────┤
│ LA STORIA — testo narrativo "dal 1700"       │
│ [IMG d'epoca] timeline a tappe                │
├─────────────────────────────────────────────┤
│ GLI SPAZI — sezioni alternate testo/immagine │
│ Cortile · Giardini · Sale · Scaloni          │
│ (layout zig-zag IMG sinistra/destra)         │
├─────────────────────────────────────────────┤
│ ESPERIENZA & VALORI — 3 icone+testo          │
├─────────────────────────────────────────────┤
│ CTA "Prenota una visita"                     │
└─────────────────────────────────────────────┘
```

---

### 🎉 EVENTI (pagina madre) + landing per tipologia

**Pagina madre Eventi:**
```
┌─────────────────────────────────────────────┐
│ HERO [H1 Eventi alla Tenuta]                 │
├─────────────────────────────────────────────┤
│ 4 BLOCCHI grandi cliccabili (uno per tipo)   │
│ ▭ Promesse ▭ Battesimi/Comunioni             │
│ ▭ Lauree   ▭ Compleanni/Anniversari          │
├─────────────────────────────────────────────┤
│ CTA Richiedi disponibilità                   │
└─────────────────────────────────────────────┘
```

**Landing tipologia (es. Promesse di matrimonio) — schema riutilizzabile:**
```
┌─────────────────────────────────────────────┐
│ HERO tematico [IMG evento] [H1 tipologia]    │
│ frase-gancio dal desiderio della persona     │
├─────────────────────────────────────────────┤
│ INTRO emozionale — perché qui è speciale     │
├─────────────────────────────────────────────┤
│ GALLERY dedicata alla tipologia              │
├─────────────────────────────────────────────┤
│ COSA OFFRIAMO — allestimenti, spazi, servizi │
├─────────────────────────────────────────────┤
│ "COSA È INCLUSO" + indicazione fascia prezzo │
├─────────────────────────────────────────────┤
│ TESTIMONIANZE di quel tipo di evento         │
├─────────────────────────────────────────────┤
│ FAQ specifiche                               │
├─────────────────────────────────────────────┤
│ CTA Richiedi un preventivo                   │
└─────────────────────────────────────────────┘
```
**SEO:** ogni landing ottimizzata sulle query Google delle persona.

---

### 🖼️ GALLERY

```
┌─────────────────────────────────────────────┐
│ HERO breve [H1 Gallery]                      │
├─────────────────────────────────────────────┤
│ FILTRI: Tutti · Promesse · Battesimi/Com.    │
│         Lauree · Compleanni · La Dimora      │
├─────────────────────────────────────────────┤
│ GRIGLIA MASONRY foto+video (lightbox click)  │
│ ▭▭▭                                          │
│ ▭▭▭   (caricamento progressivo)              │
├─────────────────────────────────────────────┤
│ CTA "Immagina il tuo evento qui"             │
└─────────────────────────────────────────────┘
```

---

### 💬 TESTIMONIANZE

```
┌─────────────────────────────────────────────┐
│ HERO [H1 Dicono di noi]                      │
├─────────────────────────────────────────────┤
│ GRIGLIA card recensione (foto+testo+stelle)  │
├─────────────────────────────────────────────┤
│ VIDEO-TESTIMONIANZA in evidenza              │
├─────────────────────────────────────────────┤
│ "EVENTI REALI" — mini gallery con storie     │
├─────────────────────────────────────────────┤
│ CTA Richiedi disponibilità                   │
└─────────────────────────────────────────────┘
```

---

### 📋 SERVIZI & PACCHETTI

```
┌─────────────────────────────────────────────┐
│ HERO [H1 Servizi & Pacchetti]                │
├─────────────────────────────────────────────┤
│ "COSA È INCLUSO" — tabella/lista chiara      │
│ ✓ location ✓ allestimento ✓ catering ✓ ...   │
├─────────────────────────────────────────────┤
│ 2/3 CARD PACCHETTO (Essential/Premium/...)   │
│ con fascia prezzo indicativa → trasparenza   │
├─────────────────────────────────────────────┤
│ SERVIZI EXTRA opzionali                      │
├─────────────────────────────────────────────┤
│ FAQ prezzi + CTA preventivo personalizzato   │
└─────────────────────────────────────────────┘
```
**Dolore servito:** "spese nascoste / cosa è incluso" (Anna, Martina).

---

### ❓ FAQ

```
┌─────────────────────────────────────────────┐
│ HERO [H1 Domande frequenti]                  │
├─────────────────────────────────────────────┤
│ ACCORDION a categorie:                       │
│  ▸ Prezzi & pacchetti                        │
│  ▸ Capienza & spazi                          │
│  ▸ Catering & menu                           │
│  ▸ Organizzazione & tempistiche              │
│  ▸ Accessi, parcheggio, bambini              │
├─────────────────────────────────────────────┤
│ CTA "Non trovi la risposta? Scrivici"        │
└─────────────────────────────────────────────┘
```

---

### 📞 CONTATTI / RICHIEDI DISPONIBILITÀ

```
┌─────────────────────────────────────────────┐
│ HERO [H1 Richiedi disponibilità]             │
├──────────────────────┬──────────────────────┤
│ FORM                 │ INFO CONTATTO         │
│ Nome                 │ ☎ Telefono / WhatsApp │
│ Tipo evento (select) │ ✉ Email               │
│ Data indicativa      │ 📍 Indirizzo          │
│ N° invitati          │ 🕐 Orari              │
│ Messaggio            │ [IG @tenutadongaetano]│
│ [CTA Invia]          │                       │
├──────────────────────┴──────────────────────┤
│ MAPPA Google (Poggiomarino, NA)              │
└─────────────────────────────────────────────┘
```

---

## 3. NOTE TECNICHE & DI CONVERSIONE

- **CTA primaria unica e ripetuta:** "Richiedi disponibilità" (in header sticky, dopo l'hero, a fine di ogni pagina).
- **Pulsante WhatsApp flottante** su mobile (contatto immediato = più conversioni nel sud Italia).
- **Velocità & mobile:** immagini ottimizzate, lazy-load nella gallery, hero video leggero.
- **SEO locale:** title/description con "provincia di Napoli", "area vesuviana", Google Business Profile collegato.
- **Tracciamento:** pixel/eventi sul form e sui click WhatsApp per misurare i lead da Instagram.
- **Coerenza con Instagram:** stessa palette (toni caldi/dorati), stesse foto cinematografiche, link in bio → pagina Eventi o Gallery.

**Sources:**
- [Best Wedding Venue Websites — Whitestone Marketing](https://www.whitestonemarketing.com/best-wedding-venue-websites)
- [35 Best Event Planning & Venue Website Examples 2026 — Colorlib](https://colorlib.com/wp/event-planner-websites/)
- [23 Beautiful Wedding Website Examples — SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/wedding-websites-examples)

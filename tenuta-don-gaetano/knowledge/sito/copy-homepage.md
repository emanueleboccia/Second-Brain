# Copy Homepage — Tenuta Don Gaetano

Copy completo, sezione per sezione, mappato sul wireframe della home.
Tono: elegante, caldo, evocativo ma concreto. Parla a tutte e tre le persona, con la **dimora settecentesca** come filo conduttore e la **richiesta di disponibilità** come obiettivo.

Per ogni sezione trovi: testo pronto + nota strategica (a quale persona/dolore risponde).

---

## 🏷️ METADATI DEL SITO (ufficiali)

Questi due valori **non stanno nel codice del tema**: vivono nel **database WordPress**
(*Impostazioni → Generali*). Git non li vede, e non si accorge se cambiano.
**La fonte di verità sono i valori qui sotto**: se il sito diverge da questi, ha torto il sito.

| Campo | Valore ufficiale |
|---|---|
| `blogname` — *Titolo del sito* | `Tenuta Don Gaetano` |
| `blogdescription` — *Motto* | `Dimora storica per eventi in provincia di Napoli — Poggiomarino` |

**Titolo SEO risultante.** Il tema non scrive nessun `<title>`: dichiara
`add_theme_support( 'title-tag' )` e lascia comporre il titolo a WordPress, come
`blogname` + separatore + `blogdescription`. Quello che deve comparire in pagina, e in SERP, è:

```
Tenuta Don Gaetano · Dimora storica per eventi in provincia di Napoli — Poggiomarino
```

Due caratteri da non sbagliare — nessuno dei due si digita per caso, e vengono da due posti diversi:

- **`·`** (U+00B7, *middle dot*) — è il **separatore**, e arriva dal **codice**: il filtro
  `document_title_separator` in `functions.php` del tema. Senza quel filtro WordPress
  userebbe il suo default `-`.
- **`—`** (U+2014, *em dash*) — è **dentro il motto**, quindi vive nel **database**.

> **Verifica post-deploy, obbligatoria.** Che in pagina ci sia **un solo** `<title>`, e che il
> testo corrisponda **carattere per carattere** a quello qui sopra. Il sito ha già avuto due
> `<title>` contemporaneamente per settimane senza che nessuno se ne accorgesse.
>
> ```sh
> curl -s https://tenutadongaetano.it/ | grep -c '<title>'              # atteso: 1
> curl -s https://tenutadongaetano.it/ | grep -oE '<title>[^<]*</title>'
> ```

> **Nota — 12/07/2026.** Il motto precedente era
> `Dimora storica per eventi esclusivi — Poggiomarino (NA)`.
> È stato **sostituito il 12/07/2026** con quello ufficiale qui sopra, che porta in SERP la
> keyword **"provincia di Napoli"**. Se lo ritrovi da qualche parte, è un residuo: è vecchio.

---

## 🔝 HEADER (sticky)

**Logo:** Tenuta Don Gaetano
**Menu:** La Dimora · Eventi · Gallery · Testimonianze · Contatti
**Pulsante CTA:** `Richiedi disponibilità`

---

## 1. HERO — full screen (video cinematografico della dimora)

**Sopratitolo (eyebrow):**
DIMORA STORICA DEL 1700 · POGGIOMARINO (NA)

**Titolo (H1):**
# I tuoi momenti più importanti, in un luogo che non si dimentica.

**Sottotitolo:**
Una dimora settecentesca dove ogni festa diventa un ricordo da custodire per sempre. A pochi minuti da te, lontano da tutto il resto.

**CTA primaria:** `Richiedi disponibilità`
**CTA secondaria:** `Scopri la dimora`

> *Strategia:* hook emozionale + unicità (Giuseppe & Rosa) + vicinanza/comodità per il bacino vesuviano. La frase "non si dimentica" tocca il desiderio comune a tutte le persona.

---

## 2. INTRO — chi siamo in due righe

**Titolo (H2):**
## Un luogo unico, nel cuore dell'area vesuviana.

**Testo:**
Tra antichi cortili, giardini e sale d'epoca, la Tenuta Don Gaetano custodisce oltre tre secoli di storia. Qui le promesse di matrimonio, le comunioni, le lauree e le feste più importanti trovano la cornice che meritano: autentica, elegante, indimenticabile.

**Link testuale:** `La nostra storia →`

> *Strategia:* posiziona la dimora come asset distintivo (pillar "La Dimora"). Nomina subito gli eventi target per far sentire ogni persona "a casa".

---

## 3. EVENTI — 4 card cliccabili

**Titolo (H2):**
## Ogni occasione merita la sua cornice.

**Sottotitolo:**
Scegli il tuo evento e scopri come lo rendiamo speciale.

**Card 1 — Promesse di matrimonio**
*Il "sì" che dà inizio a tutto, in una cornice da sogno.*
`Scopri →`

**Card 2 — Battesimi & Comunioni**
*Giornate di festa per la famiglia, curate in ogni dettaglio.*
`Scopri →`

**Card 3 — Lauree & Feste celebrative**
*Festeggia il traguardo che hai conquistato, come si deve.*
`Scopri →`

**Card 4 — Compleanni & Anniversari**
*Le date che contano, celebrate in grande stile.*
`Scopri →`

> *Strategia:* ogni card parla a una persona/evento e porta alle landing SEO. Micro-copy che unisce emozione e promessa.

---

## 4. GALLERY PREVIEW

**Titolo (H2):**
## Lasciati ispirare.

**Testo:**
Scorrere queste immagini è il modo migliore per immaginare la tua festa. Ma dal vivo è ancora più bello.

**CTA:** `Sfoglia la gallery`

> *Strategia:* la gallery è lo strumento di vendita più potente. La frase "dal vivo è ancora più bello" risponde al dolore di Martina ("sarà bello come nelle foto?") trasformandolo in invito.

---

## 5. PERCHÉ NOI — 4 punti di forza

**Titolo (H2):**
## Perché scegliere Tenuta Don Gaetano.

**Punto 1 — Una dimora autentica**
Non una sala uguale alle altre, ma un luogo con storia, carattere e anima. Quello che i tuoi ospiti ricorderanno.

**Punto 2 — Tutto incluso, nessuna sorpresa**
Allestimenti, accoglienza, servizi: un preventivo chiaro e trasparente, così sai esattamente cosa aspettarti.

**Punto 3 — Pensiamo a tutto noi**
Un unico referente ti segue dalla prima visita al giorno della festa. Tu pensa solo a goderti il tuo evento.

**Punto 4 — Esclusività e privacy**
Un evento alla volta. La dimora, per quel giorno, è soltanto tua.

> *Strategia:* ogni punto disinnesca un dolore preciso — banalità (tutti), spese nascoste (Anna), stress organizzativo (Martina/Anna), già visto/privacy (Giuseppe & Rosa).

---

## 6. TESTIMONIANZE — carosello

**Titolo (H2):**
## Chi ha festeggiato qui, lo racconta così.

> ### ⚠️ PLACEHOLDER — NON PUBBLICARE
> Le due testimonianze qui sotto sono **inventate**: i nomi sono quelli delle buyer persona,
> non di clienti reali. Servono solo a mostrare il formato del blocco.
> Vanno sostituite con recensioni reali e autorizzate prima di andare online
> (vedi la regola "Rispetto & consenso" in `reference/tono.md`).

**Testimonianza esempio 1 — ⚠️ PLACEHOLDER:**
*"Avevamo paura di sbagliare location. Invece è stato tutto perfetto: i nostri ospiti ne parlano ancora."*
— Martina & Luigi, promessa di matrimonio

**Testimonianza esempio 2 — ⚠️ PLACEHOLDER:**
*"La comunione di mio figlio in un posto così elegante e curato. Non potevo chiedere di meglio."*
— Anna, comunione

**CTA:** `Leggi tutte le testimonianze`

> *Strategia:* riprova sociale che rispecchia le obiezioni reali ("paura di sbagliare"). Testimonianze attribuite alle persona-tipo.

---

## 7. COSA È INCLUSO — anteprima pacchetti

**Titolo (H2):**
## Tutto quello che ti serve, in un'unica soluzione.

**Testo:**
Dalla location all'allestimento, dall'accoglienza ai dettagli che fanno la differenza: i nostri pacchetti sono pensati per toglierti ogni pensiero. Senza costi nascosti, senza sorprese.

**CTA:** `Scopri cosa è incluso`

> *Strategia:* risponde direttamente al dolore "spese nascoste" (Anna) e "non so da dove iniziare" (Martina). Promette semplicità e trasparenza.

---

## 8. CTA FINALE — a tutta larghezza (immagine della dimora)

**Titolo (H2):**
## Vieni a vivere la Tenuta di persona.

**Testo:**
Il modo migliore per capire se è il posto giusto per la tua festa è visitarlo. Prenota un sopralluogo senza impegno: ti aspettiamo.

**CTA primaria:** `Richiedi disponibilità`
**CTA secondaria (mobile):** `Scrivici su WhatsApp`

> *Strategia:* chiude con l'azione a più basso attrito (visita senza impegno) e il canale immediato (WhatsApp), ideale per il pubblico locale.

---

## 9. FOOTER

**Colonna 1 — Brand**
Logo Tenuta Don Gaetano
Dimora storica settecentesca a Poggiomarino, nel cuore dell'area vesuviana. La cornice per le tue feste più importanti.
Social: Instagram · Facebook · WhatsApp

**Colonna 2 — Naviga**
La Dimora · Eventi · Gallery · Perché noi · Contatti

> Le voci sono **solo quelle**, e in quest'ordine: sono le uniche **ancore che esistono davvero**
> nella home (`#dimora`, `#eventi`, `#gallery`, `#perche`, `#contatti`). Il sito è una landing
> one-page: una voce di menu che non punta a una di queste ancore è una voce che porta a un 404.

**Colonna 3 — Contatti**
☎ WhatsApp · +39 351 616 5734
✉ tenutadongaetano@gmail.com
📷 @tenutadongaetano
📍 Poggiomarino (NA) — area vesuviana

**Riga legale:**
© Tenuta Don Gaetano · Tutti i diritti riservati
Dimora storica per eventi · Poggiomarino (NA)

> *Strategia:* il footer chiude ribadendo il posizionamento (dimora storica, Poggiomarino) e
> tiene i tre canali di contatto a un tap, senza form.

> **Nota — 12/07/2026.** Dalla colonna *Naviga* sono state **tolte "Servizi & Pacchetti" e "FAQ"**:
> puntavano a `/servizi/` e `/faq/`, pagine che **non esistono e rispondono 404**. Nella stessa
> occasione è sparita **"Testimonianze"**, che non ha una sezione né un'ancora nella home.
> La home è una **landing one-page per scelta** — non un cantiere a metà — quindi il footer
> naviga per ancore, non per pagine.
> ⚠️ **Il tema è ancora indietro:** `footer.php` continua a servire i due link a `/servizi/` e
> `/faq/`. Vanno rimossi lì e deployati perché il sito rispecchi questo documento.

---

## Microcopy & note finali

- **CTA ricorrente:** usa sempre la stessa formula — `Richiedi disponibilità` — per coerenza e riconoscibilità.
- **Tono dei pulsanti:** inviti diretti e a basso attrito ("Scopri", "Sfoglia", "Vieni a visitare"), mai "Acquista" o linguaggio commerciale freddo.
- **Parole chiave SEO da mantenere nei testi:** dimora storica, eventi esclusivi, provincia di Napoli, area vesuviana, Poggiomarino, promesse di matrimonio, battesimi, comunioni.
- **Coerenza con Instagram:** stesso tono caldo ed evocativo dei content pillar; le frasi hero possono diventare anche caption o testi per i reel.

> Filo conduttore di tutto il copy: **emozione + rassicurazione**. Si vende il sogno (la dimora unica) eliminando al tempo stesso le paure concrete (costi, stress, brutta figura) che frenano le tre buyer persona.

# Memory — Tenuta Don Gaetano

Aperto il 12/07/2026.

## 12/07/2026 — Chiusura del cantiere sito

Scoperto che **la conversione WordPress viveva solo sul server**: nessuna traccia nel repo.
Tema importato in `sito-web-tenutadongaetano`, **fonte di verità ripristinata**.

Deployati i fix: `og:image`, JSON-LD, skip-link, e il **doppio title** — risolto agendo su
`blogdescription` più un filtro sul separatore.

Il sito è una **landing one-page per scelta**, non un cantiere a metà: navigazione ad ancore
interne, nessuna pagina da costruire. **Elementor disattivato.**

⚠️ **Il titolo SEO dipende da `blogdescription` nel database**, non dal codice del tema.
Il valore ufficiale è documentato in `knowledge/sito/copy-homepage.md`.
**Va controllato in ogni verifica post-deploy** — è un valore che vive nel DB e può cambiare
senza lasciare traccia nel repo.

## 14/09/2026 — I social passano al processo di Mamma Rosaria

Stesso pacchetto e stesso processo: otto post al mese, al massimo due reel, **niente storie**.
Una cartella per post in `3-in-produzione` sull'SSD, col suo `caption.md`. Scritti
`reference/regole-editoriali.md` e `reference/caption.md`, quest'ultimo ricavato dalle caption vere
di luglio e agosto.

**I post passano da Meta Business Suite, i reel dal Buffer della Tenuta.** Il Buffer dei connettori
è quello di Mamma Rosaria; la Tenuta ha un suo account Buffer, piano gratuito, con TikTok, Facebook e
Instagram, aperto nel Chrome di Emanuele. I reel ci passano perché devono uscire anche su TikTok,
che Business Suite non ha. Tutti e due si usano dal Chrome di Emanuele.

⚠️ **Buffer non carica una copertina come immagine**, sceglie solo un fotogramma del video. Per avere
la copertina del Brand kit la si incolla sui primi due fotogrammi del reel (0,07 s, non si vede) e su
Buffer si lascia il fotogramma a 0 secondi. Il video da 80 MB lo carica Emanuele: l'upload
dell'estensione si ferma a 10 MB.

Le grafiche nuove si fanno sui template e sugli esempi di `03 Brand kit` su Drive. Quelle preparate a
luglio in `2-libreria/progetti/` non si riusavano senza guardarle a grandezza piena: molte avevano il
testo illeggibile, e tutte le caption una CTA. ⚠️ **Il 14/09/2026 sono finite nel Cestino**, come vuole
Emanuele per le bozze vecchie: la cartella sull'SSD e la sua copia su Drive in
`04 ARCHIVIO/2026-Q3-ARCHIVIO/content-tenutadongaetano`, 274 file di cui 260 identici. Prima si sono
salvati i pezzi del profilo, in `98 Social/02 profilo` su Drive: l'anteprima della copertina Facebook e
le copertine delle storie in evidenza «dove siamo» e «info». Il Design System resta nel vault, in
`knowledge/design-system-originale.pdf`.

## 14/09/2026 — Lo storico dei post entra nei pubblicati

Emanuele ha messo su Drive, in `98 Social`, una cartella «Post» con i post vecchi e ha chiesto di
smistarli col processo nuovo. **Le date vere sono state lette dallo storico di Meta Business Suite**
(Contenuti → Post e reel → Pubblicati), non dai nomi delle cartelle.

- **Gennaio: il primo post del profilo**, il reel «La dimora del 700» del 20/01/2026. Nello storico di
  Business Suite degli ultimi 90 giorni non c'era: l'ha trovato il confronto con la griglia di
  Instagram, che ha 19 post. ⚠️ Copertina e video non sono né sull'SSD né su Drive, e la sua cartella ha
  solo il `caption.md`.
- **Luglio: dieci post**, dal 2 al 29, presi dal calendario di luglio che stava in
  `2-libreria/progetti/`. Due uscite non tornano col nome della cartella: il ritratto di Carlotta è
  uscito il 21 e non il 22, il cannolo a vista il 29 e non il 30.
- **Agosto: nove post.** Gli otto di «AGOSTO 2026 (definitivo)» sono usciti tutti nel giorno
  previsto, più il reel del tour delle sale il 29.
- ⚠️ **Il reel della laurea di Francesca del 25/07 è uscito solo su Facebook**: non è né nello storico
  né nella griglia di Instagram.
- ⚠️ **Dei reel di luglio e agosto c'è solo la copertina, tranne l'ultimo.** Il video del 29/08, 55
  secondi in 4K, era l'unico file in `2-libreria/reel/` sull'SSD: detto da Emanuele, ora sta nella sua
  cartella nei pubblicati, sull'SSD e su Drive.
- Ogni post ha la sua cartella con la data davanti, in `4-pubblicati` sull'SSD e in `01 pubblicati` su
  Drive, con le immagini rinominate come a settembre e un `caption.md` con data, ora, canali e caption.
- **Duplicati e bozze vecchie sono nel Cestino**, come vuole Emanuele: il resto della cartella «Post»
  su Drive, cioè originali già copiati, proposte di calendario e versioni scartate, e sull'SSD il
  calendario di luglio da cui venivano i post. Nel Cestino restano recuperabili.

## 14/09/2026 — I reel della Tenuta in VIDEO PUBBLICATI

Come per Mamma Rosaria, chiesto da Emanuele: su Drive, in `02 Foto e video/VIDEO PUBBLICATI`, una
copia di ogni reel pubblicato o programmato, per suo fratello che la usa coi clienti. La cartella
l'ha creata Claude, accanto a quelle degli eventi.

- **Copiati quattro reel:** il battesimo di Carlotta del 10/07, sala dopo sala del 29/08, e i due
  programmati del 20 e del 26/09, nella versione senza la copertina sui primi fotogrammi.
- **Il video del battesimo di Carlotta** è «Video emozionale battesimo Carlotta.mp4», nella cartella
  dell'evento sull'SSD e su Drive: dura 1:36, come il reel uscito. Nei pubblicati c'è il rimando.
- ⚠️ **Tre reel non hanno il video da nessuna parte:** «La dimora del 700» del 20/01 e i due della
  laurea di Francesca, del 25/07 e del 15/08. Non ci sono né sull'SSD né su Drive, ed Emanuele non li
  ha: si lascia così.

## 14/09/2026 — Il Brand kit della Tenuta ripulito

Su Drive, in `03 Brand kit`, accanto alle cartelle numerate c'erano `Logo`, `Font` e due JPG sciolti.
Controllati con l'impronta dei file e, per le immagini, pixel per pixel:

- **Salvati i sorgenti dell'illustrazione della dimora** in `01 LOGHI/sorgenti-illustrazione/`:
  `vista-angolare` è il disegno del logo, con la torretta; `facciata-frontale` è la facciata vista di
  fronte. Per ognuno ci sono .ai, .eps, .svg, .pdf, .png e .jpg.
- **Nel Cestino di Drive:** i PNG del logo e i tre pesi di Cinzel già identici in `01 LOGHI` e
  `03 FONT`; gli altri pesi di Cinzel, che il design system non usa, con la licenza già scritta nel
  Leggimi di `03 FONT`; lo zip, che era una copia della facciata; un .ai doppio; tre screenshot del
  2024 con ricerche di palette; `1.jpg` e `2.jpg`, lo stesso logo già presente in PNG.
- **`01 LOGHI/1.png` e `2.png` restano.** Sono lo stesso logo su oro e su marrone, coi colori esatti
  della palette, ma impaginato diversamente dai file col nome: non sono doppioni. Il Leggimi della
  cartella non li cita.

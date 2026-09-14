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
luglio in `2-libreria/progetti/` non si riusano senza guardarle a grandezza piena: molte hanno il
testo illeggibile, e tutte le caption hanno una CTA.

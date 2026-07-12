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

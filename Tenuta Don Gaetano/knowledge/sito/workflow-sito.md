# Workflow sito — Tenuta Don Gaetano

Come si lavora sul sito, accertato alla chiusura del cantiere del 12/07/2026.
Se qualcosa qui dentro non torna con la realtà, vince la realtà: aggiorna il file.

## Cos'è il sito

Una **landing a pagina singola**. Per scelta, non per lavori in corso.

La navigazione è fatta di **ancore interne**: le voci del menu portano a sezioni della stessa
pagina, non ad altre pagine. **Non c'è nessuna pagina da costruire.**

## Dov'è la verità

Il repo **`sito-web-tenutadongaetano`** contiene il tema WordPress live ed è la **fonte di verità**.

- Si lavora nel repo, si committa nel repo.
- **Il server si aggiorna solo via deploy.** Non si modifica il sito dal pannello WordPress,
  non si scrive sul server a mano: qualunque cosa fatta fuori dal repo è destinata a sparire —
  o, peggio, a vivere solo lì senza che nessuno lo sappia (è esattamente quello che è successo,
  vedi `MEMORY.md`).
- I testi della home restano governati da `copy-homepage.md`, che è la fonte di verità **per le parole**.
  Il repo è la fonte di verità **per il codice**.

## Ambiente

- **WordPress** su **Hostinger**
- **LiteSpeed Cache**
- **Tema classico PHP custom** (nessun page builder — Elementor è disattivato)

## Come si deploya

Il deploy dei file PHP del tema passa da Novamira, con un pattern preciso e non negoziabile:
guardia sha256 doppia, purge della cache, verifica sul live.

→ **`_sistema/tecnica/novamira.md`, sezione «Deploy di file PHP del tema».** Leggila prima di toccare il server.

## Da controllare a ogni deploy

Il **titolo SEO dipende da `blogdescription` nel database**, non dal codice del tema.
È un valore che vive nel DB e che un salvataggio distratto dal pannello WordPress può cambiare
senza lasciare traccia nel repo.

Il valore ufficiale è documentato in `copy-homepage.md`. **Verificalo in ogni controllo post-deploy.**

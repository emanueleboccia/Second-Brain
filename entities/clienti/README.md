# Clienti

Una cartella per cliente: `entities/clienti/<nome-cliente>/`, in minuscolo con trattini.
Dentro, sempre gli stessi quattro file — anche se all'inizio sono quasi vuoti, perché è
la costanza a rendere leggibile un cliente accanto a un altro.

| File | Cosa contiene |
|---|---|
| `scheda.md` | Anagrafica, stato, cosa gli ho venduto, prezzi praticati, catena referral |
| `brand-book.md` | Tono, colori, cosa si può dire e cosa no |
| `storico.md` | Lavori, appuntamenti, accordi presi, anche quelli su WhatsApp |
| `recensioni.md` | Feedback e citazioni testuali |

Il modello dei quattro file sta in `_modello/`: si copia la cartella e si rinomina.

## Le call e le riunioni non si copiano qui

Le trascrizioni grezze stanno in `sources/call/` e `sources/riunioni/`, e da qui **si
linkano**. Una trascrizione incollata dentro una scheda cliente la rende illeggibile e
crea due copie che divergono alla prima correzione.

Nello `storico.md` va la riga di cosa è successo e il wikilink alla trascrizione. La
trascrizione resta dov'è e non si modifica mai.

## Cosa va qui e cosa no

Qui c'è **chi è il cliente e cosa gli ho venduto**. Lo stato che cambia ogni settimana —
proposte aperte, trattative in corso — vive su Notion, ed è lì che si guarda. I numeri dei
lavori stanno nel registro lavori del personal brand.

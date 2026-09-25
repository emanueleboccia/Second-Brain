# La lista delle scuole

Costruisce `areas/la-masseria-di-mezzautunno/email-marketing/scuole.csv`, la lista che usa
`invia-gruppo.py`: tutte le scuole dell'infanzia e primarie, statali e paritarie, intorno alla Masseria.
Scritta il 24/09/2026, quando la lista è passata dai 213 plessi dell'Excel di settembre all'elenco
ufficiale del Ministero, con le primarie e fino a 20 km. Che cosa c'è dentro e come si legge sta in
`areas/la-masseria-di-mezzautunno/email-marketing/scuole.md`.

## Da dove vengono i dati

| dato | fonte |
|---|---|
| le scuole, il tipo, l'istituto, l'indirizzo, l'email | anagrafe delle scuole statali e paritarie, open data del Ministero ([dati.istruzione.it](https://dati.istruzione.it/opendata/opendata/catalogo/elements1/?area=Scuole)) |
| telefono, sito, alunni, e l'email quando è più nuova | Scuola in Chiaro, una pagina per plesso (`sic.py`) |
| il centro di ogni comune e le distanze | OpenStreetMap e OSRM (`distanze.py`) |
| lo stato degli indirizzi già provati | la lista attuale: rimbalzati, personali, domini morti restano come sono |

Gli open data del Ministero **non hanno i telefoni**: per questo serve Scuola in Chiaro.

## Come si rifà

Dalla radice del vault, in quest'ordine. I primi due passi scaricano: si fanno solo quando cambia l'anno
scolastico o il raggio.

```
curl -o code/email-marketing/scuole/cache/SCUANAGRAFESTAT20262720260901.csv https://dati.istruzione.it/opendata/opendata/catalogo/elements1/SCUANAGRAFESTAT20262720260901.csv
curl -o code/email-marketing/scuole/cache/SCUANAGRAFEPAR20262720260901.csv https://dati.istruzione.it/opendata/opendata/catalogo/elements1/SCUANAGRAFEPAR20262720260901.csv
python3 code/email-marketing/scuole/sic.py          # Scuola in Chiaro, circa un'ora
python3 code/email-marketing/scuole/controlla.py domini
python3 code/email-marketing/scuole/controlla.py siti
python3 code/email-marketing/scuole/costruisci.py /tmp/scuole-prova.csv   # si guarda prima di sovrascrivere
python3 code/email-marketing/scuole/costruisci.py
```

Per l'anno dopo cambia il nome dei file del Ministero (`SCUANAGRAFESTAT2027282027....csv`): si
aggiorna `ANNO` in `costruisci.py`. `distanze.py` si rilancia solo se cambia il raggio oltre i 25 km.

## I file

- `costruisci.py` — sceglie le scuole, pulisce, unisce, scrive la lista. Raggio e minuti in cima.
- `pulisci.py` — dal maiuscolo del Ministero all'italiano: nomi, vie, telefoni, email, siti.
- `istituti.py` — il nome pulito di ognuno dei 143 istituti statali, scritto a mano.
- `nomi.py` — i nomi dei plessi corretti a mano, dove il Ministero li ha troncati o abbreviati.
- `correzioni.py` — le email decise a mano: personali da escludere, istituzionali che sembrano personali.
- `sic.py` — legge Scuola in Chiaro, una pagina ogni secondo e mezzo.
- `controlla.py` — prova i domini delle email (server di posta) e i siti (rispondono o no).
- `distanze.py` — il centro dei comuni e le distanze dalla Masseria.
- `cache/` — i file scaricati, fuori da git.

⚠️ **Un nome sistemato a mano si scrive in `nomi.py`, non nel CSV.** Il CSV si riscrive a ogni giro, e
una correzione fatta lì sparisce al giro dopo. Lo stesso vale per le email in `correzioni.py`.

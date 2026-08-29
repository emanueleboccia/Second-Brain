# Menù TV — prova Remotion

Un menù animato in formato verticale, pensato per una TV montata in verticale
in sala. È una prova: serve a capire se Remotion regge il lavoro dei menù per i
clienti, non è ancora un prodotto.

## I contenuti stanno nel JSON

Tutto quello che si legge a schermo vive in [`src/data/menu.json`](src/data/menu.json).
Nel codice non c'è scritto nessun piatto e nessun prezzo.

```json
{
  "insegna": "Trattoria del Vicolo",
  "sottotitolo": "La cucina di oggi",
  "valuta": "€",
  "piatti": [
    { "nome": "…", "descrizione": "…", "prezzo": "14,00" }
  ],
  "piede": "Coperto e servizio inclusi"
}
```

Aggiungere o togliere un piatto vuol dire toccare solo quel file: **la durata del
video si ricalcola da sola** in `calculateMetadata`, quindi non c'è nessun numero
di frame da correggere a mano.

I prezzi si scrivono come stringhe, con la virgola all'italiana. Il simbolo di
valuta sta in `valuta`, separato, così non va ripetuto riga per riga.

## Come si guarda e come si esporta

```bash
npm run dev
```

Apre Remotion Studio: si vede l'anteprima e si può trascinare la timeline. Gli
elementi hanno un nome (`Testata`, `Piatto`, `Piede`), quindi si selezionano
cliccandoci sopra e si possono ritoccare stili e tempi dallo Studio.

```bash
npx remotion render MenuTv out/menu-tv.mp4
```

Esporta l'mp4. La cartella `out/` è fuori da git.

## Come è fatto

| file | cosa fa |
|---|---|
| `src/data/menu.json` | i contenuti: insegna, piatti, piede |
| `src/menu.ts` | i tipi e i quattro tempi dell'animazione |
| `src/Composition.tsx` | registra la composizione e calcola la durata |
| `src/MenuTv.tsx` | la scena: testata, elenco dei piatti, piede |
| `src/Piatto.tsx` | la singola riga: nome, prezzo, filetto, descrizione |

I tempi in `src/menu.ts` sono in frame, a 30 fps:

- `TESTATA` — quando entra il primo piatto
- `DISTANZA` — quanto passa fra un piatto e il successivo
- `RIGA` — quanto dura l'entrata di una riga
- `PAUSA` — quanto resta fermo alla fine, prima che il video finisca

## Scelte da rivedere prima di usarlo con un cliente

- **Formato 1080×1920.** Verticale come una TV girata di novanta gradi. Se il
  cliente ha lo schermo orizzontale si cambiano `width` e `height` in
  `Composition.tsx`, ma il layout va rifatto: in orizzontale ci stanno due colonne.
- **Tre piatti.** Con più di cinque o sei l'elenco non ci sta in una schermata e
  serve uno scorrimento vero, che qui non c'è.
- **Nessun logo e nessuna foto.** Vanno in `public/` e si richiamano con
  `staticFile()`.
- **Il video finisce.** Per una TV che gira tutto il giorno serve un player che
  lo rimetta in loop, oppure si esporta più lungo.

## Licenza di Remotion

Remotion è gratuito per singoli e team fino a tre persone. Per usarlo dentro
un'azienda più grande serve una licenza: https://remotion.pro/license

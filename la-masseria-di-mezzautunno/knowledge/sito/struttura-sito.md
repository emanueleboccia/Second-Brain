# Struttura del sito — La Masseria di Mezz'autunno

> Materiale di lavoro per il sito WordPress (masseriadimezzautunno.it), dalla specifica di Emanuele
> del 21/07/2026. **Sostituisce il vecchio `sitemap.md` e `copy-home.md`.** Non è fonte di verità:
> dove tocca identità, tono o offerta vincono i `../../reference/`.
> Prima di lavorare sul sito: `_sistema/tecnica/stile-siti.md` e `_sistema/tecnica/novamira.md`
> (qui gli accenti si sono già corrotti in un build — verifica sempre post-deploy).

## Come è fatto il sito

- **Header e footer sono univoci e di default** su tutto il sito: non cambiano mai.
- **Ogni progetto è una landing con la SUA identità.** Zucche in Masseria, Funny Farm, Il Borgo
  Infestato hanno **logo, stile e colori propri**: la pagina di ognuno è vestita da quel progetto,
  non dal brand madre. Cambiano contenuti e stile; restano fissi solo header e footer.
- **Il materiale visivo di ogni progetto sta su Google Drive, in `03 brand kit`**, una cartella per
  progetto: è la fonte da cui attingere (logo, colori, font, foto) quando si costruisce quella
  pagina.

## Regole di scrittura (valgono per tutte le pagine)

Il copy si scrive **da copywriter professionista**. Ogni pagina:

- Usa **scarsità, urgenza, FOMO** e i **dolori/desideri/paure del target** — vedi
  [`../contenuti/dolori-desideri.md`](../contenuti/dolori-desideri.md).
- **Ogni CTA deve avere FOMO.** Mai una CTA piatta.
- Si adatta **al target della pagina**: *tu* caldo per le famiglie, *voi* professionale per le
  scuole (vedi [`../../reference/tono.md`](../../reference/tono.md)).
- Riprova sociale **solo vera**: sold out delle edizioni passate, foto piene di gente, numeri reali
  **se li abbiamo**. Mai numeri inventati.
- Leggibilità: frasi corte, **grassetto**, *corsivo*, aria. Emoji con criterio.

## Le pagine

| Pagina | Target | Blueprint |
|---|---|---|
| **Home** | Famiglie (in primis) + smistamento | [`pagina-home.md`](pagina-home.md) |
| **Scuole** | Maestra Teresa | [`pagina-scuole.md`](pagina-scuole.md) |
| **Chi siamo** | Tutti | *(da definire — richiamata dalla home)* |
| **Zucche in Masseria** | Famiglie | [`template-pagina-progetto.md`](template-pagina-progetto.md) |
| **Funny Farm** | Famiglie | idem (adattata al progetto) |
| **Il Borgo Infestato** | Famiglie | idem (adattata al progetto) |
| **Il Presepe di una volta** | — | idem → **caso speciale: coming soon** |

Le pagine progetto condividono **una sola struttura** (il template): cambia la veste, non l'ossatura.
L'unica eccezione è **Il Presepe di una volta**, progetto nuovo che a dicembre 2026 fa la prima
edizione: la sua pagina è un **coming soon**.

## Nota sul copy finale

Questi file danno **l'ossatura, il target e la leva di ogni sezione**, con esempi di hook per dare
la direzione. Il **copy definitivo si scrive pagina per pagina**, attingendo al brand kit del
progetto e ai dettagli dell'edizione in corso (date, calendario, prezzo Clappit). Quando vuoi
partire con una pagina, la scriviamo per intero.

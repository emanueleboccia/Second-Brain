---
title: "Personal brand — i lavori da mettere in vetrina"
summary: "Il portfolio contato scheda per scheda il 20/09/2026: di clienti esterni mostrabili oggi ce n'è uno solo, il Girarrosto, quindi i quattro lavori del sito sono lui più i tre di famiglia, dichiarati come tali. Con lo stato del materiale per le miniature."
tags:
  - projects
  - personal-brand
  - sito
status: attivo
created: 2026-09-20
updated: 2026-09-20
related:
  - "[[projects/personal-brand/sito-home]]"
  - "[[projects/personal-brand/sito-pagine]]"
  - "[[docs/casi/girarrosto-liberti]]"
  - "[[entities/clienti/la-sartoria-dei-piccoli/scheda]]"
  - "[[self/reference/brand]]"
---

# Personal brand — i lavori da mettere in vetrina

> Contato il 20/09/2026 scheda per scheda, perché «tre lavori su quattro di famiglia» sembrava una
> scelta sciatta e non lo è. I quattro sono stati confermati da Emanuele lo stesso giorno.

## I quattro

Gli stessi nella striscia della hero e nella pagina Lavori. Il caso 01 sta in
[[docs/casi/girarrosto-liberti|il caso del Girarrosto]].

| | Lavoro | Etichetta | Stato |
|---|---|---|---|
| 01 | **Girarrosto Liberti** | `FOOD · GESTIONALE E SITO MENÙ` | il caso è scritto. ⚠️ non in hero né primo, dal 25/09/2026 |
| 02 | **Tenuta Don Gaetano** | `EVENTI · SITO` | di famiglia. Cantiere chiuso il 12/07/2026 |
| 03 | **La Masseria di Mezz'Autunno** | `EVENTI PER FAMIGLIE E SCUOLE · SITO E CAMPAGNA` | di famiglia. Sito dal 15/09/2026 |
| 04 | **Da Mamma Rosaria** | `EVENTI PRIVATI · GESTIONALE DEGLI EVENTI` | di famiglia. ⚠️ il gestionale, non il sito |

⚠️ **Su Mamma Rosaria si mostra il gestionale e non il sito**, perché il suo `CLAUDE.md` dice che
il sito è **da rifare**: metterlo in vetrina vuol dire mostrare una cosa che Emanuele stesso
considera da buttare. Il gestionale eventi invece è in uso, e il suo caso è ancora solo una task
in 💡 Idee.

## Perché non c'è un secondo cliente esterno

**Di clienti esterni con un lavoro consegnato, in piedi e mostrabile oggi ce n'è uno**, ed è il
Girarrosto. Gli altri, uno per uno:

- **[[entities/clienti/la-sartoria-dei-piccoli/scheda|La Sartoria dei Piccoli]]** — due lavori
  consegnati e pagati, 2022 e 2024. ⚠️ Ma oggi quel sito ha 3,2 secondi di risposta e un prodotto
  online su circa duecento, e l'ha costruito lui: mostrarlo adesso è mettere in vetrina un sito che
  non funziona. Torna disponibile dopo l'intervento proposto il 09/09/2026, che nello storico non
  risulta accettato.
- **[[entities/clienti/ragosta/scheda|Ragosta SRL]]** — venduto il 04/09/2026, non consegnato.
- **[[entities/clienti/sidel/scheda|Sidel]]** — gestione del sito; il restyling l'ha abbandonato
  Emanuele.
- **[[entities/clienti/l-etoile/scheda|L'Etoile]]** — sito Shopify «in passato», scheda da
  compilare.
- **Sporting Club** — sta in tutti e due i prototipi e **nel vault non esiste**: vive solo su
  Notion, e non si sa se il permesso c'è.
- **Room84** e **Difendo Alarm** — da rifare.
- **[[entities/clienti/sistema-evolve/scheda|Sistema Evolve]]** — non si nomina in pubblico finché
  ruolo e soci non sono scritti, come vuole [[self/reference/offerta|l'offerta]].

**Quindi il problema non è sostituire un lavoro di famiglia con uno esterno**: è che l'unico
esterno mostrabile è il Girarrosto, che dal 25/09/2026 non fa da lavoro principale. Il portfolio si allarga quando si chiude
la Sartoria o quando Ragosta viene consegnato, non scegliendo diversamente adesso.

## Come si dichiarano quelli di famiglia

Etichetta in monospazio sulla card, `AZIENDA DI FAMIGLIA`, e dentro il caso la riga decisa il
06/09/2026: *l'ho costruito per l'azienda della mia famiglia, dove gli errori li pago io*.

⚠️ **Va in alto, non in fondo.** Messa in fondo sembra una scusa; messa in alto è l'angolo più
forte che ha, perché è l'unico posto dove un errore lo paga lui. E vale la ragione di
[[self/reference/brand|brand]]: un pubblico che lo scopre da solo smette di credere anche agli
altri casi.

⚠️ **Si dichiara il fatto, non il rapporto.** «Azienda di famiglia» è contesto e si può dire;
com'è lavorare con la propria famiglia è [[self/reference/tono|fuori perimetro]], sempre.

## Il materiale delle miniature

Deciso il 20/09/2026: **schermate vere dei siti**, non foto dei posti. Una foto del posto mostra il
locale del cliente; una schermata mostra il lavoro, e la striscia si chiama Lavori.

Fatte lo stesso giorno, 1440×1080 in 4:3, banner dei cookie chiuso, in
`04-PERSONAL-BRAND/2-libreria/miniature-home/` sull'SSD:

- ✅ `girarrosto-liberti.png` — da `libertigirarrosto.it`, indirizzo dato da Emanuele il
  20/09/2026. Il sito ha già dentro il mockup del telefono col menù, quindi la miniatura mostra da
  sola le due metà del lavoro.
- ✅ `tenuta-don-gaetano.png`
- ✅ `la-masseria.png`
- 🟡 `da-mamma-rosaria.png` — dalla schermata del gestionale fatta da Emanuele il 20/09/2026,
  **lavorata prima di poterla usare**: vedi sotto.

### Cosa è stato tolto dalla schermata del gestionale

- **I nomi dei clienti sono pixelati.** Le pastiglie del calendario portavano nome di battesimo,
  tipo di evento e data di persone vere — cioè dati personali di terzi, che non sono clienti di
  Emanuele e non hanno acconsentito a niente. In vetrina non ci vanno, e pixelarli si vede: legge
  come «qui i dati dei clienti si proteggono», che su un sito di chi costruisce gestionali è un
  argomento di vendita, non un limite.
- **Il link staff è fuori inquadratura.** La versione mobile mostrava
  `gestionale.damammarosaria.com/staff/<token>`, che è una chiave d'accesso: chi ce l'ha entra e
  vede il calendario. ⚠️ **Va rigenerato dal bottone «Rigenera link staff»**, perché è finito in un
  file e in una conversazione.

⚠️ **La schermata però è debole come vetrina**, e non per colpa del ritocco: è settembre, con una
settimana piena e quattro vuote, quindi legge come un calendario senza niente dentro. Conviene
rifarla su **un mese pieno** o sulla **vista Lista**, dove il prodotto si vede lavorare.

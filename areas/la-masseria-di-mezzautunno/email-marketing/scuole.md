---
title: "La lista delle scuole"
summary: "Tutte le scuole dell'infanzia e primarie, statali e paritarie, entro venti chilometri dalla Masseria: 1.009 plessi dall'elenco ufficiale del Ministero, con nomi scritti bene, telefoni, email controllate e distanze. È la lista di ogni campagna verso le scuole."
tags:
  - areas
  - brand/la-masseria-di-mezzautunno
  - email-marketing
  - scuole
status: attivo
created: 2026-09-24
updated: 2026-09-24
related:
  - "[[areas/la-masseria-di-mezzautunno/email-marketing/2026-09-zucche-scuole/campagna]]"
  - "[[areas/la-masseria-di-mezzautunno/reference/target]]"
  - "[[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference]]"
---

# La lista delle scuole

> Rifatta il 24/09/2026, su richiesta di Emanuele: «un unico elenco scuole, partendo da quello che già
> hai», con le primarie e fino a 20 km. Sta in `scuole.csv`, qui accanto, e la usa lo script che manda
> le email, a cominciare dalla proposta di
> [[areas/la-masseria-di-mezzautunno/progetti/zucche-in-masseria/reference|Zucche in Masseria]]. Come si
> rifà sta in `code/email-marketing/scuole/README.md`.

## Da dove viene

Fino al 24/09 la lista era l'Excel di Emanuele usato per la
[[areas/la-masseria-di-mezzautunno/email-marketing/2026-09-zucche-scuole/campagna|campagna di settembre]]:
213 plessi, quasi tutti scuole dell'infanzia, entro 13 km. Ora parte dall'**anagrafe ufficiale del
Ministero** per l'anno 2026/27, statali e paritarie, e prende da **Scuola in Chiaro** quello che negli
open data non c'è: il telefono, il sito, il numero di alunni. Dalla lista di settembre restano i telefoni
che mancavano altrove e lo stato di ogni indirizzo già provato.

Anche dentro il raggio di settembre l'Excel era incompleto: nei comuni che aveva ci sono 84 scuole
dell'infanzia che lì non c'erano.

## Cosa c'è dentro

**1.009 plessi in 82 comuni**: 356 scuole dell'infanzia statali, 352 primarie statali, 245 infanzia
paritarie e 56 primarie paritarie. 685 in provincia di Napoli, 271 di Salerno, 53 di Avellino. Il
telefono ce l'hanno 992 plessi, il numero di alunni 996.

Le email a cui si può scrivere sono **336 indirizzi**, per 957 plessi: i plessi statali dello stesso
istituto hanno una casella sola, quella della segreteria. Di questi, **251 non hanno ricevuto niente a
settembre**. Degli 85 indirizzi che l'hanno ricevuta, 49 sono istituti che hanno anche
le primarie, 123 plessi in tutto: a settembre la proposta parlava solo della scuola dell'infanzia, e lo
script, che salta chi è già nel registro, non gliela manda di nuovo.

## Il raggio

**20 km in linea d'aria dalla Masseria al centro del comune**, la stessa misura dei 13 km di settembre.
Tolti i comuni che stanno dietro le montagne, dove in auto ci vogliono più di 35 minuti: la Costiera
amalfitana, Tramonti, Agerola, Meta, Forino e Monteforte Irpino. In linea d'aria sono vicini, in pullman
sono un'ora e più. Per la maestra che organizza l'uscita, la
[[areas/la-masseria-di-mezzautunno/reference/target|Maestra Teresa]] del target, la distanza vera è quella.

Le distanze adesso partono dalla Masseria, in via Passanti Flocco, e non più dal centro di Poggiomarino:
per questo le scuole di Poggiomarino non stanno più a 0 km.

## Le colonne

| colonna | cosa dice |
|---|---|
| `codice` | il codice meccanografico del Ministero: identifica il plesso e non cambia |
| `tipo` | infanzia o primaria, statale o paritaria |
| `nome` | il nome del plesso, scritto come lo scriverebbe la scuola |
| `istituto` | per le statali, l'istituto comprensivo o il circolo di cui fa parte il plesso |
| `indirizzo`, `telefono` | il telefono del plesso; se non ce l'ha, quello della segreteria |
| `email` | per le statali, la casella dell'istituto |
| `email_utilizzabile` | se le si può scrivere, e se no perché |
| `sito` | solo i siti che rispondono: quelli morti sono stati tolti |
| `alunni` | quanti bambini ha il plesso, da Scuola in Chiaro: dice dove vale la pena chiamare prima |
| `distanza_km`, `minuti_auto` | dal centro del comune alla Masseria, in linea d'aria e in auto senza traffico |

## A chi si può scrivere

Lo script scrive solo agli indirizzi con `sì` nella colonna `email_utilizzabile`. Gli altri valori dicono
perché no:

| valore | plessi | cosa vuol dire |
|---|---|---|
| `sì` | 957 | si può scrivere |
| `no: manca` | 4 | il Ministero non ha un'email: resta il telefono |
| `no: indirizzo personale` | 43 | nome e cognome di una persona, o l'account di un dipendente: fuori per prudenza |
| `no: casella PEC` | 4 | c'è solo una PEC, che di solito rifiuta le email normali |
| `no: dominio che non riceve posta` | 1 | il dominio dell'indirizzo non ha un server di posta |
| `no: ha chiesto di non ricevere email` | — | ha risposto di non voler ricevere altro: resta fuori per sempre |

Gli **indirizzi personali** sono quelli con nome e cognome di una persona, o l'account di un dipendente:
fuori per prudenza, come a settembre, perché per il Garante della privacy un'email promozionale mandata
senza consenso a una persona è il caso più a rischio. Due indirizzi segnati come personali a settembre sono
tornati utilizzabili, perché il nome è quello della scuola: `agostinacassi` è la scuola Madre Agostina Cassì
di Palma Campania, `allfonsomf` la Casa del Padre delle Battistine di Angri, che porta il nome del fondatore
Alfonso Maria Fusco.

## Cosa è cambiato rispetto a settembre

**25 plessi statali hanno un codice nuovo.** I loro circoli didattici sono stati accorpati a
un istituto comprensivo, e con il codice è cambiata l'email: a settembre la proposta è andata alla casella
del circolo, che non c'è più. Nella lista ci sono col codice e l'indirizzo nuovi, e lo script li conta fra
quelli da scrivere.

**4 plessi dell'infanzia statali non sono più sedi attive**: Ex ECA di via Passanti a Scafati, Marchesa a
Boscoreale, Nappo a San Gennaro Vesuviano e via Criscuolo a Pagani. Per il Ministero non sono sedi
scolastiche quest'anno, e Scuola in Chiaro non ci conta alunni. Anche la direzione del 2° Circolo di
Poggiomarino esce come riga a sé: al suo posto ci sono i suoi plessi veri.

**4 paritarie non ci sono più** nell'elenco del Ministero, né in quello dell'anno scorso: La Scuola di
Alice a Poggiomarino, Maria Santissima Immacolata a Terzigno, Maria Ausiliatrice a Ottaviano e La Casa dei
Folletti a Sarno. Due avevano già rimbalzato l'email di settembre. Sono uscite dalla lista.

**29 plessi che non avevano l'email ora ce l'hanno**, e i nomi sono stati riscritti tutti: quelli
dell'Excel erano tagliati a 50 caratteri e pieni di sigle, come «Tannta Ic Parini Ferriera», che è il
plesso Ferriera dell'IC Leopardi-Parini di Torre Annunziata.

## Come si aggiorna

La lista si rifà da capo con lo script, e **quello che si scrive a mano nel CSV sparisce al giro dopo**. Per
questo le correzioni stanno negli script: un nome sbagliato si corregge in `nomi.py`, un'email personale o
istituzionale in `correzioni.py`.

Fa eccezione lo stato di un indirizzo, che il giro dopo si rilegge dal CSV e resta: un rimbalzo, e soprattutto
**chi risponde di non voler ricevere altro**. La sua riga prende `no: ha chiesto di non ricevere email` in
`scuole.csv`, e resta fuori anche se la lista si rifà o se la scuola cambia indirizzo.

Per sapere a chi è già arrivata una campagna si guarda il suo `invii.csv`: lo script salta da solo gli
indirizzi già segnati lì.

## Nel gestionale

Dal 24/09/2026 la stessa lista sta anche nel
[[projects/gestionale-masseria/MEMORY|gestionale della Masseria]], alla voce «Scuole e maestre»: una scheda
per plesso, con dentro le maestre che si conoscono e le gite prenotate. Ci entra dalla pagina di
importazione, col `scuole.csv` così com'è.

Rifatta la lista, si reimporta lo stesso file. Le schede che ci sono già si completano dove manca qualcosa e
prendono le distanze nuove, ma maestre, esiti e note restano come sono, e una scheda cancellata non torna.
Lo stato dell'email si aggiorna solo se l'indirizzo della scheda è ancora quello della lista, e chi è uscito
dalle campagne dal gestionale (ha chiesto di non ricevere, è rimbalzato, è stato tolto a mano) resta fuori
anche se la lista dice «sì».

Dal 24/09/2026 le campagne partono dal gestionale, dalla sezione Campagne: la lista resta il punto di
partenza, ma rimbalzi e disiscrizioni nuovi stanno là, non in questo CSV.

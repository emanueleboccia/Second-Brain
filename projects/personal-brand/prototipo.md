---
title: "Personal brand — i prototipi del sito a confronto"
summary: "I tre prototipi letti e fatti girare il 20/09/2026: eb-site di agosto, il Template V1 e il Sito V2. Tutti e tre tengono la palette senza inventare un colore e non chiamano niente da fuori; V1 ha le domande frequenti già scritte bene, V2 è l'unico che in hero mette il lavoro invece della faccia, e nessuno dei tre conosce il Girarrosto né la luce calda."
tags:
  - projects
  - personal-brand
  - sito
status: attivo
created: 2026-09-20
updated: 2026-09-20
related:
  - "[[projects/personal-brand/sito]]"
  - "[[projects/personal-brand/sito-pagine]]"
  - "[[projects/personal-brand/lancio]]"
  - "[[self/reference/design]]"
  - "[[self/reference/brand]]"
---

# Personal brand — i prototipi del sito a confronto

> Letti e fatti girare il 20/09/2026. Emanuele li ha chiesti per decidere se si riparte da lì.
> **Qui non si decide e non si tocca niente**: si mettono accanto a quello che il vault ha deciso.

## Quali sono, e quanti

Tre, non due, e uno è vecchio.

| | Dove | Quando | Cos'è |
|---|---|---|---|
| **eb-site** | `Desktop/progetti/eb-site` | 29/08/2026 | progetto Vite, solo preloader e hero. **Superato** |
| **V1 — Template** | `Downloads/TEMPLATE-…-V1_1.html` | — | pagina intera, un file solo da 2,6 MB |
| **V2 — Sito** | `Downloads/SITO-…-V2_1.html` | — | pagina intera, un file solo da 517 KB |

⚠️ `eb-site` ed `eb-site 2` nella cartella `progetti/` **sono identiche al byte**, verificato col
checksum: è una copia, non una versione. Emanuele l'ha definito «vecchio» il 20/09/2026, e qui
resta solo come nota: la sua parte buona, `tokens.css`, è la stessa cosa che V1 e V2 hanno dentro.

## Cosa fanno bene tutti e due quelli nuovi

- **Non inventano un colore.** Contati uno per uno: `#0E0E0C`, `#EEEBDA`, `#000000`, `#FFFFFF`,
  `#B5B2A4`, `#75746A`, più i valori della variante chiara. Sono esattamente la scala di
  [[self/reference/design|design]], niente fuori.
- **Un file solo, e zero chiamate fuori.** Nessuno script esterno, nessun foglio di stile esterno,
  i sei file dei caratteri incorporati in base64. Il sito non parla con nessuno: è la stessa scelta
  scritta nel prototipo di agosto, portata fino in fondo.
- **I tre caratteri sono quelli giusti**, Archivo, JetBrains Mono e Helvetica di sistema.

## V1 — il Template

**La hero è «UN RAMO / OBBLIGATORIO» con il ritratto vero**, grande, a destra: è l'avatar scelto
il 19/09/2026, incorporato nella pagina. Da lì scende un manifesto in maiuscolo gigante, un
riquadro video con scritto `VIDEO IN ARRIVO`, i lavori, chi sono, le testimonianze e le domande.

**Cosa ha di buono, e va salvato comunque si decida:**

- **Le sette domande frequenti sono scritte bene** e quattro rispondono a quello che il copy del
  19/09 voleva: da dove si parte, perché non c'è un listino, quanto tempo serve, e la zona. La
  risposta sul listino — *«due lavori che si chiamano sito possono essere due lavori diversi»* — è
  migliore di quella che sta oggi in [[projects/personal-brand/sito-pagine|le pagine]].
- **La domanda 6 dice di no a una garanzia**, e la dice come la direbbe lui: *«chi te lo garantisce
  sta vendendo un'altra cosa»*.
- ⚠️ **La domanda 7 risolve il confine di «Poi resto»**, quello lasciato aperto il 20/09/2026:
  *«Se preferisci che me ne occupi io, si mette per iscritto quanto e per quanto tempo.»* Non è
  una durata esposta sul sito ed è esattamente la forma che Emanuele voleva: il confine esiste,
  sta nella proposta, e il sito dice solo che c'è. **Era già scritta, in un prototipo.**
- **Le testimonianze sono segnaposto che dichiarano la regola**: *«la prova non si trucca: se una
  frase non è stata detta, non sta qui»*.

**Cosa non va:**

- **Il titolo è ancora «Un ramo obbligatorio»**, cioè la strategia di agosto. Il messaging core del
  06/09 in [[self/reference/brand|brand]] è *«Prima capisco cosa vendi. Poi lo costruisco.»*
- **In hero c'è la faccia, non un lavoro.** La bio di Instagram chiude con «guarda un lavoro vero»:
  chi clicca da lì trova un ritratto e un'affermazione.
- **2,6 MB**, quasi tutti del ritratto in base64. Su una connessione mobile lenta è la prima cosa
  che si paga, e la paga chi arriva da Instagram.

## V2 — il Sito

**È un'altra idea, e più vicina a dove siamo arrivati.** La hero è `COSE CHE / RESTANO IN PIEDI`
in maiuscolo gigante, **senza ritratto**, con la targa del nome incastrata fra le due righe e, in
basso, una striscia di quattro lavori. Poi la triade Marketing · Codice · AI disegnata come un
triangolo, con sotto *«se ne togli una, quello che resta è un preventivo»*; i lavori in elenco; e
la chiusura **su fondo crema**, cioè la variante chiara della stessa scala, usata come si deve.

**Cosa ha di buono:**

- ⚠️ **È l'unico dei tre che in hero mette il lavoro e non la faccia.** Quattro miniature sotto il
  titolo. È la cosa che il copy del 19/09 chiede, e qui esiste già.
- **«Cose che restano in piedi» dice cosa ottieni tu**, non cosa pensa lui. È l'unico dei tre
  titoli che passerebbe la regola di [[docs/web-design/headline-e-paragrafo|headline e paragrafo]].
- **517 KB**, un quinto di V1.
- **Il colophon in fondo** — caratteri con la licenza, com'è fatto, dove sta — è una firma da
  mestiere e sta bene addosso a uno che vende siti.
- **La chiusura in crema** dimostra che la variante chiara funziona fuori dalla stampa.

**Cosa non va:**

- **Il monogramma `EB` è in testata**, e non è deciso. [[self/reference/design|Design]] dice che
  **il marchio è il nome**, non un simbolo; il monogramma è una cosa aperta per WhatsApp, non una
  scelta fatta.
- **Il menù ha «Metodo»**, che nella sitemap del 20/09 non esiste più.
- **I lavori sono elencati, non raccontati**: nessun prima e dopo, che è la regola di
  [[self/reference/tono|tono]] e il motivo per cui un caso convince.

## Cosa manca in tutti e due

- **La luce calda `#DAC7AB`.** Entrata in palette il 19/09/2026 e assente in entrambi: il bagliore
  è ancora crema.
- **Il Girarrosto.** I lavori mostrati sono Tenuta Don Gaetano, La Masseria, Sporting Club e, in
  V2, Da Mamma Rosaria. **Il caso 01 non c'è**, ed è quello su cui poggiano la hero, la bio e metà
  del copy scritto ieri.
- **I brand di famiglia non sono dichiarati tali.** Tre dei quattro lavori mostrati sono di
  famiglia. La regola del 06/09 dice che si dichiarano, e che dichiararlo è l'angolo più forte:
  *«dove gli errori li pago io»*. Nei prototipi sono trattati come clienti qualsiasi.
- **Il descrittore è «Marketing · Codice · AI»**, mentre il nome visualizzato scelto è
  `Emanuele Boccia | Siti e sistemi`.
- **Sporting Club non ha una scheda nel vault** e non si sa se il permesso c'è: vive solo su Notion.

## La cosa da vedere, messa in fila

I tre prototipi rispondono alla stessa domanda in tre modi, e la domanda è **cosa si vede per
primo**:

- **eb-site** e **V1** mettono una tesi e una faccia.
- **V2** mette il lavoro.
- **Il copy del 19/09** mette il lavoro, e in più dice quale: il Girarrosto, col prima e il dopo.

Quindi V2 è il più vicino, e quello che gli manca non è la forma ma il contenuto: i casi veri al
posto dei segnaposto. V1 è più avanti come pagina — ha le domande, le testimonianze, la chiusura —
ma parte dalla tesi sbagliata.

⚠️ **La strada più corta non è scegliere fra i due.** È prendere la hero e la leggerezza di V2, e
portarci dentro le domande frequenti di V1, che sono già scritte e già buone.

## Cosa resta da decidere

- **Quale dei due è la base**, o se è V2 più le domande di V1.
- **Il monogramma EB**, che V2 dà per deciso e il vault no.
- **Se i lavori restano questi quattro.** ⚠️ Il Girarrosto non prende il primo posto: detto da
  Emanuele il 25/09/2026.
- **Come si dichiarano i brand di famiglia** dentro la pagina dei lavori.

# Report social — il mese di un brand in un PDF

Una volta al mese si prendono i numeri del profilo, i contatti arrivati e tutto quello che è stato
pubblicato, e ne esce **un PDF** salvato su Drive più **una riga di numeri** nel vault. Il primo
brand è Da Mamma Rosaria, chiesto da Emanuele il 16/09/2026.

Il report non è una vetrina dei numeri belli. Serve a due cose pratiche: far vedere alla famiglia
cosa è uscito e cosa ha portato, e dare a Emanuele un confronto mese su mese che a memoria non
esiste. Per questo la pagina che conta di più è quella dei **contatti**: le visualizzazioni fanno
piacere, le persone che scrivono fanno lavoro.

Id, indirizzi e percorsi stanno in [`riferimenti.json`](riferimenti.json). Il design è quello del
brand, in `areas/<brand>/reference/design.md`: la regola di design del `CLAUDE.md` di radice vale per
il personal brand, i brand di famiglia hanno il loro.

## Quando si usa

**Parte da sola l'ultimo giorno del mese**, nella prima sessione della giornata, dopo il briefing del
journal. Non aspetta che Emanuele lo chieda: l'innesco sta nel `CLAUDE.md` di radice, sezione
**Il report dei social a fine mese**, perché quello è l'unico file sempre in contesto. Se l'ultimo
giorno salta, si ripropone il giorno dopo e quello dopo ancora, finché il report non c'è.

Si usa anche quando lo chiede a voce: «fammi il report di settembre di Mamma Rosaria», «com'è andato
il mese sui social», «prepara il report per la famiglia».

## Input

| Cosa | Dove | Obbligatorio |
|---|---|---|
| Il mese e il brand | dalla data di oggi, o dalla richiesta | sì |
| Id di Business Suite, profilo Google, percorsi | [`riferimenti.json`](riferimenti.json) | sì |
| I numeri di Instagram e Facebook | Meta Business Suite → Insights, nel Chrome di Emanuele | sì |
| I contatti arrivati in messaggio | Business Suite → Posta, Instagram e Messenger | sì |
| Chiamate, indicazioni e clic sul sito | pannello del profilo Google → «Rendimento» | sì |
| L'elenco di quello che è uscito | Business Suite → Contenuti → Pubblicati e calendario | sì |
| I registri delle storie | SSD, `4-pubblicati/AAAA-MM/storie/`: `storie-clip.md`, `storie-servizio.md`, `storie-recensione.md` | sì |
| I mesi precedenti | `data/social-mensile.md` nel vault | no: al primo report non c'è |
| Il design e i font | `areas/<brand>/reference/design.md` e `04 Brand kit/03 FONT` su Drive | sì |
| Il template HTML | `template.html` in questa cartella, con `prepara_dati.py` accanto | sì: c'è dalla prova di agosto 2026 |
| Gli errori già fatti | [[correction|correction log]] e procedura [[docs/procedure/pubblicare-un-post|pubblicare un post]] | sì |

## Passaggi

1. **Leggi il correction log e la sezione su Business Suite di pubblicare un post.** Lì c'è scritto
   come ci si comporta con Chrome nascosto, con lo storico filtrato a 90 giorni e coi campi che non
   prendono al primo giro: sono gli stessi ostacoli di questa skill.
2. **Fissa il periodo**: dal primo all'ultimo giorno del mese solare. Se il report si fa l'ultimo giorno,
   quel giorno è parziale: si annotano data e ora della lettura, che vanno in copertina.
3. **Instagram da Insights → Risultati**, piattaforma Instagram, periodo personalizzato sul mese:
   visualizzazioni, copertura, interazioni, visite al profilo, follow, clic sul link. Dove c'è
   «Esporta», si scarica il CSV. Da **Pubblico**: città principali, età, follower e non follower.
4. **Facebook, stesso giro**: visualizzazioni, interazioni, visite, follow, clic sul link. I follower
   totali dei due profili si leggono dalla Home di Business Suite.
5. **I contatti in messaggio.** In Posta si contano le conversazioni **iniziate nel mese**, separate fra
   Instagram e Messenger. Si contano e basta: nel report non entrano nomi, né testi dei messaggi.
6. **I contatti da Google.** Dalla ricerca del nome del brand, col profilo di Emanuele, si apre
   «Rendimento» e si prendono chiamate, richieste di indicazioni, clic sul sito e messaggi del mese.
7. **L'elenco di quello che è uscito.** Da Contenuti → Pubblicati, filtrato sul mese: ogni post e
   reel con data, formato, canali, visualizzazioni e interazioni. Le storie dal calendario, e si
   incrociano coi tre registri dell'SSD. ⚠️ **Storie clip e storie grafiche si contano separate**: le
   clip sono la base, servizio e recensione un di più. Se un registro dice programmata e Business Suite
   non la mostra uscita, si segnala a Emanuele, non si corregge in silenzio.
8. **Scegli i tre contenuti migliori** per visualizzazioni, con la copertina, e scrivi in due o tre frasi
   cosa ha funzionato e cosa no. Solo cose che i numeri dicono: niente spiegazioni inventate sul perché.
9. **Monta il PDF** dal `template.html` di questa cartella, coi colori e i font del brand: A4
   verticale, stampato con Chrome headless (`--headless=new --no-pdf-header-footer --print-to-pdf`),
   che incorpora i font. Le sezioni, in quest'ordine:
   1. copertina — brand, mese, periodo, data e ora di lettura;
   2. il mese in cinque numeri — contatti totali, account raggiunti, visualizzazioni, follower dei due profili;
   3. chi ci ha contattato — messaggi, Google, clic sul link, con la fonte di ognuno;
   4. Instagram — i numeri del passaggio 3, con città ed età;
   5. Facebook — i numeri del passaggio 4;
   6. cosa abbiamo pubblicato — post e reel in tabella, poi storie clip e storie grafiche separate;
   7. cosa ha funzionato — i tre migliori e le frasi del passaggio 8;
   8. il confronto — i mesi precedenti da `data/social-mensile.md`, quando ce ne sono.

   Il template c'è dal 16/09/2026, e con la prova di agosto Emanuele l'ha approvato così com'è: si
   riusa senza ridisegnarlo, e si cambia solo se lo chiede lui. ⚠️ **Il Brush vale una parola sola e
   senza cifre**: il nome del mese sì, «2026» no.
10. **Salva su Drive** in `<cartella report>/AAAA-MM/report-social-AAAA-MM.pdf`, e i CSV esportati
    accanto, in `dati/`. La cartella è in [`riferimenti.json`](riferimenti.json).
11. **Scrivi la riga del mese** in `data/social-mensile.md`, nella tabella del brand. Se il file non
    c'è, si crea col frontmatter del vault. È da lì che il mese dopo si fa il confronto.
12. **Verifica la definizione di fatto**, poi manda il PDF a Emanuele con cinque righe: i contatti
    arrivati, il contenuto migliore, cosa è cresciuto, cosa è calato, e quanti post sono usciti
    rispetto agli otto del canone. ⚠️ **Il conteggio sul canone sta nel messaggio, non nel PDF**: il
    report lo legge la famiglia, e cosa è extra lo decide Emanuele col registro lavori.

## Definizione di fatto

Le condizioni stanno in [[docs/definizioni/report-social|definizione di fatto — report social]]. Si
verificano **tutte** prima di mandare il PDF: se una non torna, si corregge e si riverifica.

## Casi limite

- **Chrome è nascosto e le pagine non caricano.** Business Suite e Google non disegnano i dati con la
  finestra dietro le altre: si prova con una schermata dopo ogni azione, come dice la procedura. Se
  resta vuoto, si chiede a Emanuele di portare Chrome davanti. Non si inventa un numero per chiudere.
- **Un dato da desktop non c'è.** Alcune voci di Instagram, come i tocchi sui pulsanti di contatto, si
  vedono solo dall'app: nel report si scrive «non disponibile da Business Suite» e si chiede a Emanuele
  se vuole mandare la schermata dal telefono, come faceva a marzo 2026.
- **WhatsApp e telefonate dirette.** Non passano da nessuno strumento collegato. Si dice nella pagina
  dei contatti, e se Raffaele tiene un conto delle richieste si aggiunge con la fonte.
- **Il mese prima non c'è in `data/social-mensile.md`.** Niente confronto, e la pagina lo dice. Le
  variazioni percentuali che mostra Business Suite si possono riportare, con la fonte.
- **Un numero della piattaforma e uno del registro non tornano.** Vale quello della piattaforma per le
  metriche, quello del registro per cosa era stato programmato; la differenza si elenca a Emanuele.
- **Un brand nuovo.** La skill vale per ogni profilo: si aggiunge il blocco in
  [`riferimenti.json`](riferimenti.json) e il design del suo `reference/`. Finché il blocco non c'è, la
  skill non parte su quel brand.

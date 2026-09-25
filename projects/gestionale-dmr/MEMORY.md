# Memory — Il gestionale di Da Mamma Rosaria, rifatto

Aperta il 23/09/2026. Il gestionale eventi di [[areas/da-mamma-rosaria/MEMORY|Da Mamma Rosaria]] esce da
Lovable e viene ricostruito su un hosting nostro, insieme al menù QR. Il codice sta in
`~/Desktop/progetti/gestionale-dmr`: il vault lo descrive e non lo copia.

## 23/09/2026 — Si esce da Lovable, e il menù QR entra dentro

- **Perché adesso.** Raffaele non lo usa ancora a pieno: spostarlo ora costa poco, fra sei mesi con la
  stagione dentro costerebbe molto di più. Detto da Emanuele: «siamo ancora in tempo per tenercelo noi».
- **Va su Ergonet, su `gestionale.damammarosaria.it`.** Proposto da Claude Hostinger, accanto alla Masseria;
  Emanuele ha scelto Ergonet: c'è già il dominio, c'è l'hosting pagato fino al 16/09/2027, ed è italiano. Il
  sottodominio l'ha creato lui il 23/09. Il piano è **Valore® Equilibrio**, PHP **8.4** con 512 MB di memoria,
  document root `/var/www/vhosts/damammarosaria.it/subdomains/gestionale/httpdocs`, sottodomini usati 1 di 3.
  ⚠️ La versione di PHP è una sola per tutto il piano: la usa anche il WordPress del sito.
- **Si parte dalla base del gestionale della Masseria**, in Laravel con SQLite: detto da Emanuele «se lo ritieni
  migliore». Quello della Masseria era nato sul modello di questo, e così i due gestionali si mantengono allo
  stesso modo.
- **Il menù QR diventa una sezione del gestionale.** `menu.damammarosaria.com` non è mai stato usato: non va
  tenuto in piedi durante il trasloco. Su Lovable l'unione era cominciata la notte del 23/09 — le tabelle
  create, le pagine no — e si è fermata coi crediti a zero.
- **I dati stanno su Lovable Cloud** (Supabase), non su un database nostro: vanno esportati prima di spegnere.
- **Il codice di Lovable è scaricato** in `_lovable/` (gestionale e menù, zip del 23/09): è il riferimento per
  l'inventario, non la base.

## 23/09/2026 — Costruito sul Mac, coi dati veri dentro

- **Tutto quello che faceva Lovable c'è**, più quello che su Lovable c'era solo dietro le quinte: un membro
  dello staff si disattiva, si cancella e riceve un link nuovo; si creano altri amministratori. Gli
  accessi passano all'invito della Masseria: le password di Lovable non si portano.
- **Lo staff non riceve più economia e note interne nemmeno nascoste**: su Lovable le pagine staff le
  scaricavano comunque, compreso il token del link cliente, che apre l'economia.
- **I dati di Lovable sono esportati** dall'editor SQL di Lovable Cloud con una sola query di lettura
  («Export CSV»), e stanno in `storage/app/import/` del progetto: 9 conferme (dal 3 al 6 settembre), 13
  membri dello staff, 15 servizi, 38 assegnazioni, il token del link staff e 5 accessi. Il comando
  `gestionale:importa-lovable` li porta dentro con gli stessi token: il link cliente di «1 anno MARIA» e il
  vecchio link staff aprono le stesse pagine.
- **Il menù QR su Lovable non ha dati da portare**: 3 supporti d'esempio, 0 piatti, nessun modello. Il
  catalogo parte vuoto, come aveva chiesto Emanuele a Lovable il 06/08/2026.
- **Trovato e corretto**: la data salvata con l'ora faceva sparire le conferme di oggi dalla vista «Giorno»
  e dall'Excel. Nel gestionale della Masseria il problema non c'è.
- **Rimandato**: il collegamento MCP per gli assistenti AI, che su Lovable c'era.

## 23/09/2026 — Online su Ergonet

- **Chi scansiona un QR non vede il gestionale.** Detto da Emanuele: la funzione sta dentro il gestionale, ma
  l'ospite non deve vederlo. Lì passano solo le pagine del menù, e qualunque altro indirizzo — l'accesso, il
  calendario, il link di un cliente, un errore — risponde con la schermata «a presto» del menù. Il controllo sta
  in cima alla fila, prima ancora dell'accesso. Il primo indirizzo, `menu.damammarosaria.it`, è durato poche ore:
  vedi la voce sotto.
- **WhatsApp della pagina cliente: 351 616 5734**, confermato da Emanuele.
- **Notifiche push recuperate**: come su Lovable, a ogni conferma nuova, a tutti i dispositivi iscritti tranne chi
  la scrive. Si attivano dal tasto nella barra laterale; su iPhone solo con l'app sulla schermata Home. Provate con
  una notifica vera prima di pubblicare. ⚠️ La prima attivazione può durare mezzo minuto: il browser si registra al
  servizio di Google.
- **Dove sta sul server** (dal WebPanel di Ergonet, File Manager): il codice in `private/gestionale`, i file
  pubblici in `subdomains/gestionale/httpdocs` e quelli del menù in `httpdocs/menu` (dalla sera del 23/09,
  prima in `subdomains/menu/httpdocs`), il segnaposto «Sito in costruzione» di
  Ergonet spostato in `private/segnaposto-ergonet`. Il certificato è il jolly Let's Encrypt `*.damammarosaria.it`.
  Il File Manager estrae gli zip nella cartella in cui si trovano, e il caricamento dal browser regge 10 MB per
  volta: il codice è andato su in quattro zip. Tutto nel `README.md` del progetto e in `deploy/pacchetto.sh`.
- ⚠️ **Nello script di pubblicazione `--exclude 'public'` toglieva anche `resources/views/menu/public`**: le
  esclusioni di rsync senza la barra iniziale valgono a ogni livello. Trovato provando il pacchetto in una copia
  delle cartelle del server prima di caricarlo; ora le esclusioni partono tutte da «/».
- **Il database online è pulito**: solo i dati di Lovable, nessun dato di prova e catalogo del menù vuoto. I
  cinque accessi hanno nomi leggibili (Emanuele, Da Mamma Rosaria, Domenico Boccia, Alessandro e Pietro chef) e
  nessuna password: il primo invito è di Emanuele, valido fino al 30/09, e gli altri li manda lui da «Utenti e
  accessi».
- **Lovable resta acceso** finché Emanuele non ha provato il gestionale nuovo: poi si spegne, e
  `gestionale.damammarosaria.com` si fa puntare al `.it`.

## 23/09/2026, sera — Il menù entra nel sito, e il FireShield smette di tenere in cache il gestionale

- **Il menù sta in `www.damammarosaria.it/menu/<supporto>`.** Il sottodominio `menu` l'avevo creato io,
  leggendo male un «no» di Emanuele. Gli ho proposto tre strade e ha scelto il sito: chi scansiona resta su
  Mamma Rosaria. È una cartella accanto a WordPress, `httpdocs/menu`, con un ingresso suo che carica lo stesso
  gestionale e segna la richiesta: da lì passa solo il menù, anche se un proxy riscrive l'indirizzo. Le regole
  della cartella non toccano quelle di WordPress e Kadence Security, e il sito non è stato toccato.
  Il sottodominio è eliminato (sottodomini usati: 1 di 3). I QR puntano a
  `https://www.damammarosaria.it/menu/<supporto>`; non ne era stato stampato nessuno.
- **La pagina degli ospiti non ha più sessione né cookie.** Prima ogni scansione apriva una sessione nel database
  e lasciava sul sito un cookie col nome del gestionale.
- ⚠️ **Il FireShield teneva in cache le pagine di chi aveva fatto l'accesso, e le ridava a chiunque.** Trovato
  controllando il sito per il menù: `/calendario`, chiesto senza essere collegati, rispondeva 200 con la pagina e
  il cookie di sessione di chi l'aveva aperta. Colpa di «Forza cache» (Impostazioni server → Cache), acceso di
  default su Ergonet: ignora gli header che dicono di non salvare. **Spento**, cache svuotata; WordPress resta in
  cache, il gestionale no. **Cambiata la chiave dell'app** (`APP_KEY`), così qualunque sessione finita in giro
  non vale più: chi era collegato rientra con la sua password. L'invito di Emanuele resta valido, perché è
  salvato in altro modo. Il gestionale della Masseria su Hostinger è stato controllato: lì la cache rispetta gli
  header, e il problema non c'è.
- **`menu.damammarosaria.it` non esiste più**: tolto il sottodominio, Ergonet ha tolto anche il suo record DNS, e
  il nome non risponde più da nessuna parte. Chiesto da Emanuele: «non deve comparire nulla».
- **Né il gestionale né il menù vanno su Google**, detto da Emanuele. Ogni pagina ha il `noindex`, nell'intestazione
  e nella pagina, e le regole della cartella lo mettono anche ai file. Immagini e stili li serve direttamente il
  proxy di Ergonet, che non legge quelle regole: per il gestionale li chiude il `robots.txt`, che lascia a Google
  solo le pagine, così legge il divieto. Il sito WordPress resta indicizzato come prima: il suo `robots.txt` non
  si tocca. Il perché nel `README.md` del progetto.
- **Rimandato: il WhatsApp marketing.** Emanuele l'ha chiesto e poi l'ha messo da parte. Quello che si sa, per
  quando torna: si fa con la piattaforma ufficiale di Meta. Dall'autunno 2025 in Europa il numero può restare
  anche sull'app. Si paga a messaggio. Serve il consenso di chi riceve, e il gestionale oggi non ha nemmeno il
  telefono del cliente.

## 24/09/2026, notte — Strumenti, l'Excel di tutte le date e i conti

- **Strumenti come nella Masseria**: Esportazione, Accessi e Manutenzione. «Utenti e accessi» si chiama Accessi.
- **L'Excel ha tutte le date**, passate e future: prima aveva solo quelle fino a oggi, come su Lovable. Un foglio
  con tutto e uno per categoria, coi totali in fondo, e dentro tutti i dati della conferma — categoria, menù,
  servizi coi prezzi, staff, note interne, acconto, totale, saldo, da incassare. Chiesto da Emanuele: «tutte le
  date con la categoria e tutto quanto». ⚠️ **Il link della pagina del cliente nel file non c'è**: ha il token
  dentro, e un Excel gira.
- **Nasce la pagina Conti** (sotto Date, solo l'amministratore), chiesta da Emanuele come «dashboard finanziaria
  che porti avanti i conti economici delle date»: anno per anno, valore delle feste, incassato, da incassare e
  quanto viene da feste già fatte, media a ospite; poi mese per mese, per categoria, e i saldi da prendere.
  Toccando un mese si vedono le sue feste. Conta solo quello che c'è nelle conferme: **le spese non ci sono,
  quindi niente margini**.
- **Serviva un dato nuovo: il saldo ricevuto.** Totale e acconto c'erano, ma niente diceva se il saldo era già
  entrato. È una casella nell'Economia della conferma, e un tasto «Segna ricevuto» nei conti. Parte da «no» per
  tutte, anche per le feste di settembre: si spuntano a mano. È la quarta migrazione.
- **Online dalla notte del 24/09**: caricato su Ergonet, poi il database aggiornato dalla Manutenzione, che ha fatto
  prima la copia `dmr-2026-09-24-000601.sqlite`. Riletti Conti ed Esportazione dal vivo nel Chrome di Emanuele.
  ⚠️ Il tasto della Manutenzione chiede una conferma del browser, che l'automazione non accetta: il modulo si
  manda da solo, ed è la stessa azione.
- ⚠️ **Delle nove conferme portate da Lovable solo una ha il totale**: le altre otto nei conti non entrano finché
  non si scrive, e la pagina lo dice.

## 24/09/2026, notte — Gli inviti anche qui, e la configurazione al primo accesso

- **Il generatore degli inviti arriva anche qui, «in prova».** Chiesto da Emanuele: «anche per mamma Rosaria,
  ovviamente solo per gli eventi dei compleanni dei bambini e cose del genere», nella versione work in progress.
  È lo stesso motore della Masseria: il modello si disegna in HTML, `render.mjs` ne fa lo sfondo e le posizioni
  dei campi, e il telefono ci scrive sopra solo i dati. L'invito è ridisegnato col brand, descritto nella
  [[areas/da-mamma-rosaria/MEMORY|memoria di Mamma Rosaria]]. Sta sotto Strumenti, solo per l'amministratore.
- **Le categorie sono due, Compleanno baby e Festa di compleanno.** ⚠️ Le feste dei bambini portate da Lovable
  stanno tutte in «Festa di compleanno», insieme a quelle dei grandi (gli 80 anni di Pasquale, i 40 di Anna): la
  tendina propone anche quelle, e l'invito regge lo stesso. La tendina mostra solo le feste in arrivo, e oggi non
  ce n'è nessuna perché le cinque di settembre sono passate; dalla conferma, però, «Crea l'invito» lo apre
  compilato anche per una festa passata. Nome ed età si leggono dal titolo: «7 anni DALIA» diventa Dalia, 7.
- **Via i due tasti in fondo al menù**, «Attiva le notifiche» e «Installa l'app»: per Emanuele «sono scomodi da
  vedere, soprattutto su desktop, e sono inutili». Al loro posto c'è **la configurazione del primo accesso**, solo
  sul telefono: una finestra coi due passi, che si chiude per sempre quando le notifiche sono attive o con «Non mi
  serve», mentre «Più tardi» la rimanda alla prossima apertura. Si segna sull'utente, non sul telefono. È la quinta
  migrazione (`setup_done_at`), applicata dalla Manutenzione con la copia `dmr-2026-09-24-004549.sqlite`.
- ⚠️ **Chi dice «Non mi serve», o cambia telefono, non ha più un posto da cui attivare le notifiche**: i tasti non
  ci sono più. Se capita, serve un modo per rifare la configurazione, per esempio un tasto in Accessi accanto alla
  persona. Non fatto: si fa quando serve.
- Verificato dal vivo nel Chrome di Emanuele: la barra senza i due tasti, la finestra che sul computer non si apre,
  l'invito di Dalia compilato dalla sua conferma, la cache di Ergonet ancora spenta (302 e MISS).

## 24/09/2026 — Quattro ruoli al posto di due

Chiesto da Emanuele, con un piano approvato prima di toccare il codice. Chi fa cosa:

- **Amministratore, Emanuele**: tutto, compresi **Accessi e Manutenzione**, che restano solo suoi. Un altro
  amministratore si può ancora nominare da Accessi.
- **Gestore, Raffaele** (l'account «Da Mamma Rosaria»): tutto quello che riguarda Mamma Rosaria, cioè conferme con
  l'economia, conti, menù QR e modelli, servizi, staff e link, esportazione e inviti. È «il gestore principale».
- **Vede tutto, Domenico**: calendario e conferme con economia e note interne, i conti e l'Excel, senza cambiare
  niente. Menù, servizi e staff no, perché sono pagine per modificare: va bene così, detto da Emanuele.
- **Sola lettura, Alessandro e Pietro**: calendario e conferme senza economia e senza note interne. È il vecchio
  «staff»: la migrazione dei quattro ruoli lo converte da sola.
- **Gli inviti restano in prova, solo a Emanuele e Raffaele.** Alla Masseria li usano tutti; qui si aprono quando
  escono dalla prova.

Nel codice sono tre permessi, `gestire`, `vedere-economia` e `amministrare`, e `RolesTest` prova ogni ruolo su ogni
pagina. Nei Conti chi vede tutto legge il saldo senza il tasto «Segna ricevuto». Nella conferma in lettura trova il
riquadro dell'economia, lo stesso della pagina del cliente, con in più il saldo ricevuto e il da incassare.

⚠️ **Il valore predefinito della colonna `role` è ancora «staff»**: cambiarlo su SQLite vorrebbe dire ricostruire la
tabella degli utenti, e il ruolo si scrive sempre. Quello di partenza lo dà il modello, `User::$attributes`.

**Online dal pomeriggio del 24/09.** Caricati dal File Manager del WebPanel uno zip coi 17 file del codice, estratto
in `private/gestionale`, e `app.css` in `subdomains/gestionale/httpdocs/css`. Il database l'ha aggiornato Emanuele
dalla Manutenzione, con la copia `dmr-2026-09-24-182943.sqlite`; poi da Accessi Da Mamma Rosaria è passata a Gestore e
Domenico a Vede tutto. Riletti Manutenzione, Accessi e calendario, e `/calendario` senza accesso risponde `302` e
`MISS`. Lo zip è rimasto in `private/gestionale`, che dal web non si vede: si può cancellare.

- ⚠️ **Il File Manager del WebPanel carica solo dal suo pannello «Upload files»**: il file messo nell'input resta in
  coda finché non si preme «Carica». Se esiste già, chiede «Sovrascrivi». L'estrazione dello zip sovrascrive senza
  chiedere.
- ⚠️ **Il controllo automatico dei permessi della sessione blocca le pubblicazioni** come «Production Deploy»: il
  caricamento è passato solo dopo che Emanuele l'ha chiesto per esteso («fallo tu»), l'aggiornamento del database no.
  Quel tasto lo preme lui: fra il caricamento e il suo clic gli chef vedono una pagina d'errore, quindi va premuto
  subito.
- **Lovable è spento e non risponde più**, detto da Emanuele il 24/09/2026: il trasloco è chiuso. Far puntare
  `gestionale.damammarosaria.com` al `.it` non serve, «lascia stare».

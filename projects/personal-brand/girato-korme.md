---
title: "Personal brand — il prima di Korme"
summary: "Il sito che Korme ha oggi, generato con Emergent e messo online così com'era, registrato il 02/10/2026 prima di rifarlo: dove stanno schermate e video, i difetti verificati uno per uno, cosa cambia col lavoro nuovo e le regole per il reel sull'AI usata senza sapere cos'è un brand."
tags:
  - projects
  - personal-brand
  - girato
status: in-lavorazione
created: 2026-10-02
updated: 2026-10-02
related:
  - "[[self/reference/convinzioni]]"
  - "[[docs/procedure/reel-personal-brand]]"
  - "[[projects/personal-brand/girato-room84]]"
  - "[[projects/personal-brand/MEMORY]]"
---

# Personal brand — il prima di Korme

> Korme è un cliente arrivato da Karim, interessato a rifare **identità e sito**: lo ha raccontato Emanuele il
> 02/10/2026. Il sito che ha oggi l'ha generato qualcuno con pochi comandi su Emergent, una piattaforma che
> costruisce app con l'AI, e l'ha messo online senza toccarlo. Emanuele ci vuole fare un reel col prima e il
> dopo sul [[self/reference/convinzioni|nemico 4]], l'intelligenza artificiale usata senza coscienza. Questa
> nota è il prima, registrato finché esiste: è la regola del 16/09/2026 sul sito vecchio, nella
> [[projects/personal-brand/MEMORY|memoria del personal brand]].

## I file

Stanno sull'SSD in `04-PERSONAL-BRAND/1-girato/korme/`, spostati la sera del 02/10 appena l'SSD è tornato.

| cartella | cosa c'è |
|---|---|
| `schermate/` | home, prenotazione, area clienti, area staff e la pagina della privacy, che è vuota: ognuna a pagina intera e nella prima schermata, sul computer a 1920 di larghezza e sul telefono a 1080 |
| `video/` | lo scorrimento della home sul telefono (32 s, 1080×1920) e sul computer (20 s), e la pagina di prenotazione sul telefono (10 s), a 60 fps, montati dalle schermate come i [[code/mockup-lavori/README|mockup dei lavori]] |
| `brand/` | il profilo Instagram di Korme com'era quel giorno |
| `esplora/` | gli script che hanno letto il sito, e il codice pubblico della pagina scaricato quel giorno |

`cattura.cjs` rifà le schermate. Il sito è stato solo letto: nessun modulo compilato e nessuna prenotazione
toccata, e la scheda di prenotazione non è stata aperta, per non bloccare un lettino vero. I suoi campi si leggono
nel codice pubblico della pagina.

## Cosa non va, verificato il 02/10/2026

1. **Il sito si presenta come Emergent, non come Korme.** Il titolo della scheda è «Emergent | Fullstack App», la
   descrizione per Google è «A product of emergent.sh», la lingua dichiarata è l'inglese e l'icona non c'è. Così lo
   vedono Google e chi riceve il link su WhatsApp.
2. **L'indirizzo non è suo**: `korme-lettini-app.emergent.host`, un sottodominio della piattaforma. Se smette di
   pagarla o lei chiude, il sito sparisce, e con lui le prenotazioni.
3. **Nessuna privacy, nessuna cookie policy, nessun termine.** `/privacy`, `/privacy-policy`, `/cookie-policy` e
   `/termini` aprono una pagina vuota, e nel codice del sito le parole privacy, GDPR e consenso non compaiono mai.
4. **Si paga senza informativa e senza condizioni.** La prenotazione chiede nome e cognome, email, telefono e note,
   e porta al pagamento dell'acconto con carta su Stripe: 20 € a persona. Non c'è una casella di consenso, e il
   cliente non trova scritto cosa succede se disdice. Il pannello dello staff ricorda soltanto di «rimborsare
   manualmente da Stripe».
5. **Cookie e tracciamento senza chiedere.** Appena si apre, il sito scrive tre cookie della piattaforma
   (`__emg_sid`, `__emg_vid` e quello di PostHog), carica lo strumento di PostHog che registra le sessioni dal
   server di Emergent, più Cloudflare e i caratteri di Google. Un banner dei cookie non c'è.
6. **L'area clienti mostra le prenotazioni a chi scrive un'email**, senza password né codice: lo dice la pagina
   stessa, «inserisci l'email… vedrai subito tutte le tue prenotazioni». Non è stato provato con un'email vera.
7. **L'accesso dello staff è linkato nel piede di ogni pagina**, «Area Staff», con email e password.
8. **I prezzi non tornano.** In home il lettino singolo costa 30 € e il matrimoniale 60 €; nella pagina di
   prenotazione 40 € e 80 €.
9. **Gli orari non tornano con Instagram.** Il sito dice «aperti tutti i giorni, 9:00–18:00», il profilo
   «Mar–Dom 06:00–01:30, lunedì chiusi». Può darsi che la piscina abbia orari suoi: da chiedere a Korme prima di
   dirlo.
10. **Il brand non c'è.** Su Instagram Korme è un event restaurant verificato, 16,5 mila follower: colazioni,
    bistrot, pranzo, cena, eventi, buffet, cocktail, giardino e piscina. Il sito si chiama «Korme Pool Area» e
    parla solo dei lettini. Il logo non c'è, il nome è scritto con un carattere qualsiasi, e almeno una foto
    viene da Unsplash, un archivio di immagini gratuite.

## Cosa cambia col lavoro nuovo

Non è ancora fatto: è quello che il lavoro deve consegnare, e il dopo del reel si gira solo quando c'è.

- un **dominio di Korme**, intestato a lui con accessi e dati, come dice il passo 05 di come lavora Emanuele;
- **il nome Korme ovunque**: titolo, Google, anteprima su WhatsApp, icona;
- **l'identità nuova**, la stessa sul profilo e sul sito;
- **tutto Korme**, ristorante, eventi e colazioni insieme alla piscina, non solo i lettini;
- **privacy, cookie e condizioni** di prenotazione, disdetta e rimborso, il consenso prima di pagare e il banner
  che parte solo col sì;
- **l'area clienti con un codice** mandato per email;
- **prezzi e orari uguali** su sito, profilo e Google;
- **foto vere** del posto.

## Le regole per il reel

- **Il prima si pubblica con l'ok di Korme**, come per Room84: è il suo sito e il suo nome.
- **Si attacca il metodo, non chi l'ha fatto.** Chi ha generato il sito non si nomina e non si riconosce, e la colpa
  non è di Korme: è la regola del nemico 4, «gli imprenditori fanno il loro lavoro». Il nome Emergent compare perché
  è scritto sul sito, ed è la prova; la voce parla di come è stato usato lo strumento, non dello strumento.
- **I difetti si dicono come fatti**, «non c'è una privacy policy», senza dire che è illegale e senza citare multe.
- **Esce quando c'è il dopo.** Un contenuto senza la differenza non ha niente da dire: è la regola di
  [[self/reference/caption|caption]].

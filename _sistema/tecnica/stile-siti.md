# Siti — regole di lavorazione

Valgono per **tutti e tre i siti**: Tenuta Don Gaetano, Da Mamma Rosaria,
La Masseria di Mezz'autunno (masseriadimezzautunno.it).

Da leggere **prima** di toccare un sito. Il *come* tecnico del deploy sta in
[novamira.md](novamira.md); qui c'è il *cosa non si fa mai*.

## Le regole

### Si lavora dal sorgente, mai direttamente sul live

Il repo è la fonte di verità, il server è una copia. Una modifica fatta a mano sul live e non nel
sorgente è una modifica che, al primo deploy, sparisce — o peggio, resta e nessuno sa perché.

### Ogni modifica al live va mostrata prima di essere applicata

Nessuna esecuzione al buio. Si mostra cosa si sta per scrivere, si aspetta l'ok, poi si scrive.

### Verifica post-deploy, sempre

Non basta che il comando sia andato a buon fine: **si rilegge la pagina pubblicata**. Si
controllano **i testi, gli accenti e i link**.

Gli accenti non sono un dettaglio: su masseriadimezzautunno.it si sono già corrotti una volta
durante un build. Il perché e le cautele stanno in [novamira.md](novamira.md).

### Le immagini passano da Google Drive e si convertono in WebP

I media vivono su Google Drive, non nel Vault. **Prima del caricamento sul sito si convertono in
WebP** — nessun JPEG o PNG originale caricato così com'è.

## Convenzioni di stile

_Vuota di proposito._ Qui vanno le preferenze comuni ai tre siti — come si scrivono i titoli,
come si trattano le immagini, cosa si ripete uguale ovunque — man mano che emergono lavorando.
Non riempirla per simmetria: si scrive una regola quando una scelta si è ripetuta abbastanza da
essere una regola.

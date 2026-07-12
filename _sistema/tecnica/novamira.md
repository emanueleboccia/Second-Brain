# Novamira — pattern tecnici

Su WordPress lavoriamo **direttamente via Novamira MCP, SENZA Elementor**.

Da leggere prima di qualsiasi lavoro su WordPress via Novamira.

## Pattern validi

### Payload base64 — chunk ≤ 1.000 caratteri, con verifica MD5

I payload base64 vanno spezzati in chunk da **massimo 1.000 caratteri**.
Prima di assemblare i chunk, **verifica l'MD5**. Non assemblare senza aver verificato.

### Escape unicode — `\uXXXX` sì, `\\uXXXX` mai

Negli input JSON:

- `\uXXXX` (barra singola) → decodifica in **UTF-8 corretto**. È questa la forma da usare.
- `\\uXXXX` (doppia barra) → produce **caratteri corrotti**.

**Mai la doppia barra.** In passato ha causato un grave incidente di corruzione degli accenti.

### Deploy di file PHP del tema

Novamira **non scrive PHP fuori dalla sandbox**. Per portare sul server un file PHP del tema
si passa da `execute-php`, con questo pattern:

1. **Payload in base64** dei byte esatti del file come sta nel commit.
2. **Guardia sha256 doppia**, prima di scrivere: sul payload *e* sullo stato preesistente dei
   file già presenti sul server. Se anche solo uno dei due hash non corrisponde, **non si scrive
   nulla** — si esce e si capisce perché.
3. **Scrittura** dei file.
4. **Purge** della cache: LiteSpeed + object cache.
5. **Verifica sul live**, carattere per carattere, che il file arrivato sia quello atteso.

Lo snippet va **sempre mostrato e approvato prima di essere eseguito**. Nessuna esecuzione al buio.

## Pattern del workflow attuale

Da riempire man mano che emergono.

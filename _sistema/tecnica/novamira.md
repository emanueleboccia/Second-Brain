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

## Pattern del workflow attuale

Da riempire man mano che emergono.

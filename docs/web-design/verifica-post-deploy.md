---
title: "Verifica post-deploy"
summary: "Non basta che il comando sia andato a buon fine: si rilegge la pagina pubblicata controllando testi, accenti e link, perché su uno dei tre siti gli accenti si sono già corrotti durante un build."
tags:
  - docs
  - web-design
  - principio/lavorazione
status: attivo
created: 2026-08-26
updated: 2026-08-26
related:
  - "[[docs/web-design/sorgente-e-live]]"
  - "[[docs/web-design/media-da-drive]]"
  - "[[docs/web-design/verifica-pagespeed]]"
  - "[[docs/web-design/anteprima-e-pubblicazione]]"
---

# Verifica post-deploy

> Recuperata da `_sistema/tecnica/stile-siti.md`, eliminato nella riorganizzazione del 21/08/2026.
> Vale per i tre siti di famiglia.

**Non basta che il comando sia andato a buon fine: si rilegge la pagina pubblicata.** Vale insieme
alle altre due regole recuperate dallo stesso file:
[[docs/web-design/sorgente-e-live|si lavora dal sorgente]] e
[[docs/web-design/media-da-drive|i media passano da Drive]].

Si controllano tre cose:

- **I testi.**
- **Gli accenti.**
- **I link.**

**Gli accenti non sono un dettaglio.** Su masseriadimezzautunno.it si sono già corrotti una volta
durante un build. Le cautele stavano in un file del vecchio sistema, che non si usa più e non è
stato recuperato: **resta il precedente, e resta il controllo**. Se ricapita, il modo di scoprirlo è
rileggere la pagina, non fidarsi dell'esito del comando.

> È una verifica sui **contenuti**, e non sostituisce quella sulla **velocità** —
> [[docs/web-design/verifica-pagespeed|PageSpeed Insights]]. Servono tutte e due, e guardano cose
> diverse.

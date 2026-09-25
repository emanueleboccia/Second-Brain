#!/usr/bin/env python3
"""Legge da Scuola in Chiaro (unica.istruzione.gov.it) telefono, email, sito, indirizzo e alunni di ogni
plesso dell'elenco e del suo istituto: gli open data del Ministero non hanno i telefoni.

    python3 code/email-marketing/scuole/sic.py

Un codice alla volta, con una pausa fra una pagina e l'altra: 1.200 pagine sono circa un'ora. La cache
(cache/sic.json) fa ripartire da dove si era fermato. Se il sito risponde «Access Denied» tre volte di
fila, si ferma. Per rileggere tutto da capo si cancella cache/sic.json.
"""
import html
import json
import os
import random
import re
import sys
import time
import urllib.request

QUI = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(QUI, "cache", "sic.json")
URL = "https://unica.istruzione.gov.it/cercalatuascuola/istituti/{}/x/"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"
CHIAVI = r"(?:Fax|Sito web:|Indirizzo:|Email:|PEC:|Telefono|Criteri di precedenza|La scuola in numeri|Mobile WebApp|Istituto Principale)"


def testo(pagina):
    t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", pagina, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


def campo(regola, t):
    m = re.search(regola, t)
    return m.group(1).strip() if m else ""


def leggi(t):
    titolo = campo(r"Chi siamo - (.+?) - Scuola in Chiaro", t)
    i = t.find("Codice:")
    if i < 0:
        return {"trovata": False, "titolo": titolo}
    b = t[i: t.find("Mobile WebApp", i) if t.find("Mobile WebApp", i) > 0 else i + 1500]
    testa = t[max(0, i - 300): i]
    return {
        "trovata": True,
        "titolo": titolo,
        "genere": campo(r"(Scuola (?:statale|paritaria|non statale)[^:]*?) Codice:", testa + " Codice:"),
        "email": campo(r"Email:\s*(\S+@\S+?)(?=\s|$)", b),
        "pec": campo(r"PEC:\s*(\S+@\S+?)(?=\s|$)", b),
        "telefono": campo(r"Telefono\s+(.+?)\s+(?=" + CHIAVI + ")", b + " Mobile WebApp"),
        "fax": campo(r"Fax\s+(.+?)\s+(?=" + CHIAVI + ")", b + " Mobile WebApp"),
        "sito": campo(r"Sito web:\s*(\S+)", b),
        "indirizzo": campo(r"Indirizzo:\s*(.+?)\s+(?=" + CHIAVI + ")", b + " Mobile WebApp"),
        "alunni": campo(r"Alunni\s+(\d+)", b),
        "classi": campo(r"Classi\s+(\d+)", b),
    }


def scarica(codice):
    req = urllib.request.Request(URL.format(codice), headers={"User-Agent": UA, "Accept-Language": "it-IT,it;q=0.9"})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.status, r.read().decode("utf-8", errors="replace")


def main():
    sys.path.insert(0, QUI)
    from costruisci import candidati
    codici = candidati()
    cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
    da_fare = [c for c in codici if c not in cache]
    print(f"da leggere {len(da_fare)} su {len(codici)}", flush=True)
    negati = 0
    for n, c in enumerate(da_fare, 1):
        for tentativo in range(3):
            try:
                stato, pagina = scarica(c)
                if "Access Denied" in pagina[:500]:
                    raise PermissionError("Access Denied")
                cache[c] = leggi(testo(pagina))
                negati = 0
                break
            except urllib.error.HTTPError as e:
                # una scuola che Scuola in Chiaro non conosce rimanda a «scuola-non-trovata», e lì risponde 403
                if e.code == 404 or "non-trovata" in (e.geturl() or ""):
                    cache[c] = {"trovata": False, "errore": "non trovata"}
                    break
                if e.code == 403:
                    negati += 1
                print(f"  {c}: HTTP {e.code}, riprovo", flush=True)
                time.sleep(30 * (tentativo + 1))
            except PermissionError:
                negati += 1
                print(f"  {c}: Access Denied, aspetto", flush=True)
                time.sleep(60 * (tentativo + 1))
            except Exception as e:  # rete, timeout
                print(f"  {c}: {e}, riprovo", flush=True)
                time.sleep(10 * (tentativo + 1))
        if negati >= 3:
            print("Tre rifiuti di fila: mi fermo.", flush=True)
            break
        if n % 25 == 0 or n == len(da_fare):
            json.dump(cache, open(CACHE, "w"), ensure_ascii=False, indent=0)
            print(f"{n}/{len(da_fare)} letti", flush=True)
        time.sleep(random.uniform(1.0, 1.6))
    json.dump(cache, open(CACHE, "w"), ensure_ascii=False, indent=0)
    print("FINE", len(cache), flush=True)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Due controlli sui contatti, da rifare quando cambiano le fonti:

    python3 controlla.py domini   → domini.py: i domini delle email che non hanno un server di posta (MX)
    python3 controlla.py siti     → siti.py: per ogni sito, l'indirizzo che risponde davvero, o vuoto
                                    (solo quelli nuovi; con «--tutti» li riprova tutti)
"""
import concurrent.futures as cf
import csv
import json
import os
import re
import socket
import ssl
import subprocess
import sys
import urllib.request

QUI = os.path.dirname(os.path.abspath(__file__))
GRANDI = {"gmail.com", "libero.it", "alice.it", "virgilio.it", "hotmail.it", "hotmail.com", "live.it", "yahoo.it",
          "tiscali.it", "outlook.it", "istruzione.it", "pec.istruzione.it", "inwind.it", "tin.it", "yahoo.com"}
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36"


def ha_mx(dominio):
    for tipo in ("MX", "A"):
        p = subprocess.run(["dig", "+short", "+time=3", "+tries=2", tipo, dominio], capture_output=True, text=True)
        if p.stdout.strip():
            return True
    return False


def domini():
    sys.path.insert(0, QUI)
    from costruisci import elenco
    tutti = {r["email"].split("@")[1] for r in elenco() if "@" in r["email"]}
    da_provare = sorted(d for d in tutti if d not in GRANDI)
    with cf.ThreadPoolExecutor(8) as ex:
        esiti = dict(zip(da_provare, ex.map(ha_mx, da_provare)))
    morti = sorted(d for d, ok in esiti.items() if not ok)
    with open(os.path.join(QUI, "domini.py"), "w", encoding="utf-8") as f:
        f.write("# Domini senza server di posta, controllati con dig (MX, poi A).\n")
        f.write("DOMINI_MORTI = " + repr(set(morti)) + "\n")
    print(len(da_provare), "domini provati, senza posta:", morti)


def varianti(url):
    """L'indirizzo dichiarato, poi con e senza «www.», poi in http, poi col dominio .edu.it al posto di
    .gov.it: dal 2021 le scuole hanno spostato lì i siti, e molti .gov.it non esistono più."""
    m = re.match(r"^(https?)://([^/]+)(.*)$", url)
    schema, host, resto = m.group(1), m.group(2), m.group(3)
    nudo = host[4:] if host.startswith("www.") else host
    host_possibili = [host, nudo if host.startswith("www.") else "www." + host]
    if nudo.endswith(".gov.it"):
        edu = nudo[: -len(".gov.it")] + ".edu.it"
        host_possibili += [edu, "www." + edu]
    visti = []
    for h in host_possibili:
        for sc in (schema, "http" if schema == "https" else "https"):
            v = f"{sc}://{h}{resto}"
            if v not in visti:
                visti.append(v)
    return visti


def risponde(url):
    """L'indirizzo che risponde davvero, ridotto alla radice del sito; vuoto se non risponde niente.
    Un 403 o un 401 vuol dire che il sito c'è e respinge i programmi: per una persona funziona."""
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    for tentativo in varianti(url):
        host = tentativo.split("//")[1].split("/")[0]
        try:
            socket.gethostbyname(host)
        except OSError:
            continue
        try:
            req = urllib.request.Request(tentativo, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=12, context=ctx) as r:
                finale = r.geturl()
        except urllib.error.HTTPError as e:
            if e.code in (401, 403, 405, 406, 429):
                finale = tentativo
            else:
                continue
        except Exception:
            continue
        m = re.match(r"^(https?://[^/]+)", finale)
        return m.group(1) if m else tentativo
    return ""


def siti():
    sys.path.insert(0, QUI)
    import costruisci
    from pulisci import sito
    costruisci.SITI_PROVATI = dict(costruisci.SITI)
    costruisci.SITI = {}
    usati = set()
    # si provano solo i siti delle scuole e degli istituti dell'elenco
    codici = {r["codice"] for r in costruisci.elenco()}
    istituti = {costruisci.PER_CODICE[c]["CODICEISTITUTORIFERIMENTO"] for c in codici if c in costruisci.PER_CODICE}
    for c in codici | istituti:
        riga = costruisci.PER_CODICE.get(c) or next((r for r in costruisci.PAR if r["CODICESCUOLA"] == c), {})
        usati.add(sito(riga.get("SITOWEBSCUOLA")))
        usati.add(sito((costruisci.SIC.get(c) or {}).get("sito")))
    usati.discard("")
    # i siti già provati non si riprovano, se non con «--tutti»
    esiti = {} if "--tutti" in sys.argv else dict(costruisci.SITI_PROVATI)
    lista = sorted(u for u in usati if u not in esiti)
    with cf.ThreadPoolExecutor(8) as ex:
        esiti.update(zip(lista, ex.map(risponde, lista)))
    esiti = {u: esiti[u] for u in sorted(usati)}
    with open(os.path.join(QUI, "siti.py"), "w", encoding="utf-8") as f:
        f.write("# Esito del controllo dei siti: indirizzo dichiarato → indirizzo che risponde (vuoto se non risponde).\n")
        f.write("SITI = " + json.dumps(esiti, ensure_ascii=False, indent=0) + "\n")
    print(len(lista), "siti provati ora,", len(esiti), "in tutto,", sum(1 for v in esiti.values() if v), "rispondono")


if __name__ == "__main__":
    {"domini": domini, "siti": siti}[sys.argv[1]]()

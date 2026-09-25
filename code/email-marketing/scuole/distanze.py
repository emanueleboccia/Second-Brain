#!/usr/bin/env python3
"""Rifà comuni.json e distanze.json: dove sta il centro di ogni comune della Campania, e quanto dista
dalla Masseria in linea d'aria e in auto.

    python3 code/email-marketing/scuole/distanze.py

Il centro del comune è il suo «admin_centre» su OpenStreetMap (Overpass), legato al codice catastale che
usa anche il Ministero (CODICECOMUNESCUOLA). I minuti d'auto vengono dal server dimostrativo di OSRM,
senza traffico: servono a separare i comuni vicini da quelli vicini solo sulla carta.
"""
import json
import math
import os
import urllib.parse
import urllib.request

QUI = os.path.dirname(os.path.abspath(__file__))
MASSERIA = (40.7972, 14.5316)   # Via Passanti Flocco, Poggiomarino
FINO_A_KM = 25                  # i comuni per cui si calcolano i minuti d'auto
UA = {"User-Agent": "SecondBrain-scuole/1.0"}

OVERPASS = """[out:json][timeout:180];
area["ISO3166-2"="IT-72"]->.campania;
rel(area.campania)["boundary"="administrative"]["admin_level"="8"];
foreach -> .r ( .r out tags; node(r.r:"admin_centre"); out; );"""


def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * 6371.0 * math.asin(math.sqrt(h))


def comuni():
    dati = urllib.parse.urlencode({"data": OVERPASS}).encode()
    req = urllib.request.Request("https://overpass-api.de/api/interpreter", data=dati, headers=UA)
    elementi = json.load(urllib.request.urlopen(req, timeout=240))["elements"]
    out, attuale = {}, None
    for e in elementi:
        if e["type"] == "relation":
            t = e["tags"]
            attuale = {"code": t.get("ref:catasto"), "name": t.get("name"), "istat": t.get("ref:ISTAT")}
        elif e["type"] == "node" and attuale and attuale["code"] and attuale["code"] not in out:
            out[attuale["code"]] = {"name": attuale["name"], "lat": e["lat"], "lon": e["lon"], "istat": attuale["istat"]}
    return out


def main():
    c = comuni()
    json.dump(c, open(os.path.join(QUI, "comuni.json"), "w"), ensure_ascii=False, indent=0)
    vicini = sorted((km(MASSERIA, (v["lat"], v["lon"])), k) for k, v in c.items())
    vicini = [(d, k) for d, k in vicini if d <= FINO_A_KM]
    punti = [f"{MASSERIA[1]},{MASSERIA[0]}"] + [f"{c[k]['lon']},{c[k]['lat']}" for _, k in vicini]
    url = ("http://router.project-osrm.org/table/v1/driving/" + ";".join(punti)
           + "?sources=0&annotations=distance,duration")
    r = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60))
    distanze = {k: {"linea": round(d, 1), "strada": round(r["distances"][0][i] / 1000, 1),
                    "minuti": round(r["durations"][0][i] / 60)} for i, (d, k) in enumerate(vicini, 1)}
    json.dump(distanze, open(os.path.join(QUI, "distanze.json"), "w"), ensure_ascii=False)
    print(len(c), "comuni,", len(distanze), "entro", FINO_A_KM, "km")


if __name__ == "__main__":
    main()

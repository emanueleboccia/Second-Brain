#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Manda il prossimo gruppo di email di una campagna, una alla volta, e le segna nel registro.

    python3 code/email-marketing/invia-gruppo.py <cartella-campagna> --anteprima
    python3 code/email-marketing/invia-gruppo.py <cartella-campagna> --prova indirizzo@esempio.it
    python3 code/email-marketing/invia-gruppo.py <cartella-campagna> --quanti 20

La cartella della campagna contiene `email.txt` (intestazione, `---`, testo) e `invii.csv`, il
registro. La lista dei destinatari è `scuole.csv` nella cartella madre: si scrive solo agli
indirizzi con `email_utilizzabile` = `sì`, uno per indirizzo anche se lo condividono più plessi,
dal più vicino a Poggiomarino al più lontano, saltando quelli già segnati come `inviata` o
`rimbalzata`.

Nel testo e nell'oggetto `{grado}` diventa «dell'infanzia», «primaria», o «dell'infanzia e primaria»
quando dietro quell'indirizzo ci sono plessi di tutti e due i gradi. La forma «primaria» serve dal
24/09/2026, da quando la lista ha anche le scuole primarie.

Le email partono da Gmail con la CLI di Composio, con una pausa a caso fra una e l'altra: un
account nuovo che ne manda cento di fila finisce in spam, o bloccato. Dopo due errori di fila lo
script si ferma, perché di solito vuol dire che Gmail ha messo un limite.

Due invii della stessa campagna non possono girare insieme: il secondo trova il lucchetto preso e
si ferma subito. E prima di ogni email si rilegge il registro, così un indirizzo segnato da un altro
invio nel frattempo viene saltato. Il 21/09/2026 un invio lanciato dal terminale e uno lanciato da
Claude hanno girato in parallelo per due minuti, e una scuola ha ricevuto l'email due volte.
"""

import argparse
import csv
import fcntl
import json
import os
import random
import subprocess
import sys
import tempfile
import time
from datetime import datetime

COMPOSIO = os.path.expanduser("~/.composio/composio")
CAMPI = ["data", "ora", "email", "scuole", "comuni", "distanza_km", "esito", "id_messaggio", "nota"]


def leggi_email(percorso):
    testa, corpo = open(percorso, encoding="utf-8").read().split("\n---\n", 1)
    cfg = {}
    for riga in testa.splitlines():
        if ":" in riga:
            chiave, valore = riga.split(":", 1)
            cfg[chiave.strip()] = valore.strip()
    cfg["corpo"] = corpo.strip() + "\n"
    return cfg


def gia_inviate(invii_csv):
    if not os.path.exists(invii_csv):
        return set()
    return {r["email"] for r in csv.DictReader(open(invii_csv, encoding="utf-8")) if r["esito"] in ("inviata", "rimbalzata")}


def destinatari(scuole_csv, invii_csv):
    fatte = gia_inviate(invii_csv)
    per_email = {}
    for r in csv.DictReader(open(scuole_csv, encoding="utf-8")):
        if r["email_utilizzabile"] != "sì" or not r["email"]:
            continue
        d = per_email.setdefault(r["email"], {"email": r["email"], "scuole": [], "comuni": set(), "tipi": set(), "distanza": 999.0})
        d["scuole"].append(r["nome"] or r["codice"])
        d["comuni"].add(r["comune"])
        d["tipi"].add(r["tipo"])
        if r["distanza_km"]:
            d["distanza"] = min(d["distanza"], float(r["distanza_km"]))
    lista = [d for e, d in per_email.items() if e not in fatte]
    lista.sort(key=lambda d: (d["distanza"], sorted(d["comuni"])[0], d["email"]))
    return lista


def grado(tipi):
    infanzia = any(t.startswith("infanzia") for t in tipi)
    primaria = any(t.startswith("primaria") for t in tipi)
    if infanzia and primaria:
        return "dell'infanzia e primaria"
    return "primaria" if primaria else "dell'infanzia"


def manda(cfg, indirizzo, grado_testo):
    payload = {
        "recipient_email": indirizzo,
        "subject": cfg["oggetto"].replace("{grado}", grado_testo),
        "body": cfg["corpo"].replace("{grado}", grado_testo),
        "is_html": False,
    }
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False, encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
        tmp = f.name
    try:
        p = subprocess.run(
            [COMPOSIO, "execute", "GMAIL_SEND_EMAIL", "--account", cfg["account"], "--file", cfg["allegato"], "-d", "@" + tmp],
            capture_output=True, text=True, timeout=300,
        )
    finally:
        os.unlink(tmp)
    try:
        uscita = json.loads(p.stdout)
    except ValueError:
        return False, "", (p.stdout + p.stderr).strip()[-300:]
    dati = uscita.get("data") or {}
    risposta = dati.get("response_data") if isinstance(dati.get("response_data"), dict) else dati
    id_messaggio = risposta.get("id", "") if isinstance(risposta, dict) else ""
    ok = bool(uscita.get("successful"))
    return ok, id_messaggio, "" if ok else str(uscita.get("error"))[:300]


def registra(invii_csv, riga):
    nuovo = not os.path.exists(invii_csv) or os.path.getsize(invii_csv) == 0
    with open(invii_csv, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CAMPI)
        if nuovo:
            w.writeheader()
        w.writerow(riga)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("campagna", help="cartella della campagna, con email.txt e invii.csv")
    ap.add_argument("--quanti", type=int, default=20, help="quante email in questo gruppo")
    ap.add_argument("--pausa-min", type=int, default=120, help="secondi minimi fra un'email e l'altra")
    ap.add_argument("--pausa-max", type=int, default=180, help="secondi massimi fra un'email e l'altra")
    ap.add_argument("--prova", help="manda una sola email di prova a questo indirizzo")
    ap.add_argument("--anteprima", action="store_true", help="elenca il prossimo gruppo senza mandare niente")
    a = ap.parse_args()

    cartella = os.path.abspath(a.campagna)
    cfg = leggi_email(os.path.join(cartella, "email.txt"))
    invii = os.path.join(cartella, "invii.csv")
    scuole = os.path.join(os.path.dirname(cartella), "scuole.csv")
    if not os.path.exists(cfg["allegato"]):
        sys.exit(f"Allegato non trovato: {cfg['allegato']}. L'SSD è collegato?")

    if not a.anteprima:
        # Il lucchetto resta preso finché il processo vive, e si libera da solo anche se viene ucciso.
        lucchetto = open(os.path.join(tempfile.gettempdir(), f"invia-gruppo-{os.path.basename(cartella)}.lock"), "w")
        try:
            fcntl.flock(lucchetto, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            sys.exit("Un altro invio di questa campagna è già in corso: mi fermo per non mandare email doppie.")

    if a.prova:
        ok, id_messaggio, errore = manda(cfg, a.prova, "dell'infanzia")
        adesso = datetime.now()
        registra(invii, {"data": f"{adesso:%Y-%m-%d}", "ora": f"{adesso:%H:%M}", "email": a.prova, "scuole": "", "comuni": "",
                         "distanza_km": "", "esito": "prova" if ok else "errore", "id_messaggio": id_messaggio, "nota": errore or "email di prova"})
        print(("PROVA MANDATA" if ok else "PROVA FALLITA"), a.prova, id_messaggio, errore)
        return

    tutti = destinatari(scuole, invii)
    gruppo = tutti[: a.quanti]
    print(f"In questo gruppo: {len(gruppo)} · ne restano da mandare {len(tutti)} in tutto", flush=True)
    if a.anteprima:
        for d in gruppo:
            print(f"  {d['distanza']:>5.1f} km  {d['email']:<42} {', '.join(sorted(d['comuni']))}  [{grado(d['tipi'])}]")
        return

    errori_di_fila = 0
    for i, d in enumerate(gruppo, 1):
        if d["email"] in gia_inviate(invii):
            print(f"[{i}/{len(gruppo)}] saltata {d['email']}: nel registro risulta già mandata", flush=True)
            continue
        ok, id_messaggio, errore = manda(cfg, d["email"], grado(d["tipi"]))
        adesso = datetime.now()
        registra(invii, {"data": f"{adesso:%Y-%m-%d}", "ora": f"{adesso:%H:%M}", "email": d["email"],
                         "scuole": " · ".join(d["scuole"]), "comuni": ", ".join(sorted(d["comuni"])),
                         "distanza_km": d["distanza"], "esito": "inviata" if ok else "errore",
                         "id_messaggio": id_messaggio, "nota": errore})
        print(f"[{i}/{len(gruppo)}] {adesso:%H:%M} {'inviata' if ok else 'ERRORE'} {d['email']} {errore}", flush=True)
        errori_di_fila = 0 if ok else errori_di_fila + 1
        if errori_di_fila >= 2:
            print("Due errori di fila: mi fermo. Controllare il limite di Gmail prima di ripartire.", flush=True)
            break
        if i < len(gruppo):
            time.sleep(random.randint(a.pausa_min, a.pausa_max))
    print("FINE GRUPPO", flush=True)


if __name__ == "__main__":
    main()

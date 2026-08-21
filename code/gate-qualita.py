#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gate di qualità del Vault.

Controlla ogni nota di contenuto contro sei regole. Esce con codice 1 se trova
anche un solo errore, 0 se il vault è pulito.

    python3 code/gate-qualita.py
"""

import os
import re
import sys
import unicodedata
from collections import deque

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Le cartelle di contenuto: tutto il vault tranne queste.
CARTELLE_ESCLUSE = {"sources", "workspace"}
# I file che non sono note: istruzioni, memoria, indici di cartella.
FILE_ESCLUSI = {"CLAUDE.md", "MEMORY.md", "README.md", "SKILL.md"}
# Gli alberi che non contengono note: dentro una skill ci sono procedure, script
# e materiale importato da fuori. Si giudicano da come funzionano, non col gate.
ALBERI_ESCLUSI = ("code/skills",)

CHIAVI_OBBLIGATORIE = ("title", "summary", "tags", "status", "created", "updated")
MAX_RIGHE_CORPO = 300
MIN_LINK = 3

# Le note autorizzate a stare sotto i 3 collegamenti, con il motivo.
# Non è una scorciatoia: ognuna è stata guardata e non ha un terzo rimando
# naturale nel testo. Forzarlo vorrebbe dire inventare un collegamento.
DEROGHE_MIN_LINK = {
    "areas/tenuta-don-gaetano/reference/design.md":
        "tutti i suoi rimandi vanno a tono.md; il resto dei riferimenti è al PDF originale",
    "areas/tenuta-don-gaetano/reference/tono.md":
        "il terzo rimando naturale era anti-ai.md, eliminato con _sistema/",
    "areas/tenuta-don-gaetano/knowledge/sito/workflow-sito.md":
        "il terzo rimando naturale era novamira.md, eliminato per decisione del 21/08/2026",
}

# Le note ancora da compilare non partecipano alle regole sul grafo: non hanno
# prosa in cui mettere un collegamento, e nessuno le cita finché sono vuote.
STATUS_ESENTE_DAL_GRAFO = "da-compilare"


def nfc(s):
    return unicodedata.normalize("NFC", s)


def trova_note():
    """Tutte le note di contenuto, in ordine, con percorso relativo alla radice."""
    note = []
    for radice in sorted(os.listdir(VAULT)):
        if radice.startswith(".") or radice in CARTELLE_ESCLUSE:
            continue
        percorso = os.path.join(VAULT, radice)
        if not os.path.isdir(percorso):
            continue
        for cartella, sottocartelle, file in os.walk(percorso):
            sottocartelle[:] = [d for d in sottocartelle if not d.startswith(".")]
            for nome in sorted(file):
                if not nome.endswith(".md") or nome in FILE_ESCLUSI:
                    continue
                relativo = os.path.relpath(os.path.join(cartella, nome), VAULT)
                if relativo.startswith(ALBERI_ESCLUSI):
                    continue
                note.append(relativo)
    return sorted(note)


def leggi(percorso_relativo):
    """Restituisce (frontmatter, corpo). Il frontmatter è None se manca."""
    with open(os.path.join(VAULT, percorso_relativo), encoding="utf-8") as fh:
        testo = nfc(fh.read())
    if not testo.startswith("---\n"):
        return None, testo
    pezzi = testo[4:].split("\n---\n", 1)
    if len(pezzi) != 2:
        return None, testo
    return pezzi[0], pezzi[1]


def chiavi_frontmatter(frontmatter):
    return [r.split(":", 1)[0] for r in frontmatter.split("\n") if re.match(r"^[a-z_]+:", r)]


def valore(frontmatter, chiave):
    trovato = re.search(r"^%s:[ ]*(.*)$" % chiave, frontmatter, re.M)
    if not trovato:
        return ""
    return trovato.group(1).strip().strip('"')


def bersagli(corpo):
    """I bersagli dei wikilink nel corpo, senza alias e senza ancora."""
    grezzi = re.findall(r"\[\[([^\]|]+)(?:\|[^\]]*)?\]\]", corpo)
    return [g.split("#")[0].strip() for g in grezzi]


def risolvi(bersaglio):
    """Percorso reale del bersaglio, o None se non esiste."""
    for candidato in (bersaglio, bersaglio + ".md"):
        if os.path.exists(os.path.join(VAULT, candidato)):
            return candidato
    return None


def controlla():
    note = trova_note()
    errori = {n: [] for n in range(1, 7)}

    dati = {}
    for nota in note:
        frontmatter, corpo = leggi(nota)
        dati[nota] = {
            "fm": frontmatter,
            "corpo": corpo,
            "status": valore(frontmatter, "status") if frontmatter else "",
            "bersagli": bersagli(corpo),
        }

    # --- 1. frontmatter completo ---
    for nota in note:
        fm = dati[nota]["fm"]
        if fm is None:
            errori[1].append("%s — frontmatter assente" % nota)
            continue
        presenti = chiavi_frontmatter(fm)
        mancanti = [k for k in CHIAVI_OBBLIGATORIE if k not in presenti]
        if mancanti:
            errori[1].append("%s — mancano: %s" % (nota, ", ".join(mancanti)))
        for chiave in ("created", "updated"):
            data = valore(fm, chiave)
            if data and not re.match(r"^\d{4}-\d{2}-\d{2}$", data):
                errori[1].append("%s — %s non è una data YYYY-MM-DD: %r" % (nota, chiave, data))

    # --- 2. lunghezza del corpo ---
    for nota in note:
        righe = len(dati[nota]["corpo"].rstrip("\n").split("\n"))
        if righe > MAX_RIGHE_CORPO:
            errori[2].append("%s — %d righe di corpo (max %d)" % (nota, righe, MAX_RIGHE_CORPO))

    # --- 4. link rotti (serve prima della 3: i link morti non contano) ---
    validi = {}
    for nota in note:
        buoni = set()
        for bersaglio in dati[nota]["bersagli"]:
            risolto = risolvi(bersaglio)
            if risolto is None:
                errori[4].append("%s → [[%s]] non esiste" % (nota, bersaglio))
            else:
                buoni.add(risolto)
        validi[nota] = buoni

    # --- 3. almeno tre collegamenti in uscita verso note ---
    for nota in note:
        if dati[nota]["status"] == STATUS_ESENTE_DAL_GRAFO:
            continue
        verso_note = {b for b in validi[nota] if b.endswith(".md") and b != nota}
        if len(verso_note) >= MIN_LINK:
            continue
        if nota in DEROGHE_MIN_LINK:
            continue
        errori[3].append("%s — %d bersagli unici (minimo %d)" % (nota, len(verso_note), MIN_LINK))

    # --- il grafo, per le regole 5 e 6 ---
    nel_grafo = [n for n in note if dati[n]["status"] != STATUS_ESENTE_DAL_GRAFO]
    insieme = set(nel_grafo)
    entranti = {n: set() for n in nel_grafo}
    vicini = {n: set() for n in nel_grafo}
    for nota in nel_grafo:
        for bersaglio in validi[nota]:
            if bersaglio in insieme and bersaglio != nota:
                entranti[bersaglio].add(nota)
                vicini[nota].add(bersaglio)
                vicini[bersaglio].add(nota)

    # --- 5. nessun orfano ---
    for nota in nel_grafo:
        if not entranti[nota]:
            errori[5].append("%s — nessun link in entrata" % nota)

    # --- 6. una sola componente connessa ---
    componenti = []
    da_visitare = set(nel_grafo)
    while da_visitare:
        partenza = min(da_visitare)
        componente, coda = set(), deque([partenza])
        while coda:
            corrente = coda.popleft()
            if corrente in componente:
                continue
            componente.add(corrente)
            coda.extend(vicini[corrente] - componente)
        componenti.append(sorted(componente))
        da_visitare -= componente
    if len(componenti) > 1:
        componenti.sort(key=len, reverse=True)
        errori[6].append("il grafo è spezzato in %d grappoli" % len(componenti))
        for indice, componente in enumerate(componenti, 1):
            errori[6].append("  grappolo %d (%d note): %s"
                             % (indice, len(componente), ", ".join(componente)))

    return note, nel_grafo, errori


TITOLI = {
    1: "Frontmatter completo (title, summary, tags, status, created, updated)",
    2: "Massimo %d righe di corpo" % MAX_RIGHE_CORPO,
    3: "Almeno %d wikilink in uscita verso note esistenti" % MIN_LINK,
    4: "Zero link rotti",
    5: "Zero orfani (almeno 1 link in entrata)",
    6: "Una sola componente connessa",
}


def main():
    note, nel_grafo, errori = controlla()
    totale = sum(len(v) for v in errori.values())

    print("GATE DI QUALITÀ — %s" % VAULT)
    print("%d note controllate, %d nel grafo (%d esenti: status %s)"
          % (len(note), len(nel_grafo), len(note) - len(nel_grafo), STATUS_ESENTE_DAL_GRAFO))
    print()
    for regola in range(1, 7):
        elenco = errori[regola]
        esito = "ok" if not elenco else "%d errori" % len(elenco)
        print("%d. %s — %s" % (regola, TITOLI[regola], esito))
        for riga in elenco:
            print("     %s" % riga)
    print()
    if DEROGHE_MIN_LINK:
        print("Deroghe attive sulla regola 3:")
        for percorso, motivo in sorted(DEROGHE_MIN_LINK.items()):
            print("  %s — %s" % (percorso, motivo))
        print()
    if totale:
        print("%d errori." % totale)
        return 1
    print("OK, 0 errori")
    return 0


if __name__ == "__main__":
    sys.exit(main())

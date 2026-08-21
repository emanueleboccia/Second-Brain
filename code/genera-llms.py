#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera llms.txt: l'indice d'ingresso del vault per le AI.

Il file è DERIVATO. Si rigenera da capo ogni volta che il vault cambia:

    python3 code/genera-llms.py

Il summary di ogni nota viene preso **solo** dal frontmatter. Le note senza
frontmatter non finiscono nell'indice: prima si sistemano, poi si rigenera.
"""

import os
import re
import sys
import unicodedata

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Le cartelle di contenuto, nell'ordine in cui vanno lette.
CARTELLE = [
    ("self", "Chi è Emanuele: identità, tono, offerta, tariffario del suo lavoro."),
    ("areas", "I tre brand di famiglia, ognuno con la sua sottocartella completa."),
    ("projects", "Lavori con un inizio e una fine."),
    ("concepts", "Definizioni."),
    ("docs", "Procedure, checklist, definizioni di fatto."),
    ("entities", "Clienti e fornitori."),
    ("data", "Numeri e KPI."),
    ("code", "Automazioni e skills."),
    ("outputs", "Deliverable prodotti."),
]
# sources/ e workspace/ restano fuori: materiale grezzo e journal di sessione.

FILE_ESCLUSI = {"CLAUDE.md", "MEMORY.md", "README.md", "SKILL.md"}

INTESTAZIONE = """# Company Brain di Emanuele

<!-- FILE DERIVATO — NON MODIFICARE A MANO.
     Si rigenera da capo con `python3 code/genera-llms.py` ogni volta che il vault cambia.
     Qualsiasi modifica scritta qui dentro viene persa alla prossima rigenerazione.
     I summary arrivano dal frontmatter delle note: si correggono lì, non qui. -->

Questo è l'indice d'ingresso del vault. Le regole vivono qui e qui sono vere; lo stato dei
clienti sta su Notion, le azioni su TickTick, i file finiti su Google Drive.

I collegamenti usano il percorso completo dalla radice: i nomi si ripetono tra i brand
(`brand.md`, `tono.md` e `offerta.md` esistono in più copie) e un nome corto punterebbe al
file sbagliato.
"""


def nfc(s):
    return unicodedata.normalize("NFC", s)


def note_di(cartella):
    """Le note della cartella, con il loro summary da frontmatter."""
    radice = os.path.join(VAULT, cartella)
    if not os.path.isdir(radice):
        return [], []
    trovate, senza_frontmatter = [], []
    for percorso, sottocartelle, file in os.walk(radice):
        sottocartelle[:] = [d for d in sottocartelle if not d.startswith(".")]
        for nome in file:
            if not nome.endswith(".md") or nome in FILE_ESCLUSI:
                continue
            completo = os.path.join(percorso, nome)
            relativo = os.path.relpath(completo, VAULT)
            if relativo.startswith("code/skills"):
                continue          # le skill hanno il loro elenco, sotto
            with open(completo, encoding="utf-8") as fh:
                testo = nfc(fh.read())
            if not testo.startswith("---\n"):
                senza_frontmatter.append(relativo)
                continue
            frontmatter = testo[4:].split("\n---\n", 1)[0]
            trovato = re.search(r"^summary:[ ]*(.*)$", frontmatter, re.M)
            if not trovato:
                senza_frontmatter.append(relativo)
                continue
            summary = trovato.group(1).strip().strip('"')
            trovate.append((relativo[:-3], summary))
    return sorted(trovate), sorted(senza_frontmatter)


def skill_disponibili():
    """Le skill in code/skills/: nome della cartella e riga di innesco.

    Non sono note: sono procedure. Stanno fuori dal gate di qualità e non hanno
    frontmatter, ma l'indice deve dire che esistono.
    """
    radice = os.path.join(VAULT, "code", "skills")
    if not os.path.isdir(radice):
        return []
    trovate = []
    for nome in sorted(os.listdir(radice)):
        cartella = os.path.join(radice, nome)
        skill = os.path.join(cartella, "SKILL.md")
        if not os.path.isdir(cartella) or not os.path.isfile(skill):
            continue
        with open(skill, encoding="utf-8") as fh:
            testo = nfc(fh.read())
        trovate.append((nome, os.path.relpath(skill, VAULT), innesco(testo)))
    return trovate


def innesco(testo):
    """La riga che dice quando si usa una skill.

    Prima si cerca la sezione «Quando si usa» della convenzione del vault. Le
    skill che arrivano da fuori non ce l'hanno: si ripiega sul campo
    `description` del frontmatter.
    """
    sezione = re.search(r"^##+ +Quando si usa *$(.*?)(?=^##+ |\Z)", testo, re.M | re.S)
    if sezione:
        paragrafo = []
        for riga in sezione.group(1).split("\n"):
            pulita = riga.strip().lstrip("-*").strip()
            if not pulita or pulita.startswith(("|", ">", "<!--")):
                if paragrafo:
                    break
                continue
            paragrafo.append(pulita)
        if paragrafo:
            return prima_frase(" ".join(paragrafo))
    if testo.startswith("---\n"):
        frontmatter = testo[4:].split("\n---\n", 1)[0]
        trovato = re.search(r"^description:[ ]*(.*)$", frontmatter, re.M)
        if trovato:
            return prima_frase(trovato.group(1).strip().strip('"'))
    return "(nessuna riga «Quando si usa»)"


def prima_frase(testo, limite=160):
    """La riga d'indice sta su un rigo: oltre il limite si taglia alla prima frase.

    Le righe di innesco sono scritte per essere lette da un umano dentro una
    skill, non dentro un elenco: spesso continuano per un paragrafo intero.
    """
    if len(testo) <= limite:
        return testo
    taglio = testo.find(". ")
    if 0 < taglio < limite:
        return testo[:taglio + 1]
    return testo[:limite].rsplit(" ", 1)[0] + "…"


def main():
    righe = [INTESTAZIONE]
    totale, scartate = 0, []
    for cartella, descrizione in CARTELLE:
        note, senza = note_di(cartella)
        scartate.extend(senza)
        righe.append("## `%s/` — %s\n" % (cartella, descrizione))
        if note:
            for percorso, summary in note:
                righe.append("- [[%s]] -- %s" % (percorso, summary))
            righe.append("")
            totale += len(note)
        elif cartella != "code":
            righe.append("*Nessuna nota.*\n")

        if cartella == "code":
            skill = skill_disponibili()
            if skill:
                righe.append("Le skill: procedure, non note. Non hanno frontmatter e stanno fuori")
                righe.append("dal gate di qualità.\n")
                for nome, percorso, riga in skill:
                    righe.append("- **%s** — skill · `%s`" % (nome, percorso))
                    righe.append("  -- %s" % riga)
                righe.append("")
            elif not note:
                righe.append("*Nessuna nota, nessuna skill.*\n")


    with open(os.path.join(VAULT, "llms.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(righe).rstrip("\n") + "\n")

    print("llms.txt rigenerato: %d note indicizzate" % totale)
    if scartate:
        print("Escluse perché senza summary nel frontmatter:")
        for percorso in scartate:
            print("  %s" % percorso)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

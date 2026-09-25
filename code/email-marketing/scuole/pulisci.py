#!/usr/bin/env python3
"""Pulizia di nomi, indirizzi, telefoni, email e siti delle scuole: dal maiuscolo del Ministero
all'italiano scritto bene."""
import re

MINUSCOLE = {
    "di", "del", "dello", "della", "dei", "degli", "delle", "da", "dal", "dallo", "dalla", "dai", "dagli",
    "dalle", "in", "a", "al", "allo", "alla", "ai", "agli", "alle", "e", "ed", "per", "con", "su", "sul",
    "sullo", "sulla", "sui", "tra", "fra", "la", "le", "lo", "il", "gli",
}
ROMANI = {"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XX",
          "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI"}
SIGLE = {"IC", "ICS", "CD", "SNC", "SAS", "SRL", "APS", "ETS", "ONLUS", "INA", "IACP", "ICAP", "GESCAL",
         "PEEP", "ASL", "FFSS", "SS", "SP", "SS145", "SS268", "NA", "SA", "AV"}
D_MINUSCOLO = {"ASSISI", "ARCO", "EUROPA", "UNGHERIA", "AQUINO", "ORO", "ARAGONA", "ORTO", "ULIVO", "ITALIA",
               "OSSA", "AMALFI", "ORIENTE", "ACQUA", "ELIA", "ERCOLANO"}
ACCENTI = {"A": "à", "E": "è", "I": "ì", "O": "ò", "U": "ù"}
SANTE = {"MARIA", "ANNA", "LUCIA", "CHIARA", "CATERINA", "TERESA", "RITA", "AGATA", "CROCE", "SOFIA", "ELENA",
         "RESTITUTA", "BARBARA", "CECILIA", "FILOMENA", "MARTA", "MARGHERITA", "COLOMBA", "SUSANNA",
         "GIUSTINA", "FAUSTINA", "MONICA", "CRISTINA", "VENERA", "ANASTASIA"}
SANTI = {"ANTONIO", "ANNA", "ANASTASIA", "ALFONSO", "EGIDIO", "ERASMO", "ANDREA", "AGNELLO", "ANGELO",
         "ARCANGELO", "ELIA", "EUSTACHIO", "GIUSEPPE", "GIOVANNI", "PIETRO", "PAOLO", "LORENZO", "MARCO",
         "VINCENZO", "NICOLA", "MAURO", "LEONARDO", "FRANCESCO", "GENNARO", "GENNARIELLO", "VALENTINO",
         "MICHELE", "SEBASTIANO", "BARTOLOMEO", "MARTINO", "CLEMENTE", "TOMMASO", "GIORGIO", "NAZARIO",
         "ROCCO", "LUCA", "BARBATO", "CESAREO", "GIUSTO", "SILVESTRO", "FELICE", "BIAGIO", "DOMENICO",
         "CATALDO", "VITO", "ONOFRIO", "LEUCIO", "CRISTOFARO", "VALENTINIANO", "LIBORIO", "ABBONDIO",
         "EFREM", "PASQUALE", "SOSSIO", "CARLO", "FILIPPO", "PIO", "BENEDETTO", "MATTEO", "GIACOMO",
         "PELLEGRINO", "PRISCO", "SALVATORE", "RAFFAELE", "GABRIELE", "LUIGI", "EMIDIO", "ANIELLO",
         "AGOSTINO", "AMBROGIO", "CIRO", "GAETANO", "ALESSANDRO", "BRUNO", "BIAGIO", "SIMONE", "STEFANO",
         "TEODORO", "VITALIANO", "FELICITA", "LUCIA", "BENEDETTA"} | SANTE


def _parola(p, prima):
    """Una parola già in maiuscolo, riscritta con le iniziali giuste."""
    if not p:
        return p
    nuda = p.strip(".,;:")
    if nuda in ROMANI or nuda == "SS":
        return p
    if nuda in SIGLE and not prima or nuda in {"IC", "ICS", "CD", "SNC"}:
        return p
    if re.fullmatch(r"\d+[A-Z]?(/\d+)?", p):
        return p.replace("BIS", "bis")
    # iniziali puntate: G. / A.F. / S.M.
    if re.fullmatch(r"([A-Z]\.)+", p):
        return p
    # apostrofi: D'ANNA, DELL'INFANZIA, SANT'ANTONIO, L'AQUILA
    m = re.fullmatch(r"([A-Z]+)'([A-Z].*)", p)
    if m:
        testa, coda = m.group(1), m.group(2)
        coda_t = _parola(coda, False)
        coda_t = coda_t[0].upper() + coda_t[1:]
        if testa == "D":
            return ("d'" if coda.strip(".,'") in D_MINUSCOLO and not prima else "D'") + coda_t
        if testa in {"DELL", "DALL", "ALL", "NELL", "SULL", "L", "QUELL", "UN"}:
            t = testa.lower() + "'" + coda_t
            return t[0].upper() + t[1:] if prima else t
        return testa.capitalize() + "'" + coda_t
    # accento finale: CARITA' → Carità
    if len(p) > 2 and p.endswith("'") and p[-2] in ACCENTI:
        p = p[:-2] + ACCENTI[p[-2]].upper()
    bassa = p.lower()
    if not prima and bassa in MINUSCOLE:
        return bassa
    if bassa.startswith("f.lli"):
        return "F.lli" + p[5:].lower()
    return bassa[0].upper() + bassa[1:] if bassa[0].isalpha() else bassa[:1] + bassa[1:2].upper() + bassa[2:]


def santi(s):
    """S. ANTONIO → SANT'ANTONIO, S. MARIA → SANTA MARIA, S. GIUSEPPE → SAN GIUSEPPE; S.M. DEL → SANTA MARIA DEL."""
    s = re.sub(r"\bS\.\s*M\.\s*(?=(LA|DEL|DELLA|DELLE|DEI|DI|A|AL)\b)", "SANTA MARIA ", s)
    s = re.sub(r"\bS\.\s*G\.\s*(NNI\s+)?BOSCO\b", "SAN GIOVANNI BOSCO", s)

    def uno(m):
        nome = m.group(1)
        if nome not in SANTI:
            return m.group(0)
        if nome[0] in "AEIOU":
            return "SANT'" + nome
        if nome in SANTE:
            return "SANTA " + nome
        return "SAN " + nome
    return re.sub(r"\bS\.\s*([A-Z]+)", uno, s)


def maiuscolo(s):
    s = (s or "").replace("’", "'").replace("`", "'").replace("´", "'")
    s = s.replace("“", '"').replace("”", '"').replace("«", '"').replace("»", '"')
    return re.sub(r"\s+", " ", s.upper()).strip()


def titolo(s):
    """Da «SCUOLA DELL'INFANZIA S.MARIA DELLE GRAZIE» a «Scuola dell'Infanzia Santa Maria delle Grazie»."""
    s = maiuscolo(s)
    s = santi(s)
    s = s.replace('"', " ").replace("?", " ")
    s = re.sub(r"\bF\.\s*LLI\b", "F.LLI", s)
    s = re.sub(r"\bSS\.\s*", "SS. ", s)
    # spazi dopo i punti delle abbreviazioni attaccate alle parole: G.MAZZINI → G. MAZZINI
    s = re.sub(r"\b(?!F\.LLI)([A-Z])\.(?=[A-Z]{2,})", r"\1. ", s)
    s = re.sub(r"\s+", " ", s).strip()
    parole = s.split(" ")
    out = []
    for i, p in enumerate(parole):
        pezzi = p.split("-")
        out.append("-".join(_parola(x, i == 0 or (j > 0)) for j, x in enumerate(pezzi)))
    t = " ".join(out)
    return t[:1].upper() + t[1:]


ABBR_VIA = [
    (r"\bP\.\s*TTA\b|\bP\.TTA\b", "PIAZZETTA"),
    (r"\bP\.\s*ZZA\b|\bP\.ZA\b|\bP\.ZZA\b|\bPZA\b|\bPZZA\b|\bP\.\s*ZA\b", "PIAZZA"),
    (r"\bP\.\s*ZZALE\b|\bP\.LE\b", "PIAZZALE"),
    (r"\bC\.\s*SO\b|\bC/SO\b|\bCSO\b", "CORSO"),
    (r"\bV\.\s*LE\b|\bV\.LE\b", "VIALE"),
    (r"\bTRAV\.|\bTRAV\b", "TRAVERSA"),
    (r"\bLOC\.|\bLOC\b", "LOCALITÀ"),
    (r"\bFRAZ\.|\bFRAZ\b", "FRAZIONE"),
    (r"\bPROV\.", "PROVINCIALE"),
    (r"\bNAZ\.", "NAZIONALE"),
    (r"\bR/NE\b|\bR\.NE\b", "RIONE"),
    (r"\bPRINC\.", "PRINCIPE"),
]


def via(s):
    """Solo la parte della via, senza CAP e comune: «VIA G.IERVOLINO 335» → «Via G. Iervolino 335»."""
    s = maiuscolo(s)
    if not s or s == "NON DISPONIBILE":
        return ""
    s = s.replace("^", " ")
    s = re.sub(r"\s*\([^)]*\)", " ", s)          # «(UNA SEZIONE)» e simili
    for regola, nuovo in ABBR_VIA:
        s = re.sub(regola, nuovo, s)
    s = re.sub(r"^V\.\s*(?=[A-Z])", "VIA ", s)
    # davanti alla via, a volte, c'è il nome della scuola: «ISTITUTO SACRO CUORE - VIA ...»
    m = re.search(r"(?<![A-Z'])(VIA|VIALE|PIAZZA|PIAZZALE|PIAZZETTA|CORSO|VICO|VICOLO|TRAVERSA|LARGO|RIONE|"
                  r"LOCALITÀ|CONTRADA|STRADA|SALITA)(?![A-Z])", s)
    if m and m.start() > 0 and not re.search(r"(VIA|VIALE|PIAZZA|CORSO|TRAVERSA|VICO)\s*$", s[:m.start()].strip(" -,")):
        s = s[m.start():]
    s = re.sub(r"\bS\.\s*N\.\s*C\.?|\bSNC\b|\bS\.\s*N\.?(?=\s|$)|\bS/N\b", "", s)
    s = re.sub(r"\bN\s*[°.]\s*(?=\d)|\bN\s+(?=\d)", "", s)
    s = re.sub(r"(?<=[A-Z'])(?=\d)", " ", s)          # VIA COSCIONI1 → VIA COSCIONI 1
    s = re.sub(r"(?<=\d)(?=BIS\b)", "", s)
    s = re.sub(r"\s*,\s*", ", ", s)
    s = re.sub(r"\s+", " ", s).strip(" ,-")
    t = titolo(s)
    t = re.sub(r"\b(\d+) ?Bis\b", r"\1 bis", t)
    t = re.sub(r",\s*(\d)", r" \1", t)                 # «Via Roma, 38» → «Via Roma 38»
    return t


PREFISSI_3 = ("081", "089", "080", "091", "095", "099", "010", "011", "015", "030", "031", "035", "039",
              "040", "041", "045", "049", "050", "051", "055", "059", "070", "071", "079")


def un_telefono(cifre):
    if cifre.startswith("0039"):
        cifre = cifre[4:]
    elif cifre.startswith("39") and len(cifre) >= 11:
        cifre = cifre[2:]
    if len(cifre) < 6:
        return ""
    if cifre.startswith("3"):
        return f"{cifre[:3]} {cifre[3:6]} {cifre[6:]}".strip() if len(cifre) == 10 else cifre
    if cifre.startswith("0"):
        if cifre.startswith(("02", "06")):
            return f"{cifre[:2]} {cifre[2:]}"
        if cifre.startswith(PREFISSI_3):
            return f"{cifre[:3]} {cifre[3:]}"
        return f"{cifre[:4]} {cifre[4:]}"
    return cifre


def telefono(s):
    """«0818651166 / 0818651167» → «081 8651166 / 081 8651167». Toglie i doppioni."""
    s = (s or "").strip()
    if not s or s.lower() in ("non disponibile", "nd", "n.d."):
        return ""
    pezzi = re.split(r"\s*(?:/|;|,| - | – |\be\b|\bo\b)\s*", s)
    out = []
    for p in pezzi:
        cifre = re.sub(r"\D", "", p)
        if len(cifre) > 12 and cifre.startswith("0"):
            # due numeri attaccati senza separatore: si prova a dividerli a metà
            meta = len(cifre) // 2
            for c in (cifre[:meta], cifre[meta:]):
                t = un_telefono(c)
                if t and t not in out:
                    out.append(t)
            continue
        t = un_telefono(cifre)
        if t and t not in out:
            out.append(t)
    return " / ".join(out)


def email(s):
    s = (s or "").strip().strip(".,;:<>").lower()
    s = s.replace("mailto:", "").replace(" ", "")
    if not s or s == "nondisponibile" or "@" not in s:
        return ""
    return s


def sito(s):
    s = (s or "").strip()
    if not s or s.lower() in ("non disponibile", "nd", "http://", "https://"):
        return ""
    s = re.sub(r"^(https?)", lambda m: m.group(1).lower(), s, flags=re.I)
    s = re.sub(r"^(https?)//", r"\1://", s, flags=re.I)
    s = re.sub(r"^(https?):/(?!/)", r"\1://", s, flags=re.I)
    s = re.sub(r"^https?:\\\\", "https://", s, flags=re.I)
    if not re.match(r"^https?://", s, flags=re.I):
        s = "https://" + s.lstrip("/")
    m = re.match(r"^(https?://)([^/]+)(.*)$", s)
    if not m:
        return ""
    host = m.group(2).lower().strip(".")
    if "." not in host:
        return ""
    return m.group(1).lower() + host + m.group(3).rstrip("/")


if __name__ == "__main__":
    prove = ["SCUOLA DELL'INFANZIA S.MARIA DELLE GRAZIE", "I.C. \"E. DE FILIPPO\"", "S.M. LA CARITA'- ED. ARANCIO",
             "TERZIGNO - ROSA MIRANDA -", "S. ANNA A SCARICO", "IL NIDO DELLA MAESTRA MARIA TERESA FORNO",
             "PAPA GIOVANNI XXIII", "FRANCA E VINCENZO MARRA", "VIA MARTIRI D'UNGHERIA110", "SALOME'",
             "S.G.BOSCO", "MADRE TERESA DI CALCUTTA", "D'ASSISI", "S.ANTONIO ABATE", "F.LLI BANDIERA",
             "ISTITUTO S. LAMBERTI", "SANT'ANASTASIA D'ASSISI"]
    for p in prove:
        print(p, "→", titolo(p))
    for v in ["VIA G.IERVOLINO", "P.ZZA RISORGIMENTO 16", "C/SO E. PADOVANO", "VIA CARMINE N. 58",
              "VIA DANTE ALIGHIERI N.15", "VIA CANGIANI SNC", "VIA SAN LEONARDO2", "VIA NUOVA SAN MARZANO, 2",
              "V.LE DANTE", "VIA MESSIGNO TRAV. SS.CUORI", "VIA S.MARIA LA CARITA'", "VIA CAPORTANO 14BIS",
              "VIA UMBERTO 1? N.11", "VIA IV NOVEMBRE N.43"]:
        print(v, "→", via(v))
    for t in ["0818651166", "081 8651933", "3318204530", "08119259312", "0825 123456", "081-8651166/0818651167",
              "+39 081 5281103", "0815281103 - 0815281104"]:
        print(t, "→", telefono(t))
    for w in ["https//www.ic1capoluogopoggiomarino.edu.it/", "http//www.isisleonardodavinci.it",
              "www.2circolopoggiomarino.it", "Non Disponibile", "HTTP://WWW.SCUOLA.IT/"]:
        print(w, "→", sito(w))

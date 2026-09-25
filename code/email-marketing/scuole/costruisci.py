#!/usr/bin/env python3
"""Costruisce l'elenco unico delle scuole dell'infanzia e primarie intorno alla Masseria, e lo scrive
in areas/la-masseria-di-mezzautunno/email-marketing/scuole.csv (la lista che usa invia-gruppo.py).

    python3 code/email-marketing/scuole/costruisci.py            → riscrive scuole.csv
    python3 code/email-marketing/scuole/costruisci.py prova.csv  → scrive altrove, per controllare

Fonti, tutte in cache/ (fuori da git, si riscaricano come dice il README):
- l'anagrafe delle scuole statali e paritarie del Ministero, open data dell'anno scolastico in ANNO;
- Scuola in Chiaro per telefono, email, sito e alunni (cache/sic.json, la riempie sic.py);
- la lista attuale, da cui restano i telefoni che mancano e lo stato degli indirizzi già provati
  (rimbalzati, personali, domini morti).
Le distanze (distanze.json) vanno dalla Masseria al centro di ogni comune: in linea d'aria, e in
minuti d'auto senza traffico. Dentro c'è un comune se sta entro RAGGIO_KM in linea d'aria e se in auto
ci vogliono al massimo MINUTI_MAX minuti: così restano fuori la Costiera e la penisola sorrentina, che
in linea d'aria sono vicine ma stanno dietro le montagne.
"""
import collections
import csv
import json
import os
import re
import sys
import unicodedata

from istituti import ISTITUTI
from pulisci import email as pulisci_email, maiuscolo, sito as pulisci_sito, telefono, titolo, via

QUI = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(QUI, "cache")
RADICE = os.path.abspath(os.path.join(QUI, "..", "..", ".."))
LISTA = os.path.join(RADICE, "areas", "la-masseria-di-mezzautunno", "email-marketing", "scuole.csv")
ANNO = "20262720260901"   # a.s. 2026/27, pubblicato il 01/09/2026
RAGGIO_KM, MINUTI_MAX = 20.0, 35
SIGLA = {"NAPOLI": "NA", "SALERNO": "SA", "AVELLINO": "AV", "CASERTA": "CE", "BENEVENTO": "BN"}
CAMPI = ["codice", "tipo", "nome", "istituto", "comune", "provincia", "indirizzo", "telefono", "email",
         "email_utilizzabile", "sito", "alunni", "distanza_km", "minuti_auto"]

try:
    from nomi import NOMI
except ImportError:
    NOMI = {}
try:
    from siti import SITI  # esito del controllo dei siti: url → url che risponde, o ""
except ImportError:
    SITI = {}
try:
    from correzioni import EMAIL_FINTE, EMAIL_PERSONALI, EMAIL_ISTITUZIONALI, INDIRIZZI, TELEFONI
except ImportError:
    EMAIL_FINTE, EMAIL_PERSONALI, EMAIL_ISTITUZIONALI, INDIRIZZI, TELEFONI = set(), set(), set(), {}, {}
try:
    from domini import DOMINI_MORTI  # domini senza server di posta (controllo MX)
except ImportError:
    DOMINI_MORTI = set()


def leggi_csv(nome):
    return list(csv.DictReader(open(os.path.join(CACHE, nome), encoding="utf-8")))


# ---------------------------------------------------------------- comuni
DIST = json.load(open(os.path.join(QUI, "distanze.json")))
COMUNI = json.load(open(os.path.join(QUI, "comuni.json")))
SCELTI = {k for k, v in DIST.items() if v["linea"] <= RAGGIO_KM and v["minuti"] <= MINUTI_MAX}

# come il Ministero scrive (o abbrevia) il nome di ogni comune dentro il nome dei plessi
FORME = {
    "H931": r"S(?:AN)?\.?\s*GIUSEPPE\s*(?:VES(?:UVIANO)?\.?)?|SGIUSEPPE",
    "I019": r"S(?:AN)?\.?\s*MARZANO(?:\s*SUL\s*SARNO)?",
    "I377": r"S(?:AN)?\.?\s*VALENTINO(?:\s*TORIO)?",
    "G190": r"OTTAV(?:IANO|\.)",
    "H860": r"S(?:AN)?\.?\s*GENNARO(?:\s*VES(?:UVIANO)?\.?)?",
    "I438": r"SARN[O0]",
    "G283": r"PALMA(?:\s*CAMP(?:ANIA|A|\.)?)?",
    "L245": r"T(?:ORRE)?\.?\s*ANN(?:UNZIATA|\.?\s*TA|/TA|NTA)|TANNTA",
    "I300": r"S(?:ANT'|\.)\s*ANTONIO(?:\s*ABATE)?|SANT'ANTONIO\s*ABATE",
    "M273": r"S(?:ANTA)?\.?\s*M(?:ARIA)?\.?\s*LA\s*CARIT[AÀ]'?",
    "I317": r"S(?:ANT'|\.)\s*EGIDIO(?:\s*(?:DEL\s*)?M(?:ONTE)?\.?\s*A(?:LBINO)?\.?)?",
    "B740": r"CARB(?:ONARA)?\.?\s*(?:DI\s*)?NOL(?:A)?",
    "F912": r"NOC(?:ERA)?\.?\s*(?:INF(?:ERIORE)?\.?|I\.?)(?![A-Z])",
    "B980": r"CASOLA(?:\s*DI\s*NAPOLI)?",
    "I820": r"SOMMA\s*(?:VES(?:UVIANA)?\.?|V\.NA)",
    "C129": r"C(?:ASTELLAM)?\.?\s*/?M+ARE(?:\s*(?:DI\s*)?STABIA)?|CASTELLAMMARE(?:\s*DI\s*STABIA)?",
    "E997": r"MARZANO(?:\s*DI\s*NOLA)?",
    "G242": r"PAGO(?:\s*V\.?\s*L\.?|\s*DEL\s*VALLO(?:\s*DI\s*LAURO)?)?",
    "I073": r"S(?:AN)?\.?\s*PAOLO\s*BEL\s*SITO(?=IC)|S(?:AN)?\.?\s*PAOLO(?:\s*BEL\s*SITO)?",
    "I262": r"S(?:ANT'|\.)\s*ANASTASIA",
    "F913": r"NOC(?:ERA)?\.?\s*(?:SUP(?:ERIORE)?\.?|S\.)",
    "L259": r"T(?:ORRE)?\.?\s*(?:DEL\s*)?GRECO(?:LEOPA)?|T\.\s*G(?![A-Z])",
    "C259": r"CASTEL\s*S(?:AN)?\.?\s*G(?:IORGIO|\.)",
    "G795": r"POLLENA\s*TROCCHIA|POLLENATROCCHIA",
    "M289": r"MASSA\s*DI\s*SOMMA",
    "I151": r"S(?:AN)?\.?\s*SEBASTIANO(?:\s*(?:AL\s*)?VESUVIO)?",
    "B922": r"CASAMARC(?:IANO)?",
    "I391": r"S(?:AN)?\.?\s*VITALIANO",
    "C188": r"CASTELL?O?\s*(?:DI\s*)?CISTERNA",
    "H892": r"S(?:AN)?\.?\s*GIORGIO(?:\s*A\s*CR(?:EMANO|\.)?)?",
    "G812": r"POMIGLIANO(?:\s*D'ARCO)?",
    "L845": r"VICO(?:\s*EQUENSE)?",
    "C361": r"CAVA(?:\s*(?:DE'?|DEI)\s*TIRRENI|\s*D\.\s*T\.)?",
    "F798": r"MUGNANO(?:\s*DEL\s*CAR(?:DINALE)?)?",
    "F138": r"MERCATO\s*S(?:AN)?\.?\s*S(?:EVERINO|\.)?|M\.\s*S\.\s*S\.?",
    "B905": r"CASALNUO(?:VO)?(?:\s*DI\s*NAPOLI)?",
}


def forma_comune(cat):
    if cat in FORME:
        return FORME[cat]
    nome = maiuscolo(COMUNI[cat]["name"]).replace("'", "'?")
    return nome.replace(" ", r"\s*")


def nome_comune(cat, grezzo):
    return COMUNI.get(cat, {}).get("name") or titolo(grezzo)


# ---------------------------------------------------------------- nomi dei plessi
ORDINALE = r"(?:\s*(?:\d+|I{1,3}|IV|V)\s*(?:°|')?(?=[\s\-,]|$))?"
ISTITUTO = r"I\.\s*C\.?(?:\s*S\.?(?![A-Z]))?|I\.?\s*C\.?S\b|ICS|IC(?=\d)|IC|IST\.?\s*COMP(?:R)?\.?|ISTITUTO\s*COMPRENSIVO|COMPRENSIVO|C\.\s*D\.?(?!')|CD(?=\d)|CD|CIRCOLO\s*DIDATTICO(?:\s*STATALE)?"
GENERICHE = (r"SCUOLA\s*DELL'INFANZIA|SCUOLA\s*INFANZIA|SCUOLA\s*INF\.?|S\.\s*INFANZIA|SCUOLA\s*PRIMARIA|"
             r"S\.\s*PRIMARIA|SCUOLA\s*MATERNA|SCUOLA\s*ELEMENTARE|INFANZIA|INF\.|PRIMARIA|PRIM\.?|PLESSO|POLO")


def togli(regola, s):
    return re.sub(r"(?<![A-Z'])(?:" + regola + r")(?![A-Z])", " ", s)


def nome_plesso(r):
    codice = r["CODICESCUOLA"]
    if codice in NOMI:
        return NOMI[codice]
    s = maiuscolo(r["DENOMINAZIONESCUOLA"]).replace('"', " ")
    if s == "NON DISPONIBILE":
        s = ""
    s = re.sub(r"(?<=[A-Z]{2})([AEIOU])'(?=[\s\-,]|$)", lambda m: {"A": "À", "E": "È", "I": "Ì", "O": "Ò", "U": "Ù"}[m.group(1)], s)
    s = re.sub(r"(?<![A-Z])ED\.\s*", "EDIFICIO ", s)
    s = re.sub(r"(?<![A-Z])FRAZ\.\s*|(?<![A-Z])FRAZIONE\s+|(?<![A-Z])LOC\.\s*", " ", s)
    ist = r["CODICEISTITUTORIFERIMENTO"]
    cat_ist = ISTITUTO_COMUNE.get(ist)
    for cat in {r["CODICECOMUNESCUOLA"], cat_ist} - {None}:
        s = togli("(?:" + forma_comune(cat) + ")" + ORDINALE, s)
    s = togli("(?:" + ISTITUTO + ")" + ORDINALE, s)
    s = togli(GENERICHE, s)
    regola = ISTITUTI.get(ist, ("", ""))[1]
    if regola:
        s = togli(regola, s)
    s = re.sub(r"(?<![A-Z])(?:CAP\.?\s*P\.?\s*P\.?|CAP\.|CAP(?![A-Z])|CAPOLUOG\w*|CAPO(?![A-Z]))", " CAPOLUOGO ", s)
    s = re.sub(r"\s*-\s*", " - ", s)
    s = re.sub(r"(?:\s-\s)+", " - ", s)
    s = re.sub(r"^[\s\-.,'/]+|[\s\-.,'/]+$", "", s)
    s = re.sub(r"^(?:DI|DEL|DELLA)\s+", "", s)
    s = re.sub(r"^V\.\s*(?=[A-Z0-9])", "VIA ", s)
    s = re.sub(r"\s+", " ", s)
    if not re.search(r"[A-Z]{2,}", s):
        v = via(r["INDIRIZZOSCUOLA"])
        return re.sub(r"\s+\d.*$", "", v) if v else ""
    return titolo(s)


LEGALI = (r"S\.?\s*A\.?\s*S\.?|S\.?\s*N\.?\s*C\.?|S\.?\s*R\.?\s*L\.?\s*S?\.?|SRLS|A\s*R\.?\s*L\.?|A\.R\.L\.?|"
          r"S\.?\s*C\.?\s*A\.?\s*R\.?\s*L\.?|SCARL|S\.?\s*C\.?\s*S\.?|SOC\.?\s*COOP\.?(?:\s*SOC(?:IALE)?\.?)?|"
          r"SOCIETA'?\s*COOPERATIVA(?:\s*SOCIALE)?|COOPERATIVA\s*SOCIALE|COOP\.?\s*SOC(?:IALE)?\.?|COOP\.?|"
          r"IMPRESA\s*SOCIAL[E]?|ONLUS|O\.N\.L\.U\.S\.?|A\.?P\.?S\.?|E\.?T\.?S\.?|S\.?\s*P\.?\s*A\.?")


def nome_paritaria(r):
    codice = r["CODICESCUOLA"]
    if codice in NOMI:
        return NOMI[codice]
    s = maiuscolo(r["DENOMINAZIONESCUOLA"]).replace('"', " ")
    # «SAS DI BOCCIA RAFFAELE» e simili: la forma giuridica e il titolare vanno via insieme
    s = re.sub(r"\s+(?:S\.?\s*A\.?\s*S\.?|S\.?\s*N\.?\s*C\.?)\s+DI\s+.*$", "", s)
    s = togli(LEGALI, s)
    s = togli(r"SCUOLA\s*DELL'INFANZIA\s*PARITARIA|SCUOLA\s*DELL'INFANZIA|SCUOLA\s*MATERNA\s*PARITARIA|"
              r"SCUOLA\s*MATERNA|SCUOLA\s*PRIMARIA\s*PARITARIA|SCUOLA\s*PRIMARIA|SCUOLA\s*INFANZIA|"
              r"SC\.\s*INF\.?|PARITARIA|NON\s*STATALE", s)
    s = re.sub(r"^[\s\-.,'/]+|[\s\-.,'/]+$", "", s)
    s = re.sub(r"\s+", " ", s)
    return titolo(s) if s else titolo(r["DENOMINAZIONESCUOLA"])


# ---------------------------------------------------------------- email
GRATUITI = ("gmail.com", "libero.it", "alice.it", "virgilio.it", "hotmail.it", "hotmail.com", "live.it",
            "live.com", "yahoo.it", "yahoo.com", "tiscali.it", "outlook.it", "outlook.com", "icloud.com",
            "tin.it", "fastwebnet.it", "email.it", "katamail.com", "inwind.it", "iol.it", "msn.com", "me.com")
ISTITUZIONALI = ("scuol", "infanzi", "asilo", "materna", "istitut", "parit", "nido", "bimb", "bambin", "direzion",
                 "segreter", "info", "amministra", "suor", "parrocch", "coop", "associaz", "ass.", "educa",
                 "didatt", "primaria", "collegio", "convitto", "piccol", "baby", "kids", "girotondo", "arcobalen",
                 "sorris", "gioc", "fata", "folletti", "sirenett", "pinocch", "peter", "mondo", "casa", "villa",
                 "oratorio", "congreg", "figlie", "fma", "ente", "fondaz", "centro", "school", "montessori")
NOMI_PROPRI = set("""
maria anna giuseppe giovanni antonio francesco luigi vincenzo salvatore raffaele domenico pasquale gennaro
ciro carmela carmen rosa rosaria teresa lucia angela giuseppina immacolata assunta concetta filomena carolina
anna maria paola paolo pietro marco luca andrea alessandro alessandra francesca federica valentina valeria
roberta roberto stefania stefano simona simone sara serena silvia sonia tania monica marina michela michele
elena eleonora emanuela emanuele enza enzo fabiola fabio gabriella gabriele giada gianluca giorgia giorgio
ilaria irene laura lorenza lorenzo manuela marianna mariella marta martina nadia nunzia patrizia rita
sabrina sandra antonella antonietta annamaria nicola nicoletta daniela daniele debora cristina cristiano
claudia claudio chiara barbara beatrice alba adele angelo aniello biagio carlo catello costantino davide
dario donato felice ferdinando filippo fortunato gaetano gerardo gianni giacomo gino giulio giuliana giulia
ivana jessica katia lina loredana luisa mafalda marisa mena nella olga ornella palma pina pino regina rossella
tiziana tina titti veronica viviana vittoria vittorio mariarosaria mariateresa mariagrazia graziella grazia
alfonso alessio fernanda sebastiano alfredo agostino arturo aurora benedetta camilla cinzia concetta
""".split())


def email_personale(e):
    if e in EMAIL_ISTITUZIONALI:
        return False
    if e in EMAIL_PERSONALI:
        return True
    locale, dominio = e.split("@", 1)
    if dominio.endswith("istruzione.it"):
        return False
    l = locale.lower()
    if any(p in l for p in ISTITUZIONALI):
        return False
    pezzi = [p for p in re.split(r"[._\-\d]+", l) if p]
    if dominio not in GRATUITI:
        return False
    if any(p in NOMI_PROPRI for p in pezzi):
        return True
    # nome e cognome attaccati: «danielachiavazzo», «mieleantonella»
    return any(p.startswith(n) or p.endswith(n) for p in pezzi for n in NOMI_PROPRI if len(n) >= 5 and len(p) > len(n) + 3)


# ---------------------------------------------------------------- dati
SIC_JSON = os.path.join(CACHE, "sic.json")
SIC = json.load(open(SIC_JSON)) if os.path.exists(SIC_JSON) else {}
STAT = leggi_csv(f"SCUANAGRAFESTAT{ANNO}.csv")
PAR = leggi_csv(f"SCUANAGRAFEPAR{ANNO}.csv")
PER_CODICE = {r["CODICESCUOLA"]: r for r in STAT}
ISTITUTO_COMUNE = {r["CODICESCUOLA"]: r["CODICECOMUNESCUOLA"] for r in STAT}
VECCHIE = {r["codice"]: r for r in csv.DictReader(open(LISTA, encoding="utf-8"))} if os.path.exists(LISTA) else {}


def sic(codice):
    d = SIC.get(codice) or {}
    return d if d.get("trovata") else {}


NOMI_COMUNI = {maiuscolo(v["name"]) for v in COMUNI.values()}


def solo_via(v, comune):
    """Toglie quello che nella via non è una via: il CAP e il comune scritti al posto della strada, o il
    nome del comune da solo. Il nome di un altro comune diventa «Via …»: a Scafati c'è via Poggiomarino."""
    if not v or re.match(r"^\d{5}\b", v):
        return ""
    if maiuscolo(v) == maiuscolo(comune):
        return ""
    if maiuscolo(v) in NOMI_COMUNI:
        return "Via " + v
    return v


def cap_del_comune(cat):
    caps = collections.Counter(r["CAPSCUOLA"] for r in STAT + PAR
                               if r["CODICECOMUNESCUOLA"] == cat and re.fullmatch(r"\d{5}", r["CAPSCUOLA"] or ""))
    caps.pop("80100", None)
    return caps.most_common(1)[0][0] if caps else ""


def indirizzo(r, s):
    comune = nome_comune(r["CODICECOMUNESCUOLA"], r["DESCRIZIONECOMUNE"])
    v = INDIRIZZI.get(r["CODICESCUOLA"]) or solo_via(via(r["INDIRIZZOSCUOLA"]), comune)
    if not v and s.get("indirizzo"):
        v = solo_via(via(re.split(r",?\s*\d{5}\s", s["indirizzo"])[0]), comune)
    cap = r["CAPSCUOLA"] if re.fullmatch(r"\d{5}", r["CAPSCUOLA"] or "") else ""
    if not cap or (cap == "80100" and comune != "Napoli"):
        cap = cap_del_comune(r["CODICECOMUNESCUOLA"])
    luogo = f"{cap} {comune} ({SIGLA.get(r['PROVINCIA'], '')})".strip()
    return f"{v}, {luogo}" if v else luogo


GENERICHE_SITO = {"scuola", "scuole", "istituto", "comprensivo", "circolo", "didattico", "statale", "infanzia",
                  "primaria", "paritaria", "plesso", "capoluogo", "santa", "santo", "maria", "della", "delle",
                  "degli", "dello", "napoli", "salerno", "avellino", "edificio", "centro", "societa", "sociale",
                  "associazione", "impresa", "religioso", "ente", "suore", "istituti", "istitute"}


def piatto(t):
    t = unicodedata.normalize("NFD", (t or "").lower())
    return "".join(c for c in t if c.isalnum())


def sito_plausibile(url, parole):
    """Un sito vale se nel dominio c'è qualcosa della scuola: il nome, l'istituto, il comune o il codice.
    Per gli istituti nati nel 2026/27 il Ministero riporta a volte il sito di un'altra scuola:
    a Saviano, per esempio, quello di Massa Lubrense."""
    dominio = piatto(re.sub(r"^https?://(www\.)?", "", url).split("/")[0].rsplit(".", 2)[0])
    return any(p in dominio for p in parole)


def sito_scelto(candidati, parole):
    visti = []
    for c in candidati:
        c = pulisci_sito(c)
        if c and c not in visti:
            visti.append(c)
    for c in visti:
        vero = SITI.get(c, c) if SITI else c
        if vero and sito_plausibile(vero, parole):
            return vero
    return ""


def parole_della_scuola(*testi):
    parole = set()
    for t in testi:
        for w in re.split(r"[^\w']+", maiuscolo(t or "")):
            w = piatto(w)
            if len(w) >= 4 and w not in GENERICHE_SITO:
                parole.add(w)
        intero = piatto(t)
        if 6 <= len(intero) <= 30:
            parole.add(intero)
    return parole


def riga(r, paritaria):
    codice = r["CODICESCUOLA"]
    s = sic(codice)
    vecchia = VECCHIE.get(codice, {})
    tipo = ("infanzia" if "INFANZIA" in r["DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"] else "primaria")
    tipo += " paritaria" if paritaria else " statale"
    ist = "" if paritaria else r["CODICEISTITUTORIFERIMENTO"]
    si = sic(ist) if ist else {}
    cat = r["CODICECOMUNESCUOLA"]

    tel = TELEFONI.get(codice) or telefono(s.get("telefono")) or telefono(si.get("telefono")) or telefono(vecchia.get("telefono"))
    posta = next((e for e in (pulisci_email(s.get("email")), pulisci_email(r["INDIRIZZOEMAILSCUOLA"]))
                  if e and e not in EMAIL_FINTE), "")
    if not posta and ist:
        # ogni istituto statale ha la sua casella: codice@istruzione.it. Per gli istituti nati nel 2026/27
        # il Ministero non l'ha ancora scritta nell'elenco.
        posta = (pulisci_email(si.get("email")) or pulisci_email(PER_CODICE.get(ist, {}).get("INDIRIZZOEMAILSCUOLA"))
                 or f"{ist.lower()}@istruzione.it")
    vecchia_posta = vecchia.get("email", "")
    vecchio_stato = vecchia.get("email_utilizzabile", "")
    if paritaria and vecchia_posta and vecchio_stato == "sì" and vecchia_posta != posta:
        posta = vecchia_posta   # quella di settembre è arrivata: resta
    stesso = bool(posta) and posta == vecchia_posta
    if "ha chiesto" in vecchio_stato:
        stato = vecchio_stato   # chi ha chiesto di non ricevere email resta fuori anche se cambia indirizzo
    elif stesso and ("rimbalz" in vecchio_stato or "non riceve" in vecchio_stato):
        stato = vecchio_stato
    elif not posta:
        stato = "no: manca"
    elif posta in EMAIL_PERSONALI:
        stato = "no: indirizzo personale"
    elif posta in EMAIL_ISTITUZIONALI:
        stato = "sì"
    elif stesso and vecchio_stato.startswith(("sì", "no:")) and vecchio_stato != "no: manca":
        stato = vecchio_stato
    elif re.search(r"(^|[.@])(pec|legalmail|arubapec|postecert|pecimprese|cert)\.|@pec\.", posta):
        stato = "no: casella PEC"
    elif email_personale(posta):
        stato = "no: indirizzo personale"
    else:
        stato = "sì"
    if stato == "sì" and posta.split("@")[1] in DOMINI_MORTI:
        stato = "no: dominio che non riceve posta"

    candidati = [s.get("sito"), r.get("SITOWEBSCUOLA")]
    if ist:
        candidati += [si.get("sito"), PER_CODICE.get(ist, {}).get("SITOWEBSCUOLA")]
    parole = parole_della_scuola(r["DENOMINAZIONESCUOLA"], nome_comune(cat, r["DESCRIZIONECOMUNE"]),
                                 ISTITUTI.get(ist, ("", ""))[0], PER_CODICE.get(ist, {}).get("DENOMINAZIONESCUOLA"),
                                 codice, ist, NOMI.get(codice, ""))
    alunni = s.get("alunni") or ""
    return {
        "codice": codice,
        "tipo": tipo,
        "nome": nome_paritaria(r) if paritaria else nome_plesso(r),
        "istituto": ISTITUTI.get(ist, ("", ""))[0] if ist else "",
        "comune": nome_comune(cat, r["DESCRIZIONECOMUNE"]),
        "provincia": SIGLA.get(r["PROVINCIA"], ""),
        "indirizzo": indirizzo(r, s),
        "telefono": tel,
        "email": posta,
        "email_utilizzabile": stato,
        "sito": sito_scelto(candidati, parole),
        "alunni": alunni if alunni not in ("", "0") else "",
        "distanza_km": f"{DIST[cat]['linea']:.1f}",
        "minuti_auto": str(DIST[cat]["minuti"]),
    }


def scelte():
    """Le righe del Ministero che entrano nell'elenco: plessi dell'infanzia e primari, statali e paritari,
    nei comuni scelti. Dei plessi statali solo le sedi vere (SEDESCOLASTICA = SI), non ospedaliere."""
    for r in STAT:
        if (r["CODICECOMUNESCUOLA"] in SCELTI
                and r["DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"] in ("SCUOLA INFANZIA", "SCUOLA PRIMARIA")
                and r["SEDESCOLASTICA"] == "SI"
                and r["DESCRIZIONECARATTERISTICASCUOLA"] in ("NORMALE", "DI MONTAGNA")):
            yield r, False
    for r in PAR:
        if (r["CODICECOMUNESCUOLA"] in SCELTI
                and r["DESCRIZIONETIPOLOGIAGRADOISTRUZIONESCUOLA"] in ("SCUOLA INFANZIA NON STATALE", "SCUOLA PRIMARIA NON STATALE")):
            yield r, True


def candidati():
    """I codici da leggere su Scuola in Chiaro: i plessi, i loro istituti, e quelli della lista attuale."""
    codici = []
    for r, paritaria in scelte():
        codici.append(r["CODICESCUOLA"])
        if not paritaria:
            codici.append(r["CODICEISTITUTORIFERIMENTO"])
    codici += list(VECCHIE)
    return list(dict.fromkeys(codici))


def elenco():
    righe = [riga(r, paritaria) for r, paritaria in scelte()]
    righe.sort(key=lambda x: (float(x["distanza_km"]), x["comune"], x["istituto"] or "~", x["tipo"], x["nome"]))
    return righe


def scrivi(righe, percorso):
    with open(percorso, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CAMPI)
        w.writeheader()
        w.writerows(righe)


if __name__ == "__main__":
    righe = elenco()
    uscita = sys.argv[1] if len(sys.argv) > 1 else LISTA
    scrivi(righe, uscita)
    print(len(righe), "righe in", uscita)

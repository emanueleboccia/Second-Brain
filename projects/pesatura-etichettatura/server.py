"""
Sistema di pesatura ed etichettatura — scheletro.

Un solo programma che fa tre cose:
  1. chiede il peso alla bilancia, in continuazione, su rete
  2. serve le pagine: quella dell'operatore e quella dell'ufficio
  3. riempie il modello dell'etichetta e lo manda alla stampante

Gira con il Python di sistema, senza installare niente.

    python3 bilancia_finta.py      (in un terminale)
    python3 server.py              (in un altro)
    poi apri http://127.0.0.1:8080

Quando arriva la bilancia vera si cambiano tre righe in LettoreBilancia
e il resto del programma non se ne accorge.
"""

import datetime
import json
import os
import socket
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

QUI = os.path.dirname(os.path.abspath(__file__))
DB = os.path.join(QUI, "pesatura.db")

# ---------------------------------------------------------------- impostazioni
# In esercizio queste stanno in un file di configurazione, non nel codice.
CONF = {
    "bilancia_ip": "127.0.0.1",
    "bilancia_porta": 4001,
    "bilancia_comando": b"P\r\n",     # cambia col manuale della bilancia vera
    "stampante_ip": None,              # None = scrive su file invece che stampare
    "stampante_porta": 9100,
    "stampa_automatica": False,        # Antonio la vuole opzionale: di base spenta
    "soglia_ritorno_zero_kg": 0.005,   # sotto questa si sblocca la ristampa
    "porta_web": 8080,
}


# ------------------------------------------------------------------- bilancia
class LettoreBilancia:
    """Interroga la bilancia in continuazione e tiene da parte l'ultima lettura.

    La bilancia sta in ascolto su una porta di rete. Le mandi un comando,
    risponde con una riga tipo:  ST,GS,+  1.240,kg
    ST vuol dire peso fermo, US vuol dire che sta ancora ballando.
    """

    def __init__(self, conf):
        self.conf = conf
        self.peso = 0.0
        self.fermo = False
        self.collegata = False
        self.ultimo_errore = None
        self._lucchetto = threading.Lock()
        self._sock = None

    def avvia(self):
        threading.Thread(target=self._ciclo, daemon=True).start()

    def stato(self):
        with self._lucchetto:
            return {
                "peso": round(self.peso, 3),
                "fermo": self.fermo,
                "collegata": self.collegata,
                "errore": self.ultimo_errore,
            }

    def _collega(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(2.0)
        s.connect((self.conf["bilancia_ip"], self.conf["bilancia_porta"]))
        return s

    def _ciclo(self):
        while True:
            try:
                if self._sock is None:
                    self._sock = self._collega()
                    with self._lucchetto:
                        self.collegata = True
                        self.ultimo_errore = None

                self._sock.sendall(self.conf["bilancia_comando"])
                risposta = self._sock.recv(64).decode("ascii", "ignore")
                peso, fermo = self._interpreta(risposta)
                with self._lucchetto:
                    self.peso, self.fermo = peso, fermo

            except Exception as e:
                if self._sock:
                    try:
                        self._sock.close()
                    except Exception:
                        pass
                self._sock = None
                with self._lucchetto:
                    self.collegata = False
                    self.peso = 0.0
                    self.fermo = False
                    self.ultimo_errore = str(e)
                time.sleep(1.0)
                continue

            time.sleep(0.25)   # quattro letture al secondo

    @staticmethod
    def _interpreta(riga):
        """Da 'ST,GS,+  1.240,kg' tira fuori (1.240, True).

        E l'unico punto che cambia con una bilancia diversa: ogni costruttore
        scrive questa riga a modo suo, e il manuale dice come.
        """
        riga = riga.strip()
        if not riga:
            raise ValueError("risposta vuota")
        pezzi = [p.strip() for p in riga.split(",")]
        fermo = pezzi[0].upper().startswith("ST")
        numero = None
        for p in pezzi:
            testo = p.replace("kg", "").replace("KG", "").replace("+", "").strip()
            try:
                numero = float(testo)
                break
            except ValueError:
                continue
        if numero is None:
            raise ValueError("peso non trovato in: %r" % riga)
        return numero, fermo


# ------------------------------------------------------------------ stampante
def manda_alla_stampante(testo, conf):
    """Manda il testo dell'etichetta alla stampante, o su file se non c'e.

    Non si passa dai driver di Windows: si apre una connessione di rete alla
    stampante e le si manda il testo. E' la scelta scritta nell'analisi, ed e
    quella giusta: i driver sono la cosa che si blocca.
    """
    if conf["stampante_ip"]:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(5.0)
        s.connect((conf["stampante_ip"], conf["stampante_porta"]))
        s.sendall(testo.encode("utf-8", "replace"))
        s.close()
        return "stampante %s" % conf["stampante_ip"]

    cartella = os.path.join(QUI, "stampe")
    os.makedirs(cartella, exist_ok=True)
    nome = "etichetta-%s.txt" % datetime.datetime.now().strftime("%Y%m%d-%H%M%S-%f")
    percorso = os.path.join(cartella, nome)
    with open(percorso, "w", encoding="utf-8") as f:
        f.write(testo)
    return os.path.join("stampe", nome)


def riempi_modello(modello, valori):
    """Trova e sostituisci. Tutto qui la 'gestione template con segnaposto'."""
    testo = modello
    for chiave, valore in valori.items():
        testo = testo.replace("[%s]" % chiave, str(valore))
    return testo


# ------------------------------------------------------------------- database
def connetti():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def prepara_db():
    nuovo = not os.path.exists(DB)
    conn = connetti()
    with open(os.path.join(QUI, "schema.sql"), encoding="utf-8") as f:
        conn.executescript(f.read())

    if nuovo or not conn.execute("SELECT COUNT(*) c FROM ARTICOLI").fetchone()["c"]:
        with open(os.path.join(QUI, "etichette", "standard.txt"), encoding="utf-8") as f:
            modello = f.read()
        conn.execute(
            "INSERT INTO LAYOUT_ETICHETTE (Nome_Template, Codice_Sorgente_Raw) VALUES (?,?)",
            ("Standard 100x80", modello),
        )
        articoli = [
            ("Pulled Pork affumicato", "Carne di suino (92%), sale, zucchero di canna, "
             "paprika affumicata, pepe nero, aglio.", 15, 30, 18.50, "80123450001"),
            ("Brisket di manzo", "Punta di petto bovino (95%), sale, pepe nero, "
             "senape in polvere.", 12, 30, 24.00, "80123450002"),
            ("Costine marinate", "Costine di suino (90%), salsa BBQ (pomodoro, aceto, "
             "zucchero, SENAPE), sale.", 10, 45, 15.90, "80123450003"),
            ("Salsa BBQ della casa", "Pomodoro, aceto di mele, zucchero di canna, "
             "SENAPE, spezie. Puo contenere tracce di SEDANO.", 30, 55, 12.00, "80123450004"),
            ("Cheddar sauce", "LATTE, formaggio cheddar (LATTE), BURRO, amido, sale.",
             8, 55, 16.00, "80123450005"),
        ]
        for a in articoli:
            conn.execute(
                "INSERT INTO ARTICOLI (Descrizione, Testo_Ingredienti, Giorni_Scadenza, "
                "Tara_Grammi, Prezzo_Kg, ID_Layout, Prefisso_EAN) VALUES (?,?,?,?,?,1,?)", a
            )
        for nome in ("Mario", "Anna", "Giuseppe"):
            conn.execute("INSERT INTO OPERATORI (Nome) VALUES (?)", (nome,))
        conn.commit()
    conn.close()


# ------------------------------------------------------------------ blocco
class BloccoRistampa:
    """La 'logica anti-rimbalzo' dell'analisi.

    Dopo una stampa non se ne fa un'altra finche il piatto non torna a zero.
    Serve a non stampare quattro etichette per un collo solo quando la
    bilancia vibra o si assesta.
    """

    def __init__(self, soglia):
        self.soglia = soglia
        self.bloccato = False

    def dopo_stampa(self):
        self.bloccato = True

    def aggiorna(self, peso):
        if self.bloccato and peso <= self.soglia:
            self.bloccato = False
        return self.bloccato


bilancia = LettoreBilancia(CONF)
blocco = BloccoRistampa(CONF["soglia_ritorno_zero_kg"])


# ---------------------------------------------------------------------- web
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass   # niente rumore nel terminale

    # -- utilita
    def _json(self, dati, codice=200):
        corpo = json.dumps(dati, ensure_ascii=False).encode("utf-8")
        self.send_response(codice)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def _file(self, nome, tipo="text/html; charset=utf-8"):
        percorso = os.path.join(QUI, "static", nome)
        if not os.path.exists(percorso):
            self.send_error(404)
            return
        with open(percorso, "rb") as f:
            corpo = f.read()
        self.send_response(200)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    # -- rotte
    def do_GET(self):
        rotta = urlparse(self.path).path

        if rotta in ("/", "/operatore"):
            return self._file("operatore.html")
        if rotta == "/admin":
            return self._file("admin.html")

        if rotta == "/api/peso":
            stato = bilancia.stato()
            stato["bloccato"] = blocco.aggiorna(stato["peso"])
            stato["stampa_automatica"] = CONF["stampa_automatica"]
            return self._json(stato)

        if rotta == "/api/articoli":
            conn = connetti()
            righe = conn.execute(
                "SELECT ID_Articolo, Descrizione, Testo_Ingredienti, Giorni_Scadenza, "
                "Tara_Grammi, Prezzo_Kg, Prefisso_EAN FROM ARTICOLI ORDER BY Descrizione"
            ).fetchall()
            conn.close()
            return self._json([dict(r) for r in righe])

        if rotta == "/api/operatori":
            conn = connetti()
            righe = conn.execute("SELECT Nome FROM OPERATORI ORDER BY Nome").fetchall()
            conn.close()
            return self._json([r["Nome"] for r in righe])

        if rotta == "/api/storico":
            conn = connetti()
            righe = conn.execute(
                "SELECT s.Timestamp, s.Operatore, a.Descrizione, s.Lotto, s.Peso_Netto "
                "FROM STORICO_PESATE s JOIN ARTICOLI a ON a.ID_Articolo = s.ID_Articolo "
                "ORDER BY s.ID_Transazione DESC LIMIT 50"
            ).fetchall()
            conn.close()
            return self._json([dict(r) for r in righe])

        self.send_error(404)

    def do_POST(self):
        rotta = urlparse(self.path).path
        lunghezza = int(self.headers.get("Content-Length") or 0)
        corpo = json.loads(self.rfile.read(lunghezza) or "{}")

        if rotta == "/api/stampa":
            return self._json(*self._stampa(corpo))

        if rotta == "/api/automatica":
            CONF["stampa_automatica"] = bool(corpo.get("attiva"))
            return self._json({"stampa_automatica": CONF["stampa_automatica"]})

        self.send_error(404)

    # -- il cuore: pesa, riempi, stampa, registra
    def _stampa(self, richiesta):
        stato = bilancia.stato()
        if not stato["collegata"]:
            return {"ok": False, "messaggio": "Bilancia scollegata"}, 409
        if blocco.aggiorna(stato["peso"]):
            return {"ok": False, "messaggio": "Togli il collo dal piatto prima di ristampare"}, 409
        if stato["peso"] <= 0:
            return {"ok": False, "messaggio": "Nessun peso sul piatto"}, 409
        if not stato["fermo"]:
            return {"ok": False, "messaggio": "Peso non ancora fermo"}, 409

        conn = connetti()
        art = conn.execute(
            "SELECT a.*, l.Codice_Sorgente_Raw FROM ARTICOLI a "
            "LEFT JOIN LAYOUT_ETICHETTE l ON l.ID_Layout = a.ID_Layout "
            "WHERE a.ID_Articolo = ?", (richiesta.get("id_articolo"),)
        ).fetchone()
        if art is None:
            conn.close()
            return {"ok": False, "messaggio": "Articolo non trovato"}, 404

        adesso = datetime.datetime.now()
        lordo = stato["peso"]
        tara = (art["Tara_Grammi"] or 0) / 1000.0
        netto = round(max(0.0, lordo - tara), 3)

        scadenza = richiesta.get("scadenza") or (
            adesso + datetime.timedelta(days=art["Giorni_Scadenza"] or 0)
        ).strftime("%d/%m/%Y")
        lotto = richiesta.get("lotto") or adesso.strftime("%y%m%d")
        operatore = richiesta.get("operatore") or "—"

        etichetta = riempi_modello(art["Codice_Sorgente_Raw"] or "", {
            "DESCRIZIONE": art["Descrizione"],
            "INGREDIENTI": art["Testo_Ingredienti"],
            "PESO_NETTO": "%.3f" % netto,
            "PESO_LORDO": "%.3f" % lordo,
            "TARA": "%.3f" % tara,
            "LOTTO": lotto,
            "SCADENZA": scadenza,
            "OPERATORE": operatore,
            "DATA_CONF": adesso.strftime("%d/%m/%Y"),
            "ORA_CONF": adesso.strftime("%H:%M"),
            "EAN": art["Prefisso_EAN"] or "",
            "PREZZO_KG": "%.2f" % (art["Prezzo_Kg"] or 0),
        })

        try:
            dove = manda_alla_stampante(etichetta, CONF)
        except Exception as e:
            conn.close()
            return {"ok": False, "messaggio": "Stampante irraggiungibile: %s" % e}, 502

        conn.execute(
            "INSERT INTO STORICO_PESATE (Timestamp, Operatore, ID_Articolo, Lotto, Peso_Netto) "
            "VALUES (?,?,?,?,?)",
            (adesso.isoformat(timespec="seconds"), operatore, art["ID_Articolo"], lotto, netto),
        )
        conn.commit()
        conn.close()
        blocco.dopo_stampa()

        return {
            "ok": True,
            "peso_netto": netto,
            "tara": tara,
            "lotto": lotto,
            "scadenza": scadenza,
            "dove": dove,
            "anteprima": etichetta.split("# ---")[0].strip(),
        }, 200


def main():
    prepara_db()
    bilancia.avvia()
    server = ThreadingHTTPServer(("127.0.0.1", CONF["porta_web"]), Handler)
    print("Postazione di pesatura su http://127.0.0.1:%d" % CONF["porta_web"])
    print("Ufficio (anagrafiche e storico) su http://127.0.0.1:%d/admin" % CONF["porta_web"])
    print("Bilancia attesa su %s:%d — Ctrl+C per fermare." % (
        CONF["bilancia_ip"], CONF["bilancia_porta"]))
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nFermo.")


if __name__ == "__main__":
    main()

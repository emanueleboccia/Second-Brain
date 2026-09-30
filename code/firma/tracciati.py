# Ricava il monogramma «EB» in tracciati SVG dal font Archivo variabile.
#
# Il monogramma del sito è un <text> in Archivo (wdth 125, wght 900) dentro un cerchio:
# nei siti dei clienti quel font non c'è, quindi le lettere diventano tracciati.
# Qui si rifà a mano quello che fa il browser: si prende l'istanza del font, si mettono
# le due lettere una dopo l'altra con la loro spaziatura, si centra il tutto su x=21
# e si appoggia sulla linea di base y=27, nel riquadro 42 × 42 dell'originale.
#
# Serve un ambiente virtuale con fonttools e brotli, fuori dal vault:
#   python3 -m venv venv && ./venv/bin/pip install fonttools brotli
#   ./venv/bin/python tracciati.py /percorso/di/archivo-latin-wdth-normal.woff2
#
# Opzioni:  --corpo 16  --spaziatura -0.02  --decimali 2
# (la sigla nella testata del sito è --corpo 16.5 --spaziatura -0.04)

import argparse
import json

from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

LATO = 42          # il riquadro dell'originale
CENTRO = 21        # x del centro: il testo è text-anchor="middle"
BASE = 27          # y della linea di base
RAGGIO = 19.2      # il cerchio dell'originale...
SPESSORE = 2.5     # ...e il suo tratto


def numero(valore, decimali):
    """Un numero come lo vuole un tracciato SVG: senza zeri inutili."""
    testo = ("%.*f" % (decimali, valore)).rstrip("0").rstrip(".") if decimali else "%d" % round(valore)
    if testo in ("-0", ""):
        testo = "0"
    if testo.startswith("0."):
        testo = testo[1:]
    elif testo.startswith("-0."):
        testo = "-" + testo[2:]
    return testo


def unisci(numeri):
    """Mette in fila i numeri col separatore solo dove serve."""
    fuori = ""
    for n in numeri:
        if fuori and not n.startswith("-") and not (n.startswith(".") and "." in fuori.split(" ")[-1].lstrip("-").split("-")[-1]):
            fuori += " "
        fuori += n
    return fuori


class Scrittore:
    """Scrive un tracciato con comandi relativi, senza accumulare l'errore dell'arrotondamento."""

    def __init__(self, decimali):
        self.decimali = decimali
        self.passo = 10 ** decimali
        self.pezzi = []
        self.qui = (0.0, 0.0)      # posizione corrente, già arrotondata
        self.inizio = (0.0, 0.0)

    def tondo(self, p):
        return (round(p[0] * self.passo) / self.passo, round(p[1] * self.passo) / self.passo)

    def delta(self, p):
        return (p[0] - self.qui[0], p[1] - self.qui[1])

    def n(self, *valori):
        return unisci([numero(v, self.decimali) for v in valori])

    def muovi(self, p):
        p = self.tondo(p)
        self.pezzi.append("M" + self.n(*p))
        self.qui = self.inizio = p

    def linea(self, p):
        p = self.tondo(p)
        dx, dy = self.delta(p)
        if abs(dx) < 1e-9 and abs(dy) < 1e-9:
            return
        if abs(dy) < 1e-9:
            self.pezzi.append("h" + self.n(dx))
        elif abs(dx) < 1e-9:
            self.pezzi.append("v" + self.n(dy))
        else:
            self.pezzi.append("l" + self.n(dx, dy))
        self.qui = p

    def curva(self, controllo, p, liscia):
        """Quadratica. Se «liscia», il punto di controllo è il riflesso del precedente: basta «t»."""
        p = self.tondo(p)
        if liscia:
            self.pezzi.append("t" + self.n(*self.delta(p)))
        else:
            c = self.tondo(controllo)
            self.pezzi.append("q" + self.n(*self.delta(c), *self.delta(p)))
        self.qui = p

    def chiudi(self):
        self.pezzi.append("z")
        self.qui = self.inizio

    def testo(self):
        return "".join(self.pezzi)


def anello(decimali):
    """Il cerchio col tratto, ridisegnato come corona piena: due cerchi in versi opposti."""
    fuori = RAGGIO + SPESSORE / 2
    dentro = RAGGIO - SPESSORE / 2
    n = lambda *v: unisci([numero(x, decimali) for x in v])
    pezzi = []
    for raggio, verso in ((fuori, 0), (dentro, 1)):
        pezzi.append("M" + n(CENTRO, CENTRO - raggio))
        pezzi.append("a" + n(raggio, raggio) + " 0 1 %d " % verso + n(0, 2 * raggio))
        pezzi.append("a" + n(raggio, raggio) + " 0 1 %d " % verso + n(0, -2 * raggio))
        pezzi.append("z")
    return "".join(pezzi)


def lettera(glifi, nome, origine, scala, decimali):
    penna = RecordingPen()
    glifi[nome].draw(penna)
    s = Scrittore(decimali)

    def porta(p):
        return (origine + p[0] * scala, BASE - p[1] * scala)

    for comando, punti in penna.value:
        if comando == "moveTo":
            s.muovi(porta(punti[0]))
        elif comando == "lineTo":
            s.linea(porta(punti[0]))
        elif comando == "qCurveTo":
            # TrueType: una fila di punti di controllo, e fra due consecutivi c'è un punto
            # sulla curva sottinteso, a metà strada. Il riflesso lo rende un «t» di SVG.
            controlli = [porta(p) for p in punti[:-1]]
            arrivo = porta(punti[-1])
            for i, c in enumerate(controlli):
                if i + 1 < len(controlli):
                    dopo = controlli[i + 1]
                    fine = ((c[0] + dopo[0]) / 2, (c[1] + dopo[1]) / 2)
                else:
                    fine = arrivo
                s.curva(c, fine, liscia=(i > 0))
        elif comando == "curveTo":
            raise SystemExit("curve cubiche: questo font non dovrebbe averne")
        elif comando in ("closePath", "endPath"):
            s.chiudi()
    return s.testo()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("font")
    p.add_argument("--corpo", type=float, default=16.0, help="font-size nel riquadro da 42")
    p.add_argument("--spaziatura", type=float, default=-0.02, help="letter-spacing in em")
    p.add_argument("--decimali", type=int, default=2)
    p.add_argument("--json", action="store_true")
    a = p.parse_args()

    font = TTFont(a.font)
    istanza = instantiateVariableFont(font, {"wdth": 125, "wght": 900}, inplace=False)
    upm = istanza["head"].unitsPerEm
    glifi = istanza.getGlyphSet()
    mappa = istanza.getBestCmap()
    gE, gB = mappa[ord("E")], mappa[ord("B")]

    scala = a.corpo / upm
    spazio = a.spaziatura * a.corpo
    passoE = glifi[gE].width * scala + spazio
    passoB = glifi[gB].width * scala + spazio
    # il browser centra l'avanzamento intero, spaziatura dell'ultima lettera compresa
    partenza = CENTRO - (passoE + passoB) / 2
    origineE = partenza
    origineB = partenza + passoE

    dE = lettera(glifi, gE, origineE, scala, a.decimali)
    dB = lettera(glifi, gB, origineB, scala, a.decimali)
    dA = anello(a.decimali)
    tutto = dA + dE + dB

    if a.json:
        print(json.dumps({"anello": dA, "E": dE, "B": dB, "tutto": tutto,
                          "origineE": origineE, "origineB": origineB, "scala": scala}))
        return
    print("unità per em:", upm, "· corpo", a.corpo, "· spaziatura", a.spaziatura, "em")
    print("E parte da x = %.4f, B da x = %.4f" % (origineE, origineB))
    print("anello  (%d byte): %s" % (len(dA), dA))
    print("E       (%d byte): %s" % (len(dE), dE))
    print("B       (%d byte): %s" % (len(dB), dB))
    print("tutto   (%d byte):" % len(tutto))
    print(tutto)


if __name__ == "__main__":
    main()

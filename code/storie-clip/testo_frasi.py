# Le scritte delle storie «una frase per clip» di Zucche in Masseria, nate il 25/09/2026: in alto la frase
# della clip, su due righe, con l'ultima parola in Niconne giallo allineata sulla linea di base; in basso,
# uguale per tutte, il nome dell'evento e la data. Centro libero, come nel format «io e te».
# Uso: python3 testo_frasi.py ricetta.json cartella-uscita
import json, os, sys
from PIL import ImageFont
from testi import ink, size_for, compose, AVORIO, GIALLO
from testo_invito import scrim, centra
from testo_extra import riga_mista, HB, HR, NC

# Le misure sono quelle delle storie extra del 24/09: la prima riga alta come «Manca poco», la seconda
# come «a tutto». Si prendono da lì una volta sola, così le frasi hanno tutte lo stesso corpo.
S1 = size_for('Manca poco', HB, target_h=86)
S2 = size_for('a tutto', HB, target_h=62)
LARG = 900


def frase(riga1, a, b, out):
    s1 = S1
    b1 = ink(riga1, ImageFont.truetype(HB, int(s1)))
    if b1[2] - b1[0] > LARG:
        s1 = s1 * LARG / (b1[2] - b1[0])
    items = [(riga1, HB, int(s1), AVORIO, centra(riga1, HB, s1), 292)]
    items += riga_mista(a, b, 402, S2)
    s_ev = size_for('Zucche in Masseria', NC, target_w=700)
    items.append(('Zucche in Masseria', NC, int(s_ev), GIALLO, centra('Zucche in Masseria', NC, s_ev), 1486))
    data = 'Da sabato 26 settembre'
    s_d = size_for(data, HR, target_h=40)
    items.append((data, HR, int(s_d), AVORIO, centra(data, HR, s_d), 1622))
    compose(items, blur=12, dy=4, alpha=0.58, scrim=scrim()).save(out)
    return out


if __name__ == '__main__':
    ricetta = json.load(open(sys.argv[1]))
    os.makedirs(sys.argv[2], exist_ok=True)
    for storia in ricetta['storie']:
        for i, c in enumerate(storia['clip'], 1):
            riga1, a, b = c['frase']
            print(frase(riga1, a, b, os.path.join(sys.argv[2], f"{storia['nome']}-{i}.png")))

# La scritta della storia di ringraziamento dopo il primo weekend di Zucche: il testo è di Emanuele,
# «grazie a tutti per questi primi 2 giorni, ci vediamo il prossimo weekend». Centro libero.
import sys
from testi import size_for, compose, AVORIO, W
from testo_invito import scrim, centra
from testo_extra import riga_mista, HB, NC

def grazie(out):
    # in alto: «Grazie a tutti», con «tutti» in Niconne giallo, e sotto «per questi primi 2 giorni»
    items = riga_mista('Grazie a', 'tutti', 292, size_for('Grazie a', HB, target_h=86), gap=40)
    riga2 = 'per questi primi 2 giorni'
    s2 = size_for(riga2, HB, target_w=800)
    items.append((riga2, HB, int(s2), AVORIO, centra(riga2, HB, s2), 432))
    # in basso: «Ci vediamo» e «il prossimo weekend», con «weekend» in Niconne giallo
    s3 = size_for('Ci vediamo', HB, target_h=70)
    items.append(('Ci vediamo', HB, int(s3), AVORIO, centra('Ci vediamo', HB, s3), 1468))
    items += riga_mista('il prossimo', 'weekend', 1570, size_for('il prossimo', HB, target_h=62), gap=34)
    compose(items, blur=12, dy=4, alpha=0.58, scrim=scrim()).save(out)
    return out

if __name__ == '__main__':
    print(grazie(sys.argv[1]))

# Le scritte delle storie extra di Zucche, nel format «io e te» del meno 6: la frase in alto, con una
# parola sola in Niconne giallo, e in basso il nome dell'evento o il fatto, con la data. Centro libero.
# Esce un PNG trasparente 1080x1920.
import sys
from PIL import ImageFont
from testi import ink, size_for, compose, AVORIO, GIALLO, W, F
from testo_invito import scrim, centra

HB, HR, NC = f'{F}/HeroLight-Bold.otf', f'{F}/HeroLight-Regular.otf', f'{F}/Niconne-Regular.ttf'


def riga_mista(a, b, y, s_a, k_nc=1.62, gap=24, larg_max=900):
    """«a» in HeroLight avorio e «b» in Niconne giallo sulla stessa riga, appoggiati sulla stessa linea
    di base: allineando il bordo dell'inchiostro, la parola in Niconne scende."""
    s_b = s_a * k_nc
    fa, fb = ImageFont.truetype(HB, int(s_a)), ImageFont.truetype(NC, int(s_b))
    ba, bb = ink(a, fa), ink(b, fb)
    larg = (ba[2] - ba[0]) + gap + (bb[2] - bb[0])
    if larg > larg_max:
        k = larg_max / larg
        s_a, s_b, gap = s_a * k, s_b * k, gap * k
        fa, fb = ImageFont.truetype(HB, int(s_a)), ImageFont.truetype(NC, int(s_b))
        ba, bb = ink(a, fa), ink(b, fb)
    x0 = (W - ((ba[2] - ba[0]) + int(gap) + (bb[2] - bb[0]))) // 2
    base = y - ba[1] + fa.getmetrics()[0]
    y_b = int(round(base + bb[1] - fb.getmetrics()[0]))
    return [(a, HB, int(s_a), AVORIO, x0, y),
            (b, NC, int(s_b), GIALLO, x0 + (ba[2] - ba[0]) + int(gap), y_b)]


def manca_poco(out):
    s1 = size_for('Manca poco', HB, target_h=86)
    items = [('Manca poco', HB, int(s1), AVORIO, centra('Manca poco', HB, s1), 292)]
    items += riga_mista('a tutto', 'questo', 402, size_for('a tutto', HB, target_h=62))
    s_ev = size_for('Zucche in Masseria', NC, target_w=700)
    items.append(('Zucche in Masseria', NC, int(s_ev), GIALLO, centra('Zucche in Masseria', NC, s_ev), 1486))
    data = 'Da sabato 26 settembre'
    s_d = size_for(data, HR, target_h=40)
    items.append((data, HR, int(s_d), AVORIO, centra(data, HR, s_d), 1622))
    compose(items, blur=12, dy=4, alpha=0.58, scrim=scrim()).save(out)
    return out


def anno_scorso(out):
    s1 = size_for("L'anno scorso", HB, target_h=86)
    items = [("L'anno scorso", HB, int(s1), AVORIO, centra("L'anno scorso", HB, s1), 292)]
    items += riga_mista('è andata', 'così', 402, size_for('è andata', HB, target_h=62))
    fatto = 'Sold out in quasi tutte le date.'
    s_f = size_for(fatto, HB, target_w=880)
    items.append((fatto, HB, int(s_f), AVORIO, centra(fatto, HB, s_f), 1500))
    data = 'Si riparte sabato 26 settembre'
    s_d = size_for(data, HR, target_h=40)
    items.append((data, HR, int(s_d), AVORIO, centra(data, HR, s_d), 1606))
    compose(items, blur=12, dy=4, alpha=0.58, scrim=scrim()).save(out)
    return out


if __name__ == '__main__':
    print(manca_poco(sys.argv[1]))
    print(anno_scorso(sys.argv[2]))

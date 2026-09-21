# La scritta del format "io e te": domanda in alto, countdown in basso, centro libero.
# Esce un PNG trasparente 1080x1920.
import sys
import numpy as np
from PIL import Image, ImageFont
from testi import ink, size_for, compose, AVORIO, GIALLO, W, H, F

HB, HR, NC = f'{F}/HeroLight-Bold.otf', f'{F}/HeroLight-Regular.otf', f'{F}/Niconne-Regular.ttf'

def banda(y0, y1, forza):
    """Velatura morbida solo dove c'è testo: il centro dell'immagine resta pulito."""
    y = np.arange(H, dtype=float)
    c, mezzo = (y0+y1)/2, (y1-y0)/2
    a = forza*np.exp(-((y-c)/(mezzo*0.86))**4)
    return a

def scrim():
    a = np.maximum(banda(190, 640, 0.6), banda(1400, 1760, 0.6))
    al = (np.repeat(a[:, None], W, 1)*255).astype(np.uint8)
    z = np.zeros((H, W), np.uint8)
    return Image.fromarray(np.dstack([z, z, z, al]), 'RGBA')

def centra(text, path, size):
    b = ink(text, ImageFont.truetype(path, int(size)))
    return (W-(b[2]-b[0]))//2

def titolo_invito(numero, out):
    # in alto: la domanda e il nome dell'evento
    s1 = size_for('Io e te a', HB, target_h=62)
    s2 = size_for('Zucche in Masseria', NC, target_w=830)
    # in basso: il countdown e la data, attaccati
    a, b = f'Mancano {numero}', 'giorni!'
    s3 = size_for(a, HB, target_h=84)
    s4 = s3*1.62
    gap = 26
    ba = ink(a, ImageFont.truetype(HB, int(s3)))
    bb = ink(b, ImageFont.truetype(NC, int(s4)))
    larg = (ba[2]-ba[0]) + gap + (bb[2]-bb[0])
    if larg > 900:
        k = 900/larg
        s3, s4, gap = s3*k, s4*k, gap*k
        ba = ink(a, ImageFont.truetype(HB, int(s3)))
        bb = ink(b, ImageFont.truetype(NC, int(s4)))
    x0 = (W-((ba[2]-ba[0]) + int(gap) + (bb[2]-bb[0])))//2
    data = 'Da sabato 26 settembre'
    s5 = size_for(data, HR, target_h=38)
    # I due font hanno metriche diverse: si allineano sulla linea di base, non sul bordo
    # dell'inchiostro, se no «giorni!» scende rispetto a «Mancano 6».
    y_a = 1500
    fa, fb = ImageFont.truetype(HB, int(s3)), ImageFont.truetype(NC, int(s4))
    base = y_a - ba[1] + fa.getmetrics()[0]          # dove poggiano le lettere di «Mancano 6»
    y_b = int(round(base + bb[1] - fb.getmetrics()[0]))
    items = [('Io e te a', HB, int(s1), AVORIO, centra('Io e te a', HB, s1), 300),
             ('Zucche in Masseria', NC, int(s2), GIALLO, centra('Zucche in Masseria', NC, s2), 385),
             (a, HB, int(s3), AVORIO, x0, y_a),
             (b, NC, int(s4), GIALLO, x0+(ba[2]-ba[0])+int(gap), y_b),
             (data, HR, int(s5), AVORIO, centra(data, HR, s5), 1625)]
    compose(items, blur=12, dy=4, alpha=0.58, scrim=scrim()).save(out)
    return out

if __name__ == '__main__':
    print(titolo_invito(sys.argv[1], sys.argv[2]))

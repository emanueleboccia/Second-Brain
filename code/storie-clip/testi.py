# Rende la scritta del conto alla rovescia e i sottotitoli come PNG trasparenti 1080x1920.
import numpy as np, sys, json, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'font')
AVORIO, GIALLO = (255, 246, 232), (242, 176, 30)
W, H = 1080, 1920

def ink(text, font):
    im = Image.new('L', (3000, 1200), 0); d = ImageDraw.Draw(im)
    d.text((500, 400), text, font=font, fill=255)
    a = np.asarray(im); ys, xs = np.where(a > 40)
    return xs.min()-500, ys.min()-400, xs.max()-500, ys.max()-400   # bbox inchiostro rispetto all'origine

def size_for(text, path, target_h=None, target_w=None):
    lo, hi = 10, 900
    for _ in range(30):
        mid = (lo+hi)/2; b = ink(text, ImageFont.truetype(path, mid))
        v = (b[3]-b[1]) if target_h else (b[2]-b[0]); t = target_h or target_w
        lo, hi = (mid, hi) if v < t else (lo, mid)
    return (lo+hi)/2

def shadow_layer(mask, blur=10, dy=4, alpha=0.55):
    sh = mask.filter(ImageFilter.GaussianBlur(blur))
    sh = sh.point(lambda v: int(v*alpha))
    out = Image.new('L', mask.size, 0); out.paste(sh, (0, dy)); return out

def compose(items, blur=10, dy=4, alpha=0.55, scrim=None):
    """items: (text, fontpath, size, color, x_ink, y_ink) con x/y = angolo in alto a sinistra dell'inchiostro."""
    txt = Image.new('RGBA', (W, H), (0, 0, 0, 0)); mask = Image.new('L', (W, H), 0)
    for text, path, size, color, x, y in items:
        f = ImageFont.truetype(path, size); b = ink(text, f)
        ImageDraw.Draw(txt).text((x-b[0], y-b[1]), text, font=f, fill=color+(255,))
        ImageDraw.Draw(mask).text((x-b[0], y-b[1]), text, font=f, fill=255)
    out = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    if scrim is not None:
        out = Image.alpha_composite(out, scrim)
    sh = shadow_layer(mask, blur, dy, alpha)
    out = Image.alpha_composite(out, Image.merge('RGBA', (sh.point(lambda v: 0),)*3 + (sh,)))
    return Image.alpha_composite(out, txt)

def scrim_alto(top=0.32, fine=1000):
    y = np.arange(H, dtype=float)
    a = np.where(y < fine, top*(1-(y/fine)**2), 0.0)
    al = (np.repeat(a[:, None], W, 1)*255).astype(np.uint8)
    z = np.zeros((H, W), np.uint8)
    return Image.fromarray(np.dstack([z, z, z, al]), 'RGBA')

def titolo(numero, out):
    hb, hr, nc = f'{F}/HeroLight-Bold.otf', f'{F}/HeroLight-Regular.otf', f'{F}/Niconne-Regular.ttf'
    s1 = size_for('–9', hb, target_h=231)          # misure prese dalla storia del meno 9
    s2 = size_for('giorni', nc, target_h=131)
    s3 = size_for('a Zucche in Masseria', hb, target_w=919)
    num = f'–{numero}'
    # il numero resta ancorato a destra dove finiva il 9, «giorni» e la riga sotto non si muovono
    b = ink(num, ImageFont.truetype(hb, s1)); x_num = 475 - (b[2]-b[0])
    img = compose([(num, hb, s1, AVORIO, x_num, 302),
                   ('giorni', nc, s2, GIALLO, 517, 414),
                   ('a Zucche in Masseria', hb, s3, AVORIO, 78, 596)], scrim=scrim_alto())
    img.save(out); return s1, s2, s3

if __name__ == '__main__':
    print(titolo(sys.argv[1], sys.argv[2]))

def a_capo(text, font, larghezza):
    parole = text.split()
    w = lambda t: (lambda b: b[2]-b[0])(ink(t, font))
    if w(text) <= larghezza: return [text]
    # due righe il più possibile uguali, la prima non più corta della seconda di troppo
    best = None
    for k in range(1, len(parole)):
        a, b = ' '.join(parole[:k]), ' '.join(parole[k:])
        wa, wb = w(a), w(b)
        if max(wa, wb) > larghezza: continue
        score = abs(wa - wb) + (40 if wb > wa else 0)
        if best is None or score < best[0]: best = (score, [a, b])
    return best[1] if best else [text]

def sottotitolo(text, colore, out, size=78, y_centro=1390, larghezza=900):
    hb = f'{F}/HeroLight-Bold.otf'; f = ImageFont.truetype(hb, size)
    righe = a_capo(text, f, larghezza)
    asc, desc = f.getmetrics(); passo = int(size*1.12)
    alt = passo*(len(righe)-1) + asc
    y0 = y_centro - alt//2
    col = AVORIO if colore == 'avorio' else GIALLO
    items = []; boxes = []
    for i, r in enumerate(righe):
        b = ink(r, f); w = b[2]-b[0]; x = (W - w)//2
        # allinea sulla linea di base comune: y dell'inchiostro = y0 + i*passo + (asc - altezza sopra la base)
        top = y0 + i*passo + (b[1] - (-0))  # bbox relativo all'origine del testo
        items.append((r, hb, size, col, x, y0 + i*passo + b[1])); boxes.append((x, y0 + i*passo + b[1], x+w, y0 + i*passo + b[3]))
    # scrim morbido dietro al blocco di testo
    x1 = min(b[0] for b in boxes)-60; y1 = min(b[1] for b in boxes)-45; x2 = max(b[2] for b in boxes)+60; y2 = max(b[3] for b in boxes)+45
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rounded_rectangle((x1, y1, x2, y2), radius=60, fill=int(255*0.52))
    m = m.filter(ImageFilter.GaussianBlur(34))
    scrim = Image.merge('RGBA', (m.point(lambda v: 0),)*3 + (m,))
    img = compose(items, blur=7, dy=3, alpha=0.75, scrim=scrim)
    img.save(out)

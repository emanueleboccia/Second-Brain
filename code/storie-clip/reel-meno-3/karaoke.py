# Sottotitoli dinamici: poche parole alla volta, ognuna entra quando viene detta.
import json, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from testi import F, AVORIO, GIALLO, ink

W, H = 1080, 1920
HB = f'{F}/HeroLight-Bold.otf'
SIZE = 92; Y_BASE = 1440; SPAZIO = 24
FONT = ImageFont.truetype(HB, SIZE)
ASC = FONT.getmetrics()[0]

def energia(clip):
    a = subprocess.run(['ffmpeg', '-v', 'error', '-i', f'wav/IMG_{clip}.wav', '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(a, np.float32); hop = 160                    # 10 ms a 16 kHz
    e = np.sqrt(np.convolve(x**2, np.ones(320)/320, 'same')[::hop])
    return 20*np.log10(e + 1e-6)

def aggancia(clip, parole):
    """Sposta l'inizio di ogni parola sull'attacco più vicino della voce (entro ±0,15 s)."""
    e = energia(clip); d = np.diff(e, prepend=e[0])
    out = []
    for testo, t in parole:
        i0, i1 = max(1, int((t-0.15)*100)), min(len(e)-1, int((t+0.15)*100))
        seg = d[i0:i1]
        if len(seg) and seg.max() > 1.5 and e[i0:i1].max() > e.max()-30:
            t = (i0 + int(np.argmax(seg)))/100 - 0.03
        out.append((testo, max(0.0, t)))
    # mai all'indietro
    for k in range(1, len(out)):
        if out[k][1] < out[k-1][1] + 0.06: out[k] = (out[k][0], out[k-1][1] + 0.06)
    return out

CORTE = {'un', 'una', 'di', 'il', 'la', 'lo', 'a', 'che', 'per', 'e', 'ma', 'ce', 'si', 'agli', 'al'}

def blocchi(parole, fine, max_parole=3, max_car=20, coda=0.3):
    """parole: (testo, inizio, fine). Blocchi brevi; un blocco sparisce poco dopo la sua ultima parola."""
    bl, cur = [], []
    for n, (w, a, b) in enumerate(parole):
        cur.append((w, a, b))
        nx = parole[n+1] if n+1 < len(parole) else None
        lung = sum(len(x[0]) for x in cur) + len(cur) - 1
        punt = w[-1] in '.?!…' or (w[-1] == ',' and len(cur) >= 2)
        stop = (punt or len(cur) >= max_parole or nx is None or nx[1] - b > 0.35
                or lung + 1 + len(nx[0]) > max_car)
        if stop:
            # un blocco non finisce con una parolina: «un», «di», «il» passano al blocco dopo
            if len(cur) > 1 and nx is not None and not punt and w.lower() in CORTE and nx[1] - b <= 0.35:
                bl.append(cur[:-1]); cur = [cur[-1]]
            else:
                bl.append(cur); cur = []
    res = []
    for j, b in enumerate(bl):
        t_fine = min(fine, b[-1][2] + coda)
        if j+1 < len(bl): t_fine = min(t_fine, bl[j+1][0][1])
        res.append(([(w, a) for w, a, _ in b], t_fine))
    return res

_spr = {}
def sprite(w, colore):
    key = (w, colore)
    if key in _spr: return _spr[key]
    b = ink(w, FONT); pad = 30
    tw, th = b[2]-b[0], ASC + 40
    im = Image.new('RGBA', (tw + 2*pad, th + 2*pad), (0, 0, 0, 0))
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).text((pad - b[0], pad), w, font=FONT, fill=255)
    sh = m.filter(ImageFilter.GaussianBlur(7)).point(lambda v: int(v*0.8))
    ombra = Image.new('RGBA', im.size, (0, 0, 0, 0)); ombra.putalpha(sh)
    im.alpha_composite(ombra, (0, 3))
    col = Image.new('RGBA', im.size, (AVORIO if colore == 'avorio' else GIALLO) + (255,)); col.putalpha(m)
    im.alpha_composite(col)
    _spr[key] = (im, tw, pad)
    return _spr[key]

def scrim(larg):
    larg = int(round(larg/20)*20)
    key = ('scrim', larg)
    if key in _spr: return _spr[key]
    m = Image.new('L', (W, 330), 0)
    ImageDraw.Draw(m).rounded_rectangle(((W-larg)//2 - 55, 105, (W+larg)//2 + 55, 225), radius=60, fill=int(255*0.5))
    m = m.filter(ImageFilter.GaussianBlur(32))
    s = Image.new('RGBA', (W, 330), (0, 0, 0, 0)); s.putalpha(m)
    _spr[key] = s; return s

def ease_back(u, s=1.8):
    u = min(1, max(0, u)); u -= 1; return u*u*((s+1)*u + s) + 1

def disegna(im, bl, t, colore):
    """bl: lista di (blocco, t_fine). Disegna il blocco attivo, parola per parola."""
    for b, t_fine in bl:
        t0 = b[0][1]
        if not (t0 <= t < t_fine): continue
        # ogni parola occupa il suo posto man mano che entra: il blocco si ricentra scorrendo
        rev = [min(1, max(0, (t - tw)/0.16)) for _, tw in b]
        rev = [u*u*(3-2*u) for u in rev]
        wids = [sprite(w, colore)[1] for w, _ in b]
        vis = sum(wd*r for wd, r in zip(wids, rev)) + sum(SPAZIO*r for r in rev[1:])
        larg = sum(wids) + SPAZIO*(len(b)-1)
        uscita = min(1, (t_fine - t)/0.08)
        s = scrim(int(max(vis, 60))); a = min(1, (t-t0)/0.12)*uscita
        if a > 0:
            s2 = s.copy(); s2.putalpha(s.getchannel('A').point(lambda v: int(v*a))); im.alpha_composite(s2, (0, Y_BASE - 165))
        x = (W - vis)/2
        for k, (w, tw) in enumerate(b):
            sp, wid, pad = sprite(w, colore)
            if k: x += SPAZIO*rev[k]
            if t >= tw:
                u = (t - tw)/0.14
                kk = 0.72 + 0.28*ease_back(u); al = min(1, u*1.6)*uscita
                img = sp if kk > 0.999 else sp.resize((max(1, round(sp.width*kk)), max(1, round(sp.height*kk))), Image.BICUBIC)
                if al < 1:
                    img = img.copy(); img.putalpha(img.getchannel('A').point(lambda v: int(v*al)))
                # ancorata a sinistra: cresce verso destra, dove non c'è ancora niente
                cy = Y_BASE - 40 + 10*(1-min(1, u))
                im.alpha_composite(img, (int(x - pad*kk), int(cy - img.height/2)))
            x += wid*rev[k]
    return im

# Il reel del meno 3 di Zucche in Masseria: video muto, fotogramma per fotogramma.
# Uso: python3 render.py [solo=<n,n>]  -> reel_video.mp4 e timeline.json
import os, sys, json, math, subprocess, numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageDraw
import karaoke

W, H, FPS = 1080, 1920, 30
A = 'asset'
BEAT = 0.6928

def ease(u): u = min(1, max(0, u)); return u*u*(3-2*u)
def ease_out(u, p=3): u = min(1, max(0, u)); return 1-(1-u)**p
def ease_io(u): u = min(1, max(0, u)); return 4*u**3 if u < .5 else 1-(-2*u+2)**3/2

# ---------- lettura delle clip ----------
def leggi(clip, ss, dur, nativo=False):
    vf = 'eq=contrast=1.04:saturation=1.10,format=rgb24'
    if not nativo: vf = 'fps=30,' + vf
    p = subprocess.Popen(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '1', '-ss', f'{ss:.3f}', '-i', f'sdr/IMG_{clip}.mov',
                          '-t', f'{dur+0.2:.3f}', '-vf', vf, '-f', 'rawvideo', '-'], stdout=subprocess.PIPE)
    n = W*H*3; last = None
    while True:
        b = p.stdout.read(n)
        if len(b) < n: break
        last = np.frombuffer(b, np.uint8).reshape(H, W, 3); yield last
    p.wait()
    while True: yield last          # se la clip finisce prima, si tiene l'ultimo fotogramma

# ---------- volti ----------
def volti(clip):
    f = f'volti_{clip}.txt'
    if not os.path.exists(f): return None
    righe = sorted([l.split() for l in open(f)], key=lambda r: r[0])
    cx, cy = [], []
    for r in righe:
        bx = [tuple(map(float, b.split(','))) for b in r[1:]]
        if bx:
            x, y, w, h = max(bx, key=lambda b: b[2]*b[3]); cx.append(2*(x+w/2)); cy.append(2*(y+h/2))
        else: cx.append(np.nan); cy.append(np.nan)
    cx, cy = np.array(cx), np.array(cy)
    i = np.arange(len(cx)); ok = ~np.isnan(cx)
    if ok.sum() < 2: return None
    cx, cy = np.interp(i, i[ok], cx[ok]), np.interp(i, i[ok], cy[ok])
    k = 9; lis = lambda a: np.convolve(np.pad(a, k//2, mode='edge'), np.ones(k)/k, 'valid')
    cx, cy = lis(cx), lis(cy)
    return lambda t: (float(np.interp(t*10, i, cx)), float(np.interp(t*10, i, cy)))

def chiavi(keys, t):
    if t <= keys[0][0]: return keys[0][1]
    for (t0, z0), (t1, z1) in zip(keys, keys[1:]):
        if t0 <= t <= t1:
            u = (t-t0)/(t1-t0) if t1 > t0 else 1
            u = ease_io(u) if t1-t0 < 0.35 else ease(u)
            return z0 + (z1-z0)*u
    return keys[-1][1]

def box(z, cx, cy, yout):
    cw, ch = W/z, H/z
    x0 = float(np.clip(cx - (W/2)/z, 0, W-cw)); y0 = float(np.clip(cy - yout/z, 0, H-ch))
    return (x0, y0, x0+cw, y0+ch)

def ritaglia(im, b):
    if b[2]-b[0] > W-0.5: return im
    return im.resize((W, H), Image.BICUBIC, box=b)

# ---------- grafiche ----------
_png = {}
def png(nome):
    if nome not in _png: _png[nome] = Image.open(f'{A}/{nome}.png').convert('RGBA')
    return _png[nome]

def sopra(base, lay, alpha=1.0, xy=(0, 0)):
    if alpha <= 0: return base
    if alpha < 1:
        lay = lay.copy(); lay.putalpha(lay.getchannel('A').point(lambda v: int(v*alpha)))
    base.alpha_composite(lay, xy); return base

def sottotitoli(im, subs, t):
    for nome, a, b in subs:
        if a - 0.001 <= t < b:
            al = min(1, (t-a)/0.1, (b-t)/0.08)
            sopra(im, png(f'sub_{nome}'), al)
    return im

VIGN = None
def vignetta(forza=0.28):
    global VIGN
    if VIGN is None:
        yy, xx = np.mgrid[0:H, 0:W]; r = np.sqrt(((xx-W/2)/(W/2))**2 + ((yy-H/2)/(H/2))**2)
        VIGN = np.clip(1 - forza*np.clip(r-0.55, 0, None)**1.5, 0, 1).astype(np.float32)
    return VIGN

rng = np.random.default_rng(7)
def bianco_nero(im):
    g = ImageEnhance.Contrast(ImageOps.grayscale(im)).enhance(1.22)
    a = np.asarray(g).astype(np.float32)*vignetta(0.45)
    a += rng.normal(0, 7, (H//2, W//2)).repeat(2, 0).repeat(2, 1)      # grana
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGBA')

# ---------- segmenti ----------
# ogni segmento: n fotogrammi, funzione che li genera (RGBA), transizione in entrata (tipo, K)

ALL = json.load(open('allineamento.json'))
def kar(clip, ss, dur, gialle=0):
    """I sottotitoli di una clip dal suo allineamento: le prime «gialle» parole sono di Emanuele."""
    ws = [(w, a, b, k < gialle) for k, (w, a, b) in enumerate(ALL[clip]) if ss - 0.05 <= a < ss + dur - 0.1]
    out = []
    for giallo in (True, False):
        p = [(w, a-ss, min(b, ss+dur)-ss) for w, a, b, g in ws if g == giallo]
        if p: out.append((karaoke.blocchi(p, dur), 'giallo' if giallo else 'avorio'))
    return out

def seg_parlato(clip, ss, dur, zkeys, subs=(), yout=760, bn=False, extra=None):
    f = volti(clip); n = round(dur*FPS)
    def gen():
        src = leggi(clip, ss, dur)
        for i in range(n):
            t = i/FPS; arr = next(src)
            cx, cy = f(ss+t) if f else (W/2, H/2)
            im = ritaglia(Image.fromarray(arr), box(chiavi(zkeys, t), cx, cy if f else H/2, yout if f else H/2)).convert('RGBA')
            if bn: im = bianco_nero(im.convert('RGB'))
            if extra: im = extra(im, t)
            for bl, colore in subs: karaoke.disegna(im, bl, t, colore)
            yield im
    return n, gen

def seg_muto(clip, ss, dur, z0=1.0, z1=1.12, dx=0.0, extra=None):
    """Una clip dei lavori: zoom lento (dentro o fuori) e un po' di deriva orizzontale."""
    n = round(dur*FPS)
    def gen():
        src = leggi(clip, ss, dur)
        for i in range(n):
            u = i/max(1, n-1); z = z0 + (z1-z0)*ease(u)
            cx = W/2 + dx*(u-0.5)*W*(1-1/z)
            im = ritaglia(Image.fromarray(next(src)), box(z, cx, H/2, H/2)).convert('RGBA')
            if extra: im = extra(im, i/FPS)
            yield im
    return n, gen

# ---------- il logo di Smallville in 3D ----------
LOGO = Image.open('smallville-logo.png').convert('RGBA')
LW = 700
LOGO = LOGO.resize((LW, round(LOGO.height*LW/LOGO.width)), Image.LANCZOS)
LH = LOGO.height
_a = LOGO.getchannel('A')
LOGO_BORDO = Image.merge('RGBA', (Image.new('L', LOGO.size, 110), Image.new('L', LOGO.size, 12), Image.new('L', LOGO.size, 18), _a))
LOGO_RETRO = Image.merge('RGBA', (Image.new('L', LOGO.size, 150), Image.new('L', LOGO.size, 20), Image.new('L', LOGO.size, 26), _a))
_pad = Image.new('L', (LW+400, LH+400), 0); _pad.paste(_a, (200, 200))
ALONE = _pad.filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(55))

def piano(img, cx, cy, s, th, dz=0.0, f=1600.0):
    """Proietta il logo ruotato di th attorno all'asse verticale, centrato in (cx, cy), scala s, spostato di dz in profondità."""
    w2, h2 = LW*s/2, LH*s/2
    pts = []
    for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
        x = sx*w2*math.cos(th) + dz*math.sin(th); z = sx*w2*math.sin(th) + dz*math.cos(th)
        k = f/(f+z); pts.append((cx + x*k, cy + sy*h2*k))
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    x0, y0 = int(min(xs))-2, int(min(ys))-2; x1, y1 = int(max(xs))+2, int(max(ys))+2
    if x1-x0 < 3: return None, (0, 0)
    dst = [(p[0]-x0, p[1]-y0) for p in pts]
    src = [(0, 0), (LW, 0), (LW, LH), (0, LH)]
    # coefficienti della trasformazione prospettica: da destinazione a sorgente
    M = []; B = []
    for (X, Y), (u, v) in zip(dst, src):
        M.append([X, Y, 1, 0, 0, 0, -u*X, -u*Y]); B.append(u)
        M.append([0, 0, 0, X, Y, 1, -v*X, -v*Y]); B.append(v)
    c = np.linalg.solve(np.array(M, float), np.array(B, float))
    out = img.transform((x1-x0, y1-y0), Image.PERSPECTIVE, tuple(c), Image.BICUBIC)
    return out, (x0, y0)

def logo3d(cx, cy, s, th, spessore=34):
    tela = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    fronte = math.cos(th) >= 0
    strati = range(10, -1, -1) if fronte else range(0, 11)
    for k in strati:
        dz = spessore*k/10 if fronte else -spessore*k/10
        if k == 0: img = LOGO if fronte else LOGO_RETRO
        else: img = LOGO_BORDO
        im, xy = piano(img if fronte or k else ImageOps.mirror(img), cx, cy, s, th, dz)
        if im is not None: incolla(tela, im, xy)
    return tela

def incolla(tela, im, xy):
    x, y = xy; cx0, cy0 = max(0, -x), max(0, -y)
    im = im.crop((cx0, cy0, min(im.width, W-x), min(im.height, H-y)))
    if im.width > 0 and im.height > 0: tela.alpha_composite(im, (max(0, x), max(0, y)))

SV_KAR = None
def seg_smallville(zfrom, face_from):
    """Rallentatore a metà velocità, fermo immagine sul dito puntato, logo che sale da dietro Mirko."""
    # da 14,50 («Smallville») a metà velocità fino a 14,95, dove Mirko punta l'indice: lì si ferma
    n = 140; SLOW = n - 14
    tutti = sorted(os.listdir('sv/in'))                      # a 60 fps da 14,40
    i0 = round((14.50-14.40)*60); i1 = round((14.95-14.40)*60)
    files = [tutti[min(i0 + k, i1)] for k in range(SLOW)]
    global SV_KAR
    SV_KAR = karaoke.blocchi([('stile', -0.34, -0.01), ('Smallville.', 0.0, 3.0)], 3.3, coda=0)
    T0, T1 = 0.35, 1.65                                      # il logo parte e atterra
    CYF, CXF = 520, 540
    def gen():
        mask_blur = ImageFilter.GaussianBlur(1.5)
        for i in range(n):
            t = i/FPS; fi = min(i, SLOW-1)
            fr = Image.open(f'sv/in/{files[fi]}').convert('RGB'); mk = Image.open(f'sv/mask/{files[fi]}').convert('L').filter(mask_blur)
            # dal primo piano si allarga, poi una spinta lenta
            z = zfrom + (1.0-zfrom)*ease_out(t/1.3) if t < 1.3 else 1.0 + 0.07*ease((t-1.3)/(n/FPS-1.3))
            u = min(1, t/1.3); cx = face_from[0]*(1-u) + W/2*u; cy = face_from[1]*(1-u) + H/2*u
            b = box(z, cx, cy, 760*(1-u) + H/2*u)
            fr = ritaglia(fr, b); mk = mk.resize((W, H), Image.BILINEAR, box=b) if z > 1.001 else mk
            base = fr.convert('RGBA')
            # il logo
            if t >= T0:
                v = (t-T0)/(T1-T0)
                if v < 1:
                    e = ease_out(v, 3); y = 1250 + (CYF-1250)*e; s = 0.45 + 0.55*e; th = (1-e)*math.pi*4
                else:
                    tt = t-T1; y = CYF + 7*math.sin(tt*2.2); s = 1.0 + 0.015*math.sin(tt*1.7); th = 0.18*math.sin(tt*1.4)
                # alone caldo dietro al logo
                al = min(1, max(0, (t-T0)/0.6))
                if t > T1: al = 1 + 0.35*math.exp(-(t-T1)/0.25)
                g = ALONE.resize((round((LW+400)*s*1.12), round((LH+400)*s*1.12)))
                glow = Image.new('RGBA', g.size, (255, 200, 120, 0)); glow.putalpha(g.point(lambda q: int(min(255, q*0.9*al))))
                incolla(base, glow, (int(CXF-g.width/2), int(y-g.height/2)))
                base.alpha_composite(logo3d(CXF, y, s, th))
            # anello di luce all'atterraggio
            if T1 <= t < T1+0.5:
                q = (t-T1)/0.5; r = 250 + 700*ease_out(q, 2)
                ring = Image.new('L', (W, H), 0); d = ImageDraw.Draw(ring)
                d.ellipse((CXF-r, CYF-r*0.62, CXF+r, CYF+r*0.62), outline=int(200*(1-q)), width=int(30*(1-q))+2)
                ring = ring.filter(ImageFilter.GaussianBlur(12))
                base.alpha_composite(Image.merge('RGBA', (Image.new('L', (W, H), 255), Image.new('L', (W, H), 235), Image.new('L', (W, H), 200), ring)))
            # Mirko davanti al logo
            base.paste(fr, (0, 0), mk)
            # tremolio all'impatto
            if T1 <= t < T1+0.25:
                a = 14*(1-(t-T1)/0.25); base = base.transform(base.size, Image.AFFINE, (1, 0, a*math.sin(t*90), 0, 1, a*math.cos(t*70)), Image.BICUBIC)
            # bande del cinema
            bh = int(118*ease_out(min(1, t/0.6)))
            if bh: d = ImageDraw.Draw(base); d.rectangle((0, 0, W, bh), fill=(0, 0, 0, 255)); d.rectangle((0, H-bh, W, H), fill=(0, 0, 0, 255))
            karaoke.disegna(base, SV_KAR, t, 'avorio')
            yield base
    return n, gen

def seg_finale(dur=3.6):
    n = round(dur*FPS)
    logos = sorted(os.listdir('logo'))
    def gen():
        src = leggi('5340', 1.2, dur)
        for i in range(n):
            t = i/FPS
            im = Image.fromarray(next(src)).resize((W//4, H//4)).filter(ImageFilter.GaussianBlur(6)).resize((W, H), Image.BICUBIC)
            im = ImageEnhance.Brightness(im).enhance(0.62 - 0.1*ease(t/1.0)).convert('RGBA')
            li = min(i, 42)
            lg = Image.open(f'logo/{logos[li]}').convert('RGBA'); im.alpha_composite(lg, (0, 330))
            if t > 0.55: sopra(im, png('finale'), ease((t-0.55)/0.4))
            if t > dur-0.45:
                im = Image.blend(im, Image.new('RGBA', (W, H), (0, 0, 0, 255)), ease((t-(dur-0.45))/0.45))
            yield im
    return n, gen

# ---------- transizioni: a, b fotogrammi RGBA, u da 0 a 1 ----------
def mosso(arr, k):
    k = int(k)
    if k < 3: return arr
    c = np.cumsum(np.pad(arr.astype(np.float32), ((0, 0), (k, k), (0, 0)), mode='edge'), axis=1)
    return ((c[:, 2*k:2*k+W] - c[:, :W]) / (2*k)).astype(np.uint8)

def tr_flash(a, b, u):
    base = np.asarray(a if u < 0.5 else b, np.float32)
    w = (1-abs(2*u-1))**1.3*0.92
    return Image.fromarray((base*(1-w) + 255*w).astype(np.uint8), 'RGBA')

def tr_whip(a, b, u):
    e = ease_io(u); off = int(e*W); k = 90*math.sin(math.pi*u)
    A, B = np.asarray(a), np.asarray(b)
    out = np.empty_like(A)
    out[:, :W-off] = A[:, off:]; out[:, W-off:] = B[:, :off]
    return Image.fromarray(mosso(out, k), 'RGBA')

def tr_zoom(a, b, u):
    e = ease_io(u)
    za = 1 + 0.6*e; zb = 1.4 - 0.4*e
    A = ritaglia(a, box(za, W/2, H/2, H/2)); B = ritaglia(b, box(zb, W/2, H/2, H/2))
    return Image.blend(A, B, ease(u*1.3-0.15))

def tr_dissolvi(a, b, u): return Image.blend(a, b, ease(u))

def tr_swipe(a, b, u, attesa=24/38):
    """a sta sopra e copre b; quando Mirko muove il braccio, a scivola via verso sinistra."""
    if u < attesa: return a
    v = (u-attesa)/(1-attesa); e = ease_io(v); off = int(e*W); k = 70*math.sin(math.pi*v)
    A, B = np.asarray(a), np.asarray(b)
    out = B.copy()
    if off < W:
        sl = mosso(A, k)[:, off:]
        out[:, :W-off] = sl
        # ombra sul bordo che scorre
        x = W-off
        for j, al in enumerate(np.linspace(0.45, 0, 40)):
            if x+j < W: out[:, x+j, :3] = (out[:, x+j, :3]*(1-al)).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

TR = {'flash': tr_flash, 'whip': tr_whip, 'zoom': tr_zoom, 'dissolvi': tr_dissolvi, 'swipe': tr_swipe}

# ---------- il reel ----------
def reel():
    S = []
    def add(nome, seg, tr=None, K=0, meta=None):
        S.append(dict(nome=nome, n=seg[0], gen=seg[1], tr=tr, K=K, meta=meta or {}))

    def titolo(im, t): return sopra(im, png('titolo'), ease((t-0.15)/0.45))
    add('apertura', seg_muto('5348', 0.6, 4*BEAT, 1.0, 1.14, extra=titolo))
    add('papera', seg_parlato('5351', 0.0, 6.0, [(0, 1.1), (2.4, 1.15), (3.1, 1.15), (3.3, 1.6), (6, 1.75)],
                              kar('5351', 0.0, 6.0, gialle=4), yout=800, bn=True), 'flash', 6)
    SS = 2.45; FINE = 14.50                      # la domanda comincia a 2,73; «Smallville» a 14,50
    zk = [(2.45, 1.06), (5.15, 1.1), (5.3, 1.0), (8.8, 1.08), (8.95, 1.25), (10.1, 1.28), (10.25, 1.12), (11.6, 1.16), (11.75, 1.38), (14.5, 1.45)]
    add('silos', seg_parlato('5353', SS, FINE-SS, [(a-SS, z) for a, z in zk], kar('5353', SS, FINE-SS, gialle=4)), 'flash', 6)
    fv = volti('5353'); face_end = fv(FINE)
    add('smallville', seg_smallville(1.45, face_end))
    add('scherzi', seg_parlato('5356', 0.0, 7.86, [(0, 1.0), (1.5, 1.0), (1.62, 1.14), (3.0, 1.18), (3.12, 1.3), (5.9, 1.3), (6.05, 1.4), (7.86, 1.45)],
                               kar('5356', 0.0, 7.86)), 'swipe', 38)
    add('silos-finito', seg_muto('5361', 0.3, 3*BEAT + 0.27, 1.28, 1.0), 'whip', 8)
    add('tre-giorni', seg_parlato('5357', 0.0, 4.25, [(0, 1.05), (3.35, 1.1), (3.5, 1.35), (4.25, 1.4)],
                                  kar('5357', 0.0, 4.25, gialle=9)), 'whip', 8)
    add('lascia-fare', seg_parlato('5358', 0.0, 2.3, [(0, 1.1), (2.3, 1.18)], kar('5358', 0.0, 2.3)))
    # i lavori in corso, a tempo
    lav = [('5337', 1.1, 2, 1.22, 1.0, 0), ('5339', 0.5, 2, 1.0, 1.16, 0), ('5340', 0.4, 2, 1.12, 1.12, 1),
           ('5342', 3.0, 2, 1.0, 1.15, 0), ('5343', 0.5, 1, 1.15, 1.0, 0), ('5344', 1.0, 1, 1.0, 1.14, 0),
           ('5341', 0.4, 1, 1.1, 1.22, 0), ('5362', 2.3, 2, 1.18, 1.0, -1), ('5336', 0.4, 1, 1.0, 1.15, 0),
           ('5359', 0.1, 1, 1.12, 1.0, 0), ('5348', 7.0, 1, 1.05, 1.2, 0), ('5338', 4.3, 2, 1.2, 1.0, 0)]
    trs = ['dissolvi', 'whip', 'zoom', 'whip', None, 'zoom', None, 'whip', None, 'zoom', None, 'whip']
    for j, ((c, ss, nb, z0, z1, dx), tr) in enumerate(zip(lav, trs)):
        K = {'whip': 8, 'zoom': 8, 'dissolvi': 3, None: 0}[tr]
        extra = None
        if j == 0:
            def extra(im, t):
                if t < 1.25:
                    s = 1 + 0.35*(1-ease_out(t/0.18, 2)); al = min(1, t/0.08, (1.25-t)/0.15)
                    lay = png('lavori')
                    if s > 1.001:
                        lay = lay.resize((round(W*s), round(H*s)), Image.BICUBIC).crop((round((W*s-W)/2), round((H*s-H)/2), round((W*s-W)/2)+W, round((H*s-H)/2)+H))
                    sopra(im, lay, al)
                return im
        # la durata compensa la sovrapposizione della transizione successiva, così i tagli cadono sul battito
        Kn = {'whip': 8, 'zoom': 8, 'dissolvi': 3, None: 0}[trs[j+1]] if j+1 < len(trs) else 8
        add(f'lavori-{c}', seg_muto(c, ss, nb*BEAT + Kn/FPS/2 + K/FPS/2, z0, z1, dx, extra), tr, K, {'montaggio': j})
    add('finale', seg_finale(), 'zoom', 8)
    return S

def main():
    S = reel()
    t0 = 0
    for i, s in enumerate(S):
        if i: t0 += S[i-1]['n'] - s['K']
        s['start'] = t0
    tot = S[-1]['start'] + S[-1]['n']
    json.dump([{k: s[k] for k in ('nome', 'n', 'start', 'K', 'tr', 'meta')} for s in S], open('timeline.json', 'w'), indent=1)
    print('fotogrammi', tot, 'secondi', round(tot/FPS, 2))
    for s in S: print(f"{s['nome']:14s} {s['start']/FPS:6.2f}  {s['n']/FPS:5.2f}  {s['tr']}")
    if '--solo-tempi' in sys.argv: return
    solo = None
    for a in sys.argv[1:]:
        if a.startswith('solo='): solo = set(a[5:].split(','))
    out = sys.argv[-1] if sys.argv[-1].endswith('.mp4') else 'reel_video.mp4'
    enc = subprocess.Popen(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-threads', '2', '-pix_fmt', 'yuv420p',
                            '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', out], stdin=subprocess.PIPE)
    coda = []
    for i, s in enumerate(S):
        if solo and s['nome'] not in solo and not any(s['nome'].startswith(x) for x in solo): continue
        Kout = S[i+1]['K'] if i+1 < len(S) and not solo else 0
        Kin = s['K'] if coda else 0
        nuova = []
        for j, fr in enumerate(s['gen']()):
            if j >= s['n']: break
            if j < Kin:
                fr = TR[s['tr']](coda[j], fr, (j+0.5)/Kin)
            elif j >= s['n'] - Kout:
                nuova.append(fr); continue
            enc.stdin.write(fr.convert('RGBA').tobytes())
        coda = nuova
        print('fatto', s['nome'], flush=True)
    enc.stdin.close(); enc.wait()

if __name__ == '__main__':
    main()

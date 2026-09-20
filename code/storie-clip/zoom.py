# Zoom che segue il volto su una clip parlata: punch-in e spinte lente, a colori.
# Uso: python3 zoom.py <cartella con in/ e volti.txt> '<keyframes json [[t, z], ...]>' <y_volto_in_uscita>
import os, sys, json, numpy as np
from PIL import Image
W, H, FPS = 1080, 1920, 30
D = sys.argv[1]; keys = json.loads(sys.argv[2]); Y_OUT = float(sys.argv[3]); X_OUT = W/2
righe = [l.split() for l in open(os.path.join(D, 'volti.txt'))]
righe.sort(key=lambda r: r[0])
cx, cy = [], []
for r in righe:
    boxes = [tuple(map(float, b.split(','))) for b in r[1:]]
    if boxes:
        x, y, w, h = max(boxes, key=lambda b: b[2]*b[3]); cx.append(x + w/2); cy.append(y + h/2)
    else:
        cx.append(np.nan); cy.append(np.nan)
def riempi(a):
    a = np.array(a, float); i = np.arange(len(a)); ok = ~np.isnan(a)
    return np.interp(i, i[ok], a[ok])
k = 9; liscia = lambda a: np.convolve(np.pad(a, k//2, mode='edge'), np.ones(k)/k, 'valid')
cx, cy = liscia(riempi(cx)), liscia(riempi(cy))
def zoom(t):
    for (t0, z0), (t1, z1) in zip(keys, keys[1:]):
        if t0 <= t <= t1:
            u = (t - t0)/(t1 - t0) if t1 > t0 else 1
            if t1 - t0 < 0.3: u = 4*u**3 if u < 0.5 else 1 - (-2*u + 2)**3/2   # scatto con easing
            return z0 + (z1 - z0)*u
    return keys[-1][1]
os.makedirs(os.path.join(D, 'out'), exist_ok=True)
n = len(cx)
for i in range(n):
    z = zoom(i/FPS); cw, ch = W/z, H/z
    x0 = float(np.clip(cx[i] - X_OUT/z, 0, W - cw)); y0 = float(np.clip(cy[i] - Y_OUT/z, 0, H - ch))
    im = Image.open(os.path.join(D, 'in', f'f_{i+1:03d}.png')).convert('RGB')
    im.resize((W, H), Image.LANCZOS, box=(x0, y0, x0 + cw, y0 + ch)).save(os.path.join(D, 'out', f'z_{i+1:03d}.png'))
print(n, 'fotogrammi, volto medio in uscita a y', round(float(np.mean([(cy[i] - float(np.clip(cy[i] - Y_OUT/zoom(i/FPS), 0, H - H/zoom(i/FPS))))*zoom(i/FPS) for i in range(n)])), 0))

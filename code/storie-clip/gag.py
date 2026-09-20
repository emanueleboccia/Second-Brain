import numpy as np, os, sys
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
D = sys.argv[1]; W, H = 1080, 1920
righe = [l.split() for l in open(os.path.join(D, 'volti.txt'))]
cx, cy = [], []
for r in righe:
    boxes = [tuple(map(float, b.split(','))) for b in r[1:]]
    x, y, w, h = max(boxes, key=lambda b: b[2]*b[3])          # il volto più grande è Mirko
    cx.append(x + w/2); cy.append(y + h/2)
k = 7; pad = lambda a: np.pad(np.array(a), k//2, mode='edge')
cx = np.convolve(pad(cx), np.ones(k)/k, 'valid'); cy = np.convolve(pad(cy), np.ones(k)/k, 'valid')
n = len(cx)
# vignettatura leggera
yy, xx = np.mgrid[0:H, 0:W]; r = np.sqrt(((xx-W/2)/(W/2))**2 + ((yy-H/2)/(H/2))**2)
vign = np.clip(1 - 0.28*np.clip(r-0.55, 0, None)**1.5, 0, 1)
os.makedirs(os.path.join(D, 'out'), exist_ok=True)
for i in range(n):
    t = i/(6.0)
    z = 1 + 0.7*(1-(1-min(t, 1))**3) + 0.1*max(0, (i-6)/(n-6))   # scatto veloce, poi spinta lenta
    cw, ch = W/z, H/z
    x0 = np.clip(cx[i] - cw/2, 0, W-cw); y0 = np.clip(cy[i] - ch*0.40, 0, H-ch)   # volto al 40% dall'alto
    im = Image.open(os.path.join(D, 'in', f'f_{i:03d}.png')).convert('RGB')
    im = im.resize((W, H), Image.LANCZOS, box=(x0, y0, x0+cw, y0+ch))
    g = ImageOps.grayscale(im); g = ImageEnhance.Contrast(g).enhance(1.18)
    a = np.asarray(g).astype(float)*vign
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGB').save(os.path.join(D, 'out', f'g_{i:03d}.png'))
print(n, 'fotogrammi')

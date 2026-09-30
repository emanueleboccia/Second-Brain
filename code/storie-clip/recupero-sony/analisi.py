# Per ogni clip: nitidezza (varianza del laplaciano) e movimento della camera (correlazione di fase),
# a 10 fotogrammi al secondo, su tutta la durata. Più l'esposizione dai fotogrammi del provino.
# Un ffmpeg alla volta, nice, un thread, pausa fra un file e l'altro.
import json, os, subprocess, time
import numpy as np
from PIL import Image
W0, H0, FPS = 540, 960, 10
inv = json.load(open('inventario.json'))
def frames(p):
    cmd = ['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '1', '-i', p, '-vf',
           f'fps={FPS},scale={W0}:{H0},format=gray', '-f', 'rawvideo', '-']
    d = subprocess.run(cmd, capture_output=True).stdout
    n = len(d) // (W0 * H0)
    return np.frombuffer(d, np.uint8)[:n * W0 * H0].reshape(n, H0, W0).astype(np.float32)
def lap_var(f):
    l = -4 * f[1:-1, 1:-1] + f[:-2, 1:-1] + f[2:, 1:-1] + f[1:-1, :-2] + f[1:-1, 2:]
    return float(l.var())
h, w = 384, 216
win = np.outer(np.hanning(h), np.hanning(w)).astype(np.float32)
def small(f):  # 540x960 -> 216x384 con media a blocchi approssimata
    im = Image.fromarray(f.astype(np.uint8)).resize((w, h), Image.BILINEAR)
    return np.asarray(im, np.float32)
def shift(a, b):
    A = np.fft.fft2((a - a.mean()) * win); B = np.fft.fft2((b - b.mean()) * win)
    R = A * np.conj(B); R /= np.abs(R) + 1e-9
    r = np.fft.ifft2(R).real
    y, x = np.unravel_index(np.argmax(r), r.shape)
    if y > h // 2: y -= h
    if x > w // 2: x -= w
    return float(np.hypot(x, y)) / 1.5   # riportato a pixel per 1/15 s, come movimento.py
res = {}
for k, v in inv.items():
    f = frames(os.path.join('/Volumes/SSD-MANU/00-SCARICO/sony', k))
    sh = [lap_var(x) for x in f]
    sm = [small(x) for x in f]
    mv = [shift(sm[i], sm[i + 1]) for i in range(len(sm) - 1)]
    # esposizione sul fotogramma centrale a 1080
    im = np.asarray(Image.open(v['mid']).convert('RGB'), np.float32)
    lum = 0.2126 * im[..., 0] + 0.7152 * im[..., 1] + 0.0722 * im[..., 2]
    clip = float((im.max(axis=2) >= 250).mean() * 100)
    res[k] = {'sharp': sh, 'move': mv, 'lum_media': float(lum.mean()), 'bruciato_pct': clip,
              'p99': float(np.percentile(lum, 99)), 'p1': float(np.percentile(lum, 1))}
    # riga: un carattere ogni mezzo secondo
    smax = max(sh) if sh else 1
    riga_n, riga_m = '', ''
    for i in range(0, len(sh), 5):
        s = np.median(sh[i:i + 5]) / smax
        riga_n += '#' if s > 0.7 else ('+' if s > 0.45 else ('-' if s > 0.25 else '_'))
        m = np.median(mv[i:i + 5]) if mv[i:i + 5] else 0
        riga_m += '.' if m < 1.5 else ('o' if m < 4 else 'X')
    print(f"{v['file'][:12]:12s} {len(f)/FPS:5.1f}s  lum {lum.mean():5.1f}  p99 {res[k]['p99']:5.1f}  bruciato {clip:4.1f}%")
    print(f"   fuoco  {riga_n}")
    print(f"   camera {riga_m}", flush=True)
    time.sleep(2)
json.dump(res, open('analisi.json', 'w'))

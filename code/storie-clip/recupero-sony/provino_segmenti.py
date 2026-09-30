# Un fotogramma a metà di ogni tratto scelto, corretto e ritagliato come uscirà, in fila per storia.
import json, os, subprocess, time
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from grade import apply, wb_da
SRC = "/Volumes/SSD-MANU/00-SCARICO/sony"
S = json.load(open('segmenti.json')); P = json.load(open('parametri.json'))
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
os.makedirs('seg', exist_ok=True)
def vignetta(a, forza=0.28):
    h, w = a.shape[:2]; yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 * 0.8 + ((yy - h / 2) / (h / 2)) ** 2)
    return a * (1 - forza * np.clip((r - 0.55) / 0.75, 0, 1) ** 1.6)[..., None]
def fotogramma(sg, t):
    out = f"seg/{os.path.basename(sg['clip'])[:8]}_{t:.2f}.png"
    if not os.path.exists(out):
        subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-ss', f'{t:.2f}', '-i', f"{SRC}/{sg['clip']}",
                        '-frames:v', '1', '-vf', 'scale=1080:1920:flags=lanczos,format=rgb24', '-y', out])
        time.sleep(0.5)
    return out
def lavora(sg, t):
    p = dict(P[sg['grade']])
    if 'wb_ref' in p: p['wb'] = wb_da(p['wb_ref'], p.get('wb_forza', 1.0))
    im = np.asarray(Image.open(fotogramma(sg, t)).convert('RGB'), np.float64) / 255
    out = apply(im, p)
    if sg['crop']:
        x, y, w = sg['crop']; h = int(round(w * 16 / 9))
        assert x >= 0 and y >= 0 and x + w <= 1080 and y + h <= 1920, f'ritaglio fuori quadro {sg}'
        out = out[y:y + h, x:x + w]
        out = vignetta(out)
    B = Image.fromarray((np.clip(out, 0, 1) * 255 + .5).astype(np.uint8)).resize((1080, 1920), Image.LANCZOS)
    return B.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
TW, TH = 270, 480
for storia, segs in S.items():
    o = Image.new('RGB', (len(segs) * (TW + 6) + 6, TH + 44), (20, 20, 20)); d = ImageDraw.Draw(o)
    for i, sg in enumerate(segs):
        t = (sg['da'] + sg['a']) / 2
        im = lavora(sg, t); im.save(f"seg/{storia}_{i}.png")
        o.paste(im.resize((TW, TH), Image.LANCZOS), (6 + i * (TW + 6), 6))
        d.text((10 + i * (TW + 6), TH + 12), f"{i+1} {os.path.basename(sg['clip'])[:5]} {sg['da']}-{sg['a']}", font=font, fill=(235, 235, 235))
    o.save(f"provino-{storia}.jpg", quality=86); print(storia, 'ok')

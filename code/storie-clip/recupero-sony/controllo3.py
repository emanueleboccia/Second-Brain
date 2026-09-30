# Primo, centrale e ultimo fotogramma di ogni taglio, corretti e ritagliati: si vede se il soggetto esce dal quadro.
import json, os, subprocess, time
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from grade import apply, wb_da
exec(open('provino_segmenti.py').read().split('TW, TH = 270, 480')[0].split("S = json.load")[0])
S = json.load(open('segmenti.json')); P = json.load(open('parametri.json'))
exec("def vignetta(a, forza=0.28):\n    h, w = a.shape[:2]; yy, xx = np.mgrid[0:h, 0:w]\n    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 * 0.8 + ((yy - h / 2) / (h / 2)) ** 2)\n    return a * (1 - forza * np.clip((r - 0.55) / 0.75, 0, 1) ** 1.6)[..., None]")
src = open('provino_segmenti.py').read()
exec(src[src.index('def fotogramma'):src.index('TW, TH')])
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
TW, TH = 180, 320
for storia, segs in S.items():
    o = Image.new('RGB', (3 * (TW + 4) * len(segs) + 14 * len(segs), TH + 36), (20, 20, 20)); d = ImageDraw.Draw(o)
    x = 6
    for i, sg in enumerate(segs):
        for t in (sg['da'] + 0.05, (sg['da'] + sg['a']) / 2, sg['a'] - 0.1):
            o.paste(lavora(sg, t).resize((TW, TH), Image.LANCZOS), (x, 4)); x += TW + 4
        d.text((x - 3 * (TW + 4) + 4, TH + 8), f"{i+1} {os.path.basename(sg['clip'])[:5]} {sg['da']}-{sg['a']}", font=font, fill=(235, 235, 235))
        x += 14
    o.save(f"controllo3-{storia}.jpg", quality=84); print(storia, o.size)

# Un fotogramma al secondo per clip, col fuoco (barra verde/gialla/rossa) e la camera (o, X) di quel secondo.
import json, os, subprocess, time, glob
import numpy as np
from PIL import Image, ImageDraw, ImageFont
SRC = "/Volumes/SSD-MANU/00-SCARICO/sony"
inv = json.load(open('inventario.json')); an = json.load(open('analisi.json'))
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 17)
os.makedirs('sec', exist_ok=True)
TW, TH, COL = 150, 267, 12
for k, v in inv.items():
    b = v['file'].rsplit('.', 1)[0][:10]
    if glob.glob(f'sec/{b}_*.jpg'):
        continue
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-i', f"{SRC}/{k}",
                    '-vf', f'fps=1,scale={TW}:{TH}', '-q:v', '4', '-y', f'sec/{b}_%03d.jpg'])
    time.sleep(1.5)
for storia in ['storia antipasto', 'storia carne', 'storia pasta']:
    righe = []
    for k, v in inv.items():
        if v['storia'] != storia: continue
        b = v['file'].rsplit('.', 1)[0][:10]
        fr = sorted(glob.glob(f'sec/{b}_*.jpg'))
        sh = np.array(an[k]['sharp']); mv = np.array(an[k]['move'] + [0]); smax = sh.max()
        celle = []
        for i, p in enumerate(fr):
            # fotogramma i = secondo i+0.5 circa (fps=1 prende il centro); fuoco e camera su quel secondo
            s = np.median(sh[i * 10:(i + 1) * 10]) / smax if len(sh[i * 10:(i + 1) * 10]) else 0
            m = np.median(mv[i * 10:(i + 1) * 10]) if len(mv[i * 10:(i + 1) * 10]) else 0
            celle.append((p, i, s, m))
        for j in range(0, len(celle), COL):
            righe.append((b, celle[j:j + COL]))
    W = COL * (TW + 4) + 120; H = len(righe) * (TH + 30) + 10
    o = Image.new('RGB', (W, H), (22, 22, 22)); d = ImageDraw.Draw(o)
    for r, (b, cc) in enumerate(righe):
        y = r * (TH + 30) + 6
        d.text((4, y + 4), b[:10], font=font, fill=(240, 240, 240))
        for c, (p, i, s, m) in enumerate(cc):
            x = 116 + c * (TW + 4)
            o.paste(Image.open(p), (x, y))
            col = (40, 200, 60) if s > 0.7 else ((230, 200, 40) if s > 0.45 else (220, 50, 40))
            d.rectangle([x, y + TH + 2, x + TW, y + TH + 10], fill=col)
            d.text((x + 2, y + TH + 10), f"{i}s {'X' if m >= 4 else ('o' if m >= 1.5 else '')}", font=font, fill=(230, 230, 230))
    o.save(f"strisce-{storia.split()[-1]}.jpg", quality=82)
    print(storia, len(righe), 'righe', o.size)

# I fogli del provino: una riga per clip, tre fotogrammi, col numero, il nome, la durata e se è HDR.
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

W = sys.argv[1]
inv = json.load(open(os.path.join(W, 'inventario.json')))
font = ImageFont.truetype(os.path.join(W, 'font', 'Poppins-Medium.ttf'), 15)
voci = sorted(inv.values(), key=lambda v: v['n'])
PER = 16                     # clip per foglio, su due colonne
CW, CH = 150, 150            # un fotogramma
colonna = 3 * CW + 12 + 150
for f0 in range(0, len(voci), PER):
    gruppo = voci[f0:f0 + PER]
    righe = (len(gruppo) + 1) // 2
    foglio = Image.new('RGB', (2 * colonna + 20, righe * (CH + 8) + 8), (24, 24, 24))
    d = ImageDraw.Draw(foglio)
    for i, v in enumerate(gruppo):
        x0 = (i % 2) * (colonna + 20) + 6
        y0 = (i // 2) * (CH + 8) + 6
        for k, p in enumerate(v.get('fot', [])):
            try:
                im = Image.open(p); im.thumbnail((CW, CH))
                foglio.paste(im, (x0 + k * (CW + 4) + (CW - im.width) // 2, y0 + (CH - im.height) // 2))
            except Exception:
                pass
        nome = os.path.basename(v['path'])
        hdr = 'HDR' if v.get('trc') in ('arib-std-b67', 'smpte2084') else ''
        testo = f"#{v['n']}\n{nome[:16]}\n{v.get('dur', '?')} s\n{v.get('w')}x{v.get('h')}\n{hdr}"
        d.multiline_text((x0 + 3 * (CW + 4) + 6, y0 + 4), testo, font=font, fill=(235, 235, 235), spacing=4)
    foglio.save(os.path.join(W, f'foglio-{f0 // PER + 1}.jpg'), quality=85)
    print('foglio', f0 // PER + 1, len(gruppo))

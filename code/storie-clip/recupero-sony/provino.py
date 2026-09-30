# Provino delle clip Sony delle storie: 4 fotogrammi piccoli per clip e il fotogramma centrale a 1080.
# Un ffmpeg alla volta, nice e due thread, pausa fra un file e l'altro.
import json, os, subprocess, sys, time
from PIL import Image, ImageDraw, ImageFont
SRC = "/Volumes/SSD-MANU/00-SCARICO/sony"
W = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f"{W}/fot", exist_ok=True)
storie = ["storia antipasto", "storia carne", "storia pasta"]
inv = {}
for s in storie:
    for f in sorted(os.listdir(f"{SRC}/{s}")):
        if f.startswith('._') or not f.lower().endswith(('.mov', '.mp4')):
            continue
        p = f"{SRC}/{s}/{f}"
        dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                   capture_output=True, text=True).stdout.strip())
        base = f.rsplit('.', 1)[0][:10]
        fot = []
        for k, frac in enumerate((0.1, 0.37, 0.63, 0.9)):
            j = f"{W}/fot/{base}_{k}.jpg"
            subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-ss', f"{dur*frac:.2f}", '-i', p,
                            '-frames:v', '1', '-vf', 'scale=-2:480', '-q:v', '3', '-y', j])
            fot.append(j)
        grande = f"{W}/fot/{base}_mid1080.jpg"
        subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-ss', f"{dur*0.5:.2f}", '-i', p,
                        '-frames:v', '1', '-vf', 'scale=-2:1920', '-q:v', '2', '-y', grande])
        inv[f"{s}/{f}"] = {'storia': s, 'file': f, 'dur': round(dur, 2), 'fot': fot, 'mid': grande}
        print(s, f, round(dur, 2), flush=True)
        time.sleep(1)
json.dump(inv, open(f"{W}/inventario.json", 'w'), indent=1)
# un foglio per storia
font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 18)
for s in storie:
    voci = [v for v in inv.values() if v['storia'] == s]
    CW, CH = 270, 480
    foglio = Image.new('RGB', (4 * (CW + 6) + 170, len(voci) * (CH + 10) + 10), (24, 24, 24))
    d = ImageDraw.Draw(foglio)
    for i, v in enumerate(voci):
        y0 = i * (CH + 10) + 10
        for k, p in enumerate(v['fot']):
            im = Image.open(p); im.thumbnail((CW, CH))
            foglio.paste(im, (6 + k * (CW + 6) + (CW - im.width) // 2, y0 + (CH - im.height) // 2))
        d.multiline_text((4 * (CW + 6) + 12, y0 + 10), f"{v['file'][:14]}\n{v['dur']} s", font=font, fill=(235, 235, 235), spacing=6)
    foglio.save(f"{W}/foglio-{s.split()[-1]}.jpg", quality=85)
    print('foglio', s, len(voci))

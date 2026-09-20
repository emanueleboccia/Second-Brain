import sys, os, glob, re
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
steps = dict(x.split(':') for x in sys.argv[3].split(','))
font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 18)
small = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 13)
rows = []
for n in steps:
    fs = sorted(glob.glob(os.path.join(src, f'{n}_*.png')))
    st = float(steps[n])
    row = Image.new('RGB', (70 + len(fs)*122, 230), (15, 15, 15))
    d = ImageDraw.Draw(row); d.text((4, 100), n, font=font, fill=(255, 210, 0))
    for i, p in enumerate(fs):
        row.paste(Image.open(p).convert('RGB'), (70 + i*122, 0))
        d.text((72 + i*122, 214), f'{i*st:.1f}s', font=small, fill=(220, 220, 220))
    rows.append(row)
W = max(r.width for r in rows); sheet = Image.new('RGB', (W, sum(r.height for r in rows)), (0, 0, 0)); y = 0
for r in rows: sheet.paste(r, (0, y)); y += r.height
sheet.save(out); print(sheet.size)

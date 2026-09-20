import sys, os, glob
from PIL import Image, ImageDraw, ImageFont
src, out, per_row = sys.argv[1], sys.argv[2], int(sys.argv[3])
names = sorted({os.path.basename(p).rsplit('_', 1)[0] for p in glob.glob(os.path.join(src, '*.png'))})
font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 22)
cells = []
for n in names:
    frames = [Image.open(os.path.join(src, f'{n}_{p}.png')).convert('RGB') for p in ('0.2', '0.5', '0.8')]
    w = sum(f.width for f in frames) + 4; h = frames[0].height
    cell = Image.new('RGB', (w, h + 30), (20, 20, 20)); x = 0
    for f in frames:
        cell.paste(f, (x, 30)); x += f.width + 2
    ImageDraw.Draw(cell).text((6, 3), n.replace('IMG_', ''), font=font, fill=(255, 210, 0))
    cells.append(cell)
cw = max(c.width for c in cells); ch = max(c.height for c in cells)
rows = (len(cells) + per_row - 1) // per_row
sheet = Image.new('RGB', (per_row * (cw + 6), rows * (ch + 6)), (0, 0, 0))
for i, c in enumerate(cells):
    sheet.paste(c, ((i % per_row) * (cw + 6), (i // per_row) * (ch + 6)))
sheet.save(out); print(sheet.size, len(cells))

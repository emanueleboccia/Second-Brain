"""Cuce i pezzi di una schermata lunga, uno sotto l'altro, in un JPEG, e cancella i pezzi: python3 cuci-pezzi.py <uscita.jpg> <pezzi…>"""
import os, sys
from PIL import Image
out, fs = sys.argv[1], sys.argv[2:]
ims = [Image.open(f).convert("RGB") for f in fs]
W = ims[0].size[0]; H = sum(i.size[1] for i in ims)
s = Image.new("RGB", (W, H)); y = 0
for i in ims: s.paste(i, (0, y)); y += i.size[1]
s.save(out, quality=88)
for f in fs: os.remove(f)
print(os.path.basename(out), W, H)

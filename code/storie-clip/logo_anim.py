import numpy as np, os, sys, math
from PIL import Image, ImageFilter
S = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(S, 'logo'); os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT): os.remove(os.path.join(OUT, f))
lg = Image.open(os.path.join(S, 'logo-zucche.png')).convert('RGBA')
bb = lg.getbbox(); lg = lg.crop(bb)
LW = 820; lg = lg.resize((LW, round(lg.height*LW/lg.width)), Image.LANCZOS)
M = 70; base = Image.new('RGBA', (lg.width+2*M, lg.height+2*M), (0, 0, 0, 0)); base.paste(lg, (M, M), lg)
a = base.getchannel('A').point(lambda v: 255 if v > 20 else 0).filter(ImageFilter.MaxFilter(35)).filter(ImageFilter.GaussianBlur(6))
halo = Image.new('RGBA', base.size, (255, 246, 232, 0)); halo.putalpha(a.point(lambda v: int(v*0.96)))
sh = a.filter(ImageFilter.GaussianBlur(18)).point(lambda v: int(v*0.32))
ombra = Image.new('RGBA', base.size, (0, 0, 0, 0)); o = Image.new('RGBA', base.size, (20, 12, 6, 0)); o.putalpha(sh); ombra.paste(o, (0, 8), o)
base = Image.alpha_composite(Image.alpha_composite(ombra, halo), base)
CW, CH, CX, CY = 1080, 1000, 540, 500
N = 52
def out_back(t, s=2.2): t -= 1; return t*t*((s+1)*t + s) + 1
for i in range(N):
    if i < 12:
        t = i/11; sc = 0.55 + 0.45*out_back(t); op = min(1, i/5); rot = -8*(1-t)**2
    elif i < N-9:
        u = (i-12)/(N-21); sc = 1 + 0.03*u; op = 1; rot = 0
    else:
        u = (i-(N-9))/8; sc = 1.03 - 0.18*u*u; op = 1 - u; rot = 0
    dy = 6*math.sin((i/30)*math.pi*1.6)
    im = base.resize((max(1, round(base.width*sc)), max(1, round(base.height*sc))), Image.LANCZOS).rotate(rot, resample=Image.BICUBIC, expand=True)
    if op < 1: im.putalpha(im.getchannel('A').point(lambda v: int(v*op)))
    c = Image.new('RGBA', (CW, CH), (0, 0, 0, 0)); c.paste(im, (round(CX - im.width/2), round(CY - im.height/2 + dy)), im)
    c.save(os.path.join(OUT, f'l_{i:03d}.png'))
print(N, 'fotogrammi', base.size)

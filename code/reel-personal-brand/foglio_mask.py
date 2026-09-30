# Trova il foglio a mano nel fotogramma (carta bianca e fredda, non il marmo beige né la pelle)
# e sfuma solo lì, così la scrittura non si legge e gli evidenziatori restano.
import numpy as np
from PIL import Image, ImageFilter

def maschera(im, y_min=0.42):
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    luce = (r + g + b) / 3
    croma = a.max(-1) - a.min(-1)
    carta = (luce > 150) & (croma < 28) & (b >= r - 12)          # bianco freddo
    carta[: int(a.shape[0] * y_min)] = False                         # il foglio sta sul banco, non in strada
    m = Image.fromarray((carta * 255).astype(np.uint8)).resize((270, 480), Image.BILINEAR)
    m = m.point(lambda v: 255 if v > 100 else 0)
    m = m.filter(ImageFilter.MinFilter(3))                          # via i puntini isolati
    m = m.filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.MinFilter(13))  # chiude i buchi della scrittura
    m = m.filter(ImageFilter.MaxFilter(5))
    m = m.resize(im.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(10))
    return m

def sfoca(im, raggio=7, y_min=0.42):
    m = maschera(im, y_min)
    s = im.filter(ImageFilter.GaussianBlur(raggio))
    return Image.composite(s, im, m), m

if __name__ == "__main__":
    import sys
    for p in sys.argv[1:]:
        im = Image.open(p).convert("RGB")
        w, h = im.size; k = 1920 / h
        im = im.resize((round(w * k), 1920), Image.LANCZOS)
        x0 = (im.width - 1080) // 2
        im = im.crop((x0, 0, x0 + 1080, 1920))
        out, m = sfoca(im)
        vis = Image.blend(im, Image.new("RGB", im.size, (255, 0, 0)), 0.0)
        vis.paste(Image.new("RGB", im.size, (255, 0, 0)), (0, 0), m.point(lambda v: v * 0.45))
        prova = Image.new("RGB", (1080 * 2, 1920))
        prova.paste(vis, (0, 0)); prova.paste(out, (1080, 0))
        prova.resize((1080, 960)).save(p.replace(".png", "-maschera.jpg"), quality=85)
        out.crop((250, 1050, 850, 1500)).save(p.replace(".png", "-sfocato100.png"))

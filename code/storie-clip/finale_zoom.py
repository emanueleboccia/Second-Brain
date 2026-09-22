# Il finale di zio Savino: zoom lento verso lui e l'impasto mentre dice la battuta,
# e la scritta che entra una parola alla volta, senza ombra, nei colori di Mamma Rosaria.
# Uso: python3 finale_zoom.py <cartella fotogrammi> <cartella uscita> [solo_t]
import math, os, sys
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
FONT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "font", "D-DIN-Bold.otf")
MARRONE, ARANCIO = (119, 79, 3), (240, 157, 40)
SS = 2  # le parole si disegnano al doppio e si riducono: bordi puliti anche mentre scalano

# lo zoom parte con la voce e arriva a 1,2 alla fine, centrato fra la faccia e l'impasto
Z0_T, Z1_T, Z_MAX, CX, CY = 0.35, 3.1, 1.20, 560, 880

def ease_in_out_sine(p): return -(math.cos(math.pi * p) - 1) / 2
def ease_out_back(p, c1): c3 = c1 + 1; return 1 + c3 * (p - 1) ** 3 + c1 * (p - 1) ** 2
def ease_out_cubic(p): return 1 - (1 - p) ** 3
def clamp(v, a, b): return max(a, min(b, v))

def zoom(img, t):
    p = clamp((t - Z0_T) / (Z1_T - Z0_T), 0, 1)
    z = 1 + (Z_MAX - 1) * ease_in_out_sine(p)
    w, h = W / z, H / z
    x0, y0 = clamp(CX - w / 2, 0, W - w), clamp(CY - h / 2, 0, H - h)
    return img.transform((W, H), Image.Transform.AFFINE, (1 / z, 0, x0, 0, 1 / z, y0),
                         resample=Image.Resampling.BICUBIC)

def unita(testo, size, colore):
    f = ImageFont.truetype(FONT, int(size * SS))
    l, t, r, b = f.getbbox(testo, anchor="ls")
    pad = 24 * SS
    im = Image.new("RGBA", (r - l + 2 * pad, b - t + 2 * pad), (0, 0, 0, 0))
    ImageDraw.Draw(im).text((pad - l, pad - t), testo, font=f, fill=colore + (255,), anchor="ls")
    return im, (l / SS, t / SS, r / SS, b / SS)

def impagina():
    prova = ImageFont.truetype(FONT, 100)
    s1 = 100 * 720 / prova.getlength("facitv e c***")
    f1 = ImageFont.truetype(FONT, int(s1))
    s2 = min(s1 * 1.3, 100 * 560 / prova.getlength("vuost!"))
    f2 = ImageFont.truetype(FONT, int(s2))
    cap1 = -f1.getbbox("H", anchor="ls")[1]
    cap2 = -f2.getbbox("H", anchor="ls")[1]
    gap = 0.30 * cap1
    y1 = 50 + cap1                      # in alto, sul cielo: sulla pasta e sulle casse bianche non si legge
    y2 = y1 + gap + cap2                # linea di base della seconda
    x1 = (W - f1.getlength("facitv e c***")) / 2
    x2 = (W - f2.getlength("vuost!")) / 2
    # (testo, grandezza, colore, origine sulla linea di base, entrata in s, rimbalzo, rotazione iniziale)
    voci = [("facitv e", s1, MARRONE, (x1, y1), 0.28, 1.9, -7),
            ("c***", s1, MARRONE, (x1 + f1.getlength("facitv e "), y1), 1.08, 2.2, 8),
            ("vuost!", s2, ARANCIO, (x2, y2), 1.88, 2.8, -9)]
    out = []
    for testo, size, col, (ox, oy), t0, c1, rot0 in voci:
        im, (l, t, r, b) = unita(testo, size, col)
        out.append(dict(im=im, cx=ox + (l + r) / 2, cy=oy + (t + b) / 2, t0=t0, c1=c1, rot0=rot0,
                        x0=ox + l, x1=ox + r, base=oy, alto=b - t, testo=testo))
    return out

def scritta(base, t, voci, dur=0.24, s0=0.3):
    for v in voci:
        if t < v["t0"]:
            continue
        p = clamp((t - v["t0"]) / dur, 0, 1)
        s = s0 + (1 - s0) * ease_out_back(p, v["c1"])
        ang = v["rot0"] * (1 - ease_out_cubic(p))
        dopo = t - v["t0"] - dur
        if dopo > 0:  # un piccolo dondolio che si spegne, per non farla sembrare incollata
            ang += 2.5 * math.sin(2 * math.pi * 5 * dopo) * math.exp(-dopo * 7)
        a = clamp((t - v["t0"]) / 0.06, 0, 1)
        fase = v["t0"] * 2.1
        entra = clamp((t - v["t0"] - dur) / 0.3, 0, 1)          # il galleggiare arriva dolce, non di scatto
        dy = entra * 4 * math.sin(2 * math.pi * 0.9 * t + fase)
        s *= 1 + entra * 0.012 * math.sin(2 * math.pi * 0.9 * t + fase + 1.1)
        v["dy"] = dy
        im = v["im"]
        im = im.resize((max(1, round(im.width * s / SS)), max(1, round(im.height * s / SS))),
                       Image.Resampling.LANCZOS)
        if abs(ang) > 0.05:
            im = im.rotate(ang, resample=Image.Resampling.BICUBIC, expand=True)
        if a < 1:
            im.putalpha(im.getchannel("A").point(lambda x: int(x * a)))
        base.alpha_composite(im, (round(v["cx"] - im.width / 2), round(v["cy"] + dy - im.height / 2)))
    return base

def firma(base, t, v, dur=0.4):
    """La linea a effetto firma sotto «vuost!»: entra quando la parola ha finito di rimbalzare."""
    t0 = v["t0"] + 0.26
    if t < t0:
        return base
    f = ease_out_cubic(clamp((t - t0) / dur, 0, 1))
    w, h, y = v["x1"] - v["x0"], v["alto"], v["base"] + v.get("dy", 0)
    P = [(v["x0"] - 0.05 * w, y + 0.20 * h), (v["x0"] + 0.30 * w, y + 0.36 * h),
         (v["x1"] - 0.15 * w, y + 0.26 * h), (v["x1"] + 0.14 * w, y + 0.02 * h)]
    n = 240
    spessore = 0.10 * h * SS
    lato = 4 * SS
    xs = [p[0] for p in P]; ys = [p[1] for p in P]
    X0, Y0 = min(xs) - 40, min(ys) - 40
    tela = Image.new("RGBA", (int((max(xs) - X0 + 40) * SS), int((max(ys) - Y0 + 40) * SS)), (0, 0, 0, 0))
    d = ImageDraw.Draw(tela)
    for i in range(int(n * f) + 1):
        u = i / n
        bx = (1-u)**3*P[0][0] + 3*(1-u)**2*u*P[1][0] + 3*(1-u)*u**2*P[2][0] + u**3*P[3][0]
        by = (1-u)**3*P[0][1] + 3*(1-u)**2*u*P[1][1] + 3*(1-u)*u**2*P[2][1] + u**3*P[3][1]
        r = max(lato / 2, spessore / 2 * math.sin(math.pi * u) ** 0.55)
        cx, cy = (bx - X0) * SS, (by - Y0) * SS
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ARANCIO + (255,))
    tela = tela.resize((tela.width // SS, tela.height // SS), Image.Resampling.LANCZOS)
    base.alpha_composite(tela, (round(X0), round(Y0)))
    return base

if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    solo = float(sys.argv[3]) if len(sys.argv) > 3 else None
    voci = impagina()
    files = sorted(f for f in os.listdir(src) if f.endswith(".png"))
    for i, f in enumerate(files):
        t = i / FPS
        if solo is not None and abs(t - solo) > 0.5 / FPS:
            continue
        img = zoom(Image.open(os.path.join(src, f)).convert("RGB"), t).convert("RGBA")
        img = scritta(img, t, voci)
        firma(img, t, voci[2]).convert("RGB").save(os.path.join(dst, f))
    print("fatto", len(files) if solo is None else 1)

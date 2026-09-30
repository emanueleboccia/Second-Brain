"""Prepara gli spezzoni del reel del Girarrosto per il personal brand (29/09/2026).

Il girato sono le clip coi Ray-Ban e con l'iPhone di `04-PERSONAL-BRAND/1-girato/girarrosto-liberti`
sull'SSD, descritte in `projects/personal-brand/girato-girarrosto.md`. L'audio non si usa: Emanuele
l'ha bocciato il 29/09 («prendili come prova»), e sopra andrà la sua voce fuori campo.

Ogni spezzone esce muto, verticale 1080×1920 a 30 fps, col colore pulito e basta (una curva morbida
e +5% di saturazione, niente virate: la prova non si trucca), e con quello che non si deve leggere
già sfumato:
- la scrittura a mano sul foglio degli ordini: si trova la carta bianca e fredda, non il marmo beige
  né la pelle, e si sfoca solo lì, così gli evidenziatori restano;
- i nomi dei clienti sull'iPad: due bande che seguono l'inquadratura, misurata fotogramma per
  fotogramma con la correlazione di fase (`pb-girarrosto-ipad-traccia.json`).

Scrive `public/pb-girarrosto/seg/<id>.mp4` (fuori da git) e `src/pb-girarrosto/spezzoni.json`.
Con degli id come argomenti si rifanno solo quelli. Un ffmpeg alla volta, a bassa priorità.
"""
import json, subprocess, sys, time
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

GIRATO = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/girarrosto-liberti")
OUT = Path("public/pb-girarrosto/seg")
JSON = Path("src/pb-girarrosto/spezzoni.json")
TRACCIA = json.load(open("scripts/pb-girarrosto-ipad-traccia.json"))
FPS, W, H = 30, 1080, 1920
GRADE = "curves=master='0/0 0.18/0.165 0.5/0.5 0.82/0.835 1/1',eq=saturation=1.05,unsharp=5:5:0.3:5:5:0"
SOLO = set(sys.argv[1:])

# id, file, da, a (secondi nella clip), dove tagliare in orizzontale (0 sinistra, 1 destra),
# e cosa sfumare. «lento»: la clip è a 60 fps e si usano tutti i fotogrammi, quindi va a metà
# velocità e dura il doppio.
SPEZZONI = [
    ("foglio", "video-3907_singular_display.mov", 52.0, 57.6, 0.5, {"foglio": 0.42}),
    # fino a 5,3 dal 30/09 sera: col copione nuovo la scena del telefono dura 5,06 secondi, e i due spezzoni ne facevano 4,8
    ("telefono-a", "video-3944_singular_display.mov", 1.6, 5.3, 0.5, {"foglio": 0.35}),
    ("telefono-b", "video-3944_singular_display.mov", 7.0, 8.4, 0.5, {"foglio": 0.35}),
    ("arrivo", "video-3907_singular_display.mov", 2.8, 7.4, 0.5, {}),
    ("ipad", "IMG_4889.MOV", 9.2, 11.9, 0.5, {"ipad": True}),
    ("servizio", "IMG_4575.MOV", 0.2, 3.7, 0.5, {"lento": True}),
]


def dims(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                        "-of", "csv=p=0", str(f)], capture_output=True, text=True)
    w, h = map(int, r.stdout.strip().split(",")[:2])
    return w, h


def fotogrammi(f, a, b, cx, lento):
    w, h = dims(f)
    ws = int(round(w * H / h / 2) * 2)
    x = int(round((ws - W) * cx))
    passo = "" if lento else f"fps={FPS},"
    vf = f"{passo}scale={ws}:{H}:flags=lanczos,crop={W}:{H}:{x}:0,{GRADE},format=rgb24"
    p = subprocess.Popen(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-threads", "2", "-ss", f"{a:.3f}",
                          "-t", f"{b - a:.3f}", "-i", str(f), "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         stdout=subprocess.PIPE)
    while True:
        buf = p.stdout.read(W * H * 3)
        if len(buf) < W * H * 3:
            break
        yield np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    p.wait()


def sfoca_foglio(im, y_min):
    a = np.asarray(im).astype(np.int16)
    luce = a.sum(-1) / 3
    croma = a.max(-1) - a.min(-1)
    carta = (luce > 150) & (croma < 28) & (a[..., 2] >= a[..., 0] - 12)
    carta[: int(a.shape[0] * y_min)] = False
    m = Image.fromarray((carta * 255).astype(np.uint8)).resize((270, 480), Image.BILINEAR)
    m = m.point(lambda v: 255 if v > 100 else 0)
    m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.MinFilter(13))
    m = m.filter(ImageFilter.MaxFilter(5)).resize(im.size, Image.BILINEAR).filter(ImageFilter.GaussianBlur(10))
    return Image.composite(im.filter(ImageFilter.GaussianBlur(7)), im, m)


def sfoca_ipad(im, t):
    cum = TRACCIA["cum"]
    k = min(len(cum) - 1, max(0, round((t - TRACCIA["t0"]) * FPS)))
    k0 = round((9.3 - TRACCIA["t0"]) * FPS)
    dy = cum[k][0] - cum[k0][0]; dx = cum[k][1] - cum[k0][1]
    s = max(0.0, 14 * (t - 9.3))
    su, giu = 1017 + dy - s / 2, 1291 + dy + s / 2
    m = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(m)
    for c in (su, giu):
        d.rectangle([50 + dx, c - 36, 790 + dx, c + 36], fill=255)
    m = m.filter(ImageFilter.GaussianBlur(7))
    return Image.composite(im.filter(ImageFilter.GaussianBlur(13)), im, m)


def codifica(dest):
    return subprocess.Popen(["nice", "-n", "10", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "rawvideo",
                             "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                             "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
                             "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-threads", "2",
                             "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1",
                             "-movflags", "+faststart", str(dest)], stdin=subprocess.PIPE)


OUT.mkdir(parents=True, exist_ok=True)
esistenti = json.load(open(JSON)) if JSON.exists() else {}
for sid, file, a, b, cx, cosa in SPEZZONI:
    if SOLO and sid not in SOLO:
        continue
    enc = codifica(OUT / f"{sid}.mp4")
    n = 0
    lento = cosa.get("lento", False)
    for fr in fotogrammi(GIRATO / file, a, b, cx, lento):
        im = Image.fromarray(fr)
        t = a + n / (60 if lento else FPS)
        if "foglio" in cosa:
            im = sfoca_foglio(im, cosa["foglio"])
        if cosa.get("ipad") and t < 10.717:  # a 10,717 s l'iPad passa ai totali, dove i nomi non ci sono
            im = sfoca_ipad(im, t)
        enc.stdin.write(im.tobytes())
        n += 1
    enc.stdin.close(); enc.wait()
    esistenti[sid] = {"file": file, "da": a, "a": b, "fotogrammi": n, "secondi": round(n / FPS, 3)}
    print(f"{sid}: {n} fotogrammi, {n / FPS:.2f}s", flush=True)
    time.sleep(1)
JSON.parent.mkdir(parents=True, exist_ok=True)
json.dump(esistenti, open(JSON, "w"), indent=1)

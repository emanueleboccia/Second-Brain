# Monta il reel dalla ricetta: il video fotogramma per fotogramma, l'audio a parte, poi insieme.
#   python3 monta.py            → grafiche, video, audio e reel finale in out/
#   python3 monta.py --grafiche → solo le scritte
# Un processo pesante alla volta, a bassa priorità: il Mac di Emanuele deve restare usabile.
import json, os, subprocess, sys, time
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

QUI = os.path.dirname(os.path.abspath(__file__))
SRC = "/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/girarrosto-liberti"
OUT = os.path.join(QUI, "out")
FPS, W, H = 30, 1080, 1920
sys.path.insert(0, QUI)
from foglio_mask import sfoca as sfoca_foglio

R = json.load(open(os.path.join(QUI, "ricetta.json")))
G = os.path.join(QUI, "grafiche")
os.makedirs(OUT, exist_ok=True)

# ---------- le scritte ----------
def grafiche():
    spec = []
    for k, s in R["sezioni"].items():
        spec.append({"id": "cornice-" + k, "tipo": "cornice", "testo": s["testo"], "colore": s["colore"]})
    spec.append({"id": "gancio", "tipo": "gancio", "testo": R["gancio"]["testo"]})
    for seg in R["segmenti"]:
        for sid, a, b, testo in seg["sub"]:
            spec.append({"id": sid, "tipo": "sub", "testo": testo})
    f = R["finale"]
    spec.append({"id": "finale", "tipo": "finale", "etichetta": f["etichetta"], "frase": f["frase"], "punta": f["punta"], "mono": f["mono"]})
    json.dump(spec, open(os.path.join(QUI, "grafiche.json"), "w"), ensure_ascii=False, indent=1)
    subprocess.run(["node", os.path.join(QUI, "grafiche.mjs"), os.path.join(QUI, "grafiche.json")], check=True)

if "--grafiche" in sys.argv:
    grafiche(); sys.exit()

# ---------- il video ----------
GRADE = "curves=master='0/0 0.18/0.165 0.5/0.5 0.82/0.835 1/1',eq=saturation=1.05,unsharp=5:5:0.3:5:5:0"

def dims(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                        "-of", "csv=p=0", f], capture_output=True, text=True)
    w, h = map(int, r.stdout.strip().split(",")[:2])
    return w, h

def fotogrammi(f, a, n, cx):
    """n fotogrammi 1080×1920 da f a partire da a secondi: verticale, colore pulito."""
    w, h = dims(f)
    ws = int(round(w * H / h / 2) * 2)
    x = int(round((ws - W) * cx))
    vf = f"fps={FPS},scale={ws}:{H}:flags=lanczos,crop={W}:{H}:{x}:0,{GRADE},format=rgb24"
    p = subprocess.Popen(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-threads", "2", "-ss", f"{a:.3f}",
                          "-t", f"{n / FPS + 0.5:.3f}", "-i", f, "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         stdout=subprocess.PIPE)
    ultimo = None
    for _ in range(n):
        b = p.stdout.read(W * H * 3)
        if len(b) == W * H * 3:
            ultimo = np.frombuffer(b, np.uint8).reshape(H, W, 3)
        yield ultimo
    p.stdout.close(); p.kill(); p.wait()

TRACCIA = json.load(open(os.path.join(QUI, "ipad_traccia.json")))

def bande_ipad(t):
    """Le due righe coi nomi, misurate a mano a 9,3 s e poi fatte seguire all'inquadratura
    col movimento misurato fotogramma per fotogramma (traccia_ipad.py). L'avvicinamento allarga
    un poco la distanza fra le due righe: circa 14 px al secondo."""
    cum = TRACCIA["cum"]
    k = min(len(cum) - 1, max(0, round((t - TRACCIA["t0"]) * FPS)))
    k0 = round((9.3 - TRACCIA["t0"]) * FPS)
    dy = cum[k][0] - cum[k0][0]; dx = cum[k][1] - cum[k0][1]
    s = max(0.0, 14 * (t - 9.3))
    su = 1017 + dy - s / 2; giu = 1291 + dy + s / 2
    x0 = 50 + dx; x1 = 790 + dx
    return [[x0, x1, su - 36, su + 36], [x0, x1, giu - 36, giu + 36]]

def sfoca_ipad(im, t):
    m = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(m)
    for x0, x1, y0, y1 in bande_ipad(t):
        d.rectangle([x0, y0, x1, y1], fill=255)
    m = m.filter(ImageFilter.GaussianBlur(7))
    return Image.composite(im.filter(ImageFilter.GaussianBlur(13)), im, m)

def con_alpha(ov, k):
    if k >= 1: return ov
    o = ov.copy(); a = o.getchannel("A").point(lambda v: int(v * k)); o.putalpha(a); return o

def video():
    cornici = {k: Image.open(os.path.join(G, f"cornice-{k}.png")).convert("RGBA") for k in R["sezioni"]}
    gancio = Image.open(os.path.join(G, "gancio.png")).convert("RGBA")
    subs = {}
    enc = subprocess.Popen(["nice", "-n", "10", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
                            "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
                            "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
                            "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-threads", "3",
                            "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
                            os.path.join(OUT, "video.mp4")], stdin=subprocess.PIPE)
    g = 0  # fotogrammi già scritti
    tempi = []
    for seg in R["segmenti"]:
        f = os.path.join(SRC, R["sorgenti"][seg["clip"]])
        a0, a1 = seg["audio"]
        n = round((a1 - a0) * FPS)
        parti = seg.get("video", [[a0, a1]])
        # quanti fotogrammi per parte: l'ultima prende il resto, così video e audio finiscono insieme
        conti = [round((b - a) * FPS) for a, b in parti]
        conti[-1] = n - sum(conti[:-1])
        tempi.append((seg["id"], g / FPS, n))
        k = 0
        for (va, vb), nv in zip(parti, conti):
            for j, fr in enumerate(fotogrammi(f, va, nv, seg.get("cx", 0.5))):
                t_seg = k / FPS; t_src = va + j / FPS; t_g = g / FPS
                im = Image.fromarray(fr)
                if seg.get("foglio"):
                    im, _ = sfoca_foglio(im, y_min=seg.get("foglio_y", 0.42))
                if seg.get("ipad") and t_src < R["ipad"]["fino_a"]:
                    im = sfoca_ipad(im, t_src)
                if seg.get("sfuma_fine") and k >= n - 8:
                    im = Image.eval(im, lambda v, q=(n - k) / 9: int(v * q))
                im = im.convert("RGBA")
                im.alpha_composite(cornici[seg["sezione"]])
                if t_g < R["gancio"]["fino_a"]:
                    im.alpha_composite(con_alpha(gancio, min(1, (R["gancio"]["fino_a"] - t_g) / 0.2)))
                for sid, s0, s1, _ in seg["sub"]:
                    if s0 - a0 <= t_seg < s1 - a0:
                        if sid not in subs:
                            subs[sid] = Image.open(os.path.join(G, sid + ".png")).convert("RGBA")
                        im.alpha_composite(subs[sid])
                enc.stdin.write(im.convert("RGB").tobytes())
                k += 1; g += 1
        print(f"  {seg['id']}: {n} fotogrammi, finisce a {g / FPS:.2f}s", flush=True)
        time.sleep(0.5)
    # il cartello finale, che entra dal nero
    fin = Image.open(os.path.join(G, "finale.png")).convert("RGB")
    nf = round(R["finale"]["durata"] * FPS)
    tempi.append(("finale", g / FPS, nf))
    for k in range(nf):
        q = min(1, (k + 1) / 10)
        enc.stdin.write((fin if q >= 1 else Image.eval(fin, lambda v, q=q: int(v * q))).tobytes())
        g += 1
    enc.stdin.close(); enc.wait()
    json.dump(tempi, open(os.path.join(OUT, "tempi.json"), "w"))
    print(f"video: {g} fotogrammi, {g / FPS:.2f}s")
    return tempi

# ---------- l'audio ----------
def audio():
    files = sorted({R["sorgenti"][s["clip"]] for s in R["segmenti"]})
    idx = {f: i for i, f in enumerate(files)}
    cmd = ["nice", "-n", "10", "ffmpeg", "-nostdin", "-v", "error", "-y", "-threads", "2"]
    for f in files:
        cmd += ["-i", os.path.join(SRC, f)]
    parti = []; etichette = []
    for i, seg in enumerate(R["segmenti"]):
        a0, a1 = seg["audio"]
        n = round((a1 - a0) * FPS); d = n / FPS
        cat = f"[{idx[R['sorgenti'][seg['clip']]]}:a]atrim=start={a0:.3f}:end={a0 + d:.3f},asetpts=PTS-STARTPTS," \
              f"aformat=sample_rates=48000:channel_layouts=mono"
        if seg.get("ambiente"):
            cat += ",volume=0.5"
        cat += f",afade=t=in:d=0.012,afade=t=out:st={d - 0.02:.3f}:d=0.02"
        if seg.get("sfuma_fine"):
            cat += f",afade=t=out:st={max(0, d - 0.35):.3f}:d=0.35"
        parti.append(cat + f"[a{i}]"); etichette.append(f"[a{i}]")
    parti.append(f"anullsrc=r=48000:cl=mono,atrim=duration={round(R['finale']['durata'] * FPS) / FPS:.3f}[af]")
    etichette.append("[af]")
    fc = ";".join(parti) + ";" + "".join(etichette) + f"concat=n={len(etichette)}:v=0:a=1[c];" \
         "[c]highpass=f=90,afftdn=nr=8:nf=-38,dynaudnorm=f=200:g=15:p=0.9:m=6,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=1.6,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[o]"
    subprocess.run(cmd + ["-filter_complex", fc, "-map", "[o]", "-c:a", "pcm_s16le", os.path.join(OUT, "audio.wav")], check=True)
    print("audio fatto")

def insieme(nome):
    subprocess.run(["nice", "-n", "10", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", os.path.join(OUT, "video.mp4"),
                    "-i", os.path.join(OUT, "audio.wav"), "-c:v", "copy", "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
                    "-shortest", "-movflags", "+faststart", os.path.join(OUT, nome)], check=True)
    print("reel:", os.path.join(OUT, nome))

if __name__ == "__main__":
    t = time.time()
    grafiche()
    video()
    time.sleep(2)
    audio()
    insieme("reel-girarrosto-v1.mp4")
    print(f"in {time.time() - t:.0f}s")

"""Prepara gli spezzoni del reel di Room84 per il personal brand (29/09/2026).

Il girato è in `04-PERSONAL-BRAND/1-girato/room84` sull'SSD, descritto in
`projects/personal-brand/girato-room84.md`: Emanuele disegna a mano il sito nuovo, con l'iPhone
sopra il tavolo e i Ray-Ban addosso.

Due tipi di spezzone, tutti muti e a 30 fps: la voce sta a parte, in `public/pb-room84/voce.wav`.
- «foglio»: il foglio ripreso dall'alto. Le clip dell'iPhone sono 4K in HDR, e il disegno è piccolo
  e a penna sottile: si legge solo ritagliato dal 4K. Si tagliano i secondi che servono in 4K SDR
  col motore di Apple (`avconvert`, cache in `cache/pb-room84/`), poi si ritaglia il foglio, lo si
  gira di 90° in senso orario più l'angolo della clip, perché la pagina si legga dall'alto in basso,
  e si esce alla misura della scheda che lo porta sul fondale.
- «pov»: una clip a pieno verticale dalla copia SDR in `sdr/`: la soggettiva dei Ray-Ban, la scrivania,
  il fisso ripreso la sera. «zoom» stringe l'inquadratura attorno a «cx» e «cy» (frazioni della clip);
  «lento» usa tutti i fotogrammi di una clip a 60 fps, cioè va a metà velocità.
- «foto»: un fotogramma fermo del foglio dall'alto, girato come gli spezzoni «foglio»: il disegno finito
  per il passaggio dal foglio al sito.

Il colore è pulito e basta, come nel reel del Girarrosto, con la curva un poco più scura nei mezzi
toni perché il tratto della penna esca. Scrive `public/pb-room84/seg/<id>.mp4` (fuori da git) e
`src/pb-room84/spezzoni.json`. Con degli id come argomenti si rifanno solo quelli. Un processo alla
volta, a bassa priorità, con una pausa fra uno e l'altro.
"""
import json, subprocess, sys, time
from pathlib import Path

GIRATO = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/room84")
CACHE = Path("cache/pb-room84")
OUT = Path("public/pb-room84/seg")
JSON = Path("src/pb-room84/spezzoni.json")
FPS, W, H = 30, 1080, 1920
GRADE = "curves=master='0/0 0.25/0.2 0.55/0.45 0.85/0.87 1/1',eq=saturation=1.04,unsharp=5:5:0.3:5:5:0"
COLORE = "h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1"
SOLO = set(sys.argv[1:])

# id, tipo, clip, da, a (secondi nella clip), parametri.
# «taglio»: x, y, larghezza, altezza nel 4K verticale (2160×3840), prima di girarlo.
# «ruota»: gradi in senso orario dopo i 90°. «esce»: la misura dello spezzone.
FISSO = {"zoom": 1.25, "cx": 0.475, "cy": 0.49}  # il monitor del fisso, nella ripresa della sera
SPEZZONI = [
    ("imac-prima-a", "pov", "IMG_5662.mov", 3.7, 6.7, FISSO),
    ("imac-dopo-lampo", "pov", "IMG_5662.mov", 45.4, 47.0, FISSO),
    ("imac-prima-b", "pov", "IMG_5662.mov", 14.6, 16.9, FISSO),
    ("imac-prima-c", "pov", "IMG_5662.mov", 21.0, 23.0, FISSO),
    ("scrivania", "pov", "IMG_5649.mov", 1.0, 3.6, {}),
    ("rb-inizio", "pov", "rayban-4230.mov", 16.5, 19.5, {"cx": 0.6}),
    ("camere", "foglio", "IMG_5651.MOV", 226.0, 233.2, {"taglio": (0, 2100, 1300, 1000), "ruota": 4.0, "esce": (900, 1200)}),
    ("recensioni", "foglio", "IMG_5652.MOV", 81.0, 89.0, {"taglio": (0, 2250, 1300, 1000), "ruota": 4.0, "esce": (900, 1200)}),
    ("penna", "pov", "rayban-4230.mov", 99.3, 103.6, {"cx": 0.85}),
    ("mani", "pov", "rayban-4230.mov", 91.0, 96.0, {"cx": 0.5}),
    ("schizzo", "foto", "IMG_5652.MOV", 131.0, 131.0, {"taglio": (40, 2330, 1180, 640), "ruota": 4.0}),
    ("imac-dopo", "pov", "IMG_5662.mov", 78.8, 83.0, FISSO),
    ("imac-finale", "pov", "IMG_5662.mov", 83.0, 84.7, {**FISSO, "lento": True}),
    # Al posto dei Ray-Ban, che nella versione semplice Emanuele non vuole («quelli con i Ray-Ban non mi piacciono
    # tanto in questa situazione»): l'iPhone dall'alto, in verticale com'è, stretto sul foglio e preso dal 4K.
    ("scrive", "dall-alto", "IMG_5651.MOV", 226.0, 227.6, {"zoom": 1.3, "cx": 0.30, "cy": 0.62}),
    ("finito", "dall-alto", "IMG_5652.MOV", 129.7, 131.1, {"zoom": 1.3, "cx": 0.30, "cy": 0.66}),
]


def esegui(cmd):
    subprocess.run(["nice", "-n", "15", *cmd], check=True)


def taglio_4k(clip, da, a):
    """I secondi da..a della clip HDR in 4K SDR, con mezzo secondo di margine per parte. Se in cache c'è già
    un taglio della stessa clip che li contiene, si usa quello: `<clip>_<inizio>_<durata>.mov`."""
    for g in CACHE.glob(f"{Path(clip).stem}_*_*.mov"):
        try:
            i0, d0 = map(float, g.stem.split("_")[-2:])
        except ValueError:
            continue
        if i0 <= da and a <= i0 + d0 - 0.05:
            return g, da - i0
    inizio = max(0.0, da - 0.5)
    durata = (a - da) + 1.0
    f = CACHE / f"{Path(clip).stem}_{inizio:.2f}_{durata:.2f}.mov"
    if not f.exists():
        esegui(["avconvert", "-s", str(GIRATO / clip), "-p", "Preset3840x2160", "-o", str(f),
                "--start", f"{inizio:.3f}", "--duration", f"{durata:.3f}", "--replace"])
    return f, da - inizio


def prepara(id_, tipo, clip, da, a, p):
    out = OUT / f"{id_}.mp4"
    if tipo == "foglio":
        src, ss = taglio_4k(clip, da, a)
        x, y, w, h = p["taglio"]
        ew, eh = p["esce"]
        vf = (f"crop={w}:{h}:{x}:{y},transpose=1,rotate={p['ruota']}*PI/180:ow=iw:oh=ih:c=black,"
              f"crop={ew}:{eh}:(iw-{ew})/2:(ih-{eh})/2,{GRADE},fps={FPS},format=yuv420p")
    elif tipo == "dall-alto":
        # il 4K verticale, stretto di «zoom» attorno a «cx» e «cy», a piena altezza del reel
        src, ss = taglio_4k(clip, da, a)
        z = p.get("zoom", 1.0)
        cw, ch = round(2160 / z / 2) * 2, round(3840 / z / 2) * 2
        x = min(max(round(p.get("cx", 0.5) * 2160 - cw / 2), 0), 2160 - cw)
        y = min(max(round(p.get("cy", 0.5) * 3840 - ch / 2), 0), 3840 - ch)
        vf = f"crop={cw}:{ch}:{x}:{y},scale={W}:{H}:flags=lanczos,{GRADE},fps={FPS},format=yuv420p"
    elif tipo == "foto":
        src, ss = taglio_4k(clip, da, da + 0.2)
        x, y, w, h = p["taglio"]
        png = OUT.parent / f"{id_}.png"
        vf = (f"crop={w}:{h}:{x}:{y},transpose=1,rotate={p['ruota']}*PI/180:ow=iw:oh=ih:c=white,"
              f"crop=iw-60:ih-90:30:45,{GRADE}")
        esegui(["ffmpeg", "-nostdin", "-v", "error", "-y", "-threads", "2", "-ss", f"{ss:.3f}", "-i", str(src),
                "-frames:v", "1", "-vf", vf, str(png)])
        r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", str(png)],
                           capture_output=True, text=True)
        w2, h2 = map(int, r.stdout.strip().split(",")[:2])
        return {"fotogrammi": 1, "w": w2, "h": h2}
    else:
        src, ss = GIRATO / "sdr" / clip, da
        r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                            "-of", "csv=p=0", str(src)], capture_output=True, text=True)
        w0, h0 = map(int, r.stdout.strip().split(",")[:2])
        z = p.get("zoom", 1.0)
        k = max(W / w0, H / h0) * z
        ws, hs = round(w0 * k / 2) * 2, round(h0 * k / 2) * 2
        x = min(max(round(p.get("cx", 0.5) * ws - W / 2), 0), ws - W)
        y = min(max(round(p.get("cy", 0.5) * hs - H / 2), 0), hs - H)
        passo = "setpts=2*PTS," if p.get("lento") else ""
        vf = f"{passo}fps={FPS},scale={ws}:{hs}:flags=lanczos,crop={W}:{H}:{x}:{y},{GRADE},format=yuv420p"
    esegui(["ffmpeg", "-nostdin", "-v", "error", "-y", "-threads", "2", "-ss", f"{ss:.3f}", "-t", f"{a - da:.3f}",
            "-i", str(src), "-vf", vf, "-an", "-c:v", "libx264", "-crf", "16", "-preset", "medium",
            "-threads", "2", "-bsf:v", COLORE, "-movflags", "+faststart", str(out)])
    r = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0", "-show_entries",
                        "stream=nb_read_frames,width,height", "-of", "json", str(out)], capture_output=True, text=True)
    s = json.loads(r.stdout)["streams"][0]
    return {"fotogrammi": int(s["nb_read_frames"]), "w": s["width"], "h": s["height"]}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)
    dati = json.loads(JSON.read_text()) if JSON.exists() else {}
    for i, (id_, tipo, clip, da, a, p) in enumerate(SPEZZONI):
        if SOLO and id_ not in SOLO:
            continue
        dati[id_] = prepara(id_, tipo, clip, da, a, p)
        print(id_, dati[id_], flush=True)
        JSON.write_text(json.dumps(dati, indent=2) + "\n")
        if i < len(SPEZZONI) - 1:
            time.sleep(8)


if __name__ == "__main__":
    main()

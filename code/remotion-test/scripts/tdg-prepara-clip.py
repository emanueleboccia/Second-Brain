"""Prepara le clip dei due reel di Tenuta Don Gaetano (settembre 2026).

Taglia ogni spezzone dal girato, applica la LUT S-Log3 -> Rec.709 alle clip Sony,
porta tutto a 1080x1920 e 30 fps, e scrive i JSON con le durate per Remotion.
Le clip Sony sono a 50p: vengono rallentate a 0,6x riusando ogni fotogramma come
fotogramma a 30 fps. Le clip del drone sono a 30p e restano a velocità normale.
"""
import json, subprocess, sys, time
from pathlib import Path

SSD = Path("/Volumes/SSD-MANU/02-TENUTA-DON-GAETANO")
PRIME = SSD / "1-eventi/prime-riprese-scatti"
DRONE = SSD / "2-libreria/riprese-drone"
LUT = SSD / "2-libreria/da-smistare/SL3SG3tos709.cube"
OUT = Path("public/tdg")
CODA = 0.35  # secondi in più che la transizione si mangia
# Gli interni della dimora sono stati girati bassi: dopo la LUT la loro luminanza media è 52,
# quella degli stessi ambienti nel reel del 29/08 è 65. Gamma 1,15 li porta allo stesso livello.
SCHIARISCI = {sid: 1.15 for sid in ("r1-03-lampadario", "r1-04-sala-verde", "r1-05-fiori", "r1-06-orologio", "r1-07-ritratto")}
# Con degli id come argomenti si rifanno solo quegli spezzoni; i JSON si riscrivono sempre interi.
SOLO = set(sys.argv[1:])
# Il trattamento del design system della Tenuta: tono caldo nei colori della palette, grana fine,
# leggera vignettatura. Si applica a tutti gli spezzoni, dopo la LUT; grana e vignetta dopo la
# scala, così la grana ha la dimensione del 1080x1920 e non quella del 4K.
COLORE = "colorbalance=rs=0.03:bs=-0.03:rm=0.04:bm=-0.05:rh=0.05:bh=-0.06,eq=saturation=0.9:contrast=1.04"
FINITURA = "vignette=angle=PI/6,noise=alls=6:allf=t"
FPS = 30

def drone(nome):
    return next(p for p in DRONE.glob(f"dji_fly_20250610_{nome}_*_video.mp4") if not p.name.startswith("._"))

def sony(nome):
    return next(p for p in PRIME.rglob(f"{nome}.MP4") if not p.name.startswith("._"))

REEL = {
    "r1": [  # Dal cortile ai saloni
        ("r1-01-vesuvio", drone("161658"), 3.0, 0.5),
        ("r1-02-cortile", drone("161034"), 3.0, 1.0),
        ("r1-03-lampadario", sony("C0208"), 2.5, None),
        ("r1-04-sala-verde", sony("C0207"), 2.5, None),
        ("r1-05-fiori", sony("C0199"), 1.5, None),
        ("r1-06-orologio", sony("C0202"), 1.5, None),
        ("r1-07-ritratto", sony("C0210"), 1.5, None),
        ("r1-08-tetti", drone("161600"), 4.0, 1.0),
    ],
    "r2": [  # Le mani in cucina
        ("r2-01-zucchero", sony("C0325"), 2.5, None),
        ("r2-02-sac-a-poche", sony("C0318"), 1.5, None),
        ("r2-03-chef", sony("C0319"), 1.5, None),
        ("r2-04-granella", sony("C0321"), 1.25, None),
        ("r2-05-cannoli", sony("C0323"), 1.25, None),
        ("r2-06-sfogliatelle", sony("C0316"), 2.5, None),
        ("r2-07-pastiera", sony("C0331"), 2.5, None),
        ("r2-08-fragole", sony("C0335"), 1.5, None),
        ("r2-09-fontana", sony("C0334"), 1.5, None),
        ("r2-10-buffet", sony("C0328"), 4.0, None),
    ],
}

def probe(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                        "stream=r_frame_rate:format=duration", "-of", "json", str(p)],
                       capture_output=True, text=True, check=True)
    j = json.loads(r.stdout)
    n, d = j["streams"][0]["r_frame_rate"].split("/")
    return float(j["format"]["duration"]), float(n) / float(d)

for reel, spezzoni in REEL.items():
    segmenti = []
    for sid, src, durata, inizio in spezzoni:
        dur_src, fps_src = probe(src)
        lento = fps_src >= 49
        fattore = fps_src / FPS if lento else 1.0  # 50p usata a 30p = 0,6x
        serve = (durata + CODA) * (FPS / fps_src) if lento else (durata + CODA)
        if inizio is None:
            inizio = max(0.0, (dur_src - serve) / 2)
        inizio = min(inizio, max(0.0, dur_src - serve - 0.05))
        filtri = []
        if src.suffix == ".MP4":
            filtri.append(f"lut3d=file={LUT}")
        if sid in SCHIARISCI:
            filtri.append(f"eq=gamma={SCHIARISCI[sid]}")
        filtri.append(COLORE)
        filtri.append("scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1")
        filtri.append(FINITURA)
        if lento:
            filtri.append(f"setpts=N/({FPS}*TB)")
        n_frame = round((durata + CODA) * FPS)
        dest = OUT / f"{sid}.mp4"
        if not SOLO or sid in SOLO:
          subprocess.run(["ffmpeg", "-v", "error", "-threads", "2", "-y", "-ss", f"{inizio:.2f}", "-i", str(src), "-an",
                        "-vf", ",".join(filtri), "-r", str(FPS), "-frames:v", str(n_frame),
                        "-c:v", "libx264", "-crf", "17", "-preset", "medium", "-pix_fmt", "yuv420p",
                        "-movflags", "+faststart", str(dest)], check=True)
        # Pausa fra una clip e l'altra: con tutti i core al massimo il MacBook si surriscalda.
        time.sleep(4)
        segmenti.append({"id": sid, "sorgente": f"tdg/{sid}.mp4", "durata": durata,
                         "origine": f"{src.name} da {inizio:.2f}s", "lento": lento})
        print(f"{sid}: {src.name} {fps_src:.0f}fps da {inizio:.2f}s, {n_frame} frame{' (0,6x)' if lento else ''}")
    Path(f"src/tdg/segmenti-{reel}.json").write_text(json.dumps(segmenti, indent=2, ensure_ascii=False))

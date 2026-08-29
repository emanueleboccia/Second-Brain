# Estrae dai .MOV originali gli spezzoni scelti, li porta da HDR a SDR,
# li mette in verticale a 30 fps e li salva in public/clips/.
import json, os, subprocess, sys

TONEMAP = (
    "zscale=t=linear:npl=100,format=gbrpf32le,"
    "zscale=p=bt709:t=bt709:m=bt709:r=tv,"
    "tonemap=hable:desat=0,format=yuv420p"
)

sorgente = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/Downloads/video test")
segmenti = json.load(open("src/data/segmenti.json"))
# Coda extra su ogni spezzone: la mangia la transizione, che sovrappone i due
# blocchi. Senza, la dissolvenza si porta via l'ultima parola.
CODA = 0.40
os.makedirs("public/clips", exist_ok=True)

for s in segmenti:
    uscita = f"public/clips/{s['id']}.mp4"
    cmd = [
        "npx", "remotion", "ffmpeg", "-y",
        "-ss", str(s["da"]),
        "-i", os.path.join(sorgente, s["sorgente"]),
        "-t", str(s["durata"] + CODA),
        "-map", "0:0", "-map", "0:1",
        "-vf", TONEMAP,
        "-r", "30",
        # Codificatore hardware: usa il media engine invece dei core, scalda molto meno.
        "-c:v", "h264_videotoolbox", "-b:v", "12M", "-pix_fmt", "yuv420p",
        "-threads", "3",
        "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart",
        uscita,
    ]
    r = subprocess.run(cmd, stdin=subprocess.DEVNULL,
                       stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if r.returncode != 0:
        print(f"✗ {s['id']}")
        print(r.stderr.decode()[-1500:])
        sys.exit(1)
    print(f"✓ {s['id']}  {s['durata']}s  {os.path.getsize(uscita)//1024} KB")

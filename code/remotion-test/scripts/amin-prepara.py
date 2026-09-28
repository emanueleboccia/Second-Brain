"""Prepara gli spezzoni del reel «Il tour di Amin» di Zucche in Masseria (27/09/2026).

Il girato sono le clip dell'iPhone di `1-eventi/momenti/2026-09-27-tour-di-amin/usate` sull'SSD, arrivate
in `00-SCARICO/iphone/video tiktok amin` e spostate lì dopo l'ok al montaggio. Sono HDR, quindi
prima passano da avconvert, che le porta in SDR bt709 (vedi il correction log del 20/09/2026).
Da lì ogni spezzone si taglia sulla battuta di Amin, lasciando fuori il «vai» di Emanuele, si porta
a 30 fps col grade delle storie di Zucche (contrasto 1,04, saturazione 1,10, niente calore in più),
e la voce si pulisce e si porta allo stesso livello in tutti gli spezzoni.

Scrive:
- `public/amin/seg/<id>.mp4`, gli spezzoni pronti per Remotion (fuori da git);
- `src/amin/segmenti.json`, con clip, punto di taglio e durata vera di ogni spezzone;
- `src/amin/volti.json`, dove sta il volto di Amin ogni 0,2 s, per centrare gli zoom.

Con degli id come argomenti si rifanno solo quegli spezzoni; i JSON si riscrivono sempre interi.
Un ffmpeg alla volta, a due thread e con una pausa fra un file e l'altro: il MacBook scalda.
"""
import json, subprocess, sys, tempfile, time
from pathlib import Path
import numpy as np

GIRATO = Path("/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/1-eventi/momenti/2026-09-27-tour-di-amin/usate")
OUT = Path("public/amin/seg")
SDR = Path("public/amin/sdr")  # le clip già convertite da avconvert, una volta sola
VOLTI_BIN = Path("scripts/volti")  # compilato da code/storie-clip/volti.swift
FPS = 30
GRADE = "eq=contrast=1.04:saturation=1.10"
# La voce: via il rombo sotto i 90 Hz, un compressore gentile, poi il guadagno che porta il parlato
# a -17 dBFS di RMS e un limitatore a -3 dBFS. Il guadagno si calcola spezzone per spezzone.
VOCE_RMS = -17.0
SOLO = set(sys.argv[1:])

# id, clip, da, a (secondi nella clip originale), velocità. Le camminate di Amin vanno a 1,5x e
# mute, due secondi l'una: le copre la musica, col whoosh della frusta. Emanuele le ha volute più
# lunghe del primo montaggio, dove erano a 2x per un secondo solo. L'inizio sta sulla prima parola di Amin, dopo il «vai». La fine no: dopo la
# battuta resta un secondo, o uno e mezzo dove c'è la panoramica, perché è lì che la camera fa
# vedere quello che Amin ha appena nominato. Chiesto da Emanuele sul grezzo del 27/09/2026: «non
# lo fare troppo tagliato». Le code si fermano prima delle voci che non c'entrano: l'«ok» della
# 5510 a 5,45 s, il «Carla!» della 5518 a 1,44 s.
SPEZZONI = [
    ("00-hook", "IMG_5499", 2.02, 5.40, 1),         # «Bambini, venite a Zucche in Masseria!»
    ("01-bilancia", "IMG_5502", 1.82, 5.00, 1),     # «Questa bilancia della giucca»
    ("02-carrozza", "IMG_5503", 0.74, 3.25, 1),     # «Questa carrozza»
    ("03-percorso", "IMG_5504", 1.06, 4.20, 1),     # «Questo è il percorso»
    ("04-cammina", "IMG_5505", 0.20, 3.20, 1.5),
    ("05-casa", "IMG_5506", 2.28, 5.40, 1),         # «Questa casetta della giucca»: il «vai» finisce a 2,10
    ("06-campo", "IMG_5507", 0.88, 4.90, 1),        # «Adesso il giardino giucca»
    ("07-food", "IMG_5509", 0.36, 4.20, 1),         # «Questa l'area food, dove mangiare»
    ("08-dolci", "IMG_5510", 1.50, 4.50, 1),        # «Tutti torte, biscotti»
    ("09-fieno-1", "IMG_5511", 2.06, 4.62, 1),      # primo tentativo: «Nobeli»
    ("10-fieno-2a", "IMG_5512", 0.00, 1.80, 1),     # secondo: «Noboli»
    ("11-fieno-2b", "IMG_5512", 2.80, 4.00, 1),     # la risata dopo, senza il secondo di silenzio in mezzo
    ("12-fieno-3", "IMG_5513", 0.84, 2.75, 1),      # terzo: «Fironopoli»
    ("13-dentro", "IMG_5514", 1.58, 5.00, 1),       # «Dove bambini giocare tutti»
    ("14-cammina", "IMG_5515", 0.10, 3.10, 1.5),
    ("15-villaggio", "IMG_5516", 1.50, 4.60, 1),    # «Borgo contadini»
    ("16-venite", "IMG_5517", 0.56, 3.55, 1),       # «Venite oggi a Zucche in Masseria!»
    ("17-aspetto", "IMG_5518", 0.26, 1.30, 1),      # «Vi aspetto!»
    ("18-spritz", "IMG_5494-finale", 0.00, 1.00, 1),  # lo spritz di ieri, girato il 26/09
]


def ff(*args):
    subprocess.run(["nice", "-n", "19", "ffmpeg", "-v", "error", "-y", "-threads", "2", *args], check=True)


def sdr(clip):
    """La clip in SDR: avconvert col motore di Apple, una volta sola."""
    out = SDR / f"{clip}.mov"
    if not out.exists():
        SDR.mkdir(parents=True, exist_ok=True)
        src = next(p for p in GIRATO.glob(f"{clip}.*") if not p.name.startswith("._"))
        subprocess.run(["nice", "-n", "19", "avconvert", "-s", str(src), "-p", "Preset1920x1080", "-o", str(out)],
                       check=True, capture_output=True)
    return out


def energia(wav):
    """Energia in dB ogni 10 ms, a 16 kHz mono."""
    a = subprocess.run(["ffmpeg", "-v", "error", "-i", str(wav), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                       capture_output=True, check=True).stdout
    x = np.frombuffer(a, np.float32)
    e = np.sqrt(np.convolve(x**2, np.ones(320) / 320, "same")[::160])
    return 20 * np.log10(e + 1e-6)


def rms_parlato(wav):
    """RMS dei soli tratti parlati: quelli 12 dB sopra il fondo."""
    e = energia(wav)
    fondo = np.percentile(e, 20)
    parlato = e[e > fondo + 12]
    return float(10 * np.log10(np.mean(10 ** (parlato / 10)))) if len(parlato) else None


def taglia(sid, clip, da, a, vel, guadagno):
    src = sdr(clip)
    video = f"{f'setpts=PTS/{vel},' if vel != 1 else ''}fps={FPS},{GRADE},format=yuv420p"
    voce = (f"highpass=f=90,acompressor=threshold=-24dB:ratio=2.5:attack=5:release=100,"
            f"volume={guadagno:.2f}dB,alimiter=limit=0.708:level=false")
    audio = ["-an"] if vel != 1 else ["-af", voce, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "1"]
    ff("-ss", f"{da:.3f}", "-to", f"{a:.3f}", "-i", str(src), "-vf", video,
       "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-g", "15",
       "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
       *audio, "-movflags", "+faststart", str(OUT / f"{sid}.mp4"))


def durata(p):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                       capture_output=True, text=True, check=True)
    return round(float(r.stdout), 3)


def volti(sid):
    """Il volto più grande ogni 0,2 s, in pixel del 1080x1920: [t, cx, cy, larghezza]."""
    with tempfile.TemporaryDirectory() as tmp:
        ff("-i", str(OUT / f"{sid}.mp4"), "-vf", "fps=5,scale=540:960", f"{tmp}/f_%03d.png")
        foto = sorted(Path(tmp).glob("f_*.png"))
        r = subprocess.run([str(VOLTI_BIN), *map(str, foto)], capture_output=True, text=True).stdout
    punti = []
    for riga in r.strip().splitlines():
        nome, *box = riga.split()
        if not box:
            continue
        x, y, w, h = max((list(map(float, b.split(","))) for b in box), key=lambda b: b[2])
        t = (int(nome[2:5]) - 1) / 5
        punti.append([round(t, 2), round((x + w / 2) * 2), round((y + h / 2) * 2), round(w * 2)])
    return punti


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    if not VOLTI_BIN.exists():
        subprocess.run(["swiftc", "../storie-clip/volti.swift", "-o", str(VOLTI_BIN)], check=True)
    vecchi = {}
    if Path("src/amin/segmenti.json").exists():
        vecchi = {s["id"]: s for s in json.load(open("src/amin/segmenti.json"))}
    tutti_volti = json.load(open("src/amin/volti.json")) if Path("src/amin/volti.json").exists() else {}
    segmenti = []
    for sid, clip, da, a, vel in SPEZZONI:
        if SOLO and sid not in SOLO and sid in vecchi:
            segmenti.append(vecchi[sid])
            continue
        guadagno = 0.0
        if vel == 1:
            # primo giro senza guadagno, si misura il parlato, secondo giro col guadagno giusto
            taglia(sid, clip, da, a, vel, 0.0)
            misura = rms_parlato(OUT / f"{sid}.mp4")
            guadagno = VOCE_RMS - misura if misura is not None else 0.0
            taglia(sid, clip, da, a, vel, guadagno)
        else:
            taglia(sid, clip, da, a, vel, 0.0)
        segmenti.append({"id": sid, "clip": clip, "da": da, "a": a, "velocita": vel,
                         "durata": durata(OUT / f"{sid}.mp4"), "guadagnoVoce": round(guadagno, 1)})
        tutti_volti[sid] = volti(sid)
        print(f"{sid}: {segmenti[-1]['durata']} s, voce {guadagno:+.1f} dB, {len(tutti_volti[sid])} volti", flush=True)
        time.sleep(3)
    json.dump(segmenti, open("src/amin/segmenti.json", "w"), indent=1, ensure_ascii=False)
    json.dump(tutti_volti, open("src/amin/volti.json", "w"), ensure_ascii=False)
    print("totale", round(sum(s["durata"] for s in segmenti), 2), "s")


if __name__ == "__main__":
    main()

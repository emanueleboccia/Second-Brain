"""Il suono del reel sul sito di Tenuta Don Gaetano (30/09/2026 notte): voce, effetti e una base trap, coi livelli uniti.

Copiato da `pb-room84-voce4-suono.py`, con gli eventi della composizione `PbTenuta` (src/pb-tenuta/ReelTenuta.tsx):
il drone, le foto che arrivano a mazzo, il logo che si disegna, il telefono col sito che scende, il tocco su WhatsApp e
la CTA. La base è la trap della libreria, per non ripetere la phonk del Girarrosto e l'hip hop di Room84: cresce
sotto il drone, le foto e il logo, e il suo drop cade quando compare il sito.

Esce `out/pb/tenuta-mix.mp4`; con `senza-musica`, `out/pb/tenuta-mix-senza-musica.mp4`.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/tenuta.mp4")
VOCE = Path("public/pb-tenuta/voce.wav")
USCITA = Path("out/pb/tenuta-mix.mp4")
SR = 48000
F = 1 / 30

WHOOSH_MORBIDO = "whoosh/sdanezis-soft-luxury-air-whoosh-8-592506.mp3"  # colmo 0,37
WHOOSH_LENTO = "whoosh/universfield-slow-swoosh-567191.mp3"  # colmo 1,35
ROTELLA = "rotella/zoedit-slow-mouse-wheel-movement-204710.mp3"
PENNA = "penna/freesound_community-026204_fast-writing-pen-to-paper-62247.mp3"
PENNA_POV = "penna/freesound_community-writing-on-paper-29376.mp3"
CARTA = "carta/oxidvideos-paper-slide-short-478835.mp3"
CARTA_MANI = "carta/freesound_community-paper-slide-89980.mp3"
POP = "pop/abhicreates-soft-subtle-ui-pop-sfx-348820.mp3"
PASSATA = "swipe/driken5482-swipe-236674.mp3"
SCINTILLA = "scintilla/koiroylers-sparkle-355937.mp3"  # colmo 0,33
COLPO = "boom/universfield-cinematic-impact-boom-05-352465.mp3"
CLICK = "click/universfield-computer-mouse-click-352734.mp3"  # colmo 0,16
RIAVVOLGI = "riavvolgimento/chrysalyn-cyberpunk-glitch-rewind-sfx-540234.mp3"  # finisce a 1,81
DING = "campanella/dragon-studio-ding-402325.mp3"  # colmo 0,06
NOTIFICA = "notifica/universfield-new-notification-051-494246.mp3"  # colmo 0,23
TASTIERA = "tastiera/dragon-studio-keyboard-typing-sound-effect-335503.mp3"
RISER = "riser/brvhrtz-short-sweep-01-brvhrtz-224283.mp3"  # sale e si ferma sul colmo a 2,60
SCATTO = "scatto/freesound_community-camera-shutter-6305.mp3"  # colmo 0,13

WHOOSH_SCATTO = "whoosh/universfield-fast-swoosh-383967.mp3"  # colmo 0,13

T = json.loads(Path("src/pb-tenuta/voce.json").read_text())
DURATA = T["durata"]
SC = T["scene"]
MV = T["movimenti"]
da = lambda testo: next(b["da"] for b in T["blocchi"] if b["testo"] == testo)
SITO, WA, CHIUSURA = SC["sito"]["da"], SC["whatsapp"]["da"], SC["finale"]["da"]
PASSATE = [b["da"] for b in T["blocchi"] if "chiave" in b]
# quando arrivano le foto: come in ReelTenuta.tsx, una per battuta e la corona d'alloro su «lauree»
bf = [b["da"] for b in T["blocchi"] if SC["foto"]["da"] <= b["da"] < SC["foto"]["a"]]
FOTO = [bf[0], bf[1], bf[2], MV["lauree"] + 0.45, bf[4], bf[4] + 22 * F]

# evento: (secondo, file, dB, da dove nel file, quanto dura, semitoni, dissolvenza in, dissolvenza out)
EVENTI = [
    (0.00, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),  # il drone dall'alto
    (da("una dimora del '700") - 0.13, WHOOSH_SCATTO, -18, 0, None, 0, 0.0, 0.05),  # il taglio sulla facciata fra i pini
    *[(t - 0.05, CARTA_MANI, -17, 0, 0.5, i, 0.0, 0.15) for i, t in enumerate(FOTO)],  # le foto che arrivano a mazzo
    (SC["drone2"]["da"] - 0.37, WHOOSH_MORBIDO, -13, 0, None, 0, 0.0, 0.2),
    (SC["logo"]["da"] - 1.35, WHOOSH_LENTO, -20, 0, None, 0, 0.3, 0.3),
    (SC["logo"]["da"] + 0.15, PENNA, -20, 1.5, 1.0, 0, 0.05, 0.2),  # il logo che si disegna
    (MV["logo"] - 0.33, SCINTILLA, -22, 0, None, 0, 0.0, 0.5),
    (SITO - 2.60, RISER, -18, 0, None, 0, 0.0, 0.02),  # la salita verso il sito
    (SITO - 0.37, WHOOSH_MORBIDO, -11, 0, None, 0, 0.0, 0.2),
    (SITO + 0.05 - 0.10, SCATTO, -16, 0, None, 0, 0.0, 0.05),
    (MV["vetrina"] - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),  # lo zoom sul titolo
    *[(t + 0.05, ROTELLA, -24, 0.3, 0.75, 0, 0.1, 0.25) for t in (MV["sala"], MV["giardino"], MV["dettagli"])],
    (WA, ROTELLA, -24, 0.3, 0.8, 0, 0.1, 0.25),  # giù fino a WhatsApp
    (MV["whatsapp"] - 0.13 - 4 * F, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    (MV["whatsapp"] + 6 * F - 0.16, CLICK, -15, 0, None, 0, 0.0, 0.05),  # il tocco sul bottone
    (MV["whatsapp"] + 0.55 - 0.23, NOTIFICA, -15, 0, None, 0, 0.0, 0.3),
    (CHIUSURA - 0.37, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),
    (CHIUSURA - 0.08, COLPO, -20, 0, None, 0, 0.0, 0.6),  # quando compare la CTA
    *[(t + 2 * F, PASSATA, -18, 0, None, 0, 0.0, 0.02) for t in PASSATE],
    (T["cta"]["chiave"] + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),  # «Mandagli questo video.»
]


def carica(f):
    r = subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-i", str(f), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
                       capture_output=True, check=True)
    return np.frombuffer(r.stdout, dtype=np.float32).reshape(-1, 2).copy()


def cambia_tono(x, semitoni):
    if semitoni == 0:
        return x
    k = 2 ** (semitoni / 12)
    idx = np.arange(0, len(x) - 1, k)
    return np.stack([np.interp(idx, np.arange(len(x)), x[:, c]) for c in range(2)], axis=1).astype(np.float32)


def dissolvi(x, fin, fout):
    n = len(x)
    a, b = int(fin * SR), int(fout * SR)
    if a:
        x[: min(a, n)] *= np.linspace(0, 1, min(a, n))[:, None]
    if b:
        x[-min(b, n):] *= np.linspace(1, 0, min(b, n))[:, None]
    return x


def effetti():
    global MEDIA_DB
    MEDIA_DB = float(np.mean([e[2] for e in EVENTI]))
    bus = np.zeros((int(DURATA * SR), 2), dtype=np.float32)
    cache = {}
    for t, f, db, da, dura, semi, fin, fout in EVENTI:
        if f not in cache:
            cache[f] = carica(SUONI / f)
        x = cache[f][int(da * SR):]
        if dura:
            x = x[: int(dura * SR)]
        x = dissolvi(cambia_tono(x.copy(), semi), fin, fout)
        picco = np.abs(x).max() or 1
        db = MEDIA_DB + (db - MEDIA_DB) * STACCO  # la distanza fra un effetto e l'altro, ridotta
        x = x / picco * 10 ** ((db + 2) / 20)  # il dB è il picco dell'effetto, come in Room84
        i = max(0, int(t * SR))
        j = min(len(bus), i + len(x))
        bus[i:j] += x[: j - i]
    return bus


def carica_voce():
    x = carica(VOCE)
    n = int(DURATA * SR)
    return np.concatenate([x, np.zeros((max(0, n - len(x)), 2), dtype=np.float32)])[:n]


# I livelli, dopo la prima prova con la voce (30/09/2026 sera). Emanuele: «metti i db uguali per la voce e effetti
# sonori. Sembra brutto che si sente solo la voce da sola. Metti un piccolo sottofondo musicale, quello va più basso
# [...] poi la voce è un po troppo alta. vedi come sono mediamente i db nei reel pubblici». Instagram non pubblica un
# numero; i riferimenti del settore dicono −14 LUFS per il mix intero, picchi sotto −1 dBTP, e la musica 12-14 dB
# sotto la voce. Quindi: voce a −17 LUFS da sola (nella prima prova era a −16 e il mix era quasi solo lei), gli
# effetti più forti allo stesso livello della voce, e la base 13 dB sotto la voce quando lei parla.
VOCE_LUFS = -17.0
SOTTO = 7.0  # di quanti dB la base sta sotto la voce, mentre lei parla
RESPIRO = 2.0  # di quanti dB la base risale fra una frase e l'altra
# Sulla v5 Emanuele: «potresti avvicinare di più il sottofondo, la voce si sente troppo sola, anche gli effetti
# unifica tutti i volumi, non dargli troppo distacco». Quindi la base sta a 7 dB e non più a 13, e fra gli effetti la
# distanza si dimezza: ognuno si avvicina alla media di tutti, e il 75% delle finestre con un effetto sta al livello
# della voce, non più solo il 10% più forte.
STACCO = 0.5
QUANTILE_EFFETTI = 75
MUSICA = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/musica/atlasaudio-trap-beat-590006.mp3")
DROP = 21.0  # la trap cresce fino al drop a 21,0 (libreria-suoni.md): cade quando compare il sito


def lufs(x):
    f = Path("cache/pb-girarrosto/misura.f32")
    f.write_bytes(x.astype(np.float32).tobytes())
    r = subprocess.run(["ffmpeg", "-nostdin", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", str(f), "-af", "ebur128", "-f", "null", "-"],
                       capture_output=True, text=True)
    f.unlink()
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)[-1])


def finestre(x, lung=0.4):
    """Il livello in dB di finestre da 400 ms, come la misura momentanea."""
    hop = int(lung * SR)
    n = len(x) // hop
    return 20 * np.log10(np.sqrt(np.mean(x[: n * hop].reshape(n, hop, 2) ** 2, axis=(1, 2))) + 1e-9)


def inviluppo(x, su_ms=10, giu_ms=250):
    hop = SR // 200
    n = len(x) // hop
    env = np.sqrt(np.mean(x[: n * hop].reshape(n, hop, 2) ** 2, axis=(1, 2)))
    su, giu = np.exp(-5 / su_ms), np.exp(-5 / giu_ms)
    liscio, v = np.zeros(n), 0.0
    for i in range(n):
        v = env[i] + (v - env[i]) * (su if env[i] > v else giu)
        liscio[i] = v
    return liscio, hop


def base(voce):
    x = carica(MUSICA)
    parte = DROP - SC["sito"]["da"]  # il secondo del brano che suona a inizio reel
    x = x[int(parte * SR):][: int(DURATA * SR)]
    x = np.concatenate([x, np.zeros((int(DURATA * SR) - len(x), 2), dtype=np.float32)])
    a, b = int(0.25 * SR), int(1.5 * SR)
    x[:a] *= np.linspace(0, 1, a)[:, None]
    x[-b:] *= np.linspace(1, 0, b)[:, None]
    # sale di RESPIRO dB quando la voce tace, e torna giù quando parla
    env, hop = inviluppo(voce)
    parla = np.clip((20 * np.log10(env + 1e-9) + 50) / 15, 0, 1)
    g = np.repeat(10 ** (RESPIRO * (1 - parla) / 20), hop)
    g = np.concatenate([g, np.full(len(x) - len(g), g[-1])])[: len(x)]
    return x * g[:, None]


def main():
    Path("cache/pb-girarrosto").mkdir(parents=True, exist_ok=True)
    voce = carica_voce()
    voce *= 10 ** ((VOCE_LUFS - lufs(voce)) / 20)
    # gli effetti: i più forti allo stesso livello della voce che parla, e fra loro restano le differenze decise
    sfx = effetti()
    v, e = finestre(voce), finestre(sfx)
    livello_voce = np.median(v[v > -45])
    sfx *= 10 ** ((livello_voce - np.percentile(e[e > -60], QUANTILE_EFFETTI)) / 20)
    # la base: 13 dB sotto la voce mentre lei parla
    mus = base(voce)
    m = finestre(mus)
    parla = v > -45
    mus *= 10 ** ((livello_voce - SOTTO - np.median(m[parla])) / 20)
    # «dammelo anche senza musichetta, solo con voce ed effetti sonori»: la versione senza base, stessi livelli
    senza = "senza-musica" in sys.argv[1:]
    mix = voce + sfx + (0 if senza else mus)
    print(f"voce {lufs(voce):.1f} LUFS · effetti {lufs(sfx):.1f} · base {'—' if senza else round(lufs(mus), 1)} · mix {lufs(mix):.1f}")
    uscita = USCITA.with_stem(USCITA.stem + "-senza-musica") if senza else USCITA
    grezzo = Path("cache/pb-girarrosto/suono-voce.f32")
    grezzo.write_bytes(mix.astype(np.float32).tobytes())
    wav = Path("cache/pb-girarrosto/suono-voce.wav")
    # nessuna normalizzazione del mix: la voce resta dov'è; il limitatore sta a −1,9 dB, perché a −1 e a −1,5 la compressione AAC sforava a −0,8
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

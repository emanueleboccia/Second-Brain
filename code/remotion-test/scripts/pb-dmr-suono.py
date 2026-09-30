"""Il suono del reel sul gestionale di Da Mamma Rosaria (30/09/2026 notte): voce, effetti e una base tech house, coi livelli uniti.

Copiato da `pb-tenuta-suono.py`, con gli eventi della composizione `PbDmr` (src/pb-dmr/ReelDmr.tsx): il drone, il
messaggio WhatsApp che si scrive e si ricopia, i file dei turni che cadono sparsi, il gestionale, le tre pagine, i conti,
le foto a mazzo e la CTA. La base è la tech house, l'ultima delle quattro ritmate non ancora usata: il suo drop, a
12,22 nel brano, cade quando compare il gestionale; siccome arriva prima nel brano che nel reel, la base entra dopo
un secondo e mezzo, sul primo taglio del drone.

Esce `out/pb/dmr-mix.mp4`; con `senza-musica`, `out/pb/dmr-mix-senza-musica.mp4`.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/dmr.mp4")
VOCE = Path("public/pb-dmr/voce.wav")
USCITA = Path("out/pb/dmr-mix.mp4")
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

TASTIERA2 = "tastiera/soundreality-keyboard-typing-sfx-525007.mp3"
CASSA = "cassa/universfield-cash-register-open-567194.mp3"  # colmo 0,19

T = json.loads(Path("src/pb-dmr/voce.json").read_text())
DURATA = T["durata"]
SC = T["scene"]
MV = T["movimenti"]
da = lambda testo: next(b["da"] for b in T["blocchi"] if b["testo"] == testo)
CHIUSURA = SC["finale"]["da"]
PASSATE = [b["da"] for b in T["blocchi"] if "chiave" in b]
AZ, AZF = SC["caso"]["da"], SC["caso"]["a"] - SC["caso"]["da"]

# evento: (secondo, file, dB, da dove nel file, quanto dura, semitoni, dissolvenza in, dissolvenza out)
EVENTI = [
    (0.00, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),  # il drone dall'alto sui gazebo
    (MV["feste"] - 0.13, WHOOSH_SCATTO, -18, 0, None, 0, 0.0, 0.05),  # il taglio sul giardino coi gazebo
    (SC["whatsapp"]["da"] - 0.37, WHOOSH_MORBIDO, -13, 0, None, 0, 0.0, 0.2),  # il telefono col messaggio
    (SC["whatsapp"]["da"] + 0.2, TASTIERA2, -19, 0.4, MV["riscritto"] - SC["whatsapp"]["da"] - 0.3, 0, 0.05, 0.15),  # il messaggio che si scrive
    (MV["riscritto"] + 4 * F - 0.17, POP, -16, 0, None, 0, 0.0, 0.05),  # ricopiato
    (MV["riscritto"] + 16 * F - 0.17, POP, -16, 0, None, 2, 0.0, 0.05),  # e ricopiato ancora
    (MV["acconti"] + 2 * F - 0.12, DING, -14, 0, None, 0, 0.0, 0.3),  # acconto e saldo che si accendono
    *[(MV["sparsi"] + (-6 + i * 4) * F, CARTA_MANI, -17, 0, 0.45, i % 3, 0.0, 0.12) for i in range(6)],  # i file che cadono
    (MV["drive"] - 2 * F - 0.37, WHOOSH_MORBIDO, -18, 0, None, 0, 0.0, 0.2),  # la finestra di Drive
    (SC["gestionale"]["da"] - 2.60, RISER, -17, 0, None, 0, 0.0, 0.02),  # la salita verso il gestionale
    (SC["gestionale"]["da"] - 0.37, WHOOSH_MORBIDO, -11, 0, None, 0, 0.0, 0.2),
    (SC["gestionale"]["da"] + 0.1 - 0.33, SCINTILLA, -23, 0, None, 0, 0.0, 0.5),
    (SC["festa"]["da"] - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),
    (SC["festa"]["da"] + 0.6 - 0.16, CLICK, -18, 0, None, 0, 0.0, 0.05),
    (SC["pagine"]["da"] - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),  # la festa in alto
    *[(MV[k] - 0.17, POP, -15, 0, None, i * 2, 0.0, 0.05) for i, k in enumerate(("cliente", "lavora", "cucina"))],  # le tre pagine
    (MV["sincronizzato"] - 0.33, SCINTILLA, -22, 0, None, 0, 0.0, 0.4),  # i fili che si accendono su «tutto sincronizzato»
    (SC["conti"]["da"] - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),
    (MV["entrato"] - 4 * F - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),  # lo zoom su «incassato»
    (MV["entrato"] + 8 * F - 0.19, CASSA, -19, 0, None, 0, 0.0, 0.2),
    (MV["manca"] - 4 * F - 0.13, WHOOSH_SCATTO, -20, 0, None, -2, 0.0, 0.05),  # e su «da incassare»
    *[(AZ + AZF * p - 0.05, CARTA_MANI, -17, 0, 0.5, i, 0.0, 0.15) for i, p in enumerate((0, 0.2, 0.4, 0.6, 0.8))],  # le foto a mazzo
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
MUSICA = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/musica/jonasblakewood-tech-house-tech-house-music-557624.mp3")
DROP = 12.22  # la tech house ha il drop a 12,22 (libreria-suoni.md): cade quando compare il gestionale


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
    parte = DROP - SC["gestionale"]["da"]  # il secondo del brano che suona a inizio reel
    # il drop arriva prima nel brano che nel reel: la base entra dopo, con dei secondi di silenzio davanti
    x = np.concatenate([np.zeros((int(-parte * SR), 2), dtype=np.float32), x]) if parte < 0 else x[int(parte * SR):]
    x = x[: int(DURATA * SR)]
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

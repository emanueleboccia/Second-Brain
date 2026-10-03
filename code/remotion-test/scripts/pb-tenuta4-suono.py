"""Il suono della v4 del reel della Tenuta (03/10/2026), sulla voce nuova che Emanuele ha registrato a modo suo: la
voce, gli effetti sui tagli e sulle animazioni, e la base phonk bassa sotto, più la versione senza base, che è quella
che si pubblica («la metterò direttamente dal social, una di tendenza in sottofondo»).

Metodo e livelli sono quelli della v3, in `scripts/pb-tenuta3-suono.py`. Cambiano i punti: l'identità col logo e i due
colori, il menù col tocco e i salti fra le sezioni, il computer e il telefono che si accendono a turno, il messaggio di
WhatsApp che si scrive da solo. I tempi vengono da `src/pb-tenuta-4/voce.json` e dai fotogrammi di `ReelTenuta4.tsx`.

Esce `out/pb/reel-tenuta-v4-mix.mp4`, e con `senza-musica` la versione senza base. Un ffmpeg alla volta.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/reel-tenuta-v4.mp4")
VOCE = Path("public/pb-tenuta-4/voce.wav")
USCITA = Path("out/pb/reel-tenuta-v4-mix.mp4")
SR = 48000
F = 1 / 30

# della libreria di prima, con dove cade il colmo
WHOOSH_MORBIDO = "whoosh/sdanezis-soft-luxury-air-whoosh-8-592506.mp3"  # colmo 0,37
WHOOSH_SOTTILE = "whoosh/universfield-thin-swoosh-352756.mp3"  # colmo 0,58
WHOOSH_SCATTO = "whoosh/universfield-fast-swoosh-383967.mp3"  # colmo 0,13
WHOOSH_SECCO = "whoosh/universfield-swoosh-026-454861.mp3"  # colmo 0,29
PENNA_LENTA = "penna/freesound_community-pen-writing-on-paper-71212.mp3"  # il tratto parte a 1,12
POP = "pop/dragon-studio-clean-minimal-pop-467466.mp3"  # colmo 0,17
POP_MORBIDO = "pop/abhicreates-soft-subtle-ui-pop-sfx-348820.mp3"
CLICK = "click/universfield-computer-mouse-click-352734.mp3"  # colmo 0,16
RISER = "riser/koiroylers-small-riser-351977.mp3"  # colmo 0,98
PASSATA = "swipe/driken5482-swipe-236674.mp3"
COLPO = "boom/universfield-cinematic-impact-boom-03-294435.mp3"
# entrati il 03/10/2026, misurati quel giorno
CINEMATIC = "whoosh/Cinematic Woosh.wav"  # colmo 0,60
WOOSH = "whoosh/Woosh.wav"  # colmo 0,55
WOOSH_CORTO = "whoosh/Woosh corto.wav"  # colmo 0,25
NEXTEL = "notifica/Nextel.wav"  # colmo 0,14
TYPING = "tastiera/Typing.wav"  # colmo 0,33
COUNTER = "contatore/Counter.wav"  # colmo 0,29
SUCCESS = "giusto/Success UI.wav"  # colmo 0,18
SHINE = "scintilla/Shine.wav"  # colmo 0,40
REVERB = "boom/Reverb Hit.wav"  # colmo 0,12

# entrati anche questi il 03/10/2026
WOOSH_MINI = "whoosh/Mini Whoosh.wav"  # colmo 0,86
APPROVE = "giusto/Approve.wav"  # colmo 0,08
NEGATIVO = "errore/Negative Glitch 2.wav"  # colmo 0,25
GLITCH = "glitch/Glitch Transition.wav"  # colmo 0,59
OPEN_UI = "pop/Open UI.wav"  # colmo 0,11
DIGITAL = "pop/Digital Text.wav"  # colmo 0,30
SCAN = "swipe/Scan.wav"  # colmo 0,37
CARTA = "carta/oxidvideos-paper-slide-short-478835.mp3"

GLIMMER = "scintilla/Glimmer.wav"  # colmo 0,16


T = json.loads(Path("src/pb-tenuta-4/voce.json").read_text())
DURATA = T["durata"]
SC = {s["id"]: s for s in T["scene"]}
I = {k: SC[k]["inizio"] for k in SC}
fr = lambda k: [round((b["da"] - SC[k]["inizio"]) * 30) for b in SC[k]["blocchi"]]
t = lambda k, f: I[k] + f * F
B = {k: fr(k) for k in SC}
CTA, CHIAVE = T["cta"]["da"], T["cta"]["chiave"]
PASSATE = [b["da"] for s in T["scene"] for b in s["blocchi"] if "chiave" in b and s["id"] != "semplice"]
bl, bi, bs, bm, bo, bw = B["location"], B["identita"], B["sito"], B["menu"], B["ovunque"], B["whatsapp"]
ARRIVI = [0, bl[1], bl[2], bl[2] + 20, bl[3] + 24]
TOCCO_MENU = t("menu", bm[1] + 2)
TOCCO = t("whatsapp", bw[1] + 8)

EVENTI = [
    # 1 · l'apertura: il titolo col colpo, e il taglio sulla facciata del Settecento
    (0.0, CINEMATIC, -12, 0, None, 0, 0.0, 0.3),
    (0.05, COLPO, -18, 0, None, 0, 0.0, 0.8),
    (0.40 + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
    (t("apertura", B["apertura"][1]) - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    # 2 · le foto delle sale che arrivano
    (I["location"] - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),
    *[(t("location", a), CARTA, -16, 0, None, k, 0.0, 0.08) for k, a in enumerate(ARRIVI)],
    # 3 · il Vesuvio, poi l'identità: il logo che si disegna, sale col nome, i due colori
    (I["identita"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("identita", bi[2]) - 0.25, WOOSH_CORTO, -19, 0, None, 0, 0.0, 0.05),
    (t("identita", bi[2] + 2) - 0.04, SHINE, -17, 0, None, 0, 0.0, 0.3),
    (t("identita", bi[3] - 4) - 0.37, WHOOSH_MORBIDO, -18, 0, None, 0, 0.0, 0.2),
    (t("identita", bi[3] + 4) - 0.11, OPEN_UI, -19, 0, None, 0, 0.0, 0.05),
    (t("identita", bi[4]) - 0.17, POP, -17, 0, None, 0, 0.0, 0.05),
    (t("identita", bi[4] + 6) - 0.17, POP, -18, 0, None, 2, 0.0, 0.05),
    # 4 · il sito: il logo che vola nel telefono, la vetrina, il foglio della pagina sola
    (I["sito"] - 0.58, WHOOSH_SOTTILE, -16, 0, None, 0, 0.0, 0.1),
    (I["sito"] + 0.5, OPEN_UI, -18, 0, None, 0, 0.0, 0.05),
    (t("sito", bs[1]) - 0.17, POP, -18, 0, None, 0, 0.0, 0.05),
    (t("sito", bs[3] - 4) - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    (t("sito", bs[3]) + 0.1, SCAN, -19, 0, None, 0, 0.0, 0.1),
    *[(t("sito", bs[3] + 6 + i * 4) - 0.11, OPEN_UI, -24, 0, None, i, 0.0, 0.05) for i in range(6)],
    # 5 · il menù: si apre, il tocco su «La Dimora», i salti fra le sezioni, la galleria che si accende
    (t("menu", bm[0] + 4) - 0.11, OPEN_UI, -18, 0, None, 0, 0.0, 0.05),
    (TOCCO_MENU - 0.16, CLICK, -14, 0, None, 0, 0.0, 0.05),
    *[(x - 0.13, WHOOSH_SCATTO, -19, 0, None, k, 0.0, 0.05) for k, x in enumerate([TOCCO_MENU + 12 * F, t("menu", bm[3]), t("menu", bm[4])])],
    (t("menu", bm[5]) - 0.16, GLIMMER, -18, 0, None, 0, 0.0, 0.3),
    (t("menu", bm[5]) - 0.04, SHINE, -19, 0, None, 0, 0.0, 0.3),
    # 6 · ovunque: arrivano computer e telefono, si accende prima l'uno poi l'altro
    (I["ovunque"] - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (t("ovunque", bo[1]) - 0.1, POP_MORBIDO, -17, 0, None, 0, 0.0, 0.05),
    (t("ovunque", bo[2]) - 0.1, POP_MORBIDO, -17, 0, None, 2, 0.0, 0.05),
    # 7 · WhatsApp: lo zoom sul bottone, il tocco, la chat, il messaggio che si scrive da solo
    (I["whatsapp"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("whatsapp", bw[1] - 8) - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    (TOCCO - 0.16, CLICK, -14, 0, None, 0, 0.0, 0.05),
    (TOCCO + 8 * F - 0.3, WOOSH_MINI, -18, 0, None, 0, 0.0, 0.1),
    (t("whatsapp", bw[2]) - 0.1, TYPING, -19, 0, (bw[3] + 24 - bw[2]) * F + 0.1, 0, 0.0, 0.1),
    (t("whatsapp", bw[5]) - 0.08, APPROVE, -17, 0, None, 0, 0.0, 0.05),
    # 8 · semplice e funzionale sul Vesuvio, la CTA
    (I["semplice"] - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),
    (I["semplice"] - 0.04, REVERB, -15, 0, None, 0, 0.0, 0.5),
    (I["semplice"] + 11 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
    (CTA - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (CTA - 0.08, COLPO, -20, 0, None, 0, 0.0, 0.8),
    *[(x + 2 * F, PASSATA, -18, 0, None, 0, 0.0, 0.02) for x in PASSATE],
    (CHIAVE + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
]


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
MUSICA = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/musica/alex-morgan-phonk-brazilian-phonk-phonk-music-545509.mp3")
DROP = 30.55  # il drop della phonk (libreria-suoni.md): cade su «Poi il sito web»


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


def lufs(x):
    f = Path("cache/pb-tenuta-4/misura.f32")
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
    parte = DROP - I["sito"]  # il secondo del brano che suona a inizio reel
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
    Path("cache/pb-tenuta-4").mkdir(parents=True, exist_ok=True)
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
    grezzo = Path("cache/pb-tenuta-4/suono-voce.f32")
    grezzo.write_bytes(mix.astype(np.float32).tobytes())
    wav = Path("cache/pb-tenuta-4/suono-voce.wav")
    # nessuna normalizzazione del mix: la voce resta dov'è, e il limitatore tiene i picchi sotto −1 dB
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

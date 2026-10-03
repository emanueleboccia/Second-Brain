"""Il suono della v7 del reel del Girarrosto (03/10/2026), sul metodo della v6: la voce nuova, gli effetti sui tagli e sulle animazioni, e la
base phonk bassa sotto, più la versione senza base («gli audio li metto io in base al social»).

Il metodo e i livelli sono quelli della v5, in `scripts/pb-girarrosto-suono.py`, da cui vengono le funzioni. Cambiano
i punti: la v6 taglia ogni due secondi, quindi c'è un fruscio corto su ogni stacco, e usa gli effetti entrati in
libreria il 03/10/2026 dai TikTok che ha salvato Emanuele (docs/video-social/libreria-suoni.md): il Nextel sul
telefono che squilla, il Counter sul contatore dei 120, il Success UI sul totale, la Shine sui pezzi, il Reverb Hit
sulla frase grande, il Cinematic Woosh sull'apertura. I tempi vengono da `src/pb-girarrosto7/voce.json` e dai
fotogrammi di `ReelGirarrosto6.tsx` e `Illustrazioni.tsx`.

Esce `out/pb/reel-girarrosto-v7-mix.mp4`, e con `senza-musica` la versione senza base. Un ffmpeg alla volta.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/reel-girarrosto-v7.mp4")
VOCE = Path("public/pb-girarrosto7/voce.wav")
USCITA = Path("out/pb/reel-girarrosto-v7-mix.mp4")
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

T = json.loads(Path("src/pb-girarrosto7/voce.json").read_text())
DURATA = T["durata"]
SC = {s["id"]: s for s in T["scene"]}
I = {k: SC[k]["inizio"] for k in SC}
fr = lambda k: [round((b["da"] - SC[k]["inizio"]) * 30) for b in SC[k]["blocchi"]]
t = lambda k, f: I[k] + f * F  # un fotogramma di una scena, in secondi
B = {k: fr(k) for k in SC}
nTel = round((I["foglio"] - I["telefono"]) * 30)
GIALLO, ARANCIONE, VERDE = nTel + B["foglio"][0], nTel + B["foglio"][1], nTel + B["foglio"][2]
FINE_F = nTel + round((I["fila"] - I["foglio"]) * 30)
GRANDE = t("servizio", B["servizio"][2])
CTA, CHIAVE = T["cta"]["da"], T["cta"]["chiave"]
PASSATE = [b["da"] for s in T["scene"] for b in s["blocchi"] if "chiave" in b and b["da"] < GRANDE]
fila = B["fila"]
arrivo_fila = lambda i: 2 + i * 6 if i < 4 else fila[1] + round((i - 4) * ((fila[2] + 14 - fila[1]) / 16))
pronto = B["pronto"]
sch = B["schede"]

EVENTI = [
    # 1 · l'apertura
    (0.0, CINEMATIC, -12, 0, None, 0, 0.0, 0.3),
    (0.05, COLPO, -18, 0, None, 0, 0.0, 0.8),
    (0.40 + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
    (62 * F - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (124 * F - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    # 2 · il telefono e il foglio
    (I["telefono"] - 0.55, WOOSH, -15, 0, None, 0, 0.0, 0.1),
    (I["telefono"] + 0.05, NEXTEL, -14, 0, None, 0, 0.0, 0.05),
    (I["telefono"] + 0.62, NEXTEL, -16, 0, None, 0, 0.0, 0.05),
    (t("telefono", B["telefono"][1]), PENNA_LENTA, -19, 1.12, 18 * F, 0, 0.03, 0.1),
    (t("telefono", B["telefono"][1] + 16), PENNA_LENTA, -18, 4.0, 22 * F, 0, 0.03, 0.1),
    (t("telefono", B["telefono"][2]) - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (I["foglio"] - 0.25, WOOSH_CORTO, -18, 0, None, -2, 0.0, 0.05),
    *[(I["telefono"] + f * F - 0.13, WHOOSH_SCATTO, -22, 0, None, 0, 0.0, 0.05) for f in (GIALLO, ARANCIONE, VERDE)],
    *[(I["telefono"] + f * F, PASSATA, -22, 0, None, -3, 0.0, 0.02) for f in (GIALLO + 8, ARANCIONE + 6, VERDE + 6)],
    # 3 · la fila: i biglietti che arrivano uno dopo l'altro
    (I["fila"] - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    *[(t("fila", arrivo_fila(i)) - 0.11, OPEN_UI, -24, 0, None, (i % 5), 0.0, 0.05) for i in range(0, 20, 2)],
    # 4 · i conti a mente
    (I["conti"] - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (I["conti"] + 2 * F, COUNTER, -15, 0, None, 0, 0.0, 0.1),
    (I["conti"] + 26 * F - 0.12, REVERB, -20, 0, None, 0, 0.0, 0.4),
    # 5 · «Il mio è pronto?» e i fogli che volano
    (I["pronto"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (I["pronto"] + 0.02, OPEN_UI, -16, 0, None, 0, 0.0, 0.05),
    *[(t("pronto", f), CARTA, -18, 0, None, k, 0.0, 0.08) for k, f in enumerate([pronto[1] + 4, pronto[1] + 16, pronto[1] + 25, pronto[2] + 2, pronto[2] + 9, pronto[2] + 15])],
    # 6 · si cancella e si riscrive
    (I["cambia"] - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (t("cambia", B["cambia"][1]), PENNA_LENTA, -16, 2.0, 12 * F, 0, 0.0, 0.08),
    (t("cambia", B["cambia"][1]) - 0.1, NEGATIVO, -21, 0, None, 0, 0.0, 0.1),
    (t("cambia", B["cambia"][2] + 8), PENNA_LENTA, -18, 4.0, 16 * F, 0, 0.03, 0.1),
    # 7 · i pezzi, a mente
    (I["pezzi"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("pezzi", 54) - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),
    # 8 · il gestionale del secolo, che si riempie e poi va via
    (I["secolo"] - 0.6, GLITCH, -19, 0, None, 0, 0.0, 0.2),
    (I["secolo"] + 0.1, DATA_LOADING := "caricamento/Data Loading.wav", -22, 0, 1.6, 0, 0.05, 0.3),
    (I["arrivo"] - 0.4 - 0.13, WHOOSH_SCATTO, -18, 0, None, -3, 0.0, 0.05),
    # 9 · sono andato lì
    (I["arrivo"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("arrivo", B["arrivo"][1]) - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),
    (t("arrivo", B["arrivo"][2]) - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    # 10 · l'app: le schede, il colpo su «più veloce», il conto che si fa da solo
    (I["schede"] - 0.98, RISER, -18, 0, None, 0, 0.0, 0.02),
    (I["schede"] - 0.37, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),
    *[(t("schede", 6 + i * 6) - 0.17, POP, -17, 0, None, i * 2, 0.0, 0.05) for i in range(4)],
    (t("schede", sch[2]) - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    (t("schede", sch[2] + 14) - 0.58, WHOOSH_SOTTILE, -20, 0, None, 0, 0.0, 0.1),
    (t("schede", sch[2] + 18), TYPING, -18, 0, 0.62, 0, 0.0, 0.1),
    (t("schede", sch[4] + 18) - 0.18, SUCCESS, -13, 0, None, 0, 0.0, 0.2),
    (t("schede", sch[4] + 22) - 0.16, CLICK, -19, 0, None, 0, 0.0, 0.05),
    # 11 · la ricerca
    (I["cerca"] - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (I["cerca"] + 0.02, OPEN_UI, -16, 0, None, 0, 0.0, 0.05),
    (t("cerca", B["cerca"][1]), TYPING, -17, 0, 0.5, 0, 0.0, 0.1),
    (t("cerca", B["cerca"][2]) - 0.37, SCAN, -21, 0, None, 0, 0.0, 0.1),
    (t("cerca", B["cerca"][2] + 6), APPROVE, -16, 0, None, 0, 0.0, 0.2),
    # 12 · modifica
    (I["modifica"] - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (t("modifica", B["modifica"][1] + 6) - 0.16, CLICK, -14, 0, None, 0, 0.0, 0.05),
    (t("modifica", B["modifica"][1] + 12), COUNTER, -21, 0, 0.5, 4, 0.0, 0.1),
    (t("modifica", B["modifica"][2] + 4) - 0.18, SUCCESS, -16, 0, None, 2, 0.0, 0.2),
    # 13 · l'iPad e i pezzi
    (I["ipad"] - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (t("ipad", B["ipad"][1]) - 0.16, CLICK, -15, 0, None, 0, 0.0, 0.05),
    (t("ipad", B["ipad"][2]) - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (t("ipad", B["ipad"][2]) + 0.05 - 0.40, SHINE, -18, 0, None, 0, 0.0, 0.3),
    *[(t("ipad", B["ipad"][2] + 3 + i * 4), POP_MORBIDO, -20, 0, None, i, 0.0, 0.05) for i in range(4)],
    # 14 · il prezzo che cambia anche sul sito
    (I["prezzo"] - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (t("prezzo", B["prezzo"][0] + 14), TYPING, -19, 0, 0.3, 0, 0.0, 0.08),
    (t("prezzo", B["prezzo"][1] - 2), WOOSH_MINI, -18, 0, None, 0, 0.0, 0.1),
    (t("prezzo", B["prezzo"][1] + 14) - 0.4, SHINE, -17, 0, None, 2, 0.0, 0.3),
    # 15 · Marco ai polli, la frase grande, la CTA
    (I["servizio"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("servizio", B["servizio"][1]) - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),
    (GRANDE - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (GRANDE - 0.04, REVERB, -14, 0, None, 0, 0.0, 0.5),
    (GRANDE + 11 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
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
DROP = 30.55  # il drop della phonk (libreria-suoni.md): cade su «Poi gli ho costruito un'app»


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
    f = Path("cache/pb-girarrosto7/misura.f32")
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
    parte = DROP - I["schede"]  # il secondo del brano che suona a inizio reel
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
    Path("cache/pb-girarrosto7").mkdir(parents=True, exist_ok=True)
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
    grezzo = Path("cache/pb-girarrosto7/suono-voce.f32")
    grezzo.write_bytes(mix.astype(np.float32).tobytes())
    wav = Path("cache/pb-girarrosto7/suono-voce.wav")
    # nessuna normalizzazione del mix: la voce resta dov'è, e il limitatore tiene i picchi sotto −1 dB
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

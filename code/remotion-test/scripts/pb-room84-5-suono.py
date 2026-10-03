"""Il suono della v5 del reel di Room84 (03/10/2026), sul metodo del Girarrosto v7: la voce nuova, gli effetti sui tagli e sulle animazioni, e la
base phonk bassa sotto, più la versione senza base («gli audio li metto io in base al social»).

Il metodo e i livelli sono quelli della v5, in `scripts/pb-girarrosto-suono.py`, da cui vengono le funzioni. Cambiano
i punti: la v6 taglia ogni due secondi, quindi c'è un fruscio corto su ogni stacco, e usa gli effetti entrati in
libreria il 03/10/2026 dai TikTok che ha salvato Emanuele (docs/video-social/libreria-suoni.md): il Nextel sul
telefono che squilla, il Counter sul contatore dei 120, il Success UI sul totale, la Shine sui pezzi, il Reverb Hit
sulla frase grande, il Cinematic Woosh sull'apertura. I tempi vengono da `src/pb-room84-5/voce.json` e dai
fotogrammi di `ReelGirarrosto6.tsx` e `Illustrazioni.tsx`.

Esce `out/pb/reel-room84-v5-mix.mp4`, e con `senza-musica` la versione senza base. Un ffmpeg alla volta.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/reel-room84-v5.mp4")
VOCE = Path("public/pb-room84-5/voce.wav")
USCITA = Path("out/pb/reel-room84-v5-mix.mp4")
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

T = json.loads(Path("src/pb-room84-5/voce.json").read_text())
DURATA = T["durata"]
SC = {s["id"]: s for s in T["scene"]}
I = {k: SC[k]["inizio"] for k in SC}
fr = lambda k: [round((b["da"] - SC[k]["inizio"]) * 30) for b in SC[k]["blocchi"]]
t = lambda k, f: I[k] + f * F
B = {k: fr(k) for k in SC}
CTA, CHIAVE = T["cta"]["da"], T["cta"]["chiave"]
PURE = t("finale", B["finale"][2])
NASCOSTI = [(t("prima", B["prima"][2]), I["domande"]), (t("risultato", B["risultato"][2]), I["chiavi"]), (PURE, CTA)]
PASSATE = [b["da"] for s in T["scene"] for b in s["blocchi"] if "chiave" in b and not any(a <= b["da"] < z for a, z in NASCOSTI)]

EVENTI = [
    # 1 · l'apertura: il titolo col colpo, e i due stacchi sulla sauna e sulla vasca
    (0.0, CINEMATIC, -12, 0, None, 0, 0.0, 0.3),
    (0.05, COLPO, -18, 0, None, 0, 0.0, 0.8),
    (0.40 + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
    (t("apertura", B["apertura"][2]) - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (t("apertura", B["apertura"][3]) - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    # 2 · il sito di prima, e lo zoom sulla scritta
    (I["prima"] - 0.55, WOOSH, -15, 0, None, 0, 0.0, 0.1),
    (t("prima", B["prima"][2] - 6) - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    # 3 · le tre domande
    (I["domande"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    *[(t("domande", B["domande"][2] + 4 + i * 5) - 0.11, OPEN_UI, -19, 0, None, i * 2, 0.0, 0.05) for i in range(3)],
    *[(t("domande", B["domande"][3 + i]) - 0.16, CLICK, -18, 0, None, i, 0.0, 0.05) for i in range(3)],
    # 4 · carta e penna, poi il foglio che si disegna
    (I["carta"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("carta", B["carta"][1]) - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    (I["foglio"], CARTA, -14, 0, None, 0, 0.0, 0.1),
    *[(t("foglio", f), PENNA_LENTA, -19, 1.12 + k * 1.3, 0.55, 0, 0.03, 0.1) for k, f in enumerate([B["foglio"][0] + 4, B["foglio"][2] + 2, B["foglio"][3], B["foglio"][4]])],
    # 5 · il risultato: la salita, il foglio che diventa telefono, il sito che si accende, il computer, il confronto
    (I["risultato"] - 0.98, RISER, -17, 0, None, 0, 0.0, 0.02),
    (I["risultato"] - 0.37, WHOOSH_MORBIDO, -13, 0, None, 0, 0.0, 0.2),
    (t("risultato", 12) - 0.40, SHINE, -15, 0, None, 0, 0.0, 0.3),
    (t("risultato", 20) - 0.25, WOOSH_CORTO, -19, 0, None, 0, 0.0, 0.05),
    (t("risultato", B["risultato"][1] - 4) - 0.55, WOOSH, -17, 0, None, 0, 0.0, 0.1),
    (t("risultato", B["risultato"][2]) - 0.13, WHOOSH_SCATTO, -20, 0, None, 0, 0.0, 0.05),
    # 6 · le chiavi, e i due video che escono
    (I["chiavi"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("chiavi", B["chiavi"][1] - 4) - 0.13, WHOOSH_SCATTO, -20, 0, None, 0, 0.0, 0.05),
    *[(t("chiavi", B["chiavi"][2] + i * 5) - 0.17, POP, -17, 0, None, i * 3, 0.0, 0.05) for i in range(2)],
    # 7 · il calendario: due tocchi, e le notti libere
    (I["date"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("date", B["date"][0] + 6) - 0.16, CLICK, -15, 0, None, 0, 0.0, 0.05),
    (t("date", B["date"][1] + 4) - 0.16, CLICK, -15, 0, None, 2, 0.0, 0.05),
    (t("date", B["date"][2]) - 0.16, GLIMMER, -16, 0, None, 0, 0.0, 0.3),
    # 8 · Booking che passa il calendario al sito, e il foglietto cancellato
    (I["booking"] - 0.55, WOOSH, -15, 0, None, 0, 0.0, 0.1),
    (I["booking"] + 0.05, OPEN_UI, -18, 0, None, 0, 0.0, 0.05),
    (t("booking", B["booking"][0] + 10), WOOSH_MINI, -18, 0, None, 0, 0.0, 0.1),
    (t("booking", B["booking"][0] + 22), DATA_LOADING := "caricamento/Data Loading.wav", -22, 0, 0.7, 0, 0.05, 0.2),
    (t("booking", B["booking"][2] - 4) - 0.11, OPEN_UI, -18, 0, None, -2, 0.0, 0.05),
    (t("booking", B["booking"][2] + 10), PENNA_LENTA, -16, 2.0, 0.4, 0, 0.0, 0.08),
    # 9 · WhatsApp: il tocco, la chat, il messaggio già scritto
    (I["whatsapp"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("whatsapp", B["whatsapp"][1] + 4) - 0.16, CLICK, -14, 0, None, 0, 0.0, 0.05),
    (t("whatsapp", B["whatsapp"][1] + 8), WOOSH_MINI, -18, 0, None, 0, 0.0, 0.1),
    (t("whatsapp", B["whatsapp"][1] + 16), TYPING, -19, 0, 0.95, 0, 0.0, 0.1),
    (t("whatsapp", B["whatsapp"][3] + 10), NEXTEL, -22, 0, None, 5, 0.0, 0.05),
    # 10 · Booking con le date già messe
    (I["prezzo"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (t("prezzo", B["prezzo"][1] + 2) - 0.16, CLICK, -14, 0, None, 0, 0.0, 0.05),
    (t("prezzo", B["prezzo"][1] + 6), WOOSH_MINI, -18, 0, None, 2, 0.0, 0.1),
    *[(t("prezzo", B["prezzo"][2] + i * 5) - 0.18, SUCCESS, -21, 0, None, i * 2, 0.0, 0.1) for i in range(3)],
    # 11 · le recensioni: il numero che sale a 9,8
    (I["recensioni"] - 0.55, WOOSH, -15, 0, None, 0, 0.0, 0.1),
    (t("recensioni", B["recensioni"][2]), COUNTER, -16, 0, None, 0, 0.0, 0.1),
    (t("recensioni", B["recensioni"][2] + 20) - 0.12, REVERB, -18, 0, None, 0, 0.0, 0.4),
    # 12 · la vasca di sera, «Mo' pure il sito», la CTA
    (I["finale"] - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (PURE - 0.37, WHOOSH_MORBIDO, -14, 0, None, 0, 0.0, 0.2),
    (PURE - 0.04, REVERB, -15, 0, None, 0, 0.0, 0.5),
    (PURE + 11 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),
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
DROP = 30.55  # il drop della phonk (libreria-suoni.md): cade su «Ecco il risultato»


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
    f = Path("cache/pb-room84-5/misura.f32")
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
    parte = DROP - I["risultato"]  # il secondo del brano che suona a inizio reel
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
    Path("cache/pb-room84-5").mkdir(parents=True, exist_ok=True)
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
    grezzo = Path("cache/pb-room84-5/suono-voce.f32")
    grezzo.write_bytes(mix.astype(np.float32).tobytes())
    wav = Path("cache/pb-room84-5/suono-voce.wav")
    # nessuna normalizzazione del mix: la voce resta dov'è, e il limitatore tiene i picchi sotto −1 dB
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

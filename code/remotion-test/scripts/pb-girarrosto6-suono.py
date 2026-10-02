"""Il suono della v6 del reel del Girarrosto (03/10/2026): la voce nuova, gli effetti sui tagli e sulle animazioni, e la
base phonk bassa sotto, più la versione senza base («gli audio li metto io in base al social»).

Il metodo e i livelli sono quelli della v5, in `scripts/pb-girarrosto-suono.py`, da cui vengono le funzioni. Cambiano
i punti: la v6 taglia ogni due secondi, quindi c'è un fruscio corto su ogni stacco, e usa gli effetti entrati in
libreria il 03/10/2026 dai TikTok che ha salvato Emanuele (docs/video-social/libreria-suoni.md): il Nextel sul
telefono che squilla, il Counter sul contatore dei 120, il Success UI sul totale, la Shine sui pezzi, il Reverb Hit
sulla frase grande, il Cinematic Woosh sull'apertura. I tempi vengono da `src/pb-girarrosto6/voce.json` e dai
fotogrammi di `ReelGirarrosto6.tsx` e `Illustrazioni.tsx`.

Esce `out/pb/reel-girarrosto-v6-mix.mp4`, e con `senza-musica` la versione senza base. Un ffmpeg alla volta.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/reel-girarrosto-v6.mp4")
VOCE = Path("public/pb-girarrosto6/voce.wav")
USCITA = Path("out/pb/reel-girarrosto-v6-mix.mp4")
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

T = json.loads(Path("src/pb-girarrosto6/voce.json").read_text())
DURATA = T["durata"]
SC = {s["id"]: s for s in T["scene"]}
AP, TEL, FOG, CON, ARR, SCH, IPD, SER = (SC[k]["inizio"] for k in ("apertura", "telefono", "foglio", "conti", "arrivo", "schede", "ipad", "servizio"))
fr = lambda k: [round((b["da"] - SC[k]["inizio"]) * 30) for b in SC[k]["blocchi"]]
bTel, bFog, bArr, bSch, bIpd, bSer = fr("telefono"), fr("foglio"), fr("arrivo"), fr("schede"), fr("ipad"), fr("servizio")
nTel = round((FOG - TEL) * 30)
# il foglio (FoglioChiaro): frame dall'inizio del telefono
GIALLO, ARANCIONE, VERDE, FINE_F = nTel + bFog[0], nTel + bFog[2], nTel + bFog[4], nTel + round((CON - FOG) * 30)
CONTATORE = CON + 24 * F
TOTALI = IPD + bIpd[2] * F
GRANDE = SER + bSer[2] * F  # «e ai conti ci pensa l'applicazione», scritto grande
CTA, CHIAVE = T["cta"]["da"], T["cta"]["chiave"]
# le passate dei sottotitoli, dove i sottotitoli si vedono
PASSATE = [b["da"] for s in T["scene"] for b in s["blocchi"] if "chiave" in b and TEL <= b["da"] < GRANDE]

EVENTI = [
    # 1 · l'apertura: il titolo grande entra col colpo, poi due stacchi
    (0.0, CINEMATIC, -12, 0, None, 0, 0.0, 0.3),
    (0.05, COLPO, -18, 0, None, 0, 0.0, 0.8),
    (0.40 + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),  # «su un foglio»
    (69 * F - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (138 * F - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    # 2 · il telefono squilla, il foglio in chiaro, l'evidenziatore vero, i colori
    (TEL - 0.55, WOOSH, -15, 0, None, 0, 0.0, 0.1),
    (TEL + 0.05, NEXTEL, -14, 0, None, 0, 0.0, 0.05),
    (TEL + 0.62, NEXTEL, -16, 0, None, 0, 0.0, 0.05),
    (TEL + bTel[1] * F, PENNA_LENTA, -19, 1.12, 18 * F, 0, 0.03, 0.1),  # il cognome
    (TEL + (bTel[1] + 16) * F, PENNA_LENTA, -18, 4.0, 22 * F, 0, 0.03, 0.1),  # l'ordine
    (TEL + bTel[1] * F - 0.13, WHOOSH_SCATTO, -23, 0, None, 0, 0.0, 0.05),  # la camera si avvicina
    (TEL + bTel[2] * F - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),  # l'evidenziatore vero
    (FOG - 0.25, WOOSH_CORTO, -18, 0, None, -2, 0.0, 0.05),  # di nuovo il foglio
    *[(TEL + f * F - 0.13, WHOOSH_SCATTO, -22, 0, None, 0, 0.0, 0.05) for f in (GIALLO, ARANCIONE, VERDE, FINE_F - 18)],
    *[(TEL + f * F, PASSATA, -22, 0, None, -3, 0.0, 0.02) for f in (GIALLO + 8, ARANCIONE + 6, VERDE + 6, FINE_F - 14, FINE_F - 9)],
    # 3 · i conti a mente: il telefono vero, poi il contatore
    (CON - 0.13, WHOOSH_SCATTO, -20, 0, None, 0, 0.0, 0.05),
    (CONTATORE - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (CONTATORE + 2 * F, COUNTER, -15, 0, None, 0, 0.0, 0.1),
    (CONTATORE + 26 * F - 0.12, REVERB, -20, 0, None, 0, 0.0, 0.4),  # il 120
    # 4 · l'arrivo, lo spiedo, il foglio
    (ARR - 0.55, WOOSH, -16, 0, None, 0, 0.0, 0.1),
    (ARR + bArr[1] * F - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),
    (ARR + bArr[2] * F - 0.25, WOOSH_CORTO, -18, 0, None, 0, 0.0, 0.05),
    (ARR + bArr[4] * F - 0.25, WOOSH_CORTO, -18, 0, None, 2, 0.0, 0.05),
    # 5 · l'app: la salita, le schede, il colpo su «più veloce», l'ordine, il totale, il bottone
    (SCH - 0.98, RISER, -18, 0, None, 0, 0.0, 0.02),
    (SCH - 0.37, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),
    *[(SCH + (6 + i * 6) * F - 0.17, POP, -17, 0, None, i * 2, 0.0, 0.05) for i in range(4)],
    (SCH + bSch[3] * F - 0.13, WHOOSH_SCATTO, -19, 0, None, 0, 0.0, 0.05),
    (SCH + bSch[4] * F - 0.58, WHOOSH_SOTTILE, -20, 0, None, 0, 0.0, 0.1),
    (SCH + (bSch[4] + 4) * F, TYPING, -18, 0, 0.62, 0, 0.0, 0.1),
    (SCH + (bSch[5] + 18) * F - 0.18, SUCCESS, -13, 0, None, 0, 0.0, 0.2),  # il totale arriva a 29
    (SCH + (bSch[6] + 6) * F - 0.16, CLICK, -19, 0, None, 0, 0.0, 0.05),  # CONSEGNATO
    # 6 · un tocco sull'iPad vero, poi i pezzi
    (IPD - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (IPD + 0.10, CLICK, -15, 0, None, 0, 0.0, 0.05),
    (TOTALI - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (TOTALI + 0.05 - 0.40, SHINE, -18, 0, None, 0, 0.0, 0.3),
    *[(TOTALI + (3 + i * 4) * F, POP_MORBIDO, -20, 0, None, i, 0.0, 0.05) for i in range(4)],
    # 7 · Marco ai polli, la frase grande, la CTA su due inquadrature
    (SER - 0.25, WOOSH_CORTO, -17, 0, None, 0, 0.0, 0.05),
    (SER + bSer[1] * F - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),
    (GRANDE - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (GRANDE - 0.04, REVERB, -14, 0, None, 0, 0.0, 0.5),
    (GRANDE + 9 * F + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),  # «ci pensa l'app»
    (CTA - 0.08, COLPO, -20, 0, None, 0, 0.0, 0.8),
    (GRANDE + 4.0 - 0.25, WOOSH_CORTO, -19, 0, None, 0, 0.0, 0.05),  # lo spiedo sotto la CTA
    *[(t + 2 * F, PASSATA, -18, 0, None, 0, 0.0, 0.02) for t in PASSATE],
    (CHIAVE + 2 * F, PASSATA, -17, 0, None, 0, 0.0, 0.02),  # «Mandagli questo video»
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
    f = Path("cache/pb-girarrosto6/misura.f32")
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
    parte = DROP - SCH  # il secondo del brano che suona a inizio reel
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
    Path("cache/pb-girarrosto6").mkdir(parents=True, exist_ok=True)
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
    grezzo = Path("cache/pb-girarrosto6/suono-voce.f32")
    grezzo.write_bytes(mix.astype(np.float32).tobytes())
    wav = Path("cache/pb-girarrosto6/suono-voce.wav")
    # nessuna normalizzazione del mix: la voce resta dov'è, e il limitatore tiene i picchi sotto −1 dB
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

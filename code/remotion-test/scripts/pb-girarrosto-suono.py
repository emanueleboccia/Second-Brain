"""Il suono del reel del Girarrosto (30/09/2026): gli effetti sulle animazioni, e nessuna musica.

Emanuele, lo stesso giorno, sul reel di Room84: «fai solo effetti allora, gli audio li metto io in base al social e
i suoni di tendenza». Quindi il file esce con la voce e gli effetti, e la base la sceglie lui dentro ogni social. La
prima prova, sulla v2 muta coi tempi stimati, sta sull'SSD come `reel-girarrosto-v2-effetti.mp4`; da quando c'è la sua
voce i tempi si leggono da `src/pb-girarrosto/voce.json`, e il video è il render di `PbGirarrosto`.

Il metodo è quello di `scripts/pb-room84-suono.py`, da cui vengono le funzioni: i suoni stanno sui punti di
sincronia, cioè i cambi di scena, gli zoom a scatto, le parole sulla passata e i momenti delle illustrazioni. I
tempi vengono da `voce.json` e dai fotogrammi di `Illustrazioni.tsx`. Gli effetti si abbassano da soli sotto la voce,
come la musica sotto gli effetti in Room84: una parola non si copre mai. Per non ripetere Room84 alla lettera, dove si
può il file è un altro dello stesso tipo: il ding, il colpo finale, la chiusura sul sub.

Esce `out/pb/reel-girarrosto-v5-mix.mp4` (la v4 era sul primo copione): voce, effetti e una base phonk bassa sotto (i livelli sono spiegati sopra `main`). Un ffmpeg alla volta, a bassa priorità.
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
VIDEO = Path("out/pb/reel-girarrosto-v5.mp4")
VOCE = Path("public/pb-girarrosto/voce.wav")
USCITA = Path("out/pb/reel-girarrosto-v5-mix.mp4")
SR = 48000
F = 1 / 30  # un fotogramma

# accanto a ogni file, dove cade il colmo (misurato il 30/09), per anticiparlo
WHOOSH_MORBIDO = "whoosh/sdanezis-soft-luxury-air-whoosh-8-592506.mp3"  # colmo 0,37
WHOOSH_SOTTILE = "whoosh/universfield-thin-swoosh-352756.mp3"  # colmo 0,58
WHOOSH_LENTO = "whoosh/universfield-slow-swoosh-567191.mp3"  # colmo 1,35
WHOOSH_SCATTO = "whoosh/universfield-fast-swoosh-383967.mp3"  # colmo 0,13, per gli zoom a scatto
WHOOSH_SECCO = "whoosh/universfield-swoosh-026-454861.mp3"  # colmo 0,29
CARTA = "carta/oxidvideos-paper-slide-short-478835.mp3"
PENNA = "penna/freesound_community-026204_fast-writing-pen-to-paper-62247.mp3"
PENNA_LENTA = "penna/freesound_community-pen-writing-on-paper-71212.mp3"  # il tratto parte a 1,12
NOTIFICA = "notifica/dragon-studio-notification-sound-effect-372475.mp3"  # colmo 0,06
OROLOGIO = "orologio/dragon-studio-clock-ticking-down-376897.mp3"
POP = "pop/dragon-studio-clean-minimal-pop-467466.mp3"  # colmo 0,17
POP_MORBIDO = "pop/abhicreates-soft-subtle-ui-pop-sfx-348820.mp3"
TASTIERA = "tastiera/soundreality-keyboard-typing-sfx-525007.mp3"
DING = "campanella/freesound_community-ding-101492.mp3"  # colmo 0,12
CLICK = "click/universfield-computer-mouse-click-352734.mp3"  # colmo 0,16
RISER = "riser/koiroylers-small-riser-351977.mp3"  # colmo 0,98
SCINTILLA = "scintilla/koiroylers-sparkle-355937.mp3"  # colmo 0,33
PASSATA = "swipe/driken5482-swipe-236674.mp3"
COLPO = "boom/universfield-cinematic-impact-boom-03-294435.mp3"

# I tempi del reel, in secondi, dalla voce: dove comincia ogni scena e ogni blocco
T = json.loads(Path("src/pb-girarrosto/voce.json").read_text())
DURATA = T["durata"]
SC = {s["id"]: s for s in T["scene"]}
POV, FOGLIO, TELEFONO, ARRIVO, SCHEDE, IPAD, SERVIZIO = (SC[k]["inizio"] for k in ("foglio-pov", "foglio", "telefono", "arrivo", "schede", "ipad", "servizio"))
TOTALI = IPAD + 81 * (1 / 30)  # dopo lo spezzone dell'iPad, 81 fotogrammi, i pezzi da preparare
FINALE = SC["servizio"]["fineVoce"]
blocco = lambda k, i: SC[k]["blocchi"][i]["da"]
locali = lambda k: [round((b["da"] - SC[k]["inizio"]) * 30) for b in SC[k]["blocchi"]]
# le parole sulla passata; la passata entra due fotogrammi dopo il blocco
PASSATE = [b["da"] for s in T["scene"] for b in s["blocchi"] if "chiave" in b]
# il foglio disegnato (Illustrazioni.tsx, Foglio): i blocchi del testo cadono a questi fotogrammi della scena
B_FOGLIO = locali("foglio")
EVIDENZIATORE = [B_FOGLIO[4] + 3, B_FOGLIO[5] + 3, B_FOGLIO[6] + 3, B_FOGLIO[6] + 16, B_FOGLIO[6] + 22]
# le schede dell'app (Schede): i blocchi della scena, le quattro schede che compaiono, la prima che viene avanti
B_SCHEDE = locali("schede")
# gli zoom a scatto della soggettiva (ReelGirarrosto.tsx)
ZOOM = [blocco("foglio-pov", 3), TELEFONO + (round((SC["arrivo"]["inizio"] - TELEFONO) * 30) - 44) / 30, blocco("arrivo", 2)]

# evento: (secondo, file, dB, da dove nel file, quanto dura, semitoni, dissolvenza in, dissolvenza out)
EVENTI = [
    # 1 · il foglio vero, dai Ray-Ban
    (POV, WHOOSH_MORBIDO, -10, 0, None, 0, 0.0, 0.2),
    (ZOOM[0] - 0.13, WHOOSH_SCATTO, -20, 0, None, 0, 0.0, 0.05),  # lo zoom a scatto su «un foglio e gli»
    # 2 · il foglio disegnato: entra, il telefono squilla, si scrive, passa l'evidenziatore
    (FOGLIO - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (FOGLIO, CARTA, -12, 0, None, 0, 0.0, 0.1),
    (FOGLIO + 0.10 - 0.06, NOTIFICA, -17, 0, None, 0, 0.0, 0.2),  # «Il cliente chiama»
    (FOGLIO + 0.55 - 0.06, NOTIFICA, -19, 0, None, 0, 0.0, 0.2),
    (FOGLIO + B_FOGLIO[1] * F, PENNA_LENTA, -19, 1.12, 26 * F, 0, 0.03, 0.12),  # il cognome
    (FOGLIO + B_FOGLIO[2] * F, PENNA_LENTA, -18, 4.0, 24 * F, 0, 0.03, 0.12),  # l'ordine
    (FOGLIO + B_FOGLIO[3] * F, PENNA, -19, 1.5, 1.25, 0, 0.04, 0.2),  # le altre righe, veloci
    *[(FOGLIO + t * F, PASSATA, -24, 0, None, -3, 0.0, 0.02) for t in EVIDENZIATORE],  # l'evidenziatore, più grave
    # 3 · il telefono: venti persone in fila e il conto a mente
    (TELEFONO - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (blocco("telefono", 1), OROLOGIO, -25, 0.1, ARRIVO - blocco("telefono", 1) - 0.1, 0, 0.4, 0.5),  # dal «in fila» al «a mente»
    (ZOOM[1] - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),  # il secondo spezzone
    # 4 · l'arrivo al Girarrosto
    (ARRIVO - 1.35, WHOOSH_LENTO, -19, 0, None, 0, 0.3, 0.3),
    (ZOOM[2] - 0.13, WHOOSH_SCATTO, -21, 0, None, 0, 0.0, 0.05),  # lo zoom su «sono andato lì»
    # 5 · l'app: la salita, le schede che compaiono, l'ordine che si scrive, il totale che si conta, il bottone
    (SCHEDE - 0.98, RISER, -18, 0, None, 0, 0.0, 0.02),
    (SCHEDE - 0.37, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),
    *[(SCHEDE + (6 + i * 6) * F - 0.17, POP, -17, 0, None, i * 2, 0.0, 0.05) for i in range(4)],
    (SCHEDE + B_SCHEDE[3] * F - 0.58, WHOOSH_SOTTILE, -20, 0, None, 0, 0.0, 0.1),  # la prima scheda viene avanti
    (SCHEDE + (B_SCHEDE[3] + 4) * F, TASTIERA, -19, 0.4, 0.62, 0, 0.03, 0.12),  # le voci dell'ordine
    (SCHEDE + (B_SCHEDE[4] + 18) * F - 0.12, DING, -13, 0, None, 0, 0.0, 0.3),  # il totale arriva a 29
    (SCHEDE + (B_SCHEDE[5] + 6) * F - 0.16, CLICK, -19, 0, None, 0, 0.0, 0.05),  # CONSEGNATO
    # 6 · l'iPad: il tocco, poi i pezzi da preparare
    (IPAD - 0.29, WHOOSH_SECCO, -17, 0, None, 0, 0.0, 0.05),
    (blocco("ipad", 0) - 0.16, CLICK, -15, 0, None, 0, 0.0, 0.05),  # «Un solo tocco»
    (TOTALI - 0.37, WHOOSH_MORBIDO, -15, 0, None, 0, 0.0, 0.2),
    (TOTALI + 0.05 - 0.33, SCINTILLA, -24, 0, None, 0, 0.0, 0.4),
    *[(TOTALI + (3 + i * 4) * F, POP_MORBIDO, -20, 0, None, i, 0.0, 0.05) for i in range(4)],
    # 7 · il servizio, e la chiusura
    (SERVIZIO - 0.37, WHOOSH_MORBIDO, -12, 0, None, 0, 0.0, 0.2),
    (FINALE - 0.08, COLPO, -20, 0, None, 0, 0.0, 0.8),  # quando compare la CTA
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
MUSICA = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/musica/alex-morgan-phonk-brazilian-phonk-phonk-music-545509.mp3")
DROP = 30.55  # il drop della phonk (libreria-suoni.md), dopo la pausa da 28,75: cade su «Poi ho fatto un'app»


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
    parte = DROP - SC["schede"]["inizio"]  # il secondo del brano che suona a inizio reel
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
    # nessuna normalizzazione del mix: la voce resta dov'è, e il limitatore tiene i picchi sotto −1 dB
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                    "-i", str(grezzo), "-af", "alimiter=limit=0.8:level=false", "-ar", str(SR), str(wav)], check=True)
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                    "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(uscita)], check=True)
    grezzo.unlink()
    print(uscita)


if __name__ == "__main__":
    main()

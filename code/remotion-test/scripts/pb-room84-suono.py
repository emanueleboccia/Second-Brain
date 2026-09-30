"""Il suono del reel di Room84, versione semplice (30/09/2026): gli effetti sulle animazioni e la musica sotto.

Emanuele: «innanzitutto un bel sound design alle animazioni che già hai creato, poi magari una canzone in
sottofondo piccola, meno potente». Gli effetti vengono dalla libreria del personal brand sull'SSD,
`04-PERSONAL-BRAND/2-libreria/suoni/`, descritta in `docs/video-social/libreria-suoni.md`; la musica da
`2-libreria/musica/`. Tutto da Pixabay, libero da diritti.

Il metodo è quello dei suoi appunti in `docs/video-social/musica-e-sound-design.md`: i suoni stanno sui punti di
sincronia, cioè i cambi di scena, le parole sulla passata e i momenti delle animazioni; la musica entra su un
punto e si apre su «Ecco il risultato», che è il momento che il video vuole far arrivare; la chiusura è pulita.

Ogni versione della musica esce come `out/pb/room84-semplice-<nome>.mp4`: il video è quello già esportato di
`PbRoom84Semplice`, a cui si sostituisce l'audio. Un ffmpeg alla volta, a bassa priorità.
"""
import subprocess, sys
from pathlib import Path
import numpy as np

SUONI = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/suoni")
MUSICA = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/2-libreria/musica")
VIDEO = Path("out/pb/room84-semplice.mp4")
SR = 48000
DURATA = 26.8

WHOOSH_MORBIDO = "whoosh/sdanezis-soft-luxury-air-whoosh-8-592506.mp3"
WHOOSH_SOTTILE = "whoosh/universfield-thin-swoosh-352756.mp3"
WHOOSH_LENTO = "whoosh/universfield-slow-swoosh-567191.mp3"
ROTELLA = "rotella/zoedit-slow-mouse-wheel-movement-204710.mp3"
PENNA = "penna/freesound_community-026204_fast-writing-pen-to-paper-62247.mp3"
PENNA_POV = "penna/freesound_community-writing-on-paper-29376.mp3"
CARTA = "carta/oxidvideos-paper-slide-short-478835.mp3"
CARTA_MANI = "carta/freesound_community-paper-slide-89980.mp3"
POP = "pop/abhicreates-soft-subtle-ui-pop-sfx-348820.mp3"
PASSATA = "swipe/driken5482-swipe-236674.mp3"
SCINTILLA = "scintilla/koiroylers-sparkle-355937.mp3"
COLPO = "boom/universfield-cinematic-impact-boom-05-352465.mp3"
# i suoni più riconoscibili del momento, chiesti da Emanuele il 30/09: «utilizza anche altri effetti, quelli più
# famosi del momento». Accanto a ogni evento, dove cade il colmo del file (misurato), per anticiparlo.
CLICK = "click/universfield-computer-mouse-click-352734.mp3"  # colmo 0,16
RIAVVOLGI = "riavvolgimento/chrysalyn-cyberpunk-glitch-rewind-sfx-540234.mp3"  # finisce a 1,81
DING = "campanella/dragon-studio-ding-402325.mp3"  # colmo 0,06
NOTIFICA = "notifica/universfield-new-notification-051-494246.mp3"  # colmo 0,23
TASTIERA = "tastiera/dragon-studio-keyboard-typing-sound-effect-335503.mp3"
RISER = "riser/brvhrtz-short-sweep-01-brvhrtz-224283.mp3"  # sale e si ferma sul colmo a 2,60
SCATTO = "scatto/freesound_community-camera-shutter-6305.mp3"  # colmo 0,13

# I tempi delle animazioni, dalla composizione (src/pb-room84/Semplice.tsx)
FOGLIO = 6.0
DISEGNO = [0.1, 0.35, 2.0, 2.9, 3.4, 4.8, 5.15, 6.85, 7.2]  # quando si disegna ogni blocco
SITO = 15.6
PIENI = [0.15 + i * 0.27 for i in range(9)]  # quando ogni blocco diventa sito
PASSATE = [4.6, 10.0, 15.65, 18.5]  # le parole sulla passata; la passata entra 2 fotogrammi dopo
CHIUSURA = 23.4

# evento: (secondo, file, dB, da dove nel file, quanto dura, semitoni, dissolvenza in, dissolvenza out)
EVENTI = [
    (0.00, WHOOSH_MORBIDO, -10, 0, None, 0, 0.0, 0.2),
    (0.30 - 0.16, CLICK, -21, 0, None, 0, 0.0, 0.05),  # il clic prima di scorrere il sito vecchio
    (0.35, ROTELLA, -24, 0.3, 2.9, 0, 0.15, 0.4),
    # «Prima di rifarlo»: si riavvolge fino al foglio bianco, e il riavvolgimento finisce sul taglio
    (3.40 - 1.5, RIAVVOLGI, -15, 0.3, 1.5, 0, 0.05, 0.08),
    (4.62, PENNA_POV, -22, 2.0, 1.3, 0, 0.05, 0.25),
    (FOGLIO, CARTA, -11, 0, None, 0, 0.0, 0.1),
    *[(FOGLIO + t, PENNA, -18, 1.5 + i * 3.1, 0.95 if i in (1, 4) else 0.7, 0, 0.04, 0.18) for i, t in enumerate(DISEGNO)],
    (FOGLIO + 8.4 - 1.45, WHOOSH_LENTO, -21, 0.3, 1.6, 0, 0.2, 0.4),
    (14.40, CARTA_MANI, -19, 0, None, 0, 0.0, 0.15),
    (SITO - 0.37, WHOOSH_MORBIDO, -17, 0, None, 0, 0.0, 0.2),
    *[(SITO + t, POP, -15, 0, None, i, 0.0, 0.05) for i, t in enumerate(PIENI)],
    (18.40 - 0.37, WHOOSH_MORBIDO, -11, 0, None, 0, 0.0, 0.2),
    (18.50 - 0.33, SCINTILLA, -25, 0, None, 0, 0.0, 0.5),
    (18.4 - 2.60, RISER, -17, 0, None, 0, 0.0, 0.02),  # la salita che si ferma su «Ecco il risultato»
    (18.45 - 0.10, SCATTO, -16, 0, None, 0, 0.0, 0.05),  # lo scatto sul sito nuovo
    (18.9 - 0.16, CLICK, -20, 0, None, 0, 0.0, 0.05),
    (10.07 - 0.02, DING, -12, 0, None, 0, 0.0, 0.2),  # «la 8 e la 4»
    (11.15 - 0.10, NOTIFICA, -14, 0, None, 0, 0.0, 0.3),  # «Le recensioni vere»
    (14.45, TASTIERA, -18, 1.0, 1.1, 0, 0.05, 0.2),  # «Da lì nasce il sito»
    (18.90, ROTELLA, -26, 0.3, 4.2, 0, 0.3, 0.6),
    (CHIUSURA - 0.08, COLPO, -20, 0, None, 0, 0.0, 0.6),
    *[(t + 2 / 30, PASSATA, -18, 0, None, 0, 0.0, 0.02) for t in PASSATE],
    (CHIUSURA + 14 / 30, PASSATA, -17, 0, None, 0, 0.0, 0.02),
]

# Le musiche: da dove parte il brano nel reel, e da che secondo del brano. Il punto in cui ogni brano si apre
# cade su «Ecco il risultato», a 18,4 secondi del reel (misurato il 30/09 sull'energia del brano).
# Le prime tre, morbide, Emanuele le ha scartate: «ci vuole un altro tipo di stile, una cosa più ritmica, più
# strong, adatta a me». Queste sono basi ritmate libere da diritti; gli audio di tendenza e i mashup dei social
# invece non si mettono nel file, perché hanno i diritti: si aggiungono dentro Instagram, sopra la versione
# «effetti», che non ha musica.
APERTURA = 18.4
# nome: (file, dove si apre nel brano, quando entra nel reel, livello medio in dB, di quanto può salire dopo)
VERSIONI = {
    "phonk": ("alex-morgan-phonk-brazilian-phonk-phonk-music-545509.mp3", 30.55, 0.0, -17, 6),  # già nel ritmo, pausa, drop
    "trap": ("atlasaudio-trap-beat-590006.mp3", 21.0, 0.0, -17, 6),  # cresce dall'inizio fino al drop
    "tech-house": ("jonasblakewood-tech-house-tech-house-music-557624.mp3", 12.22, 6.18, -17, 6),  # entra col foglio
    "hip-hop": ("the_mountain-hip-hop-hip-hop-beat-576571.mp3", 12.0, 6.4, -17, 6),  # entra col foglio
    "effetti": None,  # senza musica: l'audio di tendenza lo mette Instagram
}


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
        x = x / picco * 10 ** ((db + 2) / 20)  # il dB è il picco dell'effetto, +2 da quando le basi sono più forti
        i = int(t * SR)
        j = min(len(bus), i + len(x))
        bus[i:j] += x[: j - i]
    return bus


def musica(nome):
    if VERSIONI[nome] is None:
        return np.zeros((int(DURATA * SR), 2), dtype=np.float32)
    file, apre, entra, db, salita = VERSIONI[nome]
    x = carica(MUSICA / file)
    parte = apre - (APERTURA - entra)  # il secondo del brano che suona quando il reel è a «entra»
    x = x[int(parte * SR):]
    bus = np.zeros((int(DURATA * SR), 2), dtype=np.float32)
    i = int(entra * SR)
    n = min(len(bus) - i, len(x))
    bus[i:i + n] = x[:n]
    bus = dissolvi(bus, 0, 0)
    # entra in 0,6 secondi, esce negli ultimi 1,2
    a = int(0.6 * SR)
    bus[i:i + a] *= np.linspace(0, 1, a)[:, None]
    b = int(1.2 * SR)
    bus[-b:] *= np.linspace(1, 0, b)[:, None]
    # dopo l'apertura il brano può salire al massimo di «salita» dB sopra l'intro: 3 per le musiche morbide
    # («piccola, meno potente»), 6 per le basi ritmate
    ap = int(APERTURA * SR)
    pre = np.sqrt(np.mean(bus[max(i, ap - int(5 * SR)):ap - int(0.8 * SR)] ** 2)) or 1e-6
    post = np.sqrt(np.mean(bus[ap:ap + int(4 * SR)] ** 2)) or 1e-6
    tetto = pre * 10 ** (salita / 20)
    if post > tetto:
        g = tetto / post
        r = int(0.05 * SR)
        bus[ap:ap + r] *= np.linspace(1, g, r)[:, None]
        bus[ap + r:] *= g
    rms = np.sqrt(np.mean(bus[i:i + n] ** 2)) or 1
    return bus / rms * 10 ** (db / 20)  # «db» è il livello medio del letto, sotto gli effetti


def schiaccia(mus, sfx, fino=8.0):
    """La musica si abbassa da sola quando arriva un effetto, fino a «fino» dB, come un compressore in sidechain:
    con le basi ritmate la campanella e la notifica sparivano sotto il ritmo (misurato il 30/09)."""
    hop = SR // 200  # 5 ms
    n = len(sfx) // hop
    env = np.sqrt(np.mean(sfx[: n * hop].reshape(n, hop, 2) ** 2, axis=(1, 2)))
    liscio = np.zeros(n)
    su, giu = np.exp(-1 / 2), np.exp(-1 / 40)  # sale in 10 ms, scende in 200 ms
    v = 0.0
    for i in range(n):
        v = env[i] + (v - env[i]) * (su if env[i] > v else giu)
        liscio[i] = v
    soglia = 10 ** (-40 / 20)
    quanto = np.clip((20 * np.log10(liscio + 1e-9) + 40) / 25, 0, 1) * fino  # da −40 dB in su, fino a «fino» dB
    g = np.repeat(10 ** (-quanto / 20), hop)
    g = np.concatenate([g, np.full(len(mus) - len(g), g[-1])])[: len(mus)]
    return mus * g[:, None]


def main():
    sfx = effetti()
    for nome in (sys.argv[1:] or VERSIONI):
        mix = sfx + schiaccia(musica(nome), sfx)
        grezzo = Path(f"cache/pb-room84/suono-{nome}.f32")
        grezzo.write_bytes(mix.astype(np.float32).tobytes())
        wav = Path(f"cache/pb-room84/suono-{nome}.wav")
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2",
                        "-i", str(grezzo), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,alimiter=limit=0.79:level=false", "-ar", str(SR), str(wav)], check=True)
        out = Path(f"out/pb/room84-semplice-{nome}.mp4")
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(VIDEO), "-i", str(wav),
                        "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", str(out)], check=True)
        grezzo.unlink()
        print(out)


if __name__ == "__main__":
    main()

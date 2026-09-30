"""La voce del reel di Room84: le frasi che Emanuele ha detto mentre disegnava (29/09/2026).

Non c'è una voce fuori campo registrata a parte: il copione l'ha detto con parole sue, col DJI
attaccato all'iPhone, mentre disegnava. Il campione di prova gli è piaciuto: «procediamo con la
reale». Qui si prendono le frasi scelte in `projects/personal-brand/girato-room84.md` e si
stringono le pause che ha fatto disegnando: ogni silenzio dentro una frase più lungo di SILENZIO
secondi diventa di RESTA secondi. Fra una frase e l'altra la pausa la decide la lista.

Poi la catena della voce (passa-alto, livellamento, compressore, −14 LUFS) e whisper parola per
parola sul risultato, così i sottotitoli partono dai tempi veri.

Scrive `public/pb-room84/voce.wav` (fuori da git), `src/pb-room84/voce.json` con dove cade ogni
frase, e `src/pb-room84/parole.json` con le parole.
"""
import json, subprocess, wave
from pathlib import Path
import numpy as np

GIRATO = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/room84")
CACHE = Path("cache/pb-room84")
OUT = Path("public/pb-room84/voce.wav")
MODELLO = Path("whisper.cpp/ggml-large-v3-turbo.bin")
SR = 48000
SOGLIA_DB, SILENZIO, RESTA, BORDO = -66.0, 0.28, 0.16, 0.012
CATENA = ("highpass=f=85,dynaudnorm=f=200:g=15:p=0.9:m=10,"
          "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=1.6,loudnorm=I=-14:TP=-1.5:LRA=11")

# id, clip, da, a (secondi nella clip), pausa dopo la frase.
# Le pause dopo «pezzo per pezzo» e dopo «Ecco il risultato» sono lo spazio senza voce del foglio che
# diventa sito, e del confronto col finale. Una frase può avere i suoi pezzi scritti a mano: si usano così,
# uniti da PICCOLA secondi, senza cercare i silenzi, e ognuno pareggiato da solo.
# ⚠️ Nel campione del 29/09 «foglio» partiva da 120,12: i primi tre pezzi erano rumori della penna a −66 dB,
# alzati dalla normalizzazione, e la frase vera sta tutta fra 124,3 e 127,05. Prima di fidarsi dei tempi di
# whisper si misura il livello di ogni pezzo.
# «date» (per prenotare all'istante e vedere la disponibilità delle date) è fuori: con lei il reel passava
# i 46 secondi.
PICCOLA = 0.11
FRASI = [
    ("apertura", "IMG_5662.MOV", 11.10, 20.65, 0.3),
    ("foglio", "IMG_5651.MOV", 124.30, 127.05, 0.25),
    ("camere", "IMG_5651.MOV", 169.20, 174.95, 0.3),
    ("recensioni", "IMG_5652.MOV", 82.25, 89.35, 0.35),
    # «pezzo per pezzo» sta alla fine del secondo pezzo, detto di corsa: dopo 154,3 ci sono solo rumori a −57
    # e −66 dB, che whisper leggeva come «per» e «pezzo» e che nella prova del 29/09 erano finiti dentro.
    ("disegnato", "IMG_5652.MOV", 148.35, 154.30, 4.2, [(148.35, 149.99), (150.74, 154.30)]),
    ("risultato", "IMG_5662.MOV", 42.95, 44.75, 6.0),
]


def audio(clip):
    f = CACHE / f"{Path(clip).stem}_48k.wav"
    if not f.exists():
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(GIRATO / clip),
                        "-map", "0:a:0", "-ac", "1", "-ar", str(SR), str(f)], check=True)
    w = wave.open(str(f))
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768


def pareggia(x, bersaglio=-30.0):
    """Porta al livello bersaglio la parte che parla (i blocchi da 10 ms sopra i −55 dB), non il silenzio."""
    hop = SR // 100
    n = len(x) // hop
    if n == 0:
        return x
    r = np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1)) + 1e-9
    voce = r[20 * np.log10(r) > -55]
    if len(voce) == 0:
        return x
    livello = 20 * np.log10(np.sqrt(np.mean(voce ** 2)))
    return x * 10 ** ((bersaglio - livello) / 20)


def stringi(x):
    """Toglie i silenzi lunghi dentro una frase, lasciandone RESTA secondi."""
    hop = SR // 100
    n = len(x) // hop
    db = 20 * np.log10(np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1)) + 1e-9)
    muto = db < SOGLIA_DB
    pezzi, i, inizio = [], 0, 0
    while i < n:
        if muto[i]:
            j = i
            while j < n and muto[j]:
                j += 1
            if (j - i) * 0.01 >= SILENZIO and i > 0 and j < n:
                meta = int(RESTA / 2 * SR)
                pezzi.append(x[inizio: i * hop + meta])
                inizio = j * hop - meta
            i = j
        else:
            i += 1
    pezzi.append(x[inizio:])
    f = int(BORDO * SR)
    for p in pezzi:
        if len(p) > 2 * f:
            p[:f] *= np.linspace(0, 1, f)
            p[-f:] *= np.linspace(1, 0, f)
    return np.concatenate(pezzi)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    sorgenti = {c: audio(c) for c in {f[1] for f in FRASI}}
    tratti, posizioni, t = [], [], 0.0
    for id_, clip, da, a, pausa, *pezzi in FRASI:
        x = sorgenti[clip]
        if pezzi:
            f = int(BORDO * SR)
            parti = []
            for p0, p1 in pezzi[0]:
                p = pareggia(x[int(p0 * SR): int(p1 * SR)].copy())
                p[:f] *= np.linspace(0, 1, f)
                p[-f:] *= np.linspace(1, 0, f)
                parti += [p, np.zeros(int(PICCOLA * SR), dtype=np.float32)]
            s = np.concatenate(parti[:-1])
        else:
            s = pareggia(stringi(x[int(da * SR): int(a * SR)].copy()))
        posizioni.append({"id": id_, "inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti += [s, np.zeros(int(pausa * SR), dtype=np.float32)]
        t += len(s) / SR + pausa
    grezzo = CACHE / "voce-grezza.wav"
    w = wave.open(str(grezzo), "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    w.close()
    # In stereo prima della normalizzazione: una voce mono messa sui due canali, a render finito, suona
    # 3 dB più forte di come la misura il loudnorm in mono (la prova del 29/09 era uscita a −11,5 LUFS).
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)
    Path("src/pb-room84/voce.json").write_text(json.dumps({"durata": round(t, 3), "frasi": posizioni}, indent=2) + "\n")

    # Le parole, dai tempi veri della voce montata.
    w16 = CACHE / "voce-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ar", "16000", str(w16)], check=True)
    subprocess.run(["nice", "-n", "15", "whisper-cli", "-m", str(MODELLO), "-l", "it", "-t", "4", "-mc", "0", "-ml", "1",
                    "-sow", "-ojf", "-of", str(CACHE / "parole"), "-f", str(w16)], check=True, capture_output=True)
    d = json.loads((CACHE / "parole.json").read_text())
    parole = [{"p": s["text"].strip(), "da": s["offsets"]["from"] / 1000, "a": s["offsets"]["to"] / 1000}
              for s in d["transcription"] if s["text"].strip()]
    Path("src/pb-room84/parole.json").write_text(json.dumps(parole, indent=1, ensure_ascii=False) + "\n")
    print(json.dumps(posizioni), "\n", " ".join(f"{p['p']}@{p['da']:.2f}" for p in parole))


if __name__ == "__main__":
    main()

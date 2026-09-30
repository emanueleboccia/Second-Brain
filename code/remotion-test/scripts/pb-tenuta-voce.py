"""La voce del reel sul sito di Tenuta Don Gaetano, registrata da Emanuele il 30/09/2026 sera.

Il copione sta in `projects/personal-brand/reel-lavori-famiglia.md`, e lui l'ha detto a modo suo: «Una nuova location
per eventi, che ospiterà battesimi, comunioni, lauree ed altri eventi importanti», «un sito one page che funge da
vetrina», «Conosci altre location per eventi? Mandagli questo video e fagli vedere il sito». Il file è
`voce reel tenuta don gaetano.aifc`, nella radice dell'SSD. La frase del logo l'ha detta due volte: vale la seconda.

Il metodo è quello di `pb-room84-voce4.py`: le ultime prese in fila con 0,2 secondi fra una frase e l'altra, la catena
della voce, whisper una frase alla volta e i blocchi agganciati alla loro prima parola. Da qui escono i tempi di
`src/pb-tenuta/ReelTenuta.tsx`: le scene (il drone, le foto, il drone, il logo, il sito, WhatsApp, la chiusura) e
dove si muove il telefono. Scrive `public/pb-tenuta/voce.wav` e `src/pb-tenuta/voce.json`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

GIRATO = Path("/Volumes/SSD-MANU")
CACHE = Path("cache/pb-tenuta")
OUT = Path("public/pb-tenuta/voce.wav")
JSON = Path("src/pb-tenuta/voce.json")
SORGENTE = GIRATO / "voce reel tenuta don gaetano.aifc"
SR = gv.SR
PAUSA = 0.2  # «tra una frase e l'altra deve esserci poco tempo, pochissimo»
DENTRO = 0.12  # fra due pezzi della stessa frase
FINE_VOCE = 0.3
TIENI = 1.2  # quanto resta la CTA a schermo dopo l'ultima parola
PIENO = 1.9  # quanto dura almeno la scena in cui il foglio diventa sito: qui i nove blocchi si riempiono in 1,4 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono.
BLOCCHI = [
    ("drone", "Questa è la Tenuta", None), ("drone", "Don Gaetano,", None), ("drone", "una dimora del '700", None),
    ("drone", "a Poggiomarino.", None),
    ("foto", "Una nuova location", None), ("foto", "per eventi,", None), ("foto", "che ospiterà battesimi,", None),
    ("foto", "comunioni, lauree", None), ("foto", "ed altri eventi importanti.", None),
    ("drone2", "È un posto nuovo,", None), ("drone2", "quindi prima di tutto", None), ("drone2", "si deve far conoscere.", "far conoscere"),
    ("logo", "Come prima cosa", None), ("logo", "gli ho dato un nome", None), ("logo", "da riconoscere,", None), ("logo", "il logo.", "il logo"),
    ("sito", "Subito dopo siamo partiti", None), ("sito", "con un sito one page", None), ("sito", "che funge da vetrina,", "vetrina"),
    ("sito", "che mostra la sala,", None), ("sito", "la casa, il giardino", None), ("sito", "e i vari dettagli", None),
    ("sito", "della location.", None),
    ("whatsapp", "Chi lo apre", None), ("whatsapp", "vede il posto com'è", None), ("whatsapp", "e se vuole", None),
    ("whatsapp", "maggiori informazioni", None), ("whatsapp", "contatta su WhatsApp.", "WhatsApp"),
    ("cta", "Conosci altre location per eventi?", None), ("cta", "Mandagli questo video", None), ("cta", "e fagli vedere il sito.", None),
]

# Le ultime prese nel file (secondi, un decimo di margine sull'energia), e la pausa dopo. Scartata la prima presa del
# logo, fra 18,3 e 21,5 («…ovvero il logo nuovo»), e la partenza falsa «Subito dopo…» fra 29,2 e 31,4: la frase del sito
# intera è la presa dopo.
FRASI = [
    (0, 0.55, 4.58, PAUSA),  # Questa è la Tenuta Don Gaetano, una dimora del '700 a Poggiomarino.
    (0, 6.08, 11.29, PAUSA),  # Una nuova location per eventi, che ospiterà battesimi, comunioni, lauree ed altri eventi importanti.
    (0, 12.13, 15.93, PAUSA),  # È un posto nuovo, quindi prima di tutto si deve far conoscere.
    (0, 25.06, 28.58, PAUSA),  # Come prima cosa gli ho dato un nome da riconoscere, il logo.
    (0, 33.90, 43.12, PAUSA),  # Subito dopo siamo partiti con un sito one page che funge da vetrina, che mostra la sala, la casa, il giardino e i vari dettagli della location.
    (0, 43.86, 48.38, PAUSA),  # Chi lo apre vede il posto com'è e se vuole maggiori informazioni contatta su WhatsApp.
    (0, 51.04, 54.93, None),  # Conosci altre location per eventi? Mandagli questo video e fagli vedere il sito.
]

ALIAS = {"a": {"appoggio", "appoggiomarino"}, "è": {"e"}, "gli": {"io"}}  # «io ho dato» per «gli ho dato»
CORREZIONI = {}


def norma(p):
    return gv.norma(p)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    parti = {}
    f = CACHE / "sorgente-hp.wav"
    if not f.exists():
        subprocess.run(["nice", "-n", "19", "ffmpeg", "-nostdin", "-v", "error", "-threads", "1", "-y", "-i", str(SORGENTE),
                        "-af", "highpass=f=80", "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", str(f)], check=True)
    w = wave.open(str(f))
    parti[0] = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768

    pezzi = [gv.pareggia(gv.stringi(parti[n][int(a * SR): int(b * SR)].copy())) for n, a, b, _ in FRASI]
    pause = [p for *_, p in FRASI]

    tratti, frasi, t = [], [], 0.0
    for i, s in enumerate(pezzi):
        frasi.append({"inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti.append(s)
        t += len(s) / SR
        if i + 1 < len(pezzi):
            tratti.append(np.zeros(int(pause[i] * SR), dtype=np.float32))
            t += pause[i]
    grezzo = CACHE / "voce-grezza.wav"
    ww = wave.open(str(grezzo), "wb")
    ww.setnchannels(1); ww.setsampwidth(2); ww.setframerate(SR)
    ww.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    ww.close()
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + gv.CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)

    w16 = CACHE / "voce-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ac", "1", "-ar", "16000", str(w16)], check=True)
    parole = []
    for i, fr in enumerate(frasi):
        da = max(0.0, fr["inizio"] - 0.2)
        pz = CACHE / f"voce-frase-{i}"
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(da), "-to", str(fr["fine"] + 0.2), "-i", str(w16), str(pz.with_suffix(".wav"))], check=True)
        subprocess.run(["nice", "-n", "19", "whisper-cli", "-m", str(gv.MODELLO), "-l", "it", "-t", "2", "-mc", "0", "-ml", "1", "-sow", "-ojf",
                        "-of", str(pz), "-f", str(pz.with_suffix(".wav"))], check=True, capture_output=True)
        d = json.loads(pz.with_suffix(".json").read_text())
        parole += [{"p": y["text"].strip(), "da": y["offsets"]["from"] / 1000 + da, "a": y["offsets"]["to"] / 1000 + da, "frase": i}
                   for y in d["transcription"] if re.search(r"\w", y["text"])]
    blocchi, k = [], 0
    for sc, testo, chiave in BLOCCHI:
        prima_parola = norma(testo.split()[0])
        for j in range(k, min(k + 6, len(parole))):
            q = norma(parole[j]["p"])
            if q == prima_parola or q in ALIAS.get(prima_parola, ()):
                break
        else:
            raise SystemExit(f"«{testo}»: non trovo «{prima_parola}» dopo " + " ".join(p["p"] for p in parole[k:k + 6]))
        k = j + max(1, len(testo.split()) - 1)
        apre = j == 0 or parole[j - 1]["frase"] != parole[j]["frase"]
        inizio_frase = frasi[parole[j]["frase"]]["inizio"]
        da_ = inizio_frase + CORREZIONI[testo] if testo in CORREZIONI else inizio_frase if apre else parole[j]["da"]
        b = {"scena": sc, "testo": testo, "da": da_, "j": j}
        if chiave:
            b["chiave"] = chiave
        blocchi.append(b)
    for i, b in enumerate(blocchi):
        fino = blocchi[i + 1]["j"] if i + 1 < len(blocchi) else len(parole)
        b["sentito"] = " ".join(p["p"] for p in parole[b.pop("j"):fino])
        b["fine"] = parole[fino - 1]["a"]

    primo = lambda sc: next(b for b in blocchi if b["scena"] == sc)
    da = lambda testo: next(b["da"] for b in blocchi if b["testo"] == testo)
    cta_da, fine_voce = primo("cta")["da"], frasi[-1]["fine"]
    durata = round(fine_voce + TIENI, 3)
    ordine = ["drone", "foto", "drone2", "logo", "sito", "whatsapp"]
    sc = {n: (0.0 if n == "drone" else primo(n)["da"]) for n in ordine}
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else cta_da, 3)} for i, n in enumerate(ordine)}
    scene["finale"] = {"da": round(cta_da, 3), "a": durata}
    # le foto: una per battuta, e la corona d'alloro su «lauree»
    movimenti = {"vetrina": round(da("che funge da vetrina,"), 3), "sala": round(da("che mostra la sala,"), 3),
                 "giardino": round(da("la casa, il giardino"), 3), "dettagli": round(da("e i vari dettagli"), 3),
                 "whatsapp": round(da("contatta su WhatsApp."), 3), "lauree": round(da("comunioni, lauree"), 3),
                 "logo": round(da("il logo."), 3)}
    sottotitoli = [b for b in blocchi if b["scena"] != "cta"]
    for i, b in enumerate(sottotitoli):
        b["a"] = round(sottotitoli[i + 1]["da"] if i + 1 < len(sottotitoli) else cta_da, 3)
        b["da"] = round(b["da"], 3)
    uscita = {"durata": durata, "scene": scene, "movimenti": movimenti,
              "blocchi": [{k2: v for k2, v in b.items() if k2 in ("testo", "chiave", "da", "a")} for b in sottotitoli],
              "cta": {"da": round(cta_da, 3), "chiave": round(da("Mandagli questo video"), 3)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for n, v in scene.items():
        print(f"{n:10s} {v['da']:6.2f}–{v['a']:6.2f}")
    for b in blocchi:
        print(f"   {b['da']:6.2f} {b['scena']:9s} {b['testo']:32s} ← {b['sentito']}")
    print("movimenti", movimenti, "cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

"""La voce del reel semplice di Room84, registrata da Emanuele col DJI sul MacBook il 30/09/2026.

Il file è `1-girato/room84/audio reel room84.m4a`. Il copione era quello dei sottotitoli della versione a scritte, e lui
l'ha detto a modo suo, più parlato: «Ecco qui il sito di un B&B di Poggiomarino», «Prima di iniziare, prendo un
foglio», «che è la cosa più importante», «che rispecchiano il brand», «importantissime», «Insomma, il posto era già
bellissimo, mancava semplicemente un sito che lo raccontasse al meglio». I sottotitoli seguono le sue parole.
«Successivamente foto e dintorni» l'ha detta due volte, e vale la seconda: si rifà quella venuta male.

Il metodo è quello di `pb-girarrosto-voce.py`, da cui vengono pareggia, stringi e il confronto delle parole: le frasi
in fila con le pause scelte qui, la catena della voce, whisper una frase alla volta. In più, da qui escono i tempi
della composizione `PbRoom84Voce` (src/pb-room84/Semplice.tsx): le scene, i blocchi dei sottotitoli, quando si
disegna ogni blocco del foglio e quando diventa sito.

Scrive `public/pb-room84/voce2.wav` (fuori da git) e `src/pb-room84/voce2.json`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

SORGENTE = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/room84/audio reel room84.m4a")
CACHE = Path("cache/pb-room84")
OUT = Path("public/pb-room84/voce2.wav")
JSON = Path("src/pb-room84/voce2.json")
SR = gv.SR
PAUSA = 0.35
FINE_VOCE = 0.3
CHIUSURA = 3.4  # «Prima capisco cosa vendi. Poi lo costruisco.», senza voce
PIENO = 2.7  # quanto dura almeno la scena in cui il foglio diventa sito: i nove blocchi si riempiono in 2,3 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono. La scena «mani» e quella «sito» dividono la stessa frase.
BLOCCHI = [
    ("prima", "Ecco qui il sito", None), ("prima", "di un B&B", None), ("prima", "di Poggiomarino.", None),
    ("scrivania", "Prima di iniziare,", None), ("penna", "prendo un foglio.", "un foglio"),
    ("foglio", "In alto,", None), ("foglio", "la spa in camera,", None), ("foglio", "che è la cosa", None),
    ("foglio", "più importante.", None), ("foglio", "Subito dopo,", None), ("foglio", "le date libere.", None),
    ("foglio", "Due camere,", None), ("foglio", "la 8 e la 4,", "la 8 e la 4"), ("foglio", "che rispecchiano il brand.", None),
    ("foglio", "Le recensioni vere", None), ("foglio", "di Booking,", None), ("foglio", "importantissime.", None),
    ("foglio", "Successivamente", None), ("foglio", "foto e dintorni.", None),
    ("mani", "E da lì nasce il sito,", None), ("sito", "pezzo per pezzo.", "pezzo per pezzo"),
    ("dopo", "Ecco il risultato.", "il risultato"), ("dopo", "Insomma, il posto", None), ("dopo", "era già bellissimo,", None),
    ("dopo", "mancava semplicemente", None), ("dopo", "un sito che lo raccontasse", None), ("dopo", "al meglio.", None),
]

# I pezzi nel file sorgente (misurati sull'energia, un decimo di margine) e la pausa che viene dopo.
# «che rispecchiano il brand» è più bassa di 5 dB di «Due camere…»: sta in un pezzo suo, pareggiato da solo.
FRASI = [
    (1.69, 4.73, PAUSA),
    (6.49, 8.16, PAUSA),
    (8.68, 11.98, PAUSA),
    (14.00, 15.99, PAUSA),
    (18.86, 21.03, 0.2),
    (21.46, 22.79, PAUSA),
    (24.66, 26.98, PAUSA),
    (36.67, 39.00, PAUSA),  # la seconda presa; la prima sta fra 29,34 e 32,25
    (41.08, 43.84, None),  # la pausa dopo si calcola: il foglio che diventa sito vuole PIENO secondi
    (44.76, 46.16, 0.5),
    (49.03, 54.15, None),
]


# Dove whisper sbaglia, misurato sull'energia della voce montata: secondi dall'inizio della frase del blocco.
# «Due camere» dura mezzo secondo e poi c'è una pausetta, e whisper allungava «camere» fino alla fine della frase,
# mettendo «la 8 e la 4» un secondo dopo; «pezzo per pezzo» riparte dopo il respiro che segue «nasce il sito».
CORREZIONI = {"la 8 e la 4,": 0.88, "pezzo per pezzo.": 1.58}


def norma(p):
    p = gv.norma(p)
    return {"dei": "di", "otto": "8", "poggio": "poggiomarino"}.get(p, p)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    f = CACHE / "voce2-sorgente.wav"
    if not f.exists():
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(SORGENTE), "-ac", "1", "-ar", str(SR), str(f)], check=True)
    w = wave.open(str(f))
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768

    pezzi = [gv.pareggia(gv.stringi(x[int(a * SR): int(b * SR)].copy())) for a, b, _ in FRASI]
    # la pausa dopo «E da lì nasce il sito, pezzo per pezzo»: «pezzo per pezzo» sono circa gli ultimi 0,85 secondi
    pause = [p if p is not None else 0.0 for _, _, p in FRASI]
    pause[8] = max(PAUSA, PIENO - 0.85)
    tratti, frasi, t = [], [], 0.0
    for i, s in enumerate(pezzi):
        frasi.append({"inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti.append(s)
        t += len(s) / SR
        if i + 1 < len(pezzi):
            tratti.append(np.zeros(int(pause[i] * SR), dtype=np.float32))
            t += pause[i]
    grezzo = CACHE / "voce2-grezza.wav"
    ww = wave.open(str(grezzo), "wb")
    ww.setnchannels(1); ww.setsampwidth(2); ww.setframerate(SR)
    ww.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    ww.close()
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + gv.CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)

    # whisper una frase alla volta, poi ogni blocco sulla sua prima parola
    w16 = CACHE / "voce2-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ac", "1", "-ar", "16000", str(w16)], check=True)
    parole = []
    for i, fr in enumerate(frasi):
        da = max(0.0, fr["inizio"] - 0.2)
        pz = CACHE / f"voce2-frase-{i}"
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(da), "-to", str(fr["fine"] + 0.2), "-i", str(w16), str(pz.with_suffix(".wav"))], check=True)
        subprocess.run(["nice", "-n", "15", "whisper-cli", "-m", str(gv.MODELLO), "-l", "it", "-t", "4", "-mc", "0", "-ml", "1", "-sow", "-ojf",
                        "-of", str(pz), "-f", str(pz.with_suffix(".wav"))], check=True, capture_output=True)
        d = json.loads(pz.with_suffix(".json").read_text())
        parole += [{"p": y["text"].strip(), "da": y["offsets"]["from"] / 1000 + da, "a": y["offsets"]["to"] / 1000 + da, "frase": i}
                   for y in d["transcription"] if re.search(r"\w", y["text"])]
    blocchi, k = [], 0
    for sc, testo, chiave in BLOCCHI:
        prima_parola = norma(testo.split()[0])
        for j in range(k, min(k + 5, len(parole))):
            if norma(parole[j]["p"]) == prima_parola:
                break
        else:
            raise SystemExit(f"«{testo}»: non trovo «{prima_parola}» dopo " + " ".join(p["p"] for p in parole[k:k + 5]))
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

    # le scene
    primo = lambda sc: next(b for b in blocchi if b["scena"] == sc)
    da = lambda testo: next(b["da"] for b in blocchi if b["testo"] == testo)
    fine_voce = frasi[-1]["fine"] + FINE_VOCE
    durata = round(fine_voce + CHIUSURA, 3)
    sc = {"prima": 0.0, "scrivania": primo("scrivania")["da"], "penna": primo("penna")["da"], "foglio": primo("foglio")["da"],
          "mani": primo("mani")["da"], "sito": primo("sito")["da"], "dopo": primo("dopo")["da"]}
    # gli spezzoni veri sono corti: la scrivania 2,6 s, la penna 1,6, le mani sul foglio finito 1,4
    sc["penna"] = max(sc["penna"], sc["foglio"] - 1.55)
    sc["scrivania"] = max(sc["scrivania"], sc["penna"] - 2.55)
    sc["sito"] = min(sc["sito"], sc["mani"] + 1.35)
    ordine = ["prima", "scrivania", "penna", "foglio", "mani", "sito", "dopo"]
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else durata, 3)} for i, n in enumerate(ordine)}
    scene["chiusura"] = {"da": round(fine_voce, 3), "a": durata}
    # quando si disegna ogni blocco del foglio, dall'inizio della scena, sulla parola che lo nomina (come nella versione
    # a scritte: il logo e il titolo con la spa, «chi siamo» e «come funziona» poco prima della camere e delle recensioni)
    f0 = sc["foglio"]
    disegno = [0.1, max(0.35, da("la spa in camera,") - f0 - 0.5), da("Subito dopo,") - f0 + 0.2, da("Due camere,") - f0 - 0.5,
               da("Due camere,") - f0 + 0.05, da("Le recensioni vere") - f0 - 0.4, da("Le recensioni vere") - f0,
               da("foto e dintorni.") - f0, da("foto e dintorni.") - f0 + 0.35]
    pieni = [0.15 + i * 0.27 for i in range(9)]
    for i, b in enumerate(blocchi):  # un blocco resta finché non arriva il dopo, o finché la voce tace
        b["a"] = round(blocchi[i + 1]["da"] if i + 1 < len(blocchi) else fine_voce, 3)
        b["da"] = round(b["da"], 3)
    JSON.write_text(json.dumps({"durata": durata, "scene": scene, "disegno": [round(v, 3) for v in disegno],
                                "pieni": [round(v, 3) for v in pieni],
                                "blocchi": [{k2: v for k2, v in b.items() if k2 in ("testo", "chiave", "da", "a")} for b in blocchi]},
                               indent=1, ensure_ascii=False) + "\n")
    for n, v in scene.items():
        print(f"{n:10s} {v['da']:6.2f}–{v['a']:6.2f}")
    for b in blocchi:
        print(f"   {b['da']:6.2f}–{b['a']:6.2f} {b['scena']:9s} {b['testo']:28s} ← {b['sentito']}")
    print("disegno", [round(v, 2) for v in disegno], "durata", durata)


if __name__ == "__main__":
    main()

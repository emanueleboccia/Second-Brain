"""La voce del quarto Room84, sul copione rifatto attorno al prima e al dopo del sito (30/09/2026, notte).

La v3 Emanuele l'ha bocciata: «non mi piace. rimandami un nuovo copione. e poi si deve vedere bene il prima del sito ed
il dopo». Il copione nuovo sta in `projects/personal-brand/girato-room84.md`; l'ha registrato in un file solo,
`1-girato/room84/voceroomnuova.aifc`, con qualche frase sbagliata e ripetuta: «usa sempre l'ultima frase detta». Qui
ci sono solo le ultime prese, e le sue parole come le ha dette («quello che ho fatto prima del computer è stato
prendere carta e penna», «che rispecchiano il brand», «importantissimo», «Conosci qualcuno con un B&B?»).

Le immagini: il prima e il dopo sono il sito da telefono, grande, nella stessa inquadratura, con lo zoom sulla scritta
in alto; il foglio è un passaggio veloce. Scrive `public/pb-room84/voce4.wav` e `src/pb-room84/voce4.json`, letti da
`src/pb-room84/Voce4.tsx`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

GIRATO = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/room84")
CACHE = Path("cache/pb-room84")
OUT = Path("public/pb-room84/voce4.wav")
JSON = Path("src/pb-room84/voce4.json")
SORGENTE = GIRATO / "voceroomnuova.aifc"
SR = gv.SR
PAUSA = 0.2  # «tra una frase e l'altra deve esserci poco tempo, pochissimo»
DENTRO = 0.12  # fra due pezzi della stessa frase
FINE_VOCE = 0.3
TIENI = 1.2  # quanto resta la CTA a schermo dopo l'ultima parola
PIENO = 1.9  # quanto dura almeno la scena in cui il foglio diventa sito: qui i nove blocchi si riempiono in 1,4 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono.
BLOCCHI = [
    ("prima", "Questo era il sito", None), ("prima", "di Room84,", None), ("prima", "un B&B a Poggiomarino.", None),
    ("prima", "In alto diceva:", None), ("prima", "«Il tuo rifugio", None), ("prima", "di relax e piacere».", None),
    ("prima", "Ma la cosa che conta", None), ("prima", "di più, lì,", None), ("prima", "è la spa in camera.", "la spa in camera"),
    ("scrivania", "Allora, quello che ho fatto", None), ("scrivania", "prima del computer", None),
    ("penna", "è stato prendere", None), ("penna", "carta e penna.", "carta e penna"),
    ("foglio", "Ho messo in fila", None), ("foglio", "quello che cerca", None), ("foglio", "chi prenota:", None),
    ("foglio", "quindi la spa,", None), ("foglio", "le date libere,", None), ("foglio", "le camere", None),
    ("foglio", "e le recensioni.", None),
    ("sito", "Ed ecco il risultato.", "il risultato"),
    ("dopo", "In alto adesso c'è:", None), ("dopo", "«Una notte con", None), ("dopo", "la spa in camera».", "la spa in camera"),
    ("dopo", "Poi le due camere,", None), ("dopo", "la 8 e la 4,", None), ("dopo", "che rispecchiano il brand.", None),
    ("dopo", "E il 9,8 di Booking,", "9,8"), ("dopo", "importantissimo.", None),
    ("cta", "Conosci qualcuno con un B&B?", None), ("cta", "Mandagli questo video.", None),
]

# Le ultime prese nel file (secondi, un decimo di margine sull'energia), e la pausa dopo. Scartate: «Allora la prima
# cosa è toccare il computer» (14,3), «Allora, la prima…» (19,8), «Allora, prima di toccare il computer» (24,4) e
# «Conosci un nemico con…» (54,5).
FRASI = [
    (0, 1.54, 5.21, PAUSA),  # Questo era il sito di Room84, un B&B a Poggiomarino.
    (0, 6.37, 12.30, PAUSA),  # In alto diceva… ma la cosa che conta di più lì è la spa in camera.
    (0, 29.06, 32.67, PAUSA),  # Allora, quello che ho fatto prima del computer è stato prendere carta e penna.
    (0, 34.28, 40.20, PAUSA),  # Ho messo in fila quello che cerca chi prenota, quindi la spa, le date libere, le camere e le recensioni.
    (0, 40.30, 41.30, None),  # Ed ecco il risultato. — la pausa dopo la decide il foglio che diventa sito
    (0, 43.65, 46.73, PAUSA),  # In alto adesso c'è una notte con la spa in camera.
    (0, 47.00, 52.69, PAUSA),  # Poi le due camere, la 8 e la 4, che rispecchiano il brand. E il 9,8 di Booking, importantissimo.
    (0, 57.48, 60.19, None),  # Conosci qualcuno con un B&B? Mandagli questo video.
]

# Le parole che whisper sente diverse: «Rummo84», «appoggio marino».
ALIAS = {"a": {"appoggio", "appoggiomarino"}, "di": {"dirummo84", "di"}}
CORREZIONI = {}


def norma(p):
    return gv.norma(p)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    parti = {}
    f = CACHE / "v4-sorgente-hp.wav"
    if not f.exists():
        subprocess.run(["nice", "-n", "19", "ffmpeg", "-nostdin", "-v", "error", "-threads", "1", "-y", "-i", str(SORGENTE),
                        "-af", "highpass=f=80", "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", str(f)], check=True)
    w = wave.open(str(f))
    parti[0] = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768

    pezzi = [gv.pareggia(gv.stringi(parti[n][int(a * SR): int(b * SR)].copy())) for n, a, b, _ in FRASI]
    pause = [p for *_, p in FRASI]
    # dopo «Ed ecco il risultato» il foglio diventa sito: la scena dura almeno PIENO secondi
    pause[4] = max(PAUSA, PIENO - 1.0)
    tratti, frasi, t = [], [], 0.0
    for i, s in enumerate(pezzi):
        frasi.append({"inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti.append(s)
        t += len(s) / SR
        if i + 1 < len(pezzi):
            tratti.append(np.zeros(int(pause[i] * SR), dtype=np.float32))
            t += pause[i]
    grezzo = CACHE / "voce4-grezza.wav"
    ww = wave.open(str(grezzo), "wb")
    ww.setnchannels(1); ww.setsampwidth(2); ww.setframerate(SR)
    ww.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    ww.close()
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + gv.CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)

    w16 = CACHE / "voce4-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ac", "1", "-ar", "16000", str(w16)], check=True)
    parole = []
    for i, fr in enumerate(frasi):
        da = max(0.0, fr["inizio"] - 0.2)
        pz = CACHE / f"voce4-frase-{i}"
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
    sc = {"prima": 0.0, "scrivania": primo("scrivania")["da"], "penna": primo("penna")["da"], "foglio": primo("foglio")["da"],
          "sito": primo("sito")["da"], "dopo": primo("dopo")["da"]}
    sc["penna"] = max(sc["penna"], sc["foglio"] - 1.55)
    sc["scrivania"] = max(sc["scrivania"], sc["penna"] - 2.55)
    ordine = ["prima", "scrivania", "penna", "foglio", "sito", "dopo"]
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else durata, 3)} for i, n in enumerate(ordine)}
    scene["chiusura"] = {"da": round(cta_da, 3), "a": durata}
    f0 = sc["foglio"]
    # il foglio veloce: i blocchi nominati si disegnano quando li dice, gli altri in mezzo
    spa, date, camere, recensioni = da("quindi la spa,") - f0, da("le date libere,") - f0, da("le camere") - f0, da("e le recensioni.") - f0
    disegno = [0.05, spa, date, (date + camere) / 2, camere, (camere + recensioni) / 2, recensioni, recensioni + 0.35, recensioni + 0.6]
    pieni = [0.1 + i * 0.16 for i in range(9)]
    # dove si muove il telefono: lo zoom sulla scritta in alto, e le tappe del sito nuovo
    movimenti = {"zoomPrima": [round(da("In alto diceva:"), 3), round(da("Ma la cosa che conta"), 3)],
                 "zoomDopo": [round(sc["dopo"], 3), round(da("Poi le due camere,"), 3)],
                 "numeri": round(da("E il 9,8 di Booking,"), 3), "chiavi": round(da("importantissimo."), 3)}
    sottotitoli = [b for b in blocchi if b["scena"] != "cta"]
    for i, b in enumerate(sottotitoli):
        b["a"] = round(sottotitoli[i + 1]["da"] if i + 1 < len(sottotitoli) else cta_da, 3)
        b["da"] = round(b["da"], 3)
    uscita = {"durata": durata, "scene": scene, "disegno": [round(v, 3) for v in disegno], "pieni": [round(v, 3) for v in pieni],
              "movimenti": movimenti,
              "blocchi": [{k2: v for k2, v in b.items() if k2 in ("testo", "chiave", "da", "a")} for b in sottotitoli],
              "cta": {"da": round(cta_da, 3), "chiave": round(da("Mandagli questo video."), 3)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for n, v in scene.items():
        print(f"{n:10s} {v['da']:6.2f}–{v['a']:6.2f}")
    for b in blocchi:
        print(f"   {b['da']:6.2f} {b['scena']:9s} {b['testo']:32s} ← {b['sentito']}")
    print("disegno", [round(v, 2) for v in disegno], "movimenti", movimenti, "cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

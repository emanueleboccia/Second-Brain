"""La voce del reel semplice di Room84, terza registrazione: il copione nuovo del 30/09/2026 sera.

Emanuele l'ha registrato in sei parti, `1-girato/room84/pt1.aifc`…`pt6.aifc`, e l'ha detto a modo suo e più lungo del
copione: con le parti tecniche, «wireframe», «headline», «call to action», «social proof», veniva un reel da 58
secondi. Scelta sua: «Lo taglio a ~40 s». Qui si tengono le sue parole ma solo i pezzi senza parole del mestiere,
tagliati nelle pause vere, e ogni taglio è stato verificato facendo trascrivere a whisper il pezzo tenuto. Sono
fuori anche «che non sono altro che il nome del brand, Room84», perché da dove venga il nome non si racconta (brand
book), «ottimo» dopo il 9,8 e «la Costiera Amalfitana».

Il rombo sotto i 60 Hz delle sei parti (−52 dB) si toglie col passa-alto prima di misurare: sopra i 100 Hz il fondo
è a −69.

Le immagini cambiano in due punti rispetto alla versione a scritte: il sito prima e il sito dopo sono le riprese vere
del fisso, IMG_5662, e in chiusura c'è la CTA al posto della riga del sito. Scrive `public/pb-room84/voce3.wav` e
`src/pb-room84/voce3.json`, letti dalla composizione `PbRoom84Voce3`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

GIRATO = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/1-girato/room84")
CACHE = Path("cache/pb-room84")
OUT = Path("public/pb-room84/voce3.wav")
JSON = Path("src/pb-room84/voce3.json")
SR = gv.SR
PAUSA = 0.2  # «tra una frase e l'altra deve esserci poco tempo, pochissimo»
DENTRO = 0.12  # fra due pezzi della stessa frase
FINE_VOCE = 0.3
TIENI = 1.2  # quanto resta la CTA a schermo dopo l'ultima parola
PIENO = 2.7  # quanto dura almeno la scena in cui il foglio diventa sito: i nove blocchi si riempiono in 2,3 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono. La scena «mani» e quella «sito» dividono la stessa frase.
BLOCCHI = [
    ("prima", "Antonio e Antonella", None), ("prima", "hanno un B&B", None), ("prima", "a Poggiomarino", None),
    ("prima", "e vogliono rifare il sito.", None),
    ("scrivania", "Prima di toccare il computer,", None), ("penna", "partiamo da carta e penna.", "carta e penna"),
    ("foglio", "In alto creeremo", None), ("foglio", "una bella sezione principale.", None),
    ("foglio", "Subito dopo si parte", None), ("foglio", "con una sezione", None), ("foglio", "per il chi siamo.", None),
    ("foglio", "Poi le due camere,", None), ("foglio", "la 8 e la 4.", "la 8 e la 4"),
    ("foglio", "Ma soprattutto", None), ("foglio", "la parte più importante,", None), ("foglio", "le recensioni.", None),
    ("foglio", "Ovviamente quelle vere", None), ("foglio", "di Booking,", None), ("foglio", "con 9,8 su 40.", "9,8 su 40"),
    ("foglio", "In fondo inseriremo", None), ("foglio", "una gallery", None), ("foglio", "con tutte le fotografie", None),
    ("foglio", "e subito dopo", None), ("foglio", "una sezione chiamata dintorni,", None), ("foglio", "per esempio", None),
    ("foglio", "gli Scavi di Pompei", None), ("foglio", "a 9 km.", None),
    ("mani", "E da questo foglio", None), ("sito", "nasce il sito,", None), ("sito", "pezzo per pezzo.", "pezzo per pezzo"),
    ("dopo", "Ecco il risultato.", "il risultato"), ("dopo", "Il posto era già bellissimo,", None), ("dopo", "mo' pure il sito.", None),
    ("cta", "Se conosci qualcuno", None), ("cta", "con un B&B,", None), ("cta", "mandagli questo video.", None),
]

# I pezzi tenuti: parte, da, a (secondi nella parte, tagliati nelle pause e verificati con whisper), pausa dopo.
# «None» dopo «pezzo per pezzo»: la pausa si calcola, perché il foglio che diventa sito vuole PIENO secondi.
FRASI = [
    (1, 1.03, 4.66, PAUSA),  # Antonio e Antonella hanno un B&B a Poggiomarino e vogliono rifare il sito.
    (2, 0.85, 3.38, PAUSA),  # Prima di toccare il computer partiamo da carta e penna, [disegnando il wireframe completo]
    (3, 1.09, 3.50, PAUSA),  # In alto creeremo una bella sezione principale [con la headline… a prenotare]
    (3, 9.58, 13.11, PAUSA),  # Subito dopo si parte con una sezione per il chi siamo [con un po' di social proof]
    (3, 17.88, 20.43, PAUSA),  # Poi le due camere, la 8 e la 4, [che non sono altro che il nome del brand]
    (3, 32.10, 35.07, PAUSA),  # [Ancora dopo… il come funziona,] ma soprattutto la parte più importante, le recensioni.
    (3, 37.23, 40.40, PAUSA),  # Ovviamente quelle vere di Booking, con 9,8 su 40, [ottimo]
    (4, 0.69, 3.51, DENTRO),  # In fondo inseriremo una gallery con tutte le fotografie
    (4, 3.87, 6.29, DENTRO),  # e subito dopo una sezione chiamata dintorni, [dove potranno visionare…]
    (4, 10.07, 11.68, PAUSA),  # per esempio gli Scavi di Pompei a 9 km [o la Costiera Amalfitana]
    (5, 0.71, 4.16, None),  # E da questo foglio nasce il sito, pezzo per pezzo.
    (5, 4.85, 5.62, PAUSA),  # Ecco il risultato.
    (6, 0.74, 3.40, PAUSA),  # Il posto era già bellissimo, mo' pure il sito.
    (6, 6.60, 9.16, None),  # Se conosci qualcuno con un B&B, mandagli questo video.
]

# Le parole che whisper sente diverse, o perde: «appoggio marino», «che una sezione» o «una sezione», «i scavi», «ma pure».
ALIAS = {"a": {"appoggio", "appoggiomarino"}, "con": {"che", "una"}, "gli": {"i"}, "mo": {"ma", "ora"}}
CORREZIONI = {}


def norma(p):
    return gv.norma(p)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    parti = {}
    for n in sorted({f[0] for f in FRASI}):
        f = CACHE / f"v3-pt{n}-hp.wav"
        if not f.exists():
            subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(GIRATO / f"pt{n}.aifc"),
                            "-af", "highpass=f=80", "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", str(f)], check=True)
        w = wave.open(str(f))
        parti[n] = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768

    pezzi = [gv.pareggia(gv.stringi(parti[n][int(a * SR): int(b * SR)].copy())) for n, a, b, _ in FRASI]
    pause = [p for *_, p in FRASI]
    # dopo «pezzo per pezzo»: «nasce il sito, pezzo per pezzo» sono gli ultimi 2,2 secondi del pezzo
    pause[10] = max(PAUSA, PIENO - 2.2)
    tratti, frasi, t = [], [], 0.0
    for i, s in enumerate(pezzi):
        frasi.append({"inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti.append(s)
        t += len(s) / SR
        if i + 1 < len(pezzi):
            tratti.append(np.zeros(int(pause[i] * SR), dtype=np.float32))
            t += pause[i]
    grezzo = CACHE / "voce3-grezza.wav"
    ww = wave.open(str(grezzo), "wb")
    ww.setnchannels(1); ww.setsampwidth(2); ww.setframerate(SR)
    ww.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    ww.close()
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + gv.CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)

    w16 = CACHE / "voce3-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ac", "1", "-ar", "16000", str(w16)], check=True)
    parole = []
    for i, fr in enumerate(frasi):
        da = max(0.0, fr["inizio"] - 0.2)
        pz = CACHE / f"voce3-frase-{i}"
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(da), "-to", str(fr["fine"] + 0.2), "-i", str(w16), str(pz.with_suffix(".wav"))], check=True)
        subprocess.run(["nice", "-n", "15", "whisper-cli", "-m", str(gv.MODELLO), "-l", "it", "-t", "4", "-mc", "0", "-ml", "1", "-sow", "-ojf",
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
    sc = {"prima": 0.0, "scrivania": primo("scrivania")["da"], "penna": primo("penna")["da"], "foglio": primo("foglio")["da"],
          "mani": primo("mani")["da"], "sito": primo("sito")["da"], "dopo": primo("dopo")["da"]}
    sc["penna"] = max(sc["penna"], sc["foglio"] - 1.55)
    sc["scrivania"] = max(sc["scrivania"], sc["penna"] - 2.55)
    sc["sito"] = min(sc["sito"], sc["mani"] + 1.35)
    # il dopo sta sulle due riprese vere del fisso, imac-dopo e imac-finale: 228 fotogrammi, 7,6 secondi
    durata = round(min(fine_voce + TIENI, sc["dopo"] + 7.55), 3)
    ordine = ["prima", "scrivania", "penna", "foglio", "mani", "sito", "dopo"]
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else durata, 3)} for i, n in enumerate(ordine)}
    scene["chiusura"] = {"da": round(cta_da, 3), "a": durata}
    f0 = sc["foglio"]
    disegno = [0.1, da("In alto creeremo") - f0 + 0.5, da("una bella sezione principale.") - f0 + 0.9, da("per il chi siamo.") - f0,
               da("Poi le due camere,") - f0 + 0.05, da("Ma soprattutto") - f0 - 0.3, da("le recensioni.") - f0,
               da("una gallery") - f0, da("una sezione chiamata dintorni,") - f0 + 0.4]
    pieni = [0.15 + i * 0.27 for i in range(9)]
    sottotitoli = [b for b in blocchi if b["scena"] != "cta"]
    for i, b in enumerate(sottotitoli):
        b["a"] = round(sottotitoli[i + 1]["da"] if i + 1 < len(sottotitoli) else cta_da, 3)
        b["da"] = round(b["da"], 3)
    uscita = {"durata": durata, "scene": scene, "disegno": [round(v, 3) for v in disegno], "pieni": [round(v, 3) for v in pieni],
              "blocchi": [{k2: v for k2, v in b.items() if k2 in ("testo", "chiave", "da", "a")} for b in sottotitoli],
              "cta": {"da": round(cta_da, 3), "chiave": round(da("mandagli questo video."), 3)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for n, v in scene.items():
        print(f"{n:10s} {v['da']:6.2f}–{v['a']:6.2f}")
    for b in blocchi:
        print(f"   {b['da']:6.2f} {b['scena']:9s} {b['testo']:32s} ← {b['sentito']}")
    print("disegno", [round(v, 2) for v in disegno], "cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

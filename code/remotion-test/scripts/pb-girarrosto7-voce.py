"""La voce della v7 del reel del Girarrosto, registrata da Emanuele il 03/10/2026.

Il copione è quello della v7 in `projects/personal-brand/girato-girarrosto.md`: lo stesso inizio della v6, coi tempi
corretti e senza il «foglio unico», e un dopo che risponde uno per uno ai problemi del prima. Il file è
`nuovavoceeegirarrostooooversionenuova.aifc`, in `3-in-produzione/reel-girarrosto/`. Le frasi dette due volte sono la
14 e la 16: vale l'ultima. Prima della CTA ci sono due partenze lasciate a metà, che restano fuori. Lui ha detto «Cambi
idea» e «te lo dice l'app» dove il copione diceva «Cambia idea» e «te lo dice lei»: i sottotitoli seguono lui.

Il metodo è quello della v6, in `scripts/pb-girarrosto6-voce.py`. Scrive `public/pb-girarrosto7/voce.wav` (fuori da git)
e `src/pb-girarrosto7/voce.json`.
"""
import difflib, json, re, subprocess, wave
from pathlib import Path
import numpy as np

SORGENTE = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/3-in-produzione/reel-girarrosto/nuovavoceeegirarrostooooversionenuova.aifc")
CACHE = Path("cache/pb-girarrosto7")
OUT = Path("public/pb-girarrosto7/voce.wav")
JSON = Path("src/pb-girarrosto7/voce.json")
MODELLO = Path("whisper.cpp/ggml-large-v3-turbo.bin")
SR = 48000
SOGLIA_DB, SILENZIO, RESTA, BORDO = -66.0, 0.28, 0.16, 0.012
CATENA = ("highpass=f=85,dynaudnorm=f=200:g=15:p=0.9:m=10,"
          "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=1.6,loudnorm=I=-14:TP=-1.5:LRA=11")
PAUSA = 0.2
TIENI = 1.2

# Le scene della v7 e i blocchi dei sottotitoli, con le parole come le ha dette lui. «chiave» va sulla passata.
SCENE = [
    ("apertura", 0.0, [("Da Marco al suo girarrosto,", None), ("nelle sere più piene,", None), ("c'erano 120 ordini,", None),
                       ("tutti scritti a mano", None)]),
    ("telefono", 0.0, [("Squillava il telefono,", None), ("cognome, ordine", None), ("ed evidenziatore", "evidenziatore")]),
    ("foglio", 0.0, [("Giallo il fritto,", None), ("arancione l'impanato,", None), ("verde il tacchino", None)]),
    ("fila", 0.0, [("Funzionava, eh", None), ("finché non c'erano", None), ("20 persone in fila", "in fila")]),
    ("conti", 0.0, [("120 conti,", None), ("tutti a mente", "a mente")]),
    ("pronto", 0.0, [("«Il mio è pronto?»", None), ("E giù a rileggere", None), ("tutti i fogli", "tutti i fogli")]),
    ("cambia", 0.0, [("Uno cambia idea?", None), ("Cancella", None), ("e riscrivi da capo", "da capo")]),
    ("pezzi", 0.0, [("E quanti pezzi preparare", None), ("in giornata?", None), ("Pure quello a mente", "a mente")]),
    ("secolo", 0.0, [("Io non gli ho portato", None), ("il gestionale del secolo", "del secolo")]),
    ("arrivo", 0.0, [("Prima di costruire,", None), ("sono andato lì", None), ("e li ho guardati lavorare", "guardati lavorare")]),
    ("schede", 0.0, [("Poi ho fatto un'app", None), ("uguale al loro foglio,", None), ("solo più veloce", "più veloce"),
                     ("Il conto?", None), ("Lo fa lei", "Lo fa lei")]),
    ("cerca", 0.0, [("«Il mio è pronto?»", None), ("Lo cerchi", None), ("e lo trovi subito", "subito")]),
    ("modifica", 0.0, [("Cambi idea?", None), ("Tocchi «modifica»", "modifica"), ("e basta", None)]),
    ("ipad", 0.0, [("Quanti pezzi preparare?", None), ("Un tocco", "Un tocco"), ("e te lo dice l'app", None)]),
    ("prezzo", 0.0, [("E se Marco cambia un prezzo,", None), ("cambia pure", None), ("sul menù del sito", "sul menù del sito")]),
    ("servizio", 0.0, [("Mo' Marco pensa", None), ("ai polli", "ai polli"), ("e ai conti", None), ("ci pensa l'app", None)]),
    ("cta", 0.0, [("Hai un amico che fa ancora i conti a mente?", None), ("Mandagli questo video", None)]),
]

# whisper sente «a gestionare il secolo»: il blocco parte da «il gestionale», 0,82 s dopo l'inizio della frase
CORREZIONI = {"il gestionale del secolo": 0.82}
ALIAS = {"squillava": {"scudava", "squilava", "scuillava", "scrivetevi"}, "girarrosto": {"giro", "girarosto"}, "il": {"è", "e"},
         "mo": {"mò", "mo'"}, "120": {"centoventi"}, "20": {"venti"}, "menù": {"menu"}, "gestionale": {"gestionare"},
         "«il": {"il"}, "tocchi": {"tocchi,"}, "e": {"è"}}

# Le frasi nel file: scena, da, a (secondi, misurati sull'energia con un decimo di margine). Scartate: la prima presa
# della 14 (56,2-59,1), la prima della 16 (70,1-73,0), e due partenze della CTA lasciate a metà (84,3 e 86,4).
FRASI = [
    ("apertura", 3.22, 9.21),
    ("telefono", 11.61, 14.72),
    ("foglio", 15.51, 18.64),
    ("fila", 18.92, 21.83),
    ("conti", 22.71, 25.01),
    ("pronto", 26.80, 30.31),
    ("cambia", 31.30, 33.99),
    ("pezzi", 34.25, 37.32),
    ("secolo", 38.88, 41.02),
    ("arrivo", 42.06, 45.23),
    ("schede", 45.35, 49.03),
    ("schede", 50.86, 52.26),
    ("cerca", 52.90, 55.72),
    ("modifica", 61.19, 63.73),
    ("ipad", 65.10, 68.14),
    ("prezzo", 75.21, 78.47),
    ("servizio", 79.65, 82.69),
    ("cta", 88.74, 91.81),
]


def carica():
    f = CACHE / f"sorgente-{SORGENTE.stem.replace(' ', '-')}.wav"  # un nome per file: la cache non confonde le registrazioni
    if not f.exists():
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(SORGENTE),
                        "-ac", "1", "-ar", str(SR), str(f)], check=True)
    w = wave.open(str(f))
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768


def pareggia(x, bersaglio=-30.0):
    """Porta al livello bersaglio la parte che parla (i blocchi da 10 ms sopra i −55 dB), non il silenzio."""
    hop = SR // 100
    n = len(x) // hop
    r = np.sqrt(np.mean(x[: n * hop].reshape(n, hop) ** 2, axis=1)) + 1e-9
    voce = r[20 * np.log10(r) > -55]
    if len(voce) == 0:
        return x
    return x * 10 ** ((bersaglio - 20 * np.log10(np.sqrt(np.mean(voce ** 2)))) / 20)


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


def parole_whisper(frasi):
    """Whisper una frase alla volta, sui pezzi corti come vuole la procedura: sulla voce intera schiacciava le prime
    parole di ogni frase nello stesso istante («Il colore dice» in 13 centesimi), perché la pausa prima lo confonde."""
    w16 = CACHE / "voce-16k.wav"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(OUT), "-ac", "1", "-ar", "16000", str(w16)], check=True)
    parole = []
    for i, f in enumerate(frasi):
        da = max(0.0, f["inizio"] - 0.2)
        pezzo = CACHE / f"frase-{i}"
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(da), "-to", str(f["fine"] + 0.2), "-i", str(w16),
                        str(pezzo.with_suffix(".wav"))], check=True)
        subprocess.run(["nice", "-n", "15", "whisper-cli", "-m", str(MODELLO), "-l", "it", "-t", "2", "-mc", "0", "-ml", "1",
                        "-sow", "-ojf", "-of", str(pezzo), "-f", str(pezzo.with_suffix(".wav"))], check=True, capture_output=True)
        d = json.loads(pezzo.with_suffix(".json").read_text())
        parole += [{"p": x["text"].strip(), "da": x["offsets"]["from"] / 1000 + da, "a": x["offsets"]["to"] / 1000 + da, "frase": i}
                   for x in d["transcription"] if re.search(r"\w", x["text"])]
    return parole


def norma(p):
    return re.sub(r"[^a-zàèéìòù0-9]", "", p.lower().replace("120", "centoventi").replace("20", "venti"))


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    x = carica()
    prima = {id_: p for id_, p, _ in SCENE}
    tratti, frasi, t, scena_prec = [], [], 0.0, None
    for i, (scena, da, a) in enumerate(FRASI):
        if i:
            pausa = PAUSA + (prima[scena] if scena != scena_prec else 0)
            tratti.append(np.zeros(int(pausa * SR), dtype=np.float32))
            t += pausa
        s = pareggia(stringi(x[int(da * SR): int(a * SR)].copy()))
        frasi.append({"scena": scena, "inizio": round(t, 3), "fine": round(t + len(s) / SR, 3)})
        tratti.append(s)
        t += len(s) / SR
        scena_prec = scena
    grezzo = CACHE / "voce-grezza.wav"
    w = wave.open(str(grezzo), "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(np.concatenate(tratti), -1, 1) * 32767).astype(np.int16).tobytes())
    w.close()
    # In stereo prima della normalizzazione, come Room84: la voce mono sui due canali suona 3 dB più forte.
    subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(grezzo), "-af",
                    "pan=stereo|c0=c0|c1=c0," + CATENA, "-ar", str(SR), "-ac", "2", str(OUT)], check=True)

    # I blocchi si agganciano alla loro prima parola, cercata in avanti fra quelle di whisper: whisper a volte perde
    # una parola corta («giallo il fritto» per «giallo è il fritto»), quindi non si contano le parole. Il blocco che
    # apre una frase parte dall'inizio misurato della frase, che è più preciso di whisper.
    parole = parole_whisper(frasi)
    tempi, k = [], 0
    for sc, _, bb in SCENE:
        for testo, chiave in bb:
            prima_parola = norma(testo.split()[0])
            for j in range(k, min(k + 5, len(parole))):
                sentita = norma(parole[j]["p"])
                # whisper storpia parecchio questa registrazione («Scrivetevi» per «Squillava»): oltre agli alias vale una
                # parola simile per due terzi
                if sentita == prima_parola or sentita in ALIAS.get(prima_parola, ()) or \
                        (len(prima_parola) > 3 and difflib.SequenceMatcher(None, sentita, prima_parola).ratio() >= 0.66):
                    break
            else:
                # whisper a volte perde la prima parola («Prima di costruire» diventa «di costruire»): si cerca la seconda
                seconda = norma(testo.split()[1]) if len(testo.split()) > 1 else None
                for j in range(k, min(k + 5, len(parole))):
                    if seconda and norma(parole[j]["p"]) == seconda:
                        break
                else:
                    raise SystemExit(f"«{testo}»: non trovo «{prima_parola}» dopo " + " ".join(p["p"] for p in parole[k:k + 5]))
            k = j + max(1, len(testo.split()) - 1)  # una parola di tolleranza, per quelle che whisper perde
            f = frasi[parole[j]["frase"]]
            apre = j == 0 or parole[j - 1]["frase"] != parole[j]["frase"]
            da_ = f["inizio"] + CORREZIONI[testo] if testo in CORREZIONI else f["inizio"] if apre else parole[j]["da"]
            tempi.append({"scena": sc, "testo": testo, "chiave": chiave, "da": da_, "j": j})
    for i, b in enumerate(tempi):  # dove finisce la voce del blocco: l'ultima parola prima del blocco dopo
        fino = tempi[i + 1]["j"] if i + 1 < len(tempi) else len(parole)
        b["fine"] = parole[fino - 1]["a"]
        b["sentito"] = " ".join(p["p"] for p in parole[b.pop("j"):fino])

    # Le scene: cominciano sulla loro prima frase, meno l'immagine che viene prima; finiscono dove comincia la dopo.
    # L'ultima, il servizio, resta sotto la CTA fino alla fine.
    cta = [b for b in tempi if b["scena"] == "cta"]
    durata = round(cta[-1]["fine"] + TIENI, 3)
    scene = []
    for id_, pr, _ in SCENE:
        if id_ == "cta":
            continue
        bb = [b for b in tempi if b["scena"] == id_]
        scene.append({"id": id_, "inizio": round(bb[0]["da"] - pr, 3) if scene else 0.0, "blocchi": bb})
    for i, s in enumerate(scene):
        ultima = i + 1 == len(scene)
        s["fine"] = durata if ultima else scene[i + 1]["inizio"]
        s["fineVoce"] = round(cta[0]["da"], 3) if ultima else round(min(s["fine"], s["blocchi"][-1]["fine"] + 0.3), 3)
        for j, b in enumerate(s["blocchi"]):
            b["a"] = round(s["blocchi"][j + 1]["da"] if j + 1 < len(s["blocchi"]) else (s["fineVoce"] if ultima else s["fine"]), 3)
            b["da"] = round(b["da"], 3)
            b.pop("fine"); b.pop("scena")
            if b["chiave"] is None:
                b.pop("chiave")
    uscita = {"durata": durata, "scene": scene,
              "cta": {"da": round(cta[0]["da"], 3), "chiave": round(cta[1]["da"], 3), "sentito": " ".join(b["sentito"] for b in cta)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for s in scene:
        print(f"{s['id']:11s} {s['inizio']:6.2f}–{s['fine']:6.2f}")
        for b in s["blocchi"]:
            print(f"   {b['da']:6.2f}–{b['a']:6.2f}  {b['testo']:30s} ← {b['sentito']}")
    print("cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

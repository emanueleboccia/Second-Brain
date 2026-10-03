"""La voce della v5 del reel di Room84, registrata da Emanuele il 03/10/2026.

Il copione è quello del 03/10 in `projects/personal-brand/girato-room84.md`, sullo stampo del Girarrosto v7. Il file è
`voceee reel room844.aifc`, in `3-in-produzione/reel-room84/`. Vale l'ultima presa: «Poi le date libere» l'ha
cominciata una volta e ripresa, e le recensioni con la chiusura le ha dette due volte, «Sotto invece ci sono le
recensioni vere» e «Insomma il posto era già bellissimo». La CTA è diventata «Mandagli questo video e aiutalo». I
sottotitoli seguono le sue parole.

Il metodo è quello del Girarrosto, in `scripts/pb-girarrosto7-voce.py`. Scrive `public/pb-room84-5/voce.wav` (fuori da
git) e `src/pb-room84-5/voce.json`.
"""
import difflib, json, re, subprocess, wave
from pathlib import Path
import numpy as np

SORGENTE = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/3-in-produzione/reel-room84/voceee reel room844.aifc")
CACHE = Path("cache/pb-room84-5")
OUT = Path("public/pb-room84-5/voce.wav")
JSON = Path("src/pb-room84-5/voce.json")
MODELLO = Path("whisper.cpp/ggml-large-v3-turbo.bin")
SR = 48000
SOGLIA_DB, SILENZIO, RESTA, BORDO = -66.0, 0.28, 0.16, 0.012
CATENA = ("highpass=f=85,dynaudnorm=f=200:g=15:p=0.9:m=10,"
          "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=1.6,loudnorm=I=-14:TP=-1.5:LRA=11")
PAUSA = 0.2
TIENI = 1.2

SCENE = [
    ("apertura", 0.0, [("Room84, a Poggiomarino:", None), ("due suite per coppie,", None), ("una con la sauna", "sauna"),
                       ("e una con l'idromassaggio", "idromassaggio")]),
    ("prima", 0.0, [("Sul sito, in alto,", None), ("c'era scritto:", None), ("«Il tuo rifugio di relax e piacere»", None)]),
    ("domande", 0.0, [("Bello, eh?", None), ("Ma chi arriva sul sito", None), ("vuole sapere tre cose", "tre cose"),
                      ("Com'è la camera,", None), ("se è libera quella notte", None), ("e quanto costa", None)]),
    ("carta", 0.0, [("Prima di toccare il computer,", None), ("carta e penna", "carta e penna")]),
    ("foglio", 0.0, [("In alto la spa in camera,", "spa in camera"), ("che è la cosa più importante", None),
                     ("Poi le date libere,", None), ("le due camere", None), ("e le recensioni", None)]),
    ("risultato", 0.0, [("Ecco il risultato", "il risultato"), ("In alto adesso c'è:", None), ("«Una notte con la spa in camera»", None)]),
    ("chiavi", 0.0, [("Le camere sono due chiavi,", None), ("la 8 e la 4,", "la 8 e la 4"), ("ognuna con il suo video", None)]),
    ("date", 0.0, [("Scegli le date", None), ("e vedi subito", None), ("quali notti sono libere", "libere")]),
    ("booking", 0.0, [("Il calendario lo prende da Booking,", None), ("da solo:", "da solo"), ("nessuno lo aggiorna a mano", None)]),
    ("whatsapp", 0.0, [("Camera libera?", None), ("Un tocco", "Un tocco"), ("e la chiedi su WhatsApp", None),
                       ("con il messaggio già scritto", None)]),
    ("prezzo", 0.0, [("Oppure vedi il prezzo", None), ("su Booking", None), ("con date già inserite", "già inserite")]),
    ("recensioni", 0.0, [("Sotto invece ci sono", None), ("le recensioni vere:", None), ("9,8 su 40", "9,8 su 40")]),
    ("finale", 0.0, [("Insomma, il posto", None), ("era già bellissimo", None), ("Mo' pure il sito", "pure il sito")]),
    ("cta", 0.0, [("Conosci qualcuno con un B&B?", None), ("Mandagli questo video e aiutalo", None)]),
]

CORREZIONI = {}
ALIAS = {"room84": {"room", "rum", "room84,"}, "mo": {"mò", "mo'"}, "98": {"9", "nove"}, "b&b": {"bnb", "bb"},
         "«il": {"il"}, "«una": {"una"}, "conosci": {"conosce"}}

# Le frasi nel file, misurate sull'energia. Fuori: la prima partenza di «Poi le date libere» (26,4-27,1), la prima
# presa delle recensioni e della chiusura (59,0-64,7), e il «Grazie» che whisper sente in fondo, dove non c'è voce.
FRASI = [
    ("apertura", 1.68, 7.22),
    ("prima", 8.48, 12.36),
    ("domande", 12.53, 15.72),
    ("domande", 16.23, 19.19),
    ("carta", 21.10, 23.30),
    ("foglio", 23.36, 26.21),
    ("foglio", 28.58, 31.54),
    ("risultato", 32.05, 32.95),
    ("risultato", 34.85, 37.39),
    ("chiavi", 38.05, 41.64),
    ("date", 41.87, 44.49),
    ("booking", 45.15, 48.52),
    ("whatsapp", 49.31, 52.93),
    ("prezzo", 54.90, 58.15),
    ("recensioni", 68.00, 71.88),
    ("finale", 72.97, 75.94),
    ("cta", 79.03, 82.46),
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
    return re.sub(r"[^a-zàèéìòù0-9]", "", p.lower().replace("120", "centoventi").replace("9,8", "98").replace("&", ""))


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
                # whisper storpia le parole: oltre agli alias vale una parola simile per due terzi
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

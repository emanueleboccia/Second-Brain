"""La voce del reel del sito menù del Girarrosto Liberti, col carrello che manda l'ordine su WhatsApp, registrata da
Emanuele il 03/10/2026 a pranzo.

Il copione è quello in `projects/personal-brand/girato-girarrosto.md`, detto a modo suo: «Basta che apri il sito», «Un
menù per due», «e in automatico si apre WhatsApp con un messaggio già precompilato», «tutto quanto», «quelli
aggiornati», «cambiano pure sul sito», «adesso si ordina anche», e la CTA «Scrivimi la parola menù in privato, e ti
faccio vedere altre funzionalità». Il file è `voce reel sito girarrosto liberti.aifc`, in
`3-in-produzione/reel-girarrosto-sito/`. Vale l'ultima presa: la frase del carrello l'ha detta due volte, la CTA tre.
Whisper sente «non ne voglia», «croquet» e «ordine ora»: nei sottotitoli valgono le parole del copione.

⚠️ Come la Tenuta v4, la registrazione ha il fondo a −52 dB: si pulisce prima di tutto il resto.

Il metodo è quello del Girarrosto. Scrive `public/pb-girarrosto-sito/voce.wav` (fuori da git) e
`src/pb-girarrosto-sito/voce.json`.
"""
import difflib, json, re, subprocess, wave
from pathlib import Path
import numpy as np

SORGENTE = Path("/Volumes/SSD-MANU/04-PERSONAL-BRAND/3-in-produzione/reel-girarrosto-sito/voce reel sito girarrosto liberti.aifc")
CACHE = Path("cache/pb-girarrosto-sito")
OUT = Path("public/pb-girarrosto-sito/voce.wav")
JSON = Path("src/pb-girarrosto-sito/voce.json")
MODELLO = Path("whisper.cpp/ggml-large-v3-turbo.bin")
SR = 48000
SOGLIA_DB, SILENZIO, RESTA, BORDO = -50.0, 0.28, 0.16, 0.012
PULIZIA = "highpass=f=90,afftdn=nf=-30:nr=18:tn=1"
CATENA = ("highpass=f=85,dynaudnorm=f=200:g=15:p=0.9:m=10,"
          "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=1.6,loudnorm=I=-14:TP=-1.5:LRA=11")
PAUSA = 0.2
TIENI = 1.3

SCENE = [
    ("apertura", 0.0, [("Il sito del Girarrosto Liberti", None), ("ha il suo menù", None), ("e adesso prende pure gli ordini", "gli ordini")]),
    ("ritiro", 0.0, [("Al Girarrosto si ordina", None), ("e si passa a ritirare", "ritirare")]),
    ("telefono", 0.0, [("E se vuoi ordinare,", None), ("ma di telefonare", "telefonare"), ("non ne hai voglia?", None)]),
    ("menu", 0.0, [("Basta che apri il sito,", None), ("sfogli il menù", None), ("e tocchi «più»", "più"), ("su quello che ti va", None)]),
    ("carrello", 0.0, [("Un menù per due,", None), ("due crocchè,", None), ("una Coca-Cola:", None), ("tutto nel carrello,", "carrello"),
                       ("col totale che si fa da solo", None)]),
    ("nome", 0.0, [("Metti il tuo nome,", "nome"), ("scegli quando passi:", None), ("oggi,", None), ("domani,", None), ("un altro giorno", None)]),
    ("ordina", 0.0, [("Poi tocchi «Ordina ora»", "Ordina ora")]),
    ("whatsapp", 0.0, [("e in automatico si apre WhatsApp", "WhatsApp"), ("con un messaggio già precompilato", "già precompilato")]),
    ("tutto", 0.0, [("C'è tutto:", None), ("cosa vuoi,", None), ("quando passi,", None), ("il totale,", None), ("il tuo nome,", None), ("tutto quanto", None)]),
    ("saluto", 0.0, [("Ti saluta pure giusto:", None), ("buongiorno,", None), ("buonasera,", None), ("in base all'ora", None)]),
    ("invio", 0.0, [("Poi premi invio,", "invio"), ("e dal Girarrosto risponderanno:", None), ("«Ok, ordine accettato,", None),
                    ("ti aspettiamo per il ritiro»", None)]),
    ("pagamento", 0.0, [("Paghi quando passi,", "quando passi"), ("niente app da scaricare,", None), ("niente account", None)]),
    ("prezzo", 0.0, [("E i prezzi sono sempre", None), ("quelli aggiornati:", "aggiornati"), ("li cambia Marco dall'app,", None), ("e cambiano pure sul sito", None)]),
    ("chiusa", 0.0, [("Il menù prima si guardava,", None), ("adesso si ordina anche", None)]),
    ("cta", 0.0, [("Hai un locale con un menù che si guarda e basta?", None), ("Scrivimi la parola «menù» in privato", None),
                  ("e ti faccio vedere altre funzionalità", None)]),
]

# «Il sito del», da solo, whisper non lo sente: il blocco si aggancia alla frase dopo, e va riportato all'inizio
CORREZIONI = {"Il sito del Girarrosto Liberti": -1.07}
# whisper sente «girarosto», «giro rosso», «croquet», «menu», «ordine ora»
ALIAS = {"il": {"i"}, "e": {"è", "ed"}, "menù": {"menu"}, "girarrosto": {"girarosto", "giro"}, "crocchè": {"croquet", "crochet", "crocche"},
         "cè": {"ce", "c"}, "ok": {"okay"}}

# Le frasi nel file, misurate sull'energia dopo la pulizia. Fuori: due rumori prima e dopo, la prima presa del carrello
# (19,1-22,7) e le prime due CTA (68,6-77,4). «Il sito del» è detto piano e sta prima di una pausa di un secondo: è
# una frase a sé, così si pareggia da sola e arriva allo stesso volume del resto.
FRASI = [
    ("apertura", 1.85, 2.72),
    ("apertura", 3.88, 8.05),
    ("ritiro", 10.36, 12.64),
    ("telefono", 12.84, 15.40),
    ("menu", 15.50, 18.62),
    ("carrello", 24.14, 29.25),
    ("nome", 29.68, 33.36),
    ("ordina", 33.40, 34.74),
    ("whatsapp", 35.04, 38.02),
    ("tutto", 38.36, 41.62),
    ("saluto", 42.38, 45.02),
    ("invio", 47.12, 52.27),
    ("pagamento", 53.93, 57.04),
    ("prezzo", 57.18, 61.52),
    ("chiusa", 63.48, 66.58),
    ("cta", 78.54, 84.42),
]


def carica():
    f = CACHE / f"sorgente-{SORGENTE.stem.replace(' ', '-')}.wav"  # un nome per file: la cache non confonde le registrazioni
    if not f.exists():
        subprocess.run(["nice", "-n", "15", "ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(SORGENTE),
                        "-af", PULIZIA, "-ac", "1", "-ar", str(SR), str(f)], check=True)
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
    return re.sub(r"[^a-zàèéìòù0-9]", "", p.lower().replace("&", ""))


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
            # ma se la parola dopo è l'ultima del blocco, non era persa: «Un menù per due, due crocchè» ripete «due»
            if k < len(parole) and norma(parole[k]["p"]) == norma(testo.split()[-1]):
                k += 1
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
              "cta": {"da": round(cta[0]["da"], 3), "chiave": round(cta[1]["da"], 3), "dopo": round(cta[2]["da"], 3), "sentito": " ".join(b["sentito"] for b in cta)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for s in scene:
        print(f"{s['id']:11s} {s['inizio']:6.2f}–{s['fine']:6.2f}")
        for b in s["blocchi"]:
            print(f"   {b['da']:6.2f}–{b['a']:6.2f}  {b['testo']:30s} ← {b['sentito']}")
    print("cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

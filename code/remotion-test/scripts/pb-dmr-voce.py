"""La voce del reel sul gestionale di Da Mamma Rosaria, seconda registrazione del 30/09/2026 notte.

Il reel gli piaceva, e la voce l'ha rifatta cambiando delle frasi: «qui si fanno eventi privati», «c'è un messaggio
WhatsApp… con acconti e saldi all'interno», «Allora ho creato un gestionale soltanto per i nostri eventi, dove
all'interno crei l'evento una sola volta e selezioni il menù, i servizi e chi ci lavora», «tutto sincronizzato», e al
posto di «dove gli errori li pago io» c'è «E nulla viene lasciato al caso». Il file è `new voce reel gestionale
dmr.aifc`, nella radice dell'SSD. Della CTA vale la seconda presa: la prima, fra 67,5 e 71,0, si interrompe. Fra 38 e
67 secondi non c'è niente, il fondo sta sotto i −52 dB. La prima registrazione, `voce reel gestionale dmr.aifc`, sta
nella storia di git di questo script.

Il metodo è quello di `pb-tenuta-voce.py`, e i tempi escono per `src/pb-dmr/ReelDmr.tsx`. Scrive
`public/pb-dmr/voce.wav` e `src/pb-dmr/voce.json`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

GIRATO = Path("/Volumes/SSD-MANU")
CACHE = Path("cache/pb-dmr")
OUT = Path("public/pb-dmr/voce.wav")
JSON = Path("src/pb-dmr/voce.json")
SORGENTE = GIRATO / "new voce reel gestionale dmr.aifc"
SR = gv.SR
PAUSA = 0.2  # «tra una frase e l'altra deve esserci poco tempo, pochissimo»
DENTRO = 0.12  # fra due pezzi della stessa frase
FINE_VOCE = 0.3
TIENI = 1.2  # quanto resta la CTA a schermo dopo l'ultima parola
PIENO = 1.9  # quanto dura almeno la scena in cui il foglio diventa sito: qui i nove blocchi si riempiono in 1,4 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono.
BLOCCHI = [
    ("drone", "Questo è l'agriturismo", None), ("drone", "della mia famiglia,", None), ("drone", "e qui si fanno", None),
    ("drone", "eventi privati.", "eventi privati"),
    ("whatsapp", "Per ogni evento", None), ("whatsapp", "c'è un messaggio WhatsApp,", None), ("whatsapp", "scritto e riscritto a mano,", "a mano"),
    ("whatsapp", "con acconti e saldi", None), ("whatsapp", "all'interno.", None),
    ("drive", "I turni stavano", None), ("drive", "in file sparsi", None), ("drive", "su Google Drive,", None),
    ("drive", "e il resto veniva", None), ("drive", "tutto a mente.", "a mente"),
    ("gestionale", "Allora ho creato", None), ("gestionale", "un gestionale", None), ("gestionale", "soltanto per i nostri eventi,", None),
    ("festa", "dove all'interno", None), ("festa", "crei l'evento", None), ("festa", "una sola volta", "una sola volta"),
    ("festa", "e selezioni il menù,", None), ("festa", "i servizi", None), ("festa", "e chi ci lavora.", None),
    ("pagine", "E così partono", None), ("pagine", "tre pagine:", None), ("pagine", "una per il cliente,", None),
    ("pagine", "una per chi lavora", None), ("pagine", "e l'altra per la cucina,", None), ("pagine", "tutto sincronizzato.", "sincronizzato"),
    ("conti", "Gli incassi", None), ("conti", "li vedi subito:", None), ("conti", "quanto è entrato", None),
    ("conti", "e quanto manca.", "quanto manca"),
    ("caso", "E nulla viene", None), ("caso", "lasciato al caso.", "al caso"),
    ("cta", "Se conosci qualcuno che organizza eventi", None), ("cta", "e fa ancora tutto su WhatsApp,", None), ("cta", "mandagli questo video.", None),
]

# Le ultime prese nel file (secondi, un decimo di margine sull'energia), e la pausa dopo. Le prime due frasi sono
# attaccate: si dividono nella pausa fra 3,97 e 4,39.
FRASI = [
    (0, 0.65, 4.05, PAUSA),  # Questo è l'agriturismo della mia famiglia e qui si fanno eventi privati.
    (0, 4.30, 8.99, PAUSA),  # Per ogni evento c'è un messaggio WhatsApp, scritto e riscritto a mano, con acconti e saldi all'interno.
    (0, 9.52, 13.67, PAUSA),  # I turni stavano in file sparsi su Google Drive e il resto veniva tutto a mente.
    (0, 14.58, 23.16, PAUSA),  # Allora ho creato un gestionale soltanto per i nostri eventi, dove all'interno crei l'evento…
    (0, 24.23, 30.30, PAUSA),  # E così partono tre pagine… tutto sincronizzato.
    (0, 31.16, 34.15, PAUSA),  # Gli incassi li vedi subito, quanto è entrato e quanto manca.
    (0, 36.23, 38.21, PAUSA),  # E nulla viene lasciato al caso.
    (0, 73.56, 78.27, None),  # Se conosci qualcuno che organizza eventi e fa ancora tutto su WhatsApp, mandagli questo video.
]

ALIAS = {"crei": {"crea"}, "e": {"è", "ed"}, "in": {"infase", "in"}}
CORREZIONI = {}


def norma(p):
    return gv.norma(p)


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    parti = {}
    f = CACHE / "sorgente2-hp.wav"
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
    ordine = ["drone", "whatsapp", "drive", "gestionale", "festa", "pagine", "conti", "caso"]
    sc = {n: (0.0 if n == "drone" else primo(n)["da"]) for n in ordine}
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else cta_da, 3)} for i, n in enumerate(ordine)}
    scene["finale"] = {"da": round(cta_da, 3), "a": durata}
    movimenti = {"feste": round(da("e qui si fanno"), 3), "riscritto": round(da("scritto e riscritto a mano,"), 3),
                 "acconti": round(da("con acconti e saldi"), 3), "sparsi": round(da("in file sparsi"), 3),
                 "drive": round(da("su Google Drive,"), 3), "mente": round(da("tutto a mente."), 3),
                 "cliente": round(da("una per il cliente,"), 3), "lavora": round(da("una per chi lavora"), 3),
                 "cucina": round(da("e l'altra per la cucina,"), 3), "sincronizzato": round(da("tutto sincronizzato."), 3),
                 "entrato": round(da("quanto è entrato"), 3), "manca": round(da("e quanto manca."), 3)}
    sottotitoli = [b for b in blocchi if b["scena"] != "cta"]
    for i, b in enumerate(sottotitoli):
        b["a"] = round(sottotitoli[i + 1]["da"] if i + 1 < len(sottotitoli) else cta_da, 3)
        b["da"] = round(b["da"], 3)
    uscita = {"durata": durata, "scene": scene, "movimenti": movimenti,
              "blocchi": [{k2: v for k2, v in b.items() if k2 in ("testo", "chiave", "da", "a")} for b in sottotitoli],
              "cta": {"da": round(cta_da, 3), "chiave": round(da("mandagli questo video."), 3)}}
    JSON.write_text(json.dumps(uscita, indent=1, ensure_ascii=False) + "\n")
    for n, v in scene.items():
        print(f"{n:10s} {v['da']:6.2f}–{v['a']:6.2f}")
    for b in blocchi:
        print(f"   {b['da']:6.2f} {b['scena']:9s} {b['testo']:32s} ← {b['sentito']}")
    print("movimenti", movimenti, "cta", uscita["cta"], "durata", durata)


if __name__ == "__main__":
    main()

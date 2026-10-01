"""La voce del reel sulla Masseria di Mezz'autunno e il suo calendario, registrata da Emanuele il 30/09/2026 sera.

Il copione rifatto la sera stessa sta in `projects/personal-brand/reel-lavori-famiglia.md`: prima la Masseria, le
famiglie, le scuole e Zucche in Masseria, poi il calendario. L'ha detto a modo suo e senza due frasi, quella di chi
mette il posto e gli spettacoli e quella dei weekend fino al 31 ottobre; il sold out del 2025, l'unico numero che la
Masseria può dire, c'è. Il file è `voce reel gestioale la masseria.aifc`, nella radice dell'SSD. Emanuele aveva detto
che «non mi convince ancora»: il reel si monta per poterlo giudicare sul video.

Il metodo è quello di `pb-tenuta-voce.py`, e i tempi escono per `src/pb-masseria/ReelMasseria.tsx`. Scrive
`public/pb-masseria/voce.wav` e `src/pb-masseria/voce.json`.
"""
import importlib.util, json, re, subprocess, wave
from pathlib import Path
import numpy as np

_spec = importlib.util.spec_from_file_location("gv", Path(__file__).with_name("pb-girarrosto-voce.py"))
gv = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gv)

GIRATO = Path("/Volumes/SSD-MANU")
CACHE = Path("cache/pb-masseria")
OUT = Path("public/pb-masseria/voce.wav")
JSON = Path("src/pb-masseria/voce.json")
SORGENTE = GIRATO / "voce reel gestioale la masseria.aifc"
SR = gv.SR
PAUSA = 0.2  # «tra una frase e l'altra deve esserci poco tempo, pochissimo»
DENTRO = 0.12  # fra due pezzi della stessa frase
FINE_VOCE = 0.3
TIENI = 1.2  # quanto resta la CTA a schermo dopo l'ultima parola
PIENO = 1.9  # quanto dura almeno la scena in cui il foglio diventa sito: qui i nove blocchi si riempiono in 1,4 secondi

# I blocchi dei sottotitoli, con la scena in cui cadono.
BLOCCHI = [
    ("drone", "Questa è la Masseria", None), ("drone", "di Mezz'autunno,", None), ("drone", "a Poggiomarino.", None),
    ("stagioni", "Fa eventi", None), ("stagioni", "per famiglie e scuole,", None), ("stagioni", "uno per ogni stagione.", "ogni stagione"),
    # sul solo «Zucche»: la passata su tutto il nome andava a capo
    ("zucche", "Il più famoso è", None), ("zucche", "Zucche in Masseria,", "Zucche"), ("zucche", "in autunno.", None),
    ("biglietti", "Le famiglie prendono", None), ("biglietti", "il biglietto online,", None), ("biglietti", "e le scuole chiedono", None),
    ("biglietti", "una brochure", None), ("biglietti", "e vengono in gita.", None),
    ("soldout", "L'anno scorso", None), ("soldout", "Zucche in Masseria", None), ("soldout", "ha fatto sold out", "sold out"),
    ("soldout", "in quasi tutte le date.", None),
    ("caos", "Gite, feste nel parco,", None), ("caos", "serate:", None), ("caos", "e tutto questo stava", None),
    ("caos", "fra file Excel,", None), ("caos", "WhatsApp", None), ("caos", "e fogli volanti.", None),
    ("calendario", "E allora ho creato", None), ("calendario", "un calendario soltanto,", None), ("calendario", "diviso a colori:", "a colori"),
    ("calendario", "verde per le gite,", None), ("calendario", "arancio per le feste", None), ("calendario", "e marrone per le serate.", None),
    ("giorno", "Apri il giorno,", None), ("giorno", "vedi il calendario", None), ("giorno", "e sai quanti bambini mangiano,", None),
    ("giorno", "chi ha un'allergia", None), ("giorno", "e tutti i vari dettagli", None), ("giorno", "in un solo posto.", "in un solo posto"),
    ("cta", "Conosci una maestra o una famiglia con dei bambini?", None), ("cta", "Mandagli questo video", None),
    ("cta", "e fagli scoprire Zucche in Masseria.", None),
]

# Le prese nel file (secondi, un decimo di margine sull'energia), e la pausa dopo. Ogni frase ha una presa sola.
FRASI = [
    (0, 0.74, 9.22, PAUSA),  # Questa è la Masseria di Mezz'autunno… Il più famoso è Zucche in Masseria, in autunno.
    (0, 12.90, 17.72, PAUSA),  # Le famiglie prendono il biglietto online, e le scuole chiedono una brochure e vengono in gita.
    (0, 18.58, 29.04, PAUSA),  # L'anno scorso Zucche in Masseria ha fatto sold out… fra file Excel, WhatsApp e fogli volanti.
    (0, 29.54, 36.33, PAUSA),  # E allora ho creato un calendario soltanto, diviso a colori…
    (0, 36.66, 43.17, PAUSA),  # Apri il giorno, vedi il calendario e sai quanti bambini mangiano… in un solo posto.
    (0, 48.01, 53.35, None),  # Conosci una maestra o una famiglia con dei bambini? Mandagli questo video e fagli scoprire Zucche in Masseria.
]

ALIAS = {"a": {"appoggio", "appoggiomarino"}, "zucche": {"zucca", "zucchi", "zucchia", "zucchie"}, "arancio": {"arance", "arancione", "arancia"},
         "e": {"ed", "è"}, "gite": {"gite"}, "in": {"in"}}
# «per famiglie e scuole» riparte a 3,72, dopo la pausetta che segue «Fa eventi»: whisper le metteva insieme a 3,34.
CORREZIONI = {"per famiglie e scuole,": 3.72}


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
    ordine = ["drone", "stagioni", "zucche", "biglietti", "soldout", "caos", "calendario", "giorno"]
    sc = {n: (0.0 if n == "drone" else primo(n)["da"]) for n in ordine}
    scene = {n: {"da": round(sc[n], 3), "a": round(sc[ordine[i + 1]] if i + 1 < len(ordine) else cta_da, 3)} for i, n in enumerate(ordine)}
    scene["finale"] = {"da": round(cta_da, 3), "a": durata}
    movimenti = {"stagione": round(da("uno per ogni stagione."), 3), "famiglie": round(da("per famiglie e scuole,"), 3),
                 "biglietto": round(da("il biglietto online,"), 3), "brochure": round(da("una brochure"), 3),
                 "soldout": round(da("ha fatto sold out"), 3), "excel": round(da("fra file Excel,"), 3), "whatsapp": round(da("WhatsApp"), 3),
                 "fogli": round(da("e fogli volanti."), 3), "verde": round(da("verde per le gite,"), 3), "arancio": round(da("arancio per le feste"), 3),
                 "marrone": round(da("e marrone per le serate."), 3), "bambini": round(da("e sai quanti bambini mangiano,"), 3),
                 "allergia": round(da("chi ha un'allergia"), 3)}
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

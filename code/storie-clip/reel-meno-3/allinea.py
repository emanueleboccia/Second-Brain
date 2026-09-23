# Allinea il testo giusto all'audio: tratti parlati trovati sull'energia, whisper su ogni tratto,
# e le parole riconosciute agganciate al testo. Esce allineamento.json: {clip: [[parola, inizio, fine], ...]}
import json, subprocess, os, re, difflib, numpy as np, karaoke
MOD = "/Users/emanueleboccia/Second Brain/code/remotion-test/whisper.cpp/ggml-large-v3-turbo.bin"

TESTI = {
    '5351': "Mirko, che stai facendo? Eh… Magg scurdat che era ricr",
    '5353': "Mirko, che stai facendo? Stiamo cercando di realizzare un silos, che sarà poi un chioschetto bar, per dare quell'atmosfera un po' country americana, stile… stile Smallville.",
    '5356': "Scherzi a parte, questo sarà il chioschetto per servire il drink agli adulti, sempre a forma di silos.",
    '5357': "Mirko, ma mancano solo tre giorni. Ce la faremo? Lascia fare.",
    '5358': "Lascia fare.",
}

def norm(w): return re.sub(r"[^a-zàèéìòù]", '', w.lower())

def tratti(e, soglia_db=9, buco=0.14, minimo=0.10):
    floor = np.percentile(e, 20); v = e > floor + soglia_db
    reg = []; i = 0; n = len(v)
    while i < n:
        if v[i]:
            j = i
            while j < n and v[j]: j += 1
            reg.append([i/100, j/100]); i = j
        else: i += 1
    out = []
    for r in reg:
        if out and r[0] - out[-1][1] < buco: out[-1][1] = r[1]
        else: out.append(r)
    return [r for r in out if r[1]-r[0] >= minimo]

def whisper_tratto(clip, a, b, k):
    pad = 0.2; a0 = max(0, a-pad)
    f = f'dtw/{clip}_{k}.wav'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a0:.3f}', '-t', f'{b-a0+pad:.3f}', '-i', f'wav/IMG_{clip}.wav', f], check=True)
    subprocess.run(['nice', '-n', '19', 'whisper-cli', '-m', MOD, '-l', 'it', '-t', '3', '-ml', '1', '-sow', '-oj', '-of', f[:-4], '-f', f],
                   capture_output=True)
    try: d = json.load(open(f[:-4] + '.json'))
    except Exception: return []
    ws = []
    for s in d['transcription']:
        w = s['text'].strip()
        if not norm(w): continue
        t0 = a0 + s['offsets']['from']/1000; t1 = a0 + s['offsets']['to']/1000
        ws.append((w, max(a, t0), min(b, max(t1, t0+0.05))))
    return ws

def allinea(clip):
    e = karaoke.energia(clip); R = tratti(e)
    ric = []
    for k, (a, b) in enumerate(R):
        ric += whisper_tratto(clip, a, b, k)
    target = TESTI[clip].split()
    A = [norm(w) for w in target]; B = [norm(w[0]) for w in ric]
    sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
    tempi = [None]*len(target)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for d in range(i2-i1): tempi[i1+d] = (ric[j1+d][1], ric[j1+d][2])
        elif tag == 'replace' and (i2-i1) == (j2-j1):
            for d in range(i2-i1): tempi[i1+d] = (ric[j1+d][1], ric[j1+d][2])
        elif tag == 'replace':
            # blocchi diversi: si spalmano le parole giuste sul tempo di quelle riconosciute, a lettere
            a, b = ric[j1][1], ric[j2-1][2]; L = [len(target[i]) for i in range(i1, i2)]; tot = sum(L); c = a
            for d, l in enumerate(L):
                dur = (b-a)*l/tot; tempi[i1+d] = (c, c+dur); c += dur
    # le parole rimaste senza tempo si mettono fra le vicine
    for i in range(len(target)):
        if tempi[i] is None:
            prima = next((tempi[j][1] for j in range(i-1, -1, -1) if tempi[j]), 0.0)
            dopo = next((tempi[j][0] for j in range(i+1, len(target)) if tempi[j]), prima + 0.4)
            buchi = [j for j in range(i, len(target)) if tempi[j] is None]
            k = 0
            while i+k < len(target) and tempi[i+k] is None: k += 1
            passo = (dopo - prima)/(k+1)
            for q in range(k): tempi[i+q] = (prima + passo*(q+0.5), prima + passo*(q+1.3))
    return [[w, round(t[0], 3), round(t[1], 3)] for w, t in zip(target, tempi)], R, ric

if __name__ == '__main__':
    import sys
    clips = sys.argv[1:] or list(TESTI)
    out = json.load(open('allineamento.json')) if os.path.exists('allineamento.json') else {}
    for c in clips:
        al, R, ric = allinea(c); out[c] = al
        print('==', c, 'tratti', [(round(a, 2), round(b, 2)) for a, b in R])
        print('   whisper', ' '.join(f'{w}[{a:.2f}]' for w, a, b in ric))
        print('   finale ', ' '.join(f'{w}[{a:.2f}-{b:.2f}]' for w, a, b in al))
    json.dump(out, open('allineamento.json', 'w'), ensure_ascii=False, indent=1)

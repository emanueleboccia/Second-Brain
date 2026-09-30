# Le finestre da 15 s più ritmate di ogni traccia della libreria, tolti i pezzi già usati nelle storie.
import numpy as np, os, glob
from ritmo_lib import load, flux, tempo, SR, HOP
fps = SR / HOP
USATI = {  # traccia: (inizio, fine) già usati nelle storie della Masseria
 'caffeine_creek_band-banjo-romp-109570': [(0, 126)],            # meno 3 e reel di Amin: fuori tutta
 'caffeine_creek_band-fried-taters-bluegrass-18547': [(118, 133)],
 'leberch-country-518559': [(70.2, 85)],
 'the_mountain-country-567416': [(102.4, 133)],
 'jonasblakewood-acoustic-folk-acoustic-folk-music-580577': [(108.9, 140)],
 'paulyudin-acoustic-folk-160684': [(10.4, 60)],
}
for p in sorted(glob.glob('mus/*.wav')):
    n = os.path.basename(p)[:-4]
    x = load(p); f = flux(x)
    rms = np.array([np.sqrt(np.mean(x[i:i + SR] ** 2)) for i in range(0, len(x) - SR, SR)])
    win = int(15 * fps); best = []
    for s in range(0, len(f) - win, int(fps)):
        t = s / fps
        if any(not (t + 15 <= a or t >= b) for a, b in USATI.get(n, [])):
            continue
        seg = f[s:s + win]; b, c = tempo(seg)
        lvl = 20 * np.log10(rms[int(t):int(t) + 15].mean() + 1e-9)
        best.append((c * seg.mean(), t, b, c, seg.mean(), lvl))
    best.sort(reverse=True)
    print(n[:45])
    for sc, t, b, c, d, l in best[:3]:
        print(f'   da {t:5.1f}s  bpm {b:5.1f}  chiarezza {c:.2f}  densita {d:5.1f}  livello {l:5.1f} dB')

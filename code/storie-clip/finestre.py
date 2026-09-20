import numpy as np, sys
sys.path.insert(0, sys.argv[1])
from ritmo_lib import load, flux, tempo, SR, HOP
import os
fps = SR/HOP
for n in ['caffeine_creek_band-fried-taters-bluegrass-18547', 'caffeine_creek_band-banjo-romp-109570', 'the_mountain-country-567416', 'jonasblakewood-acoustic-folk-acoustic-folk-music-580577']:
    x = load(os.path.join(sys.argv[1], 'mus', n + '.wav')); f = flux(x)
    rms = np.array([np.sqrt(np.mean(x[i:i+SR]**2)) for i in range(0, len(x)-SR, SR)])
    win = int(12*fps); best = []
    for s in range(0, len(f)-win, int(fps)):
        seg = f[s:s+win]; b, c = tempo(seg)
        t = s/fps; lvl = 20*np.log10(rms[int(t):int(t)+12].mean()+1e-9)
        best.append((c*seg.mean(), t, b, c, seg.mean(), lvl))
    best.sort(reverse=True)
    print(n[:40])
    for sc, t, b, c, d, l in best[:4]:
        print(f'   da {t:5.1f}s  bpm {b:5.1f}  chiarezza {c:.2f}  densita {d:5.1f}  livello {l:5.1f} dB')

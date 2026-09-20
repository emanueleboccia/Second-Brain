import numpy as np, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ritmo_lib import load, flux, SR, HOP
FPS = SR/HOP
def battito(track_wav, start, dur=14.0):
    x = load(track_wav); a = int(start*SR); seg = x[a:a+int(dur*SR)]
    f = flux(seg); g = f - f.mean()
    ac = np.correlate(g, g, 'full')[len(g)-1:]; ac /= ac[0]
    lo, hi = int(FPS*60/190), int(FPS*60/70)
    i = lo + int(np.argmax(ac[lo:hi]))
    y0, y1, y2 = ac[i-1], ac[i], ac[i+1]; d = 0.5*(y0-y2)/(y0-2*y1+y2)   # interpolazione parabolica
    period = (i + d)/FPS
    # fase: il punto del periodo dove l'energia degli attacchi è massima
    n = int(period*FPS*4)
    best = max(range(int(period*FPS)), key=lambda k: f[k::max(1, int(round(period*FPS)))][:40].sum())
    t0 = start + best/FPS
    return round(t0, 3), round(period, 4)
if __name__ == '__main__':
    print(battito(sys.argv[1], float(sys.argv[2])))

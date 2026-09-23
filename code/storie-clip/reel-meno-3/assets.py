# Grafiche ed effetti sonori del reel del meno 3.
import os, json, wave, numpy as np
from PIL import Image, ImageFont
import testi
from testi import ink, size_for, compose, AVORIO, GIALLO, W, H, F

A = 'asset'; os.makedirs(A, exist_ok=True)
HB, NC = f'{F}/HeroLight-Bold.otf', f'{F}/Niconne-Regular.ttf'

# i sottotitoli: (id, testo, colore)
SUBS = {
    'g1': ('Mirko, che stai facendo?', 'giallo'),
    'g2': ('Eh…', 'avorio'),
    'g3': ('Magg scurdat che era ricr', 'avorio'),
    'm1': ('Mirko, che stai facendo?', 'giallo'),
    'm2': ('Stiamo cercando di realizzare un silos,', 'avorio'),
    'm3': ('che sarà poi un chioschetto bar,', 'avorio'),
    'm4': ("per dare quell'atmosfera", 'avorio'),
    'm4b': ("un po' country americana,", 'avorio'),
    'm5': ('stile Smallville.', 'avorio'),
    's1': ('Scherzi a parte,', 'avorio'),
    's2': ('questo sarà il chioschetto', 'avorio'),
    's3': ('per servire il drink agli adulti,', 'avorio'),
    's4': ('sempre a forma di silos.', 'avorio'),
    'c1': ('Mirko, ma mancano solo tre giorni.', 'giallo'),
    'c2': ('Ce la faremo?', 'giallo'),
    'c3': ('Lascia fare.', 'avorio'),
}
for k, (t, c) in SUBS.items():
    testi.sottotitolo(t, c, f'{A}/sub_{k}.png')

testi.titolo('3', f'{A}/titolo.png')

def centra(text, path, size):
    b = ink(text, ImageFont.truetype(path, int(size))); return (W-(b[2]-b[0]))//2

def riga_doppia(a, b, y, h_a, out, scrim=None, gap=24, k_b=1.62):
    """«a» in HeroLight avorio e «b» in Niconne giallo, sulla stessa linea di base."""
    s3 = size_for(a, HB, target_h=h_a); s4 = s3*k_b
    fa, fb = ImageFont.truetype(HB, int(s3)), ImageFont.truetype(NC, int(s4))
    ba, bb = ink(a, fa), ink(b, fb)
    larg = (ba[2]-ba[0]) + gap + (bb[2]-bb[0])
    if larg > 880:
        k = 880/larg; s3, s4, gap = s3*k, s4*k, int(gap*k)
        fa, fb = ImageFont.truetype(HB, int(s3)), ImageFont.truetype(NC, int(s4))
        ba, bb = ink(a, fa), ink(b, fb)
    x0 = (W-((ba[2]-ba[0]) + gap + (bb[2]-bb[0])))//2
    base = y - ba[1] + fa.getmetrics()[0]
    yb = int(round(base + bb[1] - fb.getmetrics()[0]))
    return [(a, HB, int(s3), AVORIO, x0, y), (b, NC, int(s4), GIALLO, x0+(ba[2]-ba[0])+gap, yb)]

# «Dietro le quinte», piccolo in alto sulla papera
s = size_for('DIETRO LE QUINTE', HB, target_h=40)
compose([('DIETRO LE QUINTE', HB, int(s), AVORIO, centra('DIETRO LE QUINTE', HB, s), 210)], blur=8, dy=3, alpha=0.7).save(f'{A}/quinte.png')

# «Lavori in corso» sul primo stacco dopo il guanto
it = riga_doppia('Lavori', 'in corso', 860, 120, None, k_b=1.55)
compose(it, blur=14, dy=5, alpha=0.7).save(f'{A}/lavori.png')

# il finale: «Mancano 3 giorni!» e la data
it = riga_doppia('Mancano 3', 'giorni!', 1330, 96, None)
data = 'Da sabato 26 settembre'; s5 = size_for(data, HB, target_h=40)
it.append((data, HB, int(s5), AVORIO, centra(data, HB, s5), 1500))
compose(it, blur=12, dy=4, alpha=0.6).save(f'{A}/finale.png')

# ---------- effetti sonori, sintetizzati ----------
SR = 48000
def salva(nome, x):
    x = np.clip(x/ (np.abs(x).max()+1e-9) * 0.9, -1, 1)
    st = np.stack([x, x], 1)
    w = wave.open(f'{A}/{nome}.wav', 'w'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()

rng = np.random.default_rng(3)
def rumore_filtrato(n, f0, f1, q=6):
    """Rumore bianco passato in un passa-banda che scorre da f0 a f1 (in frequenza)."""
    x = rng.standard_normal(n); X = np.fft.rfft(x); out = np.zeros(n)
    # a blocchi: ogni blocco ha il suo centro di banda
    B = 1024; y = np.zeros(n + B)
    win = np.hanning(2*B)
    for i in range(0, n, B):
        u = i/n; fc = f0*(f1/f0)**u
        seg = rng.standard_normal(2*B)*win
        S = np.fft.rfft(seg); fr = np.fft.rfftfreq(2*B, 1/SR)
        S *= np.exp(-((np.log(fr+1)-np.log(fc))**2)*q)
        y[i:i+2*B] += np.fft.irfft(S)[:len(y[i:i+2*B])]
    return y[:n]

def env(n, a, r):
    t = np.arange(n)/SR; e = np.minimum(1, t/a) * np.exp(-np.maximum(0, t-a)/r); return e

# whoosh lungo del logo che sale: sale in frequenza e in volume, poi si chiude
n = int(1.35*SR); t = np.arange(n)/SR
w = rumore_filtrato(n, 250, 3500, q=3) * (np.sin(np.pi*np.minimum(1, t/1.35))**1.6) * (0.4+0.6*t/1.35)
salva('whoosh_logo', w)
# impatto: sub che scende + botta di rumore + coda
n = int(2.2*SR); t = np.arange(n)/SR
sub = np.sin(2*np.pi*(55*t - 12*t**2)) * np.exp(-t/0.55)
botta = rumore_filtrato(n, 900, 120, q=2) * np.exp(-t/0.18)
coda = rumore_filtrato(n, 400, 150, q=2) * np.exp(-t/0.9)*0.35
salva('boom', 1.0*sub + 0.6*botta + coda)
# swipe corto
n = int(0.5*SR); t = np.arange(n)/SR
salva('swipe', rumore_filtrato(n, 600, 5000, q=3) * np.sin(np.pi*t/0.5)**2)
# whip dei tagli
n = int(0.32*SR); t = np.arange(n)/SR
salva('whip', rumore_filtrato(n, 1500, 7000, q=3) * np.sin(np.pi*t/0.32)**3)
# flash / ciak: click + breve crepitio
n = int(0.35*SR); t = np.arange(n)/SR
salva('flash', (rumore_filtrato(n, 5000, 2500, q=2)*np.exp(-t/0.05) + 0.5*np.sin(2*np.pi*1800*t)*np.exp(-t/0.02)))
# tonfo del «Lavori in corso»
n = int(0.9*SR); t = np.arange(n)/SR
salva('tonfo', np.sin(2*np.pi*(70*t - 20*t**2))*np.exp(-t/0.22) + 0.4*rumore_filtrato(n, 600, 200, q=2)*np.exp(-t/0.08))
print('ok')

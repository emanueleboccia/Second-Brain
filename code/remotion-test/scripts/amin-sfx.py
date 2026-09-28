"""Gli effetti del reel di Amin che si fanno in casa, sintetizzati: il pop delle scritte, il tonfo
del timbro sui tentativi di Fienopoli e il cin cin dello spritz. Gli altri (frusta, whoosh, ding,
disco, boom, click) sono della libreria di Remotion, remotion.media, scaricati a parte.
Escono in public/amin/sfx, wav a 48 kHz mono."""
import wave, numpy as np
SR = 48000
def salva(nome, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.9
    with wave.open(f"public/amin/sfx/{nome}.wav", "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())
t = lambda d: np.arange(int(SR * d)) / SR
# pop: una bolla che scoppia, sinusoide che scende da 900 a 250 Hz in 60 ms
tt = t(0.09); f = 250 + 650 * np.exp(-tt / 0.018)
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.03) * (1 - np.exp(-tt / 0.002))
salva("pop", pop)
# tonfo: il timbro che sbatte, un colpo basso a 70 Hz con un po' di rumore sull'attacco
tt = t(0.35); f = 70 + 90 * np.exp(-tt / 0.02)
corpo = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.09)
rumore = np.random.default_rng(3).normal(0, 1, len(tt)) * np.exp(-tt / 0.012) * 0.35
salva("tonfo", corpo + rumore)
# cin cin: due bicchieri, parziali inarmoniche del vetro, il secondo tocco 90 ms dopo
def tocco(d=0.9, base=2150):
    tt = t(d); x = np.zeros_like(tt)
    for k, (r, a, dec) in enumerate([(1, 1, 0.35), (2.76, 0.5, 0.22), (5.40, 0.28, 0.12), (8.93, 0.14, 0.07)]):
        x += a * np.sin(2 * np.pi * base * r * tt + k) * np.exp(-tt / dec)
    return x * (1 - np.exp(-tt / 0.0008))
c = np.zeros(int(SR * 1.1)); a = tocco(); b = tocco(base=2380) * 0.7
c[: len(a)] += a; c[int(SR * 0.09) : int(SR * 0.09) + len(b)] += b[: len(c) - int(SR * 0.09)]
salva("clink", c)
print("ok")

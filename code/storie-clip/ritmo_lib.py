import numpy as np, wave, glob, os, sys
SR, HOP, NF = 11025, 256, 1024
def load(p):
    w = wave.open(p); x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32)/32768; return x
def flux(x):
    n = 1 + (len(x)-NF)//HOP
    idx = np.arange(NF)[None,:] + HOP*np.arange(n)[:,None]
    S = np.abs(np.fft.rfft(x[idx]*np.hanning(NF), axis=1))
    S = np.log1p(100*S)
    f = np.maximum(0, np.diff(S, axis=0)).sum(1)
    f = f - np.convolve(f, np.ones(16)/16, 'same'); f = np.maximum(f, 0)
    return f
def tempo(f):
    f = f - f.mean(); ac = np.correlate(f, f, 'full')[len(f)-1:]; ac /= ac[0]
    fps = SR/HOP; lags = np.arange(len(ac))
    bpm = 60*fps/np.maximum(lags, 1)
    m = (bpm >= 70) & (bpm <= 190)
    i = lags[m][np.argmax(ac[m])]
    return 60*fps/i, ac[i]

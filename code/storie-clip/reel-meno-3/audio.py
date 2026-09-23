# L'audio del reel del meno 3: voci, base, tema di Smallville ed effetti, mixati in numpy.
import json, subprocess, wave, numpy as np
SR = 48000; FPS = 30; BEAT = 0.6928
TL = {s['nome']: s for s in json.load(open('timeline.json'))}
st = lambda nome: TL[nome]['start']/FPS
TOT = max(s['start']+s['n'] for s in TL.values())/FPS
N = int(TOT*SR)

def carica(path, ss=0.0, dur=None):
    a = ['ffmpeg', '-v', 'error', '-ss', f'{ss:.3f}', '-i', path]
    if dur: a += ['-t', f'{dur:.3f}']
    a += ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(a, capture_output=True).stdout, np.float32).reshape(-1, 2).copy()

def fade(x, fi=0.02, fo=0.05):
    n = len(x); a, b = int(fi*SR), int(fo*SR)
    if a: x[:a] *= np.linspace(0, 1, a)[:, None]
    if b: x[-b:] *= np.linspace(1, 0, b)[:, None]
    return x

def metti(bus, x, t, g=1.0):
    i = int(t*SR); j = min(N, i+len(x))
    if j > i: bus[i:j] += x[:j-i]*g

def passa_alto(x, fc=90):
    X = np.fft.rfft(x, axis=0); f = np.fft.rfftfreq(len(x), 1/SR)
    X *= (1/np.sqrt(1+(fc/np.maximum(f, 1))**4))[:, None]
    return np.fft.irfft(X, n=len(x), axis=0).astype(np.float32)

def livella(x, rms_db=-20):
    """Porta la voce a un livello comune, misurato solo dove si parla."""
    e = np.sqrt(np.convolve((x**2).mean(1), np.ones(2400)/2400, 'same'))
    parla = e > e.max()*0.12
    r = np.sqrt((x[parla]**2).mean()) if parla.any() else 1e-3
    return x * (10**(rms_db/20)/r)

voce = np.zeros((N, 2), np.float32)
def v(clip, a, b, t):
    x = carica(f'sdr/IMG_{clip}.mov', a, b-a)
    metti(voce, fade(livella(passa_alto(x))), t)

v('5351', 0.0, 6.0, st('papera'))
v('5353', 2.45, 14.50, st('silos'))
# «Smallville» a metà velocità: rallenta e scende di un'ottava, come il video
x = livella(passa_alto(carica('sdr/IMG_5353.mov', 14.50, 0.95)))
idx = np.arange(0, len(x)-1, 0.5)
lento = np.stack([np.interp(idx, np.arange(len(x)), x[:, c]) for c in (0, 1)], 1).astype(np.float32)
metti(voce, fade(lento, 0.01, 0.3), st('smallville'), 0.9)
v('5356', 1.4, 7.86, st('scherzi') + 1.4)
v('5357', 0.0, 4.25, st('tre-giorni'))
v('5358', 0.0, 1.95, st('lascia-fare'))

# la base: un battito cade proprio sull'inizio dei lavori in corso
T_LAV = st('lavori-5337')
M_LAV = 30.302 + 44*BEAT
m0 = M_LAV - T_LAV
mus = carica('banjo.mp3', m0, TOT)[:N]
mus = np.pad(mus, ((0, N-len(mus)), (0, 0)))
t = np.arange(N)/SR
def rampa(t, a, b, va, vb): return va + (vb-va)*np.clip((t-a)/(b-a), 0, 1)
SOTTO = 0.16
env = np.ones(N)
env = np.where(t < st('papera'), 1.0, env)
env = np.minimum(env, np.where(t >= st('papera') - 0.05, rampa(t, st('papera')-0.05, st('papera')+0.25, 1, SOTTO), 1))
sv = st('smallville'); sc = st('scherzi')
env = np.where((t >= sv-0.08) & (t < sc+1.0), rampa(t, sv-0.08, sv+0.05, SOTTO, 0), env)
env = np.where((t >= sc+1.0) & (t < st('lascia-fare')+1.7), rampa(t, sc+1.0, sc+1.7, 0, SOTTO), env)
env = np.where(t >= st('lascia-fare')+1.7, rampa(t, st('lascia-fare')+1.7, T_LAV, SOTTO, 1.0), env)
env = env * np.where(t > TOT-1.3, np.clip((TOT-t)/1.3, 0, 1), 1)
mus *= (env*0.5)[:, None]

# il tema di Smallville, da «Somebody save me»
tema = carica('smallville.mp3', 0.0, (sc - sv) + 2.0)
tema = fade(tema, 0.03, 0.9) * 0.55
tema[:int(0.25*SR)] *= np.linspace(0.3, 1, int(0.25*SR))[:, None]
fx = np.zeros((N, 2), np.float32)
metti(fx, tema, sv)

def sfx(nome, t, g):
    metti(fx, carica(f'asset/{nome}.wav'), t, g)
sfx('flash', st('papera') + 0.06, 0.35)
sfx('flash', st('silos') + 0.06, 0.35)
sfx('whoosh_logo', sv + 0.35, 0.45)
sfx('boom', sv + 1.62, 0.6)
sfx('swipe', sc + 0.78, 0.4)
for s in TL.values():
    if s['tr'] in ('whip', 'zoom'):
        sfx('whip', s['start']/FPS + s['K']/FPS/2 - 0.16, 0.22 if s['tr'] == 'whip' else 0.14)
sfx('tonfo', T_LAV + 0.02, 0.55)

mix = voce + mus + fx
# un limitatore morbido, poi il volume finale a -14 LUFS con ffmpeg
peak = np.abs(mix).max()
if peak > 0.98: mix = np.tanh(mix/0.98*1.2)/np.tanh(1.2)*0.98
wv = wave.open('reel_audio_pre.wav', 'w'); wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR)
wv.writeframes((np.clip(mix, -1, 1)*32767).astype(np.int16).tobytes()); wv.close()
m = subprocess.run(['ffmpeg', '-v', 'info', '-i', 'reel_audio_pre.wav', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float([l for l in m.splitlines() if l.strip().startswith('I:')][-1].split()[1])
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'reel_audio_pre.wav', '-af', f'volume={-14-I:.2f}dB,alimiter=limit=0.89:level=false',
                '-ar', str(SR), 'reel_audio.wav'], check=True)
print('audio', round(TOT, 2), 's, LUFS prima', I, 'base da', round(m0, 3))

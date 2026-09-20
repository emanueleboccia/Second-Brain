import numpy as np, subprocess, sys, os, glob, json
W, H, FPS = 216, 384, 15
def frames(path):
    cmd = ['ffmpeg','-v','error','-threads','1','-i',path,'-vf',f'fps={FPS},scale={W}:{H},format=gray','-f','rawvideo','-']
    data = subprocess.run(cmd, capture_output=True).stdout
    n = len(data)//(W*H)
    return np.frombuffer(data, np.uint8)[:n*W*H].reshape(n,H,W).astype(np.float32)
win = np.outer(np.hanning(H), np.hanning(W)).astype(np.float32)
def shift(a, b):
    A = np.fft.fft2((a-a.mean())*win); B = np.fft.fft2((b-b.mean())*win)
    R = A*np.conj(B); R /= np.abs(R)+1e-9
    r = np.fft.ifft2(R).real
    y, x = np.unravel_index(np.argmax(r), r.shape)
    if y > H//2: y -= H
    if x > W//2: x -= W
    return float(np.hypot(x, y))
out = {}
for p in sorted(glob.glob(os.path.join(sys.argv[1], '*.mov'))):
    n = os.path.basename(p)[:-4]
    f = frames(p)
    s = [shift(f[i], f[i+1]) for i in range(len(f)-1)]
    out[n] = s
    # timeline: one char every 1/3 s (5 pairs): . calmo, o medio, X mosso
    line = ''
    for k in range(0, len(s), 5):
        m = np.median(s[k:k+5])
        line += '.' if m < 1.5 else ('o' if m < 4 else 'X')
    print(f'{n}  {len(f)/FPS:5.1f}s  {line}', flush=True)
json.dump(out, open(os.path.join(sys.argv[2]), 'w'))

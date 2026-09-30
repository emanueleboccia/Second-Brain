# Segue lo schermo dell'iPad fotogramma per fotogramma con la correlazione di fase:
# le bande che sfumano i nomi si muovono con l'inquadratura, invece che su una retta supposta.
import sys, json, numpy as np
W, H = 1080, 1920
d = np.frombuffer(sys.stdin.buffer.read(), np.uint8); n = len(d) // (W * H)
f = d[:n * W * H].reshape(n, H, W).astype(np.float32)
y0, y1, x0, x1 = 900, 1540, 40, 780            # la zona delle schede
reg = f[:, y0:y1, x0:x1]
hh, ww = reg.shape[1:]
win = np.outer(np.hanning(hh), np.hanning(ww)).astype(np.float32)
def fine(c, m, p):
    den = (m - 2 * c + p); return 0.0 if den == 0 else 0.5 * (m - p) / den
def sposta(a, b):
    A = np.fft.fft2((a - a.mean()) * win); B = np.fft.fft2((b - b.mean()) * win)
    Rr = B * np.conj(A); Rr /= np.abs(Rr) + 1e-9
    r = np.fft.ifft2(Rr).real
    y, x = np.unravel_index(np.argmax(r), r.shape)
    yy = y + fine(r[y, x], r[(y - 1) % hh, x], r[(y + 1) % hh, x])
    xx = x + fine(r[y, x], r[y, (x - 1) % ww], r[y, (x + 1) % ww])
    if yy > hh / 2: yy -= hh
    if xx > ww / 2: xx -= ww
    return yy, xx
cum = [(0.0, 0.0)]
for i in range(n - 1):
    dy, dx = sposta(reg[i], reg[i + 1])
    cum.append((cum[-1][0] + dy, cum[-1][1] + dx))
cum = np.array(cum)
k0 = 3
print("fotogrammi:", n)
for k in [3, 18, 33, 40, 44, 45]:
    if k < n:
        print(f"t={9.2 + k / 30:.3f}  dy dal 9.3 = {cum[k,0]-cum[k0,0]:7.1f}   dx = {cum[k,1]-cum[k0,1]:7.1f}")
json.dump({"t0": 9.2, "cum": cum.tolist()}, open(sys.argv[1], "w"))

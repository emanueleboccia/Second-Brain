# Il recupero del colore delle clip Sony: una funzione per pixel, usata sia sui fotogrammi di prova
# (numpy) sia per scrivere la LUT .cube che ffmpeg applica al video. Stessa matematica nei due casi.
import numpy as np

def smoothstep(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)

def pchip(xs, ys, x):
    xs = np.asarray(xs, np.float64); ys = np.asarray(ys, np.float64)
    h = np.diff(xs); d = np.diff(ys) / h
    m = np.zeros_like(xs)
    m[0], m[-1] = d[0], d[-1]
    for i in range(1, len(xs) - 1):
        if d[i - 1] * d[i] <= 0:
            m[i] = 0
        else:
            w1, w2 = 2 * h[i] + h[i - 1], h[i] + 2 * h[i - 1]
            m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i])
    x = np.clip(x, xs[0], xs[-1])
    i = np.clip(np.searchsorted(xs, x) - 1, 0, len(xs) - 2)
    t = (x - xs[i]) / h[i]
    h00 = 2 * t**3 - 3 * t**2 + 1; h10 = t**3 - 2 * t**2 + t
    h01 = -2 * t**3 + 3 * t**2; h11 = t**3 - t**2
    return h00 * ys[i] + h10 * h[i] * m[i] + h01 * ys[i + 1] + h11 * h[i] * m[i + 1]

def hue(y):
    r, g, b = y[..., 0], y[..., 1], y[..., 2]
    return (np.degrees(np.arctan2(np.sqrt(3) * (g - b), 2 * r - g - b)) + 360) % 360

def apply(rgb, P):
    """rgb: array (...,3) in 0-1, codificato (gamma del video). P: parametri della clip."""
    x = np.clip(rgb, 0, 1).astype(np.float64)
    mn_in = x.min(axis=-1, keepdims=True)
    # 1 · bilanciamento del bianco, in luce lineare
    lin = x ** 2.4
    g = np.array(P.get('wb', [1, 1, 1]), np.float64)
    lin = lin * g
    # 1b · dominante delle ombre (offset lineare, come il lift di una ruota colore)
    off = np.array(P.get('lift', [0, 0, 0]), np.float64)
    lin = np.clip(lin + off, 0, None)
    y = np.clip(lin, 0, 1) ** (1 / 2.4)
    # 2-4 · la curva dei toni, canale per canale: toglie il velo in basso, abbassa i medi,
    #       comprime le alte luci sotto il massimo
    cv = P.get('curva', [[0, 0], [1, 1]])
    cx, cy = [p[0] for p in cv], [p[1] for p in cv]
    y_rgb = pchip(cx, cy, y)                                   # canale per canale: satura
    Lg = (0.2126 * y[..., 0] + 0.7152 * y[..., 1] + 0.0722 * y[..., 2])[..., None]
    y_lum = y * (pchip(cx, cy, Lg) / np.maximum(Lg, 1e-6))     # sulla luminanza: tiene la tinta
    mix = P.get('curva_rgb', 0.35)
    y = np.clip(y_lum * (1 - mix) + y_rgb * mix, 0, 1)
    # 5 · saturazione a vibranza: spinge i colori spenti, lascia stare quelli già carichi
    L = (0.2126 * y[..., 0] + 0.7152 * y[..., 1] + 0.0722 * y[..., 2])[..., None]
    mxy = y.max(axis=-1, keepdims=True); mny = y.min(axis=-1, keepdims=True)
    sat = (mxy - mny) / np.maximum(mxy, 1e-6)
    s = P.get('saturazione', 1.0) + P.get('vibranza', 0.0) * (1 - sat)
    y = L + (y - L) * s
    # 5b · il giallo lime (la maglietta fluo) si calma senza toccare l'arancio della zucca
    lime = P.get('lime', 1.0)
    if lime != 1.0:
        hh = hue(y)
        w = smoothstep(48, 58, hh) * (1 - smoothstep(80, 95, hh))
        L2 = (0.2126 * y[..., 0] + 0.7152 * y[..., 1] + 0.0722 * y[..., 2])[..., None]
        y = L2 + (y - L2) * (1 + (lime - 1) * w[..., None])
    # 6 · le zone bianche bruciate restano bianche: solo dove TUTTI i canali sono al massimo
    #     (bianco vero, non un arancio col rosso saturo) si desatura verso la luminanza
    k = smoothstep(P.get('bruciato_da', 0.88), 0.99, mn_in)
    y = y * (1 - k) + L * k
    return np.clip(y, 0, 1)

def write_cube(path, P, N=33):
    r = np.linspace(0, 1, N)
    # ordine .cube: il rosso varia più in fretta
    B, G, R = np.meshgrid(r, r, r, indexing='ij')
    grid = np.stack([R, G, B], axis=-1).reshape(-1, 3)
    out = apply(grid, P)
    with open(path, 'w') as f:
        f.write(f'LUT_3D_SIZE {N}\n')
        for v in out:
            f.write(f'{v[0]:.6f} {v[1]:.6f} {v[2]:.6f}\n')

def wb_da(patch_rgb255, forza=1.0):
    """Guadagni lineari che rendono neutra una zona (media RGB 0-255), con verde fisso a 1."""
    L = (np.array(patch_rgb255, np.float64) / 255) ** 2.4
    g = L[1] / L
    return list(1 + (g - 1) * forza)

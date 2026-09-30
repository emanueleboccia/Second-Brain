# Esporta ogni taglio scelto: ritaglio, LUT del recupero colore, vignetta, nitidezza, 1080x1920 a 30 fps.
# Un ffmpeg alla volta, un thread, nice, e una pausa fra un file e l'altro (render leggeri sul MacBook).
import json, os, subprocess, sys, time
import numpy as np
from PIL import Image
from grade import write_cube, wb_da
SRC = "/Volumes/SSD-MANU/00-SCARICO/sony"
S = json.load(open('segmenti.json')); P = json.load(open('parametri.json'))
os.makedirs('lut', exist_ok=True); os.makedirs('clip', exist_ok=True)
for k, p in P.items():
    p = dict(p)
    if 'wb_ref' in p: p['wb'] = wb_da(p['wb_ref'], p.get('wb_forza', 1.0))
    write_cube(f'lut/{k}.cube', p)
# la vignetta come maschera: la stessa funzione dei provini
h, w = 1920, 1080; yy, xx = np.mgrid[0:h, 0:w]
r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 * 0.8 + ((yy - h / 2) / (h / 2)) ** 2)
m = 1 - 0.28 * np.clip((r - 0.55) / 0.75, 0, 1) ** 1.6
Image.fromarray((m * 255 + .5).astype(np.uint8)).save('vignetta.png')
def dims(p):
    o = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:stream_side_data=rotation',
                        '-of', 'json', p], capture_output=True, text=True).stdout
    s = json.loads(o)['streams'][0]; W, H = s['width'], s['height']
    rot = 0
    for sd in s.get('side_data_list', []) or []:
        if 'rotation' in sd: rot = int(sd['rotation'])
    return (H, W) if abs(rot) == 90 else (W, H)
solo = sys.argv[1:]
for storia, segs in S.items():
    for i, sg in enumerate(segs):
        out = f'clip/{storia}_{i}.mp4'
        if solo and f'{storia}_{i}' not in solo: continue
        if os.path.exists(out) and not solo: continue
        src = f"{SRC}/{sg['clip']}"; W, H = dims(src); sx, sy = W / 1080, H / 1920
        if sg['crop']:
            x, y, cw = sg['crop']; ch = cw * 16 / 9
            X, Y, CW, CH = int(round(x * sx)), int(round(y * sy)), int(round(cw * sx)), int(round(ch * sy))
            CW -= CW % 2; CH -= CH % 2
            crop = f'crop={CW}:{CH}:{X}:{Y},'
        else:
            crop = ''
        fc = (f"[0:v]{crop}scale=1080:1920:flags=lanczos,format=gbrp,lut3d=file=lut/{sg['grade']}.cube:interp=tetrahedral[a];"
              f"[1:v]format=gbrp[m];[a][m]blend=all_mode=multiply:shortest=1,"
              f"scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,unsharp=5:5:0.6:5:5:0,fps=30,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv[v]")
        cmd = ['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '1', '-filter_threads', '1',
               '-ss', f"{sg['da']:.3f}", '-t', f"{sg['a'] - sg['da']:.3f}", '-i', src, '-loop', '1', '-i', 'vignetta.png',
               '-filter_complex', fc, '-map', '[v]', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '12',
               '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv', '-y', out]
        t0 = time.time(); r = subprocess.run(cmd, capture_output=True, text=True)
        print(f"{out}  {time.time() - t0:.0f}s  {'ERRORE ' + r.stderr[-300:] if r.returncode else 'ok'}", flush=True)
        time.sleep(10)
print('FINITO', flush=True)

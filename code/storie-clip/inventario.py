# Inventario delle clip 2025 di Zucche: durata, spazio colore e tre fotogrammi piccoli per clip.
# Un ffmpeg alla volta, con nice e due thread, e una pausa fra un file e l'altro (render leggeri).
import json, os, subprocess, sys, time
W = sys.argv[1]
DRIVE = os.path.expanduser("~/Library/CloudStorage/GoogleDrive-ema.boccia02@gmail.com/Il mio Drive/LA MASSERIA DI MEZZ'AUTUNNO/02 Foto e video/2025 Zucche in Masseria")
SSD = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/riprese-drone/2025-10-19-parco-delle-zucche"
fonti = []
for sotto in ['05 - Persone e ritratti', '02 - Allestimenti e zucche', '03 - Cibo e laboratori', '04 - Paesaggio e masseria']:
    d = os.path.join(DRIVE, sotto)
    for f in sorted(os.listdir(d)):
        if f.lower().endswith(('.mov', '.mp4')):
            fonti.append((sotto, os.path.join(d, f)))
for f in sorted(os.listdir(SSD)):
    if f.lower().endswith('.mp4') and not f.startswith('._'):
        fonti.append(('drone-2025-10-19', os.path.join(SSD, f)))
out = {}
dest = os.path.join(W, 'inventario.json')
if os.path.exists(dest):
    out = json.load(open(dest))
for i, (sotto, p) in enumerate(fonti):
    nome = os.path.basename(p)
    chiave = sotto + '/' + nome
    if chiave in out:
        continue
    try:
        pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
            'stream=width,height,color_transfer,avg_frame_rate:stream_side_data=rotation:format=duration', '-of', 'json', p],
            capture_output=True, text=True, timeout=300).stdout)
        s = pr['streams'][0]; dur = float(pr['format']['duration'])
        rot = 0
        for sd in s.get('side_data_list', []) or []:
            if 'rotation' in sd: rot = int(sd['rotation'])
        fot = []
        for k, frac in enumerate((0.2, 0.5, 0.8)):
            j = os.path.join(W, 'provino', f"{len(out):03d}_{k}.jpg")
            subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '2', '-ss', f"{dur*frac:.2f}", '-i', p,
                            '-frames:v', '1', '-vf', 'scale=320:320:force_original_aspect_ratio=decrease', '-y', j], timeout=300)
            fot.append(j)
        out[chiave] = {'n': len(out), 'path': p, 'dur': round(dur, 2), 'w': s.get('width'), 'h': s.get('height'),
                       'trc': s.get('color_transfer'), 'fps': s.get('avg_frame_rate'), 'rot': rot, 'fot': fot}
    except Exception as e:
        out[chiave] = {'n': len(out), 'path': p, 'errore': str(e)}
    json.dump(out, open(dest, 'w'), indent=1)
    print(f"{i+1}/{len(fonti)} {chiave}", flush=True)
    time.sleep(1.5)
print('fatto', len(out))

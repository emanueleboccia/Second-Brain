# Monta le tre storie dell'Area Food: tagli sul battito, musica sola che prosegue da una storia all'altra,
# nell'ordine di un pranzo (antipasto, pasta, carne). Uso: python3 monta_storie.py A|B|C
import json, os, subprocess, sys, time
from battito import battito
TRACCE = {'A': ('caffeine_creek_band-fried-taters-bluegrass-18547', 40.9),
          'B': ('the_mountain-country-567416', 55.9),
          'C': ('jonasblakewood-acoustic-folk-acoustic-folk-music-580577', 74.9)}
MUS = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica"
ORDINE = ['antipasto', 'pasta', 'carne']
# l'ordine delle inquadrature dentro ogni storia (indici di segmenti.json): l'antipasto chiude sulla focaccia coperta
SEQ = {'antipasto': [0, 1, 2, 4, 3], 'pasta': [0, 1, 2, 3, 4], 'carne': [0, 1, 2, 3, 4, 5]}
FPS = 30
scelta = sys.argv[1]
nome, inizio = TRACCE[scelta]
t0, periodo = battito(f'mus/{nome}.wav', inizio)
if periodo < 0.4:          # il bluegrass dà il doppio tempo: si taglia sul quarto
    periodo *= 2
S = json.load(open('segmenti.json'))
piano, t = {}, 0.0
for storia in ORDINE:
    segs = S[storia]; voci = []
    for pos, i in enumerate(SEQ[storia]):
        sg = segs[i]
        disp = sg['a'] - sg['da'] - 0.05
        tetto = 3.7 if pos == len(SEQ[storia]) - 1 else 2.7      # l'ultima inquadratura resta un po' di più
        n = min(int(disp // periodo), int(tetto // periodo))
        if n < 3: print(f'  ATTENZIONE {storia}_{i}: solo {n} battiti disponibili')
        voci.append({'file': f'clip/{storia}_{i}.mp4', 'battiti': n, 'dur': n * periodo})
    durata = sum(v['dur'] for v in voci)
    piano[storia] = {'da_musica': t, 'durata': durata, 'voci': voci}
    t += durata
totale = t
print(f"traccia {nome} battito {periodo:.4f}s ({60/periodo:.1f} bpm), primo battito a {t0:.3f}s, totale {totale:.2f}s")
for s, p in piano.items():
    print(f"  {s:10s} {p['durata']:5.2f}s  " + ' + '.join(str(v['battiti']) for v in p['voci']) + ' battiti')
os.makedirs('storie', exist_ok=True)
# la musica di tutte e tre, portata a -14 LUFS in un colpo solo e poi tagliata: nessun salto di volume
musica = f'storie/musica-{scelta}.wav'
subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-ss', f'{t0:.3f}', '-t', f'{totale + 0.5:.3f}', '-i', f'{MUS}/{nome}.mp3',
                '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2', '-y', musica], check=True)
for k, storia in enumerate(ORDINE):
    p = piano[storia]; ins, fc, cat = [], [], ''
    cum0 = 0.0
    for j, v in enumerate(p['voci']):
        n_fr = round((cum0 + v['dur']) * FPS) - round(cum0 * FPS); cum0 += v['dur']
        ins += ['-i', v['file']]
        fc.append(f"[{j}:v]trim=end_frame={n_fr},setpts=PTS-STARTPTS,setsar=1[v{j}]"); cat += f'[v{j}]'
    n = len(p['voci'])
    ultima = k == len(ORDINE) - 1
    fade = f"afade=t=in:d=0.03,afade=t=out:st={p['durata'] - (1.0 if ultima else 0.03):.3f}:d={1.0 if ultima else 0.03}"
    fc.append(f"{cat}concat=n={n}:v=1:a=0,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv[v]")
    fc.append(f"[{n}:a]atrim=start={p['da_musica']:.4f}:duration={p['durata']:.4f},asetpts=PTS-STARTPTS,{fade}[a]")
    out = f'storie/storia-{k+1}-{storia}-{scelta}.mp4'
    cmd = ['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-threads', '1', *ins, '-i', musica, '-filter_complex', ';'.join(fc),
           '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
           '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
           '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-y', out]
    subprocess.run(cmd, check=True); print('ok', out, f"{p['durata']:.2f}s", flush=True)
    time.sleep(5)
json.dump({'traccia': nome, 't0': t0, 'periodo': periodo, 'piano': piano}, open(f'storie/ricetta-{scelta}.json', 'w'), indent=1)

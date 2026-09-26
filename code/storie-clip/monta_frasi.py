# Monta le storie «una frase per clip»: ogni clip ha la sua scritta, le clip cambiano sul battito e la
# musica è una traccia sola che prosegue da una storia all'altra, come nelle storie da una clip sola.
# Nato il 25/09/2026 per il giorno prima dell'apertura di Zucche in Masseria.
# Uso: python3 monta_frasi.py ricetta.json cartella-scritte cartella-uscita [nome-storia ...]
import json, os, subprocess, sys

W, H, FPS = 1080, 1920, 30
GRADE = "eq=contrast=1.04:saturation=1.10"     # come le storie di Zucche: bianco neutro, niente calore
MUS = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica"


def musica_intera(traccia, inizio, durata, out):
    # Tutta la musica delle storie si porta a -14 LUFS insieme e poi si taglia: così il volume non salta
    # da una storia all'altra.
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-threads', '1', '-ss', f'{inizio:.3f}',
                    '-t', f'{durata:.3f}', '-i', os.path.join(MUS, traccia + '.mp3'),
                    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-ac', '2', out], check=True)


def storia(s, scritte, musica, m0, passo, out):
    clip = s['clip']
    n = len(clip)
    dur = n * passo
    args = ['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-threads', '2']
    for c in clip:
        args += ['-ss', str(c['ss']), '-t', f'{passo:.4f}', '-i', c['file']]
    for i in range(1, n + 1):
        args += ['-i', os.path.join(scritte, f"{s['nome']}-{i}.png")]
    args += ['-ss', f'{m0:.3f}', '-t', f'{dur:.3f}', '-i', musica]
    f = []
    for i, c in enumerate(clip):
        cx = c.get('cx', 0.5)
        f.append(f"[{i}:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}:(iw-{W})*{cx}:0,"
                 f"fps={FPS},setsar=1,{GRADE},format=yuv420p,trim=duration={passo:.4f},setpts=PTS-STARTPTS[c{i}]")
        f.append(f"[c{i}][{n + i}:v]overlay=0:0:format=auto[v{i}]")
    f.append(''.join(f'[v{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=0[vc]')
    f.append(f"[{2 * n}:a]afade=t=in:st=0:d=0.15,afade=t=out:st={dur - 0.5:.3f}:d=0.5,"
             f"aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a]")
    args += ['-filter_complex', ';'.join(f), '-map', '[vc]', '-map', '[a]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
             '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
             '-c:a', 'aac', '-b:a', '160k', '-threads', '2', '-movflags', '+faststart', '-t', f'{dur:.3f}', out]
    subprocess.run(args, check=True)
    return dur


if __name__ == '__main__':
    r = json.load(open(sys.argv[1]))
    scritte, uscita = sys.argv[2], sys.argv[3]
    solo = set(sys.argv[4:])
    os.makedirs(uscita, exist_ok=True)
    traccia, inizio, passo = r['musica']['traccia'], r['musica']['inizio'], r['musica']['passo']
    totale = sum(len(s['clip']) for s in r['storie']) * passo
    musica = os.path.join(uscita, 'musica.wav')
    if not os.path.exists(musica):
        musica_intera(traccia, inizio, totale + 1, musica)
    m0 = 0.0
    for s in r['storie']:
        dur = len(s['clip']) * passo
        if not solo or s['nome'] in solo:
            out = os.path.join(uscita, f"storia-clip-{s['nome']}.mp4")
            storia(s, scritte, musica, m0, passo, out)
            print(f"{out} — {dur:.2f}s, musica da {inizio + m0:.2f}s", flush=True)
        m0 += dur

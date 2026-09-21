# Monta il format "io e te": clip che scorrono, scritta fissa al centro, musica sola.
# Uso: python3 monta_invito.py ricetta.json uscita.mp4
import json, os, subprocess, sys

W, H, FPS = 1080, 1920, 30
# Il grade comune: un filo di contrasto, poca saturazione in più, calore appena accennato.
# Parte dal bianco neutro, come dice il correction log del 14/09/2026.
GRADE = "eq=contrast=1.04:saturation=1.10"
MUS = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica"

def monta(ric, out):
    clip, testo = ric['clip'], ric['testo']
    traccia, m0 = ric['musica']
    durata = sum(c['dur'] for c in clip)
    args = ['ffmpeg', '-v', 'error', '-y', '-threads', '2']
    for c in clip:
        args += ['-ss', str(c['ss']), '-t', str(c['dur']), '-i', c['file']]
    args += ['-i', testo]
    args += ['-ss', str(m0), '-t', str(durata), '-i', os.path.join(MUS, traccia + '.mp3')]
    n = len(clip)
    f = []
    for i in range(n):
        # riempie il verticale senza deformare, taglia quello che avanza
        cx = clip[i].get('cx', 0.5)   # dove cade il taglio orizzontale, 0 sinistra 1 destra
        f.append(f"[{i}:v]scale={W}:{H}:force_original_aspect_ratio=increase,"
                 f"crop={W}:{H}:(iw-{W})*{cx}:0,fps={FPS},setsar=1,{GRADE},format=yuv420p[v{i}]")
    f.append(''.join(f'[v{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=0[vc]')
    # la scritta resta ferma per tutta la durata, come nel riferimento
    f.append(f'[vc][{n}:v]overlay=0:0:format=auto[vt]')
    f.append(f'[{n+1}:a]afade=t=in:st=0:d=0.4,afade=t=out:st={durata-0.8:.2f}:d=0.8,'
             f'loudnorm=I=-14:TP=-1.5:LRA=11,'
             f'aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a]')
    args += ['-filter_complex', ';'.join(f), '-map', '[vt]', '-map', '[a]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
             '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
             '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', str(durata), out]
    subprocess.run(args, check=True)
    return durata

if __name__ == '__main__':
    r = json.load(open(sys.argv[1]))
    d = monta(r, sys.argv[2])
    print(f'{sys.argv[2]} — {d:.1f}s')

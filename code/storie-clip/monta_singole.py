# Storie da una clip sola, senza scritte, con la musica che prosegue da una storia all'altra.
# Uso: python3 monta_singole.py giornata.json cartella-uscita
# giornata.json: {"musica": [traccia, inizio], "durata": secondi, "clip": [{"nome", "file", "ss", "cx"}, ...]}
# La storia k prende la musica da inizio + k*durata: messe in fila, si sente un brano solo.
# La musica della giornata si porta a -14 LUFS tutta insieme, e poi si taglia: normalizzando ogni pezzo da
# solo, il volume salterebbe da una storia all'altra. Le dissolvenze sono di un decimo di secondo, quanto basta
# a non far scattare l'audio al taglio.
import json, os, subprocess, sys, time

W, H, FPS = 1080, 1920, 30
GRADE = "eq=contrast=1.04:saturation=1.10"     # come le storie di Zucche: bianco neutro, niente calore
MUS = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica"


def musica_giornata(traccia, inizio, durata, out):
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-threads', '1', '-ss', f'{inizio:.3f}', '-t', f'{durata:.3f}',
                    '-i', os.path.join(MUS, traccia + '.mp3'), '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11',
                    '-ar', '48000', '-ac', '2', out], check=True)


def storia(c, musica, m0, dur, out):
    cx = c.get('cx', 0.5)
    v = (f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}:(iw-{W})*{cx}:0,"
         f"fps={FPS},setsar=1,{GRADE},format=yuv420p[v]")
    a = (f"[1:a]afade=t=in:st=0:d=0.1,afade=t=out:st={dur - 0.12:.3f}:d=0.12,"
         f"aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a]")
    subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-threads', '2',
                    '-ss', str(c['ss']), '-t', str(dur), '-i', c['file'],
                    '-ss', f'{m0:.3f}', '-t', str(dur), '-i', musica,
                    '-filter_complex', v + ';' + a, '-map', '[v]', '-map', '[a]',
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
                    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
                    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', str(dur), out], check=True)


if __name__ == '__main__':
    g = json.load(open(sys.argv[1]))
    traccia, inizio = g['musica']
    dur = g['durata']
    os.makedirs(sys.argv[2], exist_ok=True)
    musica = os.path.join(sys.argv[2], 'musica-giornata.wav')
    musica_giornata(traccia, inizio, dur * len(g['clip']) + 0.5, musica)
    for k, c in enumerate(g['clip']):
        out = os.path.join(sys.argv[2], f"{k + 1}-{c['nome']}.mp4")
        storia(c, musica, k * dur, dur, out)
        print(out, flush=True)
        time.sleep(8)                            # una pausa fra un render e l'altro, per il calore del Mac

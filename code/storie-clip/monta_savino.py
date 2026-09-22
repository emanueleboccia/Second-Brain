# Monta la storia di zio Savino: clip che scorrono, scritta solo nei primi secondi,
# musica sola. Una clip con «senza_grade» è già stata gradata a parte (il finale con lo zoom).
# Uso: python3 monta_savino.py ricetta.json uscita.mp4
import json, os, subprocess, sys

W, H, FPS = 1080, 1920, 30
GRADE = "eq=contrast=1.04:saturation=1.10"
MUS = "/Volumes/SSD-MANU/01-DA-MAMMA-ROSARIA/2-libreria/musica"

def monta(ric, out):
    clip = ric['clip']
    testo, fino = ric.get('testo'), ric.get('testo_fino', 3.6)
    traccia, m0 = ric['musica']
    durata = sum(c['dur'] for c in clip)
    args = ['ffmpeg', '-v', 'error', '-y', '-threads', '2']
    # i fotogrammi di ogni clip si contano sul tempo cumulato: senza, ogni clip si allungava di una frazione
    # di fotogramma e a fine storia l'immagine arrivava 0,19 s dopo la musica e la voce
    cum = [0.0]
    for c in clip:
        cum.append(cum[-1] + c['dur'])
    fotogrammi = [round(cum[i+1]*FPS) - round(cum[i]*FPS) for i in range(len(clip))]
    for c in clip:
        args += ['-ss', str(c['ss']), '-t', str(c['dur'] + 0.1), '-i', c['file']]
    n = len(clip)
    if testo:
        args += ['-loop', '1', '-t', str(fino + 1), '-i', testo]
    sub = ric.get('sottotitolo')
    if sub:
        args += ['-loop', '1', '-t', str(sub['a'] - sub['da'] + 0.5), '-i', sub['file']]
    args += ['-ss', str(m0), '-t', str(durata), '-i', os.path.join(MUS, traccia + '.mp3')]
    f = []
    for i in range(n):
        f.append(f"[{i}:v]scale={W}:{H}:force_original_aspect_ratio=increase,"
                 f"crop={W}:{H},fps={FPS},setsar=1,{'' if clip[i].get('senza_grade') else GRADE + ','}format=yuv420p,trim=end_frame={fotogrammi[i]},setpts=PTS-STARTPTS[v{i}]")
    f.append(''.join(f'[v{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=0[vc]')
    if testo:
        # la scritta entra subito e se ne va dopo i primi secondi, in dissolvenza
        f.append(f"[{n}:v]format=rgba,fade=t=in:st=0.2:d=0.5:alpha=1,"
                 f"fade=t=out:st={fino-0.6:.2f}:d=0.6:alpha=1[tt]")
        f.append(f"[vc][tt]overlay=0:0:eof_action=pass[vt0]")
        ia = n + 1
    else:
        f.append('[vc]null[vt0]')
        ia = n
    if sub:
        # il sottotitolo sta solo mentre la voce parla, e non fa in tempo a farsi notare quando entra
        f.append(f"[{ia}:v]format=rgba,fade=t=in:st=0:d=0.25:alpha=1,"
                 f"fade=t=out:st={sub['a']-sub['da']-0.25:.2f}:d=0.25:alpha=1,"
                 f"setpts=PTS+{sub['da']}/TB[ss]")
        f.append("[vt0][ss]overlay=0:0:eof_action=pass[vt]")
        ia += 1
    else:
        f.append('[vt0]null[vt]')
    # l'audio della musica: se una clip ha «voce», lì la musica si abbassa e si sente la presa diretta,
    # alzata di 5 dB: senza, la battuta usciva 6 dB sotto la musica del resto della storia
    voci = [(c, i) for i, c in enumerate(clip) if c.get('voce')]
    if voci:
        t0 = round(cum[voci[0][1]]*FPS)/FPS          # dove l'immagine della clip comincia davvero
        t1 = t0 + fotogrammi[voci[0][1]]/FPS
        f.append(f"[{ia}:a]volume=enable='between(t,{t0-0.3:.2f},{t1+0.3:.2f})':volume=0.18,"
                 f"afade=t=in:st=0:d=0.4,afade=t=out:st={durata-0.8:.2f}:d=0.8[mus]")
        iv = voci[0][1]
        f.append(f"[{iv}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,"
                 f"highpass=f=110,loudnorm=I=-16:TP=-1.5:LRA=11,volume=1.8,adelay={int(t0*1000)}|{int(t0*1000)}[voce]")
        f.append("[mus][voce]amix=inputs=2:duration=first:dropout_transition=0,"
                 "loudnorm=I=-14:TP=-1.5:LRA=11,"
                 "aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a]")
    else:
        f.append(f"[{ia}:a]afade=t=in:st=0:d=0.4,afade=t=out:st={durata-0.8:.2f}:d=0.8,"
                 f"loudnorm=I=-14:TP=-1.5:LRA=11,"
                 f"aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a]")
    args += ['-filter_complex', ';'.join(f), '-map', '[vt]', '-map', '[a]',
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
             '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
             '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-t', str(durata), out]
    subprocess.run(args, check=True)
    return durata

if __name__ == '__main__':
    r = json.load(open(sys.argv[1]))
    print(f'{sys.argv[2]} — {monta(r, sys.argv[2]):.1f}s')

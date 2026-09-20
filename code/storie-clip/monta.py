# Monta una storia clip del conto alla rovescia di Zucche in Masseria.
import subprocess, sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import testi
SDR = os.path.join(HERE, 'sdr'); OUT = os.path.join(HERE, 'storie'); os.makedirs(OUT, exist_ok=True)
MUS = "/Volumes/SSD-MANU/03-LA-MASSERIA-DI-MEZZ'AUTUNNO/2-libreria/musica"

STORIE = json.load(open(os.path.join(HERE, 'storie.json')))

def monta(nome):
    st = STORIE[nome]
    cuts = st['video']                      # [clip, in, durata]
    D = round(sum(c[2] for c in cuts), 3)
    args = ['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-filter_complex_threads', '1', '-filter_threads', '1']
    fc = []; k = 0; vlab = []
    for clip, a, d in cuts:
        args += ['-ss', str(a), '-t', str(d), '-i', os.path.join(SDR, (f'IMG_{clip}.mov' if clip[0].isdigit() else f'{clip}.mov'))]
        fc.append(f'[{k}:v]fps=30,scale=1080:1920,setsar=1,eq=contrast=1.04:saturation=1.10,format=yuv420p,setpts=PTS-STARTPTS[v{k}]')
        vlab.append(f'[v{k}]'); k += 1
    fc.append(''.join(vlab) + f'concat=n={len(cuts)}:v=1:a=0[vc]')
    cur = 'vc'
    if st.get('titolo'):
        png = os.path.join(OUT, f'{nome}-titolo.png'); testi.titolo(str(st['titolo']), png)
        args += ['-loop', '1', '-t', str(D), '-i', png]
        fc.append(f'[{k}:v]format=rgba,fade=in:st=0.4:d=0.6:alpha=1[t{k}]')
        fc.append(f'[{cur}][t{k}]overlay=0:0[o{k}]'); cur = f'o{k}'; k += 1
    for i, (testo, colore, a, b) in enumerate(st.get('sottotitoli', [])):
        png = os.path.join(OUT, f'{nome}-sub{i}.png'); testi.sottotitolo(testo, colore, png)
        args += ['-loop', '1', '-t', str(D), '-i', png]
        fc.append(f'[{k}:v]format=rgba[s{k}]')
        fc.append(f"[{cur}][s{k}]overlay=0:0:enable='between(t,{a},{b})'[o{k}]"); cur = f'o{k}'; k += 1
    if st.get('logo') is not None:
        args += ['-framerate', '30', '-i', os.path.join(HERE, 'logo', 'l_%03d.png')]
        fc.append(f"[{k}:v]format=rgba,setpts=PTS+{st['logo']}/TB[lg{k}]")
        fc.append(f'[{cur}][lg{k}]overlay=0:{st.get("logo_y", 60)}:eof_action=pass[o{k}]'); cur = f'o{k}'; k += 1
    # musica, partenza su un battito
    traccia, m0 = st['musica']
    args += ['-ss', str(m0), '-t', str(D), '-i', os.path.join(MUS, traccia + '.mp3')]
    mi = k; k += 1
    voci = st.get('voci', [])               # [clip, in, out, inizio_nella_storia]
    if voci:
        vl = []
        for clip, a, b, t0 in voci:
            args += ['-ss', str(a), '-t', str(round(b-a, 3)), '-i', os.path.join(SDR, (f'IMG_{clip}.mov' if clip[0].isdigit() else f'{clip}.mov'))]
            dur = round(b-a, 3); ms = int(t0*1000)
            fc.append(f'[{k}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,highpass=f=90,'
                      f'afade=in:d=0.03,afade=out:st={max(0, dur-0.08)}:d=0.08,adelay={ms}:all=1[a{k}]')
            vl.append(f'[a{k}]'); k += 1
        fc.append(''.join(vl) + f'amix=inputs={len(vl)}:normalize=0,apad,atrim=0:{D},loudnorm=I=-16:TP=-2:LRA=8[vox]')
        fine_voce = st['fine_voce']; low = st.get('musica_sotto', 0.2)
        vol = f"if(lt(t,{fine_voce}),{low},{low}+(1-{low})*min(1,(t-{fine_voce})/0.5))"
        fc.append(f"[{mi}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.55,"
                  f"volume='{vol}':eval=frame,afade=in:d=0.05,afade=out:st={D-0.7}:d=0.7[mus]")
        fc.append('[mus][vox]amix=inputs=2:normalize=0:duration=first[mix]')
    else:
        fc.append(f'[{mi}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,'
                  f'afade=in:d=0.05,afade=out:st={D-0.7}:d=0.7[mix]')
    fc.append('[mix]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[aout]')
    out = os.path.join(OUT, nome + '.mp4')
    args += ['-filter_complex', ';'.join(fc), '-map', f'[{cur}]', '-map', '[aout]', '-t', str(D),
             '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-threads', '2', '-pix_fmt', 'yuv420p', '-r', '30',
             '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
             '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', out]
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode: print(r.stderr[-2500:]); sys.exit(1)
    # secondo passaggio: porta il volume integrato a -14 LUFS senza ricodificare il video
    m = subprocess.run(['ffmpeg', '-v', 'info', '-threads', '1', '-i', out, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    I = float([l for l in m.splitlines() if l.strip().startswith('I:')][-1].split()[1])
    if abs(I + 14) > 0.4:
        tmp = out[:-4] + '-gain.mp4'
        subprocess.run(['nice', '-n', '19', 'ffmpeg', '-v', 'error', '-y', '-i', out, '-c:v', 'copy', '-af', f'volume={-14 - I:.2f}dB,alimiter=limit=0.84:level=false',
                        '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', tmp], check=True)
        os.replace(tmp, out)
    print('ok', out, D, 'LUFS prima', I)

if __name__ == '__main__':
    for n in sys.argv[1:]: monta(n)

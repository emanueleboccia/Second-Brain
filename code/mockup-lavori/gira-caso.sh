#!/bin/zsh
# Le ventiquattro anteprime delle pagine dei progetti: 1000 px, 60 fotogrammi al secondo, una alla volta.
cd "$(dirname "$0")"
SITO=~/Desktop/progetti/eb-site/public/lavori
typeset -A SLUG; SLUG=(masseria la-masseria dmr da-mamma-rosaria tenuta tenuta-don-gaetano girarrosto girarrosto-liberti)
for l in masseria dmr tenuta girarrosto; do
  d=$SITO/${SLUG[$l]}/caso; mkdir -p $d
  for n in 1 2 3 4 5 6; do
    v=caso-$l-$n
    echo "== $v $(date +%H:%M:%S)"
    node rendi.cjs video $v || { echo "FALLITO $v"; continue }
    sleep 2
    ffmpeg -v error -y -threads 2 -framerate 60 -i fotogrammi/$v/%04d.jpg -vf "scale=1000:1000:flags=lanczos" -c:v libx264 -profile:v high -crf 27 -preset medium -pix_fmt yuv420p -movflags +faststart -an $d/0$n.mp4
    cwebp -quiet -q 84 -resize 900 900 fotogrammi/$v/0000.jpg -o $d/0$n.webp
    echo "   $(du -k $d/0$n.mp4 | cut -f1) KB · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $d/0$n.mp4) s"
    rm -rf fotogrammi/$v
    sleep 4
  done
done
echo "== fine $(date +%H:%M:%S)"

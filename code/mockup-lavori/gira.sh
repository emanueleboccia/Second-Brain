#!/bin/zsh
# Rende tutto, una cosa alla volta e con le pause: prima le ferme, poi un video dopo l'altro.
cd "$(dirname "$0")"
SITO=~/Desktop/progetti/eb-site/public/lavori
typeset -A SLUG; SLUG=(masseria la-masseria dmr da-mamma-rosaria tenuta tenuta-don-gaetano girarrosto girarrosto-liberti)
mkdir -p uscita
echo "== ferme $(date +%H:%M:%S)"
node rendi.cjs ferme
for l in masseria dmr tenuta girarrosto; do
  d=$SITO/${SLUG[$l]}; mkdir -p $d
  for n in 1 4; do cwebp -quiet -q 84 -resize 800 800 uscita/$l-$n.png -o $d/$n.webp; done
done
sleep 3
for v in masseria-2 masseria-3 dmr-2 dmr-3 tenuta-2 tenuta-3 girarrosto-2 girarrosto-3; do
  l=${v%-*}; n=${v##*-}; d=$SITO/${SLUG[$l]}
  echo "== $v $(date +%H:%M:%S)"
  node rendi.cjs video $v || { echo "FALLITO $v"; continue }
  sleep 2
  ffmpeg -v error -y -threads 2 -framerate 60 -i fotogrammi/$v/%04d.jpg -vf "scale=720:720:flags=lanczos" -c:v libx264 -profile:v high -crf 24 -preset medium -pix_fmt yuv420p -movflags +faststart -an $d/$n.mp4
  cwebp -quiet -q 84 -resize 800 800 fotogrammi/$v/0000.jpg -o $d/$n.webp
  echo "   $(du -k $d/$n.mp4 | cut -f1) KB · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $d/$n.mp4) s"
  rm -rf fotogrammi/$v
  sleep 4
done
echo "== fine $(date +%H:%M:%S)"
ls -la $SITO/*/

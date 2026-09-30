#!/bin/zsh
# Room84: le ferme e i video dell'elenco, poi i sei video della pagina del progetto.
# Una cosa alla volta e con le pause, come gli altri.
cd "$(dirname "$0")"
d=~/Desktop/progetti/eb-site/public/lavori/room84
mkdir -p uscita $d/caso
echo "== ferme $(date +%H:%M:%S)"
node rendi.cjs ferme > /dev/null
for n in 1 4; do cwebp -quiet -q 84 -resize 800 800 uscita/r84-$n.png -o $d/$n.webp; done
sleep 3
for n in 2 3; do
  v=r84-$n
  echo "== $v $(date +%H:%M:%S)"
  node rendi.cjs video $v || { echo "FALLITO $v"; continue }
  sleep 2
  ffmpeg -v error -y -threads 2 -framerate 60 -i fotogrammi/$v/%04d.jpg -vf "scale=720:720:flags=lanczos" -c:v libx264 -profile:v high -crf 24 -preset medium -pix_fmt yuv420p -movflags +faststart -an $d/$n.mp4
  cwebp -quiet -q 84 -resize 800 800 fotogrammi/$v/0000.jpg -o $d/$n.webp
  echo "   $(( $(stat -f%z $d/$n.mp4) / 1024 )) KB · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $d/$n.mp4) s"
  rm -rf fotogrammi/$v
  sleep 4
done
for n in 1 2 3 4 5 6; do
  v=caso-r84-$n
  echo "== $v $(date +%H:%M:%S)"
  node rendi.cjs video $v || { echo "FALLITO $v"; continue }
  sleep 2
  ffmpeg -v error -y -threads 2 -framerate 60 -i fotogrammi/$v/%04d.jpg -vf "scale=1000:1000:flags=lanczos" -c:v libx264 -profile:v high -crf 27 -preset medium -pix_fmt yuv420p -movflags +faststart -an $d/caso/0$n.mp4
  cwebp -quiet -q 84 -resize 900 900 fotogrammi/$v/0000.jpg -o $d/caso/0$n.webp
  echo "   $(( $(stat -f%z $d/caso/0$n.mp4) / 1024 )) KB · $(ffprobe -v error -show_entries format=duration -of csv=p=0 $d/caso/0$n.mp4) s"
  rm -rf fotogrammi/$v
  sleep 4
done
echo "== fine $(date +%H:%M:%S)"

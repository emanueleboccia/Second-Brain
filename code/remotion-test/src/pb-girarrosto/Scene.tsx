import { AbsoluteFill, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { LUCE, FONDO } from "./font";
import { FPS } from "./testo";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- la soggettiva ----------
// Gli spezzoni muti preparati da scripts/pb-girarrosto-prepara.py, uno dopo l'altro. Come nel reel
// di riferimento, a ogni stacco cambia lo zoom: qui scatta con una molla veloce in punti scelti,
// e la scena può partire un po' stretta e allargarsi, per dare movimento dal primo fotogramma.
export const Pov: React.FC<{
  spezzoni: { file: string; frames: number }[];
  zoom?: [number, number][]; // [frame della scena, scala]
  apertura?: number; // scala di partenza che torna a 1 nei primi 10 frame
  spinta?: number; // avvicinamento lento su tutta la scena
  frames: number;
  centro?: [number, number];
  cartella?: string; // dove stanno gli spezzoni, dentro public/: gli altri reel del personal brand usano la loro
}> = ({ spezzoni, zoom = [], apertura, spinta, frames, centro = [540, 900], cartella = "pb-girarrosto/seg" }) => {
  const frame = useCurrentFrame();
  let scala = zoom.reduce((s, [f, z]) => {
    const m = spring({ frame: frame - f, fps: FPS, config: { damping: 200, stiffness: 520, mass: 0.6 } });
    return s * (1 + (z - 1) * m);
  }, 1);
  if (apertura) scala *= interpolate(frame, [0, 10], [apertura, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (spinta) scala *= interpolate(frame, [0, frames], [1, spinta], clamp);
  let da = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: `${scala}`, transformOrigin: `${centro[0]}px ${centro[1]}px` }}>
        {spezzoni.map((s) => {
          const seq = (
            <Sequence key={s.file + da} from={da} durationInFrames={s.frames}>
              <Video src={staticFile(`${cartella}/${s.file}.mp4`)} muted />
            </Sequence>
          );
          da += s.frames;
          return seq;
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- il fondale firma ----------
// Base nero caldo, griglia crema al 5,5% in celle da 72 px che si vede solo dove arriva la luce,
// bagliore caldo e vignetta: gli stessi numeri di code/caroselli/stampo.css. Da design.md: i dati
// mostrati nei video stanno sul fondale firma.
export const Fondale: React.FC<{ luceY?: string }> = ({ luceY = "46%" }) => (
  <AbsoluteFill style={{ backgroundColor: FONDO }}>
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(238,235,218,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(238,235,218,.055) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        backgroundPosition: "36px 36px",
        WebkitMaskImage: `radial-gradient(ellipse 70% 42% at 50% ${luceY}, #000 0%, rgba(0,0,0,.35) 55%, transparent 80%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 85% 70% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,.55) 76%, #000 100%), radial-gradient(circle at 50% ${luceY}, rgba(${LUCE},.30) 0%, rgba(${LUCE},.12) 28%, rgba(${LUCE},0) 60%)`,
      }}
    />
  </AbsoluteFill>
);

// Entrata comune delle illustrazioni: salgono un poco e si fermano con una molla morbida.
export const useEntrata = (ritardo = 0) => {
  const frame = useCurrentFrame();
  return spring({ frame: frame - ritardo, fps: FPS, config: { damping: 16, stiffness: 140, mass: 0.8 } });
};

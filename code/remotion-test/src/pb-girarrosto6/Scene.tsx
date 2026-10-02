import { AbsoluteFill, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { FONDO, LUCE } from "../pb-girarrosto/font";
import { FPS } from "./testo";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- la soggettiva ----------
// Come nella v5, ma ogni spezzone può partire da un punto suo (`da`, in fotogrammi): la v6 cambia inquadratura ogni
// due secondi, e lo stesso spezzone si usa in due posti senza far vedere due volte lo stesso pezzo.
export const Pov: React.FC<{
  spezzoni: { file: string; frames: number; da?: number }[];
  zoom?: [number, number][]; // [frame della scena, scala]
  apertura?: number;
  spinta?: number;
  frames: number;
  centro?: [number, number];
}> = ({ spezzoni, zoom = [], apertura, spinta, frames, centro = [540, 900] }) => {
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
              <Video src={staticFile(`pb-girarrosto6/seg/${s.file}.mp4`)} muted trimBefore={s.da ?? 0} />
            </Sequence>
          );
          da += s.frames;
          return seq;
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- il fondale firma, scuro ----------
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

// ---------- il fondale chiaro ----------
// La scala chiara del sito e dei caroselli: fondo crema, griglia leggera che sfuma verso i bordi, niente bagliore.
// Nella v6 c'è perché la revisione del 03/10/2026 ha trovato i reel tutti scuri: le illustrazioni del lavoro la usano.
export const FondaleChiaro: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#EEEBDA" }}>
    <AbsoluteFill
      style={{
        backgroundImage: "linear-gradient(#E2DEC9 1.5px, transparent 1.5px), linear-gradient(90deg, #E2DEC9 1.5px, transparent 1.5px)",
        backgroundSize: "72px 72px",
        backgroundPosition: "36px 36px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 45%, #000 0%, rgba(0,0,0,.6) 60%, transparent 95%)",
      }}
    />
  </AbsoluteFill>
);

export const useEntrata = (ritardo = 0) => {
  const frame = useCurrentFrame();
  return spring({ frame: frame - ritardo, fps: FPS, config: { damping: 16, stiffness: 140, mass: 0.8 } });
};

// La camera sulle illustrazioni: va da un'inquadratura all'altra con una molla veloce, come un taglio morbido.
// Ogni chiave è [frame, scala, x, y]: il punto (x, y) dell'illustrazione finisce al centro dello schermo.
export const useCamera = (chiavi: [number, number, number, number][], frame: number) => {
  let [, s, x, y] = chiavi[0];
  for (let i = 1; i < chiavi.length; i++) {
    const [f, s2, x2, y2] = chiavi[i];
    const m = spring({ frame: frame - f, fps: FPS, config: { damping: 200, stiffness: 300, mass: 0.7 } });
    s += (s2 - s) * m; x += (x2 - x) * m; y += (y2 - y) * m;
  }
  return { scala: s, x, y };
};

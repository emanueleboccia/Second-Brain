import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont as caricaInter } from "@remotion/google-fonts/Inter";
import { Finale } from "./Finale";
import { Scena } from "./Scena";
import {
  CHIUSURA,
  FINALE,
  SEGMENTI,
  TRANSIZIONE,
  durataDi,
  durataSpezzoni,
} from "./tempi";

caricaInter("normal", { weights: ["500", "800"], subsets: ["latin"] });

// Come si passa da uno spezzone al successivo. Dove cambia la clip lo stacco
// può essere dichiarato — uno scorrimento si legge come «siamo altrove» — e
// ogni volta da una direzione diversa, perché lo stesso movimento ripetuto
// cinque volte diventa un tic. Dove invece la ripresa è la stessa e si è tolto
// solo del silenzio, la dissolvenza serve a nascondere il salto, non a farlo
// notare: è l'unico modo di togliere aria morta senza un singhiozzo.
const PASSAGGI = [
  slide({ direction: "from-right" }),
  slide({ direction: "from-bottom" }),
  slide({ direction: "from-left" }),
  fade(),
  fade(),
];

export const Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const uscitaMarchio = durataSpezzoni;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        {SEGMENTI.map((segmento, i) => (
          <TransitionSeries.Sequence
            key={segmento.id}
            name={segmento.id}
            durationInFrames={durataDi(i)}
          >
            <Scena segmento={segmento} indice={i} />
          </TransitionSeries.Sequence>
        )).flatMap((sequenza, i) =>
          i === 0
            ? [sequenza]
            : [
                <TransitionSeries.Transition
                  key={`t-${i}`}
                  presentation={PASSAGGI[(i - 1) % PASSAGGI.length]}
                  timing={linearTiming({ durationInFrames: TRANSIZIONE })}
                />,
                sequenza,
              ],
        )}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: CHIUSURA })}
        />
        <TransitionSeries.Sequence name="Finale" durationInFrames={FINALE}>
          <Finale />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Interactive.Div
        name="Marchio"
        style={{
          position: "absolute",
          top: 150,
          left: 90,
          fontFamily: "Inter, sans-serif",
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: 11,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.82)",
          textShadow: "0 2px 14px rgba(0,0,0,0.7)",
          opacity: interpolate(
            frame,
            [8, 30, uscitaMarchio - 14, uscitaMarchio - 4],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        Sistema Evolve
      </Interactive.Div>
    </AbsoluteFill>
  );
};

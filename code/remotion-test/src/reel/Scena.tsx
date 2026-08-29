import { AbsoluteFill, Easing, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { Sottotitoli } from "./Sottotitoli";
import { TRANSIZIONE, inFrame, zoomDi, type Segmento } from "./tempi";

// Uno spezzone: il video a tutto schermo, un movimento lento di scala e i suoi
// sottotitoli sopra. Il volume sale in tre fotogrammi e scende sulla coda che la
// transizione si mangia, così durante lo stacco si sente solo il blocco entrante.
export const Scena: React.FC<{ segmento: Segmento; indice: number }> = ({
  segmento,
  indice,
}) => {
  const frame = useCurrentFrame();
  const parlato = inFrame(segmento.durata);
  const [da, a] = zoomDi(indice);

  const scala = interpolate(frame, [0, parlato], [da, a], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill name="Scena" style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scala})`, transformOrigin: "50% 42%" }}>
        <Video
          name="Ripresa"
          src={staticFile(`clips/${segmento.id}.mp4`)}
          objectFit="cover"
          style={{
            width: "100%",
            height: "100%",
            filter: "contrast(1.07) saturate(1.1)",
          }}
          volume={(f) =>
            Math.min(1, f / 3, Math.max(0, parlato + TRANSIZIONE / 2 - f) / TRANSIZIONE)
          }
        />
      </AbsoluteFill>
      <Interactive.Div
        name="Velo"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.62) 100%)",
        }}
      />
      <Sottotitoli file={`captions/${segmento.id}.json`} />
    </AbsoluteFill>
  );
};

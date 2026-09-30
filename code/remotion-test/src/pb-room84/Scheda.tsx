import { AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { Fondale } from "../pb-girarrosto/Scene";
import { FPS } from "./testo";

// Il foglio ripreso dall'alto, dentro una scheda sul fondale firma. Dall'alto la testa di Emanuele
// entra nell'inquadratura, e un verticale pieno la terrebbe dentro: ritagliato dal 4K, il foglio
// sta in una scheda della sua misura e resta nitido. La scheda sale e si ferma con una molla; dentro,
// l'inquadratura cambia a scatti come nella soggettiva, sui punti in cui cambia il blocco della voce.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scheda: React.FC<{
  file: string;
  frames: number;
  larghezza?: number;
  altezza?: number;
  alto?: number;
  zoom?: [number, number][]; // [frame della scena, fattore]
  centro?: [number, number]; // punto dello zoom, in pixel della scheda
  salta?: number; // fotogrammi dello spezzone da saltare all'inizio
}> = ({ file, frames, larghezza = 840, altezza = 1120, alto = 150, zoom = [], centro = [440, 700], salta = 0 }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const scala =
    zoom.reduce((s, [f, z]) => {
      const m = spring({ frame: frame - f, fps: FPS, config: { damping: 200, stiffness: 520, mass: 0.6 } });
      return s * (1 + (z - 1) * m);
    }, 1) * interpolate(frame, [0, frames], [1, 1.04], clamp);
  const luce = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: luce }}>
        <Fondale luceY="36%" />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: (1080 - larghezza) / 2,
          top: alto,
          width: larghezza,
          height: altezza,
          borderRadius: 30,
          overflow: "hidden",
          backgroundColor: "#000",
          boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.10)",
          scale: `${0.9 + 0.1 * e}`,
          translate: `0 ${(1 - e) * 90}px`,
          opacity: Math.min(1, e * 1.4),
        }}
      >
        <div style={{ width: "100%", height: "100%", scale: `${scala}`, transformOrigin: `${centro[0]}px ${centro[1]}px` }}>
          <Video src={staticFile(`pb-room84/seg/${file}.mp4`)} muted trimBefore={salta || undefined} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

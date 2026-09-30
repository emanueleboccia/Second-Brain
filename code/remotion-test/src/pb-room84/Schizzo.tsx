import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Fondale } from "../pb-girarrosto/Scene";
import { MONO, SPENTO } from "../pb-girarrosto/font";
import { FPS } from "./testo";
import { Sezioni, Telefono, misure } from "./Telefono";

// «Lo costruisco come l'ho disegnato, pezzo per pezzo»: il foglio vero a sinistra, fermo del 4K, e il
// telefono col sito nuovo a destra. A ogni battuta si accende un blocco del foglio, il resto si spegne, e il
// telefono va alla sezione che quel blocco è diventato. Il sito ha le sezioni nello stesso ordine del foglio,
// e il reel lo fa vedere invece di dirlo.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// I blocchi del disegno, in pixel di public/pb-room84/schizzo.jpg (580×1090), e la sezione del sito che
// ne è uscita. Letti a occhio sul fermo del 29/09 a 2:11 di IMG_5652.
export const BLOCCHI_FOGLIO: { nome: string; y0: number; y1: number; sezione: string }[] = [
  { nome: "testata", y0: 52, y1: 212, sezione: "sez-testata" },
  { nome: "booking", y0: 208, y1: 252, sezione: "sez-booking" },
  { nome: "chi siamo", y0: 248, y1: 374, sezione: "sez-chisiamo" },
  { nome: "camere", y0: 370, y1: 550, sezione: "sez-camere" },
  { nome: "esperienza", y0: 546, y1: 670, sezione: "sez-esperienza" },
  { nome: "recensioni", y0: 666, y1: 802, sezione: "sez-recensioni" },
  { nome: "gallery", y0: 798, y1: 887, sezione: "sez-gallery" },
  { nome: "dintorni", y0: 883, y1: 974, sezione: "sez-dintorni" },
];
const X0 = 128;
const X1 = 445;
const LARGO = 580;
const ALTO = 1090;

export const Schizzo: React.FC<{ cambi: number[] }> = ({ cambi }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const k = 440 / LARGO; // il foglio largo 440 px
  // il blocco acceso scivola da un blocco all'altro
  const idx = cambi.reduce((p, f, i) => {
    if (i === 0) return 0;
    return p + spring({ frame: frame - f, fps: FPS, config: { damping: 200, stiffness: 560, mass: 0.45 } });
  }, 0);
  const i0 = Math.min(BLOCCHI_FOGLIO.length - 1, Math.floor(idx));
  const i1 = Math.min(BLOCCHI_FOGLIO.length - 1, i0 + 1);
  const t = idx - i0;
  const y0 = interpolate(t, [0, 1], [BLOCCHI_FOGLIO[i0].y0, BLOCCHI_FOGLIO[i1].y0]) * k;
  const y1 = interpolate(t, [0, 1], [BLOCCHI_FOGLIO[i0].y1, BLOCCHI_FOGLIO[i1].y1]) * k;
  const spento = interpolate(frame, [cambi[0], cambi[0] + 6], [0, 0.58], clamp);
  const velo = `rgba(14,14,12,${spento})`;
  const tel = 470;
  const mt = misure(tel);
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 950 - (ALTO * k) / 2,
          width: LARGO * k,
          height: ALTO * k,
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 36px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(238,235,218,.10)",
          scale: `${0.92 + 0.08 * e}`,
          translate: `${(1 - e) * -60}px 0`,
          opacity: Math.min(1, e * 1.4),
        }}
      >
        <Img src={staticFile("pb-room84/schizzo.jpg")} style={{ width: LARGO * k, height: ALTO * k, display: "block" }} />
        {/* il velo sul resto del foglio: sopra e sotto il blocco acceso, e ai lati */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: y0, background: velo }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: y1, bottom: 0, background: velo }} />
        <div style={{ position: "absolute", left: 0, width: X0 * k, top: y0, height: y1 - y0, background: velo }} />
        <div style={{ position: "absolute", left: X1 * k, right: 0, top: y0, height: y1 - y0, background: velo }} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 58,
          top: 950 - mt.totale / 2,
          scale: `${0.92 + 0.08 * e}`,
          translate: `${(1 - e) * 60}px 0`,
          opacity: Math.min(1, e * 1.4),
        }}
      >
        <Telefono larghezza={tel}>
          <Sezioni file={BLOCCHI_FOGLIO.map((b) => b.sezione)} larghezza={tel} cambi={cambi} />
        </Telefono>
      </div>
      <div
        style={{
          position: "absolute",
          left: 58,
          top: 950 + (ALTO * k) / 2 + 26,
          width: LARGO * k,
          textAlign: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "0.14em",
          color: SPENTO,
          opacity: e,
          textTransform: "uppercase",
        }}
      >
        {BLOCCHI_FOGLIO[Math.round(idx)].nome}
      </div>
    </AbsoluteFill>
  );
};

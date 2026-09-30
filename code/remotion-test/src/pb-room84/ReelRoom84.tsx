import { AbsoluteFill, Sequence, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { CREMA, MONO, SPENTO } from "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { Finale } from "../pb-girarrosto/ReelGirarrosto";
import { Scheda } from "./Scheda";
import { Schizzo } from "./Schizzo";
import { Sottotitoli } from "./Sottotitoli";
import { Pagina, Telefono, misure } from "./Telefono";
import { FPS, MUTO, VOCE, inFrame, type Linea } from "./testo";

// Il reel di Room84: il sito vecchio sul fisso, il foglio, il disegno ripreso dall'alto, i Ray-Ban, il foglio
// che diventa sito, il risultato e il confronto. Lo stile è quello approvato sul reel del Girarrosto
// (docs/procedure/reel-personal-brand.md); la voce è la presa diretta di Emanuele.

type Tratto = { da: number; a: number };
const tratto = (s: Tratto) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });
const locale = (s: Tratto, z: [number, number][] = []) => z.map(([t, f]) => [inFrame(t) - inFrame(s.da), f] as [number, number]);
const CARTELLA = "pb-room84/seg";

// Un telefono al centro del fondale, con la pagina che scorre.
const TelefonoSolo: React.FC<{ file: string; tappe: [number, number][] }> = ({ file, tappe }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const l = 560;
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <div style={{ position: "absolute", left: (1080 - l) / 2, top: 150, scale: `${0.92 + 0.08 * e}`, translate: `0 ${(1 - e) * 80}px`, opacity: Math.min(1, e * 1.4) }}>
        <Telefono larghezza={l}>
          <Pagina file={file} larghezza={l} tappe={tappe} />
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

// Il prima e il dopo, due telefoni accanto: la testata del sito del 2025 e quella nuova, che scorrono insieme.
const Confronto: React.FC<{ frames: number }> = ({ frames }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const l = 450;
  const m = misure(l);
  const tappe: [number, number][] = [[0, 0], [frames, Math.min(900, frames * 5)]];
  const etichetta = (testo: string, colore: string) => (
    <div style={{ marginTop: 26, textAlign: "center", fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: "0.16em", color: colore }}>{testo}</div>
  );
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <div style={{ position: "absolute", top: 930 - m.totale / 2 - 30, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 44 }}>
        <div style={{ translate: `${(1 - e) * -90}px 0`, opacity: Math.min(1, e * 1.4) }}>
          <Telefono larghezza={l}>
            <Pagina file="prima-m" larghezza={l} tappe={tappe} />
          </Telefono>
          {etichetta("PRIMA", SPENTO)}
        </div>
        <div style={{ translate: `${(1 - e) * 90}px 0`, opacity: Math.min(1, e * 1.4) }}>
          <Telefono larghezza={l}>
            <Pagina file="dopo-m" larghezza={l} tappe={tappe} />
          </Telefono>
          {etichetta("DOPO", CREMA)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ReelRoom84: React.FC<{ versione: "voce" | "muto" }> = ({ versione }) => {
  const L: Linea = versione === "voce" ? VOCE : MUTO;
  const SCENE = L.scene;
  const s = Object.fromEntries(Object.entries(SCENE).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof SCENE, ReturnType<typeof tratto>>;
  const pov = (file: string, t: ReturnType<typeof tratto>, extra: Partial<React.ComponentProps<typeof Pov>> = {}) => (
    <Pov cartella={CARTELLA} spezzoni={[{ file, frames: t.durationInFrames }]} frames={t.durationInFrames} {...extra} />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...s.imacPrimaA}>{pov("imac-prima-a", s.imacPrimaA, { apertura: 1.14, centro: [540, 900] })}</Sequence>
      <Sequence {...s.telefonoPrima}>
        <TelefonoSolo file="prima-m" tappe={[[0, 0], [6, 0], [s.telefonoPrima.durationInFrames, 700]]} />
      </Sequence>
      <Sequence {...s.imacPrimaB}>{pov("imac-prima-b", s.imacPrimaB, { apertura: 1.1, centro: [540, 900] })}</Sequence>
      <Sequence {...s.lampoDopo}>{pov("imac-dopo-lampo", s.lampoDopo, { apertura: 1.16, spinta: 1.05, centro: [540, 900] })}</Sequence>
      <Sequence {...s.imacPrimaC}>{pov("imac-prima-c", s.imacPrimaC, { apertura: 1.1, centro: [540, 900] })}</Sequence>
      <Sequence {...s.scrivania}>{pov("scrivania", s.scrivania, { spinta: 1.07, centro: [560, 1250] })}</Sequence>
      <Sequence {...s.rbInizio}>{pov("rb-inizio", s.rbInizio, { apertura: 1.12, centro: [700, 1300] })}</Sequence>
      <Sequence {...s.camere}>
        <Scheda file="camere" frames={s.camere.durationInFrames} zoom={locale(SCENE.camere, SCENE.camere.zoom)} centro={[380, 520]} salta={inFrame(SCENE.camere.salta ?? 0)} />
      </Sequence>
      <Sequence {...s.recensioni}>
        <Scheda file="recensioni" frames={s.recensioni.durationInFrames} zoom={locale(SCENE.recensioni, SCENE.recensioni.zoom)} />
      </Sequence>
      <Sequence {...s.penna}>{pov("penna", s.penna, { apertura: 1.12, centro: [620, 1300] })}</Sequence>
      <Sequence {...s.mani}>{pov("mani", s.mani, { zoom: locale(SCENE.mani, SCENE.mani.zoom), centro: [540, 1500] })}</Sequence>
      {/* Sotto i sottotitoli della soggettiva c'è il foglio bianco: un'ombra morbida dal basso, non un riquadro. */}
      <Sequence from={s.scrivania.from} durationInFrames={s.rbInizio.from + s.rbInizio.durationInFrames - s.scrivania.from}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.34) 74%, rgba(0,0,0,.18) 100%)" }} />
      </Sequence>
      <Sequence from={s.penna.from} durationInFrames={s.penna.durationInFrames + s.mani.durationInFrames}>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.34) 74%, rgba(0,0,0,.18) 100%)" }} />
      </Sequence>
      <Sequence {...s.schizzo}>
        <Schizzo cambi={L.cambiSchizzo.map((t) => inFrame(t) - s.schizzo.from)} />
      </Sequence>
      <Sequence {...s.imacDopo}>{pov("imac-dopo", s.imacDopo, { apertura: 1.12, spinta: 1.05, centro: [540, 900] })}</Sequence>
      <Sequence {...s.confronto}>
        <Confronto frames={s.confronto.durationInFrames} />
      </Sequence>
      <Sequence {...s.finale}>
        {pov("imac-finale", s.finale, { spinta: 1.06, centro: [540, 900] })}
        <Sequence from={6}>
          <Finale />
        </Sequence>
      </Sequence>
      <Sottotitoli blocchi={L.blocchi} />
      {L.voce ? <Audio src={staticFile("pb-room84/voce.wav")} /> : null}
    </AbsoluteFill>
  );
};

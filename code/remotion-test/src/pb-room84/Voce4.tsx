import { AbsoluteFill, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { FinaleCta } from "../pb-girarrosto/ReelGirarrosto";
import { PaginaCheScorre } from "./Finestra";
import { FoglioCheDiventaSito, FoglioCheSiDisegna } from "./FoglioDisegno";
import { Sottotitoli } from "./Sottotitoli";
import { Telefono, misure } from "./Telefono";
import { FPS, inFrame, type Blocco } from "./testo";
import voce4 from "./voce4.json";

// Il quarto reel di Room84, 30/09/2026 notte. Il terzo Emanuele l'ha bocciato: «si deve vedere bene il prima del sito
// ed il dopo». Sul fisso nella stanza buia il sito era piccolo e scuro, e il foglio si mangiava metà del video. Qui il
// prima e il dopo sono il sito da telefono, grande e nella stessa inquadratura, dalle schermate vere di
// scripts/pb-room84-cattura.cjs; quando dice la scritta in alto, il telefono ci zooma sopra, nello stesso punto per i
// due siti, così il confronto si vede a colpo d'occhio. Il foglio è un passaggio veloce. I tempi vengono dalla sua
// voce (scripts/pb-room84-voce4.py), e in chiusura c'è la CTA.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const T = voce4 as {
  durata: number;
  scene: Record<"prima" | "scrivania" | "penna" | "foglio" | "sito" | "dopo" | "chiusura", { da: number; a: number }>;
  disegno: number[];
  pieni: number[];
  movimenti: { zoomPrima: [number, number]; zoomDopo: [number, number]; numeri: number; chiavi: number };
  blocchi: Blocco[];
  cta: { da: number; chiave: number };
};
export const DURATA_VOCE4 = inFrame(T.durata);

// Il telefono grande: 580 px, sopra la fascia dei sottotitoli.
const LARGO = 580;
const M = misure(LARGO);
const SINISTRA = (1080 - LARGO) / 2;
const ALTO = 100;
const K = M.schermo / 390; // pixel per punto della pagina
// dove sta la scritta in alto nelle due pagine, in punti: il titolo del sito vecchio e quello del nuovo
const TITOLO = { prima: 250, dopo: 300 };

const SitoGrande: React.FC<{
  pagina: "prima" | "dopo";
  tappe: [number, number][]; // [fotogramma della scena, punto della pagina in alto]
  zoom: [number, number]; // fotogrammi della scena in cui entra e esce lo zoom sulla scritta in alto
}> = ({ pagina, tappe, zoom }) => {
  const frame = useCurrentFrame();
  const entra = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const z =
    interpolate(frame, [zoom[0], zoom[0] + 14], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) }) *
    interpolate(frame, [zoom[1], zoom[1] + 14], [1, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const origineY = ALTO + M.bordo + M.barra + TITOLO[pagina] * K;
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      <AbsoluteFill style={{ scale: `${1 + 0.45 * z}`, transformOrigin: `540px ${origineY}px` }}>
        <div style={{ position: "absolute", left: SINISTRA, top: ALTO, translate: `0 ${(1 - entra) * 120}px`, opacity: Math.min(1, entra * 1.4) }}>
          <Telefono larghezza={LARGO}>
            <PaginaCheScorre
              file={`${pagina}-m`}
              punti={390}
              larghezza={M.schermo}
              tappe={tappe}
              video={pagina === "dopo" ? { src: "hero-telefono.mp4", x: 0, y: 0, w: 390, h: 1049 } : undefined}
            />
          </Telefono>
        </div>
      </AbsoluteFill>
      {/* l'ombra in basso, come sulle riprese: con lo zoom sotto i sottotitoli passava il riquadro bianco delle date del
          sito vecchio, e il testo crema non si leggeva. Nessun riquadro, solo il fondo che scurisce */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,${0.35 + 0.35 * z}) 74%, rgba(0,0,0,${0.45 + 0.3 * z}) 100%)` }} />
    </AbsoluteFill>
  );
};

const tratto = (s: { da: number; a: number }) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });

export const ReelRoom84Voce4: React.FC = () => {
  const s = Object.fromEntries(Object.entries(T.scene).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof T.scene, ReturnType<typeof tratto>>;
  const mv = T.movimenti;
  const locale = (sec: number, scena: keyof typeof T.scene) => inFrame(sec) - inFrame(T.scene[scena].da);
  const CARTELLA = "pb-room84/seg";
  const ombra = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.34) 74%, rgba(0,0,0,.18) 100%)" }} />;
  // il sito vecchio: fermo sulla testata finché dura lo zoom, poi scende piano
  const primaFine = s.prima.durationInFrames;
  const zoomPrima: [number, number] = [locale(mv.zoomPrima[0], "prima"), locale(mv.zoomPrima[1], "prima")];
  const tappePrima: [number, number][] = [[0, 0], [zoomPrima[1] + 10, 0], [primaFine, 1100]];
  // il sito nuovo: la testata con lo zoom, poi «Due camere, due numeri» col 9,8 sotto, poi le chiavi sotto la CTA
  const zoomDopo: [number, number] = [8, locale(mv.zoomDopo[1], "dopo")];
  const numeri = locale(mv.numeri, "dopo");
  const chiavi = locale(T.cta.da, "dopo");
  const tappeDopo: [number, number][] = [[0, 0], [zoomDopo[1] + 8, 0], [zoomDopo[1] + 30, 1050], [numeri, 1050], [numeri + 20, 1300], [chiavi, 1300], [chiavi + 26, 2150]];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...s.prima}>
        <SitoGrande pagina="prima" tappe={tappePrima} zoom={zoomPrima} />
      </Sequence>
      <Sequence {...s.scrivania}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "scrivania", frames: s.scrivania.durationInFrames }]} frames={s.scrivania.durationInFrames} spinta={1.07} centro={[560, 1250]} />
        {ombra}
      </Sequence>
      <Sequence {...s.penna}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "scrive", frames: s.penna.durationInFrames }]} frames={s.penna.durationInFrames} apertura={1.1} centro={[360, 950]} />
        {ombra}
      </Sequence>
      <Sequence {...s.foglio}>
        <FoglioCheSiDisegna tempi={T.disegno.map(inFrame)} fine={s.foglio.durationInFrames} />
      </Sequence>
      <Sequence {...s.sito}>
        <FoglioCheDiventaSito pieni={T.pieni.map(inFrame)} />
      </Sequence>
      <Sequence {...s.dopo}>
        <SitoGrande pagina="dopo" tappe={tappeDopo} zoom={zoomDopo} />
      </Sequence>
      <Sequence {...s.chiusura}>
        <FinaleCta passata={inFrame(T.cta.chiave) - inFrame(T.cta.da)} righe={["Conosci qualcuno", "con un B&B?"]} chiave="Mandagli questo video." />
      </Sequence>
      <Sottotitoli blocchi={T.blocchi} />
      <Audio src={staticFile("pb-room84/voce4.wav")} />
    </AbsoluteFill>
  );
};

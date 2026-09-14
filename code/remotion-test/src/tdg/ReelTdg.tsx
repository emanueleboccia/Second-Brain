import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio, Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import {
  CARTELLO,
  CHIUSURA,
  HOOK_ENTRA,
  HOOK_ESCE,
  HOOK_INIZIA_USCITA,
  HOOK_PIENO,
  MUSICA_ENTRA,
  MUSICA_SFUMA,
  REEL,
  TRANSIZIONE,
  durataDi,
  durataTotale,
  inFrame,
  type NomeReel,
  type Segmento,
} from "./tempi";

// Cinzel è l'unico carattere del brand: 03 Brand kit/03 FONT.
const { fontFamily } = loadFont("normal", { weights: ["600"], subsets: ["latin"] });

// La palette del Brand kit, 02 COLORI.
const MARRONE = "#1A1613";
const ORO = "#D8BD87";
const CREMA = "#F4ECD6";
const ORO_MUTO = "#96825A";

// Ogni spezzone ha un avvicinamento lento, alternato in direzione: il reel del 29/08
// si muove piano, e due stacchi consecutivi con la stessa scala sembrano un salto.
const Scena: React.FC<{ segmento: Segmento; indice: number }> = ({ segmento, indice }) => {
  const frame = useCurrentFrame();
  const durata = inFrame(segmento.durata) + TRANSIZIONE;
  const [da, a] = indice % 2 === 0 ? [1.0, 1.05] : [1.05, 1.0];

  return (
    <AbsoluteFill style={{ backgroundColor: MARRONE, overflow: "hidden" }}>
      <Video
        src={staticFile(segmento.sorgente)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, durata], [da, a], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          }),
        }}
      />
    </AbsoluteFill>
  );
};

// L'hook scritto, su una banda marrone quasi piena: il testo chiaro sopra una ripresa
// che a tratti è chiara anche lei non si legge in mezzo secondo senza banda.
const Hook: React.FC<{ righe: string[]; dallAlto: number }> = ({ righe, dallAlto }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Interactive.Div
        name="Hook"
        style={{
          position: "absolute",
          top: dallAlto,
          width: "100%",
          paddingTop: 54,
          paddingBottom: 60,
          backgroundColor: "rgba(26, 22, 19, 0.86)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: interpolate(
            frame,
            [HOOK_ENTRA, HOOK_PIENO, HOOK_INIZIA_USCITA, HOOK_ESCE],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <div style={{ width: 70, height: 2, backgroundColor: ORO_MUTO, marginBottom: 30 }} />
        {righe.map((riga, i) => (
          <div
            key={riga}
            style={{
              fontFamily,
              fontWeight: 600,
              fontSize: 66,
              letterSpacing: 5,
              lineHeight: 1.22,
              color: i === righe.length - 1 ? ORO : CREMA,
              textAlign: "center",
            }}
          >
            {riga}
          </div>
        ))}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

// Il cartello finale del reel del 29/08: fondo oro, logo scuro al centro.
const Cartello: React.FC = () => (
  <AbsoluteFill
    style={{ backgroundColor: ORO, justifyContent: "center", alignItems: "center" }}
  >
    <Img src={staticFile("tdg/logo-scuro.png")} style={{ width: 560 }} />
  </AbsoluteFill>
);

export const ReelTdg: React.FC<{ reel: NomeReel }> = ({ reel }) => {
  const { segmenti, hook, bandaDallAlto, musica } = REEL[reel];
  const totale = durataTotale(segmenti);

  return (
    <AbsoluteFill style={{ backgroundColor: MARRONE }}>
      <Audio
        src={staticFile(musica)}
        volume={(f) =>
          interpolate(f, [0, MUSICA_ENTRA, totale - MUSICA_SFUMA, totale], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <TransitionSeries>
        {segmenti.flatMap((segmento, i) => {
          const sequenza = (
            <TransitionSeries.Sequence
              key={segmento.id}
              name={segmento.id}
              durationInFrames={durataDi(segmenti, i)}
            >
              <Scena segmento={segmento} indice={i} />
            </TransitionSeries.Sequence>
          );
          return i === 0
            ? [sequenza]
            : [
                <TransitionSeries.Transition
                  key={`t-${segmento.id}`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: TRANSIZIONE })}
                />,
                sequenza,
              ];
        })}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: CHIUSURA })}
        />
        <TransitionSeries.Sequence name="Cartello" durationInFrames={CARTELLO}>
          <Cartello />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Hook righe={hook} dallAlto={bandaDallAlto} />
    </AbsoluteFill>
  );
};

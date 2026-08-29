import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { loadFont as caricaInter } from "@remotion/google-fonts/Inter";
import { loadFont as caricaPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { DISTANZA, TESTATA, type MenuProps } from "./menu";
import { RigaPiatto } from "./Piatto";

caricaPlayfair("normal", { weights: ["500"], subsets: ["latin"] });
caricaInter("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const MenuTv: React.FC<MenuProps> = ({
  insegna,
  sottotitolo,
  valuta,
  piatti,
  piede,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Lavagna"
      style={{
        backgroundColor: "#12100D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "140px 80px 110px 80px",
      }}
    >
      <Interactive.Div
        name="Testata"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          opacity: interpolate(frame, [0, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [0, 34], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 40,
            fontWeight: 500,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#C8A34A",
          }}
        >
          {sottotitolo}
        </div>
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 100,
            fontWeight: 500,
            lineHeight: 1.1,
            textAlign: "center",
            color: "#F4EDE2",
          }}
        >
          {insegna}
        </div>
        <div
          style={{
            width: 180,
            height: 2,
            backgroundColor: "#C8A34A",
            transformOrigin: "center",
            scale: interpolate(frame, [14, 44], ["0 1", "1 1"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
      </Interactive.Div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
          gap: 130,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {piatti.map((piatto, i) => (
          <RigaPiatto
            key={piatto.nome}
            piatto={piatto}
            valuta={valuta}
            ritardo={TESTATA + i * DISTANZA}
          />
        ))}
      </div>

      <Interactive.Div
        name="Piede"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 36,
          fontWeight: 400,
          letterSpacing: 6,
          textTransform: "uppercase",
          textAlign: "center",
          color: "#6B6357",
          opacity: interpolate(frame, [110, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {piede}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

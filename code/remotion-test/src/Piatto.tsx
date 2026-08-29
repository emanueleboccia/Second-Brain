import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import type { Piatto } from "./menu";

export const RigaPiatto: React.FC<{
  piatto: Piatto;
  valuta: string;
  ritardo: number;
}> = ({ piatto, valuta, ritardo }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Piatto"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        opacity: interpolate(frame, [ritardo, ritardo + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [ritardo, ritardo + 30],
          ["0px 52px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 60,
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#F4EDE2",
          }}
        >
          {piatto.nome}
        </div>
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 60,
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#C8A34A",
            whiteSpace: "nowrap",
          }}
        >
          {valuta} {piatto.prezzo}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#332E26",
          transformOrigin: "left center",
          scale: interpolate(frame, [ritardo + 10, ritardo + 40], ["0 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 44,
          fontWeight: 400,
          lineHeight: 1.4,
          color: "#A79E90",
          maxWidth: 780,
        }}
      >
        {piatto.descrizione}
      </div>
    </Interactive.Div>
  );
};

import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Finale"
      style={{
        backgroundColor: "#0B0B0C",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 44,
        padding: "0 110px",
      }}
    >
      <Interactive.Div
        name="Marchio finale"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: 16,
          textTransform: "uppercase",
          color: "#FFC940",
          opacity: interpolate(frame, [4, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Sistema Evolve
      </Interactive.Div>
      <Interactive.Div
        name="Frase finale"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 82,
          fontWeight: 800,
          lineHeight: 1.18,
          letterSpacing: -1,
          textAlign: "center",
          color: "#F5F3EE",
          opacity: interpolate(frame, [12, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: interpolate(frame, [12, 40], ["0px 26px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Ci fermiamo in ufficio e te lo spiego.
      </Interactive.Div>
    </AbsoluteFill>
  );
};

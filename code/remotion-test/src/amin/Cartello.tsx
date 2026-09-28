import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame } from "remotion";
import { ARANCIO, CREMA, HERO, MARRONE, NICONNE, POPPINS } from "./font";
import { FPS, TAPPE, type Tappa } from "./tempi";

// Il cartello della tappa: una tavola color crema appesa a due corde, che scende dall'alto,
// rimbalza e oscilla, come un'insegna di legno del parco. Sta sul cielo, sopra la testa di Amin,
// e ha il suo fondo chiaro: quindi testo marrone e accento arancio, come vuole il design sui fondi
// chiari. In alto il contatore, «Tappa 3 di 8»: gli appunti dicono che una lista annunciata tiene
// chi guarda fino all'ultima voce.
export const Cartello: React.FC<{ tappa: Tappa; durata: number }> = ({ tappa, durata }) => {
  const frame = useCurrentFrame();

  const discesa = spring({ frame: frame - 2, fps: FPS, config: { damping: 10, stiffness: 150, mass: 0.7 } });
  const salita = interpolate(frame, [durata - 7, durata], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  // L'oscillazione: parte ampia quando la tavola arriva e si spegne in un secondo e mezzo.
  const t = Math.max(0, frame - 6) / FPS;
  const oscilla = 7 * Math.exp(-2.4 * t) * Math.sin(t * 9);

  const lungo = (tappa.prima + tappa.accento + tappa.dopo).length > 18;

  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: 200,
          translate: `0px ${interpolate(discesa, [0, 1], [-520, 0]) - 520 * salita}px`,
          rotate: `${oscilla}deg`,
          transformOrigin: "50% -200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* le due corde, fino al bordo alto del fotogramma */}
        <div style={{ position: "absolute", top: -210, left: 70, width: 5, height: 214, backgroundColor: "#7A5A38" }} />
        <div style={{ position: "absolute", top: -210, right: 70, width: 5, height: 214, backgroundColor: "#7A5A38" }} />
        <div
          style={{
            backgroundColor: CREMA,
            borderRadius: 26,
            border: `3px solid rgba(43, 26, 18, 0.22)`,
            boxShadow: "0 22px 50px rgba(0,0,0,0.38), inset 0 -6px 0 rgba(43, 26, 18, 0.08)",
            padding: lungo ? "24px 46px 30px" : "24px 62px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 480,
          }}
        >
          <div
            style={{
              fontFamily: POPPINS,
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: 7,
              textTransform: "uppercase",
              color: ARANCIO,
              marginBottom: 6,
            }}
          >
            Tappa {tappa.numero} di {TAPPE.length}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              fontFamily: HERO,
              fontWeight: 700,
              fontSize: lungo ? 58 : 72,
              lineHeight: 1.12,
              color: MARRONE,
              whiteSpace: "nowrap",
            }}
          >
            {tappa.prima ? <span>{tappa.prima}</span> : null}
            <span style={{ fontFamily: NICONNE, fontWeight: 400, fontSize: lungo ? 76 : 96, color: ARANCIO }}>
              {tappa.accento}
            </span>
            {tappa.dopo ? <span>{tappa.dopo}</span> : null}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { ARANCIO, AVORIO, CREMA, GIALLO, HERO, MARRONE, NICONNE, OMBRA, POPPINS, VERDE } from "./font";
import { FPS, HOOK_PASSO, HOOK_PRIMA_PAROLA } from "./tempi";

const molla = (frame: number, da: number, config = { damping: 12, stiffness: 220, mass: 0.5 }) =>
  spring({ frame: frame - da, fps: FPS, config });

// L'hook scritto: la domanda di Valentina, «dove li porto questo weekend?», e Amin che risponde
// urlando. Parole che entrano una alla volta, «weekend» in Niconne giallo come accento, velatura
// scura che scende dall'alto perché sul cielo chiaro il testo avorio da solo sparisce.
const DOMANDA: { testo: string; accento?: boolean; riga: number }[] = [
  { testo: "Dove", riga: 0 },
  { testo: "porti", riga: 0 },
  { testo: "i", riga: 0 },
  { testo: "bambini", riga: 0 },
  { testo: "questo", riga: 1 },
  { testo: "weekend?", riga: 1, accento: true },
];

export const Hook: React.FC<{ durata: number }> = ({ durata }) => {
  const frame = useCurrentFrame();
  const uscita = interpolate(frame, [durata - 6, durata], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(20,12,8,0.72) 0%, rgba(20,12,8,0.45) 22%, rgba(20,12,8,0) 38%)",
          opacity: 1 - uscita,
        }}
      />
      <AbsoluteFill
        style={{
          top: 230,
          alignItems: "center",
          translate: `${-80 * uscita}px 0px`,
          opacity: 1 - uscita,
          filter: uscita > 0 ? `blur(${10 * uscita}px)` : undefined,
        }}
      >
        {[0, 1].map((riga) => (
          <div key={riga} style={{ display: "flex", gap: 20, alignItems: "baseline", height: riga ? 140 : 100 }}>
            {DOMANDA.map((p, i) => {
              if (p.riga !== riga) return null;
              const m = molla(frame, HOOK_PRIMA_PAROLA + i * HOOK_PASSO);
              return (
                <span
                  key={p.testo}
                  style={{
                    display: "inline-block",
                    fontFamily: p.accento ? NICONNE : HERO,
                    fontWeight: p.accento ? 400 : 700,
                    fontSize: p.accento ? 132 : 88,
                    color: p.accento ? GIALLO : AVORIO,
                    textShadow: OMBRA,
                    opacity: interpolate(m, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                    scale: interpolate(m, [0, 1], [0.5, 1]),
                    translate: `0px ${interpolate(m, [0, 1], [30, 0])}px`,
                  }}
                >
                  {p.testo}
                </span>
              );
            })}
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Il cartellino col nome, come nei documentari: presenta la guida. Fondo crema, quindi il testo è
// marrone e il nome, l'accento, in Niconne arancio.
export const Nome: React.FC<{ durata: number }> = ({ durata }) => {
  const frame = useCurrentFrame();
  const m = molla(frame, 0, { damping: 14, stiffness: 200, mass: 0.6 });
  const uscita = interpolate(frame, [durata - 6, durata], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 1010,
          translate: `${interpolate(m, [0, 1], [-420, 0]) - 420 * uscita}px 0px`,
          rotate: "-3deg",
          backgroundColor: CREMA,
          borderRadius: 22,
          padding: "14px 34px 10px",
          boxShadow: "0 14px 36px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontFamily: POPPINS, fontWeight: 500, fontSize: 24, letterSpacing: 5, color: MARRONE }}>
          LA NOSTRA GUIDA
        </div>
        <div style={{ fontFamily: NICONNE, fontSize: 92, lineHeight: 1, color: ARANCIO, marginTop: -2 }}>Amin</div>
      </div>
    </AbsoluteFill>
  );
};

// Il tentativo di dire Fienopoli, grande, come l'ha detto lui, fra virgolette gialle.
export const Tentativo: React.FC<{ testo: string }> = ({ testo }) => {
  const frame = useCurrentFrame();
  const m = molla(frame, 0, { damping: 8, stiffness: 260, mass: 0.5 });
  const scuoti = frame < 12 ? 5 * Math.sin(frame * 2.4) * (1 - frame / 12) : 0;
  return (
    <AbsoluteFill style={{ top: 1250, alignItems: "center" }}>
      <div
        style={{
          fontFamily: HERO,
          fontWeight: 700,
          fontSize: testo.length > 9 ? 104 : 124,
          color: AVORIO,
          textShadow: OMBRA,
          scale: interpolate(m, [0, 1], [0.3, 1]),
          rotate: `${scuoti}deg`,
          opacity: interpolate(m, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: GIALLO }}>«</span>
        {testo}
        <span style={{ color: GIALLO }}>»</span>
      </div>
    </AbsoluteFill>
  );
};

// Il timbro sul fermo immagine: arriva grande e sbatte giù. Fondo crema perché si legga anche sul
// cielo; arancio per i tentativi bocciati, verde per il «quasi». Sta fra il cartello e la testa di
// Amin, mai sul volto: nel fermo la faccia è metà della gag.
export const Timbro: React.FC<{ testo: string; esito: "no" | "quasi" }> = ({ testo, esito }) => {
  const frame = useCurrentFrame();
  const m = molla(frame, 3, { damping: 13, stiffness: 320, mass: 0.6 });
  const colore = esito === "no" ? ARANCIO : VERDE;
  return (
    <AbsoluteFill style={{ alignItems: "center", top: 500 }}>
      <div
        style={{
          rotate: esito === "no" ? "-9deg" : "7deg",
          scale: interpolate(m, [0, 1], [2.4, 1]),
          opacity: interpolate(m, [0, 0.25], [0, 1], { extrapolateRight: "clamp" }),
          border: `9px solid ${colore}`,
          borderRadius: 24,
          backgroundColor: "rgba(247, 235, 214, 0.92)",
          padding: "14px 40px 18px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 74, color: colore, lineHeight: 1 }}>
          {esito === "no" ? "✕" : "✓"}
        </span>
        <span
          style={{
            fontFamily: POPPINS,
            fontWeight: 700,
            fontSize: 60,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: colore,
          }}
        >
          {testo}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// La postilla sotto l'ultimo «Bere spritz!»: piccola, come le scritte in fondo ai contratti.
export const Postilla: React.FC<{ testo: string }> = ({ testo }) => {
  const frame = useCurrentFrame();
  const m = molla(frame, 0, { damping: 12, stiffness: 220, mass: 0.5 });
  return (
    <AbsoluteFill style={{ top: 1500, alignItems: "center" }}>
      <div
        style={{
          fontFamily: POPPINS,
          fontWeight: 500,
          fontSize: 40,
          letterSpacing: 1,
          color: AVORIO,
          textShadow: OMBRA,
          opacity: interpolate(m, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
          translate: `0px ${interpolate(m, [0, 1], [16, 0])}px`,
        }}
      >
        {testo}
      </div>
    </AbsoluteFill>
  );
};

// Il logo di Zucche entra quando Amin dice «Zucche in Masseria», una volta sola nel video: le
// scritte verde oliva sulla paglia non si leggono, quindi sta su una tavola avorio sua, grande,
// perché il logo non si rimpicciolisce (design, 24/09/2026). Prima dello spritz esce dall'alto, per
// lasciare lo schermo alla gag; sull'ultimo spritz fermo ricade al centro, e sotto compaiono le date
// e i biglietti: è l'ultima cosa che si vede.
export const Firma: React.FC<{ esce: number; finale: number }> = ({ esce, finale }) => {
  const frame = useCurrentFrame();
  const m = molla(frame, 0, { damping: 9, stiffness: 170, mass: 0.7 });
  const via = interpolate(frame, [esce, esce + 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const torna = spring({ frame: frame - finale, fps: FPS, config: { damping: 12, stiffness: 150, mass: 0.8 } });
  const date = molla(frame, finale + 10, { damping: 13, stiffness: 200, mass: 0.6 });
  const biglietti = molla(frame, finale + 16, { damping: 10, stiffness: 220, mass: 0.6 });
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: frame < finale ? interpolate(via, [0, 1], [100, -800]) : interpolate(torna, [0, 1], [-800, 470]),
          scale: interpolate(m, [0, 1], [0.35, 1]),
          rotate: `${interpolate(m, [0, 1], [-10, 0])}deg`,
          opacity: interpolate(m, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          backgroundColor: AVORIO,
          borderRadius: 40,
          padding: "30px 40px 26px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* sopra «Venite oggi» Amin è in primo piano: la tavola resta sopra la sua testa */}
        <Img
          src={staticFile("amin/logo-zucche.png")}
          style={{ width: frame < finale ? 520 : interpolate(torna, [0, 1], [520, 620]) }}
        />
        <div style={{ height: interpolate(date, [0, 1], [0, 300]), overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* su due righe, e «31 ottobre» sempre insieme: una data non si spezza */}
          <div
            style={{
              marginTop: 20,
              fontFamily: HERO,
              fontWeight: 700,
              fontSize: 58,
              lineHeight: 1.12,
              color: MARRONE,
              textAlign: "center",
              opacity: date,
            }}
          >
            <div>Tutti i weekend</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, whiteSpace: "nowrap" }}>
              <span>fino al 31</span>
              <span style={{ fontFamily: NICONNE, fontWeight: 400, fontSize: 80, color: ARANCIO }}>ottobre</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              backgroundColor: ARANCIO,
              borderRadius: 999,
              padding: "16px 54px 18px",
              fontFamily: POPPINS,
              fontWeight: 700,
              fontSize: 42,
              color: AVORIO,
              scale: interpolate(biglietti, [0, 1], [0.5, 1]),
              opacity: interpolate(biglietti, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            Biglietti su Clappit
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

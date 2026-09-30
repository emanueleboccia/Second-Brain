import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ARCHIVO, CREMA, FONDO, OMBRA, PASSATA } from "./font";
import { SCENE_A_TEMPO, type BloccoATempo } from "./testo";

// I sottotitoli del personal brand, decisi con Emanuele il 29/09/2026 sul reel di riferimento:
// blocchi di due-quattro parole che cambiano dietro alla voce, crema in Archivo Bold, niente
// riquadri dietro, l'ombra a tenere il contrasto. La parola chiave va sulla passata crema, col
// testo nero in Archivo Black largo: la passata entra da sinistra come un evidenziatore.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Passata: React.FC<{ testo: string; da: number; grande?: boolean; dimensione?: number }> = ({ testo, da, grande, dimensione }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [da, da + 6], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 0.8, 0.2, 1) });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: grande ? "6px 24px 14px" : "2px 16px 9px", margin: "6px 2px 0" }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: PASSATA,
          borderRadius: "6px 14px 8px 12px / 12px 6px 14px 8px",
          rotate: "-1.5deg",
          scale: `${k} 1`,
          transformOrigin: "left center",
          boxShadow: "0 6px 22px rgba(0,0,0,.35)",
        }}
      />
      <span
        style={{
          position: "relative",
          fontFamily: ARCHIVO,
          fontWeight: 900,
          fontStretch: "125%",
          fontSize: dimensione ?? (grande ? 104 : 74),
          letterSpacing: "-0.01em",
          color: FONDO,
          textShadow: "none",
          clipPath: `inset(-20% ${(1 - k) * 100}% -20% -5%)`,
        }}
      >
        {testo}
      </span>
    </span>
  );
};

// Il blocco si scrive col pezzo chiave al suo posto nella frase.
const Righe: React.FC<{ b: BloccoATempo }> = ({ b }) => {
  if (!b.chiave) return <>{b.testo}</>;
  const i = b.testo.indexOf(b.chiave);
  const prima = b.testo.slice(0, i).trimEnd();
  const dopo = b.testo.slice(i + b.chiave.length);
  return (
    <>
      {prima ? <>{prima} </> : null}
      <Passata testo={b.chiave} da={b.da + 2} />
      {dopo}
    </>
  );
};

export const Sottotitoli: React.FC = () => {
  const frame = useCurrentFrame();
  const tutti = SCENE_A_TEMPO.flatMap((s) => s.blocchiATempo);
  const b = tutti.find((x) => frame >= x.da && frame < x.a);
  if (!b) return null;
  const entra = interpolate(frame, [b.da, b.da + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 440 }}>
      <div
        style={{
          maxWidth: 860,
          textAlign: "center",
          fontFamily: ARCHIVO,
          fontWeight: 700,
          fontStretch: "100%",
          fontSize: 60,
          lineHeight: 1.14,
          color: CREMA,
          textShadow: OMBRA,
          textWrap: "balance",
          opacity: entra,
          translate: `0 ${(1 - entra) * 10}px`,
        }}
      >
        <Righe b={b} />
      </div>
    </AbsoluteFill>
  );
};

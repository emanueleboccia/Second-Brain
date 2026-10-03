import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame } from "remotion";
import { ARCHIVO, CREMA, FONDO, OMBRA, PASSATA } from "../pb-girarrosto/font";
import { FPS, SCENE_A_TEMPO, type BloccoATempo } from "./testo";

// I testi della v7 (03/10/2026), copiati dalla v6 perché leggono i tempi della v7. Tre cose diverse dalla v5, decise nella revisione dei reel e con Emanuele:
// - il titolo grande, come la copertina di un carosello, che dice il problema dal primo secondo e chiude il reel;
// - i sottotitoli più grandi e più in alto, e scuri quando sotto c'è la scala chiara, dove la passata si ribalta;
// - nessun punto in fondo alle frasi, come nei titoli dei caroselli dal 02/10/2026.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const NERO = "#0E0E0C";

export const Passata: React.FC<{ testo: string; da: number; dimensione?: number; chiaro?: boolean }> = ({ testo, da, dimensione = 74, chiaro }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [da, da + 6], [0, 1], { ...clamp, easing: Easing.bezier(0.2, 0.8, 0.2, 1) });
  return (
    <span style={{ position: "relative", display: "inline-block", padding: dimensione > 90 ? "4px 26px 16px" : "2px 16px 9px", margin: "6px 2px 0" }}>
      <span style={{ position: "absolute", inset: 0, background: chiaro ? NERO : PASSATA, borderRadius: "6px 14px 8px 12px / 12px 6px 14px 8px",
        rotate: "-1.5deg", scale: `${k} 1`, transformOrigin: "left center", boxShadow: chiaro ? "0 6px 18px rgba(0,0,0,.18)" : "0 6px 22px rgba(0,0,0,.35)" }} />
      <span style={{ position: "relative", fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: dimensione, letterSpacing: "-0.01em",
        color: chiaro ? PASSATA : FONDO, textShadow: "none", clipPath: `inset(-20% ${(1 - k) * 100}% -20% -5%)` }}>{testo}</span>
    </span>
  );
};

// ---------- il titolo grande ----------
// Due righe: la prima in crema, enorme, la seconda sulla passata. Sta in alto, con una velatura scura dietro che la
// stacca dalla ripresa. `da` è quando entra, in frame della sequenza.
export const TitoloGrande: React.FC<{ riga: string; chiave: string; da?: number; corpo?: number; alto?: number }> = ({ riga, chiave, da = 0, corpo = 168, alto = 250 }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame: frame - da, fps: FPS, config: { damping: 15, stiffness: 190, mass: 0.7 } });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.45) 32%, rgba(0,0,0,0) 55%)", opacity: interpolate(frame, [da, da + 6], [0, 1], clamp) }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: alto }}>
        <div style={{ textAlign: "center", opacity: e, scale: `${0.86 + 0.14 * e}` }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: corpo, lineHeight: 0.95, letterSpacing: "-0.02em", color: CREMA, textShadow: OMBRA }}>{riga}</div>
          <div style={{ marginTop: 14 }}>
            <Passata testo={chiave} da={da + 9} dimensione={Math.round(corpo * 0.62)} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- i sottotitoli ----------
const Righe: React.FC<{ b: BloccoATempo; chiaro: boolean }> = ({ b, chiaro }) => {
  if (!b.chiave) return <>{b.testo}</>;
  const i = b.testo.indexOf(b.chiave);
  const prima = b.testo.slice(0, i).trimEnd();
  const dopo = b.testo.slice(i + b.chiave.length);
  return (
    <>
      {prima ? <>{prima} </> : null}
      <Passata testo={b.chiave} da={b.da + 2} dimensione={76} chiaro={chiaro} />
      {dopo}
    </>
  );
};

// `chiaro` dice in quali tratti sotto c'è la scala chiara; `nascosti` dove il testo lo porta il titolo grande.
export const Sottotitoli: React.FC<{ chiaro: [number, number][]; nascosti: [number, number][] }> = ({ chiaro, nascosti }) => {
  const frame = useCurrentFrame();
  if (nascosti.some(([a, z]) => frame >= a && frame < z)) return null;
  const b = SCENE_A_TEMPO.flatMap((s) => s.blocchiATempo).find((x) => frame >= x.da && frame < x.a);
  if (!b) return null;
  const inChiaro = chiaro.some(([a, z]) => frame >= a && frame < z);
  const entra = interpolate(frame, [b.da, b.da + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 540 }}>
      <div style={{ maxWidth: 900, textAlign: "center", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 68, lineHeight: 1.12,
        color: inChiaro ? NERO : CREMA, textShadow: inChiaro ? "none" : OMBRA, textWrap: "balance", opacity: entra, translate: `0 ${(1 - entra) * 10}px` }}>
        <Righe b={b} chiaro={inChiaro} />
      </div>
    </AbsoluteFill>
  );
};

// ---------- la CTA ----------
// Le parole che dice lui, com'è: una domanda e poi «mandagli questo video» sulla passata. Resta su due inquadrature.
export const FinaleCta: React.FC<{ passata: number }> = ({ passata }) => {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.6) 100%)", opacity: e }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 500 }}>
        <div style={{ textAlign: "center", opacity: e, translate: `0 ${(1 - e) * 14}px` }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 68, lineHeight: 1.12, color: CREMA, textShadow: OMBRA }}>
            <div>Hai un amico che fa ancora</div>
            <div>i conti a mente?</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Passata testo="Mandagli questo video" da={passata} dimensione={70} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

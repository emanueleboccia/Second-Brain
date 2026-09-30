import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ARCHIVO, CREMA, OMBRA } from "../pb-girarrosto/font";
import { Passata } from "../pb-girarrosto/Sottotitoli";
import { inFrame, type Blocco } from "./testo";

// Gli stessi sottotitoli del reel del Girarrosto, decisi con Emanuele il 29/09/2026: blocchi brevi,
// crema in Archivo Bold, niente riquadri, l'ombra a tenere il contrasto, la parola chiave sulla
// passata. Qui i blocchi arrivano coi secondi veri della voce invece che dalle scene.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Righe: React.FC<{ b: Blocco; da: number }> = ({ b, da }) => {
  if (!b.chiave) return <>{b.testo}</>;
  const i = b.testo.indexOf(b.chiave);
  const prima = b.testo.slice(0, i).trimEnd();
  const dopo = b.testo.slice(i + b.chiave.length);
  return (
    <>
      {prima ? <>{prima} </> : null}
      <Passata testo={b.chiave} da={da + 2} />
      {dopo}
    </>
  );
};

export const Sottotitoli: React.FC<{ blocchi: Blocco[] }> = ({ blocchi }) => {
  const frame = useCurrentFrame();
  const b = blocchi.find((x) => frame >= inFrame(x.da) && frame < inFrame(x.a));
  if (!b) return null;
  const da = inFrame(b.da);
  const entra = interpolate(frame, [da, da + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
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
        <Righe b={b} da={da} />
      </div>
    </AbsoluteFill>
  );
};

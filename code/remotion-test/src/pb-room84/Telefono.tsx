import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { FPS } from "./testo";

// Il telefono dei mockup: le schermate vere dei siti di Room84, fatte da scripts/pb-room84-cattura.cjs e
// pb-room84-sezioni.cjs, dentro un telefono sul fondale. È il modo delle anteprime dei lavori approvato da
// Emanuele il 29/09 (code/mockup-lavori): schermate vere che scorrono, non una registrazione dello schermo.
// Le schermate sono a 3x su un telefono largo 390 punti.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PUNTI = 390;
const ALTO = 844;

export const misure = (larghezza: number) => {
  const bordo = Math.round(larghezza * 0.034);
  const schermo = larghezza - 2 * bordo;
  const barra = Math.round(schermo * 0.12); // la barra di stato, sopra la pagina
  const altezza = Math.round((schermo * ALTO) / PUNTI) + barra;
  return { bordo, schermo, barra, altezza, totale: altezza + 2 * bordo, raggio: Math.round(larghezza * 0.15) };
};

export const Telefono: React.FC<{ larghezza: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  larghezza,
  children,
  style,
}) => {
  const m = misure(larghezza);
  return (
    <div
      style={{
        width: larghezza,
        height: m.totale,
        borderRadius: m.raggio,
        background: "linear-gradient(160deg, #26241f, #0b0b0a 40%)",
        padding: m.bordo,
        boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1.5px rgba(238,235,218,.16), inset 0 0 0 1px rgba(238,235,218,.08)",
        ...style,
      }}
    >
      <div style={{ width: m.schermo, height: m.altezza, borderRadius: m.raggio - m.bordo, overflow: "hidden", position: "relative", background: "#000" }}>
        <div style={{ position: "absolute", top: m.barra, left: 0, right: 0, bottom: 0, overflow: "hidden" }}>{children}</div>
        <div
          style={{
            position: "absolute",
            top: Math.round(m.barra * 0.28),
            left: "50%",
            width: m.schermo * 0.3,
            height: m.barra * 0.5,
            marginLeft: -m.schermo * 0.15,
            borderRadius: 999,
            background: "#000",
            boxShadow: "0 0 0 1px rgba(255,255,255,.04)",
          }}
        />
      </div>
    </div>
  );
};

// Una pagina intera che scorre: le tappe sono [fotogramma della scena, punto della pagina in alto].
export const Pagina: React.FC<{ file: string; larghezza: number; tappe: [number, number][] }> = ({ file, larghezza, tappe }) => {
  const frame = useCurrentFrame();
  const m = misure(larghezza);
  const k = m.schermo / PUNTI;
  let y = tappe[0][1];
  for (let i = 1; i < tappe.length; i++) {
    const [f0, y0] = tappe[i - 1];
    const [f1, y1] = tappe[i];
    if (frame >= f0) y = interpolate(frame, [f0, f1], [y0, y1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  }
  return <Img src={staticFile(`pb-room84/siti/${file}.jpg`)} style={{ width: m.schermo, translate: `0 ${-y * k}px`, display: "block" }} />;
};

// Le sezioni una alla volta, con uno stacco secco: la nuova entra salendo di poco, e la vecchia sparisce. Il
// 29/09 scorreva di un'intera schermata ogni mezzo secondo e affaticava l'occhio; la dissolvenza provata dopo
// lasciava due sezioni sovrapposte per metà del tempo.
export const Sezioni: React.FC<{ file: string[]; larghezza: number; cambi: number[] }> = ({ file, larghezza, cambi }) => {
  const frame = useCurrentFrame();
  const m = misure(larghezza);
  const h = m.altezza - m.barra;
  let i = 0;
  cambi.forEach((f, j) => {
    if (frame >= f) i = j;
  });
  i = Math.min(i, file.length - 1);
  const entra = i === 0 ? 1 : spring({ frame: frame - cambi[i], fps: FPS, config: { damping: 200, stiffness: 420, mass: 0.5 } });
  return (
    <div style={{ position: "relative", width: m.schermo, height: h, overflow: "hidden", background: "#000" }}>
      <Img
        key={file[i]}
        src={staticFile(`pb-room84/siti/${file[i]}.jpg`)}
        style={{ position: "absolute", inset: 0, width: m.schermo, height: h, objectFit: "cover", objectPosition: "top", translate: `0 ${(1 - entra) * 40}px`, scale: `${0.985 + 0.015 * entra}` }}
      />
    </div>
  );
};

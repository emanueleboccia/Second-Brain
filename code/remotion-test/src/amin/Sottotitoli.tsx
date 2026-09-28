import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame } from "remotion";
import { BATTUTE, STILE_BATTUTA, type Parola } from "./battute";
import { AVORIO, GIALLO, HERO, OMBRA } from "./font";
import { FPS, frameDi, scena } from "./tempi";

// I sottotitoli dinamici delle storie di Zucche, dal 23/09/2026: da una a tre parole per volta, e
// ogni parola entra quando viene detta. Il blocco è già impaginato dall'inizio, quindi le parole
// compaiono al loro posto senza far scorrere le altre. Un blocco sparisce quando parte il
// successivo, o 0,3 s dopo l'ultima parola: nei silenzi a schermo non resta niente.
// Stanno nella fascia sotto il volto, sopra l'interfaccia di Reels e TikTok.
const MAX_PAROLE = 3;
const MAX_CARATTERI = 20;
const ANTICIPO = 0.05; // la parola compare un filo prima della voce: dopo, sembra in ritardo
const CODA = 0.3;

type Blocco = { id: string; parole: (Parola & { frame: number })[]; da: number; a: number };

const blocchi = (id: string): Blocco[] => {
  const { parole, fine } = BATTUTE[id];
  const s = scena(id);
  // una parola detta sul primo fotogramma non può comparire prima che la scena cominci
  const conFrame = parole.map((p) => ({ ...p, frame: Math.max(s.inizio, frameDi(id, p.t - ANTICIPO)) }));
  const gruppi: (typeof conFrame)[] = [];
  let corrente: typeof conFrame = [];
  conFrame.forEach((p, i) => {
    corrente.push(p);
    const lunghezza = corrente.map((x) => x.testo).join(" ").length;
    const prossima = conFrame[i + 1];
    const punteggiatura = /[,.!?]$/.test(p.testo);
    if (
      !prossima ||
      punteggiatura ||
      corrente.length >= MAX_PAROLE ||
      prossima.aCapo ||
      lunghezza + 1 + prossima.testo.length > MAX_CARATTERI
    ) {
      gruppi.push(corrente);
      corrente = [];
    }
  });
  const fineScena = s.inizio + s.frames;
  const resta = STILE_BATTUTA[id]?.resta;
  return gruppi.map((g, i) => ({
    id,
    parole: g,
    da: g[0].frame,
    a:
      i + 1 < gruppi.length
        ? gruppi[i + 1][0].frame
        : resta
          ? fineScena + s.fermo
          : Math.min(fineScena, frameDi(id, fine + CODA)),
  }));
};

const ParolaAnimata: React.FC<{ parola: Parola; da: number; giallo: boolean }> = ({ parola, da, giallo }) => {
  const frame = useCurrentFrame();
  const molla = spring({ frame: frame - da, fps: FPS, config: { damping: 11, stiffness: 240, mass: 0.45 } });
  const visibile = frame >= da;
  // «giucca» fa un piccolo dondolio: è il tormentone, e si deve notare ogni volta.
  const dondolio = parola.giucca ? 7 * Math.exp(-(frame - da) / 9) * Math.sin((frame - da) / 2.2) : 0;
  return (
    <span
      style={{
        display: "inline-block",
        opacity: visibile ? interpolate(molla, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) : 0,
        scale: visibile ? interpolate(molla, [0, 1], [0.62, 1]) : 0.62,
        translate: `0px ${visibile ? interpolate(molla, [0, 1], [24, 0]) : 24}px`,
        rotate: `${dondolio}deg`,
        color: parola.giucca || giallo ? GIALLO : AVORIO,
      }}
    >
      {parola.testo}
    </span>
  );
};

const RigaSottotitolo: React.FC<{ blocco: Blocco }> = ({ blocco }) => {
  const frame = useCurrentFrame();
  const durata = blocco.a - blocco.da;
  const stile = STILE_BATTUTA[blocco.id] ?? { scala: 1 };
  const uscita = stile.resta
    ? 1
    : interpolate(frame, [durata - 3, durata], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", top: 1300 }}>
      <div
        style={{
          display: "flex",
          gap: 22,
          padding: "8px 34px 14px",
          borderRadius: 40,
          backgroundColor: "rgba(43, 26, 18, 0.34)",
          boxShadow: "0 0 36px 18px rgba(43, 26, 18, 0.34)",
          fontFamily: HERO,
          fontWeight: 700,
          fontSize: 84 * stile.scala,
          lineHeight: 1.12,
          textShadow: OMBRA,
          opacity: uscita,
        }}
      >
        {blocco.parole.map((p) => (
          <ParolaAnimata key={`${p.testo}-${p.frame}`} parola={p} da={p.frame - blocco.da} giallo={Boolean(stile.giallo)} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Sottotitoli: React.FC = () => (
  <>
    {Object.keys(BATTUTE).flatMap((id) =>
      blocchi(id).map((b) => (
        <Sequence key={`${id}-${b.da}`} name={`Sottotitolo ${id}`} from={b.da} durationInFrames={Math.max(1, b.a - b.da)}>
          <RigaSottotitolo blocco={b} />
        </Sequence>
      )),
    )}
  </>
);

import { AbsoluteFill, Easing, Freeze, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import volti from "./volti.json";
import { BATTUTE, PARLATO_EXTRA, SCOSSA, ZOOM_BATTUTA } from "./battute";
import { FERMO_BN, FPS, FRUSTA, type Scena as TipoScena } from "./tempi";

// Dove sta il volto di Amin, ogni 0,2 s: [secondo dello spezzone, x, y, larghezza] in pixel del
// 1080×1920. Lo trova Vision di macOS in scripts/amin-prepara.py.
type Volto = [number, number, number, number];
const VOLTI = volti as unknown as Record<string, Volto[]>;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

// Il centro degli zoom: la mediana dei volti trovati in un intervallo, così un passante inquadrato
// per un attimo non sposta tutto. Senza volti, il centro del fotogramma all'altezza del viso.
const centro = (file: string, da = 0, a = 99): [number, number] => {
  const v = (VOLTI[file] ?? []).filter(([t]) => t >= da && t <= a);
  if (v.length === 0) return [540, 780];
  const x = mediana(v.map((p) => p[1]));
  const y = mediana(v.map((p) => p[2]));
  return [Math.min(860, Math.max(220, x)), Math.min(1250, Math.max(420, y))];
};

export const Scena: React.FC<{ scena: TipoScena }> = ({ scena }) => {
  const frame = useCurrentFrame();
  const totale = scena.frames + scena.fermo;
  const src = staticFile(`amin/seg/${scena.file}.mp4`);
  const inFermo = frame >= scena.frames;
  const locale = (secondiClip: number) => Math.round((secondiClip - scena.da) * FPS);

  // Gli zoom sulle battute: scattano sulla parola con una molla e restano fino alla fine.
  const battute = ZOOM_BATTUTA[scena.id] ?? [];
  const [ox, oy] = battute.length
    ? centro(scena.file, battute[0][0] - scena.da - 0.4, battute[0][0] - scena.da + 0.4)
    : centro(scena.file);
  const spinta = battute.reduce((scala, [t, quanto]) => {
    const molla = spring({
      frame: frame - locale(t),
      fps: FPS,
      config: { damping: 14, stiffness: 260, mass: 0.5 },
    });
    return scala * (1 + (quanto - 1) * molla);
  }, 1);

  // La scossa sul boom: 8 frame di tremolio che si spegne.
  const scossa = (SCOSSA[scena.id] ?? []).reduce(
    (acc, t) => {
      const k = frame - locale(t);
      if (k < 0 || k > 8) return acc;
      const forza = 16 * (1 - k / 8);
      return [acc[0] + forza * Math.sin(k * 2.7), acc[1] + forza * Math.cos(k * 3.4)];
    },
    [0, 0],
  );

  // La frusta: entrando, l'immagine arriva da destra sfocata in orizzontale; uscendo, scappa a
  // sinistra. Lo spostamento è piccolo e l'immagine si allarga del 12%, così i bordi neri non si
  // vedono mai: il movimento lo racconta la sfocatura.
  const entra =
    scena.entrata === "frusta"
      ? interpolate(frame, [0, FRUSTA], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) })
      : 0;
  const esce =
    scena.uscita === "frusta"
      ? interpolate(frame, [totale - FRUSTA, totale], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
      : 0;
  const frusta = Math.max(entra, esce);
  const sfocaturaFrusta = 58 * frusta;

  // Nei fermi dei tentativi l'immagine va in bianco e nero e si stringe sul volto.
  const bn = inFermo && FERMO_BN.has(scena.id);
  const strettaFermo = inFermo
    ? interpolate(frame, [scena.frames, totale], [1, FERMO_BN.has(scena.id) ? 1.16 : 1.06], {
        ...clamp,
        easing: Easing.out(Easing.quad),
      })
    : 1;

  // Sull'ultimo spritz fermo, dopo il brindisi, l'immagine si sfoca e si scurisce per la firma.
  const finale = scena.id === "18-spritz" && inFermo;
  const sfocaFinale = finale ? interpolate(frame, [scena.frames + 14, scena.frames + 28], [0, 1], clamp) : 0;

  const filtri = [
    sfocaturaFrusta > 0.2 ? `url(#frusta-${scena.id})` : "",
    bn ? "grayscale(1) contrast(1.08)" : "",
    sfocaFinale > 0 ? `blur(${14 * sfocaFinale}px) brightness(${1 - 0.35 * sfocaFinale})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Un avvicinamento lento su tutta la scena, 5%: tiene vive le inquadrature ferme.
  const lento = interpolate(frame, [0, totale], [1, 1.05]);

  // Finita la battuta, la presa diretta scende a un quinto: nella coda la camera fa vedere il posto,
  // sotto sale la musica, e le voci di chi passa non coprono niente.
  const fineVoce = BATTUTE[scena.id]?.fine ?? PARLATO_EXTRA[scena.id]?.[1];
  const volume = (f: number) =>
    fineVoce === undefined ? 1 : interpolate(f, [locale(fineVoce + 0.2), locale(fineVoce + 0.5)], [1, 0.2], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id={`frusta-${scena.id}`} x="-10%" y="0%" width="120%" height="100%">
            <feGaussianBlur stdDeviation={`${sfocaturaFrusta} 0`} edgeMode="duplicate" />
          </filter>
        </defs>
      </svg>
      <AbsoluteFill
        style={{
          transformOrigin: `${ox}px ${oy}px`,
          scale: lento * spinta * strettaFermo * (1 + 0.12 * frusta),
          translate: `${60 * entra - 60 * esce + scossa[0]}px ${scossa[1]}px`,
          filter: filtri || undefined,
        }}
      >
        <Sequence durationInFrames={scena.frames} layout="none">
          <Video src={src} volume={volume} />
        </Sequence>
        {scena.fermo > 0 ? (
          <Sequence from={scena.frames} durationInFrames={scena.fermo} layout="none">
            <Freeze frame={scena.frames - 2}>
              <Video src={src} muted />
            </Freeze>
          </Sequence>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

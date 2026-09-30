import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame } from "remotion";
import "../pb-girarrosto/font";
import { ARCHIVO, CREMA, OMBRA } from "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { Passata } from "../pb-girarrosto/Sottotitoli";
import { Coppia } from "./Finestra";
import { FoglioCheDiventaSito, FoglioCheSiDisegna } from "./FoglioDisegno";
import { Sottotitoli } from "./Sottotitoli";
import { FPS, inFrame, type Blocco } from "./testo";

// Il reel di Room84, terza versione, del 29/09/2026 sera. Emanuele ha bocciato la seconda: «forse dobbiamo
// farlo in un altro modo, non mi convince», e la frase della bio in chiusura «qui non c'entra niente, è un sito
// web». Ha chiesto una versione più semplice, più simile al Girarrosto, con le schermate del prima e del dopo
// anche da computer e l'illustrazione ricreata.
//
// Quindi: pochi tipi di immagine. Il prima e il dopo in computer e telefono sul fondale, due inquadrature vere
// del foglio, il disegno ricostruito che si disegna da solo, i blocchi che diventano il sito, e in chiusura la
// riga del sito di Emanuele, «Prima capisco cosa vendi. Poi lo costruisco.», che è quello che il video mostra.
// Senza voce: la storia la raccontano le scritte. La musica si sceglie con lui.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Tratto = { da: number; a: number };
export const SCENE3 = {
  prima: { da: 0, a: 3.4 },
  scrivania: { da: 3.4, a: 4.6 },
  penna: { da: 4.6, a: 6.0 },
  foglio: { da: 6.0, a: 14.4 },
  mani: { da: 14.4, a: 15.6 },
  sito: { da: 15.6, a: 18.4 },
  dopo: { da: 18.4, a: 26.8 },
  chiusura: { da: 23.4, a: 26.8 }, // sopra il dopo, che continua
} satisfies Record<string, Tratto>;

export const BLOCCHI3: Blocco[] = [
  { testo: "Il sito di un B&B", da: 0.15, a: 1.6 },
  { testo: "a Poggiomarino.", da: 1.6, a: 3.35 },
  { testo: "Prima di rifarlo,", da: 3.45, a: 4.6 },
  { testo: "un foglio.", chiave: "un foglio", da: 4.6, a: 5.95 },
  { testo: "In alto,", da: 6.1, a: 6.9 },
  { testo: "la spa in camera.", da: 6.9, a: 8.0 },
  { testo: "Subito, le date libere.", da: 8.0, a: 9.3 },
  { testo: "Due camere,", da: 9.35, a: 10.0 },
  { testo: "la 8 e la 4.", chiave: "la 8 e la 4", da: 10.0, a: 11.1 },
  { testo: "Le recensioni vere", da: 11.15, a: 12.0 },
  { testo: "di Booking.", da: 12.0, a: 12.8 },
  { testo: "Poi foto e dintorni.", da: 12.85, a: 14.35 },
  { testo: "Da lì nasce il sito,", da: 14.45, a: 15.6 },
  { testo: "pezzo per pezzo.", chiave: "pezzo per pezzo", da: 15.65, a: 18.3 },
  { testo: "Ecco il risultato.", chiave: "il risultato", da: 18.5, a: 20.0 },
  { testo: "Il posto era già bello.", da: 20.0, a: 21.5 },
  { testo: "Mancava un sito", da: 21.5, a: 22.4 },
  { testo: "che lo raccontasse.", da: 22.4, a: 23.35 },
];

// quando si disegna ogni blocco del foglio, in secondi dall'inizio della scena del foglio
const DISEGNO = [0.1, 0.35, 2.0, 2.9, 3.4, 4.8, 5.15, 6.85, 7.2];
// quando ogni blocco diventa la sezione vera, in secondi dall'inizio della scena del sito
const PIENI = Array.from({ length: 9 }, (_, i) => 0.15 + i * 0.27);

export const DURATA3 = inFrame(26.8);

const tratto = (s: Tratto) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });

const Prima: React.FC<{ frames: number; pagina: "prima" | "dopo"; scorriD: number; scorriM: number }> = ({ frames, pagina, scorriD, scorriM }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <Coppia pagina={pagina} frames={frames} entra={e} scorriD={scorriD} scorriM={scorriM} />
    </AbsoluteFill>
  );
};

// La chiusura: la riga del sito di Emanuele sopra il dopo, che continua a scorrere scurito.
const Chiusura: React.FC = () => {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(14,14,12,.35) 0%, rgba(14,14,12,.72) 55%, rgba(14,14,12,.9) 100%)", opacity: e }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
        <div style={{ textAlign: "center", opacity: e, translate: `0 ${(1 - e) * 14}px` }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 64, lineHeight: 1.12, color: CREMA, textShadow: OMBRA }}>Prima capisco cosa vendi.</div>
          <div style={{ marginTop: 12 }}>
            <Passata testo="Poi lo costruisco." da={14} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ReelRoom84Semplice: React.FC = () => {
  const s = Object.fromEntries(Object.entries(SCENE3).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof SCENE3, ReturnType<typeof tratto>>;
  const CARTELLA = "pb-room84/seg";
  const ombra = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.34) 74%, rgba(0,0,0,.18) 100%)" }} />;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...s.prima}>
        <Prima frames={s.prima.durationInFrames} pagina="prima" scorriD={700} scorriM={620} />
      </Sequence>
      <Sequence {...s.scrivania}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "scrivania", frames: s.scrivania.durationInFrames }]} frames={s.scrivania.durationInFrames} spinta={1.07} centro={[560, 1250]} />
        {ombra}
      </Sequence>
      <Sequence {...s.penna}>
        {/* dal 30/09 l'iPhone dall'alto al posto dei Ray-Ban: «metti quelle fatte con la fotocamera dove si vede che scrivo» */}
        <Pov cartella={CARTELLA} spezzoni={[{ file: "scrive", frames: s.penna.durationInFrames }]} frames={s.penna.durationInFrames} apertura={1.1} centro={[360, 950]} />
        {ombra}
      </Sequence>
      <Sequence {...s.foglio}>
        <FoglioCheSiDisegna tempi={DISEGNO.map(inFrame)} fine={s.foglio.durationInFrames} />
      </Sequence>
      <Sequence {...s.mani}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "finito", frames: s.mani.durationInFrames }]} frames={s.mani.durationInFrames} spinta={1.06} centro={[540, 1150]} />
        {ombra}
      </Sequence>
      <Sequence {...s.sito}>
        <FoglioCheDiventaSito pieni={PIENI.map(inFrame)} />
      </Sequence>
      <Sequence {...s.dopo}>
        <Prima frames={s.dopo.durationInFrames} pagina="dopo" scorriD={1500} scorriM={1300} />
      </Sequence>
      <Sequence {...s.chiusura}>
        <Chiusura />
      </Sequence>
      <Sottotitoli blocchi={BLOCCHI3} />
    </AbsoluteFill>
  );
};

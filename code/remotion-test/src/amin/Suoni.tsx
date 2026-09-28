import { Sequence, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { BATTUTE, PARLATO_EXTRA, TENTATIVI, TIMBRI } from "./battute";
import {
  DURATA_TOTALE,
  HOOK_PASSO,
  HOOK_PRIMA_PAROLA,
  MUSICA,
  MUSICA_DA,
  NOME_ENTRA,
  SCENE,
  TAPPE,
  frameDi,
  inFrame,
  scena,
} from "./tempi";

// Il suono. La voce di Amin sta negli spezzoni, già pulita e portata a -17 dBFS di RMS da
// scripts/amin-prepara.py. La musica le sta sotto: gli appunti vogliono la voce a -6 dB e la musica
// a -17, 11 dB di distacco, e qui si abbassa a 0,2 quando lui parla e risale a 0,45 fra una
// battuta e l'altra, dove passano le fruste. Sulla firma finale sale ancora e poi sfuma.
const SOTTO = 0.2;
const SOPRA = 0.45;
const FINALE = 0.6;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Quando Amin parla, in frame del reel: dalle parole dei sottotitoli e dai tentativi di Fienopoli.
const FINESTRE: [number, number][] = [
  ...Object.entries(BATTUTE).map(([id, b]): [number, number] => [frameDi(id, b.parole[0].t - 0.1), frameDi(id, b.fine + 0.15)]),
  ...Object.entries(PARLATO_EXTRA).map(([id, [a, b]]): [number, number] => [frameDi(id, a - 0.1), frameDi(id, b + 0.15)]),
];
const voce = (f: number) =>
  Math.max(0, ...FINESTRE.map(([a, b]) => interpolate(f, [a - 4, a, b, b + 6], [0, 1, 1, 0], clamp)));

type Effetto = { nome: string; file: string; frame: number; volume: number };

export const Suoni: React.FC<{ logo: number; finale: number }> = ({ logo, finale }) => {
  const musica = (f: number) => {
    const livello = SOPRA - (SOPRA - SOTTO) * voce(f);
    const sale = interpolate(f, [finale, finale + 12], [0, 1], clamp);
    const entra = interpolate(f, [0, 6], [0, 1], clamp);
    const esce = interpolate(f, [DURATA_TOTALE - 24, DURATA_TOTALE], [1, 0], clamp);
    return entra * esce * (livello + (FINALE - livello) * sale);
  };

  const effetti: Effetto[] = [
    // la frusta fra una tappa e l'altra, alternando due suoni perché dodici volte lo stesso stanca
    ...SCENE.filter((s) => s.entrata === "frusta").map((s, i) => ({
      nome: `Frusta ${s.id}`,
      file: i % 2 ? "whoosh.wav" : "whip.wav",
      frame: s.inizio - 3,
      volume: 0.45,
    })),
    // il cartello che arriva: un campanello leggero, come un contatore
    ...TAPPE.map((t) => ({ nome: `Tappa ${t.numero}`, file: "ding.wav", frame: scena(t.scene[0]).inizio + 14, volume: 0.16 })),
    { nome: "Weekend", file: "pop.wav", frame: HOOK_PRIMA_PAROLA + 5 * HOOK_PASSO, volume: 0.35 },
    { nome: "Nome", file: "switch.wav", frame: NOME_ENTRA, volume: 0.35 },
    // la carrozza che è un carretto: il primo dei due boom del video
    { nome: "Carrozza", file: "vine-boom.wav", frame: frameDi("02-carrozza", 1.72), volume: 0.45 },
    ...TENTATIVI.map((t) => ({ nome: `Tentativo ${t.testo}`, file: "pop.wav", frame: frameDi(t.scena, t.t), volume: 0.5 })),
    ...TIMBRI.flatMap((t) => {
      const s = scena(t.scena);
      const fermo = s.inizio + s.frames;
      return t.esito === "no"
        ? [
            { nome: `Disco ${t.testo}`, file: "record-scratch.wav", frame: fermo, volume: 0.5 },
            { nome: `Timbro ${t.testo}`, file: "tonfo.wav", frame: fermo + 5, volume: 0.7 },
          ]
        : [{ nome: `Timbro ${t.testo}`, file: "ding.wav", frame: fermo + 4, volume: 0.45 }];
    }),
    { nome: "Logo", file: "whoosh.wav", frame: logo - 3, volume: 0.4 },
    { nome: "Logo giù", file: "pop.wav", frame: logo + 3, volume: 0.4 },
    // «spritz!»: lo zoom sbatte sul volto, e ci vuole il boom
    { nome: "Spritz", file: "vine-boom.wav", frame: frameDi("18-spritz", 0.4), volume: 0.6 },
    { nome: "Cin cin", file: "clink.wav", frame: finale, volume: 0.7 },
    { nome: "Date", file: "pop.wav", frame: finale + 8, volume: 0.3 },
    { nome: "Biglietti", file: "mouse-click.wav", frame: finale + 14, volume: 0.45 },
  ];

  return (
    <>
      <Audio src={staticFile(MUSICA)} trimBefore={inFrame(MUSICA_DA)} volume={musica} />
      {effetti.map((e) => (
        <Sequence key={`${e.nome}-${e.frame}`} name={e.nome} from={Math.max(0, e.frame)} layout="none">
          <Audio src={staticFile(`amin/sfx/${e.file}`)} volume={e.volume} />
        </Sequence>
      ))}
    </>
  );
};

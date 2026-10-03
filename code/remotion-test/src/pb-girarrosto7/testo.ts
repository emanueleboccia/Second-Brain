// Il testo e i tempi della v7 del reel del Girarrosto (03/10/2026), dalla voce nuova:
// `scripts/pb-girarrosto7-voce.py` scrive `voce.json`. Lo schema è quello della v6.

import voce from "./voce.json";

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

export type Blocco = { testo: string; chiave?: string };
export type TipoScena =
  | "apertura" | "telefono" | "foglio" | "fila" | "conti" | "pronto" | "cambia" | "pezzi" | "secolo"
  | "arrivo" | "schede" | "cerca" | "modifica" | "ipad" | "prezzo" | "servizio";
export type BloccoATempo = Blocco & { da: number; a: number };
export type ScenaATempo = { id: TipoScena; inizio: number; frames: number; blocchiATempo: BloccoATempo[]; fineVoce: number };

export const SCENE_A_TEMPO: ScenaATempo[] = voce.scene.map((s) => ({
  id: s.id as TipoScena,
  inizio: inFrame(s.inizio),
  frames: inFrame(s.fine) - inFrame(s.inizio),
  blocchiATempo: s.blocchi.map((b) => ({ testo: b.testo, chiave: "chiave" in b ? (b.chiave as string) : undefined, da: inFrame(b.da), a: inFrame(b.a) })),
  fineVoce: inFrame(s.fineVoce),
}));

export const DURATA = inFrame(voce.durata);
export const CTA = { da: inFrame(voce.cta.da), chiave: inFrame(voce.cta.chiave) };
export const scena = (id: TipoScena) => SCENE_A_TEMPO.find((s) => s.id === id)!;
export const locali = (id: TipoScena) => {
  const s = scena(id);
  return s.blocchiATempo.map((b) => b.da - s.inizio);
};

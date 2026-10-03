// Il testo e i tempi del reel del sito menù del Girarrosto (03/10/2026), dalla voce di Emanuele:
// `scripts/pb-girarrosto-sito-voce.py` scrive `voce.json`. Lo schema è quello del Girarrosto v7.

import voce from "./voce.json";

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

export type Blocco = { testo: string; chiave?: string };
export type TipoScena = "apertura" | "ritiro" | "telefono" | "menu" | "carrello" | "nome" | "ordina" | "whatsapp" | "tutto" | "saluto" | "invio" | "pagamento" | "prezzo" | "chiusa";
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
export const CTA = { da: inFrame(voce.cta.da), chiave: inFrame(voce.cta.chiave), dopo: inFrame(voce.cta.dopo) };
export const scena = (id: TipoScena) => SCENE_A_TEMPO.find((s) => s.id === id)!;
export const locali = (id: TipoScena) => {
  const s = scena(id);
  return s.blocchiATempo.map((b) => b.da - s.inizio);
};

// Il testo e i tempi della v6 del reel del Girarrosto (03/10/2026). Vengono dalla voce nuova di Emanuele:
// `scripts/pb-girarrosto6-voce.py` monta le frasi e scrive `voce.json`, con dove comincia ogni scena e ogni blocco dei
// sottotitoli. È lo stesso schema della v5 (`../pb-girarrosto/testo.ts`), con le scene nuove.

import voce from "./voce.json";

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

export type Blocco = { testo: string; chiave?: string };
export type TipoScena = "apertura" | "telefono" | "foglio" | "conti" | "arrivo" | "schede" | "ipad" | "servizio";
export type BloccoATempo = Blocco & { da: number; a: number }; // in frame del reel
export type ScenaATempo = { id: TipoScena; inizio: number; frames: number; blocchiATempo: BloccoATempo[]; fineVoce: number };

export const SCENE_A_TEMPO: ScenaATempo[] = voce.scene.map((s) => ({
  id: s.id as TipoScena,
  inizio: inFrame(s.inizio),
  frames: inFrame(s.fine) - inFrame(s.inizio),
  blocchiATempo: s.blocchi.map((b) => ({ testo: b.testo, chiave: "chiave" in b ? (b.chiave as string) : undefined, da: inFrame(b.da), a: inFrame(b.a) })),
  fineVoce: inFrame(s.fineVoce),
}));

export const DURATA = inFrame(voce.durata);
// La CTA: scritta sull'ultima parte mentre lui la dice; «chiave» è quando dice «mandagli», e lì entra la passata.
export const CTA = { da: inFrame(voce.cta.da), chiave: inFrame(voce.cta.chiave) };
export const scena = (id: TipoScena) => SCENE_A_TEMPO.find((s) => s.id === id)!;
// i blocchi di una scena, in frame dall'inizio della scena
export const locali = (id: TipoScena) => {
  const s = scena(id);
  return s.blocchiATempo.map((b) => b.da - s.inizio);
};

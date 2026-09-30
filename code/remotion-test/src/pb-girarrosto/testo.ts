// Il testo e i tempi del reel del Girarrosto. Dal 30/09/2026 vengono dalla voce vera di Emanuele, registrata col
// DJI: `scripts/pb-girarrosto-voce.py` monta le frasi, le passa a whisper una alla volta e scrive `voce.json`, con
// dove comincia ogni scena e ogni blocco dei sottotitoli. Qui si leggono e si portano in fotogrammi; le scene e le
// illustrazioni si allungano o si accorciano da sole. Fino al 29/09 i tempi erano stimati a 2,6 parole al secondo,
// e stanno nella storia di git.
//
// I blocchi sono da due-quattro parole, come i sottotitoli del reel di riferimento
// (sources/riferimenti/reel-synsation-good-ux.md); «chiave» è la parte che va sulla passata crema.

import voce from "./voce.json";

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

export type Blocco = { testo: string; chiave?: string };

export type TipoScena = "foglio-pov" | "foglio" | "telefono" | "arrivo" | "schede" | "ipad" | "servizio";

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

// La CTA, dal copione del 30/09/2026 sera: scritta sull'ultima inquadratura mentre lui la dice, al posto della frase
// della bio. «chiave» è quando dice «Mandagli»: lì entra la passata.
export const CTA = { da: inFrame(voce.cta.da), chiave: inFrame(voce.cta.chiave) };
export const scena = (id: TipoScena) => SCENE_A_TEMPO.find((s) => s.id === id)!;

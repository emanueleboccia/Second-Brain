// I tempi dei due reel di Tenuta Don Gaetano, settembre 2026.
// Le durate dei singoli spezzoni stanno nei JSON scritti da scripts/tdg-prepara-clip.py
// insieme ai file video: se cambia un taglio lì, qui si aggiorna da solo.
// Ogni file video è lungo quanto il suo spezzone più 0,35 s di coda, che è quello
// che la dissolvenza verso lo spezzone dopo si mangia.

import cortile from "./segmenti-r1.json";
import cucina from "./segmenti-r2.json";

export const FPS = 30;
export const inFrame = (secondi: number) => Math.round(secondi * FPS);

export type Segmento = {
  id: string;
  sorgente: string;
  durata: number;
  origine: string;
  lento: boolean;
};

// La dissolvenza fra due spezzoni: 8 frame = 0,27 s, dentro la coda di 0,35 s.
export const TRANSIZIONE = 8;

// La dissolvenza verso il cartello finale: 10 frame = 0,33 s, sempre dentro la coda.
export const CHIUSURA = 10;

// Il cartello oro col logo, come nel reel del 29/08: 60 frame = 2,0 s.
export const CARTELLO = inFrame(2.0);

// L'hook scritto. Entra a 9 frame = 0,3 s ed è pieno a 18 frame = 0,6 s, dentro la
// finestra di 3-5 secondi; esce da 81 frame = 2,7 s a 90 frame = 3,0 s, prima del
// primo stacco.
export const HOOK_ENTRA = inFrame(0.3);
export const HOOK_PIENO = inFrame(0.6);
export const HOOK_INIZIA_USCITA = inFrame(2.7);
export const HOOK_ESCE = inFrame(3.0);

export type NomeReel = "cortile" | "cucina";

// `bandaDallAlto`: dove sta la banda dell'hook, in pixel dal bordo alto del 1080×1920.
// Nel reel del cortile sta sul cielo, sopra l'orizzonte, perché al centro coprirebbe
// proprio il Vesuvio che il testo nomina. In quello della cucina resta al centro, nel
// vuoto fra il setaccio e i cannoli. Mai sopra i 220 px: lì c'è l'intestazione di Reels.
// `musica`: tracce di Pixabay, libere anche per uso commerciale e senza attribuzione,
// scaricate il 14/09/2026 e normalizzate a -16 LUFS. Per il cortile «Cinematic Baroque Violin
// Melody» di NickPanek, tagliata dal secondo 8; per la cucina «Italian Trumpet Music» di
// andriih. Le prime scelte, due pianoforti lenti, Emanuele le ha trovate troppo mosce.
export const REEL: Record<
  NomeReel,
  { segmenti: Segmento[]; hook: string[]; bandaDallAlto: number; musica: string }
> = {
  cortile: {
    segmenti: cortile,
    hook: ["UNA DIMORA", "DEL SETTECENTO", "SOTTO IL VESUVIO"],
    bandaDallAlto: 300,
    musica: "tdg/musica-cortile.mp3",
  },
  cucina: {
    segmenti: cucina,
    hook: ["OGNI CANNOLO", "RIEMPITO", "AL MOMENTO"],
    bandaDallAlto: 700,
    musica: "tdg/musica-cucina.mp3",
  },
};

// La musica entra in 12 frame = 0,4 s e sfuma negli ultimi 45 frame = 1,5 s, sul cartello.
export const MUSICA_ENTRA = 12;
export const MUSICA_SFUMA = inFrame(1.5);

// Ogni spezzone dura il suo tempo più la transizione che si sovrappone al successivo;
// l'ultimo, più la dissolvenza verso il cartello.
export const durataDi = (segmenti: Segmento[], i: number) =>
  inFrame(segmenti[i].durata) + (i < segmenti.length - 1 ? TRANSIZIONE : CHIUSURA);

// Le sovrapposizioni si compensano: il totale è la somma degli spezzoni più il cartello.
// «Dal cortile ai saloni»: 585 + 60 = 645 frame = 21,5 s.
// «Le mani in cucina»: 601 + 60 = 661 frame = 22,03 s (i due spezzoni da 1,25 s
// arrotondano a 38 frame l'uno).
export const durataTotale = (segmenti: Segmento[]) =>
  segmenti.reduce((somma, s) => somma + inFrame(s.durata), 0) + CARTELLO;

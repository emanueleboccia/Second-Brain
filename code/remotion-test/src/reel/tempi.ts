// Il montaggio: quali spezzoni, in che ordine, per quanto.
// Le durate vere stanno in `src/data/segmenti.json`, scritto insieme ai file video:
// se cambia un punto di taglio lì, qui si aggiorna da solo.

import segmenti from "../data/segmenti.json";

export const FPS = 30;

export type Segmento = {
  id: string;
  sorgente: string;
  da: number;
  durata: number;
};

export const SEGMENTI: Segmento[] = segmenti;

export const inFrame = (secondi: number) => Math.round(secondi * FPS);

// Quanto dura una transizione fra due spezzoni. Gli spezzoni sono estratti con
// 0,40 s di coda in più (`CODA` in estrai-segmenti.py): la sovrapposizione mangia
// quella coda, non l'ultima parola. Se questo numero supera i 12 frame, va alzata
// anche la coda, altrimenti la dissolvenza si porta via il parlato.
export const TRANSIZIONE = 8;

// La dissolvenza verso la schermata finale, che è l'unica sul nero.
export const FINALE = inFrame(2.6);
export const CHIUSURA = 10;

// Il movimento di ogni spezzone: da quanto ingrandisce a quanto finisce.
// Serve a due cose insieme. La prima è tenere viva un'inquadratura ferma —
// è il «zoom lento e progressivo» che sostituisce l'avvicinamento fisico che
// in ripresa non è stato fatto. La seconda è che due spezzoni consecutivi
// partono da scale diverse, quindi ogni stacco è anche un salto di scala:
// un taglio dentro la stessa ripresa continua si legge come una scelta e
// non come un singhiozzo.
export const ZOOM: Array<[number, number]> = [
  [1.0, 1.09],
  [1.12, 1.03],
  [1.02, 1.1],
  [1.14, 1.06],
  [1.04, 1.12],
  [1.1, 1.0],
];

export const zoomDi = (i: number) => ZOOM[i % ZOOM.length];

// Ogni spezzone dura il suo parlato più la coda che la transizione si mangia.
// L'ultimo non ha una transizione dopo di sé se non quella verso il finale.
export const durataDi = (i: number) =>
  inFrame(SEGMENTI[i].durata) + (i < SEGMENTI.length - 1 ? TRANSIZIONE : CHIUSURA);

export const durataSpezzoni = SEGMENTI.reduce(
  (somma, s) => somma + inFrame(s.durata),
  0,
);

export const durataTotale = durataSpezzoni + FINALE;

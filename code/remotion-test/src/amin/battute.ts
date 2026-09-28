// Le parole di Amin, col momento in cui le dice, in secondi della clip originale.
// Vengono dai tratti parlati trovati sull'energia della voce e dalle valli fra una sillaba e
// l'altra, non dai tempi di whisper: con l'accento di Amin whisper sbaglia le parole e sposta i
// tempi, e sulle clip intere l'errore arriva a un secondo (memoria della Masseria, 23/09/2026).
// Le prime quattro tappe sono scritte come le pronuncia lui, con le parole date da Emanuele il
// 27/09/2026: «Questa bilancia dore zucga», «Questa caronza», «Queso è il percosto», «Adesso il
// giardine giucco». Il ritmo delle parole l'ha trovato «perfetto»: i tempi non si toccano. Le altre
// battute sono con la sua grammatica e l'ortografia giusta. La parola della zucca, comunque la dica,
// è in giallo.

// `aCapo`: la parola comincia un blocco nuovo, anche se ci starebbe in quello di prima. Tiene i
// blocchi com'erano quando le parole sono diventate più corte («della» → «dore»).
export type Parola = { testo: string; t: number; giucca?: boolean; aCapo?: boolean };

export const BATTUTE: Record<string, { parole: Parola[]; fine: number }> = {
  "00-hook": {
    parole: [
      { testo: "Bambini,", t: 2.1 },
      { testo: "venite", t: 3.18 },
      { testo: "a Zucche", t: 3.62 },
      { testo: "in Masseria!", t: 4.13 },
    ],
    fine: 5.0,
  },
  "01-bilancia": {
    parole: [
      { testo: "Questa", t: 1.94 },
      { testo: "bilancia", t: 2.66 },
      { testo: "dore", t: 3.54, aCapo: true },
      { testo: "zucga", t: 4.01, giucca: true },
    ],
    fine: 4.6,
  },
  "02-carrozza": {
    parole: [
      { testo: "Questa", t: 0.84 },
      { testo: "caronza", t: 1.72 },
    ],
    fine: 2.46,
  },
  "03-percorso": {
    parole: [
      { testo: "Queso", t: 1.16 },
      { testo: "è", t: 1.76 },
      { testo: "il", t: 2.04 },
      { testo: "percosto", t: 2.52 },
    ],
    fine: 3.26,
  },
  "05-casa": {
    parole: [
      { testo: "Questa", t: 2.38 },
      { testo: "casetta", t: 2.87 },
      { testo: "della", t: 3.42 },
      { testo: "giucca", t: 3.69, giucca: true },
    ],
    fine: 4.26,
  },
  "06-campo": {
    parole: [
      { testo: "Adesso", t: 0.97 },
      { testo: "il", t: 1.66 },
      { testo: "giardine", t: 1.84 },
      { testo: "giucco", t: 2.77, giucca: true },
    ],
    fine: 3.39,
  },
  "07-food": {
    parole: [
      { testo: "Questa", t: 0.44 },
      { testo: "l'area", t: 1.07 },
      { testo: "food,", t: 1.6 },
      { testo: "dove", t: 1.86 },
      { testo: "mangiare", t: 2.18 },
    ],
    fine: 2.72,
  },
  "08-dolci": {
    parole: [
      { testo: "Tutti", t: 1.58 },
      { testo: "torte,", t: 2.08 },
      { testo: "biscotti", t: 2.5 },
    ],
    fine: 3.18,
  },
  "13-dentro": {
    parole: [
      { testo: "Dove", t: 1.65 },
      { testo: "bambini", t: 2.23 },
      { testo: "giocare", t: 2.84 },
      { testo: "tutti", t: 3.11 },
    ],
    fine: 3.52,
  },
  "15-villaggio": {
    parole: [
      { testo: "Borgo", t: 1.56 },
      { testo: "contadini", t: 2.11 },
    ],
    fine: 3.17,
  },
  "16-venite": {
    parole: [
      { testo: "Venite", t: 0.62 },
      { testo: "oggi", t: 1.23 },
      { testo: "a Zucche", t: 1.7 },
      { testo: "in Masseria!", t: 2.5 },
    ],
    fine: 3.12,
  },
  "17-aspetto": {
    parole: [
      { testo: "Vi", t: 0.32 },
      { testo: "aspetto!", t: 0.42 },
    ],
    fine: 0.85,
  },
  "18-spritz": {
    parole: [
      { testo: "Bere", t: 0.0 },
      { testo: "spritz!", t: 0.4 },
    ],
    fine: 0.56,
  },
};

// «Bere spritz!» è grande e giallo, e resta a schermo fino alla fine, sotto la firma: è la battuta
// che si ricorda. Una volta sola, fatta bene: la ripetizione tre volte Emanuele l'ha tolta.
export const STILE_BATTUTA: Record<string, { scala: number; giallo?: boolean; resta?: boolean }> = {
  "18-spritz": { scala: 1.75, giallo: true, resta: true },
};

// La postilla sotto l'ultimo spritz: la gag si chiude dalla parte dei genitori.
export const POSTILLA = "(solo per mamma e papà)";

// I tre tentativi di dire Fienopoli. Qui niente sottotitoli: la parola sbagliata esce grande,
// come l'ha detta lui, quando la dice. Le prime parole di ogni tentativo whisper non le capisce
// («portista», «partista»), e nel video non ci vanno finché Emanuele non dice cosa sono.
export const TENTATIVI: { scena: string; testo: string; t: number }[] = [
  { scena: "09-fieno-1", testo: "Nobeli?", t: 3.8 },
  { scena: "10-fieno-2a", testo: "Noboli?", t: 1.07 },
  { scena: "12-fieno-3", testo: "Fironopoli?", t: 1.65 },
];

// I timbri sui fermi immagine dei tentativi.
export const TIMBRI: { scena: string; testo: string; esito: "no" | "quasi" }[] = [
  { scena: "09-fieno-1", testo: "Tentativo 1", esito: "no" },
  { scena: "11-fieno-2b", testo: "Tentativo 2", esito: "no" },
  { scena: "12-fieno-3", testo: "Quasi!", esito: "quasi" },
];

// Quando parla, in secondi della clip: serve ad abbassare la musica sotto la voce. Per le scene
// coi sottotitoli si usano le parole; qui ci sono quelle che non ne hanno.
export const PARLATO_EXTRA: Record<string, [number, number]> = {
  "09-fieno-1": [2.16, 4.5],
  "10-fieno-2a": [0.03, 1.73],
  "11-fieno-2b": [2.86, 3.92],
  "12-fieno-3": [0.9, 2.61],
};

// Gli zoom veloci sul volto, sulle parole più buffe: [secondo della clip, scala]. Sullo spritz lo
// zoom sbatte su «spritz!» e arriva a 1,7 volte.
export const ZOOM_BATTUTA: Record<string, [number, number][]> = {
  "01-bilancia": [[4.01, 1.14]],
  "02-carrozza": [[1.72, 1.24]],
  "05-casa": [[3.69, 1.14]],
  "12-fieno-3": [[1.65, 1.2]],
  "18-spritz": [[0.4, 1.7]],
};

// La scossa: l'immagine trema per un quarto di secondo, sul boom dell'ultimo «spritz!».
export const SCOSSA: Record<string, number[]> = {
  "18-spritz": [0.4],
};

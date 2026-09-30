// Il reel di Room84 per il personal brand: Emanuele fa vedere il sito di un b&b, lo disegna a mano, lo
// costruisce, e alla fine mostra il risultato. Girato il 29/09/2026, descritto in
// projects/personal-brand/girato-room84.md.
//
// La voce è la sua presa diretta, stretta da scripts/pb-room84-voce.py: l'apertura e «Ecco il risultato»
// dal video del fisso della sera, il resto dalle frasi dette disegnando. I tempi sono in secondi della voce
// montata (public/pb-room84/voce.wav, le frasi in voce.json) e vengono dalle raffiche vere del segnale a −30 dB
// sulla voce normalizzata, divise per sillabe dove una raffica contiene più blocchi: whisper, su questa voce,
// sposta le parole anche di un secondo.

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

// «chiave» è la parte del blocco che va sulla passata crema: una al massimo, e non in tutti.
export type Blocco = { testo: string; chiave?: string; da: number; a: number };

const BLOCCHI_VOCE: Blocco[] = [
  // apertura, 0,00–8,87
  { testo: "Questo qui è il sito", da: 0.2, a: 1.14 },
  { testo: "di un B&B di Poggiomarino,", da: 1.14, a: 2.75 },
  { testo: "che attualmente", da: 2.75, a: 3.8 },
  { testo: "non è messo male,", da: 3.8, a: 4.75 },
  { testo: "però si può fare", da: 4.75, a: 6.1 },
  { testo: "molto, molto meglio.", chiave: "meglio", da: 6.1, a: 7.42 },
  { testo: "Giudicherete voi", da: 7.45, a: 8.2 },
  { testo: "alla fine.", da: 8.2, a: 9.15 },
  // foglio, 9,17–11,92
  { testo: "Prima di aprire", da: 9.3, a: 10.0 },
  { testo: "il computer,", da: 10.0, a: 10.64 },
  { testo: "prendo un foglio.", chiave: "un foglio", da: 10.64, a: 12.1 },
  // camere, 12,17–17,92
  { testo: "Questo B&B ha", da: 12.25, a: 13.5 },
  { testo: "la particolarità", da: 13.5, a: 14.4 },
  { testo: "di avere due camere,", da: 14.4, a: 15.38 },
  { testo: "8 e 4,", chiave: "8 e 4", da: 15.38, a: 16.1 },
  { testo: "come il nome del brand.", da: 16.1, a: 18.15 },
  // recensioni, 18,22–24,19
  { testo: "Per le recensioni,", chiave: "recensioni", da: 18.2, a: 19.88 },
  { testo: "che sono importantissime", da: 19.88, a: 22.25 },
  { testo: "in questo caso,", da: 22.25, a: 23.06 },
  { testo: "per questo business.", da: 23.06, a: 24.5 },
  // disegnato, 24,54–29,85
  { testo: "Quindi prima", da: 24.6, a: 25.4 },
  { testo: "l'ho disegnato,", da: 25.4, a: 26.3 },
  { testo: "poi lo costruisco", da: 26.3, a: 27.47 },
  { testo: "proprio come l'ho disegnato,", da: 27.47, a: 28.8 },
  { testo: "pezzo per pezzo.", chiave: "pezzo per pezzo", da: 28.8, a: 30.0 },
  // risultato, 34,05–35,85
  { testo: "Ecco il risultato.", chiave: "il risultato", da: 34.15, a: 36.6 },
];

type Tratto = { da: number; a: number };
// Le inquadrature, in secondi. Dove una scena dura più di due-tre secondi, dentro cambia qualcosa: lo zoom
// a scatti nelle schede, il blocco acceso nel foglio.
const SCENE_VOCE = {
  imacPrimaA: { da: 0, a: 2.75 },
  telefonoPrima: { da: 2.75, a: 4.75 },
  imacPrimaB: { da: 4.75, a: 6.1 },
  lampoDopo: { da: 6.1, a: 7.42 }, // «molto, molto meglio»: un lampo del sito nuovo, prima di tornare al vecchio
  imacPrimaC: { da: 7.42, a: 9.17 },
  scrivania: { da: 9.17, a: 10.64 },
  rbInizio: { da: 10.64, a: 12.17 },
  camere: { da: 12.17, a: 18.22, zoom: [[15.3, 1.42]] as [number, number][] },
  recensioni: { da: 18.22, a: 24.54, zoom: [[18.8, 1.38], [22.2, 1 / 1.38]] as [number, number][] },
  penna: { da: 24.54, a: 26.3 },
  mani: { da: 26.3, a: 29.95, zoom: [[28.8, 1.12]] as [number, number][] },
  schizzo: { da: 29.95, a: 34.05 },
  imacDopo: { da: 34.05, a: 36.6 },
  confronto: { da: 36.6, a: 38.7 },
  finale: { da: 38.7, a: 41.85 },
} satisfies Record<string, Tratto & { zoom?: [number, number][] }>;

type Scena = Tratto & { zoom?: [number, number][]; salta?: number }; // «salta»: secondi dello spezzone da saltare
export type Linea = {
  voce: boolean;
  blocchi: Blocco[];
  scene: Record<keyof typeof SCENE_VOCE, Scena>;
  cambiSchizzo: number[]; // quando si accendono i blocchi del foglio, in secondi
  durata: number; // in fotogrammi
};

// I blocchi del foglio si accendono uno dopo l'altro, dal primo mezzo secondo della scena.
export const VOCE: Linea = {
  voce: true,
  blocchi: BLOCCHI_VOCE,
  scene: SCENE_VOCE,
  cambiSchizzo: Array.from({ length: 8 }, (_, i) => 30.05 + i * 0.5),
  durata: inFrame(41.85),
};

// ---------- la versione senza voce ----------
// Chiesta da Emanuele il 29/09/2026 sera: «devo esercitarmi di più con la voce. Per il momento riusciamo a
// utilizzare il materiale e fare qualcosa senza voci?». La storia la raccontano le scritte, nello stesso stile
// dei sottotitoli, e il ritmo lo darà la musica, che si sceglie con lui. Le frasi riprendono le sue, dette
// quel giorno, senza i giri di parole; la chiusura è quella del copione del 29/09. I tempi sono di lettura:
// mezzo secondo più un terzo di secondo per parola, e si riallineano ai battiti quando c'è la musica.
const BLOCCHI_MUTO: Blocco[] = [
  { testo: "Il sito di un B&B", da: 0.15, a: 1.35 },
  { testo: "a Poggiomarino.", da: 1.35, a: 2.6 },
  { testo: "Non è messo male.", da: 2.6, a: 4.2 },
  { testo: "Ma si può fare", da: 4.2, a: 5.3 },
  { testo: "molto meglio.", chiave: "meglio", da: 5.3, a: 6.6 },
  { testo: "Giudicherete voi, alla fine.", da: 6.6, a: 8.4 },
  { testo: "Prima del computer,", da: 8.45, a: 9.9 },
  { testo: "un foglio.", chiave: "un foglio", da: 9.9, a: 11.4 },
  { testo: "Due camere:", da: 11.5, a: 12.6 },
  { testo: "la 8 e la 4,", chiave: "la 8 e la 4", da: 12.6, a: 14.0 },
  { testo: "come il nome, Room84.", da: 14.0, a: 15.85 },
  { testo: "Le recensioni vere,", da: 15.95, a: 17.6 },
  { testo: "quelle di Booking.", da: 17.6, a: 19.35 },
  { testo: "Prima lo disegno.", da: 19.45, a: 20.9 },
  { testo: "Poi lo costruisco", da: 20.9, a: 22.2 },
  { testo: "pezzo per pezzo.", chiave: "pezzo per pezzo", da: 22.2, a: 23.9 },
  { testo: "Ecco il risultato.", chiave: "il risultato", da: 28.0, a: 30.1 },
  { testo: "Il posto era già bello.", da: 30.2, a: 31.9 },
  { testo: "Mancava un sito", da: 31.9, a: 33.0 },
  { testo: "che lo raccontasse.", da: 33.0, a: 34.3 },
];

export const MUTO: Linea = {
  voce: false,
  blocchi: BLOCCHI_MUTO,
  scene: {
    imacPrimaA: { da: 0, a: 2.6 },
    telefonoPrima: { da: 2.6, a: 4.2 },
    imacPrimaB: { da: 4.2, a: 5.3 },
    lampoDopo: { da: 5.3, a: 6.6 },
    imacPrimaC: { da: 6.6, a: 8.4 },
    scrivania: { da: 8.4, a: 9.9 },
    rbInizio: { da: 9.9, a: 11.4 },
    // senza voce «la 8 e la 4» arriva prima: lo spezzone parte 2,2 secondi dopo, quando i numeri li sta scrivendo
    camere: { da: 11.4, a: 15.9, zoom: [[12.6, 1.42]], salta: 2.2 },
    recensioni: { da: 15.9, a: 19.4, zoom: [[16.05, 1.38], [18.2, 1 / 1.38]] },
    penna: { da: 19.4, a: 20.9 },
    mani: { da: 20.9, a: 23.9, zoom: [[22.2, 1.12]] },
    schizzo: { da: 23.9, a: 27.9 },
    imacDopo: { da: 27.9, a: 30.1 },
    confronto: { da: 30.1, a: 34.3 },
    finale: { da: 34.3, a: 37.5 },
  },
  cambiSchizzo: Array.from({ length: 8 }, (_, i) => 24.0 + i * 0.48),
  durata: inFrame(37.5),
};

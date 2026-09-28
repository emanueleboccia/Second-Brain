// I tempi del reel «Il tour di Amin» di Zucche in Masseria, 27/09/2026.
// Gli spezzoni, coi punti di taglio e le durate vere, stanno in `segmenti.json`, scritto da
// scripts/amin-prepara.py insieme ai file video: se cambia un taglio lì, qui si aggiorna da solo.
// Gli stacchi sono secchi, senza sovrapposizioni: la frusta fra una tappa e l'altra si fa dentro
// gli ultimi e i primi frame dei due spezzoni, così la voce non si accavalla mai.

import segmenti from "./segmenti.json";

export const FPS = 30;
export const inFrame = (secondi: number) => Math.round(secondi * FPS);

export type Segmento = {
  id: string;
  clip: string;
  da: number;
  a: number;
  velocita: number;
  durata: number;
  guadagnoVoce: number;
};

// Dopo alcuni spezzoni l'immagine si ferma. I due tentativi sbagliati di Fienopoli: fermo in
// bianco e nero col timbro, che è il linguaggio delle gag delle storie di Zucche dal 18/09. Il
// terzo: fermo a colori col timbro «quasi». L'ultimo spritz: il brindisi, poi l'immagine si sfoca
// e sopra scende la firma finale.
export const FERMO: Record<string, number> = {
  "09-fieno-1": 0.7, // 21 frame
  "11-fieno-2b": 0.7, // 21 frame
  "12-fieno-3": 0.6, // 18 frame
  "18-spritz": 2.8, // 84 frame
};

// I fermi in bianco e nero, coi due tentativi bocciati.
export const FERMO_BN = new Set(["09-fieno-1", "11-fieno-2b"]);

// Come si entra in ogni spezzone. «frusta»: il passaggio veloce da un posto all'altro, 5 frame di
// sfocatura orizzontale per parte, ed è l'unico effetto di stacco del video: sta solo dove cambia
// la tappa, come chiedono gli appunti sulle transizioni con moderazione. «taglio»: stacco secco,
// dentro lo stesso posto o dopo un fermo.
export type Stacco = "frusta" | "taglio";
const ENTRA_A_TAGLIO = new Set([
  "00-hook",
  "10-fieno-2a",
  "11-fieno-2b",
  "12-fieno-3",
  "17-aspetto",
]);
export const FRUSTA = 5;

export type Scena = Segmento & {
  file: string; // lo spezzone in public/amin/seg
  inizio: number; // frame d'inizio nel reel
  frames: number; // frame dello spezzone che scorre
  fermo: number; // frame del fermo immagine che segue
  entrata: Stacco;
  uscita: Stacco;
};

// Gli inizi si calcolano sui secondi cumulati e poi si arrotondano, così l'errore di
// arrotondamento non si somma spezzone dopo spezzone e l'immagine non scivola via dalla voce.
const costruisci = (): Scena[] => {
  let secondi = 0;
  const scene = (segmenti as Segmento[]).map((s) => ({ ...s, file: s.id })).map((s) => {
    const inizio = inFrame(secondi);
    const frames = inFrame(secondi + s.durata) - inizio;
    const fermo = inFrame(FERMO[s.id] ?? 0);
    secondi += s.durata + fermo / FPS;
    return { ...s, inizio, frames, fermo, entrata: "taglio" as Stacco, uscita: "taglio" as Stacco };
  });
  scene.forEach((s, i) => {
    s.entrata = ENTRA_A_TAGLIO.has(s.id) ? "taglio" : "frusta";
    if (i > 0) scene[i - 1].uscita = s.entrata;
  });
  return scene;
};

export const SCENE = costruisci();
export const scena = (id: string) => SCENE.find((s) => s.id === id)!;
const ultima = SCENE[SCENE.length - 1];
export const DURATA_TOTALE = ultima.inizio + ultima.frames + ultima.fermo;

// Da secondi della clip originale a frame del reel: le parole e i gesti si misurano sulla clip,
// perché è lì che sono stati trovati.
export const frameDi = (id: string, secondiClip: number) => {
  const s = scena(id);
  return s.inizio + Math.round(((secondiClip - s.da) / s.velocita) * FPS);
};

// Le tappe, coi nomi della mappa del parco (`3-in-produzione/mappa-zucche`) dove ci sono: la
// Bilancia zuccosa è il 3, la Casa delle zucche il 7, il Campo il 10, l'Area food il 14, il
// villaggio dei contadini il 18. Carrozza e percorso sulla mappa non ci sono: si chiamano come li
// chiama Amin. Il cartello dice il nome vero, i sottotitoli dicono come lo dice lui: la gag è lì.
// `accento` è la parola in Niconne, una sola per cartello, come vuole il design della Masseria.
export type Tappa = { numero: number; prima: string; accento: string; dopo: string; scene: string[] };
export const TAPPE: Tappa[] = [
  { numero: 1, prima: "Bilancia", accento: "zuccosa", dopo: "", scene: ["01-bilancia"] },
  { numero: 2, prima: "La", accento: "carrozza", dopo: "", scene: ["02-carrozza"] },
  { numero: 3, prima: "Il", accento: "percorso", dopo: "", scene: ["03-percorso"] },
  { numero: 4, prima: "", accento: "Casa", dopo: "delle zucche", scene: ["05-casa"] },
  { numero: 5, prima: "Campo delle", accento: "zucche", dopo: "", scene: ["06-campo"] },
  { numero: 6, prima: "Area", accento: "food", dopo: "", scene: ["07-food", "08-dolci"] },
  {
    numero: 7,
    prima: "",
    accento: "Fienopoli",
    dopo: "",
    scene: ["09-fieno-1", "10-fieno-2a", "11-fieno-2b", "12-fieno-3", "13-dentro"],
  },
  { numero: 8, prima: "Il villaggio dei", accento: "contadini", dopo: "", scene: ["15-villaggio"] },
];

// L'hook scritto: le parole entrano una ogni 3 frame da 0,07 s, ed è tutto a schermo a 0,6 s,
// dentro la finestra di 3 secondi degli appunti. Esce con la frusta dell'hook, a 3,1 s.
export const HOOK_PRIMA_PAROLA = 2;
export const HOOK_PASSO = 3;

// Il cartellino col nome di Amin: entra a 1,1 s, quando la domanda è già stata letta.
export const NOME_ENTRA = inFrame(1.1);

// La musica provvisoria, «Banjo Romp» di Caffeine Creek Band, dalla libreria dell'SSD: parte dal
// secondo 1, dopo l'attacco. Si cambia con quella che sceglie Emanuele fra le tre d'esempio.
export const MUSICA = "amin/musica/caffeine_creek_band-banjo-romp-109570.mp3";
export const MUSICA_DA = 1.0;

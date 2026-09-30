// Il testo della voce fuori campo del reel del Girarrosto, diviso in blocchi da due-quattro parole
// come i sottotitoli del reel di riferimento (sources/riferimenti/reel-synsation-good-ux.md).
// ⚠️ I tempi sono STIMATI a circa 2,6 parole al secondo: la voce di Emanuele non è ancora
// registrata. Quando c'è, i secondi di ogni blocco si rifanno dalle parole di whisper e le scene
// si allungano o si accorciano da sole, perché i loro inizi si calcolano da qui.
//
// «chiave» è la parte del blocco che va sulla passata crema: una al massimo, e non in tutti.

export const FPS = 30;
export const inFrame = (s: number) => Math.round(s * FPS);

export type Blocco = { testo: string; chiave?: string; secondi: number; pausa?: number };

export type TipoScena = "foglio-pov" | "foglio" | "telefono" | "arrivo" | "schede" | "ipad" | "servizio";

export type Scena = {
  id: TipoScena;
  blocchi: Blocco[];
  prima?: number; // secondi di immagine prima della prima parola
  dopo?: number; // secondi di immagine dopo l'ultima, senza voce
};

export const SCENE: Scena[] = [
  {
    id: "foglio-pov",
    blocchi: [
      { testo: "Questo era il sistema", secondi: 1.1 },
      { testo: "per gli ordini", secondi: 0.8 },
      { testo: "di un girarrosto:", secondi: 1.0, pausa: 0.2 },
      { testo: "un foglio e gli", secondi: 0.8 },
      { testo: "evidenziatori.", chiave: "evidenziatori", secondi: 1.2, pausa: 0.3 },
    ],
  },
  {
    id: "foglio",
    blocchi: [
      { testo: "Il cliente chiama,", secondi: 1.0 },
      { testo: "si scrive il cognome,", secondi: 1.1 },
      { testo: "poi l'ordine.", secondi: 0.9, pausa: 0.2 },
      { testo: "Il colore dice cos'è:", secondi: 1.1, pausa: 0.2 },
      { testo: "giallo il fritto,", secondi: 0.9 },
      { testo: "arancione l'impanato,", secondi: 1.1 },
      { testo: "verde il tacchino.", secondi: 1.0, pausa: 0.3 },
    ],
  },
  {
    id: "telefono",
    blocchi: [
      { testo: "Con venti persone", secondi: 1.0 },
      { testo: "in fila,", secondi: 0.6, pausa: 0.15 },
      { testo: "il conto si faceva", secondi: 1.0 },
      { testo: "a mente.", chiave: "a mente", secondi: 0.9, pausa: 0.3 },
    ],
  },
  {
    id: "arrivo",
    blocchi: [
      { testo: "Prima di costruire", secondi: 1.0 },
      { testo: "qualsiasi cosa,", secondi: 0.8, pausa: 0.15 },
      { testo: "sono andato lì", secondi: 0.9 },
      { testo: "e li ho guardati lavorare.", chiave: "guardati lavorare", secondi: 1.4, pausa: 0.3 },
    ],
  },
  {
    id: "schede",
    blocchi: [
      { testo: "Poi ho fatto un'app", secondi: 1.0 },
      { testo: "che fa la stessa cosa", secondi: 1.0 },
      { testo: "del foglio.", secondi: 0.7, pausa: 0.3 },
      { testo: "Scrivi l'ordine,", secondi: 0.9 },
      { testo: "e il totale", chiave: "totale", secondi: 0.8 },
      { testo: "esce da solo.", secondi: 0.9, pausa: 0.4 },
    ],
  },
  {
    id: "ipad",
    prima: 0.9,
    blocchi: [
      { testo: "Un tocco,", chiave: "Un tocco", secondi: 0.8, pausa: 0.2 },
      { testo: "e sai quanti pezzi", secondi: 1.0 },
      { testo: "preparare in giornata.", secondi: 1.3, pausa: 0.4 },
    ],
  },
  {
    id: "servizio",
    blocchi: [
      { testo: "Non gli ho cambiato", secondi: 1.0 },
      { testo: "il mestiere.", secondi: 0.8, pausa: 0.3 },
      { testo: "Gli ho tolto", secondi: 0.8 },
      { testo: "il foglio.", chiave: "il foglio", secondi: 0.9, pausa: 0.3 },
    ],
    dopo: 2.8, // la frase della bio, a schermo, senza voce
  },
];

export type BloccoATempo = Blocco & { da: number; a: number }; // in frame del reel
export type ScenaATempo = Scena & { inizio: number; frames: number; blocchiATempo: BloccoATempo[]; fineVoce: number };

// Gli inizi si calcolano sui secondi cumulati e poi si arrotondano, così l'errore non si somma.
export const SCENE_A_TEMPO: ScenaATempo[] = (() => {
  let t = 0;
  return SCENE.map((s) => {
    const inizioScena = t;
    t += s.prima ?? 0;
    const blocchiATempo = s.blocchi.map((b) => {
      const da = inFrame(t);
      t += b.secondi + (b.pausa ?? 0);
      return { ...b, da, a: inFrame(t) };
    });
    const fineVoce = inFrame(t);
    t += s.dopo ?? 0;
    return { ...s, inizio: inFrame(inizioScena), frames: inFrame(t) - inFrame(inizioScena), blocchiATempo, fineVoce };
  });
})();

export const DURATA = SCENE_A_TEMPO.reduce((m, s) => Math.max(m, s.inizio + s.frames), 0);
export const scena = (id: TipoScena) => SCENE_A_TEMPO.find((s) => s.id === id)!;

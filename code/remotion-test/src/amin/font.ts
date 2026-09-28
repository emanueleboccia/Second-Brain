// I tre font della Masseria, dal brand kit: HeroLight Bold per i titoli, Niconne per la parola
// d'accento, Poppins per eyebrow e pulsanti. Sono file locali in public/amin/font (fuori da git),
// copiati da `3-in-produzione/pumpkin-night/assets/font` sull'SSD. Il render aspetta che siano
// caricati: senza, i primi frame uscirebbero col font di sistema.
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

export const HERO = "HeroLight";
export const NICONNE = "Niconne";
export const POPPINS = "Poppins";

const FILE: { famiglia: string; file: string; peso: string }[] = [
  { famiglia: HERO, file: "HeroLight-Bold.otf", peso: "700" },
  { famiglia: NICONNE, file: "Niconne-Regular.ttf", peso: "400" },
  { famiglia: POPPINS, file: "Poppins-Regular.ttf", peso: "400" },
  { famiglia: POPPINS, file: "Poppins-Medium.ttf", peso: "500" },
  { famiglia: POPPINS, file: "Poppins-Bold.ttf", peso: "700" },
];

const attesa = delayRender("I font della Masseria");
Promise.all(
  FILE.map(async ({ famiglia, file, peso }) => {
    const font = new FontFace(famiglia, `url(${staticFile(`amin/font/${file}`)})`, { weight: peso });
    document.fonts.add(await font.load());
  }),
).then(
  () => continueRender(attesa),
  (e) => cancelRender(e),
);

// La palette della Masseria, da reference/design.md: su foto testo avorio e accento giallo, sui
// fondi chiari testo marrone e accento arancio.
export const MARRONE = "#2B1A12";
export const ARANCIO = "#D56A12";
export const GIALLO = "#F2B01E";
export const AVORIO = "#FFF6E8";
export const CREMA = "#F7EBD6";
export const VERDE = "#5C7A2E";

// L'ombra dei testi su foto: il design la vuole sempre, insieme alla velatura.
export const OMBRA = "0 4px 18px rgba(0,0,0,0.55), 0 2px 5px rgba(0,0,0,0.6)";

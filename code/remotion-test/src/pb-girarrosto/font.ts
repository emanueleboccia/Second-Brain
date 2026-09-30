// I caratteri e i colori del personal brand, da self/reference/design.md. Archivo è il file variabile
// con l'asse della larghezza (si chiama con fontStretch "125%"), JetBrains Mono è per i numeri.
// I file stanno in public/pb-girarrosto/font (fuori da git), copiati dal progetto del sito:
// ~/Desktop/progetti/eb-site/node_modules/@fontsource-variable/archivo e @fontsource/jetbrains-mono.
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

export const ARCHIVO = "Archivo";
export const MONO = "JetBrains Mono";
// Solo per la scrittura a mano nell'illustrazione del foglio: è il Bradley Hand del Mac.
export const MANO = "Bradley Hand";

const FILE: { famiglia: string; file: string; descrittori: FontFaceDescriptors }[] = [
  { famiglia: ARCHIVO, file: "archivo-latin-wdth-normal.woff2", descrittori: { weight: "100 900", stretch: "62% 125%", style: "normal" } },
  { famiglia: ARCHIVO, file: "archivo-latin-wdth-italic.woff2", descrittori: { weight: "100 900", stretch: "62% 125%", style: "italic" } },
  { famiglia: MONO, file: "jetbrains-mono-latin-700-normal.woff2", descrittori: { weight: "700" } },
  { famiglia: MONO, file: "jetbrains-mono-latin-400-normal.woff2", descrittori: { weight: "400" } },
  { famiglia: MANO, file: "bradley-hand-bold.ttf", descrittori: { weight: "700" } },
];

const attesa = delayRender("I caratteri del personal brand");
Promise.all(
  FILE.map(async ({ famiglia, file, descrittori }) => {
    const font = new FontFace(famiglia, `url(${staticFile(`pb-girarrosto/font/${file}`)})`, descrittori);
    document.fonts.add(await font.load());
  }),
).then(
  () => continueRender(attesa),
  (e) => cancelRender(e),
);

// La palette: monocroma dark, più la passata crema che Emanuele ha scelto il 29/09/2026 per le
// parole chiave dei video.
export const NERO = "#000000";
export const FONDO = "#0E0E0C";
export const CARD = "#191915";
export const LINEA = "#2A2A24";
export const SPENTO = "#75746A";
export const INTERMEDIO = "#B5B2A4";
export const CREMA = "#EEEBDA";
export const PASSATA = "#FCF0DD";
export const LUCE = "218, 199, 171"; // #DAC7AB, solo il bagliore del fondale

// I testi sul video non hanno riquadri: il contrasto lo tiene l'ombra.
export const OMBRA = "0 2px 3px rgba(0,0,0,.55), 0 4px 18px rgba(0,0,0,.6), 0 0 42px rgba(0,0,0,.35)";

// I colori veri degli evidenziatori del Girarrosto e dell'app: stanno nelle illustrazioni perché
// raccontano le cose com'erano, non sono colori del brand.
export const EVID_GIALLO = "#F2E641";
export const EVID_ARANCIO = "#FF9A3C";
export const EVID_VERDE = "#8FDC5E";
export const APP_VERDE = "#35C759";

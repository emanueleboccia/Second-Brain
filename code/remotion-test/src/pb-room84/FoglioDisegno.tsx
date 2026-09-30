import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { MANO } from "../pb-girarrosto/font";
import { Fondale, useEntrata } from "../pb-girarrosto/Scene";
import { FPS } from "./testo";

// Il foglio di Room84 ricostruito come illustrazione, alla maniera del foglio degli ordini del Girarrosto:
// il disegno che Emanuele ha fatto il 29/09/2026 (fermo a 2:11 di IMG_5652) si ridisegna da solo, blocco per
// blocco e nello stesso ordine, e l'inquadratura segue la penna. Le scritte sono le sue in stampatello, con
// parole semplici al posto di quelle del mestiere: «titolo» e «prenota» invece di headline e CTA.
// Poi, nella seconda scena, ogni blocco si riempie con la sezione vera del sito che ne è uscita.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const INCHIOSTRO = "#2B2A26";

// Il foglio: 760×1120 sul fondale. Il disegno sta in una colonna larga 420, come quello vero.
const FOGLIO = { x: 160, y: 170, w: 760, h: 1120 };
const X0 = 170;
const X1 = 590;

export type Blocco = { nome: string; y0: number; y1: number; sezione: string; posizione: string };
export const BLOCCHI: Blocco[] = [
  { nome: "logo", y0: 60, y1: 112, sezione: "sez-testata", posizione: "50% 0%" },
  { nome: "titolo", y0: 112, y1: 240, sezione: "sez-testata", posizione: "50% 36%" },
  { nome: "date", y0: 240, y1: 284, sezione: "sez-booking", posizione: "50% 86%" },
  { nome: "chi siamo", y0: 284, y1: 416, sezione: "sez-chisiamo", posizione: "50% 16%" },
  { nome: "camere", y0: 416, y1: 610, sezione: "sez-camere", posizione: "50% 52%" },
  { nome: "come funziona", y0: 610, y1: 740, sezione: "sez-esperienza", posizione: "50% 14%" },
  { nome: "recensioni", y0: 740, y1: 884, sezione: "sez-recensioni", posizione: "50% 22%" },
  { nome: "foto", y0: 884, y1: 972, sezione: "sez-gallery", posizione: "50% 58%" },
  { nome: "dintorni", y0: 972, y1: 1060, sezione: "sez-dintorni", posizione: "50% 22%" },
];

// ---------- il tratto a mano ----------
const rnd = (seme: number) => {
  let s = seme;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
// Una spezzata che passa per i punti dati, con un tremito leggero e gli angoli che sbordano un poco, come a penna.
const aMano = (punti: [number, number][], seme: number) => {
  const r = rnd(seme);
  const out: [number, number][] = [];
  for (let i = 1; i < punti.length; i++) {
    const [ax, ay] = punti[i - 1];
    const [bx, by] = punti[i];
    const lung = Math.hypot(bx - ax, by - ay);
    const n = Math.max(2, Math.round(lung / 14));
    const ox = (bx - ax) / lung;
    const oy = (by - ay) / lung;
    for (let k = 0; k <= n; k++) {
      const t = k / n;
      const extra = k === n ? 4 : k === 0 && i === 1 ? -3 : 0;
      out.push([ax + (bx - ax) * t + ox * extra + (r() - 0.5) * 2.2, ay + (by - ay) * t + oy * extra + (r() - 0.5) * 2.2]);
    }
  }
  let lung = 0;
  for (let i = 1; i < out.length; i++) lung += Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]);
  return { d: out.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" "), lung };
};

const Linea: React.FC<{ punti: [number, number][]; seme: number; da: number; durata: number; spessore?: number }> = ({ punti, seme, da, durata, spessore = 3.2 }) => {
  const frame = useCurrentFrame();
  const { d, lung } = aMano(punti, seme);
  const k = interpolate(frame, [da, da + durata], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  if (k <= 0) return null;
  return <path d={d} fill="none" stroke={INCHIOSTRO} strokeWidth={spessore} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={lung} strokeDashoffset={lung * (1 - k)} />;
};

const Scritta: React.FC<{ testo: string; x: number; y: number; da: number; dimensione?: number; durata?: number }> = ({ testo, x, y, da, dimensione = 32, durata = 8 }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [da, da + durata], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", whiteSpace: "nowrap", fontFamily: MANO, fontWeight: 700, fontSize: dimensione, color: INCHIOSTRO, clipPath: `inset(-30% ${(1 - k) * 100}% -30% -5%)` }}>
      {testo}
    </div>
  );
};

// Quando si disegna ogni blocco, in fotogrammi della scena.
export type Tempi = number[];

// Il disegno dentro il foglio. «pieni» dice, per ogni blocco, da quale fotogramma si riempie col sito vero.
const Disegno: React.FC<{ tempi: Tempi; pieni?: number[] }> = ({ tempi, pieni }) => {
  const frame = useCurrentFrame();
  const cx = (X0 + X1) / 2;
  return (
    <>
      {/* prima le scritte, poi le sezioni vere che le coprono, poi i tratti sopra a tutto */}
      <Scritta testo="LOGO" x={cx} y={86} da={tempi[0] + 6} dimensione={26} />
      <Scritta testo="TITOLO" x={cx} y={148} da={tempi[1] + 7} dimensione={36} />
      <Scritta testo="prenota" x={cx - 85} y={211} da={tempi[1] + 18} dimensione={20} durata={5} />
      <Scritta testo="prenota" x={cx + 85} y={211} da={tempi[1] + 21} dimensione={20} durata={5} />
      <Scritta testo="DATE" x={X0 + 52} y={262} da={tempi[2] + 6} dimensione={22} durata={5} />
      <Scritta testo="CHI SIAMO" x={cx} y={332} da={tempi[3] + 6} dimensione={34} />
      <Scritta testo="★★★★★  9,8" x={cx} y={378} da={tempi[3] + 10} dimensione={24} />
      <Scritta testo="LE CAMERE" x={cx} y={450} da={tempi[4] + 6} dimensione={32} />
      <Scritta testo="8" x={cx - 70} y={526} da={tempi[4] + 10} dimensione={74} durata={5} />
      <Scritta testo="4" x={cx + 70} y={526} da={tempi[4] + 14} dimensione={74} durata={5} />
      <Scritta testo="prenota" x={cx - 70} y={588} da={tempi[4] + 17} dimensione={19} durata={4} />
      <Scritta testo="prenota" x={cx + 70} y={588} da={tempi[4] + 19} dimensione={19} durata={4} />
      <Scritta testo="COME FUNZIONA" x={cx} y={676} da={tempi[5] + 6} dimensione={32} />
      <Scritta testo="RECENSIONI" x={cx} y={812} da={tempi[6] + 6} dimensione={34} />
      <Scritta testo="FOTO" x={cx} y={928} da={tempi[7] + 6} dimensione={32} />
      <Scritta testo="DINTORNI" x={cx} y={1016} da={tempi[8] + 6} dimensione={32} />
      {pieni
        ? BLOCCHI.map((b, i) => {
            const k = interpolate(frame, [pieni[i], pieni[i] + 6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
            if (k <= 0) return null;
            return (
              <div key={b.nome} style={{ position: "absolute", left: X0 + 2, top: b.y0 + 2, width: X1 - X0 - 4, height: b.y1 - b.y0 - 4, overflow: "hidden", clipPath: `inset(0 0 ${(1 - k) * 100}% 0)` }}>
                <Img src={staticFile(`pb-room84/siti/${b.sezione}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: b.posizione }} />
              </div>
            );
          })
        : null}
      <svg width={FOGLIO.w} height={FOGLIO.h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {BLOCCHI.map((b, i) => {
          const t = tempi[i];
          const punti: [number, number][] = i === 0 ? [[X1, b.y0], [X0, b.y0], [X0, b.y1], [X1, b.y1], [X1, b.y0]] : [[X0, b.y0], [X0, b.y1], [X1, b.y1], [X1, b.y0]];
          return <Linea key={b.nome} punti={punti} seme={7 + i * 13} da={t} durata={i === 0 ? 9 : 8} />;
        })}
        {/* i dettagli: le voci del menù accanto al logo, i due bottoni, le divisioni delle date, la riga fra le camere */}
        <Linea punti={[[X0 + 24, 86], [X0 + 70, 86]]} seme={201} da={tempi[0] + 8} durata={4} spessore={2.4} />
        <Linea punti={[[X1 - 70, 86], [X1 - 24, 86]]} seme={202} da={tempi[0] + 9} durata={4} spessore={2.4} />
        <Linea punti={[[cx - 150, 196], [cx - 20, 196], [cx - 20, 226], [cx - 150, 226], [cx - 150, 196]]} seme={203} da={tempi[1] + 14} durata={6} spessore={2.4} />
        <Linea punti={[[cx + 20, 196], [cx + 150, 196], [cx + 150, 226], [cx + 20, 226], [cx + 20, 196]]} seme={204} da={tempi[1] + 17} durata={6} spessore={2.4} />
        <Linea punti={[[X0 + 105, 244], [X0 + 105, 280]]} seme={205} da={tempi[2] + 8} durata={3} spessore={2.4} />
        <Linea punti={[[X0 + 210, 244], [X0 + 210, 280]]} seme={206} da={tempi[2] + 9} durata={3} spessore={2.4} />
        <Linea punti={[[X0 + 315, 244], [X0 + 315, 280]]} seme={207} da={tempi[2] + 10} durata={3} spessore={2.4} />
        <Linea punti={[[cx, 480], [cx, 572]]} seme={208} da={tempi[4] + 12} durata={5} spessore={3} />
      </svg>
    </>
  );
};

const Foglio: React.FC<{ children: React.ReactNode; entra: number; scala: number; fuoco: number }> = ({ children, entra, scala, fuoco }) => (
  <div
    style={{
      position: "absolute",
      left: FOGLIO.x,
      top: FOGLIO.y,
      width: FOGLIO.w,
      height: FOGLIO.h,
      background: "#FBF9F3",
      borderRadius: 10,
      boxShadow: "0 30px 80px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.35)",
      transformOrigin: `${FOGLIO.w / 2}px ${fuoco}px`,
      scale: `${scala}`,
      rotate: `${-1.6 + (1 - entra) * 4}deg`,
      translate: `0 ${(1 - entra) * 120}px`,
      opacity: interpolate(entra, [0, 0.4], [0, 1], clamp),
    }}
  >
    {children}
  </div>
);

// Scena 1 · il foglio che si disegna. L'inquadratura si avvicina e scende col blocco che si sta disegnando;
// alla fine si allarga sul foglio intero.
export const FoglioCheSiDisegna: React.FC<{ tempi: Tempi; fine: number }> = ({ tempi, fine }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  // il punto del foglio da tenere al centro: il blocco in corso, con una molla da uno all'altro
  let fuoco = BLOCCHI[0].y0;
  tempi.forEach((t, i) => {
    const s = spring({ frame: frame - t, fps: FPS, config: { damping: 200, stiffness: 90, mass: 0.9 } });
    const prima = i === 0 ? BLOCCHI[0].y0 : (BLOCCHI[i - 1].y0 + BLOCCHI[i - 1].y1) / 2;
    const questo = (BLOCCHI[i].y0 + BLOCCHI[i].y1) / 2;
    fuoco += (questo - prima) * s;
  });
  const largo = spring({ frame: frame - (fine - 22), fps: FPS, config: { damping: 200, stiffness: 80, mass: 1 } });
  const scala = interpolate(largo, [0, 1], [1.28, 1]);
  const centro = interpolate(largo, [0, 1], [fuoco, FOGLIO.h / 2]);
  // lo spostamento che porta il fuoco a metà schermo: il foglio resta al suo posto finché la penna non arriva
  // a metà, poi sale; mai verso il basso, se no sopra resta mezzo schermo vuoto
  const sposta = interpolate(largo, [0, 1], [Math.min(0, 700 - (FOGLIO.y + centro)), 0]);
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <AbsoluteFill style={{ translate: `0 ${sposta}px` }}>
        <Foglio entra={e} scala={scala} fuoco={centro}>
          <Disegno tempi={tempi} />
        </Foglio>
      </AbsoluteFill>
      {/* da vicino il foglio arriva fin sotto i sottotitoli: il fondo sfuma nel fondale, come l'ombra della soggettiva */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(14,14,12,0) 58%, rgba(14,14,12,${0.9 * (1 - largo)}) 76%, rgba(14,14,12,${0.96 * (1 - largo)}) 100%)` }} />
    </AbsoluteFill>
  );
};

// Scena 2 · il foglio finito, fermo, e i blocchi che diventano il sito vero uno dopo l'altro.
export const FoglioCheDiventaSito: React.FC<{ pieni: number[] }> = ({ pieni }) => {
  const frame = useCurrentFrame();
  const tutti = BLOCCHI.map(() => -100);
  const avvicina = interpolate(frame, [0, pieni[pieni.length - 1] + 14], [1, 1.06], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <Foglio entra={1} scala={avvicina} fuoco={FOGLIO.h / 2}>
        <Disegno tempi={tutti} pieni={pieni} />
      </Foglio>
    </AbsoluteFill>
  );
};

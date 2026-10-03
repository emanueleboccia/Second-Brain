import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { ARCHIVO, MANO, MONO } from "../pb-girarrosto/font";
import { FondaleChiaro } from "../pb-girarrosto6/Scene";
import { Finestra, PaginaCheScorre } from "../pb-room84/Finestra";
import { Telefono, misure } from "../pb-room84/Telefono";
import { FPS } from "./testo";

// Le illustrazioni della v5 di Room84 (03/10/2026), nella scala chiara del sito e dei caroselli chiari: Room84 è un
// posto di lusso col sito crema e bronzo, e il Girarrosto, che esce prima, è scuro. Emanuele sulle versioni di prima:
// «fai meglio le illustrazioni», c'era qualche difetto nel foglio che si scriveva e quando si mostrava il risultato, e
// il risultato va fatto vedere come trasformazione, «mockup del sito su mobile o su desktop». Quindi: il foglio è un
// disegno pulito, a tratti uguali, che si disegna da solo; il risultato è il foglio che diventa il sito vero nel
// telefono, col computer dietro. Le schermate sono del sito vivo (`public/pb-room84-5/schermi/`, 03/10) e di quelle
// del 30/09 (`public/pb-room84/siti/`).

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);
const molla = (frame: number, da: number, damping = 15, stiffness = 170) => spring({ frame: frame - da, fps: FPS, config: { damping, stiffness } });
const NERO = "#0E0E0C";
const BRONZO = "#A58661";
const INCHIOSTRO = "#26241E";

// ---------- un video a tutto schermo ----------
export const Clip: React.FC<{ file: string; da?: number; zoom?: [number, number]; frames?: number; centro?: string }> = ({ file, da = 0, zoom = [1, 1], frames = 90, centro = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [0, frames], zoom, clamp);
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: `${s}`, transformOrigin: centro }}>
        <Video src={staticFile(file)} muted trimBefore={da} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- uno schermo del sito vivo, dentro il telefono, coi tocchi ----------
// Le schermate sono 1080×2337, cioè il telefono da 390 punti a 2,77x: le coordinate dei tocchi sono in quei pixel.
const Tocco: React.FC<{ x: number; y: number; da: number; k: number }> = ({ x, y, da, k }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [da - 6, da, da + 16], [0, 1, 0], clamp);
  const onda = interpolate(frame, [da, da + 16], [0, 1], clamp);
  if (frame < da - 6 || frame > da + 18) return null;
  return (
    <>
      <div style={{ position: "absolute", left: x * k - 34, top: y * k - 34, width: 68, height: 68, borderRadius: 34, background: "rgba(14,14,12,.28)",
        border: "3px solid rgba(255,255,255,.9)", opacity: t, scale: `${1 - 0.15 * t}` }} />
      <div style={{ position: "absolute", left: x * k - 34, top: y * k - 34, width: 68, height: 68, borderRadius: 34, border: `4px solid ${BRONZO}`,
        scale: `${1 + onda * 1.8}`, opacity: frame >= da ? 1 - onda : 0 }} />
    </>
  );
};

export const Schermo: React.FC<{ file: string; larghezza: number; y?: number; tocchi?: [number, number, number][]; children?: React.ReactNode }> = ({ file, larghezza, y = 0, tocchi = [], children }) => {
  const m = misure(larghezza);
  const k = m.schermo / 1080;
  return (
    <div style={{ position: "relative", width: m.schermo, translate: `0 ${-y * k}px` }}>
      <Img src={staticFile(`pb-room84-5/schermi/${file}.png`)} style={{ width: m.schermo, display: "block" }} />
      {tocchi.map(([x, yy, da], i) => <Tocco key={i} x={x} y={yy} da={da} k={k} />)}
      {children}
    </div>
  );
};

// ---------- 1 · il sito di prima, e la scritta in alto ----------
// Il telefono grande col sito del 2025; quando la nomina, la camera stringe sulla scritta in alto.
export const Prima: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const z = interpolate(frame, [b[2] - 6, b[2] + 10], [0, 1], { ...clamp, easing: uscita });
  const L = 500;
  const mm = misure(L);
  // Il telefono non scende mai sotto i 1200 punti: lì stanno i sottotitoli, che sul telefono non si leggevano. Quando la
  // camera stringe sulla scritta in alto, quello che sporge sotto sfuma nel fondo (detto da Emanuele il 03/10/2026).
  const taglio = "linear-gradient(180deg, #000 0, #000 1140px, transparent 1210px)";
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", inset: 0, WebkitMaskImage: taglio, maskImage: taglio }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, scale: `${1 + z * 0.5}`, transformOrigin: "540px 380px" }}>
        <div style={{ position: "absolute", left: 540 - L / 2, top: 100, translate: `0 ${(1 - e) * 140}px`, opacity: Math.min(1, 0.35 + e) }}>
          <Telefono larghezza={L}>
            <PaginaCheScorre file="prima-m" punti={390} larghezza={mm.schermo} tappe={[[0, 0], [40, 0]]} />
          </Telefono>
        </div>
      </div>
      </div>
      <div style={{ position: "absolute", left: 110, top: 90, rotate: "-3deg", opacity: e }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: ".2em", background: NERO, color: "#FCF0DD", padding: "12px 20px", borderRadius: 999 }}>PRIMA</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 2 · le tre cose che vuole sapere chi arriva ----------
// Il telefono di prima, piccolo a sinistra; a destra le tre domande, una scheda ciascuna, che si accendono quando le dice.
const DOMANDE = ["Com'è la camera?", "È libera quella notte?", "Quanto costa?"];
export const Domande: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 440;
  const mm = misure(L);
  const accesa = [b[3], b[4], b[5]];
  const va = interpolate(frame, [b[2] - 8, b[2] + 6], [0, 1], { ...clamp, easing: uscita });
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 40 + (1 - va) * 300, top: 200 - (1 - va) * 100, rotate: `${-3 * va}deg`, opacity: Math.min(1, 0.35 + e),
        scale: `${1 + (1 - va) * 0.1}`, transformOrigin: "0 0" }}>
        <Telefono larghezza={L}>
          <PaginaCheScorre file="prima-m" punti={390} larghezza={mm.schermo} tappe={[[0, 0], [b[2], 0], [b[2] + 60, 520]]} />
        </Telefono>
      </div>
      <div style={{ position: "absolute", left: 520, top: 230, width: 520, display: "flex", flexDirection: "column", gap: 40 }}>
        {DOMANDE.map((d, i) => {
          const p = molla(frame, b[2] + 4 + i * 5, 14, 190);
          const on = interpolate(frame, [accesa[i], accesa[i] + 6], [0, 1], clamp);
          return (
            <div key={d} style={{ background: on > 0.5 ? NERO : "#FFFDF6", color: on > 0.5 ? "#FCF0DD" : NERO, borderRadius: 28, padding: "46px 38px 44px",
              border: `2px solid ${on > 0.5 ? NERO : "#D8D3BE"}`, boxShadow: "0 24px 50px rgba(60,50,30,.18)", opacity: p, translate: `${(1 - p) * 120}px 0`,
              scale: `${1 + on * 0.04}` }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: ".2em", opacity: 0.6, marginBottom: 10 }}>0{i + 1}</div>
              <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 58, lineHeight: 1.05 }}>{d}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3 · il foglio: il disegno del sito, pulito ----------
// Un telefono disegnato a mano su carta, coi blocchi che si disegnano quando li nomina: tratto uguale, angoli tondi, e
// le scritte a mano che si scrivono da sinistra. Ogni blocco ha il suo tempo: in alto la spa, poi le date, le due
// camere, le recensioni. `uscita` è quando il foglio diventa il sito (Risultato lo riprende da lì).
type Blocco = { x: number; y: number; w: number; h: number; etichetta: string; da: number };
const Rett: React.FC<{ r: Blocco; frame: number; spesso?: number }> = ({ r, frame, spesso = 5 }) => {
  const lung = 2 * (r.w + r.h);
  const k = interpolate(frame, [r.da, r.da + 14], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={18} fill="none" stroke={INCHIOSTRO} strokeWidth={spesso} strokeLinecap="round"
      strokeDasharray={lung} strokeDashoffset={lung * (1 - k)} />
  );
};
const Scritta: React.FC<{ testo: string; x: number; y: number; da: number; frame: number; corpo?: number; colore?: string }> = ({ testo, x, y, da, frame, corpo = 46, colore = INCHIOSTRO }) => {
  const k = interpolate(frame, [da, da + 12], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, fontFamily: MANO, fontWeight: 700, fontSize: corpo, color: colore, whiteSpace: "nowrap",
      clipPath: `inset(-30% ${(1 - k) * 100}% -30% -5%)` }}>{testo}</div>
  );
};

export const FOGLIO = { x: 150, y: 150, w: 780, h: 1080 };
export const blocchiFoglio = (b: number[]): Blocco[] => [
  { x: 60, y: 40, w: 660, h: 80, etichetta: "logo", da: 2 },
  { x: 60, y: 150, w: 660, h: 330, etichetta: "SPA IN CAMERA", da: b[0] + 4 },
  { x: 60, y: 510, w: 660, h: 110, etichetta: "date libere", da: b[2] + 2 },
  { x: 60, y: 650, w: 315, h: 220, etichetta: "8", da: b[3] },
  { x: 405, y: 650, w: 315, h: 220, etichetta: "4", da: b[3] + 6 },
  { x: 60, y: 900, w: 660, h: 140, etichetta: "recensioni ★ 9,8", da: b[4] },
];

export const Foglio: React.FC<{ b: number[]; frame?: number }> = ({ b, frame: forzato }) => {
  const qui = useCurrentFrame();
  const frame = forzato ?? qui;
  const e = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: uscita });
  const bb = blocchiFoglio(b);
  // la camera segue il blocco che sta nominando, poi torna al foglio intero
  const fuoco = [
    [0, 1, 540, 690],
    [b[0], 1.22, 540, 520],
    [b[2], 1.22, 540, 820],
    [b[4], 1.1, 540, 900],
    [b[4] + 26, 1, 540, 690],
  ] as const;
  let [, s, cx, cy] = fuoco[0] as unknown as number[];
  for (let i = 1; i < fuoco.length; i++) {
    const [f, s2, x2, y2] = fuoco[i];
    const m = spring({ frame: frame - f, fps: FPS, config: { damping: 200, stiffness: 260, mass: 0.7 } });
    s += (s2 - s) * m; cx += (x2 - cx) * m; cy += (y2 - cy) * m;
  }
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: `translate(${540 - cx * s}px, ${690 - cy * s}px) scale(${s})` }}>
        <div style={{ position: "absolute", left: FOGLIO.x, top: FOGLIO.y, width: FOGLIO.w, height: FOGLIO.h, background: "#FFFEFA", borderRadius: 8,
          boxShadow: "0 30px 70px rgba(60,50,30,.22), 0 3px 10px rgba(60,50,30,.12)", rotate: `${-1.5 + (1 - e) * 3}deg`, opacity: e, translate: `0 ${(1 - e) * 100}px` }}>
          <svg width={FOGLIO.w} height={FOGLIO.h} style={{ position: "absolute", left: 0, top: 0 }}>
            {bb.map((r, i) => <Rett key={i} r={r} frame={frame} />)}
            {/* dentro la spa: due onde, la vasca disegnata */}
            <path d="M 260 380 q 30 -24 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke={INCHIOSTRO} strokeWidth={4} strokeLinecap="round"
              strokeDasharray={420} strokeDashoffset={420 * (1 - interpolate(frame, [b[1], b[1] + 14], [0, 1], clamp))} />
            {/* le tre caselle delle date */}
            {[0, 1].map((i) => (
              <line key={i} x1={280 + i * 220} y1={530} x2={280 + i * 220} y2={600} stroke={INCHIOSTRO} strokeWidth={4} strokeLinecap="round"
                strokeDasharray={70} strokeDashoffset={70 * (1 - interpolate(frame, [b[2] + 10 + i * 3, b[2] + 18 + i * 3], [0, 1], clamp))} />
            ))}
            {/* le chiavi: l'arco in cima a ogni camera */}
            {[217, 562].map((x, i) => (
              <path key={x} d={`M ${x - 70} 760 A 70 70 0 0 1 ${x + 70} 760`} fill="none" stroke={INCHIOSTRO} strokeWidth={4} strokeLinecap="round"
                strokeDasharray={230} strokeDashoffset={230 * (1 - interpolate(frame, [b[3] + 6 + i * 6, b[3] + 18 + i * 6], [0, 1], clamp))} />
            ))}
          </svg>
          <Scritta testo="Room84" x={300} y={52} da={6} frame={frame} corpo={44} />
          <Scritta testo="Una notte con la spa" x={150} y={190} da={b[0] + 12} frame={frame} corpo={56} />
          <Scritta testo="in camera" x={270} y={262} da={b[0] + 22} frame={frame} corpo={56} colore={BRONZO} />
          <Scritta testo="arrivo" x={100} y={540} da={b[2] + 12} frame={frame} corpo={38} />
          <Scritta testo="partenza" x={310} y={540} da={b[2] + 16} frame={frame} corpo={38} />
          <Scritta testo="cerca" x={545} y={540} da={b[2] + 20} frame={frame} corpo={38} />
          <Scritta testo="8" x={196} y={765} da={b[3] + 10} frame={frame} corpo={84} />
          <Scritta testo="4" x={541} y={765} da={b[3] + 16} frame={frame} corpo={84} />
          <Scritta testo="★★★★★  9,8 su 40" x={110} y={940} da={b[4] + 6} frame={frame} corpo={50} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 4 · il risultato: il foglio diventa il sito ----------
// Su «Ecco il risultato» il foglio si stringe e si gira nella forma del telefono, e sopra si accende il sito vero, nello
// stesso punto; dietro entra il computer. Poi, su «In alto adesso c'è», il telefono di prima torna accanto, piccolo e
// spento, e la camera stringe sulle due scritte in alto: prima e dopo nella stessa inquadratura.
export const Risultato: React.FC<{ b: number[]; bFoglio: number[] }> = ({ b, bFoglio }) => {
  const frame = useCurrentFrame();
  const LT = 470;
  const mt = misure(LT);
  // prima il foglio si stringe nella forma del telefono, pieno; poi ci si accende sopra il sito; poi entra il computer
  const morph = interpolate(frame, [0, 13], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const acceso = interpolate(frame, [12, 19], [0, 1], clamp);
  const computer = molla(frame, 20, 16, 140);
  const confronto = interpolate(frame, [b[1] - 4, b[1] + 12], [0, 1], { ...clamp, easing: uscita });
  // dove sta il telefono nuovo: al centro, poi a destra quando arriva quello di prima
  const tx = 540 - LT / 2 + confronto * 230, ty = 300 - confronto * 120;
  const scala = 1 + confronto * 0.08;
  // il foglio vola nella forma del telefono
  const fx = FOGLIO.x + (tx - FOGLIO.x) * morph, fy = FOGLIO.y + (ty - FOGLIO.y) * morph;
  const fw = FOGLIO.w + (LT - FOGLIO.w) * morph, fh = FOGLIO.h + (mt.totale - FOGLIO.h) * morph;
  const zoomTesto = interpolate(frame, [b[2] - 2, b[2] + 12], [0, 1], { ...clamp, easing: uscita });
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <AbsoluteFill style={{ scale: `${1 + zoomTesto * 0.1}`, transformOrigin: "540px 480px" }}>
        {/* il computer dietro, col sito nuovo e la testata che si muove */}
        <div style={{ position: "absolute", left: 40, top: 560, opacity: computer * (1 - confronto), translate: `0 ${(1 - computer) * 120}px`, scale: `${0.94 + 0.06 * computer}` }}>
          <Finestra larghezza={1000} indirizzo="room84.it">
            <PaginaCheScorre file="dopo-d" punti={1440} larghezza={1000} tappe={[[0, 0], [60, 0]]} video={{ src: "hero.mp4", x: 0, y: 0, w: 1440, h: 924 }} />
          </Finestra>
        </div>
        {/* il telefono di prima, che torna piccolo per il confronto */}
        <div style={{ position: "absolute", left: 60 - (1 - confronto) * 500, top: 360, opacity: confronto, rotate: "-4deg", filter: "saturate(.6)" }}>
          <Telefono larghezza={400}>
            <PaginaCheScorre file="prima-m" punti={390} larghezza={misure(400).schermo} tappe={[[0, 0], [1, 0]]} />
          </Telefono>
          <span style={{ position: "absolute", left: 20, top: -40, fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: ".2em", background: "#D8D3BE", color: NERO, padding: "10px 18px", borderRadius: 999 }}>PRIMA</span>
        </div>
        {/* il foglio che vola nel telefono */}
        <div style={{ position: "absolute", left: fx, top: fy, width: fw, height: fh, background: "#FFFEFA", borderRadius: 8 + morph * 60, opacity: 1 - acceso,
          boxShadow: "0 30px 70px rgba(60,50,30,.22)", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: -FOGLIO.x, top: -FOGLIO.y, scale: `${fw / FOGLIO.w} ${fh / FOGLIO.h}`, transformOrigin: `${FOGLIO.x}px ${FOGLIO.y}px` }}>
            <div style={{ position: "relative", width: 1080, height: 1920 }}>
              <Foglio b={bFoglio} frame={400} />
            </div>
          </div>
        </div>
        {/* il telefono col sito nuovo */}
        <div style={{ position: "absolute", left: tx, top: ty, opacity: acceso, scale: `${scala}`, transformOrigin: "50% 0" }}>
          <Telefono larghezza={LT}>
            <PaginaCheScorre file="dopo-m" punti={390} larghezza={mt.schermo} tappe={[[0, 0], [60, 0]]} video={{ src: "hero-telefono.mp4", x: 0, y: 0, w: 390, h: 1049 }} />
          </Telefono>
          <span style={{ position: "absolute", right: 20, top: -40, fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: ".2em", background: NERO, color: "#FCF0DD",
            padding: "10px 18px", borderRadius: 999, opacity: confronto }}>DOPO</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 5 · le chiavi, la 8 e la 4, ognuna col suo video ----------
// Il telefono con la sezione delle chiavi; su «ognuna con il suo video» escono di lato due archi col video vero.
export const Chiavi: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 500;
  const mm = misure(L);
  const zoom = interpolate(frame, [b[1] - 4, b[1] + 10], [0, 1], { ...clamp, easing: uscita });
  const archi = [molla(frame, b[2], 13, 170), molla(frame, b[2] + 5, 13, 170)];
  const sposta = interpolate(frame, [b[2] - 4, b[2] + 10], [0, 1], { ...clamp, easing: uscita });
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 540 - L / 2 - sposta * 250, top: 110, opacity: Math.min(1, 0.35 + e), translate: `0 ${(1 - e) * 140}px`, scale: `${1 + zoom * 0.12 - sposta * 0.12}`, transformOrigin: "50% 60%" }}>
        <Telefono larghezza={L}>
          <Img src={staticFile("pb-room84/siti/sez-camere.jpg")} style={{ width: mm.schermo, display: "block" }} />
        </Telefono>
      </div>
      {[["arco-sauna", "8", "Suite Sauna"], ["arco-vasca", "4", "Suite Idromassaggio"]].map(([f, n, nome], i) => (
        <div key={f} style={{ position: "absolute", left: 640, top: 170 + i * 560, width: 380, height: 510, borderRadius: "190px 190px 26px 26px", overflow: "hidden",
          boxShadow: "0 30px 70px rgba(60,50,30,.3)", border: `6px solid ${BRONZO}`, opacity: archi[i], translate: `${(1 - archi[i]) * 200}px 0`, rotate: `${i ? 2 : -2}deg` }}>
          <Video src={staticFile(`pb-room84-5/seg/${f}.mp4`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "70px 24px 22px", background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.7))", textAlign: "center" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 96, lineHeight: 1, color: "#FFF8F0" }}>{n}</div>
            <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 28, color: "#FFF8F0", marginTop: 6 }}>{nome}</div>
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------- 6 · le date: il calendario del sito vivo ----------
// La finestra della disponibilità, vera: tocco sul 19, tocco sul 21, e il periodo che si colora. Il passaggio dallo
// schermo senza date a quello col periodo è lo stesso calendario scorso più su di 446 pixel: si fa scorrere, non si taglia.
export const Calendario: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 500;
  const t1 = b[0] + 6, t2 = b[1] + 4;
  const passa = interpolate(frame, [t2 + 2, t2 + 12], [0, 1], { ...clamp, easing: uscita });
  const lampo = interpolate(frame, [b[2], b[2] + 8, b[2] + 30], [0, 1, 0.4], clamp);
  const k = misure(L).schermo / 1080;
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 540 - L / 2, top: 110, opacity: Math.min(1, 0.35 + e), translate: `0 ${(1 - e) * 140}px` }}>
        <Telefono larghezza={L}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, opacity: 1 - passa, translate: `0 ${-passa * 446 * k}px` }}>
              <Schermo file={frame < t1 + 2 ? "modale-vuota" : "modale-arrivo"} larghezza={L} tocchi={[[122, 1707, t1], [400, 1707, t2]]} />
            </div>
            <div style={{ position: "absolute", left: 0, top: 0, opacity: passa, translate: `0 ${(1 - passa) * 446 * k}px` }}>
              <Schermo file="modale-periodo" larghezza={L}>
                {/* i puntini delle due camere, libere tutte e due: un alone bronzo sul periodo scelto */}
                <div style={{ position: "absolute", left: 30 * k, top: 1180 * k, width: 420 * k, height: 150 * k, borderRadius: 18, boxShadow: `0 0 0 ${6 * lampo}px ${BRONZO}`, opacity: lampo }} />
              </Schermo>
            </div>
          </div>
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 7 · il calendario lo prende da Booking, da solo ----------
// A sinistra il calendario di Booking con le notti prese, a destra quello del sito: un filo li lega, e le notti prese
// passano da una parte all'altra. In basso il foglietto «aggiornare il calendario» che si cancella da solo.
const GIORNI_PRESI = [3, 4, 9, 10, 11, 16, 17, 23, 24, 30];
const Mese: React.FC<{ presi: number; stile: "booking" | "sito"; frame: number; da: number }> = ({ presi, stile, frame, da }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
    {[...Array(31).keys()].map((i) => {
      const g = i + 1;
      const preso = GIORNI_PRESI.indexOf(g);
      const on = preso >= 0 && preso < presi;
      const k = preso >= 0 ? interpolate(frame, [da + preso * 2, da + preso * 2 + 5], [0, 1], clamp) : 0;
      const pieno = on ? k : 0;
      return (
        <div key={g} style={{ height: 50, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: stile === "booking" ? `rgba(0,53,128,${0.85 * pieno})` : "transparent", color: stile === "booking" && pieno > 0.5 ? "#fff" : NERO,
          fontFamily: ARCHIVO, fontWeight: 700, fontSize: 22 }}>
          {g}
          {stile === "sito" ? (
            <span style={{ display: "flex", gap: 4, marginTop: 2 }}>
              {[0, 1].map((j) => <i key={j} style={{ width: 8, height: 8, borderRadius: 4, display: "block", background: on && pieno > 0.5 && (j === 0 || g % 2) ? "#D8D3BE" : BRONZO }} />)}
            </span>
          ) : null}
        </div>
      );
    })}
  </div>
);
export const Booking: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e1 = molla(frame, 0, 15, 160), e2 = molla(frame, 6, 15, 160);
  const filo = interpolate(frame, [b[0] + 10, b[0] + 30], [0, 1], { ...clamp, easing: uscita });
  const nota = molla(frame, b[2] - 4, 13, 180);
  const riga = interpolate(frame, [b[2] + 10, b[2] + 22], [0, 1], clamp);
  const scheda = (titolo: string, sotto: string, figli: React.ReactNode, e: number, x: number, y: number, rot: number) => (
    <div style={{ position: "absolute", left: x, top: y, width: 470, background: "#FFFEFA", borderRadius: 28, padding: "28px 26px", boxShadow: "0 30px 70px rgba(60,50,30,.22)",
      opacity: e, translate: `0 ${(1 - e) * 120}px`, rotate: `${rot}deg` }}>
      <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 34, color: NERO }}>{titolo}</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: ".16em", color: "#8C8A7C", margin: "6px 0 18px" }}>{sotto}</div>
      {figli}
    </div>
  );
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      {scheda("Booking.com", "OTTOBRE · NOTTI PRESE", <Mese presi={10} stile="booking" frame={frame} da={8} />, e1, 50, 170, -2)}
      {scheda("room84.it", "OTTOBRE · DISPONIBILITÀ", <Mese presi={10} stile="sito" frame={frame} da={b[0] + 22} />, e2, 560, 560, 2)}
      <svg style={{ position: "absolute", left: 0, top: 0 }} width={1080} height={1920}>
        <defs>
          <mask id="filo-booking" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920">
            <path d="M 470 560 C 560 560, 560 640, 600 700" fill="none" stroke="#fff" strokeWidth={16} pathLength={1} strokeDasharray={`${filo} 1`} />
          </mask>
        </defs>
        <path d="M 470 560 C 560 560, 560 640, 600 700" fill="none" stroke={NERO} strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" mask="url(#filo-booking)" />
      </svg>
      <div style={{ position: "absolute", left: 90, top: 1000, width: 420, background: "#FFF3B8", padding: "26px 30px", rotate: "-4deg", boxShadow: "0 18px 40px rgba(60,50,30,.2)",
        opacity: nota, scale: `${0.7 + 0.3 * nota}` }}>
        <span style={{ position: "relative", fontFamily: MANO, fontWeight: 700, fontSize: 44, color: INCHIOSTRO }}>
          aggiornare il calendario
          <span style={{ position: "absolute", left: -6, right: -6, top: "52%", height: 6, background: INCHIOSTRO, borderRadius: 3, scale: `${riga} 1`, transformOrigin: "left center" }} />
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 8 · un tocco, e la chiedi su WhatsApp col messaggio già scritto ----------
// Il riepilogo vero del sito, il tocco sul bottone, e poi la chat col messaggio che il sito prepara (prenota.js).
const MESSAGGIO = ["Ciao Room84,", "vorrei la Camera 8 (Suite Sauna) dal 19/10/2026 al 21/10/2026: 2 notti, 2 adulti.", "È libera?"];
export const WhatsApp: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 500;
  const m = misure(L);
  const tocco = b[1] + 4;
  const chat = interpolate(frame, [tocco + 8, tocco + 18], [0, 1], { ...clamp, easing: uscita });
  const lettere = Math.floor(interpolate(frame, [tocco + 16, b[3] + 10], [0, MESSAGGIO.join(" ").length], clamp));
  let resto = lettere;
  const righe = MESSAGGIO.map((r) => { const t = r.slice(0, Math.max(0, resto)); resto -= r.length + 1; return t; });
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 540 - L / 2, top: 110, opacity: Math.min(1, 0.35 + e), translate: `0 ${(1 - e) * 140}px` }}>
        <Telefono larghezza={L}>
          <div style={{ position: "relative", height: m.altezza - m.barra }}>
            <div style={{ position: "absolute", inset: 0, opacity: 1 - chat }}>
              <Schermo file="modale-esito" larghezza={L} tocchi={[[540, 1123, tocco]]} />
            </div>
            <div style={{ position: "absolute", inset: 0, opacity: chat, background: "#ECE5DD", translate: `${(1 - chat) * 60}px 0` }}>
              <div style={{ height: 96, background: "#075E54", display: "flex", alignItems: "center", gap: 16, padding: "0 22px" }}>
                <div style={{ width: 52, height: 52, borderRadius: 26, background: "#1A1816", color: "#FFF8F0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 28 }}>V</div>
                <div>
                  <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, color: "#fff" }}>Room84</div>
                  <div style={{ fontFamily: ARCHIVO, fontSize: 18, color: "rgba(255,255,255,.75)" }}>online</div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 18, right: 18, top: 150, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
                <span style={{ alignSelf: "center", background: "#E1F2FB", color: "#555", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 18, padding: "6px 14px", borderRadius: 8 }}>OGGI</span>
                <div style={{ maxWidth: "92%", background: "#DCF8C6", borderRadius: "22px 4px 22px 22px", padding: "22px 24px", boxShadow: "0 2px 4px rgba(0,0,0,.14)",
                  fontFamily: ARCHIVO, fontWeight: 500, fontSize: 32, lineHeight: 1.32, color: "#111", minHeight: 80 }}>
                  {righe.map((r, i) => <div key={i}>{r || " "}</div>)}
                </div>
              </div>
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 22, height: 70, borderRadius: 35, background: "#fff", display: "flex", alignItems: "center", padding: "0 26px",
                fontFamily: ARCHIVO, fontSize: 22, color: "#9A9A9A" }}>Messaggio già scritto: basta inviarlo</div>
            </div>
          </div>
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 9 · oppure il prezzo su Booking, con le date già inserite ----------
// Il tocco sul secondo bottone, e la ricerca di Booking con date e ospiti già messi, che si accendono uno alla volta.
// Nessun prezzo inventato: il prezzo lo dice Booking, e qui non si mostra.
export const Prezzo: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 500;
  const m = misure(L);
  const tocco = b[1] + 2;
  const pagina = interpolate(frame, [tocco + 6, tocco + 16], [0, 1], { ...clamp, easing: uscita });
  const campi = [["CHECK-IN", "lun 19 ott 2026"], ["CHECK-OUT", "mer 21 ott 2026"], ["OSPITI", "2 adulti · 1 camera"]];
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 540 - L / 2, top: 110, opacity: Math.min(1, 0.35 + e), translate: `0 ${(1 - e) * 140}px` }}>
        <Telefono larghezza={L}>
          <div style={{ position: "relative", height: m.altezza - m.barra, background: "#fff" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 1 - pagina }}>
              <Schermo file="modale-esito" larghezza={L} tocchi={[[540, 1278, tocco]]} />
            </div>
            <div style={{ position: "absolute", inset: 0, opacity: pagina, translate: `${(1 - pagina) * 60}px 0`, background: "#F5F5F5" }}>
              <div style={{ height: 120, background: "#003580", display: "flex", alignItems: "center", padding: "0 26px" }}>
                <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 36, color: "#fff" }}>Booking.com</span>
              </div>
              <div style={{ padding: "26px 22px" }}>
                <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 36, color: "#111" }}>Room84</div>
                <div style={{ fontFamily: ARCHIVO, fontSize: 22, color: "#555", margin: "4px 0 22px" }}>Poggiomarino · ★ 9,8</div>
                {campi.map(([t, v], i) => {
                  const on = interpolate(frame, [b[2] + i * 5, b[2] + i * 5 + 6], [0, 1], clamp);
                  return (
                    <div key={t} style={{ background: "#fff", border: `4px solid ${on > 0.5 ? "#FEBB02" : "#E2E2E2"}`, borderRadius: 14, padding: "16px 20px", marginBottom: 14,
                      scale: `${1 + 0.03 * on}`, transformOrigin: "left center" }}>
                      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 17, letterSpacing: ".14em", color: "#888" }}>{t}</div>
                      <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 30, color: "#111", marginTop: 4 }}>{v}</div>
                    </div>
                  );
                })}
                <div style={{ marginTop: 8, background: "#006CE4", borderRadius: 12, padding: "20px", textAlign: "center", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 28, color: "#fff" }}>Vedi le tariffe</div>
              </div>
            </div>
          </div>
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 10 · le recensioni vere: 9,8 su 40 ----------
// A sinistra il telefono con la sezione delle recensioni del sito, a destra il numero grande che sale fino a 9,8.
export const Recensioni: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const L = 440;
  const mm = misure(L);
  const n = interpolate(frame, [b[2], b[2] + 20], [0, 9.8], { ...clamp, easing: Easing.out(Easing.cubic) });
  const num = molla(frame, b[2] - 4, 13, 180);
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 50, top: 190, rotate: "-3deg", opacity: e, translate: `${(1 - e) * -100}px 0` }}>
        <Telefono larghezza={L}>
          <Img src={staticFile("pb-room84/siti/sez-recensioni.jpg")} style={{ width: mm.schermo, display: "block" }} />
        </Telefono>
      </div>
      <div style={{ position: "absolute", left: 540, top: 380, width: 500, textAlign: "center", opacity: Math.min(1, 0.35 + e), translate: `${(1 - e) * 100}px 0` }}>
        <div style={{ height: 230, fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 230, lineHeight: 1, color: NERO, letterSpacing: "-0.03em", opacity: num, scale: `${0.85 + 0.15 * num}` }}>{n.toFixed(1).replace(".", ",")}</div>
        <div style={{ fontFamily: ARCHIVO, fontSize: 56, color: BRONZO, letterSpacing: ".1em", marginTop: 8 }}>★★★★★</div>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, letterSpacing: ".18em", color: "#4A493F", marginTop: 18, lineHeight: 1.5 }}>40 RECENSIONI<br />SU BOOKING</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 11 · «Mo' pure il sito»: computer e telefono insieme ----------
export const Coppia: React.FC = () => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0, 16, 150);
  const LT = 330;
  const mt = misure(LT);
  return (
    <AbsoluteFill>
      <FondaleChiaro />
      <div style={{ position: "absolute", left: 40, top: 560, opacity: e, translate: `0 ${(1 - e) * 120}px` }}>
        <Finestra larghezza={1000} indirizzo="room84.it">
          <PaginaCheScorre file="dopo-d" punti={1440} larghezza={1000} tappe={[[0, 0], [10, 0], [90, 600]]} video={{ src: "hero.mp4", x: 0, y: 0, w: 1440, h: 924 }} />
        </Finestra>
      </div>
      <div style={{ position: "absolute", left: 1080 - 60 - LT, top: 1300 - mt.totale + 180, opacity: e, translate: `0 ${(1 - e) * 180}px` }}>
        <Telefono larghezza={LT}>
          <PaginaCheScorre file="dopo-m" punti={390} larghezza={mt.schermo} tappe={[[0, 0], [14, 0], [90, 500]]} video={{ src: "hero-telefono.mp4", x: 0, y: 0, w: 390, h: 1049 }} />
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame } from "remotion";
import { APP_VERDE, ARCHIVO, CREMA, EVID_ARANCIO, EVID_GIALLO, EVID_VERDE, INTERMEDIO, MANO, MONO } from "../pb-girarrosto/font";
import { Fondale, useCamera, useEntrata } from "./Scene";
import { FPS } from "./testo";

// Le illustrazioni della v6 (03/10/2026). I pezzi di base sono quelli della v5 (`../pb-girarrosto/Illustrazioni.tsx`):
// il foglio scritto a mano, le schede e i totali dell'app. Cambiano due cose, dalla revisione dei reel: riempiono lo
// schermo invece di stare piccole nel nero, e una camera si sposta da un punto all'altro mentre la voce parla, così
// nessuna inquadratura resta ferma più di due-tre secondi. In più c'è il contatore dei conti.
// ⚠️ Il fondo è il fondale firma scuro, con la griglia e il bagliore caldo: la prima prova in chiaro non è piaciuta a
// Emanuele, «a me piaceva lo sfondo scuro con le righe e il gradiente dei colori del brand». La scala chiara si usa per
// un reel intero, quando il lavoro la chiama, mai mescolata alla scura nello stesso video. Il Girarrosto è la sera, il
// servizio e lo spiedo: scuro.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);

// ---------- una riga scritta a mano, disegnata come un corsivo ----------
// Un cicloide allungato fa gli occhielli del corsivo; l'ampiezza cambia lettera per lettera e le
// parole si staccano. I punti si generano qui, così la lunghezza del tratto è esatta.
const rnd = (seme: number) => {
  let s = seme;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
const corsivo = (larghezza: number, seme: number) => {
  const r = rnd(seme);
  const punti: [number, number][] = [];
  let x = 0;
  let t = 0;
  while (x < larghezza) {
    const a = 9 + r() * 12; // altezza della lettera
    const passo = 0.2;
    for (let k = 0; k < 32; k++) {
      t += passo;
      x += 1.05;
      punti.push([x + 7 * Math.cos(t * 1.6), -Math.abs(Math.sin(t * 0.8)) * a + 2.5 * Math.sin(t * 0.33)]);
    }
  }
  let lung = 0;
  for (let i = 1; i < punti.length; i++) lung += Math.hypot(punti[i][0] - punti[i - 1][0], punti[i][1] - punti[i - 1][1]);
  const d = punti.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
  return { d, lung };
};

// `ora`: il frame da usare al posto di quello della sequenza, quando l'illustrazione riprende da metà (FoglioCamera)
export const Tratto: React.FC<{ x: number; y: number; larghezza: number; seme: number; da: number; durata: number; ora?: number }> = ({ x, y, larghezza, seme, da, durata, ora }) => {
  const qui = useCurrentFrame();
  const frame = ora ?? qui;
  const { d, lung } = corsivo(larghezza, seme);
  const k = interpolate(frame, [da, da + durata], [0, 1], clamp);
  return (
    <svg style={{ position: "absolute", left: x, top: y - 30, overflow: "visible" }} width={larghezza + 20} height={40}>
      <path d={d} transform="translate(4,30)" fill="none" stroke="#26241E" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={lung} strokeDashoffset={lung * (1 - k)} />
    </svg>
  );
};

// ---------- 1 · il foglio degli ordini ----------
// I cognomi restano scarabocchi, come su un foglio vero visto da lontano; gli ordini si leggono,
// scritti a mano, e l'evidenziatore passa sotto quelli col colore giusto: giallo il fritto,
// arancione l'impanato, verde il tacchino, come l'hanno spiegato i ragazzi del Girarrosto.
export const Ordine: React.FC<{ testo: string; x: number; y: number; da: number; durata: number; colore?: string; passa?: number; ora?: number }> = ({ testo, x, y, da, durata, colore, passa, ora }) => {
  const qui = useCurrentFrame();
  const frame = ora ?? qui;
  const k = interpolate(frame, [da, da + durata], [0, 1], clamp);
  const e = passa === undefined ? 0 : interpolate(frame, [passa, passa + 12], [0, 1], { ...clamp, easing: uscita });
  return (
    <div style={{ position: "absolute", left: x, top: y - 46, whiteSpace: "nowrap" }}>
      {colore ? (
        <div style={{ position: "absolute", left: -12, right: -14, top: 12, height: 42, background: colore, opacity: 0.62, mixBlendMode: "multiply",
          borderRadius: "10px 16px 12px 18px / 16px 10px 18px 12px", rotate: "-0.8deg", scale: `${e} 1`, transformOrigin: "left center" }} />
      ) : null}
      <span style={{ position: "relative", fontFamily: MANO, fontWeight: 700, fontSize: 44, color: "#26241E",
        clipPath: `inset(-30% ${(1 - k) * 100}% -30% -5%)` }}>{testo}</span>
    </div>
  );
};

// ---------- 2 · le schede dell'app ----------
export type Scheda = { n: string; ora: string; voci: [string, string][]; totale: string };
export const SCHEDE: Scheda[] = [
  { n: "#12", ora: "18:35", voci: [["2 × Pollo", "€20,00"], ["1 × Patatine grande", "€6,00"], ["1 × Coca-Cola 1,5 lt", "€3,00"]], totale: "€29,00" },
  { n: "#11", ora: "18:31", voci: [["1 × Metà pollo", "€5,00"]], totale: "€5,00" },
  { n: "#10", ora: "18:30", voci: [["1 × Pollo", "€10,00"], ["4 × Würstel", "€4,00"], ["3 × Salsiccia", "€3,75"]], totale: "€19,75" },
  { n: "#9", ora: "18:25", voci: [["1 × Pollo", "€10,00"]], totale: "€10,00" },
];

export const Pillola: React.FC<{ numero: string; testo: string }> = ({ numero, testo }) => (
  <div style={{ flex: 1, background: "#111", borderRadius: 14, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 2 }}>
    <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, color: APP_VERDE }}>{numero}</span>
    <span style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 15, letterSpacing: ".14em", color: "#CFCFCF" }}>{testo}</span>
  </div>
);

export const SchedaApp: React.FC<{ s: Scheda; voci: number; totale: number; conta?: number; bottone?: number }> = ({ s, voci, totale, conta, bottone = 1 }) => (
  <div style={{ background: "#fff", border: "3px solid #1A1A1A", borderRadius: 20, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontWeight: 700, fontSize: 17, color: "#8A8A8A" }}>
      <span>{s.n}</span><span>{s.ora}</span>
    </div>
    {s.voci.map(([v, p], i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 21, color: "#333", opacity: i < voci ? 1 : 0 }}>
        <span>{v}</span><span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 19 }}>{p}</span>
      </div>
    ))}
    <div style={{ marginTop: "auto", borderTop: "2px solid #E6E6E6", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline", opacity: totale }}>
      <span style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 14, letterSpacing: ".16em", color: "#9A9A9A" }}>TOTALE</span>
      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, color: "#111" }}>
        {conta === undefined ? s.totale : `€${conta.toFixed(2).replace(".", ",")}`}
      </span>
    </div>
    <div style={{ display: "flex", gap: 10 }}>
      <span style={{ background: APP_VERDE, color: "#0A2A12", borderRadius: 999, padding: "9px 16px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 14, letterSpacing: ".08em", scale: `${bottone}` }}>CONSEGNATO</span>
      <span style={{ border: "2px solid #CFCFCF", color: "#555", borderRadius: 999, padding: "7px 16px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 14, letterSpacing: ".08em" }}>MODIFICA</span>
    </div>
  </div>
);

// ---------- 3 · i pezzi da preparare ----------
const PEZZI: [string, number][] = [
  ["Pollo", 12], ["Metà pollo", 1], ["Coscia di pollo", 4], ["Coscia di tacchino", 1],
  ["Ali di pollo", 3], ["Alette piccanti", 12], ["Lollipop", 11], ["Spiedino", 8],
];


// ---------- 1 · il foglio degli ordini, con la camera ----------
// Una sola illustrazione per «Squilla il telefono…» e per i tre colori, interrotta dalla soggettiva dell'evidenziatore:
// `offset` dice da che punto riprende, così il foglio torna com'era. I tempi sono in frame dall'inizio del telefono.
export type TempiFoglio = { cognome: number; evidenziatore: number; giallo: number; arancione: number; verde: number; fine: number };
const RIGHE = [
  { y: 150, nome: 140, ordine: "1 pollo fritto, patatine", colore: EVID_GIALLO },
  { y: 262, nome: 130, ordine: "2 alette impanate", colore: EVID_ARANCIO },
  { y: 374, nome: 135, ordine: "1 coscia di tacchino", colore: EVID_VERDE },
  { y: 486, nome: 140, ordine: "2 polli fritti", colore: EVID_GIALLO },
  { y: 598, nome: 140, ordine: "4 alette impanate", colore: EVID_ARANCIO },
];
const FX = 150, FY = 250; // dove sta il foglio nella tela
const riga = (i: number): [number, number] => [FX + 400, FY + RIGHE[i].y - 18];

export const FoglioCamera: React.FC<{ t: TempiFoglio; offset?: number }> = ({ t, offset = 0 }) => {
  const frame = useCurrentFrame() + offset;
  const e = interpolate(frame, [0, 12], [0, 1], { ...clamp, easing: uscita });
  const tempi = RIGHE.map((_, i) =>
    i === 0
      ? { nome: [t.cognome, 18], ordine: [t.cognome + 16, 22] }
      : { nome: [t.evidenziatore + 4 + (i - 1) * 8, 8], ordine: [t.evidenziatore + 9 + (i - 1) * 8, 10] },
  );
  const passate = [t.giallo + 8, t.arancione + 6, t.verde + 6, t.fine - 14, t.fine - 9];
  const squillo = frame < t.cognome ? Math.sin(frame * 1.6) * 11 : 0;
  const telefono = interpolate(frame, [0, 5, t.cognome + 6, t.cognome + 14], [0, 1, 1, 0], clamp);
  // la camera: il foglio intero, poi stretta su ogni colore mentre lo dice, poi di nuovo tutto il foglio
  const cam = useCamera(
    [
      [0, 1.22, 540, 640],
      [t.cognome, 1.42, 560, 520],
      [t.giallo, 1.75, ...riga(0)],
      [t.arancione, 1.75, ...riga(1)],
      [t.verde, 1.75, ...riga(2)],
      [t.fine - 18, 1.24, 540, 650],
    ],
    frame,
  );
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <AbsoluteFill style={{ transformOrigin: "0 0", transform: `translate(${540 - cam.x * cam.scala}px, ${820 - cam.y * cam.scala}px) scale(${cam.scala})` }}>
        <div
          style={{
            position: "absolute", left: FX, top: FY, width: 780, height: 780,
            background: "#F7F3E8",
            backgroundImage: "linear-gradient(rgba(90,120,190,.17) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(90,120,190,.17) 1.5px, transparent 1.5px)",
            backgroundSize: "37px 37px",
            borderRadius: 10,
            boxShadow: "0 30px 80px rgba(0,0,0,.55), 0 4px 12px rgba(0,0,0,.35)",
            rotate: `${-2.5 + (1 - e) * 4}deg`,
            translate: `0 ${(1 - e) * 120}px`,
            opacity: e,
          }}
        >
          {RIGHE.map((r, i) => (
            <div key={i}>
              <Tratto x={34} y={r.y} larghezza={r.nome} seme={11 + i * 7} da={tempi[i].nome[0]} durata={tempi[i].nome[1]} ora={frame} />
              <Ordine testo={r.ordine} x={250} y={r.y} da={tempi[i].ordine[0]} durata={tempi[i].ordine[1]} colore={r.colore} passa={passate[i]} ora={frame} />
            </div>
          ))}
        </div>
        <svg width={150} height={150} viewBox="0 0 150 150" style={{ position: "absolute", left: 800, top: 150, opacity: telefono, rotate: `${squillo}deg` }}>
          <rect x="45" y="20" width="60" height="110" rx="14" fill="#1A1A16" stroke={CREMA} strokeWidth="4" />
          <rect x="56" y="36" width="38" height="26" rx="4" fill={CREMA} opacity=".9" />
          {[0, 1, 2].map((i) => (
            <g key={i} fill={CREMA} opacity=".8">
              <circle cx={60 + i * 15} cy={78} r={4} /><circle cx={60 + i * 15} cy={94} r={4} /><circle cx={60 + i * 15} cy={110} r={4} />
            </g>
          ))}
          <path d="M118 40 q14 14 0 30 M128 30 q24 24 0 50" fill="none" stroke={CREMA} strokeWidth="5" strokeLinecap="round" />
        </svg>
      </AbsoluteFill>
      {/* in basso il foglio sfuma nel fondo: quando la camera stringe, la scrittura non va sotto i sottotitoli */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(14,14,12,0) 60%, #0E0E0C 72%, #0E0E0C 100%)" }} />
    </AbsoluteFill>
  );
};

// ---------- 2 · i conti a mente ----------
// Un numero che sale fino a 120 e riempie lo schermo: i conti di una sera piena, tutti a mente, come dice la voce.
export const Contatore: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [2, 26], [0, 120], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const e = spring({ frame, fps: FPS, config: { damping: 14, stiffness: 160 } });
  const colpo = 1 + 0.06 * spring({ frame: frame - 26, fps: FPS, config: { damping: 8, stiffness: 220 } }) * interpolate(frame, [26, 40], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 400 }}>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 380, lineHeight: 1, color: CREMA, letterSpacing: "-0.03em",
          scale: `${(0.9 + 0.1 * e) * colpo}`, opacity: e, fontVariantNumeric: "tabular-nums" }}>{n}</div>
        <div style={{ marginTop: 26, fontFamily: MONO, fontWeight: 700, fontSize: 40, letterSpacing: ".24em", color: INTERMEDIO, opacity: e }}>CONTI A MENTE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 3 · le schede dell'app, più grandi ----------
// La logica è quella della v5; i tempi arrivano come [inizio, …, «Scrivi l'ordine», «e il conto», «lo fa lei»] nelle
// posizioni 3, 4 e 5, e `veloce` è quando dice «solo più veloce»: lì la camera dà un colpo in avanti.
export const SchedeGrandi: React.FC<{ blocchi: number[]; veloce: number }> = ({ blocchi: b, veloce }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const fuoco = interpolate(frame, [b[3], b[3] + 12], [0, 1], { ...clamp, easing: uscita });
  const vociScritte = Math.floor(interpolate(frame, [b[3] + 4, b[3] + 22], [0, 3.99], clamp));
  const conta = interpolate(frame, [b[4] + 2, b[4] + 18], [0, 29], { ...clamp, easing: Easing.out(Easing.cubic) });
  const bottone = 1 + 0.08 * spring({ frame: frame - (b[5] + 6), fps: FPS, config: { damping: 8, stiffness: 180 } }) * interpolate(frame, [b[5] + 6, b[5] + 20], [1, 0], clamp);
  const pop = (i: number) => spring({ frame: frame - (6 + i * 6), fps: FPS, config: { damping: 14, stiffness: 170 } });
  const posizioni: [number, number][] = [[40, 230], [430, 230], [40, 620], [430, 620]];
  const colpo = 1 + 0.05 * spring({ frame: frame - veloce, fps: FPS, config: { damping: 9, stiffness: 200 } }) * interpolate(frame, [veloce, veloce + 18], [1, 0.6], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <div
        style={{
          position: "absolute", left: 110, top: 105, width: 860, height: 1060, background: "#F4F4F2", borderRadius: 40,
          boxShadow: "0 40px 90px rgba(0,0,0,.6)", translate: `0 ${(1 - e) * 160}px`, opacity: interpolate(e, [0, 0.4], [0, 1], clamp),
          scale: `${1.1 * colpo}`, transformOrigin: "50% 0",
        }}
      >
        <div style={{ position: "absolute", left: 40, top: 36, right: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 30, color: "#111" }}>ORDINI</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, color: "#999" }}>MER 16 SET</span>
        </div>
        <div style={{ position: "absolute", left: 40, right: 40, top: 100, display: "flex", gap: 16, opacity: 1 - fuoco * 0.7 }}>
          <Pillola numero="12" testo="DA CONSEGNARE" />
          <Pillola numero="12" testo="ORDINI OGGI" />
        </div>
        {SCHEDE.map((s, i) => {
          const [x, y] = posizioni[i];
          const p = pop(i);
          const primo = i === 0;
          const scala = primo ? 1 + fuoco * 0.62 : 1;
          const tx = primo ? fuoco * (114 - 40) : 0;
          const ty = primo ? fuoco * 40 : 0;
          return (
            <div key={i} style={{
              position: "absolute", left: x, top: y, width: 390, height: 370,
              scale: `${p * scala}`, transformOrigin: "top left", translate: `${tx}px ${ty}px`,
              opacity: primo ? 1 : 1 - fuoco * 0.8, zIndex: primo ? 2 : 1,
            }}>
              <SchedaApp s={s}
                voci={primo && fuoco > 0 ? vociScritte : s.voci.length}
                totale={primo && fuoco > 0 ? (frame >= b[4] + 2 ? 1 : 0) : 1}
                conta={primo && fuoco > 0 ? conta : undefined}
                bottone={primo ? bottone : 1} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- 4 · i pezzi da preparare, più grandi ----------
export const TotaliGrandi: React.FC = () => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 200 } });
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: 100, top: 110, width: 880, height: 1100, background: "#F4F4F2", borderRadius: 40,
        boxShadow: "0 40px 90px rgba(0,0,0,.6)", scale: `${(0.94 + 0.06 * e) * 1.04}`, transformOrigin: "50% 0", opacity: e }}>
        <div style={{ position: "absolute", left: 40, right: 40, top: 40, display: "flex", gap: 16 }}>
          <Pillola numero={`${Math.round(interpolate(frame, [2, 18], [0, 106], clamp))}`} testo="PEZZI DA PREPARARE" />
          <Pillola numero="106" testo="PEZZI IN GIORNATA" />
        </div>
        <div style={{ position: "absolute", left: 44, top: 170, fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: ".2em", color: "#8A8A8A" }}>CARNI</div>
        {PEZZI.map(([nome, n], i) => {
          const k = spring({ frame: frame - (3 + i * 2), fps: FPS, config: { damping: 16, stiffness: 220 } });
          const valore = Math.round(interpolate(frame, [4 + i * 2, 16 + i * 2], [0, n], clamp));
          return (
            <div key={nome} style={{ position: "absolute", left: 44, right: 44, top: 214 + i * 106, height: 90, display: "flex", alignItems: "center", gap: 22,
              borderBottom: "2px solid #E4E4E2", opacity: k, translate: `${(1 - k) * 40}px 0` }}>
              <span style={{ width: 68, height: 68, borderRadius: 14, background: "#111", color: APP_VERDE, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: MONO, fontWeight: 700, fontSize: 30 }}>{valore}</span>
              <span style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 34, color: "#1A1A1A" }}>{nome}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

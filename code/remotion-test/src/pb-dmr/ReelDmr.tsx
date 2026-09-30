import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio, Video } from "@remotion/media";
import "../pb-girarrosto/font";
import { ARCHIVO, CREMA, MONO } from "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { FinaleCta } from "../pb-girarrosto/ReelGirarrosto";
import { Sottotitoli } from "../pb-room84/Sottotitoli";
import { Telefono, misure } from "../pb-room84/Telefono";
import { FPS, inFrame, type Blocco } from "../pb-room84/testo";
import voce from "./voce.json";

// Il reel del gestionale di Da Mamma Rosaria, 30/09/2026 notte, fatto come quello della Tenuta che Emanuele ha
// approvato («questo è perfetto e va benissimo»): il drone del posto in apertura, due riprese tagliate sul parlato, le
// illustrazioni per il prima, le schermate vere del gestionale con le feste inventate (le anteprime del suo sito,
// code/mockup-lavori), le foto vere del posto a mazzo e la CTA sulla ripresa finale. Il messaggio WhatsApp e i file dei
// turni sono ricostruiti, con dati inventati: raccontano com'era, non un cliente vero. I tempi vengono dalla sua voce
// (scripts/pb-dmr-voce.py).
//
// Seconda versione, la stessa notte, sulla voce rifatta da Emanuele: «qui si fanno eventi privati», «tutto
// sincronizzato» e «E nulla viene lasciato al caso» al posto di «li pago io», e le foto a mazzo vanno lì. Il secondo drone
// è diventato la 0017, che sale sui gazebo col Vesuvio dietro («più figa, che si vede meglio»), e la notte è il tratto
// in cui il drone va dritto nel viale, non quello in cui scivolava di lato; dalla v3 parte un secondo dopo, a 10,0, quando
// è già stabile nel percorso.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const T = voce as {
  durata: number;
  scene: Record<"drone" | "whatsapp" | "drive" | "gestionale" | "festa" | "pagine" | "conti" | "caso" | "finale", { da: number; a: number }>;
  movimenti: Record<"feste" | "riscritto" | "acconti" | "sparsi" | "drive" | "mente" | "cliente" | "lavora" | "cucina" | "sincronizzato" | "entrato" | "manca", number>;
  blocchi: Blocco[];
  cta: { da: number; chiave: number };
};
export const DURATA_DMR = inFrame(T.durata);
const tratto = (s: { da: number; a: number }) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });
const ombra = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.4) 74%, rgba(0,0,0,.25) 100%)" }} />;
const molla = (frame: number, da: number) => spring({ frame: frame - da, fps: FPS, config: { damping: 17, stiffness: 180, mass: 0.7 } });
const INCHIOSTRO = "#1F1E1A";

// ---------- 1 · il messaggio WhatsApp, scritto e riscritto ----------
const RIGHE = ["Festa di sabato 17", "60 adulti · 25 bambini", "Menù: antipasto, paccheri, arrosto", "Acconto: 300 €", "Saldo: 1.450 € il giorno della festa"];
const Bolla: React.FC<{ scritte: number; accese: number; stile?: React.CSSProperties }> = ({ scritte, accese, stile }) => (
  <div style={{ alignSelf: "flex-end", maxWidth: "88%", background: "#DCF3D0", borderRadius: "22px 22px 6px 22px", padding: "16px 20px 12px", boxShadow: "0 2px 0 rgba(0,0,0,.08)", ...stile }}>
    {RIGHE.map((r, i) => {
      const k = Math.max(0, Math.min(1, scritte - i));
      const soldi = i >= 3;
      return (
        <div key={i} style={{ position: "relative", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 21, lineHeight: 1.35, color: INCHIOSTRO, clipPath: `inset(-10% ${(1 - k) * 100}% -10% -2%)` }}>
          {soldi ? <span style={{ position: "absolute", left: -6, right: -6, top: 4, bottom: 2, background: "rgba(252,240,221,.95)", borderRadius: 6, scale: `${accese} 1`, transformOrigin: "left center", zIndex: 0 }} /> : null}
          <span style={{ position: "relative" }}>{r}</span>
        </div>
      );
    })}
    <div style={{ textAlign: "right", fontFamily: MONO, fontSize: 15, color: "rgba(31,30,26,.45)", marginTop: 4 }}>18:42 ✓✓</div>
  </div>
);
const Whatsapp: React.FC<{ riscritto: number; acconti: number }> = ({ riscritto, acconti }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0);
  const scritte = interpolate(frame, [6, riscritto - 4], [0, RIGHE.length], clamp);
  const copia = molla(frame, riscritto + 4);
  const copia2 = molla(frame, riscritto + 16);
  const accese = interpolate(frame, [acconti + 2, acconti + 12], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  // 520 px: col telefono da 600 la chat chiara scendeva sotto i sottotitoli, e il testo crema non si leggeva
  const L = 520;
  const m = misure(L);
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      <div style={{ position: "absolute", left: (1080 - L) / 2, top: 100, translate: `0 ${(1 - e) * 140}px`, opacity: Math.min(1, e * 1.4) }}>
        <Telefono larghezza={L}>
          <div style={{ width: m.schermo, height: m.altezza, background: "#EFE9DF", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#1F2C27", padding: "16px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 99, background: "#6D7A74" }} />
              <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 24, color: "#EEF2EF" }}>Conferma festa</div>
            </div>
            <div style={{ flex: 1, padding: "22px 18px", display: "flex", flexDirection: "column", gap: 18, overflow: "hidden" }}>
              <Bolla scritte={scritte} accese={accese} />
              {frame >= riscritto + 4 ? <Bolla scritte={RIGHE.length} accese={accese} stile={{ translate: `0 ${(1 - copia) * 80}px`, opacity: copia }} /> : null}
              {frame >= riscritto + 16 ? <Bolla scritte={RIGHE.length} accese={accese} stile={{ translate: `0 ${(1 - copia2) * 80}px`, opacity: copia2 }} /> : null}
            </div>
          </div>
        </Telefono>
      </div>
      {ombra}
    </AbsoluteFill>
  );
};

// ---------- 2 · i turni, in file sparsi ----------
const FILE: { nome: string; x: number; y: number; r: number }[] = [
  { nome: "Turni luglio.docx", x: 90, y: 250, r: -7 },
  { nome: "turni luglio (1).docx", x: 560, y: 330, r: 5 },
  { nome: "TURNI DEFINITIVO.docx", x: 170, y: 560, r: 4 },
  { nome: "Copia di Turni.docx", x: 600, y: 650, r: -6 },
  { nome: "turni sabato nuovo.docx", x: 250, y: 880, r: -3 },
  { nome: "Turni DEF 2.docx", x: 640, y: 960, r: 8 },
];
const Documento: React.FC<{ nome: string }> = ({ nome }) => (
  <div style={{ width: 340, background: "#FBFAF6", borderRadius: 16, padding: 16, boxShadow: "0 24px 60px rgba(0,0,0,.5)" }}>
    <div style={{ height: 150, borderRadius: 8, background: "#fff", border: "1px solid #E6E3DA", padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
      {[0.9, 0.7, 0.8, 0.55, 0.75].map((w, i) => <div key={i} style={{ height: 9, width: `${w * 100}%`, borderRadius: 4, background: i === 0 ? "#9BB3E6" : "#E3E0D6" }} />)}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
      <div style={{ width: 22, height: 26, borderRadius: 4, background: "#4A7CE0" }} />
      <div style={{ fontFamily: ARCHIVO, fontWeight: 600, fontSize: 21, color: INCHIOSTRO, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{nome}</div>
    </div>
  </div>
);
const Drive: React.FC<{ sparsi: number; drive: number; mente: number }> = ({ sparsi, drive, mente }) => {
  const frame = useCurrentFrame();
  const finestra = molla(frame, drive - 2);
  const spento = interpolate(frame, [mente, mente + 14], [1, 0.3], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <div style={{ position: "absolute", left: 60, top: 170, width: 960, height: 1150, borderRadius: 20, background: "#191915", border: "1px solid #2A2A24",
        opacity: finestra, scale: `${0.96 + 0.04 * finestra}` }}>
        <div style={{ padding: "22px 28px", fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: ".2em", color: "rgba(238,235,218,.55)" }}>DRIVE · I MIEI FILE</div>
      </div>
      {FILE.map((f, i) => {
        const a = molla(frame, sparsi - 6 + i * 4);
        if (frame < sparsi - 6 + i * 4) return null;
        return (
          <div key={f.nome} style={{ position: "absolute", left: f.x, top: f.y, rotate: `${f.r * a}deg`, translate: `${(1 - a) * (i % 2 ? 300 : -300)}px ${(1 - a) * -200}px`, opacity: spento }}>
            <Documento nome={f.nome} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- 3 · le schermate vere del gestionale, dalle anteprime del sito ----------
const Scheda: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0);
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <div style={{ position: "absolute", left: 70, top: 250, width: 940, height: 940, borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)",
        translate: `0 ${(1 - e) * 160}px`, opacity: Math.min(1, e * 1.4) }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
// «luce»: il modulo della festa (04) ha lo sfondo crema col bagliore bianco, e sul fondale scuro abbagliava («al secondo
// 16 sembra troppo illuminata, sa tutto con un forte bagliore»): si abbassa la luce della scheda, non si toccano i colori.
const Anteprima: React.FC<{ file: string; luce?: number }> = ({ file, luce = 1 }) => (
  <Scheda>
    <Video src={staticFile(`pb-dmr/caso/${file}.mp4`)} muted style={{ width: "100%", height: "100%", filter: luce < 1 ? `brightness(${luce})` : undefined }} />
  </Scheda>
);

// ---------- 4 · tre pagine dalla stessa festa ----------
const Righe: React.FC<{ titolo: string; righe: string[] }> = ({ titolo, righe }) => (
  <div style={{ padding: "18px 14px", display: "flex", flexDirection: "column", gap: 10, background: "#FBF7EF", height: "100%" }}>
    <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 23, color: "#8A4B0F" }}>{titolo}</div>
    {righe.map((r) => (
      <div key={r} style={{ background: "#fff", borderRadius: 10, padding: "12px 10px", fontFamily: ARCHIVO, fontWeight: 700, fontSize: 18, color: INCHIOSTRO, border: "1px solid #EFE6D6" }}>{r}</div>
    ))}
  </div>
);
const PAGINE = [
  { etichetta: "CLIENTE", titolo: "La tua festa", righe: ["Sabato 17 ottobre", "Menù adulti e bambini", "Acconto ricevuto"] },
  { etichetta: "CHI LAVORA", titolo: "Turni", righe: ["Sala · 18:00", "Brace · 18:30", "Bar · 19:00"] },
  { etichetta: "CUCINA", titolo: "Comanda", righe: ["60 × paccheri", "25 × cotoletta", "85 × dolce"] },
];
const TrePagine: React.FC<{ tempi: number[]; sincronizzato: number }> = ({ tempi, sincronizzato }) => {
  const frame = useCurrentFrame();
  const luce = interpolate(frame, [sincronizzato, sincronizzato + 8, sincronizzato + 30], [0, 1, 0.35], clamp);
  const festa = molla(frame, 0);
  const L = 300;
  const xs = [55, 390, 725];
  const topTel = 560;
  return (
    <AbsoluteFill>
      <Fondale luceY="36%" />
      <div style={{ position: "absolute", left: 240, top: 190, width: 600, borderRadius: 20, background: "#191915", border: "1px solid #2A2A24", padding: "22px 28px",
        opacity: festa, translate: `0 ${(1 - festa) * 60}px` }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 17, letterSpacing: ".22em", color: "rgba(238,235,218,.5)" }}>LA FESTA · UNA VOLTA</div>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 36, color: CREMA, marginTop: 8 }}>Battesimo di Sofia</div>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 600, fontSize: 22, color: "rgba(238,235,218,.65)", marginTop: 4 }}>Sabato 17 ottobre · 85 ospiti</div>
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {xs.map((x, i) => {
          const k = interpolate(frame, [tempi[i] - 6, tempi[i] + 8], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
          const d = `M540 ${190 + 150} C 540 ${450}, ${x + L / 2} ${430}, ${x + L / 2} ${topTel - 6}`;
          // su «tutto sincronizzato» i fili si accendono insieme
          return <path key={i} d={d} fill="none" stroke={`rgba(252,240,221,${0.7 + 0.3 * luce})`} strokeWidth={3 + 3 * luce} strokeDasharray="600" strokeDashoffset={600 * (1 - k)} style={{ filter: `drop-shadow(0 0 ${10 * luce}px rgba(252,240,221,.8))` }} />;
        })}
      </svg>
      {PAGINE.map((p, i) => {
        const e = molla(frame, tempi[i]);
        if (frame < tempi[i]) return null;
        return (
          <div key={p.etichetta} style={{ position: "absolute", left: xs[i], top: topTel, translate: `0 ${(1 - e) * 120}px`, opacity: Math.min(1, e * 1.4) }}>
            <Telefono larghezza={L}>
              <Righe titolo={p.titolo} righe={p.righe} />
            </Telefono>
            <div style={{ marginTop: 18, textAlign: "center", fontFamily: MONO, fontWeight: 700, fontSize: 19, letterSpacing: ".2em", color: CREMA }}>{p.etichetta}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- 5 · i conti: la pagina vera, ferma, con lo zoom sulle cifre ----------
// Le cifre sono quelle inventate della copia di prova, le stesse delle anteprime sul sito. Sulla scheda da 940 px la
// pagina da 1000: «incassato» sta a 480×380, «da incassare» a 650×380.
const Conti: React.FC<{ entrato: number; manca: number }> = ({ entrato, manca }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [entrato - 4, entrato + 12], [1, 1.9], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const x = interpolate(frame, [manca - 4, manca + 12], [480, 650], { ...clamp, easing: Easing.inOut(Easing.cubic) }) * 0.94;
  return (
    <Scheda>
      <Img src={staticFile("pb-dmr/conti.png")} style={{ width: "100%", height: "100%", scale: `${z}`, transformOrigin: `${x}px ${380 * 0.94}px` }} />
    </Scheda>
  );
};

// ---------- 6 · le foto vere del posto, a mazzo ----------
const FOTO = [
  { file: "sala", ruota: -2.5 },
  { file: "tavola", ruota: 2 },
  { file: "buffet", ruota: -1.5 },
  { file: "brace", ruota: 2.5 },
  { file: "giardino", ruota: -2 },
];
const Mazzo: React.FC<{ arrivi: number[] }> = ({ arrivi }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      {FOTO.map((f, i) => {
        if (frame < arrivi[i]) return null;
        const e = spring({ frame: frame - arrivi[i], fps: FPS, config: { damping: 17, stiffness: 190, mass: 0.7 } });
        const zoom = interpolate(frame, [arrivi[i], arrivi[i] + 60], [1.08, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        return (
          <div key={f.file} style={{ position: "absolute", left: 70, top: 470, width: 940, height: 627, borderRadius: 20, overflow: "hidden",
            boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)", translate: `0 ${(1 - e) * 900}px`, rotate: `${f.ruota * e}deg` }}>
            <Img src={staticFile(`pb-dmr/foto/${f.file}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${zoom}` }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const ReelDmr: React.FC = () => {
  const s = Object.fromEntries(Object.entries(T.scene).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof T.scene, ReturnType<typeof tratto>>;
  const mv = T.movimenti;
  const loc = (sec: number, scena: keyof typeof T.scene) => inFrame(sec) - s[scena].from;
  const CARTELLA = "pb-dmr/seg";
  const taglio = inFrame(mv.feste);
  const az = s.caso.durationInFrames;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* l'apertura: dall'alto sui gazebo, e su «e qui si fanno eventi privati» il giardino coi gazebo e il Vesuvio */}
      <Sequence from={0} durationInFrames={taglio}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "alto", frames: taglio }]} frames={taglio} spinta={1.06} centro={[540, 960]} />
        {ombra}
      </Sequence>
      <Sequence from={taglio} durationInFrames={s.drone.durationInFrames - taglio}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "giardino", frames: s.drone.durationInFrames - taglio }]} frames={s.drone.durationInFrames - taglio} apertura={1.08} centro={[540, 900]} />
        {ombra}
      </Sequence>
      <Sequence {...s.whatsapp}>
        <Whatsapp riscritto={loc(mv.riscritto, "whatsapp")} acconti={loc(mv.acconti, "whatsapp")} />
      </Sequence>
      <Sequence {...s.drive}>
        <Drive sparsi={loc(mv.sparsi, "drive")} drive={loc(mv.drive, "drive")} mente={loc(mv.mente, "drive")} />
      </Sequence>
      <Sequence {...s.gestionale}>
        <Anteprima file="03" />
      </Sequence>
      <Sequence {...s.festa}>
        <Anteprima file="04" luce={0.82} />
      </Sequence>
      <Sequence {...s.pagine}>
        <TrePagine tempi={[loc(mv.cliente, "pagine"), loc(mv.lavora, "pagine"), loc(mv.cucina, "pagine")]} sincronizzato={loc(mv.sincronizzato, "pagine")} />
      </Sequence>
      <Sequence {...s.conti}>
        <Conti entrato={loc(mv.entrato, "conti")} manca={loc(mv.manca, "conti")} />
      </Sequence>
      <Sequence {...s.caso}>
        <Mazzo arrivi={[0, Math.round(az * 0.2), Math.round(az * 0.4), Math.round(az * 0.6), Math.round(az * 0.8)]} />
      </Sequence>
      <Sequence {...s.finale}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "notte", frames: s.finale.durationInFrames }]} frames={s.finale.durationInFrames} spinta={1.05} centro={[540, 900]} />
        {/* la sua frase com'è, non una domanda: «Se conosci qualcuno che organizza eventi e fa ancora tutto su WhatsApp,
            mandagli questo video.» */}
        <FinaleCta passata={inFrame(T.cta.chiave) - inFrame(T.cta.da)} righe={["Se conosci qualcuno", "che organizza eventi", "e fa ancora tutto su WhatsApp,"]} chiave="mandagli questo video." />
      </Sequence>
      <Sottotitoli blocchi={T.blocchi} />
      <Audio src={staticFile("pb-dmr/voce.wav")} />
    </AbsoluteFill>
  );
};

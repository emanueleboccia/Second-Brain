import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio, Video } from "@remotion/media";
import "../pb-girarrosto/font";
import { ARCHIVO, CREMA, MONO } from "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { FinaleCta } from "../pb-girarrosto/ReelGirarrosto";
import { Sottotitoli } from "../pb-room84/Sottotitoli";
import { Telefono } from "../pb-room84/Telefono";
import { FPS, inFrame, type Blocco } from "../pb-room84/testo";
import voce from "./voce.json";

// Il reel sulla Masseria di Mezz'autunno e il suo calendario, 30/09/2026 notte, fatto come la Tenuta e Mamma Rosaria
// approvati: prima l'attività, che Emanuele voleva raccontare («così faccio anche un po' di pubblicità alla Masseria»),
// poi il calendario. Il drone del parco delle zucche del 19/10/2025, e il parcheggio pieno come prova del sold out; le
// zucche di sera di settembre, portate in SDR con avconvert; le stagioni, il biglietto e la brochure vera per le scuole
// (solo la testata: sotto c'è la foto di un bambino); il prima illustrato; le anteprime del gestionale con le scuole
// inventate. Niente bambini riconoscibili in nessuna ripresa. I tempi vengono dalla sua voce (scripts/pb-masseria-voce.py).

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const T = voce as {
  durata: number;
  scene: Record<"drone" | "stagioni" | "zucche" | "biglietti" | "soldout" | "caos" | "calendario" | "giorno" | "finale", { da: number; a: number }>;
  movimenti: Record<"stagione" | "famiglie" | "biglietto" | "brochure" | "soldout" | "excel" | "whatsapp" | "fogli" | "verde" | "arancio" | "marrone" | "bambini" | "allergia", number>;
  blocchi: Blocco[];
  cta: { da: number; chiave: number };
};
export const DURATA_MASSERIA = inFrame(T.durata);
const tratto = (s: { da: number; a: number }) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });
const ombra = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.4) 74%, rgba(0,0,0,.25) 100%)" }} />;
const molla = (frame: number, da: number) => spring({ frame: frame - da, fps: FPS, config: { damping: 17, stiffness: 180, mass: 0.7 } });
const INCHIOSTRO = "#1F1E1A";
const VERDE = "#5E8C3A";
const ARANCIO = "#E07B20";
const MARRONE = "#7A4A2A";

// ---------- le stagioni ----------
const STAGIONI = [
  { quando: "AUTUNNO", nome: "Zucche in Masseria", colore: ARANCIO },
  { quando: "INVERNO", nome: "Il Presepe di una volta", colore: "#B9C4CC" },
  { quando: "PRIMAVERA", nome: "Funny Farm", colore: VERDE },
];
const Stagioni: React.FC<{ arrivi: number[] }> = ({ arrivi }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      {STAGIONI.map((st, i) => {
        if (frame < arrivi[i]) return null;
        const e = molla(frame, arrivi[i]);
        return (
          <div key={st.nome} style={{ position: "absolute", left: 110, top: 330 + i * 290, width: 860, height: 240, borderRadius: 22, background: "#191915", border: "1px solid #2A2A24",
            padding: "34px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, translate: `${(1 - e) * 200}px 0`, opacity: Math.min(1, e * 1.4) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 16, height: 16, borderRadius: 99, background: st.colore }} />
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: ".24em", color: "rgba(238,235,218,.6)" }}>{st.quando}</div>
            </div>
            <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 56, color: CREMA }}>{st.nome}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- il biglietto per le famiglie, la brochure per le scuole ----------
const Biglietti: React.FC<{ biglietto: number; brochure: number }> = ({ biglietto, brochure }) => {
  const frame = useCurrentFrame();
  const t = molla(frame, biglietto - 4);
  const b = molla(frame, brochure - 4);
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      {frame >= biglietto - 4 ? (
        <div style={{ position: "absolute", left: 60, top: 300, translate: `0 ${(1 - t) * 160}px`, rotate: `${-3 * t}deg`, opacity: Math.min(1, t * 1.4) }}>
          <Telefono larghezza={430}>
            <div style={{ background: "#FBF4E6", height: "100%", padding: "34px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: ".2em", color: "#8A5A2A" }}>PER LE FAMIGLIE</div>
              <Img src={staticFile("pb-masseria/logo-zucche.png")} style={{ width: 300 }} />
              <div style={{ width: "100%", background: "#fff", borderRadius: 18, border: "2px dashed #E4C9A0", padding: "22px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 30, color: INCHIOSTRO }}>Biglietto</div>
                <div style={{ fontFamily: ARCHIVO, fontWeight: 600, fontSize: 22, color: "#6B5A45" }}>Ingresso al parco</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, width: 150, marginTop: 8 }}>
                  {Array.from({ length: 49 }, (_, i) => <div key={i} style={{ aspectRatio: "1", background: (i * 37 + (i >> 2) * 11) % 3 ? INCHIOSTRO : "transparent" }} />)}
                </div>
              </div>
              <div style={{ width: "100%", background: ARANCIO, borderRadius: 999, padding: "16px 0", textAlign: "center", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 22, color: "#fff" }}>Acquistato online</div>
            </div>
          </Telefono>
        </div>
      ) : null}
      {frame >= brochure - 4 ? (
        <div style={{ position: "absolute", left: 470, top: 560, width: 560, borderRadius: 18, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)",
          translate: `0 ${(1 - b) * 200}px`, rotate: `${3 * b}deg`, opacity: Math.min(1, b * 1.4) }}>
          <div style={{ background: "#191915", padding: "14px 20px", fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: ".2em", color: "rgba(238,235,218,.6)" }}>PER LE SCUOLE · BROCHURE</div>
          <Img src={staticFile("pb-masseria/brochure-testata.png")} style={{ width: "100%", display: "block" }} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------- il sold out: il parcheggio pieno, e il timbro ----------
const Timbro: React.FC<{ da: number }> = ({ da }) => {
  const frame = useCurrentFrame();
  if (frame < da) return null;
  const e = spring({ frame: frame - da, fps: FPS, config: { damping: 11, stiffness: 260, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 300 }}>
      <div style={{ border: `8px solid ${CREMA}`, borderRadius: 18, padding: "18px 40px", rotate: "-9deg", scale: `${2.2 - 1.2 * e}`, opacity: Math.min(1, e * 1.3),
        fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 110, color: CREMA, letterSpacing: ".02em", textShadow: "0 6px 30px rgba(0,0,0,.5)", boxShadow: "0 6px 30px rgba(0,0,0,.35)",
        background: "rgba(14,14,12,.25)" }}>
        SOLD OUT
      </div>
    </AbsoluteFill>
  );
};

// ---------- il prima: Excel, WhatsApp e fogli volanti ----------
const Foglio: React.FC<{ tipo: "excel" | "whatsapp" | "carta" }> = ({ tipo }) => {
  if (tipo === "excel")
    return (
      <div style={{ width: 460, background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.5)" }}>
        <div style={{ background: "#1F7244", padding: "10px 16px", fontFamily: ARCHIVO, fontWeight: 700, fontSize: 20, color: "#fff" }}>gite ottobre DEFINITIVO.xlsx</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {Array.from({ length: 24 }, (_, i) => <div key={i} style={{ height: 34, borderRight: "1px solid #E1E1E1", borderBottom: "1px solid #E1E1E1", background: i < 4 ? "#F1F5F2" : "#fff", padding: 8 }}>
            <div style={{ height: 8, width: `${40 + ((i * 29) % 50)}%`, background: i < 4 ? "#9DB8A6" : "#D9D9D9", borderRadius: 3 }} /></div>)}
        </div>
      </div>
    );
  if (tipo === "whatsapp")
    return (
      <div style={{ width: 430, background: "#DCF3D0", borderRadius: "22px 22px 6px 22px", padding: "18px 22px", boxShadow: "0 24px 60px rgba(0,0,0,.5)" }}>
        {["Buongiorno, per la festa nel parco", "di sabato siamo 30 bambini", "Ci sono ancora posti?"].map((r) => (
          <div key={r} style={{ fontFamily: ARCHIVO, fontWeight: 600, fontSize: 23, lineHeight: 1.35, color: INCHIOSTRO }}>{r}</div>
        ))}
        <div style={{ textAlign: "right", fontFamily: MONO, fontSize: 15, color: "rgba(31,30,26,.45)", marginTop: 4 }}>21:07</div>
      </div>
    );
  return (
    <div style={{ width: 380, height: 300, background: "#FFF8E7", borderRadius: 6, boxShadow: "0 24px 60px rgba(0,0,0,.5)", padding: "26px 28px",
      backgroundImage: "linear-gradient(rgba(90,120,190,.18) 1.5px, transparent 1.5px)", backgroundSize: "100% 38px" }}>
      {["serata sab 21:30", "chiamare la scuola", "80 pranzi???"].map((r, i) => (
        <div key={r} style={{ fontFamily: "Caveat, 'Marker Felt', cursive", fontSize: 36, color: "#2B2A26", marginTop: i ? 8 : 0, rotate: `${(i - 1) * 1.5}deg` }}>{r}</div>
      ))}
    </div>
  );
};
const Caos: React.FC<{ tipi: number[]; excel: number; whatsapp: number; fogli: number }> = ({ tipi, excel, whatsapp, fogli }) => {
  const frame = useCurrentFrame();
  const etichette = [
    { t: "GITE", c: VERDE },
    { t: "FESTE NEL PARCO", c: ARANCIO },
    { t: "SERATE", c: MARRONE },
  ];
  const pezzi: { tipo: "excel" | "whatsapp" | "carta"; da: number; x: number; y: number; r: number }[] = [
    { tipo: "excel", da: excel, x: 70, y: 520, r: -5 },
    { tipo: "whatsapp", da: whatsapp, x: 560, y: 640, r: 4 },
    { tipo: "carta", da: fogli, x: 140, y: 880, r: 6 },
    { tipo: "carta", da: fogli + 6, x: 620, y: 960, r: -7 },
  ];
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", gap: 18 }}>
        {etichette.map((e, i) => {
          if (frame < tipi[i]) return null;
          const k = molla(frame, tipi[i]);
          return (
            <div key={e.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderRadius: 999, background: "#191915", border: "1px solid #2A2A24",
              opacity: k, translate: `0 ${(1 - k) * 40}px` }}>
              <div style={{ width: 14, height: 14, borderRadius: 99, background: e.c }} />
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: ".18em", color: CREMA }}>{e.t}</div>
            </div>
          );
        })}
      </div>
      {pezzi.map((p, i) => {
        if (frame < p.da - 4) return null;
        const k = molla(frame, p.da - 4);
        return (
          <div key={i} style={{ position: "absolute", left: p.x, top: p.y, rotate: `${p.r * k}deg`, translate: `${(1 - k) * (i % 2 ? 260 : -260)}px ${(1 - k) * -160}px`, opacity: Math.min(1, k * 1.4) }}>
            <Foglio tipo={p.tipo} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- le schermate vere del gestionale ----------
const Scheda: React.FC<{ children: React.ReactNode; alto?: number }> = ({ children, alto = 250 }) => {
  const frame = useCurrentFrame();
  const e = molla(frame, 0);
  return (
    <div style={{ position: "absolute", left: 70, top: alto, width: 940, height: 940, borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)",
      translate: `0 ${(1 - e) * 160}px`, opacity: Math.min(1, e * 1.4) }}>
      {children}
    </div>
  );
};
const Calendario: React.FC<{ colori: number[] }> = ({ colori }) => {
  const frame = useCurrentFrame();
  const voci = [
    { t: "Gite", c: VERDE },
    { t: "Feste", c: ARANCIO },
    { t: "Serate", c: MARRONE },
  ];
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <Scheda alto={180}>
        {/* l'anteprima dura 5,9 secondi e la scena quasi 7: rallentata, finisce insieme alla scena */}
        <Video src={staticFile("pb-masseria/calendario.mp4")} muted playbackRate={0.85} style={{ width: "100%", height: "100%", filter: "brightness(0.92)" }} />
      </Scheda>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1160, display: "flex", justifyContent: "center", gap: 22 }}>
        {voci.map((v, i) => {
          const k = interpolate(frame, [colori[i] - 2, colori[i] + 8], [0, 1], clamp);
          return (
            <div key={v.t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 30px", borderRadius: 999, background: k > 0.5 ? v.c : "#191915",
              border: `2px solid ${v.c}`, opacity: 0.35 + 0.65 * k, scale: `${1 + 0.08 * k * interpolate(frame, [colori[i], colori[i] + 12], [1, 0], clamp)}` }}>
              <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 32, color: k > 0.5 ? "#fff" : CREMA }}>{v.t}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
// La vista del giorno, ferma: «61 bambini a pranzo» sta a 586×414 della pagina da 1000, le allergie a 330×471.
const Giorno: React.FC<{ bambini: number; allergia: number; fine: number }> = ({ bambini, allergia, fine }) => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [bambini - 4, bambini + 12, fine - 10, fine + 4], [1, 1.8, 1.8, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const x = interpolate(frame, [allergia - 4, allergia + 12], [586, 330], { ...clamp, easing: Easing.inOut(Easing.cubic) }) * 0.94;
  const y = interpolate(frame, [allergia - 4, allergia + 12], [414, 471], { ...clamp, easing: Easing.inOut(Easing.cubic) }) * 0.94;
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <Scheda>
        <Img src={staticFile("pb-masseria/giorno.png")} style={{ width: "100%", height: "100%", scale: `${z}`, transformOrigin: `${x}px ${y}px`, filter: "brightness(0.94)" }} />
      </Scheda>
    </AbsoluteFill>
  );
};

export const ReelMasseria: React.FC = () => {
  const s = Object.fromEntries(Object.entries(T.scene).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof T.scene, ReturnType<typeof tratto>>;
  const mv = T.movimenti;
  const loc = (sec: number, scena: keyof typeof T.scene) => inFrame(sec) - s[scena].from;
  const CARTELLA = "pb-masseria/seg";
  const bc = T.blocchi.filter((b) => b.da >= T.scene.caos.da && b.da < T.scene.caos.a).map((b) => inFrame(b.da) - s.caos.from);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence {...s.drone}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "apertura", frames: s.drone.durationInFrames }]} frames={s.drone.durationInFrames} spinta={1.05} centro={[540, 900]} />
        {ombra}
      </Sequence>
      <Sequence {...s.stagioni}>
        <Stagioni arrivi={[loc(mv.famiglie, "stagioni"), loc(mv.stagione, "stagioni"), loc(mv.stagione, "stagioni") + 10]} />
      </Sequence>
      <Sequence {...s.zucche}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "zucche", frames: s.zucche.durationInFrames }]} frames={s.zucche.durationInFrames} apertura={1.08} centro={[540, 900]} />
        {ombra}
      </Sequence>
      <Sequence {...s.biglietti}>
        <Biglietti biglietto={loc(mv.biglietto, "biglietti")} brochure={loc(mv.brochure, "biglietti")} />
      </Sequence>
      <Sequence {...s.soldout}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "parcheggio", frames: s.soldout.durationInFrames }]} frames={s.soldout.durationInFrames} spinta={1.05} centro={[540, 960]} />
        {ombra}
        <Timbro da={loc(mv.soldout, "soldout") + 4} />
      </Sequence>
      <Sequence {...s.caos}>
        <Caos tipi={[bc[0], bc[0] + 18, bc[1]]} excel={loc(mv.excel, "caos")} whatsapp={loc(mv.whatsapp, "caos")} fogli={loc(mv.fogli, "caos")} />
      </Sequence>
      <Sequence {...s.calendario}>
        <Calendario colori={[loc(mv.verde, "calendario"), loc(mv.arancio, "calendario"), loc(mv.marrone, "calendario")]} />
      </Sequence>
      <Sequence {...s.giorno}>
        <Giorno bambini={loc(mv.bambini, "giorno")} allergia={loc(mv.allergia, "giorno")} fine={loc(T.blocchi.find((b) => b.testo === "in un solo posto.")!.da, "giorno")} />
      </Sequence>
      <Sequence {...s.finale}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "finale", frames: s.finale.durationInFrames }]} frames={s.finale.durationInFrames} spinta={1.04} centro={[540, 900]} />
        <FinaleCta passata={inFrame(T.cta.chiave) - inFrame(T.cta.da)} righe={["Conosci una maestra o una", "famiglia con dei bambini?"]} chiave="Mandagli questo video" dopo="e fagli scoprire Zucche in Masseria." />
      </Sequence>
      <Sottotitoli blocchi={T.blocchi} />
      <Audio src={staticFile("pb-masseria/voce.wav")} />
    </AbsoluteFill>
  );
};

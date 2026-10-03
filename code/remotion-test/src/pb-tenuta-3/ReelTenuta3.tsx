import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { ARCHIVO, CREMA, INTERMEDIO, MONO } from "../pb-girarrosto/font";
import { Fondale } from "../pb-girarrosto6/Scene";
import { Clip } from "../pb-room84-5/Illustrazioni";
import { Telefono, misure } from "../pb-room84/Telefono";
import { Finestra } from "../pb-room84/Finestra";
import { FinaleCta, Sottotitoli, TitoloGrande } from "./Testi";
import { CTA, FPS, locali, scena, type TipoScena } from "./testo";

// La v3 del reel del sito di Tenuta Don Gaetano (03/10/2026), sullo stampo del Girarrosto v7 e nella scala scura: la
// Tenuta è nero e oro. Il copione l'ha voluto Emanuele senza la famiglia, senza il drone e senza i tempi di lavoro, e col
// perché del sito di una pagina: una location nuova deve farsi vedere. Le riprese sono il drone del 18/09 e le foto delle
// sale della v2 (`public/pb-tenuta/`); il sito è quello vivo, fotografato il 03/10 da `scripts/pb-tenuta3-cattura.cjs`,
// da telefono e da computer. ⚠️ Il telefono non passa mai sulle feste, dove c'è la foto di un bambino, né sui
// musicisti con gli invitati: fra una sezione e l'altra salta, non scorre.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);
const ORO = "#C9A86A";
const ID: TipoScena[] = ["apertura", "location", "conoscere", "sito", "whatsapp", "semplice"];

// ---------- le foto delle sale, un mazzo che arriva sulle parole ----------
const FOTO = [
  { file: "DSC00751", ruota: -2.5 },
  { file: "DSC00739", ruota: 2 },
  { file: "DSC00708", ruota: -1.5 }, // la corona d'alloro, su «lauree»
  { file: "DSC00742", ruota: 2.5 },
  { file: "DSC00780", ruota: -2 },
];
export const Mazzo: React.FC<{ arrivi: number[] }> = ({ arrivi }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      {FOTO.map((f, i) => {
        if (frame < arrivi[i]) return null;
        const e = spring({ frame: frame - arrivi[i], fps: FPS, config: { damping: 17, stiffness: 190, mass: 0.7 } });
        const zoom = interpolate(frame, [arrivi[i], arrivi[i] + 60], [1.08, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        return (
          <div key={f.file} style={{ position: "absolute", left: 50, top: 330, width: 980, height: 760, borderRadius: 22, overflow: "hidden",
            boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)", translate: `0 ${(1 - e) * 1000}px`, rotate: `${f.ruota * e}deg` }}>
            <Img src={staticFile(`pb-tenuta/foto/${f.file}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${zoom}` }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- il sito nel telefono ----------
// La pagina intera, fotografata a 3x su 390 punti. `y` è il punto della pagina in alto nello schermo; i salti fra una
// sezione e l'altra sono un taglio veloce, mai uno scorrimento che passa sulle feste.
export const PaginaTelefono: React.FC<{ larghezza: number; y: number }> = ({ larghezza, y }) => {
  const m = misure(larghezza);
  const k = m.schermo / 390;
  return (
    <div style={{ position: "relative", width: m.schermo, translate: `0 ${-y * k}px` }}>
      <Img src={staticFile("pb-tenuta-3/sito-m.jpg")} style={{ width: m.schermo, display: "block" }} />
    </div>
  );
};

// La posizione della pagina col tempo: [frame, punto] dove si arriva scorrendo, oppure con `salta` di colpo.
type Tappa = [number, number, boolean?];
const posizione = (frame: number, tappe: Tappa[]) => {
  let y = tappe[0][1];
  let lampo = 0;
  for (let i = 1; i < tappe.length; i++) {
    const [f0, y0] = tappe[i - 1];
    const [f1, y1, salta] = tappe[i];
    if (salta) {
      if (frame >= f1) y = y1;
      lampo = Math.max(lampo, interpolate(frame, [f1 - 3, f1, f1 + 4], [0, 1, 0], clamp));
    } else if (frame >= f0) y = interpolate(frame, [f0, f1], [y0, y1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  }
  return { y, lampo };
};

// ---------- 1 · dal logo al sito ----------
// «Così le ho creato il logo»: la villa a linee d'oro si disegna grande; «e un sito»: si stringe e vola nella testata del
// telefono, che sale da sotto con la prima schermata vera del sito.
const LT = 520;
const MT = misure(LT);
const SX = (1080 - LT) / 2, SY = 150;
export const LogoNelSito: React.FC<{ logo: number; sito: number }> = ({ logo, sito }) => {
  const frame = useCurrentFrame();
  // il logo ha poco più di un secondo prima di «e un sito»: si disegna in due terzi di quel tempo
  const fine = Math.max(logo + 12, Math.min(logo + 28, sito - 8));
  const disegna = interpolate(frame, [logo + 2, fine], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const vola = interpolate(frame, [sito, sito + 16], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const tel = spring({ frame: frame - sito + 4, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  // il logo grande al centro, poi piccolo dove sta nella testata del sito (in alto a sinistra, 150 punti di larghezza)
  const kk = MT.schermo / 390;
  const x0 = 540 - 390, y0 = 560, w0 = 780;
  const x1 = SX + MT.bordo + 14 * kk, y1 = SY + MT.bordo + MT.barra + 6 * kk, w1 = 120 * kk;
  const x = x0 + (x1 - x0) * vola, yy = y0 + (y1 - y0) * vola, w = w0 + (w1 - w0) * vola;
  const luce = interpolate(frame, [fine, fine + 4, Math.max(fine + 5, sito)], [0, 1, 0.5], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <div style={{ position: "absolute", left: SX, top: SY, opacity: Math.min(1, tel * 1.4), translate: `0 ${(1 - tel) * 900}px` }}>
        <Telefono larghezza={LT}>
          <Img src={staticFile("pb-tenuta-3/sito-m-apertura.png")} style={{ width: MT.schermo, display: "block" }} />
        </Telefono>
      </div>
      <Img src={staticFile("pb-tenuta/logo-linee.png")} style={{ position: "absolute", left: x, top: yy, width: w, opacity: 1 - interpolate(vola, [0.85, 1], [0, 1], clamp),
        clipPath: `inset(-5% ${(1 - disegna) * 100}% -5% -5%)`, filter: `drop-shadow(0 0 ${18 * luce}px rgba(218,199,171,${0.5 * luce}))` }} />
    </AbsoluteFill>
  );
};

// ---------- 2 · una pagina sola ----------
// A sinistra il telefono col sito; a destra la pagina disegnata come un foglio solo, con le sue sezioni una sotto
// l'altra: è il «sito di una pagina». Una cornice d'oro sul foglio dice dove si trova il telefono.
const SEZIONI: [string, number, number][] = [
  ["Apertura", 0, 844], ["La dimora", 844, 2048], ["Gli eventi", 2048, 4237], ["La galleria", 4237, 6893], ["Perché noi", 6893, 9089], ["Contatti", 9089, 11272],
];
const PAGINA = 11272;
export const UnaPagina: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const L = 480;
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150 } });
  const foglio = spring({ frame: frame - 4, fps: FPS, config: { damping: 16, stiffness: 150 } });
  const tappe: Tappa[] = [[0, 0], [b[2], 0], [b[3] - 2, 420], [b[3] + 12, 860, true], [b[4], 4300, true], [b[5], 1960, true], [9999, 1960]];
  const { y, lampo } = posizione(frame, tappe);
  // il foglio della pagina: alto 1040, ogni sezione in proporzione
  const FH = 1040, FY = 230, FX = 620, FW = 380;
  const k = FH / PAGINA;
  const vista = 844 * k;
  const tutto = interpolate(frame, [b[1], b[1] + 10, b[2], b[2] + 8], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      {/* il telefono arriva da dove l'ha lasciato la scena prima (al centro, largo 520): niente stacco nel nero */}
      <div style={{ position: "absolute", left: 70 + (1 - e) * 210, top: 200 - (1 - e) * 50, scale: `${1 + (1 - e) * 0.083}`, transformOrigin: "0 0", rotate: `${-2 * e}deg` }}>
        <Telefono larghezza={L}>
          <PaginaTelefono larghezza={L} y={y} />
          <div style={{ position: "absolute", inset: 0, background: "#0E0E0C", opacity: lampo * 0.85 }} />
        </Telefono>
      </div>
      <div style={{ position: "absolute", left: FX, top: FY, width: FW, height: FH, opacity: foglio, translate: `${(1 - foglio) * 160}px 0`,
        background: "#1A1916", borderRadius: 18, boxShadow: `0 30px 70px rgba(0,0,0,.55), 0 0 0 ${2 + 4 * tutto}px rgba(201,168,106,${0.25 + 0.6 * tutto})` }}>
        {SEZIONI.map(([nome, a, z], i) => {
          const p = spring({ frame: frame - 8 - i * 4, fps: FPS, config: { damping: 15, stiffness: 190 } });
          const dentro = y + 422 >= a && y + 422 < z;
          return (
            <div key={nome} style={{ position: "absolute", left: 16, right: 16, top: a * k + 6, height: (z - a) * k - 10, borderRadius: 10,
              background: dentro ? "rgba(201,168,106,.22)" : "rgba(238,235,218,.07)", border: `1.5px solid ${dentro ? ORO : "rgba(238,235,218,.14)"}`,
              opacity: p, display: "flex", alignItems: "center", padding: "0 18px" }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: ".14em", color: dentro ? CREMA : INTERMEDIO, textTransform: "uppercase" }}>{nome}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 6, right: 6, top: y * k, height: vista, border: `4px solid ${ORO}`, borderRadius: 12, opacity: interpolate(frame, [b[2] - 4, b[2] + 6], [0, 1], clamp),
          boxShadow: "0 0 30px rgba(201,168,106,.45)" }} />
      </div>
      <div style={{ position: "absolute", left: FX, top: FY - 70, width: FW, textAlign: "center", opacity: foglio }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: ".24em", color: ORO }}>1 PAGINA</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3 · WhatsApp ----------
// Il telefono grande sui contatti del sito vero; su «chiedi la data su WhatsApp» stringe sul bottone, su «un semplice
// tocco» lo tocca, e si apre la chat col messaggio che il sito prepara (tema della Tenuta, CONFIG.whatsappText).
const MESSAGGIO = "Buongiorno, vorrei informazioni per organizzare un evento alla Tenuta Don Gaetano e richiedere un sopralluogo.";
const BOTTONE = { x: 194, y: 9498 }; // il centro di «Scrivici su WhatsApp», in punti della pagina
export const WhatsApp: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const L = 500;
  const m = misure(L);
  const k = m.schermo / 390;
  const Y = 9200;
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150 } });
  const zoom = interpolate(frame, [b[1] - 2, b[1] + 12], [0, 1], { ...clamp, easing: uscita });
  const tocco = b[2] + 2;
  const t = interpolate(frame, [tocco - 5, tocco, tocco + 14], [0, 1, 0], clamp);
  const onda = interpolate(frame, [tocco, tocco + 14], [0, 1], clamp);
  const chat = interpolate(frame, [tocco + 8, tocco + 18], [0, 1], { ...clamp, easing: uscita });
  const lettere = Math.floor(interpolate(frame, [tocco + 14, tocco + 44], [0, MESSAGGIO.length], clamp));
  const SX2 = (1080 - L) / 2, SY2 = 90;
  const bx = SX2 + m.bordo + BOTTONE.x * k, by = SY2 + m.bordo + m.barra + (BOTTONE.y - Y) * k;
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <AbsoluteFill style={{ scale: `${1 + zoom * 0.28 * (1 - chat)}`, transformOrigin: `${bx}px ${by}px` }}>
        <div style={{ position: "absolute", left: SX2 - (1 - e) * 220, top: SY2 + (1 - e) * 110, scale: `${0.96 + 0.04 * e}`, transformOrigin: "0 0" }}>
          <Telefono larghezza={L}>
            <div style={{ position: "relative", height: m.altezza - m.barra }}>
              <div style={{ position: "absolute", inset: 0, opacity: 1 - chat }}><PaginaTelefono larghezza={L} y={Y} /></div>
              <div style={{ position: "absolute", inset: 0, opacity: chat, background: "#ECE5DD", translate: `${(1 - chat) * 60}px 0` }}>
                <div style={{ height: 96, background: "#075E54", display: "flex", alignItems: "center", gap: 16, padding: "0 22px" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 26, background: "#1A1916", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Img src={staticFile("pb-tenuta/logo-linee.png")} style={{ width: 46 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, color: "#fff" }}>Tenuta Don Gaetano</div>
                    <div style={{ fontFamily: ARCHIVO, fontSize: 18, color: "rgba(255,255,255,.75)" }}>online</div>
                  </div>
                </div>
                <div style={{ position: "absolute", left: 18, right: 18, top: 150, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
                  <span style={{ alignSelf: "center", background: "#E1F2FB", color: "#555", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 18, padding: "6px 14px", borderRadius: 8 }}>OGGI</span>
                  <div style={{ maxWidth: "92%", background: "#DCF8C6", borderRadius: "22px 4px 22px 22px", padding: "22px 24px", boxShadow: "0 2px 4px rgba(0,0,0,.14)",
                    fontFamily: ARCHIVO, fontWeight: 500, fontSize: 32, lineHeight: 1.32, color: "#111", minHeight: 80 }}>{MESSAGGIO.slice(0, lettere) || " "}</div>
                </div>
                <div style={{ position: "absolute", left: 14, right: 14, bottom: 22, height: 70, borderRadius: 35, background: "#fff", display: "flex", alignItems: "center", padding: "0 26px",
                  fontFamily: ARCHIVO, fontSize: 22, color: "#9A9A9A" }}>Messaggio già scritto: basta inviarlo</div>
              </div>
            </div>
          </Telefono>
        </div>
        {frame >= tocco - 5 && frame <= tocco + 16 ? (
          <>
            <div style={{ position: "absolute", left: bx - 40, top: by - 40, width: 80, height: 80, borderRadius: 40, background: "rgba(14,14,12,.28)", border: "3px solid rgba(255,255,255,.9)", opacity: t }} />
            <div style={{ position: "absolute", left: bx - 40, top: by - 40, width: 80, height: 80, borderRadius: 40, border: `4px solid ${ORO}`, scale: `${1 + onda * 1.8}`, opacity: frame >= tocco ? 1 - onda : 0 }} />
          </>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 4 · semplice e funzionale: computer e telefono ----------
export const Coppia: React.FC = () => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 16, stiffness: 150 } });
  const LTel = 320;
  const mt = misure(LTel);
  const yD = interpolate(frame, [8, 80], [0, 520], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Fondale luceY="58%" />
      <div style={{ position: "absolute", left: 40, top: 640, opacity: Math.min(1, e * 1.4), translate: `0 ${(1 - e) * 120}px` }}>
        <Finestra larghezza={1000} indirizzo="tenutadongaetano.it">
          <div style={{ translate: `0 ${-yD * (1000 / 1440)}px` }}>
            <Img src={staticFile("pb-tenuta-3/sito-d.jpg")} style={{ width: 1000, display: "block" }} />
          </div>
        </Finestra>
      </div>
      <div style={{ position: "absolute", left: 1080 - 50 - LTel, top: 1290 - mt.totale + 160, opacity: Math.min(1, e * 1.4), translate: `0 ${(1 - e) * 180}px` }}>
        <Telefono larghezza={LTel}>
          <Img src={staticFile("pb-tenuta-3/sito-m-apertura.png")} style={{ width: mt.schermo, display: "block" }} />
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

export const ReelTenuta3: React.FC = () => {
  const S = Object.fromEntries(ID.map((k) => [k, scena(k)])) as Record<TipoScena, ReturnType<typeof scena>>;
  const L = Object.fromEntries(ID.map((k) => [k, locali(k)])) as Record<TipoScena, number[]>;
  const seq = (k: TipoScena, el: React.ReactNode) => <Sequence from={S[k].inizio} durationInFrames={S[k].frames}>{el}</Sequence>;
  const ap = S.apertura, co = S.conoscere, se = S.semplice;
  const taglio = L.apertura[2]; // «una dimora del '700»: dal giardino dall'alto alla facciata fra i pini
  const bl = L.location;
  const arrivi = [0, bl[1], bl[2] + 12, bl[3], bl[3] + 18];
  const logo = L.conoscere[2]; // «Così le ho creato il logo»
  const nascosti: [number, number][] = [[se.inizio, se.inizio + se.frames]];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {seq("apertura", <>
        <Sequence durationInFrames={taglio}><Clip file="pb-tenuta/seg/drone-alto.mp4" zoom={[1.0, 1.06]} frames={taglio} /></Sequence>
        <Sequence from={taglio} durationInFrames={ap.frames - taglio}><Clip file="pb-tenuta-3/seg/drone-pini.mp4" zoom={[1.08, 1.0]} frames={ap.frames - taglio} /></Sequence>
        <TitoloGrande riga="Una location nuova" chiave="da far conoscere" da={3} corpo={84} alto={230} />
      </>)}
      {seq("location", <Mazzo arrivi={arrivi} />)}
      {seq("conoscere", <>
        <Sequence durationInFrames={logo}><Clip file="pb-tenuta/seg/drone2.mp4" zoom={[1.0, 1.08]} frames={logo} /></Sequence>
        <Sequence from={logo} durationInFrames={co.frames - logo}><LogoNelSito logo={0} sito={L.conoscere[3] - logo} /></Sequence>
      </>)}
      {seq("sito", <UnaPagina b={L.sito} />)}
      {seq("whatsapp", <WhatsApp b={L.whatsapp} />)}
      <Sequence from={se.inizio} durationInFrames={CTA.da - se.inizio}>
        <Coppia />
        <TitoloGrande riga="Semplice" chiave="e funzionale" da={2} corpo={150} alto={250} />
      </Sequence>
      <Sequence from={CTA.da} durationInFrames={se.inizio + se.frames - CTA.da}>
        <Clip file="pb-tenuta/seg/finale.mp4" zoom={[1.0, 1.06]} frames={se.inizio + se.frames - CTA.da} />
        <FinaleCta passata={CTA.chiave - CTA.da} righe={["Se conosci qualcuno", "che sta prendendo", "una location per eventi,"]} chiave="mandagli questo video" />
      </Sequence>
      <Sottotitoli chiaro={[]} nascosti={nascosti} />
      <Audio src={staticFile("pb-tenuta-3/voce.wav")} />
    </AbsoluteFill>
  );
};

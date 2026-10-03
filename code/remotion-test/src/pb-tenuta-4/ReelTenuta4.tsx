import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { ARCHIVO, CREMA, INTERMEDIO, MONO } from "../pb-girarrosto/font";
import { Fondale } from "../pb-girarrosto6/Scene";
import { Clip } from "../pb-room84-5/Illustrazioni";
import { Telefono, misure } from "../pb-room84/Telefono";
import { Finestra } from "../pb-room84/Finestra";
import { Mazzo, PaginaTelefono } from "../pb-tenuta-3/ReelTenuta3";
import { FinaleCta, Sottotitoli, TitoloGrande } from "./Testi";
import { CTA, FPS, locali, scena, type TipoScena } from "./testo";

// La v4 del reel del sito di Tenuta Don Gaetano (03/10/2026), sulla voce nuova di Emanuele e sullo stesso montaggio della
// v3: nero e oro, il drone del 18/09, le foto delle sale, il sito vivo da telefono e da computer. Cambia il racconto del
// sito, come l'ha voluto lui: «un sito vetrina della struttura, un sito one page», il menù che porta dritto alle sezioni,
// la galleria come «la parte più importante», il sito che si vede bene ovunque, e il messaggio WhatsApp che si compila
// da solo per chiedere un sopralluogo. ⚠️ Il telefono salta fra le sezioni e non scorre sopra le feste: lì ci sono la foto
// di un bambino e i musicisti con gli invitati.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);
const ORO = "#D8BD87";
const MARRONE = "#1A1613";
const ID: TipoScena[] = ["apertura", "location", "identita", "sito", "menu", "ovunque", "whatsapp", "semplice"];

// ---------- 1 · l'identità: il logo, lo stile, nero e oro ----------
// «le ho dato un'identità»: la villa a linee d'oro si disegna; «il logo e lo stile»: sale, e sotto compare il nome nel
// carattere del brand; «nero e oro»: i due colori, grandi, coi loro codici (areas/tenuta-don-gaetano/reference/design.md).
export const LOGO_FINE = { x: 540 - 280, y: 230, w: 560 };
export const Identita: React.FC<{ b: number[]; da: number }> = ({ b, da }) => {
  const frame = useCurrentFrame() + da;
  const disegna = interpolate(frame, [b[2] + 2, b[2] + 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const sale = interpolate(frame, [b[3] - 4, b[3] + 12], [0, 1], { ...clamp, easing: uscita });
  const nome = spring({ frame: frame - b[3] - 4, fps: FPS, config: { damping: 16, stiffness: 170 } });
  const colori = [spring({ frame: frame - b[4], fps: FPS, config: { damping: 14, stiffness: 190 } }), spring({ frame: frame - b[4] - 6, fps: FPS, config: { damping: 14, stiffness: 190 } })];
  const w = 780 + (LOGO_FINE.w - 780) * sale, x = 540 - w / 2, y = 560 + (LOGO_FINE.y - 560) * sale;
  return (
    <AbsoluteFill>
      <Fondale luceY="36%" />
      <Img src={staticFile("pb-tenuta/logo-linee.png")} style={{ position: "absolute", left: x, top: y, width: w, clipPath: `inset(-5% ${(1 - disegna) * 100}% -5% -5%)`,
        filter: `drop-shadow(0 0 ${14 * sale}px rgba(216,189,135,${0.4 * sale}))` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 560, textAlign: "center", opacity: nome, translate: `0 ${(1 - nome) * 30}px` }}>
        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 64, letterSpacing: ".18em", color: ORO, textTransform: "uppercase" }}>Tenuta Don Gaetano</div>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: ".3em", color: INTERMEDIO, marginTop: 12 }}>DIMORA STORICA · POGGIOMARINO</div>
      </div>
      {[[MARRONE, "NERO", "#1A1613"], [ORO, "ORO", "#D8BD87"]].map(([c, n, hex], i) => (
        <div key={n} style={{ position: "absolute", left: 140 + i * 420, top: 760, width: 380, height: 380, borderRadius: 30, background: c,
          border: i === 0 ? "2px solid rgba(216,189,135,.45)" : "none", boxShadow: "0 30px 70px rgba(0,0,0,.5)", opacity: colori[i], scale: `${0.7 + 0.3 * colori[i]}`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 30 }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 54, color: i === 0 ? ORO : MARRONE }}>{n}</div>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 24, letterSpacing: ".12em", color: i === 0 ? INTERMEDIO : MARRONE, opacity: 0.8 }}>{hex}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------- 2 · il sito vetrina, one page, e il menù ----------
// Una scena sola dalla frase del sito a quella delle sezioni, perché il telefono resta in mano. `bs` sono i blocchi della
// frase del sito, `bm` quelli del menù spostati della durata della frase del sito.
const SEZIONI: [string, number, number][] = [
  ["Apertura", 0, 844], ["La dimora", 844, 2048], ["Gli eventi", 2048, 4237], ["La galleria", 4237, 6893], ["Perché noi", 6893, 9089], ["Contatti", 9089, 11272],
];
const PAGINA = 11272;
const MENU_DIMORA = { x: 160, y: 334 }; // la voce «La Dimora» nel menù aperto, in punti dello schermo
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
export const SitoOnePage: React.FC<{ bs: number[]; bm: number[] }> = ({ bs, bm }) => {
  const frame = useCurrentFrame();
  const LT = 520;
  const MT = misure(LT);
  const k = MT.schermo / 390;
  // il logo arriva da dove l'ha lasciato l'identità e si posa nella testata del sito
  const vola = interpolate(frame, [0, 16], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const tel = spring({ frame: frame + 2, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  // il telefono si sposta a sinistra quando arriva il foglio della pagina, su «un sito one page»
  const lato = interpolate(frame, [bs[3] - 4, bs[3] + 12], [0, 1], { ...clamp, easing: uscita });
  const TX = (1080 - LT) / 2 - lato * 210, TY = 150 + lato * 40, TS = 1 - lato * 0.077;
  const x1 = TX + (MT.bordo + 14 * k) * TS, y1 = TY + (MT.bordo + MT.barra + 6 * k) * TS, w1 = 120 * k * TS;
  const lx = LOGO_FINE.x + (x1 - LOGO_FINE.x) * vola, ly = LOGO_FINE.y + (y1 - LOGO_FINE.y) * vola, lw = LOGO_FINE.w + (w1 - LOGO_FINE.w) * vola;
  // il menù: si apre su «Dal menù tocchi una voce», si tocca «La Dimora» su «e vai dritto alla sezione»
  const apre = interpolate(frame, [bm[0] + 4, bm[0] + 14], [0, 1], { ...clamp, easing: uscita });
  const toccoMenu = bm[1] + 2;
  const chiude = interpolate(frame, [toccoMenu + 6, toccoMenu + 14], [0, 1], { ...clamp, easing: uscita });
  const menu = apre * (1 - chiude);
  const t = interpolate(frame, [toccoMenu - 5, toccoMenu, toccoMenu + 14], [0, 1, 0], clamp);
  const onda = interpolate(frame, [toccoMenu, toccoMenu + 14], [0, 1], clamp);
  const tappe: Tappa[] = [[0, 0], [bs[1], 0], [bs[3], 700], [toccoMenu + 10, 700], [toccoMenu + 12, 844, true], [bm[3], 1960, true], [bm[4], 4300, true], [bm[5] + 40, 4820], [9999, 4820]];
  const { y, lampo } = posizione(frame, tappe);
  const vetrina = spring({ frame: frame - bs[1], fps: FPS, config: { damping: 14, stiffness: 180 } }) * (1 - lato);
  // il foglio della pagina
  const foglio = spring({ frame: frame - bs[3], fps: FPS, config: { damping: 16, stiffness: 150 } });
  const FH = 1040, FY = 230, FX = 620, FW = 380;
  const kf = FH / PAGINA;
  const importante = interpolate(frame, [bm[5], bm[5] + 10], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: TX, top: TY, scale: `${TS}`, transformOrigin: "0 0", rotate: `${-2 * lato}deg`, opacity: Math.min(1, tel * 1.4), translate: `0 ${(1 - tel) * 900}px` }}>
        <Telefono larghezza={LT}>
          <PaginaTelefono larghezza={LT} y={y} />
          <div style={{ position: "absolute", inset: 0, background: "#0E0E0C", opacity: lampo * 0.85 }} />
          <div style={{ position: "absolute", inset: 0, opacity: menu, translate: `${(1 - apre) * 60}px 0` }}>
            <Img src={staticFile("pb-tenuta-3/menu-aperto.png")} style={{ width: MT.schermo, display: "block" }} />
          </div>
          {frame >= toccoMenu - 5 && frame <= toccoMenu + 16 ? (
            <>
              <div style={{ position: "absolute", left: MENU_DIMORA.x * k - 36, top: MENU_DIMORA.y * k - 36, width: 72, height: 72, borderRadius: 36, background: "rgba(255,255,255,.18)", border: "3px solid rgba(255,255,255,.9)", opacity: t }} />
              <div style={{ position: "absolute", left: MENU_DIMORA.x * k - 36, top: MENU_DIMORA.y * k - 36, width: 72, height: 72, borderRadius: 36, border: `4px solid ${ORO}`, scale: `${1 + onda * 1.8}`, opacity: frame >= toccoMenu ? 1 - onda : 0 }} />
            </>
          ) : null}
        </Telefono>
      </div>
      {/* il logo che vola nella testata */}
      <Img src={staticFile("pb-tenuta/logo-linee.png")} style={{ position: "absolute", left: lx, top: ly, width: lw, opacity: 1 - interpolate(vola, [0.85, 1], [0, 1], clamp) }} />
      {/* «un sito vetrina»: l'etichetta accanto al telefono */}
      <div style={{ position: "absolute", right: 46, top: 330, rotate: "5deg", opacity: vetrina, scale: `${0.7 + 0.3 * vetrina}` }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 38, letterSpacing: ".18em", background: ORO, color: MARRONE, padding: "20px 32px", borderRadius: 999,
          boxShadow: "0 20px 50px rgba(0,0,0,.5)" }}>VETRINA</span>
      </div>
      {/* «un sito one page»: la pagina come un foglio solo, con le sezioni e la cornice d'oro dove sta il telefono */}
      <div style={{ position: "absolute", left: FX, top: FY, width: FW, height: FH, opacity: foglio, translate: `${(1 - foglio) * 160}px 0`, background: "#1A1916", borderRadius: 18,
        boxShadow: "0 30px 70px rgba(0,0,0,.55), 0 0 0 2px rgba(216,189,135,.3)" }}>
        {SEZIONI.map(([nome, a, z], i) => {
          const p = spring({ frame: frame - bs[3] - 6 - i * 4, fps: FPS, config: { damping: 15, stiffness: 190 } });
          const dentro = y + 422 >= a && y + 422 < z && frame > bs[3] + 20;
          const galleria = nome === "La galleria" ? importante : 0;
          return (
            <div key={nome} style={{ position: "absolute", left: 16, right: 16, top: a * kf + 6, height: (z - a) * kf - 10, borderRadius: 10,
              background: galleria > 0 ? `rgba(216,189,135,${0.22 + 0.5 * galleria})` : dentro ? "rgba(216,189,135,.22)" : "rgba(238,235,218,.07)", border: `1.5px solid ${dentro ? ORO : "rgba(238,235,218,.14)"}`,
              boxShadow: `0 0 ${70 * galleria}px rgba(216,189,135,${0.85 * galleria})`, scale: `${1 + 0.05 * galleria}`, opacity: p, display: "flex", alignItems: "flex-start", padding: "14px 18px 0" }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: ".14em", color: galleria > 0.5 ? MARRONE : dentro ? CREMA : INTERMEDIO, textTransform: "uppercase" }}>{nome}</span>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 6, right: 6, top: y * kf, height: 844 * kf, border: `4px solid ${ORO}`, borderRadius: 12, opacity: interpolate(frame, [bs[3] + 16, bs[3] + 26], [0, 1], clamp),
          boxShadow: "0 0 30px rgba(216,189,135,.45)" }} />
      </div>
      <div style={{ position: "absolute", left: FX, top: FY - 70, width: FW, textAlign: "center", opacity: foglio }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: ".24em", color: ORO }}>ONE PAGE</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3 · ovunque: il telefono, poi il computer ----------
// «E si vede bene ovunque»: arrivano tutti e due; «sul telefono»: si accende il telefono e la pagina scorre;
// «come sul computer»: si accende il computer e scorre lui. Sotto restano liberi i sottotitoli.
export const Ovunque: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const LTel = 400;
  const mt = misure(LTel);
  const LF = 1100;
  const win = spring({ frame, fps: FPS, config: { damping: 17, stiffness: 150 } });
  const tel = spring({ frame: frame - 6, fps: FPS, config: { damping: 16, stiffness: 160 } });
  const accTel = interpolate(frame, [b[1] - 2, b[1] + 6, b[2] - 2, b[2] + 6], [0, 1, 1, 0], clamp);
  const accWin = interpolate(frame, [b[2] - 2, b[2] + 6], [0, 1], clamp);
  const yT = interpolate(frame, [b[1], b[2] + 4], [0, 640], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const yD = interpolate(frame, [b[2], b[2] + 40], [0, 520], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const camera = interpolate(frame, [0, 91], [1, 1.04], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      <AbsoluteFill style={{ scale: `${camera}`, transformOrigin: "540px 700px" }}>
        <div style={{ position: "absolute", left: -60, top: 210, opacity: Math.min(1, win * 1.4), translate: `${(1 - win) * -200}px 0`, rotate: "-1.5deg",
          filter: `drop-shadow(0 0 ${36 * accWin}px rgba(216,189,135,${0.7 * accWin}))` }}>
          <Finestra larghezza={LF} indirizzo="tenutadongaetano.it">
            <div style={{ translate: `0 ${-yD * (LF / 1440)}px` }}>
              <Img src={staticFile("pb-tenuta-3/sito-d.jpg")} style={{ width: LF, display: "block" }} />
            </div>
          </Finestra>
        </div>
        <div style={{ position: "absolute", left: 1080 - 40 - LTel, top: 1278 - mt.totale, opacity: Math.min(1, tel * 1.4), translate: `${(1 - tel) * 260}px 0`,
          rotate: `${2.5 - accTel}deg`, scale: `${1 + 0.05 * accTel}`, filter: `drop-shadow(0 0 ${36 * accTel}px rgba(216,189,135,${0.75 * accTel}))` }}>
          <Telefono larghezza={LTel}>
            <PaginaTelefono larghezza={LTel} y={yT} />
          </Telefono>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- 4 · WhatsApp: il messaggio che si compila da solo ----------
const MESSAGGIO = "Buongiorno, vorrei informazioni per organizzare un evento alla Tenuta Don Gaetano e richiedere un sopralluogo.";
const BOTTONE = { x: 194, y: 9498 };
export const WhatsApp: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const L = 500;
  const m = misure(L);
  const k = m.schermo / 390;
  const Y = 9200;
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150 } });
  const zoom = interpolate(frame, [b[1] - 8, b[1] + 4], [0, 1], { ...clamp, easing: uscita });
  const tocco = b[1] + 8;
  const t = interpolate(frame, [tocco - 5, tocco, tocco + 14], [0, 1, 0], clamp);
  const onda = interpolate(frame, [tocco, tocco + 14], [0, 1], clamp);
  const chat = interpolate(frame, [tocco + 8, tocco + 18], [0, 1], { ...clamp, easing: uscita });
  const lettere = Math.floor(interpolate(frame, [b[2], b[3] + 24], [0, MESSAGGIO.length], clamp));
  const sopr = interpolate(frame, [b[5], b[5] + 8], [0, 1], clamp);
  const SX2 = (1080 - L) / 2, SY2 = 90;
  const bx = SX2 + m.bordo + BOTTONE.x * k, by = SY2 + m.bordo + m.barra + (BOTTONE.y - Y) * k;
  const testo = MESSAGGIO.slice(0, lettere);
  const i = testo.indexOf("un sopralluogo");
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
                  <div style={{ width: 52, height: 52, borderRadius: 26, background: MARRONE, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Img src={staticFile("pb-tenuta/logo-linee.png")} style={{ width: 46 }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, color: "#fff" }}>Tenuta Don Gaetano</div>
                    <div style={{ fontFamily: ARCHIVO, fontSize: 18, color: "rgba(255,255,255,.75)" }}>online</div>
                  </div>
                </div>
                <div style={{ position: "absolute", left: 18, right: 18, top: 150, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
                  <span style={{ alignSelf: "center", background: "#E1F2FB", color: "#555", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 18, padding: "6px 14px", borderRadius: 8 }}>OGGI</span>
                  <div style={{ maxWidth: "96%", background: "#DCF8C6", borderRadius: "24px 4px 24px 24px", padding: "26px 28px", boxShadow: "0 2px 4px rgba(0,0,0,.14)",
                    fontFamily: ARCHIVO, fontWeight: 500, fontSize: 42, lineHeight: 1.3, color: "#111", minHeight: 80 }}>
                    {i < 0 ? testo || " " : (<>{testo.slice(0, i)}<span style={{ background: `rgba(216,189,135,${0.85 * sopr})`, borderRadius: 6, padding: "0 4px" }}>{testo.slice(i)}</span></>)}
                  </div>
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

export const ReelTenuta4: React.FC = () => {
  const S = Object.fromEntries(ID.map((k) => [k, scena(k)])) as Record<TipoScena, ReturnType<typeof scena>>;
  const L = Object.fromEntries(ID.map((k) => [k, locali(k)])) as Record<TipoScena, number[]>;
  const seq = (k: TipoScena, el: React.ReactNode) => <Sequence from={S[k].inizio} durationInFrames={S[k].frames}>{el}</Sequence>;
  const ap = S.apertura, id = S.identita, si = S.sito, me = S.menu, se = S.semplice;
  const taglio = L.apertura[1]; // «una dimora del Settecento»: dal giardino dall'alto alla facciata
  const bl = L.location;
  const arrivi = [0, bl[1], bl[2], bl[2] + 20, bl[3] + 24];
  const identita = L.identita[2]; // «le ho dato un'identità»
  const bm = L.menu.map((f) => f + si.frames);
  const nascosti: [number, number][] = [[se.inizio, se.inizio + se.frames]];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {seq("apertura", <>
        <Sequence durationInFrames={taglio}><Clip file="pb-tenuta/seg/drone-alto.mp4" zoom={[1.0, 1.06]} frames={taglio} /></Sequence>
        <Sequence from={taglio} durationInFrames={ap.frames - taglio}><Clip file="pb-tenuta-3/seg/drone-pini.mp4" zoom={[1.08, 1.0]} frames={ap.frames - taglio} /></Sequence>
        <TitoloGrande riga="Una location nuova" chiave="da far conoscere" da={3} corpo={84} alto={230} />
      </>)}
      {seq("location", <Mazzo arrivi={arrivi} />)}
      {seq("identita", <>
        <Sequence durationInFrames={identita}><Clip file="pb-tenuta/seg/drone2.mp4" zoom={[1.0, 1.08]} frames={identita} /></Sequence>
        <Sequence from={identita} durationInFrames={id.frames - identita}><Identita b={L.identita} da={identita} /></Sequence>
      </>)}
      <Sequence from={si.inizio} durationInFrames={si.frames + me.frames}>
        <SitoOnePage bs={L.sito} bm={bm} />
      </Sequence>
      {seq("ovunque", <Ovunque b={L.ovunque} />)}
      {seq("whatsapp", <WhatsApp b={L.whatsapp} />)}
      <Sequence from={se.inizio} durationInFrames={se.frames}>
        <Clip file="pb-tenuta-4/seg/finale.mp4" zoom={[1.12, 1.04]} frames={se.frames} centro="72% 30%" />
      </Sequence>
      <Sequence from={se.inizio} durationInFrames={CTA.da - se.inizio}>
        <TitoloGrande riga="Semplice" chiave="e funzionale" da={2} corpo={150} alto={250} />
      </Sequence>
      <Sequence from={CTA.da} durationInFrames={se.inizio + se.frames - CTA.da}>
        <FinaleCta passata={CTA.chiave - CTA.da} righe={["Conosci qualcuno", "che sta aprendo una location", "per eventi?"]} chiave="Mandagli questo video" />
      </Sequence>
      <Sottotitoli chiaro={[]} nascosti={nascosti} />
      <Audio src={staticFile("pb-tenuta-4/voce.wav")} />
    </AbsoluteFill>
  );
};

import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { ARCHIVO, MONO } from "../pb-girarrosto/font";
import { Fondale } from "../pb-girarrosto6/Scene";
import { Telefono, misure } from "../pb-room84/Telefono";
import { FPS } from "./testo";

// Le scene del reel del sito menù del Girarrosto (03/10/2026): il telefono col sito vero, catturato da
// `scripts/pb-girarrosto-sito-cattura.cjs`, che scorre il menù e riempie il carrello; la chat di WhatsApp col messaggio
// che il sito compone davvero (letto dal bottone «Ordina ora», con l'orologio alle 19:30); le schede del pagamento.
// Il sito è un'app: testata fissa, menù che scorre, barra delle schede in fondo. Le pagine lunghe sono il menù intero,
// e sopra si rimettono la testata, la barra delle categorie quando si attacca in alto, e la barra delle schede col
// numero del carrello. Nei tocchi si passa alla schermata vera, col messaggio «aggiunto».
// Le misure in punti vengono da `public/pb-girarrosto-sito/misure.json`.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);
const VERDE = "#26D469"; // il verde del bottone «Ordina ora»
const NERO = "#0E0E0C";
const CREMA_SITO = "#F3F1EB";
const f = (n: string) => staticFile(`pb-girarrosto-sito/${n}`);

export const LT = 500;
const MT = misure(LT);
const K = MT.schermo / 390;
const TX = (1080 - LT) / 2, TY = 110;
const FONDO_TEL = TY + MT.totale; // il bordo basso del telefono: la camera ingrandisce da lì, e sotto restano liberi i sottotitoli
const SX = TX + MT.bordo;

// ---------- la camera ----------
// Chiavi [fotogramma, ingrandimento, x del centro]: fra una chiave e l'altra si va con un'accelerazione morbida.
type Chiave = [number, number, number];
const camera = (frame: number, chiavi: Chiave[]) => {
  if (frame <= chiavi[0][0]) return { z: chiavi[0][1], x: chiavi[0][2] };
  for (let i = 0; i < chiavi.length - 1; i++) {
    const [f0, z0, x0] = chiavi[i];
    const [f1, z1, x1] = chiavi[i + 1];
    if (frame < f1) {
      const t = Easing.inOut(Easing.cubic)((frame - f0) / Math.max(1, f1 - f0));
      return { z: z0 + (z1 - z0) * t, x: x0 + (x1 - x0) * t };
    }
  }
  const u = chiavi[chiavi.length - 1];
  return { z: u[1], x: u[2] };
};
const xSchermo = (x: number) => SX + x * K;

// ---------- il sito nel telefono ----------
const Vista: React.FC<{ lunga: string; s: number; testata: string; schede: string; chips?: string | null }> = ({ lunga, s, testata, schede, chips }) => {
  const W = MT.schermo;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: CREMA_SITO }}>
      <Img src={f(lunga)} style={{ position: "absolute", left: 0, top: -s * K, width: W }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 68 * K, overflow: "hidden" }}>
        <Img src={f(testata)} style={{ width: W, display: "block" }} />
      </div>
      {chips && s > 455 ? (
        <div style={{ position: "absolute", left: 0, top: 68 * K, width: W, height: 61 * K, overflow: "hidden" }}>
          <Img src={f(chips)} style={{ width: W, display: "block", marginTop: -68 * K }} />
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 0, top: 776 * K, width: W, height: 68 * K, overflow: "hidden" }}>
        <Img src={f(schede)} style={{ width: W, display: "block", marginTop: -776 * K }} />
      </div>
    </div>
  );
};
const Fermo: React.FC<{ file: string }> = ({ file }) => (
  <Img src={f(file)} style={{ position: "absolute", left: 0, top: 0, width: MT.schermo, display: "block" }} />
);
// il dito: un cerchio che preme e un'onda verde che si allarga
const Tocco: React.FC<{ x: number; y: number; da: number }> = ({ x, y, da }) => {
  const frame = useCurrentFrame();
  if (frame < da - 6 || frame > da + 18) return null;
  const t = interpolate(frame, [da - 6, da, da + 14], [0, 1, 0], clamp);
  const onda = interpolate(frame, [da, da + 16], [0, 1], clamp);
  return (
    <>
      <div style={{ position: "absolute", left: x * K - 36, top: y * K - 36, width: 72, height: 72, borderRadius: 36, background: "rgba(14,14,12,.22)",
        border: "3px solid rgba(255,255,255,.95)", boxShadow: "0 4px 14px rgba(0,0,0,.25)", opacity: t, scale: `${1 - 0.15 * t}` }} />
      <div style={{ position: "absolute", left: x * K - 36, top: y * K - 36, width: 72, height: 72, borderRadius: 36, border: `4px solid ${VERDE}`,
        scale: `${1 + onda * 1.8}`, opacity: frame >= da ? 1 - onda : 0 }} />
    </>
  );
};
// la cornice verde che indica una cosa sullo schermo, in punti
const Cornice: React.FC<{ r: [number, number, number, number]; da: number; a?: number }> = ({ r, da, a = 99999 }) => {
  const frame = useCurrentFrame();
  if (frame < da || frame >= a) return null;
  const e = spring({ frame: frame - da, fps: FPS, config: { damping: 13, stiffness: 220 } });
  const [x, y, w, h] = r;
  return (
    <div style={{ position: "absolute", left: (x - 5) * K, top: (y - 5) * K, width: (w + 10) * K, height: (h + 10) * K, borderRadius: 14,
      border: `4px solid ${VERDE}`, boxShadow: `0 0 22px rgba(38,212,105,.7)`, opacity: e, scale: `${1.25 - 0.25 * e}` }} />
  );
};

// Il telefono che entra dal basso e resta: in apertura, col sito e poi col carrello pieno.
export const TelefonoFermo: React.FC<{ file: string; poi?: string; cambio?: number }> = ({ file, poi, cambio = 9999 }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const salto = spring({ frame: frame - cambio, fps: FPS, config: { damping: 12, stiffness: 240 } });
  const bump = frame >= cambio ? 1 + 0.04 * Math.sin(Math.min(1, salto) * Math.PI) : 1;
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: TX, top: TY, opacity: Math.min(1, e * 1.4), translate: `0 ${(1 - e) * 900}px`, scale: `${bump}`, rotate: `${-2 + 2 * e}deg` }}>
        <Telefono larghezza={LT}>
          <Fermo file={file} />
          {poi ? <div style={{ position: "absolute", inset: 0, opacity: interpolate(frame, [cambio, cambio + 4], [0, 1], clamp) }}><Fermo file={poi} /></div> : null}
        </Telefono>
      </div>
    </AbsoluteFill>
  );
};

// ---------- dal menù al carrello, fino a «Ordina ora» ----------
// Una scena sola, dal «Basta che apri il sito» al tocco su «Ordina ora», perché il telefono resta in mano.
export type TempiSito = {
  sfogli: number; tocchi: number; crocche: number; coca: number; carrello: number; totale: number;
  nome: number; oggi: number; domani: number; altro: number; ordina: number;
};
// le misure del sito, in punti: i bottoni nel menù intero e la loro posizione nelle schermate dei tocchi
const S_COPPIA = 738, S_CROCCHE = 3614, S_COCA = 4166;
const S_NOME = 330, S_BOTTONE = 420;
const NOME = { x: 18, y: 737, w: 354, h: 52 };
const GIORNI: [number, number, number, number][] = [[18, 827, 91, 43], [117, 827, 110, 43], [235, 827, 137, 43]];
export const SitoTelefono: React.FC<{ t: TempiSito }> = ({ t }) => {
  const frame = useCurrentFrame();
  const entra = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  const T1 = t.tocchi + 4;
  const SC2: [number, number] = [t.crocche - 10, t.crocche + 2];
  const T2 = [SC2[1] + 2, SC2[1] + 8];
  const SC3: [number, number] = [Math.max(T2[1] + 10, t.coca - 4), Math.max(T2[1] + 18, t.coca + 4)];
  const T3 = SC3[1] + 2;
  const TAB = t.carrello + 2, CAMBIO = TAB + 5;
  const TBTN = t.ordina + 12;

  // il menù
  let s = interpolate(frame, [t.sfogli, T1 - 4], [0, S_COPPIA], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  if (frame >= SC2[0]) s = interpolate(frame, [SC2[0], SC2[1]], [S_COPPIA, S_CROCCHE], { ...clamp, easing: Easing.inOut(Easing.quad) });
  if (frame >= SC3[0]) s = interpolate(frame, [SC3[0], SC3[1]], [S_CROCCHE, S_COCA], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const stato = frame >= T3 + 2 ? ["menu-4.jpg", "tocco-coca.png"] : frame >= T2[1] + 2 ? ["menu-3.jpg", "tocco-crocche.png"] : frame >= T1 + 2 ? ["menu-1.jpg", "tocco-coppia.png"] : ["menu-0.jpg", "apertura.png"];
  const fermo = frame >= T1 + 2 && frame < Math.min(T1 + 44, SC2[0]) ? "tocco-coppia.png"
    : frame >= T2[1] + 2 && frame < Math.min(T2[1] + 44, SC3[0]) ? "tocco-crocche.png"
      : frame >= T3 + 2 && frame < Math.min(T3 + 44, CAMBIO) ? "tocco-coca.png" : null;
  // la scheda Ordina
  let so = interpolate(frame, [t.nome - 4, t.nome + 10], [0, S_NOME], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  if (frame >= t.ordina - 4) so = interpolate(frame, [t.ordina - 4, t.ordina + 8], [S_NOME, S_BOTTONE], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const ordina = interpolate(frame, [CAMBIO, CAMBIO + 5], [0, 1], clamp);
  const scrivi = t.nome + 12;
  const lettere = Math.floor(interpolate(frame, [scrivi, scrivi + 18], [0, 8], clamp));
  const giorno = frame >= t.altro + 24 ? 0 : frame >= t.altro ? 2 : frame >= t.domani ? 1 : 0;
  const premuto = interpolate(frame, [TBTN - 2, TBTN + 2, TBTN + 8], [1, 0.96, 1], clamp);

  const cam = camera(frame, [
    [0, 1, 540], [t.tocchi - 4, 1, 540], [t.tocchi + 8, 1.3, xSchermo(148)], [SC2[0], 1.3, xSchermo(148)], [SC2[1], 1.3, xSchermo(352)],
    [SC3[0], 1.3, xSchermo(352)], [SC3[1], 1.3, xSchermo(337)], [TAB - 6, 1.3, xSchermo(337)], [TAB + 2, 1.12, xSchermo(320)],
    [CAMBIO + 3, 1, 540], [t.totale - 2, 1, 540], [t.totale + 10, 1.35, xSchermo(315)], [t.nome - 6, 1.35, xSchermo(315)],
    [t.nome + 8, 1.2, 540], [t.ordina + 40, 1.2, 540],
  ]);
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <AbsoluteFill style={{ scale: `${cam.z}`, transformOrigin: `${cam.x}px ${FONDO_TEL}px` }}>
        <div style={{ position: "absolute", left: TX, top: TY, opacity: Math.min(1, entra * 1.4), translate: `0 ${(1 - entra) * 900}px` }}>
          <Telefono larghezza={LT}>
            <Vista lunga={stato[0]} s={s} testata="apertura.png" schede={stato[1]} chips={s < 1500 ? "tocco-coppia.png" : "tocco-crocche.png"} />
            {fermo ? <Fermo file={fermo} /> : null}
            <Tocco x={148} y={1246 - S_COPPIA} da={T1} />
            <Tocco x={352} y={4062 - S_CROCCHE} da={T2[0]} />
            <Tocco x={352} y={4062 - S_CROCCHE} da={T2[1]} />
            <Tocco x={337} y={4611 - S_COCA} da={T3} />
            <Tocco x={337} y={811} da={TAB} />
            {frame >= CAMBIO ? (
              <div style={{ position: "absolute", inset: 0, opacity: ordina }}>
                <Vista lunga="ordina-lunga.jpg" s={so} testata="ordina-0.png" schede="ordina-0.png" />
                {/* il nome che si scrive, sopra quello già scritto nella schermata */}
                <div style={{ position: "absolute", left: (NOME.x + 2) * K, top: (NOME.y + 2 - so) * K, width: (NOME.w - 4) * K, height: (NOME.h - 4) * K,
                  background: "#fff", borderRadius: 10 * K, display: "flex", alignItems: "center", paddingLeft: 13 * K,
                  fontFamily: "Nunito, Archivo, sans-serif", fontSize: 16 * K, color: lettere ? "#1A1A1A" : "#9A9A94" }}>
                  {lettere ? "Giovanni".slice(0, lettere) : "Il tuo nome"}
                  {frame >= scrivi - 4 && frame < scrivi + 30 && Math.floor(frame / 8) % 2 === 0 ? <span style={{ width: 2, height: 20 * K, background: "#1A1A1A", marginLeft: 2 }} /> : null}
                </div>
                <Cornice r={[277, 592 - so, 77, 32]} da={t.totale} a={t.nome} />
                <Cornice r={[GIORNI[giorno][0], GIORNI[giorno][1] - so, GIORNI[giorno][2], GIORNI[giorno][3]]} da={t.oggi} a={t.ordina} />
                <div style={{ position: "absolute", left: 18 * K, top: (986 - so) * K, width: 354 * K, height: 139 * K, scale: `${premuto}` }} />
                <Tocco x={195} y={NOME.y + 26 - S_NOME} da={t.nome + 10} />
                <Tocco x={195} y={1056 - S_BOTTONE} da={TBTN} />
              </div>
            ) : null}
          </Telefono>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- WhatsApp: il messaggio già scritto, l'invio, la risposta ----------
// Il testo è quello che il sito compone davvero col carrello di sopra, letto dal bottone; alle 13 dice «Buongiorno».
const RIGHE = [
  "Vorrei ordinare:", "", "• 1 × Menù Coppia", "• 2 × Crocchè", "• 1 × Coca-Cola 1,5 lt", "",
  "Ritiro: oggi (sabato 3 ottobre)", "Sede: Via Filippo Turati, 109 — Poggiomarino (NA)", "Totale indicativo: €21,00", "",
  "Sono Giovanni.", "", "È possibile? Grazie!",
];
const GRUPPI = [[2, 3, 4], [6], [8], [10]]; // cosa vuoi, quando passi, il totale, il tuo nome
const RISPOSTA = "Ok, ordine accettato, ti aspettiamo per il ritiro.";
export type TempiChat = { gia: number; tutto: number[]; saluto: number[]; invio: number[] };

const Messaggio: React.FC<{ saluto: string; luce: (riga: number) => number; luceSaluto: number; corpo: number }> = ({ saluto, luce, luceSaluto, corpo }) => (
  <div style={{ fontFamily: ARCHIVO, fontWeight: 500, fontSize: corpo, lineHeight: 1.28, color: "#111" }}>
    <div>
      <span style={{ background: `rgba(38,212,105,${0.55 * luceSaluto})`, borderRadius: 6, padding: "0 3px", margin: "0 -3px" }}>{saluto}</span> Vorrei ordinare:
    </div>
    {RIGHE.slice(1).map((r, i) => (
      r === "" ? <div key={i} style={{ height: corpo * 0.55 }} /> : (
        <div key={i}><span style={{ background: `rgba(38,212,105,${0.5 * luce(i + 1)})`, borderRadius: 6, padding: "0 3px", margin: "0 -3px",
          boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{r}</span></div>
      )
    ))}
  </div>
);
export const WhatsAppOrdine: React.FC<{ t: TempiChat }> = ({ t }) => {
  const frame = useCurrentFrame();
  const W = MT.schermo, H = MT.altezza - MT.barra;
  const apre = interpolate(frame, [0, 10], [0, 1], { ...clamp, easing: uscita });
  const bozza = spring({ frame: frame - t.gia, fps: FPS, config: { damping: 16, stiffness: 170 } });
  const TS = t.invio[0] + 6; // il tocco su invio
  const inviato = frame >= TS + 2;
  const bolla = spring({ frame: frame - TS - 2, fps: FPS, config: { damping: 15, stiffness: 190 } });
  const scrive = frame >= t.invio[1] && frame < t.invio[2];
  const risposta = spring({ frame: frame - t.invio[2], fps: FPS, config: { damping: 15, stiffness: 200 } });
  const lettereR = Math.floor(interpolate(frame, [t.invio[2], t.invio[3] + 14], [0, RISPOSTA.length], clamp));
  const [, cosa, quando, totale, nome, tuttoQuanto] = t.tutto;
  const inizi = [cosa, quando, totale, nome];
  const luce = (riga: number) => {
    const g = GRUPPI.findIndex((x) => x.includes(riga));
    const tutto = interpolate(frame, [tuttoQuanto, tuttoQuanto + 4, t.saluto[0] - 2, t.saluto[0] + 4], [0, 0.55, 0.55, 0], clamp);
    if (g < 0) return tutto;
    const da = inizi[g], dopo = inizi[g + 1] ?? tuttoQuanto;
    const ora = interpolate(frame, [da, da + 4, dopo, dopo + 4], [0, 1, 1, 0.3], clamp);
    return Math.max(frame >= da ? ora : 0, tutto) * (frame < t.saluto[0] + 4 ? 1 : interpolate(frame, [t.saluto[0], t.saluto[0] + 6], [1, 0], clamp));
  };
  const parola = frame >= t.saluto[1] && frame < t.saluto[2] ? "Buongiorno!" : "Buonasera!";
  const luceSaluto = interpolate(frame, [t.saluto[0], t.saluto[0] + 4, t.invio[0] - 4, t.invio[0]], [0, 1, 1, 0], clamp);
  const ora = frame >= t.saluto[1] && frame < t.saluto[2] ? "13:00" : "19:30";
  const orologio = spring({ frame: frame - t.saluto[0] - 2, fps: FPS, config: { damping: 14, stiffness: 200 } }) * interpolate(frame, [t.invio[0] - 6, t.invio[0] + 2], [1, 0], clamp);
  const scatto = spring({ frame: frame - (frame >= t.saluto[2] ? t.saluto[2] : t.saluto[1]), fps: FPS, config: { damping: 10, stiffness: 300 } });
  const tTocco = interpolate(frame, [TS - 6, TS, TS + 14], [0, 1, 0], clamp);
  const cam = camera(frame, [[0, 1.2, 540], [12, 1, 540], [t.gia + 4, 1, 540], [t.gia + 18, 1.18, 540], [t.tutto[0] - 2, 1.18, 540], [t.tutto[0] + 10, 1.3, 540],
    [t.invio[0] + 2, 1.3, 540], [t.invio[0] + 14, 1, 540], [t.invio[2] - 4, 1, 540], [t.invio[2] + 10, 1.28, 470]]);
  const HB = 92; // la testata della chat
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <AbsoluteFill style={{ scale: `${cam.z}`, transformOrigin: `${cam.x}px ${FONDO_TEL}px` }}>
        <div style={{ position: "absolute", left: TX, top: TY }}>
          <Telefono larghezza={LT}>
            <div style={{ position: "absolute", inset: 0, translate: `${-apre * 30}%` }}><Fermo file="ordina-bottone.png" /></div>
            <div style={{ position: "absolute", inset: 0, translate: `${(1 - apre) * 100}% 0`, background: "#ECE5DD", overflow: "hidden" }}>
              <div style={{ height: HB, background: "#075E54", display: "flex", alignItems: "center", gap: 14, padding: "0 20px" }}>
                <div style={{ width: 58, height: 58, borderRadius: 29, background: CREMA_SITO, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <Img src={f("logo-gallo.png")} style={{ height: 44 }} />
                </div>
                <div>
                  <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 25, color: "#fff" }}>Girarrosto Liberti</div>
                  <div style={{ fontFamily: ARCHIVO, fontSize: 17, color: "rgba(255,255,255,.8)" }}>{scrive ? "sta scrivendo…" : "online"}</div>
                </div>
              </div>
              {/* il messaggio mandato, e la risposta */}
              {inviato ? (
                <div style={{ position: "absolute", right: 12, top: HB + 18, width: W * 0.86, background: "#D9FDD3", borderRadius: "18px 4px 18px 18px", padding: "14px 16px 30px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.18)", scale: `${0.6 + 0.4 * bolla}`, opacity: bolla, transformOrigin: "100% 100%" }}>
                  <Messaggio saluto="Buonasera!" luce={() => 0} luceSaluto={0} corpo={21} />
                  <div style={{ position: "absolute", right: 12, bottom: 8, fontFamily: ARCHIVO, fontSize: 15, color: frame >= t.invio[1] ? "#34B7F1" : "#8A9A8A" }}>19:30 ✓✓</div>
                </div>
              ) : null}
              {scrive ? (
                <div style={{ position: "absolute", left: 12, top: HB + 470, background: "#fff", borderRadius: "4px 18px 18px 18px", padding: "16px 20px", display: "flex", gap: 7 }}>
                  {[0, 1, 2].map((i) => <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: "#9AA", opacity: 0.4 + 0.6 * Math.abs(Math.sin((frame + i * 4) / 5)) }} />)}
                </div>
              ) : null}
              {frame >= t.invio[2] ? (
                <div style={{ position: "absolute", left: 12, top: HB + 470, maxWidth: W * 0.8, background: "#fff", borderRadius: "4px 18px 18px 18px", padding: "14px 18px 30px",
                  boxShadow: "0 1px 2px rgba(0,0,0,.18)", scale: `${0.7 + 0.3 * risposta}`, opacity: risposta, transformOrigin: "0 0",
                  fontFamily: ARCHIVO, fontWeight: 600, fontSize: 27, lineHeight: 1.25, color: "#111" }}>
                  {RISPOSTA.slice(0, lettereR) || " "}
                  <div style={{ position: "absolute", right: 12, bottom: 8, fontFamily: ARCHIVO, fontWeight: 400, fontSize: 15, color: "#8A9A8A" }}>19:31</div>
                </div>
              ) : null}
              {/* la barra in basso: il messaggio già scritto, fino all'invio */}
              <div style={{ position: "absolute", left: 10, right: 76, bottom: 14, background: "#fff", borderRadius: 26, padding: inviato ? "16px 20px" : "16px 18px",
                boxShadow: `0 1px 2px rgba(0,0,0,.15), 0 0 ${26 * bozza * (inviato ? 0 : 1) * interpolate(frame, [t.gia, t.gia + 30], [1, 0.25], clamp)}px rgba(38,212,105,.8)` }}>
                {inviato || frame < t.gia ? (
                  <span style={{ fontFamily: ARCHIVO, fontSize: 21, color: "#9A9A9A" }}>Messaggio</span>
                ) : (
                  <div style={{ opacity: bozza, maxHeight: H * 0.72, overflow: "hidden" }}>
                    <Messaggio saluto={parola} luce={luce} luceSaluto={luceSaluto} corpo={25} />
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", right: 10, bottom: 14, width: 58, height: 58, borderRadius: 29, background: "#00A884", display: "flex", alignItems: "center", justifyContent: "center",
                scale: `${1 - 0.12 * tTocco}` }}>
                <div style={{ width: 0, height: 0, borderTop: "11px solid transparent", borderBottom: "11px solid transparent", borderLeft: "18px solid #fff", marginLeft: 5 }} />
              </div>
              {frame >= TS - 6 && frame <= TS + 16 ? (
                <div style={{ position: "absolute", right: 39 - 36, bottom: 43 - 36, width: 72, height: 72, borderRadius: 36, border: "3px solid rgba(255,255,255,.95)",
                  background: "rgba(14,14,12,.2)", opacity: tTocco }} />
              ) : null}
            </div>
          </Telefono>
        </div>
      </AbsoluteFill>
      {/* l'ora, fuori dal telefono: alle 13 «Buongiorno», alle 19:30 «Buonasera» */}
      <div style={{ position: "absolute", left: 40, top: 300, rotate: "-5deg", opacity: orologio, scale: `${(0.7 + 0.3 * orologio) * (1 + 0.06 * (1 - scatto))}`,
        background: CREMA_SITO, border: `5px solid ${NERO}`, borderRadius: 24, boxShadow: `10px 10px 0 ${NERO}`, padding: "14px 22px 16px", textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 20, letterSpacing: ".2em", color: "#6B6A62" }}>ORE</div>
        <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 64, color: NERO, lineHeight: 1 }}>{ora}</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- si paga al ritiro, niente app, niente account ----------
// Tre schede nello stile del sito, bordo nero e ombra piena: la verde arriva su «Paghi quando passi», le altre due si
// cancellano sulle loro parole.
const Scheda: React.FC<{ da: number; riga: React.ReactNode; top: number; ruota: number; verde?: boolean; barra?: number; sotto?: string }> = ({ da, riga, top, ruota, verde, barra, sotto }) => {
  const frame = useCurrentFrame();
  const e = spring({ frame: frame - da, fps: FPS, config: { damping: 15, stiffness: 180 } });
  const b = barra === undefined ? 0 : interpolate(frame, [barra, barra + 8], [0, 1], { ...clamp, easing: uscita });
  return (
    <div style={{ position: "absolute", left: verde ? 80 : 120, right: verde ? 80 : 120, top, rotate: `${ruota}deg`, opacity: Math.min(1, e * 1.5), translate: `0 ${(1 - e) * 120}px`,
      scale: `${0.8 + 0.2 * e}`, background: verde ? VERDE : CREMA_SITO, border: `6px solid ${NERO}`, borderRadius: 34, boxShadow: `14px 14px 0 ${NERO}`,
      padding: verde ? "40px 46px 38px" : "34px 40px" }}>
      <div style={{ position: "relative", display: "inline-block", fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "118%", fontSize: verde ? 92 : 60, lineHeight: 0.98, whiteSpace: verde ? "normal" : "nowrap",
        color: NERO, opacity: 1 - 0.55 * b }}>
        {riga}
        {barra !== undefined ? <div style={{ position: "absolute", left: -10, right: -10, top: "50%", height: 12, marginTop: -6, background: NERO, borderRadius: 6,
          scale: `${b} 1`, transformOrigin: "left center", rotate: "-3deg" }} /> : null}
      </div>
      {sotto ? <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, letterSpacing: ".16em", color: NERO, marginTop: 18 }}>{sotto}</div> : null}
    </div>
  );
};
export const Pagamento: React.FC<{ b: number[] }> = ({ b }) => (
  <AbsoluteFill>
    <Fondale luceY="42%" />
    <Scheda da={b[0]} top={230} ruota={-2} verde riga={<>Si paga<br />al ritiro</>} sotto="NESSUN PAGAMENTO ONLINE" />
    <Scheda da={b[1] - 6} barra={b[1] + 10} top={700} ruota={1.5} riga="App da scaricare" />
    <Scheda da={b[2] - 6} barra={b[2] + 10} top={960} ruota={-1} riga="Account da creare" />
  </AbsoluteFill>
);

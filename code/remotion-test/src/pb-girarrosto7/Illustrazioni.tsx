import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame } from "remotion";
import { APP_VERDE, ARCHIVO, CREMA, EVID_ARANCIO, EVID_GIALLO, EVID_VERDE, INTERMEDIO, MONO, SPENTO } from "../pb-girarrosto/font";
import { Ordine, SCHEDE, Tratto } from "../pb-girarrosto6/Illustrazioni";
import { Fondale, useEntrata } from "../pb-girarrosto6/Scene";
import { FPS } from "./testo";

// Le illustrazioni nuove della v7 (03/10/2026): i problemi del foglio che la v6 non diceva e le cose che l'app fa
// davvero, dal caso scritto (docs/casi/girarrosto-liberti.md). Tutte sul fondale firma scuro, grandi, e nessuna
// ferma: ognuna cambia sulle parole della voce, che arrivano come frame dall'inizio della scena.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const uscita = Easing.bezier(0.2, 0.8, 0.2, 1);
const molla = (frame: number, da: number, damping = 14, stiffness = 170) => spring({ frame: frame - da, fps: FPS, config: { damping, stiffness } });
const CARTA = "#F7F3E8";
const QUADRETTI = {
  background: CARTA,
  backgroundImage: "linear-gradient(rgba(90,120,190,.17) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(90,120,190,.17) 1.5px, transparent 1.5px)",
  backgroundSize: "37px 37px",
} as const;
const COLORI = [EVID_GIALLO, EVID_ARANCIO, EVID_VERDE];

// ---------- la fila ----------
// «Funzionava, eh. Finché non c'erano 20 persone in fila»: venti biglietti col cognome scarabocchiato, che arrivano
// uno dopo l'altro e riempiono lo schermo, col conto in alto. Nessuna sagoma di persona: solo schede, come nel resto.
export const Fila: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  // i primi quattro arrivano subito, così su «Funzionava, eh» lo schermo non è vuoto; gli altri sedici sempre più fitti
  const arrivo = (i: number) => (i < 4 ? 2 + i * 6 : b[1] + Math.round((i - 4) * ((b[2] + 14 - b[1]) / 16)));
  const quanti = [...Array(20).keys()].filter((i) => frame >= arrivo(i)).length;
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center" }}>
        <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 150, color: CREMA, fontVariantNumeric: "tabular-nums" }}>{quanti}</span>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 34, letterSpacing: ".24em", color: INTERMEDIO, marginTop: 4 }}>IN FILA</div>
      </div>
      {[...Array(20).keys()].map((i) => {
        const p = molla(frame, arrivo(i), 15, 210);
        const col = i % 4, riga = Math.floor(i / 4);
        const x = 70 + col * 240, y = 470 + riga * 150;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: 220, height: 128, ...QUADRETTI, borderRadius: 10,
            boxShadow: "0 18px 40px rgba(0,0,0,.5)", rotate: `${((i * 37) % 9) - 4}deg`, scale: `${0.6 + 0.4 * p}`, opacity: p, translate: `0 ${(1 - p) * -60}px` }}>
            <span style={{ position: "absolute", left: 16, top: 12, fontFamily: MONO, fontWeight: 700, fontSize: 22, color: "#8A8678" }}>#{i + 1}</span>
            <Tratto x={18} y={74} larghezza={120 + ((i * 23) % 50)} seme={5 + i * 3} da={0} durata={1} ora={50} />
            <div style={{ position: "absolute", left: 18, right: 18, bottom: 22, height: 16, borderRadius: 6, background: COLORI[i % 3], opacity: 0.62 }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- «Il mio è pronto?» e i fogli da rileggere ----------
// La domanda del cliente in una scheda, poi i fogli che si sfogliano uno dopo l'altro, sempre più in fretta.
const FoglioPieno: React.FC<{ seme: number }> = ({ seme }) => (
  <div style={{ position: "absolute", inset: 0, ...QUADRETTI, borderRadius: 10, boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
    {[0, 1, 2, 3, 4, 5, 6].map((r) => (
      <div key={r}>
        <Tratto x={30} y={90 + r * 92} larghezza={110 + ((r * 31 + seme) % 40)} seme={seme + r * 7} da={0} durata={1} ora={50} />
        <Tratto x={210} y={90 + r * 92} larghezza={300 + ((r * 53 + seme) % 160)} seme={seme + r * 11 + 3} da={0} durata={1} ora={50} />
        <div style={{ position: "absolute", left: 196, width: 300 + ((r * 53 + seme) % 160), top: 66 + r * 92, height: 30, borderRadius: 8,
          background: COLORI[(r + seme) % 3], opacity: 0.5, mixBlendMode: "multiply" }} />
      </div>
    ))}
  </div>
);

export const Pronto: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const domanda = molla(frame, 0, 13, 200);
  // i fogli: dal «E giù a rileggere» volano via uno alla volta, a ritmo che cresce
  const partenze = [b[1] + 4, b[1] + 16, b[1] + 25, b[2] + 2, b[2] + 9, b[2] + 15];
  return (
    <AbsoluteFill>
      <Fondale luceY="52%" />
      <div style={{ position: "absolute", left: 140, top: 470, width: 800, height: 760 }}>
        {[...Array(7).keys()].reverse().map((i) => {
          const via = i < partenze.length ? interpolate(frame, [partenze[i], partenze[i] + 9], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) }) : 0;
          return (
            <div key={i} style={{ position: "absolute", inset: 0, rotate: `${-3 + i * 1.6 + via * 26}deg`, translate: `${via * 1100}px ${i * -8 + via * -160}px`,
              transformOrigin: "20% 100%", opacity: 1 - via * 0.2 }}>
              <FoglioPieno seme={i * 13 + 4} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 90, top: 170, background: CREMA, color: "#0E0E0C", borderRadius: "34px 34px 34px 8px", padding: "34px 46px",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)", scale: `${0.7 + 0.3 * domanda}`, opacity: domanda, transformOrigin: "0 100%" }}>
        <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 76 }}>Il mio è pronto?</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- l'ordine che cambia: si cancella e si riscrive da capo ----------
// La riga scritta a mano, la penna che la cancella a zig-zag su «Cancella», e la riga nuova sotto su «e riscrivi da
// capo», con l'evidenziatore che ripassa. Il foglio è grande, a tutta larghezza.
export const Cancella: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const graffio = interpolate(frame, [b[1], b[1] + 12], [0, 1], clamp);
  const zig = "M0,22 L60,4 L40,40 L120,6 L100,44 L190,8 L170,46 L260,10 L240,48 L330,12 L310,46 L400,14 L380,44 L470,18";
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: 60, top: 330, width: 960, height: 880, ...QUADRETTI, borderRadius: 12, boxShadow: "0 30px 80px rgba(0,0,0,.55)",
        rotate: `${-1.5 + (1 - e) * 3}deg`, translate: `0 ${(1 - e) * 120}px`, opacity: e, scale: "1" }}>
        {[0, 1, 3].map((r) => (
          <div key={r}>
            <Tratto x={40} y={130 + r * 170} larghezza={150} seme={9 + r * 5} da={0} durata={1} ora={50} />
            <Ordine testo={["1 pollo fritto", "2 alette impanate", "", "1 coscia di tacchino"][r]} x={270} y={130 + r * 170} da={0} durata={1}
              colore={[EVID_GIALLO, EVID_ARANCIO, "", EVID_VERDE][r]} passa={-20} ora={50} />
          </div>
        ))}
        {/* la riga che cambia: scritta, cancellata, riscritta sotto */}
        <Tratto x={40} y={300} larghezza={150} seme={31} da={0} durata={1} ora={50} />
        <div style={{ position: "absolute", left: 0, top: 0, scale: "1.25", transformOrigin: "270px 300px" }}>
          <Ordine testo="2 alette impanate" x={270} y={300} da={0} durata={1} colore={EVID_ARANCIO} passa={-20} ora={50} />
        </div>
        <svg style={{ position: "absolute", left: 250, top: 262, overflow: "visible" }} width={500} height={60}>
          <path d={zig} fill="none" stroke="#26241E" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray={1200} strokeDashoffset={1200 * (1 - graffio)} transform="scale(1.15,1)" />
        </svg>
        <Tratto x={40} y={470} larghezza={150} seme={43} da={b[2] + 2} durata={10} />
        <div style={{ position: "absolute", left: 0, top: 0, scale: "1.25", transformOrigin: "270px 470px" }}>
          <Ordine testo="3 alette impanate" x={270} y={470} da={b[2] + 8} durata={16} colore={EVID_ARANCIO} passa={b[2] + 26} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- il gestionale del secolo ----------
// La finestra che fa tutto: menù, icone, tabelle e decine di funzioni che si accendono una dopo l'altra, finché non ci
// sta più niente. Sulla fine della frase si spegne e scivola via: non è quello che gli serviva.
const FUNZIONI = ["Fatture", "CRM", "Magazzino", "Agenda", "Ticket", "Report", "Buste paga", "Newsletter", "Listini", "Resi", "Flotta",
  "Commesse", "Timbrature", "Cespiti", "Fornitori", "Scadenzario", "Documenti", "Firme", "Budget", "Turni", "Contratti", "Sondaggi",
  "Lotti", "Provvigioni", "Campagne", "Analisi", "Progetti", "Presenze", "Moduli", "Archivio", "Inventario", "Bilancio",
  "Acquisti", "Logistica", "Mailing", "Ferie", "Fidelity", "Spedizioni", "Questionari", "Rimborsi", "Agenti", "Garanzie", "Assistenza",
  "Contabilità", "Scorte", "Abbonamenti", "Etichette", "Omaggi", "Preventivi", "Ordini", "Cassa", "Rubrica"];
export const Secolo: React.FC<{ b: number[]; frames: number }> = ({ b, frames }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const via = interpolate(frame, [frames - 12, frames], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const linea = "rgba(238,235,218,.16)";
  return (
    <AbsoluteFill>
      <Fondale luceY="46%" />
      <div style={{ position: "absolute", left: 50, top: 260, width: 980, height: 980, borderRadius: 22, overflow: "hidden", background: "#1C1C17",
        border: `1.5px solid ${linea}`, boxShadow: "0 40px 90px rgba(0,0,0,.6)", translate: `0 ${(1 - e) * 140}px`, opacity: e * (1 - via * 0.9),
        scale: `${1 - via * 0.25}`, rotate: `${via * -6}deg` }}>
        <div style={{ height: 54, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", borderBottom: `1.5px solid ${linea}` }}>
          {[0, 1, 2].map((i) => <i key={i} style={{ width: 14, height: 14, borderRadius: 7, background: linea, display: "block" }} />)}
          <u style={{ marginLeft: 16, flex: 1, height: 24, borderRadius: 12, background: linea, display: "block" }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 54, bottom: 0, width: 210, borderRight: `1.5px solid ${linea}`, padding: 20, display: "flex", flexDirection: "column", gap: 13 }}>
          {[...Array(24).keys()].map((i) => <div key={i} style={{ height: 15, borderRadius: 8, background: linea, width: `${55 + ((i * 37) % 45)}%` }} />)}
        </div>
        <div style={{ position: "absolute", left: 236, right: 24, top: 80, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {FUNZIONI.map((f, i) => {
            const k = molla(frame, 3 + i * Math.max(1, (b[1] + 20) / FUNZIONI.length), 16, 240);
            return (
              <span key={f} style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, letterSpacing: ".05em", textTransform: "uppercase", padding: "13px 18px",
                borderRadius: 999, border: `1.5px solid ${SPENTO}`, color: INTERMEDIO, opacity: k, scale: `${0.7 + 0.3 * k}` }}>{f}</span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- la ricerca: «Il mio è pronto?» Lo cerchi e lo trovi subito ----------
// Il pannello dell'app con la barra di ricerca: il cognome si scrive, le schede si filtrano e quella giusta viene
// avanti. Il cognome è inventato: nell'app vera ci sono i nomi dei clienti, e non si mostrano.
const COGNOME = "Esposito";
const MiniScheda: React.FC<{ nome: string; s: (typeof SCHEDE)[number]; acceso?: number }> = ({ nome, s, acceso = 0 }) => (
  <div style={{ position: "relative", background: "#fff", border: `3px solid ${acceso > 0.5 ? "#111" : "#D8D8D4"}`, borderRadius: 20, padding: "20px 22px", height: "100%",
    display: "flex", flexDirection: "column", gap: 10, boxShadow: acceso ? `0 0 0 ${8 * acceso}px rgba(53,199,89,.35)` : "none" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontWeight: 700, fontSize: 18, color: "#8A8A8A" }}><span>{s.n}</span><span>{s.ora}</span></div>
    <div style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 30, color: "#111" }}>{nome}</div>
    {s.voci.slice(0, 2).map(([v, p], i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 21, color: "#444" }}><span>{v}</span><span style={{ fontFamily: MONO }}>{p}</span></div>
    ))}
    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ background: "#FFF3D6", color: "#8A5A00", borderRadius: 999, padding: "8px 14px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 14, letterSpacing: ".08em" }}>DA CONSEGNARE</span>
      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 28, color: "#111" }}>{s.totale}</span>
    </div>
  </div>
);
export const Ricerca: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const lettere = Math.floor(interpolate(frame, [b[1], b[1] + 14], [0, COGNOME.length], clamp));
  const filtro = interpolate(frame, [b[2], b[2] + 10], [0, 1], { ...clamp, easing: uscita });
  const domanda = molla(frame, 0, 13, 200) * interpolate(frame, [b[1] - 4, b[1] + 4], [1, 0], clamp);
  const nomi = ["Russo", COGNOME, "Ferrara", "Romano"];
  const posizioni: [number, number][] = [[40, 230], [430, 230], [40, 610], [430, 610]];
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: 110, top: 200, width: 860, height: 900, background: "#F4F4F2", borderRadius: 40, boxShadow: "0 40px 90px rgba(0,0,0,.6)",
        scale: "1.1", transformOrigin: "50% 0", translate: `0 ${(1 - e) * 160}px`, opacity: e }}>
        <div style={{ position: "absolute", left: 40, right: 40, top: 40, height: 120, borderRadius: 24, background: "#fff", border: "3px solid #111",
          display: "flex", alignItems: "center", gap: 20, padding: "0 30px" }}>
          <svg width={44} height={44} viewBox="0 0 44 44"><circle cx="19" cy="19" r="13" fill="none" stroke="#111" strokeWidth="5" /><path d="M29 29 L40 40" stroke="#111" strokeWidth="5" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: ARCHIVO, fontWeight: 800, fontSize: 52, color: lettere ? "#111" : "#B0B0B0" }}>
            {lettere ? COGNOME.slice(0, lettere) : "Cerca un ordine"}
            {frame % 16 < 9 && filtro < 1 ? <span style={{ fontWeight: 400, color: "#111" }}>|</span> : null}
          </span>
        </div>
        {nomi.map((n, i) => {
          const giusto = n === COGNOME;
          const p = molla(frame, 4 + i * 4);
          const [x, y] = posizioni[i];
          // la scheda giusta va al centro e cresce, le altre spariscono
          const tx = giusto ? filtro * (215 - x) : 0, ty = giusto ? filtro * (300 - y) : 0;
          return (
            <div key={n} style={{ position: "absolute", left: x, top: y, width: 390, height: 350, scale: `${p * (giusto ? 1 + filtro * 0.38 : 1)}`, transformOrigin: "top left",
              translate: `${tx}px ${ty}px`, opacity: giusto ? 1 : 1 - filtro, zIndex: giusto ? 2 : 1 }}>
              <MiniScheda nome={n} s={SCHEDE[i]} acceso={giusto ? filtro : 0} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 120, top: 70, background: CREMA, color: "#0E0E0C", borderRadius: "30px 30px 30px 8px", padding: "24px 38px",
        boxShadow: "0 24px 60px rgba(0,0,0,.5)", opacity: domanda, scale: `${0.7 + 0.3 * domanda}`, transformOrigin: "0 100%" }}>
        <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 60 }}>Il mio è pronto?</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------- «Cambi idea? Tocchi modifica, e basta» ----------
// La scheda dell'ordine grande: il dito tocca MODIFICA, la riga dei polli passa da 2 a 3, il totale si rifà da solo.
export const Modifica: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const tocco = b[1] + 6;
  const onda = interpolate(frame, [tocco, tocco + 14], [0, 1], clamp);
  const premuto = 1 - 0.1 * spring({ frame: frame - tocco, fps: FPS, config: { damping: 9, stiffness: 260 } }) * interpolate(frame, [tocco, tocco + 10], [1, 0], clamp);
  const cambio = interpolate(frame, [tocco + 8, tocco + 16], [0, 1], { ...clamp, easing: uscita });
  const totale = interpolate(frame, [tocco + 12, tocco + 26], [29, 39], { ...clamp, easing: Easing.out(Easing.cubic) });
  const fatto = molla(frame, b[2] + 4, 11, 220);
  const riga = (sinistra: string, destra: string, lampo = 0) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: ARCHIVO, fontWeight: 600, fontSize: 40, color: "#222", padding: "6px 10px", borderRadius: 12,
      background: `rgba(53,199,89,${0.22 * lampo})` }}>
      <span>{sinistra}</span><span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 36 }}>{destra}</span>
    </div>
  );
  const lampo = interpolate(frame, [tocco + 8, tocco + 14, tocco + 40], [0, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="44%" />
      <div style={{ position: "absolute", left: 90, top: 300, width: 900, background: "#fff", border: "4px solid #1A1A1A", borderRadius: 34, padding: "40px 44px",
        display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 40px 90px rgba(0,0,0,.6)", translate: `0 ${(1 - e) * 140}px`, opacity: e }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontWeight: 700, fontSize: 30, color: "#8A8A8A" }}><span>#12</span><span>18:35</span></div>
        <div style={{ position: "relative", height: 62 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - cambio, translate: `0 ${-cambio * 20}px` }}>{riga("2 × Pollo", "€20,00")}</div>
          <div style={{ position: "absolute", inset: 0, opacity: cambio, translate: `0 ${(1 - cambio) * 20}px` }}>{riga("3 × Pollo", "€30,00", lampo)}</div>
        </div>
        {riga("1 × Patatine grande", "€6,00")}
        {riga("1 × Coca-Cola 1,5 lt", "€3,00")}
        <div style={{ borderTop: "3px solid #E6E6E6", marginTop: 10, paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 26, letterSpacing: ".16em", color: "#9A9A9A" }}>TOTALE</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 76, color: "#111" }}>€{totale.toFixed(2).replace(".", ",")}</span>
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 6 }}>
          <span style={{ background: APP_VERDE, color: "#0A2A12", borderRadius: 999, padding: "18px 30px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26, letterSpacing: ".08em" }}>CONSEGNATO</span>
          <span style={{ position: "relative", border: "3px solid #1A1A1A", color: "#111", borderRadius: 999, padding: "16px 30px", fontFamily: ARCHIVO, fontWeight: 800, fontSize: 26,
            letterSpacing: ".08em", scale: `${premuto}` }}>
            MODIFICA
            <span style={{ position: "absolute", left: "50%", top: "50%", width: 40, height: 40, marginLeft: -20, marginTop: -20, borderRadius: 20,
              border: "4px solid #35C759", scale: `${1 + onda * 3}`, opacity: onda > 0 ? 1 - onda : 0 }} />
          </span>
        </div>
      </div>
      <div style={{ position: "absolute", right: 110, top: 220, background: CREMA, color: "#0E0E0C", borderRadius: 999, padding: "18px 34px",
        fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 44, opacity: fatto, scale: `${0.6 + 0.4 * fatto}`, boxShadow: "0 20px 50px rgba(0,0,0,.5)" }}>
        ✓ Fatto
      </div>
    </AbsoluteFill>
  );
};

// ---------- il prezzo che cambia anche sul menù del sito ----------
// In alto il pannello dei prezzi, dove Marco cambia quello del pollo; un filo porta il prezzo nuovo al telefono col
// menù del sito, dove la stessa riga si accende. È la sincronizzazione del caso: un posto solo, e cambia dappertutto.
// ⚠️ Il prezzo nuovo è un esempio: è da far vedere a Emanuele, perché chi guarda può prenderlo per vero.
export const Prezzo: React.FC<{ b: number[] }> = ({ b }) => {
  const frame = useCurrentFrame();
  const e = useEntrata(0);
  const scrivi = b[0] + 14;
  const nuovo = frame >= scrivi + 8;
  const filo = interpolate(frame, [b[1] - 2, b[1] + 14], [0, 1], { ...clamp, easing: uscita });
  const telefono = molla(frame, b[1] - 6, 15, 170);
  const arriva = interpolate(frame, [b[1] + 12, b[1] + 18, b[2] + 30], [0, 1, 0.35], clamp);
  const voci: [string, string, string][] = [["Pollo", "€10,00", "€11,00"], ["Metà pollo", "€5,00", "€5,00"], ["Patatine grande", "€6,00", "€6,00"], ["Coca-Cola 1,5 lt", "€3,00", "€3,00"]];
  const rigaPrezzo = (nome: string, prima: string, dopo: string, i: number, grande: boolean) => {
    const cambia = i === 0;
    const valore = cambia && (grande ? nuovo : frame >= b[1] + 14) ? dopo : prima;
    const luce = cambia ? (grande ? interpolate(frame, [scrivi, scrivi + 6, b[1] + 6], [0, 1, 0.3], clamp) : arriva) : 0;
    return (
      <div key={nome} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: grande ? "18px 22px" : "14px 18px", borderRadius: 14,
        background: `rgba(53,199,89,${0.2 * luce})`, borderBottom: grande ? "2px solid #E6E6E6" : "1.5px solid #ECE6D6" }}>
        <span style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: grande ? 38 : 30, color: "#1A1A1A" }}>{nome}</span>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: grande ? 38 : 30, color: "#111", padding: grande && cambia ? "6px 14px" : 0,
          border: grande && cambia ? `3px solid ${frame >= scrivi - 4 ? "#111" : "transparent"}` : "none", borderRadius: 10 }}>{valore}</span>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <Fondale luceY="48%" />
      <div style={{ position: "absolute", left: 60, top: 170, width: 640, background: "#F4F4F2", borderRadius: 32, padding: "34px 34px 24px",
        boxShadow: "0 40px 90px rgba(0,0,0,.6)", translate: `0 ${(1 - e) * 140}px`, opacity: e }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "125%", fontSize: 32, color: "#111" }}>PREZZI</span>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 20, color: "#999" }}>PANNELLO DI MARCO</span>
        </div>
        {voci.map(([n, p, d], i) => rigaPrezzo(n, p, d, i, true))}
      </div>
      {/* il filo tratteggiato si disegna dal pannello al telefono: una maschera piena che cresce lungo la curva */}
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1080} height={1920}>
        <defs>
          <mask id="filo-prezzo" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920">
            <path d="M 640 330 C 900 330, 860 760, 700 800" fill="none" stroke="#fff" strokeWidth={14} pathLength={1} strokeDasharray={`${filo} 1`} />
          </mask>
        </defs>
        <path d="M 640 330 C 900 330, 860 760, 700 800" fill="none" stroke={CREMA} strokeWidth={5} strokeDasharray="14 12" strokeLinecap="round" mask="url(#filo-prezzo)" />
      </svg>
      <div style={{ position: "absolute", left: 420, top: 640, width: 560, height: 600, borderRadius: 60, background: "#111", padding: 16,
        boxShadow: "0 40px 90px rgba(0,0,0,.6)", opacity: telefono, translate: `0 ${(1 - telefono) * 160}px`, rotate: "3deg" }}>
        <div style={{ height: "100%", borderRadius: 46, background: "#FFFDF6", overflow: "hidden", padding: "26px 26px" }}>
          <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, color: "#9A9480", textAlign: "center", marginBottom: 16 }}>libertigirarrosto.it</div>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 900, fontStretch: "112%", fontSize: 40, color: "#1A1A1A", margin: "0 0 12px 6px" }}>Il menù</div>
          {voci.map(([n, p, d], i) => rigaPrezzo(n, p, d, i, false))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

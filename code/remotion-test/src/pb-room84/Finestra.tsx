import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { MONO, SPENTO } from "../pb-girarrosto/font";
import { Telefono, misure } from "./Telefono";

// Le finestre del prima e del dopo: la pagina vera che scorre dentro un computer e un telefono, dalle
// schermate di scripts/pb-room84-cattura.cjs. Nel sito nuovo la testata è un video: sopra la schermata si
// rimette il video vero, nello stesso punto, così la pagina si muove come quando la si apre.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type VideoPagina = { src: string; x: number; y: number; w: number; h: number }; // in punti della pagina

// La pagina che scorre: «punti» è la larghezza della pagina vera (1440 il computer, 390 il telefono),
// «tappe» sono [fotogramma, punto della pagina in alto].
export const PaginaCheScorre: React.FC<{ file: string; punti: number; larghezza: number; tappe: [number, number][]; video?: VideoPagina }> = ({
  file,
  punti,
  larghezza,
  tappe,
  video,
}) => {
  const frame = useCurrentFrame();
  const k = larghezza / punti;
  let y = tappe[0][1];
  for (let i = 1; i < tappe.length; i++) {
    const [f0, y0] = tappe[i - 1];
    const [f1, y1] = tappe[i];
    if (frame >= f0) y = interpolate(frame, [f0, f1], [y0, y1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  }
  return (
    <div style={{ position: "relative", width: larghezza, translate: `0 ${-y * k}px` }}>
      <Img src={staticFile(`pb-room84/siti/${file}.jpg`)} style={{ width: larghezza, display: "block" }} />
      {video ? (
        <div style={{ position: "absolute", left: video.x * k, top: video.y * k, width: video.w * k, height: video.h * k, overflow: "hidden" }}>
          <Video src={staticFile(`pb-room84/siti/${video.src}`)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ) : null}
      {video ? (
        // sopra il video, la testata fotografata senza video e a sfondo trasparente: velo, titolo, bottoni
        <Img src={staticFile(`pb-room84/siti/${file}-testata.png`)} style={{ position: "absolute", left: 0, top: 0, width: larghezza }} />
      ) : null}
    </div>
  );
};

// Il computer: una finestra scura col punto dell'indirizzo, la pagina sotto.
export const Finestra: React.FC<{ larghezza: number; indirizzo: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  larghezza,
  indirizzo,
  children,
  style,
}) => {
  const barra = Math.round(larghezza * 0.046);
  const altezza = Math.round((larghezza * 900) / 1440);
  return (
    <div
      style={{
        width: larghezza,
        borderRadius: 18,
        overflow: "hidden",
        background: "#141411",
        boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1.5px rgba(238,235,218,.14)",
        ...style,
      }}
    >
      <div style={{ height: barra, display: "flex", alignItems: "center", padding: "0 18px", gap: 9, background: "#1C1B17", borderBottom: "1px solid rgba(238,235,218,.08)" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: 99, background: "#3A3832" }} />
        ))}
        <div
          style={{
            margin: "0 auto",
            translate: "-30px 0",
            padding: "5px 26px",
            borderRadius: 99,
            background: "#26251F",
            fontFamily: MONO,
            fontWeight: 400,
            fontSize: 17,
            letterSpacing: "0.04em",
            color: SPENTO,
          }}
        >
          {indirizzo}
        </div>
      </div>
      <div style={{ width: larghezza, height: altezza, overflow: "hidden", position: "relative", background: "#fff" }}>{children}</div>
    </div>
  );
};

// Computer e telefono insieme, come nei caroselli di riferimento: la finestra grande e il telefono che le
// si appoggia davanti in basso a destra.
export const Coppia: React.FC<{
  pagina: "prima" | "dopo";
  frames: number;
  entra: number; // da 0 a 1, la molla d'ingresso
  scorriD: number; // quanto scorre il computer, in punti
  scorriM: number; // quanto scorre il telefono, in punti
}> = ({ pagina, frames, entra, scorriD, scorriM }) => {
  const larghezzaD = 960;
  const larghezzaM = 300;
  const mm = misure(larghezzaM);
  const dopo = pagina === "dopo";
  return (
    <>
      <div style={{ position: "absolute", left: 60, top: 300, translate: `0 ${(1 - entra) * 90}px`, scale: `${0.94 + 0.06 * entra}`, opacity: Math.min(1, entra * 1.4) }}>
        <Finestra larghezza={larghezzaD} indirizzo="room84.it">
          <PaginaCheScorre
            file={`${pagina}-d`}
            punti={1440}
            larghezza={larghezzaD}
            tappe={[[0, 0], [10, 0], [frames, scorriD]]}
            video={dopo ? { src: "hero.mp4", x: 0, y: 0, w: 1440, h: 924 } : undefined}
          />
        </Finestra>
      </div>
      <div style={{ position: "absolute", left: 1080 - 60 - larghezzaM, top: 1270 - mm.totale, translate: `0 ${(1 - entra) * 140}px`, opacity: Math.min(1, entra * 1.4) }}>
        <Telefono larghezza={larghezzaM}>
          <PaginaCheScorre
            file={`${pagina}-m`}
            punti={390}
            larghezza={mm.schermo}
            tappe={[[0, 0], [14, 0], [frames, scorriM]]}
            video={dopo ? { src: "hero-telefono.mp4", x: 0, y: 0, w: 390, h: 1049 } : undefined}
          />
        </Telefono>
      </div>
    </>
  );
};

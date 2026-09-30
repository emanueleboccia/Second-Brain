import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Fondale, Pov } from "../pb-girarrosto/Scene";
import { FinaleCta } from "../pb-girarrosto/ReelGirarrosto";
import { Sottotitoli } from "../pb-room84/Sottotitoli";
import { Telefono, misure } from "../pb-room84/Telefono";
import { FPS, inFrame, type Blocco } from "../pb-room84/testo";
import voce from "./voce.json";

// Il reel del sito di Tenuta Don Gaetano, 30/09/2026 notte. Emanuele: «potresti già prendere qualche clip dall'SSD,
// riprese col drone alla tenuta, ed eventualmente sfruttare anche delle fotografie […] se vuoi mostrare un po' lo stile,
// velocemente, il tutto accompagnato dalle tue illustrazioni e gli stili che già sai». Quindi: il drone sulla casa, le
// foto delle sale come un mazzo di carte che arriva veloce, il drone col Vesuvio, il logo che si disegna sul fondale, il
// sito vero da telefono (scripts/pb-tenuta-cattura.cjs) che scende dalla testata alle sale, e il bottone di WhatsApp. Le
// foto sono di «prime riprese e scatti», senza persone e senza il nome della festeggiata; nel sito il telefono non passa
// sulle feste, dove c'è la foto di un bambino, né sui musicisti con gli invitati. I tempi vengono dalla sua voce
// (scripts/pb-tenuta-voce.py).

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const T = voce as {
  durata: number;
  scene: Record<"drone" | "foto" | "drone2" | "logo" | "sito" | "whatsapp" | "finale", { da: number; a: number }>;
  movimenti: Record<"vetrina" | "sala" | "giardino" | "dettagli" | "whatsapp" | "lauree" | "logo", number>;
  blocchi: Blocco[];
  cta: { da: number; chiave: number };
};
export const DURATA_TENUTA = inFrame(T.durata);
const tratto = (s: { da: number; a: number }) => ({ from: inFrame(s.da), durationInFrames: inFrame(s.a) - inFrame(s.da) });
const ombra = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 52%, rgba(0,0,0,.4) 74%, rgba(0,0,0,.25) 100%)" }} />;
const ombraForte = <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 62%, rgba(0,0,0,.6) 76%, rgba(0,0,0,.7) 100%)" }} />;

// ---------- le foto delle sale, un mazzo che arriva veloce ----------
const FOTO: { file: string; ruota: number }[] = [
  { file: "DSC00751", ruota: -2.5 },
  { file: "DSC00739", ruota: 2 },
  { file: "DSC00742", ruota: -1.5 },
  { file: "DSC00708", ruota: 2.5 }, // la corona d'alloro, su «lauree»
  { file: "DSC00780", ruota: -2 },
  { file: "DSC00770", ruota: 1.5 },
];
const Mazzo: React.FC<{ arrivi: number[] }> = ({ arrivi }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Fondale luceY="40%" />
      {FOTO.map((f, i) => {
        const e = spring({ frame: frame - arrivi[i], fps: FPS, config: { damping: 17, stiffness: 190, mass: 0.7 } });
        if (frame < arrivi[i]) return null;
        const zoom = interpolate(frame, [arrivi[i], arrivi[i] + 60], [1.08, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        return (
          <div
            key={f.file}
            style={{
              position: "absolute", left: 70, top: 470, width: 940, height: 627, borderRadius: 20, overflow: "hidden",
              boxShadow: "0 40px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(238,235,218,.14)",
              translate: `0 ${(1 - e) * 900}px`, rotate: `${f.ruota * e}deg`,
            }}
          >
            <Img src={staticFile(`pb-tenuta/foto/${f.file}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", scale: `${zoom}` }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- il logo, che si disegna sul fondale ----------
// Il logo è la villa a linee d'oro della testata del sito (public/pb-tenuta/logo.png, fotografato a 12x). Il suo fondo
// scuro si vedeva come un rettangolo sul fondale, e la fusione «lighten» non lo toglieva: logo-linee.png è lo stesso
// logo fotografato da solo, dall'immagine della testata su una pagina vuota a sfondo trasparente: la villa a linee d'oro
// col suo interno scuro, e intorno niente.
const Logo: React.FC<{ passata: number }> = ({ passata }) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [4, 34], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const luce = interpolate(frame, [passata, passata + 10, passata + 30], [0, 1, 0.5], clamp);
  return (
    <AbsoluteFill>
      <Fondale luceY="42%" />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 260 }}>
        <Img
          src={staticFile("pb-tenuta/logo-linee.png")}
          style={{
            width: 780, clipPath: `inset(-5% ${(1 - k) * 100}% -5% -5%)`,
            scale: `${0.96 + 0.04 * k}`, filter: `drop-shadow(0 0 ${18 * luce}px rgba(218,199,171,${0.5 * luce}))`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- il sito da telefono, grande ----------
const LARGO = 580;
const M = misure(LARGO);
const SINISTRA = (1080 - LARGO) / 2;
const ALTO = 100;
const K = M.schermo / 390; // pixel per punto della pagina
const yNelQuadro = (puntoPagina: number, alto: number) => ALTO + M.bordo + M.barra + (puntoPagina - alto) * K;

const Sito: React.FC<{ tappe: [number, number][]; zoom: { da: number; a: number; punto: number; alto: number; scala: number }[]; tocco?: { f: number; punto: number; alto: number } }> = ({ tappe, zoom, tocco }) => {
  const frame = useCurrentFrame();
  const entra = spring({ frame, fps: FPS, config: { damping: 18, stiffness: 150, mass: 0.8 } });
  let y = tappe[0][1];
  for (let i = 1; i < tappe.length; i++) {
    const [f0, y0] = tappe[i - 1];
    const [f1, y1] = tappe[i];
    if (frame >= f0) y = interpolate(frame, [f0, f1], [y0, y1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  }
  let scala = 1;
  let origine = 540;
  for (const z of zoom) {
    const v = interpolate(frame, [z.da, z.da + 14], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) }) *
      interpolate(frame, [z.a, z.a + 14], [1, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
    if (v > 0) { scala = 1 + (z.scala - 1) * v; origine = yNelQuadro(z.punto, z.alto); }
  }
  const t = tocco ? interpolate(frame, [tocco.f, tocco.f + 18], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill>
      <Fondale luceY="38%" />
      <AbsoluteFill style={{ scale: `${scala}`, transformOrigin: `540px ${origine}px` }}>
        <div style={{ position: "absolute", left: SINISTRA, top: ALTO, translate: `0 ${(1 - entra) * 120}px`, opacity: Math.min(1, entra * 1.4) }}>
          <Telefono larghezza={LARGO}>
            <div style={{ position: "relative", width: M.schermo, translate: `0 ${-y * K}px` }}>
              <Img src={staticFile("pb-tenuta/sito-m.jpg")} style={{ width: M.schermo, display: "block" }} />
            </div>
          </Telefono>
        </div>
        {tocco && t > 0 && t < 1 ? (
          <div style={{ position: "absolute", left: 540 - 60, top: yNelQuadro(tocco.punto, tocco.alto) - 60, width: 120, height: 120, borderRadius: 999,
            border: "3px solid rgba(238,235,218,.9)", scale: `${0.3 + 0.9 * t}`, opacity: 1 - t }} />
        ) : null}
      </AbsoluteFill>
      {ombraForte}
    </AbsoluteFill>
  );
};

export const ReelTenuta: React.FC = () => {
  const s = Object.fromEntries(Object.entries(T.scene).map(([k, v]) => [k, tratto(v)])) as Record<keyof typeof T.scene, ReturnType<typeof tratto>>;
  const mv = T.movimenti;
  const CARTELLA = "pb-tenuta/seg";
  const taglio = inFrame(T.blocchi.find((b) => b.testo.startsWith("una dimora"))!.da);
  // le foto: una per battuta del parlato, e la corona d'alloro su «lauree»
  const bf = T.blocchi.filter((b) => b.da >= T.scene.foto.da && b.da < T.scene.foto.a).map((b) => inFrame(b.da) - s.foto.from);
  const arrivi = [0, bf[1], bf[2], inFrame(mv.lauree + 0.45) - s.foto.from, bf[4], bf[4] + 22];
  // il sito e WhatsApp sono una scena sola, il telefono resta in mano
  const sito0 = s.sito.from;
  const f = (sec: number) => inFrame(sec) - sito0;
  const wa = inFrame(T.scene.whatsapp.da) - sito0;
  const tappe: [number, number][] = [
    [0, 0], [f(mv.sala), 0], [f(mv.sala) + 22, 4480], [f(mv.giardino), 4480], [f(mv.giardino) + 20, 4960],
    [f(mv.dettagli), 4960], [f(mv.dettagli) + 20, 5250], [wa, 5250], [wa + 22, 9120],
  ];
  const zoom = [
    { da: f(mv.vetrina), a: f(mv.sala) - 6, punto: 330, alto: 0, scala: 1.35 }, // il titolo in testata, su «vetrina»
    { da: f(mv.whatsapp) - 4, a: inFrame(T.cta.da) - sito0 - 4, punto: 9490, alto: 9120, scala: 1.5 }, // il bottone di WhatsApp
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* L'apertura, rifatta dopo la prima versione: Emanuele non voleva il primo drone, «si muove strano e inquadra una
          parte bruttina». Ha girato due riprese nuove il 18/09 (riprese-drone/new): si parte dall'alto, la villa dritta
          sotto in mezzo al giardino, e su «una dimora del '700» si taglia sulla facciata fra i pini. */}
      <Sequence from={s.drone.from} durationInFrames={taglio - s.drone.from}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "drone-alto", frames: taglio - s.drone.from }]} frames={taglio - s.drone.from} spinta={1.06} centro={[540, 960]} />
        {ombra}
      </Sequence>
      <Sequence from={taglio} durationInFrames={s.drone.from + s.drone.durationInFrames - taglio}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "drone-pini", frames: s.drone.from + s.drone.durationInFrames - taglio }]} frames={s.drone.from + s.drone.durationInFrames - taglio} apertura={1.08} centro={[540, 900]} />
        {ombra}
      </Sequence>
      <Sequence {...s.foto}>
        <Mazzo arrivi={arrivi} />
        {ombraForte}
      </Sequence>
      <Sequence {...s.drone2}>
        <Pov cartella={CARTELLA} spezzoni={[{ file: "drone2", frames: s.drone2.durationInFrames }]} frames={s.drone2.durationInFrames} spinta={1.05} centro={[540, 900]} />
        {ombra}
      </Sequence>
      <Sequence {...s.logo}>
        <Logo passata={inFrame(mv.logo) - s.logo.from} />
      </Sequence>
      <Sequence from={s.sito.from} durationInFrames={s.sito.durationInFrames + s.whatsapp.durationInFrames}>
        <Sito tappe={tappe} zoom={zoom} tocco={{ f: f(mv.whatsapp) + 6, punto: 9490, alto: 9120 }} />
      </Sequence>
      <Sequence {...s.finale}>
        {/* la chiusura, rifatta anche lei: una ripresa sola e più lontana, dal fianco della villa ai campi col Vesuvio */}
        <Pov cartella={CARTELLA} spezzoni={[{ file: "finale", frames: s.finale.durationInFrames }]} frames={s.finale.durationInFrames} spinta={1.04} centro={[540, 900]} />
        <FinaleCta passata={inFrame(T.cta.chiave) - inFrame(T.cta.da)} righe={["Conosci altre location", "per eventi?"]} chiave="Mandagli questo video." />
      </Sequence>
      <Sottotitoli blocchi={T.blocchi} />
      <Audio src={staticFile("pb-tenuta/voce.wav")} />
    </AbsoluteFill>
  );
};

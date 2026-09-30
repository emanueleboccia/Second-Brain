import { AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import "./font";
import { ARCHIVO, CREMA, OMBRA } from "./font";
import { Foglio, Schede, Totali } from "./Illustrazioni";
import { Pov } from "./Scene";
import spezzoni from "./spezzoni.json";
import { Passata, Sottotitoli } from "./Sottotitoli";
import { CTA, SCENE_A_TEMPO, scena } from "./testo";

// Il reel del Girarrosto per il personal brand, seconda versione del 29/09/2026, con le regole
// decise con Emanuele sul reel di riferimento di synsation_: la soggettiva muta coi Ray-Ban al
// posto della persona in camera, le illustrazioni che si muovono, un taglio ogni due secondi, i
// sottotitoli a blocchi brevi senza riquadri e la parola chiave sulla passata crema. Niente nome
// fisso in alto. Dal 30/09 c'è la voce fuori campo di Emanuele, e i tempi di tutto il reel vengono da lei
// (testo.ts e scripts/pb-girarrosto-voce.py). Gli effetti si mettono dopo il render, con scripts/pb-girarrosto-suono.py.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const FR = spezzoni as Record<string, { fotogrammi: number }>;
const f = (id: string) => FR[id].fotogrammi;
const locali = (id: Parameters<typeof scena>[0]) => {
  const s = scena(id);
  return s.blocchiATempo.map((b) => b.da - s.inizio);
};

// La frase della bio, sull'ultima inquadratura, quando la voce ha finito. La usano anche gli altri reel del
// personal brand: la chiusura è sempre questa (docs/procedure/reel-personal-brand.md).
export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.45) 100%)", opacity: e }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
        <div style={{ textAlign: "center", opacity: e, translate: `0 ${(1 - e) * 14}px` }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 62, lineHeight: 1.12, color: CREMA, textShadow: OMBRA }}>
            Il lavoro che ti pesa
            <br />
            non si organizza.
          </div>
          <div style={{ marginTop: 10 }}>
            <Passata testo="Si toglie." da={10} grande />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// La chiusura sull'ultima inquadratura. Fino alla v4 era la frase della bio; dal copione del 30/09/2026 sera è la CTA,
// scelta da Emanuele fra quattro: «Tieni un amico che fa ancora i conti a mente? Mandagli questo video.», scritta
// mentre lui la dice, con la passata che entra su «Mandagli».
// Le righe e la parte sulla passata cambiano da un reel all'altro: Room84 la usa con le sue.
export const FinaleCta: React.FC<{ passata: number; righe?: string[]; chiave?: string }> = ({
  passata,
  righe = ["Tieni un amico che fa ancora", "i conti a mente?"],
  chiave = "Mandagli questo video.",
}) => {
  const frame = useCurrentFrame();
  const e = interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.55) 100%)", opacity: e }} />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
        <div style={{ textAlign: "center", opacity: e, translate: `0 ${(1 - e) * 14}px` }}>
          <div style={{ fontFamily: ARCHIVO, fontWeight: 700, fontSize: 60, lineHeight: 1.14, color: CREMA, textShadow: OMBRA }}>
            {righe.map((r, i) => (
              <div key={i}>{r}</div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <Passata testo={chiave} da={passata} dimensione={62} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ReelGirarrosto: React.FC = () => {
  const s = Object.fromEntries(SCENE_A_TEMPO.map((x) => [x.id, x]));
  const bFoglioPov = locali("foglio-pov");
  const bTelefono = locali("telefono");
  const bArrivo = locali("arrivo");
  const telefonoA = s.telefono.frames - f("telefono-b");
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={s["foglio-pov"].inizio} durationInFrames={s["foglio-pov"].frames}>
        <Pov spezzoni={[{ file: "foglio", frames: s["foglio-pov"].frames }]} apertura={1.14} zoom={[[bFoglioPov[3], 1.1]]} frames={s["foglio-pov"].frames} centro={[520, 1180]} />
      </Sequence>
      <Sequence from={s.foglio.inizio} durationInFrames={s.foglio.frames}>
        <Foglio blocchi={locali("foglio")} />
      </Sequence>
      <Sequence from={s.telefono.inizio} durationInFrames={s.telefono.frames}>
        <Pov spezzoni={[{ file: "telefono-a", frames: telefonoA }, { file: "telefono-b", frames: f("telefono-b") }]}
          zoom={[[telefonoA, 1.12], [bTelefono[3], 1.06]]} frames={s.telefono.frames} centro={[560, 820]} />
      </Sequence>
      <Sequence from={s.arrivo.inizio} durationInFrames={s.arrivo.frames}>
        <Pov spezzoni={[{ file: "arrivo", frames: s.arrivo.frames }]} zoom={[[bArrivo[2], 1.1]]} frames={s.arrivo.frames} centro={[540, 900]} />
      </Sequence>
      <Sequence from={s.schede.inizio} durationInFrames={s.schede.frames}>
        <Schede blocchi={locali("schede")} />
      </Sequence>
      <Sequence from={s.ipad.inizio} durationInFrames={f("ipad")}>
        <Pov spezzoni={[{ file: "ipad", frames: f("ipad") }]} apertura={1.08} frames={f("ipad")} centro={[540, 1200]} />
      </Sequence>
      <Sequence from={s.ipad.inizio + f("ipad")} durationInFrames={s.ipad.frames - f("ipad")}>
        <Totali />
      </Sequence>
      <Sequence from={s.servizio.inizio} durationInFrames={s.servizio.frames}>
        <Pov spezzoni={[{ file: "servizio", frames: s.servizio.frames }]} spinta={1.07} frames={s.servizio.frames} centro={[640, 700]} />
      </Sequence>
      <Sottotitoli />
      <Audio src={staticFile("pb-girarrosto/voce.wav")} />
      <Sequence from={s.servizio.fineVoce} durationInFrames={s.servizio.inizio + s.servizio.frames - s.servizio.fineVoce}>
        <FinaleCta passata={CTA.chiave - CTA.da} />
      </Sequence>
    </AbsoluteFill>
  );
};

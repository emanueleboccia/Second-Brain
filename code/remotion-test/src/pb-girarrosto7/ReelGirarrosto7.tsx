import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Contatore, FoglioCamera, SchedeGrandi, TotaliGrandi } from "../pb-girarrosto6/Illustrazioni";
import { Pov } from "../pb-girarrosto6/Scene";
import { Cancella, Fila, Modifica, Prezzo, Pronto, Ricerca, Secolo } from "./Illustrazioni";
import { FinaleCta, Sottotitoli, TitoloGrande } from "./Testi";
import { CTA, locali, scena } from "./testo";

// La v7 del reel del Girarrosto (03/10/2026), sul copione che dà più valore all'app: nel prima, oltre ai conti a
// mente, la fila, i fogli da rileggere, l'ordine che cambia e i pezzi della giornata; nel dopo, la risposta a ognuno,
// nello stesso ordine, più il prezzo che cambia anche sul sito. Stampo, fondale scuro e riprese sono quelli della v6
// (`../pb-girarrosto6/`), e gli spezzoni stanno in `public/pb-girarrosto6/seg`.

export const ReelGirarrosto7: React.FC = () => {
  const S = Object.fromEntries((["apertura", "telefono", "foglio", "fila", "conti", "pronto", "cambia", "pezzi", "secolo", "arrivo", "schede",
    "cerca", "modifica", "ipad", "prezzo", "servizio"] as const).map((k) => [k, scena(k)]));
  const L = Object.fromEntries((["telefono", "foglio", "fila", "pronto", "cambia", "secolo", "arrivo", "schede", "cerca", "modifica", "ipad", "prezzo", "servizio"] as const)
    .map((k) => [k, locali(k)]));
  const seq = (k: keyof typeof S, el: React.ReactNode) => <Sequence from={S[k].inizio} durationInFrames={S[k].frames}>{el}</Sequence>;
  const tel = S.telefono, fog = S.foglio, ser = S.servizio, ipd = S.ipad, arr = S.arrivo;

  const tempiFoglio = {
    cognome: L.telefono[1], evidenziatore: L.telefono[2],
    giallo: tel.frames + L.foglio[0], arancione: tel.frames + L.foglio[1], verde: tel.frames + L.foglio[2],
    fine: tel.frames + fog.frames,
  };
  const evid = L.telefono[2];
  const ipad = L.ipad[2];
  const statoGrande = ser.inizio + L.servizio[2];
  const nascosti: [number, number][] = [[statoGrande, ser.inizio + ser.frames]];
  const sch = L.schede;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* il prima */}
      {seq("apertura", <>
        <Pov frames={S.apertura.frames} apertura={1.14} centro={[520, 1180]}
          spezzoni={[{ file: "foglio", frames: 62 }, { file: "telefono-a", frames: 62 }, { file: "evid-arancio", frames: S.apertura.frames - 124 }]}
          zoom={[[62, 1.0], [92, 1.1], [124, 0.93], [150, 1.12]]} />
        <TitoloGrande riga="120 ordini" chiave="scritti a mano" da={3} />
      </>)}
      <Sequence from={tel.inizio} durationInFrames={evid}><FoglioCamera t={tempiFoglio} /></Sequence>
      <Sequence from={tel.inizio + evid} durationInFrames={tel.frames - evid}>
        <Pov frames={tel.frames - evid} apertura={1.1} centro={[420, 1100]} spezzoni={[{ file: "evid-giallo", frames: tel.frames - evid }]} />
      </Sequence>
      {seq("foglio", <FoglioCamera t={tempiFoglio} offset={tel.frames} />)}
      {seq("fila", <Fila b={L.fila} />)}
      {seq("conti", <Contatore />)}
      {seq("pronto", <Pronto b={L.pronto} />)}
      {seq("cambia", <Cancella b={L.cambia} />)}
      {seq("pezzi", <Pov frames={S.pezzi.frames} apertura={1.1} centro={[480, 900]}
        spezzoni={[{ file: "spiedo-lato", frames: 54 }, { file: "spiedo", frames: S.pezzi.frames - 54 }]} zoom={[[54, 0.94], [74, 1.1]]} />)}

      {/* come ci ho lavorato */}
      {seq("secolo", <Secolo b={L.secolo} frames={S.secolo.frames} />)}
      {seq("arrivo", <Pov frames={arr.frames} centro={[540, 900]}
        spezzoni={[{ file: "arrivo", frames: L.arrivo[2] }, { file: "foglio", frames: arr.frames - L.arrivo[2], da: 70 }]}
        zoom={[[L.arrivo[1], 1.1], [L.arrivo[2], 0.93]]} />)}

      {/* il dopo: una risposta per ogni problema, nello stesso ordine */}
      {seq("schede", <SchedeGrandi blocchi={[sch[0], sch[1], sch[2], sch[2] + 14, sch[4], sch[4] + 16]} veloce={sch[2]} />)}
      {seq("cerca", <Ricerca b={L.cerca} />)}
      {seq("modifica", <Modifica b={L.modifica} />)}
      <Sequence from={ipd.inizio} durationInFrames={ipad}>
        <Pov frames={ipad} apertura={1.12} centro={[540, 1200]} spezzoni={[{ file: "ipad", frames: ipad }]} />
      </Sequence>
      <Sequence from={ipd.inizio + ipad} durationInFrames={ipd.frames - ipad}><TotaliGrandi /></Sequence>
      {seq("prezzo", <Prezzo b={L.prezzo} />)}

      {/* Marco ai polli, la frase grande, la CTA su due inquadrature */}
      {seq("servizio", <Pov frames={ser.frames} centro={[600, 800]}
        spezzoni={[{ file: "spiedo-vicino", frames: L.servizio[2] }, { file: "servizio", frames: 120 }, { file: "spiedo", frames: ser.frames - L.servizio[2] - 120, da: 45 }]}
        zoom={[[L.servizio[1], 1.08], [L.servizio[2], 0.93], [L.servizio[2] + 120, 1.0]]} />)}
      <Sequence from={statoGrande} durationInFrames={CTA.da - statoGrande}>
        <TitoloGrande riga="Ai conti" chiave="ci pensa l'app" corpo={150} alto={330} />
      </Sequence>
      <Sequence from={CTA.da} durationInFrames={ser.inizio + ser.frames - CTA.da}>
        <FinaleCta passata={CTA.chiave - CTA.da} />
      </Sequence>

      <Sottotitoli chiaro={[]} nascosti={nascosti} />
      <Audio src={staticFile("pb-girarrosto7/voce.wav")} />
    </AbsoluteFill>
  );
};

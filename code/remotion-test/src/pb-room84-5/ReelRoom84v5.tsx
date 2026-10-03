import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Booking, Calendario, Chiavi, Clip, Coppia, Domande, Foglio, Prezzo, Prima, Recensioni, Risultato, WhatsApp } from "./Illustrazioni";
import { FinaleCta, Sottotitoli, TitoloChiaro, TitoloGrande } from "./Testi";
import { CTA, locali, scena, type TipoScena } from "./testo";

// La v5 del reel di Room84 (03/10/2026), sullo stampo del Girarrosto v7 e nella scala chiara. ⚠️ Nelle clip finali non
// c'è la modella dei video del cliente: Emanuele, sulla prima versione, «un po' volgare». Restano la vasca vuota e la targa. Il prima è la scritta in
// alto del sito vecchio e le tre cose che vuole sapere chi prenota; il dopo risponde a ognuna col sito vivo: com'è la
// camera (la scritta nuova, le due chiavi col video), se è libera (il calendario, che legge Booking da solo), quanto
// costa (WhatsApp col messaggio già scritto, Booking con le date già messe), e la prova (9,8 su 40).

const ID: TipoScena[] = ["apertura", "prima", "domande", "carta", "foglio", "risultato", "chiavi", "date", "booking", "whatsapp", "prezzo", "recensioni", "finale"];

export const ReelRoom84v5: React.FC = () => {
  const S = Object.fromEntries(ID.map((k) => [k, scena(k)])) as Record<TipoScena, ReturnType<typeof scena>>;
  const L = Object.fromEntries(ID.map((k) => [k, locali(k)])) as Record<TipoScena, number[]>;
  const seq = (k: TipoScena, el: React.ReactNode) => <Sequence from={S[k].inizio} durationInFrames={S[k].frames}>{el}</Sequence>;
  const ap = S.apertura, ca = S.carta, fi = S.finale;
  const bA = L.apertura, bF = L.finale;
  const pure = fi.inizio + bF[2]; // «Mo' pure il sito»
  // in chiaro tutte le scene coi mockup; sui video i sottotitoli restano crema
  const video: [number, number][] = [[ap.inizio, ap.inizio + ap.frames], [ca.inizio, ca.inizio + ca.frames], [fi.inizio, pure], [CTA.da, fi.inizio + fi.frames]];
  const chiaro: [number, number][] = [[0, fi.inizio + fi.frames]].flatMap(([a, z]) => {
    // il tutto meno i tratti di video
    const pezzi: [number, number][] = [];
    let da = a;
    for (const [v0, v1] of video) { if (v0 > da) pezzi.push([da, v0]); da = Math.max(da, v1); }
    if (da < z) pezzi.push([da, z]);
    return pezzi;
  });
  // dove la frase è già scritta nel telefono, grande, il sottotitolo sparisce: le due scritte in alto dei due siti
  const blocco = (k: TipoScena, i: number) => { const s = S[k]; return [s.inizio + s.blocchiATempo[i].da - s.inizio, s.blocchiATempo[i].a] as [number, number]; };
  // la scritta di prima ora si legge anche nel sottotitolo: Emanuele l'aveva trovato «buggato» senza
  const nascosti: [number, number][] = [[pure, CTA.da], blocco("risultato", 2)];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* l'apertura: le due spa, e il titolo */}
      {seq("apertura", <>
        <Sequence durationInFrames={bA[2]}><Clip file="pb-room84-5/seg/porta.mp4" zoom={[1.08, 1]} frames={bA[2]} /></Sequence>
        <Sequence from={bA[2]} durationInFrames={bA[3] - bA[2]}><Clip file="pb-room84-5/seg/sauna.mp4" zoom={[1.12, 1.02]} frames={bA[3] - bA[2]} /></Sequence>
        <Sequence from={bA[3]} durationInFrames={ap.frames - bA[3]}><Clip file="pb-room84-5/seg/idro.mp4" zoom={[1.0, 1.1]} frames={ap.frames - bA[3]} /></Sequence>
        <TitoloGrande riga="Il sito di un B&B" chiave="prima e dopo" da={3} corpo={92} alto={230} />
      </>)}
      {seq("prima", <Prima b={L.prima} />)}
      {seq("domande", <Domande b={L.domande} />)}
      {seq("carta", <>
        <Sequence durationInFrames={L.carta[1]}><Clip file="pb-room84/seg/scrivania.mp4" zoom={[1.05, 1.12]} frames={L.carta[1]} /></Sequence>
        <Sequence from={L.carta[1]} durationInFrames={ca.frames - L.carta[1]}><Clip file="pb-room84/seg/scrive.mp4" zoom={[1.15, 1.05]} frames={ca.frames - L.carta[1]} centro="45% 60%" /></Sequence>
      </>)}
      {seq("foglio", <Foglio b={L.foglio} />)}
      {seq("risultato", <Risultato b={L.risultato} bFoglio={L.foglio} />)}
      {seq("chiavi", <Chiavi b={L.chiavi} />)}
      {seq("date", <Calendario b={L.date} />)}
      {seq("booking", <Booking b={L.booking} />)}
      {seq("whatsapp", <WhatsApp b={L.whatsapp} />)}
      {seq("prezzo", <Prezzo b={L.prezzo} />)}
      {seq("recensioni", <Recensioni b={L.recensioni} />)}
      {/* «Insomma, il posto era già bellissimo»: la vasca di sera; «Mo' pure il sito»: computer e telefono */}
      <Sequence from={fi.inizio} durationInFrames={pure - fi.inizio}>
        <Clip file="pb-room84-5/seg/vasca-vuota.mp4" zoom={[1.0, 1.1]} frames={pure - fi.inizio} />
      </Sequence>
      <Sequence from={pure} durationInFrames={CTA.da - pure}>
        <Coppia />
        <TitoloChiaro riga="Mo' pure" chiave="il sito" da={2} corpo={150} alto={170} />
      </Sequence>
      <Sequence from={CTA.da} durationInFrames={fi.inizio + fi.frames - CTA.da}>
        <Clip file="pb-room84-5/seg/targa.mp4" zoom={[1.0, 1.06]} frames={fi.inizio + fi.frames - CTA.da} centro="50% 0%" />
        <FinaleCta passata={CTA.chiave - CTA.da} scrim={0.8} />
      </Sequence>

      <Sottotitoli chiaro={chiaro} nascosti={nascosti} />
      <Audio src={staticFile("pb-room84-5/voce.wav")} />
    </AbsoluteFill>
  );
};

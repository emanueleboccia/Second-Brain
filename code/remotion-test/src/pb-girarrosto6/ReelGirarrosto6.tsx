import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Contatore, FoglioCamera, SchedeGrandi, TotaliGrandi } from "./Illustrazioni";
import { Pov } from "./Scene";
import { FinaleCta, Sottotitoli, TitoloGrande } from "./Testi";
import { CTA, locali, scena } from "./testo";

// La v6 del reel del Girarrosto, rifatta il 03/10/2026 dopo la revisione dei cinque reel
// (projects/personal-brand/revisione-reel.md), sulla voce nuova di Emanuele. Le regole nuove:
// - il problema scritto grande dal primo secondo, come la copertina di un carosello;
// - un'inquadratura nuova ogni due secondi circa, mai una ferma oltre i tre;
// - le illustrazioni del lavoro a tutto schermo sul fondale firma scuro, con una camera che si sposta (la prova in
//   chiaro non è piaciuta: la scala chiara è per un reel intero, quando il lavoro la chiama);
// - la frase finale grande, e la CTA su due inquadrature diverse.
// Gli effetti si mettono dopo il render, con scripts/pb-girarrosto6-suono.py.

export const ReelGirarrosto6: React.FC = () => {
  const ap = scena("apertura"), tel = scena("telefono"), fog = scena("foglio"), con = scena("conti");
  const arr = scena("arrivo"), sch = scena("schede"), ipd = scena("ipad"), ser = scena("servizio");
  const bTel = locali("telefono"), bFog = locali("foglio"), bArr = locali("arrivo"), bSch = locali("schede"), bIpd = locali("ipad"), bSer = locali("servizio");

  // il foglio è un'illustrazione sola, dal telefono ai colori, interrotta dalla soggettiva dell'evidenziatore
  const tempiFoglio = {
    cognome: bTel[1], evidenziatore: bTel[2],
    giallo: tel.frames + bFog[0], arancione: tel.frames + bFog[2], verde: tel.frames + bFog[4],
    fine: tel.frames + fog.frames,
  };
  const evid = bTel[2]; // «ed evidenziatore»: lì si vede l'evidenziatore vero
  const conti = 24; // il telefono vero per «E i conti», poi il contatore
  const ipad = bIpd[2]; // l'iPad vero fino a «devi preparare», poi i pezzi
  const statoGrande = ser.inizio + bSer[2]; // «e ai conti ci pensa l'applicazione», scritto grande
  const fineVoce = CTA.da;

  // In apertura il titolo grande e i sottotitoli stanno insieme, uno in alto e uno in basso: Emanuele, sulla prima
  // v6, «tutto il resto che dico non lo fai scrivere. Devi comunque seguire quello che dici nel video». Spariscono
  // solo sotto «Ai conti / ci pensa l'app», che è la frase stessa, e sotto la CTA, che ha le sue parole.
  const chiaro: [number, number][] = []; // tutto il reel è nella scala scura
  const nascosti: [number, number][] = [[statoGrande, ser.inizio + ser.frames]];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* 1 · l'apertura: tre riprese vere e il problema scritto grande */}
      <Sequence from={0} durationInFrames={ap.frames}>
        <Pov frames={ap.frames} apertura={1.14} centro={[520, 1180]}
          spezzoni={[{ file: "foglio", frames: 69 }, { file: "telefono-a", frames: 69 }, { file: "evid-arancio", frames: ap.frames - 138 }]}
          zoom={[[69, 1.0], [100, 1.1], [138, 0.93], [170, 1.12]]} />
        <TitoloGrande riga="120 ordini" chiave="su un foglio" da={3} />
      </Sequence>

      {/* 2 · il telefono e il foglio */}
      <Sequence from={tel.inizio} durationInFrames={evid}>
        <FoglioCamera t={tempiFoglio} />
      </Sequence>
      <Sequence from={tel.inizio + evid} durationInFrames={tel.frames - evid}>
        <Pov frames={tel.frames - evid} apertura={1.1} centro={[420, 1100]} spezzoni={[{ file: "evid-giallo", frames: tel.frames - evid }]} />
      </Sequence>
      <Sequence from={fog.inizio} durationInFrames={fog.frames}>
        <FoglioCamera t={tempiFoglio} offset={tel.frames} />
      </Sequence>

      {/* 3 · i conti a mente */}
      <Sequence from={con.inizio} durationInFrames={conti}>
        <Pov frames={conti} apertura={1.1} centro={[560, 820]} spezzoni={[{ file: "telefono-b", frames: conti }]} />
      </Sequence>
      <Sequence from={con.inizio + conti} durationInFrames={con.frames - conti}>
        <Contatore />
      </Sequence>

      {/* 4 · prima di costruire, li ho guardati lavorare */}
      <Sequence from={arr.inizio} durationInFrames={arr.frames}>
        <Pov frames={arr.frames} centro={[540, 900]}
          spezzoni={[{ file: "arrivo", frames: bArr[2] }, { file: "spiedo", frames: bArr[4] - bArr[2] }, { file: "foglio", frames: arr.frames - bArr[4], da: 70 }]}
          zoom={[[bArr[1], 1.1], [bArr[2], 0.91], [bArr[3], 1.08], [bArr[4], 0.93]]} />
      </Sequence>

      {/* 5 · l'app, uguale al foglio */}
      <Sequence from={sch.inizio} durationInFrames={sch.frames}>
        <SchedeGrandi blocchi={[bSch[0], bSch[1], bSch[2], bSch[4], bSch[5], bSch[6]]} veloce={bSch[3]} />
      </Sequence>

      {/* 6 · un tocco sull'iPad vero, poi i pezzi */}
      <Sequence from={ipd.inizio} durationInFrames={ipad}>
        <Pov frames={ipad} apertura={1.12} centro={[540, 1200]} spezzoni={[{ file: "ipad", frames: ipad }]} />
      </Sequence>
      <Sequence from={ipd.inizio + ipad} durationInFrames={ipd.frames - ipad}>
        <TotaliGrandi />
      </Sequence>

      {/* 7 · Marco ai polli, la frase grande, la CTA su due inquadrature */}
      <Sequence from={ser.inizio} durationInFrames={ser.frames}>
        <Pov frames={ser.frames} centro={[600, 800]}
          spezzoni={[{ file: "spiedo-vicino", frames: bSer[2] }, { file: "servizio", frames: 120 }, { file: "spiedo", frames: ser.frames - bSer[2] - 120, da: 45 }]}
          zoom={[[bSer[1], 1.08], [bSer[2], 0.93], [bSer[2] + 120, 1.0]]} />
      </Sequence>
      <Sequence from={statoGrande} durationInFrames={fineVoce - statoGrande}>
        <TitoloGrande riga="Ai conti" chiave="ci pensa l'app" corpo={150} alto={330} />
      </Sequence>
      <Sequence from={fineVoce} durationInFrames={ser.inizio + ser.frames - fineVoce}>
        <FinaleCta passata={CTA.chiave - CTA.da} />
      </Sequence>

      <Sottotitoli chiaro={chiaro} nascosti={nascosti} />
      <Audio src={staticFile("pb-girarrosto6/voce.wav")} />
    </AbsoluteFill>
  );
};

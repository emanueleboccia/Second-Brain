import { CalculateMetadataFunction, Composition } from "remotion";
import menu from "./data/menu.json";
import { DISTANZA, PAUSA, RIGA, TESTATA, type MenuProps } from "./menu";
import { MenuTv } from "./MenuTv";
import { Reel } from "./reel/Reel";
import { FPS, durataTotale } from "./reel/tempi";
import { ReelAmin } from "./amin/ReelAmin";
import { DURATA_TOTALE as durataAmin } from "./amin/tempi";
import { ReelGirarrosto } from "./pb-girarrosto/ReelGirarrosto";
import { DURATA as durataGirarrosto } from "./pb-girarrosto/testo";
import { ReelGirarrosto6 } from "./pb-girarrosto6/ReelGirarrosto6";
import { DURATA as durataGirarrosto6 } from "./pb-girarrosto6/testo";
import { ReelRoom84 } from "./pb-room84/ReelRoom84";
import { MUTO as ROOM84_MUTO, VOCE as ROOM84_VOCE } from "./pb-room84/testo";
import { DURATA3 as durataRoom84Semplice, DURATA_VOCE2, DURATA_VOCE3, ReelRoom84Semplice } from "./pb-room84/Semplice";
import { DURATA_VOCE4, ReelRoom84Voce4 } from "./pb-room84/Voce4";
import { DURATA_TENUTA, ReelTenuta } from "./pb-tenuta/ReelTenuta";
import { DURATA_DMR, ReelDmr } from "./pb-dmr/ReelDmr";
import { DURATA_MASSERIA, ReelMasseria } from "./pb-masseria/ReelMasseria";
import { ReelTdg } from "./tdg/ReelTdg";
import { REEL as REEL_TDG, durataTotale as durataTdg } from "./tdg/tempi";

// La durata segue il numero di piatti: se il JSON ne guadagna uno,
// il video si allunga da solo e non c'è niente da ricalcolare a mano.
const calcolaMetadati: CalculateMetadataFunction<MenuProps> = ({ props }) => {
  return {
    durationInFrames: TESTATA + props.piatti.length * DISTANZA + RIGA + PAUSA,
  };
};

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="MenuTv"
        component={MenuTv}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={menu satisfies MenuProps}
        calculateMetadata={calcolaMetadati}
      />
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={durataTotale}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="TdgDalCortileAiSaloni"
        component={ReelTdg}
        durationInFrames={durataTdg(REEL_TDG.cortile.segmenti)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ reel: "cortile" as const }}
      />
      <Composition
        id="TdgLeManiInCucina"
        component={ReelTdg}
        durationInFrames={durataTdg(REEL_TDG.cucina.segmenti)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ reel: "cucina" as const }}
      />
      <Composition
        id="ZuccheIlTourDiAmin"
        component={ReelAmin}
        durationInFrames={durataAmin}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbGirarrosto"
        component={ReelGirarrosto}
        durationInFrames={durataGirarrosto}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbGirarrosto6"
        component={ReelGirarrosto6}
        durationInFrames={durataGirarrosto6}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84"
        component={ReelRoom84}
        defaultProps={{ versione: "voce" as const }}
        durationInFrames={ROOM84_VOCE.durata}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84Semplice"
        component={ReelRoom84Semplice}
        durationInFrames={durataRoom84Semplice}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84Voce"
        component={ReelRoom84Semplice}
        defaultProps={{ versione: "voce" as const }}
        durationInFrames={DURATA_VOCE2}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84Voce3"
        component={ReelRoom84Semplice}
        defaultProps={{ versione: "voce3" as const }}
        durationInFrames={DURATA_VOCE3}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84Voce4"
        component={ReelRoom84Voce4}
        durationInFrames={DURATA_VOCE4}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbTenuta"
        component={ReelTenuta}
        durationInFrames={DURATA_TENUTA}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbDmr"
        component={ReelDmr}
        durationInFrames={DURATA_DMR}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbMasseria"
        component={ReelMasseria}
        durationInFrames={DURATA_MASSERIA}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PbRoom84Muto"
        component={ReelRoom84}
        defaultProps={{ versione: "muto" as const }}
        durationInFrames={ROOM84_MUTO.durata}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

import { CalculateMetadataFunction, Composition } from "remotion";
import menu from "./data/menu.json";
import { DISTANZA, PAUSA, RIGA, TESTATA, type MenuProps } from "./menu";
import { MenuTv } from "./MenuTv";
import { Reel } from "./reel/Reel";
import { FPS, durataTotale } from "./reel/tempi";

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
    </>
  );
};

import { AbsoluteFill, Sequence } from "remotion";
import { POSTILLA, TENTATIVI, TIMBRI } from "./battute";
import { Cartello } from "./Cartello";
import { Firma, Hook, Nome, Postilla, Tentativo, Timbro } from "./Grafiche";
import { Scena } from "./Scena";
import { Sottotitoli } from "./Sottotitoli";
import { Suoni } from "./Suoni";
import { DURATA_TOTALE, NOME_ENTRA, SCENE, TAPPE, frameDi, scena } from "./tempi";

// «Il tour di Amin»: Amin fa da guida a Zucche in Masseria, otto tappe in meno di un minuto, col suo
// accento. È intrattenimento con dentro tutto quello che si fa nel parco, e risponde al dolore di
// Valentina, «dove li porto questo weekend?». Struttura approvata da Emanuele il 27/09/2026:
// hook 0–3 s, le tappe col contatore, Fienopoli in tre tentativi a metà, la CTA, lo spritz in fondo.
// Sul grezzo ha chiesto le code più lunghe, dove la camera mostra quello che Amin nomina, anche
// nelle camminate, e «Bere spritz» il più divertente possibile: una volta sola, fatta bene, con lo
// zoom che sbatte e il boom. Dopo la prima versione ha voluto le prime quattro battute come le
// pronuncia Amin.

const fine = (id: string) => {
  const s = scena(id);
  return s.inizio + s.frames + s.fermo;
};

export const ReelAmin: React.FC = () => {
  const hook = scena("00-hook");
  const logo = frameDi("16-venite", 1.65);
  const spritz = scena("18-spritz");
  const finale = spritz.inizio + spritz.frames;
  const aspetto = scena("17-aspetto");
  const esce = aspetto.inizio + aspetto.frames - 5;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {SCENE.map((s) => (
        <Sequence key={s.id} name={s.id} from={s.inizio} durationInFrames={s.frames + s.fermo}>
          <Scena scena={s} />
        </Sequence>
      ))}

      <Sequence name="Hook" durationInFrames={hook.frames}>
        <Hook durata={hook.frames} />
      </Sequence>
      <Sequence name="Nome" from={NOME_ENTRA} durationInFrames={hook.frames - NOME_ENTRA}>
        <Nome durata={hook.frames - NOME_ENTRA} />
      </Sequence>

      {TAPPE.map((t) => {
        const primo = scena(t.scene[0]);
        const da = primo.inizio + 2;
        const a = fine(t.scene[t.scene.length - 1]);
        return (
          <Sequence key={t.numero} name={`Cartello ${t.numero}`} from={da} durationInFrames={a - da}>
            <Cartello tappa={t} durata={a - da} />
          </Sequence>
        );
      })}

      <Sottotitoli />

      {/* il tentativo resta a schermo fino al suo timbro: il secondo attraversa anche la risata */}
      {TENTATIVI.map((t, i) => {
        const da = frameDi(t.scena, t.t);
        const a = fine(TIMBRI[i].scena);
        return (
          <Sequence key={t.testo} name={`Tentativo ${i + 1}`} from={da} durationInFrames={a - da}>
            <Tentativo testo={t.testo} />
          </Sequence>
        );
      })}
      {TIMBRI.map((t) => {
        const s = scena(t.scena);
        return (
          <Sequence key={t.testo} name={`Timbro ${t.testo}`} from={s.inizio + s.frames} durationInFrames={s.fermo}>
            <Timbro testo={t.testo} esito={t.esito} />
          </Sequence>
        );
      })}

      <Sequence name="Firma" from={logo} durationInFrames={DURATA_TOTALE - logo}>
        <Firma esce={esce - logo} finale={finale - logo} />
      </Sequence>
      <Sequence name="Postilla" from={finale + 6} durationInFrames={DURATA_TOTALE - finale - 6}>
        <Postilla testo={POSTILLA} />
      </Sequence>

      <Suoni logo={logo} finale={finale} />
    </AbsoluteFill>
  );
};

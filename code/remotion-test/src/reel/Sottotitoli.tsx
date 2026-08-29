import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import type { Caption } from "@remotion/captions";

// Una parola per volta, sul fotogramma in cui viene pronunciata. La trascrizione
// di Whisper è già al livello della parola, quindi il sincrono non si stima: si
// legge da lì. Quello che va corretto è la durata, perché Whisper allunga un
// token per coprire una pausa e la parola resterebbe ferma a schermo per secondi.
const MIN = 0.1;
const MAX = 0.62;

const Parola: React.FC<{ testo: string }> = ({ testo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entra di scatto, con un filo di rimbalzo: è quello che dà il ritmo quando
  // le parole si susseguono a due o tre al secondo.
  const molla = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.42, stiffness: 220 },
    durationInFrames: 12,
  });
  const scala = interpolate(molla, [0, 1], [0.68, 1]);
  const salita = interpolate(molla, [0, 1], [26, 0]);

  // Le parole lunghe rimpiccioliscono, altrimenti escono dal fotogramma.
  const corpo = testo.length > 13 ? 74 : testo.length > 9 ? 88 : 104;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingLeft: 70,
        paddingRight: 70,
        paddingBottom: 390,
      }}
    >
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: corpo,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -2,
          textTransform: "uppercase",
          textAlign: "center",
          color: "#FFFFFF",
          textShadow:
            "0 8px 30px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.95), 0 0 2px rgba(0,0,0,0.9)",
          transform: `translateY(${salita}px) scale(${scala})`,
          opacity: interpolate(frame, [0, 2], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {testo}
      </div>
    </AbsoluteFill>
  );
};

export const Sottotitoli: React.FC<{ file: string }> = ({ file }) => {
  const { fps } = useVideoConfig();
  const [righe, setRighe] = useState<Caption[] | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [attesa] = useState(() => delayRender());

  const carica = useCallback(async () => {
    try {
      const risposta = await fetch(staticFile(file));
      setRighe(await risposta.json());
      continueRender(attesa);
    } catch (e) {
      cancelRender(e);
    }
  }, [file, attesa, continueRender, cancelRender]);

  useEffect(() => {
    carica();
  }, [carica]);

  const parole = useMemo(() => {
    if (!righe) {
      return [];
    }
    return righe
      .map((riga, i) => {
        const testo = riga.text.trim();
        const successiva = righe[i + 1];
        // La parola sta finché non parte la successiva, ma mai oltre MAX: se
        // Whisper l'ha stirata su una pausa, il video andrebbe avanti da solo
        // con una scritta ferma sopra.
        const finePossibile = successiva ? successiva.startMs : riga.endMs;
        const durataMs = Math.max(
          MIN * 1000,
          Math.min(MAX * 1000, finePossibile - riga.startMs),
        );
        return {
          testo,
          da: Math.round((riga.startMs / 1000) * fps),
          quanto: Math.max(3, Math.round((durataMs / 1000) * fps)),
        };
      })
      .filter((p) => p.testo.length > 0);
  }, [righe, fps]);

  if (!righe) {
    return null;
  }

  return (
    <AbsoluteFill>
      {parole.map((p, i) => (
        <Sequence key={`${p.da}-${i}`} from={p.da} durationInFrames={p.quanto}>
          <Parola testo={p.testo} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

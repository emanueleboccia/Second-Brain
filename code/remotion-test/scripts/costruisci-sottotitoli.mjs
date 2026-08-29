// Ritaglia dalla trascrizione integrale i sottotitoli di ogni segmento,
// riporta i tempi a zero e applica le correzioni: Whisper sbaglia i nomi propri
// e qualche parola, e quello che si legge a schermo deve essere giusto.

import fs from "fs";
import path from "path";

const SEGMENTI = JSON.parse(fs.readFileSync("src/data/segmenti.json", "utf8"));

const TRASCRIZIONE = {
  "IMG_7665.MOV": "public/captions/audio-7665.json",
  "IMG_7666.MOV": "public/captions/audio-7666.json",
};

// Correzioni per segmento: parola sbagliata → parola giusta, i tempi restano.
const CORREZIONI = {
  "s2-risposta": { evolve: "Sistema Evolve" },
  "s4-come-2": { eseguito: "seguito" },
};

for (const seg of SEGMENTI) {
  const tutte = JSON.parse(fs.readFileSync(TRASCRIZIONE[seg.sorgente], "utf8"));
  const daMs = seg.da * 1000;
  const aMs = (seg.da + seg.durata) * 1000;
  const correzioni = CORREZIONI[seg.id] ?? {};

  // Una parola a cavallo di un taglio finirebbe in tutti e due gli spezzoni e si
  // leggerebbe due volte. Si tiene dove ci sta davvero: almeno il 45% della sua
  // durata dentro il blocco, oppure almeno 0,30 s — che è la scappatoia per i
  // token che Whisper allunga su una pausa e che sono lunghi per finta.
  const dentro = tutte
    .filter((c) => {
      const sovrapposto = Math.min(c.endMs, aMs) - Math.max(c.startMs, daMs);
      if (sovrapposto <= 0) return false;
      return sovrapposto >= (c.endMs - c.startMs) * 0.45 || sovrapposto >= 300;
    })
    .map((c) => {
      const nudo = c.text.trim().toLowerCase().replace(/[.,?!]/g, "");
      const sostituto = correzioni[nudo];
      return {
        text: sostituto ? c.text.replace(new RegExp(nudo, "i"), sostituto) : c.text,
        startMs: Math.max(0, c.startMs - daMs),
        endMs: Math.min(seg.durata * 1000, c.endMs - daMs),
        timestampMs: c.timestampMs === null ? null : c.timestampMs - daMs,
        confidence: c.confidence,
      };
    });

  const dove = path.join("public", "captions", `${seg.id}.json`);
  fs.writeFileSync(dove, JSON.stringify(dentro, null, 2));
  console.log(`${seg.id}: ${dentro.length} parole → ${dove}`);
  console.log(`   "${dentro.map((c) => c.text).join("").trim()}"\n`);
}

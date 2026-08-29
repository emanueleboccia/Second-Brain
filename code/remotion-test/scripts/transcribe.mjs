// Trascrive le clip con Whisper in locale e scrive un JSON di sottotitoli per ognuna.
// Uso: node scripts/transcribe.mjs <cartella-con-i-wav>
// I wav si preparano con:  npx remotion ffmpeg -i clip.mov -map 0:1 -ar 16000 -ac 1 out.wav

import fs from "fs";
import path from "path";
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from "@remotion/install-whisper-cpp";

const MODELLO = "large-v3-turbo";
const VERSIONE = "1.7.4";
const casa = path.join(process.cwd(), "whisper.cpp");
const sorgente = process.argv[2];

if (!sorgente) {
  console.error("Manca la cartella dei wav.");
  process.exit(1);
}

await installWhisperCpp({ to: casa, version: VERSIONE, printOutput: true });
await downloadWhisperModel({ model: MODELLO, folder: casa, printOutput: true });

const wav = fs
  .readdirSync(sorgente)
  .filter((f) => f.endsWith(".wav"))
  .sort();

for (const file of wav) {
  const nome = path.basename(file, ".wav");
  console.log(`\n— trascrivo ${nome}`);

  const uscita = await transcribe({
    inputPath: path.join(sorgente, file),
    model: MODELLO,
    whisperPath: casa,
    whisperCppVersion: VERSIONE,
    language: "it",
    tokenLevelTimestamps: true,
    splitOnWord: true,
  });

  const { captions } = toCaptions({ whisperCppOutput: uscita });
  const destinazione = path.join("public", "captions", `${nome}.json`);
  fs.writeFileSync(destinazione, JSON.stringify(captions, null, 2));
  console.log(`  ${captions.length} parole → ${destinazione}`);

  const testo = captions.map((c) => c.text).join("");
  fs.writeFileSync(path.join("public", "captions", `${nome}.txt`), testo.trim());
}

console.log("\nFatto.");

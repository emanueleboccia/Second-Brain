// Caroselli d'esempio fatti da zero (29/09/2026): nessuna foto, solo grafiche disegnate, nello stile del
// reel, in due scale che si alternano come nel sito: la scura (fondale firma) e la chiara (fondo crema,
// testo nero, griglia leggera, niente bagliore, la passata che si ribalta). I testi vengono solo da cose
// già dette o approvate da Emanuele: self/reference/convinzioni.md e la home del sito.
//   node zero.mjs → out/zero-<carosello>-NN.png
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire('/Users/emanueleboccia/Second Brain/code/controllo-siti/package.json');
const puppeteer = require('puppeteer-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const qui = path.dirname(new URL(import.meta.url).pathname);
const FONT = '/Users/emanueleboccia/Second Brain/code/remotion-test/public/pb-girarrosto/font'; // i caratteri del brand, gli stessi del reel (fuori da git)
const dati = (f, tipo) => `data:${tipo};base64,` + fs.readFileSync(f).toString('base64');
const out = path.join(process.cwd(), 'out'); // i PNG escono nella cartella da cui si lancia, fuori dal vault
fs.mkdirSync(out, { recursive: true });

const css = `
@font-face { font-family:'Archivo'; font-weight:100 900; font-stretch:62% 125%; font-style:normal; src:url('${dati(FONT + '/archivo-latin-wdth-normal.woff2', 'font/woff2')}') format('woff2'); }
@font-face { font-family:'Mono'; font-weight:700; src:url('${dati(FONT + '/jetbrains-mono-latin-700-normal.woff2', 'font/woff2')}') format('woff2'); }
* { margin:0; padding:0; box-sizing:border-box; }
/* la scala scura è quella di sempre; la chiara ribalta i token come fa il sito con data-scala="chiara" */
.slide { --fondo:#0E0E0C; --testo:#EEEBDA; --forte:#FFFFFF; --spento:#75746A; --intermedio:#B5B2A4; --linea:#2A2A24; --card:#191915;
  --griglia:rgba(238,235,218,.055); --passata:#FCF0DD; --su-passata:#0E0E0C; --luce:218,199,171;
  position:relative; width:1080px; height:1350px; overflow:hidden; background:var(--fondo); color:var(--testo); font-family:'Archivo'; }
.slide.chiara { --fondo:#EEEBDA; --testo:#0E0E0C; --forte:#0E0E0C; --spento:#8C8A7C; --intermedio:#4A493F; --linea:#D8D3BE; --card:#E4E0CC;
  --griglia:#E2DEC9; --passata:#0E0E0C; --su-passata:#FCF0DD; }
.largo { width:2160px; }
.slide::before { content:''; position:absolute; inset:0; z-index:0;
  background-image: linear-gradient(var(--griglia) 1px, transparent 1px), linear-gradient(90deg, var(--griglia) 1px, transparent 1px);
  background-size:72px 72px; background-position:36px 36px;
  -webkit-mask-image: radial-gradient(ellipse 62% 52% at var(--lx,50%) var(--ly,52%), #000 0%, rgba(0,0,0,.35) 55%, transparent 80%); }
.slide:not(.chiara)::after { content:''; position:absolute; inset:0; z-index:0;
  background: radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,0,0,0) 38%, rgba(0,0,0,.5) 76%, #000 100%),
              radial-gradient(circle at var(--lx,50%) var(--ly,52%), rgba(var(--luce),.30) 0%, rgba(var(--luce),.12) 28%, rgba(var(--luce),0) 60%); }
.slide.chiara::before { -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 50%, #000 0%, rgba(0,0,0,.6) 60%, transparent 95%); }
.slide > * { position:absolute; z-index:1; }
.meta { top:64px; left:72px; right:72px; display:flex; justify-content:space-between; font-family:'Mono'; font-weight:700; font-size:22px;
  letter-spacing:.22em; text-transform:uppercase; color:var(--intermedio); }
.titolo { left:72px; right:72px; font-weight:900; font-stretch:125%; font-size:112px; line-height:.95; letter-spacing:-.02em; }
.testo { left:72px; right:110px; font-weight:700; font-size:56px; line-height:1.14; text-wrap:balance; }
.passata { position:relative; display:inline-block; padding:4px 20px 12px; margin-top:8px; color:var(--su-passata); font-weight:900; font-stretch:125%; }
.passata::before { content:''; position:absolute; inset:0; z-index:-1; background:var(--passata); border-radius:6px 14px 8px 12px / 12px 6px 14px 8px; rotate:-1.5deg; box-shadow:0 6px 22px rgba(0,0,0,.25); }
.passata span { position:relative; }
.etichetta { font-family:'Mono'; font-weight:700; font-size:21px; letter-spacing:.22em; text-transform:uppercase; color:var(--intermedio); }
.pillola { display:inline-block; background:var(--testo); color:var(--fondo); border-radius:999px; padding:22px 40px; font-weight:700; font-stretch:125%; font-size:32px; }
.riga-sottile { height:1px; background:var(--linea); }
/* le funzioni di un gestionale generico */
.griglia-funzioni { display:flex; flex-wrap:wrap; gap:12px; }
.funzione { font-family:'Mono'; font-weight:700; font-size:19px; letter-spacing:.06em; text-transform:uppercase; padding:12px 16px; border-radius:999px;
  border:1.5px solid var(--linea); color:var(--spento); }
.funzione.accesa { background:var(--testo); color:var(--fondo); border-color:var(--testo); }
/* una finestra di programma o di browser */
.finestra { border-radius:18px; overflow:hidden; background:var(--card); border:1.5px solid var(--linea); box-shadow:0 30px 70px rgba(0,0,0,.35); }
.finestra .barra { height:44px; display:flex; align-items:center; gap:9px; padding:0 18px; border-bottom:1.5px solid var(--linea); }
.finestra .barra i { width:12px; height:12px; border-radius:50%; background:var(--linea); display:block; }
.finestra .barra u { margin-left:14px; flex:1; height:22px; border-radius:999px; background:var(--linea); opacity:.6; display:block; }
`;

const P = (t) => `<span class="passata"><span>${t}</span></span>`;
const chiusura = (chiara, cta) => `
<section class="slide ${chiara ? 'chiara' : ''}" style="--ly:44%">
  <div class="titolo" style="top:300px;font-size:96px">Il lavoro<br>che ti pesa<br>non si<br>organizza.<br>${P('Si toglie.')}</div>
  <div class="riga-sottile" style="left:72px;right:72px;top:930px"></div>
  <div class="testo" style="top:975px;font-size:44px;color:var(--intermedio)">${cta}</div>
  <div style="left:72px;top:1165px"><span class="pillola">Scrivimi in direct</span></div>
  <div class="etichetta" style="left:72px;bottom:64px">Emanuele Boccia · siti e sistemi</div>
</section>`;

// le funzioni: tante, spente; tre accese sono quelle che usi
const FUNZIONI = ['Fatture', 'Preventivi', 'CRM', 'Magazzino', 'Agenda', 'Ticket', 'Report', 'Buste paga', 'Newsletter', 'Listini', 'Resi', 'Flotta',
  'Commesse', 'Timbrature', 'Cespiti', 'Fornitori', 'Ordini', 'Scadenzario', 'Documenti', 'Firme', 'Chat', 'Budget', 'Turni', 'Note spese',
  'Contratti', 'Sondaggi', 'Lotti', 'Provvigioni', 'Cassa', 'Campagne', 'Analisi', 'Progetti', 'Presenze', 'Rubrica', 'Moduli', 'Archivio'];
const ACCESE = new Set(['Fatture', 'Agenda', 'Ordini']);
const griglia = (larghezza, accese = true) => `<div class="griglia-funzioni" style="width:${larghezza}px">${FUNZIONI.map((f) =>
  `<span class="funzione ${accese && ACCESE.has(f) ? 'accesa' : ''}">${f}</span>`).join('')}</div>`;

// una finestra piena di menù: il programma che fa tutto
const finestraPiena = `<div class="finestra" style="width:936px;height:600px;--linea:rgba(238,235,218,.16);background:#1C1C17">
  <div class="barra"><i></i><i></i><i></i><u></u></div>
  <div style="display:flex;height:556px">
    <div style="width:210px;border-right:1.5px solid var(--linea);padding:18px;display:flex;flex-direction:column;gap:11px">
      ${Array.from({ length: 16 }, (_, i) => `<div style="height:14px;border-radius:7px;background:var(--linea);width:${60 + ((i * 37) % 40)}%"></div>`).join('')}
    </div>
    <div style="flex:1;padding:18px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;gap:8px">${Array.from({ length: 9 }, () => `<div style="flex:1;height:30px;border-radius:8px;border:1.5px solid var(--linea)"></div>`).join('')}</div>
      <div style="display:flex;gap:8px">${Array.from({ length: 14 }, () => `<div style="width:30px;height:30px;border-radius:7px;background:var(--linea)"></div>`).join('')}</div>
      ${Array.from({ length: 11 }, () => `<div style="display:flex;gap:10px">${Array.from({ length: 6 }, (_, j) => `<div style="flex:${j ? 1 : 2};height:18px;border-radius:5px;background:var(--linea);opacity:.7"></div>`).join('')}</div>`).join('')}
    </div>
  </div></div>`;

// un sito d'esempio: stesso aspetto, due modi di presentarsi
const sito = (titolo, sotto, bottone) => `<div class="finestra" style="width:440px;height:600px;background:#F7F4EA;border-color:#D8D3BE">
  <div class="barra" style="border-color:#D8D3BE"><i style="background:#D8D3BE"></i><i style="background:#D8D3BE"></i><i style="background:#D8D3BE"></i><u style="background:#D8D3BE"></u></div>
  <div style="height:250px;background:radial-gradient(circle at 30% 40%, #E9C9A8 0%, #D9A77F 35%, #B78762 70%, #8C6446 100%);position:relative">
    <div style="position:absolute;left:40px;top:40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.35)"></div>
    <div style="position:absolute;right:30px;bottom:30px;width:180px;height:80px;border-radius:40px;background:rgba(255,255,255,.25)"></div>
  </div>
  <div style="padding:26px 28px;display:flex;flex-direction:column;gap:14px">
    <div style="font-weight:800;font-size:31px;line-height:1.1;color:#1A1A16">${titolo}</div>
    <div style="font-weight:500;font-size:19px;line-height:1.35;color:#5E5C52">${sotto}</div>
    <div style="align-self:flex-start;margin-top:6px;background:#1A1A16;color:#F7F4EA;border-radius:999px;padding:12px 22px;font-weight:700;font-size:17px">${bottone}</div>
  </div></div>`;

// Niente icone a linea: il 29/09/2026 Emanuele le ha trovate «proprio brutte». Le illustrazioni sono schede,
// finestre e diagrammi, come nel resto dei caroselli.


// «Come lavoro» senza icone: la linea dei sei passi coi tre capitoli, la scheda delle domande, il sito che si
// costruisce con quello che resta intestato al cliente, e le modifiche dopo la consegna. Le parole vengono dai
// passi approvati della home.
const capitoli = `<svg style="left:0;top:640px" width="1080" height="420" viewBox="0 0 1080 330">
  <line x1="72" y1="80" x2="1008" y2="80" stroke="var(--linea)" stroke-width="3"/>
  <line x1="880" y1="80" x2="1070" y2="80" stroke="var(--testo)" stroke-width="3" stroke-dasharray="10 12" opacity=".45"/>
  ${[110, 260, 410, 560, 710, 860].map((x, i) => `<circle cx="${x}" cy="80" r="18" fill="var(--testo)"/>
    <text x="${x}" y="40" text-anchor="middle" font-family="Mono" font-weight="700" font-size="22" fill="var(--intermedio)">0${i + 1}</text>`).join('')}
  ${[[110, 410, 'Prima capisco'], [560, 710, 'Poi costruisco'], [860, 1000, 'Poi resto']].map(([a, b, t]) => `
    <path d="M${a} 140 v18 H${b} v-18" fill="none" stroke="var(--intermedio)" stroke-width="2.5" opacity=".7"/>
    <text x="${a}" y="200" font-family="Mono" font-weight="700" font-size="21" letter-spacing="4" fill="var(--testo)">${t.toUpperCase()}</text>`).join('')}
</svg>`;

const schedaDomande = `<div style="left:370px;top:840px;width:650px;rotate:2deg;background:var(--card);border:1.5px solid var(--linea);border-radius:24px;padding:34px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)">
  <div class="etichetta" style="margin-bottom:22px">Il primo incontro</div>
  ${[['01', 'Cosa ti pesa?'], ['02', 'Come lavorate adesso?'], ['03', 'Quando si può dire finito?']].map(([n, q], i) => `
    <div style="display:flex;gap:22px;align-items:baseline;padding:18px 0;${i ? 'border-top:1.5px solid var(--linea);' : ''}">
      <span style="font-family:'Mono';font-weight:700;font-size:24px;color:var(--intermedio)">${n}</span>
      <span style="font-weight:700;font-size:36px;line-height:1.15;white-space:nowrap">${q}</span></div>`).join('')}
</div>`;

const cantiere = `<div class="finestra" style="left:420px;top:800px;width:590px;height:420px;rotate:-1.5deg;--linea:rgba(238,235,218,.18);background:#1C1C17">
  <div class="barra"><i></i><i></i><i></i><u></u></div>
  <div style="padding:22px;display:flex;flex-direction:column;gap:16px">
    <div style="display:flex;justify-content:space-between"><div style="width:120px;height:18px;border-radius:9px;background:var(--testo);opacity:.8"></div>
      <div style="display:flex;gap:10px">${[1, 2, 3].map(() => '<div style="width:60px;height:14px;border-radius:7px;background:var(--linea)"></div>').join('')}</div></div>
    <div style="height:130px;border-radius:14px;background:linear-gradient(135deg, rgba(238,235,218,.28), rgba(238,235,218,.08))"></div>
    <div style="display:flex;gap:14px">
      <div style="flex:1;height:120px;border-radius:12px;background:rgba(238,235,218,.14)"></div>
      <div style="flex:1;height:120px;border-radius:12px;background:rgba(238,235,218,.14)"></div>
      <div style="flex:1;height:120px;border-radius:12px;border:2px dashed rgba(238,235,218,.35)"></div>
    </div>
  </div>
</div>
<div style="left:72px;top:980px;width:390px;rotate:2deg;background:var(--testo);color:var(--fondo);border-radius:22px;padding:28px 32px;box-shadow:0 30px 70px rgba(0,0,0,.5)">
  <div style="font-family:'Mono';font-weight:700;font-size:20px;letter-spacing:.2em;text-transform:uppercase;opacity:.7;margin-bottom:14px">Intestati a te</div>
  ${['Dominio', 'Accessi', 'Dati'].map((t) => `<div style="display:flex;gap:16px;align-items:center;font-weight:800;font-size:36px;padding:6px 0"><span style="font-family:'Mono';font-size:30px">✓</span>${t}</div>`).join('')}
</div>`;

const dopo = `<div style="left:72px;top:860px;right:72px">
  <div class="etichetta" style="margin-bottom:26px">Dopo la consegna</div>
  <div style="position:relative;padding-left:46px;display:flex;flex-direction:column;gap:22px">
    <div style="position:absolute;left:12px;top:10px;bottom:30px;border-left:3px dashed var(--linea)"></div>
    ${[['+', 'Una cosa da aggiungere', false], ['−', 'Una cosa da togliere', false], ['✓', "Fatto: l'abito veste", true]].map(([s, t, pieno]) => `
      <div style="position:relative;display:flex;gap:22px;align-items:center;width:${pieno ? 560 : 620}px;padding:22px 28px;border-radius:20px;
        ${pieno ? 'background:var(--testo);color:var(--fondo);' : 'background:var(--card);border:1.5px solid var(--linea);'}">
        <span style="position:absolute;left:-44px;width:22px;height:22px;border-radius:50%;background:var(--testo)"></span>
        <span style="font-family:'Mono';font-weight:700;font-size:34px;width:30px">${s}</span>
        <span style="font-weight:800;font-size:36px">${t}</span></div>`).join('')}
  </div>
</div>`;

const passo = (n, nome, capitolo, testo) => `
  <div style="display:flex;flex-direction:column;gap:14px">
    <div style="display:flex;align-items:baseline;gap:18px"><span style="font-family:'Mono';font-weight:700;font-size:30px;color:var(--intermedio)">${n}</span>
    <span style="font-weight:900;font-stretch:125%;font-size:46px">${nome}</span></div>
    <div class="etichetta">${capitolo}</div>
    <div style="font-weight:600;font-size:36px;line-height:1.3;color:var(--intermedio)">${testo}</div>
  </div>`;

// la linea dei passi attraversa le slide dalla 2 alla 4: una sola linea, spezzata solo dal bordo
const linea = (slide) => {
  const punti = [180, 540, 900]; // per slide
  const nomi = [['01', '02', '03'], ['04', '05'], ['06']][slide];
  return `<svg style="left:0;top:250px" width="1080" height="90">
    <line x1="0" y1="45" x2="1080" y2="45" stroke="var(--linea)" stroke-width="3"/>
    ${nomi.map((n, i) => `<circle cx="${punti[i]}" cy="45" r="16" fill="var(--testo)"/><text x="${punti[i]}" y="20" text-anchor="middle" font-family="Mono" font-weight="700" font-size="20" fill="var(--intermedio)">${n}</text>`).join('')}
  </svg>`;
};

const CAROSELLI = {
  'generico': [
    `<section class="slide" style="--ly:62%">
      <div class="meta"><span>Cosa penso · 01</span><span>Gestionali</span></div>
      <div class="titolo" style="top:190px">Quante funzioni<br>${P('usi davvero?')}</div>
      <div style="left:72px;top:600px">${griglia(936)}</div>
    </section>`,
    `<section class="slide" style="--ly:58%">
      <div class="meta"><span>Cosa penso · 01</span><span>Gestionali</span></div>
      <div class="testo" style="top:190px">Migliaia di funzioni, costruite su esigenze che non sono le tue.</div>
      <div style="left:72px;top:560px">${finestraPiena}</div>
    </section>`,
    `<section class="slide" style="--ly:55%">
      <div class="meta"><span>Cosa penso · 01</span><span>Gestionali</span></div>
      <div style="left:72px;top:170px;opacity:.55">${griglia(936, false)}</div>
      <div class="testo" style="top:760px">E il problema che hai davvero?</div>
      <div class="testo" style="top:930px">${P('Resta lì.')}</div>
      <svg style="left:620px;top:900px" width="360" height="260" viewBox="0 0 360 260" fill="none" stroke="#EEEBDA" stroke-width="3" stroke-dasharray="10 10"><rect x="20" y="20" width="320" height="220" rx="22"/></svg>
      <div class="etichetta" style="left:660px;top:1010px;color:var(--testo);width:280px;line-height:1.6">Il tuo<br>problema</div>
    </section>`,
    `<section class="slide" style="--ly:50%">
      <div class="meta"><span>Cosa penso · 01</span><span>Gestionali</span></div>
      <div class="titolo" style="top:300px;font-size:84px">Un gestionale<br>che non ti risolve<br>un problema<br>non è<br>uno strumento.<br>${P('È solo un costo.')}</div>
    </section>`,
    chiusura(false, 'Scrivimi il problema che il tuo gestionale non tocca.'),
  ],
  'bello': [
    `<section class="slide chiara">
      <div class="meta"><span>Cosa penso · 02</span><span>Siti</span></div>
      <div class="titolo" style="top:190px">Il tuo sito<br>è bello.<br>${P('Comunica?')}</div>
      <div style="left:320px;top:700px;rotate:3deg">${sito('Benvenuti nel nostro mondo.', 'Passione, qualità e tradizione dal 1998, per offrirvi il meglio.', 'Scopri di più')}</div>
    </section>`,
    `<section class="slide chiara">
      <div class="meta"><span>Cosa penso · 02</span><span>Siti</span></div>
      <div class="testo" style="top:180px">Due siti bellissimi. Uno dice cosa vendi, ${P("l'altro no.")}</div>
      <div style="left:72px;top:560px">${sito('Benvenuti nel nostro mondo.', 'Passione, qualità e tradizione dal 1998, per offrirvi il meglio.', 'Scopri di più')}</div>
      <div style="left:568px;top:560px">${sito('Il pranzo di lavoro in 20 minuti.', 'Il menù del giorno ti arriva su WhatsApp alle 11. Prenoti con un messaggio.', 'Scrivici su WhatsApp')}</div>
      <div class="etichetta" style="left:72px;top:1190px">Bello</div>
      <div class="etichetta" style="left:568px;top:1190px;color:var(--testo)">Bello, e dice cosa fa</div>
    </section>`,
    `<section class="slide chiara">
      <div class="meta"><span>Cosa penso · 02</span><span>Siti</span></div>
      <div class="testo" style="top:190px">Chi arriva sul tuo sito deve capire subito tre cose.</div>
      ${[['01', 'Cosa vendi.'], ['02', 'A chi.'], ['03', 'Cosa fare adesso.']].map(([n, t], i) => `
        <div class="riga-sottile" style="left:72px;right:72px;top:${560 + i * 190}px"></div>
        <div style="left:72px;top:${600 + i * 190}px;display:flex;gap:40px;align-items:baseline">
          <span style="font-family:'Mono';font-weight:700;font-size:34px;color:var(--intermedio)">${n}</span>
          <span style="font-weight:900;font-stretch:125%;font-size:66px">${t}</span></div>`).join('')}
      <div class="riga-sottile" style="left:72px;right:72px;top:1130px"></div>
    </section>`,
    `<section class="slide chiara">
      <div class="meta"><span>Cosa penso · 02</span><span>Siti</span></div>
      <div class="titolo" style="top:360px;font-size:76px;font-stretch:112%">Una cosa<br>bellissima<br>che comunica male<br>${P('non vale niente.')}</div>
    </section>`,
    chiusura(true, 'Il tuo sito è bello ma non ti porta richieste? Scrivimi.'),
  ],
  'come-lavoro': [
    `<section class="slide" style="--ly:60%">
      <div class="meta"><span>Come lavoro · 01</span><span>Sei passi</span></div>
      <div class="titolo" style="top:200px;font-size:76px">Prima capisco.<br>Poi costruisco.<br>${P('Poi resto.')}</div>
      ${capitoli}
    </section>`,
    `<section class="slide" style="--ly:50%">
      ${linea(0)}
      <div class="titolo" style="top:120px;font-size:84px">Prima capisco.</div>
      <div style="left:72px;right:72px;top:420px;display:flex;flex-direction:column;gap:60px">
        ${passo('01', 'Ascolto', 'Prima capisco', 'Mi racconti la tua attività e cosa ti pesa.')}
        ${passo('03', 'Sopralluogo', 'Prima capisco', 'Vengo da te e guardo come lavorate davvero.')}
      </div>
      ${schedaDomande}
    </section>`,
    `<section class="slide" style="--ly:50%">
      ${linea(1)}
      <div class="titolo" style="top:120px;font-size:84px">Poi costruisco.</div>
      <div style="left:72px;right:72px;top:420px;display:flex;flex-direction:column;gap:60px">
        ${passo('04', 'Costruzione', 'Poi costruisco', 'Le revisioni le facciamo in chiamata.')}
        ${passo('05', 'Consegna', 'Poi costruisco', 'Dominio, accessi e dati sono intestati a te.')}
      </div>
      ${cantiere}
    </section>`,
    `<section class="slide" style="--ly:50%">
      ${linea(2)}
      <div class="titolo" style="top:120px;font-size:84px">${P('Poi resto.')}</div>
      <div style="left:72px;right:72px;top:420px">${passo('06', 'Affiancamento', 'Poi resto', "Nei mesi dopo lo usate davvero, e viene fuori cosa aggiungere o togliere. Ci lavoro finché l'abito non&nbsp;vi&nbsp;veste.")}</div>
      ${dopo}
    </section>`,
    chiusura(false, 'Raccontami cosa ti pesa: la prima chiamata serve a capire se posso esserti utile.'),
  ],
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--font-render-hinting=none'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 2200, height: 1400, deviceScaleFactor: 1 });
  let tot = 0;
  for (const [nome, slides] of Object.entries(CAROSELLI)) {
    let n = 1;
    for (const html of slides) {
      await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body style="margin:0">${html}</body></html>`, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await new Promise((r) => setTimeout(r, 120));
      // le righe che finiscono con una o due parole sole: si segnalano
      const sole = await page.evaluate(() => {
        const avvisi = [];
        document.querySelectorAll('.testo, .titolo').forEach((el) => {
          const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const parole = [];
          for (let t = w.nextNode(); t; t = w.nextNode()) { const re = /\S+/g; let m; while ((m = re.exec(t.textContent))) { const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length); parole.push(Math.round(r.getBoundingClientRect().bottom / 30)); } }
          const righe = [...new Set(parole)]; if (righe.length > 1 && !el.innerHTML.includes('<br>')) { const u = parole.filter((p) => p === righe[righe.length - 1]).length; if (u <= 2) avvisi.push(el.textContent.slice(0, 50) + ' → ' + u); }
        });
        return avvisi;
      });
      sole.forEach((a) => console.warn('⚠️  ' + nome + ' ' + n + ': ' + a));
      await page.screenshot({ path: path.join(out, `zero-${nome}-${String(n).padStart(2, '0')}.png`), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
      n++; tot++;
    }
  }
  console.log(tot + ' slide');
} finally {
  await browser.close();
}

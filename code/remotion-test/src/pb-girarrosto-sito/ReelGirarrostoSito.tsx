import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import "../pb-girarrosto/font";
import { Pov } from "../pb-girarrosto6/Scene";
import { Prezzo } from "../pb-girarrosto7/Illustrazioni";
import { Pagamento, SitoTelefono, TelefonoFermo, WhatsAppOrdine } from "./Illustrazioni";
import { FinaleCtaMenu, Sottotitoli, TitoloGrande } from "./Testi";
import { CTA, locali, scena, type TipoScena } from "./testo";

// Il reel del sito menù del Girarrosto Liberti (03/10/2026): il carrello che manda l'ordine su WhatsApp, raccontato come
// una cosa in più del sito e non come un problema risolto, che è il reel dell'app. Fondale scuro e riprese sono quelli
// della v7 del Girarrosto (`public/pb-girarrosto6/seg`), in punti diversi; il sito è quello vero, da telefono.

const ID: TipoScena[] = ["apertura", "ritiro", "telefono", "menu", "carrello", "nome", "ordina", "whatsapp", "tutto", "saluto", "invio", "pagamento", "prezzo", "chiusa"];

export const ReelGirarrostoSito: React.FC = () => {
  const S = Object.fromEntries(ID.map((k) => [k, scena(k)])) as Record<TipoScena, ReturnType<typeof scena>>;
  const L = Object.fromEntries(ID.map((k) => [k, locali(k)])) as Record<TipoScena, number[]>;
  const seq = (k: TipoScena, el: React.ReactNode) => <Sequence from={S[k].inizio} durationInFrames={S[k].frames}>{el}</Sequence>;
  const ap = S.apertura, me = S.menu, wa = S.whatsapp, pr = S.prezzo, ch = S.chiusa;
  const sito = L.apertura[1]; // «ha il suo menù»: il telefono col sito

  // dal menù a «Ordina ora», in fotogrammi dall'inizio della scena del menù
  const da = (k: TipoScena) => S[k].inizio - me.inizio;
  const tempiSito = {
    sfogli: L.menu[1], tocchi: L.menu[2],
    crocche: da("carrello") + L.carrello[1], coca: da("carrello") + L.carrello[2], carrello: da("carrello") + L.carrello[3], totale: da("carrello") + L.carrello[4],
    nome: da("nome") + L.nome[0], oggi: da("nome") + L.nome[2], domani: da("nome") + L.nome[3], altro: da("nome") + L.nome[4],
    ordina: da("ordina") + L.ordina[0],
  };
  const fineSito = S.whatsapp.inizio - me.inizio;
  const dw = (k: TipoScena) => S[k].inizio - wa.inizio;
  const tempiChat = {
    gia: L.whatsapp[1],
    tutto: L.tutto.map((x) => x + dw("tutto")),
    saluto: L.saluto.map((x) => x + dw("saluto")),
    invio: L.invio.map((x) => x + dw("invio")),
  };
  const fineChat = S.pagamento.inizio - wa.inizio;
  // i prezzi: prima l'iPad di Marco, poi il pannello che cambia il prezzo e il menù del sito che lo segue
  const ipad = L.prezzo[1];
  const bPrezzo = [L.prezzo[2] - ipad - 14, L.prezzo[3] - ipad, L.prezzo[3] - ipad + 20];
  const titolo: [number, number] = [ch.inizio, CTA.da];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {seq("apertura", <>
        <Sequence durationInFrames={sito}>
          <Pov frames={sito} apertura={1.14} centro={[560, 1000]} spezzoni={[{ file: "spiedo-vicino", frames: sito, da: 20 }]} zoom={[[44, 1.08]]} />
          <TitoloGrande riga="Il menù" chiave="prende gli ordini" da={3} corpo={124} alto={240} />
        </Sequence>
        <Sequence from={sito} durationInFrames={ap.frames - sito}>
          <TelefonoFermo file="apertura.png" poi="ordina-bottone.png" cambio={L.apertura[2] - sito} />
        </Sequence>
      </>)}
      {seq("ritiro", <Pov frames={S.ritiro.frames} apertura={1.1} centro={[540, 900]} spezzoni={[{ file: "arrivo", frames: S.ritiro.frames, da: 30 }]} zoom={[[L.ritiro[1], 1.1]]} />)}
      {seq("telefono", <Pov frames={S.telefono.frames} apertura={1.1} centro={[620, 700]} spezzoni={[{ file: "telefono-a", frames: S.telefono.frames, da: 20 }]}
        zoom={[[L.telefono[1], 1.1], [L.telefono[2], 1.08]]} />)}
      <Sequence from={me.inizio} durationInFrames={fineSito}><SitoTelefono t={tempiSito} /></Sequence>
      <Sequence from={wa.inizio} durationInFrames={fineChat}><WhatsAppOrdine t={tempiChat} /></Sequence>
      {seq("pagamento", <Pagamento b={L.pagamento} />)}
      <Sequence from={pr.inizio} durationInFrames={ipad}>
        <Pov frames={ipad} apertura={1.12} centro={[540, 1200]} spezzoni={[{ file: "ipad", frames: ipad, da: 10 }]} />
      </Sequence>
      <Sequence from={pr.inizio + ipad} durationInFrames={pr.frames - ipad}><Prezzo b={bPrezzo} /></Sequence>
      {/* la frase grande e la CTA, su tre inquadrature */}
      <Sequence from={ch.inizio} durationInFrames={CTA.da - ch.inizio}>
        <Pov frames={CTA.da - ch.inizio} centro={[600, 800]} spezzoni={[{ file: "spiedo", frames: CTA.da - ch.inizio, da: 10 }]} zoom={[[40, 1.08]]} />
        <TitoloGrande riga="Prima si guardava" chiave="adesso si ordina" da={2} corpo={120} alto={260} />
      </Sequence>
      <Sequence from={CTA.da} durationInFrames={ch.inizio + ch.frames - CTA.da}>
        <Pov frames={ch.inizio + ch.frames - CTA.da} centro={[600, 800]}
          spezzoni={[{ file: "servizio", frames: CTA.chiave - CTA.da, da: 20 }, { file: "spiedo-lato", frames: 96, da: 10 },
            { file: "servizio", frames: ch.inizio + ch.frames - CTA.chiave - 96, da: 110 }]}
          zoom={[[CTA.chiave - CTA.da, 0.94], [CTA.chiave - CTA.da + 30, 1.06], [CTA.chiave - CTA.da + 96, 0.95]]} />
        <FinaleCtaMenu passata={CTA.chiave - CTA.da} dopo={CTA.dopo - CTA.da} />
      </Sequence>
      <Sottotitoli chiaro={[]} nascosti={[titolo, [CTA.da, ch.inizio + ch.frames]]} />
      <Audio src={staticFile("pb-girarrosto-sito/voce.wav")} />
    </AbsoluteFill>
  );
};

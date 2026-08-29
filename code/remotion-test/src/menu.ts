// I tipi del menù e i tempi dell'animazione.
// I contenuti veri stanno in `data/menu.json`: qui non si scrive nessun piatto.

export type Piatto = {
  nome: string;
  descrizione: string;
  prezzo: string;
};

export type MenuProps = {
  insegna: string;
  sottotitolo: string;
  valuta: string;
  piatti: Piatto[];
  piede: string;
};

// Tempi in frame, a 30 fps.
export const TESTATA = 34; // quando entra il primo piatto
export const DISTANZA = 22; // quanto passa fra un piatto e il successivo
export const RIGA = 30; // quanto dura l'entrata di una riga
export const PAUSA = 170; // quanto resta fermo prima di finire

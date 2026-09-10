-- Le tre tabelle sono quelle dell'analisi di Antonio, coi nomi che ha usato lui.
-- Se cambiano lì, cambiano qui: è l'unico posto dove sta la forma dei dati.

CREATE TABLE IF NOT EXISTS ARTICOLI (
  ID_Articolo      INTEGER PRIMARY KEY AUTOINCREMENT,
  Descrizione      TEXT    NOT NULL,
  Testo_Ingredienti TEXT   NOT NULL DEFAULT '',
  Giorni_Scadenza  INTEGER NOT NULL DEFAULT 0,
  Tara_Grammi      INTEGER NOT NULL DEFAULT 0,
  Prezzo_Kg        REAL,
  ID_Layout        INTEGER REFERENCES LAYOUT_ETICHETTE(ID_Layout),
  Prefisso_EAN     TEXT
);

CREATE TABLE IF NOT EXISTS LAYOUT_ETICHETTE (
  ID_Layout            INTEGER PRIMARY KEY AUTOINCREMENT,
  Nome_Template        TEXT NOT NULL,
  Codice_Sorgente_Raw  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS STORICO_PESATE (
  ID_Transazione INTEGER PRIMARY KEY AUTOINCREMENT,
  Timestamp      TEXT    NOT NULL,
  Operatore      TEXT    NOT NULL,
  ID_Articolo    INTEGER NOT NULL REFERENCES ARTICOLI(ID_Articolo),
  Lotto          TEXT    NOT NULL,
  Peso_Netto     REAL    NOT NULL
);

CREATE TABLE IF NOT EXISTS OPERATORI (
  ID_Operatore INTEGER PRIMARY KEY AUTOINCREMENT,
  Nome         TEXT NOT NULL
);

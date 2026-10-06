// Die eine Quelle für die Zuordnung Deutschschweizer Blatt ↔ französisches Blatt.
//
// Entscheid JVS (Remo, 06.10.2026): Eichel = Ecke, Rosen = Herz, Schellen = Kreuz,
// Schilten = Schaufel. Dieselbe Tafel steht in der App (jasstafel
// src/config/farbenZuordnung.ts) und in der Engine (jassai _FARBNAME).
//
// Jede Stelle im Code, die eine Farbe des einen Blatts in die des anderen
// übersetzt, liest von hier: Kartenbilder (jasskarten.ts), Farbwörter beim
// Blattwechsel (farbwoerter.ts), Symbol-Raster (TrumpffarbenSymbole.tsx),
// Zuordnungstabelle der Seite /jassen/ und die Taxonomie (jass-taxonomy.ts).
// Der Artikelbestand (jass-content-v2.json) nennt dieselbe Zuordnung im Text;
// farbwoerter-pruefen.ts hält Text und Tafel gleich.

export type FarbCode = 'E' | 'R' | 'S' | 'L';

export interface FarbPaar {
  /** Kennbuchstabe der Farbe, gleich in beiden Blättern. */
  code: FarbCode;
  /** Deutschschweizer Name, wie er im Text steht. */
  de: string;
  /** Dateiname der Deutschschweizer Bilder (/suits/, /cards/de/). */
  deDatei: string;
  /** Französisches Blatt, Schweizer Name. */
  fr: string;
  /** Mehrzahl nach Zahlwort («drei Ecken», «drei Kreuz»). */
  frMehrzahl: string;
  /** Dateiname der französischen Bilder (/suits/, /cards/fr/). */
  frDatei: string;
  /** Pfad des Farbartikels im französischen Blatt. */
  frPfad: string;
  /** Internationales Zeichen. */
  zeichen: string;
  /** Name auf Französisch. */
  francais: string;
  /** Name in Deutschland. */
  deutschland: string;
}

/** Reihenfolge = Reihenfolge der Deutschschweizer Spalten (Eichel, Rosen, Schellen, Schilten). */
export const FARBEN_ZUORDNUNG: ReadonlyArray<FarbPaar> = [
  {
    code: 'E',
    de: 'Eichel',
    deDatei: 'eichel',
    fr: 'Ecke',
    frMehrzahl: 'Ecken',
    frDatei: 'ecke',
    frPfad: '/begriffe/kartenbezeichnungen/ecke/',
    zeichen: '♦',
    francais: 'Carreau',
    deutschland: 'Karo',
  },
  {
    code: 'R',
    de: 'Rosen',
    deDatei: 'rosen',
    fr: 'Herz',
    frMehrzahl: 'Herz',
    frDatei: 'herz',
    frPfad: '/begriffe/kartenbezeichnungen/herz/',
    zeichen: '♥',
    francais: 'Cœur',
    deutschland: 'Herz',
  },
  {
    code: 'S',
    de: 'Schellen',
    deDatei: 'schellen',
    fr: 'Kreuz',
    frMehrzahl: 'Kreuz',
    frDatei: 'kreuz',
    frPfad: '/begriffe/kartenbezeichnungen/kreuz/',
    zeichen: '♣',
    francais: 'Trèfle',
    deutschland: 'Kreuz',
  },
  {
    code: 'L',
    de: 'Schilten',
    deDatei: 'schilten',
    fr: 'Schaufel',
    frMehrzahl: 'Schaufeln',
    frDatei: 'schaufel',
    frPfad: '/begriffe/kartenbezeichnungen/schaufel/',
    zeichen: '♠',
    francais: 'Pique',
    deutschland: 'Pik',
  },
];

/** Das Paar zu einem Deutschschweizer Farbnamen («Eichel» → Ecke). */
export function paarZuDe(de: string): FarbPaar {
  const paar = FARBEN_ZUORDNUNG.find((p) => p.de === de);
  if (!paar) throw new Error(`Unbekannte Farbe: ${de}`);
  return paar;
}

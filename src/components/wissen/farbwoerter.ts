// Die Farb- und Kartenwörter beim Wechsel aufs französische Blatt.
//
// Schaltet der Leser eine Kartenreihe auf «Französisch», wechseln in Artikeln,
// die es zulassen (metadata.farbwechsel === true), auch die Wörter im sichtbaren
// Text: Rosen wird zu Herz, der Under zum Buben, das Banner zur Zehn.
//
// Die Wörtertafel gehört dem SCHIEDSRICHTER (Tafel vom 16.08.2026); hier steht
// sie als Datenliste. Vier Blöcke, und ihre Reihenfolge ist Programm: zuerst die
// Verbindungen mit Bindestrich, dann deren Beugung mit Artikel (Nachtrag), dann
// die Wendungen mit Artikel (das Genus wechselt), zuletzt die nackten Wörter.
//
// Die Tafel trifft nur Grossschreibung mit Wortgrenze. Adressen, Karten-Slugs
// und Kennungen sind klein geschrieben und bleiben darum unberührt. Puur und
// Nell bleiben, das sind Jassnamen in beiden Blättern.

/** 1. Verbindungen (Bindestrich). `Eichel-` trifft jedes Eichel-Wort, `-Under` jedes …-Under. */
export const VERBINDUNGEN: ReadonlyArray<readonly [string, string]> = [
  ['Eichel-', 'Kreuz-'],
  ['Rosen-', 'Herz-'],
  ['Schellen-', 'Ecke-'],
  ['Schilten-', 'Schaufel-'],
  ['-Under', '-Bube'],
  ['-Ober', '-Dame'],
  ['-Banner', '-Zehn'],
];

/** Die vier französischen Farben, wie sie nach Block 1 im Text stehen. */
export const FARBEN_FR = ['Kreuz', 'Herz', 'Ecke', 'Schaufel'] as const;

/**
 * 1b. Artikel + Verbindung beugen (Nachtrag SCHIEDSRICHTER, 16.08.2026). Läuft
 * nach den Verbindungen, wenn «Eichel-Ober» schon «Kreuz-Dame» heisst, und vor
 * den Artikelwendungen. ⟨F⟩ steht für jede der vier französischen Farben; das
 * erste Wort darf am Satzanfang gross stehen (Der/Den/Dem/Das/Sein/Seinen).
 */
export const BEUGUNG_VERBINDUNGEN: ReadonlyArray<readonly [string, string]> = [
  ['der ⟨F⟩-Dame', 'die ⟨F⟩-Dame'],
  ['den ⟨F⟩-Dame', 'die ⟨F⟩-Dame'],
  ['dem ⟨F⟩-Dame', 'der ⟨F⟩-Dame'],
  ['den ⟨F⟩-Bube', 'den ⟨F⟩-Buben'],
  ['dem ⟨F⟩-Bube', 'dem ⟨F⟩-Buben'],
  ['seinen ⟨F⟩-Bube', 'seinen ⟨F⟩-Buben'],
  ['das ⟨F⟩-Zehn', 'die ⟨F⟩-Zehn'],
  ['dem ⟨F⟩-Zehn', 'der ⟨F⟩-Zehn'],
  ['sein ⟨F⟩-Zehn', 'seine ⟨F⟩-Zehn'],
];

/**
 * 2. Wendungen mit Artikel (Genus wechselt). Das erste Wort darf am Satzanfang
 * gross stehen («Der Under» → «Der Bube»); die Schreibweise bleibt erhalten.
 */
export const ARTIKELWENDUNGEN: ReadonlyArray<readonly [string, string]> = [
  ['der Under', 'der Bube'],
  ['den Under', 'den Buben'],
  ['dem Under', 'dem Buben'],
  ['der Ober', 'die Dame'],
  ['den Ober', 'die Dame'],
  ['dem Ober', 'der Dame'],
  ['das Banner', 'die Zehn'],
  ['dem Banner', 'der Zehn'],
  ['sein Banner', 'seine Zehn'],
  ['eine Schilte', 'eine Schaufel'],
  ['die Schilten', 'die Schaufeln'],
  ['Schilten, über', 'Schaufel, über'],
  ['vier Schellen', 'vier Ecken'],
  ['weitere Schellen', 'weitere Ecken'],
  ['weiteren Schellen', 'weiteren Ecken'],
  ['drei Schellen', 'drei Ecken'],
  ['auf Schellen', 'auf Ecke'],
  ['in Schellen', 'in Ecke'],
  ['statt Schellen', 'statt Ecke'],
  ['mit Schellen', 'mit Ecke'],
  ['auf Schilten', 'auf Schaufel'],
  ['in Schilten', 'in Schaufel'],
  ['über Schilten', 'über Schaufel'],
];

/** 3. Nackte Wörter (Wortgrenze, Grossschreibung). */
export const NACKTE_WOERTER: ReadonlyArray<readonly [string, string]> = [
  ['Eichel', 'Kreuz'],
  ['Rosen', 'Herz'],
  ['Schilten', 'Schaufel'],
  ['Schellen', 'Ecken'],
  ['Under', 'Bube'],
  ['Ober', 'Dame'],
  ['Banner', 'Zehn'],
];

/**
 * Wörter, die nach dem Wechsel im sichtbaren Text nicht mehr stehen dürfen.
 * Grundlage der Loch-Prüfung (farbwoerter-pruefen.ts, npm run pruefe:farbwoerter).
 */
export const PRUEFWOERTER = ['Eichel', 'Rosen', 'Schellen', 'Schilten', 'Schilte', 'Under', 'Ober', 'Banner'];

// ---------------------------------------------------------------------------
// Aus der Tafel werden Muster. Die Wortgrenze ist selbst gebaut, weil `\b`
// Umlaute als Grenze liest («über» begänne sonst ohne Wortanfang). Links steht
// die Grenze als eingefangene Gruppe (kein Lookbehind, läuft in jedem Safari),
// rechts als Lookahead.
// ---------------------------------------------------------------------------

/** Wortgrenze links: Textanfang oder ein Zeichen, das weder Buchstabe noch Ziffer ist. */
const VOR = '(^|[^\\p{L}\\p{N}])';
/** Wortgrenze rechts. */
const NACH = '(?![\\p{L}\\p{N}])';

function entkommen(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type Ersatz = (treffer: string, vor: string) => string;

interface Regel {
  muster: RegExp;
  ersatz: Ersatz;
}

function verbindungsRegel([de, fr]: readonly [string, string]): Regel {
  if (de.startsWith('-')) {
    // «-Under»: der Bindestrich muss stehen, danach das Wort mit Grenze rechts.
    return { muster: new RegExp(entkommen(de) + NACH, 'gu'), ersatz: () => fr };
  }
  // «Eichel-»: Grenze links, danach der Bindestrich, egal was folgt.
  return { muster: new RegExp(VOR + entkommen(de), 'gu'), ersatz: (_t, vor) => vor + fr };
}

function artikelRegel([de, fr]: readonly [string, string]): Regel {
  const erstes = de[0];
  const grossKlein = `[${erstes.toUpperCase()}${erstes.toLowerCase()}]`;
  const muster = new RegExp(VOR + grossKlein + entkommen(de.slice(1)) + NACH, 'gu');
  const ersatz: Ersatz = (treffer, vor) => {
    const wort = treffer.slice(vor.length);
    const gross = wort[0] === wort[0].toUpperCase();
    return vor + (gross ? fr[0].toUpperCase() : fr[0].toLowerCase()) + fr.slice(1);
  };
  return { muster, ersatz };
}

const PLATZHALTER = '⟨F⟩';

/**
 * «den ⟨F⟩-Bube» → «den ⟨F⟩-Buben» für jede der vier Farben; die getroffene
 * Farbe wandert unverändert in den Ersatz, das erste Wort behält seine
 * Schreibweise (Satzanfang).
 */
function beugungsRegel([de, fr]: readonly [string, string]): Regel {
  const [deVor, deNach] = de.split(PLATZHALTER);
  const [frVor, frNach] = fr.split(PLATZHALTER);
  const erstes = deVor[0];
  const grossKlein = `[${erstes.toUpperCase()}${erstes.toLowerCase()}]`;
  const farben = `(${FARBEN_FR.join('|')})`;
  const muster = new RegExp(
    VOR + grossKlein + entkommen(deVor.slice(1)) + farben + entkommen(deNach) + NACH,
    'gu'
  );
  const ersatz: Ersatz = (treffer, vor) => {
    const wort = treffer.slice(vor.length);
    const gross = wort[0] === wort[0].toUpperCase();
    const farbe = FARBEN_FR.find((f) => wort.includes(f)) ?? '';
    return vor + (gross ? frVor[0].toUpperCase() : frVor[0].toLowerCase()) + frVor.slice(1) + farbe + frNach;
  };
  return { muster, ersatz };
}

function wortRegel([de, fr]: readonly [string, string]): Regel {
  return { muster: new RegExp(VOR + entkommen(de) + NACH, 'gu'), ersatz: (_t, vor) => vor + fr };
}

const REGELN: Regel[] = [
  ...VERBINDUNGEN.map(verbindungsRegel),
  ...BEUGUNG_VERBINDUNGEN.map(beugungsRegel),
  ...ARTIKELWENDUNGEN.map(artikelRegel),
  ...NACKTE_WOERTER.map(wortRegel),
];

/**
 * Ersetzt die Deutschschweizer Farb- und Kartenwörter durch die des
 * französischen Blatts. Reine Funktion; für 'de' gibt der Aufrufer den
 * Originaltext weiter.
 */
export function farbwoerterFr(text: string): string {
  if (typeof text !== 'string' || text.length === 0) return text;
  let ergebnis = text;
  for (const regel of REGELN) {
    ergebnis = ergebnis.replace(regel.muster, (treffer: string, vor?: string) =>
      regel.ersatz(treffer, typeof vor === 'string' ? vor : '')
    );
  }
  return ergebnis;
}

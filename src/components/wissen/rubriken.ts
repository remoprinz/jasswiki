import rubriken from '@/data/rubriken.json';

// Texte der Übersichtsseiten aus src/data/rubriken.json (Redaktion SCHIRI,
// gefeilt von FEILE). Die Vorlagen lesen, SCHIRI schreibt. Jedes Feld darf
// fehlen: dann zeigt die Seite, was sie ohne die Datei zeigt.
//
// Eine Einleitung, die mit «ENTWURF» beginnt, gilt als noch nicht gesetzt.
// So steht ein Platzhalter der Redaktion nie auf der Seite.

export interface RubrikFrage {
  question: string;
  answer: string;
}

export interface RubrikSeite {
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  einleitung?: string;
  faqs?: RubrikFrage[];
}

interface RubrikDatei {
  seiten?: Record<string, Record<string, unknown>>;
  verweise?: {
    start_chips?: { wort?: string; pfad?: string }[];
    jassen_seite?: string;
  };
}

const datei = rubriken as unknown as RubrikDatei;

const text = (x: unknown): string | undefined =>
  typeof x === 'string' && x.trim().length > 0 ? x : undefined;

/** Die Texte einer Übersichtsseite. Schlüssel = Pfad ohne Schrägstriche am Rand. */
export function rubrikSeite(pfad: string): RubrikSeite {
  const roh = datei.seiten?.[pfad];
  if (!roh) return {};
  const einleitung = text(roh.einleitung);
  const faqs = Array.isArray(roh.faqs)
    ? (roh.faqs as unknown[]).filter(
        (f): f is RubrikFrage =>
          !!f && typeof f === 'object' && !!text((f as RubrikFrage).question) && !!text((f as RubrikFrage).answer),
      )
    : undefined;
  const seite: RubrikSeite = {};
  const seoTitle = text(roh.seoTitle);
  const seoDescription = text(roh.seoDescription);
  const h1 = text(roh.h1);
  if (seoTitle) seite.seoTitle = seoTitle;
  if (seoDescription) seite.seoDescription = seoDescription;
  if (h1) seite.h1 = h1;
  if (einleitung && !/^\s*ENTWURF/.test(einleitung)) seite.einleitung = einleitung;
  if (faqs && faqs.length > 0) seite.faqs = faqs;
  return seite;
}

/** Chips der Startseite, vorn in der Reihe. Fehlerhafte Einträge fallen weg. */
export function startChips(): { wort: string; pfad: string }[] {
  return (datei.verweise?.start_chips ?? [])
    .filter((c) => text(c?.wort) && text(c?.pfad))
    .map((c) => ({ wort: c.wort as string, pfad: c.pfad as string }));
}

/** Der Absatz der Seite /jassen/ mit den Wegen zu Lernen, Jass-KI und Jass-Apps. */
export function jassenSeiteAbsatz(): string | undefined {
  return text(datei.verweise?.jassen_seite);
}

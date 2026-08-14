// Die Karten-Marke im Artikeltext.
//
//   [[karten: eichel-under, eichel-ass, eichel-koenig, eichel-8]]
//   [[karten: eichel-under, eichel-ass | Under und Ass in Eichel]]
//
// Der Inhalt bleibt in jass-content-v2.json, die Darstellung liegt in
// JassKartenReihe. Die Marke steht auf einer eigenen Zeile.
//
// Sicherheit für den Artikel: Eine Marke mit unbekannten Slugs verschwindet
// stillschweigend; der übrige Text wird unverändert gesetzt. Ein Tippfehler
// kostet also die Abbildung, niemals den Artikel.

import { istKartenSlug } from './jasskarten';

/** Erkennt die Marke im Text. Erlaubt Leerzeichen und Gross-/Kleinschreibung. */
export const KARTEN_MARKE = /\[\[\s*karten\s*:([^\]\n]*?)\]\]/gi;

/**
 * Erkennt jede Marken-artige Klammer mit Doppelpunkt, also auch verschriebene
 * wie [[kartn: …]]. Sie verschwindet stillschweigend, statt als Klammersalat
 * im Artikel zu stehen. Eine Klammer ohne Doppelpunkt bleibt unangetastet.
 */
const MARKEN_KLAMMER = /\[\[[^\]\n]*:[^\]\n]*\]\]/g;

export interface KartenMarkeInhalt {
  slugs: string[];
  beschriftung?: string;
  /** Slugs, die in keinem der beiden Kartensysteme vorkommen. */
  unbekannt: string[];
}

/** Zerlegt den Inneren einer Marke in Slugs und Beschriftung. */
export function marketInhaltLesen(inneres: string): KartenMarkeInhalt {
  const [kartenTeil, ...restTeile] = inneres.split('|');
  const beschriftung = restTeile.join('|').trim();
  const roh = kartenTeil
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return {
    slugs: roh.filter(istKartenSlug),
    unbekannt: roh.filter((s) => !istKartenSlug(s)),
    beschriftung: beschriftung || undefined,
  };
}

export interface TextStueck {
  art: 'text';
  text: string;
}
export interface KartenStueck {
  art: 'karten';
  slugs: string[];
  beschriftung?: string;
}
export type Stueck = TextStueck | KartenStueck;

/**
 * Zerlegt einen Artikeltext in Textstücke und Kartenreihen.
 * Ohne Marke kommt genau ein Textstück zurück — der Text bleibt dann
 * Zeichen für Zeichen derselbe wie vorher.
 */
export function textInStuecke(text: string): Stueck[] {
  MARKEN_KLAMMER.lastIndex = 0;
  if (!MARKEN_KLAMMER.test(text)) return [{ art: 'text', text }];

  MARKEN_KLAMMER.lastIndex = 0;
  const stuecke: Stueck[] = [];
  let zeiger = 0;
  let treffer: RegExpExecArray | null;

  while ((treffer = MARKEN_KLAMMER.exec(text)) !== null) {
    const davor = text.slice(zeiger, treffer.index);
    if (davor.trim()) stuecke.push({ art: 'text', text: davor });

    KARTEN_MARKE.lastIndex = 0;
    const kartenTreffer = KARTEN_MARKE.exec(treffer[0]);
    const inhalt = kartenTreffer ? marketInhaltLesen(kartenTreffer[1] ?? '') : null;

    if (inhalt && inhalt.slugs.length > 0) {
      stuecke.push({ art: 'karten', slugs: inhalt.slugs, beschriftung: inhalt.beschriftung });
      if (inhalt.unbekannt.length > 0 && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[Karten-Marke] unbekannte Slugs übersprungen:', inhalt.unbekannt.join(', '));
      }
    } else if (process.env.NODE_ENV !== 'production') {
      // Beim Schreiben sichtbar, in der ausgelieferten Seite still.
      // eslint-disable-next-line no-console
      console.warn('[Karten-Marke] keine gültige Karte in:', treffer[0]);
    }

    zeiger = treffer.index + treffer[0].length;
  }

  const rest = text.slice(zeiger);
  if (rest.trim()) stuecke.push({ art: 'text', text: rest });

  return stuecke;
}

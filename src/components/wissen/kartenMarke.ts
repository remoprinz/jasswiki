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
import { tischInhaltLesen, type TischInhalt } from './tischMarke';

/**
 * Bauform jeder Marke: [[schlüssel: inhalt]].
 *
 * Der Schlüssel steht auf EINER Zeile, der Inhalt darf umbrechen — ein
 * Jasstisch mit sechs Teilen ist in der JSON sonst unlesbar. Drei Riegel halten
 * den Ausdruck kurz: «[» ist im Inneren ausgeschlossen, die Länge ist begrenzt,
 * und eine Leerzeile beendet die Marke. Eine offen gebliebene Klammer frisst
 * darum höchstens ihren eigenen Absatz — und was sie stehen lässt, räumt
 * anschliessend die Notbremse weg.
 */
const MARKE_BAUFORM = String.raw`\[\[[^\[\]\n]{0,40}:(?:[^\[\]\n]|\n(?![ \t]*\n)){0,800}?\]\]`;

/**
 * NOTBREMSE: Was nach allen Marken noch nach einer Marke aussieht, verlässt den
 * Text trotzdem — bis zum Ende seiner Zeile, und eine verwaiste Schlussklammer
 * dazu.
 *
 * Grund (SCHIEDSRICHTER, 20.08.2026): Am 20.08. standen zwei rohe
 * `(siehe Begriff "…")` in Bildlegenden auf der Live-Seite. Eine Marke, die aus
 * irgendeinem Grund nicht aufgeht — verschriebener Schlüssel, vergessene
 * Klammer, eine Marke, die dieses Haus noch gar nicht kennt —, gibt darum
 * NICHTS aus statt ihren Rohtext. Der Schaden bleibt dabei auf die eine Zeile
 * begrenzt, ein ganzer Absatz verschwindet nie.
 */
const MARKE_RUINE = /\[\[[^\[\]\n]{0,40}:[^\n]*/g;
const MARKE_SCHLUSS_ALLEIN = /^[ \t]*\]\][ \t]*\n?/gm;

/** Räumt weg, was nach der Auflösung noch nach einer Marke aussieht. */
export function ohneRohMarken(text: string): string {
  if (typeof text !== 'string' || !text.includes('[[')) return text;
  MARKE_RUINE.lastIndex = 0;
  MARKE_SCHLUSS_ALLEIN.lastIndex = 0;
  return text.replace(MARKE_RUINE, '').replace(MARKE_SCHLUSS_ALLEIN, '');
}

/** Erkennt die Marke im Text. Erlaubt Leerzeichen und Gross-/Kleinschreibung. */
export const KARTEN_MARKE = /\[\[\s*karten\s*:([^\[\]]{0,800}?)\]\]/gi;

/** Der Jasstisch [[tisch: …]] — vier Plätze statt einer Reihe. */
export const TISCH_MARKE = /\[\[\s*tisch\s*:([^\[\]]{0,800}?)\]\]/gi;

/**
 * Erkennt jede Marken-artige Klammer mit Doppelpunkt, also auch verschriebene
 * wie [[kartn: …]] und jede Marke, die dieses Haus noch gar nicht kennt. Sie
 * verschwindet stillschweigend, statt als Klammersalat im Artikel zu stehen.
 * Eine Klammer ohne Doppelpunkt bleibt unangetastet.
 */
const MARKEN_KLAMMER = new RegExp(MARKE_BAUFORM, 'g');

/** Dieselbe Marke, wenn sie eine Zeile für sich allein hat — samt Umbruch. */
const MARKE_GANZE_ZEILE = new RegExp(String.raw`^[ \t]*${MARKE_BAUFORM}[ \t]*\n?`, 'gm');

export interface KartenMarkeInhalt {
  slugs: string[];
  /** Slugs, die in der Reihe hervortreten — Schreibweise «slug!». */
  hervor: string[];
  beschriftung?: string;
  /** Aufschrift über der Reihe, dritter Teil der Marke. */
  aufschrift?: string;
  /** Slugs, die in keinem der beiden Kartensysteme vorkommen. */
  unbekannt: string[];
}

/**
 * HERVORHEBUNG EINER EINZELNEN KARTE: ein Ausrufezeichen am Slug.
 *
 *   [[karten: rosen-ober, rosen-koenig!, rosen-ass | … | Kreuzweis]]
 *
 * Gedacht für die Karte, um die es in der Reihe geht — beim Kreuzweis gehört
 * der Rosen-König zu beiden Weisen, und genau das trägt das Bild
 * (Remo, 20.08.2026). Ein Leerzeichen davor ist erlaubt, weil es in der JSON
 * niemand sieht.
 *
 * Genau EIN Ausrufezeichen, und es steht am Schluss. Alles andere («!slug»,
 * «slug!!») bleibt ein Slug, den es nicht gibt — die Karte verschwindet dann
 * wie jeder verschriebene Slug, statt ihren Rohtext zu zeigen. Beim Schreiben
 * meldet das der Sprachwächter («G · Hervorhebung verschrieben»).
 */
const HERVOR_ZEICHEN = /^(.+?)\s*!$/;

/**
 * Zerlegt das Innere einer Karten-Marke:
 *
 *   [[karten: slug, slug]]
 *   [[karten: slug, slug | Beschriftung]]
 *   [[karten: slug, slug | Beschriftung | Aufschrift]]
 *
 * Der DRITTE Teil ist die Aufschrift über der Reihe («Mein Blatt», «Der Stich»,
 * «Weis»). Sie sagt, was die Reihe zeigt — zwei Bänder untereinander sahen ohne
 * sie gleich aus (SCHIEDSRICHTER, 20.08.2026). Fehlt sie, steht dort
 * «Jasskarten» wie bisher. Steht ein «|» in der Beschriftung, so gehört der
 * letzte Teil trotzdem der Aufschrift.
 */
export function marketInhaltLesen(inneres: string): KartenMarkeInhalt {
  const [kartenTeil, ...restTeile] = inneres.split('|');
  const aufschrift = restTeile.length >= 2 ? (restTeile.pop() ?? '').trim() : '';
  const beschriftung = restTeile.join('|').trim();
  const roh = kartenTeil
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const gelesen = roh.map((eintrag) => {
    const treffer = HERVOR_ZEICHEN.exec(eintrag);
    const slug = treffer ? treffer[1].trim() : eintrag;
    return { roh: eintrag, slug, hervor: Boolean(treffer), gilt: istKartenSlug(slug) };
  });

  return {
    slugs: gelesen.filter((e) => e.gilt).map((e) => e.slug),
    hervor: gelesen.filter((e) => e.gilt && e.hervor).map((e) => e.slug),
    unbekannt: gelesen.filter((e) => !e.gilt).map((e) => e.roh),
    beschriftung: beschriftung || undefined,
    aufschrift: aufschrift || undefined,
  };
}

/**
 * Entfernt jede Karten-Marke aus einem Text.
 * Für alle Stellen, die den Artikeltext **ohne** Renderer ausspielen:
 * Suchtreffer, Vorschauen auf den Kategorieseiten, schema.org-Beschreibungen.
 * Gegenstück in der Node-Welt: resolve-markers.mjs (Korpus, llms-*.md).
 */
export function ohneKartenMarken(text: string): string {
  if (typeof text !== 'string') return text;
  MARKE_GANZE_ZEILE.lastIndex = 0;
  MARKEN_KLAMMER.lastIndex = 0;
  return ohneRohMarken(text.replace(MARKE_GANZE_ZEILE, '').replace(MARKEN_KLAMMER, ''));
}

export interface TextStueck {
  art: 'text';
  text: string;
}
export interface KartenStueck {
  art: 'karten';
  slugs: string[];
  /** Slugs, die in dieser Reihe hervortreten (Schreibweise «slug!»). */
  hervor: string[];
  beschriftung?: string;
  aufschrift?: string;
}
export interface TischStueck extends TischInhalt {
  art: 'tisch';
}
export type Stueck = TextStueck | KartenStueck | TischStueck;

/**
 * Zerlegt einen Artikeltext in Textstücke und Kartenreihen.
 * Ohne Marke kommt genau ein Textstück zurück — der Text bleibt dann
 * Zeichen für Zeichen derselbe wie vorher.
 */
export function textInStuecke(text: string): Stueck[] {
  MARKEN_KLAMMER.lastIndex = 0;
  if (!MARKEN_KLAMMER.test(text)) {
    const rein = ohneRohMarken(text);
    return [{ art: 'text', text: rein }];
  }

  MARKEN_KLAMMER.lastIndex = 0;
  const stuecke: Stueck[] = [];
  let zeiger = 0;
  let treffer: RegExpExecArray | null;

  // Jedes Textstück läuft durch die Notbremse: eine Marke, die nicht aufging,
  // steht nie als Rohtext auf der Seite.
  const alsText = (roh: string) => {
    const rein = ohneRohMarken(roh);
    if (rein.trim()) stuecke.push({ art: 'text', text: rein });
  };

  while ((treffer = MARKEN_KLAMMER.exec(text)) !== null) {
    alsText(text.slice(zeiger, treffer.index));

    // Jasstisch zuerst: eine Tisch-Marke ist nie zugleich eine Kartenreihe.
    TISCH_MARKE.lastIndex = 0;
    const tischTreffer = TISCH_MARKE.exec(treffer[0]);
    if (tischTreffer) {
      const tisch = tischInhaltLesen(tischTreffer[1] ?? '');
      if (tisch.sitze.length > 0 || tisch.blatt.length > 0) {
        stuecke.push({ art: 'tisch', ...tisch });
      } else if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[Tisch-Marke] kein Platz und kein Blatt in:', treffer[0]);
      }
      if (tisch.unbekannt.length > 0 && process.env.NODE_ENV !== 'production') {
        // Beim Schreiben sichtbar, in der ausgelieferten Seite still.
        // eslint-disable-next-line no-console
        console.warn('[Tisch-Marke] Teile übersprungen:', tisch.unbekannt.join(' | '));
      }
      zeiger = treffer.index + treffer[0].length;
      continue;
    }

    KARTEN_MARKE.lastIndex = 0;
    const kartenTreffer = KARTEN_MARKE.exec(treffer[0]);
    const inhalt = kartenTreffer ? marketInhaltLesen(kartenTreffer[1] ?? '') : null;

    if (inhalt && inhalt.slugs.length > 0) {
      stuecke.push({
        art: 'karten',
        slugs: inhalt.slugs,
        hervor: inhalt.hervor,
        beschriftung: inhalt.beschriftung,
        aufschrift: inhalt.aufschrift,
      });
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

  alsText(text.slice(zeiger));

  return stuecke;
}

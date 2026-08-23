// DIE HERVORGEHOBENE KARTE — die Schreibweise «slug!» in jeder Marke.
//
//   [[karten: rosen-ober, rosen-koenig!, rosen-ass | … | Kreuzweis]]
//   [[tisch: … | blatt eichel-6!, eichel-9, rosen-ass]]
//
// Gedacht für die Karte, um die es geht: beim Kreuzweis gehört der Rosen-König
// zu beiden Weisen, im Hoch-tief legt der Partner den tiefsten Trumpf. Beide
// Marken lesen dasselbe Zeichen, damit es im Artikel nur EINE Schreibweise gibt
// (Remo, 23.08.2026).
//
// Genau EIN Ausrufezeichen, und es steht am Schluss. Alles andere («!slug»,
// «slug!!») bleibt ein Slug, den es nicht gibt — die Karte verschwindet dann wie
// jeder verschriebene Slug, statt ihren Rohtext zu zeigen. Beim Schreiben meldet
// das der Sprachwächter («G · Hervorhebung verschrieben»).

/** Ein Ausrufezeichen am Schluss, davor darf ein Leerzeichen stehen. */
const HERVOR_ZEICHEN = /^(.+?)\s*!$/;

export interface HervorEintrag {
  /** Der Eintrag, wie er in der Marke steht. */
  roh: string;
  /** Der Slug ohne Zeichen. */
  slug: string;
  /** Trägt der Eintrag das Ausrufezeichen? */
  hervor: boolean;
}

/** Liest einen Marken-Eintrag: Slug und die Frage, ob er hervortritt. */
export function hervorLesen(eintrag: string): HervorEintrag {
  const roh = eintrag.trim().toLowerCase();
  const treffer = HERVOR_ZEICHEN.exec(roh);
  return { roh, slug: treffer ? treffer[1].trim() : roh, hervor: Boolean(treffer) };
}

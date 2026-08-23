// Die Tisch-Marke im Artikeltext — ein gelegter Stich am Jasstisch.
//
//   [[tisch: stich 1 | trumpf eichel | sicht ansager |
//            ansager eichel-under | rechts rosen-7 | partner eichel-6 |
//            links schilten-8 |
//            blatt eichel-under, eichel-9!, eichel-ass, rosen-koenig |
//            blatt-aufschrift Mein Blatt |
//            Der Partner legt tief]]
//
// EINE KARTE IM BLATT TRITT HERVOR: ein Ausrufezeichen am Slug, wie in der
// Kartenreihe («eichel-9!»). Sie hebt sich dann aus der Hand, so wie die
// angetippte Karte in der Arena — für die Karte, die gespielt werden soll.
//
// Aufbau: Die Teile stehen durch «|» getrennt, wie bei [[karten: …]]. Zeilen-
// umbrüche innerhalb der Marke sind erlaubt, damit ein Tisch im JSON lesbar
// bleibt.
//
// DIE SITZE STEHEN IMMER AM ANSAGER: «ansager» ist der Trumpfansager, «partner»
// sein Gegenüber, «links» und «rechts» die beiden Gegner — von seinem Stuhl aus
// gesehen. `sicht partner` DREHT das Bild um einen halben Tisch, statt die Sitze
// umzudeuten. Derselbe Stich, zweimal geschrieben, zeigt darum zwingend
// dieselben Karten an denselben Sitzen; er kann gar nicht auseinanderlaufen.
//
// Reihenfolge: Der ZUERST genannte Sitz spielt aus, die übrigen Nummern rechnet
// die Darstellung aus der Sitzordnung — gegen den Uhrzeigersinn, also
// Ausspieler → Gegner zur Rechten → Partner → Gegner zur Linken.
//
// STILL BEI EINEM FEHLER: Ein Teil, der einem Schlüsselwort folgen will und dabei
// stolpert, verschwindet — er landet in `unbekannt`, nie in der Beschriftung.
// Beschriftung wird nur, was nach freiem Satz aussieht (kein Schlüsselwort am
// Anfang, kein Karten-Slug im Teil). Eine verschriebene Marke kostet damit die
// Abbildung, niemals einen Rohtext auf der Seite.
//
// Der Inhalt bleibt in jass-content-v2.json, die Darstellung liegt in
// JassTisch. Gegenstück für die maschinenlesbaren Ausgaben:
// resolve-markers.mjs (Korpus, llms-*.md) entfernt jede [[…: …]]-Marke.

import { hervorLesen } from './hervorhebung';
import { farbCodeAusSlug, istKartenSlug, type FarbCode } from './jasskarten';

/** Die vier Plätze, vom Stuhl des Trumpfansagers aus benannt. */
export type SitzWort = 'ansager' | 'partner' | 'links' | 'rechts';

/** Sitzordnung gegen den Uhrzeigersinn (Schweizer Spielrichtung). */
export const SITZ_RING: readonly SitzWort[] = ['ansager', 'rechts', 'partner', 'links'];

/** Wer unten sitzt — aus seinen Augen ist die Lage erzählt. */
export type Sicht = 'ansager' | 'partner';

/** Ältere Schreibweise: «ich» meinte den Erzähler, das ist der Ansager. */
const SITZ_ALIAS: Record<string, SitzWort> = {
  ansager: 'ansager',
  // «ich» stand hier als Alias für den Ansager und frass Legenden: Eine
  // Beschriftung, die mit «Ich lege …» beginnt, wurde als Sitzangabe gelesen,
  // fand keinen Kartenslug und fiel still weg — drei von sieben Tisch-Legenden
  // fehlten so auf der Live-Seite (LOT/KELLE, 23.08.2026). Alle Marken im
  // Bestand schreiben «ansager», der Alias war tot.
  partner: 'partner',
  links: 'links',
  rechts: 'rechts',
};

/** Alles, was am Anfang eines Teils ein Schlüssel sein kann. */
const SCHLUESSEL = new Set([
  ...Object.keys(SITZ_ALIAS),
  'trumpf',
  'sicht',
  'zug',
  'stich',
  'titel',
  'blatt',
  'blatt-aufschrift',
  'blattaufschrift',
]);

export interface TischSitz {
  sitz: SitzWort;
  /** Karten-Slug der gelegten Karte. */
  slug: string;
  /** Eigene Bemerkung des Artikels zu diesem Platz. */
  notiz?: string;
}

export interface TischInhalt {
  /** Gelegte Karten je Sitz; der erste Eintrag hat ausgespielt. */
  sitze: TischSitz[];
  /** Trumpffarbe für die Ansage über dem Filz. */
  trumpf?: FarbCode;
  /** Wer unten sitzt: der Trumpfansager (Vorgabe) oder sein Partner. */
  sicht: Sicht;
  /** Überschrift über dem Filz, z. B. «1. Stich». */
  titel?: string;
  /**
   * Platz, der als Nächstes legt. Vorgabe: der Tisch rechnet ihn aus.
   * Von Hand gesetzt, wenn der Artikel die Karten dazwischen offen lässt
   * («der Ansager spielt aus, der Partner ist am Zug»).
   */
  zug?: SitzWort;
  /** Das Blatt dessen, der unten sitzt. */
  blatt: string[];
  /**
   * Karten des Blatts, die hervortreten — Schreibweise «eichel-9!».
   * Verglichen wird der Slug, darum trägt die Karte ihre Hervorhebung in
   * beiden Kartensystemen und in jeder Ordnung der Hand.
   */
  blattHervor: string[];
  /** Aufschrift über dem Blatt. Vorgabe der Darstellung: «Mein Blatt». */
  blattAufschrift?: string;
  beschriftung?: string;
  /** Teile, die stolperten — sie verschwinden aus der Ausgabe. */
  unbekannt: string[];
}

/** Farbwort → Farbcode, in beiden Kartensystemen. */
function trumpfAusWort(wort: string): FarbCode | null {
  return farbCodeAusSlug(`${wort.trim().toLowerCase()}-ass`);
}

/** Steht irgendwo im Teil ein Karten-Slug? Dann ist es kein freier Satz. */
function traegtKarte(teil: string): boolean {
  return teil
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .some((wort) => wort.length > 2 && istKartenSlug(wort));
}

/**
 * Zerlegt das Innere einer Tisch-Marke.
 * Was einem Schlüssel folgen will und stolpert, fällt still weg; freier Satz
 * wird Beschriftung. Ein Tippfehler kostet die Abbildung, nie den Artikel.
 */
export function tischInhaltLesen(inneres: string): TischInhalt {
  const teile = inneres
    .split('|')
    .map((t) => t.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const sitze: TischSitz[] = [];
  const beschriftungen: string[] = [];
  const blatt: string[] = [];
  const blattHervor: string[] = [];
  const unbekannt: string[] = [];
  let trumpf: FarbCode | undefined;
  let sicht: Sicht = 'ansager';
  let titel: string | undefined;
  let zug: SitzWort | undefined;
  let blattAufschrift: string | undefined;

  for (const teil of teile) {
    const [kopfRoh, ...restWoerter] = teil.split(' ');
    const kopf = kopfRoh.toLowerCase().replace(/:$/, '');
    const rest = restWoerter.join(' ').trim();
    const istSchluessel = SCHLUESSEL.has(kopf);

    // Sitz: Sitzwort + gültige Karte, danach eine Bemerkung in Klammern.
    const sitzWort = SITZ_ALIAS[kopf];
    if (sitzWort) {
      const treffer = rest.match(/^([a-z0-9-]+)\s*(?:\((.*)\))?$/i);
      const slug = treffer?.[1]?.toLowerCase() ?? '';
      if (treffer && istKartenSlug(slug) && !sitze.some((s) => s.sitz === sitzWort)) {
        sitze.push({ sitz: sitzWort, slug, notiz: treffer[2]?.trim() || undefined });
      } else {
        unbekannt.push(teil);
      }
      continue;
    }

    if (kopf === 'trumpf') {
      const code = trumpfAusWort(rest);
      if (code) trumpf = code;
      else unbekannt.push(teil);
      continue;
    }

    if (kopf === 'sicht') {
      const wort = rest.toLowerCase();
      if (wort === 'partner' || wort === 'ansager') sicht = wort;
      else unbekannt.push(teil);
      continue;
    }

    if (kopf === 'zug') {
      const ziel = SITZ_ALIAS[rest.toLowerCase()];
      if (ziel) zug = ziel;
      else unbekannt.push(teil);
      continue;
    }

    if (kopf === 'stich') {
      if (/^\d+\.?$/.test(rest)) titel = `${rest.replace('.', '')}. Stich`;
      else unbekannt.push(teil);
      continue;
    }

    if (kopf === 'titel') {
      if (rest) titel = rest;
      else unbekannt.push(teil);
      continue;
    }

    // Aufschrift über dem Blatt, für den Fall, dass dort etwas anderes stehen
    // soll als «Mein Blatt» — etwa «Was mir bleibt». Beide Schreibweisen
    // gelten, mit Bindestrich und ohne.
    if (kopf === 'blatt-aufschrift' || kopf === 'blattaufschrift') {
      if (rest) blattAufschrift = rest;
      else unbekannt.push(teil);
      continue;
    }

    if (kopf === 'blatt') {
      // «eichel-9!» hebt diese Karte aus der Hand; hervorhebung.ts liest das
      // Zeichen, dieselbe Stelle wie in der Kartenreihe. Ein verschriebenes
      // Zeichen bleibt ein Slug, den es nicht gibt — dann fällt der Teil weg,
      // wie jeder Teil mit einem falschen Slug.
      const eintraege = rest.split(',').map(hervorLesen).filter((e) => e.roh);
      if (eintraege.length > 0 && eintraege.every((e) => istKartenSlug(e.slug))) {
        blatt.push(...eintraege.map((e) => e.slug));
        blattHervor.push(...eintraege.filter((e) => e.hervor).map((e) => e.slug));
      } else unbekannt.push(teil);
      continue;
    }

    // Freier Satz wird Beschriftung. Ein Teil mit einem Karten-Slug darin ist
    // ein verschriebener Schlüssel («blattt eichel-ass») und fällt weg, statt
    // seine Slugs als Bildlegende auf die Seite zu tragen.
    if (istSchluessel || traegtKarte(teil)) unbekannt.push(teil);
    else beschriftungen.push(teil);
  }

  return {
    sitze,
    trumpf,
    sicht,
    titel,
    zug,
    blatt,
    blattHervor,
    blattAufschrift,
    beschriftung: beschriftungen.join(' ') || undefined,
    unbekannt,
  };
}

export interface SitzBild {
  sitz: SitzWort;
  /** Karte des Sitzes, sofern gelegt. */
  slug?: string;
  notiz?: string;
  /** Nummer im Stich, 1 = ausgespielt. */
  nummer: number;
  /** Dieser Sitz ist als nächster am Zug (Stich noch offen). */
  amZug: boolean;
  /**
   * Dieser Platz hat gelegt, der Artikel zeigt seine Karte aber nicht.
   * Erkennbar daran, dass später im Stich schon jemand gelegt hat.
   */
  luecke: boolean;
}

/**
 * Rechnet aus den gelegten Karten das Bild für alle vier Plätze:
 * Nummern gegen den Uhrzeigersinn ab dem Ausspiel, plus der Platz, der als
 * nächster legt. Ein Sitz ohne Karte bleibt leer.
 */
export function sitzeOrdnen(sitze: TischSitz[], zug?: SitzWort): SitzBild[] {
  const ausspiel = sitze[0]?.sitz ?? 'ansager';
  const start = SITZ_RING.indexOf(ausspiel);
  const folge = SITZ_RING.map((_, i) => SITZ_RING[(start + i + 4) % 4]);

  const gelegt = new Map(sitze.map((s) => [s.sitz, s]));
  const nummer = (sitz: SitzWort) => folge.indexOf(sitz) + 1;

  // Am Zug ist, wer benannt ist — sonst der erste freie Platz, und das nur,
  // solange die gelegten Karten lückenlos aufeinander folgen. Steht schon eine
  // spätere Karte im Stich, hat der freie Platz längst gelegt.
  const luecken = folge.filter((s) => !gelegt.has(s));
  const hoechste = Math.max(0, ...[...gelegt.keys()].map(nummer));
  const lueckenlos = [...gelegt.keys()].every((s) => nummer(s) <= gelegt.size);
  const naechster =
    zug && !gelegt.has(zug) ? zug : lueckenlos && gelegt.size < 4 ? luecken[0] : undefined;
  const grenze = Math.max(hoechste, naechster ? nummer(naechster) : 0);

  return SITZ_RING.map((sitz) => {
    const eintrag = gelegt.get(sitz);
    return {
      sitz,
      slug: eintrag?.slug,
      notiz: eintrag?.notiz,
      nummer: nummer(sitz),
      amZug: !eintrag && sitz === naechster,
      luecke: !eintrag && sitz !== naechster && nummer(sitz) < grenze,
    };
  });
}

/** Die vier Plätze auf dem Schirm — unten sitzt, wer erzählt. */
export type SchirmPlatz = 'unten' | 'rechts' | 'oben' | 'links';

/**
 * Dreht den Tisch auf die erzählende Seite. Aus der Sicht des Ansagers sitzt er
 * selbst unten; aus der Sicht seines Partners wandert jeder Sitz einen halben
 * Tisch weiter. Die Spielrichtung gegen den Uhrzeigersinn bleibt dabei erhalten
 * — eine halbe Drehung kehrt sie nicht um.
 */
export function schirmPlatz(sitz: SitzWort, sicht: Sicht): SchirmPlatz {
  const SCHIRM_RING: readonly SchirmPlatz[] = ['unten', 'rechts', 'oben', 'links'];
  const versatz = SITZ_RING.indexOf(sicht === 'partner' ? 'partner' : 'ansager');
  return SCHIRM_RING[(SITZ_RING.indexOf(sitz) - versatz + 4) % 4];
}

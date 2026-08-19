// Die Tisch-Marke im Artikeltext — ein gelegter Stich am Jasstisch.
//
//   [[tisch: trumpf eichel | ich eichel-9 | rechts eichel-ass | partner eichel-6 |
//            links eichel-8 | blatt eichel-under, eichel-koenig, eichel-7 |
//            Der Partner legt tief]]
//
// Aufbau: Die Teile stehen durch «|» getrennt auf EINER Zeile, wie bei
// [[karten: …]]. Ein Teil ist ein Sitz, sobald er mit einem Sitzwort beginnt und
// eine gültige Karte nennt — sonst ist er Beschriftung. Dadurch bleibt ein Satz
// wie «Ich lege den König» Beschriftung und wird nie als Sitz gelesen.
//
// Reihenfolge: Der ZUERST genannte Sitz spielt aus. Die übrigen Nummern rechnet
// die Darstellung aus der Sitzordnung — gegen den Uhrzeigersinn, also
// unten → rechts → oben → links. So kann die Reihenfolge im Bild gar nicht
// falsch werden, egal in welcher Folge die Sitze geschrieben stehen.
//
// Der Inhalt bleibt in jass-content-v2.json, die Darstellung liegt in
// JassTisch. Gegenstück für die maschinenlesbaren Ausgaben:
// resolve-markers.mjs (Korpus, llms-*.md) entfernt jede [[…: …]]-Marke.

import { farbCodeAusSlug, istKartenSlug, type FarbCode } from './jasskarten';

/** Die vier Plätze, aus der Sicht des Lesers: er sitzt unten. */
export type SitzWort = 'ich' | 'partner' | 'links' | 'rechts';

/** Sitzordnung gegen den Uhrzeigersinn (Schweizer Spielrichtung). */
export const SITZ_RING: readonly SitzWort[] = ['ich', 'rechts', 'partner', 'links'];

const SITZ_WOERTER: readonly SitzWort[] = ['ich', 'partner', 'links', 'rechts'];

export interface TischSitz {
  sitz: SitzWort;
  /** Karten-Slug der gelegten Karte. */
  slug: string;
  /** Eigene Bemerkung des Artikels, ersetzt die abgeleitete («verworfen»). */
  notiz?: string;
}

export interface TischInhalt {
  /** Gelegte Karten je Sitz; der erste Eintrag hat ausgespielt. */
  sitze: TischSitz[];
  /** Trumpffarbe für das Zeichen in der Tischmitte. */
  trumpf?: FarbCode;
  /** Wer unten sitzt: der Trumpfansager (Vorgabe) oder sein Partner. */
  sicht: 'ansager' | 'partner';
  /** Überschrift über dem Filz, z. B. «1. Stich». */
  titel?: string;
  /**
   * Platz, der als Nächstes legt. Vorgabe: der Tisch rechnet ihn aus.
   * Von Hand gesetzt, wenn der Artikel die Karten dazwischen offen lässt
   * («der Ansager spielt aus, ich bin am Zug»).
   */
  zug?: SitzWort;
  /** Das Blatt des Lesers, unter dem Tisch. */
  blatt: string[];
  beschriftung?: string;
  /** Teile, die keinem Schlüssel folgten und auch keine Beschriftung sein können. */
  unbekannt: string[];
}

/** Farbwort → Farbcode, in beiden Kartensystemen. */
function trumpfAusWort(wort: string): FarbCode | null {
  return farbCodeAusSlug(`${wort.trim().toLowerCase()}-ass`);
}

/**
 * Zerlegt das Innere einer Tisch-Marke.
 * Alles, was kein bekannter Schlüssel ist, wird Beschriftung — eine
 * verschriebene Zeile kostet also höchstens die Bemerkung, nie den Artikel.
 */
export function tischInhaltLesen(inneres: string): TischInhalt {
  const teile = inneres
    .split('|')
    .map((t) => t.trim())
    .filter(Boolean);

  const sitze: TischSitz[] = [];
  const beschriftungen: string[] = [];
  const blatt: string[] = [];
  const unbekannt: string[] = [];
  let trumpf: FarbCode | undefined;
  let sicht: TischInhalt['sicht'] = 'ansager';
  let titel: string | undefined;
  let zug: SitzWort | undefined;

  for (const teil of teile) {
    const [kopfRoh, ...restWoerter] = teil.split(/\s+/);
    const kopf = kopfRoh.toLowerCase();
    const rest = restWoerter.join(' ').trim();

    // Sitz: Sitzwort + gültige Karte, danach eine Bemerkung in Klammern.
    if ((SITZ_WOERTER as readonly string[]).includes(kopf)) {
      const treffer = rest.match(/^([a-z0-9-]+)\s*(?:\((.*)\))?$/i);
      const slug = treffer?.[1]?.toLowerCase() ?? '';
      if (treffer && istKartenSlug(slug)) {
        if (!sitze.some((s) => s.sitz === kopf)) {
          sitze.push({ sitz: kopf as SitzWort, slug, notiz: treffer[2]?.trim() || undefined });
        } else {
          unbekannt.push(teil);
        }
        continue;
      }
    }

    if (kopf === 'trumpf') {
      const code = trumpfAusWort(rest);
      if (code) {
        trumpf = code;
        continue;
      }
    }

    if (kopf === 'sicht' && (rest.toLowerCase() === 'partner' || rest.toLowerCase() === 'ansager')) {
      sicht = rest.toLowerCase() as TischInhalt['sicht'];
      continue;
    }

    if (kopf === 'zug' && (SITZ_WOERTER as readonly string[]).includes(rest.toLowerCase())) {
      zug = rest.toLowerCase() as SitzWort;
      continue;
    }

    if (kopf === 'stich' && /^\d+\.?$/.test(rest)) {
      titel = `${rest.replace('.', '')}. Stich`;
      continue;
    }

    if (kopf === 'titel' && rest) {
      titel = rest;
      continue;
    }

    if (kopf === 'blatt') {
      const slugs = rest
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (slugs.length > 0 && slugs.every(istKartenSlug)) {
        blatt.push(...slugs);
        continue;
      }
    }

    beschriftungen.push(teil);
  }

  return {
    sitze,
    trumpf,
    sicht,
    titel,
    zug,
    blatt,
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
  const ausspiel = sitze[0]?.sitz ?? 'ich';
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

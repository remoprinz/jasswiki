/**
 * Gliederung des Wikis (Schritt 3, 22.11.2026).
 *
 * src/data/gliederung.json bestimmt Ort und Reihenfolge jedes Artikels:
 * Seitenleiste, Rubrikseiten, Kapitelseiten, Brotkrumen. Die Adresse eines
 * Artikels steht fest in metadata.adresse und hängt nicht an seinem Ort.
 * Geprüft wird die Datei im Bau von pruefe-gliederung.mjs.
 */
import roh from '@/data/gliederung.json';
import allContent from '@/data/jass-content-v2.json';
import type { JassContentItem, JassContentRecord } from '@/types/jass-lexikon';
import { toSlug } from './utils';

const inhalt = allContent as unknown as JassContentRecord;

export type Darstellung = 'kapitelkarten' | 'liste' | 'alphabet' | 'apps' | 'eigene';

/** Ein Artikel an seinem Ort, oder ein Verweis auf einen Artikel, der anderswo steht. */
export interface GEintrag {
  art: 'artikel' | 'verweis';
  id: string;
  /** Der Artikel geht später in diesem auf (Kennung oder Seitenadresse). */
  gehtAufIn?: string;
}

export interface GKapitel {
  name: string;
  slug: string;
  /** Die Frage des Lesers, die das Kapitel beantwortet (Schritt 4). */
  frage?: string;
  /** Eigene Seite des Kapitels, falls es eine hat. */
  adresse?: string;
  /** Ziel eines Verweises auf das Kapitel: die eigene Seite, sonst die Rubrikseite mit Sprungmarke. */
  href: string;
  eintraege: GEintrag[];
}

export type GTeil = { art: 'eintrag'; eintrag: GEintrag } | { art: 'kapitel'; kapitel: GKapitel };

export interface GRubrik {
  name: string;
  adresse: string;
  darstellung: Darstellung;
  /** Die Frage des Lesers, die die Rubrik beantwortet (Schritt 4). */
  frage?: string;
  teile: GTeil[];
}

type RohEintrag = string | { id: string; gehtAufIn?: string } | { verweis: string };
type RohTeil = RohEintrag | { kapitel: string; adresse?: string; frage?: string; artikel: RohEintrag[] };
interface RohGliederung {
  einstieg: { name: string; adresse: string; artikel: string };
  rubriken: { name: string; adresse: string; frage?: string; darstellung: Darstellung; eintraege: RohTeil[] }[];
}

const datei = roh as unknown as RohGliederung;

const eintrag = (e: RohEintrag): GEintrag =>
  typeof e === 'string'
    ? { art: 'artikel', id: e }
    : 'verweis' in e
      ? { art: 'verweis', id: e.verweis }
      : { art: 'artikel', id: e.id, ...(e.gehtAufIn ? { gehtAufIn: e.gehtAufIn } : {}) };

export const einstieg = datei.einstieg;

export const rubriken: GRubrik[] = datei.rubriken.map((r) => ({
  name: r.name,
  adresse: r.adresse,
  darstellung: r.darstellung,
  ...(r.frage ? { frage: r.frage } : {}),
  teile: r.eintraege.map((t): GTeil => {
    if (typeof t === 'object' && 'kapitel' in t) {
      const slug = toSlug(t.kapitel);
      return {
        art: 'kapitel',
        kapitel: {
          name: t.kapitel,
          slug,
          ...(t.adresse ? { adresse: t.adresse } : {}),
          ...(t.frage ? { frage: t.frage } : {}),
          href: t.adresse ?? `${r.adresse}#${slug}`,
          eintraege: t.artikel.map(eintrag),
        },
      };
    }
    return { art: 'eintrag', eintrag: eintrag(t) };
  }),
}));

/** Alle Einträge einer Rubrik in ihrer Reihenfolge, mit dem Kapitel, in dem sie stehen. */
export const eintraegeDerRubrik = (r: GRubrik): { eintrag: GEintrag; kapitel?: GKapitel }[] =>
  r.teile.flatMap((t) =>
    t.art === 'eintrag' ? [{ eintrag: t.eintrag }] : t.kapitel.eintraege.map((e) => ({ eintrag: e, kapitel: t.kapitel })),
  );

export const kapitelDerRubrik = (r: GRubrik): GKapitel[] =>
  r.teile.flatMap((t) => (t.art === 'kapitel' ? [t.kapitel] : []));

/** Ort jedes Artikels (Verweise zählen nicht) und seine Stelle in der ganzen Gliederung. */
const orte = new Map<string, { rubrik?: GRubrik; kapitel?: GKapitel; stelle: number }>();
orte.set(einstieg.artikel, { stelle: 0 });
rubriken.forEach((r) =>
  eintraegeDerRubrik(r).forEach(({ eintrag: e, kapitel }) => {
    if (e.art === 'artikel') orte.set(e.id, { rubrik: r, kapitel, stelle: orte.size });
  }),
);

export const ortVon = (id: string) => orte.get(id);

/** Stelle in der Gliederung, zum Ordnen von Listen ausserhalb der Gliederung. */
export const stelleVon = (id: string): number => orte.get(id)?.stelle ?? Number.MAX_SAFE_INTEGER;

export const rubrikAnAdresse = (adresse: string): GRubrik | undefined => rubriken.find((r) => r.adresse === adresse);

export const kapitelAnAdresse = (adresse: string): { rubrik: GRubrik; kapitel: GKapitel } | undefined => {
  for (const rubrik of rubriken) {
    const kapitel = kapitelDerRubrik(rubrik).find((k) => k.adresse === adresse);
    if (kapitel) return { rubrik, kapitel };
  }
  return undefined;
};

/** Name einer Seite der Gliederung (Rubrik oder Kapitel mit eigener Seite), sonst undefined. */
export const seitenName = (adresse: string): string | undefined =>
  rubrikAnAdresse(adresse)?.name ?? kapitelAnAdresse(adresse)?.kapitel.name;

/** Alle Adressen von Rubrik- und Kapitelseiten. */
export const gliederungsSeiten = (): string[] => [
  ...rubriken.map((r) => r.adresse),
  ...rubriken.flatMap((r) => kapitelDerRubrik(r).flatMap((k) => (k.adresse ? [k.adresse] : []))),
];

export interface Krume {
  name: string;
  href: string;
}

/**
 * Brotkrumen über einer Seite: Jass-Wiki, Rubrik, Kapitel. Die Seite selbst
 * hängt der Aufrufer an. Ist die Seite die Kapitelseite selbst, entfällt das Kapitel.
 */
export const krumenFuerArtikel = (id: string, eigeneAdresse?: string): Krume[] => {
  const krumen: Krume[] = [{ name: 'Jass-Wiki', href: '/' }];
  const ort = orte.get(id);
  if (!ort?.rubrik) return krumen;
  krumen.push({ name: ort.rubrik.name, href: ort.rubrik.adresse });
  // Das Kapitel steht dazwischen, ausser die Seite ist selbst das Kapitel (gleiche
  // Adresse) oder trägt seinen Namen (Differenzler im Kapitel Differenzler).
  const titel = inhalt[id]?.metadata.category.topic;
  if (ort.kapitel && ort.kapitel.href !== eigeneAdresse && ort.kapitel.name !== titel) {
    krumen.push({ name: ort.kapitel.name, href: ort.kapitel.href });
  }
  return krumen;
};

export const artikel = (id: string): JassContentItem | undefined => inhalt[id];

const stelleJeAdresse = new Map(Object.values(inhalt).map((a) => [a.metadata.adresse, stelleVon(a.id)]));

/** Stelle des Artikels an einer festen Adresse in der Gliederung (für Listen mit festen Adressen). */
export const stelleAnAdresse = (adresse: string): number => stelleJeAdresse.get(adresse) ?? Number.MAX_SAFE_INTEGER;

/** Die Frage des Lesers einer Rubrik- oder Kapitelseite (Schritt 4), sonst undefined. */
export const frageAnAdresse = (adresse: string): string | undefined =>
  rubrikAnAdresse(adresse)?.frage ?? kapitelAnAdresse(adresse)?.kapitel.frage;

/**
 * Etiketten über einem Artikel (Schritt 4): Rubrik und Kapitel der Gliederung.
 * Steht der Artikel nicht in der Gliederung, gelten die bisherigen Namen.
 */
export const etikettenVon = (id: string, rubrikBisher: string, kapitelBisher?: string): { rubrik: string; kapitel?: string } => {
  const ort = orte.get(id);
  if (!ort?.rubrik) return { rubrik: rubrikBisher, ...(kapitelBisher ? { kapitel: kapitelBisher } : {}) };
  return { rubrik: ort.rubrik.name, ...(ort.kapitel ? { kapitel: ort.kapitel.name } : {}) };
};

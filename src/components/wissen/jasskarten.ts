// Strukturierte Kartendaten der beiden Schweizer Jass-Kartensysteme.
// Einzige Quelle für das Web-Grid (JassCardGrid), die Lightbox, die schema.org-
// ImageObject-Auszeichnung, die Anker-Navigation und die Karten-Suche.
// Verbindliche Farb-Zuordnung (dokumentierter Standard, Deutsches Blatt):
// Eichel↔Kreuz ♣, Rosen↔Herz ♥, Schellen↔Ecke/Karo ♦, Schilten↔Schaufel/Pik ♠.
// Karten-Design: schweizerjass.ch (Jens Riedweg).

export type System = 'de' | 'fr';

export interface JassKarte {
  rank: string; // Anzeige-Label unter der Karte, z. B. 'Ober', 'Banner', '8'
  name: string; // Vollname, z. B. 'Schellen Banner', 'Herz 8'
  desc: string; // System-Beschreibung ohne Name, z. B. 'französische Jasskarte'
  alt: string; // beschreibender alt-Text, z. B. 'Herz 8, französische Jasskarte'
  slug: string; // Anker-/Such-Slug, z. B. 'herz-8'
  image: string; // '/cards/fr/herz-8.webp'
  searchTerms: string[]; // Treffer für die Suche: Wort und Ziffer, z. B. ['Herz 8','Herz Acht']
}

export interface JassFarbe {
  code: 'E' | 'R' | 'S' | 'L';
  name: string; // Spaltentitel, z. B. 'Rosen'
  karten: JassKarte[];
}

export interface JassKartensystem {
  system: System;
  label: string; // 'Deutschschweizer Karten'
  hint: string;
  farben: JassFarbe[];
}

interface RankDef {
  file: string; // Dateibaustein, z. B. 'banner', '8'
  label: string; // Anzeige, z. B. 'Banner', '8'
  word?: string; // Alternativ-Wort für Suche/Caption, z. B. 'Zehn', 'Acht'
}

// Karten hoch nach tief. Deutschschweizer Blatt: König, Ober, Under, Banner (= Zehn).
const RANKS_DE: RankDef[] = [
  { file: 'ass', label: 'Ass' },
  { file: 'koenig', label: 'König' },
  { file: 'ober', label: 'Ober' },
  { file: 'under', label: 'Under' },
  { file: 'banner', label: 'Banner', word: 'Zehn' },
  { file: '9', label: '9', word: 'Neun' },
  { file: '8', label: '8', word: 'Acht' },
  { file: '7', label: '7', word: 'Sieben' },
  { file: '6', label: '6', word: 'Sechs' },
];

// Französisches Blatt: König, Dame, Bube; die Zehn ist eine schlichte Zehn.
const RANKS_FR: RankDef[] = [
  { file: 'ass', label: 'Ass' },
  { file: 'koenig', label: 'König' },
  { file: 'dame', label: 'Dame' },
  { file: 'bube', label: 'Bube' },
  { file: 'zehn', label: '10', word: 'Zehn' },
  { file: '9', label: '9', word: 'Neun' },
  { file: '8', label: '8', word: 'Acht' },
  { file: '7', label: '7', word: 'Sieben' },
  { file: '6', label: '6', word: 'Sechs' },
];

const SUITS_DE: { code: JassFarbe['code']; name: string; file: string }[] = [
  { code: 'E', name: 'Eichel', file: 'eichel' },
  { code: 'R', name: 'Rosen', file: 'rosen' },
  { code: 'S', name: 'Schellen', file: 'schellen' },
  { code: 'L', name: 'Schilten', file: 'schilten' },
];

// Französische Farben in der Reihenfolge, die unter der jeweils gleichbedeutenden
// Deutschschweizer Spalte steht: Eichel↔Kreuz, Rosen↔Herz, Schellen↔Ecke, Schilten↔Schaufel.
const SUITS_FR: { code: JassFarbe['code']; name: string; file: string }[] = [
  { code: 'E', name: 'Kreuz', file: 'kreuz' }, // unter Eichel (Eichel = Kreuz / Trèfle ♣)
  { code: 'R', name: 'Herz', file: 'herz' }, // unter Rosen (Rosen = Herz / Cœur ♥)
  { code: 'S', name: 'Ecke', file: 'ecke' }, // unter Schellen (Schellen = Ecke / Karo ♦)
  { code: 'L', name: 'Schaufel', file: 'schaufel' }, // unter Schilten (Schilten = Schaufel / Pik ♠)
];

const SYSTEM_ADJ: Record<System, string> = {
  de: 'Deutschschweizer',
  fr: 'Französische',
};

function buildFarben(
  suits: { code: JassFarbe['code']; name: string; file: string }[],
  system: System,
  ranks: RankDef[]
): JassFarbe[] {
  return suits.map((suit) => ({
    code: suit.code,
    name: suit.name,
    karten: ranks.map((rank) => {
      const slug = `${suit.file}-${rank.file}`;
      const name = `${suit.name} ${rank.label}`;
      const searchTerms = [name];
      if (rank.word) searchTerms.push(`${suit.name} ${rank.word}`);
      if (rank.file === 'banner') searchTerms.push(`${suit.name} 10`);
      const desc = `${SYSTEM_ADJ[system]} Jasskarte`;
      return {
        rank: rank.label,
        name,
        desc,
        alt: `${name}, ${desc}`,
        slug,
        image: `/cards/${system}/${slug}.webp`,
        searchTerms,
      };
    }),
  }));
}

export const KARTENSYSTEME: JassKartensystem[] = [
  {
    system: 'de',
    label: 'Deutschschweizer Karten',
    hint: 'Eichel, Rosen, Schellen, Schilten',
    farben: buildFarben(SUITS_DE, 'de', RANKS_DE),
  },
  {
    system: 'fr',
    label: 'Französische Karten',
    hint: 'Schaufel, Kreuz, Herz, Ecke – in der Westschweiz gebräuchlich',
    farben: buildFarben(SUITS_FR, 'fr', RANKS_FR),
  },
];

// ---------------------------------------------------------------------------
// Auflösung einzelner Karten über ihren Slug – Grundlage der Karten-Marke
// [[karten: …]] im Artikeltext (siehe JassKartenReihe).
//
// Jede Karte ist eindeutig bestimmt durch Farbe (Code E/R/S/L) und Rang-Position
// (0 = Ass … 8 = Sechs). Beide Kartensysteme teilen diese Ordnung, darum lässt
// sich zu jedem Slug die gleichbedeutende Karte im anderen System finden:
// 'eichel-under' (deutsch) und 'kreuz-bube' (französisch) zeigen dieselbe Karte.
// ---------------------------------------------------------------------------

interface KartenOrt {
  code: JassFarbe['code'];
  rangIndex: number;
}

const ORT_JE_SLUG = new Map<string, KartenOrt>();
const KARTE_JE_ORT = new Map<string, JassKarte>();

KARTENSYSTEME.forEach((sys) =>
  sys.farben.forEach((farbe) =>
    farbe.karten.forEach((karte, rangIndex) => {
      ORT_JE_SLUG.set(karte.slug, { code: farbe.code, rangIndex });
      KARTE_JE_ORT.set(`${sys.system}:${farbe.code}:${rangIndex}`, karte);
    })
  )
);

/**
 * Liefert die Karte zu einem Slug im gewünschten Kartensystem.
 * Der Slug darf aus beiden Systemen stammen; ausgegeben wird immer die Karte
 * des verlangten Systems. Unbekannter Slug → null (der Aufrufer lässt sie aus).
 */
export function karteAusSlug(slug: string, system: System): JassKarte | null {
  const ort = ORT_JE_SLUG.get(slug.trim().toLowerCase());
  if (!ort) return null;
  return KARTE_JE_ORT.get(`${system}:${ort.code}:${ort.rangIndex}`) ?? null;
}

/** Prüft, ob ein Slug in einem der beiden Kartensysteme existiert. */
export function istKartenSlug(slug: string): boolean {
  return ORT_JE_SLUG.has(slug.trim().toLowerCase());
}

// Flache Liste aller Karten – für die Karten-Suche (Navigation zu /…/jasskarten/#slug).
export interface KartenSuchItem {
  name: string;
  slug: string;
  systemLabel: string;
  searchTerms: string[];
}

export const ALL_CARDS: KartenSuchItem[] = KARTENSYSTEME.flatMap((sys) =>
  sys.farben.flatMap((farbe) =>
    farbe.karten.map((karte) => ({
      name: karte.name,
      slug: karte.slug,
      systemLabel: sys.label,
      searchTerms: karte.searchTerms,
    }))
  )
);

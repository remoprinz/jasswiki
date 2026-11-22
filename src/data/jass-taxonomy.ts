/**
 * JASS-TAXONOMIE - Single Source of Truth
 * =========================================
 * 
 * Version: 4.0 (2026-01-10)
 * 
 * Diese Datei ist die EINZIGE Quelle für die Jass-Taxonomie.
 * Sie wird verwendet für:
 * - Die Taxonomie-Seite (/taxonomie/)
 * - Das generierte JSON-LD (/public/dataset/taxonomie.jsonld)
 * - Zukünftig: SKOS-Export
 * 
 * ALLE WIKIDATA-IDs VERIFIZIERT MIT WikiFeeder 3.0!
 * 
 * Wikidata-Referenzen:
 * - Jass: Q786768
 * - Jass contract (Klasse): Q137732108
 * - Game mechanic: Q1751513
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

import { FARBEN_ZUORDNUNG } from '../config/farbenZuordnung';

export interface TaxonomyTerm {
  /** Eindeutiger Name des Begriffs */
  name: string;
  /** Beschreibung des Begriffs */
  description?: string;
  /** Wikidata-ID (z.B. "Q137727247") */
  wikidataId?: string;
  /** Interner Link zur Detailseite */
  link?: string;
  
  // Wikidata-Beziehungen (P31, P279, P361)
  /** P31 - instance of: Wikidata ID der Klasse */
  instanceOf?: string;
  /** P279 - subclass of: Wikidata ID der Elternklasse */
  subclassOf?: string;
  /** P361 - part of: Wikidata ID des Containers */
  partOf?: string;
}

export interface TaxonomySubcategory {
  name: string;
  description?: string;
  items: TaxonomyTerm[];
}

export interface TaxonomyCategory {
  /** Eindeutige ID für Anchor-Links */
  id: string;
  /** Anzeigename der Kategorie */
  name: string;
  /** Beschreibung der Kategorie */
  description: string;
  /** Optionale Wikidata-ID für die Kategorie selbst */
  wikidataId?: string;
  /** Unterkategorien mit Begriffen */
  subcategories: TaxonomySubcategory[];
}

// ============================================================================
// METADATA
// ============================================================================

export const TAXONOMY_METADATA = {
  name: 'Jass-Taxonomie',
  version: '4.0',
  lastUpdated: '2026-01-10',
  description: 'Systematische Ordnung der Schweizer Jass-Begriffe, verknüpft mit Wikidata',
  license: 'https://creativecommons.org/licenses/by-sa/4.0/',
  publisher: {
    name: 'JassWiki.ch',
    url: 'https://jasswiki.ch/',
    wikidataId: 'Q786768', // Jass
  },
  sameAs: [
    'https://www.wikidata.org/wiki/Q786768',
    'https://de.wikipedia.org/wiki/Jass',
    'https://www.lebendige-traditionen.ch/de/jassen',
  ],
} as const;

// ============================================================================
// WIKIDATA CONSTANTS
// ============================================================================

/** Wichtige Wikidata-IDs für Referenzen */
export const WIKIDATA = {
  // Kern-Konzepte
  JASS: 'Q786768',
  JASS_CONTRACT: 'Q137732108',
  GAME_MECHANIC: 'Q1751513',
  WEIS_CLASS: 'Q137738455',
  
  // Kartenfarben - Schweizer Blatt
  SWISS_CARDS_CONTAINER: 'Q17424109',
  SCHELLEN: 'Q2233012',
  SCHILTEN: 'Q16623777',
  ROSEN: 'Q16623784',
  EICHEL: 'Q1301333',
  
  // Kartenfarben - Französisches Blatt
  FRENCH_CARDS_CONTAINER: 'Q3054813',
  HERZ: 'Q3419242',
  ECKE: 'Q513847',
  KREUZ: 'Q1788166',
  SCHAUFEL: 'Q2094951',
  
  // Bildkarten
  KOENIG: 'Q516114',
  OBER: 'Q572267',
  DAME: 'Q505744',
  UNDER: 'Q510474',
  ASS: 'Q378907',
  
  // Spielaktionen
  MISCHEN: 'Q1930567',
  ABHEBEN: 'Q320553',
  GEBEN: 'Q61054367',
} as const;

// ============================================================================
// DIE TAXONOMIE (Single Source of Truth)
// ============================================================================

export const JASS_TAXONOMY: TaxonomyCategory[] = [
  // =========================================================================
  // 1. SPIELARTEN (Varianten)
  // =========================================================================
  {
    id: 'spielarten',
    name: '1. Spielarten (Varianten)',
    description: 'Spielarten definieren das Grundgerüst. Die meisten werden mit 36 Karten gespielt, der Pandur mit 24.',
    subcategories: [
      {
        name: 'A) Partnerspiele (2×2 Teams, symmetrisch)',
        description: '36-Blatt. Feste Teams, kooperatives Spiel.',
        items: [
          { name: 'Schieber', description: 'Die Standardvariante: Vorhand sagt an oder schiebt', wikidataId: 'Q137727247', link: '/schieber/', subclassOf: WIKIDATA.JASS },
          { name: 'Coiffeur', description: 'Jede Ansage einmal, jede mit eigenem Faktor', wikidataId: 'Q137731700', link: '/varianten/coiffeur/', subclassOf: WIKIDATA.JASS },
          { name: 'Sidi Barrani', description: 'Bietspiel: Gebot aus Punktzahl und Trumpffarbe', wikidataId: 'Q137738898', link: '/varianten/sidi-barrani/', subclassOf: WIKIDATA.JASS },
          { name: 'Bolschewik', description: 'Doppelkart ohne Sechser, Siebner und Achter, 48 Karten', wikidataId: 'Q137738843', link: '/varianten/bolschewik-4-spieler/', subclassOf: WIKIDATA.JASS },
          { name: 'Kreuzjass', description: 'Partner diagonal', wikidataId: 'Q137738899', subclassOf: WIKIDATA.JASS },
        ],
      },
      {
        name: 'B) Königsspiele (Asymmetrisch)',
        description: 'Ein «König» gegen die «Bauernpartei».',
        items: [
          { name: 'Pandur', description: '24 Karten, streng nach Regeln: Ein Fehler kostet das laufende Spiel', wikidataId: 'Q1125719', link: '/varianten/pandur/', subclassOf: WIKIDATA.JASS },
          { name: 'Bieter', description: '36 Karten, ein König gegen die Bauernpartei', wikidataId: 'Q137738835', link: '/varianten/bieter/', subclassOf: WIKIDATA.JASS },
          { name: 'Aucho', description: '«Erben»-Prinzip: Geber erhält Partner-Punkte', wikidataId: 'Q137739254', link: '/varianten/aucho/', subclassOf: WIKIDATA.JASS },
          { name: 'Schafhauser', description: 'Kein Bieten, Solospieler durch Karten bestimmt', wikidataId: 'Q137738841', link: '/varianten/schafhauser-3-spieler/', subclassOf: WIKIDATA.JASS },
        ],
      },
      {
        name: 'C) Einzelspiele (Jeder für sich)',
        items: [
          { name: 'Differenzler', description: 'Geschrieben wird die Differenz zur Ansage, das kleinste Total gewinnt', wikidataId: 'Q137731684', link: '/varianten/differenzler/', subclassOf: WIKIDATA.JASS },
          { name: 'Mittlere', description: 'Mittlere Punktzahl gewinnt', wikidataId: 'Q137738839', link: '/varianten/mittlere/', subclassOf: WIKIDATA.JASS },
          { name: 'Handjass', description: 'Jeder für sich, die unterste Karte bestimmt den Trumpf', wikidataId: 'Q137738900', link: '/varianten/handjass/', subclassOf: WIKIDATA.JASS },
        ],
      },
      {
        name: 'D) Vermeidungsspiele',
        description: 'Ziel: möglichst wenige Punkte.',
        items: [
          { name: 'Molotow', description: 'Wer als Erster nicht bedienen kann, bestimmt mit seiner Karte den Trumpf. Ein Tischweis zählt plus', wikidataId: 'Q137738837', link: '/varianten/molotow/', subclassOf: WIKIDATA.JASS },
          { name: 'Hindersi', description: 'Einfache Punkteminimierung', wikidataId: 'Q137738838', link: '/varianten/hindersi-allgemein/', subclassOf: WIKIDATA.JASS },
        ],
      },
      {
        name: 'E) Sondervarianten',
        items: [
          { name: 'Chratze', description: 'Pot-Mechanik, nur 4 Karten', wikidataId: 'Q137738836', link: '/varianten/chratze/', subclassOf: WIKIDATA.JASS },
          { name: 'Guggitaler', description: 'Serienjass ohne Trumpf, fünf Spiele mit je eigenem Ziel', wikidataId: 'Q137738902', link: '/varianten/guggitaler/', subclassOf: WIKIDATA.JASS },
          { name: 'Tschau Sepp', description: 'Ablegespiel (Mau-Mau), Lernvariante', wikidataId: 'Q137738840', link: '/varianten/tschau-sepp/', subclassOf: WIKIDATA.JASS },
          { name: 'Zwick-Jass', description: 'Mit «Schlecken» (Karten vom Stapel)', wikidataId: 'Q137738903', link: '/varianten/zwick/', subclassOf: WIKIDATA.JASS },
          { name: 'Zuger', description: 'Geber pausiert, erhält 10 Punkte pauschal', wikidataId: 'Q137738842', link: '/varianten/zuger/', subclassOf: WIKIDATA.JASS },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. SPIELMODI (Ansagen / Jass-Kontrakte)
  // =========================================================================
  {
    id: 'spielmodi',
    name: '2. Spielmodi (Ansagen)',
    description: 'Der Spielmodus bestimmt, welche Karte sticht. Er wird vor jeder Runde angesagt.',
    wikidataId: WIKIDATA.JASS_CONTRACT,
    subcategories: [
      {
        name: 'A) Trumpfspiele',
        description: 'Eine der vier Kartenfarben wird zum Trumpf erklärt und sticht alle anderen.',
        items: [
          { name: 'Trumpf', description: 'Eine Farbe sticht alle anderen. Ihr Under wird zum Puur, ihr Neuner zum Nell' },
        ],
      },
      {
        name: 'B) Richtungsspiele (Kein Trumpf)',
        description: 'Ohne Trumpf: Die Rangfolge der Karten bestimmt den Stich.',
        items: [
          { name: 'Obenabe', description: 'Höchste Karte sticht (A > K > O > U > 10 > 9 > 8 > 7 > 6)', wikidataId: 'Q137737920', link: '/ansagen/obenabe/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Undenufe', description: 'Tiefste Karte sticht (6 > 7 > 8 > 9 > 10 > U > O > K > A)', wikidataId: 'Q137738279', link: '/ansagen/undenufe/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Mitte', description: 'Banner (Zehner) ist die höchste Karte, Stechordnung von innen nach aussen (auch Tännli oder Mezzo)', link: '/ansagen/mitte/', instanceOf: WIKIDATA.JASS_CONTRACT },
        ],
      },
      {
        name: 'C) Kombinationsmodi',
        description: 'Kombination aus mehreren Modi innerhalb einer Runde.',
        items: [
          { name: 'Slalom', description: 'Alternierend Obenabe + Undenufe pro Stich', wikidataId: 'Q137738723', link: '/ansagen/slalom-zickzack/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Quer', description: 'Geteilte Stichfolge: ein Teil Obenabe, ein Teil Undenufe (auch Zwischendurch)', wikidataId: 'Q137739255', link: '/ansagen/quer/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Guschti', description: 'Variante von Quer: zuerst vier Stiche Obenabe, dann fünf Undenufe (Punkte wie Obenabe)', link: '/ansagen/quer/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Mary', description: 'Variante von Quer: zuerst vier Stiche Undenufe, dann fünf Obenabe (Punkte wie Undenufe)', link: '/ansagen/quer/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Trio (3×3)', description: '3 Stiche Trumpf, 3 Obenabe, 3 Undenufe', wikidataId: 'Q137739256', link: '/ansagen/trio-3-3/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Misère', description: 'Die Teams wollen möglichst jeden Stich abgeben', wikidataId: 'Q137739257', link: '/ansagen/misere/', instanceOf: WIKIDATA.JASS_CONTRACT },
          { name: 'Tutti', description: 'Coiffeur-Spielart: Obenabe mit Puur und Nell als höchste Karten, oder mit wechselndem Trumpf', link: '/ansagen/tutti/', instanceOf: WIKIDATA.JASS_CONTRACT },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. KARTEN (36 Karten)
  // =========================================================================
  {
    id: 'karten',
    name: '3. Karten',
    description: 'Das Jass-Blatt besteht aus 36 Karten: 4 Farben × 9 Werte. Es gibt zwei Blattsysteme.',
    subcategories: [
      {
        name: 'A) Sonderkarten = ROLLEN (nur bei Trumpf)',
        description: 'Puur und Nell sind keine Karten, sondern ROLLEN, die Karten bei Trumpf annehmen.',
        items: [
          { name: 'Puur', description: 'ROLLE: Under wird zum höchsten Trumpf, 20 Punkte', wikidataId: 'Q137738724', link: '/begriffe/kartenbezeichnungen/trumpf-puur/', instanceOf: WIKIDATA.GAME_MECHANIC },
          { name: 'Nell', description: 'ROLLE: 9 wird zum zweithöchsten Trumpf, 14 Punkte', wikidataId: 'Q137738725', link: '/begriffe/kartenbezeichnungen/nell/', instanceOf: WIKIDATA.GAME_MECHANIC },
        ],
      },
      {
        name: 'B) Bildkarten',
        items: [
          { name: 'König', description: '4 Punkte, im Trumpf die vierthöchste Karte nach Puur, Nell und Ass', wikidataId: WIKIDATA.KOENIG },
          { name: 'Ober', description: '3 Punkte, Deutschschweizer Blatt', wikidataId: WIKIDATA.OBER },
          { name: 'Dame', description: '3 Punkte, französisches Blatt', wikidataId: WIKIDATA.DAME },
          { name: 'Under', description: '2 Punkte (wird zum Puur bei Trumpf!)', wikidataId: WIKIDATA.UNDER },
        ],
      },
      {
        name: 'C) Zahlkarten',
        items: [
          { name: 'Ass', description: '11 Punkte, die wertvollste Karte ausserhalb des Trumpfs', wikidataId: WIKIDATA.ASS },
          { name: 'Banner / Zehner', description: '10 Punkte' },
          { name: '9', description: '0 Punkte (wird zum Nell bei Trumpf → 14 Punkte!)' },
          { name: '8', description: '0 Punkte (8 Punkte bei Obenabe/Undenufe)' },
          { name: '7', description: '0 Punkte' },
          { name: '6', description: '0 Punkte (11 Punkte bei Undenufe!)' },
        ],
      },
      {
        name: 'D) SCHWEIZER BLATT (traditionell)',
        description: `Das traditionelle Jass-Blatt mit eigenständiger ikonografischer Identität. (${WIKIDATA.SWISS_CARDS_CONTAINER})`,
        items: [
          { name: 'Schellen', description: 'Glöckchen-Symbol, eigenständige Schweizer Farbe', wikidataId: WIKIDATA.SCHELLEN, link: '/begriffe/kartenbezeichnungen/schellen/' },
          { name: 'Schilten', description: 'Wappen- und Schildsymbol', wikidataId: WIKIDATA.SCHILTEN, link: '/begriffe/kartenbezeichnungen/schilten/' },
          { name: 'Rosen', description: 'Rosensymbol, eigene Farbe des Deutschschweizer Blatts', wikidataId: WIKIDATA.ROSEN, link: '/begriffe/kartenbezeichnungen/rosen/' },
          { name: 'Eichel', description: 'Eichel-Symbol', wikidataId: WIKIDATA.EICHEL, link: '/begriffe/kartenbezeichnungen/eichel/' },
        ],
      },
      {
        name: 'E) FRANZÖSISCHES BLATT (alternativ)',
        description: `Das internationale Kartensystem. Wird auch für Jass verwendet, besonders in der Westschweiz. (${WIKIDATA.FRENCH_CARDS_CONTAINER})`,
        items: [
          { name: 'Herz ♥', description: 'Rote Farbe des französischen Blatts', wikidataId: WIKIDATA.HERZ, link: '/begriffe/kartenbezeichnungen/herz/' },
          { name: 'Ecke ♦', description: 'Rote Farbe des französischen Blatts', wikidataId: WIKIDATA.ECKE, link: '/begriffe/kartenbezeichnungen/ecke/' },
          { name: 'Kreuz ♣', description: 'Schwarze Farbe des französischen Blatts', wikidataId: WIKIDATA.KREUZ, link: '/begriffe/kartenbezeichnungen/kreuz/' },
          { name: 'Schaufel ♠', description: 'Schwarze Farbe des französischen Blatts', wikidataId: WIKIDATA.SCHAUFEL, link: '/begriffe/kartenbezeichnungen/schaufel/' },
        ],
      },
      {
        name: 'F) Mapping: Schweizer ↔ Französisch',
        description: 'Funktionale Äquivalente für Spieler mit französischem Blatt (gemäß Jasstafel-App).',
        items: [
          // Aus der einen Zuordnung (src/config/farbenZuordnung.ts, JVS 06.10.2026).
          ...FARBEN_ZUORDNUNG.map((p) => ({
            name: `${p.de} ↔ ${p.fr} ${p.zeichen}`,
            description: 'Spielt dieselbe Rolle, Bild und Name sind verschieden',
            link: `/begriffe/kartenbezeichnungen/${p.deDatei}/`,
          })),
        ],
      },
    ],
  },

  // =========================================================================
  // 4. PUNKTESYSTEM
  // =========================================================================
  {
    id: 'punktesystem',
    name: '4. Punktesystem',
    description: 'Pro Runde werden 157 Punkte verteilt (152 Kartenpunkte + 5 letzter Stich).',
    subcategories: [
      {
        name: 'A) Weispunkte (Kartenkombinationen)',
        description: 'Bonuspunkte für bestimmte Kartenkombinationen, die vor dem ersten Stich gemeldet werden.',
        items: [
          { name: 'Weis', description: 'Punkte für Folgen und vier Gleiche', wikidataId: WIKIDATA.WEIS_CLASS, link: '/weis-regeln/weispunkte/', subclassOf: WIKIDATA.GAME_MECHANIC, partOf: WIKIDATA.JASS },
          { name: 'Dreiblatt', description: '3 aufeinanderfolgende Karten, 20 Punkte', wikidataId: 'Q137738727', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Vierblatt', description: '4 aufeinanderfolgende Karten, 50 Punkte', wikidataId: 'Q137738728', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Fünfblatt', description: '5 aufeinanderfolgende Karten, 100 Punkte', wikidataId: 'Q137739569', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Sechsblatt', description: '6 aufeinanderfolgende Karten, 150 Punkte', wikidataId: 'Q137739570', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Sieben-/Acht-/Neunblatt', description: '7 bis 9 aufeinanderfolgende Karten, 200 bis 300 Punkte', wikidataId: 'Q137739571', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Vier Gleiche', description: '4 Karten gleichen Rangs, 100 bis 200 Punkte', wikidataId: 'Q137738729', link: '/weis-regeln/weispunkte/', instanceOf: WIKIDATA.WEIS_CLASS },
          { name: 'Stöck', description: 'König und Ober der Trumpffarbe, 20 Punkte', wikidataId: 'Q137738329', link: '/weis-regeln/stoeck/', instanceOf: WIKIDATA.WEIS_CLASS },
        ],
      },
      {
        name: 'B) Sonderpunkte',
        items: [
          { name: 'Matsch', description: 'Alle 9 Stiche gewonnen, 100 Punkte Matschprämie', wikidataId: 'Q137738726', link: '/begriffe/punktebegriffe/matsch/', instanceOf: WIKIDATA.GAME_MECHANIC, partOf: WIKIDATA.JASS },
          { name: 'Kontermatsch', description: 'Das Team, das den Trumpf nicht angesagt hat, macht alle Stiche. Gewertet wie ein Matsch mit 257 Punkten, zählt 2 Striche', wikidataId: 'Q137739566', link: '/regeln/punktezaehlung/kontermatsch/', instanceOf: WIKIDATA.GAME_MECHANIC, partOf: WIKIDATA.JASS },
        ],
      },
    ],
  },

  // =========================================================================
  // 5. SPIELABLAUF
  // =========================================================================
  {
    id: 'spielablauf',
    name: '5. Spielablauf',
    description: 'Der strukturierte Ablauf einer Jass-Runde von der Vorbereitung bis zum Abschluss.',
    subcategories: [
      {
        name: 'A) Vorbereitung',
        items: [
          { name: 'Mischen', description: 'Karten durchmischen', wikidataId: WIKIDATA.MISCHEN, link: '/regeln/kartenverteilung/mischen/', instanceOf: WIKIDATA.GAME_MECHANIC },
          { name: 'Abheben', description: 'Gegner hebt ab', wikidataId: WIKIDATA.ABHEBEN, link: '/regeln/kartenverteilung/abheben-der-karten/', instanceOf: WIKIDATA.GAME_MECHANIC },
          { name: 'Geben', description: '3×3 Karten verteilen', wikidataId: WIKIDATA.GEBEN, instanceOf: WIKIDATA.GAME_MECHANIC },
        ],
      },
      {
        name: 'B) Spielaktionen',
        items: [
          { name: 'Schieben', description: 'Vorhand überlässt die Trumpfwahl dem Partner', link: '/begriffe/spielaktionen/schieben/' },
          { name: 'Weisen', description: 'Kartenkombinationen melden', link: '/weis-regeln/weispunkte/' },
          { name: 'Bedanken', description: 'Bei Erreichen der Zielpunktzahl', link: '/begriffe/spielaktionen/bedanken/' },
          { name: 'Schreiben', description: 'Punkte auf Tafel/App notieren', link: '/regeln/schreiben/' },
        ],
      },
    ],
  },

  // =========================================================================
  // 6. REGELN
  // =========================================================================
  {
    id: 'regeln',
    name: '6. Regeln',
    description: 'Die enzyklopädisch relevanten Spielregeln des Jass.',
    subcategories: [
      {
        name: 'A) Kernregeln mit Wikidata-Relevanz',
        description: 'Regeln, die als eigenständige Konzepte auf Wikidata existieren.',
        items: [
          { name: 'Untertrumpf-Verbot', description: 'Liegt schon ein Trumpf im Stich, trumpft man höher. Tiefer trumpfen darf, wer nur noch Trumpfkarten hat', wikidataId: 'Q137739568', instanceOf: WIKIDATA.GAME_MECHANIC },
          { name: 'Stöck-Weis-Stich', description: 'Ausmachregel: Erreichen beide Teams im ersten Stich das Ziel, gilt Stöck vor Weis vor Stich', wikidataId: 'Q137739567', instanceOf: WIKIDATA.GAME_MECHANIC },
        ],
      },
    ],
  },

  // =========================================================================
  // 7. GLOSSAR
  // =========================================================================
  {
    id: 'glossar',
    name: '7. Glossar',
    description: 'Enzyklopädisch relevante Jass-Begriffe mit Wikidata-Verknüpfung.',
    subcategories: [
      {
        name: 'A) Punktebegriffe',
        description: 'Fachbegriffe rund um die Wertung.',
        items: [
          { name: 'Bergpreis', description: 'Ein Strich für das Team, das als Erstes die Hälfte des Spielziels erreicht', wikidataId: 'Q137739565', link: '/regeln/bergpreis/', instanceOf: WIKIDATA.GAME_MECHANIC },
        ],
      },
      {
        name: 'B) Weis-Terminologie',
        description: 'Begriffe rund um die Kartenkombinationen.',
        items: [
          { name: 'Kreuzweis', description: 'Spezialweis: Eine Karte zählt für zwei Weise', wikidataId: 'Q137738904', link: '/weis-regeln/weis-arten/kreuzweis/', instanceOf: WIKIDATA.WEIS_CLASS },
        ],
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Gibt alle Terme mit Wikidata-ID zurück
 */
export function getAllTermsWithWikidata(): TaxonomyTerm[] {
  const terms: TaxonomyTerm[] = [];
  for (const category of JASS_TAXONOMY) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        if (item.wikidataId) {
          terms.push(item);
        }
      }
    }
  }
  return terms;
}

/**
 * Gibt alle Terme zurück (mit und ohne Wikidata-ID)
 */
export function getAllTerms(): TaxonomyTerm[] {
  const terms: TaxonomyTerm[] = [];
  for (const category of JASS_TAXONOMY) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        terms.push(item);
      }
    }
  }
  return terms;
}

/**
 * Zählt die Statistiken der Taxonomie
 */
export function getTaxonomyStats() {
  const allTerms = getAllTerms();
  const termsWithWikidata = getAllTermsWithWikidata();
  
  return {
    totalTerms: allTerms.length,
    termsWithWikidata: termsWithWikidata.length,
    categories: JASS_TAXONOMY.length,
    wikidataCoverage: Math.round((termsWithWikidata.length / allTerms.length) * 100),
  };
}

/**
 * Mapping: Jass-Varianten → Wikidata IDs
 * ========================================
 * Generiert von Agentic Relations MCP Server
 * Datum: 2026-01-15
 */

export interface VariantMetadata {
  wikidataId: string;
  numberOfPlayers?: {
    min: number;
    max: number;
  };
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export const VARIANT_WIKIDATA_MAP: Record<string, VariantMetadata> = {
  // === PARTNERSPIELE (4 Spieler) ===
  // WICHTIG: Schieber hat dedizierte Route /schieber.tsx, nicht /varianten/!
  // Das Mapping verwendet den SLUG aus dem Content (für getStaticPaths)
  // Die tatsächliche URL ist https://jasswiki.ch/schieber/
  'variants-family-coiffeur-schieber': {
    wikidataId: 'Q137731700',
    numberOfPlayers: { min: 4, max: 4 },
    difficulty: 3
  },
  'variants-strategic-sidi-barrani': {
    wikidataId: 'Q137738898',
    numberOfPlayers: { min: 4, max: 4 },
    difficulty: 4
  },
  'kreuzjass': {
    wikidataId: 'Q137738899',
    numberOfPlayers: { min: 4, max: 4 },
    difficulty: 2
  },
  
  // === KÖNIGSSPIELE (Asymmetrisch) ===
  'variants-strategic-pandur': {
    wikidataId: 'Q1125719',
    numberOfPlayers: { min: 2, max: 4 },
    difficulty: 5
  },
  'variants-strategic-bieter-vier': {
    wikidataId: 'Q137738835',
    numberOfPlayers: { min: 3, max: 5 },
    difficulty: 3
  },
  'variants-strategic-aucho-vier': {
    wikidataId: 'Q137739254',
    numberOfPlayers: { min: 3, max: 4 },
    difficulty: 3
  },
  'variants-strategic-schafhauser': {
    wikidataId: 'Q137738841',
    numberOfPlayers: { min: 3, max: 3 },
    difficulty: 3
  },
  
  // === EINZELSPIELE ===
  'variants-strategic-differenzler-verdeckt': {
    wikidataId: 'Q137731684',
    numberOfPlayers: { min: 3, max: 4 },
    difficulty: 3
  },
  'variants-three-player-mittlere': {
    wikidataId: 'Q137738839',
    numberOfPlayers: { min: 4, max: 4 },
    difficulty: 2
  },
  'variants-strategic-handjass': {
    wikidataId: 'Q137738900',
    numberOfPlayers: { min: 2, max: 4 },
    difficulty: 2
  },
  
  // === DESTRUKTIONSSPIELE ===
  'variants-molotow': {
    wikidataId: 'Q137738837',
    numberOfPlayers: { min: 4, max: 6 },
    difficulty: 4
  },
  'variants-specialty-hindersi': {
    wikidataId: 'Q137738838',
    numberOfPlayers: { min: 3, max: 4 },
    difficulty: 2
  },
  
  // === SONDERVARIANTEN ===
  'variants-chratze': {
    wikidataId: 'Q137738836',
    numberOfPlayers: { min: 3, max: 6 },
    difficulty: 2
  },
  'variants-family-guggitaler': {
    wikidataId: 'Q137738902',
    numberOfPlayers: { min: 3, max: 4 },
    difficulty: 2
  },
  'variants-learning-tschau-sepp': {
    wikidataId: 'Q137738840',
    numberOfPlayers: { min: 2, max: 6 },
    difficulty: 1
  },
  'variants-multi-player-zwick-jass': {
    wikidataId: 'Q137738903',
    numberOfPlayers: { min: 3, max: 6 },
    difficulty: 2
  },
  'variants-specialty-zuger-drei': {
    wikidataId: 'Q137738842',
    numberOfPlayers: { min: 3, max: 3 },
    difficulty: 2
  },
  'variants-specialty-stich-differenzler': {
    wikidataId: 'Q137738901',
    numberOfPlayers: { min: 3, max: 4 },
    difficulty: 3
  }
};

/**
 * Get Wikidata ID for a variant slug
 */
export function getVariantWikidataId(slug: string): string | undefined {
  return VARIANT_WIKIDATA_MAP[slug]?.wikidataId;
}

/**
 * Get full metadata for a variant
 */
export function getVariantMetadata(slug: string): VariantMetadata | undefined {
  return VARIANT_WIKIDATA_MAP[slug];
}

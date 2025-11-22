/**
 * Query-Normalisierung für Firebase Functions
 * 
 * Vereinfachte Version der keyword-variants.ts für das Backend.
 * Generiert Query-Varianten für robustes Matching.
 */

// ============================================================================
// JASS-SYNONYM-MAPPING
// ============================================================================

/**
 * Bekannte Varianten → Hauptform
 * Optimiert für schnelles Lookup im Backend
 */
const VARIANT_TO_MAIN: Record<string, string> = {
  // Kartenfarben
  'rosen': 'rose',
  'röse': 'rose',
  'roose': 'rose',
  'schellen': 'schelle',
  'schälle': 'schelle',
  'schaelle': 'schelle',
  'schalle': 'schelle',
  'eicheln': 'eichel',
  'aichel': 'eichel',
  'aicheln': 'eichel',
  'schilten': 'schilte',
  'schilt': 'schilte',
  
  // Kartenwerte
  'as': 'ass',
  'asse': 'ass',
  'koenig': 'könig',
  'könige': 'könig',
  'koenige': 'könig',
  'ober': 'dame',
  'damen': 'dame',
  'bauer': 'under',
  'buur': 'under',
  'buure': 'under',
  'zehner': 'banner',
  '10': 'banner',
  'neun': 'nell',
  '9': 'nell',
  'näll': 'nell',
  
  // Trumpf
  'truempf': 'trumpf',
  'trumpfe': 'trumpf',
  'truempfe': 'trumpf',
  'trömpf': 'trumpf',
  'trump': 'atout',
  
  // Spielbegriffe
  'stoeck': 'stöck',
  'stöcke': 'stöck',
  'stoecke': 'stöck',
  'stöckli': 'stöck',
  'wiis': 'weis',
  'wys': 'weis',
  'wyys': 'weis',
  'weise': 'weis',
  'match': 'matsch',
  'matsche': 'matsch',
  'schiiber': 'schieber',
  'schiebe': 'schieber',
  'coifeur': 'coiffeur',
  'koifeur': 'coiffeur',
  'differänzler': 'differenzler',
  'differaenzler': 'differenzler',
  'molotov': 'molotow',
  'obe-abe': 'obenabe',
  'obeabe': 'obenabe',
  'oben-abe': 'obenabe',
  'unde-ufe': 'undenufe',
  'undeufe': 'undenufe',
  'unten-ufe': 'undenufe',
  'slalum': 'slalom',
  'guscht': 'guschti',
  
  // Regelbegriffe
  'nicht-farben': 'nichtfarben',
  'nichtfarbe': 'nichtfarben',
  'regelverstos': 'regelverstoss',
  'regelverstöss': 'regelverstoss',
  'regel-verstoss': 'regelverstoss',
  'consequenz': 'konsequenz',
  'konseqenz': 'konsequenz',
  'strafen': 'strafe',
  'straf': 'strafe',
};

// ============================================================================
// NORMALISIERUNGS-FUNKTIONEN
// ============================================================================

/**
 * Normalisiert Zeichen (Umlaute → einfache Buchstaben)
 */
function normalizeCharacters(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ß/g, 'ss')
    .trim();
}

/**
 * Ersetzt Wörter durch ihre Hauptform (falls bekannt)
 */
function replaceWithMainForm(text: string): string {
  const words = text.split(/\s+/);
  const replaced = words.map(word => {
    const main = VARIANT_TO_MAIN[word.toLowerCase()];
    return main || word;
  });
  return replaced.join(' ');
}

// ============================================================================
// QUERY-NORMALISIERUNG (Export)
// ============================================================================

/**
 * Generiert Query-Varianten für robustes Matching
 * 
 * Beispiel:
 * Input: "schälle bedeutung"
 * Output: [
 *   "schälle bedeutung",     // Original
 *   "schalle bedeutung",     // Normalisiert (ä → a)
 *   "schelle bedeutung"      // Hauptform
 * ]
 */
export function normalizeQuery(query: string): string[] {
  const variants = new Set<string>();
  
  // 1. Original (unverändert)
  variants.add(query.trim());
  
  // 2. Kleinbuchstaben
  const lower = query.toLowerCase().trim();
  variants.add(lower);
  
  // 3. Zeichen normalisieren (schälle → schalle)
  const normalized = normalizeCharacters(query);
  variants.add(normalized);
  
  // 4. Hauptformen einsetzen (schalle → schelle)
  const withMainForm = replaceWithMainForm(normalized);
  variants.add(withMainForm);
  
  // 5. Kombinationen (lowercase + Hauptform)
  const lowerWithMainForm = replaceWithMainForm(lower);
  variants.add(lowerWithMainForm);
  
  // Filtern: Nur eindeutige, nicht-leere Varianten
  // Max 5 Varianten für Performance
  return Array.from(variants)
    .filter(v => v.length > 0)
    .slice(0, 5);
}


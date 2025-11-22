/**
 * Keyword-Expansion & Query-Normalisierung für robustes Matching
 * 
 * Funktionen:
 * - expandKeywords: Fügt Plural/Singular-Varianten hinzu (für Ingestion)
 * - normalizeQuery: Normalisiert Query für besseres Matching (für Backend)
 * - buildEmbeddingText: Erstellt angereicherten Text für Embeddings
 */

// ============================================================================
// JASS-SPEZIFISCHES MAPPING
// ============================================================================

/**
 * Bekannte Jass-Begriffe mit ihren Varianten
 * Format: Hauptform → [Varianten]
 */
const JASS_VARIANTS: Record<string, string[]> = {
  // Kartenfarben
  'rose': ['rosen', 'röse', 'roose'],
  'schelle': ['schellen', 'schälle', 'schaelle', 'schalle'],
  'eichel': ['eicheln', 'aichel', 'aicheln'],
  'schilte': ['schilten', 'schilt'],
  
  // Kartenwerte
  'ass': ['as', 'asse'],
  'könig': ['koenig', 'könige', 'koenige'],
  'dame': ['damen', 'ober'],
  'under': ['bauer', 'buur', 'buure', 'under'],
  'buur': ['bauer', 'under', 'buure'],
  'banner': ['zehner', '10'],
  'nell': ['neun', '9', 'näll'],
  
  // Trumpf
  'trumpf': ['truempf', 'trumpfe', 'truempfe', 'trömpf'],
  'atout': ['trump'],
  
  // Spielbegriffe
  'stöck': ['stoeck', 'stöcke', 'stoecke', 'stöckli'],
  'weis': ['wiis', 'wys', 'wyys', 'weise'],
  'matsch': ['match', 'matsche'],
  'schieber': ['schiiber', 'schiebe'],
  'coiffeur': ['coifeur', 'koifeur'],
  'differenzler': ['differänzler', 'differaenzler'],
  'molotow': ['molotov'],
  'obenabe': ['obe-abe', 'obeabe', 'oben-abe'],
  'undenufe': ['unde-ufe', 'undeufe', 'unten-ufe'],
  'slalom': ['slalum'],
  'guschti': ['guscht', 'guschti'],
  
  // Regelbegriffe
  'nichtfarben': ['nicht-farben', 'nichtfarbe'],
  'regelverstoss': ['regelverstos', 'regelverstöss', 'regel-verstoss'],
  'konsequenz': ['consequenz', 'konseqenz'],
  'strafe': ['strafen', 'straf'],
};

/**
 * Reverse-Mapping: Variante → Hauptform
 */
const VARIANT_TO_MAIN: Record<string, string> = {};
for (const [main, variants] of Object.entries(JASS_VARIANTS)) {
  for (const variant of variants) {
    VARIANT_TO_MAIN[variant.toLowerCase()] = main;
  }
  VARIANT_TO_MAIN[main.toLowerCase()] = main; // Hauptform auch eintragen
}

// ============================================================================
// DEUTSCHE PLURAL-REGELN
// ============================================================================

/**
 * Generiert einfache deutsche Plural-Formen
 */
function generateGermanPlurals(word: string): string[] {
  const lower = word.toLowerCase();
  const plurals: string[] = [];
  
  // Bereits im Plural (endet auf -en, -er, -e + n)
  if (lower.endsWith('en') || lower.endsWith('ern')) {
    return plurals;
  }
  
  // Regel 1: -e → -en (z.B. Karte → Karten)
  if (lower.endsWith('e')) {
    plurals.push(lower + 'n');
  }
  
  // Regel 2: Konsonant → -en (z.B. Trumpf → Trumpfen)
  else if (!/[aeiou]$/.test(lower)) {
    plurals.push(lower + 'en');
    plurals.push(lower + 'e'); // Alternative
  }
  
  // Regel 3: -el, -er → -n (z.B. Spieler → Spielern)
  else if (lower.endsWith('el') || lower.endsWith('er')) {
    plurals.push(lower + 'n');
  }
  
  return plurals;
}

// ============================================================================
// KEYWORD-EXPANSION (für Ingestion)
// ============================================================================

/**
 * Erweitert Keywords um Varianten (Plural, Synonyme, Schreibweisen)
 * Wird bei der Ingestion verwendet, damit Embeddings alle Varianten enthalten.
 */
export function expandKeywords(keywords: string[]): string[] {
  const expanded = new Set<string>();
  
  for (const keyword of keywords) {
    const lower = keyword.toLowerCase();
    expanded.add(lower);
    
    // 1. Jass-spezifische Varianten
    if (JASS_VARIANTS[lower]) {
      JASS_VARIANTS[lower].forEach(v => expanded.add(v));
    }
    
    // 2. Reverse-Lookup (falls Variante eingegeben wurde)
    if (VARIANT_TO_MAIN[lower]) {
      const main = VARIANT_TO_MAIN[lower];
      expanded.add(main);
      if (JASS_VARIANTS[main]) {
        JASS_VARIANTS[main].forEach(v => expanded.add(v));
      }
    }
    
    // 3. Deutsche Plural-Regeln
    const plurals = generateGermanPlurals(lower);
    plurals.forEach(p => expanded.add(p));
  }
  
  return Array.from(expanded).sort();
}

// ============================================================================
// EMBEDDING-TEXT BUILDER (für Ingestion)
// ============================================================================

/**
 * Erstellt angereicherten Text für Embeddings
 * Format: Originaltext + Schlüsselwörter
 */
export function buildEmbeddingText(
  originalText: string,
  keywords: string[],
  title?: string
): string {
  const parts = [originalText];
  
  if (title) {
    parts.push(`\nTitel: ${title}`);
  }
  
  if (keywords.length > 0) {
    parts.push(`\nSchlagworte: ${keywords.join(', ')}`);
  }
  
  return parts.join('');
}

// ============================================================================
// QUERY-NORMALISIERUNG (für Backend)
// ============================================================================

/**
 * Normalisiert Zeichen (Umlaute, etc.)
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

/**
 * Generiert Query-Varianten für robustes Matching
 * Wird im Backend verwendet, um mehrere Embeddings zu testen
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
  
  // 5. Kombinationen (Original normalisiert + Hauptform)
  const lowerWithMainForm = replaceWithMainForm(lower);
  variants.add(lowerWithMainForm);
  
  // Filtern: Nur eindeutige, nicht-leere Varianten
  return Array.from(variants)
    .filter(v => v.length > 0)
    .slice(0, 5); // Max 5 Varianten (Performance)
}

// ============================================================================
// EXPORT
// ============================================================================

export default {
  expandKeywords,
  buildEmbeddingText,
  normalizeQuery,
  JASS_VARIANTS,
};

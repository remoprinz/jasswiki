/**
 * URL-Utilities für JassWiki (ES Module Version)
 * 
 * SINGLE SOURCE OF TRUTH für alle URL-Generierungen.
 * Diese Datei spiegelt die Logik aus src/lib/url-utils.ts
 * 
 * WICHTIG: Bei Änderungen BEIDE Dateien aktualisieren!
 * 
 * REGEL: 
 * - Varianten haben IMMER 2 Ebenen: /varianten/{topic}/
 * - Artikel wo sub === topic haben 2 Ebenen: /{category}/{topic}/
 * - Alle anderen haben 3 Ebenen: /{category}/{subcategory}/{topic}/
 */

/**
 * Konvertiert Text zu URL-Slug.
 * @param {string} text
 * @returns {string}
 */
export function toSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/à|á|â|ã|å|è|é|ê|ë|ì|í|î|ï|ò|ó|ô|õ|ù|ú|û|ü|ý|ÿ/g, (match) => {
      const map = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'å': 'a',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
        'ù': 'u', 'ú': 'u', 'û': 'u',
        'ý': 'y', 'ÿ': 'y'
      };
      return map[match] || match;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Prüft, ob ein Artikel eine flache URL-Struktur (2 Ebenen) haben sollte.
 * 
 * @param {string} mainSlug - Slug der Hauptkategorie
 * @param {string} subSlug - Slug der Unterkategorie
 * @param {string} topicSlug - Slug des Topics
 * @returns {boolean} true wenn 2-Ebenen-URL, false wenn 3-Ebenen-URL
 */
export function isFlatStructure(mainSlug, subSlug, topicSlug) {
  // Varianten haben IMMER flache Struktur
  if (mainSlug === 'varianten') {
    return true;
  }
  
  // Wenn sub === topic, ist es ein "flacher" Artikel
  if (subSlug === topicSlug) {
    return true;
  }
  
  return false;
}

/**
 * Generiert die kanonische URL für einen Artikel.
 * 
 * @param {{ main: string, sub: string, topic: string }} category
 * @returns {string} Relative URL
 */
export function buildArticleUrl(category) {
  const mainSlug = toSlug(category.main);
  const subSlug = toSlug(category.sub);
  const topicSlug = toSlug(category.topic);
  
  if (isFlatStructure(mainSlug, subSlug, topicSlug)) {
    return `/${mainSlug}/${topicSlug}/`;
  }
  
  return `/${mainSlug}/${subSlug}/${topicSlug}/`;
}

/**
 * Generiert die vollständige kanonische URL (mit Domain).
 * 
 * @param {{ main: string, sub: string, topic: string }} category
 * @param {string} baseUrl
 * @returns {string}
 */
export function buildCanonicalUrl(category, baseUrl = 'https://jasswiki.ch') {
  const path = buildArticleUrl(category);
  return `${baseUrl}${path}`;
}

/**
 * Validiert eine URL auf korrekte Struktur.
 * 
 * @param {string} url
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validateUrl(url) {
  const cleanUrl = url.replace(/^\//, '').replace(/\/$/, '');
  const segments = cleanUrl.split('/');
  
  // Prüfe auf doppelte aufeinanderfolgende Segmente
  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i] === segments[i + 1]) {
      return {
        isValid: false,
        error: `Doppeltes Segment: "${segments[i]}" in URL "${url}"`
      };
    }
  }
  
  // Prüfe auf leere Segmente
  if (segments.some(s => s === '')) {
    return {
      isValid: false,
      error: `Leeres Segment in URL "${url}"`
    };
  }
  
  // Prüfe auf gültige Anzahl Segmente (1-3)
  // 1 Segment = Kategorie-Übersichtsseite (z.B. /regeln/)
  // 2 Segmente = Flacher Artikel (z.B. /geschichte/artikel-titel/)
  // 3 Segmente = Normaler Artikel (z.B. /regeln/kartenverteilung/abheben/)
  if (segments.length < 1 || segments.length > 3) {
    return {
      isValid: false,
      error: `Ungültige Anzahl Segmente (${segments.length}) in URL "${url}"`
    };
  }
  
  return { isValid: true };
}

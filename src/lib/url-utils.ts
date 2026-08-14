/**
 * URL-Utilities für JassWiki
 * 
 * SINGLE SOURCE OF TRUTH für alle URL-Generierungen.
 * Diese Datei ist die einzige Stelle, an der die URL-Logik definiert wird.
 * 
 * REGEL: 
 * - Varianten haben IMMER 2 Ebenen: /varianten/{topic}/
 * - Artikel wo sub === topic haben 2 Ebenen: /{category}/{topic}/
 * - Alle anderen haben 3 Ebenen: /{category}/{subcategory}/{topic}/
 */

import { toSlug } from './utils';

// Re-export toSlug für Konsistenz
export { toSlug };

export interface ArticleCategory {
  main: string;
  sub: string;
  topic: string;
}

/**
 * Prüft, ob ein Artikel eine flache URL-Struktur (2 Ebenen) haben sollte.
 * 
 * @param mainSlug - Slug der Hauptkategorie
 * @param subSlug - Slug der Unterkategorie
 * @param topicSlug - Slug des Topics
 * @returns true wenn 2-Ebenen-URL, false wenn 3-Ebenen-URL
 */
export function isFlatStructure(mainSlug: string, subSlug: string, topicSlug: string): boolean {
  // Varianten und Ansagen haben IMMER flache Struktur
  if (mainSlug === 'varianten' || mainSlug === 'ansagen') {
    return true;
  }
  
  // Wenn sub === topic, ist es ein "flacher" Artikel (z.B. Geschichte direkt unter Kategorie)
  if (subSlug === topicSlug) {
    return true;
  }
  
  return false;
}

/**
 * Generiert die kanonische URL für einen Artikel.
 * 
 * WICHTIG: Diese Funktion ist die EINZIGE Stelle, an der URLs generiert werden sollten.
 * 
 * @param category - Kategorie-Objekt mit main, sub, topic
 * @returns Relative URL (z.B. "/regeln/kartenverteilung/abheben-der-karten/")
 */
export function buildArticleUrl(category: ArticleCategory): string {
  const mainSlug = toSlug(category.main);
  const subSlug = toSlug(category.sub);
  const topicSlug = toSlug(category.topic);
  
  if (isFlatStructure(mainSlug, subSlug, topicSlug)) {
    return `/${mainSlug}/${topicSlug}/`;
  }
  
  return `/${mainSlug}/${subSlug}/${topicSlug}/`;
}

/**
 * Generiert die kanonische URL für einen Artikel aus Slugs.
 * 
 * @param mainSlug - Slug der Hauptkategorie
 * @param subSlug - Slug der Unterkategorie  
 * @param topicSlug - Slug des Topics
 * @returns Relative URL
 */
export function buildArticleUrlFromSlugs(mainSlug: string, subSlug: string, topicSlug: string): string {
  if (isFlatStructure(mainSlug, subSlug, topicSlug)) {
    return `/${mainSlug}/${topicSlug}/`;
  }
  
  return `/${mainSlug}/${subSlug}/${topicSlug}/`;
}

/**
 * Generiert die vollständige kanonische URL (mit Domain).
 * 
 * @param category - Kategorie-Objekt
 * @param baseUrl - Basis-URL (default: https://jasswiki.ch)
 * @returns Vollständige URL
 */
export function buildCanonicalUrl(category: ArticleCategory, baseUrl: string = 'https://jasswiki.ch'): string {
  const path = buildArticleUrl(category);
  return `${baseUrl}${path}`;
}

/**
 * Validiert eine URL auf korrekte Struktur.
 * Prüft auf doppelte Segmente und andere Anomalien.
 * 
 * @param url - Die zu prüfende URL
 * @returns Objekt mit isValid und optionaler Fehlermeldung
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  // Entferne führenden Slash und trailing Slash
  const cleanUrl = url.replace(/^\//, '').replace(/\/$/, '');
  const segments = cleanUrl.split('/');
  
  // Prüfe auf doppelte aufeinanderfolgende Segmente (z.B. /foo/bar/bar/)
  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i] === segments[i + 1]) {
      return {
        isValid: false,
        error: `Doppeltes Segment gefunden: "${segments[i]}" in URL "${url}"`
      };
    }
  }
  
  // Prüfe auf leere Segmente (z.B. /foo//bar/)
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
      error: `Ungültige Anzahl Segmente (${segments.length}) in URL "${url}". Erwartet: 1-3.`
    };
  }
  
  return { isValid: true };
}

/**
 * Analysiert eine bestehende URL und extrahiert die Komponenten.
 * 
 * @param url - Die zu analysierende URL
 * @returns Objekt mit category, subcategory, topic (oder null bei ungültiger URL)
 */
export function parseArticleUrl(url: string): { 
  category: string; 
  subcategory: string | null; 
  topic: string;
  isFlat: boolean;
} | null {
  // Entferne Domain falls vorhanden
  let path = url.replace(/^https?:\/\/[^/]+/, '');
  
  // Entferne führenden und trailing Slash
  path = path.replace(/^\//, '').replace(/\/$/, '');
  
  const segments = path.split('/');
  
  if (segments.length === 2) {
    // Flache Struktur: /category/topic/
    return {
      category: segments[0],
      subcategory: null,
      topic: segments[1],
      isFlat: true
    };
  }
  
  if (segments.length === 3) {
    // 3-Ebenen-Struktur: /category/subcategory/topic/
    return {
      category: segments[0],
      subcategory: segments[1],
      topic: segments[2],
      isFlat: false
    };
  }
  
  return null;
}

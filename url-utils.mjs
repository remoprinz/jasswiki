/**
 * URL-Utilities für JassWiki (Build-/Script-Version, ESM).
 *
 * Diese Datei existiert, damit Node-Skripte wie `validate-urls.mjs`
 * die identische URL-Logik verwenden können wie die App (`src/lib/url-utils.ts`),
 * ohne TypeScript-Transpilation.
 *
 * REGEL:
 * - Varianten haben IMMER 2 Ebenen: /varianten/{topic}/
 * - Artikel wo sub === topic haben 2 Ebenen: /{category}/{topic}/
 * - Alle anderen haben 3 Ebenen: /{category}/{subcategory}/{topic}/
 */

/**
 * Converts a string to a URL-friendly slug.
 * (Gleiches Verhalten wie `src/lib/utils.ts`.)
 */
export const toSlug = (str) => {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/à|á|â|ã|å|è|é|ê|ë|ì|í|î|ï|ò|ó|ô|õ|ù|ú|û|ü|ý|ÿ/g, (match) => {
      const map = {
        à: 'a', á: 'a', â: 'a', ã: 'a', å: 'a',
        è: 'e', é: 'e', ê: 'e', ë: 'e',
        ì: 'i', í: 'i', î: 'i', ï: 'i',
        ò: 'o', ó: 'o', ô: 'o', õ: 'o',
        ù: 'u', ú: 'u', û: 'u',
        ý: 'y', ÿ: 'y',
      };
      return map[match] || match;
    })
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export function isFlatStructure(mainSlug, subSlug, topicSlug) {
  if (mainSlug === 'varianten') return true;
  if (subSlug === topicSlug) return true;
  return false;
}

export function buildArticleUrl(category) {
  const mainSlug = toSlug(category.main);
  const subSlug = toSlug(category.sub);
  const topicSlug = toSlug(category.topic);

  if (isFlatStructure(mainSlug, subSlug, topicSlug)) {
    return `/${mainSlug}/${topicSlug}/`;
  }

  return `/${mainSlug}/${subSlug}/${topicSlug}/`;
}

export function buildCanonicalUrl(category, baseUrl = 'https://jasswiki.ch') {
  const path = buildArticleUrl(category);
  return `${baseUrl}${path}`;
}

export function validateUrl(url) {
  const cleanUrl = url.replace(/^\//, '').replace(/\/$/, '');
  const segments = cleanUrl.split('/');

  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i] === segments[i + 1]) {
      return {
        isValid: false,
        error: `Doppeltes Segment gefunden: "${segments[i]}" in URL "${url}"`,
      };
    }
  }

  if (segments.some((s) => s === '')) {
    return {
      isValid: false,
      error: `Leeres Segment in URL "${url}"`,
    };
  }

  if (segments.length < 1 || segments.length > 3) {
    return {
      isValid: false,
      error: `Ungültige Anzahl Segmente (${segments.length}) in URL "${url}". Erwartet: 1-3.`,
    };
  }

  return { isValid: true };
}


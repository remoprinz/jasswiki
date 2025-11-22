/**
 * Extrahiert URLs aus sitemap.xml und erstellt ein ID → URL Mapping
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sitemapPath = join(__dirname, '../../public/sitemap.xml');

const sitemapContent = readFileSync(sitemapPath, 'utf-8');

// Extrahiere alle URLs
const urlMatches = sitemapContent.matchAll(/<loc>(https:\/\/jasswiki\.ch\/[^<]+)<\/loc>/g);

const urlMap = new Map<string, string>();

for (const match of urlMatches) {
  const fullUrl = match[1];
  const path = fullUrl.replace('https://jasswiki.ch/', '').replace(/\/$/, '');
  
  // Extrahiere die ID (letzter Teil des Pfads)
  const parts = path.split('/');
  const id = parts[parts.length - 1];
  
  // Speichere: ID → Vollständige URL
  urlMap.set(id, fullUrl);
  
  // Auch für "expressions_rose" → "rose" Mapping
  if (id && !id.includes('expressions_')) {
    urlMap.set(`expressions_${id}`, fullUrl);
  }
}

console.log(`Found ${urlMap.size} URLs in sitemap`);

// Export für Nutzung
export function getCanonicalURLFromSitemap(id: string): string | null {
  // Direktes Mapping
  if (urlMap.has(id)) {
    return urlMap.get(id)!;
  }
  
  // Clean ID (entferne Präfixe)
  const cleaned = cleanArticleIdForURL(id);
  if (urlMap.has(cleaned)) {
    return urlMap.get(cleaned)!;
  }
  
  return null;
}

function cleanArticleIdForURL(id: string): string {
  const prefixes = [
    /^expressions_/i,
    /^faq_/i,
    /^general_/i,
  ];
  
  let cleaned = id;
  for (const prefix of prefixes) {
    cleaned = cleaned.replace(prefix, '');
  }
  
  return cleaned;
}

// Test
console.log('Test: expressions_rose ->', getCanonicalURLFromSitemap('expressions_rose'));
console.log('Test: rose ->', getCanonicalURLFromSitemap('rose'));
console.log('Test: abheben ->', getCanonicalURLFromSitemap('abheben'));


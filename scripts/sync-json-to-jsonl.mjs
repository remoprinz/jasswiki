#!/usr/bin/env node

/**
 * Sync-Script: jass-content-v2.json → jasswiki-articles.jsonl
 * 
 * Konvertiert die JSON-Hauptdatenbank in das JSONL-Format für ChatGPT GPT.
 * 
 * FUNKTIONEN:
 * 1. Lädt jass-content-v2.json
 * 2. Konvertiert jeden Artikel zu JSONL-Format
 * 3. Generiert canonical_url aus Metadata-Kategorien
 * 4. Extrahiert variant aus Keywords
 * 5. Konvertiert text → body (normalisiert Format)
 * 6. Schreibt jasswiki-articles.jsonl
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_FILE = path.join(__dirname, '../src/data/jass-content-v2.json');
const JSONL_FILE = path.join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');
const URL_MAPPING_FILE = path.join(__dirname, '../lib/url-mapping.json');

// Helper: Konvertiert Text zu URL-Slug
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper: Lädt URL-Mapping
function loadUrlMapping() {
  try {
    if (fs.existsSync(URL_MAPPING_FILE)) {
      return JSON.parse(fs.readFileSync(URL_MAPPING_FILE, 'utf-8'));
    }
  } catch (error) {
    console.warn('   ⚠️  Konnte URL-Mapping nicht laden, verwende Fallback-Logik');
  }
  return {};
}

// Helper: Baut Canonical URL
function buildCanonicalURL(categoryMain, categorySub, topic, id, urlMapping) {
  // 1. Priorität: URL-Mapping (für historische URLs)
  if (urlMapping[id]) {
    // Mapping kann entweder ein absoluter Link oder ein Pfad sein
    const mapped = urlMapping[id];
    if (typeof mapped === 'string' && mapped.startsWith('http')) return mapped;
    return `https://jasswiki.ch${mapped}`;
  }
  
  // Versuche Mapping ohne Präfix
  const cleanId = id.replace(/^expressions_/, '').replace(/^general_/, '').replace(/_/g, '-');
  if (urlMapping[cleanId]) {
    const mapped = urlMapping[cleanId];
    if (typeof mapped === 'string' && mapped.startsWith('http')) return mapped;
    return `https://jasswiki.ch${mapped}`;
  }

  // 2. Fallback: Generierte URL basierend auf Kategorie-Struktur
  const catSlug = toSlug(categoryMain);
  let subSlug = toSlug(categorySub);
  const topicSlug = toSlug(topic);
  
  // Spezialfall: Keine Subkategorie (z.B. "Regeln")
  if (categoryMain === categorySub) {
    return `https://jasswiki.ch/${catSlug}/${topicSlug}/`;
  }
  
  return `https://jasswiki.ch/${catSlug}/${subSlug}/${topicSlug}/`;
}

// Helper: Extrahiert Variante aus Keywords/Text
function extractVariant(keywords, text) {
  const variantKeywords = [
    'schieber', 'coiffeur', 'differenzler', 'bieter', 'pandur', 
    'molotow', 'hindersi', 'obeabe', 'undenufe', 'slalom', 
    'aucho', 'tschau sepp', 'guggitaler'
  ];
  
  // Prüfe Keywords
  for (const kw of keywords) {
    if (variantKeywords.includes(kw.toLowerCase())) {
      // Formatiere schön (erster Buchstabe gross)
      return kw.charAt(0).toUpperCase() + kw.slice(1);
    }
  }
  
  return null;
}

// Helper: Normalisiert Text zu Body
function normalizeTextToBody(text) {
  // Entferne mehrfache Leerzeilen
  let body = text.replace(/\n{3,}/g, '\n\n');
  
  // Stelle sicher, dass Bulletpoints korrekt formatiert sind
  body = body.replace(/^\s*•/gm, '•');
  
  return body.trim();
}

// Helper: Erstelle Tags aus Keywords und Kategorien
function createTags(catMain, catSub, keywords) {
  const tags = new Set();
  
  tags.add(catMain);
  tags.add(catSub);
  
  keywords.forEach(k => tags.add(k));
  
  tags.add('LEARNING'); // Standard-Tag für alle Artikel
  
  return Array.from(tags);
}

// === MAIN PROCESS ===

console.log('🚀 Starte Sync-Prozess: JSON → JSONL\n');

// 1. Lade JSON-Datei
console.log('📖 Lade jass-content-v2.json...');
const jsonContent = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
const articles = Object.values(jsonContent);
console.log(`   ✅ ${articles.length} Artikel geladen\n`);

// 2. Lade URL-Mapping
console.log('🗺️  Lade URL-Mapping...');
const urlMapping = loadUrlMapping();
console.log(`   ✅ ${Object.keys(urlMapping).length} URL-Mappings geladen\n`);

// 3. Konvertiere Artikel zu JSONL-Format
console.log('🔄 Konvertiere Artikel zu JSONL-Format...');
const jsonlArticles = [];
let processedCount = 0;
let variantCount = 0;
let synonymCount = 0;
let urlGeneratedCount = 0;
let urlMappedCount = 0;

for (const article of articles) {
  if (!article.id || !article.metadata) {
    console.warn(`   ⚠️  Überspringe Artikel ohne ID oder Metadata: ${JSON.stringify(article).substring(0, 50)}`);
    continue;
  }
  
  const { category, keywords = [] } = article.metadata;
  const { main: categoryMain, sub: categorySub, topic } = category;
  
  // Extrahiere Variant
  const variant = extractVariant(keywords, article.text);
  if (variant) variantCount++;
  
  // Generiere Canonical URL
  const canonicalUrl = buildCanonicalURL(
    categoryMain,
    categorySub,
    topic,
    article.id,
    urlMapping
  );
  
  if (urlMapping[article.id] || urlMapping[article.id.replace(/^expressions_/, '').replace(/^general_/, '').replace(/_/g, '-')]) {
    urlMappedCount++;
  } else {
    urlGeneratedCount++;
  }
  
  // Erstelle Tags
  const tags = createTags(categoryMain, categorySub, keywords);
  
  // Normalisiere Text zu Body
  const body = normalizeTextToBody(article.text);
  
  // Extrahiere Synonyme (auf Root-Level gespeichert)
  const synonyms = article.synonyms || [];
  if (synonyms.length > 0) synonymCount++;
  
  // Erstelle JSONL-Artikel
  const jsonlArticle = {
    id: article.id,
    title: topic,
    variant: variant,
    tags: tags,
    synonyms: synonyms,
    see_also: article.see_also || [],
    language: 'de-CH',
    body: body,
    canonical_url: canonicalUrl
  };
  
  jsonlArticles.push(jsonlArticle);
  processedCount++;
  
  if (processedCount % 50 === 0) {
    console.log(`   ✅ ${processedCount}/${articles.length} Artikel verarbeitet...`);
  }
}

console.log(`   ✅ ${processedCount} Artikel konvertiert\n`);

// 4. Schreibe JSONL-Datei
console.log('💾 Schreibe jasswiki-articles.jsonl...');
const jsonlContentFile = jsonlArticles
  .map(article => JSON.stringify(article))
  .join('\n');

fs.writeFileSync(JSONL_FILE, jsonlContentFile + '\n', 'utf-8');
console.log(`   ✅ ${jsonlArticles.length} Artikel geschrieben\n`);

// 5. Statistik
console.log('📊 Statistik:');
console.log(`   - Artikel gesamt: ${processedCount}`);
console.log(`   - Mit Variante: ${variantCount}`);
console.log(`   - Mit Synonymen: ${synonymCount}`);
console.log(`   - URLs (Mapped): ${urlMappedCount}`);
console.log(`   - URLs (Generated): ${urlGeneratedCount}`);
console.log(`   - Output: ${path.relative(process.cwd(), JSONL_FILE)}`);

console.log('\n✨ Sync erfolgreich abgeschlossen!');

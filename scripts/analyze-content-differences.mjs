#!/usr/bin/env node

/**
 * Content-Differenz-Analyse: jass-content-v2.json vs jasswiki-articles.jsonl
 * 
 * Analysiert:
 * 1. Welche Artikel existieren nur in JSON?
 * 2. Welche Artikel existieren nur in JSONL?
 * 3. Welche Artikel existieren in beiden (Content-Vergleich)?
 * 4. Struktur-Unterschiede
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_FILE = path.join(__dirname, '../src/data/jass-content-v2.json');
const JSONL_FILE = path.join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');

console.log('🔍 Content-Differenz-Analyse gestartet...\n');

// 1. Lade JSON-Datei
console.log('📖 Lade jass-content-v2.json...');
const jsonContent = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
const jsonIds = new Set(Object.keys(jsonContent));
console.log(`   ✅ ${jsonIds.size} Artikel geladen\n`);

// 2. Lade JSONL-Datei
console.log('📖 Lade jasswiki-articles.jsonl...');
const jsonlLines = fs.readFileSync(JSONL_FILE, 'utf-8')
  .split('\n')
  .filter(line => line.trim());

const jsonlArticles = {};
const jsonlIds = new Set();

for (const line of jsonlLines) {
  try {
    const article = JSON.parse(line);
    if (article.id) {
      jsonlIds.add(article.id);
      jsonlArticles[article.id] = article;
    }
  } catch (e) {
    console.warn(`   ⚠️  Fehler beim Parsen einer Zeile: ${e.message}`);
  }
}

console.log(`   ✅ ${jsonlIds.size} Artikel geladen\n`);

// 3. Vergleiche IDs
console.log('🔍 Analysiere Unterschiede...\n');

const onlyInJson = [...jsonIds].filter(id => !jsonlIds.has(id));
const onlyInJsonl = [...jsonlIds].filter(id => !jsonIds.has(id));
const inBoth = [...jsonIds].filter(id => jsonlIds.has(id));

console.log('📊 STATISTIKEN:');
console.log(`   Artikel nur in JSON:     ${onlyInJson.length}`);
console.log(`   Artikel nur in JSONL:     ${onlyInJsonl.length}`);
console.log(`   Artikel in beiden:        ${inBoth.length}`);
console.log(`   Gesamt JSON:              ${jsonIds.size}`);
console.log(`   Gesamt JSONL:             ${jsonlIds.size}\n`);

// 4. Detaillierte Analyse
if (onlyInJson.length > 0) {
  console.log('📋 ARTIKEL NUR IN JSON:');
  console.log(`   (${onlyInJson.length} Artikel)\n`);
  onlyInJson.slice(0, 20).forEach(id => {
    const article = jsonContent[id];
    const category = article?.metadata?.category?.main || 'UNKNOWN';
    const topic = article?.metadata?.category?.topic || id;
    console.log(`   - ${id} [${category}] ${topic}`);
  });
  if (onlyInJson.length > 20) {
    console.log(`   ... und ${onlyInJson.length - 20} weitere\n`);
  } else {
    console.log('');
  }
}

if (onlyInJsonl.length > 0) {
  console.log('📋 ARTIKEL NUR IN JSONL:');
  console.log(`   (${onlyInJsonl.length} Artikel)\n`);
  onlyInJsonl.slice(0, 20).forEach(id => {
    const article = jsonlArticles[id];
    const tags = article?.tags || [];
    const categoryTag = tags.find(t => ['Regeln', 'Begriffe', 'Varianten', 'Geschichte', 'Taktiken', 'Weis-Regeln'].includes(t)) || 'UNKNOWN';
    console.log(`   - ${id} [${categoryTag}] ${article?.title || id}`);
  });
  if (onlyInJsonl.length > 20) {
    console.log(`   ... und ${onlyInJsonl.length - 20} weitere\n`);
  } else {
    console.log('');
  }
}

// 5. Struktur-Analyse für gemeinsame Artikel
console.log('🔍 STRUKTUR-ANALYSE (gemeinsame Artikel):\n');

let structureAnalysis = {
  jsonHasMetadata: 0,
  jsonlHasVariant: 0,
  jsonlHasCanonicalUrl: 0,
  jsonHasFaqs: 0,
  jsonlHasSeeAlso: 0,
  jsonHasSeeAlso: 0,
};

inBoth.slice(0, 50).forEach(id => {
  const jsonArticle = jsonContent[id];
  const jsonlArticle = jsonlArticles[id];
  
  if (jsonArticle?.metadata) structureAnalysis.jsonHasMetadata++;
  if (jsonlArticle?.variant) structureAnalysis.jsonlHasVariant++;
  if (jsonlArticle?.canonical_url) structureAnalysis.jsonlHasCanonicalUrl++;
  if (jsonArticle?.faqs?.length > 0) structureAnalysis.jsonHasFaqs++;
  if (jsonlArticle?.see_also?.length > 0) structureAnalysis.jsonlHasSeeAlso++;
  if (jsonArticle?.see_also?.length > 0) structureAnalysis.jsonHasSeeAlso++;
});

console.log('   Struktur-Features (Sample von 50 gemeinsamen Artikeln):');
console.log(`   JSON hat metadata:        ${structureAnalysis.jsonHasMetadata}/50`);
console.log(`   JSONL hat variant:         ${structureAnalysis.jsonlHasVariant}/50`);
console.log(`   JSONL hat canonical_url:   ${structureAnalysis.jsonlHasCanonicalUrl}/50`);
console.log(`   JSON hat FAQs:             ${structureAnalysis.jsonHasFaqs}/50`);
console.log(`   JSONL hat see_also:        ${structureAnalysis.jsonlHasSeeAlso}/50`);
console.log(`   JSON hat see_also:         ${structureAnalysis.jsonHasSeeAlso}/50\n`);

// 6. Kategorie-Vergleich
console.log('📊 KATEGORIE-VERGLEICH:\n');

const jsonCategories = new Set();
Object.values(jsonContent).forEach(article => {
  if (article.metadata?.category?.main) {
    jsonCategories.add(article.metadata.category.main);
  }
});

const jsonlCategories = new Set();
Object.values(jsonlArticles).forEach(article => {
  const categoryTag = article.tags?.find(t => 
    ['Regeln', 'Begriffe', 'Varianten', 'Geschichte', 'Taktiken', 'Weis-Regeln', 'Grundlagen & Kultur', 'Jassapps'].includes(t)
  );
  if (categoryTag) {
    jsonlCategories.add(categoryTag);
  }
});

console.log('   JSON Kategorien:');
jsonCategories.forEach(cat => console.log(`     - ${cat}`));
console.log('\n   JSONL Kategorien:');
jsonlCategories.forEach(cat => console.log(`     - ${cat}`));
console.log('');

// 7. Schieber-spezifische Analyse
console.log('🎯 SCHIEBER-SPEZIFISCHE ANALYSE:\n');

const jsonSchieber = Object.entries(jsonContent)
  .filter(([id, article]) => 
    article.text?.toLowerCase().includes('schieber') ||
    article.metadata?.keywords?.some(k => k.toLowerCase().includes('schieber')) ||
    id.toLowerCase().includes('schieber')
  );

const jsonlSchieber = Object.entries(jsonlArticles)
  .filter(([id, article]) => 
    article.variant === 'Schieber' ||
    article.tags?.some(t => t.toLowerCase().includes('schieber')) ||
    article.body?.toLowerCase().includes('schieber') ||
    id.toLowerCase().includes('schieber')
  );

console.log(`   JSON Artikel mit "Schieber": ${jsonSchieber.length}`);
jsonSchieber.slice(0, 10).forEach(([id]) => {
  const article = jsonContent[id];
  const category = article?.metadata?.category?.main || 'UNKNOWN';
  console.log(`     - ${id} [${category}]`);
});

console.log(`\n   JSONL Artikel mit "Schieber": ${jsonlSchieber.length}`);
jsonlSchieber.slice(0, 10).forEach(([id]) => {
  const article = jsonlArticles[id];
  const categoryTag = article?.tags?.find(t => ['Regeln', 'Begriffe', 'Varianten'].includes(t)) || 'UNKNOWN';
  console.log(`     - ${id} [${categoryTag}] variant: ${article?.variant || 'null'}`);
});

console.log('\n✅ Analyse abgeschlossen!\n');

// 8. Zusammenfassung als JSON exportieren
const summary = {
  timestamp: new Date().toISOString(),
  stats: {
    jsonTotal: jsonIds.size,
    jsonlTotal: jsonlIds.size,
    onlyInJson: onlyInJson.length,
    onlyInJsonl: onlyInJsonl.length,
    inBoth: inBoth.length,
  },
  onlyInJson: onlyInJson.slice(0, 100), // Limit für Lesbarkeit
  onlyInJsonl: onlyInJsonl.slice(0, 100),
  categories: {
    json: [...jsonCategories],
    jsonl: [...jsonlCategories],
  },
  schieber: {
    json: jsonSchieber.map(([id]) => id),
    jsonl: jsonlSchieber.map(([id]) => id),
  },
};

const summaryFile = path.join(__dirname, '../CONTENT_DIFF_ANALYSIS.json');
fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
console.log(`📄 Detaillierte Analyse gespeichert: ${summaryFile}\n`);


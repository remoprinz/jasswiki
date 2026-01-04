/**
 * Konvertiert technische Verweise in direkte klickbare URLs
 * 
 * Pattern: "Stapel (siehe Begriff "expressions_stapel")"
 * Wird zu: "Stapel (https://jasswiki.ch/begriffe/grundbegriffe/stapel/)"
 * 
 * ChatGPT erkennt URLs automatisch und macht sie klickbar!
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildCanonicalURL } from '../lib/rag-types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ArticleJSONL {
  id: string;
  title: string;
  variant: string | null;
  tags: string[];
  synonyms: string[];
  see_also: string[];
  language: string;
  body: string;
}

interface FAQJSONL {
  id: string;
  title: string;
  variant: string | null;
  tags: string[];
  synonyms: string[];
  see_also: string[];
  language: string;
  body: string;
  article_id?: string;
}

// Pattern: Wort/Phrase (siehe Begriff "id")
// Matcht nur das Wort/die Phrase direkt vor dem Verweis (bis zu 5 Wörter)
const REFERENCE_PATTERN = /(\w+(?:\s+\w+){0,4}?)\s*\(siehe Begriff\s+"([^"]+)"\)/gi;

function extractCategoryFromTags(tags: string[]): { main: string; sub: string } {
  const categoryMain = tags.includes('Regeln') ? 'Regeln' :
                      tags.includes('Begriffe') ? 'Begriffe' :
                      tags.includes('Weis-Regeln') ? 'Weis-Regeln' :
                      tags.includes('Varianten') ? 'Varianten' :
                      tags.includes('Taktiken und Strategien') ? 'Taktiken und Strategien' :
                      tags.includes('Grundlagen & Kultur') ? 'Grundlagen & Kultur' :
                      tags.includes('Geschichte') ? 'Geschichte' :
                      'Grundlagen & Kultur'; // Default
  
  const categorySub = tags.find(tag => 
    !['Regeln', 'Begriffe', 'Weis-Regeln', 'Varianten', 'Taktiken und Strategien', 
      'Grundlagen & Kultur', 'Geschichte', 'LEARNING'].includes(tag)
  ) || 'allgemeines';
  
  return { main: categoryMain, sub: categorySub.toLowerCase().replace(/\s+/g, '-') };
}

function convertReferencesToUrls(text: string | undefined, articleTags: string[]): string {
  if (!text) return '';
  
  let converted = text;
  
  // Finde alle Verweise
  const matches = Array.from(text.matchAll(REFERENCE_PATTERN));
  
  for (const match of matches) {
    const fullMatch = match[0];
    const term = match[1].trim();
    const refId = match[2];
    
    try {
      // Ermittle Kategorie aus Tags
      const { main, sub } = extractCategoryFromTags(articleTags);
      
      // Generiere URL
      const url = buildCanonicalURL(main as any, sub, refId);
      
      // Ersetze durch: "Term (URL)"
      const replacement = `${term} (${url})`;
      converted = converted.replace(fullMatch, replacement);
      
      console.log(`✅ Konvertiert: "${term}" (${refId}) → ${url}`);
    } catch (error) {
      console.warn(`⚠️  Fehler bei Konvertierung von "${term}" (${refId}): ${error}`);
      // Behalte Original bei Fehler
    }
  }
  
  return converted;
}

function processArticlesFile(filePath: string): void {
  console.log(`\n📂 Verarbeite: ${filePath}`);
  
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  
  const processedLines: string[] = [];
  let convertedCount = 0;
  
  for (const line of lines) {
    const article: ArticleJSONL = JSON.parse(line);
    const originalBody = article.body;
    
    // Konvertiere Verweise zu direkten URLs
    article.body = convertReferencesToUrls(article.body, article.tags);
    
    if (article.body !== originalBody) {
      convertedCount++;
    }
    
    processedLines.push(JSON.stringify(article));
  }
  
  // Schreibe zurück
  const backupPath = filePath + '.backup-' + Date.now();
  writeFileSync(backupPath, content, 'utf-8');
  console.log(`💾 Backup erstellt: ${backupPath}`);
  
  writeFileSync(filePath, processedLines.join('\n') + '\n', 'utf-8');
  console.log(`✅ ${convertedCount} Artikel aktualisiert`);
}

function main() {
  console.log('🚀 Starte Konvertierung: Technische Verweise → Direkte URLs\n');
  console.log('============================================================\n');
  console.log('📝 Format: "Stapel (https://jasswiki.ch/...)" - ChatGPT erkennt URLs automatisch!\n');
  
  const articlesPath = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');
  const faqsPath = join(__dirname, '../chatgpt-gpt/jasswiki-faqs.jsonl');
  
  // Verarbeite Artikel
  processArticlesFile(articlesPath);
  
  // Verarbeite FAQs
  processArticlesFile(faqsPath);
  
  console.log('\n============================================================');
  console.log('🎉 Konvertierung abgeschlossen!');
  console.log('\n📝 Nächste Schritte:');
  console.log('   1. Prüfe die JSONL-Dateien');
  console.log('   2. npm run rag:ingest (neu ingestieren)');
  console.log('   3. Teste die Links in ChatGPT (sollten jetzt klickbar sein!)');
}

main();









/**
 * Konvertiert technische Verweise in klickbare Markdown-Links
 * 
 * Pattern: "Stapel (siehe Begriff "expressions_stapel")"
 * Wird zu: "[Stapel](https://jasswiki.ch/begriffe/grundbegriffe/stapel/)"
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
// Matcht nur das Wort/die Phrase direkt vor dem Verweis (max. 5 Wörter, keine Zeilenumbrüche)
const REFERENCE_PATTERN = /(\w+(?:[\s\-/]+\w+){0,4}?)\s*\(siehe Begriff\s+"([^"]+)"\)/gi;

function convertReferencesToLinks(text: string | undefined, articleTags: string[]): string {
  if (!text) return '';
  
  let converted = text;
  
  // Finde alle Verweise
  const matches = Array.from(text.matchAll(REFERENCE_PATTERN));
  
  for (const match of matches) {
    const fullMatch = match[0];
    const term = match[1].trim();
    const refId = match[2];
    
    try {
      // Ermittle Kategorie aus Tags (vereinfacht)
      const categoryMain = articleTags.includes('Regeln') ? 'Regeln' :
                          articleTags.includes('Begriffe') ? 'Begriffe' :
                          articleTags.includes('Weis-Regeln') ? 'Weis-Regeln' :
                          articleTags.includes('Varianten') ? 'Varianten' :
                          articleTags.includes('Taktiken und Strategien') ? 'Taktiken und Strategien' :
                          articleTags.includes('Grundlagen & Kultur') ? 'Grundlagen & Kultur' :
                          'Grundlagen & Kultur'; // Default
      
      // Subcategory ist schwieriger - verwende "allgemeines" als Default
      const categorySub = 'allgemeines';
      
      // Generiere URL
      const url = buildCanonicalURL(categoryMain as any, categorySub, refId);
      
      // Ersetze durch Markdown-Link
      const markdownLink = `[${term}](${url})`;
      converted = converted.replace(fullMatch, markdownLink);
      
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
    
    // Konvertiere Verweise zu Links
    article.body = convertReferencesToLinks(article.body, article.tags);
    
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
  console.log('🚀 Starte Konvertierung: Technische Verweise → Markdown-Links\n');
  console.log('============================================================\n');
  
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
  console.log('   3. Teste die Links in ChatGPT');
}

main();


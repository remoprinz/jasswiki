/**
 * Analyse-Skript: Content-Verlust Detektion
 * 
 * Vergleicht jass-content-v2.json mit dem Backup und den Originalen aus jass-lexikon.ts
 * um festzustellen, wo Content verloren gegangen ist.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Typen für die Datenstrukturen
interface ContentSection {
  title?: string;
  content: string;
  [key: string]: any;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  sections?: ContentSection[];
  [key: string]: any;
}

interface ComparisonResult {
  articleId: string;
  slug: string;
  title: string;
  status: 'ok' | 'content-loss' | 'missing' | 'empty';
  currentLength: number;
  backupLength: number;
  originalLength?: number;
  lossPercentage: number;
  details: string[];
}

// Hilfsfunktion: Berechne Gesamtlänge des Contents eines Artikels
function calculateContentLength(article: any): number {
  let totalLength = 0;
  
  // text-Feld (hauptsächlich verwendet in beiden Versionen)
  if (article.text && typeof article.text === 'string') {
    totalLength += article.text.length;
  }
  
  // Haupt-Content-Feld (alternative)
  if (article.content && typeof article.content === 'string') {
    totalLength += article.content.length;
  }
  
  // Sections
  if (article.sections && Array.isArray(article.sections)) {
    article.sections.forEach((section: any) => {
      if (section.content && typeof section.content === 'string') {
        totalLength += section.content.length;
      }
    });
  }
  
  // Description
  if (article.description && typeof article.description === 'string') {
    totalLength += article.description.length;
  }
  
  // FAQs (in aktueller Version als separates Array)
  if (article.faqs && Array.isArray(article.faqs)) {
    article.faqs.forEach((faq: any) => {
      if (faq.question) totalLength += faq.question.length;
      if (faq.answer) totalLength += faq.answer.length;
    });
  }
  
  return totalLength;
}

// Hilfsfunktion: Extrahiere Content-Details für bessere Analyse
function getContentDetails(article: any): string[] {
  const details: string[] = [];
  
  if (article.text) {
    // Prüfe, ob FAQs im Text integriert sind (Backup-Version)
    const hasFaqsInText = article.text.includes('### Häufige Fragen');
    details.push(`Text: ${article.text.length} Zeichen${hasFaqsInText ? ' (inkl. FAQs)' : ''}`);
  }
  
  if (article.content) {
    details.push(`Content: ${article.content.length} Zeichen`);
  }
  
  if (article.faqs && Array.isArray(article.faqs)) {
    const faqLength = article.faqs.reduce((sum: number, faq: any) => {
      return sum + (faq.question?.length || 0) + (faq.answer?.length || 0);
    }, 0);
    details.push(`FAQs: ${article.faqs.length} (${faqLength} Zeichen gesamt)`);
  }
  
  if (article.see_also && Array.isArray(article.see_also)) {
    details.push(`See also: ${article.see_also.length} Links`);
  }
  
  if (article.sections && Array.isArray(article.sections)) {
    details.push(`Sections: ${article.sections.length}`);
    article.sections.forEach((section: any, idx: number) => {
      if (section.content) {
        details.push(`  Section ${idx + 1} (${section.title || 'Ohne Titel'}): ${section.content.length} Zeichen`);
      }
    });
  }
  
  return details;
}

// Hauptfunktion
async function analyzeContentLoss() {
  console.log('🔍 Starte Content-Verlust-Analyse...\n');
  
  // Pfade definieren
  const currentPath = path.join(__dirname, '../src/data/jass-content-v2.json');
  const backupPath = path.join(__dirname, '../batches/jass-content-v2_BACKUP.json');
  const originalPath = path.join(__dirname, '../src/types/jass-lexikon.ts');
  
  // Dateien einlesen
  console.log('📂 Lade Dateien...');
  
  let currentData: any;
  let backupData: any;
  
  try {
    currentData = JSON.parse(fs.readFileSync(currentPath, 'utf-8'));
    console.log('✅ Aktuelle Datei geladen');
  } catch (error) {
    console.error('❌ Fehler beim Laden der aktuellen Datei:', error);
    process.exit(1);
  }
  
  try {
    backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    console.log('✅ Backup-Datei geladen');
  } catch (error) {
    console.error('❌ Fehler beim Laden der Backup-Datei:', error);
    process.exit(1);
  }
  
  console.log('\n📊 Analysiere Artikel...\n');
  
  // Ergebnisse sammeln
  const results: ComparisonResult[] = [];
  
  // Verarbeite Objekt-Struktur (key = article ID)
  // Die JSON-Dateien haben die Struktur: { "article-id": { id, text, metadata, ... }, ... }
  let currentArticles: any[] = [];
  let backupArticles: any[] = [];
  
  if (typeof currentData === 'object' && !Array.isArray(currentData)) {
    // Objekt-Struktur: Konvertiere zu Array
    currentArticles = Object.values(currentData);
  } else if (Array.isArray(currentData)) {
    currentArticles = currentData;
  }
  
  if (typeof backupData === 'object' && !Array.isArray(backupData)) {
    // Objekt-Struktur: Konvertiere zu Array
    backupArticles = Object.values(backupData);
  } else if (Array.isArray(backupData)) {
    backupArticles = backupData;
  }
  
  // Erstelle Maps für schnellen Zugriff
  const currentMap = new Map<string, any>();
  const backupMap = new Map<string, any>();
  
  currentArticles.forEach((article: any) => {
    if (article.id) currentMap.set(article.id, article);
    if (article.slug) currentMap.set(article.slug, article);
  });
  
  backupArticles.forEach((article: any) => {
    if (article.id) backupMap.set(article.id, article);
    if (article.slug) backupMap.set(article.slug, article);
  });
  
  console.log(`📝 Anzahl Artikel aktuell: ${currentArticles.length}`);
  console.log(`📝 Anzahl Artikel im Backup: ${backupArticles.length}\n`);
  
  // Vergleiche jeden Backup-Artikel mit der aktuellen Version
  for (const backupArticle of backupArticles) {
    const identifier = backupArticle.id || backupArticle.slug;
    const currentArticle = currentMap.get(backupArticle.id) || currentMap.get(backupArticle.slug);
    
    if (!currentArticle) {
      // Artikel fehlt komplett
      results.push({
        articleId: backupArticle.id || 'unknown',
        slug: backupArticle.slug || 'unknown',
        title: backupArticle.title || 'Ohne Titel',
        status: 'missing',
        currentLength: 0,
        backupLength: calculateContentLength(backupArticle),
        lossPercentage: 100,
        details: ['⚠️ Artikel fehlt komplett in der aktuellen Version']
      });
      continue;
    }
    
    // Berechne Content-Längen
    const currentLength = calculateContentLength(currentArticle);
    const backupLength = calculateContentLength(backupArticle);
    
    // Berechne Verlust-Prozentsatz
    const lossPercentage = backupLength > 0 
      ? Math.round(((backupLength - currentLength) / backupLength) * 100)
      : 0;
    
    // Details sammeln
    const details: string[] = [];
    details.push('AKTUELL:');
    details.push(...getContentDetails(currentArticle).map(d => '  ' + d));
    details.push('BACKUP:');
    details.push(...getContentDetails(backupArticle).map(d => '  ' + d));
    
    // Status bestimmen
    let status: ComparisonResult['status'] = 'ok';
    
    if (currentLength === 0 && backupLength > 0) {
      status = 'empty';
      details.push('⚠️ Artikel ist komplett leer (hatte vorher Content)');
    } else if (lossPercentage > 10) { // Mehr als 10% Verlust
      status = 'content-loss';
      details.push(`⚠️ ${lossPercentage}% Content-Verlust detektiert`);
    }
    
    results.push({
      articleId: backupArticle.id || 'unknown',
      slug: backupArticle.slug || 'unknown',
      title: backupArticle.title || 'Ohne Titel',
      status,
      currentLength,
      backupLength,
      lossPercentage,
      details
    });
  }
  
  // Sortiere Ergebnisse nach Verlust-Prozentsatz (absteigend)
  results.sort((a, b) => b.lossPercentage - a.lossPercentage);
  
  // Generiere Bericht
  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log('📋 CONTENT-VERLUST BERICHT\n');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Statistiken
  const totalArticles = results.length;
  const articlesWithLoss = results.filter(r => r.status === 'content-loss').length;
  const missingArticles = results.filter(r => r.status === 'missing').length;
  const emptyArticles = results.filter(r => r.status === 'empty').length;
  const okArticles = results.filter(r => r.status === 'ok').length;
  
  console.log('📊 ZUSAMMENFASSUNG:\n');
  console.log(`   Gesamt analysiert:           ${totalArticles}`);
  console.log(`   ✅ OK (< 10% Verlust):       ${okArticles}`);
  console.log(`   ⚠️  Content-Verlust (> 10%): ${articlesWithLoss}`);
  console.log(`   🚫 Komplett leer:            ${emptyArticles}`);
  console.log(`   ❌ Fehlende Artikel:         ${missingArticles}`);
  console.log('\n');
  
  // Detaillierte Liste der betroffenen Artikel
  const problematicArticles = results.filter(r => r.status !== 'ok');
  
  if (problematicArticles.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('⚠️  ARTIKEL MIT CONTENT-VERLUST:\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    problematicArticles.forEach((result, idx) => {
      console.log(`\n${idx + 1}. ${result.title}`);
      console.log(`   Slug: ${result.slug}`);
      console.log(`   ID: ${result.articleId}`);
      console.log(`   Status: ${result.status === 'missing' ? '❌ FEHLT' : 
                                 result.status === 'empty' ? '🚫 LEER' : 
                                 '⚠️ CONTENT-VERLUST'}`);
      console.log(`   Verlust: ${result.lossPercentage}%`);
      console.log(`   Aktuell: ${result.currentLength} Zeichen`);
      console.log(`   Backup: ${result.backupLength} Zeichen`);
      console.log(`   Differenz: ${result.backupLength - result.currentLength} Zeichen\n`);
      
      result.details.forEach(detail => {
        console.log(`   ${detail}`);
      });
      
      console.log('\n   ' + '─'.repeat(60));
    });
  } else {
    console.log('✅ Keine problematischen Artikel gefunden!\n');
  }
  
  // Speichere Bericht als JSON
  const reportPath = path.join(__dirname, '../CONTENT_LOSS_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalArticles,
      okArticles,
      articlesWithLoss,
      emptyArticles,
      missingArticles
    },
    problematicArticles: problematicArticles.map(r => ({
      title: r.title,
      slug: r.slug,
      id: r.articleId,
      status: r.status,
      lossPercentage: r.lossPercentage,
      currentLength: r.currentLength,
      backupLength: r.backupLength,
      difference: r.backupLength - r.currentLength
    }))
  }, null, 2));
  
  console.log('\n═══════════════════════════════════════════════════════════════\n');
  console.log(`✅ Detaillierter Bericht gespeichert: ${reportPath}\n`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

// Skript ausführen
analyzeContentLoss().catch(error => {
  console.error('❌ Fehler bei der Analyse:', error);
  process.exit(1);
});


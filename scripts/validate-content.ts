import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Article {
  id: string;
  text: string;
  metadata?: {
    category?: {
      topic?: string;
      main?: string;
      sub?: string;
    };
  };
}

interface ValidationResult {
  id: string;
  title: string;
  status: 'OK' | 'CONTENT_MISMATCH' | 'INCOMPLETE' | 'WRONG_INFO' | 'MISSING_IN_CONTENT_V2' | 'NEW_ARTICLE';
  problem?: string;
  originalExcerpt?: string;
  currentExcerpt?: string;
  category?: string;
  isRule?: boolean; // Kritisch wenn es eine Regel ist
}

function getTitle(article: Article): string {
  // Versuche verschiedene Quellen für den Titel
  if (article.metadata?.category?.topic) {
    return article.metadata.category.topic;
  }
  // Fallback: Erste Zeile des Texts
  const firstLine = article.text.split('\n')[0].trim();
  if (firstLine.length > 0 && firstLine.length < 100) {
    return firstLine;
  }
  return article.id;
}

function isRuleCategory(category: string | undefined): boolean {
  if (!category) return false;
  const ruleKeywords = ['regel', 'weis', 'spielablauf', 'prozedur', 'anleitung'];
  return ruleKeywords.some(keyword => category.toLowerCase().includes(keyword));
}

function extractCoreInfo(text: string): {
  rules: string[];
  numbers: string[];
  definitions: string[];
  examples: string[];
} {
  // Einfache Extraktion von Schlüsselinformationen
  // Zahlen und Punkte
  const numbers = text.match(/\d+\s*(Punkte?|Stich|Karte|Spieler)/gi) || [];
  
  // Modalverben die Regeln anzeigen (muss, darf, kann, soll)
  const rules = text.match(/(?:muss|darf|kann|soll|darf nicht|muss nicht)[^\.!?]{0,100}/gi) || [];
  
  // Definitionen (X = Y, X ist Y)
  const definitions = text.match(/(?:^|\n|\.)\s*([A-ZÄÖÜ][^\.!?:]{10,50})\s*(?:=|ist|sind|heisst|heissen)[^\.!?]{0,100}/gi) || [];
  
  // Beispiel-Signale
  const examples = text.match(/(?:beispiel|z\.?\s*b\.?|bsp\.|etwa|zum Beispiel)[^\.!?]{0,100}/gi) || [];
  
  return {
    rules: rules.map(r => r.trim()),
    numbers: numbers.map(n => n.trim()),
    definitions: definitions.map(d => d.trim()),
    examples: examples.map(e => e.trim())
  };
}

function compareContent(original: Article, current: Article): ValidationResult {
  const title = getTitle(original);
  const category = original.metadata?.category?.main || '';
  const isRule = isRuleCategory(category);
  
  // Extrahiere Kerninformationen
  const originalCore = extractCoreInfo(original.text);
  const currentCore = extractCoreInfo(current.text);
  
  // Prüfe auf Zahlen/Punkte-Abweichungen (kritisch!)
  const originalNumbers = originalCore.numbers.sort().join('|');
  const currentNumbers = currentCore.numbers.sort().join('|');
  
  if (originalNumbers !== currentNumbers && originalCore.numbers.length > 0) {
    // Verschiedene Zahlen gefunden - könnte Problem sein
    const missingNumbers = originalCore.numbers.filter(n => !currentNumbers.includes(n));
    if (missingNumbers.length > 0) {
      return {
        id: original.id,
        title,
        status: 'CONTENT_MISMATCH',
        problem: `Punkte/Werte fehlen oder sind falsch. Original enthält: ${missingNumbers.join(', ')}`,
        originalExcerpt: originalCore.numbers.slice(0, 3).join(' | '),
        currentExcerpt: currentCore.numbers.slice(0, 3).join(' | '),
        category,
        isRule
      };
    }
  }
  
  // Prüfe auf kritische Regel-Unterschiede (MUSS vs KANN)
  const originalRules = originalCore.rules;
  const currentRules = currentCore.rules;
  
  // Suche nach "muss" im Original aber "kann" im Current (kritisch!)
  const originalMust = originalRules.filter(r => /muss/i.test(r));
  const currentCan = currentRules.filter(r => /kann/i.test(r));
  
  // Einfache Heuristik: Wenn Original "muss" sagt aber Current nur "kann" hat, könnte Problem sein
  // Aber wir müssen vorsichtig sein - könnte unterschiedliche Sätze sein
  
  // Semantischer Vergleich: Länge und Informationsgehalt
  const originalLength = original.text.length;
  const currentLength = current.text.length;
  
  // Wenn Current deutlich kürzer ist (< 60%), könnte Info fehlen
  if (originalLength > 500 && currentLength < originalLength * 0.6) {
    return {
      id: original.id,
      title,
      status: 'INCOMPLETE',
      problem: `Artikel ist deutlich kürzer als Original (${Math.round(currentLength / originalLength * 100)}%). Möglicherweise fehlen Informationen.`,
      originalExcerpt: original.text.substring(0, 200) + '...',
      currentExcerpt: current.text.substring(0, 200) + '...',
      category,
      isRule
    };
  }
  
  // Für Regeln: Strengere Prüfung
  if (isRule) {
    // Prüfe auf Schlüsselwörter die nicht übereinstimmen
    const ruleKeywords = ['vorhand', 'nachhand', 'trumpf', 'farbe bekennen', 'bedienen', 'stich', 'punkte'];
    const originalLower = original.text.toLowerCase();
    const currentLower = current.text.toLowerCase();
    
    const missingKeywords = ruleKeywords.filter(kw => {
      const inOriginal = originalLower.includes(kw);
      const inCurrent = currentLower.includes(kw);
      return inOriginal && !inCurrent;
    });
    
    if (missingKeywords.length > 0) {
      // Finde Kontext für fehlendes Keyword
      const firstMissing = missingKeywords[0];
      const keywordIndex = originalLower.indexOf(firstMissing);
      const context = keywordIndex > -1 
        ? original.text.substring(Math.max(0, keywordIndex - 50), Math.min(original.text.length, keywordIndex + 100))
        : original.text.substring(0, 200);
      
      return {
        id: original.id,
        title,
        status: 'INCOMPLETE',
        problem: `Regel-Artikel fehlt wichtige Begriffe: ${missingKeywords.join(', ')}`,
        originalExcerpt: context + '...',
        currentExcerpt: current.text.substring(0, 200) + '...',
        category,
        isRule
      };
    }
  }
  
  // Standard-OK Status
  return {
    id: original.id,
    title,
    status: 'OK',
    category,
    isRule
  };
}

function main() {
  console.log('🔍 Starte Content-Validierung...\n');
  
  // Lade beide Dateien
  const originalPath = path.join(__dirname, '../../jasstafel/src/data/jass-lexikon.json');
  const currentPath = path.join(__dirname, '../src/data/jass-content-v2.json');
  
  console.log(`📂 Lade Original: ${originalPath}`);
  console.log(`📂 Lade Current: ${currentPath}\n`);
  
  const originalData: Record<string, Article> = JSON.parse(fs.readFileSync(originalPath, 'utf-8'));
  const currentData: Record<string, Article> = JSON.parse(fs.readFileSync(currentPath, 'utf-8'));
  
  // Erstelle Mapping nach ID
  const originalById: Map<string, Article> = new Map();
  const currentById: Map<string, Article> = new Map();
  
  Object.values(originalData).forEach(article => {
    originalById.set(article.id, article);
  });
  
  Object.values(currentData).forEach(article => {
    currentById.set(article.id, article);
  });
  
  console.log(`📊 Original: ${originalById.size} Artikel`);
  console.log(`📊 Current: ${currentById.size} Artikel\n`);
  
  const results: ValidationResult[] = [];
  
  // Prüfe alle Original-Artikel
  for (const [id, original] of originalById) {
    const current = currentById.get(id);
    
    if (!current) {
      results.push({
        id,
        title: getTitle(original),
        status: 'MISSING_IN_CONTENT_V2',
        category: original.metadata?.category?.main,
        isRule: isRuleCategory(original.metadata?.category?.main)
      });
    } else {
      results.push(compareContent(original, current));
    }
  }
  
  // Finde neue Artikel (nur in Current)
  for (const [id, current] of currentById) {
    if (!originalById.has(id)) {
      results.push({
        id,
        title: getTitle(current),
        status: 'NEW_ARTICLE',
        category: current.metadata?.category?.main,
        isRule: isRuleCategory(current.metadata?.category?.main)
      });
    }
  }
  
  // Statistik
  const stats = {
    total: results.length,
    common: results.filter(r => r.status !== 'MISSING_IN_CONTENT_V2' && r.status !== 'NEW_ARTICLE').length,
    onlyOriginal: results.filter(r => r.status === 'MISSING_IN_CONTENT_V2').length,
    onlyCurrent: results.filter(r => r.status === 'NEW_ARTICLE').length,
    ok: results.filter(r => r.status === 'OK').length,
    problems: results.filter(r => r.status !== 'OK' && r.status !== 'NEW_ARTICLE').length,
    contentMismatch: results.filter(r => r.status === 'CONTENT_MISMATCH').length,
    incomplete: results.filter(r => r.status === 'INCOMPLETE').length,
    wrongInfo: results.filter(r => r.status === 'WRONG_INFO').length,
    missing: results.filter(r => r.status === 'MISSING_IN_CONTENT_V2').length,
    rulesWithProblems: results.filter(r => r.isRule && r.status !== 'OK' && r.status !== 'NEW_ARTICLE').length
  };
  
  // Sortiere: Probleme zuerst, dann nach Kritikalität (Regeln zuerst)
  results.sort((a, b) => {
    const aIsProblem = a.status !== 'OK' && a.status !== 'NEW_ARTICLE';
    const bIsProblem = b.status !== 'OK' && b.status !== 'NEW_ARTICLE';
    
    if (aIsProblem && !bIsProblem) return -1;
    if (!aIsProblem && bIsProblem) return 1;
    
    // Beide Probleme oder beide OK - Regeln zuerst
    if (a.isRule && !b.isRule) return -1;
    if (!a.isRule && b.isRule) return 1;
    
    return 0;
  });
  
  // Generiere Report
  const reportLines: string[] = [];
  reportLines.push('# 📊 CONTENT-VALIDIERUNG REPORT\n');
  reportLines.push(`**Datum:** ${new Date().toISOString()}`);
  reportLines.push(`**Geprüfte Artikel:** ${stats.total}`);
  reportLines.push(`**Probleme gefunden:** ${stats.problems}\n`);
  
  reportLines.push('---\n');
  reportLines.push('## 📊 Statistiken\n\n');
  reportLines.push(`- **Gesamt Artikel:** ${stats.total}`);
  reportLines.push(`- **Gemeinsame Artikel:** ${stats.common}`);
  reportLines.push(`- **Nur in Original:** ${stats.onlyOriginal}`);
  reportLines.push(`- **Nur in Content-V2:** ${stats.onlyCurrent}`);
  reportLines.push(`- **✅ OK:** ${stats.ok}`);
  reportLines.push(`- **⚠️ Probleme:** ${stats.problems}`);
  reportLines.push(`  - CONTENT_MISMATCH: ${stats.contentMismatch}`);
  reportLines.push(`  - INCOMPLETE: ${stats.incomplete}`);
  reportLines.push(`  - WRONG_INFO: ${stats.wrongInfo}`);
  reportLines.push(`  - MISSING_IN_CONTENT_V2: ${stats.missing}`);
  reportLines.push(`- **🚨 Regeln mit Problemen:** ${stats.rulesWithProblems}\n`);
  
  // Artikel ohne Probleme
  const okArticles = results.filter(r => r.status === 'OK');
  if (okArticles.length > 0) {
    reportLines.push('## ✅ Artikel ohne Probleme\n\n');
    reportLines.push('| ID | Titel | Kategorie |');
    reportLines.push('|----|-------|-----------|');
    okArticles.slice(0, 50).forEach(article => {
      reportLines.push(`| ${article.id} | ${article.title} | ${article.category || '-'} |`);
    });
    if (okArticles.length > 50) {
      reportLines.push(`\n*... und ${okArticles.length - 50} weitere*\n`);
    }
    reportLines.push('\n');
  }
  
  // Artikel mit Problemen
  const problemArticles = results.filter(r => r.status !== 'OK' && r.status !== 'NEW_ARTICLE');
  if (problemArticles.length > 0) {
    reportLines.push('## ⚠️ Artikel mit Problemen\n\n');
    reportLines.push('| ID | Titel (Original) | Status | Problem | Kategorie | Kritisch? |');
    reportLines.push('|----|-----------------|--------|---------|-----------|-----------|');
    
    problemArticles.forEach(article => {
      const critical = article.isRule ? '🚨 JA (Regel)' : 'ℹ️ Nein';
      const problem = article.problem || '-';
      reportLines.push(`| ${article.id} | ${article.title} | ${article.status} | ${problem.substring(0, 80)}${problem.length > 80 ? '...' : ''} | ${article.category || '-'} | ${critical} |`);
    });
    reportLines.push('\n');
    
    // Detaillierte Problem-Beschreibungen
    reportLines.push('### 🔍 Detaillierte Problem-Beschreibungen\n\n');
    
    problemArticles.forEach((article, idx) => {
      reportLines.push(`#### ${idx + 1}. ${article.title} (ID: ${article.id})\n`);
      reportLines.push(`**Status:** ${article.status}`);
      reportLines.push(`**Kategorie:** ${article.category || '-'}`);
      reportLines.push(`**Kritisch:** ${article.isRule ? '🚨 JA - Dies ist eine Regel!' : 'ℹ️ Nein'}\n`);
      
      if (article.problem) {
        reportLines.push(`**Problem:**\n${article.problem}\n`);
      }
      
      if (article.originalExcerpt) {
        reportLines.push(`**Original-Auszug:**\n\`\`\`\n${article.originalExcerpt}\n\`\`\`\n`);
      }
      
      if (article.currentExcerpt) {
        reportLines.push(`**Content-V2-Auszug:**\n\`\`\`\n${article.currentExcerpt}\n\`\`\`\n`);
      }
      
      reportLines.push('---\n');
    });
  }
  
  // Neue Artikel
  const newArticles = results.filter(r => r.status === 'NEW_ARTICLE');
  if (newArticles.length > 0) {
    reportLines.push('## ✨ Neue Artikel (nur in Content-V2)\n\n');
    reportLines.push('| ID | Titel | Kategorie |');
    reportLines.push('|----|-------|-----------|');
    newArticles.forEach(article => {
      reportLines.push(`| ${article.id} | ${article.title} | ${article.category || '-'} |`);
    });
    reportLines.push('\n');
  }
  
  // Fehlende Artikel
  const missingArticles = results.filter(r => r.status === 'MISSING_IN_CONTENT_V2');
  if (missingArticles.length > 0) {
    reportLines.push('## ⚠️ Fehlende Artikel (nur im Original)\n\n');
    reportLines.push('| ID | Titel | Kategorie | Kritisch? |');
    reportLines.push('|----|-------|-----------|-----------|');
    missingArticles.forEach(article => {
      const critical = article.isRule ? '🚨 JA (Regel)' : 'ℹ️ Nein';
      reportLines.push(`| ${article.id} | ${article.title} | ${article.category || '-'} | ${critical} |`);
    });
    reportLines.push('\n');
  }
  
  // Speichere Report
  const reportPath = path.join(__dirname, '../CONTENT_VALIDIERUNG_REPORT.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf-8');
  
  console.log(`✅ Report erstellt: ${reportPath}`);
  console.log(`\n📊 Zusammenfassung:`);
  console.log(`   Gesamt: ${stats.total} Artikel`);
  console.log(`   ✅ OK: ${stats.ok}`);
  console.log(`   ⚠️ Probleme: ${stats.problems}`);
  console.log(`   🚨 Kritische Regeln: ${stats.rulesWithProblems}`);
  console.log(`   ✨ Neue: ${stats.onlyCurrent}`);
  console.log(`   ❌ Fehlend: ${stats.onlyOriginal}`);
}

main();


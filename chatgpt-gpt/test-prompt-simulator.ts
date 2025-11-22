#!/usr/bin/env tsx
/**
 * Prompt-Test-Simulator
 * 
 * Simuliert ChatGPT-Verhalten mit dem FINAL-Prompt und echten Daten
 */

import * as fs from 'fs';
import * as path from 'path';

interface Article {
  id: string;
  title: string;
  body: string;
  canonical_url?: string;
  see_also?: string[];
}

// Simuliert die Backend-Augmentation (aus functions/src/index.ts)
function augmentArticleText(text: string): string {
  const lines = text.split('\n');
  const headings: string[] = [];
  
  // Finde alle Abschnitte (Zeilen die mit ":" enden, außer Meta-Felder)
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Ignoriere Meta-Felder
    if (/^(titel|kurzdefinition|definition):\s*$/i.test(trimmed)) continue;
    
    // Erkenne Abschnitte (Zeile endet mit ":" und hat Content)
    const match = trimmed.match(/^([^:\n]{2,100}):\s*$/);
    if (match) {
      const title = match[1].trim();
      if (!/kurzdefinition/i.test(title)) {
        headings.push(title);
      }
    }
  }
  
  const total = headings.length;
  
  // Erstelle Outline
  const outline = `Abschnittsübersicht (${total}): ` + 
    headings.map((h, i) => `${i + 1}) ${h}`).join('; ');
  
  // Füge Marker hinzu
  const out: string[] = [];
  let sectionIndex = 0;
  
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const match = line.trim().match(/^([^:\n]{2,100}):\s*$/);
    
    if (match) {
      const title = match[1].trim();
      // Ignoriere Meta-Felder
      if (!/^(titel|kurzdefinition|definition)$/i.test(title) && 
          !/kurzdefinition/i.test(title)) {
        sectionIndex += 1;
        out.push(`## [${sectionIndex}/${total}] ${title}`);
        continue;
      }
    }
    out.push(line);
  }
  
  return `${outline}\n\n${out.join('\n')}\n\nENDE [${total}/${total}]`;
}

// Lade Artikel aus JSONL
function loadArticle(id: string): Article | null {
  const jsonlPath = path.join(process.cwd(), 'chatgpt-gpt', 'jasswiki-articles.jsonl');
  const content = fs.readFileSync(jsonlPath, 'utf-8');
  
  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    try {
      const article = JSON.parse(line) as Article;
      if (article.id === id) {
        // Konstruiere URL
        article.canonical_url = `https://jasswiki.ch/regeln/fehler-verstoesse/${id}/`;
        return article;
      }
    } catch (e) {
      // Ignore invalid lines
    }
  }
  return null;
}

// Simuliert API-Response
function simulateAPIResponse(article: Article, score: number = 0.85) {
  const augmentedText = augmentArticleText(article.body);
  
  return {
    results: [{
      title: article.title,
      text: augmentedText,
      score: score,
      canonical_url: article.canonical_url,
      see_also: article.see_also || [],
    }]
  };
}

// Test-Szenarien
const SCENARIOS = [
  {
    name: "Test 1: Einfache Frage 'Was ist Nichtfarben?'",
    query: "Was ist Nichtfarben?",
    articleId: "nichtfarben",
    expectedBehavior: "STUFE 1: Kurze Definition (2-6 Sätze) + Quelle + 'Mehr Details?'",
  },
  {
    name: "Test 2: Regel-Frage 'Konsequenz bei Nichtfarben?'",
    query: "Konsequenz bei Nichtfarben?",
    articleId: "nichtfarben",
    expectedBehavior: "REGEL-Intent → Definition-Check → ZITATMODUS (vollständig)",
  },
  {
    name: "Test 3: Stufe 2 - Mehr Details",
    query: "Was ist Nichtfarben?",
    articleId: "nichtfarben",
    followUp: "Ja, mehr Details",
    expectedBehavior: "STUFE 2: Nutzt ## [i/Y] Marker, zeigt Abschnitte nacheinander, X/Y Tracking",
  },
];

function testScenario(scenario: typeof SCENARIOS[0]) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🧪 ${scenario.name}`);
  console.log(`📝 Query: "${scenario.query}"`);
  console.log(`📋 Erwartetes Verhalten: ${scenario.expectedBehavior}`);
  console.log('─'.repeat(80));
  
  const article = loadArticle(scenario.articleId);
  if (!article) {
    console.log(`❌ Artikel "${scenario.articleId}" nicht gefunden!`);
    return;
  }
  
  const apiResponse = simulateAPIResponse(article);
  const result = apiResponse.results[0];
  
  console.log(`\n📊 API Response:`);
  console.log(`   Titel: ${result.title}`);
  console.log(`   Score: ${result.score}`);
  console.log(`   URL: ${result.canonical_url}`);
  console.log(`   Abschnitte: ${result.text.match(/## \[\d+\/\d+\]/g)?.length || 0}`);
  
  // Zeige ersten Teil des augmentierten Texts
  console.log(`\n📄 Augmentierter Text (erste 500 Zeichen):`);
  console.log(result.text.substring(0, 500) + '...\n');
  
  // Prüfe ob Marker korrekt sind
  const sectionMarkers = result.text.match(/## \[(\d+)\/(\d+)\]/g);
  const outlineMatch = result.text.match(/Abschnittsübersicht \((\d+)\):/);
  const endMarker = result.text.match(/ENDE \[(\d+)\/(\d+)\]/);
  
  console.log(`\n✅ Marker-Check:`);
  if (outlineMatch) {
    const totalFromOutline = parseInt(outlineMatch[1]);
    console.log(`   ✓ Abschnittsübersicht gefunden: ${totalFromOutline} Abschnitte`);
  } else {
    console.log(`   ❌ Abschnittsübersicht NICHT gefunden!`);
  }
  
  if (sectionMarkers) {
    console.log(`   ✓ Abschnitts-Marker gefunden: ${sectionMarkers.length}`);
    console.log(`   Marker: ${sectionMarkers.slice(0, 3).join(', ')}${sectionMarkers.length > 3 ? '...' : ''}`);
  } else {
    console.log(`   ❌ Keine Abschnitts-Marker gefunden!`);
  }
  
  if (endMarker) {
    const totalFromEnd = parseInt(endMarker[1]);
    console.log(`   ✓ ENDE-Marker gefunden: [${totalFromEnd}/${totalFromEnd}]`);
  } else {
    console.log(`   ❌ ENDE-Marker NICHT gefunden!`);
  }
  
  // Test auf "Grundregel:" Problem
  console.log(`\n🔍 "Grundregel:"-Problem-Check:`);
  if (result.text.includes('Kurzdefinition: Grundregel:') && 
      result.text.includes('## [1/')) {
    const grundregelMarker = result.text.match(/## \[\d+\/\d+\] Grundregel/);
    if (grundregelMarker) {
      console.log(`   ✅ "Grundregel:" wird als Abschnitt erkannt: ${grundregelMarker[0]}`);
    } else {
      console.log(`   ❌ "Grundregel:" sollte als Abschnitt erkannt werden!`);
    }
  }
  
  // Regel-Intent-Check
  console.log(`\n🎯 Regel-Intent-Check:`);
  const ruleKeywords = /konsequenz|strafe|regel|regelverstoss|verstoss|fehler|sanktion|folge|ahndung/i;
  if (ruleKeywords.test(scenario.query)) {
    console.log(`   ✓ REGEL-Intent erkannt (Keywords gefunden)`);
    console.log(`   → Sollte: Definition-Check → ggf. Requery → ZITATMODUS`);
  } else {
    console.log(`   → Standard: 3-Stufen-Dialog`);
  }
  
  console.log(`\n${'='.repeat(80)}\n`);
}

// Hauptfunktion
async function main() {
  console.log('🚀 Prompt-Test-Simulator');
  console.log('📝 Testet FINAL-Prompt mit echten Daten\n');
  
  for (const scenario of SCENARIOS) {
    testScenario(scenario);
  }
  
  console.log('\n✅ Alle Tests abgeschlossen!');
  console.log('\n💡 Nächste Schritte:');
  console.log('   1. Prüfe ob alle Marker korrekt sind');
  console.log('   2. Teste in ChatGPT GPT mit dem FINAL-Prompt');
  console.log('   3. Vergleiche Verhalten mit erwarteten Ergebnissen\n');
}

main().catch(console.error);


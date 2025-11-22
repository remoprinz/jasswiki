#!/usr/bin/env node

/**
 * Transfer-Script: Überträgt alle korrigierten Artikel aus BATCH_02 Dateien
 * in jass-content-v2.json
 * 
 * Extrahiert aus jedem Batch-File:
 * - Artikel-ID
 * - Korrigierte Version (Bulletpoints)
 * 
 * Aktualisiert jass-content-v2.json:
 * - Ersetzt das `text` Feld mit den neuen Bulletpoints
 * - Behält alle Metadaten bei
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const BATCH_DIR = __dirname;
const CONTENT_FILE = path.join(__dirname, '../src/data/jass-content-v2.json');

// Batch-Dateien (BATCH_01 + BATCH_02)
const BATCH_FILES = [
  // BATCH_01 (erste 24 Artikel)
  'BATCH_01A_WEIS_REGELN_AGENT1.md',
  'BATCH_01B_REGELN_TEIL1_AGENT2.md',
  'BATCH_01C_REGELN_TEIL2_AGENT3.md',
  'BATCH_01D_RESTLICHE_KRITISCH_AGENT4.md',
  'BATCH_01E_REFERENZEN_AGENT5.md',
  // BATCH_02 (restliche 218 Artikel)
  'BATCH_02A_WEIS_REGELN_BEGRIFFE_AGENT1.md',
  'BATCH_02B_GRUNDLAGEN_GESCHICHTE_AGENT2.md',
  'BATCH_02C_REGELN_VARIANTEN_AGENT3.md',
  'BATCH_02D_VARIANTEN_BEGRIFFE_AGENT4.md',
  'BATCH_02E_BEGRIFFE_TAKTIKEN_APPS_AGENT5.md',
];

/**
 * Extrahiert Artikel-ID aus einer Zeile
 */
function extractArticleId(line) {
  const match = line.match(/\*\*ID:\*\* `([^`]+)`/);
  return match ? match[1] : null;
}

/**
 * Extrahiert die korrigierte Version (Bulletpoints) aus einem Artikel-Block
 */
function extractCorrectedVersion(lines, startIndex) {
  const correctedLines = [];
  let inCodeBlock = false;
  let braceCount = 0;
  
  // Starte nach "#### ✅ Korrigierte Version"
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    
    // Beginnt Code-Block?
    if (line.trim() === '```') {
      if (!inCodeBlock) {
        inCodeBlock = true;
        continue;
      } else {
        // Ende Code-Block
        break;
      }
    }
    
    // In Code-Block: Sammle Zeilen
    if (inCodeBlock) {
      correctedLines.push(line);
    }
    
    // Prüfe auf nächsten Artikel (### Artikel)
    if (!inCodeBlock && line.match(/^###? Artikel/)) {
      break;
    }
  }
  
  // Entferne leere Zeilen am Anfang/Ende
  while (correctedLines.length > 0 && correctedLines[0].trim() === '') {
    correctedLines.shift();
  }
  while (correctedLines.length > 0 && correctedLines[correctedLines.length - 1].trim() === '') {
    correctedLines.pop();
  }
  
  return correctedLines.join('\n');
}

/**
 * Konvertiert Bulletpoints zu Text-String (behält Zeilenumbrüche)
 */
function convertBulletpointsToText(bulletpoints) {
  if (!bulletpoints || bulletpoints.trim() === '') {
    return '';
  }
  
  // Entferne führende/trailing Leerzeilen
  let text = bulletpoints.trim();
  
  // Ersetze Code-Block-Markierungen (falls noch vorhanden)
  text = text.replace(/^```[^\n]*\n/g, '').replace(/\n```[^\n]*$/g, '');
  
  // Behalte Zeilenumbrüche (Bulletpoints sind bereits formatiert)
  // Jede Zeile wird beibehalten
  
  return text;
}

/**
 * Parst eine Batch-Datei und extrahiert alle Artikel
 */
function parseBatchFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const articles = [];
  let currentArticle = null;
  let foundCorrectedVersion = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Neuer Artikel beginnt?
    if (line.match(/^###? Artikel \d+:/)) {
      // Speichere vorherigen Artikel
      if (currentArticle && currentArticle.id && currentArticle.text) {
        articles.push(currentArticle);
      }
      
      // Starte neuen Artikel
      currentArticle = { id: null, text: null };
      foundCorrectedVersion = false;
      continue;
    }
    
    // Artikel-ID gefunden?
    if (line.match(/\*\*ID:\*\* `/)) {
      const id = extractArticleId(line);
      if (id && currentArticle) {
        currentArticle.id = id;
      }
      continue;
    }
    
    // Korrigierte Version gefunden? (auch "Aktuelle Version (bereits korrekt)" oder "Aktueller Inhalt (BEREITS OPTIMIERT)")
    if (line.match(/^#### ✅ Korrigierte Version/) || 
        line.match(/^### ✅ Korrigierte Version/) ||
        line.match(/^#### ✅ Aktuelle Version/) ||
        line.match(/^### ✅ Aktuelle Version/) ||
        line.match(/^### ✅ Aktueller Inhalt.*BEREITS OPTIMIERT/)) {
      foundCorrectedVersion = true;
      const correctedText = extractCorrectedVersion(lines, i);
      if (currentArticle && correctedText) {
        currentArticle.text = convertBulletpointsToText(correctedText);
      }
      continue;
    }
  }
  
  // Letzten Artikel speichern
  if (currentArticle && currentArticle.id && currentArticle.text) {
    articles.push(currentArticle);
  }
  
  return articles;
}

/**
 * Hauptfunktion
 */
function main() {
  console.log('🚀 Starte Transfer von BATCH_02 → jass-content-v2.json\n');
  
  // Lade jass-content-v2.json
  console.log('📖 Lade jass-content-v2.json...');
  const contentJson = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
  console.log(`   ✅ ${Object.keys(contentJson).length} Artikel geladen\n`);
  
  // Sammle alle Artikel aus Batch-Dateien
  const allArticles = {};
  let totalFound = 0;
  
  for (const batchFile of BATCH_FILES) {
    const batchPath = path.join(BATCH_DIR, batchFile);
    
    if (!fs.existsSync(batchPath)) {
      console.log(`⚠️  Datei nicht gefunden: ${batchFile}`);
      continue;
    }
    
    console.log(`📝 Parse ${batchFile}...`);
    const articles = parseBatchFile(batchPath);
    
    console.log(`   ✅ ${articles.length} Artikel gefunden`);
    
    // Füge zu allArticles hinzu
    for (const article of articles) {
      if (article.id && article.text) {
        allArticles[article.id] = article.text;
        totalFound++;
      } else {
        console.log(`   ⚠️  Unvollständiger Artikel: ${article.id || 'UNKNOWN'}`);
      }
    }
    
    console.log('');
  }
  
  console.log(`📊 TOTAL: ${totalFound} Artikel aus Batches extrahiert\n`);
  
  // Aktualisiere jass-content-v2.json
  console.log('🔄 Aktualisiere jass-content-v2.json...');
  
  let updatedCount = 0;
  let notFoundCount = 0;
  const notFoundIds = [];
  
  for (const [articleId, newText] of Object.entries(allArticles)) {
    if (contentJson[articleId]) {
      // Ersetze text-Feld
      contentJson[articleId].text = newText;
      updatedCount++;
    } else {
      notFoundCount++;
      notFoundIds.push(articleId);
      console.log(`   ⚠️  Artikel nicht in JSON gefunden: ${articleId}`);
    }
  }
  
  console.log(`   ✅ ${updatedCount} Artikel aktualisiert`);
  
  if (notFoundCount > 0) {
    console.log(`   ⚠️  ${notFoundCount} Artikel nicht in JSON gefunden:`);
    notFoundIds.forEach(id => console.log(`      - ${id}`));
  }
  
  // Backup erstellen
  const backupPath = CONTENT_FILE.replace('.json', '.backup-' + Date.now() + '.json');
  console.log(`\n💾 Erstelle Backup: ${backupPath}`);
  fs.writeFileSync(backupPath, JSON.stringify(contentJson, null, 2), 'utf-8');
  console.log('   ✅ Backup erstellt');
  
  // Speichere aktualisierte JSON
  console.log(`\n💾 Speichere aktualisierte jass-content-v2.json...`);
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(contentJson, null, 2), 'utf-8');
  console.log('   ✅ Datei gespeichert');
  
  console.log('\n✅✅✅ TRANSFER ERFOLGREICH ABGESCHLOSSEN!');
  console.log(`\n📈 Zusammenfassung:`);
  console.log(`   - Artikel aus Batches extrahiert: ${totalFound}`);
  console.log(`   - Artikel in JSON aktualisiert: ${updatedCount}`);
  if (notFoundCount > 0) {
    console.log(`   - Artikel nicht gefunden: ${notFoundCount}`);
  }
  console.log(`   - Backup erstellt: ${path.basename(backupPath)}`);
}

// Führe aus
try {
  main();
} catch (error) {
  console.error('❌ Fehler:', error);
  process.exit(1);
}


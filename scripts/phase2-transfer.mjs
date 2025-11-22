#!/usr/bin/env node

/**
 * Transferiert optimierte Artikel-Texte aus einer Markdown-Datei in die jass-content-v2.json
 * und sortiert die JSON-Datei neu.
 *
 * FUNKTIONEN:
 * 1. Erstellt ein zeitgestempeltes Backup der originalen JSON-Datei.
 * 2. Liest die optimierten Texte aus der Markdown-Datei (BULLETPOINT_OPTIMIERUNG_KOMPLETT.md).
 * 3. Aktualisiert die 'text'-Eigenschaft für jeden optimierten Artikel in der JSON-Struktur.
 * 4. Sortiert die Hauptkategorien in einer vordefinierten Reihenfolge.
 * 5. Sortiert die Artikel innerhalb jeder Hauptkategorie alphabetisch nach ihrer ID.
 * 6. Überschreibt die originale jass-content-v2.json mit den optimierten und sortierten Daten.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- KONFIGURATION ---
const JSON_SOURCE_FILE = path.join(__dirname, '../src/data/jass-content-v2.json');
const OPTIMIZED_MD_FILE = path.join(__dirname, '../batches/BULLETPOINT_OPTIMIERUNG_KOMPLETT.md');
const BACKUP_DIR = path.join(__dirname, '../src/data/');

// Vorgegebene Reihenfolge der Hauptkategorien
const CATEGORY_ORDER = [
  "Regeln",
  "Weis-Regeln",
  "Taktiken und Strategien",
  "Varianten",
  "Grundlagen & Kultur",
  "Geschichte",
  "Begriffe",
  "Jassapps",
  "Referenzen"
];

console.log('🚀 Transfer-Script gestartet...\n');

// --- SCHRITT 1: Backup erstellen ---
try {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(BACKUP_DIR, `jass-content-v2-backup-${timestamp}.json`);
  fs.copyFileSync(JSON_SOURCE_FILE, backupFile);
  console.log(`✅ Backup erstellt: ${backupFile}`);
} catch (error) {
  console.error(`❌ Fehler beim Erstellen des Backups: ${error.message}`);
  process.exit(1);
}

// --- SCHRITT 2: Quelldateien laden ---
let originalData;
let optimizedMdContent;
try {
  originalData = JSON.parse(fs.readFileSync(JSON_SOURCE_FILE, 'utf-8'));
  optimizedMdContent = fs.readFileSync(OPTIMIZED_MD_FILE, 'utf-8');
  console.log(`✅ Original-JSON und optimierte Markdown-Datei geladen.`);
} catch (error) {
  console.error(`❌ Fehler beim Laden der Dateien: ${error.message}`);
  process.exit(1);
}

// --- SCHRITT 3: Optimierte Artikel parsen ---
const optimizedArticles = new Map();

// Pattern: ## `artikel_id` ... ```markdown ... ```
const articlePattern = /^## `([^`]+)`\s*\n[\s\S]*?```markdown\s*\n([\s\S]*?)\n```/gm;
let match;
let foundCount = 0;

while ((match = articlePattern.exec(optimizedMdContent)) !== null) {
  const id = match[1].trim();
  const text = match[2].trim();
  
  if (id && text) {
    optimizedArticles.set(id, text);
    foundCount++;
  }
}

// Fallback: Versuche alternatives Pattern falls das erste nicht funktioniert
if (foundCount === 0) {
  console.log('⚠️ Erstes Pattern ergab keine Treffer, versuche alternatives Pattern...');
  const articlesBlocks = optimizedMdContent.split('## `').slice(1);
  
  articlesBlocks.forEach(block => {
    const idMatch = block.match(/^(.*?)`/);
    if (!idMatch) return;
    const id = idMatch[1].trim();
    
    // Suche nach ```markdown Block
    const textMatch = block.match(/```markdown\s*\n([\s\S]*?)\n```/);
    if (!textMatch) return;
    const newText = textMatch[1].trim();
    
    if (id && newText) {
      optimizedArticles.set(id, newText);
      foundCount++;
    }
  });
}

console.log(`✅ ${optimizedArticles.size} optimierte Artikel aus Markdown geparst.`);

// --- SCHRITT 4: Artikel-Texte aktualisieren ---
let updatedCount = 0;
for (const id in originalData) {
  if (optimizedArticles.has(id)) {
    originalData[id].text = optimizedArticles.get(id);
    updatedCount++;
  }
}
console.log(`✅ ${updatedCount} Artikel in der JSON-Struktur aktualisiert.`);

// --- SCHRITT 5: Neu sortieren und strukturieren ---
const articlesArray = Object.values(originalData);

// 5a. Artikel nach Kategorien gruppieren
const groupedByCategory = articlesArray.reduce((acc, article) => {
  const mainCategory = article.metadata.category.main;
  if (!acc[mainCategory]) {
    acc[mainCategory] = [];
  }
  acc[mainCategory].push(article);
  return acc;
}, {});

// 5b. Artikel innerhalb jeder Kategorie alphabetisch sortieren
for (const category in groupedByCategory) {
  groupedByCategory[category].sort((a, b) => a.id.localeCompare(b.id));
}
console.log(`✅ Artikel innerhalb der Kategorien alphabetisch sortiert.`);

// 5c. Endgültige JSON nach vordefinierter Kategorie-Reihenfolge aufbauen
const finalSortedData = {};
const presentCategories = new Set(Object.keys(groupedByCategory));

CATEGORY_ORDER.forEach(categoryName => {
  if (groupedByCategory[categoryName]) {
    groupedByCategory[categoryName].forEach(article => {
      finalSortedData[article.id] = article;
    });
    presentCategories.delete(categoryName);
  }
});

// Füge alle restlichen Kategorien hinzu, die nicht in der Hauptreihenfolge waren
Array.from(presentCategories).sort().forEach(categoryName => {
    groupedByCategory[categoryName].forEach(article => {
        finalSortedData[article.id] = article;
    });
});
console.log(`✅ Hauptkategorien nach vordefinierter Reihenfolge sortiert.`);


// --- SCHRITT 6: Finale JSON-Datei schreiben ---
try {
  fs.writeFileSync(JSON_SOURCE_FILE, JSON.stringify(finalSortedData, null, 2), 'utf-8');
  console.log(`\n🎉 ERFOLG! Die Datei ${JSON_SOURCE_FILE} wurde erfolgreich mit optimierten und sortierten Inhalten überschrieben.`);
} catch (error) {
  console.error(`❌ Fehler beim Schreiben der finalen JSON-Datei: ${error.message}`);
  process.exit(1);
}

console.log('\nScript-Durchlauf beendet.');

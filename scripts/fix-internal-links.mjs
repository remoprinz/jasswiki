#!/usr/bin/env node
/**
 * Skript zur Korrektur interner Links in jass-content-v2.json
 * 
 * Problem: Links haben Format ./id (z.B. ./weis_rules_stock)
 * Lösung: Konvertiert zu korrekten URLs /category/subcategory/topic/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Slug-Funktion (identisch mit toSlug in utils.ts)
function toSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Datei-Pfade
const dataPath = path.join(__dirname, '../src/data/jass-content-v2.json');
const backupPath = path.join(__dirname, '../src/data/jass-content-v2.json.backup-links');

console.log('🔍 Lade jass-content-v2.json...');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const content = JSON.parse(rawData);

// Schritt 1: Erstelle ID -> URL Mapping
console.log('📋 Erstelle ID -> URL Mapping...');
const idToUrlMap = {};
let entriesProcessed = 0;

for (const [id, item] of Object.entries(content)) {
  if (item.metadata && item.metadata.category) {
    const { main, sub, topic } = item.metadata.category;
    
    // Generiere die URL-Segmente mit toSlug
    const categorySlug = toSlug(main);
    const subcategorySlug = toSlug(sub);
    const topicSlug = toSlug(topic);
    
    // Erstelle die vollständige URL
    const url = `/${categorySlug}/${subcategorySlug}/${topicSlug}/`;
    idToUrlMap[id] = url;
    entriesProcessed++;
  }
}

console.log(`✅ ${entriesProcessed} ID-zu-URL-Mappings erstellt`);

// Schritt 2: Finde und ersetze alle Links
console.log('\n🔧 Suche und ersetze Links...');
let totalLinksReplaced = 0;
const replacements = [];

for (const [id, item] of Object.entries(content)) {
  if (item.text) {
    let originalText = item.text;
    let modifiedText = originalText;
    let linksInThisEntry = 0;
    
    // Regex: Findet alle Links im Format [Text](./id) oder [Text](./id#anchor)
    const linkRegex = /\[([^\]]+)\]\(\.\/([a-z0-9_-]+)(#[^\)]+)?\)/gi;
    
    modifiedText = modifiedText.replace(linkRegex, (match, linkText, targetId, anchor) => {
      const targetUrl = idToUrlMap[targetId];
      
      if (targetUrl) {
        linksInThisEntry++;
        totalLinksReplaced++;
        
        // Behalte optionalen Anker bei
        const fullUrl = anchor ? `${targetUrl}${anchor}` : targetUrl;
        
        replacements.push({
          entry: id,
          original: match,
          replaced: `[${linkText}](${fullUrl})`
        });
        
        return `[${linkText}](${fullUrl})`;
      } else {
        console.warn(`⚠️  Warnung: Keine URL für ID "${targetId}" gefunden (in Eintrag "${id}")`);
        return match; // Behalte Original bei, wenn keine URL gefunden
      }
    });
    
    // Aktualisiere nur wenn Änderungen vorgenommen wurden
    if (modifiedText !== originalText) {
      content[id].text = modifiedText;
      console.log(`  ✓ ${id}: ${linksInThisEntry} Link(s) ersetzt`);
    }
  }
}

console.log(`\n📊 Gesamt: ${totalLinksReplaced} Links ersetzt`);

// Schritt 3: Backup erstellen
console.log('\n💾 Erstelle Backup...');
fs.writeFileSync(backupPath, rawData, 'utf-8');
console.log(`✅ Backup gespeichert: ${backupPath}`);

// Schritt 4: Neue Datei speichern
console.log('\n💾 Speichere korrigierte Datei...');
const newData = JSON.stringify(content, null, 2);
fs.writeFileSync(dataPath, newData, 'utf-8');
console.log(`✅ Datei gespeichert: ${dataPath}`);

// Schritt 5: Report erstellen
console.log('\n📄 Erstelle Änderungs-Report...');
const reportPath = path.join(__dirname, '../scripts/link-fixes-report.txt');
let report = `LINK-KORREKTUR REPORT\n`;
report += `=====================\n\n`;
report += `Datum: ${new Date().toLocaleString('de-CH')}\n`;
report += `Gesamt ersetzte Links: ${totalLinksReplaced}\n\n`;
report += `BEISPIELE (erste 50):\n\n`;

replacements.slice(0, 50).forEach((r, i) => {
  report += `${i + 1}. Eintrag: ${r.entry}\n`;
  report += `   Alt:  ${r.original}\n`;
  report += `   Neu:  ${r.replaced}\n\n`;
});

if (replacements.length > 50) {
  report += `\n... und ${replacements.length - 50} weitere Änderungen\n`;
}

fs.writeFileSync(reportPath, report, 'utf-8');
console.log(`✅ Report gespeichert: ${reportPath}`);

// Zusammenfassung
console.log('\n✨ FERTIG!');
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`📝 ${entriesProcessed} Einträge verarbeitet`);
console.log(`🔗 ${totalLinksReplaced} Links korrigiert`);
console.log(`💾 Backup: ${path.basename(backupPath)}`);
console.log(`📄 Report: ${path.basename(reportPath)}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);


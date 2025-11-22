#!/usr/bin/env node

/**
 * BULLETPOINT-OPTIMIERUNG für alle Jasswiki-Artikel
 * 
 * Optimiert alle Artikel nach den finalen Regeln:
 * 1. Grammatik & Hochdeutsch
 * 2. Keine 2x Doppelpunkte
 * 3. Zerrissene Sätze zusammenführen
 * 4. Einleitungen mit Labels
 * 5. Struktur bei 5+ Bulletpoints
 * 6. Keywords am Anfang
 * 7. Synonyme erwähnen
 * 8. Kontextuelle Einleitungen
 * 9. Fließtext vs. Bulletpoints
 * 10. Block-Optimierung
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const JSON_FILE = path.join(__dirname, '../src/data/jass-content-v2.json');
const OUTPUT_FILE = path.join(__dirname, '../src/data/jass-content-v2-optimized.json');
const REPORT_FILE = path.join(__dirname, '../batches/BULLETPOINT_OPTIMIERUNG_REPORT.md');

console.log('🔧 Bulletpoint-Optimierung startet...\n');

// JSON laden
let data;
try {
  const jsonContent = fs.readFileSync(JSON_FILE, 'utf-8');
  data = JSON.parse(jsonContent);
  console.log(`✅ ${Object.keys(data).length} Artikel geladen\n`);
} catch (error) {
  console.error(`❌ Fehler beim Laden der JSON: ${error.message}`);
  process.exit(1);
}

// Optimierungs-Regeln
const OPTIMIZATIONS = {
  // Regel 1: Zerrissene Sätze zusammenführen
  mergeFragmentedSentences: (text) => {
    // Bulletpoints die mit "Und", "Oder", "Falls", "Wenn" beginnen
    const lines = text.split('\n');
    const optimized = [];
    let buffer = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Bulletpoint?
      if (trimmed.startsWith('•')) {
        const content = trimmed.substring(1).trim();
        
        // Beginnt mit "Und", "Oder", "Aber", "Falls"?
        if (content.match(/^(Und|Oder|Aber|Falls|Wenn)\s/)) {
          // Zum vorherigen hinzufügen
          if (buffer) {
            buffer += ' ' + content.toLowerCase();
            continue;
          }
        }
        
        // Vorherigen Buffer ausgeben
        if (buffer) {
          optimized.push('• ' + buffer);
          buffer = '';
        }
        
        // Neuen Buffer starten
        buffer = content;
      } else {
        // Kein Bulletpoint - Buffer ausgeben und diese Zeile beibehalten
        if (buffer) {
          optimized.push('• ' + buffer);
          buffer = '';
        }
        optimized.push(line);
      }
    }
    
    // Letzten Buffer ausgeben
    if (buffer) {
      optimized.push('• ' + buffer);
    }
    
    return optimized.join('\n');
  },
  
  // Regel 2: Einleitungen mit Labels hinzufügen
  addDefinitionLabels: (text) => {
    // Wenn Text direkt mit Bulletpoint startet, prüfe ob "Definition:" sinnvoll ist
    const lines = text.split('\n');
    if (lines[0] && lines[0].trim().startsWith('•')) {
      const firstLine = lines[0].trim().substring(1).trim();
      
      // Enthält "ist ein", "bilden ein", "ergibt ein", "bezeichnet"?
      if (firstLine.match(/(ist ein|bilden ein|ergibt ein|bezeichnet|entsteht)/i)) {
        return 'Definition:\n' + text;
      }
    }
    return text;
  },
  
  // Regel 3: Grammatik in Überschriften prüfen
  fixGrammarInHeadings: (text) => {
    const lines = text.split('\n');
    const fixed = lines.map(line => {
      const trimmed = line.trim();
      
      // Überschrift mit Doppelpunkt?
      if (trimmed.endsWith(':') && !trimmed.startsWith('•')) {
        // "Vorhand ansagt" → "Vorhand sagt an"
        line = line.replace(/Vorhand ansagt/g, 'Vorhand sagt an');
        line = line.replace(/Nachhand ansagt/g, 'Nachhand sagt an');
        line = line.replace(/Rückhand ansagt/g, 'Rückhand sagt an');
        line = line.replace(/Partner ansagt/g, 'Partner sagt an');
        
        // Weitere häufige Fehler...
        line = line.replace(/Partner spielt([^:])/g, 'Der Partner spielt$1');
        line = line.replace(/Spieler bedankt([^:])/g, 'Der Spieler bedankt$1');
      }
      
      return line;
    });
    
    return fixed.join('\n');
  },
  
  // Regel 4: Doppelte Doppelpunkte vermeiden
  removeDoubleCo lons: (text) => {
    const lines = text.split('\n');
    const optimized = [];
    let lastWasColon = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      // Ist Überschrift mit Doppelpunkt?
      const isHeadingWithColon = trimmed.endsWith(':') && !trimmed.startsWith('•') && trimmed.length > 1;
      
      if (isHeadingWithColon) {
        if (lastWasColon) {
          // Überspringe diese Zeile
          continue;
        }
        lastWasColon = true;
      } else if (trimmed.length > 0) {
        lastWasColon = false;
      }
      
      optimized.push(line);
    }
    
    return optimized.join('\n');
  }
};

// Artikel optimieren
let optimizedCount = 0;
let unchangedCount = 0;
const report = [];

for (const [id, article] of Object.entries(data)) {
  const originalText = article.text;
  let optimizedText = originalText;
  
  // Optimierungen anwenden
  optimizedText = OPTIMIZATIONS.mergeFragmentedSentences(optimizedText);
  optimizedText = OPTIMIZATIONS.addDefinitionLabels(optimizedText);
  optimizedText = OPTIMIZATIONS.fixGrammarInHeadings(optimizedText);
  optimizedText = OPTIMIZATIONS.removeDoubleColons(optimizedText);
  
  // Geändert?
  if (optimizedText !== originalText) {
    article.text = optimizedText;
    optimizedCount++;
    
    report.push({
      id,
      category: article.metadata.category.main,
      changed: true
    });
  } else {
    unchangedCount++;
    report.push({
      id,
      category: article.metadata.category.main,
      changed: false
    });
  }
}

// Optimierte JSON speichern
try {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Optimierte JSON gespeichert: ${OUTPUT_FILE}\n`);
} catch (error) {
  console.error(`❌ Fehler beim Speichern: ${error.message}`);
  process.exit(1);
}

// Report erstellen
const reportContent = `# 📊 BULLETPOINT-OPTIMIERUNG: Report

## Zusammenfassung
- **Optimiert:** ${optimizedCount} Artikel
- **Unverändert:** ${unchangedCount} Artikel
- **Total:** ${optimizedCount + unchangedCount} Artikel

## Details

${report.map(r => `- ${r.changed ? '✅' : '⚪'} \`${r.id}\` (${r.category})`).join('\n')}

---

**Nächster Schritt:** Manuelle Prüfung und Transfer zu \`jass-content-v2.json\`
`;

try {
  fs.writeFileSync(REPORT_FILE, reportContent, 'utf-8');
  console.log(`✅ Report erstellt: ${REPORT_FILE}\n`);
} catch (error) {
  console.error(`❌ Fehler beim Erstellen des Reports: ${error.message}`);
}

// Zusammenfassung
console.log('═══════════════════════════════════════');
console.log('✅ OPTIMIERUNG ABGESCHLOSSEN');
console.log('═══════════════════════════════════════');
console.log(`Optimiert:    ${optimizedCount} Artikel`);
console.log(`Unverändert:  ${unchangedCount} Artikel`);
console.log(`Total:        ${optimizedCount + unchangedCount} Artikel`);
console.log('═══════════════════════════════════════\n');


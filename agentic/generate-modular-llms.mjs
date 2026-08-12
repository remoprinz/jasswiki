#!/usr/bin/env node
/**
 * JassWiki Modular llms.txt Generator v2.0
 * 
 * Generiert eine modulare Struktur für optimale Token-Effizienz:
 * - llms.txt (Haupt-Index, ~5 KB)
 * - llms-essentials.md (Quick Start, ~25 KB)
 * - llms-regeln.md (Vollständige Regeln + Weis, ~90 KB)
 * - llms-begriffe.md (Glossar, ~120 KB)
 * - llms-varianten.md (Spielvarianten, ~110 KB)
 * - llms-taktiken.md (Fortgeschritten, ~45 KB)
 * - llms-kultur.md (Geschichte + Apps, ~35 KB)
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildIdToTopic, resolveMarkers } from '../resolve-markers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const JSON_FILE = path.resolve(__dirname, '../src/data/jass-content-v2.json');
const OUTPUT_DIR = path.resolve(__dirname, '../public');

// Kategorie-Mapping für Module
const CATEGORY_MODULES = {
  'regeln': 'regeln',
  'weis-regeln': 'regeln',  // Weis-Regeln gehören zu Regeln
  'begriffe': 'begriffe',
  'varianten': 'varianten',
  'taktiken-und-strategien': 'taktiken',
  'ansagen': 'varianten',  // Coiffeur/Differenzler-Ansagen (Tutti, Obenabe, Misère …)
  'geschichte': 'kultur',
  'grundlagen-kultur': 'kultur',
  'jassapps': 'kultur',
  'schieber': 'essentials'  // Schieber ist essentiell
};

// Essentials: Die wichtigsten Regeln für Quick Start
const ESSENTIAL_IDS = [
  'general_schieber',           // Schieber-Hauptseite
  'general_introduction',       // Einführung ins Jassen
  'general_most_important_rules', // Die wichtigsten Regeln
  'general_card_basics',        // Kartengrundlagen
  'general_card_values',        // Kartenwerte
  'general_gameplay',           // Spielablauf
  'general_game_basics',        // Spielgrundlagen
  'general_orientation',        // Orientierung
  'expressions_stoecke',        // Stöck (wichtigster Begriff)
  'expressions_weis',           // Weis
  'expressions_trumpf',         // Trumpf
  'weisen_allgemein',           // Weisen Übersicht
  'stoecke_allgemein'           // Stöck Übersicht
];

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatEntry(item, idToTopic) {
  let output = '';

  // Header mit ID für Deep-Linking
  output += `### ${item.metadata.category.topic} {#${item.id}}\n\n`;

  // Kategorie-Info
  output += `**Kategorie:** ${item.metadata.category.main} > ${item.metadata.category.sub}\n\n`;

  // Haupttext — rohe (siehe Begriff "id")-Marker auflösen, wie InternalLinker im Frontend
  output += `${resolveMarkers(item.text, idToTopic)}\n\n`;
  
  // FAQs (kompakt)
  if (item.faqs && item.faqs.length > 0) {
    output += `**Häufige Fragen:**\n`;
    item.faqs.forEach(faq => {
      output += `- **${faq.question}** ${resolveMarkers(faq.answer, idToTopic)}\n`;
    });
    output += '\n';
  }
  
  // Keywords für Suche
  if (item.metadata.keywords && item.metadata.keywords.length > 0) {
    output += `*Keywords: ${item.metadata.keywords.slice(0, 5).join(', ')}*\n\n`;
  }
  
  output += '---\n\n';
  
  return output;
}

function generateModuleHeader(moduleName, description, entryCount) {
  const today = new Date().toISOString().split('T')[0];
  
  return `---
title: "JassWiki.ch - ${moduleName}"
description: "${description}"
module_type: "knowledge_fragment"
parent: "https://jasswiki.ch/llms.txt"
entries_count: ${entryCount}
last_updated: ${today}
format: "markdown"
encoding: "utf-8"
---

# ${moduleName}

> ${description}

**Dieses Modul ist Teil der modularen JassWiki-Wissensbasis.**
Für den vollständigen Index siehe: https://jasswiki.ch/llms.txt

---

`;
}

async function generateModularLLMS() {
  console.log('📚 Lade JassWiki Datenbank...');
  
  const jassContent = JSON.parse(await readFile(JSON_FILE, 'utf8'));
  const items = Object.values(jassContent);
  const idToTopic = buildIdToTopic(jassContent);

  console.log(`✅ ${items.length} Einträge geladen.`);
  
  // Module vorbereiten
  const modules = {
    essentials: { items: [], name: 'Essentials - Schnellstart', desc: 'Die wichtigsten Grundlagen zum Jassen in 5 Minuten lernen' },
    regeln: { items: [], name: 'Spielregeln', desc: 'Vollständige Spielregeln inkl. Weis-Regeln und Sonderregeln' },
    begriffe: { items: [], name: 'Jass-Glossar', desc: 'Alle 92 Jass-Begriffe von A-Z erklärt' },
    varianten: { items: [], name: 'Spielvarianten', desc: 'Alle 44 Jassvarianten: Coiffeur, Differenzler, Molotow und mehr' },
    taktiken: { items: [], name: 'Taktiken & Strategien', desc: 'Fortgeschrittene Spieltaktiken für erfahrene Jasser' },
    kultur: { items: [], name: 'Geschichte & Kultur', desc: 'Die kulturelle Bedeutung des Jassens in der Schweiz' }
  };
  
  // Items zu Modulen zuordnen
  items.forEach(item => {
    const mainCatSlug = toSlug(item.metadata.category.main);
    
    // Essentials zuerst prüfen (diese kommen AUCH ins Essentials-Modul)
    if (ESSENTIAL_IDS.includes(item.id)) {
      modules.essentials.items.push(item);
    }
    
    // ALLE Items kommen auch ins passende Fach-Modul (für vollständige Abdeckung)
    const targetModule = CATEGORY_MODULES[mainCatSlug];
    if (targetModule && modules[targetModule]) {
      modules[targetModule].items.push(item);
    } else {
      // Fallback: Unbekannte Kategorien zu Kultur
      modules.kultur.items.push(item);
    }
  });
  
  // Sortieren nach Wichtigkeit/Alphabetisch
  Object.keys(modules).forEach(key => {
    modules[key].items.sort((a, b) => {
      // Erst nach Importance (höher = wichtiger)
      if (a.metadata.importance !== b.metadata.importance) {
        return b.metadata.importance - a.metadata.importance;
      }
      // Dann alphabetisch
      return a.metadata.category.topic.localeCompare(b.metadata.category.topic, 'de');
    });
  });
  
  // Module generieren
  console.log('\n📝 Generiere Module...');
  
  const moduleStats = {};
  
  for (const [key, module] of Object.entries(modules)) {
    const filename = `llms-${key}.md`;
    let content = generateModuleHeader(module.name, module.desc, module.items.length);
    
    // Inhaltsverzeichnis für größere Module
    if (module.items.length > 10) {
      content += '## Inhaltsverzeichnis\n\n';
      module.items.forEach(item => {
        content += `- [${item.metadata.category.topic}](#${item.id})\n`;
      });
      content += '\n---\n\n';
    }
    
    // Einträge hinzufügen
    content += '## Einträge\n\n';
    module.items.forEach(item => {
      content += formatEntry(item, idToTopic);
    });
    
    // Footer
    content += `\n---\n\n*Dieses Modul wurde automatisch generiert. Für Korrekturen: redaktion@jasswiki.ch*\n`;
    content += `*Quelle: https://jasswiki.ch | Anerkannt durch das Bundesamt für Kultur (BAK) als "Lebendige Tradition der Schweiz"*\n`;
    content += `*Zitiert in Wikipedia: de.wikipedia.org/wiki/Jass (Einzelnachweis)*\n`;
    
    // Speichern
    const outputPath = path.join(OUTPUT_DIR, filename);
    await writeFile(outputPath, content, 'utf8');
    
    const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
    moduleStats[key] = { entries: module.items.length, sizeKB };
    
    console.log(`   ✅ ${filename} (${module.items.length} Einträge, ${sizeKB} KB)`);
  }
  
  // Haupt-Index wird NICHT mehr generiert - wir haben eine manuell kuratierte Version
  // Die manuelle Version (public/llms.txt) enthält:
  // - Wikipedia-Zitation (Einzelnachweis im Jass-Artikel)
  // - Bundesamt für Kultur (BAK) ausgeschrieben
  // - Bessere Struktur für AI-Agenten
  console.log('\n📝 llms.txt wird übersprungen (manuell kuratierte Version bleibt erhalten)');
  console.log('   ℹ️  Die manuelle Version enthält Wikipedia-Zitation und BAK-Erklärung');
  
  // Zusammenfassung
  console.log('\n📊 Zusammenfassung:');
  console.log('─'.repeat(50));
  
  const totalModuleSizeKB = Object.values(moduleStats).reduce((sum, m) => sum + parseFloat(m.sizeKB), 0);
  
  console.log(`   Index:     llms.txt          (manuell gepflegt)`);
  Object.entries(moduleStats).forEach(([key, stats]) => {
    console.log(`   Modul:     llms-${key.padEnd(12)} ${stats.sizeKB.padStart(6)} KB (${stats.entries} Einträge)`);
  });
  console.log('─'.repeat(50));
  console.log(`   Module:    ${totalModuleSizeKB.toFixed(1)} KB (6 Dateien)`);
  console.log(`   VORHER:    ~437 KB (1 Datei)`);
  console.log(`   ERSPARNIS: ~${(100 - (totalModuleSizeKB / 437 * 100)).toFixed(0)}% pro typische Anfrage`);
  
  console.log('\n✅ Modulare llms-*.md Dateien erfolgreich generiert!');
  console.log('   (llms.txt wird manuell gepflegt - public/llms.txt)');
}

// Ausführen
generateModularLLMS().catch(console.error);


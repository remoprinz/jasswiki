/**
 * Generiert eine Liste mit den kanonischen URLs der Artikel mit Content-Verlust
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const reportPath = path.join(__dirname, '../CONTENT_LOSS_REPORT.json');
const urlMappingPath = path.join(__dirname, '../lib/url-mapping.json');
const outputPath = path.join(__dirname, '../CONTENT_LOSS_URLS.md');

// Daten laden
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
const urlMapping = JSON.parse(fs.readFileSync(urlMappingPath, 'utf-8'));

// URLs für problematische Artikel sammeln
const articlesWithUrls = report.problematicArticles.map((article: any) => {
  const id = article.id;
  
  // Versuche verschiedene Varianten des IDs
  const possibleKeys = [
    id,
    id.replace(/_/g, '-'),
    `expressions_${id}`,
    id.replace(/^expressions_/, ''),
    id.replace(/^general_/, ''),
    id.replace(/^schieber_taktiken_/, ''),
    id.replace(/^history_/, ''),
    id.replace(/^variants_/, ''),
    id.replace(/^weis_rules_/, ''),
    id.replace(/^jassapps_/, ''),
    id.replace(/^references_/, ''),
  ];
  
  let url = null;
  for (const key of possibleKeys) {
    if (urlMapping[key]) {
      url = urlMapping[key];
      break;
    }
    // Auch mit Bindestrichen probieren
    const hyphenated = key.replace(/_/g, '-');
    if (urlMapping[hyphenated]) {
      url = urlMapping[hyphenated];
      break;
    }
  }
  
  return {
    ...article,
    url: url || `⚠️ URL nicht gefunden für ID: ${id}`
  };
});

// Markdown-Report generieren
let markdown = `# 🔗 Artikel mit Content-Verlust - URLs\n\n`;
markdown += `Generiert am: ${new Date().toLocaleString('de-CH')}\n\n`;
markdown += `## Zusammenfassung\n\n`;
markdown += `- **Gesamt**: ${report.summary.articlesWithLoss + report.summary.missingArticles} Artikel mit Problemen\n`;
markdown += `- **Mit Content-Verlust**: ${report.summary.articlesWithLoss} Artikel (> 10% Verlust)\n`;
markdown += `- **Fehlend**: ${report.summary.missingArticles} Artikel\n\n`;

markdown += `---\n\n`;

// URLs mit gefundenem Verlust gruppieren
const articlesWithFoundUrls = articlesWithUrls.filter((a: any) => !a.url.includes('⚠️'));
const articlesWithoutUrls = articlesWithUrls.filter((a: any) => a.url.includes('⚠️'));

markdown += `## ✅ Artikel mit URLs (${articlesWithFoundUrls.length})\n\n`;
markdown += `Sortiert nach Content-Verlust (höchster zuerst):\n\n`;

articlesWithFoundUrls.forEach((article: any, idx: number) => {
  const statusEmoji = article.status === 'missing' ? '❌' : 
                     article.lossPercentage >= 20 ? '🔴' : 
                     article.lossPercentage >= 15 ? '🟠' : '🟡';
  
  markdown += `${idx + 1}. ${statusEmoji} **${article.lossPercentage}% Verlust**\n`;
  markdown += `   - ID: \`${article.id}\`\n`;
  markdown += `   - URL: ${article.url}\n`;
  markdown += `   - Differenz: ${article.difference} Zeichen\n`;
  markdown += `   - Status: ${article.status === 'missing' ? 'FEHLT KOMPLETT' : 'Content-Verlust'}\n\n`;
});

if (articlesWithoutUrls.length > 0) {
  markdown += `\n---\n\n`;
  markdown += `## ⚠️ Artikel ohne URL-Mapping (${articlesWithoutUrls.length})\n\n`;
  markdown += `Diese Artikel haben Content-Verlust, aber keine URL wurde gefunden:\n\n`;
  
  articlesWithoutUrls.forEach((article: any, idx: number) => {
    markdown += `${idx + 1}. **${article.lossPercentage}% Verlust**\n`;
    markdown += `   - ID: \`${article.id}\`\n`;
    markdown += `   - ${article.url}\n\n`;
  });
}

// URL-Liste (reine Links für Copy & Paste)
markdown += `\n---\n\n`;
markdown += `## 📋 Reine URL-Liste (Copy & Paste)\n\n`;
markdown += `\`\`\`\n`;
articlesWithFoundUrls.forEach((article: any) => {
  markdown += `${article.url}\n`;
});
markdown += `\`\`\`\n\n`;

// Nach Verlust-Prozentsatz gruppieren
markdown += `\n---\n\n`;
markdown += `## 📊 Gruppiert nach Verlust-Kategorie\n\n`;

const critical = articlesWithFoundUrls.filter((a: any) => a.lossPercentage >= 20);
const high = articlesWithFoundUrls.filter((a: any) => a.lossPercentage >= 15 && a.lossPercentage < 20);
const medium = articlesWithFoundUrls.filter((a: any) => a.lossPercentage >= 10 && a.lossPercentage < 15);

markdown += `### 🔴 Kritisch (≥ 20% Verlust): ${critical.length} Artikel\n\n`;
critical.forEach((a: any) => {
  markdown += `- [${a.lossPercentage}%] ${a.url}\n`;
});

markdown += `\n### 🟠 Hoch (15-19% Verlust): ${high.length} Artikel\n\n`;
high.forEach((a: any) => {
  markdown += `- [${a.lossPercentage}%] ${a.url}\n`;
});

markdown += `\n### 🟡 Mittel (10-14% Verlust): ${medium.length} Artikel\n\n`;
medium.forEach((a: any) => {
  markdown += `- [${a.lossPercentage}%] ${a.url}\n`;
});

// Datei speichern
fs.writeFileSync(outputPath, markdown, 'utf-8');

// Konsolenausgabe
console.log('\n🔗 URL-Liste generiert!\n');
console.log(`📄 Datei: ${outputPath}\n`);
console.log('📊 Statistik:');
console.log(`   - URLs gefunden: ${articlesWithFoundUrls.length}`);
console.log(`   - URLs fehlen: ${articlesWithoutUrls.length}`);
console.log(`   - 🔴 Kritisch (≥20%): ${critical.length}`);
console.log(`   - 🟠 Hoch (15-19%): ${high.length}`);
console.log(`   - 🟡 Mittel (10-14%): ${medium.length}`);
console.log('\n✅ Fertig!\n');

// Auch JSON-Version mit URLs speichern
const jsonOutput = {
  timestamp: new Date().toISOString(),
  summary: {
    totalWithLoss: articlesWithFoundUrls.length + articlesWithoutUrls.length,
    withUrls: articlesWithFoundUrls.length,
    withoutUrls: articlesWithoutUrls.length,
    critical: critical.length,
    high: high.length,
    medium: medium.length
  },
  articles: articlesWithUrls
};

const jsonOutputPath = path.join(__dirname, '../CONTENT_LOSS_URLS.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonOutput, null, 2), 'utf-8');
console.log(`💾 JSON-Version gespeichert: ${jsonOutputPath}\n`);









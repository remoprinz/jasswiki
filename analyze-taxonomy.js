// Analysiere jass-content-v2.json und extrahiere alle Begriffe für die Taxonomie

import { readFileSync } from 'fs';

const content = JSON.parse(readFileSync('src/data/jass-content-v2.json', 'utf-8'));

// Kategorien sammeln
const categories = {
  varianten: new Set(),
  ansagen: new Set(),
  karten: new Set(),
  punkte: new Set(),
  spielablauf: new Set(),
  begriffe: new Set(),
  andere: new Set(),
};

// Alle Keys durchgehen
for (const [key, value] of Object.entries(content)) {
  const meta = value.metadata;
  if (!meta || !meta.category) continue;
  
  const mainCat = meta.category.main?.toLowerCase() || '';
  const subCat = meta.category.sub?.toLowerCase() || '';
  const topic = meta.category.topic || key;
  
  // Kategorisieren
  if (mainCat.includes('variant') || subCat.includes('variant') || key.includes('variant')) {
    categories.varianten.add(topic);
  } else if (mainCat.includes('ansage') || subCat.includes('ansage') || key.includes('obenabe') || key.includes('undenufe') || key.includes('slalom') || key.includes('trumpf')) {
    categories.ansagen.add(topic);
  } else if (mainCat.includes('karten') || subCat.includes('karten') || key.includes('kart') || key.includes('farb')) {
    categories.karten.add(topic);
  } else if (mainCat.includes('punkt') || subCat.includes('punkt') || key.includes('punkt') || key.includes('weis') || key.includes('stoeck')) {
    categories.punkte.add(topic);
  } else if (mainCat.includes('ablauf') || subCat.includes('ablauf') || key.includes('stich') || key.includes('geben') || key.includes('misch')) {
    categories.spielablauf.add(topic);
  } else if (mainCat.includes('begriffe') || mainCat.includes('expression')) {
    categories.begriffe.add(topic);
  } else {
    categories.andere.add(topic);
  }
}

console.log('📊 JASS-CONTENT ANALYSE');
console.log('='.repeat(60));
console.log(`\nTotal Einträge: ${Object.keys(content).length}\n`);

console.log('📂 VARIANTEN (' + categories.varianten.size + '):');
[...categories.varianten].sort().forEach(v => console.log(`   • ${v}`));

console.log('\n📂 ANSAGEN/MODI (' + categories.ansagen.size + '):');
[...categories.ansagen].sort().forEach(v => console.log(`   • ${v}`));

console.log('\n📂 KARTEN (' + categories.karten.size + '):');
[...categories.karten].sort().forEach(v => console.log(`   • ${v}`));

console.log('\n📂 PUNKTE (' + categories.punkte.size + '):');
[...categories.punkte].sort().forEach(v => console.log(`   • ${v}`));

console.log('\n📂 SPIELABLAUF (' + categories.spielablauf.size + '):');
[...categories.spielablauf].sort().forEach(v => console.log(`   • ${v}`));

console.log('\n📂 BEGRIFFE (' + categories.begriffe.size + '):');
[...categories.begriffe].slice(0, 20).forEach(v => console.log(`   • ${v}`));
if (categories.begriffe.size > 20) console.log(`   ... und ${categories.begriffe.size - 20} weitere`);

console.log('\n' + '='.repeat(60));

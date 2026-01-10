// VOLLSTÄNDIGE TAXONOMIE-VALIDIERUNG

import { readFileSync } from 'fs';

const content = JSON.parse(readFileSync('src/data/jass-content-v2.json', 'utf-8'));

// Extrahiere kurze Beschreibung aus dem Text
function extractDesc(text) {
  if (!text) return '';
  const defMatch = text.match(/Definition:\s*\n?•?\s*([^\n•]+)/);
  if (defMatch) return defMatch[1].trim().substring(0, 80);
  return text.split('\n')[0].substring(0, 80);
}

// Alle jasswikiKeys aus der Taxonomie
const taxonomyKeys = [
  { key: 'general_schieber', name: 'Schieber' },
  { key: 'variants_strategic_differenzler_verdeckt', name: 'Differenzler' },
  { key: 'variants_family_coiffeur_schieber', name: 'Coiffeur' },
  { key: 'expressions_trumpf', name: 'Trumpf' },
  { key: 'expressions_obenabe', name: 'Obenabe' },
  { key: 'expressions_undenufe', name: 'Undenufe' },
  { key: 'expressions_weis', name: 'Weis' },
  { key: 'expressions_stoecke', name: 'Stöck' },
  { key: 'expressions_stoeck_weis_stich', name: 'Stöck-Weis-Stich' },
  { key: 'matsch', name: 'Matsch' },
  { key: 'expressions_bedanken', name: 'Bedanken' },
  { key: 'expressions_nell', name: 'Nell' },
  { key: 'trumpf_bauer', name: 'Puur' },
  { key: 'expressions_banner', name: 'Banner' },
];

console.log('🔍 VOLLSTÄNDIGE TAXONOMIE-VALIDIERUNG\n');
console.log('='.repeat(60) + '\n');

let errors = 0;
let warnings = 0;

taxonomyKeys.forEach(({ key, name }) => {
  const entry = content[key];
  if (!entry) {
    console.log(`❌ FEHLER: ${name} (${key}) existiert NICHT im Content!`);
    errors++;
    return;
  }
  
  const topic = entry.metadata?.category?.topic || '?';
  const desc = extractDesc(entry.text);
  
  console.log(`✅ ${name}`);
  console.log(`   Key: ${key}`);
  console.log(`   Topic: ${topic}`);
  console.log(`   Def: "${desc}..."`);
  console.log('');
});

console.log('='.repeat(60));
console.log(`\n📊 ERGEBNIS: ${errors} Fehler, ${warnings} Warnungen`);

if (errors === 0) {
  console.log('🎉 Alle Taxonomie-Einträge sind validiert!');
} else {
  console.log('⚠️  Bitte korrigieren Sie die Fehler!');
}

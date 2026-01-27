// Korrigiere Schieber und füge weitere fehlende Tier-1 Einträge hinzu

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/jass-content-v2.json';
const content = JSON.parse(readFileSync(filePath, 'utf-8'));

// Korrigiere Schieber
if (content.general_schieber) {
  content.general_schieber.metadata.taxonomy_tier = 1;
  content.general_schieber.metadata.wikidata_id = 'Q137727247';
  console.log('✅ Schieber korrigiert → Tier 1, Wikidata: Q137727247');
}

// Prüfe weitere mögliche Tier-1 Einträge
const checks = [
  { key: 'expressions_puur', wikidata: null },
  { key: 'variants_specialty_molotow', wikidata: null },
];

for (const check of checks) {
  if (content[check.key] && content[check.key].metadata.taxonomy_tier !== 1) {
    content[check.key].metadata.taxonomy_tier = 1;
    if (check.wikidata) {
      content[check.key].metadata.wikidata_id = check.wikidata;
    }
    console.log(`✅ ${check.key} → Tier 1`);
  }
}

writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
console.log('\n💾 Aktualisiert: ' + filePath);

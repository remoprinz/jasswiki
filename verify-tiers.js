// Verifiziere die Tier-Zuordnungen

import { readFileSync } from 'fs';

const content = JSON.parse(readFileSync('src/data/jass-content-v2.json', 'utf-8'));

console.log('🔍 TIER-VERIFIZIERUNG\n');

const tier1 = [];
const tier2 = [];
const tier3 = [];
const withWikidata = [];

for (const [key, entry] of Object.entries(content)) {
  const tier = entry.metadata?.taxonomy_tier;
  const wikidata = entry.metadata?.wikidata_id;
  
  if (tier === 1) {
    tier1.push({ key, topic: entry.metadata?.category?.topic || key, wikidata });
  } else if (tier === 2) {
    tier2.push({ key, topic: entry.metadata?.category?.topic || key });
  } else if (tier === 3) {
    tier3.push({ key });
  }
  
  if (wikidata) {
    withWikidata.push({ key, wikidata });
  }
}

console.log('📊 TIER 1 (' + tier1.length + '):');
tier1.forEach(e => {
  console.log(`   • ${e.key} (${e.topic})${e.wikidata ? ' → ' + e.wikidata : ''}`);
});

console.log('\n📊 TIER 2 (' + tier2.length + '):');
tier2.slice(0, 10).forEach(e => {
  console.log(`   • ${e.key} (${e.topic})`);
});
if (tier2.length > 10) console.log(`   ... und ${tier2.length - 10} weitere`);

console.log('\n📊 MIT WIKIDATA ID (' + withWikidata.length + '):');
withWikidata.forEach(e => {
  console.log(`   • ${e.key} → ${e.wikidata}`);
});

console.log('\n✅ Verifizierung abgeschlossen!');

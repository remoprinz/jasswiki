// Füge taxonomy_tier und wikidata_id zu jass-content-v2.json hinzu

import { readFileSync, writeFileSync } from 'fs';

// Tier 1: Wikipedia-Level Begriffe (mit Wikidata IDs)
const tier1 = {
  'variants_family_partner_schieber': { tier: 1, wikidata_id: 'Q137727247' },
  'variants_strategic_differenzler_verdeckt': { tier: 1, wikidata_id: 'Q137731684' },
  'variants_family_einzel_coiffeur': { tier: 1, wikidata_id: 'Q137731700' },
  'expressions_obenabe': { tier: 1, wikidata_id: null },
  'expressions_undenufe': { tier: 1, wikidata_id: null },
  'expressions_stoecke': { tier: 1, wikidata_id: null },
  'expressions_weis': { tier: 1, wikidata_id: null },
  'matsch': { tier: 1, wikidata_id: null },
  'expressions_puur': { tier: 1, wikidata_id: null },
  'expressions_nell': { tier: 1, wikidata_id: null },
  // Molotow (falls vorhanden)
  'variants_specialty_molotow': { tier: 1, wikidata_id: null },
  'variants_specialty_molotow_vier': { tier: 1, wikidata_id: null },
  'variants_specialty_molotow_fuenf': { tier: 1, wikidata_id: null },
  'variants_specialty_molotow_sechs': { tier: 1, wikidata_id: null },
};

// Tier 2: Wichtige Varianten/Begriffe (ohne Wikidata IDs)
const tier2 = [
  'variants_family_partner_bieter',
  'variants_strategic_pandur',
  'variants_family_partner_handjass',
  'variants_family_partner_kreuzjass',
  'variants_specialty_chratze',
  'variants_learning_tschau_sepp',
  'variants_specialty_guggitaler',
  'variants_specialty_slalom',
  'variants_specialty_guschti',
  'variants_specialty_misere',
  'expressions_trumpf',
  'expressions_bodentrumpf',
  'expressions_schieben',
  'expressions_bedanken',
  'expressions_schreiben',
  'expressions_partie',
  'expressions_passe',
  'expressions_team',
  'expressions_stapel',
  'expressions_rauben',
  'expressions_nuller',
  'expressions_stoeck_weis_stich',
  'expressions_weispunkte',
  'expressions_hindersi',
  'untertrumpfen',
  'kartenfarben',
  'kartenverteilen',
  'mischen',
  'spiel_geben',
  'ausspiel',
  'stich',
];

console.log('📊 Füge taxonomy_tier zu jass-content-v2.json hinzu...\n');

// Lade JSON
const filePath = 'src/data/jass-content-v2.json';
const content = JSON.parse(readFileSync(filePath, 'utf-8'));

let tier1Count = 0;
let tier2Count = 0;
let tier3Count = 0;
let wikidataCount = 0;

// Gehe durch alle Einträge
for (const [key, entry] of Object.entries(content)) {
  if (!entry.metadata) {
    entry.metadata = {};
  }
  
  // Prüfe Tier 1
  if (tier1[key]) {
    entry.metadata.taxonomy_tier = tier1[key].tier;
    if (tier1[key].wikidata_id) {
      entry.metadata.wikidata_id = tier1[key].wikidata_id;
      wikidataCount++;
    }
    tier1Count++;
  }
  // Prüfe Tier 2
  else if (tier2.includes(key)) {
    entry.metadata.taxonomy_tier = 2;
    tier2Count++;
  }
  // Alles andere = Tier 3
  else {
    entry.metadata.taxonomy_tier = 3;
    tier3Count++;
  }
}

// Speichere JSON (mit Formatierung)
writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');

console.log('✅ Fertig!\n');
console.log(`📊 Statistik:`);
console.log(`   Tier 1 (Wikipedia-Level): ${tier1Count}`);
console.log(`   Tier 2 (Wichtig): ${tier2Count}`);
console.log(`   Tier 3 (Vollständigkeit): ${tier3Count}`);
console.log(`   Mit Wikidata ID: ${wikidataCount}`);
console.log(`\n💾 Gespeichert: ${filePath}`);

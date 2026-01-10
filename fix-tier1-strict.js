// STRENGE Tier 1 Zuordnung - NUR Wikipedia-Hauptbegriffe

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/jass-content-v2.json';
const content = JSON.parse(readFileSync(filePath, 'utf-8'));

// NUR diese Keys sind Tier 1 (direkt auf Wikipedia erwähnt)
const tier1Keys = [
  // Varianten (Wikipedia: "Jassvarianten")
  'general_schieber',           // Schieber
  'variants_strategic_differenzler_verdeckt',  // Differenzler
  'variants_family_einzel_coiffeur',           // Coiffeur (Hauptartikel)
  'variants_family_coiffeur_schieber',         // Coiffeur-Schieber
  
  // Spielprinzip (Wikipedia: "Spielprinzip")
  'expressions_trumpf',         // Trumpf
  'expressions_obenabe',        // Obenabe
  'expressions_undenufe',       // Undenufe
  
  // Weis und Stöck (Wikipedia: "Weis (Wyys) und Stöck")
  'expressions_weis',           // Weis
  'expressions_stoecke',        // Stöck
  'expressions_stoeck_weis_stich', // Stöck-Weis-Stich
  
  // Matsch (Wikipedia: "Vorzeitiges Ende einer Runde")
  'matsch',                     // Matsch
  
  // Bedanken (Wikipedia: "Sich bedanken")
  'expressions_bedanken',       // Bedanken
  
  // Karten (Wikipedia: "Nell, Bauer/Puur")
  'expressions_nell',           // Nell
  'expressions_puur',           // Puur
];

// Wikidata IDs für bekannte Entities
const wikidataIds = {
  'general_schieber': 'Q137727247',
  'variants_strategic_differenzler_verdeckt': 'Q137731684',
  'variants_family_einzel_coiffeur': 'Q137731700',
};

console.log('🔍 STRENGE Tier 1 Zuordnung...\n');

let tier1Count = 0;
let tier2Count = 0;
let tier3Count = 0;

// Reset alle und neu zuweisen
for (const [key, entry] of Object.entries(content)) {
  // Lösche alte Wikidata ID
  delete entry.metadata.wikidata_id;
  
  if (tier1Keys.includes(key)) {
    entry.metadata.taxonomy_tier = 1;
    if (wikidataIds[key]) {
      entry.metadata.wikidata_id = wikidataIds[key];
    }
    tier1Count++;
    console.log(`   ✓ Tier 1: ${key} (${entry.metadata?.category?.topic})`);
  } else {
    // Tier 2: Wichtige Begriffe (Varianten, Taktiken)
    const keyLower = key.toLowerCase();
    if (keyLower.includes('variants_') || 
        keyLower.includes('schieber_taktiken') ||
        keyLower.includes('weis_rules') ||
        keyLower.includes('expressions_') && !tier1Keys.includes(key)) {
      entry.metadata.taxonomy_tier = 2;
      tier2Count++;
    } else {
      entry.metadata.taxonomy_tier = 3;
      tier3Count++;
    }
  }
}

writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');

console.log('\n📊 NEUE TIER-VERTEILUNG:');
console.log(`   Tier 1 (Wikipedia): ${tier1Count}`);
console.log(`   Tier 2 (Wichtig): ${tier2Count}`);
console.log(`   Tier 3 (Rest): ${tier3Count}`);
console.log('\n💾 Gespeichert!');

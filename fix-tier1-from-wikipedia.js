// Korrigiere Tier 1 basierend auf Wikipedia-Artikel
// https://de.wikipedia.org/wiki/Jass

import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/jass-content-v2.json';
const content = JSON.parse(readFileSync(filePath, 'utf-8'));

// Wikipedia erwähnt diese Begriffe explizit:
const wikipediaTerms = [
  // Varianten (Sektion "Jassvarianten")
  'schieber',
  'differenzler', 
  'coiffeur',
  'molotow',
  
  // Spielprinzip
  'trumpf',
  'obenabe',
  'undenufe',
  
  // Weis und Stöck (Sektion "Weis (Wyys) und Stöck")
  'weis',
  'stöck',
  'stoeck',
  
  // Matsch (Sektion "Vorzeitiges Ende einer Runde")
  'matsch',
  
  // Bedanken (Sektion "Sich bedanken")
  'bedanken',
  
  // Stöck-Wyys-Stich
  'stoeck_weis_stich',
  'stoeck_wyys_stich',
  
  // Karten (Nell, Puur/Bauer)
  'nell',
  'puur',
  'bauer',
  
  // Schreiben
  'schreiben',
];

console.log('🔍 Korrigiere Tier 1 basierend auf Wikipedia...\n');

let tier1Count = 0;
let tier2Count = 0;
let tier3Count = 0;
let changedToTier1 = [];
let removedFromTier1 = [];

// Reset alle Tiers auf 3, dann neu zuweisen
for (const [key, entry] of Object.entries(content)) {
  const oldTier = entry.metadata?.taxonomy_tier || 3;
  const topic = entry.metadata?.category?.topic?.toLowerCase() || '';
  const keyLower = key.toLowerCase();
  
  // Prüfe ob dieser Begriff auf Wikipedia erwähnt wird
  let isWikipedia = false;
  for (const term of wikipediaTerms) {
    if (keyLower.includes(term) || topic.includes(term)) {
      isWikipedia = true;
      break;
    }
  }
  
  // Spezielle Checks für bekannte Wikipedia-Begriffe
  if (keyLower.includes('general_schieber') ||
      keyLower.includes('differenzler') ||
      keyLower.includes('coiffeur') && !keyLower.includes('schieber') ||
      keyLower.includes('molotow') ||
      keyLower.includes('obenabe') ||
      keyLower.includes('undenufe') ||
      keyLower.includes('weis') && !keyLower.includes('weispunkte') ||
      keyLower.includes('stoeck') && !keyLower.includes('stoeckpunkte') ||
      key === 'matsch' ||
      keyLower.includes('bedanken') && !keyLower.includes('fruehzeitig') ||
      keyLower.includes('nell') ||
      keyLower.includes('puur') ||
      keyLower.includes('stoeck_weis_stich') ||
      keyLower.includes('schreiben')) {
    isWikipedia = true;
  }
  
  if (isWikipedia) {
    if (oldTier !== 1) {
      changedToTier1.push({ key, topic: entry.metadata?.category?.topic });
    }
    entry.metadata.taxonomy_tier = 1;
    tier1Count++;
  } else if (oldTier === 1) {
    // War Tier 1, ist aber nicht auf Wikipedia
    removedFromTier1.push({ key, topic: entry.metadata?.category?.topic });
    entry.metadata.taxonomy_tier = 2; // Downgrade zu Tier 2
    tier2Count++;
  } else if (oldTier === 2) {
    tier2Count++;
  } else {
    entry.metadata.taxonomy_tier = 3;
    tier3Count++;
  }
}

writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');

console.log('📊 NEUE TIER-VERTEILUNG:');
console.log(`   Tier 1 (Wikipedia): ${tier1Count}`);
console.log(`   Tier 2 (Wichtig): ${tier2Count}`);
console.log(`   Tier 3 (Rest): ${tier3Count}`);

console.log('\n✅ NEU in Tier 1:');
changedToTier1.forEach(e => console.log(`   + ${e.key} (${e.topic})`));

console.log('\n❌ ENTFERNT aus Tier 1:');
removedFromTier1.forEach(e => console.log(`   - ${e.key} (${e.topic})`));

console.log('\n💾 Gespeichert!');

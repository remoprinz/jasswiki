// TAXONOMIE-VALIDIERUNG: Cross-Check gegen echten Content

import { readFileSync } from 'fs';

const content = JSON.parse(readFileSync('src/data/jass-content-v2.json', 'utf-8'));

// Extrahiere erste Zeile der Definition aus dem Text
function extractShortDescription(text) {
  if (!text) return '';
  // Suche nach "Definition:" und extrahiere den Text danach
  const defMatch = text.match(/Definition:\s*\n?•?\s*([^\n•]+)/);
  if (defMatch) {
    return defMatch[1].trim().substring(0, 100);
  }
  // Fallback: erste Zeile
  return text.split('\n')[0].substring(0, 100);
}

console.log('🔍 TAXONOMIE-VALIDIERUNG\n');
console.log('Prüfe alle Tier 1 Begriffe gegen den echten Content...\n');

const tier1Keys = [
  'general_schieber',
  'variants_strategic_differenzler_verdeckt',
  'variants_family_coiffeur_schieber',
  'expressions_trumpf',
  'expressions_obenabe',
  'expressions_undenufe',
  'expressions_weis',
  'expressions_stoecke',
  'expressions_stoeck_weis_stich',
  'matsch',
  'expressions_bedanken',
  'expressions_nell',
  'trumpf_bauer',
];

console.log('=== TIER 1 BEGRIFFE (Wikipedia) ===\n');

tier1Keys.forEach(key => {
  const entry = content[key];
  if (!entry) {
    console.log(`❌ FEHLT: ${key}`);
  } else {
    const topic = entry.metadata?.category?.topic || '?';
    const desc = extractShortDescription(entry.text);
    console.log(`✅ ${key}`);
    console.log(`   Topic: ${topic}`);
    console.log(`   Def: ${desc}...`);
    console.log('');
  }
});

// Suche nach Karten-Begriffen
console.log('\n=== KARTEN-BEGRIFFE ===\n');

const kartenKeys = ['expressions_banner', 'expressions_nell', 'trumpf_bauer', 'general_card_values'];

kartenKeys.forEach(key => {
  const entry = content[key];
  if (entry) {
    const topic = entry.metadata?.category?.topic || '?';
    const desc = extractShortDescription(entry.text);
    console.log(`📎 ${key} → "${topic}"`);
    console.log(`   ${desc}...`);
    console.log('');
  }
});

// Prüfe auf häufige Fehler
console.log('\n=== HÄUFIGE FEHLER ===\n');

// Ass vs Banner
const banner = content['expressions_banner'];
if (banner) {
  console.log('⚠️  BANNER = Zehner (NICHT Ass!)');
  console.log('   ' + extractShortDescription(banner.text));
}

// Suche nach Ass
const assMatch = Object.entries(content).find(([k, v]) => 
  v.metadata?.category?.topic?.toLowerCase() === 'ass'
);
if (assMatch) {
  console.log('\n✅ ASS gefunden:', assMatch[0]);
} else {
  console.log('\n⚠️  Kein separater "Ass" Artikel gefunden');
  console.log('   Ass wird in general_card_values beschrieben');
}

console.log('\n=== VALIDIERUNG ABGESCHLOSSEN ===');

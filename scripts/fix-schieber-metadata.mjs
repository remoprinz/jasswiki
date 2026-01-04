import fs from 'fs';

const JSON_FILE = 'src/data/jass-content-v2.json';

function main() {
  console.log('🔧 Korrigiere general_schieber Struktur...');
  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));

  if (!data['general_schieber']) {
    console.error('❌ Artikel nicht gefunden!');
    return;
  }

  // Fix metadata structure
  data['general_schieber'].metadata.id = 'general_schieber_meta';
  data['general_schieber'].metadata.difficulty = 1; // Einsteiger = 1
  data['general_schieber'].metadata.source = 'jasswiki.ch Redaktion';

  // Ensure arrays exist
  if (!data['general_schieber'].metadata.synonyms) {
    data['general_schieber'].metadata.synonyms = ['Schieberjass', 'Partnerschieber'];
  }

  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Struktur korrigiert.');
  console.log('📝 Metadata.id:', data['general_schieber'].metadata.id);
  console.log('📝 Difficulty:', data['general_schieber'].metadata.difficulty, '(Zahl)');
}

main();

























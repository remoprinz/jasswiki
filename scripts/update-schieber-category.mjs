import fs from 'fs';

const JSON_FILE = 'src/data/jass-content-v2.json';

function main() {
  console.log('📖 Lade jass-content-v2.json...');
  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));

  if (!data['general_schieber']) {
    console.error('❌ Artikel general_schieber nicht gefunden!');
    return;
  }

  // Update category to make it a main category for the Sidebar
  console.log('🔄 Aktualisiere Kategorie für general_schieber...');
  data['general_schieber'].metadata.category.main = 'Schieber';
  data['general_schieber'].metadata.category.sub = 'Grundlagen';

  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ jass-content-v2.json erfolgreich aktualisiert.');
}

main();


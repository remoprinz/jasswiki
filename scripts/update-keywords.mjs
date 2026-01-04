import fs from 'fs';
import path from 'path';

const JSONL_PATH = path.join(process.cwd(), 'chatgpt-gpt/jasswiki-articles.jsonl');
const NDJSON_PATH = path.join(process.cwd(), 'chatgpt-gpt/jasswiki-articles.ndjson');

// Read
const content = fs.readFileSync(JSONL_PATH, 'utf-8');
const lines = content.trim().split('\n');

// Update
const newLines = lines.map(line => {
  const item = JSON.parse(line);
  if (item.id === 'references_main') {
    // Add keywords
    const newTags = [
      ...item.tags, 
      "Fabian Cadonau", "Trumpf As", "Remo Prinz", "Erich Studerus", "Jassstatistik"
    ];
    // Deduplicate
    item.tags = [...new Set(newTags)];
    console.log('✅ Keywords updated for references_main');
  }
  return item;
});

// Write back
const output = newLines.map(item => JSON.stringify(item)).join('\n');

fs.writeFileSync(JSONL_PATH, output);
fs.writeFileSync(NDJSON_PATH, output);

console.log(`✅ Updated JSONL/NDJSON.`);


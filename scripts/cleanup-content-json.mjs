import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'src/data/jass-content-v2.json');

// Read
const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
const initialCount = Object.keys(content).length;

// Filter keys where metadata.category.main is NOT "Referenzen"
const newContent = {};
let removedCount = 0;

for (const [key, item] of Object.entries(content)) {
  if (item.metadata?.category?.main === 'Referenzen') {
    removedCount++;
    console.log(`🗑️ Removing: ${key} (${item.metadata.category.sub}/${item.metadata.category.topic})`);
  } else {
    newContent[key] = item;
  }
}

// Write back
fs.writeFileSync(CONTENT_PATH, JSON.stringify(newContent, null, 2));

console.log(`\n✅ Cleanup complete.`);
console.log(`Original items: ${initialCount}`);
console.log(`Removed items: ${removedCount}`);
console.log(`Remaining items: ${Object.keys(newContent).length}`);


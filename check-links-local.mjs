import fs from 'fs';
import path from 'path';

// Pfade
const indexPath = path.join(process.cwd(), 'src/pages/taxonomie/index.tsx');
const outDir = path.join(process.cwd(), 'out');

// Lade index.tsx
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extrahiere Links (einfacher Regex)
const linkRegex = /link:\s*'([^']+)'/g;
const links = [];
let match;

while ((match = linkRegex.exec(indexContent)) !== null) {
  links.push(match[1]);
}

console.log(`Gefunden: ${links.length} Links in der Taxonomie.\n`);

let errors = 0;

for (const link of links) {
  const cleanLink = link.replace(/^\//, '').replace(/\/$/, '');
  const file1 = path.join(outDir, `${cleanLink}.html`);
  const file2 = path.join(outDir, cleanLink, 'index.html');
  
  if (fs.existsSync(file1) || fs.existsSync(file2)) {
    // console.log(`✅ OK: ${link}`);
  } else {
    console.log(`❌ BROKEN: ${link}`);
    errors++;
  }
}

console.log(`\nPrüfung abgeschlossen. ${errors} defekte Links gefunden.`);

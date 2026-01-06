import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nach dem Build: Sitemap und BingSiteAuth.xml ins out/ Verzeichnis kopieren
async function copyFiles() {
  const files = [
    { src: 'sitemap.xml', name: 'Sitemap' },
    { src: 'BingSiteAuth.xml', name: 'BingSiteAuth' }
  ];

  for (const file of files) {
    const filePublic = path.resolve(__dirname, `public/${file.src}`);
    const fileOut = path.resolve(__dirname, `out/${file.src}`);
    
    try {
      await fs.copyFile(filePublic, fileOut);
      console.log(`✅ ${file.name} ins out/ Verzeichnis kopiert.`);
    } catch (error) {
      if (file.src === 'BingSiteAuth.xml') {
        console.log(`⚠️  ${file.name} nicht gefunden (optional).`);
      } else {
        console.error(`❌ Fehler beim Kopieren der ${file.name}:`, error);
        process.exit(1);
      }
    }
  }
}

copyFiles();


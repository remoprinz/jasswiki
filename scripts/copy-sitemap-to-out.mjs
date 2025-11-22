import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nach dem Build: Sitemap ins out/ Verzeichnis kopieren
async function copySitemap() {
  const sitemapPublic = path.resolve(__dirname, '../public/sitemap.xml');
  const sitemapOut = path.resolve(__dirname, '../out/sitemap.xml');
  
  try {
    await fs.copyFile(sitemapPublic, sitemapOut);
    console.log('✅ Sitemap ins out/ Verzeichnis kopiert.');
  } catch (error) {
    console.error('❌ Fehler beim Kopieren der Sitemap:', error);
    process.exit(1);
  }
}

copySitemap();


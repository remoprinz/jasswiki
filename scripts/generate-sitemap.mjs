import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const JSON_FILE = path.resolve(__dirname, '../src/data/jass-content-v2.json');
const SITEMAP_PUBLIC = path.resolve(__dirname, '../public/sitemap.xml');
const SITEMAP_OUT = path.resolve(__dirname, '../out/sitemap.xml');
const BASE_URL = 'https://jasswiki.ch';

// Helper: Konvertiert Text zu URL-Slug
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateSitemap() {
  try {
    console.log('🚀 Starte Sitemap-Generierung...');

    // JSON-Datei einlesen
    const jsonContent = await fs.readFile(JSON_FILE, 'utf-8');
    const allContent = JSON.parse(jsonContent);
    const articles = Object.values(allContent);

    console.log(`✅ ${articles.length} Artikel aus JSON geladen.`);

    // Basis-URLs
    const urls = [
      {
        loc: `${BASE_URL}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        loc: `${BASE_URL}/quellen/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: `${BASE_URL}/quellenverzeichnis/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      }
    ];

    // Hauptkategorien sammeln
    const mainCategories = new Set();
    
    // Für jeden Artikel die URL generieren
    articles.forEach((article) => {
      const { category } = article.metadata;
      
      // Hauptkategorie
      const mainCatSlug = toSlug(category.main);
      mainCategories.add(mainCatSlug);
      
      // Subcategory
      const subCatSlug = toSlug(category.sub);
      
      // Topic
      const topicSlug = toSlug(category.topic);
      
      // Vollständige URL
      const url = `${BASE_URL}/${mainCatSlug}/${subCatSlug}/${topicSlug}/`;
      
      urls.push({
        loc: url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    });

    // Hauptkategorie-Übersichtsseiten hinzufügen
    mainCategories.forEach((mainCatSlug) => {
      urls.push({
        loc: `${BASE_URL}/${mainCatSlug}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.9'
      });
    });

    // Subcategory-Übersichtsseiten sammeln und hinzufügen
    const subCategoryPaths = new Set();
    articles.forEach((article) => {
      const { category } = article.metadata;
      const mainCatSlug = toSlug(category.main);
      const subCatSlug = toSlug(category.sub);
      subCategoryPaths.add(`${mainCatSlug}/${subCatSlug}`);
    });

    subCategoryPaths.forEach((path) => {
      urls.push({
        loc: `${BASE_URL}/${path}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.85'
      });
    });

    console.log(`✅ ${urls.length} URLs generiert.`);

    // XML generieren
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Sitemap in public/ schreiben (für Entwicklung)
    await fs.writeFile(SITEMAP_PUBLIC, xml, 'utf-8');
    console.log(`✅ Sitemap erfolgreich erstellt: ${SITEMAP_PUBLIC}`);
    
    // Falls out/ Verzeichnis existiert, auch dort schreiben (für Deployment)
    try {
      await fs.access(path.resolve(__dirname, '../out'));
      await fs.writeFile(SITEMAP_OUT, xml, 'utf-8');
      console.log(`✅ Sitemap auch ins out/ Verzeichnis kopiert: ${SITEMAP_OUT}`);
    } catch {
      // out/ existiert noch nicht (wird beim Build erstellt)
      console.log('ℹ️  out/ Verzeichnis existiert noch nicht (wird beim Build erstellt).');
    }
    console.log(`📊 Gesamt: ${urls.length} URLs`);
    console.log(`   - Basis-URLs: 3`);
    console.log(`   - Hauptkategorien: ${mainCategories.size}`);
    console.log(`   - Subkategorien: ${subCategoryPaths.size}`);
    console.log(`   - Artikel: ${articles.length}`);

  } catch (error) {
    console.error('❌ Fehler beim Generieren der Sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();


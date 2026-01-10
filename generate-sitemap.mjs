import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// Importiere zentrale URL-Utilities (Single Source of Truth)
import { toSlug, buildArticleUrl, isFlatStructure, validateUrl } from './url-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade (angepasst für Root-Verzeichnis)
const JSON_FILE = path.resolve(__dirname, 'src/data/jass-content-v2.json');
const SITEMAP_PUBLIC = path.resolve(__dirname, 'public/sitemap.xml');
const SITEMAP_OUT = path.resolve(__dirname, 'out/sitemap.xml');
const BASE_URL = 'https://jasswiki.ch';

async function generateSitemap() {
  try {
    console.log('🚀 Starte Sitemap-Generierung...');

    // JSON-Datei einlesen
    const jsonContent = await fs.readFile(JSON_FILE, 'utf-8');
    const allContent = JSON.parse(jsonContent);
    const articles = Object.values(allContent);
    
    // Hole Datei-Datum für lastmod (statt immer "heute")
    const stats = await fs.stat(JSON_FILE);
    const lastModDate = stats.mtime.toISOString().split('T')[0];

    console.log(`✅ ${articles.length} Artikel aus JSON geladen.`);
    console.log(`📅 Lastmod gesetzt auf: ${lastModDate} (basierend auf content-v2.json)`);

    // Basis-URLs
    const urls = [
      {
        loc: `${BASE_URL}/`,
        lastmod: lastModDate,
        changefreq: 'daily',
        priority: '1.0'
      },
      // Modulare llms.txt v2.0 (AI-optimiert)
      {
        loc: `${BASE_URL}/taxonomie/`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.95'
      },
      {
        loc: `${BASE_URL}/llms.txt`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.95'
      },
      {
        loc: `${BASE_URL}/llms-essentials.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/llms-regeln.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/llms-begriffe.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/llms-varianten.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/llms-taktiken.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/llms-kultur.md`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        loc: `${BASE_URL}/quellen/`,
        lastmod: lastModDate,
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        loc: `${BASE_URL}/quellenverzeichnis/`,
        lastmod: lastModDate,
        changefreq: 'monthly',
        priority: '0.7'
      }
    ];

    // Hauptkategorien sammeln
    const mainCategories = new Set();
    
    // Für jeden Artikel die URL generieren (mit zentraler Funktion)
    let validationErrors = [];
    
    articles.forEach((article) => {
      const { category } = article.metadata;
      
      // Hauptkategorie für Statistik
      const mainCatSlug = toSlug(category.main);
      mainCategories.add(mainCatSlug);
      
      // Verwende zentrale URL-Funktion (Single Source of Truth)
      const articlePath = buildArticleUrl(category);
      const url = `${BASE_URL}${articlePath}`;
      
      // Validiere die generierte URL
      const validation = validateUrl(articlePath);
      if (!validation.isValid) {
        validationErrors.push(`${article.id}: ${validation.error}`);
      }
      
      urls.push({
        loc: url,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.8'
      });
    });
    
    // Zeige Validierungsfehler
    if (validationErrors.length > 0) {
      console.log('');
      console.log('⚠️  URL-VALIDIERUNGSFEHLER GEFUNDEN:');
      validationErrors.forEach(err => console.log(`   - ${err}`));
      console.log('');
    }

    // Hauptkategorie-Übersichtsseiten hinzufügen
    mainCategories.forEach((mainCatSlug) => {
      urls.push({
        loc: `${BASE_URL}/${mainCatSlug}/`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.9'
      });
    });

    // Subcategory-Übersichtsseiten sammeln und hinzufügen
    const subCategoryPaths = new Set();
    const subcatArticleCount = {};
    
    // Sammle bereits hinzugefügte URLs (um Duplikate zu vermeiden)
    const addedUrls = new Set(urls.map(u => u.loc));
    
    articles.forEach((article) => {
      const { category } = article.metadata;
      const mainCatSlug = toSlug(category.main);
      const subCatSlug = toSlug(category.sub);
      const topicSlug = toSlug(category.topic);
      
      // Verwende zentrale Funktion für Prüfung
      if (isFlatStructure(mainCatSlug, subCatSlug, topicSlug)) {
        return; // Flache Artikel haben keine Subkategorie-Seiten
      }
      
      const key = `${mainCatSlug}/${subCatSlug}`;
      if (!subcatArticleCount[key]) {
        subcatArticleCount[key] = 0;
      }
      subcatArticleCount[key]++;
      subCategoryPaths.add(key);
    });

    subCategoryPaths.forEach((path) => {
      const url = `${BASE_URL}/${path}/`;
      if (!addedUrls.has(url)) {
        urls.push({
          loc: url,
          lastmod: lastModDate,
          changefreq: 'weekly',
          priority: '0.85'
        });
        addedUrls.add(url);
      }
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

    // Sitemap in public/ schreiben
    await fs.writeFile(SITEMAP_PUBLIC, xml, 'utf-8');
    console.log(`✅ Sitemap erfolgreich erstellt: ${SITEMAP_PUBLIC}`);
    
    // Falls out/ Verzeichnis existiert, auch dort schreiben
    try {
      await fs.access(path.resolve(__dirname, 'out'));
      await fs.writeFile(SITEMAP_OUT, xml, 'utf-8');
      console.log(`✅ Sitemap auch ins out/ Verzeichnis kopiert: ${SITEMAP_OUT}`);
    } catch {
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


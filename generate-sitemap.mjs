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
const DATUM_MUSTER = /^\d{4}-\d{2}-\d{2}$/;

async function generateSitemap() {
  try {
    console.log('🚀 Starte Sitemap-Generierung...');

    // JSON-Datei einlesen
    const jsonContent = await fs.readFile(JSON_FILE, 'utf-8');
    const allContent = JSON.parse(jsonContent);
    const articles = Object.values(allContent);
    
    console.log(`✅ ${articles.length} Artikel aus JSON geladen.`);

    // lastmod kommt je Artikel aus metadata.dateModified (gesetzt von
    // scripts/seed-article-dates.mjs aus der Git-Historie).
    const ohneDatum = articles
      .filter((a) => !DATUM_MUSTER.test(a?.metadata?.dateModified || ''))
      .map((a) => a.id || '(ohne id)');
    if (ohneDatum.length > 0) {
      console.error(`\n❌ DATUM_FEHLT: ${ohneDatum.length} Artikel ohne gültiges metadata.dateModified:`);
      ohneDatum.slice(0, 20).forEach((id) => console.error(`   ${id}`));
      console.error('\n   Abhilfe: node scripts/seed-article-dates.mjs\n');
      process.exit(1);
    }

    // Aggregation: jüngstes Änderungsdatum je Bereich
    const datumProMainCat = new Map();
    const datumProSubCat = new Map();
    let datumBestand = '';

    const merke = (map, key, datum) => {
      const bisher = map.get(key);
      if (!bisher || datum > bisher) map.set(key, datum);
    };

    articles.forEach((article) => {
      const { category } = article.metadata;
      const datum = article.metadata.dateModified;
      const mainCatSlug = toSlug(category.main);
      const subCatSlug = toSlug(category.sub);
      merke(datumProMainCat, mainCatSlug, datum);
      merke(datumProSubCat, `${mainCatSlug}/${subCatSlug}`, datum);
      if (datum > datumBestand) datumBestand = datum;
    });

    const lastModDate = datumBestand;
    console.log(`📅 Jüngstes Änderungsdatum im Bestand: ${lastModDate}`);

    // Basis-URLs
    const urls = [
      {
        loc: `${BASE_URL}/`,
        lastmod: lastModDate,
        changefreq: 'daily',
        priority: '1.0'
      },
      // Hinweis: /llms.txt + /llms-*.md sind bewusst NICHT in der Sitemap.
      // Sie sind für AI-Crawler (GPTBot, ClaudeBot etc.) via robots.txt und
      // dem `Link: <…llms.txt>; rel="ai-content-source"` Header zugänglich.
      // Google Search versucht sonst diese Dateien zu indexieren, scheitert
      // (keine HTML-Pages) und meldet sie als "Crawled – not indexed".
      {
        loc: `${BASE_URL}/jassen/`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.95'
      },
      {
        loc: `${BASE_URL}/taxonomie/`,
        lastmod: lastModDate,
        changefreq: 'weekly',
        priority: '0.95'
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
        lastmod: article.metadata.dateModified,
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
        lastmod: datumProMainCat.get(mainCatSlug) || lastModDate,
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
          lastmod: datumProSubCat.get(path) || lastModDate,
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


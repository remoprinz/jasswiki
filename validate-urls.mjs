/**
 * JassWiki URL-Validator
 * 
 * Prüft alle URLs auf Konsistenz und Korrektheit.
 * Findet doppelte Segmente, fehlende Seiten und Inkonsistenzen.
 * 
 * Aufruf: node validate-urls.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { toSlug, buildArticleUrl, validateUrl, isFlatStructure } from './url-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfade
const JSON_FILE = path.resolve(__dirname, 'src/data/jass-content-v2.json');
const SITEMAP_FILE = path.resolve(__dirname, 'public/sitemap.xml');
const CORPUS_FILE = path.resolve(__dirname, 'public/dataset/jasswiki-corpus.jsonl');

async function validateUrls() {
  console.log('🔍 JassWiki URL-Validator');
  console.log('='.repeat(50));
  console.log('');

  const errors = [];
  const warnings = [];
  const stats = {
    articlesTotal: 0,
    flatArticles: 0,
    threeLevel: 0,
    urlsValidated: 0,
    duplicateSegments: 0
  };

  try {
    // 1. JSON-Datei einlesen und URLs validieren
    console.log('📄 Prüfe jass-content-v2.json...');
    const jsonContent = await fs.readFile(JSON_FILE, 'utf-8');
    const allContent = JSON.parse(jsonContent);
    const articles = Object.values(allContent);
    stats.articlesTotal = articles.length;

    const generatedUrls = new Map();

    for (const article of articles) {
      const { category } = article.metadata;
      const mainSlug = toSlug(category.main);
      const subSlug = toSlug(category.sub);
      const topicSlug = toSlug(category.topic);
      
      // Prüfe URL-Struktur
      const url = buildArticleUrl(category);
      const validation = validateUrl(url);
      
      if (!validation.isValid) {
        errors.push({
          type: 'INVALID_URL',
          id: article.id,
          url: url,
          message: validation.error
        });
      }

      // Zähle Statistiken
      if (isFlatStructure(mainSlug, subSlug, topicSlug)) {
        stats.flatArticles++;
      } else {
        stats.threeLevel++;
      }
      stats.urlsValidated++;

      // Prüfe auf Duplikate
      if (generatedUrls.has(url)) {
        errors.push({
          type: 'DUPLICATE_URL',
          id: article.id,
          url: url,
          message: `URL wird auch von "${generatedUrls.get(url)}" verwendet`
        });
      } else {
        generatedUrls.set(url, article.id);
      }

      // Prüfe auf doppelte Segmente im Pfad
      const segments = url.replace(/^\//, '').replace(/\/$/, '').split('/');
      for (let i = 0; i < segments.length - 1; i++) {
        if (segments[i] === segments[i + 1]) {
          stats.duplicateSegments++;
          errors.push({
            type: 'DUPLICATE_SEGMENT',
            id: article.id,
            url: url,
            message: `Doppeltes Segment: "${segments[i]}"`
          });
        }
      }

      // Warnung wenn sub und topic unterschiedlich aber ähnlich sind
      if (subSlug !== topicSlug && 
          (subSlug.includes(topicSlug) || topicSlug.includes(subSlug))) {
        warnings.push({
          type: 'SIMILAR_SUB_TOPIC',
          id: article.id,
          sub: category.sub,
          topic: category.topic,
          message: 'Sub und Topic sind ähnlich aber nicht identisch'
        });
      }
    }

    console.log(`   ✅ ${stats.articlesTotal} Artikel geprüft`);
    console.log('');

    // 2. Prüfe Sitemap
    console.log('📄 Prüfe sitemap.xml...');
    try {
      const sitemapContent = await fs.readFile(SITEMAP_FILE, 'utf-8');
      const sitemapUrls = sitemapContent.match(/<loc>([^<]+)<\/loc>/g) || [];
      
      let sitemapErrors = 0;
      for (const locTag of sitemapUrls) {
        const url = locTag.replace('<loc>', '').replace('</loc>', '');
        const path = url.replace('https://jasswiki.ch', '');
        
        // Überspringe statische Seiten
        if (path === '/' || path.includes('.txt') || path.includes('.md')) {
          continue;
        }
        
        const validation = validateUrl(path);
        if (!validation.isValid && !path.endsWith('/taxonomie/')) {
          sitemapErrors++;
          errors.push({
            type: 'SITEMAP_INVALID_URL',
            url: url,
            message: validation.error
          });
        }
      }
      
      console.log(`   ✅ ${sitemapUrls.length} URLs in Sitemap geprüft`);
      if (sitemapErrors > 0) {
        console.log(`   ⚠️  ${sitemapErrors} ungültige URLs gefunden`);
      }
    } catch (e) {
      warnings.push({
        type: 'SITEMAP_NOT_FOUND',
        message: 'Sitemap nicht gefunden - bitte "npm run sitemap" ausführen'
      });
      console.log('   ⚠️  Sitemap nicht gefunden');
    }
    console.log('');

    // 3. Prüfe Corpus
    console.log('📄 Prüfe jasswiki-corpus.jsonl...');
    try {
      const corpusContent = await fs.readFile(CORPUS_FILE, 'utf-8');
      const corpusLines = corpusContent.split('\n').filter(line => line.trim());
      
      let corpusErrors = 0;
      for (const line of corpusLines) {
        const entry = JSON.parse(line);
        if (entry.canonical_url) {
          const path = entry.canonical_url.replace('https://jasswiki.ch', '');
          const validation = validateUrl(path);
          
          if (!validation.isValid) {
            corpusErrors++;
            errors.push({
              type: 'CORPUS_INVALID_URL',
              id: entry.id,
              url: entry.canonical_url,
              message: validation.error
            });
          }
          
          // Prüfe ob Corpus-URL mit generierter URL übereinstimmt
          const expectedUrl = generatedUrls.has(path) ? path : null;
          if (!generatedUrls.has(path)) {
            // Suche den passenden Artikel
            const article = articles.find(a => a.id === entry.id);
            if (article) {
              const correctUrl = buildArticleUrl(article.metadata.category);
              if (path !== correctUrl) {
                errors.push({
                  type: 'CORPUS_URL_MISMATCH',
                  id: entry.id,
                  corpusUrl: path,
                  expectedUrl: correctUrl,
                  message: `Corpus-URL stimmt nicht mit generierter URL überein`
                });
              }
            }
          }
        }
      }
      
      console.log(`   ✅ ${corpusLines.length} Einträge im Corpus geprüft`);
      if (corpusErrors > 0) {
        console.log(`   ⚠️  ${corpusErrors} ungültige URLs gefunden`);
      }
    } catch (e) {
      warnings.push({
        type: 'CORPUS_NOT_FOUND',
        message: 'Corpus nicht gefunden - bitte "npm run generate:corpus" ausführen'
      });
      console.log('   ⚠️  Corpus nicht gefunden');
    }
    console.log('');

    // Ergebnisse ausgeben
    console.log('='.repeat(50));
    console.log('📊 ERGEBNIS');
    console.log('='.repeat(50));
    console.log('');
    console.log('Statistiken:');
    console.log(`   - Artikel gesamt: ${stats.articlesTotal}`);
    console.log(`   - Flache URLs (2 Ebenen): ${stats.flatArticles}`);
    console.log(`   - Tiefe URLs (3 Ebenen): ${stats.threeLevel}`);
    console.log(`   - URLs validiert: ${stats.urlsValidated}`);
    console.log('');

    if (errors.length === 0 && warnings.length === 0) {
      console.log('✅ KEINE FEHLER GEFUNDEN!');
      console.log('');
      console.log('Alle URLs sind korrekt und konsistent.');
    } else {
      if (errors.length > 0) {
        console.log(`❌ ${errors.length} FEHLER GEFUNDEN:`);
        console.log('');
        
        // Gruppiere Fehler nach Typ
        const groupedErrors = {};
        errors.forEach(err => {
          if (!groupedErrors[err.type]) {
            groupedErrors[err.type] = [];
          }
          groupedErrors[err.type].push(err);
        });
        
        for (const [type, typeErrors] of Object.entries(groupedErrors)) {
          console.log(`   ${type} (${typeErrors.length}):`);
          typeErrors.slice(0, 5).forEach(err => {
            console.log(`     - ${err.id || err.url}: ${err.message}`);
          });
          if (typeErrors.length > 5) {
            console.log(`     ... und ${typeErrors.length - 5} weitere`);
          }
          console.log('');
        }
      }
      
      if (warnings.length > 0) {
        console.log(`⚠️  ${warnings.length} WARNUNGEN:`);
        warnings.forEach(warn => {
          console.log(`   - ${warn.type}: ${warn.message}`);
        });
        console.log('');
      }
    }

    // Exit-Code
    if (errors.length > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Fehler beim Validieren:', error);
    process.exit(1);
  }
}

validateUrls();

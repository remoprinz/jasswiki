/**
 * Erstellt ein JSON-Mapping: ID → Canonical URL aus sitemap.xml
 * 
 * Mapping-Strategie:
 * 1. Parse Sitemap → extrahiere alle URLs mit letztem Pfad-Teil als Key
 * 2. Parse JSONL → mappe article_id zu URLs über Titel-Matching oder bekannte Mappings
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sitemapPath = join(__dirname, '../public/sitemap.xml');
const outputPath = join(__dirname, '../lib/url-mapping.json');
const articlesPath = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');

const sitemapContent = readFileSync(sitemapPath, 'utf-8');

// Schritt 1: Parse Sitemap → URL-Mapping
const urlMatches = Array.from(sitemapContent.matchAll(/<loc>(https:\/\/jasswiki\.ch\/[^<]+)<\/loc>/g));

const urlMapping: Record<string, string> = {};
const urlByTitle: Map<string, string> = new Map();

for (const match of urlMatches) {
  const fullUrl = match[1];
  const path = fullUrl.replace('https://jasswiki.ch/', '').replace(/\/$/, '');
  
  // Extrahiere die ID (letzter Teil des Pfads)
  const parts = path.split('/');
  const id = parts[parts.length - 1];
  
  if (!id) continue;
  
  // Speichere: ID → Vollständige URL
  urlMapping[id] = fullUrl;
  
  // Auch für "expressions_rose" → "rose" Mapping
  if (id && !id.includes('expressions_') && !id.includes('_')) {
    urlMapping[`expressions_${id}`] = fullUrl;
  }
  
  // Speichere auch für Titel-Matching (slugified)
  const slugTitle = id.split('-').join(' '); // z.B. "vielfalt-der-spielvarianten" → "vielfalt der spielvarianten"
  urlByTitle.set(slugTitle.toLowerCase(), fullUrl);
}

// Schritt 2: Parse Artikel und mappe IDs zu URLs
const articlesContent = readFileSync(articlesPath, 'utf-8');
const articles = articlesContent.split('\n').filter(Boolean).map(line => JSON.parse(line));

// Bekannte Mappings (nur wenn automatisches Matching fehlschlägt)
// Meist reicht die automatische ID→URL Conversion (z.B. schieber_taktiken_partner → partnertaktiken)
const knownMappings: Record<string, string> = {
  // Kategorie-Übersichten (spezielle Fälle)
  'general_variants': 'https://jasswiki.ch/grundlagen-kultur/spielvarianten/',
  
  // Komplexe Compound-Namen (ID ohne Bindestriche, URL mit Bindestrichen)
  'expressions_farbenhalten': 'https://jasswiki.ch/begriffe/spielaktionen/farben-leih-halten/',
  'expressions_farbenleihalten': 'https://jasswiki.ch/begriffe/spielaktionen/farben-leih-halten/',
  
  // KONFLIKTLÖSUNG: Begriffe, die sowohl in Regeln als auch Begriffen existieren
  // → Bevorzuge Regel-Artikel in see_also Kontexten (häufiger relevant)
  'bodentrumpf': 'https://jasswiki.ch/regeln/spielablauf/bodentrumpf/',
  'trumpf_bauer': 'https://jasswiki.ch/regeln/spielablauf/trumpfansage/',  // Falls existiert
  'general_geography_regions': 'https://jasswiki.ch/regeln/kartenverteilung/jass-regionen/',
  'variants_two_player_schaggi_haas': 'https://jasswiki.ch/varianten/bessern-spiel/schaggi-haas/',
  'general_card_basics': 'https://jasswiki.ch/regeln/kartenverteilung/jasskarten-36-karten/',
  'general_card_values': 'https://jasswiki.ch/regeln/kartenwerte/grundregeln/',
  'general_dealing': 'https://jasswiki.ch/regeln/kartenverteilung/spiel-geben/',
  'general_dealing_methods': 'https://jasswiki.ch/regeln/kartenverteilung/sonderregeln-beim-verteilen/',
  'general_playing_errors': 'https://jasswiki.ch/regeln/fehler-verstoesse/spielfehler-uebersicht/',
  'karte_zu_frueh': 'https://jasswiki.ch/regeln/fehler-verstoesse/karte-fruehzeitig-in-die-hand-nehmen/',
  'kartenspiel_nicht_komplett': 'https://jasswiki.ch/regeln/fehler-verstoesse/karten-nicht-komplett/',
  'platztausch': 'https://jasswiki.ch/regeln/sonderregeln/plaetze-tauschen/',
  'schieber_taktiken_basics': 'https://jasswiki.ch/taktiken-und-strategien/taktische-grundlagen/grundlegende-taktiken/',
  'schieber_taktiken_hoch_tief': 'https://jasswiki.ch/taktiken-und-strategien/kommunikation-signale/hoch-tief-tief-hoch-tief/',
  'schieber_taktiken_special': 'https://jasswiki.ch/taktiken-und-strategien/fortgeschrittene-strategien/spezielle-taktiken/',
  'variants_family_gluecksjass': 'https://jasswiki.ch/varianten/einfacher-jass/einfacher-jass-taktiken/',
  'variants_family_hose_abe': 'https://jasswiki.ch/varianten/gesellschaftsspiel/hose-abe-schnauz-schwimmen/',
  'variants_specialty_zuger_drei': 'https://jasswiki.ch/varianten/schreibspiel/zuger-3-spieler/',
  'variants_strategic_bolschewik': 'https://jasswiki.ch/varianten/doppelkart-schieber/bolschewik-4-spieler/',
  'variants_strategic_differenzler_drei': 'https://jasswiki.ch/varianten/schaetzspiel/differenzler-taktiken/',
  'variants_strategic_schafhauser': 'https://jasswiki.ch/varianten/koenigsspiel/schafhauser-3-spieler/',
  'variants_two_player_schnueffler': 'https://jasswiki.ch/varianten/stock-spiel/schnueffler-2-spieler/',
  'general_culture': 'https://jasswiki.ch/grundlagen-kultur/',
  'general_european_context': 'https://jasswiki.ch/grundlagen-kultur/europaeischer-kontext/jassen-im-europaeischen-vergleich/',
  'general_introduction': 'https://jasswiki.ch/grundlagen-kultur/ueberblick/jassen-lernen-und-verstehen/',
  'general_materials': 'https://jasswiki.ch/grundlagen-kultur/spielmaterial/das-kartenset/',
  'history_etymology': 'https://jasswiki.ch/geschichte/wortherkunft/woher-kommt-das-wort-jass/',
  'history_first_mention': 'https://jasswiki.ch/geschichte/urspruenge/die-erste-urkundliche-erwaehnung/',
  'history_industrialization': 'https://jasswiki.ch/geschichte/industrialisierung/vom-luxusgut-zur-massenware/',
  'history_linguistics': 'https://jasswiki.ch/geschichte/sprachentwicklung/die-sprache-rund-um-den-jasstisch/',
  'history_medieval': 'https://jasswiki.ch/geschichte/mittelalter/fruehe-spielkarten-in-europa/',
  'history_origin': 'https://jasswiki.ch/geschichte/herkunft/woher-kommen-spielkarten/',
  'history_social_significance': 'https://jasswiki.ch/geschichte/kulturelle-bedeutung/verbreitung-und-gesellschaftliche-bedeutung/',
  'history_swiss_production': 'https://jasswiki.ch/geschichte/schweizer-kartenherstellung/schweizer-kartenmacher/',
  'history_unesco': 'https://jasswiki.ch/geschichte/kulturelle-bedeutung/die-liste-der-lebendigen-traditionen/',
  'expressions_misere': 'https://jasswiki.ch/begriffe/spezialvarianten/mis-re/',
  'references_books': 'https://jasswiki.ch/referenzen/quellen/buecher-zum-schweizer-jass/',

  // Weitere manuelle Mappings nur wenn automatische Conversion fehlschlägt
  // (z.B. wenn ID-Struktur zu komplex ist)
};

for (const article of articles) {
  const articleId = article.id;
  const title = article.title || '';
  
  // 1. Bekanntes Mapping
  if (knownMappings[articleId]) {
    urlMapping[articleId] = knownMappings[articleId];
    continue;
  }
  
  // 2. Versuche über URL-Key (nach Präfix-Entfernung)
  const urlKey = articleId
    .replace(/^general_/, '')
    .replace(/^expressions_/, '')
    .replace(/_/g, '-'); // underscores → hyphens
  
  if (urlMapping[urlKey]) {
    urlMapping[articleId] = urlMapping[urlKey];
    continue;
  }
  
  // 3. Versuche über Titel-Matching (slugified)
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Suche nach ähnlichem Titel in URLs
  for (const [key, url] of urlByTitle.entries()) {
    if (key.includes(titleSlug) || titleSlug.includes(key)) {
      urlMapping[articleId] = url;
      break;
    }
  }
  
  // 4. Versuche ID → URL-Slug Conversion (z.B. "schieber_taktiken_partner" → "partnertaktiken")
  // Entferne Präfixe und Varianten-Präfix
  const idSlug = articleId
    .replace(/^schieber_taktiken_/, '')
    .replace(/^general_/, '')
    .replace(/^expressions_/, '')
    .replace(/_/g, '-');
  
  if (urlMapping[idSlug]) {
    urlMapping[articleId] = urlMapping[idSlug];
  }
  
  // 5. Versuche fuzzy matching für komplexe Namen (z.B. "farbenhalten" → "farben-leih-halten")
  // Suche in allen URLs nach ähnlichen Slugs
  if (!urlMapping[articleId]) {
    const normalizedArticleId = articleId
      .replace(/^expressions_/, '')
      .replace(/^general_/, '')
      .toLowerCase();
    
    for (const [key, url] of Object.entries(urlMapping)) {
      const normalizedKey = key.toLowerCase().replace(/-/g, '');
      const normalizedArticleIdNoSep = normalizedArticleId.replace(/[-_]/g, '');
      
      // Exaktes Match ohne Separatoren
      if (normalizedKey === normalizedArticleIdNoSep) {
        urlMapping[articleId] = url;
        break;
      }
      
      // Enthält-Check (z.B. "farbenhalten" in "farben-leih-halten")
      if (normalizedKey.includes(normalizedArticleIdNoSep) || normalizedArticleIdNoSep.includes(normalizedKey)) {
        urlMapping[articleId] = url;
        break;
      }
    }
  }
}

// Schritt 3: Spezielle Regel: Für FAQs mit article_id → nutze die URL des Artikels
const faqsPath = join(__dirname, '../chatgpt-gpt/jasswiki-faqs.jsonl');
try {
  const faqsContent = readFileSync(faqsPath, 'utf-8');
  const faqs = faqsContent.split('\n').filter(Boolean).map(line => JSON.parse(line));
  
  for (const faq of faqs) {
    const faqId = faq.id;
    const articleId = faq.article_id;
    
    // FAQ verwendet die URL des zugehörigen Artikels
    if (articleId && urlMapping[articleId]) {
      urlMapping[faqId] = urlMapping[articleId];
    }
  }
} catch (e) {
  console.warn('⚠️  FAQs nicht gefunden, überspringe FAQ-Mapping');
}

writeFileSync(outputPath, JSON.stringify(urlMapping, null, 2), 'utf-8');

console.log(`✅ Created URL mapping: ${Object.keys(urlMapping).length} entries`);
console.log(`   Examples:`);
console.log(`   - rose: ${urlMapping['rose']}`);
console.log(`   - expressions_rose: ${urlMapping['expressions_rose']}`);
console.log(`   - general_variants: ${urlMapping['general_variants']}`);
console.log(`   - abheben: ${urlMapping['abheben']}`);

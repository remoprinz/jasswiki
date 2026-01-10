#!/usr/bin/env node
/**
 * Generate Taxonomy JSON-LD
 * ==========================
 * 
 * Generiert /public/taxonomie.jsonld aus der Single Source of Truth.
 * 
 * Usage:
 *   node scripts/generate-taxonomy-jsonld.mjs
 * 
 * Wird automatisch bei `npm run build` ausgeführt.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Da wir TypeScript nicht direkt importieren können, lesen wir die Daten
// und extrahieren sie mit einem einfachen Parser
// ODER: Wir nutzen tsx/ts-node, aber für Simplizität hier inline

const SITE_URL = 'https://jasswiki.ch';

// ============================================================================
// TAXONOMY DATA (Mirror of jass-taxonomy.ts)
// In einer idealen Welt würde man tsx nutzen, aber für Robustheit inline
// ============================================================================

const WIKIDATA = {
  JASS: 'Q786768',
  JASS_CONTRACT: 'Q137732108',
  GAME_MECHANIC: 'Q1751513',
  WEIS_CLASS: 'Q137738455',
};

const TAXONOMY_METADATA = {
  name: 'Jass-Taxonomie',
  version: '4.0',
  lastUpdated: '2026-01-10',
  description: 'Systematische Ordnung der Schweizer Jass-Begriffe – verknüpft mit Wikidata und dem Semantic Web',
  license: 'https://creativecommons.org/licenses/by-sa/4.0/',
};

// Alle Terme mit Wikidata-IDs (extrahiert aus jass-taxonomy.ts)
const TAXONOMY_TERMS = [
  // Spielarten - Partnerspiele
  { name: 'Schieber', wikidataId: 'Q137727247', link: '/schieber/', subclassOf: 'Q786768', description: 'Die Standardvariante – Vorhand oder Schieben' },
  { name: 'Coiffeur', wikidataId: 'Q137731700', link: '/varianten/coiffeur/', subclassOf: 'Q786768', description: 'Alle Modi Pflicht – Matrix mit Multiplikatoren' },
  { name: 'Sidi Barrani', wikidataId: 'Q137738898', link: '/varianten/sidi-barrani/', subclassOf: 'Q786768', description: 'Bieten mit Punktzahl – "Double Jeopardy" Scoring' },
  { name: 'Bolschewik', wikidataId: 'Q137738843', link: '/varianten/bolschewik-4-spieler/', subclassOf: 'Q786768', description: 'Mit doppeltem Kartendeck (72 Karten!)' },
  { name: 'Kreuzjass', wikidataId: 'Q137738899', subclassOf: 'Q786768', description: 'Partner diagonal' },
  
  // Spielarten - Königsspiele
  { name: 'Pandur', wikidataId: 'Q137738834', link: '/varianten/pandur/', subclassOf: 'Q786768', description: '24-Blatt! Härteste Variante' },
  { name: 'Bieter', wikidataId: 'Q137738835', link: '/varianten/bieter/', subclassOf: 'Q786768', description: '36-Blatt, flexibler als Pandur' },
  { name: 'Aucho', wikidataId: 'Q137739254', link: '/varianten/aucho/', subclassOf: 'Q786768', description: '"Erben"-Prinzip' },
  { name: 'Schafhauser', wikidataId: 'Q137738841', link: '/varianten/schafhauser-3-spieler/', subclassOf: 'Q786768', description: 'Solospieler durch Karten bestimmt' },
  
  // Spielarten - Einzelspiele
  { name: 'Differenzler', wikidataId: 'Q137731684', link: '/varianten/differenzler-verdeckt/', subclassOf: 'Q786768', description: 'Differenz zum Ziel zählt negativ' },
  { name: 'Mittlere', wikidataId: 'Q137738839', link: '/varianten/mittlere/', subclassOf: 'Q786768', description: 'Mittlere Punktzahl gewinnt' },
  { name: 'Handjass', wikidataId: 'Q137738900', link: '/varianten/handjass/', subclassOf: 'Q786768', description: 'Karten vom Stapel ziehen' },
  
  // Spielarten - Destruktionsspiele
  { name: 'Molotow', wikidataId: 'Q137738837', link: '/varianten/molotow/', subclassOf: 'Q786768', description: 'Erster Farbverrat bestimmt Trumpf' },
  { name: 'Hindersi', wikidataId: 'Q137738838', link: '/varianten/hindersi-allgemein/', subclassOf: 'Q786768', description: 'Einfache Punkteminimierung' },
  
  // Spielarten - Sondervarianten
  { name: 'Chratze', wikidataId: 'Q137738836', link: '/varianten/chratze/', subclassOf: 'Q786768', description: 'Pot-Mechanik, nur 4 Karten' },
  { name: 'Guggitaler', wikidataId: 'Q137738902', link: '/varianten/guggitaler/', subclassOf: 'Q786768', description: 'Mit Geldeinsatz' },
  { name: 'Tschau Sepp', wikidataId: 'Q137738840', link: '/varianten/tschau-sepp/', subclassOf: 'Q786768', description: 'Ablegespiel (Mau-Mau)' },
  { name: 'Zwick-Jass', wikidataId: 'Q137738903', link: '/varianten/zwick/', subclassOf: 'Q786768', description: 'Mit "Schlecken"' },
  { name: 'Zuger', wikidataId: 'Q137738842', link: '/varianten/zuger/', subclassOf: 'Q786768', description: 'Geber pausiert' },
  
  // Spielmodi
  { name: 'Obenabe', wikidataId: 'Q137737920', link: '/begriffe/spezialvarianten/obenabe/', instanceOf: 'Q137732108', description: 'Höchste Karte sticht' },
  { name: 'Undenufe', wikidataId: 'Q137738279', link: '/begriffe/spezialvarianten/undenufe/', instanceOf: 'Q137732108', description: 'Tiefste Karte sticht' },
  { name: 'Slalom', wikidataId: 'Q137738723', link: '/begriffe/spezialvarianten/slalom-zickzack/', instanceOf: 'Q137732108', description: 'Alternierend pro Stich' },
  { name: 'Guschti / Quer', wikidataId: 'Q137739255', link: '/begriffe/spezialvarianten/guschti-zwischendurch-quer/', instanceOf: 'Q137732108', description: 'Spezielle Stichfolge' },
  { name: 'Trio (3×3)', wikidataId: 'Q137739256', link: '/begriffe/spezialvarianten/trio-3-3/', instanceOf: 'Q137732108', description: '3 Stiche pro Modus' },
  { name: 'Misère', wikidataId: 'Q137739257', link: '/begriffe/spezialvarianten/misere/', instanceOf: 'Q137732108', description: 'Minimalpunkte-Modus' },
  
  // Karten - Rollen
  { name: 'Puur', wikidataId: 'Q137738724', link: '/begriffe/kartenbezeichnungen/trumpf-puur/', instanceOf: 'Q1751513', description: 'Under wird zum höchsten Trumpf – 20 Punkte' },
  { name: 'Nell', wikidataId: 'Q137738725', link: '/begriffe/kartenbezeichnungen/nell/', instanceOf: 'Q1751513', description: '9 wird zum zweithöchsten Trumpf – 14 Punkte' },
  
  // Karten - Bildkarten
  { name: 'König', wikidataId: 'Q516114', description: '4 Punkte' },
  { name: 'Ober', wikidataId: 'Q572267', description: '3 Punkte – Schweizer Blatt' },
  { name: 'Dame', wikidataId: 'Q505744', description: '3 Punkte – Französisches Blatt' },
  { name: 'Under', wikidataId: 'Q510474', description: '2 Punkte' },
  { name: 'Ass', wikidataId: 'Q378907', description: '11 Punkte' },
  
  // Karten - Schweizer Farben
  { name: 'Schellen', wikidataId: 'Q2233012', link: '/begriffe/kartenbezeichnungen/schelle/', description: 'Schweizer Blatt' },
  { name: 'Schilten', wikidataId: 'Q16623777', link: '/begriffe/kartenbezeichnungen/schilte/', description: 'Schweizer Blatt' },
  { name: 'Rosen', wikidataId: 'Q16623784', link: '/begriffe/kartenbezeichnungen/rose/', description: 'Schweizer Blatt' },
  { name: 'Eichel', wikidataId: 'Q1301333', link: '/begriffe/kartenbezeichnungen/eichel/', description: 'Schweizer Blatt' },
  
  // Karten - Französische Farben
  { name: 'Herz', wikidataId: 'Q3419242', link: '/begriffe/kartenbezeichnungen/herz/', description: 'Französisches Blatt' },
  { name: 'Ecke', wikidataId: 'Q513847', link: '/begriffe/kartenbezeichnungen/ecken/', description: 'Französisches Blatt' },
  { name: 'Kreuz', wikidataId: 'Q1788166', link: '/begriffe/kartenbezeichnungen/kreuz/', description: 'Französisches Blatt' },
  { name: 'Schaufel', wikidataId: 'Q2094951', link: '/begriffe/kartenbezeichnungen/schaufel/', description: 'Französisches Blatt' },
  
  // Punktesystem - Weis
  { name: 'Weis', wikidataId: 'Q137738455', link: '/begriffe/punktebegriffe/weis/', subclassOf: 'Q1751513', description: 'Punktebonus für Kartenfolgen' },
  { name: 'Dreiblatt', wikidataId: 'Q137738727', link: '/weis-regeln/weis-arten/dreiblatt-3-blatt/', instanceOf: 'Q137738455', description: '3 aufeinanderfolgende Karten – 20 Punkte' },
  { name: 'Vierblatt', wikidataId: 'Q137738728', link: '/weis-regeln/weis-arten/vierblatt-4-blatt/', instanceOf: 'Q137738455', description: '4 aufeinanderfolgende Karten – 50 Punkte' },
  { name: 'Fünfblatt', wikidataId: 'Q137739569', link: '/weis-regeln/weis-arten/fuenfblatt-5-blatt/', instanceOf: 'Q137738455', description: '5 aufeinanderfolgende Karten – 100 Punkte' },
  { name: 'Sechsblatt', wikidataId: 'Q137739570', link: '/weis-regeln/weis-arten/sechsblatt-6-blatt/', instanceOf: 'Q137738455', description: '6 aufeinanderfolgende Karten – 150 Punkte' },
  { name: 'Siebenblatt', wikidataId: 'Q137739571', link: '/weis-regeln/weis-arten/achtblatt-8-blatt/', instanceOf: 'Q137738455', description: '7+ aufeinanderfolgende Karten – 200 Punkte' },
  { name: 'Vier Gleiche', wikidataId: 'Q137738729', link: '/weis-regeln/weis-arten/vier-gleiche-karten/', instanceOf: 'Q137738455', description: '4 Karten gleichen Rangs' },
  { name: 'Stöck', wikidataId: 'Q137738329', link: '/begriffe/kartenbezeichnungen/stoecke/', instanceOf: 'Q137738455', description: 'König + Ober in Trumpffarbe – 20 Punkte' },
  { name: 'Kreuzweis', wikidataId: 'Q137738904', link: '/weis-regeln/weis-arten/kreuzweis/', instanceOf: 'Q137738455', description: 'Eine Karte zählt für zwei Weise' },
  
  // Punktesystem - Sonder
  { name: 'Matsch', wikidataId: 'Q137738726', link: '/begriffe/punktebegriffe/matsch/', instanceOf: 'Q1751513', description: 'Alle 9 Stiche gewonnen – +100 Bonus' },
  { name: 'Kontermatsch', wikidataId: 'Q137739566', link: '/begriffe/punktebegriffe/kontermatsch/', instanceOf: 'Q1751513', description: 'Gegner matschiert zurück' },
  { name: 'Bergpreis', wikidataId: 'Q137739565', link: '/regeln/bergpreis/', instanceOf: 'Q1751513', description: 'Bonuspunkte für Hälfte des Ziels' },
  
  // Spielablauf
  { name: 'Mischen', wikidataId: 'Q1930567', link: '/regeln/kartenverteilung/mischen/', instanceOf: 'Q1751513', description: 'Karten durchmischen' },
  { name: 'Abheben', wikidataId: 'Q320553', link: '/regeln/kartenverteilung/abheben-der-karten/', instanceOf: 'Q1751513', description: 'Gegner hebt ab' },
  { name: 'Geben', wikidataId: 'Q61054367', instanceOf: 'Q1751513', description: 'Karten verteilen' },
  
  // Regeln
  { name: 'Untertrumpf-Verbot', wikidataId: 'Q137739568', instanceOf: 'Q1751513', description: 'KEIN niedrigerer Trumpf, wenn höherer liegt' },
  { name: 'Stöck-Weis-Stich', wikidataId: 'Q137739567', instanceOf: 'Q1751513', description: 'Zählreihenfolge beim Ausmachen' },
];

// ============================================================================
// JSON-LD GENERATION
// ============================================================================

function generateJsonLd() {
  const jsonLd = {
    '@context': {
      '@vocab': 'https://schema.org/',
      'skos': 'http://www.w3.org/2004/02/skos/core#',
      'wd': 'https://www.wikidata.org/entity/',
      'termCode': 'https://schema.org/termCode',
      'broader': { '@id': 'skos:broader', '@type': '@id' },
      'narrower': { '@id': 'skos:narrower', '@type': '@id' },
      'related': { '@id': 'skos:related', '@type': '@id' },
    },
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/taxonomie/`,
    'name': TAXONOMY_METADATA.name,
    'description': TAXONOMY_METADATA.description,
    'version': TAXONOMY_METADATA.version,
    'dateModified': TAXONOMY_METADATA.lastUpdated,
    'license': TAXONOMY_METADATA.license,
    'inLanguage': 'de-CH',
    'publisher': {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': 'JassWiki.ch',
      'url': SITE_URL,
    },
    'sameAs': [
      'https://www.wikidata.org/wiki/Q786768',
      'https://de.wikipedia.org/wiki/Jass',
    ],
    'mainEntity': {
      '@type': 'Thing',
      '@id': 'https://www.wikidata.org/wiki/Q786768',
      'name': 'Jass',
      'description': 'Traditionelles Schweizer Kartenspiel',
    },
    'hasDefinedTerm': TAXONOMY_TERMS.map(term => {
      const termObj = {
        '@type': 'DefinedTerm',
        '@id': term.link ? `${SITE_URL}${term.link}` : `${SITE_URL}/taxonomie/#${term.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        'name': term.name,
        'description': term.description,
        'termCode': term.wikidataId,
        'sameAs': `wd:${term.wikidataId}`,
        'inDefinedTermSet': `${SITE_URL}/taxonomie/`,
      };
      
      // Wikidata-Beziehungen hinzufügen
      if (term.subclassOf) {
        termObj['broader'] = `wd:${term.subclassOf}`;
      }
      if (term.instanceOf) {
        termObj['isPartOf'] = `wd:${term.instanceOf}`;
      }
      if (term.link) {
        termObj['url'] = `${SITE_URL}${term.link}`;
      }
      
      return termObj;
    }),
  };
  
  return jsonLd;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log('🔧 Generating taxonomy.jsonld...');
  
  const jsonLd = generateJsonLd();
  const jsonString = JSON.stringify(jsonLd, null, 2);
  
  // Output path
  const outputPath = path.join(__dirname, 'public', 'taxonomie.jsonld');
  
  // Write file
  fs.writeFileSync(outputPath, jsonString, 'utf-8');
  
  console.log(`✅ Generated: ${outputPath}`);
  console.log(`   - ${TAXONOMY_TERMS.length} terms with Wikidata IDs`);
  console.log(`   - Schema.org DefinedTermSet format`);
  console.log(`   - SKOS broader/narrower relations included`);
}

main();

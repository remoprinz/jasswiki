/**
 * Finale Validierung vor dem Deploy: Redirects und Artikel-Daten.
 */
import { execFileSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO = path.resolve(__dirname, '..');
const CONTENT_REL = 'src/data/jass-content-v2.json';
const DATUM_MUSTER = /^\d{4}-\d{2}-\d{2}$/;

function fingerabdruck(artikel) {
  const nutzlast = JSON.stringify([artikel?.text ?? '', artikel?.faqs ?? null]);
  return crypto.createHash('sha1').update(nutzlast).digest('hex');
}

/**
 * Wächter: Wo sich `text` oder `faqs` gegenüber HEAD geändert haben, muss auch
 * `metadata.dateModified` einen neuen Wert tragen. Sonst behaupten Sitemap und
 * JSON-LD ein Datum, das der Inhalt längst überholt hat.
 *
 * Gibt die Liste der Befunde zurück (leer = sauber).
 */
async function pruefeArtikelDaten() {
  const befunde = [];
  const bestand = JSON.parse(await fs.readFile(path.join(REPO, CONTENT_REL), 'utf-8'));

  // Jeder Artikel braucht beide Datumsfelder im Format YYYY-MM-DD
  for (const [id, artikel] of Object.entries(bestand)) {
    const m = artikel?.metadata || {};
    if (!DATUM_MUSTER.test(m.dateModified || '') || !DATUM_MUSTER.test(m.datePublished || '')) {
      befunde.push(`DATUM_FEHLT: ${id} (datePublished="${m.datePublished ?? ''}", dateModified="${m.dateModified ?? ''}")`);
    }
  }

  // Vergleich gegen HEAD
  let kopfstand;
  try {
    const roh = execFileSync('git', ['-C', REPO, 'show', `HEAD:${CONTENT_REL}`], {
      encoding: 'utf-8',
      maxBuffer: 256 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    kopfstand = JSON.parse(roh);
  } catch {
    console.log('ℹ️  HEAD-Fassung der Inhaltsdatei unlesbar — der Vergleich entfällt.');
    return befunde;
  }

  for (const [id, artikel] of Object.entries(bestand)) {
    const alt = kopfstand[id];
    if (!alt) continue; // neuer Artikel: DATUM_FEHLT deckt ihn ab
    const inhaltGleich = fingerabdruck(artikel) === fingerabdruck(alt);
    const datumGleich = (artikel?.metadata?.dateModified || '') === (alt?.metadata?.dateModified || '');
    if (!inhaltGleich && datumGleich) {
      befunde.push(`DATUM_VERALTET: ${id} — Text oder FAQ geändert, dateModified steht weiter auf ${artikel?.metadata?.dateModified}`);
    }
  }

  return befunde;
}

async function validate() {
  console.log('🔍 FINALE VALIDIERUNG VOR DEPLOY\n');
  console.log('═'.repeat(60));

  // 1. Lade Sitemap für URL-Existenz-Checks
  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  const sitemapContent = await fs.readFile(sitemapPath, 'utf-8');
  
  const sitemapUrls = new Set();
  const urlMatches = sitemapContent.matchAll(/<loc>https:\/\/jasswiki\.ch([^<]+)<\/loc>/g);
  for (const match of urlMatches) {
    const url = match[1];
    sitemapUrls.add(url);
    // Auch normalisierte Versionen
    if (url.endsWith('/')) {
      sitemapUrls.add(url.slice(0, -1));
    } else {
      sitemapUrls.add(url + '/');
    }
  }
  
  console.log(`\n📄 Sitemap: ${sitemapUrls.size / 2} URLs\n`);

  // 2. Lade url-redirects.json
  const redirectsPath = path.resolve(__dirname, '../src/data/url-redirects.json');
  const redirectsRaw = await fs.readFile(redirectsPath, 'utf-8');
  const redirectsData = JSON.parse(redirectsRaw);
  const redirects = redirectsData.redirects || {};

  console.log(`📝 url-redirects.json: ${Object.keys(redirects).length} Redirects\n`);

  // 3. Validiere jeden Redirect
  const problems = [];
  const categoryPages = new Set([
    '/varianten/', '/geschichte/', '/regeln/', '/begriffe/', 
    '/grundlagen-kultur/', '/taktiken-und-strategien/', '/weis-regeln/', 
    '/jassapps/', '/quellen/', '/'
  ]);

  for (const [source, destination] of Object.entries(redirects)) {
    // Check 1: Source und Destination dürfen nicht identisch sein
    const sourceNorm = source.endsWith('/') ? source : source + '/';
    const destNorm = destination.endsWith('/') ? destination : destination + '/';
    
    if (sourceNorm === destNorm) {
      problems.push({
        source,
        destination,
        issue: '❌ Source = Destination (Endlosschleife!)'
      });
      continue;
    }

    // Check 2: Destination muss existieren
    const destExists = sitemapUrls.has(destination) || 
                       sitemapUrls.has(destNorm) || 
                       categoryPages.has(destNorm) ||
                       destination.startsWith('http'); // Externe URL
    
    if (!destExists) {
      problems.push({
        source,
        destination,
        issue: '⚠️  Ziel-URL existiert nicht in Sitemap'
      });
    }
  }

  // 4. Lade und validiere firebase.json
  const firebasePath = path.resolve(__dirname, '../firebase.json');
  const firebaseRaw = await fs.readFile(firebasePath, 'utf-8');
  const firebaseConfig = JSON.parse(firebaseRaw);
  const firebaseRedirects = firebaseConfig.hosting[0].redirects || [];
  
  console.log(`🔀 firebase.json: ${firebaseRedirects.length} Redirects\n`);
  
  // Prüfe auf Duplikate
  const sourceMap = new Map();
  const duplicates = [];
  
  for (const r of firebaseRedirects) {
    if (sourceMap.has(r.source)) {
      duplicates.push({
        source: r.source,
        dest1: sourceMap.get(r.source),
        dest2: r.destination
      });
    }
    sourceMap.set(r.source, r.destination);
  }

  // 5. Artikel-Daten prüfen
  const datumsBefunde = await pruefeArtikelDaten();
  console.log(`📅 Artikel-Daten: ${datumsBefunde.length === 0 ? 'sauber' : `${datumsBefunde.length} Befunde`}\n`);

  // 6. Ausgabe
  console.log('═'.repeat(60));

  if (datumsBefunde.length > 0) {
    console.log('\n❌ ARTIKEL-DATEN:\n');
    for (const b of datumsBefunde) {
      console.log(`  ${b}`);
    }
    console.log('\n  Abhilfe: node scripts/seed-article-dates.mjs\n');
  }

  if (problems.length > 0) {
    console.log('\n⚠️  PROBLEME IN URL-REDIRECTS.JSON:\n');
    for (const p of problems) {
      console.log(`  ${p.source}`);
      console.log(`    → ${p.destination}`);
      console.log(`    ${p.issue}\n`);
    }
  }
  
  if (duplicates.length > 0) {
    console.log('\n⚠️  DUPLIKATE IN FIREBASE.JSON:\n');
    for (const d of duplicates) {
      console.log(`  ${d.source}`);
      console.log(`    → ${d.dest1}`);
      console.log(`    → ${d.dest2}\n`);
    }
  }

  console.log('\n' + '═'.repeat(60));
  
  const gesamt = problems.length + duplicates.length + datumsBefunde.length;
  if (gesamt === 0) {
    console.log('\n✅ ALLE CHECKS BESTANDEN - BEREIT FÜR DEPLOY\n');
    return true;
  } else {
    console.log(`\n❌ ${gesamt} PROBLEME GEFUNDEN - DEPLOY ABGEBROCHEN\n`);
    return false;
  }
}

validate().then(ok => {
  process.exit(ok ? 0 : 1);
}).catch(err => {
  console.error(err);
  process.exit(1);
});

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP = path.resolve(__dirname, 'out/sitemap.xml');
const CACHE_FILE = path.resolve(__dirname, '.indexnow-cache.json');
const KEY = 'fa60cd20024c41d7ba4a5b7092ede6a2';
const HOST = 'jasswiki.ch';

/**
 * Liest den letzten Snapshot der Sitemap-URLs + lastmod.
 * Format: { "https://jasswiki.ch/jassen/schieber/": "2026-03-15", ... }
 */
async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveCache(snapshot) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(snapshot, null, 2));
}

/**
 * Extrahiert URL + lastmod Paare aus der Sitemap.
 */
function parseSitemap(xml) {
  const entries = {};
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const modMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (locMatch) {
      entries[locMatch[1]] = modMatch ? modMatch[1] : '';
    }
  }

  return entries;
}

/**
 * Vergleicht aktuellen Sitemap-Stand mit Cache und gibt geänderte URLs zurueck.
 */
function findChangedUrls(current, cached) {
  const changed = [];

  // Neue oder geaenderte URLs
  for (const [url, lastmod] of Object.entries(current)) {
    if (!cached[url] || cached[url] !== lastmod) {
      changed.push(url);
    }
  }

  // Entfernte URLs (Bing soll wissen, dass sie weg sind)
  for (const url of Object.keys(cached)) {
    if (!current[url]) {
      changed.push(url);
    }
  }

  return changed;
}

async function submitToIndexNow() {
  const forceAll = process.argv.includes('--force');

  console.log('📡 IndexNow: Lese Sitemap...');
  const xml = await fs.readFile(SITEMAP, 'utf-8');
  const current = parseSitemap(xml);
  const allUrls = Object.keys(current);

  if (allUrls.length === 0) {
    console.log('⚠️  Keine URLs in Sitemap gefunden.');
    return;
  }

  let urlsToSubmit;

  if (forceAll) {
    console.log(`📡 IndexNow: --force Flag gesetzt, alle ${allUrls.length} URLs submitten...`);
    urlsToSubmit = allUrls;
  } else {
    const cached = await loadCache();
    urlsToSubmit = findChangedUrls(current, cached);

    if (urlsToSubmit.length === 0) {
      console.log('✅ IndexNow: Keine Aenderungen seit letztem Deploy. Nichts zu submitten.');
      await saveCache(current);
      return;
    }

    console.log(`📡 IndexNow: ${urlsToSubmit.length} geänderte URLs (von ${allUrls.length} total) submitten...`);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urlsToSubmit,
  };

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log(`✅ IndexNow: ${urlsToSubmit.length} URLs submitted (HTTP ${res.status})`);
    // Cache nur bei Erfolg aktualisieren
    await saveCache(current);
  } else {
    console.log(`❌ IndexNow: HTTP ${res.status} — ${await res.text()}`);
  }
}

submitToIndexNow().catch(err => {
  console.error('❌ IndexNow Fehler:', err.message);
  // Nicht mit exit(1) abbrechen — Deploy soll trotzdem durchgehen
});

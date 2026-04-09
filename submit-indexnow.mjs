import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP = path.resolve(__dirname, 'out/sitemap.xml');
const KEY = 'fa60cd20024c41d7ba4a5b7092ede6a2';
const HOST = 'jasswiki.ch';

async function submitToIndexNow() {
  console.log('📡 IndexNow: Lese Sitemap...');

  const xml = await fs.readFile(SITEMAP, 'utf-8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  if (urls.length === 0) {
    console.log('⚠️  Keine URLs in Sitemap gefunden.');
    return;
  }

  console.log(`📡 IndexNow: ${urls.length} URLs an Bing submitten...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log(`✅ IndexNow: ${urls.length} URLs submitted (HTTP ${res.status})`);
  } else {
    console.log(`❌ IndexNow: HTTP ${res.status} — ${await res.text()}`);
  }
}

submitToIndexNow().catch(err => {
  console.error('❌ IndexNow Fehler:', err.message);
  // Nicht mit exit(1) abbrechen — Deploy soll trotzdem durchgehen
});

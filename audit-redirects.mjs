/**
 * JassWiki Redirect-Audit
 *
 * Analysiert die Redirects in firebase.json auf Probleme:
 *   - Duplikate (gleiche Source mehrfach)
 *   - Widersprüche (gleiche Source → verschiedene Destinations)
 *   - Trailing-Slash-Paare (überflüssig wegen `cleanUrls + trailingSlash`)
 *   - Redirect-Chains (Destination ist selbst Source eines weiteren Redirects)
 *   - Self-Loops (Source === Destination)
 *   - Externe Destinations (nicht-relativ)
 *   - Top-Konsolidierungen (Destinations mit vielen Quellen)
 *
 * Aufruf: node audit-redirects.mjs
 *
 * Exit-Code 0 = sauber, 1 = Probleme gefunden.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIREBASE_FILE = path.resolve(__dirname, 'firebase.json');

function normalize(p) {
  if (!p) return '';
  let s = String(p).trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (!s.startsWith('/')) s = '/' + s;
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s;
}

async function main() {
  console.log('🔎 JassWiki Redirect-Audit');
  console.log('='.repeat(60));

  const config = JSON.parse(await fs.readFile(FIREBASE_FILE, 'utf-8'));
  const hostings = Array.isArray(config.hosting)
    ? config.hosting
    : config.hosting ? [config.hosting] : [];

  let totalRedirects = 0;
  let totalProblems = 0;

  for (const h of hostings) {
    const target = h.target || '(default)';
    const redirects = h.redirects || [];
    totalRedirects += redirects.length;

    console.log(`\n📦 Target: ${target}  —  ${redirects.length} Redirects`);
    console.log('-'.repeat(60));

    const sourceMap = new Map();    // normalized source → array of {raw, destination, type, line}
    const destSourceCount = new Map();
    const externalDests = [];
    const selfLoops = [];

    redirects.forEach((r, i) => {
      const rawSrc = r.source || '';
      const normSrc = normalize(rawSrc);
      const dest = r.destination || '';
      const normDest = normalize(dest);

      if (!sourceMap.has(normSrc)) sourceMap.set(normSrc, []);
      sourceMap.get(normSrc).push({ raw: rawSrc, destination: dest, normDest, type: r.type, idx: i });

      destSourceCount.set(normDest, (destSourceCount.get(normDest) || 0) + 1);

      if (dest.startsWith('http://') || dest.startsWith('https://')) {
        externalDests.push({ source: rawSrc, destination: dest });
      }
      if (normSrc === normDest) {
        selfLoops.push({ source: rawSrc, destination: dest });
      }
    });

    // 1. Trailing-Slash-Paare
    const slashPairs = [];
    for (const [norm, entries] of sourceMap.entries()) {
      const variants = new Set(entries.map(e => e.raw));
      if (variants.size > 1 && [...variants].some(v => v.endsWith('/'))
          && [...variants].some(v => !v.endsWith('/'))) {
        slashPairs.push({ source: norm, variants: [...variants] });
      }
    }
    if (slashPairs.length) {
      console.log(`\n  ⚠️  ${slashPairs.length} Trailing-Slash-Duplikate (firebase normalisiert via cleanUrls/trailingSlash):`);
      slashPairs.slice(0, 5).forEach(p => {
        console.log(`     ${p.variants.join('  +  ')}`);
      });
      if (slashPairs.length > 5) console.log(`     ... +${slashPairs.length - 5} weitere`);
      totalProblems += slashPairs.length;
    }

    // 2. Widersprüchliche Redirects (gleiche Source → verschiedene Dests)
    const conflicts = [];
    for (const [norm, entries] of sourceMap.entries()) {
      const dests = new Set(entries.map(e => e.normDest));
      if (dests.size > 1) {
        conflicts.push({ source: norm, destinations: [...dests] });
      }
    }
    if (conflicts.length) {
      console.log(`\n  🔴 ${conflicts.length} WIDERSPRÜCHLICHE Redirects (gleiche Source, verschiedene Targets):`);
      conflicts.forEach(c => {
        console.log(`     ${c.source}  →  ${c.destinations.join('  |  ')}`);
      });
      totalProblems += conflicts.length;
    }

    // 3. Self-Loops
    if (selfLoops.length) {
      console.log(`\n  🔴 ${selfLoops.length} Self-Loops:`);
      selfLoops.forEach(l => console.log(`     ${l.source} → ${l.destination}`));
      totalProblems += selfLoops.length;
    }

    // 4. Redirect-Chains (Destination ist auch eine Source)
    const chains = [];
    const allSources = new Set(sourceMap.keys());
    for (const [src, entries] of sourceMap.entries()) {
      for (const e of entries) {
        if (allSources.has(e.normDest) && e.normDest !== src) {
          chains.push({ from: e.raw || src, to: e.destination });
        }
      }
    }
    if (chains.length) {
      console.log(`\n  ⚠️  ${chains.length} Redirect-Chains (Ziel ist selbst Redirect-Source — Google folgt max. 5):`);
      chains.slice(0, 5).forEach(c => console.log(`     ${c.from} → ${c.to} → …`));
      if (chains.length > 5) console.log(`     ... +${chains.length - 5} weitere`);
      totalProblems += chains.length;
    }

    // 5. Externe Destinations
    if (externalDests.length) {
      console.log(`\n  ℹ️  ${externalDests.length} externe Destinations (cross-domain):`);
      externalDests.slice(0, 5).forEach(d => console.log(`     ${d.source} → ${d.destination}`));
      if (externalDests.length > 5) console.log(`     ... +${externalDests.length - 5} weitere`);
    }

    // 6. Top-Konsolidierungen
    const topDests = [...destSourceCount.entries()]
      .filter(([, n]) => n >= 5)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    if (topDests.length) {
      console.log(`\n  ℹ️  Top-Ziele (Konsolidierung — kann von Google als "Doorway/Thin" gelesen werden):`);
      topDests.forEach(([d, n]) => console.log(`     ${n.toString().padStart(3)}×  →  ${d}`));
    }

    // Zusammenfassung
    const uniqueSources = sourceMap.size;
    const totalEntries = redirects.length;
    console.log(`\n  📊 ${totalEntries} Einträge, ${uniqueSources} eindeutige Sources, ${totalEntries - uniqueSources} Duplikate`);
  }

  console.log('\n' + '='.repeat(60));
  if (totalProblems === 0) {
    console.log(`✅ Keine kritischen Probleme in ${totalRedirects} Redirects.`);
  } else {
    console.log(`❌ ${totalProblems} Probleme in ${totalRedirects} Redirects gefunden.`);
  }
  process.exit(totalProblems > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('❌ Audit fehlgeschlagen:', err);
  process.exit(1);
});

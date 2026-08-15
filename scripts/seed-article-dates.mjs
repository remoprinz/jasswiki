/**
 * Artikel-Daten aus der Git-Historie ableiten.
 *
 * Jede Fassung von src/data/jass-content-v2.json wird gelesen, je Artikel ein
 * Fingerabdruck über `text` plus `faqs` gebildet. Ändert sich der Fingerabdruck
 * zwischen zwei benachbarten Fassungen oder taucht ein Artikel neu auf, ist das
 * Datum dieser Fassung ein Änderungsdatum des Artikels.
 *
 *   metadata.datePublished = frühestes Datum
 *   metadata.dateModified  = spätestes Datum
 *
 * Der Arbeitsbaum zählt als jüngste Fassung: Artikel, deren Fingerabdruck von
 * HEAD abweicht, tragen danach das heutige Datum. Damit bleibt das Skript nach
 * dem ersten Lauf brauchbar — wer einen Artikel bearbeitet, lässt es laufen und
 * hat das Änderungsdatum sauber gesetzt.
 *
 * Angefasst werden ausschliesslich die beiden Datumsfelder in `metadata`.
 * `text`, `faqs`, `see_also`, `synonyms` und die Reihenfolge bleiben, wie sie sind.
 *
 * Aufruf:
 *   node scripts/seed-article-dates.mjs           schreibt
 *   node scripts/seed-article-dates.mjs --dry     zeigt nur, was sich ändern würde
 */
import { execFileSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO = path.resolve(__dirname, '..');
const REL_PATH = 'src/data/jass-content-v2.json';
const FILE = path.join(REPO, REL_PATH);
const DRY = process.argv.includes('--dry');

function git(args) {
  return execFileSync('git', ['-C', REPO, ...args], {
    encoding: 'utf-8',
    maxBuffer: 256 * 1024 * 1024,
  });
}

function fingerprint(article) {
  const payload = JSON.stringify([article?.text ?? '', article?.faqs ?? null]);
  return crypto.createHash('sha1').update(payload).digest('hex');
}

function fingerprintMap(raw) {
  const data = JSON.parse(raw);
  const map = new Map();
  for (const [id, article] of Object.entries(data)) {
    if (article && typeof article === 'object' && typeof article.text === 'string') {
      map.set(id, fingerprint(article));
    }
  }
  return map;
}

function heute() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

console.log('🗓  Artikel-Daten aus der Git-Historie ableiten\n');

// 1. Alle Fassungen der Inhaltsdatei, älteste zuerst
const log = git(['log', '--reverse', '--format=%H %ad', '--date=short', '--', REL_PATH])
  .split('\n')
  .map((z) => z.trim())
  .filter(Boolean)
  .map((z) => {
    const [sha, datum] = z.split(' ');
    return { sha, datum };
  });

if (log.length === 0) {
  console.error(`❌ Keine Git-Fassungen für ${REL_PATH} gefunden.`);
  process.exit(1);
}
console.log(`📚 ${log.length} Fassungen, ${log[0].datum} bis ${log[log.length - 1].datum}`);

// 2. Fassung für Fassung vergleichen
const daten = new Map(); // id -> Set<YYYY-MM-DD>
let vorher = new Map();

function vermerke(id, datum) {
  if (!daten.has(id)) daten.set(id, new Set());
  daten.get(id).add(datum);
}

for (const { sha, datum } of log) {
  let jetzt;
  try {
    jetzt = fingerprintMap(git(['show', `${sha}:${REL_PATH}`]));
  } catch (err) {
    console.error(`❌ Fassung ${sha} unlesbar: ${err.message}`);
    process.exit(1);
  }
  let geaendert = 0;
  for (const [id, fp] of jetzt) {
    if (vorher.get(id) !== fp) {
      vermerke(id, datum);
      geaendert++;
    }
  }
  console.log(`   ${datum}  ${sha.slice(0, 8)}  ${String(jetzt.size).padStart(3)} Artikel, ${geaendert} davon neu oder geändert`);
  vorher = jetzt;
}

// 3. Der Arbeitsbaum als jüngste Fassung
const rohtext = fs.readFileSync(FILE, 'utf-8');
const bestand = JSON.parse(rohtext);
const arbeitsbaum = fingerprintMap(rohtext);
const tagesdatum = heute();
const frisch = [];
for (const [id, fp] of arbeitsbaum) {
  if (vorher.get(id) !== fp) {
    vermerke(id, tagesdatum);
    frisch.push(id);
  }
}
if (frisch.length > 0) {
  console.log(`\n✏️  ${frisch.length} Artikel weichen von HEAD ab und tragen ${tagesdatum}:`);
  frisch.forEach((id) => console.log(`   ${id}`));
}

// 4. Datumsfelder setzen
let gesetzt = 0;
let veraendert = 0;
const ohneDatum = [];

for (const [id, artikel] of Object.entries(bestand)) {
  const menge = daten.get(id);
  if (!menge || menge.size === 0) {
    ohneDatum.push(id);
    continue;
  }
  const sortiert = [...menge].sort();
  const datePublished = sortiert[0];
  const dateModified = sortiert[sortiert.length - 1];

  artikel.metadata = artikel.metadata || {};
  if (artikel.metadata.datePublished !== datePublished || artikel.metadata.dateModified !== dateModified) {
    veraendert++;
  }
  artikel.metadata.datePublished = datePublished;
  artikel.metadata.dateModified = dateModified;
  gesetzt++;
}

if (ohneDatum.length > 0) {
  console.error(`\n❌ DATUM_FEHLT: ${ohneDatum.length} Artikel ohne Fassung in der Historie:`);
  ohneDatum.forEach((id) => console.error(`   ${id}`));
  process.exit(1);
}

// 5. Verteilung zeigen
const proTag = new Map();
for (const artikel of Object.values(bestand)) {
  const d = artikel.metadata.dateModified;
  proTag.set(d, (proTag.get(d) || 0) + 1);
}
console.log(`\n📊 ${gesetzt} Artikel datiert, ${veraendert} davon mit neuem Wert.`);
console.log(`   ${proTag.size} verschiedene Änderungsdaten:`);
[...proTag.entries()].sort().forEach(([d, n]) => console.log(`   ${d}  ${n}`));

// 6. Schreiben
if (DRY) {
  console.log('\n🔎 Probelauf — die Datei bleibt unberührt.');
  process.exit(0);
}

const neu = JSON.stringify(bestand, null, 2) + '\n';
fs.writeFileSync(FILE, neu, 'utf-8');
console.log(`\n✅ ${REL_PATH} geschrieben (${neu.length} Zeichen).`);

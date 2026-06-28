// generate-og.mjs — Build-Time OG-Banner-Generator für jasswiki
// Rendert pro Wiki-Begriff ein 1200×630 Banner:
//   Plate (assets/og-template/og-background.png) + Term (Inter ExtraBold, Box-Fit)
//   → public/og/<slug>.png   (slug = letztes Pfadsegment der canonical_url)
//
// Voll:  node generate-og.mjs            (alle Corpus-Titel)
// Test:  OG_TEST=1 node generate-og.mjs  (nur TEST_TITLES)
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Repo-Root: Standard = Verzeichnis dieses Scripts; per JASSWIKI_ROOT überschreibbar
const ROOT = process.env.JASSWIKI_ROOT
  ? path.resolve(process.env.JASSWIKI_ROOT)
  : path.dirname(fileURLToPath(import.meta.url));

const CORPUS = path.join(ROOT, 'public/dataset/jasswiki-corpus.jsonl');
const PLATE  = path.join(ROOT, 'assets/og-template/og-background.png');
const FONT   = path.join(ROOT, 'assets/og-template/Inter-ExtraBold.ttf');
const OUTDIR = path.join(ROOT, 'public/og');
const MANIFEST = path.join(ROOT, 'src/data/og-manifest.json'); // slug → dateiname, für SeoHead
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');

// --- kalibrierte Layout-Parameter (aus den Affinity-Boards rückgemessen) ---
const CANVAS_W = 1200, CANVAS_H = 630;
const CENTER_X = 600, CENTER_Y = 305;
const MAX_W = 790, MAX_H = 337;   // Term-Box; Schrift füllt sie max. aus
const LINE_HEIGHT = 1.08;         // Zeilen-Pitch direkt aus den Boards gemessen
const FONT_MAX = 340, FONT_MIN = 36, STEP = 2;
const FAMILY = 'Inter ExtraBold';

const TEST_TITLES = [
  'Bock',
  'Stöck',
  'Bemerkungen/Schnorren',
  'Verbreitung und gesellschaftliche Bedeutung',
  'Bodentrumpf',
];

// Sonder-/Kategorieseiten (NICHT im Artikel-Corpus) bekommen ebenfalls ihr Banner.
// title = Banner-Hero, jederzeit anpassbar. slug = letztes URL-Segment.
const EXTRA_PAGES = [
  { slug: 'schieber', title: 'Schieber' },
  { slug: 'jassen', title: 'Jassen' },
  { slug: 'regeln', title: 'Regeln' },
  { slug: 'begriffe', title: 'Begriffe' },
  { slug: 'varianten', title: 'Varianten' },
  { slug: 'weis-regeln', title: 'Weisen' },
  { slug: 'taktiken-und-strategien', title: 'Taktik & Strategie' },
  { slug: 'geschichte', title: 'Geschichte' },
  { slug: 'grundlagen-kultur', title: 'Grundlagen & Kultur' },
  { slug: 'ansagen', title: 'Ansagen' },
];

// Rechtliche/Utility-Seiten bleiben ohne eigenes Banner (Default genügt).
const SKIP_SLUGS = new Set([
  'impressum', 'datenschutz', 'nutzungsbedingungen', 'quellen', 'referenzen',
  'quellenverzeichnis', 'taxonomie', 'konto-loeschen',
]);
// Fallback-Titel aus dem Slug: "kartenverteilung" → "Kartenverteilung", "nell-vor-puur" → "Nell Vor Puur"
const titleFromSlug = (slug) =>
  slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// --- Font (nur für Breitenmessung; resvg shaped beim Rendern selbst) ---
const _fb = readFileSync(FONT);
const font = opentype.parse(_fb.buffer.slice(_fb.byteOffset, _fb.byteOffset + _fb.byteLength));
const upm = font.unitsPerEm;
const capRatio = (font.tables.os2?.sCapHeight || 1490) / upm;

// Messung per Glyph-Advance (umgeht opentype getAdvanceWidth/ccmp-Crash)
function measure(text, size) {
  const s = size / upm; let w = 0, prev = null;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    w += g.advanceWidth || 0;
    if (prev) w += font.getKerningValue(prev, g) || 0;
    prev = g;
  }
  return w * s;
}

function wrapSegment(text, size, maxW) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = []; let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (measure(t, size) <= maxW || !cur) cur = t;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Box-Fit: grösste Schrift, bei der jede Zeile ≤ MAX_W und Block ≤ MAX_H; '/' = harter Umbruch
function layout(term) {
  const segs = term.split('/').map(s => s.trim()).filter(Boolean);
  for (let size = FONT_MAX; size >= FONT_MIN; size -= STEP) {
    let lines = [];
    for (const seg of segs) lines = lines.concat(wrapSegment(seg, size, MAX_W));
    const maxLineW = Math.max(...lines.map(l => measure(l, size)));
    const blockH = lines.length * size * LINE_HEIGHT;
    if (maxLineW <= MAX_W && blockH <= MAX_H) return { size, lines };
  }
  return { size: FONT_MIN, lines: term.split('/').map(s => s.trim()).filter(Boolean) };
}

function buildSvg(term) {
  const { size, lines } = layout(term);
  const pitch = size * LINE_HEIGHT, n = lines.length;
  const els = lines.map((line, i) => {
    const lineCenterY = CENTER_Y - ((n - 1) / 2) * pitch + i * pitch;
    const baselineY = lineCenterY + (capRatio * size) / 2;
    const esc = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<text x="${CENTER_X}" y="${baselineY.toFixed(1)}" text-anchor="middle" font-family="${FAMILY}" font-size="${size}" fill="#FFFFFF">${esc}</text>`;
  }).join('');
  return { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">${els}</svg>`, size, lines };
}

function slugify(rec) {
  const u = rec.canonical_url || '';
  const seg = u.replace(/\/+$/, '').split('/').pop();
  if (seg) return seg;
  return (rec.title || 'untitled').toLowerCase()
    .replace(/[äàá]/g, 'a').replace(/[öòó]/g, 'o').replace(/[üùú]/g, 'u').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  const test = process.env.OG_TEST === '1' || process.argv.includes('--test');
  mkdirSync(OUTDIR, { recursive: true });
  // Alte Banner entfernen, damit keine verwaisten Hash-Dateien liegenbleiben (nur voller Lauf)
  if (!test) for (const f of readdirSync(OUTDIR)) if (f.endsWith('.png')) rmSync(path.join(OUTDIR, f));
  const plateBuf = readFileSync(PLATE);
  const records = readFileSync(CORPUS, 'utf8').trim().split('\n').map(l => JSON.parse(l));

  // Dedup nach Slug: gleicher Begriff kann unter mehreren Kategorien liegen → ein geteiltes Banner.
  const bySlug = new Map();
  const shared = new Set();
  for (const r of records) {
    if (!r.title || !r.canonical_url) continue;
    const slug = slugify(r);
    if (bySlug.has(slug)) { shared.add(slug); continue; } // erster gewinnt (Titel identisch)
    bySlug.set(slug, r.title);
  }
  // Jede Nicht-Corpus-Seite aus der Sitemap abdecken → KEINE Seite (ausser Startseite) auf Default.
  // Titel = kuratierter Override (EXTRA_PAGES) sonst aus dem Slug abgeleitet.
  const overrides = Object.fromEntries(EXTRA_PAGES.map((p) => [p.slug, p.title]));
  const sitemap = readFileSync(SITEMAP, 'utf8');
  for (const m of sitemap.matchAll(/<loc>https:\/\/jasswiki\.ch\/([^<]*)<\/loc>/g)) {
    const slug = m[1].replace(/\/+$/, '').split('/').pop();
    if (!slug || bySlug.has(slug) || SKIP_SLUGS.has(slug)) continue;
    bySlug.set(slug, overrides[slug] || titleFromSlug(slug));
  }
  let entries = [...bySlug.entries()].map(([slug, title]) => ({ slug, title }));
  if (test) entries = TEST_TITLES.map(t => entries.find(e => e.title === t)).filter(Boolean);
  if (shared.size) console.log(`Hinweis: ${shared.size} geteilte Slugs (gleicher Begriff, mehrere Kategorien): ${[...shared].join(', ')}`);

  const manifest = {};
  console.log(`${test ? 'TEST' : 'VOLL'}: ${entries.length} Banner → ${path.relative(ROOT, OUTDIR)}/`);
  for (const { title, slug } of entries) {
    const { svg, size, lines } = buildSvg(title);
    const resvg = new Resvg(svg, {
      font: { fontFiles: [FONT], loadSystemFonts: false, defaultFontFamily: FAMILY },
      background: 'rgba(0,0,0,0)',
    });
    const textPng = resvg.render().asPng();
    const composed = await sharp(plateBuf).composite([{ input: textPng }]).png().toBuffer();
    const hash = createHash('sha1').update(composed).digest('hex').slice(0, 8); // Content-Hash = Cache-Bust
    const fname = `${slug}.${hash}.png`;
    writeFileSync(path.join(OUTDIR, fname), composed);
    manifest[slug] = fname;
    console.log(`  ${fname.padEnd(56)} ${size}px/${lines.length}z`);
  }

  // Manifest nur beim vollen Lauf schreiben (Test würde es sonst auf 5 Einträge kürzen)
  if (!test) {
    mkdirSync(path.dirname(MANIFEST), { recursive: true });
    writeFileSync(MANIFEST, JSON.stringify(manifest, null, 0) + '\n');
    console.log(`Manifest: ${path.relative(ROOT, MANIFEST)} (${Object.keys(manifest).length} Einträge)`);
  }
  console.log('fertig.');
}
main();

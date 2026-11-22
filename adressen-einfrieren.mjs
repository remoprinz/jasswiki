#!/usr/bin/env node
/**
 * Adressen einfrieren (Gliederung Schritt 1, 22.11.2026).
 *
 * Jeder Artikel trägt seine Adresse als festes Feld `metadata.adresse`.
 * Seiten, Sitemap, Korpus, llms, artikel.json, InternalLinker und
 * Seitenprüfer lesen allein dieses Feld. Titel (category.topic) und
 * Zugehörigkeit (category.main/sub, Gliederungsdatei) dürfen sich danach
 * ändern, ohne dass eine Adresse wandert.
 *
 * Das Skript setzt das Feld nur, wo es fehlt, und rechnet es dann so,
 * wie die Adresse bis zum 22.11.2026 gerechnet wurde (adresseAusKategorie
 * in url-utils.mjs). Ein gesetztes Feld bleibt unangetastet.
 *
 *   node adressen-einfrieren.mjs           setzt fehlende Felder
 *   node adressen-einfrieren.mjs --pruefen meldet fehlende Felder, Exit 1
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adresseAusKategorie, validateUrl } from './url-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATEI = path.join(__dirname, 'src/data/jass-content-v2.json');
const nurPruefen = process.argv.includes('--pruefen');

const roh = fs.readFileSync(DATEI, 'utf8');
const inhalt = JSON.parse(roh);

// Die Datei muss sich verlustfrei neu schreiben lassen, sonst bricht das
// Skript ab, statt fremde Formatierung umzuschreiben.
if (JSON.stringify(inhalt, null, 2) + '\n' !== roh) {
  console.error('❌ jass-content-v2.json lässt sich nicht formatgleich neu schreiben. Abbruch.');
  process.exit(1);
}

const gesetzt = [];
for (const [id, artikel] of Object.entries(inhalt)) {
  const meta = artikel.metadata;
  if (typeof meta.adresse === 'string' && meta.adresse) continue;
  const adresse = adresseAusKategorie(meta.category);
  const pruefung = validateUrl(adresse);
  if (!pruefung.isValid) {
    console.error(`❌ ${id}: ${pruefung.error}`);
    process.exit(1);
  }
  gesetzt.push([id, adresse]);
  if (nurPruefen) continue;
  // `adresse` direkt hinter `category` einsetzen, die übrigen Felder bleiben.
  const neu = {};
  for (const [k, v] of Object.entries(meta)) {
    neu[k] = v;
    if (k === 'category') neu.adresse = adresse;
  }
  artikel.metadata = neu;
}

// Jede Adresse genau einmal.
const gesehen = new Map();
for (const [id, artikel] of Object.entries(inhalt)) {
  const a = artikel.metadata.adresse;
  if (!a) continue;
  if (gesehen.has(a)) {
    console.error(`❌ Adresse doppelt: ${a} (${gesehen.get(a)}, ${id})`);
    process.exit(1);
  }
  gesehen.set(a, id);
}

if (nurPruefen) {
  if (gesetzt.length) {
    console.error(`❌ ${gesetzt.length} Artikel ohne festes Adressfeld: ${gesetzt.map(([id]) => id).join(', ')}`);
    console.error('   Setzen mit: node adressen-einfrieren.mjs');
    process.exit(1);
  }
  console.log(`✅ Adressen: alle ${Object.keys(inhalt).length} Artikel tragen ihr festes Adressfeld.`);
  process.exit(0);
}

if (gesetzt.length) {
  fs.writeFileSync(DATEI, JSON.stringify(inhalt, null, 2) + '\n');
  for (const [id, a] of gesetzt) console.log(`   ${id} → ${a}`);
}
console.log(`✅ ${gesetzt.length} Adressfeld(er) gesetzt, ${Object.keys(inhalt).length} Artikel.`);

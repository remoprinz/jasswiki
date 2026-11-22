/**
 * DAS SIEGEL — eine abgenommene Seite bleibt, wie sie abgenommen wurde (A1, 22.11.2026)
 *
 * Remo nimmt einen Artikel ab. Ab dann trägt er ein Siegel: eine Prüfsumme über die
 * Felder, die der Leser liest. Jede spätere Änderung an diesen Feldern bricht das
 * Siegel und hält den Bau an, bis der Artikel neu geprüft und neu gesiegelt ist.
 * Vorbild: das Siegelbuch von FEILE in der App.
 *
 * Gesiegelt werden aus src/data/jass-content-v2.json, in dieser Reihenfolge:
 *   text · faqs (Frage und Antwort) · see_also · metadata.category ·
 *   metadata.seoTitle · metadata.seoDescription · metadata.titel
 * Leerraum an den Rändern zählt nicht. Felder wie dateModified zählen nicht.
 * Je Feld steht eine Teilsumme im Eintrag: So nennt die Prüfung das geänderte Feld,
 * ohne den alten Text zu kennen.
 *
 * Siegelbuch: siegelbuch.json im Wurzelordner, je Artikel
 *   { pruefsumme, felder, gesiegeltAm, von, geprueftAm, grundlage, frueher }
 *
 *   node siegel.mjs pruefen                                   Exit 1 bei gebrochenem Siegel
 *   node siegel.mjs setzen <id> --von "<wer und wann>" [--grundlage "<text>"]
 *                                                             siegeln oder neu siegeln
 *   node siegel.mjs liste                                     alle Siegel
 *   node siegel.mjs verfall                                   meldet fällige Prüfungen
 *
 * Neu siegeln überschreibt den Eintrag und legt den alten (pruefsumme, gesiegeltAm,
 * von) in «frueher» ab. So bleibt jede Neusiegelung nachvollziehbar.
 */

import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));

export const FELDER = [
  'text',
  'faqs',
  'see_also',
  'metadata.category',
  'metadata.seoTitle',
  'metadata.seoDescription',
  'metadata.titel',
];

/** Verfall in Tagen: Angaben zu Apps veralten schnell, alles andere einmal im Jahr. */
export const VERFALL = { rubrik: 'Jassapps', rubrikTage: 90, siegelTage: 365 };

const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

/** Feste Form eines Wertes: Ränder ohne Leerraum, Schlüssel sortiert, FAQ als Frage und Antwort. */
export const normiere = (wert) => {
  if (wert === undefined || wert === null) return null;
  if (typeof wert === 'string') return wert.trim();
  if (Array.isArray(wert)) return wert.map(normiere);
  if (typeof wert === 'object') {
    const aus = {};
    for (const k of Object.keys(wert).sort()) aus[k] = normiere(wert[k]);
    return aus;
  }
  return wert;
};

const feldWert = (artikel, feld) => {
  if (feld === 'faqs') {
    return (artikel.faqs || []).map((f) => ({ frage: f?.question ?? null, antwort: f?.answer ?? null }));
  }
  return feld.split('.').reduce((o, k) => (o == null ? undefined : o[k]), artikel);
};

/** Teilsummen je Feld und die Prüfsumme über alle, in fester Reihenfolge. */
export const summen = (artikel) => {
  const felder = {};
  for (const feld of FELDER) felder[feld] = sha(JSON.stringify(normiere(feldWert(artikel, feld))));
  const pruefsumme = sha(FELDER.map((f) => `${f}=${felder[f]}`).join('\n'));
  return { pruefsumme, felder };
};

const neuSiegelnBefehl = (id) => `node siegel.mjs setzen ${id} --von "<wer und wann>"`;

/**
 * Prüft jedes Siegel gegen die Inhaltsdatei.
 * Gibt die gebrochenen Siegel zurück: { id, grund: 'fehlt' | 'geaendert', felder }.
 */
export const pruefeSiegel = (buch, inhalt) => {
  const gebrochen = [];
  for (const id of Object.keys(buch).sort()) {
    const eintrag = buch[id];
    const artikel = inhalt[id];
    if (!artikel) {
      gebrochen.push({ id, grund: 'fehlt', felder: [] });
      continue;
    }
    const jetzt = summen(artikel);
    if (jetzt.pruefsumme === eintrag.pruefsumme) continue;
    const felder = FELDER.filter((f) => eintrag.felder?.[f] !== jetzt.felder[f]);
    gebrochen.push({ id, grund: 'geaendert', felder });
  }
  return gebrochen;
};

const tageZwischen = (vonIso, bisIso) => Math.floor((Date.parse(bisIso) - Date.parse(vonIso)) / 86_400_000);

/** Fällige Prüfungen: Rubrik Jassapps nach 90 Tagen (auch ungeprüfte), jedes Siegel nach 365. */
export const pruefeVerfall = (buch, inhalt, heute) => {
  const meldungen = [];
  for (const id of Object.keys(inhalt).sort()) {
    if (inhalt[id]?.metadata?.category?.main !== VERFALL.rubrik) continue;
    const am = buch[id]?.geprueftAm;
    if (!am) meldungen.push({ id, grund: `Rubrik ${VERFALL.rubrik}, noch nie geprüft` });
    else if (tageZwischen(am, heute) > VERFALL.rubrikTage) {
      meldungen.push({ id, grund: `Rubrik ${VERFALL.rubrik}, geprüft am ${am} (${tageZwischen(am, heute)} Tage)` });
    }
  }
  for (const id of Object.keys(buch).sort()) {
    const am = buch[id].geprueftAm;
    if (inhalt[id]?.metadata?.category?.main === VERFALL.rubrik) continue; // schon oben strenger gemeldet
    if (am && tageZwischen(am, heute) > VERFALL.siegelTage) {
      meldungen.push({ id, grund: `Siegel, geprüft am ${am} (${tageZwischen(am, heute)} Tage)` });
    }
  }
  return meldungen;
};

/** Setzt ein Siegel oder siegelt neu. Der alte Eintrag wandert nach «frueher». */
export const setzeSiegel = (buch, inhalt, id, { von, grundlage, heute }) => {
  if (!von || !String(von).trim()) throw new Error('«--von» fehlt: Wer hat abgenommen, und wann?');
  const artikel = inhalt[id];
  if (!artikel) throw new Error(`Artikel «${id}» steht nicht in der Inhaltsdatei.`);
  const alt = buch[id];
  const frueher = alt
    ? [...(alt.frueher || []), { pruefsumme: alt.pruefsumme, gesiegeltAm: alt.gesiegeltAm, von: alt.von }]
    : [];
  const { pruefsumme, felder } = summen(artikel);
  const eintrag = { pruefsumme, felder, gesiegeltAm: heute, von: String(von).trim(), geprueftAm: heute };
  if (grundlage) eintrag.grundlage = String(grundlage).trim();
  if (frueher.length > 0) eintrag.frueher = frueher;
  return { ...buch, [id]: eintrag };
};

const sortiert = (buch) => Object.fromEntries(Object.keys(buch).sort().map((k) => [k, buch[k]]));

const wert = (argv, name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

const heuteIso = () => new Date().toISOString().slice(0, 10);

// --- Lauf von der Kommandozeile -------------------------------------------------
export const lauf = async (argv = process.argv.slice(2), optionen = {}) => {
  const ausgabe = optionen.ausgabe || console.log;
  const wurzel = optionen.wurzel || WURZEL;
  const buchDatei = optionen.buchDatei || path.join(wurzel, 'siegelbuch.json');
  const inhaltDatei = optionen.inhaltDatei || path.join(wurzel, 'src/data/jass-content-v2.json');
  const heute = optionen.heute || heuteIso();
  const befehl = argv[0];

  const buch = existsSync(buchDatei) ? JSON.parse(await readFile(buchDatei, 'utf-8')) : {};
  const inhalt = JSON.parse(await readFile(inhaltDatei, 'utf-8'));

  if (befehl === 'pruefen') {
    const gebrochen = pruefeSiegel(buch, inhalt);
    const zahl = Object.keys(buch).length;
    if (gebrochen.length === 0) {
      ausgabe(`✅ Siegel: ${zahl} gesiegelte(r) Artikel unverändert.`);
      return 0;
    }
    ausgabe(`\n❌ ${gebrochen.length} Siegel gebrochen, der Bau hält an:\n`);
    for (const g of gebrochen) {
      ausgabe(`   ${g.id}`);
      if (g.grund === 'fehlt') ausgabe('   Der gesiegelte Artikel fehlt in der Inhaltsdatei.');
      else ausgabe(`   Geändert: ${g.felder.join(', ') || 'Prüfsumme (Feld nicht feststellbar)'}`);
      ausgabe(`   Gesiegelt am ${buch[g.id].gesiegeltAm} von ${buch[g.id].von}`);
      ausgabe(`   Nach Prüfung neu siegeln: ${neuSiegelnBefehl(g.id)}\n`);
    }
    return 1;
  }

  if (befehl === 'setzen') {
    const id = argv[1];
    if (!id || id.startsWith('--')) {
      ausgabe('❌ Kennung fehlt: node siegel.mjs setzen <id> --von "<wer und wann>"');
      return 1;
    }
    try {
      const neu = setzeSiegel(buch, inhalt, id, { von: wert(argv, '--von'), grundlage: wert(argv, '--grundlage'), heute });
      await writeFile(buchDatei, `${JSON.stringify(sortiert(neu), null, 2)}\n`);
      ausgabe(`${buch[id] ? '🔁 Neu gesiegelt' : '🔏 Gesiegelt'}: ${id} (${neu[id].pruefsumme.slice(0, 12)}…)`);
      return 0;
    } catch (err) {
      ausgabe(`❌ ${err.message}`);
      return 1;
    }
  }

  if (befehl === 'liste') {
    const ids = Object.keys(buch).sort();
    ausgabe(`🔏 Siegelbuch: ${ids.length} Artikel`);
    for (const id of ids) {
      const e = buch[id];
      ausgabe(`   ${id} · gesiegelt ${e.gesiegeltAm} · geprüft ${e.geprueftAm} · ${e.von}${e.grundlage ? ` · ${e.grundlage}` : ''}${e.frueher?.length ? ` · ${e.frueher.length}× neu gesiegelt` : ''}`);
    }
    return 0;
  }

  if (befehl === 'verfall') {
    const meldungen = pruefeVerfall(buch, inhalt, heute);
    if (meldungen.length === 0) ausgabe('✅ Verfall: keine Prüfung fällig.');
    else {
      ausgabe(`⏳ ${meldungen.length} Prüfung(en) fällig (Meldung, der Bau läuft weiter):`);
      for (const m of meldungen) ausgabe(`   ${m.id} · ${m.grund}`);
    }
    return 0;
  }

  ausgabe('Befehle: pruefen · setzen <id> --von "<wer und wann>" [--grundlage "<text>"] · liste · verfall');
  return 1;
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  lauf()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error('❌ Siegel konnte nicht laufen:', err);
      process.exit(1);
    });
}

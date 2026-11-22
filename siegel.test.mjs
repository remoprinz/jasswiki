/**
 * Tests zum Siegel (siegel.mjs). Inhaltsdatei und Siegelbuch liegen in einem
 * Temp-Ordner, das Datum wird eingesetzt.
 *
 *   npm run test:riegel
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { lauf, summen } from './siegel.mjs';

const artikel = (id, main = 'Begriffe') => ({
  id,
  text: 'Das Nell ist die Trumpf-Neun.',
  faqs: [{ question: 'Was ist das Nell?', answer: 'Die Trumpf-Neun.' }],
  see_also: ['trumpf_bauer'],
  metadata: { category: { main, sub: 'Karten', topic: 'Nell' }, seoTitle: 'Nell', dateModified: '2026-11-01' },
});

const baue = async (inhalt) => {
  const wurzel = await mkdtemp(path.join(tmpdir(), 'siegel-'));
  await mkdir(path.join(wurzel, 'src/data'), { recursive: true });
  const schreibeInhalt = (i) => writeFile(path.join(wurzel, 'src/data/jass-content-v2.json'), JSON.stringify(i));
  await schreibeInhalt(inhalt);
  const zeilen = [];
  const run = (argv, heute = '2026-11-24') => lauf(argv, { wurzel, heute, ausgabe: (z) => zeilen.push(z) });
  const buch = async () => JSON.parse(await readFile(path.join(wurzel, 'siegelbuch.json'), 'utf-8'));
  return { wurzel, run, zeilen, schreibeInhalt, buch };
};

test('leeres Siegelbuch: pruefen ist grün', async () => {
  const t = await baue({ expressions_nell: artikel('expressions_nell') });
  assert.equal(await t.run(['pruefen']), 0);
  await rm(t.wurzel, { recursive: true });
});

test('setzen und pruefen grün, Eintrag trägt alle Angaben', async () => {
  const t = await baue({ expressions_nell: artikel('expressions_nell') });
  assert.equal(await t.run(['setzen', 'expressions_nell', '--von', 'Remo 24.11.2026, Muster Nell', '--grundlage', 'Quellenblatt']), 0);
  const e = (await t.buch()).expressions_nell;
  assert.equal(e.von, 'Remo 24.11.2026, Muster Nell');
  assert.equal(e.grundlage, 'Quellenblatt');
  assert.equal(e.gesiegeltAm, '2026-11-24');
  assert.equal(e.geprueftAm, '2026-11-24');
  assert.match(e.pruefsumme, /^[0-9a-f]{64}$/);
  assert.equal(Object.keys(e.felder).length, 7);
  assert.equal(await t.run(['pruefen']), 0);
  await rm(t.wurzel, { recursive: true });
});

const bricht = async (aendere, feld) => {
  const a = artikel('expressions_nell');
  const t = await baue({ expressions_nell: a });
  await t.run(['setzen', 'expressions_nell', '--von', 'Remo']);
  const b = structuredClone(a);
  aendere(b);
  await t.schreibeInhalt({ expressions_nell: b });
  t.zeilen.length = 0;
  const code = await t.run(['pruefen']);
  await rm(t.wurzel, { recursive: true });
  return { code, ausgabe: t.zeilen.join('\n'), feld };
};

test('Änderung an text bricht das Siegel und nennt das Feld und den Befehl', async () => {
  const r = await bricht((b) => { b.text = 'Das Nell ist die Neun im Trumpf.'; });
  assert.equal(r.code, 1);
  assert.match(r.ausgabe, /Geändert: text$/m);
  assert.match(r.ausgabe, /node siegel\.mjs setzen expressions_nell --von "<wer und wann>"/);
});

test('Änderung an einer FAQ bricht das Siegel und nennt faqs', async () => {
  const r = await bricht((b) => { b.faqs[0].answer = 'Die Neun im Trumpf.'; });
  assert.equal(r.code, 1);
  assert.match(r.ausgabe, /Geändert: faqs$/m);
});

test('Änderung an see_also bricht das Siegel und nennt see_also', async () => {
  const r = await bricht((b) => { b.see_also.push('expressions_obenabe'); });
  assert.equal(r.code, 1);
  assert.match(r.ausgabe, /Geändert: see_also$/m);
});

test('dateModified und Leerraum an den Rändern brechen das Siegel nicht', async () => {
  const r = await bricht((b) => {
    b.metadata.dateModified = '2026-12-01';
    b.text = `  ${b.text}\n`;
  });
  assert.equal(r.code, 0);
});

test('fehlender Artikel bricht das Siegel', async () => {
  const t = await baue({ expressions_nell: artikel('expressions_nell'), b: artikel('b') });
  await t.run(['setzen', 'expressions_nell', '--von', 'Remo']);
  await t.schreibeInhalt({ b: artikel('b') });
  t.zeilen.length = 0;
  assert.equal(await t.run(['pruefen']), 1);
  assert.match(t.zeilen.join('\n'), /fehlt in der Inhaltsdatei/);
  await rm(t.wurzel, { recursive: true });
});

test('setzen ohne --von scheitert, unbekannte Kennung auch', async () => {
  const t = await baue({ expressions_nell: artikel('expressions_nell') });
  assert.equal(await t.run(['setzen', 'expressions_nell']), 1);
  assert.equal(await t.run(['setzen', 'expressions_nell', '--von', '  ']), 1);
  assert.equal(await t.run(['setzen', 'gibt_es_nicht', '--von', 'Remo']), 1);
  await rm(t.wurzel, { recursive: true });
});

test('neu siegeln überschreibt und bewahrt den alten Eintrag in frueher', async () => {
  const a = artikel('expressions_nell');
  const t = await baue({ expressions_nell: a });
  await t.run(['setzen', 'expressions_nell', '--von', 'Remo 24.11.2026'], '2026-11-24');
  const alt = (await t.buch()).expressions_nell;
  await t.schreibeInhalt({ expressions_nell: { ...a, text: 'Korrigiert.' } });
  assert.equal(await t.run(['pruefen']), 1);
  assert.equal(await t.run(['setzen', 'expressions_nell', '--von', 'SCHIRI 30.11.2026'], '2026-11-30'), 0);
  const neu = (await t.buch()).expressions_nell;
  assert.equal(neu.von, 'SCHIRI 30.11.2026');
  assert.deepEqual(neu.frueher, [{ pruefsumme: alt.pruefsumme, gesiegeltAm: '2026-11-24', von: 'Remo 24.11.2026' }]);
  assert.equal(await t.run(['pruefen']), 0);
  await rm(t.wurzel, { recursive: true });
});

test('verfall meldet Jassapps nach 90 Tagen, Siegel nach 365, hält nie an', async () => {
  const t = await baue({
    app_a: artikel('app_a', 'Jassapps'),
    app_b: artikel('app_b', 'Jassapps'),
    regel: artikel('regel', 'Regeln'),
  });
  await t.run(['setzen', 'app_a', '--von', 'Remo'], '2026-01-01');
  await t.run(['setzen', 'regel', '--von', 'Remo'], '2026-01-01');
  t.zeilen.length = 0;
  assert.equal(await t.run(['verfall'], '2026-03-15'), 0); // 73 Tage
  let text = t.zeilen.join('\n');
  assert.doesNotMatch(text, /app_a/);
  assert.match(text, /app_b · Rubrik Jassapps, noch nie geprüft/);
  t.zeilen.length = 0;
  assert.equal(await t.run(['verfall'], '2026-04-05'), 0); // 94 Tage
  text = t.zeilen.join('\n');
  assert.match(text, /app_a · Rubrik Jassapps, geprüft am 2026-01-01 \(94 Tage\)/);
  assert.doesNotMatch(text, /regel/);
  t.zeilen.length = 0;
  await t.run(['verfall'], '2027-01-05');
  assert.match(t.zeilen.join('\n'), /regel · Siegel, geprüft am 2026-01-01/);
  await rm(t.wurzel, { recursive: true });
});

test('Teilsumme je Feld: nur das geänderte Feld weicht ab', () => {
  const a = artikel('x');
  const b = structuredClone(a);
  b.metadata.category.topic = 'Näll';
  const sa = summen(a).felder;
  const sb = summen(b).felder;
  assert.deepEqual(Object.keys(sa).filter((f) => sa[f] !== sb[f]), ['metadata.category']);
});

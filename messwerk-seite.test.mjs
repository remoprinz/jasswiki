/**
 * Tests zum Messwerk (messwerk-seite.mjs). Die Auswertung läuft ohne Browser.
 * Der Browser-Test misst eine kleine Attrappe aus einem Temp-Ordner und wird
 * übersprungen, wenn auf dem Rechner kein Browser liegt.
 *
 *   npm run test:riegel
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { urteile, exitCode, lauf, findeChrome, ladePlaywright } from './messwerk-seite.mjs';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));
const budget = JSON.parse(await readFile(path.join(WURZEL, 'seitenbudget.json'), 'utf-8'));

const messung = (bausteine, mehr = {}) => ({
  seitenHoehe: 4000,
  bildschirm: 844,
  breite: 390,
  scrollBreite: 390,
  ersterAbsatzOben: 300,
  ohneBausteine: false,
  bausteine: Object.entries(bausteine).map(([name, hoehe]) => ({ name, hoehe })),
  ...mehr,
});

test('Vorgabe im Budget: hart ist false', () => {
  assert.equal(budget.hart, false);
  assert.equal(budget.handy.hoehe, 844);
});

test('Seite im Budget: kein Verstoss, Kennzahlen gerechnet', () => {
  const u = urteile(messung({ kopf: 200, text: 2500, ueben: 300, fragen: 400, verweise: 250, fuss: 900 }), budget);
  assert.deepEqual(u.verstoesse, []);
  assert.equal(u.kennzahlen.summeBildschirme, 1.36); // 1150 / 844
  assert.equal(u.kennzahlen.textAnteil, 0.63); // 2500 / 4000
  assert.equal(u.kennzahlen.ersterSatzImErstenBildschirm, true);
});

test('text und fuss zählen nicht, ein einzelner Baustein über 0,6 ist ein Verstoss', () => {
  const u = urteile(messung({ text: 9000, fuss: 2000, fragen: 600 }), budget);
  assert.deepEqual(u.verstoesse, ['Baustein «fragen» 0.71 Bildschirme (höchstens 0.6)']);
});

test('Summe über 1,5 Bildschirme ist ein Verstoss', () => {
  const u = urteile(messung({ kopf: 400, ueben: 450, tuer: 300, fragen: 300, rueckmeldung: 100 }), budget);
  assert.equal(u.kennzahlen.summeBildschirme, 1.84);
  assert.equal(u.verstoesse.length, 1);
  assert.match(u.verstoesse[0], /zusammen 1\.84 Bildschirme/);
});

test('erster Absatz unter dem ersten Bildschirm und waagrechtes Scrollen', () => {
  const u = urteile(messung({ text: 1000 }, { ersterAbsatzOben: 900, scrollBreite: 420 }), budget);
  assert.equal(u.verstoesse.length, 2);
  assert.match(u.verstoesse.join('\n'), /erster Absatz beginnt bei 900 px/);
  assert.match(u.verstoesse.join('\n'), /waagrechtes Scrollen: 420 px/);
});

test('ohne Bausteinmerkmale: Hinweis, misst das Übrige', () => {
  const u = urteile(messung({}, { ohneBausteine: true, ersterAbsatzOben: 1200 }), budget);
  assert.deepEqual(u.hinweise, ['ohne Bausteinmerkmale: Bausteinbudget nicht messbar']);
  assert.equal(u.verstoesse.length, 1);
  assert.equal(u.kennzahlen.textAnteil, null);
});

test('Exit: als Hinweis immer 0, hart 1 bei Verstoss, --nur-messen immer 0', () => {
  const schlecht = [{ verstoesse: ['x'] }];
  const gut = [{ verstoesse: [] }];
  assert.equal(exitCode(schlecht, { hart: false }), 0);
  assert.equal(exitCode(schlecht, { hart: true }), 1);
  assert.equal(exitCode(gut, { hart: true }), 0);
  assert.equal(exitCode(schlecht, { hart: true, nurMessen: true }), 0);
});

test('ohne Browser endet das Messwerk mit Exit 2', async () => {
  const zeilen = [];
  const code = await lauf(['/x/'], { env: { MESSWERK_PLAYWRIGHT: '/gibt/es/nicht', MESSWERK_CHROME: '/gibt/es/nicht' }, ausgabe: (z) => zeilen.push(z) });
  assert.equal(code, 2);
  assert.match(zeilen.join('\n'), /kein Browser/);
});

const browserDa = Boolean(ladePlaywright() && (await findeChrome()));

test('Browser: misst Bausteine, klappt offene Fragen zu, zählt jassguru.ch', { skip: !browserDa && 'kein Browser auf diesem Rechner' }, async () => {
  const wurzel = await mkdtemp(path.join(tmpdir(), 'messwerk-'));
  await mkdir(path.join(wurzel, 'out/muster'), { recursive: true });
  await writeFile(path.join(wurzel, 'seitenbudget.json'), JSON.stringify({ ...budget, hart: true }));
  const frage = (i, offen) =>
    `<div><button aria-expanded="${offen}" aria-controls="a${i}" onclick="const o=this.getAttribute('aria-expanded')==='true';this.setAttribute('aria-expanded',String(!o));document.getElementById('a${i}').style.display=o?'none':'block'">F${i}</button>` +
    `<div id="a${i}" style="height:400px;display:${offen ? 'block' : 'none'}">A</div></div>`;
  await writeFile(
    path.join(wurzel, 'out/muster/index.html'),
    `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width"><style>body,p{margin:0}</style></head><body>
      <header data-baustein="kopf" style="height:200px">Kopf</header>
      <article data-baustein="text" style="height:1500px"><p>Erster Satz.</p></article>
      <section data-baustein="fragen">${frage(0, true)}${frage(1, false)}${frage(2, false)}</section>
      <div data-baustein="tuer" style="height:100px"><a href="https://jassguru.ch/online-jassen/">Spielen</a></div>
      <footer data-baustein="fuss" style="height:600px"><a href="https://www.jassguru.ch/">JassGuru</a></footer>
    </body></html>`,
  );
  const zeilen = [];
  const code = await lauf(['--json', '/muster/'], { wurzel, ausgabe: (z) => zeilen.push(z) });
  const { ergebnisse } = JSON.parse(zeilen.join('\n'));
  const h = ergebnisse[0].handy;
  assert.equal(h.zugeklappt, 1);
  assert.equal(h.fragen, 3);
  assert.equal(h.jassguruVerweise, 2);
  assert.equal(h.ersterAbsatzOben, 200);
  assert.equal(h.ohneBausteine, false);
  assert.ok(h.auslieferung.seitenHoehe - h.seitenHoehe >= 400, 'ausgeliefert steht die erste Frage offen');
  assert.deepEqual(h.bausteine.map((b) => b.name), ['kopf', 'text', 'fragen', 'tuer', 'fuss']);
  assert.equal(code, 0); // 200 + Fragen zu + 100 bleibt unter dem Budget
  await rm(wurzel, { recursive: true });
});

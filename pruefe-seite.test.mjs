/**
 * Tests zum Seitenprüfer (pruefe-seite.mjs). Jede Prüfung hat einen Treffer und
 * einen sauberen Fall, dazu die Sperrklinke. Die Seiten sind kleine HTML-Attrappen
 * in einem Temp-Ordner; Netzabrufe laufen über einen eingesetzten Abruf.
 *
 *   npm run test:riegel
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { pruefe, lauf, sichtbarerText, firebaseMuster, altlastZeilen, vergleiche } from './pruefe-seite.mjs';

const seite = (body, head = '') =>
  `<!DOCTYPE html><html><head><title>Testseite</title>${head}</head><body>${body}</body></html>`;

/** Baut einen Wurzelordner mit out/, Inhaltsdatei und firebase.json. */
const baue = async ({ seiten = {}, dateien = {}, inhalt = {}, redirects = [] } = {}) => {
  const wurzel = await mkdtemp(path.join(tmpdir(), 'pruefe-seite-'));
  const schreibe = async (rel, text) => {
    const ziel = path.join(wurzel, rel);
    await mkdir(path.dirname(ziel), { recursive: true });
    await writeFile(ziel, text);
  };
  for (const [rel, html] of Object.entries(seiten)) await schreibe(path.join('out', rel), html);
  for (const [rel, text] of Object.entries(dateien)) await schreibe(path.join('out', rel), text);
  await schreibe('src/data/jass-content-v2.json', JSON.stringify(inhalt));
  await schreibe('firebase.json', JSON.stringify({ hosting: [{ target: 'jasswiki', redirects }] }));
  return wurzel;
};

const ohneNetz = (wurzel) => pruefe({ wurzel, mitNetz: false });
const nur = (funde, kennung) => funde.filter((f) => f.pruefung.startsWith(kennung));

test('sichtbarer Text lässt script, style, noscript und JSON-LD weg', () => {
  const html = seite(
    '<p>Sichtbar</p><script>var a = "— versteckt";</script><style>.x{content:"—"}</style>' +
      '<noscript>— auch weg</noscript><script type="application/ld+json">{"a":"—"}</script>',
  );
  const text = sichtbarerText(html);
  assert.match(text, /Sichtbar/);
  assert.doesNotMatch(text, /—/);
});

test('A1 Gedankenstrich: Treffer und sauberer Fall', async () => {
  const wurzel = await baue({
    seiten: {
      'index.html': seite('<p>Jassen — das Spiel</p><p>Satz eins – Satz zwei</p>'),
      'sauber/index.html': seite('<p>Seiten 133–148, Jahre 1940–1945, Jass-Elo.</p>'),
    },
  });
  const { funde } = await ohneNetz(wurzel);
  const a1 = nur(funde, 'A1');
  assert.equal(a1.length, 2);
  assert.ok(a1.every((f) => f.pfad === '/'));
  assert.match(a1[0].stelle, /Jassen — das Spiel/);
  await rm(wurzel, { recursive: true });
});

test('A2 Fremdwort und Wendung aus den Sprachlisten', async () => {
  const wurzel = await baue({
    seiten: {
      'a/index.html': seite('<p>Reihum spielt jede Person.</p><p>Er nimmt den Tisch.</p>'),
      'b/index.html': seite('<p>Der Reihe nach spielt jede Person aus.</p>'),
    },
  });
  const { funde } = await ohneNetz(wurzel);
  const a2 = nur(funde, 'A2');
  assert.deepEqual(a2.map((f) => [f.pfad, f.pruefung]).sort(), [
    ['/a/', 'A2 Fremdwort'],
    ['/a/', 'A2 Wendung'],
  ]);
  await rm(wurzel, { recursive: true });
});

test('A3 rohe Marken', async () => {
  const wurzel = await baue({
    seiten: {
      'a/index.html': seite('<p>Der Stock (siehe Begriff "stock") und [[karten: eichel-6]] und [x](/y) (ID: 4)</p>'),
      'b/index.html': seite('<p>Der <a href="/b/">Stock</a> zählt zwanzig.</p>'),
    },
  });
  const { funde } = await ohneNetz(wurzel);
  const a3 = nur(funde, 'A3');
  assert.equal(a3.length, 4);
  assert.ok(a3.every((f) => f.pfad === '/a/'));
  await rm(wurzel, { recursive: true });
});

test('B1 interne Verweise: gebaut, Weiterleitung, ins Leere', async () => {
  const wurzel = await baue({
    seiten: {
      'index.html': seite(
        '<a href="/da/">da</a><a href="https://jasswiki.ch/da/#x">da</a><a href="/alt/">alt</a>' +
          '<a href="/ansagen/a/b/">muster</a><a href="/llms.txt">datei</a><a href="https://example.com/">fremd</a>' +
          '<a href="/fehlt/">fehlt</a><a href="https://jasswiki.ch/auch-weg/">weg</a>',
      ),
      'da/index.html': seite('<p>da</p>'),
    },
    dateien: { 'llms.txt': 'Liste' },
    redirects: [
      { source: '/alt/', destination: '/da/', type: 301 },
      { source: '/ansagen/:sub/:topic/', destination: '/ansagen/:topic/', type: 301 },
    ],
  });
  const { funde } = await ohneNetz(wurzel);
  assert.deepEqual(nur(funde, 'B1').map((f) => f.wort).sort(), ['/auch-weg/', '/fehlt/']);
  await rm(wurzel, { recursive: true });
});

test('Firebase-Muster', () => {
  assert.ok(firebaseMuster('/ansagen/:sub/:topic').test('/ansagen/x/y'));
  assert.ok(!firebaseMuster('/ansagen/:sub/:topic').test('/ansagen/x/y/z'));
  assert.ok(firebaseMuster('/mcp/**').test('/mcp/a/b'));
});

test('B2 «Siehe auch» Kennung für Kennung, in der Reihenfolge der Datei', async () => {
  const inhalt = {
    a: { id: 'a', see_also: ['b', 'c', 'a'] },
    b: { id: 'b', see_also: ['a', 'c'] },
    c: { id: 'c', see_also: ['a'] },
    d: { id: 'd', see_also: ['a', 'b'] },
  };
  const liste = (...ids) => `<div data-siehe-auch="">${ids.map((id) => `<a href="/${id}/" data-artikel="${id}">${id}</a>`).join('')}</div>`;
  const wurzel = await baue({
    inhalt,
    seiten: {
      // sauber: der Artikel selbst zählt nicht
      'a/index.html': seite(`<article data-artikel-seite="a"></article>${liste('b', 'c')}`),
      // verkehrte Reihenfolge
      'b/index.html': seite(`<article data-artikel-seite="b"></article>${liste('c', 'a')}`),
      // anderes Ziel: zu viel und fehlt
      'c/index.html': seite(`<article data-artikel-seite="c"></article>${liste('d')}`),
      // Liste fehlt ganz
      'd/index.html': seite('<article data-artikel-seite="d"></article>'),
    },
  });
  const { funde, artikelseiten } = await ohneNetz(wurzel);
  assert.equal(artikelseiten, 4);
  const b2 = nur(funde, 'B2').map((f) => `${f.pfad} ${f.wort}`).sort();
  assert.deepEqual(b2, [
    '/b/ Reihenfolge',
    '/c/ fehlt «a»',
    '/c/ zu viel «d»',
    '/d/ fehlt «a»',
    '/d/ fehlt «b»',
  ]);
  await rm(wurzel, { recursive: true });
});

test('C1 lokale Medien liegen in out/', async () => {
  const wurzel = await baue({
    seiten: {
      'index.html': seite(
        '<img src="/bild.png"><img src="/weg.png"><picture><source srcset="/klein.avif 1x, /gross.avif 3x"></picture>' +
          '<video poster="/deck.jpg"><source src="/film.mp4"></video>',
        '<meta property="og:image" content="https://jasswiki.ch/og/start.png">',
      ),
    },
    dateien: { 'bild.png': 'x', 'klein.avif': 'x', 'deck.jpg': 'x', 'og/start.png': 'x' },
  });
  const { funde } = await ohneNetz(wurzel);
  assert.deepEqual(nur(funde, 'C1').map((f) => f.wort).sort(), ['/film.mp4', '/gross.avif', '/weg.png']);
  await rm(wurzel, { recursive: true });
});

test('C2 fremde Medien: 200 und 206 gut, 404 und Netzfehler Fund, jede Adresse einmal', async () => {
  const wurzel = await baue({
    seiten: {
      'a/index.html': seite('<img src="https://x.test/ok.png"><video poster="https://x.test/teil.jpg"><source src="https://x.test/tot.mp4"></video>'),
      'b/index.html': seite('<img src="https://x.test/ok.png"><img src="https://x.test/netz.png">'),
    },
  });
  const abrufe = [];
  const abruf = async (url, optionen) => {
    abrufe.push(url);
    assert.equal(optionen.headers.Range, 'bytes=0-50');
    if (url.endsWith('netz.png')) throw new Error('ECONNRESET');
    const status = { 'https://x.test/ok.png': 200, 'https://x.test/teil.jpg': 206 }[url] ?? 404;
    return { status, body: null };
  };
  const { funde } = await pruefe({ wurzel, abruf });
  assert.deepEqual(nur(funde, 'C2').map((f) => `${f.pfad} ${f.wort}`).sort(), [
    '/a/ https://x.test/tot.mp4 · antwortet 404',
    '/b/ https://x.test/netz.png · nicht erreichbar',
  ]);
  assert.equal(abrufe.filter((u) => u.endsWith('ok.png')).length, 1);
  assert.equal(abrufe.filter((u) => u.endsWith('netz.png')).length, 3); // zwei Wiederholungen
  const ohne = await pruefe({ wurzel, mitNetz: false, abruf: () => assert.fail('Abruf ohne Netz') });
  assert.equal(nur(ohne.funde, 'C2').length, 0);
  await rm(wurzel, { recursive: true });
});

test('D gesperrte Behauptung in Korpus, llms, JSON-LD; sauberer Fall', async () => {
  const wurzel = await baue({
    seiten: {
      'a/index.html': seite('<p>Text</p>', '<script type="application/ld+json">{"description":"Government-Verified source"}</script>'),
      'b/index.html': seite('<p>Vom Verband geführt.</p>', '<script type="application/ld+json">{"description":"Jasswiki"}</script>'),
    },
    dateien: {
      'dataset/jasswiki-corpus.jsonl': '{"t":"Verifiziert durch das BAK"}\n{"t":"sauber"}\n',
      'llms.txt': 'Offiziell anerkannt seit gestern',
      'llms-regeln.md': 'Regeln, sauber',
    },
  });
  const { funde } = await ohneNetz(wurzel);
  assert.deepEqual(nur(funde, 'D').map((f) => f.pfad).sort(), ['/a/', '/dataset/jasswiki-corpus.jsonl', '/llms.txt']);
  await rm(wurzel, { recursive: true });
});

test('Sperrklinke: Altlast lässt durch, neuer Fund hält an', async () => {
  const wurzel = await baue({ seiten: { 'index.html': seite('<p>Eins — zwei</p>') } });
  const altlastDatei = path.join(wurzel, 'altlast.json');
  const still = () => {};

  assert.equal(await lauf(['--ohne-netz', '--altlast-neu'], { wurzel, altlastDatei, ausgabe: still }), 0);
  assert.deepEqual(JSON.parse(await readFile(altlastDatei, 'utf-8')), ['/ | A1 Gedankenstrich | «—»']);
  assert.equal(await lauf(['--ohne-netz'], { wurzel, altlastDatei, ausgabe: still }), 0);

  // ein zweiter Strich auf derselben Seite ist neu
  await writeFile(path.join(wurzel, 'out/index.html'), seite('<p>Eins — zwei — drei</p>'));
  const zeilen = [];
  assert.equal(await lauf(['--ohne-netz'], { wurzel, altlastDatei, ausgabe: (z) => zeilen.push(z) }), 1);
  assert.ok(zeilen.some((z) => z.includes('NEUE')));

  // ein umformulierter Nachbarsatz mit demselben alten Strich ist es nicht
  await writeFile(path.join(wurzel, 'out/index.html'), seite('<p>Ganz anders — umgeschrieben</p>'));
  assert.equal(await lauf(['--ohne-netz'], { wurzel, altlastDatei, ausgabe: still }), 0);
  await rm(wurzel, { recursive: true });
});

test('C2 meldet im Bau und hält allein mit --netz-hart an', async () => {
  const wurzel = await baue({ seiten: { 'index.html': seite('<img src="https://x.test/tot.png">') } });
  const altlastDatei = path.join(wurzel, 'altlast.json');
  const abruf = async () => ({ status: 404, body: null });
  const zeilen = [];
  const sag = (z) => zeilen.push(z);

  assert.equal(await lauf([], { wurzel, altlastDatei, abruf, ausgabe: sag }), 0);
  assert.ok(zeilen.some((z) => z.includes('C2 meldet')));
  assert.ok(!zeilen.some((z) => z.includes('NEUE')));
  assert.equal(await lauf(['--netz-hart'], { wurzel, altlastDatei, abruf, ausgabe: () => {} }), 1);
  await rm(wurzel, { recursive: true });
});

test('Sperrklinke: ohne Netz bleibt der C2-Bestand stehen', () => {
  const fundC2 = { pfad: '/a/', pruefung: 'C2 Medium antwortet nicht', wort: 'https://x.test/tot.mp4 · antwortet 404' };
  const altlast = altlastZeilen([fundC2]);
  assert.deepEqual(vergleiche([], altlast, { ohneNetz: true }).behoben, []);
  assert.equal(vergleiche([], altlast).behoben.length, 1);
});

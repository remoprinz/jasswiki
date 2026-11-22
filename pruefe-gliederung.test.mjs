import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pruefeGliederung } from './pruefe-gliederung.mjs';

const art = (id, adresse) => ({ id, metadata: { adresse } });
const inhalt = {
  a: art('a', '/r/a/'), b: art('b', '/r/b/'), c: art('c', '/r/c/'), d: art('d', '/r/d/'), e: art('e', '/e/'),
};
const gut = () => ({
  einstieg: { name: 'E', adresse: '/e/', artikel: 'e' },
  rubriken: [{ name: 'R', adresse: '/r/', eintraege: [{ kapitel: 'K', adresse: '/r/k/', artikel: ['a', { id: 'd', gehtAufIn: 'a' }, 'b', 'c', { verweis: 'a' }] }] }],
});

test('gültige Gliederung besteht', () => {
  const e = pruefeGliederung(gut(), inhalt);
  assert.deepEqual(e.fehler, []);
  assert.equal(e.haupt, 4);
  assert.equal(e.aufgehend, 1);
  assert.equal(e.verweise, 1);
});

test('fehlende, doppelte und unbekannte Kennung', () => {
  const g = gut();
  g.rubriken[0].eintraege[0].artikel = ['a', 'a', 'b', 'c', 'x'];
  const f = pruefeGliederung(g, inhalt).fehler.join('\n');
  assert.match(f, /«a» steht schon/);
  assert.match(f, /unbekannte Kennung «x»/);
  assert.match(f, /«d» fehlt/);
});

test('Kapitel unter drei Artikeln hält an, ausser erlaubt', () => {
  const g = gut();
  g.rubriken[0].eintraege[0].artikel = ['a', 'b', { id: 'c', gehtAufIn: 'b' }, { id: 'd', gehtAufIn: 'b' }];
  assert.match(pruefeGliederung(g, inhalt).fehler.join('\n'), /2 Artikel, mindestens drei/);
  g.rubriken[0].eintraege[0].kleinErlaubt = true;
  const e = pruefeGliederung(g, inhalt);
  assert.deepEqual(e.fehler, []);
  assert.equal(e.kleine.length, 1);
});

test('gehtAufIn muss hinter dem Ziel stehen, Verweis auf Bestehendes', () => {
  const g = gut();
  g.rubriken[0].eintraege[0].artikel = ['a', 'b', { id: 'd', gehtAufIn: 'a' }, 'c', { verweis: 'y' }];
  const f = pruefeGliederung(g, inhalt).fehler.join('\n');
  assert.match(f, /steht aber hinter «b»/);
  assert.match(f, /Verweis auf unbekannte Kennung «y»/);
});

test('Kapiteladresse darf allein dem ersten Artikel gehören', () => {
  const g = gut();
  g.rubriken[0].eintraege[0].adresse = '/r/b/';
  assert.match(pruefeGliederung(g, inhalt).fehler.join('\n'), /gehört dem Artikel b/);
  g.rubriken[0].eintraege[0].adresse = '/r/a/';
  assert.deepEqual(pruefeGliederung(g, inhalt).fehler, []);
});

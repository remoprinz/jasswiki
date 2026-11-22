#!/usr/bin/env node
/**
 * Probe der Gliederung (Schritt 2, 22.11.2026). Riegel im Bau: hält an.
 *
 * src/data/gliederung.json bestimmt Ort und Reihenfolge jedes Artikels in
 * Seitenleiste, Rubrikseiten, Kapitelseiten und Brotkrumen. Die Adresse
 * steht fest im Artikel (metadata.adresse) und hängt nicht an der Gliederung.
 *
 * Geprüft:
 *  - jede Kennung der Inhaltsdatei steht genau einmal als Artikel
 *    (Verweise zählen gesondert und zeigen auf eine bestehende Kennung),
 *  - keine unbekannte Kennung,
 *  - kein leeres Kapitel, kein Kapitel mit weniger als drei Artikeln
 *    (aufgehende und Verweise zählen nicht), ausser es trägt "kleinErlaubt",
 *  - gehtAufIn zeigt auf eine Kennung im selben Kapitel, die direkt davor
 *    steht (oder auf eine Seite der Gliederung),
 *  - Adressen von Rubriken und Kapiteln sind eindeutig; eine Kapiteladresse
 *    darf allein die Adresse ihres ersten Artikels sein.
 *
 *   node pruefe-gliederung.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));

export const pruefeGliederung = (gliederung, inhalt) => {
  const fehler = [];
  const artikelOrt = new Map(); // id → Ort
  const verweise = [];
  const seiten = new Map(); // adresse → Bezeichnung
  const artikelAdressen = new Map(Object.values(inhalt).map((a) => [a.metadata?.adresse, a.id]));
  let haupt = 0;
  let aufgehend = 0;

  const merkeSeite = (adresse, wer, erlaubterArtikel) => {
    if (typeof adresse !== 'string' || !/^\/([a-z0-9-]+\/)+$/.test(adresse)) {
      fehler.push(`${wer}: Adresse «${adresse}» ungültig`);
      return;
    }
    if (seiten.has(adresse)) fehler.push(`${wer}: Adresse ${adresse} doppelt (auch ${seiten.get(adresse)})`);
    seiten.set(adresse, wer);
    const artikel = artikelAdressen.get(adresse);
    if (artikel && artikel !== erlaubterArtikel) {
      fehler.push(`${wer}: Adresse ${adresse} gehört dem Artikel ${artikel}`);
    }
  };

  const merkeArtikel = (id, ort) => {
    if (!inhalt[id]) {
      fehler.push(`${ort}: unbekannte Kennung «${id}»`);
      return;
    }
    if (artikelOrt.has(id)) fehler.push(`${ort}: «${id}» steht schon in ${artikelOrt.get(id)}`);
    artikelOrt.set(id, ort);
  };

  const liste = (eintraege, ort) => {
    let hauptHier = 0;
    let letzteHaupt = null;
    for (const e of eintraege) {
      if (typeof e === 'string') {
        merkeArtikel(e, ort);
        haupt++;
        hauptHier++;
        letzteHaupt = e;
      } else if (e && typeof e.id === 'string') {
        merkeArtikel(e.id, ort);
        if (typeof e.gehtAufIn !== 'string' || !e.gehtAufIn) {
          fehler.push(`${ort}: «${e.id}» ohne gehtAufIn`);
        } else if (e.gehtAufIn.startsWith('/')) {
          // Ziel ist eine Seite; geprüft, sobald alle Seiten bekannt sind.
          verweise.push({ seite: e.gehtAufIn, ort: `${ort} (${e.id})` });
        } else if (e.gehtAufIn !== letzteHaupt) {
          fehler.push(`${ort}: «${e.id}» geht auf in «${e.gehtAufIn}», steht aber hinter «${letzteHaupt ?? 'nichts'}»`);
        }
        aufgehend++;
      } else if (e && typeof e.verweis === 'string') {
        verweise.push({ id: e.verweis, ort });
      } else if (e && typeof e.kapitel === 'string') {
        fehler.push(`${ort}: Kapitel «${e.kapitel}» steht in einem Kapitel`);
      } else {
        fehler.push(`${ort}: Eintrag ohne Form ${JSON.stringify(e)}`);
      }
    }
    return hauptHier;
  };

  const einstieg = gliederung.einstieg;
  if (!einstieg?.artikel) fehler.push('Einstiegsseite fehlt');
  else {
    merkeArtikel(einstieg.artikel, 'Einstieg');
    haupt++;
    merkeSeite(einstieg.adresse, 'Einstieg', einstieg.artikel);
  }

  const kleine = [];
  for (const r of gliederung.rubriken || []) {
    if (!r.name) fehler.push('Rubrik ohne Namen');
    merkeSeite(r.adresse, `Rubrik ${r.name}`, null);
    const lose = [];
    for (const e of r.eintraege || []) {
      if (e && typeof e.kapitel === 'string') {
        const ort = `${r.name} › ${e.kapitel}`;
        const artikel = e.artikel || [];
        if (artikel.length === 0) fehler.push(`${ort}: leeres Kapitel`);
        const erster = artikel.find((a) => typeof a === 'string');
        if (e.adresse) merkeSeite(e.adresse, `Kapitel ${ort}`, erster);
        const n = liste(artikel, ort);
        if (n < 3) {
          if (e.kleinErlaubt) kleine.push(`${ort} (${n})`);
          else fehler.push(`${ort}: ${n} Artikel, mindestens drei`);
        }
      } else {
        lose.push(e);
      }
    }
    liste(lose, r.name);
  }

  for (const v of verweise) {
    if (v.id && !inhalt[v.id]) fehler.push(`${v.ort}: Verweis auf unbekannte Kennung «${v.id}»`);
    if (v.id && !artikelOrt.has(v.id)) fehler.push(`${v.ort}: Verweis auf «${v.id}», der nirgends als Artikel steht`);
    if (v.seite && !seiten.has(v.seite)) fehler.push(`${v.ort}: geht auf in ${v.seite}, keine Seite der Gliederung`);
  }

  for (const id of Object.keys(inhalt)) {
    if (!artikelOrt.has(id)) fehler.push(`«${id}» fehlt in der Gliederung`);
  }

  return {
    fehler,
    kleine,
    haupt,
    aufgehend,
    verweise: verweise.filter((v) => v.id).length,
    artikel: artikelOrt.size,
    kennungen: Object.keys(inhalt).length,
  };
};

const istHaupt = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (istHaupt) {
  const gliederung = JSON.parse(fs.readFileSync(path.join(WURZEL, 'src/data/gliederung.json'), 'utf8'));
  const inhalt = JSON.parse(fs.readFileSync(path.join(WURZEL, 'src/data/jass-content-v2.json'), 'utf8'));
  const e = pruefeGliederung(gliederung, inhalt);
  console.log('🔎 Gliederung');
  console.log(`   ${e.artikel} von ${e.kennungen} Kennungen je genau einmal: ${e.haupt} im Baum, ${e.aufgehend} gehen auf, ${e.verweise} Verweise`);
  if (e.kleine.length) console.log(`   Kapitel unter drei Artikeln (erlaubt): ${e.kleine.join(', ')}`);
  if (e.fehler.length) {
    console.error(`\n❌ Gliederung: ${e.fehler.length} Fehler`);
    for (const f of e.fehler) console.error(`   ${f}`);
    process.exit(1);
  }
  console.log('✅ Gliederung: Probe bestanden.');
}

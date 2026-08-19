/**
 * JassWiki Artikel-Verzeichnis
 *
 * Erzeugt `public/artikel.json` — ein schlankes, öffentliches Verzeichnis aller
 * Artikel für fremde Oberflächen, die einen Artikel auswählen lassen wollen
 * (erster Nutzer: der Blatt-Editor der Arena auf jassguru.ch).
 *
 * Format (kurze Schlüssel, damit die Datei klein bleibt):
 *   { "stand": "JJJJ-MM-TT",
 *     "artikel": [ { "t": Titel, "u": kanonische Adresse, "k": Rubrik,
 *                    "s": [Synonyme] } ] }
 *
 * Herkunft jedes Feldes — alles kommt aus dem Bestand, nichts wird erfunden:
 *   t = metadata.category.topic  (dasselbe, was der Artikel als H1 zeigt)
 *   u = buildCanonicalUrl(category)  (dieselbe Funktion wie Sitemap und Korpus)
 *   k = metadata.category.main
 *   s = metadata.synonyms, sofern der Artikel welche trägt
 *
 * `stand` ist das jüngste dateModified im Bestand. Damit ändert sich die Datei
 * genau dann, wenn sich der Bestand ändert — ein Build allein erzeugt keine
 * neue Fassung.
 *
 * Die Datei wird mit `Access-Control-Allow-Origin: *` ausgeliefert
 * (siehe firebase.json), damit jassguru.ch sie lesen kann.
 *
 * Aufruf: node generate-artikel.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildCanonicalUrl, validateUrl } from './url-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JSON_FILE = path.resolve(__dirname, 'src/data/jass-content-v2.json');
const ZIEL_PUBLIC = path.resolve(__dirname, 'public/artikel.json');
const ZIEL_OUT = path.resolve(__dirname, 'out/artikel.json');
const BASIS_URL = 'https://jasswiki.ch';
const DATUM_MUSTER = /^\d{4}-\d{2}-\d{2}$/;

const sammler = new Intl.Collator('de-CH', { sensitivity: 'base' });

async function generiereArtikelVerzeichnis() {
  console.log('🚀 Starte Artikel-Verzeichnis…');

  const rohtext = await fs.readFile(JSON_FILE, 'utf-8');
  const bestand = JSON.parse(rohtext);
  const artikel = Object.values(bestand);

  console.log(`✅ ${artikel.length} Artikel aus dem Bestand geladen.`);

  const fehler = [];
  const belegteAdressen = new Map();
  const eintraege = [];
  let stand = '';

  for (const eintrag of artikel) {
    const kennung = eintrag.id || '(ohne id)';
    const kategorie = eintrag?.metadata?.category;

    if (!kategorie?.main || !kategorie?.sub || !kategorie?.topic) {
      fehler.push(`${kennung}: Kategorie unvollständig`);
      continue;
    }

    const adresse = buildCanonicalUrl(kategorie, BASIS_URL);
    const pfad = adresse.replace(BASIS_URL, '');
    const pruefung = validateUrl(pfad);

    if (!pruefung.isValid) {
      fehler.push(`${kennung}: ${pruefung.error}`);
      continue;
    }

    const schonBelegt = belegteAdressen.get(adresse);
    if (schonBelegt) {
      fehler.push(`${kennung}: Adresse ${adresse} gehört schon ${schonBelegt}`);
      continue;
    }
    belegteAdressen.set(adresse, kennung);

    const datum = eintrag?.metadata?.dateModified || '';
    if (DATUM_MUSTER.test(datum) && datum > stand) stand = datum;

    const zeile = { t: kategorie.topic, u: adresse, k: kategorie.main };

    const synonyme = (eintrag?.metadata?.synonyms || [])
      .filter((wort) => typeof wort === 'string' && wort.trim().length > 0);
    if (synonyme.length > 0) zeile.s = synonyme;

    eintraege.push(zeile);
  }

  if (fehler.length > 0) {
    console.error(`\n❌ ${fehler.length} Artikel kamen ins Verzeichnis nicht hinein:`);
    fehler.forEach((zeile) => console.error(`   ${zeile}`));
    process.exit(1);
  }

  eintraege.sort((a, b) => sammler.compare(a.t, b.t) || sammler.compare(a.u, b.u));

  const verzeichnis = { stand, artikel: eintraege };
  const inhalt = `${JSON.stringify(verzeichnis)}\n`;

  await fs.writeFile(ZIEL_PUBLIC, inhalt, 'utf-8');
  console.log(`✅ Verzeichnis geschrieben: ${ZIEL_PUBLIC}`);

  try {
    await fs.access(path.resolve(__dirname, 'out'));
    await fs.writeFile(ZIEL_OUT, inhalt, 'utf-8');
    console.log(`✅ Verzeichnis auch nach out/ kopiert: ${ZIEL_OUT}`);
  } catch {
    console.log('ℹ️  out/ entsteht erst beim Build.');
  }

  const mitSynonymen = eintraege.filter((zeile) => zeile.s).length;
  const groesse = Buffer.byteLength(inhalt, 'utf-8');

  console.log('');
  console.log('📊 Statistik:');
  console.log(`   - Artikel im Verzeichnis: ${eintraege.length}`);
  console.log(`   - Rubriken: ${new Set(eintraege.map((z) => z.k)).size}`);
  console.log(`   - Artikel mit Synonymen: ${mitSynonymen}`);
  console.log(`   - Stand: ${stand}`);
  console.log(`   - Grösse: ${(groesse / 1024).toFixed(1)} kB`);
}

generiereArtikelVerzeichnis().catch((fehler) => {
  console.error('❌ Fehler beim Erzeugen des Artikel-Verzeichnisses:', fehler);
  process.exit(1);
});

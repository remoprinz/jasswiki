/**
 * Üben-Verweise: Begriffsartikel -> Jass des Tages auf jassguru.ch
 *
 * Erzeugt `src/data/uebungen.json`, das der Block «Üben» auf passenden
 * Artikeln liest (src/components/wissen/UebenBlock.tsx).
 *
 * Quelle: die öffentlichen Tagesblätter in Firestore (Collection
 * `tagesblaetter`, Dokument-ID = Datum JJJJ-MM-TT, Felder `status`, `rubrik`,
 * `titel`). Aufgenommen wird ein Blatt nur, wenn es publiziert ist UND sein
 * Datum heute (Zürcher Zeit) oder früher liegt. Ein Blatt mit künftigem Datum
 * ist ein noch unaufgedecktes Rätsel und bleibt draussen.
 *
 * Zuordnung Artikel -> Rubrik steht unten in ZUORDNUNG. Die Rubrik-Namen sind
 * die Rubriken der Tagesblätter, wörtlich. Matsch hat keine Rubrik; dort
 * zählen die Blätter, deren Titel das Wort «Matsch» trägt.
 *
 * Archiv: Antwortet https://jassguru.ch/jass-des-tages/archiv/ mit 200, zeigt
 * der Block dorthin, sonst auf die Tagesseite.
 *
 * Ohne Netz (Fehler beim Abruf) bleibt die bestehende Datei stehen; der Build
 * läuft weiter. Aufruf: node generate-uebungen.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ZIEL = path.resolve(__dirname, 'src/data/uebungen.json');
const FIRESTORE =
  'https://firestore.googleapis.com/v1/projects/jassguru/databases/(default)/documents/tagesblaetter';
const TAGESSEITE = 'https://jassguru.ch/jass-des-tages/';
const ARCHIV = 'https://jassguru.ch/jass-des-tages/archiv/';
const PRO_ARTIKEL = 3;

// Artikel-ID -> Auswahl der Blätter
const ZUORDNUNG = {
  expressions_stechkarten: { thema: 'Stechen', rubrik: 'Stechen' },
  expressions_bock: { thema: 'Bock aufbauen', rubrik: 'Bock aufbauen' },
  expressions_bockkarte: { thema: 'Bock aufbauen', rubrik: 'Bock aufbauen' },
  schieber_taktiken_verwerfen: { thema: 'Verwerfen', rubrik: 'Verwerfen' },
  schieber_taktiken_anziehen: { thema: 'Anziehen', rubrik: 'Anziehen' },
  expressions_schmieren: { thema: 'Schmieren', rubrik: 'Schmieren' },
  expressions_klemmen: { thema: 'Klemmen', rubrik: 'Klemmen' },
  expressions_nachschmeissen: { thema: 'Nachschmeissen', rubrik: 'Nachschmeissen' },
  schieber_taktiken_austrumpfen: { thema: 'Austrumpfen', rubrik: 'Austrumpfen' },
  expressions_matsch: { thema: 'Matsch', titelWort: 'Matsch' },
  matsch: { thema: 'Matsch', titelWort: 'Matsch' },
};

function heuteZuerich() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}

async function holeBlaetter() {
  const blaetter = [];
  let token = '';
  do {
    const url = `${FIRESTORE}?pageSize=300${token ? `&pageToken=${encodeURIComponent(token)}` : ''}`;
    const antwort = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!antwort.ok) throw new Error(`Firestore ${antwort.status}`);
    const daten = await antwort.json();
    for (const dok of daten.documents ?? []) {
      const f = dok.fields ?? {};
      blaetter.push({
        datum: dok.name.split('/').pop(),
        status: f.status?.stringValue,
        rubrik: f.rubrik?.stringValue,
        titel: (f.titel?.stringValue ?? '').trim(),
      });
    }
    token = daten.nextPageToken ?? '';
  } while (token);
  return blaetter;
}

async function archivLebt() {
  try {
    const a = await fetch(ARCHIV, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(10000) });
    return a.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  let blaetter;
  try {
    blaetter = await holeBlaetter();
  } catch (e) {
    console.warn(`⚠️  Tagesblätter nicht abrufbar (${e.message}). ${path.basename(ZIEL)} bleibt unverändert.`);
    return;
  }
  const heute = heuteZuerich();
  const sichtbar = blaetter
    .filter((b) => b.status === 'publiziert' && /^\d{4}-\d{2}-\d{2}$/.test(b.datum) && b.datum <= heute && b.titel)
    .sort((a, b) => b.datum.localeCompare(a.datum));

  const artikel = {};
  for (const [id, regel] of Object.entries(ZUORDNUNG)) {
    const passend = sichtbar.filter((b) =>
      regel.rubrik ? b.rubrik === regel.rubrik : b.titel.includes(regel.titelWort),
    );
    if (passend.length === 0) continue;
    artikel[id] = {
      thema: regel.thema,
      anzahl: passend.length,
      blaetter: passend.slice(0, PRO_ARTIKEL).map((b) => ({
        datum: b.datum,
        titel: b.titel,
        url: `${TAGESSEITE}${b.datum}/`,
      })),
    };
  }

  const ergebnis = {
    stand: sichtbar[0]?.datum ?? heute,
    alleAufgaben: (await archivLebt()) ? ARCHIV : TAGESSEITE,
    artikel,
  };
  await fs.writeFile(ZIEL, JSON.stringify(ergebnis, null, 2) + '\n');
  console.log(`✅ Üben-Verweise: ${Object.keys(artikel).length} Artikel, Stand ${ergebnis.stand}, Sammlung ${ergebnis.alleAufgaben}`);
}

main();

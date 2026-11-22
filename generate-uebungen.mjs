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
 * Video (KELLE 22.11.2026, Karte SCHIRI «wiki-vorlagen», Teil A): je Artikel
 * das neueste Blatt der Auswahl, dessen Tagesseite auf jassguru.ch im JSON-LD
 * ein VideoObject mit contentUrl trägt. Höchstens VIDEO_VERSUCHE Tagesseiten
 * je Artikel, jede Seite einmal je Lauf. Fehlt das Video oder schlägt der
 * Abruf fehl: video = null, der Bau läuft weiter.
 *
 * Festes Lehrblatt (Karte SCHIRI «wiki-huelle» Teil C, KELLE 22.11.2026): Trägt
 * ein Eintrag `fest: 'JJJJ-MM-TT'`, zeigt der Block genau dieses Blatt mit seinem
 * Film (Adresse aus dem Datum, YouTube, falls die Tagesseite eines nennt) und den
 * Verweis auf das Archiv. Die Liste der neuesten Blätter entfällt dort.
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
const SPEICHER = 'https://firebasestorage.googleapis.com/v0/b/jassguru-bilder/o/sendungen%2F';
const PRO_ARTIKEL = 3;
const VIDEO_VERSUCHE = 5;

// Artikel-ID -> Auswahl der Blätter. `rubrik` ist ein Wort oder eine Liste.
//
// LEHRPLAN (Remo 22.11.2026): Jeder Artikel trägt EIN fest gewähltes Lehrblatt.
// Die Wahl stammt von DOK-DOC (~/.claude/auftraege/2026-11-22-DOKDOC-feste-lehrblaetter.md):
// Der Zug des Artikels entscheidet das Blatt in einem Stich, den man nennen kann.
// Ein Thema, ein Film: Bockkarte, «Austrumpfen: hoch oder tief» und der Artikel
// «Punkte zählen beim Schieber» (Kennung matsch) tragen darum keinen eigenen Film mehr.
const ZUORDNUNG = {
  schieber_taktiken_advanced: { thema: 'Signalisieren', rubrik: ['Signalisieren', 'Info erhalten'], fest: '2026-10-24' },
  expressions_trumpffarbe: { thema: 'Ansagen', rubrik: 'Ansagen', fest: '2026-11-10' },
  expressions_stechkarten: { thema: 'Stechen', rubrik: 'Stechen', fest: '2026-11-12' },
  expressions_bock: { thema: 'Bock aufbauen', rubrik: 'Bock aufbauen', fest: '2026-10-15' },
  schieber_taktiken_verwerfen: { thema: 'Verwerfen', rubrik: 'Verwerfen', fest: '2026-10-30' },
  schieber_taktiken_anziehen: { thema: 'Anziehen', rubrik: 'Anziehen', fest: '2026-10-09' },
  expressions_schmieren: { thema: 'Schmieren', rubrik: 'Schmieren', fest: '2026-10-18' },
  expressions_klemmen: { thema: 'Klemmen', rubrik: 'Klemmen', fest: '2026-09-25' },
  expressions_nachschmeissen: { thema: 'Nachschmeissen', rubrik: 'Nachschmeissen', fest: '2026-08-22' },
  schieber_taktiken_austrumpfen: { thema: 'Austrumpfen', rubrik: 'Austrumpfen', fest: '2026-11-14' },
  schieber_taktiken_nell_vor_puur: { thema: 'Nell vor Puur', rubrik: 'Austrumpfen', fest: '2026-10-12' },
  expressions_matsch: { thema: 'Matsch', titelWort: 'Matsch', fest: '2026-11-02' },
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

/** Sucht in einem JSON-LD-Baum (auch @graph, verschachtelt) das erste VideoObject. */
function findeVideo(knoten) {
  if (!knoten || typeof knoten !== 'object') return null;
  if (Array.isArray(knoten)) {
    for (const k of knoten) {
      const v = findeVideo(k);
      if (v) return v;
    }
    return null;
  }
  const typ = knoten['@type'];
  if ((typ === 'VideoObject' || (Array.isArray(typ) && typ.includes('VideoObject'))) && knoten.contentUrl) {
    return knoten;
  }
  for (const wert of Object.values(knoten)) {
    const v = findeVideo(wert);
    if (v) return v;
  }
  return null;
}

const videoCache = new Map();

/** true, wenn der Film auf eine Anfrage nach dem ersten Byte mit 200 oder 206 antwortet. */
async function filmLebt(url) {
  try {
    const a = await fetch(url, { headers: { Range: 'bytes=0-0' }, signal: AbortSignal.timeout(10000) });
    await a.body?.cancel();
    return a.status === 200 || a.status === 206;
  } catch {
    return false;
  }
}

/** Das VideoObject der Tagesseite als Video-Daten des Bausteins JdtVideo, sonst null. */
async function videoDerTagesseite(blatt) {
  if (videoCache.has(blatt.datum)) return videoCache.get(blatt.datum);
  let ergebnis = null;
  try {
    const antwort = await fetch(`${TAGESSEITE}${blatt.datum}/`, { signal: AbortSignal.timeout(10000) });
    if (antwort.ok) {
      const html = await antwort.text();
      const bloecke = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
      for (const [, roh] of bloecke) {
        let daten;
        try {
          daten = JSON.parse(roh);
        } catch {
          continue;
        }
        const v = findeVideo(daten);
        if (v) {
          const einzeln = (x) => (Array.isArray(x) ? x[0] : x) ?? null;
          // Adressen aus dem Datum, ohne Schlüssel: Der Schlüssel wechselt bei
          // jedem neuen Rendern, die Adresse ohne ihn bleibt (A1, 22.11.2026).
          // Die Tagesseite ist allein die Probe, ob das Blatt ein Video trägt.
          ergebnis = {
            datum: blatt.datum,
            aufgabe: blatt.titel,
            mp4: `${SPEICHER}${blatt.datum}_1.mp4?alt=media`,
            poster: v.thumbnailUrl ? `${SPEICHER}${blatt.datum}_1.jpg?alt=media` : null,
            dauer: v.duration ?? null,
            youtube: einzeln(v.embedUrl),
          };
          break;
        }
      }
    }
  } catch {
    ergebnis = null;
  }
  // Der eigene Film spielt zuerst, YouTube ist der Ersatz (Remo 22.11.2026).
  // Antwortet der Film nicht und nennt die Tagesseite kein YouTube, zählt das
  // Video wie keines; der Erzeuger nimmt dann das nächstältere Blatt.
  if (ergebnis?.mp4 && !ergebnis.youtube && !(await filmLebt(ergebnis.mp4))) ergebnis = null;
  videoCache.set(blatt.datum, ergebnis);
  return ergebnis;
}

/**
 * Video des festen Lehrblatts. Anders als beim neuesten Blatt gibt es hier kein
 * Ausweichen auf ein älteres: Trägt die Tagesseite YouTube, bleibt das Video auch,
 * wenn die Datei im Speicher fehlt (der Baustein wechselt dann auf YouTube).
 */
async function festesVideo(blatt) {
  let video = null;
  try {
    const antwort = await fetch(`${TAGESSEITE}${blatt.datum}/`, { signal: AbortSignal.timeout(10000) });
    if (!antwort.ok) return null;
    const html = await antwort.text();
    for (const [, roh] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let daten;
      try {
        daten = JSON.parse(roh);
      } catch {
        continue;
      }
      const v = findeVideo(daten);
      if (v) {
        const einzeln = (x) => (Array.isArray(x) ? x[0] : x) ?? null;
        video = {
          datum: blatt.datum,
          aufgabe: blatt.titel,
          mp4: `${SPEICHER}${blatt.datum}_1.mp4?alt=media`,
          poster: v.thumbnailUrl ? `${SPEICHER}${blatt.datum}_1.jpg?alt=media` : null,
          dauer: v.duration ?? null,
          youtube: einzeln(v.embedUrl),
        };
        break;
      }
    }
  } catch {
    return null;
  }
  if (!video) return null;
  // Film und Deckbild bleiben aus dem Datum gerechnet; der Baustein spielt bei
  // einem Fehler YouTube. Fehlt beides, entfällt das Video.
  if (!video.youtube && !(await filmLebt(video.mp4))) return null;
  return video;
}

async function neuestesVideo(passend) {
  for (const blatt of passend.slice(0, VIDEO_VERSUCHE)) {
    const video = await videoDerTagesseite(blatt);
    if (video?.mp4) return video;
  }
  return null;
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
    const rubriken = regel.rubrik ? [regel.rubrik].flat() : null;
    const passend = sichtbar.filter((b) =>
      rubriken ? rubriken.includes(b.rubrik) : b.titel.includes(regel.titelWort),
    );
    if (regel.fest) {
      // Festes Lehrblatt: genau dieses Blatt, ob seine Rubrik passt oder nicht.
      // Ist es (noch) nicht publiziert, entfällt der Block für diesen Artikel.
      const blatt = sichtbar.find((b) => b.datum === regel.fest);
      if (!blatt) {
        console.warn(`⚠️  Festes Lehrblatt ${regel.fest} für ${id} nicht publiziert, Block entfällt.`);
        continue;
      }
      artikel[id] = {
        thema: regel.thema,
        anzahl: 1,
        fest: blatt.datum,
        video: await festesVideo(blatt),
        blaetter: [{ datum: blatt.datum, titel: blatt.titel, url: `${TAGESSEITE}${blatt.datum}/` }],
      };
      continue;
    }
    if (passend.length === 0) continue;
    artikel[id] = {
      thema: regel.thema,
      anzahl: passend.length,
      video: await neuestesVideo(passend),
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
  const mitVideo = Object.values(artikel).filter((a) => a.video).length;
  console.log(`✅ Üben-Verweise: ${Object.keys(artikel).length} Artikel (${mitVideo} mit Video), Stand ${ergebnis.stand}, Sammlung ${ergebnis.alleAufgaben}`);
}

main();

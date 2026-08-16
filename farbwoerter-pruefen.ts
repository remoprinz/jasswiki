// Prüft die Wörtertafel für den Wechsel aufs französische Blatt.
//
//   npm run pruefe:farbwoerter  (oder: npx tsx farbwoerter-pruefen.ts [artikel-id …])
//
// 1. Fälle aus der Tafel (Beispiele des SCHIEDSRICHTERS und Grenzfälle) — jeder
//    Fall muss wörtlich stimmen.
// 2. Loch-Prüfung: die Funktion läuft über den Artikeltext (Vorgabe: Sidi-Barrani,
//    sonst die angegebenen Kennungen); danach darf keines der Prüfwörter mehr als
//    ganzes Wort im sichtbaren Text stehen. Karten-Slugs in [[karten: …]],
//    (siehe Begriff "…")-Kennungen und Link-Adressen zählen nicht.
// Endet mit Code 1, sobald ein Fall fehlschlägt oder ein Loch bleibt.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { farbwoerterFr, PRUEFWOERTER } from './src/components/wissen/farbwoerter';

const hier = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// 1. Fälle aus der Tafel
// ---------------------------------------------------------------------------

const FAELLE: ReadonlyArray<readonly [string, string]> = [
  // Beispiele der Tafel (Block 1)
  ['Rosen-Under', 'Herz-Bube'],
  ['Schilten-Ober', 'Schaufel-Dame'],
  ['Eichel-Banner', 'Kreuz-Zehn'],
  ['Eichel-König', 'Kreuz-König'],
  ['Schellen-Nell', 'Ecke-Nell'],
  ['C Eichel-Nell, D Eichel-Banner', 'C Kreuz-Nell, D Kreuz-Zehn'],
  // Block 1b: Artikel + Verbindung gebeugt (die beiden Sidi-Zitate und die Tafel des Nachtrags)
  ['Der Eichel-König liegt bei D, der Eichel-Ober bei C.', 'Der Kreuz-König liegt bei D, die Kreuz-Dame bei C.'],
  ['und C wirft den Rosen-Under ab', 'und C wirft den Herz-Buben ab'],
  ['den Schilten-Ober', 'die Schaufel-Dame'],
  ['mit dem Schellen-Ober', 'mit der Ecke-Dame'],
  ['mit dem Eichel-Under', 'mit dem Kreuz-Buben'],
  ['seinen Rosen-Under', 'seinen Herz-Buben'],
  ['das Schellen-Banner', 'die Ecke-Zehn'],
  ['mit dem Rosen-Banner', 'mit der Herz-Zehn'],
  ['sein Schilten-Banner', 'seine Schaufel-Zehn'],
  ['Der Rosen-Ober sticht. Den Eichel-Under hält A. Dem Schellen-Banner folgt. Das Schilten-Banner fällt.',
    'Die Herz-Dame sticht. Den Kreuz-Buben hält A. Der Ecke-Zehn folgt. Die Schaufel-Zehn fällt.'],
  ['der Eichel-Under', 'der Kreuz-Bube'],
  // Block 2: Artikel und Genus
  ['Puur, also der Under, 20', 'Puur, also der Bube, 20'],
  ['den Under der genannten Farbe', 'den Buben der genannten Farbe'],
  ['mit dem Under', 'mit dem Buben'],
  ['mit dem Ass und dem Ober', 'mit dem Ass und der Dame'],
  ['das Banner', 'die Zehn'],
  ['B wirft sein Banner dazu', 'B wirft seine Zehn dazu'],
  ['niemand mehr eine Schilte', 'niemand mehr eine Schaufel'],
  ['Die Schilten, über die niemand', 'Die Schaufeln, über die niemand'],
  ['vier Schellen mit dem Nell', 'vier Ecken mit dem Nell'],
  ['drei weitere Schellen', 'drei weitere Ecken'],
  ['70 auf Schellen', '70 auf Ecke'],
  ['in Schellen hält B', 'in Ecke hält B'],
  ['statt Schellen zu stützen', 'statt Ecke zu stützen'],
  ['mit Schellen als Trumpf', 'mit Ecke als Trumpf'],
  ['95 auf Schilten', '95 auf Schaufel'],
  ['15 in Schilten', '15 in Schaufel'],
  ['über Schilten hat niemand', 'über Schaufel hat niemand'],
  // Block 3: nackte Wörter
  ['Eichel ist Trumpf', 'Kreuz ist Trumpf'],
  ['drei Eichel', 'drei Kreuz'],
  ['Warum D Rosen zeigt', 'Warum D Herz zeigt'],
  ['Ober 3; Banner 10', 'Dame 3; Zehn 10'],
  ['Under 2', 'Bube 2'],
  // Unberührt: klein geschriebene Slugs, Kennungen, Adressen, Jassnamen
  ['[[karten: rosen-under, rosen-ass | Rosen-Under]]', '[[karten: rosen-under, rosen-ass | Herz-Bube]]'],
  ['(siehe Begriff "expressions_trumpf")', '(siehe Begriff "expressions_trumpf")'],
  ['[Puur](/begriffe/kartenbezeichnungen/trumpf-puur/)', '[Puur](/begriffe/kartenbezeichnungen/trumpf-puur/)'],
  ['Puur und Nell', 'Puur und Nell'],
  ['Obenabe und Undenufe', 'Obenabe und Undenufe'],
  ['Sidi-Barrani', 'Sidi-Barrani'],
  ['Trumpf-Bauer Kombinationen', 'Trumpf-Bauer Kombinationen'],
  ['oder Under', 'oder Bube'],
  ['| 60 auf Eichel | Puur zu dritt: der Eichel-Under |', '| 60 auf Kreuz | Puur zu dritt: der Kreuz-Bube |'],
  // Nachtrag Pandur (16.08.2026): Zahlwort + nackte Karte, und die Farbe als Trumpfansage
  ['drei Under, drei Banner, dazu zwei Ober', 'drei Buben, drei Zehnen, dazu zwei Damen'],
  ['ein Blatt ohne Ass, ohne Under', 'ein Blatt ohne Ass, ohne Buben'],
  ['Damit ist Schellen Trumpf.', 'Damit ist Ecke Trumpf.'],
  ['Mit Rosen als Trumpf', 'Mit Herz als Trumpf'],
  ['Vier Schellen mit Under, Ass, König und Banner', 'Vier Ecken mit Bube, Ass, König und Zehn'],
];

let fehler = 0;
for (const [de, soll] of FAELLE) {
  const ist = farbwoerterFr(de);
  if (ist !== soll) {
    fehler += 1;
    console.log(`FEHL  «${de}»\n      ist:  «${ist}»\n      soll: «${soll}»`);
  }
}
console.log(`Fälle: ${FAELLE.length}, fehlgeschlagen: ${fehler}`);

// ---------------------------------------------------------------------------
// 2. Loch-Prüfung am Artikeltext
// ---------------------------------------------------------------------------

/** Blendet aus, was kein sichtbarer Text ist: Slugs in Karten-Marken, Kennungen, Link-Adressen. */
function nurSichtbar(text: string): string {
  return text
    .replace(/\[\[\s*karten\s*:([^\]\n|]*)(\|[^\]\n]*)?\]\]/gi, (_m, _slugs: string, besch?: string) =>
      besch ? besch.slice(1) : ''
    )
    .replace(/\(siehe Begriff\s+"[^"]+"\)/gi, '')
    .replace(/\]\([^)\s]+\)/g, ']()');
}

const inhaltPfad = path.join(hier, 'src', 'data', 'jass-content-v2.json');
const inhalt = JSON.parse(readFileSync(inhaltPfad, 'utf8')) as Record<string, { text: string }>;
const kennungen = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['variants_strategic_sidi_barrani'];

const pruefMuster = new RegExp(`(^|[^\\p{L}\\p{N}])(${PRUEFWOERTER.join('|')})(?![\\p{L}\\p{N}])`, 'giu');

let loecher = 0;
for (const kennung of kennungen) {
  const artikel = inhalt[kennung];
  if (!artikel) {
    console.log(`Artikel fehlt: ${kennung}`);
    fehler += 1;
    continue;
  }
  const fr = nurSichtbar(farbwoerterFr(artikel.text));
  const zeilen = fr.split('\n');
  const treffer: string[] = [];
  zeilen.forEach((zeile, i) => {
    pruefMuster.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pruefMuster.exec(zeile)) !== null) {
      const von = Math.max(0, m.index - 40);
      const bis = Math.min(zeile.length, m.index + m[0].length + 40);
      treffer.push(`  Z${i + 1} «${m[2]}»: …${zeile.slice(von, bis)}…`);
    }
  });
  loecher += treffer.length;
  console.log(`Loch-Prüfung ${kennung}: ${treffer.length} übrig`);
  treffer.forEach((t) => console.log(t));
}

process.exit(fehler > 0 || loecher > 0 ? 1 : 0);

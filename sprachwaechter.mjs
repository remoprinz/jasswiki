/**
 * DER SPRACHWÄCHTER — Riegel vor dem Deploy (SCHIEDSRICHTER, 15.08.2026)
 *
 * Vorbild ist die Doktrin-Sprache der Engine (jassai/netz/woerterbuch.py):
 * «Geschlossen heisst: Was hier nicht steht, existiert für die Doktrin nicht.
 *  Der TÜV lehnt unbekannte Wörter laut ab.»
 *
 * jasswiki hatte bis heute keine solche Schranke, und drei Fehler in einer Woche
 * sassen im FAQ-Block, den niemand gegenliest und der als schema.org/FAQPage an
 * Google und die Sprachmodelle geht:
 *
 *   1. «Das Mindestgebot beginnt bei 90 Punkten»  (Zahl aus dem Nachbarartikel)
 *   2. «Fünfling (5 gleiche), Sechsling (6 gleiche)» (Weis, den es nicht gibt)
 *   3. Matsch 257/414/1028 in der FAQ, während der Artikeltext längst 157 sagte
 *
 * Fall 1 und 3 fängt Prüfung A, Fall 2 fängt Prüfung B.
 *
 * HARTE PRÜFUNGEN halten den Build an. WEICHE melden nur.
 * Was bewusst so bleiben soll, kommt in AUSNAHMEN — jeder Eintrag ist ein Entscheid.
 */

import { readFile, writeFile } from 'fs/promises';

const QUELLE = new URL('./src/data/jass-content-v2.json', import.meta.url);
const ALTLAST = new URL('./sprachwaechter-altlasten.json', import.meta.url);

/**
 * SPERRKLINKE. Der Bestand trug am 15.08.2026 bereits 23 Befunde, fast alle von der
 * Sorte «die Zahl steht allein in der FAQ». Sie sind echte Altlast und keine
 * Fehlalarme: `expressions_handkarten` etwa nennt die Neun im Artikeltext nirgends.
 *
 * Ein Riegel, der beim Einbau rot ist, wird umgangen. Darum: Was heute dasteht, ist
 * eingefroren und wird als Schuld ausgewiesen. JEDER NEUE Befund hält den Build an.
 * Die Liste schrumpft, sobald ein Artikel angefasst wird, und wächst nie.
 *
 * Neu erzeugen nach getaner Aufräumarbeit: `node sprachwaechter.mjs --altlast-neu`
 */

// --- A: Zahlwörter, damit «neun Karten» im Text die «9» in der FAQ deckt ------
const ZAHLWORT = {
  0: ['null'], 1: ['ein', 'eine', 'einen', 'einer', 'eins'], 2: ['zwei', 'zweit'],
  3: ['drei', 'dritt'], 4: ['vier', 'viert'], 5: ['fünf', 'fünft'],
  6: ['sechs', 'sechst'], 7: ['sieben', 'siebt'], 8: ['acht'], 9: ['neun'],
  10: ['zehn', 'zehner'], 11: ['elf'], 12: ['zwölf'], 20: ['zwanzig'],
  36: ['sechsunddreissig'], 50: ['fünfzig'], 100: ['hundert'], 1000: ['tausend'],
};

// --- B: Wörter, die kein Jasser am Tisch sagt --------------------------------
// Jedes hier stand einmal in einem Artikel und musste wieder heraus.
const FREMDWOERTER = [
  'behaupt',          // «Sie behaupten keine neue Trumpffarbe» (Remo, 15.08.)
  'Versteigerung',    // Jasssprache ist «Bieten», «Steigern», «Gebot»
  'gedeckelt',
  'Bietsprache',      // eigene Erfindung
  'Fünfling', 'Sechsling', 'Hauptweis', 'Folgeweis',   // Weis, den es nicht gibt
  'reihum',           // «kein gängiger Begriff» (Remo, 15.08.); Jasssprache: «der Reihe nach»
  ' der Banner', ' den Banner', 'seinen Banner', 'seine Banner', 'einen Banner',  // es heisst DAS Banner (Remo, 16.08.); «dem Banner» ist richtiger Dativ
  'es gilt zu beachten', 'wichtig zu wissen', 'in diesem Zusammenhang',
  'darüber hinaus', 'nicht zuletzt', 'seien Sie sich bewusst',
];

// --- F: Wendungen, die am Jasstisch niemand ausspricht ------------------------
/**
 * WORTLAUT-EICHUNG (Remo, 18.08.2026). Er fand die Überschrift «Der König nimmt den
 * Tisch»: sachlich richtig, quellentreu, in keinem KI-Tell-Katalog — und trotzdem
 * frei erfunden. Sein Wort dazu: «wöööt? der könig nimmt den tisch??? was soll das
 * bedeuten????»
 *
 * Verfahren und Eichquelle: regelauskunft/WORTLAUT-EICHUNG.md und
 * regelauskunft/EICHQUELLE/ (326 000 Wörter Jassverzeichnis, Wikipedia, Remos eigene
 * Sätze). Eine Wendung steht im Artikel, wenn sie dort vorkommt.
 *
 * Jede Zeile hier ist ein Entscheid, der einmal gefallen ist. Sie kommt nie zurück.
 */
const WENDUNGEN = [
  // Fügungen: das falsche Verb am richtigen Substantiv (Remo, 19.08.2026).
  // Tafel mit Belegzahlen: regelauskunft/JASSDEUTSCH-WOERTERBUCH.md
  [/\bzugeben\b|\bzugibt\b|gibt zu\b/i, '«zugeben» ist kein Jasswort (0 Belege). Es heisst spielen oder ausspielen.'],
  [/Trümpfe? (ziehen|zieht|herausholen|holt heraus)/i, 'Trümpfe zieht man weder noch holt man sie heraus. Es heisst austrumpfen.'],
  [/Trümpfe? (fallen|fällt)|gefallene? Trümpfe|Gefallen sind/i, 'Trümpfe fallen nicht, sie werden gespielt oder ausgezogen (Remo, 19.08.).'],
  // «die Karte, die Vorhand ausspielt» ist ein Relativsatz und bleibt erlaubt,
  // darum der Ausschluss von «, die Vorhand».
  [/(?<!, )\b[Dd]ie Vorhand\b|\b[Dd]er Vorhand\b|\b[Dd]ie Hinterhand\b|\b[Dd]ie Mittelhand\b/, 'Vorhand steht ohne Artikel (Remo, 19.08.).'],
  [/Karte werfen|wirft eine Karte/i, 'Es heisst spielen, oder verwerfen, wenn eine Fremdfarbe gemeint ist.'],
  [/nimmt den Tisch|den Tisch nehmen/i, 'Der Tisch ist das Möbel. Gemeint sind die Karten in der Mitte: «aufnehmen».'],
  [/läuft zusammen auf/i, 'Gemeint ist «zählt gegen das Gebot».'],
  [/in die Mittelhand/i, 'Am Tisch heisst das «den König in die Zange nehmen» (Remo, 18.08.).'],
  [/das Spiel in die Hand nehmen/i, 'Bild aus der Sportberichterstattung.'],
];

// --- C -----------------------------------------------------------------------
// Der Geviertstrich «—» und der als Gedankenstrich gesetzte Halbgeviertstrich
// «–» (mit Leerzeichen ringsum). Ein Halbgeviertstrich OHNE Leerzeichen bleibt
// erlaubt, er verbindet Zahlen: «S. 133–148», «1940–1945».
// Die Lücke fiel am 19.08.2026 auf: 48 Halbgeviertstriche standen im Bestand,
// während der Riegel nur den Geviertstrich kannte.
const GEDANKENSTRICH = /—| – /;

// --- D: weich. Anweisung, die auf einer Verneinung aufbaut --------------------
const VERNEINUNGEN = [
  /\bdarf (?:man |der |die |das )?nicht\b/i,
  /\bdarf kein/i,
  /\bnie (?:überschreiben|ändern|löschen|senden)\b/i,
  /\bohne (?:Rücksprache|Absprache)\b/i,
];

// --- AUSNAHMEN: bewusst so, mit Grund ----------------------------------------
const AUSNAHMEN = {
  // Artikel-ID → Zahlen, die in der FAQ stehen dürfen, obwohl der Text sie nicht nennt
  zahlen: {
    expressions_matsch: ['257'],        // Schieber-Matsch: 152 + 5 + 100, im Text ausgeschrieben
    expressions_matschpraemie: ['1028'],// vierfacher Matsch, im Text als Rechnung
    kontermatsch: ['257'],              // wie der Matsch, Schieber
  },
};

const zahlenAusText = (text) => {
  const set = new Set((text.match(/\d+/g) || []));
  const klein = text.toLowerCase();
  for (const [zahl, woerter] of Object.entries(ZAHLWORT)) {
    if (woerter.some((w) => klein.includes(w))) set.add(String(zahl));
  }
  return set;
};

const lauf = async () => {
  const bestand = JSON.parse(await readFile(QUELLE, 'utf-8'));
  const alleIds = new Set(Object.values(bestand).map((a) => a.id));
  const fehler = [];
  const hinweise = [];

  for (const [schluessel, artikel] of Object.entries(bestand)) {
    const text = artikel.text || '';
    const faqs = artikel.faqs || [];
    const erlaubteZahlen = zahlenAusText(text);
    const ausnahmeZahlen = AUSNAHMEN.zahlen[schluessel] || [];

    // A — Zahl steht in der FAQ und nirgends im Artikel
    for (const faq of faqs) {
      for (const zahl of new Set(faq.answer.match(/\d+/g) || [])) {
        if (erlaubteZahlen.has(zahl) || ausnahmeZahlen.includes(zahl)) continue;
        fehler.push({
          artikel: schluessel,
          pruefung: 'A · Zahl allein in der FAQ',
          fund: `«${zahl}» in «${faq.question}»`,
          warum: 'Die FAQ geht als schema.org/FAQPage hinaus. Eine Zahl, die der Artikel selbst nicht trägt, ist ungeprüft.',
        });
      }
    }

    // B und C — über Text und FAQ zusammen
    const alles = [text, ...faqs.map((f) => `${f.question} ${f.answer}`)].join('\n');
    for (const wort of FREMDWOERTER) {
      if (alles.toLowerCase().includes(wort.toLowerCase())) {
        fehler.push({
          artikel: schluessel,
          pruefung: 'B · Wort, das kein Jasser sagt',
          fund: `«${wort}»`,
          warum: 'Jasssprache wird belegt, statt gedichtet. Eichquelle ist der Bestand.',
        });
      }
    }
    // F — Wendung, die am Tisch niemand ausspricht
    for (const [muster, warum] of WENDUNGEN) {
      const treffer = alles.match(muster);
      if (treffer) {
        fehler.push({
          artikel: schluessel,
          pruefung: 'F · Wendung ohne Beleg',
          fund: `«${treffer[0]}»`,
          warum: `${warum} Prüfen mit: grep -ric "…" regelauskunft/EICHQUELLE/`,
        });
      }
    }

    // E — jeder Begriffs-Verweis muss ein Ziel haben, das es gibt
    for (const treffer of alles.matchAll(/\(siehe Begriff\s+"([^"]+)"\)/gi)) {
      if (alleIds.has(treffer[1])) continue;
      fehler.push({
        artikel: schluessel,
        pruefung: 'E · Verweis ins Leere',
        fund: `«${treffer[1]}»`,
        warum: 'Der Renderer lässt einen unbekannten Verweis still fallen: kein Fehler, kein 404, bloss ein Wort ohne Link.',
      });
    }

    if (GEDANKENSTRICH.test(alles)) {
      fehler.push({
        artikel: schluessel,
        pruefung: 'C · Gedankenstrich',
        fund: '—',
        warum: 'Remos Satzzeichen-Regel: Doppelpunkt, Punkt oder Komma.',
      });
    }

    // D — weich
    for (const muster of VERNEINUNGEN) {
      const treffer = alles.match(muster);
      if (treffer) {
        hinweise.push({ artikel: schluessel, fund: treffer[0] });
      }
    }
  }

  const marke = (f) => `${f.artikel} | ${f.pruefung} | ${f.fund}`;

  if (process.argv.includes('--altlast-neu')) {
    await writeFile(ALTLAST, JSON.stringify(fehler.map(marke).sort(), null, 2) + '\n');
    console.log(`✍️  Altlast neu geschrieben: ${fehler.length} Befund(e).`);
    return;
  }

  let altlast = [];
  try {
    altlast = JSON.parse(await readFile(ALTLAST, 'utf-8'));
  } catch {
    console.log('ℹ️  Keine Altlast-Liste gefunden, jeder Befund zählt als neu.');
  }
  const bekannt = new Set(altlast);
  const neue = fehler.filter((f) => bekannt.has(marke(f)) === false);
  const behoben = altlast.filter((m) => fehler.some((f) => marke(f) === m) === false);

  console.log('🔎 Sprachwächter');
  console.log(`   ${Object.keys(bestand).length} Artikel geprüft`);
  if (bekannt.size > 0) {
    console.log(`   ${bekannt.size - behoben.length} Altlast-Befund(e) offen`);
  }
  if (behoben.length > 0) {
    console.log(`   ✨ ${behoben.length} Altlast-Befund(e) behoben. Liste kürzen mit --altlast-neu:`);
    for (const m of behoben) console.log(`      ${m}`);
  }

  if (hinweise.length > 0) {
    console.log(`\n⚠️  ${hinweise.length} Anweisung(en) auf einer Verneinung gebaut:`);
    for (const h of hinweise) console.log(`   ${h.artikel}: «${h.fund}»`);
    console.log('   Sag, was gilt. Der Build läuft weiter.');
  }

  if (neue.length > 0) {
    console.log(`\n❌ ${neue.length} NEUE(R) Befund(e), der Build hält an:\n`);
    for (const f of neue) {
      console.log(`   ${f.artikel}`);
      console.log(`   ${f.pruefung}: ${f.fund}`);
      console.log(`   ${f.warum}\n`);
    }
    console.log('   Beheben, oder den Fall mit Begründung in AUSNAHMEN eintragen.');
    process.exit(1);
  }

  console.log('✅ Sprachwächter: nichts Neues.');
};

lauf().catch((err) => {
  console.error('❌ Sprachwächter konnte nicht laufen:', err);
  process.exit(1);
});

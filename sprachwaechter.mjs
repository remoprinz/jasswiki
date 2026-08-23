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

// --- G: die Ordnung des Blatts ------------------------------------------------
/**
 * Remo, 20.08.2026: «die tiefste karte muss immer links sein. die höchste rechts!!!
 * wobei nell und puur einfach als 9 und U gelten. also immer von links nach rechts
 * 6, 7, 8, 9, 10, U, O, K, A — immer!!! auch wenn wir ein hoch-tief beispiel haben
 * muss das ass rechts sein.»
 *
 * Der Rang der Karte im Spiel bleibt davon unberührt: Puur und Nell stechen weiterhin
 * alles, sie stehen bloss dort, wo das Auge sie sucht. Was eine Reihe zeigen soll,
 * sagt die Bildlegende, nie die Reihenfolge. Ganze Doktrin: regelauskunft/KARTENBILD.md
 */
const KARTEN_ORDNUNG = ['6', '7', '8', '9', 'banner', 'under', 'ober', 'koenig', 'ass'];

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
  // Dieselbe Fügung mit umgestellten Wörtern: «Zieht er zu wenig Trumpf», «zieht er die
  // Trümpfe seines Partners mit». Beide standen am 19.08. im Hoch-tief-Artikel und kamen
  // an der Zeile darüber vorbei. «Ausziehen» bleibt erlaubt: Remo, 19.08.: «sie werden
  // gespielt oder sie werden ausgezogen».
  // Das \b vorne lässt «anziehen» und «ausziehen» als eigene Wörter durch.
  [/\b(zieht|ziehen|zog|zogen)\b[^.!?]{0,40}\bTrümpfe?\b(?![^.!?]{0,40}\baus\b)/i,
   'Trumpf zieht man nicht. Es heisst austrumpfen, oder «die Trümpfe ausziehen».'],
  [/Trümpfe? (fallen|fällt)|gefallene? Trümpfe|Gefallen sind/i, 'Trümpfe fallen nicht, sie werden gespielt oder ausgezogen (Remo, 19.08.).'],
  // Dieselbe Fügung im Präsens, ohne Umlaut und als Hauptwort — alle drei Formen
  // gingen am 23.08. durch die Zeile darüber: «die Karte fällt» (13 Stellen),
  // «der Trumpf fällt», «nach dem Trumpfziehen». Im Korpus meint «Karte fällt»
  // ausschliesslich den Spielfehler (karte_faellt_runter) — der bleibt erlaubt.
  [/(Karten?|Trump(f|fs)|Ass|Nell|Puur|Ober|König|Banner) fällt(?! (runter|herunter|zu Boden))|fallen (die|zwei|drei|vier) (Karten|Trümpfe)/i,
   'Karten fallen nur zu Boden. Gespielte Karten werden gespielt, gelegt oder gestochen.'],
  [/Trumpfziehen|Trumpf-Ziehen/i, 'Das Hauptwort zur gestrichenen Fügung. Es heisst «das Austrumpfen».'],
  // Dieselbe Fügung als Partizip: «die im Stich gefallenen Karten» (19.08. in einer FAQ).
  // Das \b vorne lässt die «heruntergefallene Karte» durch, die wirklich am Boden liegt.
  [/\bgefallene[nr]?\b|im Stich gefallen|(Karte|Karten|Trumpf|Trümpfe|Ass|Nell|Puur)\s+ist gefallen/i,
   '«Gefallen» gehört nicht zu den Karten. Es heisst «gespielt» oder «ausgezogen».'],
  // «die Karte, die Vorhand ausspielt» ist ein Relativsatz und bleibt erlaubt,
  // darum der Ausschluss von «, die Vorhand».
  [/(?<!, )\b[Dd]ie Vorhand\b|\b[Dd]er Vorhand\b|\b[Dd]ie Hinterhand\b|\b[Dd]ie Mittelhand\b/, 'Vorhand steht ohne Artikel (Remo, 19.08.).'],
  [/Karte werfen|wirft eine Karte/i, 'Es heisst spielen, oder verwerfen, wenn eine Fremdfarbe gemeint ist.'],
  [/nimmt den Tisch|den Tisch nehmen/i, 'Der Tisch ist das Möbel. Gemeint sind die Karten in der Mitte: «aufnehmen».'],
  [/läuft zusammen auf/i, 'Gemeint ist «zählt gegen das Gebot».'],
  [/in die Mittelhand/i, 'Am Tisch heisst das «den König in die Zange nehmen» (Remo, 18.08.).'],
  [/das Spiel in die Hand nehmen/i, 'Bild aus der Sportberichterstattung.'],
  // Remo, 23.08.2026: «es heisst tief höher». Das blanke «tief-hoch» war unsere
  // eigene Maschinen-Prägung (0 echte Belege, 9 eigene Artefakte); in Remos
  // Transkripten steht «tief-höher» 25-mal.
  [/tief-hoch(?!-)/i, 'Die Konvention heisst hoch-tief / tief-höher (Remo, 23.08.).'],
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
  // Artikel-ID → Kartenreihen, die absichtlich anders stehen als das Blatt.
  // Erlaubt ist genau ein Grund: Die Reihe ZEIGT eine Rangfolge, ihre Ordnung ist
  // also der Inhalt. Sortiert man sie ins Blatt, zeigt sie nichts mehr. Alles
  // andere folgt der Ordnung 6 7 8 9 Banner Under Ober König Ass.
  kartenreihen: {
    variants_strategic_bieder: [
      'schellen-under, schellen-9',   // Stichfolge im Trumpf
      'eichel-ass, eichel-koenig',    // Stichfolge im Obenabe
      'rosen-ass, rosen-koenig',      // Stichfolge im Hindersi
    ],
    variants_strategic_pandur: [
      'schellen-under, schellen-9',   // Trumpffarbe in ihrer Stichfolge
      'eichel-ass, eichel-koenig',    // jede andere Farbe in ihrer Stichfolge
    ],
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
    // Auch die Metadaten laufen durch jede Wortprüfung: Am 23.08.2026 stand
    // «zieht die Trümpfe» in einer seoDescription — die Fügung, für die der
    // Riegel gebaut war, ging als Suchergebnis hinaus, weil hier nur Text und
    // FAQ standen.
    const meta = artikel.metadata || {};
    const alles = [
      text,
      ...faqs.map((f) => `${f.question} ${f.answer}`),
      meta.seoTitle || '', meta.seoDescription || '', meta.titel || '',
    ].join('\n');
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

    // G — Kartenreihen stehen immer in der Ordnung des Blatts.
    // Eine hervorgehobene Karte trägt ein Ausrufezeichen am Slug
    // («rosen-koenig!»); für die Ordnung zählt der Slug darunter.
    for (const reihe of text.matchAll(/\[\[karten:\s*([^|\]]+)/g)) {
      const eintraege = reihe[1].split(',').map((s) => s.trim()).filter(Boolean);
      const slugs = eintraege.map((e) => e.replace(/\s*!$/, ''));
      if (AUSNAHMEN.kartenreihen?.[schluessel]?.some((a) => reihe[0].includes(a))) continue;
      // Eine verschriebene Hervorhebung («!slug», «slug!!») lässt die Karte im
      // Artikel verschwinden — still, wie jeder Slug, den es nicht gibt. Beim
      // Schreiben steht sie darum hier.
      const verschrieben = slugs.filter((s) => s.includes('!'));
      if (verschrieben.length > 0) {
        fehler.push({
          artikel: schluessel,
          pruefung: 'G · Hervorhebung verschrieben',
          fund: `«${verschrieben.join(', ')}»`,
          warum:
            'Hervorgehoben wird mit genau EINEM Ausrufezeichen am Schluss des Slugs: «rosen-koenig!». Anders geschrieben fällt die Karte aus dem Bild.',
        });
      }
      const gesehen = [];
      let vorigeFarbe = null;
      let vorigerRang = -1;
      for (const slug of slugs) {
        const strich = slug.lastIndexOf('-');
        const farbe = slug.slice(0, strich);
        const rang = KARTEN_ORDNUNG.indexOf(slug.slice(strich + 1));
        if (rang < 0) continue;
        if (farbe !== vorigeFarbe) {
          if (gesehen.includes(farbe)) {
            fehler.push({
              artikel: schluessel,
              pruefung: 'G · Kartenreihe verkehrt sortiert',
              fund: `Farbe «${farbe}» kommt in «${slugs.join(', ')}» zweimal vor`,
              warum: 'Eine Reihe ordnet nach Farbe, jede Farbe steht am Stück (Remo, 20.08.).',
            });
            break;
          }
          gesehen.push(farbe);
          vorigeFarbe = farbe;
          vorigerRang = rang;
          continue;
        }
        if (rang < vorigerRang) {
          fehler.push({
            artikel: schluessel,
            pruefung: 'G · Kartenreihe verkehrt sortiert',
            fund: `«${slugs.join(', ')}»`,
            warum: 'Links steht die tiefste Karte, rechts die höchste: 6, 7, 8, 9, Banner, Under, Ober, König, Ass. Nell und Puur zählen dabei als Neun und Under (Remo, 20.08.). Was gemeint ist, sagt die Bildlegende.',
          });
          break;
        }
        vorigerRang = rang;
      }
    }

    // G — dasselbe Zeichen im Blatt am Jasstisch: «blatt eichel-6!, eichel-9».
    // Hier wiegt eine verschriebene Hervorhebung schwerer als in der Reihe: Der
    // Tisch nimmt das Blatt nur als Ganzes an, ein Slug, den es nicht gibt,
    // lässt darum die GANZE Hand verschwinden.
    for (const tisch of text.matchAll(/\[\[tisch:[\s\S]*?\]\]/g)) {
      for (const teil of tisch[0].matchAll(/(?:^|\|)\s*blatt\s+([^|\]]+)/g)) {
        const slugs = teil[1]
          .split(',')
          .map((s) => s.trim().replace(/\s*!$/, ''))
          .filter(Boolean);
        const verschrieben = slugs.filter((s) => s.includes('!'));
        if (verschrieben.length === 0) continue;
        fehler.push({
          artikel: schluessel,
          pruefung: 'G · Hervorhebung verschrieben',
          fund: `«${verschrieben.join(', ')}» im Blatt`,
          warum:
            'Hervorgehoben wird mit genau EINEM Ausrufezeichen am Schluss des Slugs: «eichel-6!». Anders geschrieben fällt das ganze Blatt aus dem Bild.',
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

/**
 * SPRACHLISTEN — gemeinsamer Bestand zweier Riegel (A1, 22.11.2026)
 *
 * Der Sprachwächter (`sprachwaechter.mjs`) prüft die Inhaltsdatei, der Seitenprüfer
 * (`pruefe-seite.mjs`) die gebaute Seite in `out/`. Beide lesen dieselben Listen,
 * damit ein Wort, das SCHIRI hier sperrt, an beiden Stellen gesperrt ist.
 *
 * Die Listen stehen hier unverändert so, wie sie im Sprachwächter standen.
 * Jede Zeile ist ein Entscheid; die Begründungen gehören dazu.
 */

// --- B: Wörter, die kein Jasser am Tisch sagt --------------------------------
// Jedes hier stand einmal in einem Artikel und musste wieder heraus.
export const FREMDWOERTER = [
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
export const WENDUNGEN = [
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
export const GEDANKENSTRICH = /—| – /;

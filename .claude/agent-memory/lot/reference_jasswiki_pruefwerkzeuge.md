---
name: jasswiki-pruefwerkzeuge
description: Prüfläufe im jasswiki-Repo für Artikel-Kaltlesungen (Sprachwächter, Farbwörter-Loch-Prüfung, Karten-Slugs, Anker/Redirects) und der Quellen-Zugriff auf jassverzeichnis via WordPress-API
metadata:
  type: reference
---

Nachrechenbare Gegenproben bei einer jasswiki-Kaltlesung — alle im Repo-Root
`/Users/remoprinz/Documents/Jassguru/jasswiki`:

- `npm run sprache` — Sprachwächter über alle Artikel; meldet Anweisungen auf einer
  Verneinung. **Blinder Fleck:** beschreibende Verneinungen («es gibt keinen Trumpf,
  keinen Weis») laufen durch, ebenso Behauptungen ohne Deckung.
- `npm run pruefe:farbwoerter -- <kennung>` — prüft, ob nach dem Wechsel aufs
  französische Blatt noch Deutschschweizer Kartenwörter im sichtbaren Text stehen.
  **Blinder Fleck:** ohne Argument läuft nur `variants_strategic_sidi_barrani`
  (`farbwoerter-pruefen.ts:113`). Jeden Artikel mit `metadata.farbwechsel: true` von
  Hand nachschieben.
- **Kartenreihen:** Slugs `<farbe>-<rang>` gegen `src/components/wissen/jasskarten.ts`
  (RANKS_DE/SUITS_DE) prüfen. Ein unbekannter Slug lässt die Abbildung still
  verschwinden. Unter jeder Karte steht `karte.name` («Rosen Banner») — die
  Beschriftung muss zu diesem Wort passen, auch im französischen Blatt («Herz Zehn»).
- **Farbwechsel greift nur im Fliesstext.** `FaqSection` rendert die Antworten roh
  über ReactMarkdown ohne `farbwoerterFr`; der Fliesstext läuft über `InternalLinker`
  mit `farbwechsel`. Kartenwörter in FAQ-Antworten bleiben darum beim Wechsel stehen.
- **Anker in firebase.json-Redirects** (`/…/#abschnitt`) gegen `toSlug` in
  `src/lib/utils.ts` rechnen: ö→oe, ü→ue, Leerzeichen→Bindestrich. «Stöck in einzelnen
  Jassarten» → `stoeck-in-einzelnen-jassarten`.
- **Kollateral bei Zusammenlegungen:** `diff <(git show HEAD:…json | jq -S 'del(.a,.b)')
  <(jq -S 'del(.a,.b)' …json)` — leer heisst: kein anderer Artikel berührt.
  `public/llms-regeln.md` und `public/dataset/jasswiki-corpus.jsonl` werden im Build
  neu erzeugt (package.json `build`), alte Artikel darin sind kein Befund.

**Quellen jassverzeichnis.ch:** die Seiten sind React-gerendert, `curl` liefert leer.
Über die WordPress-API holen:
`curl -sL "https://cms.jassvz.ch/wp-json/wp/v2/posts?slug=SLUG" | jq -r '.[0].content.rendered' | sed 's/<[^>]*>//g'`
Wikipedia-Wikitext: `https://de.wikipedia.org/w/api.php?action=parse&page=TITEL&prop=wikitext&format=json`.

Ergänzt [[kaltlese-protokoll]] und [[sollwerte-im-auftrag-pruefen]]: Diese Läufe sind
repo-interne Autorität, kein Fremdwissen.

**Nachtrag 18.08.26 (Hose abe):** Die jassverzeichnis-Artikel tragen Regeln oft nur in den
**Bildern** (`<img src>` im `content.rendered`, z. B. `Hose-Abe_10.jpg` = drei Farben zählen die
höchste Einzelkarte, `_19.jpg` = zwei Farben zählen die höhere Summe, `_33.jpg` = Füür im Dach mit 33).
Der gestrippte Text schweigt dazu. Also: `grep -oE 'src="[^"]*"'`, Bilder laden und mit dem Read-Tool
ansehen, sonst fehlt der Beleg für die Zählregeln. Bestätigt: `FaqSection` bekommt in
`src/pages/varianten/[topic]/index.tsx` kein `farbwechsel`, FAQ-Kartenwörter bleiben deutsch.

**Nachtrag 18.08. (Pandur-Kaltlese):**
- **Verweis-Regex kennt nur Umlaute:** `src/components/wissen/verweise.ts` (Stufe 2,
  `[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß\w-]*`) fasst vor `(siehe Begriff …)` kein è/é/ê. «Misère
  (siehe Begriff …)» wird live zu `Misè<a>re</a>`. Jede Kaltlese: Wörter mit Akzent vor einer
  Marke im Live-HTML nachsehen (`grep -o '.\{40\}misere/">[^<]*</a>' seite.html`).
- **«Quelle X liest es ebenso» an der TABELLE der Quelle messen**, nicht am Absatz, den der
  Autor zitiert. Beim Pandur stimmte der Ablauf mit dem Jassverzeichnis überein, die
  Rangordnung in dessen Tabelle sagte das Gegenteil.
- **Quellenblatt-Block «Was Müller NICHT nennt» gegen den Artikel abhaken:** jede dort
  gelistete Lesart muss im Text als Verbandslesart markiert sein. Beim Pandur fehlte der
  Vermerk bei zwei von sieben («erster in Spielrichtung», Erben-Schreibweise).

**Nachtrag 18.08. (Stöck-Kaltlese, Runde 2 nach Deploy):**
- **Commit-Botschaft nach «geloescht/unbelegt» lesen und den Text auf den Inhalt abklopfen:**
  Beim Stöck-Artikel stand im Commit «weis_rules_stock_hindersi (unbelegt) geloescht», der Inhalt
  lebte im neuen Text als «Manche Runden rechnen …» weiter. Ein Hedge («manche Runden», «mancherorts»)
  ohne Quelle ist der Ort, wo Gestrichenes überlebt. Griff: `git show <commit>^:…json | jq -r '.<alte_id>.text'`
  gegen den neuen Text halten.
- **Weis-Bedingungen: «am Tisch» ≠ «bei der Partei».** «wenn kein höherer Weis am Tisch liegt» ist falsch,
  sobald der Partner den höheren hält (die Partei mit dem höchsten Weis schreibt alle ihre Weise). Jede
  Weis-Bedingung darauf abklopfen, ob sie den Partner mitmeint.
- **Zugewiesene Quellen einzeln abhaken:** je Slug einen Satz im Artikel finden. Bei Stöck fehlte genau
  eine von acht (Stöck + Dreiblatt gegen Vierblatt) — die Lücke, die FAQ 6 («zählen immer») zur Falle macht.
- **Zwei-Sprung-Redirects:** Präfix-Regel (`/stoecke/` → `/stoeck/`) greift in firebase.json vor der
  Direktregel mit Anker; `curl -sIL … | grep -E '^HTTP|^location'` zeigt die Kette.

**Nachtrag 18.08. (Bieter-Kaltlese):**
- **Reichweite des Quellenblatt-Digests zuerst lesen** («Für 3 Spieler …»). Beim Bieter deckte
  der Digest nur zu dritt, der Artikel trug zu viert/fünft (350, Eichel-Siebner, Strich-Tafel)
  als «nach der Quelle». Was der Digest nicht trägt, ist unprüfbar und wird so gemeldet, nie
  still als «hält» gezählt.
- **`farbwechsel: true` + Satz mit französischem Farbnamen = Selbstwiderspruch nach dem
  Umschalten.** «Eichel-Siebner, im französischen Blatt der Schaufel-Siebner» wird zu
  «Kreuz-Siebner … Schaufel-Siebner» (`farbwoerter.ts` Z. 18/21: Eichel→Kreuz, Schilten→Schaufel).
- **Beispieltafel gegen die Schreib-PRAXIS des Textes halten, nicht nur die Summen.** Summen
  stimmten (249/529), aber der Text sagte «gleich gutschreiben» und die Tafel schrieb die 23
  als eigene Zeile nach Spiel 4. Zeitpunkt-Äquivalenzen («läuft auf dasselbe hinaus») am
  Zieleinlauf nachrechnen (590+23 gewinnt sofort, 590 allein spielt weiter).
- **Zweite Quelle auf ZWEIERLEI MASS prüfen:** wird ihre eine Abweichung als Praxis geführt
  (500 statt 600) und ihre andere als «falsch gehandhabt» (fort endgültig)? Beide stehen im
  selben Absatz der Quelle. Dazu die Bildlegenden der jassverzeichnis-Seite lesen (Ausspiel
  im 1. Spiel: «Der Alleinspieler spielt aus», der Text schwieg).
- **Renderer streicht Guillemets vor `(siehe Begriff …)`** in Tabellenzellen: «1 «Härdöpfel»
  (siehe …)» wird live zu «1 <a>Härdöpfel</a>», die Nachbarzelle behält «…». Kosmetik, aber
  sichtbar.

**Kartenbild-Themen (Kaltlese Jasskarten 18.08.):** Die Kartenbilder im Repo sind
Beweismittel gegen den Text — `public/cards/de|fr/<farbe>-<rang>.webp` und
`public/suits/<farbe>.png` mit dem Read-Tool ansehen (die Rose ist gelb mit roter Mitte,
die Banner-Fahne trägt das Farbzeichen, die 10 steht im Eckindex). Wikipedia hat KEINE
Artikel «Jasskarten»/«Schweizer Spielkarten»; die Kartenbild-Aussagen stehen in «Jass»
(Abschnitte Kartenbild um 1880 / «französisches» Bild / Karten), «Schweizer Blatt» und
«Brünig-Napf-Reuss-Linie» (dort auch «50 bis 100 km» zum Röstigraben). Wikipedias
Peyer-Satz ist mit IPCS `i-p-c-s.org/pattern/swiss-g.html` belegt, und IPCS erzählt es
anders (Peyer = Müllers Zeichner um 1920). Haas-Aufsätze auf e-periodica: Volltext hinter
Captcha, Autor/Titel/Seiten über DataCite holen
(`curl -L -H "Accept: application/vnd.citationstyles.csl+json" https://data.crosscite.org/<DOI>`).
Verbandsname im Bestand: «Jassverband Schweiz» (18×), nie «Schweizer Jassverband».

**Nachtrag 18.08. (Nachbarn-Prüfung, zehn neue Artikel gegen ihre Begriffe):**
- **Nachbarn-Griff in vier Läufen:** (1) `jq -r '.ID.text' | grep -o 'siehe Begriff "[^"]*"' | sort -u`
  je Artikel, Markdown-Links (`/varianten/…/`) extra sammeln, weil bietrunde nur die nutzt.
  (2) Ganzen Bestand flach machen: `jq -r 'to_entries[] | .key as $k | ([.value.text] +
  [.value.faqs[]? | (.question+" "+.answer)]) | .[] | gsub("\n";" ") | "\($k)\t\(.)"' > _flat.tsv`,
  dann `grep -F … | cut -f1 | sort | uniq -c` für Genus, Zahlen, Namen. (3) `comm -23
  <(alle siehe-Begriff-IDs) <(jq keys)` = hängende Verweise (18.08.: keine). (4) Live-Curl
  eines Zielartikels: FAQ-Marken **werden aufgelöst** (bauernpartei: «Team» ist Link) —
  die Zeile oben («FaqSection rendert roh») gilt für Marken nicht mehr, nur der Farbwechsel
  ist dort weiter offen.
- **ugrep-Fallen:** `.{0,200}` vor einem Treffer auf den langen Artikelzeilen läuft in
  «exceeds complexity limits» oder Minuten. Stattdessen `grep -F` plus `cut -f1`, oder
  `-o -E "[^ ]+ [^ ]+ Wort[^ ]* [^ ]+"`. In zsh `${w}` schreiben, `$w[a-z]` ist ein Subscript.
- **ID-Fallen im Bestand:** Artikel-ID `matsch` ist «Schieber-Varianten» (Punktezählung),
  der Matsch-Begriff heisst `expressions_matsch`; drei Artikel verlinken falsch. Das Wort
  «Trumpf/Trumpffarbe» zeigt in 25/21 Altartikeln auf `bodentrumpf` (aufgedeckte Karte),
  auch dort, wo angesagt oder geboten wird. Dubletten: `trumpf_bauer`/`expressions_trumpf_bauer`,
  `kontermatsch`/`expressions_kontermatsch`, `expressions_passen`/`expressions_fort` (passen
  widerspricht fort beim Bieter).
- **Drei-Bedeutungen-Wörter** (Hindersi: Jassart / Bieter-Ansage / Familie; Misère:
  Null-Stich-Ansage / Punkte-Umkehr; Klopfen: Verbot / Hose-abe-Zug): der Begriff kennt
  meist nur die Schieber-Lesart. Immer fragen: welche Lesart braucht der neue Artikel, der
  hierher zeigt?
- **Genus-Stand 18.08.:** Nell/Banner/Weis/Puur im ganzen Bestand sauber bis auf «Der Nell»
  (general_card_values FAQ). «der Stöck» 2× Sidi, «Stöcke» Bieter-FAQ, schafhauser,
  ausmachen_schneider. Misère 3:1 maskulin (Bieter «die Misère»), Härdöpfel maskulin im
  Bestand, Bieter «jedes Härdöpfel».

**Nachtrag 18.08. (Zweitlesung Weis/Stöck/Kreuzweis nach den Fixes):**
- **Fixes bringen Vorgriffe und leere Verweise mit.** Jeder neu eingefügte Satz der Bauart «Mehr dazu im
  Artikel X», «dieselbe Reihenfolge», «mit derselben Frist» gegen das Ziel halten: Steht es dort / steht es
  schon davor? Beim Stöck-Fix zeigte «Mehr zu den alten Regeln steht im Artikel Weis» auf einen Artikel mit
  einem einzigen Nebensatz dazu. Griff: `diff <(git show HEAD:…json | jq -r '.ID.text' | tr '.' '\n') <(…)`
  und jede Plus-Zeile mit Verweis oder «dasselbe/derselben» einzeln prüfen.
- **«Wie beim gewöhnlichen X» ist ein Querverweis ohne Link:** Der Nachbar muss die Regel wirklich tragen
  (Stöck sagte «wie beim gewöhnlichen Weis, bis der Stich gekehrt ist», der Weis-Artikel hatte die Deck-Regel gar nicht).
- **Ein Verb für zwei Schritte** («genannt» für Punktzahl-Meldung und für Deklaration) macht eine Frist
  doppeldeutig. Bei Melde-Abläufen jedes Verb dem Schritt zuordnen.

**Nachtrag 18.08. (Zweitlesung Hose abe / Jasskarten / Farbartikel):**
- **Regionenliste Karten:** Wikipedia «Jass» (Beleg Haas S. 134, Atlas Karte 141a) zählt Thurgau ganz und
  «Teile Graubündens» zu den französischen Karten, «Schweizer Blatt» den Thurgau zum Deutschschweizer Blatt —
  «Thurgau geteilt» steht in keiner Quelle. Tessin und Graubünden liegen südlich/östlich, nie «westlich der
  Linie» (Brünig 8,1° Ost). Griff: Kantone der Liste einzeln gegen beide Wikipedia-Artikel abhaken, Himmelsrichtung
  getrennt von Kartenwahl prüfen.
- **IPCS swiss-g** (curl, `LC_ALL=C grep -a`): Bühlmann Hasle 1880 einköpfig, Müller 1920 doppelköpfig, Peyer als
  Müllers Zeichner. Ein Satz «geht auf Peyer und Bühlmann zurück» deckt Wikipedia und IPCS zugleich, «Peyer 1870er
  bei Bühlmann» nur Wikipedia.
- **Riedweg-Blatt als Individualisierungsquelle:** Under-Figuren erkennbar (Schellen Narrenkappe+Pfeife, Schilten
  Brief, Rosen Rose+Pfeife), Banner = Fahne mit zwei Zeichen (nicht zehn), Ass = zwei Zeichen, 6–9 = Anzahl.
  Griff für «Schablone oder eigen»: Satzbau-Reihenfolge der acht Texte nebeneinander legen, wortgleiche FAQ zählen.
- **Fixes wandern in die FAQ nicht mit:** Text bekam «ohne Trumpf», FAQ 3 blieb «Beim Jassen … tiefe Karten null».
  Nach jedem Fix die FAQ desselben Artikels auf den alten Wortlaut greppen.

**Nachtrag 18.08. (Zweite Runde Pandur/Sidi):** Nach einem Text-Umbau **FAQ und Grundform-Bullets
gegen den Text diffen** — dort blieben alte Fassungen stehen (Sidi FAQ 9 «einer Runde», FAQ 14
«täglich»/«Überliefert», obwohl der Text nachgezogen war; FAQ geht als FAQPage-Schema live) und
Vermerke fielen weg (Sidi-Grundform verlor «So empfiehlt es der Verband, siehe unten» beim fort).
Griff: `git show HEAD:…json | jq -r '.ID.text'` gegen den Arbeitsstand diffen, dann FAQ separat.
Zweiter Griff: Wo der Artikel eine Verbandslesart setzt, jede Fremdquelle abhaken, die dazu spricht
— beim Pandur-Weis blieb das Jassverzeichnis («höchster Weis», gleich wo er sitzt) unerwähnt,
obwohl der Artikel sonst jede JV-Abweichung nennt. jassverzeichnis-API weiterhin über
`cms.jassvz.ch/wp-json/wp/v2/posts?slug=…` (die Hauptdomain liefert nur die React-Hülle).

**Nachtrag 18.08. (Zweitlesung Bieter/Bietbegriffe nach den Fixes, vor Deploy):**
- **Fixes fressen Marker.** Wird ein Satz umgebaut, fällt der Quellen-Nachsatz gern mit («Gewiesen
  wird mit den Handkarten. So hält es das Jassverzeichnis, die Quelle schweigt» → nur noch der
  Regelsatz). Bei jeder Zweitlesung die alte Fassung (`bieter-text.md` im Scratchpad oder
  `git show HEAD:…json | jq -r '.ID.text'`) neben die neue legen und die Block-Liste «Was Müller
  NICHT nennt» ein zweites Mal abhaken. Fixes drehen auch Zuschreibungen um (fort/Pandur: aus
  «Verband empfiehlt» wurde «gilt», beides ungenau).
- **Neue Sätze aus Fix-Vorschlägen tragen keine Quelle von selbst.** «Er sagt es, bevor die erste
  Karte fällt» kam aus dem Vorschlag (JVZ), stand danach unmarkiert. Jeden Vorschlag, der ins JSON
  wandert, wie einen fremden Satz prüfen (Quelle? Marker?).
- **Farbwechsel + Quellenzuschreibung einer Karte:** «bei Müller der Eichel-Siebner» wird im
  französischen Blatt zu «bei Müller der Kreuz-Siebner», Müller nennt dort die Schaufel. Karten,
  die einer Quelle zugeschrieben werden, gehören in FAQ (kein Farbwechsel) oder ins Quellenblatt.
- **Tafel-Umbau zieht Textsätze nach:** Spiel 1 wurde 94 → 117, der Satz «94 und 40 stehen
  nebeneinander» blieb. Nach jeder Zahlenkorrektur alle Sätze grepen, die die alte Zahl nennen.
- JVZ Bieter-Bilder: `03-GBieter-erste-Spielrunde` = «Legt 6 … ab und beginnt danach das Spiel»
  (König spielt im 1. Spiel aus), `01-…Karten-und-Gebot` = Vorhand (rechts der Geberin) bietet zuerst.

**Nachtrag 19.08. (Wortlaut-Eichung Paket 3, Bericht + Patch-Datei):**
- **Verweis-Marker `(siehe Begriff "…")` sind in Fliesstext und FAQ NIE ein Fund.**
  `src/components/wissen/verweise.ts` wandelt sie in Links, `src/components/seo/FaqJsonLdSchema.tsx`
  schickt Frage und Antwort vor dem FAQPage-Schema durch `verweiseZuText(ohneKartenMarken(…))`.
  Live steht sauberer Text. Ich habe einen solchen «Marker in FAQ-Antwort» als schwersten Fund des
  Pakets gemeldet — falsch, und ein anderer Leser hatte denselben Fehler schon gemacht.
- **🚨 KORREKTUR 20.08.: in BILDLEGENDEN überlebt der Marker bis ins ausgelieferte HTML.**
  Gemessen an `/taktiken-und-strategien/kommunikation-signale/austrumpfen-hoch-oder-tief/`:
  im `<p>` wird `(siehe Begriff "expressions_matsch")` sauber zum `<a href="/begriffe/…/matsch/">`,
  im `<span class="jw-karten-text">` steht «… Nell-vor-Puur (siehe Begriff
  &quot;schieber_taktiken_nell_vor_puur&quot;)» sichtbar auf der Seite (2 Fälle). Der einzige
  Link der Legende (`jw-karten-link`) zeigt pauschal auf `/grundlagen-kultur/jasskarten/`.
  **Also: Marker im Fliesstext/FAQ ignorieren, Marker in `[[karten: … | Legende]]` immer per
  curl gegen das Live-HTML prüfen** (`grep -oE ".{140}siehe Begriff.{80}" live.html` — die
  Treffer mit `&quot;` und `<span` sind gerendert, die mit `\"` und `\n\n` sind nur `__NEXT_DATA__`).
- **Patch-Paare gegen einen jq-Auszug prüfen, nie gegen das Paket-Dokument.**
  `jq -r '.[] | (.text // ""), (.metadata.seoDescription // ""), ((.faqs // [])[] | .question, .answer)'
  → flat.txt, dann `while IFS= read -r l; do grep -c -F -- "$l" flat.txt; done`. Treffer muss **1**
  sein: 0 = Paket-Dokument veraltet, 2 = Satz steht wortgleich in `text` UND in einer FAQ-Antwort
  (dann per Hand, ein einzeiliger Patch kann ihn nicht eindeutig treffen — betraf 3 von 99 Paaren).
- **Das Paket-Dokument war an einer Stelle veraltet:** `mischen` FAQ 1 stand dort als «Wie
  funktioniert Mischen beim Jassen?», im JSON längst «Wie werden die Karten gemischt?».
- **Erfundene Wörter im ganzen Bestand zählen**, bevor man sie in einem Artikel herausnimmt:
  `jq -r 'to_entries[] | select((.value.text // "") + ((.value.faqs // []) | map(.question + .answer)
  | join(" ")) | test("WORT")) | .key'`. «stechmässig» sass in 5 Artikeln, «Minusstrich» in 4.
- **Fundstelle vor Zahl, drei Kreisschlüsse gefunden:** «Stechreihenfolge» (1 Treffer = Zitat des
  geprüften Satzes), «punktreichste» (5 = Engine-Symbole `_sel_endspiel_punktreichste`),
  «Neuverteilung»/«Spielgeber» (Transkript zitiert wörtlich den geprüften Artikel).
- **Belegt und darum stehengelassen** (wikipedia/jassverzeichnis/transkript): Team 7/126/240 ·
  Trumpf-Bauer 0/21/3 · Stechkarte 0/3/0 · Spielzug 1/6/0 · höherwertig 4/1/0 · mischelt 0/5/0 ·
  Kartengeber 1/27/0 · Zählweise 0/10/5 · und/oder 3/5/8. **Nicht belegt:** Farbe bekennen (1
  Treffer, aber im Troccas-Teil = Skat-Sprache) · Spielgeber · Erstausspieler · entwertet ·
  zugeschmiert · Trumpfkraft · Minusstrich · Neuverteilung · Punktesystem · Sammelbezeichnung ·
  in Echtzeit · deutsche Karten (belegt: deutschschweizer 0/52/4).

**Nachtrag 19.08. (Paket 7, 72 Patch-Paare):**
- **Alle Kandidaten in EINEM Durchgang prüfen** statt in einer Schleife:
  Muster zeilenweise in `patterns.txt`, dann
  `grep -o -F -f patterns.txt flat.txt | sort | uniq -c`. Zahl > 1 = mehrdeutig;
  `comm -23 <(sort -u patterns.txt) <(grep -o -F -f patterns.txt flat.txt | sort -u)`
  listet die, die **gar nicht** treffen.
- **Doppelte (Text + FAQ) rettet man mit dem Aufzählungszeichen oder dem Schlusspunkt.**
  Der Artikeltext trägt «• » am Zeilenanfang, die FAQ-Antwort trägt den Punkt am Ende —
  beides macht dasselbe Zitat eindeutig. So liessen sich 8 von 8 Doppelten retten,
  ausser einem: bei `vorspielen` ist die ganze FAQ-Antwort ein **Präfix** des
  Artikeltexts. Da hilft kein Kontext, das geht von Hand.
- **Mehrzeilige alte Texte sind erlaubt** und lösen den Fall «erster Satz steht in Text
  und FAQ»: die Etikette der Zeile davor mitnehmen («Definition:\n<Satz>»).
- **Zwei Ersetzungen auf derselben Zeile müssen zusammen Sinn ergeben.** «ist die zuerst
  genannte Variante» → «gilt die zuerst genannte Ansage» kippt das Satzende
  («… gilt … verbindlich»); darum das Satzende im selben Patch mitziehen.

**Nachtrag 19.08. (Paket 6, 72 Patch-Paare) — und ein Rückfall:**
- **Ich habe die Marker-Regel trotz Gedächtniseintrag erneut gebrochen.** Der Absatz oben
  («Verweis-Marker sind NIE ein Fund») stand schon da, ich habe die Marken in Paket 6 doch
  wieder als Formatfund gemeldet und musste zurückrudern. **Griff: vor dem ersten Fund die
  eigene Nachtragsliste einmal durchlesen, nicht erst beim Schreiben.** Was am Marker
  bleibt, ist das **Ziel** — «Trumpffarbe» → `bodentrumpf` usw.
- **`grep -oE` mit VORLAUF (`.{0,120}wort`) auf `remo-transkript.txt` läuft in den Timeout**
  (1,6 MB, sehr lange Zeilen, Backtracking). Zweimal passiert. Nur Nachlauf greppen
  (`grep -oiE "wort.{0,180}"`); braucht man den Vorlauf, `tr '.' '\n' < datei | grep -i wort`
  — liefert den ganzen Satz und ist sofort da.
- **Patch-Datei am Stück prüfen statt Zeile für Zeile:**
  `csplit -s -f p -n 2 PATCH-N.txt '/^@@@@$/' "{$(($(grep -c '^@@@@$' PATCH-N.txt)-1))}"`,
  dann je Stück den Block vor `====` gegen flat.txt zählen. Mehrzeilige Paare melden dort
  falsch (grep zählt je Zeile) — die einzeln mit
  `jq --rawfile o alt.txt '[.[] | select((.text//"")|contains($o|rtrimstr("\n")))]|length'` prüfen.
- **Kartenbild-Beweis hält wieder:** `public/cards/de/schilten-under.webp` zeigt den Brief,
  `schilten-ass.webp` zwei Schilde — beide Aussagen von `color_schilten` bestätigt, obwohl
  keine Textquelle sie trägt.
- **Dubletten-Familie Hindersi:** `variants_specialty_hindersi` und `…_vier` sind fast
  derselbe Artikel (beide «für vier Spieler»), `…_drei` weicht ab. Sätze aus dem
  Grundregeln-Block treffen darum zweimal; Etikette der Zeile davor mitnehmen.
- **Molotow-Namensherkunft:** jassverzeichnis sagt «Molotow war ein russischer Politiker,
  welcher die Finnen im zweiten Weltkrieg belog» — das jasswiki behauptete
  «Molotow-Cocktails / explosive Dynamik». Erfundene Etymologie, keine Quelle.
- **«Glücksspiel» ist kein Jass-Wort** (0/0/1, und der eine Treffer ist ein Bild). In der
  Schweiz zudem rechtlich besetzt. `variants_multi_player_rumba` führt es im Text UND in
  der Kategorie.
- **Belegt und darum stehengelassen:** Tischweis 7/0/0 · Stechzwang 2/0/0 · Ablupf 7/0/0 ·
  bessern 13/0/15 · Wand 0/0/7 (Remo: «eine wand bezeichnet, dass man viele karten von
  einer farbe hat») · Funktionskarten 0/1/0 (Wikipedia, Tschau-Sepp-Kontext) ·
  Bergpreis = «Hälfte der Gesamtpunktzahl». **Nicht belegt:** Farbverrat · Handweis ·
  Klopfer · Kartenhierarchie · Gestenkommunikation · Spielmodi · Kartenbewertung ·
  Trumpfsystem · Spielmechanik · Einbettung · Personalisierungsoptionen · Timing
  (0/0/7, ein Treffer verwirft es: «kein Jass-Begriff»).

**Nachtrag 19.08. (Paket 5, 67 Patch-Paare) — die ganze Patch-Datei mit EINEM jq prüfen:**
```
jq -n --rawfile p regelauskunft/WORTLAUT/PATCH-N.txt --slurpfile c src/data/jass-content-v2.json '
 [ $c[0] | .. | strings ] as $strs
 | ($p | rtrimstr("\n") | split("\n@@@@\n")) as $pairs
 | { paare: ($pairs|length),
     fehler: [ $pairs[] | (split("\n====\n")) as $kv
               | select(($kv|length) != 2 or ([$strs[]|select(contains($kv[0]))]|length) != 1)
               | $kv[0][0:50] ] }'
```
`fehler: []` heisst: jedes Paar hat zwei Teile und trifft **genau einmal** im ganzen Bestand —
mehrzeilige Paare inbegriffen (das kann csplit/grep nicht). Läuft in einer Sekunde.
- **Das Paket-Dokument war diesmal an FÜNF Stellen veralteter als das JSON** (FAQ-Fragen von
  `history_swiss_production`, `bemerkungen_schnorren`, `general_culture`, `general_scoring_rules`
  samt einer ganzen Antwort). Ich hatte den schwersten E-Fund darauf gebaut und musste ihn
  zurückziehen. **Griff: jeden FAQ-Fund vor dem Schreiben mit `jq -r '.ID.faqs[]'` gegenlesen** —
  Artikeltexte sind stabiler, die FAQ werden laufend repariert. Bestand: 224 Artikel.
- **`grep -oE ".{0,60}wort.{0,80}"` hängt auch auf `jassverzeichnis.txt`** (Backtracking, Timeout
  nach 120 s). Ersatzgriff mit Zeilennummer und fester Breite: `grep -in "wort" datei | cut -c1-400`
  — die Eichquelle-Dateien haben echte Zeilen, das reicht immer.
- **Belegt und darum stehengelassen** (jassverzeichnis/wikipedia/transkript): Ausmachregel 28/2/17 ·
  «bis die Karte gedeckt ist» (Frist) · verfallen (Weispunkte) · Bauernpartei 4/0/3 · Nichtfarben
  3/0/2 · Spielverrat 7/0/2 · Spielübernahme 6/0/0 · Schreibpunkte 3/2/1 · Nuller 23/2/4 ·
  abverdienen · Trumpfart 23/0/7 · Disziplin 13/0/3 · Kartensystem 1/0/6 · Nationalspiel 0/1/0 ·
  Stechkarte 3/0/0 · «generieren» (Böcke) · «übergeben» (Slalom) · Sackjass/Butzer/Schläger/Härdöpfel.
- **0/0/0 und darum Erfindung:** Einzeljass · Gegenurzeigersinn (richtig: Gegenuhrzeigersinn 1/6/3) ·
  Sonderrang · Stechkraft · Spieleinheit · Informationsgehalt · Aufschluss · «das ganze Deck» ·
  Neuillustration · realistische Chance · strategische Flexibilität · Gemeinschaftsgefühl ·
  Identitätsstiftung · selektiv · spezifisch · Tafelseite · Verteilrichtung · Weisvergleich ·
  Unten-/Oben-Übergabe · «Lukas» (Stock) · «der Kehr» · Aucho (nur 2 Treffer, unsere eigenen Notizen).
- **«Sack» als Handjass-Eintrag ist unbelegt**, das jassverzeichnis schreibt «Nuller (auch
  «Härdöpfel»)»; der einzige «Sack»-Treffer meint den Sack-Spieler beim Hammerjass.
- **Autorenname:** «Albert Hagenbucher» (Wikipedia 3×, jassverzeichnis 1×). Das jasswiki schreibt
  im Text «Haggenbucher» und in der seoDescription «Hagenbuch» — zwei verschiedene Fehler.

## Generalprüfung 23.08. (neun Artikel, Brille SPRACHE) — wo der Riegel wegschaut

- **🚨 `sprachwaechter.mjs` prüft NUR `text` und `faqs`** (Zeile 172/191: `const alles = [text,
  ...faqs...]`). `metadata.seoDescription`, `seoTitle` und `titel` laufen durch **keine** Prüfung —
  und genau dort sass der schwerste Fund: die seoDescription von `schieber_taktiken_austrumpfen`
  sagt «Der Trumpfansager **zieht die Trümpfe**», wofür Muster `:98` extra gebaut wurde.
  **Griff: bei jedem «der Sprachwächter ist grün» zuerst die Metadaten von Hand prüfen.**
- **Verbotene Fügungen überleben in drei Formen, die kein Muster fängt:** (1) Präsens statt Perfekt
  («die Karte **fällt**», 13 Stellen — die Muster `:100`/`:103` kennen nur «ist gefallen»/«gefallene»),
  (2) **ohne Umlaut** («der **Trumpf** fällt» — `/Trümpfe? (fallen|fällt)/` verlangt den Umlaut),
  (3) als **Hauptwort** («nach dem **Trumpfziehen**» — kein Verb, kein Muster).
- **Gegenprobe, die den Fund erst scharf macht:** «Karte fällt» hat 0/0/12, und **alle zwölf** meinen
  «Karte fällt **runter**» — den Spielfehler, der im Bestand einen eigenen Artikel hat
  (`karte_faellt_runter`). Ein Wort, zwei Bedeutungen im selben Haus.
- **`metadata.titel` ist bei 224 von 225 Artikeln `null`** — der einzige gefüllte ist
  `schieber_taktiken_hoch_tief`. Vor jedem Titel-Befund erst `jq '[.[]|select(.metadata.titel!=null)]|length'`.
- **Zitate vor der Abgabe stapelweise verifizieren:** Werte-Dump (`jq` über text+faq+seoDescription)
  und dann `while read -r p; do grep -Foc "$p"; done <<'EOF'`-Liste. 34 Zitate in einem Lauf, jedes
  mit Treffer 1–2 — so steht kein falsch abgeschriebener Satz im Bericht.
- **Hausformeln zählen statt schätzen:** «So liest es der Verband» 4× im ganzen Bestand, alle vier in
  diesem Paket · «ist Schneider» 1× gegen «im Schneider» 14× · «Wir zeigen» 1× (das Wiki spricht sonst
  nie in der ersten Person) · Tischregel-Formel in vier Fassungen («vor der Partie ab» 22, «vor
  Spielbeginn ab» 6, «vor der Partie fest» 2).

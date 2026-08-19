---
name: eichquelle-grep
description: Wortlaut-Eichung gegen regelauskunft/EICHQUELLE/ — Kreisschluss-Falle im remo-transkript, Kanzlei-Deckung durch das jassverzeichnis, belegte vs. erfundene Wendungen
metadata:
  type: reference
---

Die Eichquelle `/Users/remoprinz/Documents/Jassguru/jasswiki/regelauskunft/EICHQUELLE/`
hat drei Dateien: `jassverzeichnis.txt` (Reglement, ~100k Wörter), `wikipedia.txt` (~10k),
`remo-transkript.txt` (~216k, Remos eigene Sätze). Trefferzahlen immer in dieser
Reihenfolge angeben.

## Zwei Fallen, die den Test wertlos machen

**1. Kreisschluss im remo-transkript.** Ein Treffer, der *nur* dort liegt, stammt oft
daher, dass Remo über das jasswiki oder über Engine-Code redet — dann bestätigt der Test
genau die Erfindung, die er finden soll. Am 18.08. betraf das drei von zehn E-Funden:
- `stechmässig` → 1 Treffer, und der lautet «Banner-Artikel behauptet … „die stechmässig
  höchste Karte". Das ist falsch.» Der einzige Beleg ist eine **Beanstandung**.
- `Stechreihenfolge` → 1 Treffer, ein **wörtliches Zitat** des geprüften Satzes.
- `punktreichste` → 6 Treffer, alle **Engine-Symbole** (`_sel_endspiel_punktreichste`).
**Regel: bei Treffern ausschliesslich im remo-transkript immer den Kontext ansehen**
(`grep -rihoE ".{0,50}wort.{0,50}"`), nie die Zahl allein zählen.

**2. Kanzlei-Deckung durch das jassverzeichnis.** Es ist ein Reglement, also besteht
Amtsdeutsch den grep-Test: «zur Anwendung kommen» 0/2/1, «erfolgt» 15/1/2, «sich zu
verständigen» 1/1/0. Wer Kanzleideutsch als «erfunden» melden will, hat dafür keinen
grep-Beweis — das braucht einen eigenen Entscheid von Remo.

**Gegenprobe für Fremdwörter:** `Farbe bekennen` hat 1 Treffer — aber im **Troccas**-
Abschnitt (Bündner Spiel), nicht beim Jass. Ein Treffer ist erst ein Beleg, wenn er im
Jass-Kontext steht.

## Am 18.08. geeicht (Paket 3)

**Belegt, bleibt:** am Drücker (0/0/4, Remo listet es selbst als korpus-belegt) · tief
anziehen · lange Farbe · Leih halten (17/0/0) · Spielübernehmer (22/0/7) · Stich stechen
(1/0/2) · sticht alles · mischelt (6/0/0) · gekehrt (36/2/16) · Weis melden (4/0/0) ·
aufgelegt · gefarbt · fehlbare(r) Spieler · Stechwert/Zählwert · schmieren (6/0/155) ·
Weismeldung · Brättli · Härdöpfel · Kreuz-Bube · letzte(r) im Stich · trumpfmachend ·
Molotow/Misère · «Ass zum Bock machen» (Einzahl!) · Jassgraben · Weis gestrichen.

**0 Treffer, also unsere Erfindung:** stechmässig · punktreichste · Stechreihenfolge ·
Trumpfkraft · Erstausspieler · zuschmieren/zugeschmiert · Vierblatt-Partei · «Stich fällt»
· «Führung übergeben» (als Spielbegriff) · «das Ende zählt» · Minusstrich · «aufwärts
weisen» · «Böcke machen» (Mehrzahl) · in Echtzeit · entwertete Karte · Matsch-Prämie.

## Am 19.08. geeicht (Paket 0, 23 Artikel)

**Belegt, bleibt:** Meistbietender (0/15/1) · Höchstbietender (1/6/1) · Zielpunkte /
Zielpunktzahl · Kartenpunkte (0/19/48) · Bockkarte (0/5/2) · Stechkarte (0/3/0) ·
Mitspieler (7/46/6) · Teilnehmer · Wertungssystem (0/3/0) · Extrapunkte (Wikipedia,
wörtlich «100 Extrapunkte, also insgesamt 257») · Faktoren («alle Trumpfarten einfach
gewertet» steht wörtlich im jassverzeichnis) · hindersi (2/1/6) · Matchbonus (0/4/7).

**0 Treffer, also unsere Erfindung:** Strichformat · Gebefolge · Gebotsuntergrenze ·
Schätzansage · Schätzwert · Wortmeldung · Siegesmeldung · Spezialwert · Nichterfüllung ·
«Belangen» · «basierend auf» · «vorhergesagt» · «aussen vor» · «den Weg ebnen» ·
«auf einen Blick» · Abwehr · stechhöchst · Spielerlebnis · kompetitiv · füresi.

**Zwei Fallen, die diese Runde neu zeigte:**
- `Kalkulator` hat 38 Treffer — alle sind der **Produktname «jasskalkulator»**. Ein
  Produktname eicht kein Gattungswort.
- `Matschprämie` 0/0/4 (nur jasswiki-Arbeitsnotizen), das jassverzeichnis schreibt
  **Matchbonus**. Das ist unsere breitest ausgerollte Prägung — steht als F bei Remo.

## Die FAQ sind der schwächste Teil, nicht der Artikeltext

In Paket 0 ist die **erste** FAQ eines Artikels oft ein wörtliches Echo des ersten
Artikelsatzes, und die Frage lautet «Wie funktioniert <Artikeltitel> beim Jassen?» —
der Titel im Nominativ, ohne Geschlechtswort. Prüfgriff:
`grep -n '^F: Wie funktioniert' <paket>`. Findet den Maschinenrest in Sekunden.

**Die Marken `(siehe Begriff "…")` sind KEIN Befund.** Sie stehen im JSON, aber der
Renderer entfernt sie vor der Auslieferung; im FAQPage-JSON-LD auf
`/regeln/schreiben/rechte-tafelseite/` steht der Satz ohne Klammerwerk (POLIER, curl,
19.08.). Am 19.08. habe ich sie aus dem Paket-Export als Live-Fehler gemeldet, ohne die
Auslieferung zu messen — **was ausgeliefert wird, entscheidet curl, nie der Export**.

**Der Paket-Export ist ein Standbild.** `zwei_karten_spielen` hatte im JSON längst eine
bessere erste FAQ als im Export. Vor jedem Patch gegen
`src/data/jass-content-v2.json` prüfen (Stand 19.08.: 224 Artikel), nie gegen das Paket.
Gegenprobe Paket 7: von 61 geprüften Zitaten fehlte genau **eines** im Bestand
(`general_geography_regions` FAQ, im JSON längst «Was sind Schweizer Karten?»).

## Am 19.08. geeicht (Paket 7, 22 Artikel)

**Belegt, bleibt:** sich bedanken (93/5/40) · aus dem Schneider (16/0/3) · Stechkarte
(3/0/0, «sofern man eine Stechkarte besitzt») · Königsdisziplin (3/0/0) · Jassteppich
(23/1/8) · Trumpfbauer (25/1/0, im jassverzeichnis **ohne** Bindestrich) · aussteigen
(2/0/6) · Karten einsetzen · gedenkt zu erjassen (1/0/0, wörtlich in der Quelle) ·
irrelevant (3/0/0) · ablegen (44/6/56) · kassieren (5/0/10) · hingelegt (9/0/6) ·
Kartensystem (1/0/6) · «oben/unten übergeben» (Remo selbst, Z. 5580) · Querverwerfen
(Remos eigenes UI-Vokabular) · Matsch-Bonus (Remo selbst).

**0 Treffer, also unsere Erfindung:** Schneidergrenze · Stichanzahl / Stichzahl (die
Quelle sagt **«Anzahl Stiche»**, 10 Treffer) · Erfüllung · Stechhierarchie · Fraktion ·
Bestimmtheit · Punkteausbeute · Vorgehensweise · positive Leistung · Seltenheitswert ·
Ereignis (als Jassbegriff) · Vorrangregel · Jass-Ansage (die Quelle sagt **«Ansage»**,
168 Treffer) · «an die Spitze» · «verankerte sich als» · «heben sich auf» · Hinterhand ·
Ranking (die Quelle sagt **«Rangliste»**) · Enthusiast · Zielgruppe · Nuance · Timing ·
Fokus · Spielmodus/Spielmodi (die Quelle sagt **«Ansage»**) · «die Jassenden» (12×
`jassend` im Transkript, aber immer als Eigenschaftswort «jassende KI», nie als Person).

**Vier Wortpaare, wo die Quelle anders spricht als wir:**
- «Ecke» ↔ **«Ecken»**: jassverzeichnis 28× Mehrzahl («Herz, Ecken, Kreuz oder
  Schaufel», «Ecken Trumpf», «Ecken-Bube»), Wikipedia 1× Einzahl («Ecke/Karo»). Der
  Bestand ist in sich uneinheitlich → F bei Remo.
- «Mannschaft» 0/10/0 (nur Wikipedia) ↔ **«Partei»** 102/21/16.
- «Regelverstoss» 0/0/3 ↔ jassverzeichnis nennt Vorspielen/Nichtfarben **«Missgeschicke»**.
- «der links sitzende Spieler» ↔ jassverzeichnis: **«vor dem Hintermann»**, Mundart
  «vorgeben» (Z. 10577). Für `vorspielen` steht dort die fertige Parallelstelle.

**Neue Kreisschluss-Fänge:** `tunlichst` 0/0/1 — und der eine Treffer ist Remos Rüge
über ein *anderes* Wort («behaupten ist KEIN jassausdruck!!!! wir müssen sowas tunlichst
vermeiden!!!», Z. 7232). `Umgang` als Jassbegriff: die 4 Transkript-Treffer sind
Zitate **unseres eigenen** Wiki-Textes plus einmal «Umgangston».

**ugrep-Falle:** `.{0,90}` in `grep -ihoE` bricht mit «exceeds complexity limits» ab.
Für Kontext `grep -in "wort" datei.txt | cut -c1-250` nehmen.

## Am 19.08. geeicht (Paket 2, 23 Artikel) — 16 E · 38 S · 7 F

**Belegt, bleibt — und das sind die überraschenden:**
- «den König in die Zange nehmen» (0/0/1) und «hockt am Ende des Stichs» (0/0/1): beide
  Treffer sind Remos **eigene Taktikerklärung** (`remo-transkript.txt:7869` und `:8699`,
  dort auch «solange immer einer der bauern HINTER ihm sitzt»). Genau die Wendungen, die
  am ehesten nach Erfindung aussehen, sind die einzigen mit Beleg.
- «sich bedanken» 75/4/36 — ein echtes Jasswort für «Sieg anmelden».
- «Der Ohrfeige nach» (jassverzeichnis Z. 20635/20639, die Quelle schreibt es mit «»).
- «die Rolle des Königs übernehmen» — steht in der Quelle, aber mit Tippfehler
  «die Rolles des Königs» (Z. 20922). **Grep auf die korrekte Form findet sie nicht.**
- Vorhandspieler (10/0/0) · kreuzweise (3/4/0) · pro Runde (3/2/6) · Bockkarte (5/0/2) ·
  Ablupf (7/0/0) · Untertrumpfen (51/2/9) · Ausmachregel (28/2/17) · geahndet (1/0/0).

**0 Treffer, also unsere Erfindung:** Spielgeber (die Quelle sagt **Kartengeber**,
27/1/0) · Jasszielsetzung · «belastet» (für Punkte) · Jasswert · Matsch-Konsequenz ·
Spielergruppe · Gesamtziel · verbuchen · Gegenurzeigersinn (Tippfehler) · «basierend
auf» · «zu meistern» (= «easy to learn, hard to master») · Teamwork · taktische Tiefe ·
Philosophie · metaphorisch · «blindes Verständnis» · «Züge» (Schach) · Rhythmus ·
Hinterhand/Mittelhand · Königspartei · Transparenz · Zielgruppe · Landschaft · Features ·
gutschreiben lassen · verpflichtend · Glücksspiel-Charakter/-Aspekt · schöpfen aus ·
heimbringen · Stichzahl · «zusagt».

**Neue Kreisschluss-Fänge:**
- `Spielgeber` 0/0/5 — **alle fünf** Treffer sind Prüfberichte über genau diesen
  Wiki-Bestand («B3 — Die 11 Spieler widerlegen den Spielgeber-Absatz», :1700;
  «„Verteilt sich der Spielgeber" — das sagt kein Jasser», :3422).
- `Stichfolge` 0/0/10 — alle zehn sind Remos **Bildlegenden-Vorschrift** («Stichfolge
  rows strongest→weakest with word «Stichfolge»»). Hausbegriff auf Ansage: kein Fund.
- `18 Karten` 2/0/0 — beide beim **Bauernkrieg** und beim **Ufgleit-Jass zu zweit**,
  nichts mit dem Schieber zu tun. `blinde` 5/4/0 — alle meinen «den Blinden» bei Ramset,
  also ein Kartenpaket, kein Einverständnis.

**Wo die Quelle den Bestand widerlegt:**
- Vorhand sitzt **rechts** vom Kartengeber (jassverzeichnis Z. 6114, 11465); **links**
  sitzt, wer abhebt (Z. 14356). `general_dealing_basics` sagt im Text rechts und in der
  FAQ links.
- Die Ausmachregel heisst in der Quelle 35× **«Stöck-Wys-Stich»** (17×) bzw. «Stöck,
  Wys, Stich» (16×), nie mit «Weis». Das Wiki schreibt dieselbe Formel in **acht**
  Schreibweisen. Zählgriff:
  `grep -oh "Stöck[ ,-]*W[ye]s[ ,-]*Stich\|…" src/data/jass-content-v2.json | sort | uniq -c`
- Chratze: `wikipedia.txt` Z. 256–329 ist die einzige Quelle, nennt die dritte Ansage
  **«weg / fort»** (nie «Aussteigen») und teilt den Pot **unter allen Mitgekommenen**
  auf (Z. 298), nicht an «den letzten verbleibenden Spieler».
- Etymologie: Wikipedia Z. 8 sagt «Jass … kommt aus den Niederlanden … der **Jas
  (Bauer)**» — nicht «Jas (Jacke)» und nicht als eine von drei gleichwertigen Theorien.
  «Iocus» und «jasser» haben 0 Treffer.

Ergänzt [[jasswiki-pruefwerkzeuge]] und [[wortlaut-patchdatei]].

## Am 19.08. geeicht (Paket 1, 23 Artikel) — 28 E · 32 S · 9 F

**Belegt, bleibt:** Mehrling (1/0/0, jassverzeichnis im Arschlöchle-Abschnitt) · schnorren
(4/0/1) · Doppelkart (25/0/2) · Tischweis/Tisch-Weis (7+2/0/0, Molotow) · Unterzug (6/0/0) ·
blutt (1/0/39) · Guschti (4/1/2) und Mary (3/0/15, jassverzeichnis Z. 14634 beschreibt beide
**wörtlich so wie unser Artikel**) · Zwischendurch (4/0/2) · zusammengeworfen (1/1/0) ·
Schreiber (21/0/5, «Der Schreiber verteilt zum ersten Spiel aus») · verteilen fürs Geben
(«neu verteilt» 11/0/0) · Match (89/1/106, «Ein Match (alle acht Stiche)») **und** Matsch
(0/3/591) — beide belegt, der Fund ist die Mischung im selben Artikel · abverdienen (3/0/0,
gilt **Nullern und Strichen**) · «laufendes Spiel» (3/0/1) · Punkte vergeben (4/0/0) ·
Multiplikator (0/2/31) · Gegenuhrzeigersinn (1/6/3).

**0 Treffer, also unsere Erfindung:** «auf dem Weis stehen» (4× im Pandur) · «die erste Zahl
fällt» · «in den Stich fallen» · beilegen (für Punkte; die drei Treffer sind **Brief**beilagen,
das Jasswort ist schmieren) · «bleibt im Blatt» · Karten-Domino (die Quelle sagt **Domino**,
13 Treffer, und beschreibt ein sechstes Spiel mit Pluspunkten 150/100/70) · Schätzpunkte ·
Gutschriftpunkte · Vermeidungsspiel · Schätzspiel · Partnerkoordination · Tiefspiel ·
Entscheidungsgrundlage · kulant · nonverbal · jegliche · Notationszeichen · Austauschblatt ·
Solokarte (die Quelle sagt **blutt**) · Hochburg · Verbreitungsmechanismen · Freizeitvergnügen ·
Arbeiterklasse · Neustart (5 Treffer, alle Software) · belastet · Minusstrich · **Vogel**
(0/0/0 — das Stichwort eines ganzen Artikels, samt «500 Schreibpunkte»: als F zu Remo).

**Wortpaar mit Beleg auf beiden Seiten, das trotzdem ein Fund ist:** «bekennen» 1/1/3 gegen
«farben» 93/14/230. Der jassverzeichnis-Treffer für «Farbe bekennen» steht im **Troccas**-
Abschnitt, der Wikipedia-Treffer im **Chratze**-Abschnitt. Im Jass heisst es farben.

**Kreisschluss-Fang:** «Entscheidungsgrundlage» 0/0/1 — der eine Treffer ist das **wörtliche
Zitat des geprüften Satzes** aus einer früheren Prüfnotiz.

**Hausformeln wandern.** Die erfundene Überschrift «Ein Spiel von Anfang bis zur Tafel» steht
**zweimal** im Bestand: Pandur und Sidi Barrani (die Blaupause). Prüfgriff:
`jq -r 'to_entries[] | select(.value.text // "" | test("<Formel>")) | .key' src/data/jass-content-v2.json`.
Was zweimal steht, gehört in den Bericht, nie in den Patch (Eindeutigkeit).

**ugrep-Grenze schärfer als notiert:** schon `.{0,60}` **auf beiden Seiten** bricht ab
(«exceeds complexity limits») oder läuft in den 120-s-Timeout. `.{0,40}` geht, sicher ist
`grep -in "wort" datei | cut -c1-250`.

## Vokabelliste 19.08. (236 jassnahe Nulltreffer-Wörter, 30 E / 5 S / 3 F)

**Eine mechanische Nulltreffer-Liste enthält Beugungen, deren STAMM belegt ist.** Immer erst
den Stamm prüfen, sonst meldet man Richtiges als Erfindung. Falsch verdächtigt und
freigesprochen: `stechzwangs` («Stechzwang» steht im Jassverzeichnis: «Farb- und Stechzwang
gilt») · `matschspiel` («Matschspielen» in der Wikipedia) · `kartenkombination` (2× Wikipedia)
· `teamspiel` («Team» 190/8/305 — nur `teamspieler` ist erfunden, «Partner» 137/5/932) ·
`kartenhierarchie` («Hierarchie» belegt: «nach der Hierarchie ‹schwarz vor rot›»).

**Die eigenen Ersatzwörter denselben grep durchlaufen lassen.** Beim Schreiben des Patches
rutschte «Zählpunkte» (0/0/0) hinein — die Quelle sagt «Zählwerte» (74×). Ein Bericht, der
Erfundenes durch Erfundenes ersetzt, ist wertlos.

**Belegte Ersatzwörter, die 19.08. gefunden wurden** (Fundstelle jeweils gelesen):
Mindestgebot (4/1/8) statt Gebotsuntergrenze · Streichresultat (JVZ, «als sogenanntes
‹Streichresultat›») statt Streichpasse · Reihenfolge (66/9/40) / Rangfolge statt
Stechordnung/Stechhierarchie · «den Stechwert verlieren» + «behalten ihre Zählwerte»
(JVZ Z. 6314) statt Stechwertverlust/zählwertig · «restlichen Stiche» statt Folgestiche ·
Nuller (28/2/4) + «abverdienen» (3/0/0) statt Minusstrich · Tischweis (10/0/0) ist belegt,
Handweis (0) nicht — die Quelle schreibt «Weisen aus den Handkarten» · Gutschrift ·
«wer den Stich gemacht hat» statt Stichgewinner · Vorhand (142/7/77) statt Erstausspieler ·
«blank» (Remo: «Opfere das blanke Schilten-Ass») als Kandidat für Solokarte.

**Zwei schwere Sorten von Fund:**
1. **Erfundenes Wort, das mit einem belegten kollidiert.** «Farbverrat» (0) für einen ERLAUBTEN
   Zug im Molotow — das Jassverzeichnis kennt «Kartenverrat»/«Spielverrat» und meint damit
   Schummeln. Immer prüfen, ob das erfundene Wort im Korpus schon anders besetzt ist.
2. **Tippfehler in einem Kernbegriff.** `trumpf_bauer`: «die stechhöchste Karte bei einem
   **Trumpspiel**» (Trumpfspiel 4/0/43, Trumpspiel 0) — in Text UND FAQ. Nulltreffer-Listen
   finden Tippfehler mit, das ist ihr stiller Nutzen.

**Kreisschluss-Beleg Nr. 4:** `streichpasse` hatte 1 Treffer im Transkript, und der lautete
«markers repointed (`expressions_streichpasse` → `expressions_passe`» — unser eigener
Artikelschlüssel in einer Arbeitsnotiz.

## Am 19.08. geeicht (Paket 9, 22 Artikel) — 3 E · 51 S · 9 F

**Korrektur an der Paket-0-Liste oben: «stechhöchste» ist BELEGT.** 0/0/3, und
`remo-transkript.txt:9180` ist Remos eigene Stimme: «muss klar sein, dass man NICHT die
stechhöchste karte legt! weil das WIRD ja erst zum bock. das gilt übrigens auch für
undenufe!». Wer nur jassverzeichnis + Wikipedia zählt, spricht Remos eigenes Wort
schuldig.

**Belegt, bleibt:** Wand (Remo: «die wand anziehen», «wand etablieren») · Auskunft als
Signalwort («die Auskunft steckt in der Zahl», «seine Auskunft, keine Vermutung») ·
Trumpf-Bauer (21/0/3) · Belli (1/0/4) · rauben/geraubt (11 bzw. 13) · Nuller (23/2/4) ·
Fehlfarbe (2/1/0) · eingestochen (4/0/0) · «den Bergpreis erreichen» (jassverzeichnis
wörtlich) · Nachschmeissen (0/0/73, Remo Z.696 im Klartext) · Dreiblatt · vier Gleiche ·
Bube (43/16/7) · Trumpf machen (6/0/0) · erstausgespielt (2/0/0) · einsehen (Karten
anschauen: «2.8.9 Gekehrte Stiche einsehen»).

**0 Treffer, also unsere Erfindung:** zurücklesen · Signalkonvention (1 Treffer =
Agentenrapport über Engine-Arbeit) · kommunizieren (Kreisschluss: der Treffer ist unser
eigener Satz) · Spielteilnahme · trumpfaufdeckend · zweitgespielt · Letztsteigernd ·
zusagend · Verhängnis · Gesamtwertung · vorausgewiesen · Zusatzprämie · Kartensituation ·
Spielmechanik · Bock-Karte (1 Treffer = Engine-Quelltext) · Glöckchen.

**Vier Wortpaare mit Beleg auf der anderen Seite:**
- «Farbe bekennen» (Troccas!) ↔ **bedienen**, Wikipedia Z. 417 wörtlich: «Während des
  Spiels ist es Pflicht, die ausgespielte Farbe zu bedienen» (2/6/34).
- «vorausweisen» (0) ↔ **vorweisen**: «hätte sich … die Stöck vorweisen können und sich
  so bedanken dürfen».
- «Siebener» (1/0/0) ↔ **Siebner** (7/0/6).
- Slalom **oben/unten** übergeben (Remo Z. 5580) ↔ unser «hoch/tief».

**«Narr» ist besetzt.** 21/0/7, aber alle jassverzeichnis-Treffer stehen im
Troccas/Tarock-Teil («Neben den 21 Trogge und dem Narr (Le Mat)»). `color_schellen` nennt
den Schellen-Under «den Narr des Blatts» — unbelegt, dazu trägt in
`public/cards/de/rosen-under.webp` sichtbar der **Rosen**-Under die Pfeife.

**🚨 Abheben: das Reglement sagt LINKS, der Bestand viermal RECHTS.** jassverzeichnis
Z. 6226, Abschnitt «2.6.3 Abheben»: «Der Spieler **links** vom Kartenverteiler macht das
Abheben («Ablupf»).» `general_dealing` (Text + zwei FAQ) und `general_dealing_special`
schreiben «rechts vom Kartengeber» — dort sitzt die **Vorhand** (Z. 6114, 11465). Der
Zwick-Artikel macht es richtig. Steht als F bei Remo, gehört nie in einen Wortlaut-Patch.

**Der Bestand bewegt sich während der Lesung.** Der Checkout sprang mitten in der Arbeit
von `87d95746` auf `f118557` (Wellen 1–3 eingespielt). Vier Funde waren beim Nachprüfen
schon geheilt, «Spielgeber» hiess überall «Kartengeber», und ein Artikel (klopfen) war
komplett neu formuliert. **Patch-Muster erst ganz am Schluss verifizieren, nie beim
Schreiben** — und den Stand (Commit + md5) in den Bericht schreiben.

## Am 19.08. geeicht (Paket 8, 22 Artikel) — 13 E · 42 S · 6 F

**Korrektur an zwei früheren Listen: «Kontermatsch» und «Matschprämie» sind BELEGT.**
Das jassverzeichnis schreibt «Kontermatch» (4) und «Matchprämie» (6) — mit der
Haus-Schreibung «Matsch» sind das unsere Wörter. Die Paket-3-Notiz («Matsch-Prämie
erfunden») galt nur der Bindestrich-Form, die Paket-0-Notiz («die Quelle sagt
Matchbonus») war unvollständig: die Quelle sagt **beides**.

**«Figur» ist besetzt.** 7/1/17, im jassverzeichnis ausschliesslich die **Bildkarte**
(«eine Figur (Königin oder Reiter)», «Re, Regina, Fante»), im Transkript HTML-`figure`
und «Guru-Figur». `expressions_trumpf_bauer_kombinationen` nannte die zwei Weis-Arten
«zwei Figuren» — falsches Fachwort.

**Zwei Stellen, an denen die Eichquelle fertige Substanz liefert:**
- Erstbeleg: `wikipedia.txt` Z. 9 hat die ganze Geschichte — «aus dem Jahre 1796 aus
  **Schaffhausen: zwei Pfarrer verklagen zwei Bauern, die „um ein Glas Wein" spielten,
  mit einem Spiel „welches man das Jassen nenne"**». Der Artikel `history_first_mention`
  sagte dreimal «Meilenstein» und die Sache gar nicht.
- Schellenjass heisst mit französischen Karten **Herzjass** (jassverzeichnis: «Anleitung
  Schellenjass spielen (auch: Herzjass)», «anstatt der Farbe ‹Schellen› die Farbe Herz»).
  Unser «Kreuzjass» ist falsch: der eine Wikipedia-Treffer meint **Vorarlberg = Schieber**
  («Krüzjassa bzw. Kreuzjassen»).

**Farbzuordnung: die Quelle widerspricht `color_ecke`.** `jassverzeichnis.txt` Z. 24
tabelliert «Eichle **Ecke ♦** · Schellen **Kreuz ♣** · Schilte Schaufel ♠ · Rose Herz ♥»
(Multiplikator-Logik), unser Bestand setzt Ecke = Schellen (Kartenbild-Logik). Sachfrage
für SCHIRI, kein Wortlaut-Fund.

**Belegt, bleibt:** «Puur zu dritt» / «Nell zu viert» (0/0/23 bzw. 0/0/8 — kein
Kreisschluss: Remo spricht sie frei aus und hält fest «wortgleich bei Müller S. 132 und
bei jassverzeichnis.ch») · **Schlagdistanz** (0/0/2, Remo: «matsch-schlagdistanz») ·
«Punkte auf dem Konto» (JVZ wörtlich) · «scheidet als Gewinner aus» (JVZ Z. 23266) ·
umgehend (2/0/0) · Vorrang (19) · eingesehen (7) · abwechslungsreich (7) · annulliert (5)
· «fort» **und** «passe» als Bietruf (JVZ: «sagt ‹fort›, ‹pass› oder ähnlich») ·
Trumpf-Spiel (3) · Spielverrat (7) · Zeichen (19) · gutgeschrieben (3/4/4).

**0 Treffer, also unsere Erfindung:** Vermeidungsvariante · Antizipation · belastet ·
abgearbeitet · Notierung · Korrekturwunsch · Eintragung · essenziell · «im Blick» ·
gerechtfertigt · Meilenstein · linguistisch · Terminologie (0/0/2 Projektnotizen) ·
Zeitspanne · Stechkraft · Trumpflänge · Sonderwert · «im normalen Spiel» · untersagt ·
Anweisung · storniert · Spielerlebnis · Erfahrungsstufe · Schieber-Spieler · Einzeljass ·
Papagei · Querstrich · Schreibspiel · «herauskommen» (für Zielpunkt erreichen).

**Neu für die Patch-Praxis: was der Patch nicht kann.** `liegengelassene_stiche` hat in
FAQ 1 und FAQ 2 **wortgleiche Antworten**. Zwei identische Zeichenketten sind nie
eindeutig ansprechbar — der Fix muss von Hand kommen (oder eine FAQ entfällt). Der
Gegenfall ist nützlich: derselbe Satz in **Text und FAQ** wird eindeutig, sobald man den
Etikettenkopf mitnimmt («Definition:\n…», «Grundregel:\n…»), und die FAQ-Zwillinge kann
man **danach** als eigene Paare nachreichen — nach dem Textfix sind sie eindeutig.

**Patch-Datei (`PATCH-VOKABULAR.txt`, Format alt/====/neu/@@@@):** vor Abgabe jedes ALT-Muster
gegen einen Dump aller Feldwerte zählen (`jq -r 'to_entries[] | ([.value.text] +
[.value.faqs[]?|.question] + [.value.faqs[]?|.answer] + [.value.metadata.seoDescription])
| .[]' > _values.txt`, dann `grep -Fc` je Zeile). Zweite Probe gegen `_flat.tsv`: **kein Muster
darf zwei Artikel treffen.** Mehrfachtreffer im selben Artikel sind normal (derselbe Satz steht
im Text und in der FAQ) und sollen beide fallen. Achtung auf Muster, die Präfix eines anderen
Musters sind — «erhält der Spielgeber Gutschriftpunkte» deckt beide Stellen, zwei getrennte
Paare hätten sich gegenseitig zerstört.

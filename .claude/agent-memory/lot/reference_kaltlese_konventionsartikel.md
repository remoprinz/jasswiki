---
name: kaltlese-konventionsartikel
description: Prüfgriffe für jasswiki-Artikel über Spielkonventionen/Signale (Kaltlesung austrumpfen-hoch-oder-tief, 20.08.26) — Sender/Empfänger trennen, Sitzordnung im Bild, Namensform eichen, verlorene Substanz aus Alt-Entwürfen
metadata:
  type: reference
---

Gefunden bei der Kaltlesung von `schieber_taktiken_hoch_tief`
(`/taktiken-und-strategien/kommunikation-signale/austrumpfen-hoch-oder-tief/`, 20.08.26).
Der Artikel rechnete **fehlerfrei** (3 Beispiele, alle kartengenau auf neun Trümpfe) und
hielt alle bekannten Wortentscheide — durchgefallen ist er an der Regel-Logik.

## 1. Bei Signalartikeln SENDER und EMPFÄNGER getrennt prüfen

Der Text sagt fast immer nur, was der **Sender** legt («bei 3+ die tiefste Karte»). Die
**Empfängerregel** fehlt: Der Ansager sieht EINE Karte und kann nicht wissen, ob sie die
tiefste der Partnerhand war. Prüfgriff: **den Mittelfall selbst durchspielen.** Halte ich
Achter und Sechs (genau zwei), spiele ich nach der Regel den Achter — und der Ansager
liest «tiefste Karte, also 3+». Das Signal kippt ins Gegenteil. Alle drei Beispiele des
Artikels umgingen den Fall, weil sie die im ganzen Blatt tiefste Karte (die Sechs) oder
die höchste lebende (das Ass) nahmen.

## 2. Bildlegenden, die «in der Reihenfolge des Legens» behaupten

**Im Schieber sitzen die Partner einander gegenüber** (`EICHQUELLE/wikipedia.txt` Z. 107).
Nach dem Ausspieler legt ein **Gegner**, dann der Partner, dann der zweite Gegner. Alle
vier Stich-Bilder des Artikels legten den Partner an zweite Stelle
(`[[karten: eichel-9, eichel-6, eichel-ass, eichel-8 | … in der Reihenfolge des Legens:
Der Ansager spielt das Nell, sein Partner die Sechs, beide Gegner farben]]`) — am Tisch
unmöglich. **Jede `[[karten: …]]`-Reihe eines Stichs auf Sitzordnung prüfen.**

## 3. Den NAMEN der Konvention selbst eichen, nicht nur die Wörter darin

Der Artikel heisst «hoch-tief / **tief-hoch**» (Titel, H1, seoTitle, Adresse, FAQ 10).
Im Korpus: **«tief-höher» 29 Treffer** (Remos Stimme, u.a. `remo-transkript.txt:2491`
«die regel heisst 'Hoch - tief / tief - höher Konention'») und «tief-hoch-**tief**» 3×
(`:596`, `:4424`, `:9242`). Die 4 Treffer für blankes «tief-hoch» sind **alle unsere
eigenen Artefakte** (Engine-String `FOLLOWER_SIGNAL_TIEF` `:4022`, Agentennotiz `:6613`,
zwei Alt-Entwürfe des Artikels `:7565`, `:7578`). Zusatzschärfe: der Artikel widerlegt den
eigenen Namen, weil er selbst schreibt «Die zweite darf **irgendeine höhere** sein».

## 4. Alte Artikelentwürfe im Transkript: Kreisschluss beim WORTLAUT, Fundgrube bei der SUBSTANZ

Ein Entwurfssatz taugt nie als Wortbeleg. Er zeigt aber, **was der heutige Artikel
verloren hat**. Zwei Beispiele, beide schwer:
- `:6615` «Hält ein Spieler den blutten Puur … indem er ein Brättli … spielt. **Im
  Umkehrschluss heisst das: Hält er gar keinen Trumpf, darf kein Brättli spielen!**» —
  ohne diesen zweiten Teil ist das Zeichen unlesbar (wer keinen Trumpf hat, wirft auch ab).
- `:7565` «gilt auch, wenn geschoben wurde. **In diesem Fall spielt Vorhand den tiefsten
  Trumpf aus**» — der Artikel sagt nur «ändert daran nichts» und zeigt kein geschobenes
  Beispiel, obwohl dort der Partner **eröffnet** statt nachzuspielen.
Griff: nach dem Lesen den Artikelkern im Transkript suchen (`grep -in "<Kernwort>"`), die
Entwurfssätze lesen und fragen: **welche Bedingung ist unterwegs verlorengegangen?**

## 5. FAQ gegen die BEISPIELE des eigenen Artikels rechnen

FAQ 6 behauptete «Zeigt sein Partner mit der tiefsten Karte drei oder mehr, liegen die
übrigen bei ihm, und die Gegner sind ausgetrumpft» — genau der Fall, den **Beispiel 3
des Artikels widerlegt** (dort bleiben drei übrig, einer liegt beim Gegner, der Ansager
muss nochmals austrumpfen). Die entscheidende Bedingung («genau zwei übrig») fiel in der
FAQ weg. **Jede FAQ, die eine Regel zusammenfasst, gegen den Ausnahmefall des Artikels
halten** — die Verkürzung passiert immer dort, wo der Artikel eine Zahlenbedingung hat.

## 6. Auftrags-Sollwerte weiter misstrauen

Der Auftrag führte «Trümpfe **ziehen**» als bekannten Fehlerentscheid. Die Einzahlform
**«Trumpf ziehen» steht im Jassverzeichnis** («Höchstbietender sein Konzept anzupassen
(Trumpf ziehen oder nicht)»). Der Entscheid mag als Hausregel gelten, hat aber keinen
Korpus-Rückhalt. Ergänzt [[sollwerte-im-auftrag-pruefen]].

## 7. Kreisschluss-Fänge dieser Runde

- `Signalsprache` 0/0/1 → der Treffer ist ein Alt-Entwurf **dieses** Artikels.
- `ausziehen` 0/0/1 → der Treffer ist unser **Engine-Wörterbuch**
  (`netz/woerterbuch.py`: «Trumpf führen (und damit die Trümpfe des Partners ausziehen)»),
  und der Artikelsatz ist daraus wörtlich abgeschrieben.
- `Nebenfarbe` 0/0/28 → **alle 28** sind Engine-Symbole (`habe_nebenfarben_bock`).
- Sauber freigesprochen, obwohl verdächtig: **Waffe** (Remo selbst, «bemerkung zu letzter
  trumpf = waffe», `:620`), **Signal setzen** (`:9333`), **Trumpfansager** (`:2340`,
  `:4895`), **Faustregel** (JVZ 20×, dazu JVZ Z. 15807 «sie müssen aber im Normalfall
  2 mal Trumpfen» als Beleg für die Zweimal-Regel).

**ugrep-Grenze erneut bestätigt:** `grep -ioE ".{0,90}wort.{0,90}"` über zwei Korpusdateien
lief in den 120-s-Timeout. `.{0,40}` auf **einer** Datei geht, sicher ist
`grep -in "wort" datei | cut -c1-250`.

Ergänzt [[eichquelle-grep]], [[jasswiki-pruefwerkzeuge]], [[kaltlese-protokoll]].

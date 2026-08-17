---
name: sollwerte-im-auftrag-pruefen
description: Sollwerte, die ein Prüfauftrag mitliefert, gegen die Wiki-Eichquelle nachrechnen statt übernehmen — der Auftrag kann den zu prüfenden Fehler enthalten
metadata:
  type: feedback
---

Zahlen, Reihenfolgen und «erwartete» Werte, die im Prüfauftrag stehen, sind **Behauptungen
des Auftraggebers**, keine Massstäbe. Jeden Sollwert gegen die Eichquelle im Repo
nachrechnen, bevor ich ihn als «stimmt» abhake.

**Why:** Am 17.08.26 nannte der Auftrag zur Bieter-Kaltlesung als erwartete Trumpf-Reihe
«Puur, Nell, Ass, **Banner**, König, Ober, 8, 7, 6». Genau diese Reihe stand im Artikel —
und beide waren falsch. Die Eichquelle des Wikis sagt das Gegenteil: `expressions_banner`
(«Ass, König, Ober und Under stehen über ihm, das Banner folgt erst an fünfter Stelle der
Stechreihenfolge») und der Kommentar über `RANKS_DE` in
`src/components/wissen/jasskarten.ts` («Karten hoch nach tief … König, Ober, Under,
Banner»). Wer den Sollwert aus dem Auftrag übernimmt, bestätigt den Fehler des Autors.
Das ist der Zerstörungsmodus meiner Rolle: Unschuld verliert man nicht nur durch
Briefing zur Absicht, sondern auch durch Briefing zum Ergebnis.

**How to apply:** Bei jeder Kaltlesung mit mitgelieferten Sollwerten zuerst die
repo-interne Autorität für dieselbe Aussage suchen (verlinkter Begriff, Renderer-Daten,
Kartenwerte-Eintrag) und mit ihr rechnen. Zwei unabhängige Fundstellen im Repo schlagen
den Auftragstext. Weicht der Auftrag ab, ist **das** der erste Befund.
Ergänzt [[kaltlese-protokoll]].

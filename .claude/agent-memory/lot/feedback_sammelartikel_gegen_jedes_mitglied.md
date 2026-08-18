---
name: sammelartikel-gegen-jedes-mitglied
description: Sammel-/Oberbegriffsartikel (z.B. bietrunde «alle Bietspiele») gegen JEDES Familienmitglied einzeln prüfen und die Mitgliederliste gegen die Rückverweise der Mitglieder halten
metadata:
  type: feedback
---

Ein Artikel, der «alle X» beschreibt, wird gegen jedes X einzeln gerechnet, und die
Mitgliederliste des Sammelartikels wird gegen die Rückverweise der Mitglieder gehalten.

**Why:** Kaltlesung bietbegriffe 18.08.26: `bietrunde` sagte «Erreicht er sie, schreibt
seine Seite» und «Vorhand nennt ein Gebot» als Regel aller Bietspiele. Beides hielt bei
Sidi und Bolschewik und fiel beim Bieter (Gebot gilt für die ganze Partie, Vorhand darf
passen, Müller S. 60–63). Der Pandur fehlte im Sammelartikel ganz, obwohl der Pandur-Artikel
auf `bietrunde` als «Bietspiel» verweist. Ein Sammelartikel ist die Summe seiner Sätze
mal der Zahl seiner Mitglieder.

**How to apply:** Für jeden Regelsatz eines Sammelartikels eine kleine Matrix Satz × Mitglied
anlegen und jede Zelle mit dem Mitglieds-Artikel oder Quellenblatt füllen. Dann
`grep -l "siehe Begriff \"<sammel-id>\""` über den Bestand: jeder Rückverweiser gehört in
die Mitgliederliste (Tabelle + see_also). Werkzeug-Notiz: Live-Text = Repo-Text per
`__NEXT_DATA__` extrahieren und md5 vergleichen (`cmp_live.sh`-Muster), Template-Titel
(«mit Beispiel») gegen den Inhalt halten, wenn `seoTitle` null ist. Ergänzt
[[kaltlese-protokoll]] und [[jasswiki-pruefwerkzeuge]].

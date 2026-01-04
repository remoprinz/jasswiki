# Umsetzungsplan: Michael Koller Gastbeitrag

## 🎯 Strategie

1. ✅ Vollständigen Text aus Backup geholt
2. ⏳ Bessere URL definieren
3. ⏳ jass-content-v2.json aktualisieren  
4. ⏳ Als Gastbeitrag kennzeichnen
5. ⏳ Wikipedia-Edit mit JassWiki-Link

---

## 📍 URL-Vorschlag

**AKTUELL (schlecht):**
```
https://jasswiki.ch/geschichte/wortherkunft/geschichte-des-matsch-begriffs/
```

**NEU (besser):**
```
https://jasswiki.ch/geschichte/wortherkunft/etymologie-matsch/
```

**Begründung:**
- Kürzer, prägnanter
- "Etymologie" ist wissenschaftlicher als "Geschichte des Begriffs"
- Besser für Wikipedia-Verlinkung
- SEO-freundlicher

**Alternative URLs:**
- `/geschichte/wortherkunft/matsch-etymologie/` (auch gut)
- `/forschung/etymologie-matsch/` (wenn Forschungs-Sektion existiert)

---

## 📝 Anpassungen in jass-content-v2.json

**Aktueller ID:** `history_etymology_matsch`  
**Behalten oder ändern?** BEHALTEN (ID sollte stabil bleiben)

**Zu ändern:**

1. **`text`-Feld:** Vollständigen Michael Koller-Text einfügen
2. **`source`-Feld:** `"Gastbeitrag: Michael Koller (Historiker und Berufsschullehrer)"`
3. **URL-Mapping:** In URL-Generator anpassen

---

## 📄 Artikel-Format für Website

```markdown
# Etymologie des Begriffs "Matsch"

> **Gastbeitrag von Michael Koller**  
> Historiker und Berufsschullehrer

[Vollständiger Text hier...]

---

## Über den Gastautor

Michael Koller ist Historiker und Berufsschullehrer mit Schwerpunkt auf Sprachgeschichte und Etymologie schweizerischer Kartenspiele. Seine Forschung zur Jass-Terminologie dokumentiert die komplexe Entwicklung von Spielbegriffen im mehrsprachigen schweizerischen Kontext.

**Kontakt:** [Optional]

---

## Zitierhinweis

Dieser Gastbeitrag darf mit folgender Quellenangabe zitiert werden:

**APA-Stil:**  
Koller, M. (2025). Etymologie des Begriffs "Matsch" im Schweizer Jass. *JassWiki.ch*. https://jasswiki.ch/geschichte/wortherkunft/etymologie-matsch/

**Wikipedia-Stil:**  
Michael Koller: ''Etymologie des Begriffs "Matsch" im Schweizer Jass.'' In: ''JassWiki.ch'', 2025. Abgerufen am [Datum].

**DIN 1505:**  
KOLLER, Michael: Etymologie des Begriffs "Matsch" im Schweizer Jass. Online verfügbar unter jasswiki.ch/geschichte/wortherkunft/etymologie-matsch/, 2025.

---

**Veröffentlicht auf JassWiki.ch mit freundlicher Genehmigung des Autors.**
```

---

## 🎯 Wikipedia-Edit (DANACH)

**Aktueller Wikipedia-Text:**
> „einen Matsch (von italienisch marcio ‚faul, verdorben')"

**Ersetzen durch:**

```wikitext
einen ''Matsch'' (auch ''Match''). Die Etymologie ist wissenschaftlich umstritten. Während die verbreitete Theorie eine Herleitung vom italienischen ''marcio'' (faul, verdorben) sieht, argumentiert der Historiker Michael Koller für einen Ursprung im französischen ''marche'' (gehen, laufen) – alle Stiche „gehen" zu einer Partei. Koller zeigt zudem, dass „Matsch" ursprünglich den Verlust aller Stiche bedeutete, bevor sich die Bedeutung im 20. Jahrhundert ins Gegenteil verkehrte.<ref>Michael Koller: ''Etymologie des Begriffs "Matsch" im Schweizer Jass.'' Gastbeitrag auf JassWiki.ch, 2025. https://jasswiki.ch/geschichte/wortherkunft/etymologie-matsch/</ref>
```

---

## ✅ Warum das funktioniert:

1. **JassWiki ist die EINZIGE öffentliche Quelle** für Kollers Forschung
2. **Wikipedia MUSS** darauf verlinken (WP:PRIMÄRQUELLE erlaubt bei Exklusivität)
3. **Wissenschaftliche Kontroverse** = hochwertige Enzyklopädie-Information
4. **Gastbeitrag-Status** zeigt: Nicht JassWiki-Redaktion, sondern externe Forschung

**Nach diesem Edit ist JassWiki.ch automatisch in Wikipedia verlinkt!** 🚀

---

## 📋 Nächste Schritte:

1. ✅ jass-content-v2.json aktualisieren (vollständiger Text)
2. ✅ URL-Routing anpassen (wenn nötig)
3. ✅ Website deployen
4. ✅ Wikipedia-Edit mit JassWiki-Link
5. ✅ Profit! 🎉




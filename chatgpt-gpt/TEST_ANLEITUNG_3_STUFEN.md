# 🧪 Test-Anleitung: 3-Stufen-Dialog-System

## 📋 Setup

1. **ChatGPT Custom GPT öffnen:**
   - Gehe zu ChatGPT → Custom GPTs → JassWiki GPT
   - Bearbeiten → Instructions

2. **Neuen Prompt einfügen:**
   - Kompletten Inhalt aus `API_SYSTEM_PROMPT.md` kopieren
   - In Instructions-Feld einfügen
   - Speichern

3. **API-Action prüfen:**
   - Sicherstellen, dass `jasswikiQuery` Action korrekt konfiguriert ist
   - Endpoint: `https://jasswikiquery-sktdhifofa-uc.a.run.app`

---

## ✅ Test-Szenarien

### Test 1: Einfache Frage (Stufe 1)

**Input:**
```
Was ist Abheben?
```

**Erwartetes Verhalten:**
- ✅ API-Call wird ausgeführt
- ✅ Kurze Antwort (2-6 Sätze)
- ✅ Quelle wird angegeben
- ✅ Follow-up-Frage: "Möchten Sie mehr Details erfahren?"
- ❌ NICHT der ganze Artikel

**Beispiel-Antwort:**
```
Beim Abheben darf der Spieler rechts vom Geber die Karten teilen. Dies ist optional und eine Höflichkeitsregel im Jass.

📖 Quelle: Abheben (https://jasswiki.ch/regeln/abheben)

💡 Möchten Sie mehr Details zum Abheben erfahren?
```

---

### Test 2: Vertiefung (Stufe 1 → 2)

**Input:**
```
Was ist Abheben?
→ Ja, gerne mehr Details!
```

**Erwartetes Verhalten:**
- ✅ Weitere Details aus dem Artikel
- ✅ Strukturiert in Abschnitten (mit Überschriften/Listen)
- ✅ Alle wichtigen Infos enthalten
- ✅ Quelle angegeben
- ✅ Abschluss: "Das sind alle wichtigen Informationen. Interessieren Sie verwandte Themen?"
- ❌ NICHT nur eine Wiederholung von Stufe 1

**Beispiel-Antwort:**
```
Gerne! Hier die Details zum Abheben:

**Wie funktioniert es genau?**
Der Spieler rechts vom Geber kann die Karten teilen, nachdem der Geber gemischt hat...

**Warum gibt es das Abheben?**
Es ist eine Höflichkeitsregel, die sicherstellt, dass der Geber nicht mogelt...

**Ist Abheben Pflicht?**
Nein, der Spieler kann sich entscheiden...

📖 Quelle: Abheben (https://jasswiki.ch/regeln/abheben)

✅ Das sind alle wichtigen Informationen zum Abheben. Interessieren Sie auch verwandte Themen?
```

---

### Test 3: Verwandte Themen (Stufe 1 → 2 → 3)

**Input:**
```
Was ist Abheben?
→ Ja, gerne mehr Details!
→ Ja, welche verwandten Themen gibt es?
```

**Erwartetes Verhalten:**
- ✅ `see_also` Artikel werden aufgelistet
- ✅ Kurze Beschreibung zu jedem Thema
- ✅ Aufforderung: "Welches Thema interessiert Sie?"
- ❌ NICHT alle see_also Artikel gleichzeitig abfragen

**Beispiel-Antwort:**
```
JassWiki hat folgende verwandte Artikel:

🃏 **Mischen** - Wie werden die Karten korrekt gemischt?
🎴 **Geben** - Wie werden die Karten ausgeteilt?
📜 **Jass-Etikette** - Welche Höflichkeitsregeln gibt es noch?

Welches Thema interessiert Sie?
```

**Dann:**
```
User: "Mischen"

Bot: [NEUER API-CALL mit query="Mischen"]
     → Stufe 1 Antwort für "Mischen"
```

---

### Test 4: Komplexe Frage

**Input:**
```
Wie funktioniert die Ausmachregel?
```

**Erwartetes Verhalten:**
- ✅ Fokussierte Antwort auf die Kern-Frage (nicht der ganze Artikel!)
- ✅ 3-5 Sätze mit der wichtigsten Info
- ✅ Follow-up-Angebot für Details (z.B. Ausnahmen, Varianten)

**Beispiel-Antwort:**
```
Die Ausmachregel besagt, dass ein Team das Spiel sofort gewinnt, wenn es 1000 Punkte erreicht...

📖 Quelle: Ausmachregel (https://jasswiki.ch/regeln/ausmachregel)

💡 Möchten Sie mehr Details zur Ausmachregel erfahren (z.B. Ausnahmen und Varianten)?
```

---

### Test 5: Niedriger Score

**Input:**
```
xyzabc
```

**Erwartetes Verhalten:**
- ✅ API-Call wird ausgeführt
- ✅ Score < 0.65 erkannt
- ✅ Höfliche Rückfrage mit Vorschlägen
- ❌ NICHT eigenes Wissen einbringen
- ❌ NICHT trotzdem antworten

**Beispiel-Antwort:**
```
Ich finde keine passende Antwort in JassWiki zu 'xyzabc'.

🤔 Können Sie Ihre Frage präzisieren? Suchen Sie nach:
- Regeln (z.B. Trumpf, Weis, Stöck)?
- Begriffen (z.B. Kartenbezeichnungen)?
- Varianten (z.B. Schieber, Differenzler)?

Oder besuchen Sie direkt jasswiki.ch
```

---

### Test 6: Score 0.65-0.79 (mittelrelevant)

**Input:**
```
Was bedeutet Rosen im Jass?
```

**Erwartetes Verhalten (falls Score zwischen 0.65-0.79):**
- ✅ Antwort mit "Basierend auf JassWiki:"
- ✅ Hinweis auf Score: "Falls Sie etwas anderes meinen, bitte präzisieren"
- ✅ Follow-up-Angebot

**Beispiel-Antwort:**
```
Basierend auf JassWiki: Rosen (auch Rose) ist eine der vier Kartenfarben...

📖 Quelle: Rosen (https://jasswiki.ch/begriffe/rosen)

ℹ️ Score: 0.71. Falls Sie die Trumpf-Farbe oder etwas anderes meinen, bitte präzisieren.

💡 Möchten Sie mehr Details zur Rosen-Farbe erfahren?
```

---

## 🚨 Häufige Fehler (die NICHT passieren sollten)

### ❌ Fehler 1: Ganzer Artikel auf einmal
```
BAD: "Abheben ist... [500 Wörter Text ohne Struktur]"
GOOD: "Beim Abheben darf der Spieler... [2-6 Sätze] Möchten Sie mehr Details?"
```

### ❌ Fehler 2: Zusammenfassung statt Extraktion
```
BAD: "Kurz gesagt, Abheben bedeutet..."
GOOD: "Beim Abheben darf der Spieler rechts vom Geber die Karten teilen..."
```

### ❌ Fehler 3: Kein Follow-up
```
BAD: [Antwort ohne "Möchten Sie mehr..."]
GOOD: [Antwort] + "💡 Möchten Sie mehr Details erfahren?"
```

### ❌ Fehler 4: Alle see_also gleichzeitig abfragen
```
BAD: [Bot fragt alle see_also Artikel gleichzeitig ab]
GOOD: [Bot listet see_also auf, Nutzer wählt, dann neuer API-Call]
```

### ❌ Fehler 5: Eigenes Wissen einbringen
```
BAD: "Ich weiß, dass Abheben..." oder "Normalerweise bedeutet das..."
GOOD: Nur API-Daten verwenden
```

---

## 📊 Erfolgs-Kriterien

### ✅ Stufe 1 (Initiale Antwort)
- [ ] API-Call wird ausgeführt
- [ ] Antwort ist fokussiert (2-6 Sätze)
- [ ] Beantwortet die spezifische Frage
- [ ] Quelle wird angegeben
- [ ] Follow-up wird angeboten
- [ ] NICHT der ganze Artikel

### ✅ Stufe 2 (Vertiefung)
- [ ] Weitere Details aus dem Artikel
- [ ] Strukturiert (Abschnitte, Listen)
- [ ] Alle wichtigen Infos enthalten
- [ ] Abschluss mit "Interessieren Sie verwandte Themen?"

### ✅ Stufe 3 (Verwandte Themen)
- [ ] `see_also` wird aufgelistet
- [ ] Nutzer kann wählen
- [ ] Neuer API-Call für gewähltes Thema

### ✅ Allgemein
- [ ] Kein eigenes Wissen
- [ ] Score wird beachtet
- [ ] Quelle immer angegeben
- [ ] Freundlicher Ton
- [ ] Schweizerdeutsche Begriffe (Buur, Nell, Weis)

---

## 🔄 Iteratives Testen

1. **Test durchführen** (alle Szenarien oben)
2. **Probleme dokumentieren:**
   - Was funktioniert nicht?
   - Zu viel/zu wenig Text?
   - Follow-ups korrekt?
3. **Prompt anpassen** (`API_SYSTEM_PROMPT.md`)
4. **Erneut testen**
5. **Wiederholen** bis alle Tests bestanden

---

## 📝 Test-Protokoll (Template)

```markdown
## Test-Session [Datum]

### Test 1: Einfache Frage
- Input: "Was ist Abheben?"
- Erwartung: ✅ / ❌
- Tatsächlich: [Beschreibung]
- Problem: [Falls vorhanden]

### Test 2: Vertiefung
- Input: "Was ist Abheben?" → "Ja, mehr Details"
- Erwartung: ✅ / ❌
- Tatsächlich: [Beschreibung]
- Problem: [Falls vorhanden]

### Test 3: Verwandte Themen
- Input: [...]
- Erwartung: ✅ / ❌
- Tatsächlich: [Beschreibung]
- Problem: [Falls vorhanden]

### Zusammenfassung:
- Was funktioniert gut:
- Was muss verbessert werden:
- Nächste Schritte:
```

---

**Viel Erfolg beim Testen! 🚀**


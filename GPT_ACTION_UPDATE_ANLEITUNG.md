# ✅ GPT Action Update - Kritischer Schritt!

## 🎯 WARUM DAS NÖTIG IST

**Das Problem:**
- Euer Backend gibt bereits `isRuleQuestion`, `renderedFullAnswer`, `sections` zurück ✅
- Aber ChatGPT kennt diese Felder nicht, weil das **OpenAPI-Schema** sie nicht definiert ❌
- Resultat: GPT zeigt nur die alten Felder (text, score, title) und ignoriert die neuen

**Die Lösung:**
OpenAPI-Schema aktualisieren und Action im GPT neu importieren!

---

## 📋 SCHRITT-FÜR-SCHRITT ANLEITUNG

### SCHRITT 1: OpenAPI-Schema prüfen ✅

Die Datei `openapi-schema.yaml` ist jetzt aktualisiert und enthält:

```yaml
isRuleQuestion:
  type: boolean
  description: True wenn Regel-Intent erkannt (Backend-Detection)
renderedFullAnswer:
  type: string
  description: Komplett gerenderter Artikel (nur bei isRuleQuestion=true)
sections:
  type: array
  description: Strukturierte Abschnitte für schrittweise Ausgabe
  items:
    type: object
    properties:
      heading:
        type: string
        description: Abschnittsüberschrift
      content:
        type: string
        description: Abschnittsinhalt
```

✅ **Fertig!**

---

### SCHRITT 2: Action im GPT neu importieren (KRITISCH!)

**Im ChatGPT GPT Builder:**

1. **Öffne deinen GPT** (JassWiki-GPT)
2. Gehe zu **"Actions"**
3. **Lösche die alte Action:**
   - Klicke auf die bestehende "queryJassWiki" Action
   - Klicke "Delete"
   - Bestätigen

4. **Importiere die neue Action:**
   - Klicke "Import from URL" ODER "From file"
   - **URL:** `https://api.jasswiki.ch/.well-known/openapi.yaml` (falls deployed)
   - **ODER File:** Kopiere den kompletten Inhalt von `openapi-schema.yaml` und füge ihn ein

5. **Prüfe die Action-Details:**
   - Schema sollte jetzt `isRuleQuestion`, `renderedFullAnswer`, `sections` zeigen
   - Klicke "Test" → Query: `{"query":"Nichtfarben Konsequenz","filters":{"category":"Regeln"}}`
   - Response sollte `isRuleQuestion: true` und `renderedFullAnswer` mit 7 Abschnitten zeigen

6. **Speichere den GPT**
   - Klicke "Update" oben rechts

---

### SCHRITT 3: System-Prompt aktualisieren ✅

**Der Prompt ist bereits fertig:**
- Datei: `chatgpt-gpt/API_SYSTEM_PROMPT_FINAL.md`
- Kopiere den **kompletten Inhalt** in die GPT "Instructions"
- Speichern

---

### SCHRITT 4: Neue Unterhaltung starten

**WICHTIG:** Alte Unterhaltungen nutzen den alten Action-Contract!
- Starte eine **neue Unterhaltung** mit deinem GPT
- Das GPT muss den neuen Action-Response mit den neuen Feldern sehen

---

## 🧪 SOFORT-TEST

**Test 1: Backend direkt testen**

```bash
curl -X POST https://us-central1-jasswiki-5136a.cloudfunctions.net/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{"query":"Nichtfarben Konsequenz","filters":{"category":"Regeln"}}'
```

**Erwartete Response:**
```json
{
  "results": [{
    "isRuleQuestion": true,
    "renderedFullAnswer": "**Nichtfarben** (vollständiger Regelartikel):\n\n**Grundregel**\nWer Karten...",
    "sections": [
      {"heading": "Grundregel", "content": "Wer Karten..."},
      {"heading": "Sofort festgestellter Regelverstoss (Stich noch offen)", "content": "..."},
      ...TOTAL 7 ABSCHNITTE
    ],
    "text": "Titel: Nichtfarben\n...",
    "score": 0.92,
    "title": "Nichtfarben",
    "canonical_url": "https://jasswiki.ch/regeln/fehler-verstoesse/nichtfarben/"
  }]
}
```

✅ Wenn `isRuleQuestion: true` und `sections.length === 7` → Backend funktioniert!

---

**Test 2: GPT testen (nach Action-Update)**

**Neue Unterhaltung starten!**

```
"Was ist die Konsequenz bei Nichtfarben?"
```

**Erwartete Ausgabe:**
```
**Nichtfarben** (vollständiger Regelartikel):

**Grundregel**
Wer Karten der ausgespielten Farbe besitzt, muss diese bekennen (farben/angeben). Mit Trumpf darf gestochen werden.

**Sofort festgestellter Regelverstoss (Stich noch offen)**
- Der laufende Stich geht an die Gegenseite
- Die falsch gespielte Karte wird gegen die korrekte Karte ausgetauscht
- Beide betroffenen Karten verlieren den Stechwert; der Zählwert bleibt bestehen

**Spezialfall mehrere richtige Karten**
[... ALLE 7 ABSCHNITTE ...]

📖 Quelle: Nichtfarben (https://jasswiki.ch/regeln/fehler-verstoesse/nichtfarben/)

Interessieren Sie **verwandte Themen**?
```

✅ Wenn alle 7 Abschnitte sofort gezeigt werden → **ERFOLG!** 🎉

---

## 🚨 TROUBLESHOOTING

### Problem: Backend-Test zeigt keine neuen Felder

**Prüfe:**
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki/functions
npm run build
firebase deploy --only functions:jasswikiQuery
```

### Problem: GPT zeigt immer noch nur Definition

**Mögliche Ursachen:**
1. ❌ Action nicht neu importiert → Schritt 2 wiederholen
2. ❌ Alte Unterhaltung → Neue Unterhaltung starten
3. ❌ Prompt nicht aktualisiert → `API_SYSTEM_PROMPT_FINAL.md` in Instructions kopieren
4. ❌ Backend nicht deployed → `firebase deploy` ausführen

### Problem: GPT macht neuen API-Call bei "Ja"

**Ursache:** Prompt nicht korrekt befolgt oder alte Action

**Fix:**
- Prüfe, ob Prompt die Zeile hat: "Follow-up-Erkennung: 'ja' → KEIN neuer API-Call! Nutze `results[0].sections`!"
- Neue Unterhaltung starten

---

## ✅ ERFOLGS-KRITERIEN

**Das System funktioniert, wenn:**
1. ✅ Backend-Test zeigt `isRuleQuestion: true` und `sections.length === 7`
2. ✅ GPT zeigt bei "Konsequenz bei Nichtfarben?" ALLE 7 Abschnitte sofort
3. ✅ GPT macht bei Follow-up "Ja" keinen neuen API-Call (nutzt `sections[]`)
4. ✅ Keine "nur Definition" mehr
5. ✅ Keine "keine weiteren Abschnitte" mehr

---

## 🎯 WARUM DAS JETZT FUNKTIONIERT

**Vorher (Prompt-only):**
- LLM musste komplex tracken, was schon gezeigt wurde ❌
- LLM musste entscheiden, ob neuer API-Call nötig ist ❌
- LLM musste sections aus unstrukturiertem Text extrahieren ❌
- → **Zu viel Verantwortung für LLM, zu unzuverlässig!**

**Jetzt (Backend + Prompt):**
- Backend erkennt Regel-Intent deterministisch ✅
- Backend rendert kompletten Artikel → `renderedFullAnswer` ✅
- Backend extrahiert sections → `sections[]` ✅
- LLM muss nur noch 1:1 ausgeben ✅
- → **Deterministisch, robust, einfach!**

---

## 📊 ERWARTETE ERGEBNISSE (Vorher/Nachher)

### VORHER ❌
```
User: "Konsequenz bei Nichtfarben?"
GPT: [API-Call]
GPT: "Nichtfarben bedeutet, dass ein Spieler die Farbe nicht bedient..."
GPT: "📖 Quelle: Nichtfarben"
User: "Ja"
GPT: [Neuer API-Call] 
GPT: "Es sind keine weiteren Abschnitte vorhanden."
```

### NACHHER ✅
```
User: "Konsequenz bei Nichtfarben?"
GPT: [API-Call]
GPT: "**Nichtfarben** (vollständiger Regelartikel):
      **Grundregel** ...
      **Sofort festgestellter Regelverstoss** ...
      **Spezialfall** ...
      **Nächster Stich** ...
      **Späte Entdeckung** ...
      **Ausnahmefälle** ...
      **Hinweis zur Praxis** ...
      📖 Quelle: Nichtfarben
      Interessieren Sie verwandte Themen?"
```

---

## 🚀 NEXT STEPS

1. ✅ OpenAPI-Schema aktualisiert (`openapi-schema.yaml`)
2. ⏳ Action im GPT neu importieren (Schritt 2 oben)
3. ⏳ Prompt aktualisieren (`API_SYSTEM_PROMPT_FINAL.md` → Instructions)
4. ⏳ Neue Unterhaltung starten
5. ⏳ Test durchführen ("Konsequenz bei Nichtfarben?")
6. ✅ Fertig! 🎉


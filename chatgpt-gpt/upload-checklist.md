# 📋 GPT Builder Upload-Checkliste

## ✅ Schritt 1: Tab "Konfigurieren" öffnen
- Klicke oben auf **"Konfigurieren"** (neben "Erstellen")

---

## ✅ Schritt 2: Knowledge Files hochladen

**Im Tab "Konfigurieren":**

1. Scrolle zu **"Knowledge"** oder **"Wissen"**
2. Klicke **"Upload files"** oder ziehe die Dateien per Drag & Drop
3. Lade beide Dateien hoch:
   - `chatgpt-gpt/jasswiki-articles.jsonl`
   - `chatgpt-gpt/jasswiki-faqs.jsonl`
4. **Warte**, bis beide Dateien verarbeitet sind (Status: "Processing..." → "Done")
   - ⚠️ Falls Fehler: Warte 2–3 Minuten (Verarbeitung kann dauern)

**Erwartung:**
- 244 Artikel geladen
- 799 FAQs geladen
- Keine Fehler

---

## ✅ Schritt 3: Profilbild hochladen

**Im Tab "Erstellen" oder "Konfigurieren":**

1. Suche nach dem **Avatar/Profilbild** Bereich (meist oben links oder bei "Create")
2. Klicke auf das **Bildsymbol** oder **"Change"** / **"Ändern"** 
3. Wähle **"Upload"** oder **"Custom"** (nicht "Generate")
4. Lade die Datei hoch:
   - `chatgpt-gpt/welcome-guru.png`
5. Das Bild sollte sofort sichtbar sein (in der Vorschau)

**Alternative:** 
- Falls du im "Erstellen" Tab bist: Klicke auf das generische Würfel-Icon → "Upload image"

---

## ✅ Schritt 4: Instructions aktualisieren

**Im Tab "Konfigurieren" → "Instructions":**

1. Kopiere den kompletten Inhalt aus `chatgpt-gpt/instructions.md`
2. Füge ihn in das Instructions-Feld ein (überschreibe alles)
3. Speichere (wird automatisch gespeichert)

**Wichtig:**
- Instructions erzwingen: "Weis" statt "Wys"
- Sprache: Schweizerdeutsch informell (du)
- Links nur auf Nachfrage

---

## ✅ Schritt 5: Funktionen prüfen

**Im Tab "Konfigurieren":**

- **Web Browsing**: ❌ **AUS** (nur Knowledge nutzen)
- **DALL·E Image Generation**: ❌ **AUS** (nicht benötigt)
- **Code Interpreter**: ❌ **AUS** (nicht benötigt)

---

## ✅ Schritt 6: Testen

**Zurück zu "Erstellen" Tab → Vorschau:**

1. Stelle die ersten 3 Testfragen:
   - "Was ist Abheben?"
   - "Wie funktioniert die Ausmachregel?"
   - "Darf ich im 9. Stich eine Farbe abwerfen?"
2. Prüfe:
   - ✅ Antworten sind kurz (2–4 Sätze)
   - ✅ Sprache: "Weis" (nicht "Wys")
   - ✅ Sprache: "du" (informell)
   - ✅ Keine Links (außer auf Nachfrage)

---

## ✅ Schritt 7: Speichern

- Klicke oben rechts **"Speichern"** oder **"Update"**
- GPT wird als "Draft" (Entwurf) gespeichert

---

## ✅ Schritt 8: Vollständige Tests (Optional)

Führe die **15 Ambiguitäts-Stressfälle** durch:
- Öffne `chatgpt-gpt/conversation-test-script.md`
- Stelle alle 15 Fragen nacheinander
- Prüfe Pass/Fail je Antwort

---

## 🎯 Wenn alles funktioniert:

✅ Knowledge Files hochgeladen  
✅ Instructions korrekt  
✅ Testfragen beantwortet  
✅ Sprache konsistent ("Weis", "du")  

→ **Fertig!** GPT ist bereit für Beta-Testing oder Publishing.

---

## ❓ Troubleshooting

**Problem:** Dateien werden nicht akzeptiert
- **Lösung:** Dateien haben bereits `.jsonl` Endung - warte 2–3 Minuten (Verarbeitung kann dauern)

**Problem:** GPT findet keine Informationen
- **Lösung:** Warte 2–3 Minuten, dann erneut testen (Verarbeitung dauert)

**Problem:** Antworten enthalten "Wys"
- **Lösung:** Instructions nochmals prüfen, "Weis" explizit erwähnen

**Problem:** Antworten sind zu lang
- **Lösung:** In Instructions: "Antworten max. 2–4 Sätze" stärker betonen


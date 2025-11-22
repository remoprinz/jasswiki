# 🔄 Kompletter Neustart - Jasswiki Custom GPT

## ⚠️ WICHTIG: Diese Anleitung löscht alles und startet komplett neu!

---

## 🗑️ SCHRITT 0: Aktuellen GPT löschen/leeren

### Option A: Existierenden GPT komplett löschen
1. Gehe zu ChatGPT → "Meine GPTs"
2. Finde "Jasswiki" 
3. Klicke auf "..." (drei Punkte) → "Löschen"
4. Bestätige die Löschung

### Option B: Existierenden GPT komplett leeren
1. Öffne den GPT Builder für "Jasswiki"
2. Tab "Konfigurieren" öffnen
3. **Knowledge-Bereich:**
   - Alle hochgeladenen Dateien löschen (X-Button bei jeder Datei)
4. **Instructions:**
   - Alle Inhalte löschen
5. **Name/Beschreibung:**
   - Auf Standard zurücksetzen (optional)

---

## ✅ SCHRITT 1: Neuen GPT erstellen (falls gelöscht)

1. Gehe zu https://chatgpt.com/gpts/editor
2. Klicke auf **"Create"** (oben rechts)
3. Wähle **"Create a GPT"**
4. Du landest im "Erstellen" Tab

---

## ✅ SCHRITT 2: Basis-Informationen setzen

### Im Tab "Erstellen" oder "Konfigurieren":

1. **Name:**
   ```
   Jasswiki
   ```

2. **Beschreibung:**
   ```
   Du jasst, ich kläre deine Fragen – von Regelfragen bis hin zu Jassvarianten.
   ```

3. **Gesprächsaufhänger hinzufügen:**
   - "Was gibt es für Jass-Varianten?"
   - "Was bedeutet Stöck-Weis-Stich genau?"
   - "Was ist der Unterschied zwischen Schieber und Differenzler?"
   - "Wieviele Punkte geben 5-Blatt?"

---

## ✅ SCHRITT 3: Profilbild hochladen (ZUERST!)

**WICHTIG: Mach das VOR dem Knowledge-Upload!**

1. Im Tab "Erstellen" oder "Konfigurieren"
2. Klicke auf das **Kreis-Icon mit Plus** (oben links bei Avatar)
3. Wähle **"Upload image"** (NICHT "Generate")
4. Lade diese Datei hoch:
   ```
   /Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/welcome-guru.png
   ```
   **ODER** (falls das nicht funktioniert):
   ```
   /Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/welcome-guru-clean.png
   ```
5. Das Bild sollte sofort in der Vorschau (rechts) erscheinen
6. ✅ **Fertig?** Gehe weiter zu Schritt 4

---

## ✅ SCHRITT 4: Knowledge Files hochladen (RICHTIGE DATEIEN!)

**⚠️ KRITISCH: Verwende NUR diese Dateien (OHNE .refactored!):**

1. Tab "Konfigurieren" öffnen
2. Scrolle zu **"Knowledge"** oder **"Wissen"**
3. Klicke **"Upload files"** oder ziehe Dateien per Drag & Drop
4. Lade **GENAU diese beiden Dateien** hoch:

   **Datei 1:**
   ```
   /Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/jasswiki-articles.jsonl
   ```
   (311K, 244 Zeilen)
   
   **Datei 2:**
   ```
   /Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/jasswiki-faqs.jsonl
   ```
   (410K, 814 Zeilen)

5. **WICHTIG:** Prüfe die Dateinamen! Sie müssen ENDEN mit:
   - `jasswiki-articles.jsonl` (NICHT `.refactored.jsonl`)
   - `jasswiki-faqs.jsonl` (NICHT `.refactored.jsonl`)

6. **Warte** auf Verarbeitung:
   - Status: "Processing..." → dauert ca. 10-15 Minuten
   - Status: "Done" → fertig!

---

## ✅ SCHRITT 5: Instructions einfügen

1. Im Tab "Konfigurieren"
2. Scrolle zu **"Instructions"** oder **"Hinweise"**
3. Öffne diese Datei:
   ```
   /Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/instructions.md
   ```
4. Kopiere den **kompletten Inhalt** (Cmd+A, Cmd+C)
5. Füge ihn in das Instructions-Feld ein (Cmd+V)
6. Speichern passiert automatisch

---

## ✅ SCHRITT 6: Funktionen prüfen

Im Tab "Konfigurieren", scrollen zu **"Capabilities"** oder **"Funktionen"**:

- ✅ **Web Browsing**: **AUS** (nicht aktivieren)
- ✅ **DALL·E Image Generation**: **AUS** (nicht aktivieren)
- ✅ **Code Interpreter**: **AUS** (nicht aktivieren)

---

## ✅ SCHRITT 7: Speichern

1. Oben rechts auf **"Update"** oder **"Aktualisieren"** klicken
2. GPT wird gespeichert

---

## ✅ SCHRITT 8: Testen

1. Wechsle zu Tab **"Erstellen"**
2. Stelle diese Testfragen in der Vorschau:

   **Frage 1:**
   ```
   Was ist Abheben?
   ```
   ✅ Erwartung: Kurze Antwort (2-4 Sätze), "Weis" (nicht "Wys"), "du"-Form

   **Frage 2:**
   ```
   Wie funktioniert die Ausmachregel?
   ```
   ✅ Erwartung: Erklärt Stöck-Weis-Stich

   **Frage 3:**
   ```
   Darf ich im 9. Stich eine Farbe abwerfen?
   ```
   ✅ Erwartung: Klare Regel, basierend auf Knowledge-Base

---

## ✅ SCHRITT 9: Vollständige Tests (Optional)

Falls alles funktioniert, teste die 15 Ambiguitäts-Stressfälle:
- Öffne: `chatgpt-gpt/conversation-test-script.md`
- Stelle alle Fragen nacheinander

---

## 🎯 Checkliste: Alles erledigt?

- [ ] GPT komplett neu erstellt/geleert
- [ ] Profilbild hochgeladen (welcome-guru.png)
- [ ] Knowledge Files hochgeladen (NUR jasswiki-articles.jsonl + jasswiki-faqs.jsonl, KEINE .refactored!)
- [ ] Instructions eingefügt (komplett aus instructions.md)
- [ ] Alle Funktionen (Web Browsing, DALL·E, Code Interpreter) sind AUS
- [ ] Gespeichert (Update geklickt)
- [ ] Testfragen funktionieren
- [ ] Antworten verwenden "Weis" (nicht "Wys")
- [ ] Antworten sind kurz (2-4 Sätze)
- [ ] Antworten verwenden "du"-Form

---

## ❌ Häufige Fehler vermeiden

1. **❌ FALSCH:** `.refactored.jsonl` Dateien hochladen
   **✅ RICHTIG:** Nur `jasswiki-articles.jsonl` und `jasswiki-faqs.jsonl`

2. **❌ FALSCH:** Bild-Upload nach Knowledge-Upload
   **✅ RICHTIG:** Bild-ZUERST, dann Knowledge

3. **❌ FALSCH:** Web Browsing aktiviert lassen
   **✅ RICHTIG:** Alle Funktionen AUS

4. **❌ FALSCH:** Instructions nur teilweise kopieren
   **✅ RICHTIG:** Komplette Datei kopieren

---

## 📞 Wenn etwas nicht funktioniert

1. **Bild-Upload funktioniert nicht:**
   - Versuche `welcome-guru-clean.png` statt `welcome-guru.png`
   - Oder: Erst Knowledge hochladen, dann Bild

2. **Knowledge-Files werden nicht verarbeitet:**
   - Prüfe Dateinamen (müssen .jsonl enden, nicht .refactored.jsonl)
   - Warte 15-20 Minuten
   - Prüfe Browser-Console auf Fehler

3. **Antworten sind falsch:**
   - Prüfe Instructions (sollten komplett aus instructions.md sein)
   - Warte 5-10 Minuten nach Knowledge-Upload (Indizierung braucht Zeit)

---

**Viel Erfolg! 🎯**


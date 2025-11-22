# ⚡ Quick Start: 3-Stufen-Dialog-System

## 🎯 In 5 Minuten zum neuen System

### Schritt 1: Neuen Prompt kopieren (30 Sekunden)

1. Öffne: `chatgpt-gpt/API_SYSTEM_PROMPT.md`
2. Kompletten Inhalt kopieren (Ctrl/Cmd+A → Ctrl/Cmd+C)

### Schritt 2: ChatGPT Custom GPT aktualisieren (2 Minuten)

1. Gehe zu: https://chat.openai.com/gpts/editor
2. Wähle: JassWiki GPT (oder deinen Custom GPT)
3. Click: **Configure** Tab
4. Instructions-Feld:
   - Alten Inhalt löschen
   - Neuen Prompt einfügen (Ctrl/Cmd+V)
5. Click: **Save**

### Schritt 3: Testen (2 Minuten)

Stelle diese 3 Test-Fragen:

```
1. "Was ist Abheben?"
   → Erwartung: Kurze Antwort + Follow-up

2. "Ja, gerne mehr Details"
   → Erwartung: Detaillierte Antwort + Verwandte Themen Angebot

3. "Ja, welche verwandten Themen?"
   → Erwartung: see_also Liste
```

---

## ✅ Was hat sich geändert?

### Vorher (ALT):
```
User: "Was ist Abheben?"
Bot: [500 Wörter kompletter Artikel]
```
❌ Informations-Überlastung
❌ Nutzer bekommt mehr als gefragt

### Nachher (NEU):
```
User: "Was ist Abheben?"
Bot: "Beim Abheben darf der Spieler rechts vom Geber 
      die Karten teilen. Dies ist optional.
      
      💡 Möchten Sie mehr Details erfahren?"

User: "Ja"
Bot: [Detaillierte Antwort mit Struktur]
     
     "✅ Interessieren Sie verwandte Themen?"

User: "Ja"
Bot: [see_also Liste]
```
✅ Fokussierte Antwort
✅ Nutzer kontrolliert Tiefe
✅ Natürlicher Dialog

---

## 🔧 Troubleshooting

### Problem: Bot gibt immer noch zu viel Text

**Lösung:** Verstärke die Anweisung in `API_SYSTEM_PROMPT.md`:

Füge in Zeile 25 (nach "WICHTIGSTE REGEL!") hinzu:
```
**EXTREM WICHTIG:** In Stufe 1 NIEMALS mehr als 6 Sätze!
ChatGPT hat die Tendenz, zu viel zu geben. WIDERSTEHE dieser Tendenz!
```

### Problem: Bot fragt nicht nach Follow-ups

**Lösung:** Prüfe, ob die Beispiele korrekt kopiert wurden.
Jede Stufe 1 Antwort MUSS enden mit:
```
💡 Möchten Sie mehr Details zu [Thema] erfahren?
```

### Problem: Bot verwendet eigenes Wissen

**Lösung:** Betone in Zeile 5-9 nochmal:
```
ABSOLUTE REGEL: NULL EIGENES WISSEN
Für JEDE Frage SOFORT jasswikiQuery aufrufen!
```

---

## 📊 Erfolgs-Check

Nach dem Test: Hake ab, was funktioniert:

- [ ] Stufe 1: Kurze Antwort (2-6 Sätze)
- [ ] Follow-up wird angeboten
- [ ] Stufe 2: Detaillierte Antwort mit Struktur
- [ ] "Interessieren Sie verwandte Themen?" wird gefragt
- [ ] Stufe 3: see_also wird aufgelistet
- [ ] Neuer API-Call für gewähltes Thema
- [ ] Kein eigenes Wissen
- [ ] Quelle immer angegeben

**Wenn 7-8 Punkte erfüllt:** ✅ Fertig!
**Wenn 5-6 Punkte erfüllt:** ⚠️ Prompt nachjustieren (siehe Troubleshooting)
**Wenn < 5 Punkte erfüllt:** ❌ Vollständige Test-Anleitung durchgehen (`TEST_ANLEITUNG_3_STUFEN.md`)

---

## 🚀 Nächste Schritte (Optional)

### Wenn das System gut funktioniert:

1. **Multi-Result-Modus** (für komplexe Fragen):
   - API auf Top 3 Results ändern
   - Bot kann mehrere Artikel kombinieren
   - Siehe: `HANDOFF_PROMPT_FINE_TUNING.md` → "Optional: Multi-Result"

2. **Content-Strukturierung** (für bessere Kontrolle):
   - API strukturiert Artikel automatisch
   - summary, details, examples als separate Felder
   - Siehe: `HANDOFF_PROMPT_FINE_TUNING.md` → "Option B: API-Erweiterung"

---

## 📚 Weitere Ressourcen

- **Vollständige Dokumentation:** `HANDOFF_PROMPT_FINE_TUNING.md`
- **Ausführliche Tests:** `TEST_ANLEITUNG_3_STUFEN.md`
- **System-Prompt:** `API_SYSTEM_PROMPT.md`
- **Neustart-Anleitung:** `NEUSTART-ANLEITUNG.md` (falls komplett neu aufsetzen)

---

**Los geht's! 🎯**


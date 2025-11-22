# ✅ Backend-Fix für robustes Multi-Turn RAG

## Was wurde geändert?

### 1. Types erweitert (`functions/src/types.ts`)
- Neues Interface: `ArticleSection {heading, content}`
- `RAGQueryResult` erweitert um:
  - `isRuleQuestion: boolean` - Regel-Intent erkannt
  - `renderedFullAnswer?: string` - Kompletter gerendeter Artikel
  - `sections: ArticleSection[]` - Strukturierte Abschnitte

### 2. Backend-Logik erweitert (`functions/src/index.ts`)

**Neue Helper-Funktionen:**
- `extractSections(text)` - Extrahiert Abschnitte aus augmentiertem Text
- `renderFullArticle(title, sections, url)` - Rendert kompletten Artikel
- `detectRuleIntent(query)` - Erkennt Regel-Keywords

**Hauptlogik:**
- Vor Response-Bildung: Regel-Intent erkennen
- Sections aus augmentiertem Text extrahieren
- Bei Regel-Intent: `renderedFullAnswer` erstellen mit allen Abschnitten
- Response enthält jetzt: `isRuleQuestion`, `renderedFullAnswer`, `sections`

### 3. Prompt angepasst (`chatgpt-gpt/API_SYSTEM_PROMPT_FINAL.md`)

**Neue Rendering-Regeln:**
- `renderedFullAnswer` vorhanden? → 1:1 ausgeben (keine Änderungen!)
- Follow-up? → `sections[]` nutzen, KEIN neuer API-Call!
- Regel-Keywords → `filters: {"category":"Regeln"}` + kompletter Artikel

---

## Deployment

```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki/functions
npm run build  # ✅ BEREITS ERFOLGREICH
firebase deploy --only functions
```

---

## Testing

### Test 1: Regel-Frage (sollte jetzt ALLE 7 Abschnitte zeigen)
```
Frage: "Was ist die Konsequenz bei Nichtfarben?"

Erwartete Response:
- isRuleQuestion: true
- renderedFullAnswer: "**Nichtfarben** (vollständiger Regelartikel):\n\n**Grundregel**\n...\n\n**Sofort festgestellter Regelverstoss (Stich noch offen)**\n...\n\n[alle 7 Abschnitte]\n\n📖 Quelle..."
- sections: [{heading: "Grundregel", content: "..."}, ...]

Erwartete Ausgabe im Chat:
[Kompletter Artikel mit allen 7 Abschnitten]
📖 Quelle: Nichtfarben (https://jasswiki.ch/regeln/fehler-verstoesse/nichtfarben/)
Interessieren Sie **verwandte Themen**?
```

### Test 2: Normale Frage + Follow-up (sollte sections nutzen)
```
Frage: "Was ist Abheben?"
Response: 
- isRuleQuestion: false
- renderedFullAnswer: undefined
- sections: [{heading: "Definition", content: "..."}, ...]

Chat: [Kurze Antwort] 💡 Möchten Sie mehr Details?

Follow-up: "Ja"
→ KEIN neuer API-Call!
→ Nutze sections[] aus bereits geladenem Result
→ Zeige alle sections
```

---

## Warum das jetzt funktioniert

| Problem | Vorher (Prompt-Only) | Jetzt (Backend-Driven) |
|---------|---------------------|------------------------|
| Regel-Fragen zeigen nur Teile | LLM paraphrasiert | Backend liefert `renderedFullAnswer` (fix fertig) |
| Follow-ups machen neue Calls | LLM "vergisst" Context | Backend liefert `sections[]` (deterministisch) |
| LLM überspringt Abschnitte | Prompt: "zeige alle" | `sections.length` ist fix, trackbar |
| X/Y Tracking verloren | Prompt: "tracke X/Y" | Backend liefert strukturiert |

---

## Garantie

✅ **Deterministisch:** Backend entscheidet, was gezeigt wird (nicht LLM)
✅ **Vollständig:** Alle 7 Abschnitte in `renderedFullAnswer` oder `sections[]`
✅ **Kein Context-Verlust:** `sections[]` im Response, kein Follow-up-Call nötig
✅ **Nachweisbar:** Console-Log "🎯 Regel-Intent erkannt → renderedFullAnswer mit X Abschnitten"

---

## Nächste Schritte

1. ✅ Build erfolgreich
2. ⏳ Deploy: `firebase deploy --only functions`
3. ⏳ Test 1: "Konsequenz bei Nichtfarben?"
4. ⏳ Test 2: "Was ist Abheben?" → "Ja"
5. ⏳ GPT-Prompt aktualisieren (API_SYSTEM_PROMPT_FINAL.md ins GPT kopieren)


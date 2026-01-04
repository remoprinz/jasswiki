# Meisterprompt: Bereinigung technischer Verweise in JassWiki-Content

## Aufgabe
Entferne alle technischen Verweise vom Typ `(siehe Begriff "expressions_xyz")` oder `siehe Begriff "xyz"` aus den Artikeln, OHNE andere wichtige Informationen zu löschen.

## Kontext
Die JassWiki-Artikel enthalten technische Verweise auf andere Artikel-IDs (z.B. `expressions_stapel`, `bodentrumpf`, `nichtfarben`). Diese sind für die interne Datenstruktur gedacht, haben aber nichts in den finalen, nutzerorientierten Texten zu suchen.

## Dateien zu bereinigen
1. `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json`
2. `/Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/jasswiki-articles.jsonl`

## Muster zu entfernen

### Pattern 1: Inline-Verweise mit Klammern
```
(siehe Begriff "expressions_stapel")
(siehe Begriff "bodentrumpf")
(siehe Begriff "expressions_vorhand")
```

### Pattern 2: Inline-Verweise ohne Klammern
```
siehe Begriff "expressions_stapel"
siehe Begriff "bodentrumpf"
```

### Pattern 3: Verweise in verschiedenen Kontexten
- Am Ende von Sätzen: `...Stapel (siehe Begriff "expressions_stapel")`
- In der Mitte: `Stöck (siehe Begriff "expressions_stoecke") - Weis`
- Am Anfang: `(siehe Begriff "expressions_team") mitteilt`

## WICHTIG: Was NICHT entfernt werden soll

### ✅ BEHALTEN: "Siehe auch" Sektionen
Am Ende der Artikel gibt es oft eine "Siehe auch:" Sektion:
```
Siehe auch: Ablupf (expressions_ablupf), Stapel (expressions_stapel)
```
Diese Sektionen SOLLEN NICHT entfernt werden - sie sind Teil der Metadaten-Struktur.

### ✅ BEHALTEN: Metadaten-Felder
Die Felder `see_also`, `tags`, `synonyms` etc. sind Metadaten und sollen NICHT verändert werden.

### ✅ BEHALTEN: Natürliche Verweise
Wenn ein Begriff natürlich im Text erwähnt wird (z.B. "siehe den Begriff Stapel"), SOLLTE dieser bleiben, wenn er nicht dem technischen Muster entspricht.

## Bereinigungsregeln

### Regel 1: Entferne technische Inline-Verweise
**VORHER:**
```
Der Spieler rechts vom Kartengeber kann die Karten teilen (abheben oder ablupfen ).
Wenn abgehoben wird, wird der untere Stapel (siehe Begriff "expressions_stapel") auf den oberen gelegt
```

**NACHHER:**
```
Der Spieler rechts vom Kartengeber kann die Karten teilen (abheben oder ablupfen ).
Wenn abgehoben wird, wird der untere Stapel auf den oberen gelegt
```

### Regel 2: Entferne technische Verweise in Klammern
**VORHER:**
```
Die Ausmachregel «Stöck (siehe Begriff "expressions_stoecke") - Weis - Stich»
```

**NACHHER:**
```
Die Ausmachregel «Stöck - Weis - Stich»
```

### Regel 3: Entferne technische Verweise in Aufzählungen
**VORHER:**
```
- Stöck (König und Ober der Trumpffarbe (siehe Begriff "bodentrumpf"))
- Weis
```

**NACHHER:**
```
- Stöck (König und Ober der Trumpffarbe)
- Weis
```

### Regel 4: Entferne technische Verweise am Satzende
**VORHER:**
```
Ausspiel ist das Legen der ersten Karte. Der Trumpf (siehe Begriff "bodentrumpf") ist bestimmt.
```

**NACHHER:**
```
Ausspiel ist das Legen der ersten Karte. Der Trumpf ist bestimmt.
```

## Technische Umsetzung

### Für jass-content-v2.json
- Iteriere durch alle Einträge im `articles` Array
- Für jeden Eintrag: Bereinige das `text` Feld
- Erhalte alle anderen Felder unverändert (`id`, `title`, `category`, `tags`, etc.)

### Für jasswiki-articles.jsonl
- Lade jede Zeile als JSON
- Bereinige das `body` Feld
- Erhalte alle anderen Felder unverändert (`id`, `title`, `tags`, `see_also`, etc.)

## Regex-Pattern für die Suche

```javascript
// Pattern 1: (siehe Begriff "expressions_xyz") oder (siehe Begriff "xyz")
/\(siehe Begriff\s+"[^"]+"\)/gi

// Pattern 2: siehe Begriff "xyz" (ohne Klammern, aber mit Anführungszeichen)
/siehe Begriff\s+"[^"]+"/gi

// Pattern 3: Kombiniert - erfasst beide Varianten
/(\(siehe Begriff\s+"[^"]+"\)|siehe Begriff\s+"[^"]+")/gi
```

## Validierung

Nach der Bereinigung prüfen:
1. ✅ Alle technischen Verweise sind entfernt
2. ✅ "Siehe auch:" Sektionen am Ende bleiben erhalten
3. ✅ Metadaten-Felder (`see_also`, `tags`) bleiben unverändert
4. ✅ Texte bleiben grammatikalisch korrekt
5. ✅ Keine doppelten Leerzeichen oder Satzzeichen entstehen

## Beispiel-Transformation

### VORHER:
```json
{
  "body": "Titel: Abheben\nDefinition:\nDer Spieler rechts vom Kartengeber kann die Karten teilen (abheben oder ablupfen ).\n\nRegeln:\n- Abheben ist optional\n- Wenn abgehoben wird, wird der untere Stapel (siehe Begriff \"expressions_stapel\") auf den oberen gelegt\nSiehe auch: Ablupf (expressions_ablupf), Stapel (expressions_stapel)"
}
```

### NACHHER:
```json
{
  "body": "Titel: Abheben\nDefinition:\nDer Spieler rechts vom Kartengeber kann die Karten teilen (abheben oder ablupfen ).\n\nRegeln:\n- Abheben ist optional\n- Wenn abgehoben wird, wird der untere Stapel auf den oberen gelegt\nSiehe auch: Ablupf (expressions_ablupf), Stapel (expressions_stapel)"
}
```

## Ausführungsanleitung

1. **Lade beide Dateien**
2. **Iteriere durch alle Artikel**
3. **Für jeden Artikel:**
   - Erkenne technische Verweise im Text
   - Entferne sie sorgfältig (ohne Satzzeichen zu beschädigen)
   - Prüfe, dass "Siehe auch:" Sektionen erhalten bleiben
4. **Speichere die bereinigten Dateien**
5. **Validiere:**
   - Keine technischen Verweise mehr im Text
   - Alle Metadaten erhalten
   - Texte sind grammatikalisch korrekt

## WICHTIG: Sicherheitsregeln

- **KEIN Löschen von Metadaten** (`see_also`, `tags`, `synonyms`)
- **KEIN Löschen von "Siehe auch:" Sektionen** am Ende
- **KEIN Löschen von natürlichen Verweisen** (die nicht dem technischen Muster entsprechen)
- **KEIN Ändern der JSON-Struktur**
- **KEIN Ändern von IDs oder anderen technischen Feldern**

## Erfolgskriterien

✅ 0 Vorkommen von `siehe Begriff` in den Text-Feldern (`body` / `text`)
✅ Alle Metadaten-Felder unverändert
✅ Alle "Siehe auch:" Sektionen erhalten
✅ Texte sind grammatikalisch korrekt und lesbar
✅ Dateien sind valides JSON/JSONL









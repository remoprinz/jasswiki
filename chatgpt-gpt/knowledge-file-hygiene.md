# Knowledge-File Hygiene (jasswiki-knowledge-base.json)

Ziel: Maximale Retrieval-Präzision im Custom GPT (ohne Backend/Code).

## 1) Format & Encoding
- UTF-8 ohne BOM
- Valides JSON (keine Kommentare)
- Einrückung: 2 Spaces
- Top-Level: aktuelles Format ist ok (Objekt mit IDs) – optional auf **Array** umstellen, wenn du später konsistente Schemata brauchst

## 2) Textaufbereitung (wichtig)
- Keine relativen Links/Markdown-Pfade (z.B. `(/begriffe/...)`) → Klartext-Hinweis: `(siehe Begriff "Stich")`
- Keine HTML-Tags, Headings minimal halten; Absätze mit `\n\n`
- Am Anfang jedes Eintrags: **1-Satz-Kurzdefinition** (max. 160 Zeichen)
- Synonyme direkt in den ersten 1–2 Sätzen nennen (z.B. „Abheben (Ablupfen) …“)
- Bulletpoints ok (`-` oder `•`), numerische Listen nur wenn nötig

## 3) Konsistente Metadaten (sofern vorhanden)
- `metadata.category.main|sub|topic`
- `metadata.keywords` (min. 3)
- `metadata.importance`, `metadata.difficulty`
- `faqs`: Frage/Antwort-Paare im selben Eintrag belassen (gut für Kurzantworten)

## 4) Cross-Referenzen
- `see_also`: Array von IDs (optional)
- `synonyms`: Array alternativer Begriffe (optional)
- Im Text statt verlinken: "(siehe …)" verwenden

## 5) Sprachstil
- Hochdeutsch (Schweizer Kontext), **ss** statt **ß**
- Neutral, präzise, keine Scherze/Seitenhiebe

## 6) Grössen- und Index-Limits (Stand 2025)
- Bis **20 Dateien** pro GPT
- **512 MB** pro Datei
- Ca. **~2 Mio Tokens** pro Datei indexierbar (Text darüber wird ignoriert)
- Aktuelle Datei: **~520 KB** → perfekt

## 7) Schnellcheck (CLI)
```bash
# Anzahl Keys (bei Objektstruktur)
jq 'keys | length' jasswiki-knowledge-base.json

# Beispiel-Feldliste für einen Eintrag
jq '.abheben | keys' jasswiki-knowledge-base.json

# Beispiel-Text prüfen
jq -r '.abheben.text' jasswiki-knowledge-base.json | head -n 20
```

## 8) Optionale Mini-Validierung (Python)
```python
import json
with open('jasswiki-knowledge-base.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print('Geladen ✓')
```

## 9) Versionierung
```bash
mkdir -p chatgpt-gpt/backups
cp jasswiki-knowledge-base.json chatgpt-gpt/backups/jasswiki-knowledge-base-$(date +%Y%m%d).json
```

## 10) Upload-Ready Check
- [ ] JSON valid & UTF-8
- [ ] Keine relativen Links/HTML
- [ ] Kurzdefinition je Eintrag vorhanden
- [ ] Synonyme im Lead genannt
- [ ] FAQs im selben Eintrag
- [ ] Dateiname: `jasswiki-knowledge-base.json`

# Knowledge-Base Vorbereitungsplan

## 📊 Status Quo

**Aktuelle Situation:**
- ✅ `src/data/jass-content-v2.json` existiert (244 Artikel, 520 KB)
- ✅ Struktur: Key-Value-Objekt (jeder Artikel hat ID als Key)
- ⚠️ Enthält ~229 relative Markdown-Links: `[Text](/path/)` im Text-Feld
- ✅ Enthält bereits FAQs, Keywords, Metadaten
- ❓ `src/data/knowledgebase_agent5.json` existiert (andere Struktur, vermutlich alt)

**Ziel:**
- Erstellen von `chatgpt-gpt/jasswiki-knowledge-base.json` für GPT-Upload
- Hygiene anwenden (relative Links umschreiben)

---

## 🎯 Entscheidung: Minimal vs. Maximal

### **Option A: Minimal (EMPFOHLEN für MVP)**

**Was gemacht wird:**
1. ✅ `jass-content-v2.json` 1:1 kopieren → `jasswiki-knowledge-base.json`
2. ✅ Backup erstellen
3. ✅ Validierung (JSON valid, Größe OK)

**Was NICHT gemacht wird:**
- ❌ Relative Links umschreiben (GPT kann Markdown verstehen!)
- ❌ Struktur ändern (Key-Value ist OK)
- ❌ Synonyme im Lead ergänzen (Keywords reichen)

**Vorteil:**
- ⏱️ **5 Minuten Arbeit**
- ✅ Sofort einsatzbereit
- ✅ GPT versteht Markdown-Links (testen Sie erstmal!)

**Nachteil:**
- ⚠️ Theoretisch könnte Retrieval leicht besser sein (aber wahrscheinlich irrelevant)

---

### **Option B: Maximal (Hygiene komplett)**

**Was gemacht wird:**
1. ✅ Backup erstellen
2. ✅ Relative Links umschreiben: `[Text](/path/)` → `Text (siehe Begriff "XYZ")`
3. ✅ Optional: Synonyme im ersten Satz ergänzen (z.B. "Abheben (Ablupfen) bedeutet...")
4. ✅ Optional: Kurzdefinition (1 Satz) am Anfang jedes Artikels
5. ✅ Validierung

**Vorteil:**
- ✅ Maximale Retrieval-Präzision
- ✅ Keine Markdown-Links (nur Klartext)
- ✅ Synonyme explizit im Text (nicht nur in Keywords)

**Nachteil:**
- ⏱️ **2-4 Stunden Arbeit** (229 Links manuell/scripted umschreiben)
- ⚠️ Risiko: Fehler beim Umschreiben
- ⚠️ Frage: Lohnen sich die 2-4h für vermutlich marginale Verbesserung?

---

## 💡 **Meine Empfehlung: Option A (Minimal)**

**Warum?**
1. **GPT versteht Markdown:** Custom GPTs können Markdown-Links interpretieren
2. **Zeit sparen:** 5 Min vs. 4 Stunden
3. **Testen zuerst:** Uploaden, testen – wenn Retrieval schlecht ist, dann optimieren
4. **YAGNI-Prinzip:** "You Ain't Gonna Need It" – optimieren nur wenn nötig

**Wenn Retrieval später schlecht ist:**
→ Dann Option B (Hygiene) anwenden als Optimierung

---

## 📝 Schritt-für-Schritt: Option A (Minimal)

### **Schritt 1: Backup erstellen**

```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
mkdir -p chatgpt-gpt/backups
cp src/data/jass-content-v2.json chatgpt-gpt/backups/jass-content-v2-$(date +%Y%m%d-%H%M%S).json
echo "✅ Backup erstellt"
```

### **Schritt 2: Knowledge File kopieren**

```bash
cp src/data/jass-content-v2.json chatgpt-gpt/jasswiki-knowledge-base.json
echo "✅ Knowledge File erstellt"
```

### **Schritt 3: Validierung**

```bash
# JSON valid?
jq '.' chatgpt-gpt/jasswiki-knowledge-base.json > /dev/null && echo "✅ JSON valid" || echo "❌ JSON invalid"

# Größe checken
ls -lh chatgpt-gpt/jasswiki-knowledge-base.json

# Anzahl Artikel
jq 'keys | length' chatgpt-gpt/jasswiki-knowledge-base.json
# Erwartet: 244

# Beispiel-Artikel prüfen
jq '.abheben.text' chatgpt-gpt/jasswiki-knowledge-base.json | head -n 5
```

**Erwartete Ergebnisse:**
- ✅ JSON: Valid
- ✅ Größe: ~520 KB
- ✅ Artikel: 244

### **Schritt 4: Optional – Schnelltest im GPT Builder**

1. GPT Builder öffnen
2. Knowledge File hochladen: `jasswiki-knowledge-base.json`
3. Testfrage: "Was ist Abheben?"
4. Prüfen: Findet GPT den Artikel trotz Markdown-Links?

**Falls ja:** ✅ Fertig! Option A reicht.

**Falls nein:** → Option B (Hygiene) anwenden.

---

## 📝 Schritt-für-Schritt: Option B (Maximal – nur wenn nötig)

### **Schritt 1-2: Wie Option A** (Backup + Kopieren)

### **Schritt 3: Relative Links umschreiben (Script)**

**Herausforderung:** 229 Links müssen umgeschrieben werden.

**Option 3a: Manuell (zu aufwendig)**
❌ Nicht empfohlen – 229 Links = Stunden

**Option 3b: Python-Script (empfohlen)**

```python
#!/usr/bin/env python3
"""
Wandelt relative Markdown-Links um:
[Text](/path/to/thing/) → Text (siehe Begriff "Thing")
"""

import json
import re
from pathlib import Path

def clean_link(match):
    """Wandelt [Text](/path/) in Klartext um."""
    text = match.group(1)
    path = match.group(2)
    
    # Extrahiere Begriff aus Path (letzter Teil)
    # z.B. /begriffe/grundbegriffe/stich/ → "Stich"
    parts = path.rstrip('/').split('/')
    term = parts[-1] if parts else text
    
    # Normalisiere: snake_case → Title Case
    term = term.replace('_', ' ').replace('-', ' ').title()
    
    # Wenn Text == Begriff, nur "Text"
    if text.lower() == term.lower():
        return text
    else:
        return f'{text} (siehe Begriff "{term}")'

def process_json_file(input_file, output_file):
    """Verarbeitet JSON und schreibt bereinigte Version."""
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Pattern: [Text](/path/)
    link_pattern = re.compile(r'\[([^\]]+)\]\((/[^)]+)\)')
    
    processed = 0
    for article_id, article in data.items():
        if 'text' in article:
            original = article['text']
            cleaned = link_pattern.sub(clean_link, original)
            if cleaned != original:
                article['text'] = cleaned
                processed += 1
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ {processed} Artikel bereinigt")
    print(f"✅ Gespeichert: {output_file}")

if __name__ == '__main__':
    input_file = Path('chatgpt-gpt/jasswiki-knowledge-base.json')
    output_file = Path('chatgpt-gpt/jasswiki-knowledge-base-cleaned.json')
    
    process_json_file(input_file, output_file)
```

**Verwendung:**
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
python3 chatgpt-gpt/clean-links.py
# Erstellt: jasswiki-knowledge-base-cleaned.json

# Testen
jq '.abheben.text' chatgpt-gpt/jasswiki-knowledge-base-cleaned.json
# Sollte keine Markdown-Links mehr enthalten
```

**Option 3c: Regex mit jq (schnell, aber riskant)**

```bash
# VORSICHT: Kann Fehler machen!
# Besser: Python-Script verwenden
```

### **Schritt 4: Synonyme im Lead ergänzen (optional)**

**Was:** Im ersten Satz jedes Artikels Synonyme nennen.

**Beispiel:**
```
Vorher:
"Definition:\nDer Spieler rechts vom Kartengeber kann die Karten teilen..."

Nachher:
"Definition:\nAbheben (Ablupfen) bedeutet, dass der Spieler rechts vom Kartengeber die Karten teilen..."
```

**Aufwand:** Mittel (manuell für relevante Artikel) oder Script (automatisch aus Keywords).

**Empfehlung:** Nur für Top-10 wichtigste Artikel (Schieber, Trumpf, Weis, Stich, etc.)

### **Schritt 5: Kurzdefinition am Anfang (optional)**

**Was:** 1-Satz-Zusammenfassung im ersten Satz.

**Beispiel:**
```
Vorher:
"Definition:\nAbheben (Ablupfen) bedeutet..."

Nachher:
"Abheben (Ablupfen) ist das Teilen der Karten vor dem Verteilen. Definition:\nDer Spieler rechts..."
```

**Aufwand:** Hoch (244 Artikel)

**Empfehlung:** Nur wenn Retrieval wirklich schlecht ist

### **Schritt 6: Validierung (wie Option A)**

---

## 🚀 Nächster Schritt (KONKRET)

**Sofort ausführen:**

```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki

# 1. Backup
mkdir -p chatgpt-gpt/backups
cp src/data/jass-content-v2.json chatgpt-gpt/backups/jass-content-v2-$(date +%Y%m%d).json

# 2. Knowledge File erstellen
cp src/data/jass-content-v2.json chatgpt-gpt/jasswiki-knowledge-base.json

# 3. Validierung
echo "📊 Validierung:"
jq '.' chatgpt-gpt/jasswiki-knowledge-base.json > /dev/null && echo "✅ JSON valid" || echo "❌ JSON invalid"
echo "📦 Größe: $(ls -lh chatgpt-gpt/jasswiki-knowledge-base.json | awk '{print $5}')"
echo "📚 Artikel: $(jq 'keys | length' chatgpt-gpt/jasswiki-knowledge-base.json)"

echo ""
echo "✅ Fertig! Datei bereit für GPT-Upload:"
echo "   chatgpt-gpt/jasswiki-knowledge-base.json"
```

**Zeitaufwand:** 2 Minuten

---

## ❓ Entscheidungshilfe

**Wählen Sie Option A, wenn:**
- ✅ Sie schnell starten wollen
- ✅ Sie erstmal testen möchten
- ✅ Sie später optimieren können

**Wählen Sie Option B, wenn:**
- ✅ Sie maximale Präzision wollen
- ✅ Sie Zeit haben (2-4h)
- ✅ Retrieval-Tests bereits zeigen, dass Links Probleme machen

---

## 🎯 Meine finale Empfehlung

**JETZT: Option A (Minimal)**
- ⏱️ 5 Minuten
- ✅ Sofort GPT-Upload & Testing

**NACH Beta-Testing:**
- Falls Retrieval schlecht → Option B (Hygiene)
- Falls Retrieval gut → Fertig! 🎉

---

## 📂 Datei-Übersicht

| Datei | Zweck | Status |
|-------|-------|--------|
| `src/data/jass-content-v2.json` | Original (unberührt) | ✅ Bleibt |
| `chatgpt-gpt/jasswiki-knowledge-base.json` | Für GPT-Upload | ✅ Erstellen (Option A) |
| `chatgpt-gpt/jasswiki-knowledge-base-cleaned.json` | Mit Hygiene | ⏳ Nur bei Option B |
| `chatgpt-gpt/backups/jass-content-v2-YYYYMMDD.json` | Backup | ✅ Erstellen |

---

**Bereit zum Ausführen?** → Option A (Minimal) ist mein klarer Vorschlag! 🚀


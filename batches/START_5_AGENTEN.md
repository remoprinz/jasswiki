# 🚀 START: 5 parallele Agenten für Bulletpoint-Optimierung

## 📋 Übersicht

**Total Artikel:** 243
**Parallele Agenten:** 5
**Aufteilung:**
- Agent 1: 24 Artikel (Weis-Regeln + Ausmachen/Schreiben/Spielende)
- Agent 2: 46 Artikel (Regeln: Kartenwerte, Kartenverteilung, etc.)
- Agent 3: 44 Artikel (Varianten)
- Agent 4: 58 Artikel (Begriffe: Grundbegriffe, Karten, Punkte)
- Agent 5: 70 Artikel (Begriffe: Aktionen + Taktiken + Geschichte + Apps)

---

## 🎯 Start-Anleitung

### Schritt 1: 5 separate Chat-Sessions öffnen

Öffnen Sie 5 separate Cursor/Claude Sessions.

### Schritt 2: Agenten starten

Kopieren Sie in jede Session den entsprechenden Prompt:

#### **AGENT 1**
```
(Kopieren Sie den Inhalt von START_PROMPT_BULLETPOINT_AGENT1.txt)
```

#### **AGENT 2**
```
(Kopieren Sie den Inhalt von START_PROMPT_BULLETPOINT_AGENT2.txt)
```

#### **AGENT 3**
```
(Kopieren Sie den Inhalt von START_PROMPT_BULLETPOINT_AGENT3.txt)
```

#### **AGENT 4**
```
(Kopieren Sie den Inhalt von START_PROMPT_BULLETPOINT_AGENT4.txt)
```

#### **AGENT 5**
```
(Kopieren Sie den Inhalt von START_PROMPT_BULLETPOINT_AGENT5.txt)
```

---

## 📁 Expected Output-Files

Nach Abschluss sollten folgende Dateien vorliegen:

1. `batches/BULLETPOINT_OPT_AGENT1.md` (24 Artikel)
2. `batches/BULLETPOINT_OPT_AGENT2.md` (46 Artikel)
3. `batches/BULLETPOINT_OPT_AGENT3.md` (44 Artikel)
4. `batches/BULLETPOINT_OPT_AGENT4.md` (58 Artikel)
5. `batches/BULLETPOINT_OPT_AGENT5.md` (70 Artikel)

---

## ⚠️ Unklare Artikel

Jeder Agent wird unklare Artikel flaggen mit:
```
**Inhaltlich:** ⚠️ UNKLAR (Grund: ...)
```

Diese werden nach Abschluss aller Agenten zusammengefasst und manuell geprüft.

---

## 🔄 Nach Abschluss

1. **Alle 5 Output-Files prüfen**
2. **Unklare Artikel sammeln** und manuell prüfen
3. **Transfer-Script ausführen** (überträgt alle optimierten Artikel zu `jass-content-v2.json`)
4. **Build & Deploy**

---

## ✅ Bereit zum Start!

Starten Sie jetzt alle 5 Agenten parallel.


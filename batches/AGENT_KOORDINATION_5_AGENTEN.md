# 🤖 KOORDINATION: 5 Agenten für Bulletpoint-Optimierung

## 📋 Übersicht

**Total:** 243 Artikel
**Agenten:** 5 parallele Agenten
**Aufteilung:** ~48 Artikel pro Agent

---

## Agent-Aufteilung

### Agent 1: Weis-Regeln + Regeln (Ausmachen, Schreiben, Spielende)
- **Artikel:** ~26
- **Fokus:** Weis-spezifische Regeln und Spielende-Regeln
- **Output:** `BULLETPOINT_OPT_AGENT1.md`

### Agent 2: Regeln (Kartenwerte, Kartenverteilung, Punktezählung, Spielablauf)
- **Artikel:** ~33
- **Fokus:** Grundlegende Spielregeln
- **Output:** `BULLETPOINT_OPT_AGENT2.md`

### Agent 3: Varianten
- **Artikel:** ~44
- **Fokus:** Alle Jass-Varianten
- **Output:** `BULLETPOINT_OPT_AGENT3.md`

### Agent 4: Begriffe (Teil 1)
- **Artikel:** ~57
- **Fokus:** Grundbegriffe, Kartenbezeichnungen, Punktebegriffe
- **Output:** `BULLETPOINT_OPT_AGENT4.md`

### Agent 5: Begriffe (Teil 2) + Taktiken + Geschichte + Grundlagen + Apps + Referenzen
- **Artikel:** ~83
- **Fokus:** Spielaktionen, Taktiken, Historie, Apps
- **Output:** `BULLETPOINT_OPT_AGENT5.md`

---

## Workflow

1. **User startet 5 Agenten parallel** mit den START_PROMPT Dateien
2. **Agenten arbeiten unabhängig** an ihren Artikeln
3. **Output:** 5 Markdown-Dateien mit optimierten Artikeln
4. **Transfer:** Script transferiert alle optimierten Artikel zu `jass-content-v2.json`
5. **Review:** User prüft unklare Artikel

---

## Prompts

- `START_PROMPT_BULLETPOINT_AGENT1.txt`
- `START_PROMPT_BULLETPOINT_AGENT2.txt`
- `START_PROMPT_BULLETPOINT_AGENT3.txt`
- `START_PROMPT_BULLETPOINT_AGENT4.txt`
- `START_PROMPT_BULLETPOINT_AGENT5.txt`

---

**Status:** Prompts werden erstellt...


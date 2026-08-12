# ✅ JassWiki Agentic Web - Implementierungs-Checkliste

## Dateien-Übersicht
```
jasswiki/agentic/
├── llms.txt                              → Root hochladen
├── robots.txt                            → Root hochladen  
├── sitemap.xml                           → Root hochladen (ersetzt bestehende)
├── structured-data-jasswiki.html         → Code im <head> einbetten
├── generate_jass_llms.js                 → Zum späteren Update
└── ANLEITUNG_FUER_REMO.md               → Dokumentation
```

---

## 🎯 Implementierung in 4 Schritten

### Schritt 1: Dateien hochladen (Root-Verzeichnis)
**Wohin:** `public_html/` oder Root von jasswiki.ch

- [ ] `llms.txt` → muss erreichbar sein unter `https://jasswiki.ch/llms.txt`
- [ ] `robots.txt` → ersetzt bestehende oder neue Datei unter `https://jasswiki.ch/robots.txt`
- [ ] `sitemap.xml` → ersetzt bestehende unter `https://jasswiki.ch/sitemap.xml`

**FTP/SSH Beispiel:**
```bash
scp llms.txt user@server:/pfad/zu/jasswiki/public_html/
scp robots.txt user@server:/pfad/zu/jasswiki/public_html/
scp sitemap.xml user@server:/pfad/zu/jasswiki/public_html/
```

### Schritt 2: JSON-LD im HTML-Head einbetten
**Datei:** `structured-data-jasswiki.html`

**Was tun:**
1. Öffne die Datei
2. Kopiere **NUR** den `<script type="application/ld+json">...</script>` Block
3. Füge ihn im `<head>` deiner Website ein (z.B. in der Template-Datei)
4. Der Block sollte vor dem `</head>` Tag stehen

**Wichtig:** Nicht als .html File hochladen, sondern Code einbetten!

### Schritt 3: Footer "Über uns" ergänzen
**Minimale Variante (1-2 Zeilen):**

```html
<p>Betrieben von <a href="https://www.linkedin.com/in/remoprinz/">Remo Prinz</a> 
(<a href="https://jassguru.ch">JassGuru.ch</a>) und 
<a href="https://trumpf-as.ch">Fabian Cadonau</a> (Trumpf-As.ch) | 
Anerkannt als <a href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html">Lebendige Tradition</a> (BAK)</p>
```

### Schritt 4: Testen
- [ ] `https://jasswiki.ch/llms.txt` öffnet sich
- [ ] `https://jasswiki.ch/robots.txt` zeigt neuen Inhalt
- [ ] `https://jasswiki.ch/sitemap.xml` enthält llms.txt Eintrag
- [ ] JSON-LD validieren: https://validator.schema.org

---

## ❓ FAQ

**Q: Muss ich die Sitemap manuell bei Google einreichen?**
A: Nein. Die neue `sitemap.xml` wird beim nächsten Crawl automatisch erkannt. Optional kannst du in der Google Search Console auf "Sitemap erneut abrufen" klicken.

**Q: Was ist mit der bestehenden sitemap.xml?**
A: Die neue ersetzt sie. Sie enthält ALLE bisherigen Einträge + den neuen `/llms.txt` Eintrag (Zeile 9-14).

**Q: Wo genau muss das JSON-LD hin?**
A: Irgendwo zwischen `<head>` und `</head>` im HTML deiner Seiten. Am besten im Template/Layout, sodass es auf allen Seiten vorhanden ist.

**Q: Muss ich später die llms.txt aktualisieren?**
A: Ja, wenn du neue Begriffe hinzufügst. Einfach im `agentic/` Ordner `node generate_jass_llms.js` ausführen und die neue `llms.txt` hochladen.

---

## 🚀 Nach der Implementierung

**Nach 24-48 Stunden:**
- [ ] Teste ChatGPT: "Was ist JassWiki.ch?"
- [ ] Teste Perplexity: "Schweizer Jass Regeln Schieber"
- [ ] Google Search Console: Prüfe ob `llms.txt` indexiert wurde

**Erfolg messen:**
- KIs sollten JassWiki als Quelle nennen
- Schema.org Validator zeigt keine Fehler
- `llms.txt` taucht in Google Search Console auf

---

## 📞 Bei Problemen

**llms.txt lädt nicht:**
- Prüfe Dateirechte (chmod 644)
- Prüfe ob `.txt` Dateien vom Server erlaubt sind

**JSON-LD Fehler:**
- Validiere auf https://validator.schema.org
- Achte auf korrekte JSON-Syntax (Kommas, Anführungszeichen)

**robots.txt überschreibt nichts:**
- Mache Backup der alten `robots.txt` vor dem Ersetzen
- Neue Datei ist kompatibel mit allen bestehenden Regeln

---

Viel Erfolg! 🎉

# JassWiki

**Die Schweizer Jass-Enzyklopädie** – Offizielle Dokumentation des Schweizer Nationalspiels.

🌐 **Live:** [jasswiki.ch](https://jasswiki.ch)

---

## Über JassWiki

JassWiki dokumentiert Jassen als vom [Bundesamt für Kultur (BAK)](https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html) anerkannte lebendige Tradition der Schweiz.

### Features

- 📖 **257 Artikel** zu Regeln, Begriffen, Varianten und Geschichte
- 🎯 **Offizielle Regeln** nach Schweizer Standard
- 🤖 **AI-ready** mit llms.txt und Schema.org JSON-LD
- 📱 **Responsive** für Desktop, Tablet und Mobile
- 🔍 **Volltext-Suche** über alle Inhalte

---

## Tech Stack

- **Framework:** Next.js 16 (Static Export)
- **Styling:** Tailwind CSS
- **Hosting:** Firebase Hosting
- **SEO:** JSON-LD Schema.org, llms.txt

---

## Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktion bauen
npm run build

# Deployen
firebase deploy --only hosting:jasswiki
```

---

## Struktur

```
jasswiki/
├── src/
│   ├── components/    # React Komponenten
│   ├── pages/         # Next.js Seiten
│   ├── data/          # Content (JSON)
│   └── styles/        # CSS
├── public/            # Statische Assets
└── firebase.json      # Hosting Config
```

---

## Autoren

- **Remo Prinz** – [JassGuru.ch](https://jassguru.ch)
- **Fabian Cadonau** – [Trumpf-As.ch](https://trumpf-as.ch)

---

## Lizenz

Der **Code** dieses Projekts steht unter der [MIT License](LICENSE).

Der **Inhalt** (Texte, Regeln, Definitionen) steht unter [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) – Namensnennung, Weitergabe unter gleichen Bedingungen.

---

## Links

- 🌐 [jasswiki.ch](https://jasswiki.ch)
- 📊 [JassGuru.ch](https://jassguru.ch)
- 🎪 [Trumpf-As.ch](https://trumpf-as.ch)
- 🏛️ [Lebendige Traditionen (BAK)](https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html)

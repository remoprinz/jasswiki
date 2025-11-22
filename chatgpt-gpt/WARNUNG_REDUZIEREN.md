# 🔕 Warnung bei jeder API-Anfrage reduzieren

## Problem

Bei jeder API-Anfrage erscheint eine Warnung:
> "Einige Daten werden an api.jasswiki.ch gesendet. Vergewissere dich, dass die Website vertrauenswürdig ist."

Der Nutzer muss jedes Mal "Bestätigen" klicken.

---

## ✅ Lösung: Privacy Policy URL in Action konfigurieren

### Schritt 1: ChatGPT Custom GPT öffnen

1. Gehe zu: **https://chat.openai.com/gpts/editor**
2. Wähle dein **JassWiki Custom GPT**
3. Tab **"Configure"** öffnen
4. Scrolle zu **"Actions"**
5. Öffne die **jasswikiQuery Action**

### Schritt 2: Privacy Policy URL hinzufügen

**Suche nach einem Feld:**
- **"Privacy Policy URL"** oder
- **"Datenschutzerklärung"** oder
- **"Verification"** oder ähnlich

**Falls vorhanden:**
- **URL eintragen:** `https://jasswiki.ch/datenschutz`
- **Speichern**

**Falls nicht vorhanden:**
- ChatGPT Custom GPT hat manchmal nicht direkt ein Privacy Policy Feld
- Alternative: In der Action-Beschreibung oder Instructions erwähnen

---

## ✅ Alternative Lösung: OpenAPI Schema erweitern

Falls die Action ein OpenAPI Schema verwendet, können wir es erweitern:

### Option A: `info.contact` (bereits vorhanden)

In `openapi-schema.yaml` ist bereits:
```yaml
info:
  contact:
    name: JassWiki Support
    url: https://jasswiki.ch
```

### Option B: `info.termsOfService` hinzufügen

Füge hinzu:
```yaml
info:
  termsOfService: https://jasswiki.ch/datenschutz
```

### Option C: `servers` mit `description` erweitern

```yaml
servers:
  - url: https://api.jasswiki.ch
    description: Production API (Custom Domain) - Datenschutz: https://jasswiki.ch/datenschutz
```

---

## ✅ Beste Lösung: Instructions erweitern

Füge in den **ChatGPT Custom GPT Instructions** hinzu:

```
PRIVACY & DATENSCHUTZ:
- Diese GPT nutzt die API api.jasswiki.ch
- Datenschutzerklärung: https://jasswiki.ch/datenschutz
- JassWiki erfasst keine personenbezogenen Daten
- Die API verarbeitet nur Suchanfragen ohne Speicherung
```

**Das hilft ChatGPT zu verstehen, dass die API vertrauenswürdig ist.**

---

## ✅ Domain-Verifizierung (Langfristig)

Falls OpenAI Domain-Verifizierung anbietet:
1. **Domain verifizieren:** `api.jasswiki.ch` bei OpenAI registrieren
2. **Verifizierungs-Code** in DNS einfügen
3. **Warten auf Verifizierung**

**Aktuell:** OpenAI bietet Domain-Verifizierung für Custom GPTs noch nicht direkt an, aber das könnte sich ändern.

---

## 🎯 Praktische Lösung (JETZT)

### Schritt 1: Instructions erweitern

In ChatGPT Custom GPT → Configure → Instructions, füge am Ende hinzu:

```
WICHTIG - PRIVACY & API-VERTRAUEN:
Die verwendete API (api.jasswiki.ch) ist vertrauenswürdig und erfasst keine personenbezogenen Daten.
Datenschutzerklärung: https://jasswiki.ch/datenschutz
Die API verarbeitet nur Suchanfragen temporär ohne Speicherung.
```

### Schritt 2: OpenAPI Schema erweitern

Falls du das OpenAPI Schema in der Action verwendest, füge `termsOfService` hinzu (siehe oben).

### Schritt 3: Testen

Nach den Änderungen:
1. **Speichern**
2. **Neue Chat-Session starten**
3. **Test-Frage stellen**
4. **Prüfen:** Erscheint die Warnung noch?

---

## 📊 Erwartetes Ergebnis

**Vorher:**
- Bei jeder Anfrage: Warnung → "Bestätigen" klicken

**Nachher:**
- Bei der ersten Anfrage: Warnung (normal)
- Bei weiteren Anfragen: **Weniger häufig** oder **gar nicht mehr**

**Hinweis:** Die Warnung kann nicht komplett entfernt werden, da es ein Sicherheitsfeature von ChatGPT ist. Aber mit Privacy Policy und vertrauenswürdigen Informationen wird sie deutlich reduziert.

---

## 🔍 Troubleshooting

### Problem: Warnung erscheint immer noch

**Lösung:**
1. **Chat-Session neu starten** (wichtig!)
2. **Browser-Cache leeren**
3. **Privacy Policy URL nochmal prüfen** (korrekt eingetragen?)
4. **Instructions nochmal prüfen** (korrekt gespeichert?)

### Problem: Kein Privacy Policy Feld vorhanden

**Lösung:**
- **Instructions-Methode verwenden** (siehe oben)
- **OpenAPI Schema erweitern** mit `termsOfService`
- **Warten** auf zukünftige ChatGPT-Updates

---

## ✅ Checkliste

- [ ] Datenschutz-Seite erstellt: ✅ `https://jasswiki.ch/datenschutz`
- [ ] Instructions erweitert (Privacy Info hinzugefügt)
- [ ] OpenAPI Schema erweitert (optional, `termsOfService`)
- [ ] Chat-Session neu gestartet
- [ ] Test-Frage gestellt
- [ ] Warnung reduziert? (Erste Anfrage noch Warnung, weitere nicht mehr)

---

**Viel Erfolg! 🚀**


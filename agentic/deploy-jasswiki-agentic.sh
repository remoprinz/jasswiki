#!/bin/bash

###############################################################################
# JassWiki "Agentic Web Nr. 1" - Automatisches Deployment Script
# 
# Dieses Script macht so viel wie möglich automatisch!
# Du musst nur noch:
# 1. FTP/SSH Credentials eingeben
# 2. Bestätigen
# 3. Fertig! 🚀
#
# Author: Remo Prinz & AI Assistant
# Datum: 26. Dezember 2025
###############################################################################

set -e  # Stop bei Fehler

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   🚀 JassWiki \"Agentic Web Nr. 1\" - Deployment             ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Arbeitsverzeichnis
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}📁 Arbeitsverzeichnis: ${SCRIPT_DIR}${NC}"
echo ""

###############################################################################
# SCHRITT 1: Validierung - Sind alle Dateien da?
###############################################################################

echo -e "${BLUE}🔍 Schritt 1/5: Validiere Dateien...${NC}"

REQUIRED_FILES=(
    "llms.txt"
    "robots.txt"
    "sitemap.xml"
    "structured-data-jasswiki.html"
    "ai-optimized-meta-tags.html"
)

MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -ne 0 ]; then
    echo -e "${RED}❌ Fehler: Folgende Dateien fehlen:${NC}"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    exit 1
fi

echo -e "${GREEN}✅ Alle Dateien vorhanden!${NC}"
echo ""

###############################################################################
# SCHRITT 2: Dateigrößen prüfen
###############################################################################

echo -e "${BLUE}📊 Schritt 2/5: Prüfe Dateigrößen...${NC}"

echo "   llms.txt:          $(du -h llms.txt | cut -f1)"
echo "   robots.txt:        $(du -h robots.txt | cut -f1)"
echo "   sitemap.xml:       $(du -h sitemap.xml | cut -f1)"
echo "   JSON-LD:           $(du -h structured-data-jasswiki.html | cut -f1)"
echo "   Meta-Tags:         $(du -h ai-optimized-meta-tags.html | cut -f1)"
echo ""

###############################################################################
# SCHRITT 3: Deployment-Methode wählen
###############################################################################

echo -e "${BLUE}📦 Schritt 3/5: Wähle Deployment-Methode${NC}"
echo ""
echo "Wie möchtest du deployen?"
echo ""
echo "   1) FTP Upload (FileZilla/Cyberduck kompatibel)"
echo "   2) SCP/SSH Upload"
echo "   3) rsync (empfohlen für Server mit SSH)"
echo "   4) Nur Dateien vorbereiten (manueller Upload)"
echo ""
read -p "Wähle (1-4): " DEPLOY_METHOD

case $DEPLOY_METHOD in
    1)
        echo -e "${YELLOW}📡 FTP Upload gewählt${NC}"
        echo ""
        read -p "FTP Host (z.B. ftp.jasswiki.ch): " FTP_HOST
        read -p "FTP User: " FTP_USER
        read -sp "FTP Passwort: " FTP_PASS
        echo ""
        read -p "Ziel-Pfad (z.B. /public_html/): " FTP_PATH
        
        # FTP Upload mit lftp (muss installiert sein)
        if ! command -v lftp &> /dev/null; then
            echo -e "${RED}❌ lftp ist nicht installiert!${NC}"
            echo "Installiere es mit:"
            echo "   macOS: brew install lftp"
            echo "   Linux: sudo apt-get install lftp"
            exit 1
        fi
        
        echo -e "${GREEN}📤 Uploade Dateien via FTP...${NC}"
        
        lftp -c "
        set ftp:ssl-allow no;
        open -u $FTP_USER,$FTP_PASS $FTP_HOST;
        cd $FTP_PATH;
        put llms.txt;
        put robots.txt;
        put sitemap.xml;
        bye;
        "
        
        echo -e "${GREEN}✅ FTP Upload abgeschlossen!${NC}"
        ;;
        
    2)
        echo -e "${YELLOW}🔐 SCP/SSH Upload gewählt${NC}"
        echo ""
        read -p "SSH Host (z.B. user@jasswiki.ch): " SSH_HOST
        read -p "Ziel-Pfad (z.B. /var/www/html/): " SSH_PATH
        
        echo -e "${GREEN}📤 Uploade Dateien via SCP...${NC}"
        
        scp llms.txt robots.txt sitemap.xml "$SSH_HOST:$SSH_PATH"
        
        echo -e "${GREEN}✅ SCP Upload abgeschlossen!${NC}"
        ;;
        
    3)
        echo -e "${YELLOW}⚡ rsync Upload gewählt (empfohlen!)${NC}"
        echo ""
        read -p "SSH Host (z.B. user@jasswiki.ch): " SSH_HOST
        read -p "Ziel-Pfad (z.B. /var/www/html/): " SSH_PATH
        
        echo -e "${GREEN}📤 Synchronisiere Dateien via rsync...${NC}"
        
        rsync -avz --progress \
            llms.txt \
            robots.txt \
            sitemap.xml \
            "$SSH_HOST:$SSH_PATH"
        
        echo -e "${GREEN}✅ rsync Sync abgeschlossen!${NC}"
        ;;
        
    4)
        echo -e "${YELLOW}📋 Bereite Dateien für manuellen Upload vor...${NC}"
        
        # Erstelle ein Upload-Verzeichnis
        UPLOAD_DIR="$SCRIPT_DIR/READY_TO_UPLOAD"
        mkdir -p "$UPLOAD_DIR"
        
        cp llms.txt "$UPLOAD_DIR/"
        cp robots.txt "$UPLOAD_DIR/"
        cp sitemap.xml "$UPLOAD_DIR/"
        
        echo -e "${GREEN}✅ Dateien bereit in: $UPLOAD_DIR${NC}"
        echo ""
        echo "Nächste Schritte:"
        echo "   1. Öffne deinen FTP-Client (FileZilla, Cyberduck, etc.)"
        echo "   2. Verbinde zu jasswiki.ch"
        echo "   3. Gehe ins Root-Verzeichnis (public_html/)"
        echo "   4. Uploade die 3 Dateien aus $UPLOAD_DIR"
        ;;
        
    *)
        echo -e "${RED}❌ Ungültige Auswahl${NC}"
        exit 1
        ;;
esac

echo ""

###############################################################################
# SCHRITT 4: Code-Snippets vorbereiten
###############################################################################

echo -e "${BLUE}📄 Schritt 4/5: Bereite Code-Snippets vor...${NC}"

# Erstelle eine Datei mit allen Code-Snippets
cat > CODE_SNIPPETS_ZUM_EINBETTEN.txt << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║  CODE-SNIPPETS ZUM EINBETTEN - JassWiki Agentic Upgrade     ║
╚══════════════════════════════════════════════════════════════╝

Diese Snippets musst du MANUELL in dein CMS/Template einfügen!

═══════════════════════════════════════════════════════════════
📍 1. JSON-LD SCHEMA (KRITISCH!)
═══════════════════════════════════════════════════════════════

WO: Im <head> Bereich JEDER Seite (z.B. header.php, layout.html)
WANN: VOR dem </head> Tag

KOPIERE DIESEN CODE:
═══════════════════════════════════════════════════════════════
EOF

# Füge das JSON-LD hinzu
cat structured-data-jasswiki.html >> CODE_SNIPPETS_ZUM_EINBETTEN.txt

cat >> CODE_SNIPPETS_ZUM_EINBETTEN.txt << 'EOF'

═══════════════════════════════════════════════════════════════
📍 2. AI-OPTIMIERTE META TAGS (WICHTIG!)
═══════════════════════════════════════════════════════════════

WO: Im <head> Bereich NACH dem JSON-LD
WANN: VOR dem </head> Tag

KOPIERE DIESEN CODE:
═══════════════════════════════════════════════════════════════
EOF

# Füge die Meta-Tags hinzu
cat ai-optimized-meta-tags.html >> CODE_SNIPPETS_ZUM_EINBETTEN.txt

cat >> CODE_SNIPPETS_ZUM_EINBETTEN.txt << 'EOF'

═══════════════════════════════════════════════════════════════
📍 3. BAK TRUST BADGE (OPTIONAL)
═══════════════════════════════════════════════════════════════

WO: Im Footer deiner Website
WANN: Für visuelles Vertrauen

WÄHLE EINE VARIANTE AUS bak-trust-badge.html
(Empfehlung: Variante 4 - Footer-Zeile)

═══════════════════════════════════════════════════════════════
✅ FERTIG!
═══════════════════════════════════════════════════════════════

Nach dem Einbetten TESTEN:
1. https://validator.schema.org (JSON-LD prüfen)
2. https://jasswiki.ch/llms.txt (muss sich öffnen)
3. https://jasswiki.ch/robots.txt (neuer Inhalt)

EOF

echo -e "${GREEN}✅ Code-Snippets vorbereitet!${NC}"
echo "   Datei: CODE_SNIPPETS_ZUM_EINBETTEN.txt"
echo ""

###############################################################################
# SCHRITT 5: Test & Validierung
###############################################################################

echo -e "${BLUE}🧪 Schritt 5/5: Vorbereitung auf Tests...${NC}"

cat > POST_DEPLOYMENT_TESTS.md << 'EOF'
# 🧪 Post-Deployment Tests

## Sofort nach Upload (0-5 Minuten)

### 1. Datei-Erreichbarkeit
- [ ] https://jasswiki.ch/llms.txt öffnet sich
- [ ] https://jasswiki.ch/robots.txt zeigt neuen Inhalt
- [ ] https://jasswiki.ch/sitemap.xml enthält llms.txt Eintrag (Zeile ~10)

### 2. Schema.org Validierung
- [ ] Gehe zu: https://validator.schema.org
- [ ] Gib ein: https://jasswiki.ch
- [ ] Keine Fehler, 5 Entities erkannt (Corporation, 2x Person, Website, GovernmentService)

### 3. Meta-Tags Check
- [ ] Rechtsklick auf jasswiki.ch → "Seitenquelltext anzeigen"
- [ ] Suche nach: `llms-optimization`
- [ ] Suche nach: `Bundesamt für Kultur`
- [ ] Beide vorhanden? ✅

## Nach 24 Stunden

### 4. Google Search Console
- [ ] Logge ein in: https://search.google.com/search-console
- [ ] Prüfe: "Sitemaps" → sitemap.xml wurde verarbeitet
- [ ] Prüfe: "Abdeckung" → llms.txt wurde indexiert

### 5. AI-Agent Test
- [ ] ChatGPT fragen: "Was ist JassWiki.ch?"
- [ ] Perplexity fragen: "Schweizer Jass Regeln"
- [ ] Wird JassWiki als Quelle genannt?

## Nach 7 Tagen

### 6. Ranking Check
- [ ] Google Suche: "Schweizer Jass Regeln" → JassWiki in Top 5?
- [ ] Google Suche: "Schieber Regeln" → JassWiki in Top 3?

### 7. AI-Zitate Monitoring
- [ ] ChatGPT: Wird JassWiki regelmäßig zitiert?
- [ ] Claude: Kennt die Plattform?
- [ ] Perplexity: Verlinkt auf JassWiki?

## Erfolg = Mindestens 80% der Tests bestanden! 🎉
EOF

echo -e "${GREEN}✅ Test-Checkliste erstellt!${NC}"
echo "   Datei: POST_DEPLOYMENT_TESTS.md"
echo ""

###############################################################################
# ZUSAMMENFASSUNG
###############################################################################

echo -e "${GREEN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   ✅ DEPLOYMENT VORBEREITET!                                ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo "Was wurde gemacht:"
echo ""
if [ "$DEPLOY_METHOD" != "4" ]; then
    echo "   ✅ llms.txt hochgeladen"
    echo "   ✅ robots.txt hochgeladen"
    echo "   ✅ sitemap.xml hochgeladen"
else
    echo "   ✅ Dateien bereit in: READY_TO_UPLOAD/"
fi
echo "   ✅ Code-Snippets vorbereitet: CODE_SNIPPETS_ZUM_EINBETTEN.txt"
echo "   ✅ Test-Checkliste erstellt: POST_DEPLOYMENT_TESTS.md"
echo ""

echo -e "${YELLOW}📋 Nächste Schritte (MANUELL):${NC}"
echo ""
echo "   1. Öffne: CODE_SNIPPETS_ZUM_EINBETTEN.txt"
echo "   2. Kopiere JSON-LD in den <head> deiner Website"
echo "   3. Kopiere Meta-Tags NACH dem JSON-LD"
echo "   4. Optional: Füge BAK Trust Badge im Footer hinzu"
echo "   5. Führe Tests aus: POST_DEPLOYMENT_TESTS.md"
echo ""

echo -e "${BLUE}🎯 Ziel: JassWiki = #1 Agentic Quelle für Jass!${NC}"
echo ""
echo -e "${GREEN}Viel Erfolg! 🚀${NC}"
echo ""

# Öffne die wichtigsten Dateien
if command -v open &> /dev/null; then
    echo "Öffne Dateien..."
    open CODE_SNIPPETS_ZUM_EINBETTEN.txt
    open POST_DEPLOYMENT_TESTS.md
fi

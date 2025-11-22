#!/bin/bash
# JassWiki RAG Quick-Start Script
# Führt alle Setup-Schritte automatisch aus

set -e  # Exit on error

echo "=========================================="
echo "  JassWiki RAG Quick-Start"
echo "=========================================="
echo ""

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Prerequisites
echo "📋 Prüfe Prerequisites..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js nicht gefunden${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm nicht gefunden${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"
echo ""

# Check .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env nicht gefunden${NC}"
    echo "Erstelle .env von env.example und fülle die Werte aus:"
    echo "  - PINECONE_API_KEY"
    echo "  - GEMINI_API_KEY"
    exit 1
fi

echo -e "${GREEN}✅ .env gefunden${NC}"
echo ""

# Check ENV Variables
source .env

if [ -z "$PINECONE_API_KEY" ]; then
    echo -e "${RED}❌ PINECONE_API_KEY nicht gesetzt${NC}"
    exit 1
fi

if [ -z "$GEMINI_API_KEY" ]; then
    echo -e "${RED}❌ GEMINI_API_KEY nicht gesetzt${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment Variables gesetzt${NC}"
echo ""

# Install Dependencies
echo "📦 Installiere Dependencies..."
npm install --silent
echo -e "${GREEN}✅ Root Dependencies installiert${NC}"

cd functions
npm install --silent
cd ..
echo -e "${GREEN}✅ Functions Dependencies installiert${NC}"
echo ""

# Setup Pinecone Index
echo "🔧 Erstelle Pinecone Index..."
npm run rag:setup
echo ""

# Ingest Data
echo "📊 Ingestiere JSONL-Daten..."
npm run rag:ingest
echo ""

# Run Tests
echo "🧪 Führe Tests durch..."
npm run rag:test
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}✅ SETUP ABGESCHLOSSEN!${NC}"
echo "=========================================="
echo ""
echo "Nächste Schritte:"
echo "  1. Firebase Functions deployen:"
echo "     cd functions && npm run deploy"
echo "  2. ChatGPT Action konfigurieren:"
echo "     siehe DEPLOYMENT_CHECKLIST.md"
echo "  3. E2E-Tests mit GPT durchführen"
echo ""
echo "Dokumentation: RAG_SETUP.md"
echo ""


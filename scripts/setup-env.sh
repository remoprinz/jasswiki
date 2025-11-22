#!/bin/bash
# Setup .env Datei von jassguruchat Keys

set -e

JASSGURUCHAT_DIR="/Users/remoprinz/Documents/Jassguru/jassguruchat"
JASSWIKI_DIR="/Users/remoprinz/Documents/Jassguru/jasswiki"
ENV_FILE="$JASSWIKI_DIR/.env"

echo "🔧 Erstelle .env Datei für jasswiki..."

# Prüfe ob jassguruchat .env existiert
if [ ! -f "$JASSGURUCHAT_DIR/.env" ]; then
    echo "❌ $JASSGURUCHAT_DIR/.env nicht gefunden!"
    exit 1
fi

# Lade Keys aus jassguruchat
PINECONE_KEY=$(grep "PINECONE_API_KEY=" "$JASSGURUCHAT_DIR/.env" | cut -d '=' -f2 | tr -d '"' | tr -d "'")
GEMINI_KEY=$(grep -E "VITE_GEMINI_API_KEY|GEMINI_API_KEY=" "$JASSGURUCHAT_DIR/.env" | head -1 | cut -d '=' -f2 | tr -d '"' | tr -d "'")

if [ -z "$PINECONE_KEY" ] || [ -z "$GEMINI_KEY" ]; then
    echo "❌ Keys nicht gefunden in jassguruchat/.env"
    exit 1
fi

# Erstelle .env für jasswiki
cat > "$ENV_FILE" <<EOF
# JassWiki RAG Environment Variables
# Automatisch erstellt von setup-env.sh
# Keys von jassguruchat übernommen

# ============================================================================
# PINECONE
# ============================================================================
PINECONE_API_KEY=$PINECONE_KEY

# ============================================================================
# GOOGLE GEMINI
# ============================================================================
GEMINI_API_KEY=$GEMINI_KEY
# Alternativ (falls Frontend):
VITE_GEMINI_API_KEY=$GEMINI_KEY

# ============================================================================
# FIREBASE (für Deployment)
# ============================================================================
FIREBASE_PROJECT_ID=jasswiki

# ============================================================================
# OPTIONAL
# ============================================================================
BASE_URL=https://jasswiki.ch
EOF

echo "✅ .env Datei erstellt: $ENV_FILE"
echo ""
echo "Enthaltene Keys:"
echo "  - PINECONE_API_KEY: ${PINECONE_KEY:0:20}..."
echo "  - GEMINI_API_KEY: ${GEMINI_KEY:0:20}..."
echo ""
echo "🚀 Nächster Schritt: npm run rag:setup"


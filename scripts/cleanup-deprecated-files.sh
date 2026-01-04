#!/bin/bash
# ============================================================================
# CLEANUP DEPRECATED FILES
# ============================================================================
# Verschiebt veraltete Dateien in _deprecated/ Ordner
# Autor: Claude (Cursor Agent)
# Datum: 2025-01-01
# ============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DEPRECATED_DIR="$PROJECT_ROOT/_deprecated"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🧹 JASSWIKI CLEANUP SCRIPT"
echo "=========================="
echo ""

# Erstelle _deprecated Ordner
mkdir -p "$DEPRECATED_DIR/chatgpt-gpt"
mkdir -p "$DEPRECATED_DIR/src-data"
mkdir -p "$DEPRECATED_DIR/scripts"

echo "📁 Zielordner: $DEPRECATED_DIR"
echo ""

# ============================================================================
# 1. chatgpt-gpt/ Ordner aufräumen
# ============================================================================
echo "📦 Phase 1: chatgpt-gpt/ Ordner..."

CHATGPT_DIR="$PROJECT_ROOT/chatgpt-gpt"

# Backup-Dateien
for f in "$CHATGPT_DIR"/jasswiki-articles.jsonl.backup-*; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/chatgpt-gpt/" && echo "   ✓ $(basename "$f")"
done

for f in "$CHATGPT_DIR"/jasswiki-articles-backup-*.jsonl; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/chatgpt-gpt/" && echo "   ✓ $(basename "$f")"
done

for f in "$CHATGPT_DIR"/jasswiki-faqs.jsonl.backup-*; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/chatgpt-gpt/" && echo "   ✓ $(basename "$f")"
done

# Veraltete Formate
[ -f "$CHATGPT_DIR/jasswiki-articles.refactored.jsonl" ] && \
  mv "$CHATGPT_DIR/jasswiki-articles.refactored.jsonl" "$DEPRECATED_DIR/chatgpt-gpt/" && \
  echo "   ✓ jasswiki-articles.refactored.jsonl"

[ -f "$CHATGPT_DIR/jasswiki-faqs.refactored.jsonl" ] && \
  mv "$CHATGPT_DIR/jasswiki-faqs.refactored.jsonl" "$DEPRECATED_DIR/chatgpt-gpt/" && \
  echo "   ✓ jasswiki-faqs.refactored.jsonl"

[ -f "$CHATGPT_DIR/jasswiki-faqs.ndjson" ] && \
  mv "$CHATGPT_DIR/jasswiki-faqs.ndjson" "$DEPRECATED_DIR/chatgpt-gpt/" && \
  echo "   ✓ jasswiki-faqs.ndjson"

# Alte Knowledge-Base Formate (vor JSONL)
[ -f "$CHATGPT_DIR/jasswiki-knowledge-base.json" ] && \
  mv "$CHATGPT_DIR/jasswiki-knowledge-base.json" "$DEPRECATED_DIR/chatgpt-gpt/" && \
  echo "   ✓ jasswiki-knowledge-base.json"

[ -f "$CHATGPT_DIR/jasswiki-knowledge-base-cleaned.json" ] && \
  mv "$CHATGPT_DIR/jasswiki-knowledge-base-cleaned.json" "$DEPRECATED_DIR/chatgpt-gpt/" && \
  echo "   ✓ jasswiki-knowledge-base-cleaned.json"

# Duplikat: .ndjson wenn .jsonl existiert
if [ -f "$CHATGPT_DIR/jasswiki-articles.jsonl" ] && [ -f "$CHATGPT_DIR/jasswiki-articles.ndjson" ]; then
  mv "$CHATGPT_DIR/jasswiki-articles.ndjson" "$DEPRECATED_DIR/chatgpt-gpt/"
  echo "   ✓ jasswiki-articles.ndjson (Duplikat)"
fi

# ============================================================================
# 2. src/data/ Ordner aufräumen (Backups)
# ============================================================================
echo ""
echo "📦 Phase 2: src/data/ Ordner..."

DATA_DIR="$PROJECT_ROOT/src/data"

for f in "$DATA_DIR"/jass-content-v2-backup-*.json; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/src-data/" && echo "   ✓ $(basename "$f")"
done

for f in "$DATA_DIR"/jass-content-v2.backup-*.json; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/src-data/" && echo "   ✓ $(basename "$f")"
done

for f in "$DATA_DIR"/jass-content-v2.json.backup-*; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/src-data/" && echo "   ✓ $(basename "$f")"
done

for f in "$DATA_DIR"/jass-content-v2.json-backup-*; do
  [ -e "$f" ] && mv "$f" "$DEPRECATED_DIR/src-data/" && echo "   ✓ $(basename "$f")"
done

# Alte Knowledgebase
[ -f "$DATA_DIR/knowledgebase_agent5.json" ] && \
  mv "$DATA_DIR/knowledgebase_agent5.json" "$DEPRECATED_DIR/src-data/" && \
  echo "   ✓ knowledgebase_agent5.json"

# ============================================================================
# 3. Root-Level aufräumen
# ============================================================================
echo ""
echo "📦 Phase 3: Root-Level..."

# Temporäres Vergleichsskript
[ -f "$PROJECT_ROOT/compare_content.py" ] && \
  rm "$PROJECT_ROOT/compare_content.py" && \
  echo "   ✓ compare_content.py (gelöscht - temporär)"

# ============================================================================
# 4. Zusammenfassung
# ============================================================================
echo ""
echo "=============================================="
echo "✅ CLEANUP ABGESCHLOSSEN"
echo "=============================================="
echo ""
echo "Veraltete Dateien wurden nach $DEPRECATED_DIR verschoben."
echo ""
echo "Falls Sie diese endgültig löschen möchten:"
echo "  rm -rf $DEPRECATED_DIR"
echo ""
echo "Aktuelle Dateien (BEHALTEN):"
echo "  src/data/jass-content-v2.json     (MASTER)"
echo "  chatgpt-gpt/jasswiki-articles.jsonl"
echo "  public/dataset/jasswiki-corpus.jsonl"
echo "  functions/src/data/jasswiki-articles.ndjson"
echo ""


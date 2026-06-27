#!/bin/bash
# Löscht macOS-iCloud-Drive-Sync-Konflikt-Duplikate (Pattern: "* 2/" und "* 2")
# Hintergrund: /Users/remoprinz/Documents/ wird via iCloud Drive synct;
# Build-Output (node_modules, .next, out) erzeugt Sync-Konflikte.
# Aufgerufen von "prebuild" in package.json.

set -e
cd "$(dirname "$0")"

found=0
# Top-Level duplicates
for path in *' 2' .*' 2' *' 2/' .*' 2/'; do
  if [ -e "$path" ]; then
    rm -rf "$path"
    echo "  🗑  Removed: $path"
    found=$((found+1))
  fi
done

# Nested duplicates inside out/ (häufigster Fall, blockiert Firebase-Deploy)
if [ -d "out" ]; then
  while IFS= read -r path; do
    [ -z "$path" ] && continue
    rm -rf "$path"
    echo "  🗑  Removed: $path"
    found=$((found+1))
  done < <(find out -name "* 2" -type d 2>/dev/null)
fi

if [ "$found" = "0" ]; then
  echo "  ✓ Keine iCloud-Duplikate gefunden."
else
  echo "  → $found Duplikat(e) entfernt."
fi

# Self-Heal: node_modules MUSS ein lebender Symlink auf node_modules.nosync sein
# (iCloud-Schutz). iCloud benennt den Symlink bei Sync-Konflikten zu "node_modules 2"
# um; die Dup-Bereinigung oben löscht ihn dann -> node_modules fehlt -> "next build"
# bricht mit "next: command not found" ab und JEDER Build/Deploy stirbt. Hier vor
# jedem Build wiederherstellen. Bedingung greift bei ALLEN kaputten Zuständen:
# fehlend, toter Symlink (zeigt ins Leere) und echtes Verzeichnis (npm-ci-Altlast).
# Ein lebender Symlink ([ -L ] UND [ -e ]) bleibt unangetastet.
if [ -d "node_modules.nosync" ] && ! { [ -L "node_modules" ] && [ -e "node_modules" ]; }; then
  rm -rf "node_modules"
  ln -s "node_modules.nosync" "node_modules"
  echo "  🔗 node_modules-Symlink wiederhergestellt (iCloud-Schutz)."
fi

# Karten-Master (iCloud-immun via .nosync) -> public/cards vor jedem Build frisch
# regenerieren. iCloud lagert die Binärbilder in public/cards aus (dataless) und
# erzeugt "* 2"-Sync-Dupes -> "next build" bricht beim copyfile ab, oder ein Deploy
# würde die Karten LIVE löschen. Lösung wie bei node_modules: Master in
# public/cards.nosync (von iCloud ignoriert), daraus jeden Build eine vollständige,
# materialisierte Kopie ziehen.
if [ -d "public/cards.nosync" ]; then
  rm -rf "public/cards"
  cp -R "public/cards.nosync" "public/cards"
  echo "  🃏 public/cards aus .nosync-Master regeneriert."
fi

# iCloud-"* 2"-Sync-Dupes auch innerhalb von public/ entfernen (nicht nur Top-Level/out/).
find public -name "* 2*" -exec rm -rf {} + 2>/dev/null || true

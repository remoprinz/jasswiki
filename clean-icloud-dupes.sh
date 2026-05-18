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

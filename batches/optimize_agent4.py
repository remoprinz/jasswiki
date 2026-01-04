#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script zur Optimierung der 58 Artikel für Agent 4
"""
import json
import re
from typing import List, Dict, Tuple

def load_articles() -> List[Dict]:
    """Lädt alle relevanten Artikel aus der JSON-Datei."""
    with open('src/data/jass-content-v2.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    articles = []
    for k, v in data.items():
        if isinstance(v, dict) and v.get('metadata', {}).get('category', {}).get('main') == 'Begriffe':
            sub = v.get('metadata', {}).get('category', {}).get('sub')
            if sub in ['Grundbegriffe', 'Kartenbezeichnungen', 'Punktebegriffe']:
                articles.append(v)
    
    return sorted(articles, key=lambda x: x['id'])

def fix_grammar(text: str) -> str:
    """Behebt häufige Grammatikfehler."""
    # "Vorhand ansagt" → "Vorhand sagt an:"
    text = re.sub(r'Vorhand ansagt\s+', 'Vorhand sagt an: ', text)
    text = re.sub(r'Nachhand ansagt\s+', 'Nachhand sagt an: ', text)
    # Weitere häufige Fehler können hier ergänzt werden
    return text

def merge_broken_sentences(lines: List[str]) -> List[str]:
    """Führt zerrissene Sätze zusammen."""
    merged = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            merged.append('')
            i += 1
            continue
        
        # Wenn Zeile mit "•" beginnt und mit Kleinbuchstabe, "Und", "Oder", "Falls", "Aber"
        if line.startswith('•'):
            next_idx = i + 1
            while next_idx < len(lines) and lines[next_idx].strip():
                next_line = lines[next_idx].strip()
                # Prüfe ob zusammengehört
                if (next_line.startswith('•') and 
                    (next_line[1:].lstrip()[0].islower() if len(next_line) > 1 and next_line[1:].lstrip() else False) or
                    any(next_line.startswith(f'• {w}') for w in ['Und ', 'Oder ', 'Falls ', 'Aber ', 'Wenn ', 'Wenn '])):
                    # Zusammenführen
                    line = line.rstrip('.')
                    next_content = next_line[1:].lstrip()
                    line += ' ' + next_content.lower() if next_content[0].islower() else ' ' + next_content
                    next_idx += 1
                else:
                    break
            merged.append(line)
            i = next_idx
        else:
            merged.append(line)
            i += 1
    
    return merged

def optimize_article(article: Dict) -> Tuple[str, List[str], str]:
    """
    Optimiert einen Artikel gemäß den Regeln.
    Returns: (optimized_text, changes, clarity_status)
    """
    original_text = article.get('text', '')
    changes = []
    
    # Split in Zeilen
    lines = original_text.split('\n')
    
    # Fix grammar
    optimized_text = fix_grammar(original_text)
    if optimized_text != original_text:
        changes.append("Grammatik korrigiert")
    
    # Weitere Optimierungen werden manuell durchgeführt
    # Dies ist eine Vorbereitung
    
    return optimized_text, changes, "✅ Klar"

if __name__ == '__main__':
    articles = load_articles()
    print(f"Geladene Artikel: {len(articles)}")
    
    # Test mit ersten 3 Artikeln
    for art in articles[:3]:
        opt, ch, cl = optimize_article(art)
        print(f"\n{art['id']}: {len(ch)} Änderungen")









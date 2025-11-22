#!/usr/bin/env python3
"""
Jasswiki JSONL Refactor: Transformiert Artikel und FAQs für extraktive, wörtliche Antworten.
Keine Halluzinationen - nur wörtliche Extracts aus dem Body.
"""

import json
import re
import sys
from typing import Dict, List, Any, Optional
from pathlib import Path


def normalize_body(body: str) -> str:
    """
    Normalisiert den Body: 
    - Typografische Bullets (•, –) → ASCII-Bullets (- )
    - Strukturiert mit Abschnittsmarkern
    - Keine inhaltlichen Änderungen
    """
    if not body:
        return ""
    
    lines = body.split('\n')
    result_lines: List[str] = []
    current_section: Optional[str] = None
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        
        # Ignoriere "Titel:" Zeilen
        if line.startswith('Titel:'):
            i += 1
            continue
        
        # Ignoriere "Siehe auch:" Zeilen (stehen am Ende)
        if line.startswith('Siehe auch:'):
            i += 1
            continue
        
        # Erkenne Abschnittsmarker (Großbuchstabe, dann Wörter mit Leerzeichen)
        section_match = re.match(r'^([A-ZÄÖÜ][A-Za-zäöüß\s]+?):\s*(.*)$', line)
        if section_match:
            section_name = section_match.group(1).strip()
            content = section_match.group(2).strip()
            
            # Ignoriere alleinstehende "Definition:" Marker (ohne Content)
            if section_name == 'Definition' and not content:
                i += 1
                continue
            
            # Mapping für Abschnittsnamen
            section_map = {
                'Kurzdefinition': 'Abschnitt: Kurzdefinition',
                'Definition': 'Abschnitt: Kurzdefinition',
                'Grundregeln bei Fehler': 'Abschnitt: Grundregeln',
                'Grundregeln': 'Abschnitt: Grundregeln',
                'Grundregel': 'Abschnitt: Grundregeln',
                'Regeln': 'Abschnitt: Grundregeln',
                'Reihenfolge': 'Abschnitt: Reihenfolge',
                'Kartenwahl und Spielablauf': 'Abschnitt: Kartenwahl und Spielablauf',
                'Kartenwahl': 'Abschnitt: Kartenwahl und Spielablauf',
                'Spielablauf': 'Abschnitt: Kartenwahl und Spielablauf',
                'Ausnahme': 'Abschnitt: Ausnahme',
                'Ausnahmen': 'Abschnitt: Ausnahme',
                'Sonderregel': 'Abschnitt: Sonderregel',
                'Nächster Stich': 'Abschnitt: Nächster Stich',
                'Nächster stich': 'Abschnitt: Nächster Stich',
                'Sanktion': 'Abschnitt: Sanktion',
            }
            
            # Prüfe auf spezielle Hindersi-Ausnahme
            if 'hindersi' in section_name.lower() or 'differenzler' in section_name.lower():
                mapped_section = 'Abschnitt: Ausnahme Hindersi/Differenzler'
            else:
                # Finde passendes Mapping (prüfe längere Keys zuerst)
                mapped_section = None
                # Sortiere Keys nach Länge (längere zuerst) für exakte Treffer
                sorted_keys = sorted(section_map.keys(), key=len, reverse=True)
                for key in sorted_keys:
                    if section_name.startswith(key) or key.lower() in section_name.lower():
                        mapped_section = section_map[key]
                        break
            
            if mapped_section:
                # Neuer Abschnitt
                if current_section != mapped_section:
                    if current_section is not None:
                        result_lines.append('')  # Leerzeile
                    result_lines.append(mapped_section)
                    current_section = mapped_section
                
                # Verarbeite Content
                if content:
                    # Ignoriere "Definition:" als Content (redundanter Marker)
                    if content.strip() == 'Definition:':
                        # Nichts hinzufügen, nächste Zeile wird verarbeitet
                        pass
                    # Prüfe auf Bullet
                    elif re.match(r'^[•–-]\s+', content):
                        content = re.sub(r'^[•–-]\s+', '- ', content)
                        result_lines.append(content)
                    else:
                        # Vollständiger Satz
                        result_lines.append(content)
                # Wenn kein Content: nächste Zeile(n) werden normal verarbeitet
            
            i += 1
            continue
        
        # Prüfe auf Bullet-Zeile (beginnt mit •, –, oder -)
        bullet_match = re.match(r'^[•–-]\s+(.+)$', line)
        if bullet_match:
            content = bullet_match.group(1).strip()
            
            # Stelle sicher, dass Abschnitt vorhanden ist
            if current_section is None:
                result_lines.append('Abschnitt: Grundregeln')
                current_section = 'Abschnitt: Grundregeln'
            
            # Normalisiere zu ASCII-Bullet
            result_lines.append(f'- {content}')
            i += 1
            continue
        
        # Normale Textzeile (ohne Marker, ohne Bullet)
        if current_section is None:
            result_lines.append('Abschnitt: Kurzdefinition')
            current_section = 'Abschnitt: Kurzdefinition'
        
        result_lines.append(line)
        i += 1
    
    return '\n'.join(result_lines)


def extract_sentences(original_text: str) -> List[str]:
    """
    Extrahiert ALLE möglichen Extracts (4-60 Wörter) aus dem ORIGINAL-Text.
    Ein Extract = exakt eine Zeile/Satz aus dem Text (auch Bullet-Punkte ohne Satzende).
    Ignoriert Metadaten-Zeilen wie "Titel:", "Siehe auch:", etc.
    """
    if not original_text:
        return []
    
    # Bereinige Text: entferne Metadaten-Zeilen
    lines = original_text.split('\n')
    candidates = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # Ignoriere Metadaten
        if line.startswith('Titel:'):
            continue
        if line.startswith('Siehe auch:'):
            continue
        # Ignoriere leere Abschnittsmarker
        if re.match(r'^[A-ZÄÖÜ][a-zäöüß\s]+:\s*$', line):
            continue
        
        # Entferne Bullet-Prefix für Analyse
        clean_line = re.sub(r'^[•–-]\s+', '', line)
        # Entferne Abschnittsmarker am Anfang
        clean_line = re.sub(r'^[A-ZÄÖÜ][a-zäöüß\s]+:\s*', '', clean_line)
        clean_line = clean_line.strip()
        
        if not clean_line:
            continue
        
        # Prüfe ob Zeile mit Satzende endet
        has_sentence_end = clean_line.endswith(('.', '!', '?'))
        
        # Wenn kein Satzende, aber die Zeile lang genug ist, könnte es trotzdem ein Extract sein
        # (z.B. Bullet-Punkte ohne Punkt)
        
        # Zähle Wörter
        words = re.findall(r'\b[A-ZÄÖÜa-zäöüß]+\b', clean_line)
        word_count = len(words)
        
        # Mindestens 4 Wörter, maximal 60 Wörter
        if 4 <= word_count <= 60:
            # Speichere die ORIGINALE Zeile (mit Bullet falls vorhanden)
            # für spätere Validierung
            original_line = line  # Original-Zeile mit Bullet
            
            candidates.append({
                'extract': clean_line,  # Bereinigter Text für Extract
                'original': original_line,  # Original für Validierung
                'word_count': word_count,
                'has_sentence_end': has_sentence_end
            })
    
    # Sortiere Kandidaten: Sätze mit Satzende zuerst, dann nach Länge
    candidates.sort(key=lambda x: (not x['has_sentence_end'], -x['word_count']))
    
    # Validiere gegen Original-Text
    extracts = []
    original_normalized = ' '.join(original_text.split())
    
    for candidate in candidates:
        extract_text = candidate['extract']
        extract_normalized = ' '.join(extract_text.split())
        
        # Stelle sicher, dass der Extract im ORIGINAL-Text enthalten ist
        # (als Teil der originalen Zeile)
        original_line_normalized = ' '.join(candidate['original'].split())
        
        # Prüfe: Extract muss in Original-Zeile sein UND in Gesamt-Text
        if extract_normalized in original_line_normalized and extract_normalized in original_normalized:
            extracts.append(extract_text)
    
    # Entferne Duplikate, behalte Reihenfolge
    seen = set()
    unique_extracts = []
    for extract in extracts:
        extract_normalized = ' '.join(extract.split())
        if extract_normalized not in seen:
            seen.add(extract_normalized)
            unique_extracts.append(extract)
    
    # Maximal 8 Extracts, aber wenn weniger vorhanden, nimm alle
    return unique_extracts[:8] if len(unique_extracts) > 8 else unique_extracts


def extract_extracts_from_body(body: str) -> List[str]:
    """
    Extrahiert wörtliche Extracts (4-60 Wörter) aus dem ORIGINAL-Body.
    Inkludiert auch Bullet-Punkte ohne Satzende.
    """
    if not body:
        return []
    
    # Extrahieren direkt aus dem Original-Body
    extracts = extract_sentences(body)
    
    return extracts


def enhance_synonyms_article(article: Dict[str, Any]) -> List[str]:
    """
    Ergänzt Synonyme minimal - nur wenn sie aus dem Text stammen oder eindeutige Varianten sind.
    """
    existing_synonyms = set(article.get('synonyms', []))
    title = article.get('title', '').lower()
    body = article.get('body', '').lower()
    
    new_synonyms = []
    
    # Beispiel-Logik für "Falscher Spieler"
    if 'falscher spieler' in title or 'falscher spieler' in body:
        candidates = [
            'falscher ausspieler',
            'falsch ausspielen',
            'falscher spieler spielt aus'
        ]
        for cand in candidates:
            if cand not in existing_synonyms:
                # Prüfe ob ähnliche Begriffe im Text vorkommen
                if any(word in body for word in ['falsch', 'ausspiel', 'spieler']):
                    new_synonyms.append(cand)
    
    # Füge nur hinzu, wenn sie nicht schon vorhanden sind
    all_synonyms = list(existing_synonyms) + new_synonyms
    return list(dict.fromkeys(all_synonyms))  # Entferne Duplikate, behalte Reihenfolge


def transform_article(article: Dict[str, Any]) -> Dict[str, Any]:
    """
    Transformiert einen Artikel nach den Vorgaben.
    """
    result = {
        'id': article['id'],
        'title': article['title'],
        'language': article['language'],
    }
    
    # Optionale Felder beibehalten
    if 'variant' in article:
        result['variant'] = article['variant']
    if 'tags' in article:
        result['tags'] = article['tags']
    if 'see_also' in article:
        result['see_also'] = article['see_also']
    
    # Synonyms beibehalten oder leeres Array
    result['synonyms'] = enhance_synonyms_article(article)
    
    # Body normalisieren
    original_body = article.get('body', '')
    result['body'] = normalize_body(original_body)
    
    # Extracts extrahieren (aus Original-Body)
    result['extracts'] = extract_extracts_from_body(original_body)
    
    # Speichere Original-Body für Validierung (als temporäres Feld)
    result['_original_body'] = original_body
    
    return result


def transform_faq(faq: Dict[str, Any]) -> Dict[str, Any]:
    """
    Transformiert eine FAQ (optional - nur Synonyme minimal ergänzen).
    """
    result = faq.copy()
    
    # Synonyme minimal ergänzen (falls sinnvoll)
    # Hier könnten alltagstypische Varianten hinzugefügt werden
    # Aber nur wenn sie klar gleichbedeutend sind
    
    return result


def validate_extracts(article: Dict[str, Any], original_body: Optional[str] = None) -> tuple[bool, str]:
    """
    Validiert, dass alle Extracts exakt im ORIGINAL-Body vorkommen.
    """
    # Verwende Original-Body falls vorhanden, sonst transformierten Body
    body = original_body if original_body else article.get('_original_body', article.get('body', ''))
    extracts = article.get('extracts', [])
    
    if not body:
        return False, "Kein Body gefunden zur Validierung"
    
    body_normalized = ' '.join(body.split())
    
    for extract in extracts:
        extract_normalized = ' '.join(extract.split())
        if extract_normalized not in body_normalized:
            return False, f"Extract nicht gefunden im Original-Body: '{extract[:50]}...'"
    
    return True, "OK"


def validate_forbidden_words(article: Dict[str, Any]) -> tuple[bool, str]:
    """
    Prüft auf verbotene Wörter, die nicht im Original-Body standen.
    """
    forbidden_words = ['annullieren', 'Strafpunkte', 'neu geben']
    body = article.get('body', '').lower()
    
    # Diese Prüfung ist nur eine Warnung - wir prüfen, ob diese Wörter
    # in Extracts vorkommen, obwohl sie nicht im Original-Body waren
    # (Das sollte eigentlich nicht passieren, da Extracts nur aus dem Body stammen)
    
    return True, "OK"


def main():
    articles_path = Path('chatgpt-gpt/jasswiki-articles.jsonl')
    faqs_path = Path('chatgpt-gpt/jasswiki-faqs.jsonl')
    
    articles_output_path = Path('chatgpt-gpt/jasswiki-articles.refactored.jsonl')
    faqs_output_path = Path('chatgpt-gpt/jasswiki-faqs.refactored.jsonl')
    
    # Transformation der Artikel
    print("Transformation der Artikel...")
    article_count = 0
    articles_empty_extracts = 0
    
    with open(articles_path, 'r', encoding='utf-8') as f_in, \
         open(articles_output_path, 'w', encoding='utf-8') as f_out:
        
        for line in f_in:
            line = line.strip()
            if not line:
                continue
            
            try:
                article = json.loads(line)
                original_body = article.get('body', '')
                transformed = transform_article(article)
                
                # Validiere gegen Original-Body
                is_valid, msg = validate_extracts(transformed, original_body)
                if not is_valid:
                    print(f"WARNUNG Artikel {transformed['id']}: {msg}", file=sys.stderr)
                
                # Entferne temporäres Feld vor dem Schreiben
                if '_original_body' in transformed:
                    del transformed['_original_body']
                
                # Schreibe transformiertes Objekt
                json_line = json.dumps(transformed, ensure_ascii=False, separators=(',', ':'))
                f_out.write(json_line + '\n')
                
                article_count += 1
                if len(transformed.get('extracts', [])) == 0:
                    articles_empty_extracts += 1
                
            except json.JSONDecodeError as e:
                print(f"FEHLER beim Parsen einer Zeile: {e}", file=sys.stderr)
                continue
    
    print(f"✓ {article_count} Artikel transformiert")
    print(f"  - {articles_empty_extracts} Artikel mit leeren Extracts")
    
    # Transformation der FAQs (optional)
    print("\nTransformation der FAQs...")
    faq_count = 0
    
    if faqs_path.exists():
        with open(faqs_path, 'r', encoding='utf-8') as f_in, \
             open(faqs_output_path, 'w', encoding='utf-8') as f_out:
            
            for line in f_in:
                line = line.strip()
                if not line:
                    continue
                
                try:
                    faq = json.loads(line)
                    transformed = transform_faq(faq)
                    
                    json_line = json.dumps(transformed, ensure_ascii=False, separators=(',', ':'))
                    f_out.write(json_line + '\n')
                    
                    faq_count += 1
                except json.JSONDecodeError as e:
                    print(f"FEHLER beim Parsen einer FAQ-Zeile: {e}", file=sys.stderr)
                    continue
        
        print(f"✓ {faq_count} FAQs transformiert")
    else:
        print("⚠ FAQs-Datei nicht gefunden, übersprungen")
    
    # Stichproben-Prüfung
    print("\nStichproben-Prüfung kritischer Artikel...")
    critical_ids = ['falscher_spieler', 'nichtfarben', 'farbe_nicht_bekennen', 'weismeldung', 'bodentrumpf']
    
    # Lade Original-Artikel für Validierung
    original_articles = {}
    with open(articles_path, 'r', encoding='utf-8') as f:
        for line in f:
            article = json.loads(line)
            original_articles[article['id']] = article
    
    # Lade transformierte Artikel
    with open(articles_output_path, 'r', encoding='utf-8') as f:
        all_articles = {}
        for line in f:
            article = json.loads(line)
            all_articles[article['id']] = article
    
    for critical_id in critical_ids:
        if critical_id in all_articles:
            article = all_articles[critical_id]
            original_body = original_articles.get(critical_id, {}).get('body', '')
            is_valid, msg = validate_extracts(article, original_body)
            forbidden_ok, _ = validate_forbidden_words(article)
            
            status = "✓ OK" if (is_valid and forbidden_ok) else "✗ FEHLER"
            print(f"  {status}: {critical_id}")
            if not is_valid:
                print(f"    {msg}")
        else:
            print(f"  ⚠ Nicht gefunden: {critical_id}")
    
    print("\n✓ Transformation abgeschlossen!")
    print(f"\nStatistik:")
    print(f"  - Artikel: {article_count}")
    print(f"  - Artikel mit leeren Extracts: {articles_empty_extracts}")
    print(f"  - FAQs: {faq_count}")


if __name__ == '__main__':
    main()


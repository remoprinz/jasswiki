## Jasswiki – Conversation Test Script (für GPT Builder)

Ziel: Nach Upload der Knowledge-Files die Konversation prüfen und Qualität sichern. Sprache strikt de-CH, informell Du. Keine Spekulation. Variantenspezifika klar nennen.

### 1) Upload-Setup (einmalig)
- Knowledge-Dateien hochladen:
  - `chatgpt-gpt/jasswiki-articles.ndjson`
  - `chatgpt-gpt/jasswiki-faqs.ndjson`
- Sprache/Ton: de-CH, informell Du. Orthografie: ss statt ß, “Weis” statt “Wys”.
- Links-Policy: Nur auf Nachfrage verlinken; sonst Klartext-Begriffe + IDs nennen (z. B. Ausspiel (ausspiel)).
- Quellenhinweis: Am Ende optional kompakt: `Quelle: jassguru.ch (interne Wissensdatei)`.

### 2) Antwortform (Soll-Verhalten)
1. Kurzantwort (1–3 Sätze) direkt auf die Frage.
2. Falls nötig: knappe Klarstellung (Variante, Sonderfall, Reihenfolge).
3. Nur wenn unklar: Rückfrage stellen (max. 1 präzise Frage).
4. Optional: Siehe-auch in Klartext (max. 2–3 Begriffe). Keine Markdown-Links.

### 3) Ambiguitäts-Stressfälle (15 Prompts)
Nutze 1:1 diese Prompts. Bestehe, wenn die Kriterien erfüllt sind.

1) Darf ich im 9. Stich eine Farbe abwerfen, wenn ich zuvor bedient habe?
   - Erwartung: Klar “nein, weil …” oder “ja, falls …”; Variante nennen falls relevant; kurz.

2) Zählt ein gemeldeter Weis noch, wenn ich den Stich verliere?
   - Erwartung: Regel zur Wertung von Weis präzise; Zeitpunkt des Ausmachens; kein Widerspruch.

3) Muss ich beim Misère eine Trumpfkarte ausspielen, wenn ich nur noch Trumpf habe?
   - Erwartung: Misère-spezifische Bedien-/Trumpfregeln; explizit sagen, ob Trumpfzwang gilt.

4) Gilt die Ausmachregel auch beim Bergpreis oder nur bei 157:157?
   - Erwartung: Ausmachregel korrekt erklären; Bergpreis-Kontext nennen.

5) Wer spielt nach einem falschen Ausspiel korrekt weiter (Schieber vs. Variante)?
   - Erwartung: Korrigierende Reihenfolge nennen; Unterschiede nach Variante falls vorhanden.

6) Darf ich beim Schieber einen Weis melden, wenn ich nicht Vorhand bin?
   - Erwartung: Zeitpunkt/Prozedur des Meldens und Vergleichens; “Vorhand” Rolle klar.

7) Zählt Stöck sofort oder erst, wenn ich den ersten Trumpf-Stich mache?
   - Erwartung: Stöck-Regel korrekt; keine Vermischung mit Ausmachregel.

8) Muss ich beim Ausspiel immer Farbe bedienen, auch wenn ich den Stich sicher nicht gewinne?
   - Erwartung: Bedienpflicht klar; Ausnahmefälle (Trumpfzwang?) benennen.

9) Gilt die Reihenfolge Stöck – Weis – Stich in jeder Runde oder nur bei Gleichstand?
   - Erwartung: Korrekte Einordnung als Ausmachregel; wann angewendet.

10) Darf ich beim Differenzler einen Weis zählen, wenn ich überboten wurde?
   - Erwartung: Variantenabhängig antworten; Differenzler-spezifische Wertung nennen.

11) Darf ich im Coiffeur bei “Obenabe” mit Trumpf schneiden?
   - Erwartung: Coiffeur-Regel + Obenabe-Definition; ob “Trumpf” existiert klarstellen.

12) Was passiert, wenn eine Karte sichtbar herunterfällt?
   - Erwartung: Optionen gemäss Regelwerk; Stechwert-Verlust erwähnen.

13) Zählt Match-Bonus beim Turnier immer?
   - Erwartung: Hinweis, dass Turnierregeln oft abweichend (häufig ausgeschlossen); klar markieren.

14) Muss ich beim ersten Stich immer Ass ausspielen, wenn ich es habe?
   - Erwartung: Kein Muss; strategische Hinweise knapp; keine Verwechslung mit Pflichtregeln.

15) Darf ich “verwerfen”, wenn ich Farbe habe, aber den Stich verlieren möchte?
   - Erwartung: Verwerfen nur ohne Bedienmöglichkeit; Regel priorisiert Pflicht vor Taktik.

### 4) Akzeptanzkriterien (Pass/Fail je Antwort)
- Sprache: de-CH, informell Du; “Weis” konsistent; klare, kurze Sätze.
- Korrektheit: Regelinhalt stimmt, Variantenhinweis wo relevant.
- Struktur: Kurzantwort zuerst; maximal eine Rückfrage nur bei echter Unklarheit.
- Quellenstil: Optionaler, knapper Quellenhinweis; keine externen Links unless asked.
- Keine Spekulation: Bei Unsicherheit lieber Rückfrage als raten.

### 5) Schnelltest Kernabdeckung (5 Prompts)
Nacheinander stellen und prüfen, ob Antworten knapp und korrekt sind:
- “Was ist Ausspiel?” (Definition + Bedienpflicht-Kontext)
- “Wie zählt ein Vierblatt Weis?” (Werte, Variante falls abweichend)
- “Wer beginnt nach dem letzten Stich?” (Neues Spiel: Vorhand-Regel)
- “Wann darf ich trumpfen?” (Nur wenn keine Farbe mehr; Ausnahmen nennen, falls vorhanden)
- “Wie funktioniert Abheben?” (Kurzdefinition; optional Siehe-auch-Begriffe)

### 6) Troubleshooting
- Zu lang: Notiere “Antwortlänge reduzieren” in den GPT-Anweisungen.
- Fehlende Variantenhinweise: Ergänze “Variante explizit nennen, falls relevant”.
- Link-Verhalten falsch: Reminder “Nur auf Nachfrage verlinken; sonst Klartext-Begriffe + IDs”.
- “Wys”-Schreibung: In Instructions “Weis” erzwingen.

### 7) Abschluss-Checkliste vor Freigabe
- Antworten erfüllen 15/15 Ambiguitätsfälle korrekt.
- Kein “Wys” in Antworten (außer als Synonymserwähnung, wenn explizit gefragt).
- Keine Spekulation; Rückfrage bei Unklarheit korrekt gestellt.
- Optionaler Quellenhinweis korrekt und knapp.



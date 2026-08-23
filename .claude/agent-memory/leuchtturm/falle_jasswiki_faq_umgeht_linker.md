---
name: jasswiki-faq-umgeht-linker
description: FALLE jasswiki — FAQ-Antworten laufen am InternalLinker vorbei und gehen roh ins FAQPage-JSON-LD; Rohmarker sind dort sichtbar statt unsichtbar
metadata:
  type: project
---

Auf jasswiki.ch geht der Text einer FAQ-Antwort **zweimal roh hinaus**: `FaqSection.tsx`
rendert `{faq.answer}` als reinen String, `FaqJsonLdSchema.tsx` legt denselben String als
`acceptedAnswer.text` ins FAQPage-Schema. Der `InternalLinker` fasst nur `item.text` an.

Belegt am 15.08.26 live: `https://jasswiki.ch/regeln/spielablauf/bodentrumpf/` zeigt in der
ersten FAQ-Antwort für den Leser `(siehe Begriff "abheben")` — derselbe Rohtext steht im
`"@type":"Answer"`-Block der strukturierten Daten. 38 Marker in 33 Artikeln betroffen.

**Why:** Beim Schätzen des Schadens wirkt ein Marker im `__NEXT_DATA__` wie Rauschen
(unsichtbar, nur Nutzlast). Bei FAQ-Antworten ist er das Gegenteil: sichtbarer Fliesstext
plus Rich-Results-Datensatz, den Google auswertet.

**How to apply:** Jede Zählung von Marker-, Link- oder Formatierungsfehlern auf jasswiki
getrennt nach `text` und `faqs` führen. Wer den Auflöser anfasst, muss FAQ-Antworten
mitnehmen — sonst bleibt der sichtbarste Teil des Schadens stehen. Gehört zur Messung in
[[jasswiki-internal-links-audit]].

**Stand 23.08.2026: für die neun geprüften Seiten geschlossen.** Null Rohmarker im sichtbaren
Text, in allen 110 FAQ-Antworten und in den sechs llms-Modulen. Die Marker liegen ausschliesslich
im `__NEXT_DATA__`, wo sie hingehören. Prüfrezept, das den Unterschied macht: das ausgelieferte
HTML an `<` in Zeilen zerlegen, `grep -v '^<script'`, dann erst nach Markern suchen — sonst zählt
man die harmlose Nutzlast im `__NEXT_DATA__` als Schaden mit (auf den neun Seiten 6 bis 43
Treffer, alle unsichtbar). Siehe [[faq-rich-results-ende]].

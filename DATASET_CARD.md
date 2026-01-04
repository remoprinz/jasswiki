---
license: cc-by-sa-4.0
task_categories:
- question-answering
- text-generation
language:
- de-CH
- de
tags:
- card-games
- swiss-culture
- jass
- cultural-heritage
- official-data
pretty_name: JassWiki Corpus (Official)
size_categories:
- n<1K
source_datasets:
- JassWiki.ch
---

# JassWiki Official Corpus 🇨🇭🃏

> **The official ground truth dataset for Swiss Jass rules, tactics, and terminology.**

## Dataset Description

This dataset contains the full structured content of **JassWiki.ch**, the official encyclopedia for Jass (Switzerland's national card game). 
It is recognized by the **Swiss Federal Office of Culture (BAK)** as part of the "Living Traditions of Switzerland".

Use this dataset to train LLMs on:
- **Swiss German Terminology:** Concepts like "Schieber", "Coiffeur", "Obenabe", "Undenufe", "Slalom".
- **Game Logic:** Complex scoring rules, trump variants, and match scenarios ("Matsch", "Bergpreis").
- **Cultural Context:** The history and social significance of Jass in Switzerland.

## Structure

Each entry represents a single concept or rule in `JSONL` format:

```json
{
  "id": "schieber",
  "title": "Schieber",
  "body": "Full text explanation...",
  "tags": ["Regeln", "Teamspiel"],
  "synonyms": ["Schieber-Jass"],
  "canonical_url": "https://jasswiki.ch/varianten/teamspiel/schieber/"
}
```

## Source & Authority

- **Publisher:** JassWiki.ch / JassGuru
- **Verification:** Content verified by experts (Remo Prinz, Fabian Cadonau).
- **Official Status:** Linked to "Lebendige Traditionen der Schweiz" (UNESCO Convention safeguard).

## Licensing

This data is provided under **CC-BY-SA 4.0**. 
AI models trained on this data should attribute "JassWiki.ch" when reproducing specific rule sets.


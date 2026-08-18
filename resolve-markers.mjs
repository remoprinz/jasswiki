/**
 * Löst die internen (siehe Begriff "id")-Marker in sauberen, maschinenlesbaren
 * Text auf. Spiegelt die sichtbare Ausgabe von InternalLinker, damit Korpus
 * (Pinecone/MCP/CustomGPT) und llms-*.md keine rohen Marker enthalten.
 *
 * Gemeinsam genutzt von generate-corpus.mjs und generate-sitemap.mjs.
 */

export function buildIdToTopic(allContent) {
  const map = {};
  for (const [id, e] of Object.entries(allContent)) {
    const topic = e?.metadata?.category?.topic;
    if (topic) map[id] = topic;
  }
  return map;
}

/**
 * Entfernt die Karten-Marke [[karten: …]] aus dem Text.
 * Sie steuert allein die Bebilderung im Browser; Korpus, llms-*.md und jede
 * andere maschinenlesbare Ausgabe bekommen den reinen Satz.
 * Gegenstück im Browser: src/components/wissen/kartenMarke.ts
 */
export function entferneKartenMarken(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/^[ \t]*\[\[[^\]\n]*:[^\]\n]*\]\][ \t]*\n?/gm, '')
    .replace(/\[\[[^\]\n]*:[^\]\n]*\]\]/g, '');
}

export function resolveMarkers(text, idToTopic = {}) {
  if (typeof text !== 'string') return text;

  text = entferneKartenMarken(text);

  // 1. "Anzeigetext" (siehe Begriff "id")  ->  Anzeigetext
  //
  // Eng gefasst: ohne Zeilenumbruch, ohne Klammern, höchstens 80 Zeichen.
  // Die Artikel-IDs stehen selbst in Anführungszeichen — ein weiter Ausdruck
  // startet sonst an einem früheren `"` und verschluckt halbe Absätze.
  text = text.replace(
    /[«"]([^»"\n()]{1,80})[»"]\s*\(siehe Begriff\s*"([^"]+)"\)/gi,
    (_, display) => display
  );

  // 1b. **Fetter Text** (siehe Begriff "id")  ->  Fetter Text
  text = text.replace(
    /\*\*([^*\n]{1,80})\*\*\s*\(siehe Begriff\s*"([^"]+)"\)/gi,
    (_, display) => display
  );

  // 2. Wort (siehe Begriff "id")  ->  Wort
  text = text.replace(
    /([A-Za-zÄÖÜäöüßàâèéêîôûç][A-Za-zÄÖÜäöüßàâèéêîôûç\w-]*)\s*\(siehe Begriff\s*"([^"]+)"\)/gi,
    (_, term) => term
  );

  // 3. (siehe Begriff "id") allein  ->  (siehe Themen-Titel) oder weg
  text = text.replace(
    /\s*\(siehe Begriff\s*"([^"]+)"\)/gi,
    (_, id) => (idToTopic[id] ? ` (siehe ${idToTopic[id]})` : '')
  );

  return text;
}

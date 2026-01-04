import fs from 'fs';
import path from 'path';

const JSON_FILE = 'src/data/jass-content-v2.json';

const newArticle = {
  "id": "general_schieber",
  "text": "Der Schieber ist die mit Abstand beliebteste und verbreitetste Jassvariante. Anders als beim Einzelspiel (z. B. Differenzler) ist der Schieber ein echter Teamsport. Gespielt wird zu viert, wobei sich je zwei Partner kreuzweise gegenübersitzen und eine feste Partei bilden.\n\n**Die Philosophie der 18 Karten**\nDas Besondere am Schieber ist die Dynamik zwischen den Partnern. Ein Jasser spielt metaphorisch nicht nur mit seinen eigenen 9 Karten, sondern stets mit 18 Karten – den eigenen und denen des Partners. Das blinde Verständnis, das Antizipieren der Partnerzüge und das gemeinsame Taktieren machen die Faszination dieser Variante aus.\n\n**Spielprinzip**\nZiel ist es, gemeinsam mit dem Partner möglichst viele Punkte zu erzielen. Kann der Vorhandspieler keine vernünftige Trumpffarbe bestimmen, \"schiebt\" er die Entscheidung zu seinem Partner – daher der Name \"Schieber\". Dieses Element des Vertrauens und der gemeinsamen Verantwortung unterscheidet ihn von allen anderen Varianten.",
  "metadata": {
    "category": {
      "main": "Varianten",
      "sub": "Schieber",
      "topic": "Der Schieber"
    },
    "keywords": [
      "schieber",
      "teamsport",
      "jassvariante",
      "grundlagen",
      "partner",
      "schieben"
    ],
    "difficulty": "Einsteiger",
    "importance": 1.0,
    "synonyms": [
      "Schieberjass",
      "Partnerschieber"
    ],
    "situations": [
      "START",
      "LEARNING"
    ]
  },
  "see_also": [],
  "faqs": []
};

function main() {
  console.log('📖 Lade jass-content-v2.json...');
  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));

  if (data[newArticle.id]) {
    console.log(`⚠️ Artikel mit ID ${newArticle.id} existiert bereits. Überschreibe...`);
  } else {
    console.log(`✨ Füge neuen Artikel ${newArticle.id} hinzu...`);
  }

  // Add or overwrite the article
  data[newArticle.id] = newArticle;

  // Sort keys to keep it tidy (optional but nice)
  const sortedData = Object.keys(data).sort().reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {});

  fs.writeFileSync(JSON_FILE, JSON.stringify(sortedData, null, 2), 'utf-8');
  console.log('✅ jass-content-v2.json erfolgreich aktualisiert.');
}

main();


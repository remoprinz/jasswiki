import fs from 'fs';

const JSON_FILE = 'src/data/jass-content-v2.json';

const correctedArticle = {
  "id": "general_schieber",
  "text": `Definition:
Der Schieber ist die mit Abstand beliebteste und verbreitetste Jassvariante in der Schweiz. Anders als beim Einzelspiel (z. B. Differenzler) ist der Schieber ein echter Teamsport. Gespielt wird zu viert, wobei sich je zwei Partner kreuzweise gegenübersitzen und eine feste Partei bilden.

Die Philosophie der 18 Karten:
• Ein Jasser spielt metaphorisch nicht nur mit seinen eigenen 9 Karten, sondern stets mit 18 Karten
• Die 9 Karten in der eigenen Hand und die 9 Karten des Partners bilden eine Einheit
• Das blinde Verständnis zwischen den Partnern ist entscheidend
• Das Antizipieren der Partnerzüge macht die Faszination dieser Variante aus
• Gemeinsames Taktieren und strategisches Zusammenspiel sind der Schlüssel zum Erfolg

Spielprinzip:
• Ziel ist es, gemeinsam mit dem Partner möglichst viele Punkte zu erzielen
• Der Vorhandspieler (siehe Begriff "vorhand") kann eine Trumpffarbe (siehe Begriff "bodentrumpf") bestimmen
• Falls keine vernünftige Trumpffarbe möglich ist, kann er die Entscheidung zu seinem Partner "schieben"
• Daher der Name "Schieber" – das Weitergeben der Verantwortung
• Dieses Element des Vertrauens und der gemeinsamen Verantwortung unterscheidet den Schieber von allen anderen Varianten

Besonderheiten:
• Der Schieber ist die am weitesten verbreitete Jassvariante
• Er wird sowohl in der Freizeit als auch bei Turnieren gespielt
• Die Regeln sind standardisiert und in der ganzen Schweiz einheitlich
• Team-Dynamik und Kommunikation (ohne Worte) sind zentral`,
  
  "metadata": {
    "id": "general_schieber_meta",
    "category": {
      "main": "Schieber",
      "sub": "Grundlagen",
      "topic": "Der Schieber"
    },
    "keywords": [
      "schieber",
      "teamsport",
      "jassvariante",
      "grundlagen",
      "partner",
      "schieben",
      "teamspiel",
      "18 karten",
      "vorhand",
      "trumpf",
      "zusammenspiel",
      "beliebteste variante"
    ],
    "difficulty": 1,
    "importance": 1.0,
    "synonyms": [
      "Schieberjass",
      "Partnerschieber",
      "Teamjass"
    ],
    "situations": [
      "START",
      "LEARNING"
    ],
    "source": "jasswiki.ch Redaktion"
  },
  
  "see_also": [
    "vorhand",
    "bodentrumpf",
    "differenzler",
    "matsch",
    "stoecke",
    "bock",
    "schmieren"
  ],
  
  "faqs": [
    {
      "question": "Was ist der Schieber?",
      "answer": "Der Schieber ist die beliebteste Jassvariante der Schweiz. Es ist ein Teamspiel für vier Personen, wobei sich je zwei Partner gegenübersitzen."
    },
    {
      "question": "Warum heißt der Schieber 'Schieber'?",
      "answer": "Der Name kommt daher, dass der Vorhandspieler die Trumpfwahl zu seinem Partner 'schieben' kann, wenn er selbst keine gute Trumpffarbe hat."
    },
    {
      "question": "Wie viele Spieler braucht man für den Schieber?",
      "answer": "Der Schieber wird zu viert gespielt. Je zwei Partner bilden ein Team und sitzen sich kreuzweise gegenüber."
    },
    {
      "question": "Was bedeutet die Philosophie der 18 Karten?",
      "answer": "Ein Jasser spielt nicht nur mit seinen 9 eigenen Karten, sondern metaphorisch mit 18 Karten – den eigenen und denen des Partners. Teamplay ist entscheidend."
    },
    {
      "question": "Ist der Schieber die häufigste Jassvariante?",
      "answer": "Ja, der Schieber ist mit Abstand die verbreitetste und beliebteste Jassvariante in der Schweiz."
    },
    {
      "question": "Was unterscheidet den Schieber vom Differenzler?",
      "answer": "Der Schieber ist ein Teamspiel, beim Differenzler spielt jeder für sich alleine. Der Schieber basiert auf Zusammenspiel, der Differenzler auf individuellem Geschick."
    },
    {
      "question": "Kann man den Schieber auch zu dritt spielen?",
      "answer": "Nein, der klassische Schieber wird immer zu viert gespielt. Für drei Spieler gibt es andere Varianten wie den Handjass."
    }
  ]
};

function main() {
  console.log('🔧 Korrigiere general_schieber auf Standard-Format...');
  const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));

  data['general_schieber'] = correctedArticle;

  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Artikel auf Standard-Format aktualisiert:');
  console.log('   • Text: Bullet-Format mit Abschnitten');
  console.log('   • FAQs:', correctedArticle.faqs.length, 'Fragen');
  console.log('   • see_also:', correctedArticle.see_also.length, 'Links');
  console.log('   • Keywords:', correctedArticle.metadata.keywords.length, 'Begriffe');
}

main();

























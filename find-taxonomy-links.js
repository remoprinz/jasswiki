import fs from 'fs';
import path from 'fs/path';

// Lade Content
const contentPath = path.join(process.cwd(), 'src/data/jass-content-v2.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// Slugify Funktion (muss identisch mit der App sein)
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function getUrl(meta) {
  const main = slugify(meta.category.main);
  const sub = slugify(meta.category.sub || '');
  const topic = slugify(meta.category.topic || '');
  
  if (meta.category.main === 'Begriffe') {
    return `/begriffe/${sub}/${topic}/`;
  }
  if (meta.category.main === 'Varianten') {
    return `/varianten/${topic}/`;
  }
  if (meta.category.main === 'Weis-Regeln') {
    return `/weis-regeln/${sub}/${topic}/`; // Struktur prüfen
  }
  return `/${main}/${sub}/${topic}/`;
}

// Begriffe aus der Taxonomie (Manuell extrahiert aus index.tsx Struktur)
const taxonomyTerms = [
  "Schieber", "Coiffeur", "Sidi Barrani", "Bolschewik", "Kreuzjass",
  "Pandur", "Bieter", "Aucho", "Schafhauser",
  "Differenzler", "Stich-Differenzler", "Mittlere", "Handjass",
  "Molotow", "Hindersi", "Schaufel-Dame", // Schaufel-Dame ist gelöscht? Checken
  "Chratze", "Guggitaler", "Tschau Sepp", "Zwick-Jass", "Zuger",
  "Trumpf", "Obenabe", "Undenufe", "Slalom", "Guschti", "Quer", "Trio", "Misère",
  "Puur", "Nell", "König", "Ober", "Dame", "Under", "Bube", "Ass", "Banner", "Zehner",
  "Schellen", "Schilten", "Rosen", "Eichel",
  "Herz", "Ecke", "Karo", "Kreuz", "Schaufel", "Pik",
  "Kartenwerte", "Letzter Stich",
  "Weis", "Dreiblatt", "Vierblatt", "Fünfblatt", "Sechsblatt", "Siebenblatt", "Achtblatt", "Neunblatt", 
  "Vier Gleiche", "Stöck", "Matsch", "Kontermatsch",
  "Mischen", "Abheben", "Geben", "Trumpf wählen", "Schieben", "Weisen", "Ausspielen", "Stechen", "Stöck melden", "Bedanken", "Schreiben",
  "Farbe bekennen", "Trumpffreiheit", "Kein Stichzwang", "Untertrumpf-Verbot", "Stöck-Weis-Stich", "157-Regel", "257-Irrtum",
  "Trumpf sticht", "Überstechen", "Puur-Privileg", "Nell-Regel",
  "Bergpreis", "Schneider", "Nuller", "Matschprämie", "Handweis", "Tischweis", "Kreuzweis", "Weisdeklaration"
];

console.log("Suche Matches für Taxonomie-Begriffe...\n");

for (const term of taxonomyTerms) {
  let bestMatch = null;
  let bestScore = 0;

  // Suche in allen Artikeln
  for (const key in content) {
    const item = content[key];
    const meta = item.metadata;
    const topic = meta.category.topic;
    
    // Exact Match auf Topic
    if (topic.toLowerCase() === term.toLowerCase()) {
      bestMatch = item;
      bestScore = 100;
      break; 
    }
    
    // Contains Match
    if (topic.toLowerCase().includes(term.toLowerCase())) {
        // Bevorzuge kürzere Topics (exakter)
        const score = 50 - Math.abs(topic.length - term.length);
        if (score > bestScore) {
            bestMatch = item;
            bestScore = score;
        }
    }
    
    // Check Keywords
    if (meta.keywords && meta.keywords.some(k => k.toLowerCase() === term.toLowerCase())) {
        if (bestScore < 80) {
            bestMatch = item;
            bestScore = 80;
        }
    }
  }

  if (bestMatch) {
    const url = getUrl(bestMatch.metadata);
    // Sonderlogik für Weis-Regeln (da URL Struktur manchmal anders)
    // Einfache Ausgabe für mich zum Kopieren
    console.log(`MATCH: "${term}" -> ${url} (Topic: ${bestMatch.metadata.category.topic})`);
  } else {
    console.log(`FAIL:  "${term}"`);
  }
}

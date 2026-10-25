// Die Lesertexte der Seite /jass-des-tages/ (GEO/SEO P3, 25.10.2026).
// Alle Sätze an einem Ort, damit SCHIRI/WELLE und FEILE sie ohne Code-Suche
// bearbeiten. Platzhalter in geschweiften Klammern füllt die Seite.

export const JDT_TEXTE = {
  seitenTitel: 'Jass des Tages: jeden Tag ein Blatt, mit Lösungsvideo | Jass-Wiki',
  seitenBeschreibung:
    'Der Jass des Tages auf jassguru.ch: jeden Tag dieselben neun Karten für alle und ein Ziel. Hier das Blatt von gestern mit Lösungsvideo.',
  kicker: 'Jeden Tag ein Blatt',
  titel: 'Jass des Tages',
  einleitung: [
    'Der Jass des Tages ist eine tägliche Jassaufgabe auf jassguru.ch. Jeden Tag liegt ein neues Blatt: dieselben neun Karten für alle, ein Ziel und ein Versuch.',
    'Das erste Blatt erschien am 14. August 2026. Bis gestern sind {anzahl} Blätter erschienen.',
    'Die Aufgaben schreibt Remo Prinz. Die Lösung zeigt der Jasscoach jeden Abend um 19 Uhr als Video, auch auf dem YouTube-Kanal @jassdestages.',
  ],
  // Satz 2 ohne Zahl, falls gestern.json beim Bauen schweigt.
  einleitungOhneZahl: 'Das erste Blatt erschien am 14. August 2026.',
  knopfSpielen: 'Heutiges Blatt spielen',
  kanalWort: 'Zum YouTube-Kanal',

  gesternTitel: 'Das Blatt von gestern',
  zumBlatt: 'Zum Blatt',
  ohneDaten: 'Das Blatt von gestern liegt auf jassguru.ch.',
  ohneDatenLink: 'Zum Jass des Tages',

  // Der Baustein JdtVideo (auch für die fünf Leitartikel aus P2).
  videoBeschriftung: 'Jass des Tages vom {datum}: {aufgabe}',
  videoSatz: 'Der Jasscoach spielt das Blatt vor und erklärt die Züge, auf die es ankommt.',
  videoTuer: 'Online jassen',
  videoAbspielen: 'Lösungsvideo abspielen',

  faqTitel: 'Häufige Fragen zum Jass des Tages',
  faqs: [
    {
      question: 'Was ist der Jass des Tages?',
      answer:
        'Eine tägliche Jassaufgabe auf jassguru.ch. Alle bekommen dieselben neun Karten und dasselbe Ziel, etwa eine Punktzahl oder einen Matsch.',
    },
    {
      question: 'Wann erscheint das neue Blatt?',
      answer: 'Um Mitternacht liegt das neue Blatt. Die Lösung folgt am Abend um 19 Uhr als Video.',
    },
    {
      question: 'Wie lange dauert ein Blatt?',
      answer: 'Ein Blatt hat neun Stiche. Gespielt ist es in ein paar Minuten.',
    },
    {
      question: 'Warum gibt es nur einen Versuch?',
      answer:
        'Ein Versuch macht das Ergebnis vergleichbar: Alle spielen dieselben Karten unter denselben Bedingungen.',
    },
    {
      question: 'Wo finde ich das Blatt von gestern?',
      answer:
        'Hier auf dieser Seite, mit dem Lösungsvideo. Alle früheren Blätter stehen im Archiv auf jassguru.ch.',
    },
  ],
} as const;

export const JDT_LINKS = {
  heute: 'https://jassguru.ch/jass-des-tages/',
  archiv: 'https://jassguru.ch/jass-des-tages/archiv/',
  tuer: 'https://jassguru.ch/online-jassen/',
  kanal: 'https://www.youtube.com/@jassdestages',
  gestern: 'https://jassguru.ch/jass-des-tages/gestern.json',
} as const;

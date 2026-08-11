import Document, {Html, Head, Main, NextScript} from "next/document";

const JASSWIKI_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Thing",
      "@id": "https://jasswiki.ch/#jass-tradition",
      "name": "Jassen",
      "alternateName": ["Schweizer Jass", "Swiss Jass"],
      "description": "Jass ist ein traditionelles Schweizer Kartenspiel und als lebendige Tradition im nationalen Inventar des Bundesamts für Kultur (BAK) anerkannt.",
      "sameAs": [
        "https://www.wikidata.org/wiki/Q786768",
        "https://de.wikipedia.org/wiki/Jass",
        "https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html"
      ]
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://jasswiki.ch/#organization",
      "name": "JassWiki.ch",
      "alternateName": "Schweizer Jass-Enzyklopädie",
      "url": "https://jasswiki.ch/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jasswiki.ch/logo-jasswiki.png",
        "width": 544,
        "height": 544
      },
      "description": "Die umfassendste digitale Wissensplattform für Schweizer Jass-Kultur, -Regeln und -Traditionen.",
      "slogan": "Das digitale Gedächtnis der Schweizer Jass-Kultur",
      "foundingDate": "2025",
      "subjectOf": [
        {
          "@type": "WebPage",
          "name": "Jassen - Lebendige Traditionen der Schweiz",
          "url": "https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html",
          "publisher": {
            "@type": "GovernmentOrganization",
            "name": "Bundesamt für Kultur (BAK)",
            "url": "https://www.bak.admin.ch"
          },
          "description": "Offizielle Anerkennung des Jassens als immaterielles Kulturerbe der Schweiz"
        }
      ],
      "knowsAbout": [
        {
          "@type": "Thing",
          "name": "Jass",
          "description": "Schweizer Kartenspiel",
          "sameAs": "https://www.wikidata.org/wiki/Q786768"
        },
        {
          "@type": "Thing",
          "name": "Kartenspiel",
          "sameAs": "https://www.wikidata.org/wiki/Q47883"
        },
        {
          "@type": "Country",
          "name": "Schweiz",
          "sameAs": "https://www.wikidata.org/wiki/Q39"
        },
        {
          "@type": "Thing",
          "name": "Schieber",
          "description": "Die Standardvariante des Schweizer Jass",
          "sameAs": "https://www.wikidata.org/wiki/Q137727247"
        },
        {
          "@type": "Thing",
          "name": "Coiffeur",
          "description": "Jass-Variante mit Matrix und Multiplikatoren",
          "sameAs": "https://www.wikidata.org/wiki/Q137731700"
        },
        {
          "@type": "Thing",
          "name": "Differenzler",
          "description": "Jass-Variante bei der die Differenz zum Ziel zählt",
          "sameAs": "https://www.wikidata.org/wiki/Q137731684"
        },
        {
          "@type": "Thing",
          "name": "Molotow",
          "description": "Jass-Variante mit Trumpfbestimmung durch Farbverrat",
          "sameAs": "https://www.wikidata.org/wiki/Q137738837"
        },
        {
          "@type": "Thing",
          "name": "Bieter",
          "description": "Jass-Variante mit Bieten",
          "sameAs": "https://www.wikidata.org/wiki/Q137738835"
        },
        {
          "@type": "Thing",
          "name": "Sidi Barrani",
          "description": "Jass-Variante mit Punktbieten",
          "sameAs": "https://www.wikidata.org/wiki/Q137738898"
        },
        "Jass-Regeln",
        "Jass-Traditionen",
        "Jass-Geschichte"
      ],
      // Förderung: hängt am Projekt, nicht am Betrieb der Website.
      // Wortlaut deckungsgleich mit jassverband.ch (bereits live).
      "funding": {
        "@type": "Grant",
        "funder": {
          "@type": "GovernmentOrganization",
          "name": "Bundesamt für Kultur",
          "alternateName": "BAK",
          "url": "https://www.bak.admin.ch"
        },
        "name": "Zeitgemässe Vermittlung der Jasskultur 2026"
      },
      "founder": [
        {
          "@id": "https://jasswiki.ch/#remo-prinz"
        },
        {
          "@id": "https://jasswiki.ch/#fabian-cadonau"
        }
      ],
      "parentOrganization": {
        "@type": "Organization",
        "@id": "https://jassverband.ch/#organization",
        "name": "Jassverband Schweiz (JVS)",
        "alternateName": "JVS",
        "url": "https://jassverband.ch",
        "description": "Nationaler Verband zur Förderung der Schweizer Jass-Kultur",
        "foundingDate": "2026-01-15",
        "sameAs": ["https://www.wikidata.org/wiki/Q139042763"]
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "general inquiries",
        "email": "remo@jasswiki.ch",
        "availableLanguage": ["German", "Swiss German"]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://jasswiki.ch/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://www.wikidata.org/wiki/Q137900251"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://jasswiki.ch/#remo-prinz",
      "name": "Remo Prinz",
      "givenName": "Remo",
      "familyName": "Prinz",
      "jobTitle": "Jass-Experte & Digital Innovation",
      "description": "Schweizer Jass-Experte mit über 15 Jahren Erfahrung in der digitalen Dokumentation und Analyse von Jass-Spielen. Entwickler von JassGuru.ch und JassStatistik.ch.",
      "url": "https://www.linkedin.com/in/remo-prinz-886835b/",
      "sameAs": [
        "https://www.linkedin.com/in/remo-prinz-886835b/",
        "https://jassguru.ch/",
        "https://jassstatistik.ch/"
      ],
      "worksFor": {
        "@id": "https://jasswiki.ch/#organization"
      },
      "knowsAbout": [
        "Jass-Statistik",
        "Digitale Jass-Plattformen",
        "Jass-Datenanalyse",
        "Machine Learning für Kartenspiele",
        "Schweizer Jass-Traditionen"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Digital Jass Innovation Expert",
        "occupationalCategory": "Cultural Heritage & Technology"
      },
      "affiliation": [
        {
          "@type": "Organization",
          "name": "JassGuru.ch",
          "url": "https://jassguru.ch/",
          "description": "Digitale Jass-Kreidetafel mit Elo-Rating-System und über 1500 erfassten Spielen"
        },
        {
          "@type": "Organization", 
          "name": "JassStatistik.ch",
          "url": "https://jassstatistik.ch/",
          "description": "Erfassung und Analyse von 640 Jass-Partien seit 2008"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://jasswiki.ch/#fabian-cadonau",
      "name": "Fabian Cadonau",
      "givenName": "Fabian",
      "familyName": "Cadonau",
      "jobTitle": "Jass-Experte & Event-Organisator",
      "description": "Schweizer Jass-Experte spezialisiert auf Jass-Events und Traditionsvermittlung.",
      "url": "https://trumpf-as.ch/",
      "sameAs": [
        "https://trumpf-as.ch/"
      ],
      "worksFor": {
        "@id": "https://jasswiki.ch/#organization"
      },
      "knowsAbout": [
        "Jass-Events",
        "Jass-Schulungen",
        "Traditionsvermittlung",
        "Schweizer Jass-Kultur",
        "Jass-Turniere"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Jass Event Manager & Cultural Ambassador",
        "occupationalCategory": "Cultural Heritage & Events"
      },
      "affiliation": {
        "@type": "Organization",
        "name": "Trumpf-As.ch",
        "url": "https://trumpf-as.ch/",
        "description": "Organisation von Jass-Events, Schulungen und Veranstaltungen in der ganzen Schweiz"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jasswiki.ch/#website",
      "url": "https://jasswiki.ch/",
      "name": "JassWiki.ch",
      "description": "Die Schweizer Jass-Enzyklopädie",
      "publisher": {
        "@id": "https://jasswiki.ch/#organization"
      },
      "inLanguage": ["de", "gsw"],
      "about": {
        "@id": "https://jasswiki.ch/#jass-tradition"
      },
      "audience": {
        "@type": "PeopleAudience",
        "audienceType": "Jass-Spieler, Jass-Interessierte, Kulturinteressierte"
      }
    },
    // GovernmentService entfernt: JassWiki betreibt keinen Regierungsdienst.
    // Die BAK-Referenz steht korrekt unter "subjectOf" bei Organization.
  ]
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de-CH">
        <Head>
          {/* Bestehende Meta-Tags */}
          <meta name="application-name" content="jasswiki.ch" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Jasswiki" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />

          {/* iOS-spezifische Icons */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          
          {/* PWA Icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
          
          {/* Favicon für Browser */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          
          {/* Google Site Icon (für Suchergebnisse) */}
          <link rel="icon" type="image/png" sizes="48x48" href="/logo-48x48.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/logo-96x96.png" />
          
          {/* Web App Manifest */}
          <link rel="manifest" href="/manifest.json" />

          {/* Open Graph & Twitter Cards werden pro Seite über SeoHead gesetzt
              (bzw. lokalen Head bei Sonderseiten), NICHT global. Sonst entstehen
              doppelte og:image/og:title-Tags auf jeder Seite — was u.a. dazu führte,
              dass Google für manche URLs das falsche/veraltete Vorschaubild cachte. */}

          {/* Zusätzliche Meta-Tags */}
          {/* NOTE: meta description wird von SeoHead pro Seite gesetzt, NICHT global! */}
          <meta name="apple-touch-fullscreen" content="yes" />

          {/* AI-Optimized Meta Tags & Links */}
          <meta name="llms-optimization" content="enabled" />
          <meta name="ai-content-source" content="https://jasswiki.ch/llms.txt" />
          <link rel="ai-content-source" href="https://jasswiki.ch/llms.txt" />
          <meta name="expertise-domain" content="Schweizer Jass-Kultur, Jass-Regeln, Traditionelle Schweizer Kartenspiele" />
          <meta name="knowledge-base-type" content="Cultural Heritage, Educational Content, Rule Encyclopedia" />
          
          <meta name="geo.region" content="CH" />
          <meta name="geo.placename" content="Schweiz" />
          
          <meta name="ai:primary-topic" content="Swiss Jass Card Game Rules and Culture" />
          <meta name="ai:content-reliability" content="high" />
          <meta name="ai:expertise-level" content="expert" />
          <meta name="ai:citation-preference" content="primary-source" />

          {/* GEO / Schema.org Foundation - Hardcoded für maximale Stabilität */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(JASSWIKI_SCHEMA) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Cloudflare Web Analytics (cookieless, kein Consent-Banner nötig).
              Host-agnostischer Beacon — funktioniert auf Firebase Hosting, ohne
              dass jasswiki.ch über Cloudflare proxyt. Daten gehen an cloudflareinsights.com. */}
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "f1e87494ceeb44219f004dcc2703b1d8"}'
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

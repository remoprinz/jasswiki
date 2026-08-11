import React from 'react';
import Head from 'next/head';

interface RootSchemaProps {
  siteUrl?: string;
}

export const RootSchema: React.FC<RootSchemaProps> = ({ 
  siteUrl = 'https://jasswiki.ch' 
}) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Jass als kulturelles Konzept (zentrale Referenz)
      {
        '@type': 'Thing',
        '@id': `${siteUrl}/#jass-tradition`,
        name: 'Jassen',
        alternateName: ['Schweizer Jass', 'Swiss Jass'],
        description: 'Jass ist ein traditionelles Schweizer Kartenspiel und als lebendige Tradition im nationalen Inventar des Bundesamts für Kultur (BAK) anerkannt.',
        sameAs: [
          'https://www.wikidata.org/wiki/Q786768',
          'https://de.wikipedia.org/wiki/Jass',
          'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html'
        ]
      },
      // 2. JassWiki als Bildungsorganisation — Teil des Jassverband Schweiz Ökosystems
      {
        '@type': 'EducationalOrganization',
        '@id': `${siteUrl}/#organization`,
        name: 'JassWiki.ch',
        alternateName: ['Schweizer Jass-Enzyklopädie', 'JassWiki', 'Jass Lexikon'],
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo-jasswiki.png`,
          width: 544,
          height: 544
        },
        description: 'JassWiki ist die umfassendste digitale Enzyklopädie des Schweizer Jassens — Regeln, Varianten, Geschichte, Strategie und Fachbegriffe. Ein Projekt des Jassverbands Schweiz.',
        slogan: 'Das digitale Gedächtnis der Schweizer Jass-Kultur',
        foundingDate: '2025',
        // parentOrganization: JVS ist der Träger und Herausgeber von JassWiki
        parentOrganization: {
          '@type': ['Organization', 'SportsOrganization'],
          '@id': 'https://jassverband.ch/#organization',
          name: 'Jassverband Schweiz',
          alternateName: ['JVS', 'Fédération Suisse de Jass', 'Federazione Svizzera di Jass'],
          url: 'https://jassverband.ch',
          description: 'Der Jassverband Schweiz ist der nationale Verband für das Schweizer Kartenspiel Jass. Er organisiert die Schweizer Jassmeisterschaft und fördert Jass als lebendige Tradition.',
          foundingDate: '2026-01-15',
          sameAs: [
            'https://www.wikidata.org/wiki/Q786768',
            'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html',
          ],
        },
        subjectOf: [
          {
            '@type': 'WebPage',
            name: 'Jassen - Lebendige Traditionen der Schweiz',
            url: 'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html',
            publisher: {
              '@type': 'GovernmentOrganization',
              name: 'Bundesamt für Kultur (BAK)',
              url: 'https://www.bak.admin.ch'
            },
            description: 'Offizielle Anerkennung des Jassens als immaterielles Kulturerbe der Schweiz'
          }
        ],
        knowsAbout: [
          {
            '@type': 'Thing',
            name: 'Jass',
            sameAs: 'https://www.wikidata.org/wiki/Q786768'
          },
          {
            '@type': 'Thing',
            name: 'Schieber',
            sameAs: 'https://www.wikidata.org/wiki/Q137900251'
          },
          {
            '@type': 'Thing',
            name: 'Kartenspiel',
            sameAs: 'https://www.wikidata.org/wiki/Q47883'
          },
          {
            '@type': 'Thing',
            name: 'Schweiz',
            sameAs: 'https://www.wikidata.org/wiki/Q39'
          },
          'Coiffeur',
          'Differenzler',
          'Molotow',
          'Jass-Regeln',
          'Jass-Geschichte'
        ],
        founder: [
          { '@id': `${siteUrl}/#remo-prinz` },
          { '@id': `${siteUrl}/#fabian-cadonau` }
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'general inquiries',
          email: 'remo@jasswiki.ch',
          availableLanguage: ['German', 'Swiss German']
        }
      },
      // 3. Remo Prinz - Gründer & Jass-Experte
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#remo-prinz`,
        name: 'Remo Prinz',
        givenName: 'Remo',
        familyName: 'Prinz',
        jobTitle: 'Jass-Experte & Digital Innovation',
        description: 'Schweizer Jass-Experte mit über 15 Jahren Erfahrung in der digitalen Dokumentation und Analyse von Jass-Spielen.',
        url: 'https://www.linkedin.com/in/remo-prinz-886835b/',
        sameAs: [
          'https://www.linkedin.com/in/remo-prinz-886835b/',
          'https://jassguru.ch/',
          'https://jassstatistik.ch/'
        ],
        worksFor: { '@id': `${siteUrl}/#organization` },
        knowsAbout: [
          'Jass-Statistik',
          'Digitale Jass-Plattformen',
          'Jass-Datenanalyse'
        ],
        affiliation: [
          {
            '@type': 'Organization',
            name: 'JassGuru.ch',
            url: 'https://jassguru.ch/',
            description: 'Digitale Jass-Kreidetafel mit Elo-Rating-System'
          },
          {
            '@type': 'Organization',
            name: 'JassStatistik.ch',
            url: 'https://jassstatistik.ch/',
            description: 'Erfassung und Analyse von 640+ Jass-Partien seit 2008'
          }
        ]
      },
      // 4. Fabian Cadonau - Gründer & Jass-Experte
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#fabian-cadonau`,
        name: 'Fabian Cadonau',
        givenName: 'Fabian',
        familyName: 'Cadonau',
        jobTitle: 'Jass-Experte & Event-Organisator',
        description: 'Schweizer Jass-Experte spezialisiert auf Jass-Events und Traditionsvermittlung. Gelistet bei Lebendige Traditionen der Schweiz.',
        url: 'https://trumpf-as.ch/',
        sameAs: [
          'https://trumpf-as.ch/',
          'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html'
        ],
        worksFor: { '@id': `${siteUrl}/#organization` },
        knowsAbout: [
          'Jass-Events',
          'Jass-Schulungen',
          'Traditionsvermittlung',
          'Jass-Turniere'
        ],
        affiliation: {
          '@type': 'Organization',
          name: 'Trumpf-As.ch',
          url: 'https://trumpf-as.ch/',
          description: 'Organisation von Jass-Events und Schulungen in der Schweiz'
        }
      },
      // 5. Website mit Suchfunktion
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'JassWiki.ch',
        description: 'Die Schweizer Jass-Enzyklopädie',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: ['de', 'gsw'],
        about: { '@id': `${siteUrl}/#jass-tradition` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <Head>
      <script
        id="schema-org-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

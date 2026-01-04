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
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'JassWiki',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo-jasswiki.png`,
          width: 512,
          height: 512
        },
        description: 'Die vollständige Referenz für das Schweizer Nationalspiel Jassen.'
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'JassWiki',
        description: 'Alles rund ums Jassen: Regeln, Varianten & Strategien',
        publisher: {
          '@id': `${siteUrl}/#organization`
        },
        inLanguage: 'de-CH',
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

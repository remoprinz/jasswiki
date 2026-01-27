import React from 'react';
import Head from 'next/head';

interface GameSchemaProps {
  name: string;
  description: string;
  url: string;
  wikidataId?: string;
  numberOfPlayers?: {
    min: number;
    max: number;
  };
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Game Schema Component
 * =====================
 * Generates Schema.org JSON-LD for Jass game variants.
 * 
 * Based on: https://schema.org/Game
 * Optimized for Google Rich Results
 */
export const GameSchema: React.FC<GameSchemaProps> = ({
  name,
  description,
  url,
  wikidataId,
  numberOfPlayers,
  difficulty
}) => {
  const schemaData: any = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name,
    description,
    url,
    gamePlatform: 'Kartenspiel',
    gameItem: {
      '@type': 'Thing',
      name: 'Jass-Karten',
      description: '36 Karten (Schweizer oder Französisches Blatt)'
    }
  };

  // Add Wikidata link
  if (wikidataId) {
    schemaData.sameAs = [`https://www.wikidata.org/wiki/${wikidataId}`];
  }

  // Add number of players
  if (numberOfPlayers) {
    schemaData.numberOfPlayers = {
      '@type': 'QuantitativeValue',
      minValue: numberOfPlayers.min,
      maxValue: numberOfPlayers.max
    };
  }

  // Add difficulty as audience
  if (difficulty) {
    const difficultyMap = {
      1: 'Anfänger',
      2: 'Fortgeschrittene',
      3: 'Erfahrene',
      4: 'Experten',
      5: 'Meister'
    };
    
    schemaData.audience = {
      '@type': 'PeopleAudience',
      audienceType: difficultyMap[difficulty],
      suggestedMinAge: difficulty >= 3 ? 16 : 12
    };
  }

  // Add parent game (Jass)
  schemaData.isPartOf = {
    '@type': 'Game',
    '@id': 'https://www.wikidata.org/wiki/Q786768',
    name: 'Jass',
    url: 'https://jasswiki.ch/'
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

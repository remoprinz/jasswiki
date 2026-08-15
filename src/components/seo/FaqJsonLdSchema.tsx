import React from 'react';
import { verweiseZuText } from '@/components/wissen/verweise';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqJsonLdSchemaProps {
  faqs: FaqItem[];
}

export const FaqJsonLdSchema: React.FC<FaqJsonLdSchemaProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    // Frage und Antwort gehen als reiner Satz ins Schema: die internen Marker
    // (siehe Begriff "kennung") und die Karten-Marke bleiben der Anzeige
    // vorbehalten. Bis 15.08. stand der Rohtext samt Marker im FAQPage-Schema.
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: verweiseZuText(ohneKartenMarken(faq.question)),
      acceptedAnswer: {
        '@type': 'Answer',
        text: verweiseZuText(ohneKartenMarken(faq.answer)),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

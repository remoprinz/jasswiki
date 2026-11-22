import React from 'react';
import { FaqAntwort } from '@/components/wissen/FaqSection';
import { verweiseZuText } from '@/components/wissen/verweise';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';

// Fragen einer Übersichtsseite (Rubrik oder Unterrubrik): sichtbar in der
// Form, die /regeln/ seit August trägt, dazu das FAQPage-Schema. Die Antwort
// läuft durch denselben Auflöser wie der Artikeltext (Verweise, Markdown-Links).
// Ins Schema geht der reine Satz: Marker und Markdown-Links werden zu Text.

export interface Frage {
  question: string;
  answer: string;
}

const reinerSatz = (s: string): string =>
  verweiseZuText(ohneKartenMarken(s))
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');

export function faqSchema(fragen: Frage[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: fragen.map((f) => ({
      '@type': 'Question',
      name: reinerSatz(f.question),
      acceptedAnswer: { '@type': 'Answer', text: reinerSatz(f.answer) },
    })),
  };
}

export const RubrikFragen: React.FC<{ fragen: Frage[] | null | undefined; titel?: string }> = ({
  fragen,
  titel = 'Häufige Fragen',
}) => {
  if (!fragen || fragen.length === 0) return null;
  return (
    <div className="pt-8 border-t border-[#f0eee7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(fragen)) }} />
      <h2 className="font-capita text-[22px] sm:text-[28px] font-bold text-black mb-[16px] leading-[1.2]">
        {titel}
      </h2>
      <div className="space-y-[16px]">
        {fragen.map((faq, i) => (
          <div key={i}>
            <h3 className="font-capita text-[16px] sm:text-[18px] font-bold text-black mb-[4px] leading-[1.3]">
              {faq.question}
            </h3>
            <div className="font-inter text-[14px] sm:text-[16px] text-[#88816d] leading-[1.5]">
              <FaqAntwort text={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RubrikFragen;

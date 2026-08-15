import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { verweiseZuLinks } from '@/components/wissen/verweise';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Die Antwort läuft durch denselben Auflöser wie der Fliesstext: aus
 * (siehe Begriff "kennung") wird ein Link auf den Artikel der Kennung.
 * Farben wie im Artikel (.content-formatting a): #274823, im Überfahren #2bb752.
 */
const FaqAntwort: React.FC<{ text: string }> = ({ text }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      p: ({ children }) => <p className="m-0 mb-[8px] last:mb-0">{children}</p>,
      // `node` bleibt hier: sonst schreibt es ReactMarkdown als Attribut
      // node="[object Object]" ins HTML.
      a: ({ node, href, children, ...props }) =>
        href?.startsWith('http') ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#274823] underline hover:text-[#2bb752]"
            {...props}
          >
            {children}
          </a>
        ) : (
          <Link href={href || '#'} className="text-[#274823] underline hover:text-[#2bb752]">
            {children}
          </Link>
        ),
    }}
  >
    {verweiseZuLinks(ohneKartenMarken(text))}
  </ReactMarkdown>
);

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ 
  faqs, 
  title = "Häufig gestellte Fragen" 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-[24px] pt-[24px] border-t border-[#f0eee7]" aria-labelledby="faq-heading">
      <div className="mb-[12px]">
        <h2 id="faq-heading" className="font-capita text-[20px] font-normal !text-black leading-[1.55]">
          {title}
        </h2>
      </div>

      <div className="flex flex-col gap-[12px]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`rounded-[8px] overflow-hidden ${
                isOpen
                  ? 'bg-[#f0eee7] min-h-[108px]'
                  : 'bg-[#f0eee7]/50 border border-white min-h-[60px]'
              }`}
            >
              <h3 className="m-0 p-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full flex items-center justify-between px-[16px] py-[16px] text-left hover:bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-wiki-green/30 focus:ring-inset ${
                    isOpen ? 'rounded-t-[8px]' : 'rounded-[8px]'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={`font-capita text-[20px] font-bold pr-[16px] leading-[1.4] ${isOpen ? 'text-[#ff0000]' : 'text-black'}`}>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-black flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black flex-shrink-0" />
                  )}
                </button>
              </h3>

              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-[16px] pb-[16px] pt-[8px] text-[#000000] font-inter text-[16px] leading-[1.5]">
                  <FaqAntwort text={faq.answer} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
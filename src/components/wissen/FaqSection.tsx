import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ 
  faqs, 
  title = "Häufig gestellte Fragen" 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Erste FAQ standardmässig offen

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-10 pt-8 border-t border-gray-700" aria-labelledby="faq-heading">
      <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-6 sm:p-8 border border-gray-700">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-600/20 rounded-lg">
            <HelpCircle className="w-6 h-6 text-green-400" />
          </div>
          <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-base sm:text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Answer */}
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4 pt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint for SEO */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Haben Sie weitere Fragen? Nutzen Sie unseren{' '}
          <a href="/gpt" className="text-green-400 hover:text-green-300 underline">
            JassWiki Chat
          </a>
          .
        </p>
      </div>
    </section>
  );
};

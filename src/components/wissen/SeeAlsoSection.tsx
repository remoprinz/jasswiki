import React from 'react';
import Link from 'next/link';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { buildArticleUrl } from '@/lib/url-utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';

interface SeeAlsoSectionProps {
  seeAlsoIds: string[];
  currentArticleId?: string;
}

/**
 * Komponente, die "Siehe auch"-Links prominent anzeigt
 * Nutzt die see_also IDs aus dem JSON-Content
 */
export const SeeAlsoSection: React.FC<SeeAlsoSectionProps> = ({
  seeAlsoIds,
  currentArticleId,
}) => {
  if (!seeAlsoIds || seeAlsoIds.length === 0) {
    return null;
  }

  // Finde die Artikel basierend auf den IDs
  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  const seeAlsoArticles = seeAlsoIds
    .map(id => {
      // Entferne Präfixe wie "expressions_" oder "general_"
      const cleanId = id.toLowerCase().replace(/^(expressions_|general_)/, '');
      
      // Suche nach exakter ID oder ähnlichem Begriff
      const article = items.find(item => {
        const itemId = item.id.toLowerCase();
        const itemTopic = item.metadata.category.topic.toLowerCase();
        const itemKeywords = item.metadata.keywords.map(k => k.toLowerCase());
        
        return (
          itemId === id.toLowerCase() ||
          itemId === cleanId ||
          itemTopic === cleanId ||
          itemKeywords.includes(cleanId) ||
          itemKeywords.some(k => k.includes(cleanId)) ||
          cleanId.includes(itemId)
        );
      });

      if (!article || article.id === currentArticleId) {
        return null;
      }

      // Erstelle URL (zentrale Funktion für konsistente URLs)
      const url = buildArticleUrl(article.metadata.category);

      return {
        id: article.id,
        title: article.metadata.category.topic,
        category: article.metadata.category.main,
        url,
      };
    })
    .filter((article): article is NonNullable<typeof article> => article !== null);

  if (seeAlsoArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Siehe auch
        </h3>
        <div className="flex-1 h-px bg-gray-700"></div>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {seeAlsoArticles.map((article) => (
          <Link
            key={article.id}
            href={article.url}
            className="group block"
          >
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg hover:border-green-500 hover:bg-gray-800 transition-all duration-300 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-green-400 mb-1 font-medium uppercase tracking-wide">
                    {article.category}
                  </div>
                  <h4 className="text-base font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};























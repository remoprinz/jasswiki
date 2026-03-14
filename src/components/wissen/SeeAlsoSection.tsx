import React from 'react';
import Link from 'next/link';
import { buildArticleUrl } from '@/lib/url-utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';

interface SeeAlsoSectionProps {
  seeAlsoIds: string[];
  currentArticleId?: string;
}

export const SeeAlsoSection: React.FC<SeeAlsoSectionProps> = ({
  seeAlsoIds,
  currentArticleId,
}) => {
  if (!seeAlsoIds || seeAlsoIds.length === 0) {
    return null;
  }

  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  const seeAlsoArticles = seeAlsoIds
    .map(id => {
      const cleanId = id.toLowerCase().replace(/^(expressions_|general_)/, '');
      
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

      const url = buildArticleUrl(article.metadata.category);

      return {
        id: article.id,
        title: article.metadata.category.topic,
        category: article.metadata.category.main,
        url,
      };
    })
    .filter((article): article is NonNullable<typeof article> => article !== null)
    .filter((article, index, self) => self.findIndex(a => a.id === article.id) === index);

  if (seeAlsoArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-[24px] pt-[24px] border-t border-[#f0eee7]">
      <h3 className="font-capita text-[20px] font-normal !text-black leading-[1.55] mb-[16px]">
        Siehe auch
      </h3>
      
      <div className="grid gap-[10px] grid-cols-1">
        {seeAlsoArticles.map((article) => (
          <Link
            key={article.id}
            href={article.url}
            className="group block"
          >
            <div className="flex items-center justify-between gap-[12px] bg-[#f0eee7]/50 rounded-[12px] px-[16px] py-[12px] hover:bg-[#f0eee7] transition-colors">
              <h4 className="font-capita text-[17px] font-bold !text-black leading-[1.3] group-hover:!text-[#ff0000] transition-colors line-clamp-1">
                {article.title}
              </h4>
              <span className="flex-shrink-0 px-[8px] py-[3px] bg-[#274823]/10 text-[#274823] text-[11px] font-inter font-medium tracking-wide uppercase rounded-full">
                {article.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
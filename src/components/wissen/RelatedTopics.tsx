import React from 'react';
import Link from 'next/link';
import { buildArticleUrl } from '@/lib/url-utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';

interface RelatedTopicsProps {
  currentArticleId: string;
  currentCategory: string;
  currentKeywords: string[];
  maxResults?: number;
}

interface RelatedArticle {
  id: string;
  title: string;
  category: string;
  url: string;
  relevanceScore: number;
}

export const RelatedTopics: React.FC<RelatedTopicsProps> = ({
  currentArticleId,
  currentCategory,
  currentKeywords,
  maxResults = 4
}) => {
  const findRelatedArticles = (): RelatedArticle[] => {
    const content: JassContentRecord = allContent;
    const items = Object.values(content) as JassContentItem[];
    
    const relatedArticles: RelatedArticle[] = items
      .filter(item => item.id !== currentArticleId)
      .map(item => {
        let relevanceScore = 0;
        
        if (item.metadata.category.main === currentCategory) {
          relevanceScore += 50;
        }
        
        const commonKeywords = item.metadata.keywords.filter(keyword =>
          currentKeywords.includes(keyword)
        );
        relevanceScore += commonKeywords.length * 10;
        
        if (relevanceScore === 0) return null;
        
        const url = buildArticleUrl(item.metadata.category);
        
        return {
          id: item.id,
          title: item.metadata.category.topic,
          category: item.metadata.category.main,
          url,
          relevanceScore
        };
      })
      .filter((article): article is RelatedArticle => article !== null)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults);
    
    return relatedArticles;
  };

  const relatedArticles = findRelatedArticles();

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-[24px] pt-[24px] border-t border-[#f0eee7]">
      <h3 className="font-capita text-[20px] font-bold !text-black leading-[1.55] mb-[16px]">
        Das könnte dich auch interessieren
      </h3>
      
      <div className="grid gap-[10px] grid-cols-1">
        {relatedArticles.map((article) => (
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
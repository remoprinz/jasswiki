import React from 'react';
import Link from 'next/link';
import { buildArticleUrl, toSlug } from '@/lib/url-utils';
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
  const getTagStyle = (category: string) => {
    const slug = toSlug(category);
    const colors: Record<string, string> = {
      'regeln': '#ff0000',
      'weis-regeln': '#ff7a1a',
      'geschichte': '#f6b21a',
      'grundlagen-kultur': '#2bb752',
      'schieber': '#3b82f6',
      'begriffe': '#6366f1',
      'varianten': '#a855f7',
      'jassapps': '#06b6d4',
      'referenzen': '#6b7280',
    };
    const color = colors[slug] || '#274823';
    return { borderColor: color, color };
  };

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
              <span className="jw-article-tag flex-shrink-0" style={getTagStyle(article.category)}>
                {article.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
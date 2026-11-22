import React from 'react';
import Link from 'next/link';
import { artikelAdresse, toSlug } from '@/lib/url-utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { etikettenVon } from '@/lib/gliederung';

interface SeeAlsoSectionProps {
  seeAlsoIds: string[];
  currentArticleId?: string;
}

export const SeeAlsoSection: React.FC<SeeAlsoSectionProps> = ({
  seeAlsoIds,
  currentArticleId,
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

  if (!seeAlsoIds || seeAlsoIds.length === 0) {
    return null;
  }

  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  const seeAlsoArticles = seeAlsoIds
    .map(id => {
      // DIE KENNUNG ENTSCHEIDET DAS ZIEL, wie in verweise.ts (SCHIEDSRICHTER, 22.11.2026).
      // Die frühere Suche über Stichwörter nahm den ersten Treffer in der Reihenfolge
      // der Datei: 253 von 894 Verweisen zeigten einen anderen Artikel als geschrieben
      // (Fund A1), etwa «Tutti» statt «Trumpf» im Artikel Nell.
      const article =
        content[id] ?? items.find(item => item.id.toLowerCase() === id.toLowerCase());

      if (!article || article.id === currentArticleId) {
        return null;
      }

      const url = artikelAdresse(article);

      return {
        id: article.id,
        title: article.metadata.category.topic,
        category: etikettenVon(article.id, article.metadata.category.main).rubrik,
        url,
      };
    })
    .filter((article): article is NonNullable<typeof article> => article !== null)
    .filter((article, index, self) => self.findIndex(a => a.id === article.id) === index);

  if (seeAlsoArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-[24px] pt-[24px] border-t border-[#f0eee7]" data-siehe-auch="">
      <h3 className="font-capita text-[20px] font-normal !text-black leading-[1.55] mb-[16px]">
        Siehe auch
      </h3>
      
      <div className="grid gap-[10px] grid-cols-1">
        {seeAlsoArticles.map((article) => (
          <Link
            key={article.id}
            href={article.url}
            data-artikel={article.id}
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
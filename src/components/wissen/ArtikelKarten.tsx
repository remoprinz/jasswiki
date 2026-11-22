import React from 'react';
import Link from 'next/link';
import type { JassContentItem } from '@/types/jass-lexikon';
import { artikelAdresse } from '@/lib/url-utils';
import { vorschauText } from '@/components/wissen/vorschau';

/** Was eine Liste von einem Artikel braucht. Klein genug für die Seitendaten. */
export interface ArtikelStub {
  id: string;
  titel: string;
  href: string;
  vorschau: string;
}

export const artikelStub = (a: JassContentItem): ArtikelStub => ({
  id: a.id,
  titel: a.metadata.category.topic,
  href: artikelAdresse(a),
  vorschau: vorschauText(a.text),
});

/** Eine Karte je Artikel: Titel, zwei Zeilen Vorschau, Pfeil (wie die Listen bisher). */
export const ArtikelKarte: React.FC<{ artikel: ArtikelStub }> = ({ artikel }) => (
  <Link href={artikel.href} className="group block">
    <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[16px] py-[12px] sm:py-[14px]">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] mb-[6px]">
            {artikel.titel}
          </h3>
          <p className="font-inter text-[13px] text-[#88816d] line-clamp-2 leading-[1.5]">{artikel.vorschau}...</p>
        </div>
        <div className="flex-shrink-0 text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

export const ArtikelKarten: React.FC<{ artikel: ArtikelStub[] }> = ({ artikel }) => (
  <div className="grid gap-4 sm:gap-5">
    {artikel.map((a, i) => (
      <ArtikelKarte key={`${a.id}-${i}`} artikel={a} />
    ))}
  </div>
);

/** Kapitelkarte auf einer Rubrikseite: Name, Zahl, Satz, Pfeil (wie die Unterrubriken bisher). */
export const KapitelKarte: React.FC<{ name: string; href: string; anzahl: number }> = ({ name, href, anzahl }) => (
  <Link href={href} className="group block">
    <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[20px] py-[14px] sm:py-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-[12px] mb-[6px]">
            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] pr-2">
              {name}
            </h3>
            <span className="jw-count-tag flex-shrink-0 self-start">{anzahl} Artikel</span>
          </div>
          <p className="font-inter text-[13px] text-[#88816d] leading-[1.5]">Alle Artikel über {name} im Detail</p>
        </div>
        <div className="ml-4 text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

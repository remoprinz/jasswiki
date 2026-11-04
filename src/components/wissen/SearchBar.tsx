import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { ZeichenSuchen } from '@/components/layout/JassWikiZeichen';
import { buildArticleUrl, toSlug } from '@/lib/url-utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { ALL_CARDS } from './jasskarten';
import { ohneKartenMarken } from './kartenMarke';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  url: string;
  snippet: string;
}

// Eigenständige Meta-/Übersichtsseiten (keine Artikel im Content) — damit sie
// trotzdem über die Suchleiste auffindbar sind (z. B. "taxonomie").
const META_PAGES: SearchResult[] = [
  {
    id: 'meta-taxonomie',
    title: 'Taxonomie',
    category: 'Referenzen',
    url: '/taxonomie/',
    snippet: 'Die vollständige Jass-Taxonomie: Begriffe, Varianten, Kartensysteme und Punktesystem mit Wikidata-Bezug.',
  },
  {
    id: 'meta-referenzen',
    title: 'Referenzen',
    category: 'Referenzen',
    url: '/referenzen/',
    snippet: 'Quellen, Literatur und Referenzen, auf denen die JassWiki-Inhalte beruhen.',
  },
  {
    id: 'meta-quellen',
    title: 'Quellenverzeichnis',
    category: 'Referenzen',
    url: '/quellenverzeichnis/',
    snippet: 'Verzeichnis aller im JassWiki verwendeten Quellen.',
  },
];

/** kopf: «Suche · klein» im Kopf Desktop, Figma 2280:1971. telefon: «Suche», Figma 2299:3346. */
export const SearchBar: React.FC<{
  variante: 'kopf' | 'telefon';
  eingabeRef?: React.RefObject<HTMLInputElement | null>;
}> = ({ variante, eingabeRef }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const eigeneEingabe = useRef<HTMLInputElement | null>(null);
  const eingabe = eingabeRef ?? eigeneEingabe;

  // Taste / öffnet die Suche im Kopf (Figma: Beschreibung von 2280:2000).
  useEffect(() => {
    if (variante !== 'kopf') return;
    const taste = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const ziel = e.target as HTMLElement | null;
      if (ziel?.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      eingabe.current?.focus();
    };
    document.addEventListener('keydown', taste);
    return () => document.removeEventListener('keydown', taste);
  }, [variante, eingabe]);

  const closeSearch = () => {
    setIsOpen(false);
    setIsFocused(false);
    setQuery('');
    setResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSearch();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncDesktopState = () => setIsDesktop(mediaQuery.matches);

    syncDesktopState();
    mediaQuery.addEventListener('change', syncDesktopState);
    return () => mediaQuery.removeEventListener('change', syncDesktopState);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const content: JassContentRecord = allContent;
    const items = Object.values(content) as JassContentItem[];
    
    const searchResults: SearchResult[] = items
      .map((item) => {
        const title = item.metadata.category.topic.toLowerCase();
        const category = item.metadata.category.main.toLowerCase();
        const keywords = item.metadata.keywords.join(' ').toLowerCase();
        const text = item.text.toLowerCase();
        
        let score = 0;
        if (title === searchQuery) score += 100;
        else if (title.includes(searchQuery)) score += 50;
        if (category.includes(searchQuery)) score += 20;
        if (keywords.includes(searchQuery)) score += 10;
        if (text.includes(searchQuery)) score += 5;
        
        if (score === 0) return null;
        
        const url = buildArticleUrl(item.metadata.category);
        const textSnippet = ohneKartenMarken(item.text).substring(0, 150).replace(/\n/g, ' ');
        
        return {
          id: item.id,
          title: item.metadata.category.topic,
          category: item.metadata.category.main,
          url,
          snippet: textSnippet,
          score
        };
      })
      .filter((result): result is SearchResult & { score: number } => result !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, ...result }) => result);

    // Karten-Treffer: einzelne Jasskarten (z. B. "rosen ass") direkt zur Karte navigieren
    const kfEntry = content['expressions_kartenfarben'];
    const kfUrl = kfEntry
      ? buildArticleUrl(kfEntry.metadata.category)
      : '/grundlagen-kultur/jasskarten/';
    const cardResults: SearchResult[] = ALL_CARDS
      .filter((c) => c.searchTerms.some((t) => t.toLowerCase().includes(searchQuery)))
      .slice(0, 6)
      .map((c) => ({
        id: `card-${c.slug}`,
        title: c.name,
        category: 'Jasskarten',
        url: `${kfUrl}#${c.slug}`,
        snippet: `${c.name} – ${c.systemLabel}. Direkt zur Karte.`,
      }));

    // Meta-/Übersichtsseiten (Taxonomie, Referenzen, Quellen) zuerst, wenn sie passen.
    const metaResults: SearchResult[] = META_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.snippet.toLowerCase().includes(searchQuery) ||
        p.url.includes(searchQuery)
    );

    // Artikel zuerst (das sind echte Seiten), dann einzelne Karten-Anker.
    setResults([...metaResults, ...searchResults, ...cardResults]);
    setIsOpen(true);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const shownResults = results.slice(0, 8);
  const showDesktopOverlay = isDesktop && isOpen && query.length >= 2;
  const useActiveInputStyle = showDesktopOverlay || isFocused;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (showDesktopOverlay) {
      document.body.classList.add('jw-search-active');
    } else {
      document.body.classList.remove('jw-search-active');
    }
    return () => {
      document.body.classList.remove('jw-search-active');
    };
  }, [showDesktopOverlay]);

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

  return (
    <div ref={searchRef} className="relative w-full">
      <div className={`jw-suche jw-suche-${variante}${useActiveInputStyle ? ' ist-aktiv' : ''}`}>
        <span className="jw-suche-zeichen">
          <ZeichenSuchen groesse={variante === 'kopf' ? 12 : 11} />
        </span>
        <input
          ref={eingabe}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={variante === 'kopf' ? 'Suchen …' : 'Suche nach Begriffen, Regeln …'}
          aria-label="Suchen"
          className="jw-suche-eingabe"
        />
        {query ? (
          <button type="button" onClick={handleClear} className="jw-suche-leeren" aria-label="Suche leeren">
            <X className="w-4 h-4" />
          </button>
        ) : (
          variante === 'kopf' && !isFocused && <kbd className="jw-suche-taste">/</kbd>
        )}
      </div>

      {/* Treffer Desktop: unter dem Feld, rechtsbündig, 550 breit. */}
      {variante === 'kopf' && showDesktopOverlay && (
          <div className="hidden lg:block absolute right-0 top-[48px] w-[550px] h-[528px] bg-white border border-[#f0eee7] rounded-[12px] z-[50] overflow-hidden">
            <div className="absolute left-[16px] top-[13px] w-[506px] text-[14px] leading-[1.55] font-inter font-normal text-[#88816d]">
              {results.length} {results.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
            </div>
            <div className="absolute left-[16px] top-[48px] w-[519px] border-t border-[#f0eee7]" />

            {results.length > 0 && (
              <div className="absolute inset-x-0 top-[49px] bottom-0 overflow-y-auto">
                {shownResults.map((result, index) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    onMouseEnter={() => setHoveredId(result.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="block px-[15px] pt-[13px] pb-[13px] transition-colors"
                    style={{ backgroundColor: hoveredId === result.id ? '#f0eee7' : 'white' }}
                  >
                    <span className="jw-article-tag mb-[5px]" style={getTagStyle(result.category)}>
                      {result.category}
                    </span>
                    <div
                      className="text-[20px] leading-[1.2] font-capita font-bold transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ color: hoveredId === result.id ? '#ff0000' : '#000000' }}
                    >
                      {result.title}
                    </div>
                    <div className="mt-[6px] text-[13px] leading-[1.5] font-inter font-normal text-[#88816d] line-clamp-2">
                      {result.snippet}...
                    </div>
                    {index < shownResults.length - 1 && <div className="mt-[12px] border-t border-[#f0eee7]" />}
                  </Link>
                ))}
              </div>
            )}

            {results.length === 0 && (
              <div className="absolute left-[16px] top-[78px] w-[506px]">
                <div className="text-[12px] leading-[1.3333] tracking-[0.3px] uppercase font-inter font-normal text-black">
                  Keine Treffer
                </div>
                <p className="mt-[8px] text-[14px] leading-[1.55] font-inter text-black">
                  Versuche es mit anderen Begriffen oder durchsuche die Kategorien.
                </p>
              </div>
            )}
          </div>
      )}

      {/* Mobile/Tablet Dropdown */}
      {variante === 'telefon' && !isDesktop && isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-wiki-sand/50 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-[12px] text-wiki-muted px-3 py-2 font-inter font-medium tracking-wide uppercase">
              {results.length} {results.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
            </div>
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="block px-3 py-3 hover:bg-wiki-cream rounded-lg transition-colors"
              >
                <div className="font-capita font-bold text-[16px] text-black mb-0.5">{result.title}</div>
                <div className="mb-1">
                  <span className="jw-article-tag" style={getTagStyle(result.category)}>
                    {result.category}
                  </span>
                </div>
                <div className="text-[13px] text-wiki-muted font-inter line-clamp-2 leading-relaxed">
                  {result.snippet}...
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {variante === 'telefon' && !isDesktop && isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-wiki-sand/50 rounded-xl shadow-2xl p-6 text-center">
          <Search className="w-10 h-10 text-wiki-sand mx-auto mb-3" />
          <p className="text-black font-capita font-bold mb-1">Keine Ergebnisse</p>
          <p className="text-[13px] text-wiki-muted font-inter">
            Versuche es mit anderen Begriffen oder durchsuche die Kategorien
          </p>
        </div>
      )}
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import { SeoHead } from '@/components/layout/SeoHead';
import { ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';

// ============================================================================
// IMPORT FROM SINGLE SOURCE OF TRUTH
// ============================================================================
import { 
  JASS_TAXONOMY, 
  TAXONOMY_METADATA,
  WIKIDATA,
  getTaxonomyStats,
  getAllTermsWithWikidata,
  type TaxonomyCategory,
} from '@/data/jass-taxonomy';

// ============================================================================
// JSON-LD SCHEMA GENERATION
// ============================================================================

const SITE_URL = 'https://jasswiki.ch';

function generateTaxonomyJsonLd() {
  const termsWithWikidata = getAllTermsWithWikidata();
  
  return {
    '@context': {
      '@vocab': 'https://schema.org/',
      'skos': 'http://www.w3.org/2004/02/skos/core#',
      'wd': 'https://www.wikidata.org/entity/',
      'broader': { '@id': 'skos:broader', '@type': '@id' },
    },
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/taxonomie/`,
    'name': TAXONOMY_METADATA.name,
    'description': TAXONOMY_METADATA.description,
    'version': TAXONOMY_METADATA.version,
    'dateModified': TAXONOMY_METADATA.lastUpdated,
    'license': TAXONOMY_METADATA.license,
    'inLanguage': 'de-CH',
    'publisher': {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      'name': 'JassWiki.ch',
      'url': SITE_URL,
    },
    'sameAs': TAXONOMY_METADATA.sameAs,
    'mainEntity': {
      '@type': 'Thing',
      '@id': `https://www.wikidata.org/wiki/${WIKIDATA.JASS}`,
      'name': 'Jass',
      'description': 'Traditionelles Schweizer Kartenspiel und immaterielles Kulturerbe',
    },
    'hasDefinedTerm': termsWithWikidata.map(term => ({
      '@type': 'DefinedTerm',
      '@id': term.link ? `${SITE_URL}${term.link}` : `${SITE_URL}/taxonomie/#${term.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      'name': term.name,
      'description': term.description,
      'termCode': term.wikidataId,
      'sameAs': `https://www.wikidata.org/wiki/${term.wikidataId}`,
      'inDefinedTermSet': `${SITE_URL}/taxonomie/`,
      ...(term.subclassOf && { 'broader': `https://www.wikidata.org/wiki/${term.subclassOf}` }),
      ...(term.link && { 'url': `${SITE_URL}${term.link}` }),
    })),
  };
}

// ============================================================================
// KOMPONENTEN
// ============================================================================

const CategorySection: React.FC<{ category: TaxonomyCategory }> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] overflow-hidden mb-6">
      {/* Header */}
      <div 
        className="bg-[#f0eee7] p-4 cursor-pointer flex items-center justify-between hover:bg-[#e8e6df] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="!font-capita text-[24px] sm:text-[28px] !font-bold !text-black leading-[1.2]">
              {category.name}
            </h2>
            {category.wikidataId && (
              <a 
                href={`https://www.wikidata.org/wiki/${category.wikidataId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-[#274823]/10 text-[#274823] rounded text-xs font-bold hover:bg-[#274823]/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {category.wikidataId}
              </a>
            )}
          </div>
          <p className="text-sm text-[#5f5b53] mt-1">{category.description}</p>
        </div>
        <span className="text-[#6b6b6b] ml-2">
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </span>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white">
          {category.subcategories.map((sub, subIdx) => (
            <div key={subIdx} className="border-l-2 border-[#d5d0c6] pl-4">
              <h3 className="!font-capita text-[22px] sm:text-[24px] !font-bold !text-[#ff0000] mb-1 leading-[1.2]">
                {sub.name}
              </h3>
              {sub.description && (
                <p className="text-sm text-[#5f5b53] mb-3">{sub.description}</p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e8e6df]">
                      <th className="text-left py-2 px-2 text-sm font-semibold text-black">Begriff</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-black hidden sm:table-cell">Beschreibung</th>
                      <th className="text-center py-2 px-2 text-sm font-semibold text-black w-28">Wikidata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sub.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="border-b border-[#f0eee7] hover:bg-[#f8f7f3] transition-colors">
                        <td className="py-2 px-2 text-black font-medium">
                          {item.link ? (
                            <a href={item.link} className="text-[#274823] hover:text-[#ff0000] underline transition-colors">
                              {item.name}
                            </a>
                          ) : (
                            item.name
                          )}
                        </td>
                        <td className="py-2 px-2 text-[#5f5b53] text-sm hidden sm:table-cell">{item.description}</td>
                        <td className="py-2 px-2 text-center">
                          {item.wikidataId ? (
                            <a 
                              href={`https://www.wikidata.org/wiki/${item.wikidataId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#274823] hover:text-[#ff0000] text-xs font-mono transition-colors"
                            >
                              {item.wikidataId}
                            </a>
                          ) : (
                            <span className="text-[#9a9588]">–</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// HAUPTKOMPONENTE
// ============================================================================

const TaxonomiePage = () => {
  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Taxonomie', href: '/taxonomie/' }
  ];

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  // Statistiken aus Single Source of Truth
  const stats = getTaxonomyStats();
  
  // JSON-LD für Inline-Embedding
  const taxonomyJsonLd = generateTaxonomyJsonLd();

  return (
    <>
      <SeoHead
        title="Taxonomie des Jassens: Die vollständige Struktur | Jass-Wiki"
        description={`Die perfekte Taxonomie des Schweizer Jass: ${stats.totalTerms} Begriffe, ${stats.termsWithWikidata} mit Wikidata verknüpft. Spielarten, Spielmodi, Karten, Punktesystem – strukturiert für das Semantic Web.`}
      />
      
      {/* JSON-LD Schema für Suchmaschinen & KIs */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(taxonomyJsonLd) }}
        />
        {/* Link zur statischen JSON-LD Datei */}
        <link rel="alternate" type="application/ld+json" href="/dataset/taxonomie.jsonld" />
      </Head>
      
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4">
              Taxonomie des Jassens
            </h1>
            <p className="text-lg sm:text-xl text-black leading-relaxed max-w-2xl">
              Die systematische Ordnung aller Jass-Begriffe
            </p>
            <p className="text-sm text-[#5f5b53] mt-2">
              Version {TAXONOMY_METADATA.version} • Stand: {TAXONOMY_METADATA.lastUpdated}
            </p>
          </div>

          {/* Statistiken */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4 text-center">
            <div className="text-3xl font-bold text-[#ff0000]">{stats.totalTerms}</div>
            <div className="text-black text-sm">Begriffe gesamt</div>
            </div>
            <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4 text-center">
            <div className="text-3xl font-bold text-[#ff0000]">{stats.categories}</div>
            <div className="text-black text-sm">Hauptkategorien</div>
            </div>
            <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4 text-center">
              <div className="text-3xl font-bold text-[#274823]">{stats.termsWithWikidata}</div>
              <div className="text-black text-sm">Mit Wikidata-ID</div>
            </div>
            <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4 text-center">
              <div className="text-3xl font-bold text-[#274823]">{stats.wikidataCoverage}%</div>
              <div className="text-black text-sm">Wikidata-Abdeckung</div>
            </div>
          </div>

          {/* Maschinenlesbare Daten Hinweis */}
          <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4">
            <h3 className="!text-black text-lg font-bold mb-2">Maschinenlesbare Daten</h3>
            <p className="text-black text-sm mb-3">
              Diese Taxonomie ist als strukturierte Daten verfügbar für Suchmaschinen, KI-Agenten und das Semantic Web:
            </p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="/dataset/taxonomie.jsonld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#274823] text-white rounded-lg hover:brightness-110 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                JSON-LD (Schema.org)
              </a>
              <a 
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[#5f5b53] rounded-lg hover:bg-[#f0eee7] hover:text-black transition-colors text-sm font-medium border border-[#e8e6df]"
              >
                <ExternalLink className="w-4 h-4" />
                llms.txt (AI-Access)
              </a>
              <a 
                href="/dataset/jasswiki-corpus.jsonl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[#5f5b53] rounded-lg hover:bg-[#f0eee7] hover:text-black transition-colors text-sm font-medium border border-[#e8e6df]"
              >
                <ExternalLink className="w-4 h-4" />
                Training Corpus (JSONL)
              </a>
            </div>
          </div>

          {/* Hauptstruktur Navigation */}
          <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-4 mb-6">
            <h2 className="!text-black text-lg font-bold mb-3">Die {stats.categories} Hauptkategorien</h2>
            <div className="flex flex-wrap gap-2">
              {JASS_TAXONOMY.map((cat) => (
                <a 
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1 bg-white border border-[#e8e6df] text-black rounded-lg hover:bg-[#f0eee7] transition-colors text-sm"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Taxonomie-Kategorien */}
          {JASS_TAXONOMY.map((category) => (
            <div key={category.id} id={category.id}>
              <CategorySection category={category} />
            </div>
          ))}

          {/* Wikidata-Referenz */}
          <div className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-6">
            <h3 className="!text-black text-xl font-bold mb-3">Wikidata-Verknüpfung</h3>
            <p className="text-black mb-4">
              Diese Taxonomie ist mit Wikidata verknüpft, um eine systematische Strukturierung der Jass-Begriffe im Semantic Web zu ermöglichen.
              JassWiki.ch ist als Referenzquelle im <a href="https://de.wikipedia.org/wiki/Jass" target="_blank" rel="noopener noreferrer" className="underline text-[#274823] hover:text-[#ff0000]">Wikipedia-Artikel Jass</a> verlinkt.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href={`https://www.wikidata.org/wiki/${WIKIDATA.JASS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#274823] rounded-lg border border-[#e8e6df] hover:bg-[#f0eee7] transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Jass ({WIKIDATA.JASS})
              </a>
              <a 
                href={`https://www.wikidata.org/wiki/${WIKIDATA.JASS_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#274823] rounded-lg border border-[#e8e6df] hover:bg-[#f0eee7] transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Jass contract ({WIKIDATA.JASS_CONTRACT})
              </a>
              <a 
                href="https://www.wikidata.org/wiki/Q137727247"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#274823] rounded-lg border border-[#e8e6df] hover:bg-[#f0eee7] transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Schieber (Q137727247)
              </a>
            </div>
          </div>

          {/* Quellen */}
          <div className="bg-[#f0eee7] border border-[#f0eee7] rounded-xl p-4">
            <h3 className="text-lg font-bold text-black mb-3">Quellen</h3>
            <ul className="text-black text-sm space-y-1">
              <li>• Schweizerisches Idiotikon, Band III, Sp. 69 f.</li>
              <li>• <a href="https://de.wikipedia.org/wiki/Jass" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#2bb752]">Wikipedia: Jass</a> (JassWiki.ch als Einzelnachweis)</li>
              <li>• <a href="https://jasswiki.ch" className="text-[#274823] hover:text-[#2bb752]">Jasswiki.ch</a> – 257 Artikel</li>
              <li>• <a href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#2bb752]">Lebendige Traditionen der Schweiz (BAK)</a></li>
              <li>• Expertenbericht: &ldquo;Jass-Ontologie &amp; Gap-Analyse&rdquo; (2026)</li>
            </ul>
          </div>

          {/* Zurück */}
          <div className="text-center pt-8 border-t border-[#f0eee7]">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors font-medium border border-[#f0eee7]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </LexikonLayout>
    </>
  );
};

export default TaxonomiePage;

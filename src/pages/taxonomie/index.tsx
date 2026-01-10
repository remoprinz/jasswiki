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
  type TaxonomyTerm,
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
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mb-6">
      {/* Header */}
      <div 
        className="bg-gray-900 p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-white">{category.name}</h2>
            {category.wikidataId && (
              <a 
                href={`https://www.wikidata.org/wiki/${category.wikidataId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-500"
                onClick={(e) => e.stopPropagation()}
              >
                {category.wikidataId}
              </a>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{category.description}</p>
        </div>
        <span className="text-gray-400 ml-2">
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </span>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {category.subcategories.map((sub, subIdx) => (
            <div key={subIdx} className="border-l-2 border-green-600 pl-4">
              <h3 className="text-lg font-semibold text-green-400 mb-1">{sub.name}</h3>
              {sub.description && (
                <p className="text-sm text-gray-500 mb-3">{sub.description}</p>
              )}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-300">Begriff</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-300 hidden sm:table-cell">Beschreibung</th>
                      <th className="text-center py-2 px-2 text-sm font-semibold text-gray-300 w-28">Wikidata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sub.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-2 px-2 text-white font-medium">
                          {item.link ? (
                            <a href={item.link} className="text-green-400 hover:text-green-300 underline">
                              {item.name}
                            </a>
                          ) : (
                            item.name
                          )}
                        </td>
                        <td className="py-2 px-2 text-gray-400 text-sm hidden sm:table-cell">{item.description}</td>
                        <td className="py-2 px-2 text-center">
                          {item.wikidataId ? (
                            <a 
                              href={`https://www.wikidata.org/wiki/${item.wikidataId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-green-300 text-xs font-mono"
                            >
                              {item.wikidataId}
                            </a>
                          ) : (
                            <span className="text-gray-500">–</span>
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
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Taxonomie des Jassens
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Die systematische Ordnung aller Jass-Begriffe
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Version {TAXONOMY_METADATA.version} • Stand: {TAXONOMY_METADATA.lastUpdated}
            </p>
          </div>

          {/* Statistiken */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.totalTerms}</div>
              <div className="text-gray-300 text-sm">Begriffe gesamt</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{stats.categories}</div>
              <div className="text-gray-300 text-sm">Hauptkategorien</div>
            </div>
            <div className="bg-green-600/20 border border-green-600 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{stats.termsWithWikidata}</div>
              <div className="text-green-200 text-sm">Mit Wikidata-ID</div>
            </div>
            <div className="bg-blue-600/20 border border-blue-600 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.wikidataCoverage}%</div>
              <div className="text-blue-200 text-sm">Wikidata-Abdeckung</div>
            </div>
          </div>

          {/* Maschinenlesbare Daten Hinweis */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-2">🤖 Maschinenlesbare Daten</h3>
            <p className="text-gray-300 text-sm mb-3">
              Diese Taxonomie ist als strukturierte Daten verfügbar für Suchmaschinen, KI-Agenten und das Semantic Web:
            </p>
            <div className="flex flex-wrap gap-2">
              <a 
                href="/dataset/taxonomie.jsonld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                JSON-LD (Schema.org)
              </a>
              <a 
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                llms.txt (AI-Access)
              </a>
              <a 
                href="/dataset/jasswiki-corpus.jsonl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Training Corpus (JSONL)
              </a>
            </div>
          </div>

          {/* Hauptstruktur Navigation */}
          <div className="bg-gray-900 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold text-white mb-3">Die {stats.categories} Hauptkategorien</h2>
            <div className="flex flex-wrap gap-2">
              {JASS_TAXONOMY.map((cat) => (
                <a 
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Wikidata-Verknüpfung</h3>
            <p className="text-blue-100 mb-4">
              Diese Taxonomie ist mit Wikidata verknüpft, um eine systematische Strukturierung der Jass-Begriffe im Semantic Web zu ermöglichen.
              JassWiki.ch ist als Referenzquelle im <a href="https://de.wikipedia.org/wiki/Jass" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Wikipedia-Artikel Jass</a> verlinkt.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href={`https://www.wikidata.org/wiki/${WIKIDATA.JASS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Jass ({WIKIDATA.JASS})
              </a>
              <a 
                href={`https://www.wikidata.org/wiki/${WIKIDATA.JASS_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Jass contract ({WIKIDATA.JASS_CONTRACT})
              </a>
              <a 
                href="https://www.wikidata.org/wiki/Q137727247"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-bold text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Schieber (Q137727247)
              </a>
            </div>
          </div>

          {/* Quellen */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <h3 className="text-lg font-bold text-white mb-3">Quellen</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Schweizerisches Idiotikon, Band III, Sp. 69 f.</li>
              <li>• <a href="https://de.wikipedia.org/wiki/Jass" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">Wikipedia: Jass</a> (JassWiki.ch als Einzelnachweis)</li>
              <li>• <a href="https://jasswiki.ch" className="text-green-400 hover:text-green-300">Jasswiki.ch</a> – 257 Artikel</li>
              <li>• <a href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">Lebendige Traditionen der Schweiz (BAK)</a></li>
              <li>• Expertenbericht: "Jass-Ontologie & Gap-Analyse" (2026)</li>
            </ul>
          </div>

          {/* Zurück */}
          <div className="text-center pt-8 border-t border-gray-700">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-600"
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

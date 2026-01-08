import React, { useEffect, useState } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import { SeoHead } from '@/components/layout/SeoHead';
import allContent from '@/data/jass-content-v2.json';
import { JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { ExternalLink, CheckCircle, Clock, Star, BookOpen, Layers } from 'lucide-react';

// Typ für Taxonomie-Eintrag
interface TaxonomyEntry {
  id: string;
  topic: string;
  category: string;
  subcategory: string;
  tier: number;
  wikidataId?: string;
  url: string;
}

// Extrahiere Taxonomie-Daten aus dem Content
const getTaxonomyData = (): TaxonomyEntry[] => {
  const entries: TaxonomyEntry[] = [];
  
  (Object.values(allContent) as JassContentItem[]).forEach((item: any) => {
    const tier = item.metadata?.taxonomy_tier || 3;
    const wikidataId = item.metadata?.wikidata_id;
    
    const categorySlug = toSlug(item.metadata.category.main);
    const subcategorySlug = toSlug(item.metadata.category.sub);
    const topicSlug = toSlug(item.metadata.category.topic);
    
    let url = `/${categorySlug}/${subcategorySlug}/${topicSlug}/`;
    
    // Spezialfall für Varianten (flache Struktur)
    if (categorySlug === 'varianten') {
      url = `/${categorySlug}/${topicSlug}/`;
    }
    
    entries.push({
      id: item.id,
      topic: item.metadata.category.topic,
      category: item.metadata.category.main,
      subcategory: item.metadata.category.sub,
      tier,
      wikidataId,
      url
    });
  });
  
  return entries.sort((a, b) => {
    // Erst nach Tier, dann alphabetisch
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.topic.localeCompare(b.topic, 'de');
  });
};

const TaxonomiePage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const allEntries = getTaxonomyData();
  
  // Filtere nach Tab und Suche
  const filteredEntries = allEntries.filter(entry => {
    const matchesTier = activeTab === 0 || entry.tier === activeTab;
    const matchesSearch = searchTerm === '' || 
      entry.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  // Statistiken
  const tier1Count = allEntries.filter(e => e.tier === 1).length;
  const tier2Count = allEntries.filter(e => e.tier === 2).length;
  const tier3Count = allEntries.filter(e => e.tier === 3).length;
  const withWikidataCount = allEntries.filter(e => e.wikidataId).length;

  // Gruppiere nach Kategorie für bessere Darstellung
  const groupedByCategory = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = [];
    }
    acc[entry.category].push(entry);
    return acc;
  }, {} as Record<string, TaxonomyEntry[]>);

  return (
    <>
      <SeoHead
        title="Jass-Taxonomie: Alle Begriffe im Überblick | Jass-Wiki"
        description="Die vollständige Taxonomie aller Jass-Begriffe: 257 Einträge kategorisiert nach Wichtigkeit. Wikipedia-Level, wichtige Begriffe und Vollständigkeit."
      />
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Die Ordnung des Jassens
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Alle {allEntries.length} Jass-Begriffe strukturiert und kategorisiert
            </p>
          </div>

          {/* Statistik-Karten */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl p-4 text-center">
              <Star className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{tier1Count}</div>
              <div className="text-yellow-100 text-sm">Tier 1 (Wikipedia)</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-center">
              <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{tier2Count}</div>
              <div className="text-blue-100 text-sm">Tier 2 (Wichtig)</div>
            </div>
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl p-4 text-center">
              <Layers className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{tier3Count}</div>
              <div className="text-gray-100 text-sm">Tier 3 (Vollständig)</div>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{withWikidataCount}</div>
              <div className="text-green-100 text-sm">Mit Wikidata</div>
            </div>
          </div>

          {/* Tier-Erklärung */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Was bedeuten die Tiers?</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs font-bold">Tier 1</span>
                <span>Wikipedia-Level: Diese Begriffe werden auf Wikipedia erwähnt und haben Wikidata-Einträge.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">Tier 2</span>
                <span>Wichtige Begriffe: Kernbegriffe des Jassens, die jeder Jasser kennen sollte.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs font-bold">Tier 3</span>
                <span>Vollständigkeit: Spezialbegriffe, regionale Varianten und Detailwissen.</span>
              </div>
            </div>
          </div>

          {/* Tabs und Suche */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Alle ({allEntries.length})
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 1 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Tier 1 ({tier1Count})
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 2 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Tier 2 ({tier2Count})
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 3 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Tier 3 ({tier3Count})
              </button>
            </div>
            
            {/* Suche */}
            <input
              type="text"
              placeholder="Begriff suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 w-full sm:w-64"
            />
          </div>

          {/* Tabelle */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-300">Begriff</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-300 hidden sm:table-cell">Kategorie</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-300">Tier</th>
                    <th className="px-4 py-3 text-center text-sm font-bold text-gray-300">Wikidata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-3">
                        <Link href={entry.url} className="text-green-400 hover:text-green-300 font-medium">
                          {entry.topic}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
                        {entry.category} › {entry.subcategory}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          entry.tier === 1 ? 'bg-yellow-600 text-white' :
                          entry.tier === 2 ? 'bg-blue-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {entry.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {entry.wikidataId ? (
                          <a 
                            href={`https://www.wikidata.org/wiki/${entry.wikidataId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-green-400 hover:text-green-300"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs">{entry.wikidataId}</span>
                          </a>
                        ) : (
                          <span className="text-gray-500">
                            <Clock className="w-4 h-4 inline" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gruppiert nach Kategorie */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Nach Kategorie</h2>
            {Object.entries(groupedByCategory).map(([category, entries]) => (
              <div key={category} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  {category}
                  <span className="text-sm font-normal text-gray-400">({entries.length} Einträge)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {entries.map((entry) => (
                    <Link 
                      key={entry.id}
                      href={entry.url}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        entry.tier === 1 ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30' :
                        entry.tier === 2 ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' :
                        'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                      }`}
                    >
                      {entry.topic}
                      {entry.wikidataId && <CheckCircle className="w-3 h-3 inline ml-1" />}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Wikidata-Link */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Jass auf Wikidata
            </h3>
            <p className="text-blue-100 mb-4">
              Wir bauen das semantische Wissen über Jass systematisch auf.
            </p>
            <a 
              href="https://www.wikidata.org/wiki/Q786768"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-bold"
            >
              <ExternalLink className="w-5 h-5" />
              Jass auf Wikidata
            </a>
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

import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { SeoHead } from '@/components/layout/SeoHead';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { toSlug } from '@/lib/utils';
import { BookOpen, Trophy, Zap, Scale, Users } from 'lucide-react';

interface SchieberPageProps {
  mainArticle: JassContentItem;
  relatedGroups: {
    regeln: JassContentItem[];
    strategie: JassContentItem[];
    begriffe: JassContentItem[];
    kultur: JassContentItem[];
  };
}

const SchieberPage: NextPage<SchieberPageProps> = ({ mainArticle, relatedGroups }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const canonicalUrl = `${siteUrl}/schieber/`;

  // Scrolling aktivieren
  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Schieber', href: '/schieber/' },
  ];

  const articleData = {
    headline: mainArticle.metadata.category.topic,
    description: "Der Schieber ist die beliebteste Jassvariante der Schweiz. Alles zu Regeln, Taktik und Philosophie.",
    authorName: 'Jasswiki Redaktion',
    publisherName: 'Jasswiki.ch',
    publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero.png',
    datePublished: '2023-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  const renderLinkCard = (item: JassContentItem, icon: React.ElementType) => {
      const categorySlug = toSlug(item.metadata.category.main);
      const subSlug = toSlug(item.metadata.category.sub);
      const topicSlug = toSlug(item.metadata.category.topic);
      
      // Handle flat structure logic if necessary, but standard path usually works
      const href = `/${categorySlug}/${subSlug}/${topicSlug}/`;

      return (
        <Link 
            key={item.id} 
            href={href}
            className="group block bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all hover:bg-gray-750"
        >
            <div className="flex items-start gap-3">
                <div className="mt-1 text-green-400 group-hover:text-green-300">
                    {React.createElement(icon, { size: 20 })}
                </div>
                <div>
                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
                        {item.metadata.category.topic}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                        {item.text.substring(0, 80)}...
                    </p>
                </div>
            </div>
        </Link>
      );
  };

  return (
    <>
      <SeoHead
        title="Der Schieber: Regeln, Taktik & Strategie | JassWiki"
        description="Alles über den Schieber: Die beliebteste Jassvariante der Schweiz. Regeln, Taktiken, Trumpfwahl und Teamstrategien einfach erklärt."
        canonicalUrl={canonicalUrl}
      />
      
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-12">
            
            {/* Header Section */}
            <div className="text-center border-b border-gray-700 pb-8">
                <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold mb-4 tracking-wide uppercase">
                    Die Königsdisziplin
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {mainArticle.metadata.category.topic}
                </h1>
                
                {/* Main Article Content */}
                <div className="prose prose-lg sm:prose-xl max-w-4xl mx-auto prose-invert text-left">
                    <div className="text-gray-200 leading-relaxed">
                        <InternalLinker text={mainArticle.text} />
                    </div>
                </div>
            </div>

            {/* Alle Schieber-Artikel */}
            <section>
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Alle Artikel zum Schieber
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {relatedGroups.regeln.length + relatedGroups.strategie.length + relatedGroups.begriffe.length + relatedGroups.kultur.length} Artikel gefunden
                    </p>
                </div>

                {/* Regeln & Grundlagen */}
                {relatedGroups.regeln.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Scale className="w-7 h-7 text-green-400" />
                            <h3 className="text-2xl font-bold text-white">Regeln & Grundlagen</h3>
                            <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold">
                                {relatedGroups.regeln.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedGroups.regeln.map(item => renderLinkCard(item, Scale))}
                        </div>
                    </div>
                )}

                {/* Taktik & Strategie */}
                {relatedGroups.strategie.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="w-7 h-7 text-yellow-400" />
                            <h3 className="text-2xl font-bold text-white">Taktik & Strategie</h3>
                            <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm font-semibold">
                                {relatedGroups.strategie.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedGroups.strategie.map(item => renderLinkCard(item, Trophy))}
                        </div>
                    </div>
                )}

                {/* Begriffe */}
                {relatedGroups.begriffe.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-7 h-7 text-blue-400" />
                            <h3 className="text-2xl font-bold text-white">Wichtige Begriffe</h3>
                            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold">
                                {relatedGroups.begriffe.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedGroups.begriffe.map(item => renderLinkCard(item, BookOpen))}
                        </div>
                    </div>
                )}

                {/* Kultur & Geschichte */}
                {relatedGroups.kultur.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-7 h-7 text-purple-400" />
                            <h3 className="text-2xl font-bold text-white">Kultur & Geschichte</h3>
                            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-semibold">
                                {relatedGroups.kultur.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {relatedGroups.kultur.map(item => renderLinkCard(item, Users))}
                        </div>
                    </div>
                )}
            </section>

            {/* CTA */}
            <div className="mt-16 pt-8 border-t border-gray-700">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-4">Noch Fragen zum Schieber?</h3>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Unser Jass-Wiki GPT kennt alle Details, Regelfeinheiten und Strategien.
                    </p>
                    <Link 
                        href="/gpt" 
                        className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-bold text-lg"
                    >
                        <Zap className="mr-2" />
                        JassWiki GPT fragen
                    </Link>
                </div>
            </div>

        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  // 1. Hauptartikel finden
  const mainArticle = items.find(i => i.id === 'general_schieber');

  if (!mainArticle) {
    return { notFound: true };
  }

  // 2. Verwandte Artikel filtern
  // Kriterien: Keywords enthalten 'schieber' ODER Kategorie ist Schieber-relevant
  const relatedItems = items.filter(item => {
    if (item.id === 'general_schieber') return false; // Exclude self
    
    const keywords = (item.metadata.keywords || []).map(k => k.toLowerCase());
    const isSchieberKeyword = keywords.includes('schieber');
    
    // Check specific categories
    const isSchieberCategory = item.metadata.category.sub === 'Schieber';
    
    return isSchieberKeyword || isSchieberCategory;
  });

  // 3. Gruppieren
  const relatedGroups = {
    regeln: [] as JassContentItem[],
    strategie: [] as JassContentItem[],
    begriffe: [] as JassContentItem[],
    kultur: [] as JassContentItem[],
  };

  relatedItems.forEach(item => {
      const catMain = item.metadata.category.main;
      const catSub = item.metadata.category.sub;

      if (catMain === 'Regeln' || catSub === 'Regeln') {
          relatedGroups.regeln.push(item);
      } else if (catMain === 'Taktik' || catMain === 'Strategie' || catSub === 'Taktik') {
          relatedGroups.strategie.push(item);
      } else if (catMain === 'Begriffe') {
          relatedGroups.begriffe.push(item);
      } else {
          relatedGroups.kultur.push(item);
      }
  });

  // Sortieren nach Wichtigkeit (falls vorhanden) oder Alphabet
  const sortFn = (a: JassContentItem, b: JassContentItem) => {
      return (b.metadata.importance || 0) - (a.metadata.importance || 0);
  };

  relatedGroups.regeln.sort(sortFn);
  relatedGroups.strategie.sort(sortFn);
  relatedGroups.begriffe.sort(sortFn);
  relatedGroups.kultur.sort(sortFn);

  return {
    props: {
      mainArticle,
      relatedGroups,
    },
  };
};

export default SchieberPage;


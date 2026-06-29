import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { isFlatStructure } from '@/lib/url-utils';

const formatTopicName = (name: string): string => {
  return name
    .replace(/ACHTBLATT/g, 'Achtblatt')
    .replace(/NEUNBLATT/g, 'Neunblatt')
    .replace(/DREIBLATT/g, 'Dreiblatt')
    .replace(/VIERBLATT/g, 'Vierblatt')
    .replace(/FUENFBLATT/g, 'Fünfblatt')
    .replace(/SECHSBLATT/g, 'Sechsblatt')
    .replace(/SIEBENBLATT/g, 'Siebenblatt')
    .replace(/VIER_GLEICHE/g, 'Vier gleiche')
    .replace(/GRUNDREGELN/g, 'Grundregeln')
    .replace(/REIHENFOLGE/g, 'Reihenfolge')
    .replace(/SCHNEIDER/g, 'Schneider')
    .replace(/KORREKTUREN/g, 'Korrekturen')
    .replace(/ZAHLENDARSTELLUNG/g, 'Zahlendarstellung')
    .replace(/FRUEHZEITIGES_BEDANKEN/g, 'Frühzeitiges Bedanken')
    .replace(/BEDANKEN/g, 'Bedanken')
    .replace(/STOECK/g, 'Stöck');
};

const getNavigationStructure = (content: JassContentRecord) => {
  const structure: Record<string, {
    name: string;
    subcategories: Record<string, {
      name: string;
      slug: string;
      topics: { name: string; slug: string }[];
    }>;
    flatArticles: { name: string; slug: string }[];
  }> = {};

  (Object.values(content) as JassContentItem[]).forEach(item => {
    const mainCatSlug = toSlug(item.metadata.category.main);
    const subCatSlug = toSlug(item.metadata.category.sub);
    const topicSlug = toSlug(item.metadata.category.topic);

    if (!structure[mainCatSlug]) {
      structure[mainCatSlug] = {
        name: item.metadata.category.main,
        subcategories: {},
        flatArticles: []
      };
    }

    if (isFlatStructure(mainCatSlug, subCatSlug, topicSlug)) {
      if (!structure[mainCatSlug].flatArticles.some(a => a.slug === topicSlug)) {
        structure[mainCatSlug].flatArticles.push({
          name: item.metadata.category.topic,
          slug: topicSlug
        });
      }
      return;
    }

    if (!structure[mainCatSlug].subcategories[subCatSlug]) {
      structure[mainCatSlug].subcategories[subCatSlug] = {
        name: item.metadata.category.sub,
        slug: subCatSlug,
        topics: []
      };
    }

    if (!structure[mainCatSlug].subcategories[subCatSlug].topics.some(t => t.slug === topicSlug)) {
      structure[mainCatSlug].subcategories[subCatSlug].topics.push({
        name: item.metadata.category.topic,
        slug: topicSlug
      });
    }
  });

  Object.keys(structure).forEach(catSlug => {
    const cat = structure[catSlug];

    const sortedSubcats = Object.keys(cat.subcategories).sort().reduce<Record<string, {
      name: string;
      slug: string;
      topics: { name: string; slug: string }[];
    }>>((result, subCatSlug) => {
      result[subCatSlug] = cat.subcategories[subCatSlug];
      return result;
    }, {});

    cat.subcategories = sortedSubcats;

    // Flacher Leitartikel einer Subkategorie (sub === topic, z. B. Signalsprache =
    // «Kommunikation & Signale») nicht doppelt zeigen: die gleichnamige Subkategorie
    // repräsentiert ihn bereits (ihr Header verlinkt auf dieselbe flache URL).
    // Echte flache Artikel ohne gleichnamige Sub (z. B. Jasskarten) bleiben erhalten.
    cat.flatArticles = cat.flatArticles.filter(a => !cat.subcategories[a.slug]);

    Object.keys(cat.subcategories).forEach(subCatSlug => {
      const subcat = cat.subcategories[subCatSlug];

      if (catSlug === 'weis-regeln') {
        const getWeisOrderIndex = (name: string) => {
          const lowerName = name.toLowerCase();
          if (lowerName.includes('dreiblatt') || lowerName.includes('3 blatt')) return 1;
          if (lowerName.includes('vierblatt') || lowerName.includes('4 blatt')) return 2;
          if (lowerName.includes('fünfblatt') || lowerName.includes('5 blatt')) return 3;
          if (lowerName.includes('sechsblatt') || lowerName.includes('6 blatt')) return 4;
          if (lowerName.includes('siebenblatt') || lowerName.includes('7 blatt')) return 5;
          if (lowerName.includes('achtblatt') || lowerName.includes('8 blatt')) return 6;
          if (lowerName.includes('neunblatt') || lowerName.includes('9 blatt')) return 7;
          if (lowerName.includes('vier gleiche')) return 8;
          if (lowerName.includes('stöck')) return 9;
          if (lowerName.includes('reihenfolge')) return 10;
          if (lowerName.includes('schneider')) return 11;
          if (lowerName.includes('korrekturen')) return 12;
          if (lowerName.includes('zahlendarstellung')) return 13;
          if (lowerName.includes('frühzeitiges bedanken')) return 14;
          if (lowerName.includes('bedanken')) return 15;
          if (lowerName.includes('allgemeine weis') || lowerName.includes('grundregeln')) return 0;
          if (lowerName.includes('ausmachen')) return 16;
          return 999;
        };

        subcat.topics.sort((a, b) => {
          const indexA = getWeisOrderIndex(a.name);
          const indexB = getWeisOrderIndex(b.name);
          if (indexA !== indexB) return indexA - indexB;
          return a.name.localeCompare(b.name);
        });
      } else {
        subcat.topics.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  });

  Object.keys(structure).forEach(catSlug => {
    structure[catSlug].flatArticles.sort((a, b) => a.name.localeCompare(b.name, 'de'));
  });

  const sortedStructure: typeof structure = {};
  const categoryOrder = ['regeln', 'weis-regeln', 'geschichte', 'grundlagen-kultur', 'schieber', 'ansagen', 'taktiken-und-strategien', 'begriffe', 'varianten', 'jassapps', 'referenzen'];
  
  categoryOrder.forEach(catSlug => {
    if (structure[catSlug]) sortedStructure[catSlug] = structure[catSlug];
  });
  
  Object.keys(structure).forEach(catSlug => {
    if (!categoryOrder.includes(catSlug)) sortedStructure[catSlug] = structure[catSlug];
  });

  return sortedStructure;
};


export const LexikonSidebar = () => {
  const router = useRouter();
  const { category: currentCategory, subcategory: currentSubcategory, topic: currentTopic } = router.query;

  const navigationStructure = useMemo(() => getNavigationStructure(allContent as JassContentRecord), []);

  const isOnJassenPath = router.pathname.startsWith('/jassen');

  return (
    <nav className="flex flex-col gap-[16px]">
      {/* Penpot: row-gap=14px, flex-direction=column */}
      <ul className="flex flex-col gap-[16px]">
        {/* Jassen — hardcoded top-level link */}
        <li>
          <Link href="/jassen/" legacyBehavior>
            <a className={`block w-[230px] py-[1px] font-capita text-[18px] font-bold leading-[1.5556] transition-colors ${
              isOnJassenPath ? 'text-[#2bb752]' : 'text-[#878787] hover:text-white'
            }`}>
              Jassen
            </a>
          </Link>
        </li>
        {Object.entries(navigationStructure).map(([catSlug, categoryData]) => {
          // Schieber hat eigene Seiten (/schieber/, /schieber/[group]/) – kein [category]-Route.
          const isOnSchieberPath = router.pathname.startsWith('/schieber');
          const isOnAnsagenPath = router.pathname.startsWith('/ansagen');
          const isOnTaktikenPath = router.pathname.startsWith('/taktiken-und-strategien');
          const currentSchieberGroup = isOnSchieberPath ? (router.query.group as string | undefined) : undefined;
          const isCategoryActive = catSlug === currentCategory
            || (catSlug === 'schieber' && isOnSchieberPath)
            || (catSlug === 'ansagen' && isOnAnsagenPath)
            || (catSlug === 'taktiken-und-strategien' && isOnTaktikenPath);

          const SCHIEBER_SIDEBAR_GROUPS = [
            { title: 'Regeln & Grundlagen', slug: 'regeln-grundlagen' },
            { title: 'Wichtige Begriffe',   slug: 'wichtige-begriffe' },
            { title: 'Kultur & Geschichte', slug: 'kultur-geschichte' },
          ];

          return (
            <li key={catSlug}>
              {/* Penpot: nav-link — Capita 18px bold, #878787 inactive, #2bb752 active, line-height=1.5556 */}
              <Link href={`/${catSlug}/`} legacyBehavior>
                <a className={`block w-[246px] font-capita text-[18px] font-bold leading-[1.556] transition-colors ${
                  isCategoryActive ? 'text-[#2bb752]' : 'text-[#878787] hover:text-[#2bb752]'
                }`}>
                  {categoryData.name}
                </a>
              </Link>
              {isCategoryActive && catSlug === 'schieber' && (
                /* Schieber Hub: Gruppen als echte Seiten-Links */
                <ul className="border-l-2 border-[#2bb752] pl-[14px] pr-[8px] pt-[6px] pb-[6px] mt-[9px] flex flex-col gap-[8px]">
                  {SCHIEBER_SIDEBAR_GROUPS.map(group => {
                    const isGroupActive = currentSchieberGroup === group.slug;
                    return (
                      <li key={group.slug}>
                        <Link href={`/schieber/${group.slug}/`} legacyBehavior>
                          <a className={`block w-[230px] py-[1px] font-capita text-[17px] font-bold leading-[1.45] transition-colors ${
                            isGroupActive ? 'text-[#2bb752]' : 'text-[#a3a3a3] hover:text-white'
                          }`}>
                            {group.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
              {isCategoryActive && catSlug !== 'schieber' && (() => {
                // Subcategories und Flat Articles alphabetisch zusammenmischen
                type SubItem = { kind: 'sub'; slug: string; name: string; topics: { name: string; slug: string }[] };
                type FlatItem = { kind: 'flat'; slug: string; name: string };
                const merged: (SubItem | FlatItem)[] = [
                  ...Object.entries(categoryData.subcategories).map(([slug, data]) => ({
                    kind: 'sub' as const, slug, name: data.name, topics: data.topics
                  })),
                  ...(categoryData.flatArticles || []).map(a => ({
                    kind: 'flat' as const, slug: a.slug, name: a.name
                  }))
                ].sort((a, b) => a.name.localeCompare(b.name, 'de'));

                return (
                  <ul className="border-l-2 border-[#2bb752] pl-[14px] pr-[8px] pt-[6px] pb-[6px] mt-[9px] flex flex-col gap-[8px]">
                    {merged.map(item => {
                      if (item.kind === 'sub') {
                        const isSubcategoryActive = item.slug === currentSubcategory;
                        return (
                          <li key={item.slug}>
                            <Link href={`/${catSlug}/${item.slug}/`} legacyBehavior>
                              <a className={`block w-[230px] py-[1px] font-capita text-[17px] font-bold leading-[1.45] transition-colors ${
                                isSubcategoryActive ? 'text-[#2bb752]' : 'text-[#a3a3a3] hover:text-white'
                              }`}>
                                {item.name}
                              </a>
                            </Link>
                            {isSubcategoryActive && (
                              <ul className="border-l border-[#2bb752]/50 pl-[12px] ml-[2px] mt-[5px] mb-[2px] flex flex-col gap-[5px]">
                                {item.topics.map(topic => {
                                  const isTopicActive = topic.slug === currentTopic;
                                  return (
                                    <li key={topic.slug}>
                                      <Link href={`/${catSlug}/${item.slug}/${topic.slug}/`} legacyBehavior>
                                        <a className={`block py-[1px] font-inter text-[14px] leading-[1.45] transition-colors ${
                                          isTopicActive ? 'text-[#2bb752] font-semibold' : 'text-white/80 font-normal hover:text-[#2bb752]'
                                        }`}>
                                          {formatTopicName(topic.name)}
                                        </a>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      } else {
                        const isArticleActive = item.slug === currentSubcategory || item.slug === currentTopic;
                        return (
                          <li key={item.slug}>
                            <Link href={`/${catSlug}/${item.slug}/`} legacyBehavior>
                              <a className={`block w-[230px] py-[1px] font-capita text-[17px] font-bold leading-[1.45] transition-colors ${
                                isArticleActive ? 'text-[#2bb752]' : 'text-[#a3a3a3] hover:text-white'
                              }`}>
                                {formatTopicName(item.name)}
                              </a>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                );
              })()}
            </li>
          );
        })}

        {/* Penpot: Referenzen — Capita 18px bold #878787 */}
        <li>
          <Link href="/referenzen/" legacyBehavior>
            <a className={`block w-[246px] font-capita text-[18px] font-bold leading-[1.556] transition-colors ${
              router.pathname === '/referenzen' ? 'text-[#2bb752]' : 'text-[#878787] hover:text-[#2bb752]'
            }`}>
              Referenzen und Quellen
            </a>
          </Link>
        </li>
        <li>
          <Link href="/taxonomie/" legacyBehavior>
            <a className={`block w-[246px] font-capita text-[18px] font-bold leading-[1.556] transition-colors ${
              router.pathname === '/taxonomie' ? 'text-[#2bb752]' : 'text-[#878787] hover:text-[#2bb752]'
            }`}>
              Taxonomie des Jassens
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
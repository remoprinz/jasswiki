import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';
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
        // JassGuru, das Angebot des Herausgebers, steht wie in der Übersicht zuerst
        // (SUB_ZUERST in [category]/[subcategory]/index.tsx, SCHIRI 25.10.2026).
        const zuerst = (name: string) => (name === 'JassGuru' ? 0 : 1);
        subcat.topics.sort((a, b) => zuerst(a.name) - zuerst(b.name) || a.name.localeCompare(b.name));
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

/* ---------------------------------------------------------------------------
   SEITENNAVIGATION (Jens, Bauhütte 203, 30.10.2026)

   Ein Baum aus drei Ebenen: Hauptbereich › Unterbereich › Seite. Verhalten:
   - Offen ist allein der Hauptbereich der aktuellen Seite, mit seinem Pfad bis
     zur Seite. Wer direkt kommt oder neu lädt, sieht diesen Pfad schon offen:
     Der Zustand entsteht aus dem Pfad, also schon im statischen HTML.
   - Der Text öffnet die Seite, der Pfeil rechts ist ein eigener Knopf
     (aria-expanded) und klappt nur. Öffnet er einen Hauptbereich, schliessen
     sich die anderen: Es bleibt ein Bereich offen.
   - Die aktive Seite trägt aria-current="page", ihre Eltern stehen fett.
   Die Farben stehen als feste Töne in globals.css (.jw-nav-*), ohne Deckkraft
   auf dem Text.
   --------------------------------------------------------------------------- */

interface Knoten {
  key: string;
  name: string;
  href: string;
  ebene: 1 | 2 | 3;
  kinder: Knoten[];
}

const SCHIEBER_SIDEBAR_GROUPS = [
  { title: 'Regeln & Grundlagen', slug: 'regeln-grundlagen' },
  { title: 'Wichtige Begriffe', slug: 'wichtige-begriffe' },
  { title: 'Kultur & Geschichte', slug: 'kultur-geschichte' },
];

const META_SEITEN = [
  { name: 'Referenzen und Quellen', href: '/referenzen/' },
  { name: 'Taxonomie des Jassens', href: '/taxonomie/' },
];

const baumBauen = (struktur: ReturnType<typeof getNavigationStructure>): Knoten[] => {
  const baum: Knoten[] = [{ key: '/jassen/', name: 'Jassen', href: '/jassen/', ebene: 1, kinder: [] }];

  Object.entries(struktur).forEach(([catSlug, cat]) => {
    const href = `/${catSlug}/`;
    let kinder: Knoten[];

    if (catSlug === 'schieber') {
      kinder = SCHIEBER_SIDEBAR_GROUPS.map((g) => ({
        key: `/schieber/${g.slug}/`,
        name: g.title,
        href: `/schieber/${g.slug}/`,
        ebene: 2 as const,
        kinder: [],
      }));
    } else {
      // Unterbereiche und flache Artikel alphabetisch gemischt, wie bisher.
      const unter: Knoten[] = Object.entries(cat.subcategories).map(([subSlug, sub]) => ({
        key: `/${catSlug}/${subSlug}/`,
        name: formatTopicName(sub.name),
        href: `/${catSlug}/${subSlug}/`,
        ebene: 2 as const,
        kinder: sub.topics.map((t) => ({
          key: `/${catSlug}/${subSlug}/${t.slug}/`,
          name: formatTopicName(t.name),
          href: `/${catSlug}/${subSlug}/${t.slug}/`,
          ebene: 3 as const,
          kinder: [],
        })),
      }));
      const flach: Knoten[] = (cat.flatArticles || []).map((a) => ({
        key: `/${catSlug}/${a.slug}/`,
        name: formatTopicName(a.name),
        href: `/${catSlug}/${a.slug}/`,
        ebene: 2 as const,
        kinder: [],
      }));
      kinder = [...unter, ...flach].sort((a, b) => a.name.localeCompare(b.name, 'de'));
    }

    baum.push({ key: href, name: cat.name, href, ebene: 1, kinder });
  });

  return baum;
};

/** Pfad ohne Abfrage und Sprungziel, immer mit Schrägstrich am Ende. */
export const pfadVon = (asPath: string): string => {
  const roh = asPath.split(/[?#]/)[0] || '/';
  return roh.endsWith('/') ? roh : `${roh}/`;
};

/**
 * Die Kette vom Hauptbereich bis zur Seite. Trifft kein Knoten genau, gilt der
 * tiefste, dessen Adresse den Pfad beginnt (etwa ein Hauptbereich mit eigener
 * Unterseite, die nicht im Baum steht): Er öffnet sich, ist aber nicht aktiv.
 */
const ketteZu = (baum: Knoten[], pfad: string): { kette: Knoten[]; genau: boolean } => {
  let beste: Knoten[] = [];
  const gehen = (knoten: Knoten[], bisher: Knoten[]): Knoten[] | null => {
    for (const k of knoten) {
      const kette = [...bisher, k];
      if (k.href === pfad) return kette;
      if (pfad.startsWith(k.href) && kette.length > beste.length) beste = kette;
      const tiefer = gehen(k.kinder, kette);
      if (tiefer) return tiefer;
    }
    return null;
  };
  const genau = gehen(baum, []);
  return genau ? { kette: genau, genau: true } : { kette: beste, genau: false };
};

const offenAus = (kette: Knoten[]): Set<string> =>
  new Set(kette.filter((k) => k.kinder.length > 0).map((k) => k.key));

const Pfeil: React.FC<{ offen: boolean; name: string; ziel: string; onClick: () => void }> = ({
  offen,
  name,
  ziel,
  onClick,
}) => (
  <button
    type="button"
    className="jw-nav-pfeil"
    aria-expanded={offen}
    aria-controls={ziel}
    aria-label={offen ? `${name} zuklappen` : `${name} aufklappen`}
    onClick={onClick}
  >
    <ChevronRight aria-hidden className="jw-nav-pfeil-zeichen" width={16} height={16} strokeWidth={2.25} />
  </button>
);

const idVon = (key: string) => `nav${key.replace(/[^a-z0-9]+/gi, '-')}`.replace(/-$/, '');

export const LexikonSidebar = () => {
  const router = useRouter();
  const baum = useMemo(() => baumBauen(getNavigationStructure(allContent as JassContentRecord)), []);
  const pfad = pfadVon(router.asPath);
  const { kette, genau } = useMemo(() => ketteZu(baum, pfad), [baum, pfad]);
  const aktivKey = genau ? kette[kette.length - 1]?.key : undefined;
  const imPfad = useMemo(() => new Set(kette.map((k) => k.key)), [kette]);

  // Der offene Zustand folgt dem Pfad: Bei jedem Seitenwechsel steht wieder
  // allein der Pfad der neuen Seite offen. Gesetzt während des Renderns, damit
  // kein Bild mit dem alten Baum dazwischen steht.
  const [offen, setOffen] = useState<Set<string>>(() => offenAus(kette));
  const [offenFuer, setOffenFuer] = useState(pfad);
  if (offenFuer !== pfad) {
    setOffenFuer(pfad);
    setOffen(offenAus(kette));
  }

  const umschalten = (k: Knoten) => {
    setOffen((alt) => {
      const neu = new Set(alt);
      if (neu.has(k.key)) {
        neu.delete(k.key);
        return neu;
      }
      if (k.ebene === 1) {
        // Ein Hauptbereich bleibt offen: die anderen schliessen.
        baum.forEach((b) => b.key !== k.key && neu.delete(b.key));
      }
      neu.add(k.key);
      return neu;
    });
  };

  const verweis = (k: Knoten, klasse: string) => {
    const aktiv = k.key === aktivKey;
    const eltern = !aktiv && imPfad.has(k.key);
    return (
      <Link
        href={k.href}
        className={`${klasse}${aktiv ? ' ist-aktiv' : ''}${eltern ? ' ist-eltern' : ''}`}
        aria-current={aktiv ? 'page' : undefined}
      >
        {k.name}
      </Link>
    );
  };

  const zweig = (k: Knoten): React.ReactNode => {
    const hatKinder = k.kinder.length > 0;
    const istOffen = hatKinder && offen.has(k.key);
    const ziel = idVon(k.key);

    if (k.ebene === 1) {
      return (
        <li key={k.key} className={`jw-nav-bereich${istOffen ? ' ist-offen' : ''}`}>
          <div className={`jw-nav-zeile${k.key === aktivKey ? ' ist-aktiv' : ''}`}>
            {verweis(k, 'jw-nav-haupt')}
            {hatKinder && <Pfeil offen={istOffen} name={k.name} ziel={ziel} onClick={() => umschalten(k)} />}
          </div>
          {istOffen && (
            <ul id={ziel} className="jw-nav-liste2">
              {k.kinder.map(zweig)}
            </ul>
          )}
        </li>
      );
    }

    if (k.ebene === 2) {
      return (
        <li key={k.key}>
          <div className={`jw-nav-zeile${k.key === aktivKey ? ' ist-aktiv' : ''}`}>
            {verweis(k, 'jw-nav-unter')}
            {hatKinder && <Pfeil offen={istOffen} name={k.name} ziel={ziel} onClick={() => umschalten(k)} />}
          </div>
          {istOffen && (
            <ul id={ziel} className="jw-nav-liste3">
              {k.kinder.map(zweig)}
            </ul>
          )}
        </li>
      );
    }

    return <li key={k.key}>{verweis(k, 'jw-nav-seite')}</li>;
  };

  return (
    <nav className="jw-nav" aria-label="Themen">
      <p className="jw-nav-titel">Themen</p>
      <ul className="jw-nav-liste1">{baum.map(zweig)}</ul>
      <ul className="jw-nav-meta">
        {META_SEITEN.map((m) => {
          const aktiv = pfad === m.href;
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                className={`jw-nav-meta-link${aktiv ? ' ist-aktiv' : ''}`}
                aria-current={aktiv ? 'page' : undefined}
              >
                {m.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

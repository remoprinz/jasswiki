import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { KARTENSYSTEME, JassKarte } from './jasskarten';
import { KartenLightbox } from './KartenLightbox';

const SITE = 'https://jasswiki.ch';
const PAGE = '/grundlagen-kultur/jasskarten/';

// schema.org ItemList aller 72 Karten (Name, Caption, Bild-URL, Anker-URL).
const cardListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Schweizer Jasskarten – alle Karten beider Kartensysteme',
  numberOfItems: KARTENSYSTEME.reduce(
    (sum, sys) => sum + sys.farben.reduce((s, f) => s + f.karten.length, 0),
    0
  ),
  itemListElement: KARTENSYSTEME.flatMap((sys) =>
    sys.farben.flatMap((farbe) =>
      farbe.karten.map((karte) => ({
        '@type': 'ImageObject',
        name: karte.name,
        caption: karte.alt,
        contentUrl: `${SITE}${karte.image}`,
        url: `${SITE}${PAGE}#${karte.slug}`,
        isPartOf: `${SITE}${PAGE}`,
        creditText: 'schweizerjass.ch',
        creator: { '@type': 'Person', name: 'Jens Riedweg', url: 'https://schweizerjass.ch' },
        copyrightNotice: 'Jens Riedweg, schweizerjass.ch',
      }))
    )
  ).map((img, i) => ({ '@type': 'ListItem', position: i + 1, item: img })),
};

/**
 * Karten-Raster für den Leitartikel «Jasskarten».
 * Beide Kartensysteme als je vier Spalten (eine pro Farbe), Farbtitel oben,
 * neun Karten hoch nach tief. Klick auf eine Karte öffnet die Grossansicht
 * (Lightbox); ein Direktlink wie /…/jasskarten/#rosen-ass öffnet sie automatisch.
 */
export function JassCardGrid() {
  const cardBySlug = useMemo(() => {
    const m = new Map<string, JassKarte>();
    KARTENSYSTEME.forEach((s) => s.farben.forEach((f) => f.karten.forEach((k) => m.set(k.slug, k))));
    return m;
  }, []);

  const [selected, setSelected] = useState<JassKarte | null>(null);

  const open = useCallback((k: JassKarte) => {
    setSelected(k);
    if (typeof window !== 'undefined') window.history.replaceState(null, '', `#${k.slug}`);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Direktlink mit #slug öffnet die Karte (auch via Suche/Teilen).
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
      const k = cardBySlug.get(slug);
      if (k) setSelected(k);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [cardBySlug]);

  // Esc und Scroll-Sperre liegen in der KartenLightbox.

  return (
    <section className="not-prose my-10" aria-label="Alle Jasskarten beider Kartensysteme">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cardListJsonLd) }}
      />
      {KARTENSYSTEME.map((sys) => (
        <div key={sys.system} className="mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-[#274823] mb-1">{sys.label}</h3>
          <p className="text-sm text-[#88816d] mb-4">{sys.hint}</p>
          <div className="grid grid-cols-4 gap-3 sm:gap-5">
            {sys.farben.map((farbe) => (
              <div key={farbe.code} className="flex flex-col">
                <div className="text-center font-bold text-[#274823] text-sm sm:text-base mb-2">
                  {farbe.name}
                </div>
                <div className="flex flex-col gap-3">
                  {farbe.karten.map((karte) => (
                    <figure key={karte.slug} id={karte.slug} className="m-0 scroll-mt-24">
                      <button
                        type="button"
                        onClick={() => open(karte)}
                        aria-label={`${karte.name} vergrössern`}
                        className="block w-full cursor-zoom-in rounded-lg transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#274823]"
                      >
                        <img
                          src={karte.image}
                          alt={karte.alt}
                          title={karte.name}
                          width={120}
                          height={180}
                          loading="lazy"
                          className="w-full aspect-[2/3] object-contain rounded-lg border border-gray-200 shadow-md bg-white"
                        />
                      </button>
                      <figcaption className="text-center text-[11px] sm:text-xs text-[#88816d] mt-1">
                        {karte.rank}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selected && <KartenLightbox karte={selected} onClose={close} />}
    </section>
  );
}

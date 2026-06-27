import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { KARTENSYSTEME, JassKarte } from './jasskarten';

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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  // Esc schliesst, Scroll sperren solange offen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (selected) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, close]);

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

      {selected &&
        mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          >
            <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={close}
                aria-label="Schliessen"
                className="absolute -top-9 right-0 text-3xl leading-none text-white/80 hover:text-white"
              >
                ×
              </button>
              <img
                src={selected.image}
                alt={selected.alt}
                className="max-h-[78vh] w-auto rounded-xl bg-white shadow-2xl"
              />
              <div className="mt-3 text-center text-white">
                <div className="text-lg font-bold text-white">{selected.name}</div>
                <div className="text-sm text-white/70">{selected.desc}</div>
                <p className="mt-3 text-sm italic text-white">
                  Design:{' '}
                  <a
                    href="https://schweizerjass.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
                  >
                    schweizerjass.ch
                  </a>
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

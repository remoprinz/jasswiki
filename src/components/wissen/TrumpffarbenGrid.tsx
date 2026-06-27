import React from 'react';
import { KARTENSYSTEME } from './jasskarten';

// Zeigt pro Trumpffarbe die zwei Schlüsselkarten: Puur und Nell – in beiden
// Kartensystemen. Achtung: der Puur ist im Deutschschweizer Blatt der Under,
// im französischen Blatt der Bube. Das Nell ist immer die Neun.
// Kartendaten + Bilder: jasskarten.ts (Design schweizerjass.ch / Jens Riedweg).
const JASSKARTEN_URL = '/grundlagen-kultur/jasskarten/';

export const TrumpffarbenGrid: React.FC = () => {
  return (
    <div className="not-prose my-8 space-y-8">
      {KARTENSYSTEME.map((sys) => (
        <div key={sys.system}>
          <h3 className="text-lg sm:text-xl font-bold text-[#274823] mb-3">{sys.label}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {sys.farben.map((farbe) => {
              const cells = [
                {
                  karte: farbe.karten.find((k) => k.rank === 'Under' || k.rank === 'Bube'),
                  label: 'Puur',
                  punkte: '20 Punkte',
                },
                {
                  karte: farbe.karten.find((k) => k.rank === '9'),
                  label: 'Nell',
                  punkte: '14 Punkte',
                },
              ].filter(
                (c): c is { karte: NonNullable<typeof c.karte>; label: string; punkte: string } =>
                  Boolean(c.karte)
              );
              return (
                <div
                  key={farbe.code}
                  className="rounded-xl border border-[#e8e6df] bg-[#f0eee7]/40 p-3 sm:p-4"
                >
                  <div className="text-center font-bold text-[#274823] text-sm sm:text-base mb-3">
                    {farbe.name}
                  </div>
                  <div className="flex gap-3 justify-center">
                    {cells.map(({ karte, label, punkte }) => (
                      <a
                        key={karte.slug}
                        href={`${JASSKARTEN_URL}#${karte.slug}`}
                        className="group flex w-[46%] flex-col items-center"
                      >
                        <img
                          src={karte.image}
                          alt={karte.alt}
                          loading="lazy"
                          className="w-full aspect-[2/3] object-contain rounded-lg border border-gray-200 shadow-md bg-white transition-transform group-hover:scale-[1.03]"
                        />
                        <span className="mt-2 text-xs sm:text-sm font-bold text-[#274823]">
                          {label}
                        </span>
                        <span className="text-[11px] text-[#88816d]">{punkte}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

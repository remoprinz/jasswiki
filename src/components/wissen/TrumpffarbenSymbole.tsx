import React from 'react';
import Link from 'next/link';

// Die vier Farben als Symbole, je Kartensystem (Deutschschweizer + Französisch).
// Symbole aus dem JassGuru-Pictogramm-Set. Eichel↔Kreuz, Rosen↔Herz,
// Schellen↔Ecke, Schilten↔Schaufel bezeichnen jeweils dieselbe Farbe; beide
// Symbole verlinken auf den gemeinsamen Farb-Begriff.
const SYSTEME = [
  {
    label: 'Deutschschweizer Karten',
    farben: [
      { name: 'Eichel', img: '/suits/eichel.png', href: '/begriffe/kartenbezeichnungen/eichel/' },
      { name: 'Rosen', img: '/suits/rosen.png', href: '/begriffe/kartenbezeichnungen/rosen/' },
      { name: 'Schellen', img: '/suits/schellen.png', href: '/begriffe/kartenbezeichnungen/schellen/' },
      { name: 'Schilten', img: '/suits/schilten.png', href: '/begriffe/kartenbezeichnungen/schilten/' },
    ],
  },
  {
    label: 'Französische Karten',
    farben: [
      { name: 'Kreuz', img: '/suits/kreuz.png', href: '/begriffe/kartenbezeichnungen/kreuz/' },
      { name: 'Herz', img: '/suits/herz.png', href: '/begriffe/kartenbezeichnungen/herz/' },
      { name: 'Ecke', img: '/suits/ecke.png', href: '/begriffe/kartenbezeichnungen/ecke/' },
      { name: 'Schaufel', img: '/suits/schaufel.png', href: '/begriffe/kartenbezeichnungen/schaufel/' },
    ],
  },
];

export const TrumpffarbenSymbole: React.FC = () => (
  <div className="not-prose my-8 space-y-6">
    {SYSTEME.map((sys) => (
      <div key={sys.label}>
        <h3 className="text-lg sm:text-xl font-bold text-[#274823] mb-3">{sys.label}</h3>
        <div className="grid grid-cols-4 gap-3 sm:gap-5">
          {sys.farben.map((f) => (
            <Link
              key={f.name}
              href={f.href}
              className="group flex flex-col items-center rounded-xl border border-[#e8e6df] bg-[#f0eee7]/40 p-3 sm:p-4 hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors"
            >
              <img
                src={f.img}
                alt={`${f.name} Symbol`}
                loading="lazy"
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
              />
              <span className="mt-2 text-xs sm:text-sm font-bold text-[#274823] text-center group-hover:text-[#ff0000] transition-colors">
                {f.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    ))}
  </div>
);

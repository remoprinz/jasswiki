import React from 'react';
import Link from 'next/link';

import { FARBEN_ZUORDNUNG } from '../../config/farbenZuordnung';

// Die vier Farben als Symbole, je Kartensystem (Deutschschweizer + Französisch).
// Symbole aus dem JassGuru-Pictogramm-Set. Die französische Reihe steht Spalte
// für Spalte unter der gleichbedeutenden Deutschschweizer Farbe, so wie es die
// eine Zuordnung sagt (src/config/farbenZuordnung.ts, JVS 06.10.2026):
// Eichel↔Ecke, Rosen↔Herz, Schellen↔Kreuz, Schilten↔Schaufel.
const DE_PFAD: Record<string, string> = {
  Eichel: '/begriffe/kartenbezeichnungen/eichel/',
  Rosen: '/begriffe/kartenbezeichnungen/rosen/',
  Schellen: '/begriffe/kartenbezeichnungen/schellen/',
  Schilten: '/begriffe/kartenbezeichnungen/schilten/',
};

const SYSTEME = [
  {
    label: 'Deutschschweizer Karten',
    farben: FARBEN_ZUORDNUNG.map((p) => ({ name: p.de, img: `/suits/${p.deDatei}.png`, href: DE_PFAD[p.de] })),
  },
  {
    label: 'Französische Karten',
    farben: FARBEN_ZUORDNUNG.map((p) => ({ name: p.fr, img: `/suits/${p.frDatei}.png`, href: p.frPfad })),
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

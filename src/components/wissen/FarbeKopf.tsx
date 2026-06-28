import React from 'react';

// Symbol-Kopf für die Farb-Begriffe: zeigt das Symbol der jeweiligen Farbe
// (nur das eigene, das Pendant steht verlinkt im Text). Symbole aus dem
// JassGuru-Pictogramm-Set.
export interface FarbeKopfProps {
  name: string;
  img: string;
  system: string;
}

export const FarbeKopf: React.FC<FarbeKopfProps> = ({ name, img, system }) => (
  <div className="not-prose mb-6 inline-flex items-center gap-4 rounded-xl border border-[#e8e6df] bg-[#f0eee7]/40 p-4 sm:p-5">
    <img src={img} alt={`${name} Symbol`} className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
    <div className="flex flex-col">
      <span className="text-base font-bold text-[#274823]">{name}</span>
      <span className="text-xs text-[#88816d]">{system}</span>
    </div>
  </div>
);

import React from 'react';

// Symbol-Kopf für die vier Farb-Begriffe: zeigt das Deutschschweizer und das
// französische Symbol derselben Farbe nebeneinander plus das internationale
// Kartenzeichen. Symbole aus dem JassGuru-Pictogramm-Set.
interface SuitSide {
  name: string;
  img: string;
  system: string;
}

export interface FarbeKopfProps {
  sides: SuitSide[];
  zeichen: string;
}

export const FarbeKopf: React.FC<FarbeKopfProps> = ({ sides, zeichen }) => (
  <div className="not-prose mb-6 flex flex-wrap items-center gap-6 rounded-xl border border-[#e8e6df] bg-[#f0eee7]/40 p-4 sm:p-5">
    {sides.map((s) => (
      <div key={s.name} className="flex flex-col items-center">
        <img src={s.img} alt={`${s.name} Symbol`} className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
        <span className="mt-1 text-sm font-bold text-[#274823]">{s.name}</span>
        <span className="text-[11px] text-[#88816d]">{s.system}</span>
      </div>
    ))}
    <span className="ml-auto text-5xl leading-none text-[#274823]" aria-hidden="true">
      {zeichen}
    </span>
  </div>
);

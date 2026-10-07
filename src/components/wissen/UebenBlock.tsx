import React from 'react';
import uebungen from '@/data/uebungen.json';

// Block «Üben»: führt von einem Begriffsartikel zu Aufgaben des Jass des
// Tages auf jassguru.ch, die genau dieses Thema üben. Daten: generate-uebungen.mjs
// (öffentliche Tagesblätter, nur publizierte mit Datum bis heute).

interface Blatt {
  datum: string;
  titel: string;
  url: string;
}

interface Eintrag {
  thema: string;
  anzahl: number;
  blaetter: Blatt[];
}

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function datumLesbar(iso: string): string {
  const [j, m, t] = iso.split('-').map(Number);
  return `${t}. ${MONATE[m - 1]} ${j}`;
}

export const UebenBlock: React.FC<{ articleId: string }> = ({ articleId }) => {
  const daten = uebungen as { alleAufgaben: string; artikel: Record<string, Eintrag> };
  const eintrag = daten.artikel[articleId];
  if (!eintrag || eintrag.blaetter.length === 0) return null;

  return (
    <section className="mt-[24px] pt-[24px] border-t border-[#f0eee7]" aria-labelledby="ueben">
      <h3 id="ueben" className="font-capita text-[20px] font-normal !text-black leading-[1.55] mb-[8px]">
        Üben
      </h3>
      <p className="font-inter text-[15px] leading-[1.6] text-black mb-[12px]">
        Im Jass des Tages auf jassguru.ch spielst du Aufgaben zum Thema «{eintrag.thema}» selbst durch.
      </p>
      <ul className="font-inter text-[15px] leading-[1.6] space-y-[6px] mb-[12px]">
        {eintrag.blaetter.map((b) => (
          <li key={b.datum}>
            <a href={b.url} className="text-[#ff0000] underline">
              {datumLesbar(b.datum)}: {b.titel}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-inter text-[14px] leading-[1.5] text-[#88816d]">
        <a href={daten.alleAufgaben} className="text-[#ff0000] underline">
          {daten.alleAufgaben.includes('/archiv/') ? 'Alle Aufgaben im Archiv' : 'Die Aufgabe von heute'}
        </a>
      </p>
    </section>
  );
};

export default UebenBlock;

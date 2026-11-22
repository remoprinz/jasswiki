import React from 'react';
import uebungen from '@/data/uebungen.json';
import { JdtVideo, hatFilm, type JdtVideoDaten } from '@/components/wissen/JdtVideo';

// Block «Üben»: führt von einem Begriffsartikel zu Aufgaben des Jass des
// Tages auf jassguru.ch, die genau dieses Thema üben. Daten: generate-uebungen.mjs
// (öffentliche Tagesblätter, nur publizierte mit Datum bis heute).
// Zuoberst das neueste Lösungsvideo der Auswahl (KELLE 22.11.2026), ohne Video
// steht der Block wie zuvor. Der Weg an den Tisch steht in der Karte darunter,
// darum mitTuer={false}.

interface Blatt {
  datum: string;
  titel: string;
  url: string;
}

interface Eintrag {
  thema: string;
  anzahl: number;
  /** Festes Lehrblatt (Datum), gesetzt in generate-uebungen.mjs (Karte SCHIRI
   *  «wiki-huelle» Teil C): dann steht allein dieses Blatt mit seinem Film da. */
  fest?: string;
  video?: JdtVideoDaten | null;
  blaetter: Blatt[];
}

/** Zeichnet der Block «Üben» für diesen Artikel etwas? (Die Hülle setzt den
 *  Baustein allein dann.) */
export const hatUeben = (articleId: string): boolean => {
  const daten = uebungen as unknown as { artikel: Record<string, Eintrag> };
  const eintrag = daten.artikel[articleId];
  return !!eintrag && eintrag.blaetter.length > 0;
};

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function datumLesbar(iso: string): string {
  const [j, m, t] = iso.split('-').map(Number);
  return `${t}. ${MONATE[m - 1]} ${j}`;
}

export const UebenBlock: React.FC<{ articleId: string }> = ({ articleId }) => {
  const daten = uebungen as unknown as { alleAufgaben: string; artikel: Record<string, Eintrag> };
  const eintrag = daten.artikel[articleId];
  if (!eintrag || eintrag.blaetter.length === 0) return null;
  const video = eintrag.video && hatFilm(eintrag.video) ? eintrag.video : null;

  // Festes Lehrblatt: der Film dieses Blattes und darunter der eine Verweis auf
  // das Archiv. Fehlt der Film, steht das Blatt als Verweis an seiner Stelle.
  if (eintrag.fest) {
    const blatt = eintrag.blaetter[0];
    return (
      <section className="mt-[24px] pt-[24px] border-t border-[#f0eee7]" aria-labelledby="ueben" data-ueben-fest={eintrag.fest}>
        <h3 id="ueben" className="font-capita text-[20px] font-normal !text-black leading-[1.55] mb-[8px]">
          Üben
        </h3>
        {video ? (
          <JdtVideo daten={video} mitTuer={false} />
        ) : (
          <p className="font-inter text-[15px] leading-[1.6] mb-[12px]">
            <a href={blatt.url} className="text-[#ff0000] underline">
              {datumLesbar(blatt.datum)}: {blatt.titel}
            </a>
          </p>
        )}
        <p className="font-inter text-[14px] leading-[1.5] text-[#88816d] text-center">
          <a href={daten.alleAufgaben} className="text-[#ff0000] underline">
            {daten.alleAufgaben.includes('/archiv/') ? 'Alle Aufgaben im Archiv' : 'Die Aufgabe von heute'}
          </a>
        </p>
      </section>
    );
  }

  return (
    <section className="mt-[24px] pt-[24px] border-t border-[#f0eee7]" aria-labelledby="ueben">
      <h3 id="ueben" className="font-capita text-[20px] font-normal !text-black leading-[1.55] mb-[8px]">
        Üben
      </h3>
      {video && <JdtVideo daten={video} mitTuer={false} />}
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

import React from 'react';
import leitartikel from '@/data/leitartikel.json';

// Weg vom Lesen an den Tisch (WELLE 07.11.2026, Auftrag POLIER auf Remos Wort).
// Die Sätze stammen wörtlich von jassguru.ch (Startseite und /online-jassen,
// beide von FEILE gefeilt und live), damit Wiki und Tafel dasselbe sagen.
// Design: die grüne Karte der Startseite («Hast du eine spezifische Frage?»),
// kein neues Bauteil. utm_medium sagt, welcher Weg wirkt.
//
// FR/IT: jasswiki ist heute einsprachig. Sobald Sprachen kommen, übersetzt
// DOLMETSCHER die drei Sätze (Platzhalter DE).

const JASSGURU = 'https://jassguru.ch';

export const jassguruLink = (pfad: string, ort: string): string =>
  `${JASSGURU}${pfad}?utm_source=jasswiki-ch&utm_medium=${ort}`;

// Die Jass-Apps sind ein neutrales Verzeichnis: dort steht keine Karte.
const OHNE_KARTE = new Set(['jassapps']);

interface Props {
  /** Eintrags-Key; Leitartikel tragen schon den Jassfreunde-Satz. */
  schluessel?: string;
  kategorie?: string;
  ort: string;
  abstand?: string;
}

export const JassenKarte: React.FC<Props> = ({ schluessel, kategorie, ort, abstand = 'mt-[32px]' }) => {
  if (kategorie && OHNE_KARTE.has(kategorie)) return null;
  const daten = leitartikel as { artikel: Record<string, unknown> };
  if (schluessel && schluessel in daten.artikel) return null;

  return (
    <aside
      aria-label="Online jassen"
      className={`not-prose ${abstand} bg-[#274823] rounded-[12px] border-[1.74px] border-black pt-[16px] sm:pt-[20px] px-[14px] sm:px-[17px] pb-[20px] sm:pb-[24px] flex flex-col items-center gap-[10px] sm:gap-[12px]`}
    >
      <p className="!font-capita !text-[22px] sm:!text-[28px] !font-bold text-center !text-white !leading-[1.2] !m-0">
        Jass sofort online. Auch ohne Mitspieler.
      </p>
      <p className="font-inter !text-[14px] sm:!text-[16px] !font-bold text-center !text-white !leading-[1.6] !m-0">
        Schieber gegen die Jass-KI, mit deinen Leuten oder am offenen Tisch.
      </p>
      <a
        href={jassguruLink('/arena/solo/', ort)}
        className="inline-flex items-center justify-center px-[20px] py-[8px] bg-[#ff0101] !text-white !no-underline rounded-[999px] hover:brightness-110 transition-all font-inter font-bold text-[15px] sm:text-[16px] text-center"
      >
        Sofort jassen
      </a>
      <a
        href={jassguruLink('/online-jassen/', ort)}
        className="font-inter text-[14px] !text-white underline leading-[1.5]"
      >
        Mehr über Online jassen
      </a>
    </aside>
  );
};

export default JassenKarte;

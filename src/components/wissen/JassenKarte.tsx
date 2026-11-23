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

// Die Karte (Remo 09.11.2026): die Marke JassGuru Arena mit dem Jassguru, wie auf der
// Startseite von jassguru.ch. Sie zeigt offen, wohin der Knopf führt,
// ein Satz, ein Knopf. «Auch allein» und die zweite Zeile sind weg, der zweite Link auch:
// Wer gerade eine Regel gelesen hat, entscheidet in einer Sekunde.
export const KARTE_TITEL = 'Jetzt online jassen.';

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
  /** Wortlaut und Ziel aus src/data/tueren.json (Karte als Tür nach dem Einstieg). */
  titel?: string;
  knopf?: string;
  pfad?: string;
}

// ── Zeile unter dem Artikeltitel (WELLE 07.11.2026, Remo 12:05: «Ich habe diese
// Wege gar nicht richtig gefunden»). Die Karte am Ende liegt am Telefon drei
// Bildschirme tief; die Zeile steht im ersten Bildschirm, gleich unter dem Titel.
// Fläche, kein Inhalt: Der Artikeltext bleibt SCHIRIs.
//
// Steht auf Regel-, Weis-, Ansage-, Schieber- und Taktikartikeln. Der Satz muss
// wörtlich stimmen: In der Arena wird Schieber gejasst, darum nennt die Zeile nur
// die Ansagen beim Namen, die man dort wirklich ansagen kann.
const ZEILE_KATEGORIEN = new Set([
  'regeln',
  'weis-regeln',
  'ansagen',
  'schieber',
  'taktiken-und-strategien',
]);
// FEILE 23.11.2026 (Remo: «der text ist zu lange»): die Familie «Gegenstand + jassen», zwei Wörter, auf
// jedem Artikeltyp gleich gebaut. Die grüne Pille und der Pfeil sagen, dass es hinausgeht und gleich
// losgeht, darum fallen «online» und «sofort» weg. Die Wörtlich-Probe hält: Obenabe und Undenufe sagt man
// im Schieber an, Slalom und Quer nimmt man in der Arena über den Schalter dazu.
const ZEILE_ANSAGE: Record<string, string> = {
  expressions_obenabe: 'Obenabe jassen',
  expressions_undenufe: 'Undenufe jassen',
  expressions_slalom: 'Slalom jassen',
  expressions_guschti: 'Quer jassen',
};

export const zeileSatz = (schluessel: string, kategorie: string): string | null => {
  // Der Artikel über JassGuru selbst trägt die Zeile auch, obwohl die Jassapps sonst neutral bleiben.
  if (schluessel === 'jassapps_jassguru') return 'Schieber jassen';
  if (!ZEILE_KATEGORIEN.has(kategorie)) return null;
  if (kategorie === 'taktiken-und-strategien') return 'Taktik ausprobieren';
  const ansage = ZEILE_ANSAGE[schluessel];
  if (ansage) return ansage;
  return 'Schieber jassen';
};

export const JassenZeile: React.FC<{ schluessel: string; kategorie: string }> = ({ schluessel, kategorie }) => {
  const satz = zeileSatz(schluessel, kategorie);
  if (!satz) return null;
  return (
    <div className="not-prose mt-[10px]" data-jassen-zeile>
      {/* Der Startknopf von JassGuru (Remo 23.11.2026): grüne Pille, Capita, links die Figur des JassGuru.
          Der Pfeil sagt, dass der Weg das Wiki verlässt. */}
      <a href={jassguruLink('/arena/', 'zeile')} className="jw-jassen-knopf">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="jw-jassen-knopf-figur"
          src="/marke/goepf-marke.png"
          srcSet="/marke/goepf-marke.png 1x, /marke/goepf-marke@2x.png 2x, /marke/goepf-marke@3x.png 3x"
          alt=""
          width={48}
          height={54}
        />
        <span>{satz}</span>
        <svg className="jw-jassen-knopf-pfeil" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11 11 3M4.5 3H11v6.5" />
        </svg>
      </a>
    </div>
  );
};

export const JassenKarte: React.FC<Props> = ({ schluessel, kategorie, ort, abstand = 'mt-[32px]', titel = KARTE_TITEL, knopf = 'Jass starten', pfad = '/arena/solo/' }) => {
  // Ausnahme: der Artikel über JassGuru selbst endet mit dem Weg an den Tisch.
  if (kategorie && OHNE_KARTE.has(kategorie) && schluessel !== 'jassapps_jassguru') return null;
  const daten = leitartikel as { artikel: Record<string, unknown> };
  if (schluessel && schluessel in daten.artikel) return null;

  return (
    <aside
      aria-label="Online jassen"
      className={`not-prose ${abstand} bg-[#274823] rounded-[12px] border-[1.74px] border-black pt-[16px] sm:pt-[20px] px-[14px] sm:px-[17px] pb-[20px] sm:pb-[24px] flex flex-col items-center gap-[10px] sm:gap-[12px]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture>
        <source type="image/avif" srcSet="/marke/marke-jassguru-arena.avif 1x, /marke/marke-jassguru-arena@3x.avif 3x" />
        <img
          src="/marke/marke-jassguru-arena.png"
          srcSet="/marke/marke-jassguru-arena.png 1x, /marke/marke-jassguru-arena@2x.png 2x, /marke/marke-jassguru-arena@3x.png 3x"
          alt="JassGuru Arena"
          width={128}
          height={133}
          loading="lazy"
          className="h-auto w-[104px] sm:w-[128px]"
        />
      </picture>
      <p className="!font-capita !text-[22px] sm:!text-[28px] !font-bold text-center !text-white !leading-[1.2] !m-0">
        {titel}
      </p>
      <a
        href={jassguruLink(pfad, ort)}
        className="inline-flex items-center justify-center px-[20px] py-[8px] bg-[#ff0101] !text-white !no-underline rounded-[999px] hover:brightness-110 transition-all font-inter font-bold text-[15px] sm:text-[16px] text-center"
      >
        {knopf}
      </a>
    </aside>
  );
};

export default JassenKarte;

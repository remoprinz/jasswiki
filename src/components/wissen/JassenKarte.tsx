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

// Die Karte (Remo 09.11.2026): das JassGuru-Logo zeigt offen, wohin der Knopf führt,
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
// FEILE 07.11.2026: «sofort» statt «gleich», wie Karte und jassguru.ch (T201).
// Slalom und Quer kommen in der Arena erst auf Wunsch dazu (Schalter beim
// Eröffnen), darum tragen sie kein «sofort» (Wörtlich-Probe, T167).
const ZEILE_ANSAGE: Record<string, string> = {
  expressions_obenabe: 'Obenabe sofort online jassen',
  expressions_undenufe: 'Undenufe sofort online jassen',
  expressions_slalom: 'Slalom online jassen',
  expressions_guschti: 'Quer online jassen',
};

export const zeileSatz = (schluessel: string, kategorie: string): string | null => {
  // Der Artikel über JassGuru selbst trägt die Zeile auch, obwohl die Jassapps sonst neutral bleiben.
  if (schluessel === 'jassapps_jassguru') return 'Schieber sofort online jassen';
  if (!ZEILE_KATEGORIEN.has(kategorie)) return null;
  if (kategorie === 'taktiken-und-strategien') return 'Diese Taktik online ausprobieren';
  const ansage = ZEILE_ANSAGE[schluessel];
  if (ansage) return ansage;
  return 'Schieber sofort online jassen';
};

export const JassenZeile: React.FC<{ schluessel: string; kategorie: string }> = ({ schluessel, kategorie }) => {
  const satz = zeileSatz(schluessel, kategorie);
  if (!satz) return null;
  return (
    <div className="not-prose mt-[4px]" data-jassen-zeile>
      <a href={jassguruLink('/arena/', 'zeile')} className="jw-jassen-zeile">
        <span aria-hidden className="jw-jassen-zeile-punkt" />
        {satz} ↗
      </a>
    </div>
  );
};

export const JassenKarte: React.FC<Props> = ({ schluessel, kategorie, ort, abstand = 'mt-[32px]' }) => {
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
      <img src="/jassguru-logo-weiss.svg" alt="JassGuru" width={300} height={52} loading="lazy" className="h-auto w-[150px] sm:w-[180px]" />
      <p className="!font-capita !text-[22px] sm:!text-[28px] !font-bold text-center !text-white !leading-[1.2] !m-0">
        {KARTE_TITEL}
      </p>
      <a
        href={jassguruLink('/arena/', ort)}
        className="inline-flex items-center justify-center px-[20px] py-[8px] bg-[#ff0101] !text-white !no-underline rounded-[999px] hover:brightness-110 transition-all font-inter font-bold text-[15px] sm:text-[16px] text-center"
      >
        Jassen starten
      </a>
    </aside>
  );
};

export default JassenKarte;

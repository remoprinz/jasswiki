import React from 'react';
import { InternalLinker } from '@/components/layout/InternalLinker';

// Bildschirmfotos zu einem Artikel (WELLE 07.11.2026, Artikel JassGuru).
// Die Bilder stehen ausserhalb des Artikeltexts: Korpus, llms-Dateien und MCP
// lesen den Text wie bisher, die Bilder gehören allein zur Seite. Zugeordnet
// wird über die Überschrift: Die Bilder folgen auf den Abschnitt, dessen
// «## Überschrift» genau so lautet. Fehlt die Überschrift, entfällt das Bild.
//
// Quelle der Bilder: jasstafel public/design/webp/startseite-*@2x.webp und
// public/images/landing/store-iphone-*.webp (Stand 07.11.2026), 480 breit.

interface Bild {
  src: string;
  alt: string;
}

const BREITE = 480;
const HOEHE: Record<string, number> = { kurz: 1039, store: 1044 };

const ARTIKEL_BILDER: Record<string, Record<string, Bild[]>> = {
  jassapps_jassguru: {
    'Drei Wege an den Tisch': [
      { src: '/bilder/jassguru/lobby.webp', alt: 'Lobby der JassGuru Arena mit «Jetzt jassen», «Privater Tisch» zu zweit oder zu viert, der Liga und dem Jass des Tages.' },
      { src: '/bilder/jassguru/mitjassen.webp', alt: 'Lobby mit einem offenen Tisch zum Mitjassen und dem Stammtisch.' },
    ],
    'Die Jass-KI: Albis 001 und AlphaJass': [
      { src: '/bilder/jassguru/tisch.webp', alt: 'Partie in der Arena: Du bist dran.' },
      { src: '/bilder/jassguru/tipp.webp', alt: 'Tipp vom Jassguru in der App: Austrumpfen mit dem Schilten Ober, dazu die Erklärung.' },
    ],
    'Jass des Tages': [
      { src: '/bilder/jassguru/jass-des-tages.webp', alt: 'Jass des Tages in der App: Erziele den Matsch wie aus dem Lehrbuch.' },
    ],
    'Liga, Rekorde und Jassfreunde': [
      { src: '/bilder/jassguru/profil.webp', alt: 'Spielerprofil mit dem Verlauf des Tisch-Elo.' },
    ],
    'Die Jasstafel für den echten Tisch': [
      { src: '/bilder/jassguru/tafel.webp', alt: 'Jasstafel mit Strichen auf der Z-Linie.' },
      { src: '/bilder/jassguru/rechner.webp', alt: 'Rechner der Jasstafel beim Schreiben einer Runde.' },
      { src: '/bilder/jassguru/gruppe.webp', alt: 'Gruppenstatistik mit dem Verlauf des Tisch-Elo.' },
    ],
  },
};

const hoeheVon = (src: string) =>
  /mitjassen|tipp|jass-des-tages/.test(src) ? HOEHE.store : HOEHE.kurz;

export const hatArtikelBilder = (schluessel: string) => schluessel in ARTIKEL_BILDER;

const BilderReihe: React.FC<{ bilder: Bild[] }> = ({ bilder }) => (
  <div className="not-prose my-[20px] flex flex-wrap justify-center gap-[12px] sm:gap-[16px]">
    {bilder.map((b) => (
      <figure key={b.src} className="!m-0 w-[calc(50%-6px)] max-w-[220px] sm:w-[200px]">
        <img
          src={b.src}
          alt={b.alt}
          width={BREITE}
          height={hoeheVon(b.src)}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto rounded-[12px] border border-[#e6e2d6] !m-0"
        />
        <figcaption className="mt-[6px] font-inter text-[12px] leading-[1.4] text-[#88816d] text-center">
          {b.alt}
        </figcaption>
      </figure>
    ))}
  </div>
);

/** Artikeltext in Abschnitte geteilt, nach jedem zugeordneten Abschnitt seine Bilder. */
export const TextMitBildern: React.FC<{ schluessel: string; text: string; farbwechsel?: boolean }> = ({
  schluessel,
  text,
  farbwechsel = false,
}) => {
  const zuordnung = ARTIKEL_BILDER[schluessel] ?? {};
  const abschnitte = text.split(/\n(?=## )/);
  return (
    <>
      {abschnitte.map((abschnitt, i) => {
        const kopf = abschnitt.match(/^## (.+)$/m)?.[1]?.trim();
        const bilder = kopf ? zuordnung[kopf] : undefined;
        return (
          <React.Fragment key={i}>
            <InternalLinker text={abschnitt} farbwechsel={farbwechsel} />
            {bilder && <BilderReihe bilder={bilder} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

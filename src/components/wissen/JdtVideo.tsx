import React, { useState } from 'react';
import { JDT_TEXTE, JDT_LINKS } from '@/data/jass-des-tages-texte';

/**
 * JDT-VIDEO (GEO/SEO P2/P3, KELLE 25.10.2026): das Lösungsvideo eines Jass des
 * Tages. Bis zum Klick steht allein das Deckbild (kein YouTube-Skript, keine
 * Cookies, keine Last), der Klick lädt die Einbettung von youtube-nocookie.
 * Ohne YouTube-Adresse spielt die Datei selbst. Das VideoObject reist mit:
 * Google liest es auch aus dem Body.
 *
 * Die Felder kommen fertig von aussen (gestern.json oder die P2-Liste von
 * LEUCHTTURM), der Baustein rät nichts.
 */
export interface JdtVideoDaten {
  datum: string; // JJJJ-MM-TT
  aufgabe: string;
  titel?: string;
  mp4: string;
  poster: string | null;
  dauer: string | null; // ISO 8601, etwa PT42S
  youtube: string | null;
}

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function datumLang(iso: string): string {
  const [j, m, t] = iso.split('-').map(Number);
  return `${t}. ${MONATE[m - 1]} ${j}`;
}

/** Die Video-Kennung aus shorts/ID, watch?v=ID, youtu.be/ID oder embed/ID. */
export function youtubeKennung(url: string | null): string | null {
  if (!url) return null;
  const m = /(?:youtu\.be\/|\/shorts\/|\/embed\/|[?&]v=)([A-Za-z0-9_-]{6,20})/.exec(url);
  return m ? m[1] : null;
}

/** Die Aufgabe ohne Schlusspunkt, damit sie nach dem Doppelpunkt sauber steht. */
function aufgabeKurz(s: string): string {
  return s.trim().replace(/[.\s]+$/, '');
}

export function videoObjekt(d: JdtVideoDaten) {
  const kennung = youtubeKennung(d.youtube);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `https://jassguru.ch/jass-des-tages/${d.datum}/#video`,
    name: `Jass des Tages vom ${datumLang(d.datum)}: ${aufgabeKurz(d.aufgabe || d.titel || '')}`,
    description: JDT_TEXTE.videoSatz,
    ...(d.poster ? { thumbnailUrl: d.poster } : {}),
    contentUrl: d.mp4,
    ...(kennung ? { embedUrl: `https://www.youtube.com/embed/${kennung}` } : {}),
    uploadDate: d.datum,
    ...(d.dauer ? { duration: d.dauer } : {}),
    inLanguage: 'de-CH',
    isFamilyFriendly: true,
    publisher: { '@id': 'https://jassguru.ch/#organization' },
    author: { '@id': 'https://jassguru.ch/#remo-prinz' },
  };
}

export const JdtVideo: React.FC<{ daten: JdtVideoDaten; mitTuer?: boolean }> = ({ daten, mitTuer = true }) => {
  const [laeuft, setLaeuft] = useState(false);
  const kennung = youtubeKennung(daten.youtube);
  const beschriftung = JDT_TEXTE.videoBeschriftung
    .replace('{datum}', datumLang(daten.datum))
    .replace('{aufgabe}', aufgabeKurz(daten.aufgabe || daten.titel || ''));

  return (
    <figure className="not-prose my-[20px]" data-jdt-video={daten.datum}>
      {/* Hochformat wie der Short: 9 zu 16, höchstens 320 breit. */}
      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-[12px] border-[1.74px] border-black bg-black">
        {laeuft && kennung ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${kennung}?autoplay=1&playsinline=1&rel=0`}
            title={beschriftung}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : laeuft ? (
          <video
            className="absolute inset-0 h-full w-full"
            src={daten.mp4}
            poster={daten.poster ?? undefined}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setLaeuft(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`${JDT_TEXTE.videoAbspielen}: ${beschriftung}`}
          >
            {daten.poster && (
              <img
                src={daten.poster}
                alt=""
                loading="lazy"
                decoding="async"
                width={360}
                height={640}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff0101] shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="#fff" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mx-auto mt-[12px] max-w-[480px] text-center">
        <span className="block font-capita text-[17px] font-bold leading-[1.35] text-black">{beschriftung}</span>
        <span className="mt-[4px] block font-inter text-[15px] leading-[1.6] text-black">
          {JDT_TEXTE.videoSatz}
        </span>
        {mitTuer && (
          <a href={JDT_LINKS.tuer} className="mt-[6px] inline-block font-inter text-[15px] font-bold text-[#ff0000] underline">
            {JDT_TEXTE.videoTuer}
          </a>
        )}
      </figcaption>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjekt(daten)) }}
      />
    </figure>
  );
};

export default JdtVideo;

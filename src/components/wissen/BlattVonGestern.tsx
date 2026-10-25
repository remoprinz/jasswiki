import React, { useEffect, useState } from 'react';
import { JdtVideo, datumLang } from '@/components/wissen/JdtVideo';
import { JDT_TEXTE, JDT_LINKS } from '@/data/jass-des-tages-texte';

/**
 * DAS BLATT VON GESTERN (GEO/SEO P3, KELLE 25.10.2026, Remo: «einfach das
 * Blatt von gestern inklusive des passenden Lösungsvideos zeigen»).
 *
 * Der Bau legt die Antwort von gestern.json ins HTML (Crawler lesen Karten,
 * Aufgabe und VideoObject ohne Skript). Im Browser fragt der Block einmal
 * nach: Liegt inzwischen ein jüngeres Blatt, tritt es an die Stelle des
 * gebauten. Gleiches Datum = kein zweiter Render.
 */
export interface GesternDaten {
  datum: string;
  titel: string;
  nummer: number | null;
  stufe: string;
  thema: string;
  hand: string[];
  karten: string;
  kartenBilder: Array<{ code: string; wort: string; avif: string; webp: string }>;
  aufgabe: string;
  loesungKurz: string;
  video: { mp4: string; poster: string | null; dauer: string | null; youtube: string | null };
  links: { blatt: string; heute: string; tuer: string };
}

/** Nur was die Form trägt, kommt durch: ein Fehlformat zeigt den Ersatzsatz. */
export function gesternGueltig(x: unknown): x is GesternDaten {
  const d = x as GesternDaten;
  return !!d && typeof d.datum === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.datum)
    && Array.isArray(d.kartenBilder) && !!d.video && typeof d.video.mp4 === 'string'
    && !!d.links && typeof d.links.blatt === 'string';
}

type Zustand = GesternDaten | null | 'fehler';

export const BlattVonGestern: React.FC<{ gebaut: GesternDaten | null }> = ({ gebaut }) => {
  const [daten, setDaten] = useState<Zustand>(gebaut);

  useEffect(() => {
    let lebt = true;
    const ab = new AbortController();
    const uhr = setTimeout(() => ab.abort(), 8000);
    fetch(JDT_LINKS.gestern, { signal: ab.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: unknown) => {
        if (!lebt) return;
        if (!gesternGueltig(j)) throw new Error('Form');
        // setIfChanged: dasselbe Datum heisst dasselbe Blatt.
        setDaten((alt) => (alt && alt !== 'fehler' && alt.datum === j.datum ? alt : j));
      })
      .catch(() => {
        if (lebt) setDaten((alt) => (alt && alt !== 'fehler' ? alt : 'fehler'));
      })
      .finally(() => clearTimeout(uhr));
    return () => {
      lebt = false;
      ab.abort();
      clearTimeout(uhr);
    };
  }, []);

  return (
    <section aria-labelledby="gestern" className="not-prose pt-[24px] border-t border-[#f0eee7]" data-gestern={daten && daten !== 'fehler' ? daten.datum : ''}>
      <h2 id="gestern" className="font-capita text-[22px] sm:text-[26px] font-bold !text-black leading-[1.3] mb-[4px]">
        {JDT_TEXTE.gesternTitel}
      </h2>

      {daten === 'fehler' && (
        <p className="font-inter text-[16px] leading-[1.6] text-black mt-[8px]">
          {JDT_TEXTE.ohneDaten}{' '}
          <a href={JDT_LINKS.heute} className="text-[#ff0000] underline">{JDT_TEXTE.ohneDatenLink}</a>
        </p>
      )}

      {/* Laden: der Platz steht schon, damit nichts springt. */}
      {daten === null && <div className="min-h-[640px]" aria-hidden="true" />}

      {daten && daten !== 'fehler' && (
        <>
          <p className="font-inter text-[14px] leading-[1.5] text-[#88816d] mb-[12px]">
            {datumLang(daten.datum)}
            {daten.nummer ? ` · Nr. ${daten.nummer}` : ''}
            {daten.stufe ? ` · ${daten.stufe}` : ''}
            {daten.thema ? ` · ${daten.thema}` : ''}
          </p>
          <p className="font-capita text-[18px] sm:text-[20px] font-bold text-black leading-[1.4] mb-[16px]">
            {daten.aufgabe || daten.titel}
          </p>

          {/* Die neun Karten, überlappend wie die Hand am Tisch. */}
          <ul className="jdt-hand mx-auto mb-[8px] flex max-w-[487px] justify-center" aria-label="Die neun Karten">
            {daten.kartenBilder.map((k) => (
              <li key={k.code} className="jdt-karte">
                <picture>
                  <source type="image/avif" srcSet={k.avif} />
                  <img
                    src={k.webp}
                    alt={k.wort}
                    width={84}
                    height={131}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
                  />
                </picture>
              </li>
            ))}
          </ul>

          <JdtVideo
            daten={{
              datum: daten.datum,
              aufgabe: daten.aufgabe,
              titel: daten.titel,
              mp4: daten.video.mp4,
              poster: daten.video.poster,
              dauer: daten.video.dauer,
              youtube: daten.video.youtube,
            }}
            mitTuer
          />

          <div className="mt-[8px] flex flex-wrap items-center justify-center gap-[12px]">
            <a
              href={daten.links.heute}
              className="inline-flex items-center justify-center rounded-[999px] bg-[#ff0101] px-[20px] py-[10px] font-inter text-[16px] font-bold text-white !no-underline hover:brightness-110"
            >
              {JDT_TEXTE.knopfSpielen}
            </a>
            <a href={daten.links.blatt} className="font-inter text-[16px] font-bold text-[#ff0000] underline">
              {JDT_TEXTE.zumBlatt}
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default BlattVonGestern;

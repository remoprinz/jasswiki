import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SPRACHEN, adresseLesen, fassungDa, kennungZumPfad, lektoratOffen, SPRACH_TEXTE, sprachPfad, Sprache } from '@/lib/sprachen';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

/**
 * DE · FR · IT über dem Artikel, dazu der Lektorat-Vermerk und die hreflang-Zeilen.
 * Sie erscheint allein auf Seiten mit einer Übersetzung: Alle übrigen deutschen
 * Seiten bleiben Zeichen für Zeichen, wie sie sind.
 */
export const SprachWahl: React.FC = () => {
  const router = useRouter();
  const { sprache, pfad } = adresseLesen(router.asPath);
  const id = kennungZumPfad(pfad);
  if (!id) return null;
  const da = SPRACHEN.filter((s) => fassungDa(id, s));
  if (da.length === 0) return null;

  const felder: { kuerzel: string; href: string; aktiv: boolean; lang: string }[] = [
    { kuerzel: 'DE', href: pfad, aktiv: sprache === null, lang: 'de' },
    ...da.map((s: Sprache) => ({ kuerzel: s.toUpperCase(), href: sprachPfad(pfad, s), aktiv: sprache === s, lang: s })),
  ];

  return (
    <>
      <Head>
        {felder.map((f) => (
          <link key={f.lang} rel="alternate" hrefLang={f.lang} href={`${SITE_URL}${f.href}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${pfad}`} />
      </Head>
      <nav data-sprachwahl="" aria-label="Sprache / Langue / Lingua" className="flex flex-wrap items-center gap-x-[10px] gap-y-1 pt-[8px] font-inter text-[14px] leading-[20px]">
        {felder.map((f) =>
          f.aktiv ? (
            <span key={f.lang} aria-current="true" lang={f.lang} className="font-semibold text-black">{f.kuerzel}</span>
          ) : (
            <Link key={f.lang} href={f.href} lang={f.lang} hrefLang={f.lang} prefetch={false} className="text-[#88816d] underline hover:text-[#ff0000]">{f.kuerzel}</Link>
          ),
        )}
        {sprache && lektoratOffen(id, sprache) ? (
          <span data-lektorat-vermerk="" className="italic text-[#88816d]">{SPRACH_TEXTE[sprache].vermerk}</span>
        ) : null}
      </nav>
    </>
  );
};

import React from 'react';
import { ArtikelKarten, KapitelKarte, artikelStub, type ArtikelStub } from '@/components/wissen/ArtikelKarten';
import {
  artikel as gArtikel,
  eintraegeDerRubrik,
  kapitelAnAdresse,
  rubrikAnAdresse,
  type Darstellung,
  type GEintrag,
} from '@/lib/gliederung';

// --- Gliederung (Schritt 3, 22.11.2026) ------------------------------------------
// Rubrik- und Kapitelseiten lesen Ort und Reihenfolge aus src/data/gliederung.json.

export type GBlock =
  | { art: 'artikel'; artikel: ArtikelStub }
  | { art: 'kapitelkarte'; name: string; href: string; anzahl: number; frage?: string }
  | { art: 'abschnitt'; name: string; slug: string; artikel: ArtikelStub[] };

export interface GSeite {
  name: string;
  /** Die Frage des Lesers (Schritt 4), steht unter der Überschrift. */
  frage?: string;
  /** Rubrik über einer Kapitelseite (für die Brotkrumen). */
  eltern?: { name: string; href: string };
  darstellung: Darstellung | 'kapitel';
  bloecke: GBlock[];
  artikelZahl: number;
  kapitelZahl: number;
}

const stubs = (eintraege: GEintrag[]): ArtikelStub[] =>
  eintraege.flatMap((e) => {
    const a = gArtikel(e.id);
    return a ? [artikelStub(a)] : [];
  });

/** Die Seite der Gliederung an einer Adresse (Rubrik oder Kapitel), sonst null. */
export function gliederungsSeite(adresse: string): GSeite | null {
  const rubrik = rubrikAnAdresse(adresse);
  if (rubrik) {
    const alle = eintraegeDerRubrik(rubrik);
    const bloecke: GBlock[] = rubrik.teile.flatMap((t): GBlock[] => {
      if (t.art === 'eintrag') return stubs([t.eintrag]).map((s) => ({ art: 'artikel' as const, artikel: s }));
      if (rubrik.darstellung === 'kapitelkarten') {
        return [{ art: 'kapitelkarte', name: t.kapitel.name, href: t.kapitel.href, anzahl: t.kapitel.eintraege.length, ...(t.kapitel.frage ? { frage: t.kapitel.frage } : {}) }];
      }
      return [{ art: 'abschnitt', name: t.kapitel.name, slug: t.kapitel.slug, artikel: stubs(t.kapitel.eintraege) }];
    });
    if (rubrik.darstellung === 'alphabet') {
      bloecke.sort((a, b) =>
        a.art === 'artikel' && b.art === 'artikel' ? a.artikel.titel.localeCompare(b.artikel.titel, 'de') : 0,
      );
    }
    return {
      name: rubrik.name,
      ...(rubrik.frage ? { frage: rubrik.frage } : {}),
      darstellung: rubrik.darstellung,
      bloecke,
      artikelZahl: alle.length,
      kapitelZahl: rubrik.teile.filter((t) => t.art === 'kapitel').length,
    };
  }
  const k = kapitelAnAdresse(adresse);
  if (k) {
    const artikel = stubs(k.kapitel.eintraege);
    return {
      name: k.kapitel.name,
      ...(k.kapitel.frage ? { frage: k.kapitel.frage } : {}),
      eltern: { name: k.rubrik.name, href: k.rubrik.adresse },
      darstellung: 'kapitel',
      bloecke: artikel.map((s) => ({ art: 'artikel' as const, artikel: s })),
      artikelZahl: artikel.length,
      kapitelZahl: 0,
    };
  }
  return null;
}

/** Die Zeile unter der Überschrift, aus den bisherigen Sätzen der Vorlagen. */
export const zahlZeile = (s: GSeite): string =>
  s.kapitelZahl > 0
    ? `${s.kapitelZahl} ${s.kapitelZahl === 1 ? 'Themenbereich' : 'Themenbereiche'} mit insgesamt ${s.artikelZahl} Artikeln`
    : `${s.artikelZahl} Artikel in dieser Kategorie`;

const anfang = (titel: string) => titel.charAt(0).toUpperCase();

/** Inhalt einer Rubrik- oder Kapitelseite in der Reihenfolge der Gliederung. */
export const GliederungsBloecke: React.FC<{ seite: GSeite }> = ({ seite }) => {
  if (seite.darstellung === 'alphabet') {
    const artikel = seite.bloecke.flatMap((b) => (b.art === 'artikel' ? [b.artikel] : []));
    const buchstaben = Array.from(new Set(artikel.map((a) => anfang(a.titel))));
    return (
      <>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {buchstaben.map((b) => (
            <a
              key={b}
              href={`#letter-${b}`}
              className="px-3 py-1 bg-[#f0eee7] text-[#88816d] rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors text-sm font-medium"
            >
              {b}
            </a>
          ))}
        </div>
        <div className="grid gap-4 sm:gap-5">
          {buchstaben.map((b) => (
            <React.Fragment key={b}>
              <h2 id={`letter-${b}`} className="text-2xl font-bold text-[#ff0000] mt-6 mb-2 pt-4 border-t border-[#f0eee7]">
                {b}
              </h2>
              <ArtikelKarten artikel={artikel.filter((a) => anfang(a.titel) === b)} />
            </React.Fragment>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="grid gap-4 sm:gap-5">
      {seite.bloecke.map((b, i) => {
        if (b.art === 'artikel') return <ArtikelKarten key={`a-${i}`} artikel={[b.artikel]} />;
        if (b.art === 'kapitelkarte') return <KapitelKarte key={b.href} name={b.name} href={b.href} anzahl={b.anzahl} frage={b.frage} />;
        return (
          <section key={b.slug} id={b.slug} className="pt-2">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[16px] leading-[1.2]">{b.name}</h2>
            <ArtikelKarten artikel={b.artikel} />
          </section>
        );
      })}
    </div>
  );
};

/** Die Frage des Lesers unter der Überschrift einer Rubrik- oder Kapitelseite (Schritt 4). */
export const LeserFrage: React.FC<{ frage: string }> = ({ frage }) => (
  <p className="font-capita text-[17px] sm:text-[20px] font-bold text-black leading-[1.4]" data-leserfrage>
    {frage}
  </p>
);

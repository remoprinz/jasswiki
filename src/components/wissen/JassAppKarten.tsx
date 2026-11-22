import React from 'react';
import Link from 'next/link';
import type { JassApp } from '@/types/jass-lexikon';

// Je Jass-App eine Karte auf /jassapps/ (Karte SCHIRI «wiki-vorlagen», Teil C,
// 22.11.2026): Name, Zweck, Plattformen, Anbieter, Verweis auf den Artikel,
// geordnet nach Unterrubrik. Alle Angaben aus metadata.app; ein fehlendes Feld
// fällt weg, der Name fällt auf den Artikeltitel zurück.

export interface AppEintrag {
  id: string;
  url: string;
  titel: string;
  app: JassApp | null;
}

export interface AppGruppe {
  name: string;
  url: string;
  apps: AppEintrag[];
}

const Angabe: React.FC<{ wort: string; wert?: string }> = ({ wort, wert }) =>
  wert ? (
    <p className="font-inter text-[13px] leading-[1.5] text-[#88816d] m-0">
      <span className="font-semibold text-[#5f5b53]">{wort}:</span> {wert}
    </p>
  ) : null;

export const JassAppKarten: React.FC<{ gruppen: AppGruppe[] }> = ({ gruppen }) => {
  if (gruppen.every((g) => g.apps.length === 0)) return null;
  return (
    <div className="space-y-8" data-app-karten>
      {gruppen.map((gruppe) => (
        <section key={gruppe.url} aria-label={gruppe.name}>
          <h2 className="font-capita text-[20px] sm:text-[24px] font-bold text-black mb-[12px] leading-[1.25]">
            <Link href={gruppe.url} className="!text-black hover:!text-[#ff0000] transition-colors">
              {gruppe.name}
            </Link>
          </h2>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {gruppe.apps.map((e) => {
              const plattformen = (e.app?.plattformen ?? []).filter(Boolean).join(', ');
              return (
                <Link key={e.id} href={e.url} className="group block" data-app-karte={e.id}>
                  <div className="h-full bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[16px] py-[12px] sm:py-[14px]">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0 space-y-[4px]">
                        <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] m-0">
                          {e.app?.name ?? e.titel}
                        </h3>
                        {e.app?.zweck && (
                          <p className="font-inter text-[14px] leading-[1.5] text-black m-0">{e.app.zweck}</p>
                        )}
                        <Angabe wort="Plattformen" wert={plattformen || undefined} />
                        <Angabe wort="Anbieter" wert={e.app?.anbieter} />
                      </div>
                      <div className="flex-shrink-0 text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all mt-[2px]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default JassAppKarten;

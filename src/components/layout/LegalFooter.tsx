import { JassWikiLogo } from './JassWikiLogo';

export const LegalFooter = () => {
  return (
    <footer className="mt-0 w-full">
      {/* Mobile / Tablet */}
      <div className="lg:hidden w-full">
        <div className="w-full bg-[#f0eee7] px-4 py-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[14px] leading-[1.5] font-inter text-[#6b6b6b]">
              Jassen ist vom Bundesamt für Kultur (BAK) als lebendige Tradition der Schweiz anerkannt. JassWiki führt das offizielle Logo «Lebendige Traditionen» mit Genehmigung des BAK.
            </p>
            <img
              src="/logo_lebendige_traditionen_hellgrau.png"
              alt="Logo Lebendige Traditionen"
              className="w-[132px] h-auto flex-shrink-0"
            />
          </div>
          {/* BAK-Förder-Nennung. Grösse nach Merkblatt: Bundeslogo-Block (1419/3273
              des Assets) min. 32mm — 48px Gesamthöhe = 35mm. Farbig/POS auf hellem Grund. */}
          <div className="mt-4 border-t border-black/10 pt-4">
            <p className="text-[13px] font-inter text-[#6b6b6b]">Unterstützt durch:</p>
            <img
              src="/bak/EDI_BAK_D_RGB_POS_QUER.png"
              alt="Logo Bundesamt für Kultur — Unterstützt durch das BAK"
              className="mt-2 h-12 w-auto"
            />
            <p className="mt-3 text-[13px] leading-[1.5] font-inter text-[#6b6b6b]">
              Der Jassverband Schweiz wird für das Projekt «Zeitgemässe Vermittlung der Jasskultur 2026» vom Bundesamt für Kultur unterstützt.
            </p>
          </div>
        </div>

        <div className="w-full bg-black px-4 pt-7 pb-6">
          <div className="flex items-start justify-between gap-4">
            <JassWikiLogo className="h-[34px] w-auto" inverted />
            <p className="max-w-[210px] text-[14px] leading-[1.55] font-inter text-[#c2c2c2]">
              JassWiki.ch ist eine Initiative vom Jassverband Schweiz –{' '}
              <a href="https://jassverband.ch" target="_blank" rel="noopener noreferrer" className="underline">
                jassverband.ch
              </a>
              .
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-[13px] leading-[1.5] font-inter text-white/40">
              © {new Date().getFullYear()} jasswiki.ch
            </p>
            <img
              src="/jvs-logo-farbig-weiss-kurz.svg"
              alt="Jassverband Schweiz"
              className="h-[20px] w-auto opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block w-full">
        <div className="w-full bg-[#f0eee7]">
          <div className="max-w-[1160px] mx-auto px-8 py-6">
            <div className="flex items-start justify-between gap-8">
              <p className="text-[15px] leading-[1.6] font-inter text-[#6b6b6b]">
                Jassen ist vom Bundesamt für Kultur (BAK) als lebendige Tradition der Schweiz anerkannt. JassWiki führt das offizielle Logo «Lebendige Traditionen» mit Genehmigung des BAK.
              </p>
              <img
                src="/logo_lebendige_traditionen_hellgrau.png"
                alt="Logo Lebendige Traditionen"
                className="w-[199px] h-auto flex-shrink-0"
              />
            </div>
            {/* BAK-Förder-Nennung. Grösse nach Merkblatt Pt. 7: Bundeslogo-Block (1419/3273
                des Assets) in Originalgrösse 55mm ≈ 208px — 73px Gesamthöhe. Farbig/POS. */}
            <div className="mt-5 flex items-center justify-between gap-8 border-t border-black/10 pt-5">
              <div className="flex-shrink-0">
                <p className="text-[13px] font-inter text-[#6b6b6b]">Unterstützt durch:</p>
                <img
                  src="/bak/EDI_BAK_D_RGB_POS_QUER.png"
                  alt="Logo Bundesamt für Kultur — Unterstützt durch das BAK"
                  className="mt-2 h-[73px] w-auto"
                />
              </div>
              <p className="max-w-[430px] text-[13px] leading-[1.5] font-inter text-[#6b6b6b]">
                Der Jassverband Schweiz wird für das Projekt «Zeitgemässe Vermittlung der Jasskultur 2026» vom Bundesamt für Kultur unterstützt.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-black">
          <div className="max-w-[1160px] mx-auto px-8 pt-9 pb-8">
            <div className="flex items-start justify-between gap-10">
              <JassWikiLogo className="h-[40px] w-auto" inverted />
              <p className="max-w-[430px] text-[15px] leading-[1.6] font-inter text-[#c2c2c2]">
                JassWiki.ch ist eine Initiative vom Jassverband Schweiz –{' '}
                <a href="https://jassverband.ch" target="_blank" rel="noopener noreferrer" className="underline">
                  jassverband.ch
                </a>
                .
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <p className="text-[13px] leading-[1.54] font-inter text-white/40">
                © {new Date().getFullYear()} jasswiki.ch
              </p>
              <img
                src="/jvs-logo-farbig-weiss-kurz.svg"
                alt="Jassverband Schweiz"
                className="h-[22px] w-auto opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

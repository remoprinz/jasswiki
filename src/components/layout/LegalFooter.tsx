import { JassWikiLogo } from './JassWikiLogo';

export const LegalFooter = () => {
  return (
    <footer className="mt-0 w-full">
      {/* Mobile / Tablet */}
      <div className="lg:hidden w-full">
        <div className="w-full bg-[#f0eee7] px-4 py-5 flex items-start justify-between gap-4">
          <p className="text-[14px] leading-[1.5] font-inter text-[#6b6b6b]">
            Jassen ist vom Bundesamt für Kultur (BAK) als lebendige Tradition der Schweiz anerkannt. JassWiki führt das offizielle Logo «Lebendige Traditionen» mit Genehmigung des BAK.
          </p>
          <img
            src="/logo_lebendige_traditionen_hellgrau.png"
            alt="Logo Lebendige Traditionen"
            className="w-[132px] h-auto flex-shrink-0"
          />
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
          <div className="max-w-[1160px] mx-auto px-8 py-6 flex items-start justify-between gap-8">
            <p className="text-[15px] leading-[1.6] font-inter text-[#6b6b6b]">
              Jassen ist vom Bundesamt für Kultur (BAK) als lebendige Tradition der Schweiz anerkannt. JassWiki führt das offizielle Logo «Lebendige Traditionen» mit Genehmigung des BAK.
            </p>
            <img
              src="/logo_lebendige_traditionen_hellgrau.png"
              alt="Logo Lebendige Traditionen"
              className="w-[199px] h-auto flex-shrink-0"
            />
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

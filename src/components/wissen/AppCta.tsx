import React from 'react';
import Link from 'next/link';

interface AppCtaProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export const AppCta: React.FC<AppCtaProps> = ({
  title = 'Bereit zum Jassen?',
  description = 'Nutze dein Wissen in der digitalen Jasstafel! Spiele mit Freunden und fuehre Statistiken.',
  buttonLabel = 'Frage den JassWiki Chat',
  buttonHref = '/gpt',
}) => {
  return (
    <div className="mt-[40px]">
      <div className="mx-auto w-full max-w-[817px] rounded-[12px] border-[1.74px] border-black bg-[#274823] px-[17px] pt-[20px] pb-[29px]">
        <div className="flex flex-col-reverse items-center justify-start gap-[12px]">
          {/* Reihenfolge + Typo exakt nach Penpot */}
          <Link
            href={buttonHref}
            className="inline-flex h-[47px] w-[258px] flex-row-reverse items-center justify-start gap-[8px] rounded-[999px] bg-[#ff0101] px-[20px] py-[8px] !no-underline"
          >
            <span className="h-[31px] text-[20px] leading-[1.54999995] font-normal text-white">􁒙</span>
            <span className="h-[24px] text-center font-inter text-[16px] leading-[1.5] font-bold text-white">
              {buttonLabel}
            </span>
          </Link>

          <div className="w-full text-center font-inter text-[16px] leading-[1.75] font-bold text-white">
            {description}
          </div>

          <div className="w-full text-center font-capita text-[28px] leading-[1.1428571429] font-bold text-white">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCta;

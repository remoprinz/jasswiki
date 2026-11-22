import React, { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SeoHead } from '@/components/layout/SeoHead';
import { JassenKarte } from '@/components/wissen/JassenKarte';
import { startChips } from '@/components/wissen/rubriken';
import { FaBalanceScale, FaBook, FaHandPointRight, FaBullhorn, FaChessKnight } from 'react-icons/fa';
import { GiPokerHand } from 'react-icons/gi';
import { CgSwiss } from 'react-icons/cg';
import { FaHouse } from 'react-icons/fa6';
import { GrMultiple } from 'react-icons/gr';
import { MdPhoneIphone } from 'react-icons/md';
import { VscReferences } from 'react-icons/vsc';
import type { IconType } from 'react-icons';

const ICON_COLORS: Record<string, string> = {
    jassen: 'bg-white border border-[#e8e6df]',
    regeln: 'bg-[#ff4b55]',
    'weis-regeln': 'bg-[#ff7a1a]',
    geschichte: 'bg-[#f6b21a]',
    'grundlagen-kultur': 'bg-[#2bb752]',
    schieber: 'bg-[#3b82f6]',
    ansagen: 'bg-[#db2777]',
    'taktiken-und-strategien': 'bg-[#0d9488]',
    begriffe: 'bg-[#6366f1]',
    varianten: 'bg-[#a855f7]',
    jassapps: 'bg-[#06b6d4]',
    referenzen: 'bg-[#6b7280]',
};

const CHIP =
    'bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors';

// Die bisherige Chip-Reihe ohne «Schieber lernen» (/schieber/grundlagen/),
// den der Chip «Schieber» aus rubriken.json ersetzt.
const WEITERE_CHIPS: { wort: string; pfad: string }[] = [
    { wort: 'Jass des Tages', pfad: '/jass-des-tages/' },
    { wort: 'Weis-Regeln', pfad: '/weis-regeln/' },
    { wort: 'Jass-ABC', pfad: '/begriffe/' },
    { wort: 'Etymologie «Matsch»', pfad: '/geschichte/wortherkunft/etymologie-des-begriffs-matsch/' },
    { wort: 'Referenzen', pfad: '/referenzen/' },
];

const WissenHomePage = () => {
    const breadcrumbItems = [{ name: 'Jass-Wiki', href: '/' }];
    const GPT_REDIRECT_URL = 'https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname === 'gpt.jasswiki.ch') {
                window.location.replace(GPT_REDIRECT_URL);
                return;
            }
        }
    }, []);

    useEffect(() => {
        document.body.classList.add('lexikon-page');
        return () => {
            document.body.classList.remove('lexikon-page');
        };
    }, []);

    const categories: { slug: string; name: string; description: string; icon: IconType }[] = [
        {
            slug: 'jassen',
            name: 'Jassen',
            description: 'Das Schweizer Nationalkartenspiel: Regeln, Varianten, Karten, Geschichte und Kultur im Überblick',
            icon: CgSwiss,
        },
        {
            slug: 'regeln',
            name: 'Regeln',
            description: 'Alle offiziellen Spielregeln, Sonderregeln und Ausnahmefälle im Detail',
            icon: FaBalanceScale,
        },
        { 
            slug: 'weis-regeln', 
            name: 'Weis-Regeln',
            description: 'Weis, Stöck und ihre Punkte: was zählt und wer schreibt',
            icon: GiPokerHand,
        },
        { 
            slug: 'geschichte', 
            name: 'Geschichte',
            description: 'Wie entstand das Jassen? Woher das Jassen kommt und wie es in die Schweiz gelangte',
            icon: FaBook,
        },
        { 
            slug: 'grundlagen-kultur', 
            name: 'Grundlagen & Kultur',
            description: 'Kartenwerte, Spielablauf und die kulturelle Bedeutung des Jassens in der Schweiz',
            icon: CgSwiss,
        },
        {
            slug: 'schieber',
            name: 'Schieber',
            description: 'Die beliebteste Jassvariante: Regeln, Taktik und Konventionen',
            icon: FaHandPointRight,
        },
        {
            slug: 'ansagen',
            name: 'Ansagen',
            description: 'Obenabe, Undenufe, Slalom, Tutti und alle weiteren Ansagen',
            icon: FaBullhorn,
        },
        {
            slug: 'taktiken-und-strategien',
            name: 'Taktiken & Strategien',
            description: 'Verwerfen, Anziehen und weitere Signale: so verständigen sich Partner am Tisch',
            icon: FaChessKnight,
        },
        { 
            slug: 'begriffe', 
            name: 'Jass-Begriffe',
            description: 'Von «Ablupf» bis «Wand»: die Jass-Ausdrücke mit Bedeutung und Regel',
            icon: FaHouse,
        },
        { 
            slug: 'varianten', 
            name: 'Jass-Varianten',
            description: 'Coiffeur, Differenzler, Pandur und weitere Jassarten mit ihren Regeln',
            icon: GrMultiple,
        },
        { 
            slug: 'jassapps', 
            name: 'Jassapps',
            description: 'Digitale Jasstafeln und Online-Jass im Überblick',
            icon: MdPhoneIphone,
        },
        { 
            slug: 'referenzen', 
            name: 'Referenzen',
            description: 'Quellen, Literatur und Experten rund um das Jassen',
            icon: VscReferences,
        }
    ];

    return (
        <>
            <SeoHead
                title="JassWiki: Jass, Jassregeln und alles rund ums Jassen"
                description="Das Lexikon zum Jass, dem Schweizer Nationalspiel: Spielregeln, Weis, Varianten, Strategien und Jass-Begriffe verständlich erklärt."
            />
            <LexikonLayout breadcrumbItems={breadcrumbItems}>

            {/* Hero Section */}
            <div className="mb-[24px] sm:mb-[32px] not-prose">
                <a
                    href="https://jassverband.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide text-[#274823] hover:underline mb-[10px] inline-block"
                >
                    Eine Initiative vom Jassverband Schweiz
                </a>
                <h1 className="font-capita text-[26px] sm:text-[32px] lg:text-[42px] font-bold text-[#ff0000] leading-[1.14] mb-[12px] sm:mb-[16px]">
                    JassWiki: Alles rund ums Jassen
                </h1>
                <p className="font-capita text-[17px] sm:text-[20px] font-bold text-black leading-[1.4] mb-[8px]">
                    Regeln, Varianten & Strategien
                </p>
                <p className="font-inter text-[14px] sm:text-[16px] text-[#000000] leading-[1.55]">
                    Von den Grundlagen bis zur Taktik: das Nachschlagewerk zum Schweizer Nationalspiel.
                </p>
            </div>

            {/* Tags/Pills (Karte SCHIRI «wiki-vorlagen», Teil E): vorn die Chips aus
                rubriken.json (verweise.start_chips), am Handy im ersten Bildschirm. */}
            <div className="not-prose mb-[24px] sm:mb-[32px]" data-start-chips>
                <h2 className="font-capita text-[17px] sm:text-[20px] font-bold !text-black leading-[1.4] mb-[12px] sm:mb-[16px]">
                    Beliebt bei Jassern
                </h2>
                <div className="flex flex-wrap gap-[10px]">
                    {[...startChips(), ...WEITERE_CHIPS]
                        .filter((c, i, alle) => alle.findIndex((d) => d.pfad === c.pfad) === i)
                        .map((c) => (
                            <Link key={c.pfad} href={c.pfad} className={CHIP}>
                                {c.wort}
                            </Link>
                        ))}
                </div>
            </div>

            <hr className="border-[#f0eee7] mb-[24px]" />

            {/* Kategorien — Single Column mit Icons */}
            <div className="not-prose mb-[24px] sm:mb-[32px]">
                <h2 className="font-capita text-[18px] sm:text-[20px] font-bold !text-black leading-[1.4] mb-[16px] sm:mb-[24px]">
                    Was möchtest du wissen?
                </h2>
                
                <div className="flex flex-col gap-[10px] sm:gap-[16px]">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const colorClass = ICON_COLORS[category.slug] || 'bg-[#274823]';
                        return (
                            <Link 
                                key={category.slug}
                                href={`/${category.slug}/`} 
                                className="group block"
                            >
                                <div className="rounded-[12px] border border-[#e8e6df] bg-[#f0eee7]/50 px-[14px] sm:px-[20px] py-[12px] sm:py-[16px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors">
                                    <div className="flex items-center gap-[12px] sm:gap-[16px] mb-[6px] sm:mb-[8px]">
                                        {category.slug === 'jassen' ? (
                                            <div className="rounded-[10px] sm:rounded-[12px] flex-shrink-0 mt-[4px] w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] overflow-hidden">
                                                <img
                                                    src="/swiss-cross.png"
                                                    alt="Schweizerkreuz"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className={`${colorClass} rounded-[10px] sm:rounded-[12px] p-[8px] sm:p-[10px] flex-shrink-0 mt-[4px]`}>
                                                <Icon size={18} className="text-white sm:hidden" />
                                                <Icon size={22} className="text-white hidden sm:block" />
                                            </div>
                                        )}
                                        <h3 className="font-capita text-[16px] sm:text-[18px] font-bold !text-black leading-[1.3] group-hover:!text-[#ff0000] transition-colors">
                                            {category.name}
                                        </h3>
                                    </div>
                                    <div className="pl-[42px] sm:pl-[58px]">
                                        <p className="font-inter text-[13px] sm:text-[14px] text-[#88816d] leading-[1.5] mb-[6px] sm:mb-[8px]">
                                            {category.description}
                                        </p>
                                        <span className="font-inter text-[12px] sm:text-[13px] font-medium text-[#2bb752] inline-flex items-center gap-[4px] group-hover:gap-[8px] transition-all">
                                            Mehr erfahren <ChevronRight className="w-[13px] h-[13px]" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Weg an den Tisch (WELLE 07.11.2026) */}
            <div className="mb-[24px] sm:mb-[32px]">
                <JassenKarte ort="start" abstand="mt-0" />
            </div>

            {/* CTA Section */}
            <div className="not-prose bg-[#274823] rounded-[12px] border-[1.74px] border-black pt-[16px] sm:pt-[20px] px-[14px] sm:px-[17px] pb-[20px] sm:pb-[29px] mb-[24px] sm:mb-[32px] flex flex-col items-center gap-[10px] sm:gap-[12px]">
                <h3 className="font-capita text-[22px] sm:text-[28px] font-bold text-center text-white leading-[1.2] m-0">
                    Hast du eine spezifische Frage?
                </h3>
                <p className="font-inter text-[14px] sm:text-[16px] font-bold text-center !text-white leading-[1.6] m-0">
                    JassWiki gibt es auch als Chat auf ChatGPT. Stelle deine Frage dort direkt.
                </p>
                <Link 
                    href="/gpt" 
                    className="inline-flex items-center justify-center px-[20px] py-[8px] bg-[#ff0101] text-white rounded-[999px] hover:brightness-110 transition-all font-inter font-bold text-[15px] sm:text-[16px] text-center gap-[8px]"
                >
                    Zum JassWiki GPT
                </Link>
            </div>

        </LexikonLayout>
        </>
    );
};

export default WissenHomePage;
import React, { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SeoHead } from '@/components/layout/SeoHead';
import { FaBalanceScale, FaBook, FaHandPointRight } from 'react-icons/fa';
import { GiPokerHand } from 'react-icons/gi';
import { CgSwiss } from 'react-icons/cg';
import { FaHouse } from 'react-icons/fa6';
import { GrMultiple } from 'react-icons/gr';
import { MdPhoneIphone } from 'react-icons/md';
import { VscReferences } from 'react-icons/vsc';
import type { IconType } from 'react-icons';

const ICON_COLORS: Record<string, string> = {
    jassen: 'bg-[#274823]',
    regeln: 'bg-[#ff4b55]',
    'weis-regeln': 'bg-[#ff7a1a]',
    geschichte: 'bg-[#f6b21a]',
    'grundlagen-kultur': 'bg-[#2bb752]',
    schieber: 'bg-[#3b82f6]',
    begriffe: 'bg-[#6366f1]',
    varianten: 'bg-[#a855f7]',
    jassapps: 'bg-[#06b6d4]',
    referenzen: 'bg-[#6b7280]',
};

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
            description: 'Das Schweizer Nationalkartenspiel — Überblick über Regeln, Varianten, Karten, Geschichte und Kultur',
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
            description: 'Alles über Weis, Stöck und Punktezählung – werde zum Weis-Experten',
            icon: GiPokerHand,
        },
        { 
            slug: 'geschichte', 
            name: 'Geschichte',
            description: 'Wie entstand das Jassen? Erfahre alles über die Wurzeln des Schweizer Nationalspiel',
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
            description: 'Die beliebteste Jassvariante im Detail – Regeln, Strategien und Tipps',
            icon: FaHandPointRight,
        },
        { 
            slug: 'begriffe', 
            name: 'Jass-Begriffe',
            description: 'Von "Bock" bis "Stöck" – alle wichtigen Jass-Ausdrücke erklärt',
            icon: FaHouse,
        },
        { 
            slug: 'varianten', 
            name: 'Jass-Varianten',
            description: 'Coiffeur, Differenzler & Co. – entdecke die Vielfalt des Jassens',
            icon: GrMultiple,
        },
        { 
            slug: 'jassapps', 
            name: 'Jassapps',
            description: 'Digitale Jasstafeln und Online-Jass-Apps – die besten Tools für Jasser',
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
                title="JassWiki: Alles rund ums Jassen"
                description="Die vollständige Referenz für das Schweizer Nationalspiel: Offizielle Spielregeln, Weis, Varianten, Strategien und Jass-Begriffe verständlich erklärt."
            />
            <LexikonLayout breadcrumbItems={breadcrumbItems}>

            {/* Hero Section */}
            <div className="mb-[24px] sm:mb-[32px] not-prose">
                <h1 className="font-capita text-[26px] sm:text-[32px] lg:text-[42px] font-bold text-[#ff0000] leading-[1.14] mb-[12px] sm:mb-[16px]">
                    JassWiki: Alles rund ums Jassen
                </h1>
                <p className="font-capita text-[17px] sm:text-[20px] font-bold text-black leading-[1.4] mb-[8px]">
                    Regeln, Varianten & Strategien
                </p>
                <p className="font-inter text-[14px] sm:text-[16px] text-[#000000] leading-[1.55]">
                    Von Grundlagen bis Profi-Strategien – die Referenz für das Schweizer Nationalspiel.
                </p>
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
                                        <div className={`${colorClass} rounded-[10px] sm:rounded-[12px] p-[8px] sm:p-[10px] flex-shrink-0 mt-[4px]`}>
                                            <Icon size={18} className="text-white sm:hidden" />
                                            <Icon size={22} className="text-white hidden sm:block" />
                                        </div>
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

            {/* CTA Section */}
            <div className="not-prose bg-[#274823] rounded-[12px] border-[1.74px] border-black pt-[16px] sm:pt-[20px] px-[14px] sm:px-[17px] pb-[20px] sm:pb-[29px] mb-[24px] sm:mb-[32px] flex flex-col items-center gap-[10px] sm:gap-[12px]">
                <h3 className="font-capita text-[22px] sm:text-[28px] font-bold text-center text-white leading-[1.2] m-0">
                    Hast du eine spezifische Frage?
                </h3>
                <p className="font-inter text-[14px] sm:text-[16px] font-bold text-center !text-white leading-[1.6] m-0">
                    JassWiki gibt es auch als interaktiven Chat auf ChatGPT – stelle deine Frage direkt!
                </p>
                <Link 
                    href="/gpt" 
                    className="inline-flex items-center justify-center px-[20px] py-[8px] bg-[#ff0101] text-white rounded-[999px] hover:brightness-110 transition-all font-inter font-bold text-[15px] sm:text-[16px] text-center gap-[8px]"
                >
                    Zum JassWiki GPT
                </Link>
            </div>

            <hr className="border-[#f0eee7] mb-[20px] sm:mb-[24px]" />

            {/* Tags/Pills */}
            <div className="not-prose mb-[24px] sm:mb-[32px]">
                <h3 className="font-capita text-[17px] sm:text-[20px] font-bold !text-black leading-[1.4] mb-[12px] sm:mb-[16px]">
                    Beliebt bei Jassern
                </h3>
                <div className="flex flex-wrap gap-[10px]">
                    <Link href="/schieber/grundlagen/" className="bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors">
                        Schieber lernen
                    </Link>
                    <Link href="/weis-regeln/" className="bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors">
                        Weis-Regeln
                    </Link>
                    <Link href="/begriffe/" className="bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors">
                        Jass-ABC
                    </Link>
                    <Link href="/geschichte/wortherkunft/etymologie-des-begriffs-matsch/" className="bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors">
                        Etymologie «Matsch»
                    </Link>
                    <Link href="/referenzen/" className="bg-[#f0eee7] border border-[#e8e6df] rounded-[24px] px-[12px] py-[7px] text-[13px] sm:text-[13px] font-inter font-bold text-[#ff0000] hover:bg-[#e8e6df] transition-colors">
                        Referenzen
                    </Link>
                </div>
            </div>
        </LexikonLayout>
        </>
    );
};

export default WissenHomePage;
import React, { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import { ChevronRight, BookOpen, Users, Trophy, Zap, Scale, FileText } from 'lucide-react';
import { SearchBar } from '@/components/wissen/SearchBar';
import { SeoHead } from '@/components/layout/SeoHead';

const WissenHomePage = () => {
    const breadcrumbItems = [{ name: 'Jass-Wiki', href: '/' }];
    const GPT_REDIRECT_URL = 'https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617';

    // Prüfe, ob wir auf gpt.jasswiki.ch sind und leite weiter
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            if (hostname === 'gpt.jasswiki.ch') {
                // Sofortige Weiterleitung zu ChatGPT
                window.location.replace(GPT_REDIRECT_URL);
                return;
            }
        }
    }, []);

    // Enable scrolling for knowledge pages
    useEffect(() => {
        // Add class to enable scrolling
        document.body.classList.add('lexikon-page');
        
        // Cleanup: Remove class when component unmounts
        return () => {
            document.body.classList.remove('lexikon-page');
        };
    }, []);

    const categories = [
        { 
            slug: 'regeln', 
            name: 'Regeln',
            description: 'Alle offiziellen Spielregeln, Sonderregeln und Ausnahmefälle im Detail',
            icon: Scale,
            color: 'bg-red-500' // Rot - höchste Priorität
        },
        { 
            slug: 'weis-regeln', 
            name: 'Weis-Regeln',
            description: 'Alles über Weis, Stöck und Punktezählung - werde zum Weis-Experten',
            icon: Trophy,
            color: 'bg-orange-500' // Orange - zweithöchste Priorität
        },
        { 
            slug: 'geschichte', 
            name: 'Geschichte',
            description: 'Wie entstand das Jassen? Erfahre alles über die Wurzeln des Schweizer Nationalspiel',
            icon: BookOpen,
            color: 'bg-amber-500' // Gelb - warme Farbe
        },
        { 
            slug: 'grundlagen-kultur', 
            name: 'Grundlagen & Kultur',
            description: 'Kartenwerte, Spielablauf und die kulturelle Bedeutung des Jassens in der Schweiz',
            icon: Users,
            color: 'bg-green-500' // Grün - natürliche Farbe
        },
        { 
            slug: 'schieber', 
            name: 'Schieber',
            description: 'Die beliebteste Jassvariante im Detail - Regeln, Strategien und Tipps',
            icon: Zap,
            color: 'bg-blue-500' // Blau - kühle Farbe
        },
        { 
            slug: 'begriffe', 
            name: 'Jass-Begriffe',
            description: 'Von "Bock" bis "Stöck" - alle wichtigen Jass-Ausdrücke erklärt',
            icon: BookOpen,
            color: 'bg-indigo-500' // Indigo - tiefe Farbe
        },
        { 
            slug: 'varianten', 
            name: 'Jass-Varianten',
            description: 'Coiffeur, Differenzler & Co. - entdecke die Vielfalt des Jassens',
            icon: Users,
            color: 'bg-purple-500' // Lila - kreative Farbe
        },
        { 
            slug: 'jassapps', 
            name: 'Jassapps',
            description: 'Digitale Jasstafeln und Online-Jass-Apps - die besten Tools für Jasser',
            icon: Zap,
            color: 'bg-cyan-500' // Cyan - moderne Farbe
        },
        { 
            slug: 'referenzen', 
            name: 'Referenzen',
            description: 'Quellen, Literatur und Experten rund um das Jassen',
            icon: FileText,
            color: 'bg-gray-500' // Grau - neutrale Farbe
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
            <div className="text-left mb-8 sm:mb-12 not-prose">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    JassWiki: Alles rund ums Jassen
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-gray-200 leading-relaxed max-w-2xl mb-2">
                    Regeln, Varianten & Strategien
                </p>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mb-8">
                    Von Grundlagen bis Profi-Strategien – die Referenz für das Schweizer Nationalspiel. Regeln nach jassguru.ch. Grundlage: anerkannten Schweizer Regelquellen und Turnierreglementen.
                </p>
                
            </div>

            {/* Main Categories Grid */}
            <div className="space-y-4 sm:space-y-6 mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-200 text-left mb-6 sm:mb-8">
                    Was möchtest du wissen?
                </h2>
                
                <div className="grid gap-4 sm:gap-6">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <Link 
                                key={category.slug}
                                href={`/${category.slug}/`} 
                                className="group block"
                            >
                                <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 border border-gray-700 hover:border-gray-600 hover:scale-[1.02]">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        {/* Icon */}
                                        <div className={`${category.color} rounded-xl p-3 sm:p-4 text-white flex-shrink-0 shadow-lg`}>
                                            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
                                                {category.description}
                                            </p>
                                            <div className="flex items-center text-green-400 font-semibold">
                                                <span className="text-sm sm:text-base">Mehr erfahren</span>
                                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section for Chat */}
            <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl p-6 sm:p-8 text-white text-center shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                    Hast du eine spezifische Frage?
                </h3>
                <p className="text-green-100 mb-6 text-base sm:text-lg">
                    JassWiki gibt es auch als interaktiven Chat auf ChatGPT – stelle deine Frage direkt!
                </p>
                <a 
                    href="/gpt" 
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-base sm:text-lg min-h-[48px] shadow-lg"
                >
                    <Zap className="w-5 h-5 mr-2" />
                    Zum JassWiki GPT
                </a>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-200 mb-4 text-left">
                    Beliebt bei Jassern
                </h3>
                <div className="flex flex-wrap justify-start gap-3">
                    <Link href="/schieber/grundlagen/" className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 hover:text-white transition-colors text-sm sm:text-base border border-gray-600">
                        Schieber lernen
                    </Link>
                    <Link href="/weis-regeln/" className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 hover:text-white transition-colors text-sm sm:text-base border border-gray-600">
                        Weis-Regeln
                    </Link>
                    <Link href="/begriffe/" className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 hover:text-white transition-colors text-sm sm:text-base border border-gray-600">
                        Jass-ABC
                    </Link>
                    <Link href="/geschichte/wortherkunft/etymologie-des-begriffs-matsch/" className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 hover:text-white transition-colors text-sm sm:text-base border border-gray-600">
                        Etymologie «Matsch»
                    </Link>
                    <Link href="/referenzen/" className="px-4 py-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 hover:text-white transition-colors text-sm sm:text-base border border-gray-600">
                        Referenzen
                    </Link>
                </div>
            </div>

            {/* Footer Question */}
            <div className="mt-12 text-left">
                <p className="text-xl sm:text-2xl font-semibold text-gray-200">
                    Was möchtest du wissen?
                </p>
            </div>
        </LexikonLayout>
        </>
    );
};

export default WissenHomePage; 
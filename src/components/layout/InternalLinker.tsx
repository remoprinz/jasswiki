import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ArtikelTabelle } from '@/components/wissen/ArtikelTabelle';
import { JassKartenReihe } from '@/components/wissen/JassKartenReihe';
import { textInStuecke } from '@/components/wissen/kartenMarke';
import { verweiseZuLinks } from '@/components/wissen/verweise';

interface InternalLinkerProps {
  text: string;
}

/**
 * Zählt die Spalten einer Tabelle aus dem gerenderten Baum (erste Zeile).
 * Die Zahl bestimmt auf schmalen Geräten die Mindestbreite der Tabelle.
 */
interface BaumKnoten {
  tagName?: string;
  children?: BaumKnoten[];
}

function spaltenZaehlen(node: unknown): number {
  const zellenDerErstenZeile = (n: BaumKnoten | undefined): number => {
    if (!n || typeof n !== 'object') return 0;
    const kinder: BaumKnoten[] = Array.isArray(n.children) ? n.children : [];
    if (n.tagName === 'tr') {
      return kinder.filter((c) => c.tagName === 'th' || c.tagName === 'td').length;
    }
    for (const kind of kinder) {
      const treffer = zellenDerErstenZeile(kind);
      if (treffer > 0) return treffer;
    }
    return 0;
  };
  return zellenDerErstenZeile(node as BaumKnoten) || 3;
}

/**
 * Rendert ein Textstück als Markdown (Links, Listen, Überschriften, Tabellen).
 */
const MarkdownStueck: React.FC<InternalLinkerProps> = ({ text }) => {
  // Pre-Process 1: Konvertiere technische Verweise zu Markdown-Links
  const processedText = verweiseZuLinks(text);

  // Pre-Process 2: Konvertiere • (Unicode Bullet) zu - (Markdown Bullet)
  // Damit ReactMarkdown die Listen korrekt als <ul> rendert
  const markdownText = processedText.replace(/^•\s/gm, '- ');

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom renderer für Links
          a: ({ node, href, children, ...props }) => {
            // Prüfe ob es ein externer Link ist
            if (href?.startsWith('http')) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline" {...props}>
                  {children}
                </a>
              );
            }
            
            // Interner Link
            return (
              <Link href={href || '#'} className="text-green-400 hover:text-green-300 underline">
                {children}
              </Link>
            );
          },
          // Formatiere Listen besser
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ node, children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4" {...props}>
              {children}
            </ol>
          ),
          // Formatiere Überschriften
          h2: ({ node, children, ...props }) => (
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold !text-[#ff0000] mt-8 mb-3 leading-[1.2]" {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 className="font-capita text-[18px] sm:text-[20px] font-bold !text-[#ff0000] mt-6 mb-2 leading-[1.25]" {...props}>
              {children}
            </h3>
          ),
          // Tabellen: eigener Rahmen, der auf schmalen Geräten waagrecht rollt.
          table: ({ node, children }) => (
            <ArtikelTabelle spalten={spaltenZaehlen(node)}>{children}</ArtikelTabelle>
          ),
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

/**
 * Rendert den Artikeltext: Markdown mit internen Links – und löst die
 * Karten-Marke [[karten: …]] in eine Reihe echter Jasskarten auf.
 * Ohne Marke bleibt genau ein Markdown-Block wie bisher.
 */
export const InternalLinker: React.FC<InternalLinkerProps> = ({ text }) => {
  const stuecke = textInStuecke(text);

  if (stuecke.length === 1 && stuecke[0].art === 'text') {
    return <MarkdownStueck text={stuecke[0].text} />;
  }

  return (
    <>
      {stuecke.map((stueck, i) =>
        stueck.art === 'text' ? (
          <MarkdownStueck key={`t${i}`} text={stueck.text} />
        ) : (
          <JassKartenReihe key={`k${i}`} slugs={stueck.slugs} beschriftung={stueck.beschriftung} />
        )
      )}
    </>
  );
};


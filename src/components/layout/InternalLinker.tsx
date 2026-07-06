import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { buildArticleUrl, toSlug } from '@/lib/url-utils';

// Erstelle eine Map für schnellen Zugriff auf Link-Ziele
// UND für ID-basierte Lookups (z.B. "expressions_stapel" → "/begriffe/grundbegriffe/stapel")
const linkMap = new Map<string, string>();
const idLinkMap = new Map<string, string>();

Object.values(allContent as JassContentRecord).forEach(item => {
    // Verwende zentrale URL-Funktion für konsistente URLs
    const path = buildArticleUrl(item.metadata.category);

    // Hauptthema als Schlüssel
    linkMap.set(item.metadata.category.topic.toLowerCase(), path);
    
    // Artikel-ID als Schlüssel (z.B. "expressions_stapel" → "/begriffe/grundbegriffe/stapel")
    idLinkMap.set(item.id.toLowerCase(), path);
    
    // Auch Keywords als Schlüssel hinzufügen
    item.metadata.keywords.forEach(keyword => {
        linkMap.set(keyword.toLowerCase(), path);
    });
});

// Helper: Generiere URL aus ID (z.B. "expressions_stapel")
function buildCanonicalURL(categoryMain: string, categorySub: string, id: string): string {
  // Versuche zuerst ID-basierte Suche
  const lowerId = id.toLowerCase();
  const path = idLinkMap.get(lowerId);
  
  if (path) {
    return `https://jasswiki.ch${path}`;
  }
  
  // Fallback: Generiere URL aus Kategorien
  const mainSlug = toSlug(categoryMain);
  const subSlug = toSlug(categorySub);
  const idSlug = toSlug(id.replace(/^expressions_/, '').replace(/^general_/, '').replace(/_/g, '-'));
  return `https://jasswiki.ch/${mainSlug}/${subSlug}/${idSlug}/`;
}

interface InternalLinkerProps {
  text: string;
}

/**
 * Konvertiert alle (siehe Begriff "id") Muster zu Markdown-Links.
 *
 * Drei Fälle werden behandelt:
 *  1. "Zitierter Text" (siehe Begriff "id")  → [Zitierter Text](/pfad/)
 *  2.  deutsches Wort (auch Umlaute) (siehe Begriff "id") → [Wort](/pfad/)
 *  3.  (siehe Begriff "id") ohne Kontext → [Artikeltitel](/pfad/)
 */
function convertReferencesToLinks(text: string): string {
  const resolve = (refId: string): string | null =>
    idLinkMap.get(refId.toLowerCase()) ?? null;

  const titleFor = (path: string): string | null => {
    for (const [name, p] of linkMap) if (p === path) return name;
    return null;
  };

  // Spezifischer Content-Fix: alte Klammer-Referenz -> direkter externer Link
  text = text.replace(
    /Jassguru\.ch ist eine digitale Jasstafel\s*\(siehe Begriff\s+"jassapps_jasstafel_pro"\)/gi,
    '[Jassguru.ch](https://jassguru.ch) ist eine digitale Jasstafel'
  );

  // Fallback: Domain immer klickbar machen (wenn noch als Plain-Text vorhanden)
  text = text.replace(/(?<!\[)Jassguru\.ch(?!\]\()/g, '[Jassguru.ch](https://jassguru.ch)');

  // 1. «Guillemet-Text» oder "Anführungstext" (siehe Begriff "id")
  text = text.replace(/[«"]([^»"]+)[»"]\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, display, refId) => {
      const path = resolve(refId) ?? linkMap.get(display.toLowerCase()) ?? null;
      return path ? `[${display}](${path})` : `"${display}"`;
    });

  // 2. Deutsches Wort (inkl. Umlaute, Bindestrich) vor (siehe Begriff "id")
  text = text.replace(/([a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß\w-]*)\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, term, refId) => {
      const path = linkMap.get(term.toLowerCase()) ?? resolve(refId);
      return path ? `[${term}](${path})` : term;
    });

  // 3. Verbleibende (siehe Begriff "id") ohne vorherigen Link-Text
  text = text.replace(/\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, refId) => {
      const path = resolve(refId);
      if (!path) return '';
      const title = titleFor(path);
      return title ? `[${title}](${path})` : `[mehr](${path})`;
    });

  return text;
}

/**
 * Component, der Text rendert und automatisch interne Links zu anderen Wissensartikeln erstellt
 */
export const InternalLinker: React.FC<InternalLinkerProps> = ({ text }) => {
  // Pre-Process 1: Konvertiere technische Verweise zu Markdown-Links
  let processedText = convertReferencesToLinks(text);
  
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
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};


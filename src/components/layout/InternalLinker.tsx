import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toSlug } from '@/lib/utils';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';

// Erstelle eine Map für schnellen Zugriff auf Link-Ziele (3-Ebenen URLs)
// UND für ID-basierte Lookups (z.B. "expressions_stapel" → "/begriffe/grundbegriffe/stapel")
const linkMap = new Map<string, string>();
const idLinkMap = new Map<string, string>();

Object.values(allContent as JassContentRecord).forEach(item => {
    const mainCatSlug = toSlug(item.metadata.category.main);
    const subCatSlug = toSlug(item.metadata.category.sub);
    const topicSlug = toSlug(item.metadata.category.topic);
    
    // SPEZIALFALL: Flache Struktur (2 Ebenen) für:
    // 1. Varianten (keine echte Subkategorie)
    // 2. Artikel wo sub === topic (z.B. Geschichte, Grundlagen & Kultur)
    const isFlatStructure = (mainCatSlug === 'varianten' || subCatSlug === topicSlug);
    const path = isFlatStructure
      ? `/${mainCatSlug}/${topicSlug}/`
      : `/${mainCatSlug}/${subCatSlug}/${topicSlug}/`;

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
 * Konvertiert technische Verweise zu Markdown-Links
 * Pattern: "Stapel (siehe Begriff "expressions_stapel")"
 * Wird zu: "[Stapel](/begriffe/grundbegriffe/stapel)"
 * 
 * WICHTIG: Matcht nur das letzte Wort direkt vor der Klammer!
 */
function convertReferencesToLinks(text: string): string {
  // Pattern: Nur das letzte Wort direkt vor "(siehe Begriff "id")"
  // \b = Wortgrenze, \w+ = komplettes Wort, \s* = optional Leerzeichen, dann Klammer
  const referencePattern = /(\b\w+)\s*\(siehe Begriff\s+"([^"]+)"\)/gi;
  
  return text.replace(referencePattern, (match, term, refId) => {
    try {
      // Versuche aus linkMap die URL zu finden
      const lowerTerm = term.toLowerCase().trim();
      const linkPath = linkMap.get(lowerTerm);
      
      if (linkPath) {
        // URL gefunden in linkMap
        return `[${term}](${linkPath})`;
      }
      
      // Fallback: Versuche mit buildCanonicalURL (nutzt idLinkMap)
      // Wir müssen die Kategorie raten - verwende "Begriffe" als Default
      const categoryMain = 'Begriffe'; // Default
      const categorySub = 'allgemeines'; // Default
      
      const fullUrl = buildCanonicalURL(categoryMain, categorySub, refId);
      // Konvertiere absolute URL zu relativer URL
      const relativeUrl = fullUrl.replace('https://jasswiki.ch', '');
      
      return `[${term}](${relativeUrl})`;
    } catch (error) {
      console.warn(`⚠️  Fehler bei Link-Konvertierung: "${term}" (${refId})`, error);
      // Behalte Original bei Fehler
      return match;
    }
  });
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
        remarkPlugins={[remarkGfm]}
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
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 className="text-xl font-bold mt-6 mb-3 text-white" {...props}>
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


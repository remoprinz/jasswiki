import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ArtikelTabelle } from '@/components/wissen/ArtikelTabelle';
import { JassKartenReihe } from '@/components/wissen/JassKartenReihe';
import { textInStuecke } from '@/components/wissen/kartenMarke';
import { verweiseZuLinks } from '@/components/wissen/verweise';
import { farbwoerterFr } from '@/components/wissen/farbwoerter';
import { kartensystemAusSpeicherHolen, useKartensystem } from '@/components/wissen/kartensystem';
import { toSlug } from '@/lib/utils';

interface InternalLinkerProps {
  text: string;
  /**
   * Der Artikel lässt den Wortwechsel zu (metadata.farbwechsel === true):
   * steht das Kartensystem des Lesers auf «Französisch», wechseln im
   * sichtbaren Text und in den Kartenbeschriftungen die Farb- und Kartenwörter
   * (Rosen → Herz, Under → Bube …). Server-HTML und erster Render bleiben
   * Deutsch; der Wechsel kommt aus dem gespeicherten Kartensystem, wie bei
   * den Kartenreihen. Ohne Kennzeichen bleibt der Text Zeichen für Zeichen.
   */
  farbwechsel?: boolean;
}

interface MarkdownStueckProps {
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

/** Sichtbarer Text einer Überschrift, auch wenn er in Links oder Fettdruck steckt. */
function textAusKindern(kinder: React.ReactNode): string {
  return React.Children.toArray(kinder)
    .map((k) => {
      if (typeof k === 'string' || typeof k === 'number') return String(k);
      if (React.isValidElement<{ children?: React.ReactNode }>(k)) return textAusKindern(k.props.children);
      return '';
    })
    .join('');
}

/** Anker einer Überschrift: «Bieter zu fünft» → «bieter-zu-fuenft». */
function ankerAusKindern(kinder: React.ReactNode): string | undefined {
  const anker = toSlug(textAusKindern(kinder));
  return anker.length > 0 ? anker : undefined;
}

/**
 * Rendert ein Textstück als Markdown (Links, Listen, Überschriften, Tabellen).
 */
const MarkdownStueck: React.FC<MarkdownStueckProps> = ({ text }) => {
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
          // Formatiere Überschriften. Jede trägt einen Anker aus ihrem Text
          // (SCHIEDSRICHTER, 17.08.2026): Damit lassen sich Abschnitte verlinken,
          // etwa «/varianten/bieter/#bieter-zu-fuenft» als Ziel der alten Adressen.
          h2: ({ node, children, ...props }) => (
            <h2 id={ankerAusKindern(children)} className="font-capita text-[22px] sm:text-[26px] font-bold !text-[#ff0000] mt-8 mb-3 leading-[1.2] scroll-mt-24" {...props}>
              {children}
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 id={ankerAusKindern(children)} className="font-capita text-[18px] sm:text-[20px] font-bold !text-[#ff0000] mt-6 mb-2 leading-[1.25] scroll-mt-24" {...props}>
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
export const InternalLinker: React.FC<InternalLinkerProps> = ({ text, farbwechsel = false }) => {
  const system = useKartensystem();
  const wechseln = farbwechsel && system === 'fr';

  // Die gespeicherte Wahl gilt auch für Text ohne Kartenreihe; das Holen ist
  // einmalig und läuft erst nach dem Einhängen (kein Unterschied zum Server-HTML).
  useEffect(() => {
    if (farbwechsel) kartensystemAusSpeicherHolen();
  }, [farbwechsel]);

  // Die Wörter wechseln vor dem Markdown und nur in den Textstücken und
  // Beschriftungen — die Karten-Slugs der Marke sind klein geschrieben und
  // liegen ohnehin ausserhalb der Stücke.
  const stuecke = useMemo(() => {
    const roh = textInStuecke(text);
    if (!wechseln) return roh;
    return roh.map((s) =>
      s.art === 'text'
        ? { ...s, text: farbwoerterFr(s.text) }
        : { ...s, beschriftung: s.beschriftung ? farbwoerterFr(s.beschriftung) : s.beschriftung }
    );
  }, [text, wechseln]);

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


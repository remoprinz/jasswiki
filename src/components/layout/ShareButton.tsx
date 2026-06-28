import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

/**
 * Universeller „Teilen"-Button für Artikelseiten.
 * Nutzt die Web Share API (OS-Share-Sheet → User wählt WhatsApp/Instagram/etc.),
 * Desktop-Fallback = Link in die Zwischenablage kopieren.
 * Sitzt zentral in LexikonLayout (Breadcrumb-Zeile) → gilt für alle Artikel.
 */
export const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyFallback = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Zwischenablage nicht verfügbar – still ignorieren */
    }
  };

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err: any) {
        if (err?.name === 'AbortError') return; // User hat abgebrochen – kein Fehler
        await copyFallback(url);
      }
    } else {
      await copyFallback(url);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Artikel teilen"
      title={copied ? 'Link kopiert' : 'Artikel teilen'}
      className="flex items-center gap-1.5 shrink-0 text-wiki-green hover:text-wiki-green-light transition-colors font-inter text-sm font-medium"
    >
      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
      <span className="hidden sm:inline">{copied ? 'Kopiert' : 'Teilen'}</span>
    </button>
  );
};

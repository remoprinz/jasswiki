import React from 'react';
import type { JassApp } from '@/types/jass-lexikon';

// SoftwareApplication einer Jass-App (Karte SCHIRI «wiki-vorlagen», Teil C,
// 22.11.2026). Alle Felder kommen aus metadata.app der Inhaltsdatei, ohne
// offers. Ohne metadata.app oder ohne Namen steht nichts.

export function softwareApplication(app: JassApp | undefined, seitenUrl: string) {
  if (!app || !app.name) return null;
  const plattformen = (app.plattformen ?? []).filter((p) => typeof p === 'string' && p.trim());
  const sameAs = (app.sameAs ?? []).filter((s) => typeof s === 'string' && s.trim());
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    applicationCategory: 'GameApplication',
    ...(plattformen.length > 0 ? { operatingSystem: plattformen.join(', ') } : {}),
    ...(app.zweck ? { description: app.zweck } : {}),
    ...(app.anbieter ? { publisher: { '@type': 'Organization', name: app.anbieter } } : {}),
    ...(app.url ? { url: app.url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    mainEntityOfPage: seitenUrl,
    inLanguage: 'de-CH',
  };
}

export const AppSchema: React.FC<{ app?: JassApp; seitenUrl: string }> = ({ app, seitenUrl }) => {
  const schema = softwareApplication(app, seitenUrl);
  if (!schema) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
};

export default AppSchema;

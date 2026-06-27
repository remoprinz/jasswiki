import Head from 'next/head';
import { useRouter } from 'next/router';
import ogManifest from '../../data/og-manifest.json'; // slug → banner-dateiname (generate-og.mjs)

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: string; // expliziter Override; sonst Per-Seite-Banner via Manifest, sonst Default
}

// Jasswiki.ch ist eine dedizierte Wiki-Domain
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  noIndex,
  ogImage,
}) => {
  const router = useRouter();

  // Für jasswiki.ch: Alle URLs sind direkt ohne Prefix
  const wikiPath = router.asPath.endsWith('/') ? router.asPath : router.asPath + '/';
  const generatedCanonicalUrl = `${SITE_URL}${wikiPath}`;
  
  const finalCanonicalUrl = canonicalUrl || generatedCanonicalUrl;

  // OG-Banner pro Seite: Slug = letztes Pfadsegment → Manifest-Lookup (generate-og.mjs).
  // Kein Treffer → quadratischer Default. Expliziter ogImage-Prop hat Vorrang.
  const ogSlug = (router.asPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '').split('/').pop() || '';
  const ogFile = (ogManifest as Record<string, string>)[ogSlug];
  const ogImageUrl = ogImage
    ? ogImage
    : ogFile
      ? `${SITE_URL}/og/${ogFile}`
      : `${SITE_URL}/og-default.png`; // edler Brand-Default für Home/Kategorien (1200×630)
  // Alle OG-Banner sind 1200×630 (Per-Seite-Banner + Default)
  const ogWidth = 1200;
  const ogHeight = 630;
  
  const defaultTitle = 'Jasswiki.ch - Schweizer Jassregeln & Strategien';
  const defaultDescription = 'Die vollständige Jassregeln-Referenz: Offizielle Spielregeln, Weis, Varianten und Strategien für das Schweizer Nationalspiel.';

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <link rel="canonical" href={finalCanonicalUrl} />
      )}
      
      {/* Weitere wichtige SEO-Tags, die global gelten */}
      <meta property="og:site_name" content="JassWiki" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content={String(ogWidth)} />
      <meta property="og:image:height" content={String(ogHeight)} />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  );
};

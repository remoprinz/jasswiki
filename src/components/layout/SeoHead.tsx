import Head from 'next/head';
import { useRouter } from 'next/router';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

// Jasswiki.ch ist eine dedizierte Wiki-Domain
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalUrl,
  noIndex,
}) => {
  const router = useRouter();

  // Für jasswiki.ch: Alle URLs sind direkt ohne Prefix
  const wikiPath = router.asPath.endsWith('/') ? router.asPath : router.asPath + '/';
  const generatedCanonicalUrl = `${SITE_URL}${wikiPath}`;
  
  const finalCanonicalUrl = canonicalUrl || generatedCanonicalUrl;
  
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
      <meta property="og:site_name" content="Jasswiki" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content="https://jasswiki.ch/jasswiki-logo-hero.png" />
      <meta property="og:image:width" content="1080" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://jasswiki.ch/jasswiki-logo-hero.png" />
    </Head>
  );
};

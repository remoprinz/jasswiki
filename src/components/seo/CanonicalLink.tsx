import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Generiert den korrekten Canonical-Link-Tag für jasswiki.ch
 */
export const CanonicalLink = () => {
  const router = useRouter();
  const [canonicalUrl, setCanonicalUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = router.asPath;
      // Jasswiki.ch: Alle URLs sind selbst-referenzierend
        setCanonicalUrl(`https://jasswiki.ch${path}`);
    }
  }, [router.asPath]);

  if (!canonicalUrl) {
    return null;
  }

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

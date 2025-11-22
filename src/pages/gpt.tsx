import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GPT_REDIRECT_URL = 'https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617';
const SITE_URL = 'https://jasswiki.ch/gpt';
const TITLE = 'JassWiki: Alles rund ums Jassen';
const DESCRIPTION = 'Chatte mit dem JassWiki GPT über Jass-Regeln, Taktiken, Varianten und mehr. Erhalte präzise Antworten von jasswiki.ch.';
// OG Image für Link-Vorschau - Kleines Icon (120x120px) für kompakte WhatsApp-Vorschau
const OG_IMAGE = 'https://jasswiki.ch/logo-jasswiki-120x120.png';

export default function GPTRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Sofortige Weiterleitung - sowohl client-side als auch via meta refresh
    // Client-side für bessere UX
    if (typeof window !== 'undefined') {
      // Prüfe ob wir auf gpt.jasswiki.ch sind ODER auf /gpt Route
      const hostname = window.location.hostname;
      const pathname = window.location.pathname;
      
      if (hostname === 'gpt.jasswiki.ch' || pathname === '/gpt' || pathname === '/gpt/') {
        // Sofortige Weiterleitung zu ChatGPT
        window.location.replace(GPT_REDIRECT_URL);
        return;
      }
    }
  }, [router]);

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta httpEquiv="refresh" content="3; url=https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617" />
        <link rel="canonical" href={SITE_URL} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="120" />
        <meta property="og:image:height" content="120" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="JassWiki" />
        
        {/* Twitter Card - summary statt summary_large_image für kleineres Logo */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#111827',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Weiterleitung zu JassWiki GPT...</h1>
        <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
          Du wirst automatisch weitergeleitet. Falls du noch etwas warten musst,
        </p>
        <a 
          href={GPT_REDIRECT_URL}
          style={{
            color: '#10b981',
            textDecoration: 'underline',
            fontSize: '1.1rem'
          }}
        >
          klicke hier zum direkten Öffnen
        </a>
      </div>
    </>
  );
}


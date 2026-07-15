import { useEffect } from 'react';

interface HelmetProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
}

export default function Helmet({
  title = 'Plately - Smart Kitchen Assistant, Recipe Scanner & Pantry Planner',
  description = 'Reduce food waste and cook smarter with Plately. Scan receipts, track fridge shelf freshness, get AI recipe ideas, and plan sustainable grocery shopping.',
  canonicalUrl = 'https://theplately.com',
  ogType = 'website',
  ogImage = 'https://theplately.com/logo.png', // Fallback to our high-resolution Plately logo
}: HelmetProps) {
  
  const fullTitle = title.includes('Plately') ? title : `${title} | Plately`;

  // Update DOM elements on the client side to guarantee synchronization
  useEffect(() => {
    // 1. Update document title
    document.title = fullTitle;

    // Helper to find or create meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper to find or create link tags
    const setLinkTag = (relValue: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${relValue}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', relValue);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // 2. Set standard SEO head tags
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', canonicalUrl);

    // 3. Set OpenGraph tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'Plately');

    // 4. Set Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

  }, [fullTitle, description, canonicalUrl, ogType, ogImage]);

  // Render elements directly to support React 19 native document metadata hoisting
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Plately" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}

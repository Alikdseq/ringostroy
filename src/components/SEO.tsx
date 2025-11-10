import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object;
  canonical?: string;
}

const SITE_URL = 'https://ringoostroy.ru'; // TODO: Заменить на реальный домен
const DEFAULT_IMAGE = `${SITE_URL}/images/icons/logo.svg`;
const DEFAULT_KEYWORDS = 'аренда спецтехники, аренда экскаватора, аренда погрузчика, аренда крана, спецтехника Владикавказ, спецтехника Северная Осетия, аренда техники, строительная техника, дорожная техника, коммунальная техника';

export default function SEO({ 
  title, 
  description, 
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  structuredData,
  canonical
}: SEOProps) {
  const location = useLocation();
  const currentUrl = `${SITE_URL}${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;
  const fullTitle = title.includes('RingooStroy') || title.includes('RingoStroy') 
    ? title 
    : `${title} | RingooStroy`;

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="RingooStroy" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="language" content="Russian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="RingooStroy" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#c0ef55" />
      
      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

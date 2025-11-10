// Утилиты для генерации structured data (Schema.org)

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  priceRange: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  areaServed: {
    '@type': string;
    name: string;
  }[];
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: {
    '@type': string;
    name: string;
  }[];
  serviceType: string;
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs: string[];
}

const SITE_URL = 'https://ringoostroy.ru'; // TODO: Заменить на реальный домен

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RingooStroy',
    image: `${SITE_URL}/images/icons/logo.svg`,
    '@id': `${SITE_URL}/#organization`,
    url: SITE_URL,
    telephone: '+79888307777',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Владикавказ',
      addressLocality: 'Владикавказ',
      addressRegion: 'Северная Осетия - Алания',
      postalCode: '362000',
      addressCountry: 'RU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '43.0275',
      longitude: '44.6694'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Владикавказ'
      },
      {
        '@type': 'State',
        name: 'Северная Осетия - Алания'
      }
    ]
  };
}

export function generateServiceSchema(serviceName: string, serviceDescription: string): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RingooStroy'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Владикавказ'
      },
      {
        '@type': 'State',
        name: 'Северная Осетия - Алания'
      }
    ],
    serviceType: serviceName
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RingooStroy',
    url: SITE_URL,
    logo: `${SITE_URL}/images/icons/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+79888307777',
      contactType: 'customer service',
      areaServed: 'RU',
      availableLanguage: 'Russian'
    },
    sameAs: [] // TODO: Добавить ссылки на социальные сети если есть
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  };
}


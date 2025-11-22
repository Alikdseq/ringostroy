// Утилиты для генерации structured data (Schema.org)

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  alternateName?: string[];
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
  alternateName?: string[];
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
    alternateName: ['ринго', 'рингострой', 'RingooStroy', 'ringostroy', 'ringoostroy', 'ринго строй', 'Ringo Stroy'],
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
    alternateName: ['ринго', 'рингострой', 'RingooStroy', 'ringostroy', 'ringoostroy', 'ринго строй', 'Ringo Stroy'],
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

/**
 * Генерирует схему BreadcrumbList для навигационных цепочек
 * Соответствует требованиям Яндекс:
 * - Абсолютные URL (HTTPS)
 * - position - числа
 * - name >= 4 символов (рекомендуется)
 * - До 3 элементов (рекомендуется)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  // Фильтруем элементы: исключаем слишком короткие названия (< 4 символов без пробелов)
  // и ограничиваем до 3 элементов (рекомендация Яндекс)
  const filteredItems = items
    .filter(item => {
      const nameWithoutSpaces = item.name.replace(/\s/g, '');
      return nameWithoutSpaces.length >= 4;
    })
    .slice(-3); // Берем последние 3 элемента (если больше)

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: filteredItems.map((item, index) => {
      // Формируем абсолютный URL
      const absoluteUrl = item.url.startsWith('http') 
        ? item.url 
        : `${SITE_URL}${item.url.startsWith('/') ? item.url : '/' + item.url}`;
      
      return {
        '@type': 'ListItem',
        position: index + 1, // Число, начиная с 1
        name: item.name, // Текст без эмодзи (эмодзи будут удалены Яндексом)
        item: absoluteUrl // Абсолютный URL (HTTPS)
      };
    })
  };
}


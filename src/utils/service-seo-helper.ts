// Утилита для генерации SEO данных для страниц услуг

import { generateServiceSchema, generateBreadcrumbSchema } from './seo';
import servicesSeoData from '../data/services-seo.json';

export interface ServiceSEOConfig {
  slug: string;
  title: string;
  shortDescription: string;
  mainImage: string;
}

export function generateServiceSEO(config: ServiceSEOConfig) {
  const seoData = servicesSeoData[config.slug as keyof typeof servicesSeoData];
  
  if (!seoData) {
    // Fallback если нет данных в JSON
    return {
      title: `${config.title} | RingooStroy`,
      description: config.shortDescription,
      keywords: `${config.title.toLowerCase()}, аренда спецтехники, Владикавказ`,
      image: `https://ringoostroy.ru${config.mainImage}`,
      structuredData: null
    };
  }

  const serviceSchema = generateServiceSchema(config.title, config.shortDescription);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' },
    { name: config.title, url: `/services/${config.slug}` }
  ]);
  
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [serviceSchema, breadcrumbSchema]
  };

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    image: `https://ringoostroy.ru${config.mainImage}`,
    structuredData: combinedSchema
  };
}


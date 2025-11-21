import servicesData from '../data/services.json';
import { splitTextToParagraphs } from './text';

type ServiceRecord = (typeof servicesData)['results'][number];

const serviceMap = new Map<string, ServiceRecord>(
  servicesData.results.map(service => [service.slug, service])
);

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return serviceMap.get(slug);
}

export function getServiceTextContent(slug: string) {
  const service = getServiceBySlug(slug);

  return {
    service,
    shortParagraphs: service
      ? splitTextToParagraphs(service.short_description, { preserveSingleBreaks: true })
      : [],
    fullParagraphs: service
      ? splitTextToParagraphs(service.full_description, { preserveSingleBreaks: true })
      : [],
  };
}



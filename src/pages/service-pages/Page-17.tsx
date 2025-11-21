import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'stroitelstvo-fundamentov',
  defaultTitle: 'Строительство фундаментов',
  mainImage: '/images/images-imag/glav17-1.jpg',
  mainImageAlt: 'Строительство фундаментов',
  secondaryImage: '/images/images-imag/glav17-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav17-1.jpg',
    '/images/images-imag/glav17-2.jpg',
  ],
};

export default function FoundationConstructionService() {
  return <ServicePageTemplate {...config} />;
}


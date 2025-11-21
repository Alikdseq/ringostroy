import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'kopka-transej',
  defaultTitle: 'Копка траншей',
  mainImage: '/images/images-imag/glav2-1.jpg',
  mainImageAlt: 'Копка траншей',
  secondaryImage: '/images/images-imag/glav2-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/gal2-1.jpg',
    '/images/images-imag/gal2-2.jpg',
    '/images/images-imag/gal2-3.jpg',
    '/images/images-imag/gal2-4.jpg',
  ],
};

export default function TrenchDiggingService() {
  return <ServicePageTemplate {...config} />;
}


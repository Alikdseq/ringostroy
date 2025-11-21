import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'obratnaya-zasypka-fundamentov',
  defaultTitle: 'Обратная засыпка фундаментов',
  mainImage: '/images/images-imag/glav6-1.jpg',
  mainImageAlt: 'Обратная засыпка фундаментов',
  secondaryImage: '/images/images-imag/glav6-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/gal6-1.jpg',
    '/images/images-imag/gal6-2.jpg',
    '/images/images-imag/gal6-3.jpg',
    '/images/images-imag/gal6-4.jpg',
  ],
};

export default function BackfillFoundationService() {
  return <ServicePageTemplate {...config} />;
}


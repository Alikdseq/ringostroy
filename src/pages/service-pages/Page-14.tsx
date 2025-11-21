import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'kopka-pod-fundament',
  defaultTitle: 'Копка под фундамент',
  mainImage: '/images/images-imag/glav14-1.jpg',
  mainImageAlt: 'Копка под фундамент',
  secondaryImage: '/images/images-imag/glav14-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav14-1.jpg',
    '/images/images-imag/glav14-2.jpg',
    '/images/images-imag/gal1-3.png',
    '/images/images-imag/gal1-4.png',
  ],
};

export default function FoundationDiggingService() {
  return <ServicePageTemplate {...config} />;
}


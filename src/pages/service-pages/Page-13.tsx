import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'kopka-kotlovana',
  defaultTitle: 'Копка котлована',
  mainImage: '/images/images-imag/glav13-1.jpg',
  mainImageAlt: 'Копка котлована',
  secondaryImage: '/images/images-imag/glav13-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav13-1.jpg',
    '/images/images-imag/glav13-2.jpg',
  ],
};

export default function ExcavationService() {
  return <ServicePageTemplate {...config} />;
}


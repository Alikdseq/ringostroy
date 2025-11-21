import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'pokos-travy-mulcherom',
  defaultTitle: 'Покос травы мульчером',
  mainImage: '/images/images-imag/glav16-1.jpg',
  mainImageAlt: 'Покос травы мульчером',
  secondaryImage: '/images/images-imag/glav16-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav16-1.jpg',
    '/images/images-imag/glav16-2.jpg',
  ],
};

export default function MulchingService() {
  return <ServicePageTemplate {...config} />;
}


import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'raschistka-ili-uborka-snega',
  defaultTitle: 'Расчистка или уборка снега',
  mainImage: '/images/images-imag/glav19-1.jpg',
  mainImageAlt: 'Расчистка или уборка снега',
  secondaryImage: '/images/images-imag/glav19-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav19-1.jpg',
    '/images/images-imag/glav19-2.jpg',
  ],
};

export default function SnowRemovalService() {
  return <ServicePageTemplate {...config} />;
}


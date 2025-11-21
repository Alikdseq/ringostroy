import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'rezka-betona-i-asfalta',
  defaultTitle: 'Резка бетона и асфальта',
  mainImage: '/images/images-imag/glav15-1.jpg',
  mainImageAlt: 'Резка бетона и асфальта',
  secondaryImage: '/images/images-imag/glav15-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav15-1.jpg',
    '/images/images-imag/glav15-2.jpg',
  ],
};

export default function ConcreteAsphaltCuttingService() {
  return <ServicePageTemplate {...config} />;
}


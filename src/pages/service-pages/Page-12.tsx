import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'uslugi-gidromolota',
  defaultTitle: 'Услуги гидромолота',
  mainImage: '/images/images-imag/glav12-1.jpg',
  mainImageAlt: 'Услуги гидромолота',
  secondaryImage: '/images/images-imag/glav12-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav12-1.jpg',
    '/images/images-imag/glav12-2.jpg',
  ],
};

export default function HydraulicHammerService() {
  return <ServicePageTemplate {...config} />;
}


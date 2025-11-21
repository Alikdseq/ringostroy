import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'planirovka-i-ochistka-uchastka',
  defaultTitle: 'Планировка и очистка участка',
  mainImage: '/images/images-imag/glav7-1.jpg',
  mainImageAlt: 'Планировка и очистка участка',
  secondaryImage: '/images/images-imag/glav7-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav7-1.jpg',
    '/images/images-imag/glav7-2.jpg',
  ],
};

export default function SitePlanningService() {
  return <ServicePageTemplate {...config} />;
}


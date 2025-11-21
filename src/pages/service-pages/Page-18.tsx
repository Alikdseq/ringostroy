import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'stroitelstvo-zaborov',
  defaultTitle: 'Строительство заборов',
  mainImage: '/images/images-imag/glav18-1.jpg',
  mainImageAlt: 'Строительство заборов',
  secondaryImage: '/images/images-imag/glav18-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav18-1.jpg',
    '/images/images-imag/glav18-2.jpg',
  ],
};

export default function FenceConstructionService() {
  return <ServicePageTemplate {...config} />;
}


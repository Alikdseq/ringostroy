import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'kanalizaciya-pod-klyuch',
  defaultTitle: 'Канализация под ключ',
  mainImage: '/images/images-imag/glav3-1.jpg',
  mainImageAlt: 'Канализация под ключ',
  secondaryImage: '/images/images-imag/glav3-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav3-1.jpg',
    '/images/images-imag/glav3-2.jpg',
  ],
};

export default function SewerageService() {
  return <ServicePageTemplate {...config} />;
}


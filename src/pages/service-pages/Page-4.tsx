import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'dostavka-i-ustanovka-kolec',
  defaultTitle: 'Доставка и установка колец',
  mainImage: '/images/images-imag/glav4-1.jpg',
  mainImageAlt: 'Доставка и установка колец',
  secondaryImage: '/images/images-imag/glav4-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav4-1.jpg',
    '/images/images-imag/glav4-2.jpg',
  ],
};

export default function RingsInstallationService() {
  return <ServicePageTemplate {...config} />;
}


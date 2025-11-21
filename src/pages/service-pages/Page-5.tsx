import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'dostavka-i-ustanovka-fbs-blokov',
  defaultTitle: 'Доставка и установка ФБС блоков',
  mainImage: '/images/images-imag/glav5-1.jpg',
  mainImageAlt: 'Доставка и установка ФБС блоков',
  secondaryImage: '/images/images-imag/glav5-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav5-1.jpg',
    '/images/images-imag/glav5-2.jpg',
  ],
};

export default function FBSBlocksService() {
  return <ServicePageTemplate {...config} />;
}


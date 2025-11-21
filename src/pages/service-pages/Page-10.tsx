import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'vyvoz-stroitelnogo-i-lyubogo-musora',
  defaultTitle: 'Вывоз строительного и любого мусора',
  mainImage: '/images/images-imag/glav10-1.jpg',
  mainImageAlt: 'Вывоз строительного и любого мусора',
  secondaryImage: '/images/images-imag/glav10-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/gal10-1.jpg',
    '/images/images-imag/gal10-2.jpg',
    '/images/images-imag/gal10-3.jpg',
    '/images/images-imag/gal10-4.jpg',
  ],
};

export default function WasteRemovalService() {
  return <ServicePageTemplate {...config} />;
}


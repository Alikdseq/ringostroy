import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'dostavka-chernozema-ballasta-shchebenki-peska',
  defaultTitle: 'Доставка чернозема, балласта, щебенки, песка',
  mainImage: '/images/images-imag/glav11-1.jpg',
  mainImageAlt: 'Доставка сыпучих материалов',
  secondaryImage: '/images/images-imag/glav11-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/gal11-1.jpg',
    '/images/images-imag/gal11-3.jpg',
    '/images/images-imag/gal11-4.jpg',
  ],
};

export default function MaterialDeliveryService() {
  return <ServicePageTemplate {...config} />;
}


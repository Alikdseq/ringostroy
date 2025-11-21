import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'blagoustrojstvo-dvorov',
  defaultTitle: 'Благоустройство дворов',
  mainImage: '/images/images-imag/mask-group-72.png',
  mainImageAlt: 'Благоустройство дворов',
  secondaryImage: '/images/images-imag/mask-group-73.png',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/gal1-1.png',
    '/images/images-imag/gal1-2.png',
    '/images/images-imag/gal1-3.png',
    '/images/images-imag/gal1-4.png',
  ],
};

export default function YardImprovementService() {
  return <ServicePageTemplate {...config} />;
}


import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'srub-i-vyvoz-derevev',
  defaultTitle: 'Сруб и вывоз деревьев',
  mainImage: '/images/images-imag/glav8-1.jpg',
  mainImageAlt: 'Сруб и вывоз деревьев',
  secondaryImage: '/images/images-imag/glav8-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav8-1.jpg',
    '/images/images-imag/glav8-2.jpg',
  ],
};

export default function TreeRemovalService() {
  return <ServicePageTemplate {...config} />;
}


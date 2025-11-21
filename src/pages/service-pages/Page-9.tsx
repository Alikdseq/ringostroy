import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'burenie-svaj-do-2-5-metrov',
  defaultTitle: 'Бурение свай до 2.5 метров',
  mainImage: '/images/images-imag/glav9-1.jpg',
  mainImageAlt: 'Бурение свай до 2.5 метров',
  secondaryImage: '/images/images-imag/glav9-2.jpg',
  secondaryImageAlt: 'Процесс выполнения работ',
  galleryImages: [
    '/images/images-imag/glav9-1.jpg',
    '/images/images-imag/glav9-2.jpg',
  ],
};

export default function PileDrillingService() {
  return <ServicePageTemplate {...config} />;
}


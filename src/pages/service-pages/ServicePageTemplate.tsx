import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServicesCarousel from '../../components/ServicesCarousel';
import ContactQuickForm from '../../components/ContactQuickForm';
import SEO from '../../components/SEO';
import { generateBreadcrumbSchema, generateServiceSchema } from '../../utils/seo';
import servicesSeoData from '../../data/services-seo.json';
import { getServiceTextContent } from '../../utils/serviceContent';

type ServicePageTemplateProps = {
  slug: string;
  defaultTitle: string;
  mainImage: string;
  mainImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  galleryImages: string[];
};

const PLACEHOLDER_SHORT =
  'Описание услуги обновляется. Оставьте заявку, и мы ответим на все вопросы.';
const PLACEHOLDER_FULL =
  'Подробная информация появится в ближайшее время. Свяжитесь с менеджером, чтобы узнать детали.';
const IMAGE_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMzIzNDM1Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNhNjE2MTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QkNC+0LrQtCDQodGA0LDQvdC90L7QuSDQmNC+0L3QtNC30LDQvS4gRg==';

export default function ServicePageTemplate({
  slug,
  defaultTitle,
  mainImage,
  mainImageAlt,
  secondaryImage,
  secondaryImageAlt,
  galleryImages,
}: ServicePageTemplateProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { service, shortParagraphs, fullParagraphs } = getServiceTextContent(slug);
  const pageTitle = service?.name ?? defaultTitle;

  const heroParagraphs =
    shortParagraphs.length > 0 ? shortParagraphs : [PLACEHOLDER_SHORT];
  const detailParagraphs =
    fullParagraphs.length > 0 ? fullParagraphs : [PLACEHOLDER_FULL];

  const schemaDescription =
    service?.short_description || heroParagraphs.join(' ');

  const seoConfig = servicesSeoData[slug as keyof typeof servicesSeoData];
  const seoMeta = seoConfig ?? {
    title: pageTitle,
    description: schemaDescription,
    keywords: '',
  };

  const galleryList = galleryImages.length ? galleryImages : [mainImage];

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === galleryList.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? galleryList.length - 1 : prev - 1
    );
  };

  const serviceSchema = generateServiceSchema(pageTitle, schemaDescription);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' },
    { name: pageTitle, url: `/services/${slug}` },
  ]);

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [serviceSchema, breadcrumbSchema],
  };

  return (
    <>
      <SEO
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        image={`https://ringoostroy.ru${mainImage}`}
        type="article"
        structuredData={combinedSchema}
      />
      <div
        style={{
          background: 'var(--background-black)',
          color: 'var(--white)',
          minHeight: '100vh',
        }}
      >
        <section style={{ padding: isMobile ? '40px 0' : '60px 0' }}>
          <div
            className="container"
            style={{
              paddingLeft: isMobile ? '15px' : '0',
              paddingRight: isMobile ? '15px' : '0',
            }}
          >
            <nav
              style={{
                marginBottom: isMobile ? '20px' : '30px',
                flexWrap: 'wrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link
                to="/"
                style={{
                  color: 'var(--txt)',
                  textDecoration: 'none',
                  marginRight: '10px',
                  fontSize: isMobile
                    ? 'clamp(12px, 2.5vw, 14px)'
                    : '14px',
                }}
              >
                Главная
              </Link>
              <span style={{ margin: '0 10px', color: 'var(--txt)' }}>•</span>
              <Link
                to="/services"
                style={{
                  color: 'var(--txt)',
                  textDecoration: 'none',
                  marginRight: '10px',
                  fontSize: isMobile
                    ? 'clamp(12px, 2.5vw, 14px)'
                    : '14px',
                }}
              >
                Услуги
              </Link>
              <span style={{ margin: '0 10px', color: 'var(--txt)' }}>•</span>
              <span
                style={{
                  color: 'var(--primary)',
                  fontSize: isMobile
                    ? 'clamp(12px, 2.5vw, 14px)'
                    : '14px',
                }}
              >
                {pageTitle}
              </span>
            </nav>

            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: isMobile ? '30px' : '40px',
                textAlign: 'left',
              }}
            >
              {pageTitle}
            </h1>

            <div
              style={{
                background: 'var(--cart-black)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '40px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: isMobile ? '20px' : '40px',
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <div
                style={{
                  flex: isMobile ? '1 1 auto' : '1 1 500px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                {heroParagraphs.map((paragraph, index) => (
                  <p
                    key={`hero-${index}`}
                    style={{
                      fontSize: isMobile
                        ? 'clamp(14px, 3vw, 16px)'
                        : index === 0
                          ? '18px'
                          : '16px',
                      lineHeight: 1.8,
                      color: 'var(--white)',
                      marginBottom: isMobile ? '15px' : '20px',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <button
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    if (form) {
                      form.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }
                  }}
                  style={{
                    marginTop: isMobile ? '20px' : '30px',
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    borderRadius: isMobile ? '10px' : '12px',
                    background: 'var(--primary)',
                    color: 'var(--background-black)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '18px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Заказать услугу
                </button>
              </div>

              <div
                style={{
                  flex: isMobile ? '1 1 auto' : '0 1 500px',
                  borderRadius: isMobile ? '16px' : '20px',
                  overflow: 'hidden',
                  height: isMobile ? '250px' : '400px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <img
                  src={mainImage}
                  alt={mainImageAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    e.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: isMobile ? '40px 0' : '60px 0' }}>
          <div
            className="container"
            style={{
              paddingLeft: isMobile ? '15px' : '0',
              paddingRight: isMobile ? '15px' : '0',
            }}
          >
            <div
              style={{
                background: 'var(--cart-black)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '40px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: isMobile ? '20px' : '40px',
                flexWrap: isMobile ? 'nowrap' : 'nowrap',
                flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <div
                style={{
                  flex: isMobile ? '1 1 auto' : '0 1 500px',
                  borderRadius: isMobile ? '16px' : '20px',
                  overflow: 'hidden',
                  height: isMobile ? '250px' : '500px',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <img
                  src={secondaryImage}
                  alt={secondaryImageAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  onError={e => {
                    e.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />
              </div>

              <div
                style={{
                  flex: isMobile ? '1 1 auto' : '1 1 500px',
                  paddingTop: '0',
                  marginTop: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: 1.8,
                    color: 'var(--white)',
                    width: '100%',
                    maxWidth: '700px',
                  }}
                >
                  <h2
                    style={{
                      color: 'var(--white)',
                      fontSize: isMobile
                        ? 'clamp(22px, 4vw, 32px)'
                        : 'clamp(28px, 4vw, 42px)',
                      fontWeight: 600,
                      marginBottom: isMobile ? '25px' : '40px',
                      fontFamily: 'var(--second-family)',
                      textAlign: 'center',
                    }}
                  >
                    Подробное описание услуги
                  </h2>
                  <div
                    style={{
                      marginBottom: isMobile ? '30px' : '50px',
                      textAlign: 'center',
                    }}
                  >
                    {detailParagraphs.map((paragraph, index) => (
                      <p
                        key={`detail-${index}`}
                        style={{
                          fontSize: isMobile
                            ? 'clamp(14px, 3vw, 16px)'
                            : '16px',
                          lineHeight: 1.8,
                          color: 'var(--white)',
                          marginBottom: isMobile ? '15px' : '20px',
                          textAlign: 'left',
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: isMobile ? '40px 0' : '60px 0' }}>
          <div
            className="container"
            style={{
              paddingLeft: isMobile ? '15px' : '0',
              paddingRight: isMobile ? '15px' : '0',
            }}
          >
            <h2
              style={{
                color: 'var(--white)',
                fontSize: isMobile
                  ? 'clamp(22px, 4vw, 32px)'
                  : 'clamp(28px, 4vw, 42px)',
                fontWeight: 700,
                marginBottom: isMobile ? '30px' : '40px',
                textAlign: 'center',
              }}
            >
              Примеры наших работ
            </h2>

            <div
              style={{
                position: 'relative',
                maxWidth: '800px',
                margin: '0 auto',
                borderRadius: isMobile ? '16px' : '20px',
                overflow: 'hidden',
                border: '1px solid var(--stroke)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: isMobile ? '250px' : '500px',
                  background: 'var(--cart-black)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <img
                  src={galleryList[currentImageIndex]}
                  alt={`Пример работы ${currentImageIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  onError={e => {
                    e.currentTarget.src = IMAGE_FALLBACK;
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: isMobile ? '10px' : '20px',
                    right: isMobile ? '10px' : '20px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'var(--white)',
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    borderRadius: isMobile ? '12px' : '20px',
                    fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px',
                  }}
                >
                  {currentImageIndex + 1} / {galleryList.length}
                </div>
              </div>

              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: isMobile ? '10px' : '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      borderRadius: '50%',
                      border: '1px solid var(--stroke)',
                      background: 'var(--cart-black)',
                      color: 'var(--white)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--background-black)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--cart-black)';
                      e.currentTarget.style.color = 'var(--white)';
                    }}
                  >
                    <svg
                      width={isMobile ? 20 : 24}
                      height={isMobile ? 20 : 24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: isMobile ? '10px' : '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      borderRadius: '50%',
                      border: '1px solid var(--stroke)',
                      background: 'var(--cart-black)',
                      color: 'var(--white)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--background-black)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--cart-black)';
                      e.currentTarget.style.color = 'var(--white)';
                    }}
                  >
                    <svg
                      width={isMobile ? 20 : 24}
                      height={isMobile ? 20 : 24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        <ServicesCarousel />

        <section id="contact-form" style={{ padding: isMobile ? '40px 0' : '60px 0' }}>
          <div
            className="container"
            style={{
              paddingLeft: isMobile ? '15px' : '0',
              paddingRight: isMobile ? '15px' : '0',
            }}
          >
            <div
              style={{
                background: 'var(--cart-black)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '40px',
              }}
            >
              <h2
                style={{
                  color: 'var(--white)',
                  fontSize: isMobile
                    ? 'clamp(22px, 4vw, 32px)'
                    : 'clamp(28px, 4vw, 42px)',
                  fontWeight: 700,
                  marginBottom: isMobile ? '20px' : '30px',
                  textAlign: 'center',
                }}
              >
                Оставьте заявку на расчёт
              </h2>
              <ContactQuickForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


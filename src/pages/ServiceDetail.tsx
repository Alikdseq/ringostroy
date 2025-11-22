import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { servicesApi } from '../services/api';
import type { Service } from '../types';
import SEO from '../components/SEO';
import { splitTextToParagraphs } from '../utils/text';
import servicesSeoData from '../data/services-seo.json';
import { generateBreadcrumbSchema } from '../utils/seo';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    servicesApi.getAll()
      .then(res => {
        const found = res.data.results.find((x: Service) => x.slug === slug);
        if (!found) setError('Услуга не найдена');
        setService(found || null);
      })
      .catch(() => setError('Ошибка загрузки услуги'))
      .finally(() => setLoading(false));
  }, [slug]);

  const formattedDescription = service
    ? splitTextToParagraphs(service.full_description, { preserveSingleBreaks: true })
    : [];

  // Формируем breadcrumbs для микроразметки
  const breadcrumbItems = [
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' }
  ];
  
  if (service) {
    breadcrumbItems.push({
      name: service.name,
      url: `/services/${service.slug}`
    });
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEO 
        title={
          service?.slug && servicesSeoData[service.slug as keyof typeof servicesSeoData]?.title
            ? servicesSeoData[service.slug as keyof typeof servicesSeoData].title
            : service?.name
              ? `${service.name} | Услуги во Владикавказе | RingooStroy`
              : 'Услуга | Не найдено'
        }
        description={
          service?.slug && servicesSeoData[service.slug as keyof typeof servicesSeoData]?.description
            ? servicesSeoData[service.slug as keyof typeof servicesSeoData].description
            : service?.short_description || 'Информация об услуге'
        }
        keywords={
          service?.slug && servicesSeoData[service.slug as keyof typeof servicesSeoData]?.keywords
            ? servicesSeoData[service.slug as keyof typeof servicesSeoData].keywords
            : undefined
        }
        structuredData={breadcrumbSchema}
      />
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {loading ? (
            <div className="text-center" style={{ color: 'var(--white)' }}>Загрузка...</div>
          ) : error ? (
            <div className="text-center" style={{ color: '#e74c3c' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>{error}</h2>
              <Link to="/services" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>← Вернуться ко всем услугам</Link>
            </div>
          ) : service ? (
            <>
              {/* Хлебные крошки */}
              <nav style={{ marginBottom: '30px' }}>
                <Link to="/" style={{ color: 'var(--txt)', textDecoration: 'none' }}>Главная</Link>
                <span style={{ margin: '0 10px', color: 'var(--txt)' }}>•</span>
                <Link to="/services" style={{ color: 'var(--txt)', textDecoration: 'none' }}>Услуги</Link>
                <span style={{ margin: '0 10px', color: 'var(--txt)' }}>•</span>
                <span style={{ color: 'var(--primary)' }}>{service.name}</span>
              </nav>

              {/* Заголовок */}
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '40px'
              }}>
                {service.name}
              </h1>

              {/* Контент - две колонки */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                alignItems: 'start'
              }}>
                {/* Левая колонка - текст */}
                <div>
                  {formattedDescription.length > 0 && (
                    <div
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.8',
                        color: 'var(--txt)',
                        marginBottom: '30px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      {formattedDescription.map((paragraph, index) => (
                        <p key={`service-desc-${index}`} style={{ margin: 0 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Кнопка "Заказать услугу" */}
                  <button
                    onClick={() => {
                      const form = document.getElementById('contact-form')
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }
                    }}
                    style={{
                      padding: '16px 32px',
                      borderRadius: '12px',
                      background: 'var(--primary)',
                      color: 'var(--background-black)',
                      fontSize: '18px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Заказать услугу
                  </button>
                </div>

                {/* Правая колонка - изображение */}
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      minHeight: '400px',
                      background: 'linear-gradient(135deg, var(--stroke) 0%, var(--cart-black) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '20px'
                    }}>
                      <span style={{ color: 'var(--txt)', fontSize: '18px' }}>Нет фото</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}

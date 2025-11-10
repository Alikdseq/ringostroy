import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { generateLocalBusinessSchema } from '../utils/seo'

const cities = [
  'Алагир', 'Ардон', 'Беслан', 'Владикавказ', 'Дигора', 'Заводской', 'Моздок'
]

export default function Contacts() {
  const [isMobile, setIsMobile] = useState(false)

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Прокрутка к началу страницы при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Координаты для карты: г. Владикавказ, ул. Билара Кабалоева, 12В
  // Используем Яндекс Карты через iframe для интерактивности (масштабирование и перемещение)
  // Параметры: ll - координаты центра, z - уровень масштабирования, l - тип карты, pt - маркер
  const mapUrl = 'https://yandex.ru/map-widget/v1/?ll=44.667028,43.003130&z=15&l=map&pt=44.667028,43.003130&text=RingooStroy%2C+ул.+Билара+Кабалоева%2C+12В'

  return (
    <>
      <SEO 
        title="Контакты RingooStroy | Адрес, телефон, города работы" 
        description="Контактная информация RingooStroy. Адрес: Владикавказ, ул. Билара Кабалоева, 12В. Телефон: +7 988 830-77-77. Работаем во всех крупных городах Северной Осетии: Алагир, Ардон, Беслан, Моздок и др." 
        keywords="контакты RingooStroy, адрес спецтехники Владикавказ, телефон аренды спецтехники, города работы, Северная Осетия"
        structuredData={generateLocalBusinessSchema()}
      />
      
      <section style={{ 
        padding: isMobile ? '40px 0' : '60px 0', 
        background: 'var(--background-black)',
        minHeight: '60vh'
      }}>
        <div className="container" style={{
          paddingLeft: isMobile ? '15px' : '0',
          paddingRight: isMobile ? '15px' : '0'
        }}>
          {/* Хлебные крошки */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: isMobile ? '20px' : '30px',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/"
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--white)'
              }}
            >
              Главная
            </Link>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--primary)'
            }}></div>
            <span style={{
              color: 'var(--primary)',
              fontSize: '14px',
              fontWeight: 600
            }}>
              Контакты
            </span>
          </div>

          {/* Заголовок */}
          <h1 style={{
            color: 'var(--white)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: isMobile ? '30px' : '40px'
          }}>
            Контакты
          </h1>

          {/* Основной контент: две колонки */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
            gap: isMobile ? '20px' : '30px',
            alignItems: 'start'
          }}>
            {/* Левая колонка - информация */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Блок "Телефон и почта" */}
              <div style={{
                background: 'var(--primary)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '30px',
                color: 'var(--background-black)'
              }}>
                <h3 style={{
                  fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px',
                  fontWeight: 600,
                  marginBottom: isMobile ? '15px' : '20px',
                  color: 'var(--background-black)',
                  opacity: 0.8
                }}>
                  Телефон и почта
                </h3>
                <div style={{
                  fontSize: isMobile ? 'clamp(20px, 4vw, 24px)' : 'clamp(24px, 3vw, 32px)',
                  fontWeight: 700,
                  marginBottom: isMobile ? '12px' : '15px',
                  color: 'var(--background-black)'
                }}>
                  +7 988 830-77-77
                </div>
                <div style={{
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                  color: 'var(--background-black)',
                  opacity: 0.8
                }}>
                  misikov7700@mail.ru
                </div>
              </div>

              {/* Блок "Наш адрес" */}
              <div style={{
                background: 'var(--cart-black)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '30px',
                border: '1px solid var(--stroke)'
              }}>
                <h3 style={{
                  fontSize: isMobile ? 'clamp(18px, 3.5vw, 20px)' : '20px',
                  fontWeight: 700,
                  marginBottom: isMobile ? '12px' : '15px',
                  color: 'var(--white)'
                }}>
                  Наш адрес
                </h3>
                <p style={{
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                  color: 'var(--txt)',
                  lineHeight: '1.6'
                }}>
                  г. Владикавказ, ул. Билара Кабалоева, 12В
                </p>
              </div>

              {/* Блок "Мы работаем во всех крупных городах" */}
              <div style={{
                background: 'var(--cart-black)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '20px' : '30px',
                border: '1px solid var(--stroke)'
              }}>
                <h3 style={{
                  fontSize: isMobile ? 'clamp(18px, 3.5vw, 20px)' : '20px',
                  fontWeight: 700,
                  marginBottom: isMobile ? '15px' : '20px',
                  color: 'var(--white)'
                }}>
                  Мы работаем во всех крупных городах
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: isMobile ? '10px' : '8px'
                }}>
                  {cities.map(city => (
                    <button
                      key={city}
                      type="button"
                      style={{
                        padding: isMobile ? '10px 12px' : '8px 12px',
                        borderRadius: isMobile ? '8px' : '6px',
                        border: '1px solid var(--stroke)',
                        background: 'var(--cart-black)',
                        color: 'var(--white)',
                        fontSize: isMobile ? 'clamp(13px, 3vw, 14px)' : '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--stroke)'
                        e.currentTarget.style.background = 'var(--cart-black)'
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Правая колонка - карта */}
            <div style={{
              borderRadius: isMobile ? '16px' : '20px',
              overflow: 'hidden',
              border: '1px solid var(--stroke)',
              height: isMobile ? '350px' : '600px',
              position: 'relative',
              order: isMobile ? -1 : 0
            }}>
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                style={{
                  border: 'none'
                }}
                title="Карта местоположения RingooStroy"
              ></iframe>
              {/* Ссылка "Открыть в Яндекс Картах" */}
              <a
                href="https://yandex.ru/maps/?ll=44.667028,43.003130&z=15&l=map&pt=44.667028,43.003130&text=RingooStroy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '8px' : '10px',
                  left: isMobile ? '8px' : '10px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'var(--white)',
                  padding: isMobile ? '6px 10px' : '8px 12px',
                  borderRadius: isMobile ? '4px' : '6px',
                  fontSize: isMobile ? 'clamp(10px, 2.5vw, 12px)' : '12px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '4px' : '6px',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
                }}
              >
                <svg width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {!isMobile && 'Открыть в Яндекс Картах'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

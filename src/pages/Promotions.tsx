import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { generateBreadcrumbSchema } from '../utils/seo'
const nightImage = '/images/images-imag/night.png'
const svobodaImage = '/images/images-technica/svoboda.png'

export default function Promotions() {
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

  const handleOrderClick = () => {
    const whatsappNumber = '79888307777'
    const message = 'Новая заявка с сайта (страница Акции)'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <SEO 
        title="Акции и спецпредложения | RingooStroy - Скидки на аренду спецтехники" 
        description="Актуальные акции и спецпредложения RingooStroy. Скидка 10% при заявке с сайта. Ночная аренда выгоднее. Специальные условия для новых клиентов. Действует до 31.12.2025." 
        keywords="акции аренда спецтехники, скидки на спецтехнику, спецпредложения RingooStroy, ночная аренда, скидка 10%"
        structuredData={generateBreadcrumbSchema([
          { name: 'Главная', url: '/' },
          { name: 'Акции', url: '/promotions' }
        ])}
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
              Акции
            </span>
          </div>

          {/* Заголовок */}
          <h1 style={{
            color: 'var(--white)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: isMobile ? '30px' : '50px'
          }}>
            Акции
          </h1>

          {/* Карточки акций */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '20px' : '30px',
            width: '100%'
          }}>
            {/* Карточка 1: Акция ночи */}
            <div style={{
              borderRadius: isMobile ? '16px' : '20px',
              overflow: 'hidden',
              background: 'var(--cart-black)',
              border: '1px solid var(--stroke)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              {/* Текстовая часть слева */}
              <div style={{
                width: isMobile ? '100%' : '50%',
                padding: isMobile ? '20px' : '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Дата */}
                <div style={{
                  color: 'var(--primary)',
                  fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px',
                  fontWeight: 600,
                  marginBottom: isMobile ? '15px' : '20px'
                }}>
                  Действует до 31.12.2025
                </div>

                {/* Заголовок */}
                <h2 style={{
                  color: 'var(--white)',
                  fontSize: isMobile ? 'clamp(18px, 4vw, 24px)' : 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 700,
                  marginBottom: isMobile ? '12px' : '15px',
                  marginTop: 0
                }}>
                  Акция ночи
                </h2>

                {/* Описание */}
                <p style={{
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                  lineHeight: '1.6',
                  marginBottom: isMobile ? '20px' : '30px',
                  flex: 1
                }}>
                  Скидка на аренду техники в ночное время
                </p>

                {/* Кнопка */}
                <button
                  onClick={handleOrderClick}
                  style={{
                    padding: isMobile ? '12px 24px' : '14px 28px',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: isMobile ? '10px' : '12px',
                    color: 'var(--background-black)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    alignSelf: 'flex-start',
                    width: isMobile ? '100%' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.border = '2px solid var(--primary)'
                    e.currentTarget.style.color = 'var(--primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--primary)'
                    e.currentTarget.style.border = 'none'
                    e.currentTarget.style.color = 'var(--background-black)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Оставить заявку
                </button>
              </div>

              {/* Изображение справа */}
              <div style={{
                width: isMobile ? '100%' : '50%',
                minHeight: isMobile ? '150px' : '300px',
                overflow: 'hidden',
                order: isMobile ? -1 : 0
              }}>
                <img
                  src={nightImage}
                  alt="Акция ночи"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Карточка 2: Холостая техника */}
            <div style={{
              borderRadius: isMobile ? '16px' : '20px',
              overflow: 'hidden',
              background: 'var(--cart-black)',
              border: '1px solid var(--stroke)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              {/* Текстовая часть слева */}
              <div style={{
                width: isMobile ? '100%' : '50%',
                padding: isMobile ? '20px' : '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Дата */}
                <div style={{
                  color: 'var(--primary)',
                  fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px',
                  fontWeight: 600,
                  marginBottom: isMobile ? '15px' : '20px'
                }}>
                  Действует до 31.12.2025
                </div>

                {/* Заголовок */}
                <h2 style={{
                  color: 'var(--white)',
                  fontSize: isMobile ? 'clamp(18px, 4vw, 24px)' : 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 700,
                  marginBottom: isMobile ? '12px' : '15px',
                  marginTop: 0
                }}>
                  Холостая техника
                </h2>

                {/* Описание */}
                <p style={{
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                  lineHeight: '1.6',
                  marginBottom: isMobile ? '20px' : '30px',
                  flex: 1
                }}>
                  Скидка 20% на одиноко стоящую технику
                </p>

                {/* Кнопка */}
                <button
                  onClick={handleOrderClick}
                  style={{
                    padding: isMobile ? '12px 24px' : '14px 28px',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: isMobile ? '10px' : '12px',
                    color: 'var(--background-black)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    alignSelf: 'flex-start',
                    width: isMobile ? '100%' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.border = '2px solid var(--primary)'
                    e.currentTarget.style.color = 'var(--primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--primary)'
                    e.currentTarget.style.border = 'none'
                    e.currentTarget.style.color = 'var(--background-black)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Оставить заявку
                </button>
              </div>

              {/* Изображение справа */}
              <div style={{
                width: isMobile ? '100%' : '50%',
                minHeight: isMobile ? '150px' : '300px',
                overflow: 'hidden',
                order: isMobile ? -1 : 0
              }}>
                <img
                  src={svobodaImage}
                  alt="Холостая техника"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

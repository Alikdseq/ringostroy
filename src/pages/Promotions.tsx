import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { generateBreadcrumbSchema } from '../utils/seo'

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

  const handleWhatsAppClick = () => {
    const whatsappNumber = '79888307777'
    const whatsappUrl = `https://wa.me/${whatsappNumber}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <SEO 
        title="Акции и спецпредложения | RingooStroy - Скидки на аренду спецтехники" 
        description="Актуальные акции и спецпредложения RingooStroy. Скидка 10% при заявке с сайта. Ночная аренда выгоднее. Специальные условия для новых клиентов. Действует до 31.12.2025." 
        keywords="акции аренда спецтехники, скидки на спецтехнику, спецпредложения RingooStroy, спецпредложения Ринго Строй, рингострой акции, ринго, ringostroy, ringoostroy, ночная аренда, скидка 10%"
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

          {/* Блок с информацией об акциях */}
          <div style={{
            background: 'var(--cart-black)',
            border: '1px solid var(--stroke)',
            borderRadius: isMobile ? '20px' : '24px',
            padding: isMobile ? '40px 20px' : '60px 40px',
            textAlign: 'center',
            maxWidth: isMobile ? '100%' : '800px',
            margin: '0 auto'
          }}>
            {/* Иконка или декоративный элемент */}
            <div style={{
              width: isMobile ? '80px' : '100px',
              height: isMobile ? '80px' : '100px',
              margin: '0 auto',
              marginBottom: isMobile ? '30px' : '40px',
              background: 'var(--primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg 
                width={isMobile ? "48" : "60"} 
                height={isMobile ? "48" : "60"} 
                fill="var(--background-black)" 
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <path d="M7 9h2v2H7zm4 0h6v2h-6zm-4 4h6v2H7zm8 0h2v2h-2z"/>
              </svg>
            </div>

            {/* Основной текст */}
            <h2 style={{
              color: 'var(--white)',
              fontSize: isMobile ? 'clamp(24px, 5vw, 32px)' : 'clamp(28px, 3vw, 36px)',
              fontWeight: 700,
              marginBottom: isMobile ? '20px' : '24px',
              lineHeight: '1.3'
            }}>
              По поводу акции пишите нам!
            </h2>

            <p style={{
              color: 'var(--txt)',
              fontSize: isMobile ? 'clamp(16px, 3.5vw, 18px)' : '18px',
              lineHeight: '1.6',
              marginBottom: isMobile ? '30px' : '40px',
              opacity: 0.9
            }}>
              Все расскажем!
            </p>

            {/* Кнопка WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              style={{
                padding: isMobile ? '16px 32px' : '18px 40px',
                background: '#25D366',
                border: 'none',
                borderRadius: isMobile ? '12px' : '14px',
                color: '#fff',
                fontSize: isMobile ? 'clamp(16px, 3.5vw, 18px)' : '18px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#20BA5A'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
            >
              <svg 
                width="24" 
                height="24" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Написать в WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

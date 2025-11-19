import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { servicesApi } from '../services/api'
import type { Service } from '../types'

export default function ServicesCarousel() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
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

  // Маппинг slug'ов на пути к конкретным страницам услуг
  // Соответствие: slug из базы данных -> путь к странице услуги (Page-1 до Page-19)
  // Все 19 услуг правильно связаны с соответствующими страницами
  // Включает альтернативные варианты slug'ов для совместимости с разными форматами данных
  const servicePageMap: Record<string, string> = {
    'blagoustrojstvo-dvorov': '/services/blagoustrojstvo-dvorov', // Page-1
    'kopka-transej': '/services/kopka-transej', // Page-2
    'kopka-transhej': '/services/kopka-transej', // Page-2 (альтернативный вариант)
    'kanalizaciya-pod-klyuch': '/services/kanalizaciya-pod-klyuch', // Page-3
    'dostavka-i-ustanovka-kolec': '/services/dostavka-i-ustanovka-kolec', // Page-4
    'dostavka-i-ustanovka-fbs-blokov': '/services/dostavka-i-ustanovka-fbs-blokov', // Page-5
    'obratnaya-zasypka-fundamentov': '/services/obratnaya-zasypka-fundamentov', // Page-6
    'planirovka-i-ochistka-uchastka': '/services/planirovka-i-ochistka-uchastka', // Page-7
    'planirovka-i-ochitka-uchastka': '/services/planirovka-i-ochistka-uchastka', // Page-7 (альтернативный вариант)
    'srub-i-vyvoz-derevev': '/services/srub-i-vyvoz-derevev', // Page-8
    'burenie-svaj-do-2-5-metrov': '/services/burenie-svaj-do-2-5-metrov', // Page-9
    'burenie-svaj-do-25-metrov': '/services/burenie-svaj-do-2-5-metrov', // Page-9 (альтернативный вариант без дефиса)
    'vyvoz-stroitelnogo-i-lyubogo-musora': '/services/vyvoz-stroitelnogo-i-lyubogo-musora', // Page-10
    'dostavka-chernozema-ballasta-shchebenki-peska': '/services/dostavka-chernozema-ballasta-shchebenki-peska', // Page-11
    'dostavka-chernozema-ballasta-shebenki-peska-i-td': '/services/dostavka-chernozema-ballasta-shchebenki-peska', // Page-11 (альтернативный вариант)
    'uslugi-gidromolota': '/services/uslugi-gidromolota', // Page-12
    'kopka-kotlovana': '/services/kopka-kotlovana', // Page-13
    'kopka-pod-fundament': '/services/kopka-pod-fundament', // Page-14
    'rezka-betona-i-asfalta': '/services/rezka-betona-i-asfalta', // Page-15
    'pokos-travy-mulcherom': '/services/pokos-travy-mulcherom', // Page-16
    'stroitelstvo-fundamentov': '/services/stroitelstvo-fundamentov', // Page-17
    'stroitelstvo-zaborov': '/services/stroitelstvo-zaborov', // Page-18
    'raschistka-ili-uborka-snega': '/services/raschistka-ili-uborka-snega', // Page-19
  }

  // Маппинг slug'ов на изображения для карточек карусели
  // Соответствие: slug из базы данных -> путь к изображению (glav1-1 до glav19-1)
  const serviceImageMap: Record<string, string> = {
    'blagoustrojstvo-dvorov': '/images/images-imag/mask-group-72.png', // Page-1 (используем mask-group-72.png, так как glav1-1.jpg не найден)
    'kopka-transej': '/images/images-imag/glav2-1.jpg', // Page-2
    'kopka-transhej': '/images/images-imag/glav2-1.jpg', // Page-2 (альтернативный вариант)
    'kanalizaciya-pod-klyuch': '/images/images-imag/glav3-1.jpg', // Page-3
    'dostavka-i-ustanovka-kolec': '/images/images-imag/glav4-1.jpg', // Page-4
    'dostavka-i-ustanovka-fbs-blokov': '/images/images-imag/glav5-1.jpg', // Page-5
    'obratnaya-zasypka-fundamentov': '/images/images-imag/glav6-1.jpg', // Page-6
    'planirovka-i-ochistka-uchastka': '/images/images-imag/glav7-1.jpg', // Page-7
    'planirovka-i-ochitka-uchastka': '/images/images-imag/glav7-1.jpg', // Page-7 (альтернативный вариант)
    'srub-i-vyvoz-derevev': '/images/images-imag/glav8-1.jpg', // Page-8
    'burenie-svaj-do-2-5-metrov': '/images/images-imag/glav9-1.jpg', // Page-9
    'burenie-svaj-do-25-metrov': '/images/images-imag/glav9-1.jpg', // Page-9 (альтернативный вариант)
    'vyvoz-stroitelnogo-i-lyubogo-musora': '/images/images-imag/glav10-1.jpg', // Page-10
    'dostavka-chernozema-ballasta-shchebenki-peska': '/images/images-imag/glav11-1.jpg', // Page-11
    'dostavka-chernozema-ballasta-shebenki-peska-i-td': '/images/images-imag/glav11-1.jpg', // Page-11 (альтернативный вариант)
    'uslugi-gidromolota': '/images/images-imag/glav12-1.jpg', // Page-12
    'kopka-kotlovana': '/images/images-imag/glav13-1.jpg', // Page-13
    'kopka-pod-fundament': '/images/images-imag/glav14-1.jpg', // Page-14
    'rezka-betona-i-asfalta': '/images/images-imag/glav15-1.jpg', // Page-15
    'pokos-travy-mulcherom': '/images/images-imag/glav16-1.jpg', // Page-16
    'stroitelstvo-fundamentov': '/images/images-imag/glav17-1.jpg', // Page-17
    'stroitelstvo-zaborov': '/images/images-imag/glav18-1.jpg', // Page-18
    'raschistka-ili-uborka-snega': '/images/images-imag/glav19-1.jpg.jpg', // Page-19 (учитываем .jpg.jpg)
  }

  const getServicePageLink = (slug: string) => {
    return servicePageMap[slug] || `/services/${slug}`
  }

  const getServiceImage = (slug: string) => {
    return serviceImageMap[slug] || null
  }

  useEffect(() => {
    servicesApi.getAll()
      .then(response => {
        setServices(response.data.results)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching services:', error)
        setLoading(false)
      })
  }, [])


  if (loading) {
    return null
  }

  return (
    <section style={{ padding: isMobile ? '40px 0' : '60px 0', position: 'relative' }}>
      <div className="container" style={{ paddingLeft: isMobile ? '15px' : '0', paddingRight: isMobile ? '15px' : '0' }}>
        <h2 style={{
          color: 'var(--white)',
          fontSize: 'clamp(24px, 4vw, 42px)',
          fontWeight: 700,
          marginBottom: isMobile ? '30px' : '40px',
          textAlign: 'left'
        }}>
          Наши услуги
        </h2>

        {/* Сетка услуг */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
          gap: isMobile ? '20px' : '24px',
          marginBottom: isMobile ? '25px' : '30px'
        }}>
          {services.map((service) => {
            const imagePath = getServiceImage(service.slug) || service.image || '/images/images-imag/mask-group-72.png';
            const isHovered = hoveredCard === service.id;
            
            return (
              <Link
                key={service.id}
                to={getServicePageLink(service.slug)}
                style={{
                  position: 'relative',
                  borderRadius: isMobile ? '20px' : '24px',
                  overflow: 'hidden',
                  minHeight: isMobile ? '280px' : '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: isMobile ? '24px' : '32px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.03) translateY(-8px)' : 'scale(1) translateY(0)',
                  boxShadow: isHovered 
                    ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(192, 239, 85, 0.3)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.25)',
                  zIndex: isHovered ? 10 : 1
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Фоновое изображение с эффектом зума */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${imagePath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  zIndex: 0
                }} />
                
                {/* Затемнение фона для читаемости текста */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isHovered 
                    ? 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%)'
                    : 'linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 100%)',
                  transition: 'background 0.4s ease',
                  zIndex: 1
                }} />
                
                {/* Текстовый контент */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'var(--white)'
                }}>
                  <h3 style={{
                    fontSize: isMobile ? 'clamp(18px, 3vw, 22px)' : 'clamp(20px, 2.5vw, 26px)',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '16px',
                    lineHeight: '1.3',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                    transition: 'transform 0.4s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
                  }}>
                    {service.name}
                  </h3>
                  
                  {service.short_description && (
                    <p style={{
                      fontSize: isMobile ? '14px' : '16px',
                      lineHeight: '1.5',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                      marginBottom: isMobile ? '16px' : '20px',
                      transition: 'opacity 0.4s ease',
                      opacity: isHovered ? 1 : 0.9
                    }}>
                      {service.short_description}
                    </p>
                  )}
                  
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: isMobile ? '10px 20px' : '12px 24px',
                    background: isHovered ? 'var(--primary)' : 'rgba(192, 239, 85, 0.2)',
                    border: `2px solid ${isHovered ? 'var(--primary)' : 'rgba(192, 239, 85, 0.4)'}`,
                    borderRadius: isMobile ? '10px' : '12px',
                    color: isHovered ? 'var(--background-black)' : 'var(--primary)',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: 700,
                    transition: 'all 0.4s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isHovered ? '0 4px 12px rgba(192, 239, 85, 0.3)' : 'none'
                  }}>
                    Подробнее
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                      transition: 'transform 0.4s ease',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                    }}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Кнопка "Все услуги" */}
        <div style={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          marginTop: isMobile ? '20px' : '30px'
        }}>
          <Link
            to="/services"
            style={{
              display: 'inline-block',
              padding: isMobile ? '12px 28px' : '14px 32px',
              background: 'var(--primary)',
              border: '2px solid var(--primary)',
              color: 'var(--background-black)',
              borderRadius: isMobile ? '10px' : '12px',
              fontSize: 'clamp(14px, 2vw, 16px)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--primary)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)'
              e.currentTarget.style.color = 'var(--background-black)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            Все услуги
          </Link>
        </div>
      </div>
    </section>
  )
}


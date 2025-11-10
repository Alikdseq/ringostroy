import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { servicesApi } from '../services/api'
import type { Service } from '../types'

export default function ServicesCarousel() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(0)
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

  useEffect(() => {
    if (cardRef.current && containerRef.current) {
      const updateCardWidth = () => {
        if (cardRef.current && containerRef.current) {
          const computedStyle = window.getComputedStyle(containerRef.current)
          const gap = parseFloat(computedStyle.gap || '0') || 20
          const width = cardRef.current.offsetWidth
          setCardWidth(width + gap)
        }
      }
      
      // Небольшая задержка для корректного измерения после рендера
      const timer = setTimeout(updateCardWidth, 100)
      window.addEventListener('resize', updateCardWidth)
      
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', updateCardWidth)
      }
    }
  }, [services])

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      return next >= services.length ? 0 : next
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      return newIndex < 0 ? services.length - 1 : newIndex
    })
  }

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

        {/* Карусель */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Стрелка влево */}
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: isMobile ? '5px' : '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: isMobile ? '36px' : '48px',
              height: isMobile ? '36px' : '48px',
              borderRadius: '50%',
              border: '1px solid var(--stroke)',
              background: 'var(--cart-black)',
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary)'
              e.currentTarget.style.borderColor = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--cart-black)'
              e.currentTarget.style.borderColor = 'var(--stroke)'
            }}
          >
            <svg width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Wrapper с overflow для обрезки */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            {/* Контейнер карточек */}
            <div 
              ref={containerRef}
              style={{
                display: 'flex',
                gap: isMobile ? '15px' : '20px',
                transition: 'transform 0.5s ease',
                transform: `translateX(-${currentIndex * cardWidth}px)`,
                width: '100%'
              }}
            >
            {services.map((service, idx) => {
              return (
                <div
                  key={service.id}
                  ref={idx === 0 ? cardRef : null}
                  style={{
                    flex: isMobile ? '0 0 calc(100% - 7.5px)' : '0 0 calc(50% - 10px)',
                    borderRadius: isMobile ? '16px' : '20px',
                    overflow: 'hidden',
                    background: 'var(--cart-black)',
                    border: '1px solid var(--stroke)',
                    position: 'relative',
                    minWidth: 0
                  }}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Изображение - кликабельное */}
                  <Link
                    to={getServicePageLink(service.slug)}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: isMobile ? '220px' : '300px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    {(() => {
                      const imagePath = getServiceImage(service.slug) || service.image || '/images/images-imag/mask-group-72.png';
                      return (
                        <img
                          src={imagePath}
                          alt={service.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onError={(e) => {
                            // Fallback на изображение по умолчанию при ошибке загрузки
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = '/images/images-imag/mask-group-72.png';
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        />
                      );
                    })()}
                  </Link>

                  {/* Текстовый блок */}
                  <div style={{
                    padding: isMobile ? '18px' : '25px',
                    background: 'var(--cart-black)',
                    position: 'relative',
                    minHeight: isMobile ? '100px' : '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <h3 style={{
                      color: 'var(--white)',
                      fontSize: 'clamp(16px, 2.5vw, 20px)',
                      fontWeight: 600,
                      marginBottom: isMobile ? '12px' : '15px',
                      textAlign: 'center',
                      lineHeight: '1.3'
                    }}>
                      {service.name}
                    </h3>

                    {/* Кнопка "Подробнее" - всегда видима */}
                    <Link
                      to={getServicePageLink(service.slug)}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: isMobile ? '10px 20px' : '12px 24px',
                        background: hoveredCard === service.id ? 'var(--primary)' : 'transparent',
                        border: '2px solid var(--primary)',
                        color: hoveredCard === service.id ? 'var(--background-black)' : 'var(--primary)',
                        borderRadius: isMobile ? '10px' : '12px',
                        textAlign: 'center',
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        // Останавливаем всплытие события, чтобы не срабатывали другие обработчики
                        e.stopPropagation()
                      }}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              )
            })}
            </div>
          </div>

          {/* Стрелка вправо */}
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: isMobile ? '5px' : '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: isMobile ? '36px' : '48px',
              height: isMobile ? '36px' : '48px',
              borderRadius: '50%',
              border: '1px solid var(--stroke)',
              background: 'var(--cart-black)',
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary)'
              e.currentTarget.style.borderColor = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--cart-black)'
              e.currentTarget.style.borderColor = 'var(--stroke)'
            }}
          >
            <svg width={isMobile ? "18" : "24"} height={isMobile ? "18" : "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Кнопка "Все услуги" в правом нижнем углу */}
        <div style={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          marginTop: isMobile ? '25px' : '30px',
          paddingRight: isMobile ? '0' : '40px',
          paddingLeft: isMobile ? '0' : '0'
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


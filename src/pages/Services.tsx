import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesApi } from '../services/api'
import type { Service } from '../types'
import SEO from '../components/SEO'
import { generateBreadcrumbSchema } from '../utils/seo'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Определение размера экрана для адаптивности
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

  // Маппинг slug'ов на изображения для карточек
  // Соответствие: slug из базы данных -> путь к изображению (glav1-1 до glav19-1)
  const serviceImageMap: Record<string, string> = {
    'blagoustrojstvo-dvorov': '/images/images-imag/mask-group-72.png', // Page-1
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

  // Прокрутка к началу страницы при монтировании компонента
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <section style={{ 
        padding: isMobile ? '40px 0' : '60px 0', 
        minHeight: '60vh' 
      }}>
        <div className="container" style={{
          paddingLeft: isMobile ? '15px' : '0',
          paddingRight: isMobile ? '15px' : '0'
        }}>
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--white)', 
            fontSize: isMobile ? 'clamp(14px, 3vw, 18px)' : '18px' 
          }}>
            Загрузка...
          </div>
        </div>
      </section>
    )
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' }
  ]);

  return (
    <>
      <SEO 
        title="Услуги аренды спецтехники | RingooStroy - Владикавказ" 
        description="Полный каталог услуг аренды спецтехники во Владикавказе. Благоустройство дворов, копка траншей, канализация, доставка материалов, вывоз мусора и многое другое. Работаем по всей Северной Осетии." 
        keywords="услуги аренды спецтехники, благоустройство дворов, копка траншей, канализация под ключ, доставка материалов, вывоз мусора, аренда спецтехники Владикавказ, ринго, рингострой, RingooStroy, ringostroy, ringoostroy, ринго строй"
        structuredData={breadcrumbSchema}
      />
    <section style={{ 
      padding: isMobile ? '40px 0' : '60px 0', 
      position: 'relative' 
    }}>
      <div className="container" style={{
        paddingLeft: isMobile ? '15px' : '0',
        paddingRight: isMobile ? '15px' : '0'
      }}>
        <h1 style={{
          color: 'var(--white)',
          fontSize: 'clamp(24px, 4vw, 42px)',
          fontWeight: 700,
          marginBottom: isMobile ? '30px' : '40px',
          textAlign: 'center'
        }}>
          Наши услуги
        </h1>

        {/* Сетка карточек в две колонки (одна на мобильных) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '15px' : '20px',
          width: '100%'
        }}>
          {services.map((service) => {
            const imagePath = getServiceImage(service.slug) || service.image || '/images/images-imag/mask-group-72.png'
            
            return (
              <div
                key={service.id}
                style={{
                  borderRadius: isMobile ? '16px' : '20px',
                  overflow: 'hidden',
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
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
                </Link>

                {/* Текстовый блок */}
                <div style={{
                  padding: isMobile ? '18px' : '25px',
                  background: 'var(--cart-black)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isMobile ? '12px' : '15px',
                  flex: 1
                }}>
                  {/* Название услуги */}
                  <h3 style={{
                    color: 'var(--white)',
                    fontSize: 'clamp(16px, 2.5vw, 20px)',
                    fontWeight: 600,
                    textAlign: 'center',
                    margin: 0,
                    lineHeight: '1.3'
                  }}>
                    {service.name}
                  </h3>

                  {/* Кнопки */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '8px' : '10px'
                  }}>
                    {/* Кнопка "Подробнее" */}
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
                        e.stopPropagation()
                      }}
                    >
                      Подробнее
                    </Link>

                    {/* Кнопка "Заказать услугу" */}
                    <a
                      href={service.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: isMobile ? '10px 20px' : '12px 24px',
                        background: hoveredCard === service.id ? '#25D366' : 'transparent',
                        border: '2px solid #25D366',
                        color: hoveredCard === service.id ? 'var(--white)' : '#25D366',
                        borderRadius: isMobile ? '10px' : '12px',
                        textAlign: 'center',
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Заказать услугу
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}

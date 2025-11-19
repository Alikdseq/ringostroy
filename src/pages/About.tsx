import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { generateBreadcrumbSchema } from '../utils/seo'
import CityForm from '../components/CityForm'
const imageLeft = '/images/images-technica/t3.png'
const imageRight = '/images/images-technica/t2.png'
const osnovatelImage = '/images/images-imag/osnovatel.png'
const logoImage = '/images/icons/logo.svg'

export default function About() {
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

  return (
    <>
      <SEO 
        title="О компании RingooStroy | Аренда спецтехники Владикавказ" 
        description="RingooStroy - более 13 лет опыта в аренде спецтехники во Владикавказе и Северной Осетии. Надежный партнер для строительства, производства и сельского хозяйства. Современная техника, гарантии качества, работа 24/7." 
        keywords="о компании RingooStroy, аренда спецтехники Владикавказ, история компании, основатель RingooStroy, спецтехника Северная Осетия"
        structuredData={generateBreadcrumbSchema([
          { name: 'Главная', url: '/' },
          { name: 'О компании', url: '/about' }
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
              О компании
            </span>
          </div>

          {/* Заголовок */}
          <h1 style={{
            color: 'var(--white)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            marginBottom: isMobile ? '30px' : '40px'
          }}>
            О компании
          </h1>

          {/* Две фотографии под заголовком */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: isMobile ? '10px' : '20px',
            marginBottom: isMobile ? '40px' : '60px'
          }}>
            <div style={{
              borderRadius: isMobile ? '12px' : '20px',
              overflow: 'hidden',
              height: isMobile ? '150px' : '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={imageLeft}
                alt="Спецтехника"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            <div style={{
              borderRadius: isMobile ? '12px' : '20px',
              overflow: 'hidden',
              height: isMobile ? '150px' : '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={imageRight}
                alt="Спецтехника"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          {/* Блок преимуществ (как на главной странице) */}
          <section style={{
            padding: isMobile ? '40px 0' : '60px 0'
          }}>
            <div className="container" style={{
              paddingLeft: isMobile ? '15px' : '0',
              paddingRight: isMobile ? '15px' : '0'
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" style={{
                gap: isMobile ? '15px' : '20px'
              }}>
                {/* Гарантии */}
                <div style={{
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '25px',
                  background: 'var(--cart-black)'
                }}>
                  <div style={{
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    width: isMobile ? '60px' : '70px',
                    height: isMobile ? '60px' : '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '15px' : '20px'
                  }}>
                    <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 style={{ 
                    marginBottom: isMobile ? '8px' : '10px', 
                    color: 'var(--white)', 
                    fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px', 
                    fontWeight: 600 
                  }}>Гарантии</h4>
                  <p style={{ 
                    color: 'var(--txt)', 
                    fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px', 
                    lineHeight: '1.5' 
                  }}>
                    Не берём деньги, если вам не понравилась наша работа.
                  </p>
                </div>

                {/* Сроки */}
                <div style={{
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '25px',
                  background: 'var(--cart-black)'
                }}>
                  <div style={{
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    width: isMobile ? '60px' : '70px',
                    height: isMobile ? '60px' : '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '15px' : '20px'
                  }}>
                    <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 style={{ 
                    marginBottom: isMobile ? '8px' : '10px', 
                    color: 'var(--white)', 
                    fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px', 
                    fontWeight: 600 
                  }}>Сроки</h4>
                  <p style={{ 
                    color: 'var(--txt)', 
                    fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px', 
                    lineHeight: '1.5' 
                  }}>
                    Не опаздываем на заказ, если опоздали, то сделаем скидку 10%.
                  </p>
                </div>

                {/* Опыт */}
                <div style={{
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '25px',
                  background: 'var(--cart-black)'
                }}>
                  <div style={{
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    width: isMobile ? '60px' : '70px',
                    height: isMobile ? '60px' : '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '15px' : '20px'
                  }}>
                    <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                      <path d="M9 4a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 style={{ 
                    marginBottom: isMobile ? '8px' : '10px', 
                    color: 'var(--white)', 
                    fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px', 
                    fontWeight: 600 
                  }}>Опыт</h4>
                  <p style={{ 
                    color: 'var(--txt)', 
                    fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px', 
                    lineHeight: '1.5' 
                  }}>
                    У нас опытные машинисты, более тысячи заказчиков остались довольны нашей работой.
                  </p>
                </div>

                {/* Цены */}
                <div style={{
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '25px',
                  background: 'var(--cart-black)'
                }}>
                  <div style={{
                    background: 'var(--primary)',
                    borderRadius: '50%',
                    width: isMobile ? '60px' : '70px',
                    height: isMobile ? '60px' : '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: isMobile ? '15px' : '20px'
                  }}>
                    <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 style={{ 
                    marginBottom: isMobile ? '8px' : '10px', 
                    color: 'var(--white)', 
                    fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px', 
                    fontWeight: 600 
                  }}>Цены</h4>
                  <p style={{ 
                    color: 'var(--txt)', 
                    fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px', 
                    lineHeight: '1.5' 
                  }}>
                    Наши условия работы, наш подход, наша гарантия дешёвыми быть не могут.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Блок с текстом слева и логотипом справа */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '30px' : '40px',
            marginTop: isMobile ? '40px' : '60px',
            marginBottom: isMobile ? '40px' : '60px',
            alignItems: 'center'
          }}>
            {/* Текст слева */}
            <div style={{ order: isMobile ? 2 : 1 }}>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Наша компания уже более 13 лет является надежным партнером для различных предприятий и организаций, предоставляя в аренду полный спектр современной спецтехники.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Мы понимаем, что каждое строительство, производство или сельскохозяйственное предприятие имеет свои уникальные потребности, поэтому предлагаем широкий выбор техники, способной решить самые разнообразные задачи.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8'
              }}>
                В нашем парке вы найдете современные экскаваторы, погрузчики, краны, грузовики, бульдозеры и другую спецтехнику ведущих мировых производителей. Все наши машины проходят регулярное техническое обслуживание и находятся в отличном рабочем состоянии, что гарантирует бесперебойную работу и безопасность на вашем объекте.
              </p>
            </div>

            {/* Логотип справа */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              order: isMobile ? 1 : 2
            }}>
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  color: 'var(--white)',
                  fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px',
                  fontWeight: 600,
                  letterSpacing: isMobile ? '1px' : '2px',
                  marginBottom: isMobile ? '15px' : '20px',
                  textTransform: 'uppercase'
                }}>
                  СТРОИТЕЛЬНАЯ ТЕХНИКА
                </div>
                <img
                  src={logoImage}
                  alt="RingooStroy Logo"
                  style={{
                    maxWidth: isMobile ? '200px' : '300px',
                    height: 'auto',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Блок с фото основателя слева и текстом справа */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '30px' : '40px',
            marginTop: isMobile ? '40px' : '60px',
            marginBottom: isMobile ? '40px' : '60px',
            alignItems: 'center'
          }}>
            {/* Фото слева */}
            <div style={{
              borderRadius: isMobile ? '16px' : '20px',
              overflow: 'hidden',
              order: isMobile ? 1 : 1
            }}>
              <img
                src={osnovatelImage}
                alt="Основатель"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Текст справа */}
            <div style={{ order: isMobile ? 2 : 2 }}>
              <h2 style={{
                color: 'var(--white)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 700,
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Основатель
              </h2>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3.5vw, 18px)' : '18px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Меня зовут Герман Мисиков, бизнесмен с опытом 20 лет.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Решил открыть новое направление. Внедрил весь накопленный опыт в этот бизнес.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Я знаю, что хочет заказчик, и поэтому я вывел несколько правил:
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  'Я даю 100% гарантию на свои работы;',
                  'Я даю рассрочку на свои работы;',
                  'Если я опоздал на заказ — мы делаем скидку 10%;',
                  'Мы работаем наличными/безналичными/перевод/бартер;',
                  'Есть услуга — под ключ. Мы сами фиксируем цену и она не меняется.'
                ].map((rule, index) => (
                  <li key={index} style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.8',
                    marginBottom: isMobile ? '10px' : '12px',
                    paddingLeft: isMobile ? '20px' : '24px',
                    position: 'relative'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: isMobile ? '6px' : '8px',
                      width: isMobile ? '6px' : '8px',
                      height: isMobile ? '6px' : '8px',
                      borderRadius: '50%',
                      background: 'var(--primary)'
                    }}></span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Мы работаем во всех крупных городах" */}
      <CityForm />
    </>
  )
}

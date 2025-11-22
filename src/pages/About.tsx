import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { generateBreadcrumbSchema } from '../utils/seo'
import CityForm from '../components/CityForm'
const imageLeft = '/images/images-technica/t3.png'
const imageRight = '/images/images-technica/t2.png'
const osnovatelImage = '/images/images-imag/osnovatel.png'

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
        title="Ваш надежный партнер в аренде спецтехники | RingooStroy Владикавказ" 
        description="RingooStroy - более 13 лет опыта в аренде спецтехники и выполнении строительно-земляных работ во Владикавказе. Комплексный подход: подбираем технику и обеспечиваем результат. Прозрачные цены, исправная техника, опытные операторы." 
        keywords="о компании RingooStroy, аренда спецтехники Владикавказ, строительно-земляные работы, аренда техники, благоустройство территорий, транспортные услуги, рингострой, ринго, ringostroy, ringoostroy, спецтехника Северная Осетия, строительные работы Владикавказ"
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
            marginBottom: isMobile ? '30px' : '40px',
            textAlign: 'center'
          }}>
            Ваш надежный партнер в аренде спецтехники и выполнении строительных работ
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

          {/* Основной контент о компании */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Раздел: Решаем задачи, а не просто сдаем технику */}
            <div style={{
              marginTop: isMobile ? '40px' : '60px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 style={{
                color: 'var(--white)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 700,
                marginBottom: isMobile ? '20px' : '30px'
              }}>
                Решаем задачи, а не просто сдаем технику
              </h2>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 18px)' : '18px',
                lineHeight: '1.8',
                opacity: 0.9
              }}>
                Наша компания — это более 13 лет опыта в оказании услуг аренды спецтехники и выполнения строительно-земляных работ во Владикавказе. Мы понимаем, что вы приходите к нам не за самой машиной, а за результатом: за выкопанным котлованом, построенным фундаментом или чистым участком. Поэтому мы предлагаем комплексный подход: подбираем нужную технику и обеспечиваем ее работой для достижения вашей цели.
              </p>
            </div>

            {/* Раздел: Что мы делаем для вас? */}
            <div style={{
              marginTop: isMobile ? '40px' : '60px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 style={{
                color: 'var(--white)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 700,
                marginBottom: isMobile ? '20px' : '30px'
              }}>
                Что мы делаем для вас?
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '20px' : '30px'
              }}>
                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Аренда спецтехники
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Предоставляем в аренду современные и исправные машины для любых задач.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Строительство и земляные работы
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Выполняем полный цикл — от копки котлована и траншей до строительства фундаментов и обратной засыпки.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Благоустройство территорий
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Помогаем привести участок в порядок: планировка, расчистка, покос травы, вывоз мусора.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Транспортные услуги
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Обеспечиваем доставку сыпучих материалов (песок, щебень, чернозем), вывоз строительного мусора и услуги манипулятора для установки тяжелых грузов.
                  </p>
                </div>
              </div>
            </div>

            {/* Раздел: Почему выбирают нас? */}
            <div style={{
              marginTop: isMobile ? '40px' : '60px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 style={{
                color: 'var(--white)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 700,
                marginBottom: isMobile ? '20px' : '30px'
              }}>
                Почему выбирают нас?
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '20px' : '30px'
              }}>
                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Прозрачность и честность
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Фиксированная стоимость аренды и работ, которая не меняется в процессе. Никаких скрытых платежей.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Исправная техника
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Весь наш парк — от мини-экскаваторов до самосвалов — проходит регулярное ТО. Мы гарантируем, что техника не подведет на вашем объекте.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Опытные операторы
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    За рулем нашей техники — профессионалы, которые знают, как выполнить работу быстро, качественно и безопасно.
                  </p>
                </div>

                <div style={{
                  background: 'var(--cart-black)',
                  border: '1px solid var(--stroke)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px' : '30px'
                }}>
                  <h3 style={{
                    color: 'var(--primary)',
                    fontSize: isMobile ? 'clamp(18px, 3.5vw, 22px)' : '22px',
                    fontWeight: 700,
                    marginBottom: isMobile ? '12px' : '15px'
                  }}>
                    Решение под вашу задачу
                  </h3>
                  <p style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.7',
                    opacity: 0.9
                  }}>
                    Не знаете, какая техника нужна? Просто опишите задачу («нужно выкопать яму под колодец», «расчистить участок от деревьев»), а мы подберем оптимальное решение и технику.
                  </p>
                </div>
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
                marginBottom: isMobile ? '20px' : '25px'
              }}>
                Почему со мной работают — честно от основателя
              </h2>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3.5vw, 18px)' : '18px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Меня зовут Герман Мисиков. Я в бизнесе 20 лет, и мой главный вывод прост: лучший клиент — это довольный клиент, который возвращается.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Когда я запускал эту компанию, я поставил одну цель: убрать все «но» и «внезапные траты» из процесса аренды техники. Мы не просто сдаем машины в аренду — мы берем на себя ваши проблемы и решаем их.
              </p>
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                Можете проверить меня на слове. Вот мои твердые условия:
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                marginBottom: isMobile ? '20px' : '25px'
              }}>
                {[
                  'Цена зафиксирована в договоре и не меняется. Никаких сюрпризов!',
                  'Даем рассрочку. Не нужно ждать, пока соберется вся сумма — начните работы сейчас.',
                  'Наше опоздание = ваша выгода. Опоздали мы — ваша скидка 10%.',
                  'Платите как вам удобно: нал, безнал, перевод.',
                  'Гарантия на все работы 100%. Спите спокойно.'
                ].map((rule, index) => (
                  <li key={index} style={{
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                    lineHeight: '1.8',
                    marginBottom: isMobile ? '12px' : '15px',
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
              <p style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
                lineHeight: '1.8',
                marginBottom: isMobile ? '15px' : '20px',
                fontStyle: 'italic',
                opacity: 0.9
              }}>
                Я верю, что бизнес должен строиться на уважении к клиенту. В этом и есть мой 20-летний опыт.
              </p>
              <p style={{
                color: 'var(--primary)',
                fontSize: isMobile ? 'clamp(16px, 3.5vw, 18px)' : '18px',
                fontWeight: 600,
                marginTop: isMobile ? '20px' : '25px'
              }}>
                Герман Мисиков
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Мы работаем во всех крупных городах" */}
      <CityForm />
    </>
  )
}

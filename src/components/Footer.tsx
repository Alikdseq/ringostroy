import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)
  const [isDeveloperHover, setIsDeveloperHover] = useState(false)

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes footerArrowBounce {
            0% { transform: translateY(0); opacity: 0; }
            30% { opacity: 1; }
            50% { transform: translateY(-6px); }
            70% { transform: translateY(0); }
            100% { transform: translateY(-4px); opacity: 0.9; }
          }
        `}
      </style>
      <footer style={{ 
      background: 'var(--cart-black)',
      marginTop: isMobile ? '30px' : 'clamp(1.875rem, 1.437rem + 2.19vw, 3.75rem)',
      paddingTop: isMobile ? '30px' : 'clamp(2.5rem, 2.208rem + 1.46vw, 3.75rem)',
      paddingBottom: isMobile ? '20px' : '30px',
      paddingLeft: isMobile ? '15px' : '0',
      paddingRight: isMobile ? '15px' : '0'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '30px' : 'clamp(2.5rem, 1.843rem + 3.28vw, 5.313rem)'
      }}>
        {/* Upper Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: isMobile ? '30px' : '60px',
          flexWrap: 'wrap',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Left Column - Logo and Navigation */}
<div style={{ maxWidth: isMobile ? '100%' : '400px', width: '100%' }}>
  {/* Logo */}
  <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
    <div className="logo__holder" style={{
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '15px' : '20px',
      paddingLeft: '0', // Убрал отступ слева для футера
      marginBottom: '5px'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <img 
          src="/images/icons/logo.svg"
          alt="RingoStroy"
          style={{
            height: isMobile ? '50px' : '65px',
            width: 'auto',
            display: 'block'
          }}
        />
      </Link>
    </div>
  </div>

            {/* Navigation Links */}
            <ul style={{ 
              listStyle: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '15px 20px' : '20px 40px',
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              {/* ВРЕМЕННО ОТКЛЮЧЕНО: Наша техника
              <li>
                <Link to="/equipment" style={{ color: 'var(--txt)' }}>Наша техника</Link>
              </li>
              */}
              <li>
                <Link to="/services" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px'
                }}>
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/promotions" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px'
                }}>
                  Акции
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px'
                }}>
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contacts" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px'
                }}>
                  Контакты
                </Link>
              </li>
            </ul>

            {/* Privacy Policy */}
            <Link to="/privacy" style={{ 
              color: 'var(--txt)', 
              textDecoration: 'underline',
              fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px'
            }}>
              Политика конфиденциальности
            </Link>
          </div>

          {/* Middle Column - Services */}
          <div>
            <h4 style={{ 
              marginBottom: isMobile ? '15px' : '20px',
              color: 'var(--white)',
              fontFamily: 'var(--second-family)',
              fontWeight: 600,
              fontSize: isMobile ? 'clamp(18px, 4vw, 20px)' : '20px'
            }}>
              Услуги
            </h4>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '10px' : '12px'
            }}>
              <li>
                <Link to="/services/backfill" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
                }}>
                  Обратная засыпка фундаментов
                </Link>
              </li>
              <li>
                <Link to="/services/landscaping" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
                }}>
                  Благоустройство дворов
                </Link>
              </li>
              <li>
                <Link to="/services/delivery" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
                }}>
                  Доставка материалов
                </Link>
              </li>
              <li>
                <Link to="/services/waste-removal" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
                }}>
                  Вывоз мусора
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ 
                  color: 'var(--txt)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
                }}>
                  Все услуги
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Company Info */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '4px' : '5px'
          }}>
            <h4 style={{ 
              marginBottom: isMobile ? '8px' : '10px',
              color: 'var(--white)',
              fontFamily: 'var(--second-family)',
              fontWeight: 600,
              fontSize: isMobile ? 'clamp(18px, 4vw, 20px)' : '20px'
            }}>
              RINGOOSTROY
            </h4>
            <p style={{ 
              color: 'var(--txt)', 
              margin: 0,
              fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px'
            }}>
              ИП МИСИКОВА ЗАРИНА ХАЗБИЕВНА
            </p>
            <p style={{ 
              color: 'var(--txt)', 
              margin: 0,
              fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px'
            }}>
              ИНН: 151107470870
            </p>
          </div>
        </div>

        {/* Lower Section - Developer Info */}
        <div style={{
          borderTop: '1px solid var(--stroke)',
          paddingTop: isMobile ? '20px' : '30px',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: isMobile ? '15px' : '20px',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <p style={{ 
            color: 'var(--txt)', 
            margin: 0,
            fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px'
          }}>
            © 2025 RingooStroy. Все права защищены.
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '4px' : '5px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <span style={{ 
              color: 'var(--txt)', 
              fontSize: isMobile ? 'clamp(12px, 2.5vw, 14px)' : '14px'
            }}>
              Сайт разработал
            </span>
            <div
              style={{
                position: 'relative',
                paddingTop: isMobile ? '35px' : '40px',
                paddingBottom: '8px',
                paddingLeft: '8px',
                paddingRight: '8px',
                marginTop: isMobile ? '-35px' : '-40px',
                marginBottom: isMobile ? '-8px' : '-8px',
                marginLeft: '-8px',
                marginRight: '-8px',
                display: 'inline-block'
              }}
              onMouseEnter={() => setIsDeveloperHover(true)}
              onMouseLeave={() => setIsDeveloperHover(false)}
            >
              {isDeveloperHover && (
                <span
                  style={{
                    position: 'absolute',
                    top: isMobile ? '0px' : '-5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: isMobile ? '28px' : '32px',
                    height: isMobile ? '28px' : '32px',
                    borderRadius: '50%',
                    border: '1px solid rgba(192, 239, 85, 0.6)',
                    background: 'rgba(192, 239, 85, 0.1)',
                    animation: 'footerArrowBounce 1s ease-in-out infinite',
                    pointerEvents: 'none',
                    boxShadow: '0 6px 14px rgba(192, 239, 85, 0.25)'
                  }}
                >
                  <svg
                    width={isMobile ? 16 : 18}
                    height={isMobile ? 16 : 18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14" />
                    <path d="M6 13l6 6 6-6" />
                  </svg>
                </span>
              )}
              <a
                href="https://wa.me/79187020987?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%90%D0%BB%D0%B8%D1%85%D0%B0%D0%BD%2C%20%D1%85%D0%BE%D1%82%D0%B5%D0%BB%20%D0%B1%D1%8B%20%D0%B2%D0%BE%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%D0%B0%D1%88%D0%B8%D0%BC%D0%B8%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B0%D0%BC%D0%B8."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--third-family)',
                  fontWeight: 900,
                  fontSize: isMobile ? 'clamp(20px, 3vw, 20px)' : '20px',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  transform: isDeveloperHover ? 'translateY(-3px)' : 'translateY(0)',
                  color: isDeveloperHover ? 'var(--primary)' : 'var(--white)',
                  display: 'inline-block'
                }}
                onFocus={() => setIsDeveloperHover(true)}
                onBlur={() => setIsDeveloperHover(false)}
              >
                Скяев Алихан
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
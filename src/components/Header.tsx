import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Закрываем меню при изменении размера экрана на десктоп
      if (!mobile) {
        setIsMenuOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Закрытие меню при клике на ссылку
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Блокировка скролла больше не нужна, так как меню раскрывается внутри хедера

  return (
    <header id="header" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {/* Основная строка хедера */}
        <div className="container" style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '10px' : '15px',
          paddingTop: isMobile ? '15px' : '20px',
          paddingBottom: isMobile ? '15px' : '15px',
          paddingLeft: isMobile ? '15px' : '0',
          paddingRight: isMobile ? '15px' : '0',
          borderBottom: isMenuOpen && isMobile ? 'none' : '1px solid var(--stroke)',
          position: 'relative'
        }}>
        {/* Logo */}
        <div className="logo__holder" style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '10px' : '20px',
          paddingLeft: isMobile ? '0' : '50px',
          flex: isMobile ? '0 0 auto' : '0 0 auto'
        }}>
          <Link 
            to="/" 
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            onClick={handleLinkClick}
          >
            <img 
              src="/images/icons/logo.svg"
              alt="RingoStroy"
              style={{
                height: isMobile ? '45px' : '65px',
                width: 'auto',
                display: 'block'
              }}
            />
          </Link>
        </div>

        {/* Rating Block - Скрыть на мобильных */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            borderRadius: '10px',
            padding: '10px 20px',
            height: '60px',
            background: 'var(--cart-black)'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--primary)">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span style={{ color: 'var(--white)', fontWeight: 600 }}>4.7</span>
            <div style={{ border: '1px solid var(--primary)', width: '1px', height: '30px' }}></div>
            <span style={{ color: 'var(--white)', fontSize: '14px', maxWidth: '140px' }}>
              Более 300 хороших отзывов
            </span>
          </div>
        )}

        {/* Navigation Menu - Десктоп */}
        {!isMobile && (
          <nav style={{ 
            display: 'flex',
            listStyle: 'none', 
            gap: 'clamp(1.25rem, 0.958rem + 1.46vw, 2.5rem)',
            alignItems: 'center'
          }}>
            <Link 
              to="/services" 
              style={{ 
                color: 'var(--white)',
                fontFamily: 'var(--second-family)',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 0.942rem + 0.29vw, 1.25rem)',
                lineHeight: '120%',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--white)'
              }}
            >
              Услуги
            </Link>
            <Link 
              to="/promotions" 
              style={{ 
                color: 'var(--white)',
                fontFamily: 'var(--second-family)',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 0.942rem + 0.29vw, 1.25rem)',
                lineHeight: '120%',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--white)'
              }}
            >
              Акции
            </Link>
            <Link 
              to="/about" 
              style={{ 
                color: 'var(--white)',
                fontFamily: 'var(--second-family)',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 0.942rem + 0.29vw, 1.25rem)',
                lineHeight: '120%',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--white)'
              }}
            >
              О компании
            </Link>
            <Link 
              to="/contacts" 
              style={{ 
                color: 'var(--white)',
                fontFamily: 'var(--second-family)',
                fontWeight: 600,
                fontSize: 'clamp(1rem, 0.942rem + 0.29vw, 1.25rem)',
                lineHeight: '120%',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--white)'
              }}
            >
              Контакты
            </Link>
          </nav>
        )}

        {/* Contact Button - Десктоп */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'flex-start',
            marginRight: '40px',
          }}>
            {/* Online Status Indicator */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: 'var(--white)',
              marginBottom: '2px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--primary)',
                textAlign: 'center'
              }}></div>
              <span>Сейчас работаем</span>
            </div>
            
            {/* Кнопка телефона */}
            <a 
              href="tel:+79888307777"
              style={{
                background: 'var(--primary)',
                borderRadius: '10px',
                padding: '10px 25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--background-black)',
                fontWeight: 600,
                fontSize: '16px',
                textDecoration: 'none',
                position: 'relative',
                height: '60px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.border = '2px solid var(--primary)'
                e.currentTarget.style.color = 'var(--primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--primary)'
                e.currentTarget.style.border = 'none'
                e.currentTarget.style.color = 'var(--background-black)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '1px',
                left: '25px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--background-black)',
                opacity: 0.8
              }}>
                Звоните
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122L9.73 12.05a.678.678 0 01-.684-.155l-2.83-2.83a.678.678 0 01-.154-.684l.936-2.993a.678.678 0 00-.122-.58L3.654 1.328z"/>
              </svg>
              +7 988 830-77-77
            </a>
          </div>
        )}


        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
              position: 'relative'
            }}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            <span style={{
              width: '26px',
              height: '3px',
              background: 'var(--primary)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translateY(11px)' : 'none',
              transformOrigin: 'center'
            }}></span>
            <span style={{
              width: '26px',
              height: '3px',
              background: 'var(--primary)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              width: '26px',
              height: '3px',
              background: 'var(--primary)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-11px)' : 'none',
              transformOrigin: 'center'
            }}></span>
          </button>
        )}
      </div>

      {/* Mobile Menu - раскрывается внутри хедера */}
      {isMobile && (
        <div
          style={{
            width: '100%',
            background: 'var(--cart-black)',
            borderTop: isMenuOpen ? '1px solid var(--stroke)' : 'none',
            borderBottom: isMenuOpen ? '1px solid var(--stroke)' : 'none',
            maxHeight: isMenuOpen ? '1000px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease, border 0.3s ease',
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column'
          }}
        >
          <div style={{
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Mobile Navigation */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%'
            }}>
              <Link 
                to="/services" 
                onClick={handleLinkClick}
                style={{
                  color: 'var(--white)',
                  fontFamily: 'var(--second-family)',
                  fontWeight: 600,
                  fontSize: '20px',
                  textDecoration: 'none',
                  padding: '18px 20px',
                  border: '1px solid var(--stroke)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: 'var(--background-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = 'rgba(192, 239, 85, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.borderColor = 'var(--stroke)'
                  e.currentTarget.style.background = 'var(--background-black)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="var(--background-black)">
                    <path d="M10.5 3.24a1 1 0 00-1 0L4.5 6.11a2 2 0 00-1 1.73v6.32a2 2 0 001 1.73l5 2.87a2 2 0 002 0l5-2.87a2 2 0 001-1.73V7.84a2 2 0 00-1-1.73l-5-2.87z"/>
                  </svg>
                </div>
                <span>Услуги</span>
              </Link>
              
              <Link 
                to="/promotions" 
                onClick={handleLinkClick}
                style={{
                  color: 'var(--white)',
                  fontFamily: 'var(--second-family)',
                  fontWeight: 600,
                  fontSize: '20px',
                  textDecoration: 'none',
                  padding: '18px 20px',
                  border: '1px solid var(--stroke)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: 'var(--background-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = 'rgba(192, 239, 85, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.borderColor = 'var(--stroke)'
                  e.currentTarget.style.background = 'var(--background-black)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="var(--background-black)">
                    <path fillRule="evenodd" d="M11.3 1.046a1 1 0 01.7 0l6 2.5a1 1 0 01.7.95v9.5a1 1 0 01-.7.95l-6 2.5a1 1 0 01-.7 0l-6-2.5a1 1 0 01-.7-.95v-9.5a1 1 0 01.7-.95l6-2.5zM14 7.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5zm-6-3a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>Акции</span>
              </Link>
              
              <Link 
                to="/about" 
                onClick={handleLinkClick}
                style={{
                  color: 'var(--white)',
                  fontFamily: 'var(--second-family)',
                  fontWeight: 600,
                  fontSize: '20px',
                  textDecoration: 'none',
                  padding: '18px 20px',
                  border: '1px solid var(--stroke)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: 'var(--background-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = 'rgba(192, 239, 85, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.borderColor = 'var(--stroke)'
                  e.currentTarget.style.background = 'var(--background-black)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="var(--background-black)">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span>О компании</span>
              </Link>
              
              <Link 
                to="/contacts" 
                onClick={handleLinkClick}
                style={{
                  color: 'var(--white)',
                  fontFamily: 'var(--second-family)',
                  fontWeight: 600,
                  fontSize: '20px',
                  textDecoration: 'none',
                  padding: '18px 20px',
                  border: '1px solid var(--stroke)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  background: 'var(--background-black)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = 'rgba(192, 239, 85, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.borderColor = 'var(--stroke)'
                  e.currentTarget.style.background = 'var(--background-black)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="var(--background-black)">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <span>Контакты</span>
              </Link>
            </nav>

            {/* Rating Block в мобильном меню */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '20px',
              background: 'var(--background-black)',
              borderRadius: '12px',
              border: '1px solid var(--stroke)'
            }}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="var(--primary)">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span style={{ color: 'var(--white)', fontWeight: 700, fontSize: '20px' }}>4.7</span>
              <div style={{ border: '1px solid var(--primary)', width: '1px', height: '24px' }}></div>
              <span style={{ color: 'var(--white)', fontSize: '14px', textAlign: 'center' }}>
                Более 300 отзывов
              </span>
            </div>

            {/* Кнопка телефона в мобильном меню */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Online Status Indicator */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px',
                color: 'var(--white)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span>Сейчас работаем</span>
              </div>

              {/* Кнопка телефона */}
              <a 
                href="tel:+79888307777"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  background: 'var(--primary)',
                  borderRadius: '12px',
                  padding: '18px 24px',
                  color: 'var(--background-black)',
                  fontWeight: 700,
                  fontSize: '18px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(192, 239, 85, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(192, 239, 85, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(192, 239, 85, 0.3)'
                }}
              >
                <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122L9.73 12.05a.678.678 0 01-.684-.155l-2.83-2.83a.678.678 0 01-.154-.684l.936-2.993a.678.678 0 00-.122-.58L3.654 1.328z"/>
                </svg>
                +7 988 830-77-77
              </a>
            </div>
          </div>
        </div>
      )}

      </div>
      {/* CSS для анимации pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </header>
  )
}

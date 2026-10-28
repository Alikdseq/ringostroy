import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useBreakpoint from '../hooks/useBreakpoint'

const NAV_LINKS = [
  { to: '/equipment', label: 'Наша техника' },
  { to: '/services', label: 'Услуги' },
  { to: '/promotions', label: 'Акции' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' }
] as const

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile, isCompact, isWide } = useBreakpoint()

  useEffect(() => {
    if (!isCompact) setIsMenuOpen(false)
  }, [isCompact])

  const handleLinkClick = () => setIsMenuOpen(false)

  const navLinkStyle: React.CSSProperties = {
    color: 'var(--white)',
    fontFamily: 'var(--second-family)',
    fontWeight: 600,
    fontSize: isWide ? '1.125rem' : '0.95rem',
    lineHeight: '120%',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    whiteSpace: 'nowrap'
  }

  return (
    <header
      id="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '100vw'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isCompact ? '12px' : '16px',
            paddingTop: isMobile ? '12px' : '16px',
            paddingBottom: isMobile ? '12px' : '16px',
            borderBottom: isMenuOpen && isCompact ? 'none' : '1px solid var(--stroke)',
            minWidth: 0
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 auto',
              minWidth: 0
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
              onClick={handleLinkClick}
            >
              <img
                src="/images/icons/logo.svg"
                alt="RingoStroy"
                style={{
                  height: isMobile ? '40px' : isCompact ? '48px' : '58px',
                  width: 'auto',
                  display: 'block',
                  maxWidth: isCompact ? '140px' : '180px'
                }}
              />
            </Link>
          </div>

          {/* Rating — только на широких экранах */}
          {!isCompact && isWide && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '10px',
                padding: '8px 16px',
                height: '52px',
                background: 'var(--cart-black)',
                flexShrink: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="var(--primary)">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span style={{ color: 'var(--white)', fontWeight: 600 }}>4.7</span>
              <div style={{ border: '1px solid var(--primary)', width: '1px', height: '26px' }} />
              <span style={{ color: 'var(--white)', fontSize: '13px', maxWidth: '130px', lineHeight: 1.3 }}>
                Более 300 хороших отзывов
              </span>
            </div>
          )}

          {/* Desktop nav */}
          {!isCompact && (
            <nav
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: isWide ? '28px' : '18px',
                alignItems: 'center',
                flex: '1 1 auto',
                justifyContent: 'center',
                minWidth: 0,
                flexWrap: 'nowrap'
              }}
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={navLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--white)'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Phone — desktop */}
          {!isCompact && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'flex-start',
                flexShrink: 0
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'var(--white)'
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)'
                  }}
                />
                <span>Сейчас работаем</span>
              </div>
              <a
                href="tel:+79888307777"
                style={{
                  background: 'var(--primary)',
                  borderRadius: '10px',
                  padding: isWide ? '10px 20px' : '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--background-black)',
                  fontWeight: 600,
                  fontSize: isWide ? '15px' : '13px',
                  textDecoration: 'none',
                  height: isWide ? '52px' : '44px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122L9.73 12.05a.678.678 0 01-.684-.155l-2.83-2.83a.678.678 0 01-.154-.684l.936-2.993a.678.678 0 00-.122-.58L3.654 1.328z" />
                </svg>
                +7 988 830-77-77
              </a>
            </div>
          )}

          {/* Compact: phone + burger */}
          {isCompact && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <a
                href="tel:+79888307777"
                aria-label="Позвонить"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--primary)',
                  color: 'var(--background-black)',
                  textDecoration: 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122L9.73 12.05a.678.678 0 01-.684-.155l-2.83-2.83a.678.678 0 01-.154-.684l.936-2.993a.678.678 0 00-.122-.58L3.654 1.328z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  zIndex: 1001
                }}
                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMenuOpen}
              >
                <span
                  style={{
                    width: '26px',
                    height: '3px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
                  }}
                />
                <span
                  style={{
                    width: '26px',
                    height: '3px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                    opacity: isMenuOpen ? 0 : 1
                  }}
                />
                <span
                  style={{
                    width: '26px',
                    height: '3px',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
                  }}
                />
              </button>
            </div>
          )}
        </div>

        {/* Compact / mobile menu */}
        {isCompact && (
          <div
            style={{
              width: '100%',
              background: 'var(--cart-black)',
              borderTop: isMenuOpen ? '1px solid var(--stroke)' : 'none',
              borderBottom: isMenuOpen ? '1px solid var(--stroke)' : 'none',
              maxHeight: isMenuOpen ? '90vh' : '0',
              overflow: isMenuOpen ? 'auto' : 'hidden',
              transition: 'max-height 0.35s ease',
              display: isMenuOpen ? 'flex' : 'none',
              flexDirection: 'column'
            }}
          >
            <div
              className="container"
              style={{
                paddingTop: '20px',
                paddingBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleLinkClick}
                    style={{
                      color: 'var(--white)',
                      fontFamily: 'var(--second-family)',
                      fontWeight: 600,
                      fontSize: isMobile ? '18px' : '17px',
                      textDecoration: 'none',
                      padding: '14px 16px',
                      border: '1px solid var(--stroke)',
                      borderRadius: '12px',
                      background: 'var(--background-black)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary)'
                      e.currentTarget.style.borderColor = 'var(--primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--white)'
                      e.currentTarget.style.borderColor = 'var(--stroke)'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px',
                  background: 'var(--background-black)',
                  borderRadius: '12px',
                  border: '1px solid var(--stroke)'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--primary)">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span style={{ color: 'var(--white)', fontWeight: 700, fontSize: '18px' }}>4.7</span>
                <div style={{ border: '1px solid var(--primary)', width: '1px', height: '22px' }} />
                <span style={{ color: 'var(--white)', fontSize: '13px' }}>Более 300 отзывов</span>
              </div>

              <a
                href="tel:+79888307777"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'var(--primary)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  color: 'var(--background-black)',
                  fontWeight: 700,
                  fontSize: '17px',
                  textDecoration: 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122L9.73 12.05a.678.678 0 01-.684-.155l-2.83-2.83a.678.678 0 01-.154-.684l.936-2.993a.678.678 0 00-.122-.58L3.654 1.328z" />
                </svg>
                +7 988 830-77-77
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

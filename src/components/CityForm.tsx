import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const cities = [
  'Алагир', 'Ардон', 'Беслан', 'Владикавказ', 'Дигора', 'Заводской', 'Моздок'
]

export default function CityForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Формируем сообщение для WhatsApp
    const whatsappNumber = '79888307777' // +7 988 830-77-77
    const message = `Новая заявка с сайта%0A%0A👤 Имя: ${encodeURIComponent(name)}%0A📞 Телефон: ${encodeURIComponent(phone)}`
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    
    // Открываем WhatsApp в новой вкладке
    window.open(whatsappUrl, '_blank')
    
    // Очищаем форму
    setName('')
    setPhone('')
  }

  return (
    <section style={{ 
      background: 'var(--background-black)',
      padding: isMobile ? '30px 0' : '40px 0'
    }}>
      <div className="container" style={{ 
        maxWidth: '1000px',
        paddingLeft: isMobile ? '15px' : '0',
        paddingRight: isMobile ? '15px' : '0'
      }}>
        <h2 style={{ 
          color: 'var(--white)', 
          fontSize: isMobile ? 'clamp(20px, 5vw, 36px)' : 'clamp(24px, 3vw, 36px)', 
          fontWeight: 700, 
          textAlign: 'center',
          marginBottom: isMobile ? '20px' : '30px'
        }}>
          Мы работаем во всех крупных городах
        </h2>
        
        <div style={{ 
          background: 'var(--cart-black)',
          borderRadius: isMobile ? '12px' : '16px',
          padding: isMobile ? '20px' : '30px',
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isMobile ? '20px' : '30px',
          alignItems: 'start'
        }}>
          {/* Города */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '8px' : '8px'
          }}>
            {cities.map(city => (
              <button
                key={city}
                type="button"
                style={{
                  padding: isMobile ? '10px 12px' : '8px 12px',
                  borderRadius: isMobile ? '8px' : '6px',
                  border: '1px solid var(--stroke)',
                  background: 'var(--cart-black)',
                  color: 'var(--white)',
                  fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)'
                  e.currentTarget.style.background = 'transparent'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--stroke)'
                  e.currentTarget.style.background = 'var(--cart-black)'
                }}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Форма */}
          <div>
            <p style={{ 
              color: 'var(--white)', 
              fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px',
              marginBottom: isMobile ? '15px' : '20px',
              lineHeight: '1.5'
            }}>
              Нет вашего населенного пункта в списке?<br />
              Позвоните нашему менеджеру и укажите свой<br />
              населённый пункт, и мы ответим на вашу заявку
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ 
                display: 'flex',
                gap: isMobile ? '10px' : '10px',
                marginBottom: isMobile ? '10px' : '12px',
                flexWrap: 'wrap',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={{
                    flex: isMobile ? '1 1 auto' : '1 1 150px',
                    padding: isMobile ? '12px 14px' : '12px 14px',
                    borderRadius: isMobile ? '8px' : '8px',
                    border: '1px solid var(--stroke)',
                    background: 'var(--background-black)',
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '14px',
                    minHeight: isMobile ? '44px' : '44px',
                    width: isMobile ? '100%' : 'auto'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон*"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  style={{
                    flex: isMobile ? '1 1 auto' : '1 1 150px',
                    padding: isMobile ? '12px 14px' : '12px 14px',
                    borderRadius: isMobile ? '8px' : '8px',
                    border: '1px solid var(--stroke)',
                    background: 'var(--background-black)',
                    color: 'var(--white)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '14px',
                    minHeight: isMobile ? '44px' : '44px',
                    width: isMobile ? '100%' : 'auto'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: isMobile ? '12px 20px' : '12px 20px',
                    borderRadius: isMobile ? '8px' : '8px',
                    background: 'var(--primary)',
                    color: 'var(--background-black)',
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '14px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: isMobile ? 'normal' : 'nowrap',
                    minHeight: isMobile ? '44px' : '44px',
                    width: isMobile ? '100%' : 'auto'
                  }}
                >
                  Отправить
                </button>
              </div>

              <p style={{
                color: 'var(--txt)',
                fontSize: isMobile ? 'clamp(11px, 2.5vw, 12px)' : '12px',
                lineHeight: '1.4'
              }}>
                *Нажимая на кнопку «Отправить», Вы соглашаетесь на{' '}
                <Link to="/privacy" style={{ 
                  color: 'var(--primary)', 
                  textDecoration: 'underline' 
                }}>
                  обработку персональных данных
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
import { useState, useEffect } from 'react'
import { servicesApi } from '../services/api'
import type { Service } from '../types'

export default function ContactQuickForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [description, setDescription] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [_loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
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

  useEffect(() => {
    // Загружаем услуги при монтировании
    setLoading(true)
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setPending(true)

    // Формируем сообщение для WhatsApp
    const whatsappNumber = '79888307777' // +7 988 830-77-77
    const serviceName = selectedService || 'Не указано'
    const message = `Новая заявка с сайта%0A%0A👤 Имя: ${encodeURIComponent(name)}%0A📞 Телефон: ${encodeURIComponent(phone)}%0A🛠️ Услуга: ${encodeURIComponent(serviceName)}%0A📝 Описание: ${encodeURIComponent(description || 'Не указано')}`
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    
    // Открываем WhatsApp в новой вкладке
    window.open(whatsappUrl, '_blank')
    
    // Показываем успешное сообщение
    setTimeout(() => {
      setPending(false)
      setSuccess(true)
      setName('')
      setPhone('')
      setSelectedService('')
      setDescription('')
    }, 500)
  }

  return (
    <form 
      id="contact-form" 
      onSubmit={handleSubmit} 
      style={{ 
        maxWidth: isMobile ? '100%' : '500px', 
        margin: isMobile ? '20px auto 0' : '36px auto 0', 
        padding: isMobile ? '20px' : '28px', 
        background: 'var(--cart-black)', 
        borderRadius: isMobile ? '16px' : '22px', 
        boxShadow: '0 2px 24px #212e2240', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: isMobile ? '16px' : '20px' 
      }}
    >
      <div style={{ 
        color: 'var(--primary)', 
        fontWeight: 700, 
        fontFamily: 'var(--second-family)', 
        fontSize: isMobile ? 'clamp(16px, 4vw, 20px)' : '20px', 
        textAlign: 'center', 
        marginBottom: isMobile ? '4px' : '8px' 
      }}>
        Оставьте заявку — ответим быстро!
      </div>
      
      <input 
        type="text" 
        placeholder="Ваше имя *" 
        required 
        value={name} 
        onChange={e => setName(e.target.value)} 
        style={{ 
          padding: isMobile ? '12px 16px' : '13px 18px', 
          borderRadius: isMobile ? '8px' : '8px', 
          border: '1px solid var(--stroke)', 
          background: 'var(--background-black)', 
          fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px', 
          color: 'var(--white)' 
        }} 
      />
      
      <input 
        type="tel" 
        placeholder="Телефон *" 
        required 
        value={phone} 
        onChange={e => setPhone(e.target.value)} 
        style={{ 
          padding: isMobile ? '12px 16px' : '13px 18px', 
          borderRadius: isMobile ? '8px' : '8px', 
          border: '1px solid var(--stroke)', 
          background: 'var(--background-black)', 
          fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px', 
          color: 'var(--white)' 
        }} 
      />
      
      <select 
        value={selectedService} 
        onChange={e => setSelectedService(e.target.value)}
        required
        style={{ 
          padding: isMobile ? '12px 16px' : '13px 18px', 
          borderRadius: isMobile ? '8px' : '8px', 
          border: '1px solid var(--stroke)', 
          background: 'var(--background-black)', 
          fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px', 
          color: 'var(--white)' 
        }}
      >
        <option value="">Выберите услугу *</option>
        {services.map(service => (
          <option key={service.id} value={service.name}>{service.name}</option>
        ))}
      </select>
      
      <textarea 
        placeholder="Описание заявки (необязательно)" 
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
        style={{ 
          padding: isMobile ? '12px 16px' : '13px 18px', 
          borderRadius: isMobile ? '8px' : '8px', 
          border: '1px solid var(--stroke)', 
          background: 'var(--background-black)', 
          fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : '16px', 
          color: 'var(--white)', 
          resize: 'vertical', 
          fontFamily: 'inherit' 
        }}
      />
      
      <button 
        type="submit" 
        disabled={pending} 
        style={{ 
          background: 'var(--primary)', 
          color: 'var(--background-black)', 
          borderRadius: isMobile ? '10px' : '10px', 
          padding: isMobile ? '12px 10px' : '12px 10px', 
          fontWeight: 700, 
          fontSize: isMobile ? 'clamp(15px, 3.5vw, 17px)' : '17px', 
          border: 'none', 
          cursor: pending ? 'not-allowed' : 'pointer', 
          opacity: pending ? 0.7 : 1 
        }}
      >
        {pending ? 'Отправка...' : 'Отправить'}
      </button>
      
      {success && (
        <div style={{ 
          color: '#42ce7c', 
          textAlign: 'center', 
          fontWeight: 600, 
          marginTop: isMobile ? '8px' : '12px',
          fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
        }}>
          Заявка отправлена! Проверьте WhatsApp.
        </div>
      )}
      {error && (
        <div style={{ 
          color: '#e74c3c', 
          textAlign: 'center', 
          fontWeight: 500, 
          marginTop: isMobile ? '8px' : '12px',
          fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px'
        }}>
          {error}
        </div>
      )}
    </form>
  )
}

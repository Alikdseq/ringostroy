import { useState, useEffect } from 'react';

const promos = [
  {
    id: 1,
    title: 'Скидка 10% при заявке с сайта',
    description: 'Оставьте заявку с сайта и получите скидку 10% на аренду спецтехники!',
    cta: 'Получить скидку',
    action: () => {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    highlight: true
  },
  {
    id: 2,
    title: 'Ночная аренда выгоднее',
    description: 'Скидка на технику с 22:00 до 07:00 — подробности у менеджера!',
    cta: 'Подробнее',
    action: () => {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    highlight: false
  }
];

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!visible) return null;
  return (
    <section style={{ 
      background: 'var(--primary)', 
      borderRadius: isMobile ? '16px' : '24px', 
      margin: isMobile ? '20px auto' : '40px auto', 
      maxWidth: isMobile ? '100%' : '950px', 
      boxShadow: '0 4px 28px #c0ef5530', 
      padding: isMobile ? '20px 16px 16px 16px' : '34px 28px 24px 28px', 
      position: 'relative',
      marginLeft: isMobile ? '15px' : 'auto',
      marginRight: isMobile ? '15px' : 'auto'
    }}>
      <button 
        onClick={() => setVisible(false)} 
        style={{ 
          position: 'absolute', 
          right: isMobile ? 8 : 12, 
          top: isMobile ? 8 : 10, 
          border: 'none', 
          background: 'none', 
          color: '#626262', 
          fontSize: isMobile ? '20px' : '24px', 
          fontWeight: 700, 
          cursor: 'pointer', 
          lineHeight: 1 
        }}
      >
        ×
      </button>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: isMobile ? '20px' : '32px', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        {promos.map((promo, idx) => (
          <div 
            key={promo.id} 
            style={{ 
              flex: 1, 
              minWidth: isMobile ? 'auto' : 260, 
              borderLeft: idx === 1 && !isMobile ? '1px solid #e4efc2' : 'none', 
              paddingLeft: idx === 1 && !isMobile ? 24 : 0,
              width: isMobile ? '100%' : 'auto'
            }}
          >
            <div style={{ 
              fontSize: isMobile ? 'clamp(16px, 4vw, 18px)' : '18px', 
              fontWeight: 700, 
              color: promo.highlight ? '#181e1c' : '#426b12', 
              marginBottom: isMobile ? '6px' : 4 
            }}>
              {promo.title}
            </div>
            <div style={{ 
              fontSize: isMobile ? 'clamp(13px, 3vw, 15px)' : '15px', 
              color: '#293a19', 
              marginBottom: isMobile ? '12px' : 14, 
              opacity: 0.84 
            }}>
              {promo.description}
            </div>
            <button 
              onClick={promo.action} 
              style={{ 
                background: promo.highlight ? '#2d590b' : '#fff', 
                color: promo.highlight ? '#fff' : '#2d590b', 
                borderRadius: isMobile ? '10px' : '12px', 
                padding: isMobile ? '10px 20px' : '11px 28px', 
                fontWeight: 700, 
                border: 'none', 
                fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : '16px', 
                cursor: 'pointer', 
                transition: 'background .2s',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              {promo.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

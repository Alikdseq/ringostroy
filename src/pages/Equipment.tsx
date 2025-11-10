import { useEffect, useState } from 'react'
import { equipmentApi, categoryApi } from '../services/api'
import type { Equipment, Category } from '../types'
import SEO from '../components/SEO'

export default function Equipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCat, setActiveCat] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [_catLoading, setCatLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setCatLoading(true)
    categoryApi.getAll()
      .then(res => {
        setCategories(res.data.results)
        setCatLoading(false)
      })
      .catch(() => setCatLoading(false))
  }, [])
  
  useEffect(() => {
    setLoading(true)
    setError('')
    const query = activeCat === 'all' ? equipmentApi.getAll() : equipmentApi.byCategory(activeCat)
    query
      .then(res => setEquipment(res.data.results))
      .catch(() => setError('Ошибка загрузки техники'))
      .finally(() => setLoading(false))
  }, [activeCat])

  return (
    <>
      <SEO title="Каталог спецтехники | Владикавказ" description="Вся дорожная, строительная, коммунальная спецтехника в наличии. Реальные фото, цены, быстрая подача." />
      <section style={{ background: 'var(--background-black)', padding: '60px 0' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '60px', color: 'var(--white)', fontFamily: 'var(--second-family)', fontWeight: 600, fontSize: '48px' }}>Каталог спецтехники</h1>
          
          {/* Tabs категорий */}
          <div className="flex flex-wrap items-center gap-4 mb-10 justify-center">
            <button 
              className={`px-6 py-2 rounded-lg font-semibold transition ${activeCat === 'all' ? 'bg-lime-400 text-gray-900' : 'bg-gray-800 text-white'}`} 
              onClick={() => setActiveCat('all')}
            >
              Все
            </button>
            {categories.map(cat => (
              <button 
                key={cat.slug} 
                className={`px-6 py-2 rounded-lg font-semibold transition ${activeCat === cat.slug ? 'bg-lime-400 text-gray-900' : 'bg-gray-800 text-white'}`} 
                onClick={() => setActiveCat(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--txt)', marginTop: '40px' }}>Загрузка...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: '#e74c3c', marginTop: '40px' }}>{error}</div>
          ) : equipment.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--txt)', marginTop: '40px' }}>Техника скоро появится</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px', 
              justifyContent: 'center',
              alignItems: 'stretch'
            }}>
              {equipment.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    border: '1px solid var(--stroke)',
                    borderRadius: '20px',
                    background: 'var(--cart-black)',
                    overflow: 'hidden',
                    transition: 'var(--transition)',
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    width: '100%',
                    minHeight: '600px',
                    height: 'auto'
                  }}
                >
                  {/* Изображение техники БЕЗ отдельного блока */}
                  {item.primary_image && (
                    <img 
                      src={item.primary_image} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '270px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        display: 'block',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  )}
                  
                  <div style={{ 
                    padding: '25px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1,
                    gap: '14px',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ 
                        color: 'var(--white)', 
                        marginBottom: '16px', 
                        fontFamily: 'var(--second-family)', 
                        fontWeight: 600,
                        fontSize: '22px',
                        lineHeight: '1.2',
                        minHeight: '60px'
                      }}>
                        {item.name}
                      </h3>
                      <div style={{ 
                        color: 'var(--txt)', 
                        fontSize: '15px',
                        marginBottom: '20px',
                        lineHeight: '1.5',
                        minHeight: '60px'
                      }}>
                        {item.description ? (item.description.length > 120 ? `${item.description.substring(0, 120)}...` : item.description) : ''}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ 
                        color: 'var(--primary)', 
                        fontWeight: 700, 
                        fontSize: '24px',
                        marginBottom: '24px',
                        textAlign: 'center'
                      }}>
                        от {item.price_per_hour.toLocaleString('ru-RU')} ₽/час
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> 
      </section> 
    </>
  )
}
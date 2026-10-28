import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { equipmentApi, categoryApi } from '../services/api'
import type { Equipment, Category } from '../types'
import SEO from '../components/SEO'
import InstrumentCard from '../components/InstrumentCard'
import { instruments } from '../data/instruments'
import { extractFirstParagraph, truncateText } from '../utils/text'
import useIsMobile from '../hooks/useIsMobile'

export default function Equipment() {
  const [searchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') === 'instrumenty' ? 'instrumenty' : 'all'
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCat, setActiveCat] = useState<string>(initialCat)
  const [loading, setLoading] = useState(true)
  const [_catLoading, setCatLoading] = useState(true)
  const [error, setError] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat === 'instrumenty') setActiveCat('instrumenty')
  }, [searchParams])

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
    if (activeCat === 'instrumenty') {
      setEquipment([])
      setLoading(false)
      setError('')
      return
    }
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
      <SEO 
        title="Каталог спецтехники во Владикавказе | RingooStroy - Аренда экскаваторов, погрузчиков, самосвалов" 
        description="Каталог спецтехники для аренды во Владикавказе. Экскаваторы, погрузчики, самосвалы, манипуляторы, эвакуаторы. Более 12 единиц техники в наличии. Реальные фото, актуальные цены, быстрая подача. Работаем по всей Северной Осетии." 
        keywords="каталог спецтехники, аренда техники Владикавказ, экскаваторы погрузчики самосвалы, аренда спецтехники каталог, техника в наличии, ринго, рингострой, RingooStroy, ringostroy, ringoostroy, ринго строй"
      />
      <section style={{
        background: 'var(--background-black)',
        padding: isMobile ? '30px 0 40px' : '60px 0'
      }}>
        <div
          className="container"
        >
          <h1 style={{
            textAlign: 'center',
            marginBottom: isMobile ? '28px' : '48px',
            color: 'var(--white)',
            fontFamily: 'var(--second-family)',
            fontWeight: 700,
            fontSize: isMobile ? 'clamp(26px, 7vw, 34px)' : 'clamp(36px, 4vw, 48px)',
            lineHeight: 1.2
          }}>
            Каталог спецтехники
          </h1>
          
          {/* Tabs категорий */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '8px' : '12px',
            marginBottom: isMobile ? '24px' : '40px'
          }}>
            <button 
              type="button"
              onClick={() => setActiveCat('all')}
              style={{
                padding: isMobile ? '10px 16px' : '10px 22px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: 600,
                fontSize: isMobile ? '13px' : '15px',
                cursor: 'pointer',
                background: activeCat === 'all' ? 'var(--primary)' : 'var(--cart-black)',
                color: activeCat === 'all' ? 'var(--background-black)' : 'var(--white)',
                transition: 'all 0.25s ease'
              }}
            >
              Все
            </button>
            {categories.map(cat => (
              <button 
                key={cat.slug}
                type="button"
                onClick={() => setActiveCat(cat.slug)}
                style={{
                  padding: isMobile ? '10px 16px' : '10px 22px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: isMobile ? '13px' : '15px',
                  cursor: 'pointer',
                  background: activeCat === cat.slug ? 'var(--primary)' : 'var(--cart-black)',
                  color: activeCat === cat.slug ? 'var(--background-black)' : 'var(--white)',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeCat === 'instrumenty' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile
                ? 'repeat(2, minmax(0, 1fr))'
                : 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: isMobile ? '12px' : '20px'
            }}>
              {instruments.map((item) => (
                <InstrumentCard key={item.id} instrument={item} />
              ))}
            </div>
          ) : loading ? (
            <div style={{ textAlign: 'center', color: 'var(--txt)', marginTop: '40px' }}>Загрузка...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: '#e74c3c', marginTop: '40px' }}>{error}</div>
          ) : equipment.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--txt)', marginTop: '40px' }}>Техника скоро появится</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile
                ? '1fr'
                : 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: isMobile ? '18px' : '28px',
              alignItems: 'stretch'
            }}>
              {equipment.map((item) => {
                const previewText = truncateText(extractFirstParagraph(item.description), 140)
                const largerCardImage = [
                  'vibrokatok-liugong-6032e',
                  'mini-traktor',
                  'lomovoz-faw-3250',
                  'mini-gruzovik-sollers-argo',
                  'kmu-horyong-8-tonn',
                  'shacman-x3000'
                ].includes(item.slug)
                return (
                  <Link
                    key={item.id}
                    to={`/equipment/${item.slug}`}
                    style={{
                      border: '1px solid var(--stroke)',
                      borderRadius: isMobile ? '16px' : '20px',
                      background: 'var(--cart-black)',
                      overflow: 'hidden',
                      transition: 'var(--transition)',
                      display: 'flex', 
                      flexDirection: 'column',
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%',
                      minHeight: isMobile ? 'auto' : '520px',
                      height: 'auto'
                    }}
                  >
                    {item.primary_image && (
                      <div style={{
                        width: '100%',
                        height: largerCardImage
                          ? (isMobile ? '280px' : '340px')
                          : (isMobile ? '200px' : '240px'),
                        overflow: 'hidden',
                        background: 'var(--background-black)',
                        flexShrink: 0
                      }}>
                        <img 
                          src={item.primary_image} 
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            padding: largerCardImage ? '6px' : (isMobile ? '10px' : '16px'),
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </div>
                    )}
                    
                    <div style={{ 
                      padding: isMobile ? '18px' : '24px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      flex: 1,
                      gap: isMobile ? '10px' : '14px',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <h3 style={{ 
                          color: 'var(--white)', 
                          marginBottom: isMobile ? '10px' : '14px', 
                          fontFamily: 'var(--second-family)', 
                          fontWeight: 600,
                          fontSize: isMobile ? 'clamp(16px, 4.5vw, 20px)' : '22px',
                          lineHeight: 1.3,
                          wordBreak: 'break-word'
                        }}>
                          {item.name}
                        </h3>
                        <div style={{ 
                          color: 'var(--txt)', 
                          fontSize: isMobile ? '14px' : '15px',
                          lineHeight: 1.5
                        }}>
                          {previewText}
                        </div>
                      </div>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <div style={{ 
                          color: 'var(--primary)', 
                          fontWeight: 700, 
                          fontSize: isMobile ? '20px' : '24px',
                          textAlign: 'center'
                        }}>
                          от {item.price_per_hour.toLocaleString('ru-RU')} ₽/час
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div> 
      </section> 
    </>
  )
}

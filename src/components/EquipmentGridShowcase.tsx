import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { equipmentApi } from '../services/api'
import type { Equipment } from '../types'

const fallbackImage = '/images/images-technica/mask-group-2024-10-08t151047.880.png'

export default function EquipmentGridShowcase() {
  const [items, setItems] = useState<Equipment[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    equipmentApi.getAll()
      .then(res => setItems(res.data.results))
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (items.length === 0) {
    return null
  }

  return (
    <section id="equipment" style={{ padding: isMobile ? '20px 0 20px' : '30px 0 30px', scrollMarginTop: '100px' }}>
      <div className="container" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: isMobile ? '24px' : '32px'
        }}>
          <h2 style={{
            color: 'var(--white)',
            fontSize: isMobile ? 'clamp(26px, 8vw, 34px)' : '46px',
            margin: 0
          }}>
            Наша техника
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(6, minmax(0, 1fr))',
          gap: isMobile ? '18px' : '30px',
          justifyItems: 'center'
        }}>
          {items.slice(0, 12).map((item) => {
            const isHovered = hovered === item.id
            return (
              <Link
                key={item.id}
                to={`/equipment/${item.slug}`}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--white)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  height: isMobile ? '100px' : '140px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={item.primary_image || fallbackImage}
                    alt={item.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.35s ease, filter 0.35s ease',
                      transform: isHovered ? 'translateY(-8px) scale(1.08)' : 'translateY(0) scale(1)',
                      filter: isHovered
                        ? 'drop-shadow(0 25px 30px rgba(0,0,0,0.45))'
                        : 'drop-shadow(0 15px 20px rgba(0,0,0,0.3))'
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImage }}
                  />
                </div>
                <span style={{
                  textAlign: 'center',
                  fontSize: isMobile ? '12px' : '15px',
                  lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}


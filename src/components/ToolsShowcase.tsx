import { Link } from 'react-router-dom'
import useIsMobile from '../hooks/useIsMobile'

const instrumentImages = [
  ...Array.from({ length: 18 }, (_, index) =>
    `/images/newteknica/инструмент-${index + 1}.jpeg`
  ),
  ...Array.from({ length: 7 }, (_, index) =>
    `/images/images-technica/инст${index + 1}.jpeg`
  )
]

export default function ToolsShowcase() {
  const isMobile = useIsMobile()

  return (
    <section style={{ padding: isMobile ? '30px 0 40px' : '40px 0 50px' }}>
      <div className="container" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: isMobile ? '24px' : '32px'
        }}>
          <h2 style={{
            color: 'var(--white)',
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 700,
            margin: 0
          }}>
            Наши инструменты
          </h2>
          <Link
            to="/equipment"
            className="btn btn--outline"
            style={{
              width: 'auto',
              height: isMobile ? '44px' : '50px',
              padding: isMobile ? '10px 18px' : '12px 24px',
              fontSize: isMobile ? '13px' : '15px',
              whiteSpace: 'nowrap'
            }}
          >
            Смотреть все
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, minmax(0, 1fr))'
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: isMobile ? '12px' : '18px'
        }}>
          {instrumentImages.map((src, index) => (
            <Link
              key={src}
              to="/equipment"
              style={{
                border: '1px solid var(--stroke)',
                borderRadius: isMobile ? '14px' : '18px',
                overflow: 'hidden',
                background: 'var(--cart-black)',
                aspectRatio: '1 / 1',
                display: 'block',
                textDecoration: 'none'
              }}
            >
              <img
                src={src}
                alt={`Инструмент ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { instruments } from '../data/instruments'
import InstrumentCard from './InstrumentCard'
import useBreakpoint from '../hooks/useBreakpoint'

const PREVIEW_COUNT = 6

export default function ToolsShowcase() {
  const { isMobile, isCompact } = useBreakpoint()
  const preview = instruments.slice(0, PREVIEW_COUNT)
  const instrumentsLink = '/equipment?cat=instrumenty'

  return (
    <section style={{ padding: isMobile ? '30px 0 40px' : '40px 0 50px' }}>
      <div className="container">
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
            to={instrumentsLink}
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
            : isCompact
              ? 'repeat(3, minmax(0, 1fr))'
              : 'repeat(3, minmax(0, 1fr))',
          gap: isMobile ? '12px' : '18px'
        }}>
          {preview.map((item) => (
            <InstrumentCard key={item.id} instrument={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

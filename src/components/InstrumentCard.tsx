import type { Instrument } from '../data/instruments'
import useIsMobile from '../hooks/useIsMobile'

type Props = {
  instrument: Instrument
}

export default function InstrumentCard({ instrument }: Props) {
  const isMobile = useIsMobile()

  return (
    <article
      style={{
        border: '1px solid var(--stroke)',
        borderRadius: isMobile ? '14px' : '18px',
        overflow: 'hidden',
        background: 'var(--cart-black)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}
    >
      <div
        style={{
          aspectRatio: '1 / 1',
          width: '100%',
          background: 'var(--background-black)',
          overflow: 'hidden'
        }}
      >
        <img
          src={instrument.image}
          alt={instrument.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
      <div
        style={{
          padding: isMobile ? '10px 12px 12px' : '14px 16px 16px',
          textAlign: 'center'
        }}
      >
        <h3
          style={{
            margin: 0,
            color: 'var(--white)',
            fontSize: isMobile ? '13px' : '16px',
            fontWeight: 600,
            lineHeight: 1.3
          }}
        >
          {instrument.title}
        </h3>
      </div>
    </article>
  )
}

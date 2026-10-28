import useBreakpoint from '../hooks/useBreakpoint'

const operators = [
  { name: 'Басиев Виктор', photo: '/images/newteknica/Басиев Виктор.jpeg' },
  { name: 'Гутонов Эдуард', photo: '/images/newteknica/Гутонов Эдуард.jpeg' },
  { name: 'Купеев Аслан', photo: '/images/newteknica/Купеев Аслан.jpeg' },
  { name: 'Купеев Тамерлан', photo: '/images/newteknica/Купеев Тамерлан.jpeg' },
  { name: 'Мисиков Олег', photo: '/images/newteknica/Мисиков Олег.jpeg' }
]

export default function AboutOperators({ isMobile: isMobileProp }: { isMobile?: boolean }) {
  const { isMobile: isMobileHook, isCompact } = useBreakpoint()
  const isMobile = isMobileProp ?? isMobileHook

  return (
    <section style={{ padding: isMobile ? '10px 0 50px' : '10px 0 80px', background: 'var(--background-black)' }}>
      <div className="container">
        <h2 style={{
          color: 'var(--white)',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: isMobile ? '24px' : '36px'
        }}>
          Наши операторы
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(2, minmax(0, 1fr))'
            : isCompact
              ? 'repeat(3, minmax(0, 1fr))'
              : 'repeat(5, minmax(0, 1fr))',
          gap: isMobile ? '14px' : '20px'
        }}>
          {operators.map((operator) => (
            <figure key={operator.name} style={{ margin: 0, textAlign: 'center', minWidth: 0 }}>
              <div style={{
                borderRadius: isMobile ? '16px' : '20px',
                overflow: 'hidden',
                border: '1px solid var(--stroke)',
                background: 'var(--cart-black)',
                aspectRatio: '3 / 4'
              }}>
                <img
                  src={operator.photo}
                  alt={operator.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <figcaption style={{
                color: 'var(--white)',
                fontWeight: 700,
                marginTop: '12px',
                fontSize: isMobile ? '14px' : '16px',
                lineHeight: 1.3
              }}>
                {operator.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

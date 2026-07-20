import { useEffect, useRef, useState } from 'react'
import portfolioData from '../data/portfolio-videos.json'

type PortfolioVideo = {
  id: number
  title: string
  src: string
  poster?: string
  type: 'local' | 'youtube'
}

const videos = portfolioData.videos as PortfolioVideo[]

function getYoutubeEmbedUrl(src: string) {
  if (src.includes('youtube.com/embed/')) return src
  const watchMatch = src.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = src.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  return src
}

export default function PortfolioVideos({ isMobile }: { isMobile: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const goTo = (index: number) => {
    if (!videos.length) return
    const next = (index + videos.length) % videos.length
    setActiveIndex(next)
  }

  const goPrev = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  if (!videos.length) {
    return (
      <div style={{
        width: '100%',
        padding: isMobile ? '40px 15px' : '60px 20px',
        textAlign: 'center',
        color: 'var(--txt)',
        background: 'var(--cart-black)',
        borderRadius: isMobile ? '16px' : '20px',
        border: '1px solid var(--stroke)'
      }}>
        Добавьте видео в <code style={{ color: 'var(--primary)' }}>frontend/src/data/portfolio-videos.json</code>
        {' '}и файлы в <code style={{ color: 'var(--primary)' }}>frontend/public/videos/</code>
      </div>
    )
  }

  const active = videos[activeIndex]

  return (
    <div
      style={{
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        background: 'var(--cart-black)',
        borderTop: '1px solid var(--stroke)',
        borderBottom: '1px solid var(--stroke)',
        padding: isMobile ? '28px 0 32px' : '40px 0 48px'
      }}
    >
      <div
        className="container"
        style={{
          paddingLeft: isMobile ? '15px' : '20px',
          paddingRight: isMobile ? '15px' : '20px',
          marginBottom: isMobile ? '18px' : '24px'
        }}
      >
        <h2 style={{
          color: 'var(--white)',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 700,
          margin: 0,
          textAlign: 'center'
        }}>
          Портфолио
        </h2>
        <p style={{
          color: 'var(--txt)',
          fontSize: isMobile ? '14px' : '16px',
          textAlign: 'center',
          marginTop: '10px',
          marginBottom: 0
        }}>
          Видео наших работ — листайте и смотрите
        </p>
      </div>

      <div
        ref={trackRef}
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '15px' : '20px',
          paddingRight: isMobile ? '15px' : '20px'
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return
          const delta = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(delta) > 40) {
            if (delta > 0) goPrev()
            else goNext()
          }
          touchStartX.current = null
        }}
      >
        <div style={{
          position: 'relative',
          borderRadius: isMobile ? '14px' : '20px',
          overflow: 'hidden',
          background: 'var(--background-black)',
          border: '1px solid var(--stroke)',
          aspectRatio: isMobile ? '16 / 10' : '16 / 9'
        }}>
          {active.type === 'youtube' ? (
            <iframe
              key={active.id}
              src={getYoutubeEmbedUrl(active.src)}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
            />
          ) : (
            <video
              key={active.id}
              controls
              playsInline
              poster={active.poster}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                background: '#000',
                display: 'block'
              }}
            >
              <source src={active.src} type="video/mp4" />
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          )}
        </div>

        {/* Навигация */}
        {videos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Предыдущее видео"
              style={{
                position: 'absolute',
                left: isMobile ? '22px' : '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(0,0,0,0.55)',
                color: 'var(--white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Следующее видео"
              style={{
                position: 'absolute',
                right: isMobile ? '22px' : '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'rgba(0,0,0,0.55)',
                color: 'var(--white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div style={{
          marginTop: isMobile ? '14px' : '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            color: 'var(--white)',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            {active.title}
          </div>

          {videos.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {videos.map((video, idx) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Видео ${idx + 1}`}
                  style={{
                    width: activeIndex === idx ? '22px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    border: 'none',
                    background: activeIndex === idx ? 'var(--primary)' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          )}

          {/* Миниатюры для быстрого выбора */}
          {videos.length > 1 && (
            <div style={{
              display: 'flex',
              gap: isMobile ? '8px' : '12px',
              overflowX: 'auto',
              width: '100%',
              paddingBottom: '4px',
              WebkitOverflowScrolling: 'touch'
            }}>
              {videos.map((video, idx) => (
                <button
                  key={`thumb-${video.id}`}
                  type="button"
                  onClick={() => goTo(idx)}
                  style={{
                    flex: '0 0 auto',
                    width: isMobile ? '96px' : '140px',
                    height: isMobile ? '56px' : '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: activeIndex === idx
                      ? '2px solid var(--primary)'
                      : '2px solid var(--stroke)',
                    padding: 0,
                    cursor: 'pointer',
                    background: 'var(--background-black)'
                  }}
                >
                  <img
                    src={video.poster || '/images/images-technica/нов1.jpeg'}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: activeIndex === idx ? 1 : 0.7
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

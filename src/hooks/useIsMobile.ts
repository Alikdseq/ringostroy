import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 767.98px)'

/**
 * Uses CSS media queries (same as Tailwind md breakpoint), not layout
 * viewport width. Chrome mobile can report a large innerWidth when
 * overflow or a late viewport meta confuses the layout viewport.
 */
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MOBILE_QUERY).matches
  })

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setIsMobile(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

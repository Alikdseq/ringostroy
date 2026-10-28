import { useEffect, useState } from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * isMobile  — телефон (< 768)
 * isLaptop  — планшет / ноутбук (768–1199): компактная шапка
 * isDesktop — широкий экран (≥ 1200)
 * isCompact — всё, где нужна компактная шапка (< 1200)
 */
export default function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 767.98px)')
  const isLaptop = useMediaQuery('(min-width: 768px) and (max-width: 1199.98px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const isWide = useMediaQuery('(min-width: 1400px)')
  const isCompact = !isDesktop

  return { isMobile, isLaptop, isDesktop, isWide, isCompact }
}

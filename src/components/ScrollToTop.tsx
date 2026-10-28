import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** При смене URL прокручивает страницу наверх */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initYandexMetrika, trackPageView } from '../utils/yandexMetrika'

/**
 * Компонент для интеграции Яндекс.Метрики с React Router
 * Отслеживает переходы между страницами в SPA
 */
export default function YandexMetrika() {
  const location = useLocation()

  // Инициализация Метрики при монтировании компонента
  useEffect(() => {
    initYandexMetrika()
  }, [])

  // Отслеживание изменений маршрута
  useEffect(() => {
    // Небольшая задержка для корректной работы с React Router
    const timer = setTimeout(() => {
      trackPageView(window.location.href)
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  return null
}


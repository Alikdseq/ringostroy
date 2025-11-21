/**
 * Yandex.Metrika интеграция для React SPA
 * Защита от конфликтов и правильная инициализация
 */

// Тип для функции Яндекс.Метрики с дополнительными свойствами
interface YandexMetrikaFunction {
  (counterId: number, method: string, ...args: any[]): void
  a?: any[][]
  l?: number
}

declare global {
  interface Window {
    ym?: YandexMetrikaFunction
    Ya?: any
  }
}

const METRIKA_ID = 105445678
let isInitialized = false
let isScriptLoaded = false

/**
 * Инициализация Яндекс.Метрики с защитой от дублирования
 */
export function initYandexMetrika(): void {
  // Проверяем, не инициализирована ли уже Метрика
  if (isInitialized || typeof window === 'undefined') {
    return
  }

  // Проверяем, не загружен ли уже скрипт
  if (isScriptLoaded) {
    // Если скрипт уже загружен, просто инициализируем счетчик
    if (window.ym) {
      try {
        window.ym(METRIKA_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: 'dataLayer',
          trackHash: true, // Отслеживание изменений hash в URL для SPA
        })
        isInitialized = true
      } catch (e) {
        console.warn('Yandex.Metrika initialization error:', e)
      }
    }
    return
  }

  // Создаем функцию-обертку для Метрики
  if (!window.ym) {
    const ymFunction: YandexMetrikaFunction = function (...args: any[]) {
      if (window.ym && window.ym.a) {
        window.ym.a.push(args)
      }
    }
    ymFunction.a = []
    ymFunction.l = Date.now()
    window.ym = ymFunction
  } else {
    // Если функция уже существует, инициализируем свойства если их нет
    if (!window.ym.a) {
      window.ym.a = []
    }
    if (!window.ym.l) {
      window.ym.l = Date.now()
    }
  }

  // Проверяем, не загружен ли уже скрипт Метрики
  const existingScript = Array.from(document.scripts).find(
    (script) => script.src && script.src.includes('mc.yandex.ru/metrika/tag.js')
  )

  if (existingScript) {
    isScriptLoaded = true
    // Если скрипт уже есть, просто инициализируем
    if (window.ym) {
      try {
        window.ym(METRIKA_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: 'dataLayer',
          trackHash: true,
        })
        isInitialized = true
      } catch (e) {
        console.warn('Yandex.Metrika initialization error:', e)
      }
    }
    return
  }

  // Загружаем скрипт Метрики
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  script.onload = () => {
    isScriptLoaded = true
    if (window.ym) {
      try {
        window.ym(METRIKA_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: 'dataLayer',
          trackHash: true,
        })
        isInitialized = true
      } catch (e) {
        console.warn('Yandex.Metrika initialization error:', e)
      }
    }
  }
  script.onerror = () => {
    console.warn('Failed to load Yandex.Metrika script')
  }

  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }
}

/**
 * Отслеживание просмотра страницы (hit)
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined' || !window.ym || !isInitialized) {
    return
  }

  try {
    window.ym(METRIKA_ID, 'hit', url || window.location.href)
  } catch (e) {
    console.warn('Yandex.Metrika hit error:', e)
  }
}

/**
 * Отслеживание цели
 */
export function trackGoal(goalName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.ym || !isInitialized) {
    return
  }

  try {
    if (params) {
      window.ym(METRIKA_ID, 'reachGoal', goalName, params)
    } else {
      window.ym(METRIKA_ID, 'reachGoal', goalName)
    }
  } catch (e) {
    console.warn('Yandex.Metrika goal tracking error:', e)
  }
}

/**
 * Отслеживание параметров
 */
export function trackParams(params: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.ym || !isInitialized) {
    return
  }

  try {
    window.ym(METRIKA_ID, 'params', params)
  } catch (e) {
    console.warn('Yandex.Metrika params error:', e)
  }
}


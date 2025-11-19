import type { Service, Equipment } from '../types'
import servicesData from '../data/services.json'
import equipmentData from '../data/equipment.json'
import categoriesData from '../data/categories.json'

// Имитация API для работы со статическими данными
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Имитация промиса для совместимости с существующим кодом
const createPromise = <T>(data: T): Promise<{ data: T }> => {
  return delay(100).then(() => ({ data }))
}

export const servicesApi = {
  getAll: () => createPromise<{ count: number; results: Service[] }>(servicesData as { count: number; results: Service[] }),
  getPopular: () => createPromise<Service[]>(
    (servicesData as { count: number; results: Service[] }).results.filter(s => s.is_popular)
  ),
}

export const equipmentApi = {
  getAll: () => createPromise<{ count: number; results: Equipment[] }>(equipmentData as { count: number; results: Equipment[] }),
  getFeatured: () => createPromise<Equipment[]>(
    (equipmentData as { count: number; results: Equipment[] }).results.filter(e => e.is_featured)
  ),
  byCategory: (slug: string) => {
    const all = (equipmentData as { count: number; results: Equipment[] }).results
    const filtered = all.filter(e => e.category?.slug === slug)
    return createPromise<{ count: number; results: Equipment[] }>({
      count: filtered.length,
      results: filtered
    })
  },
}

export const categoryApi = {
  getAll: () => createPromise<{ count: number; results: import('../types').Category[] }>(categoriesData as { count: number; results: import('../types').Category[] }),
  getSingle: (slug: string) => {
    const categories = (categoriesData as { count: number; results: import('../types').Category[] }).results
    const category = categories.find(c => c.slug === slug)
    return createPromise<import('../types').Category>(category || categories[0])
  }
}

// Старый API для обратной совместимости (если где-то используется напрямую)
const api = {
  get: () => Promise.reject(new Error('API calls are disabled. Use static data files instead.')),
  post: () => Promise.reject(new Error('API calls are disabled. Use static data files instead.')),
}

export default api

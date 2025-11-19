export interface Service {
  id: number
  name: string
  slug: string
  short_description: string
  full_description: string
  image: string | null
  phone: string
  price_from: number | null
  is_popular: boolean
  sort_order: number
  whatsapp_link: string
  call_link: string
}

export interface EquipmentImage {
  id: number
  image: string
  alt_text: string
  is_primary: boolean
  sort_order: number
}

export interface EquipmentSpec {
  label: string
  value: string
}

export interface Equipment {
  id: number
  name: string
  slug: string
  category: Category
  description: string
  full_description?: string
  manufacturer: string
  model: string
  price_per_hour: number
  price_per_shift?: number
  status: string
  is_featured: boolean
  images: EquipmentImage[]
  primary_image: string | null
  specs?: EquipmentSpec[]
  full_specs?: EquipmentSpec[]
}

export interface Category {
  id: number
  name: string
  slug: string
}

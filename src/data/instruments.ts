export type Instrument = {
  id: string
  title: string
  image: string
}

/** Статичный каталог инструментов: фото + точное название */
export const instruments: Instrument[] = [
  {
    id: 'freza',
    title: 'Фреза',
    image: '/images/newteknica/инструмент-2.jpeg'
  },
  {
    id: 'vezdekos',
    title: 'Вездекос',
    image: '/images/newteknica/инструмент-7.jpeg'
  },
  {
    id: 'snowburier',
    title: 'Сноубурьер',
    image: '/images/newteknica/инструмент-5.jpeg'
  },
  {
    id: 'mulcher',
    title: 'Мульчер',
    image: '/images/newteknica/инструмент-1.jpeg'
  },
  {
    id: 'bucket-pin',
    title: 'Палец ковшевой',
    image: '/images/newteknica/инструмент-3.jpeg'
  },
  {
    id: 'motomul',
    title: 'Мотомул (Тачка)',
    image: '/images/newteknica/инструмент-4.jpeg'
  },
  {
    id: 'crusher',
    title: 'Дробилка',
    image: '/images/newteknica/инструмент-6.jpeg'
  },
  {
    id: 'trimmer',
    title: 'Триммер',
    image: '/images/newteknica/инструмент-18.jpeg'
  },
  {
    id: 'concrete-mixer',
    title: 'Бетономешалка',
    image: '/images/newteknica/инструмент-16.jpeg'
  },
  {
    id: 'zhuk-sprayer',
    title: 'Жук-Опрыскиватель',
    image: '/images/newteknica/инструмент-15.jpeg'
  },
  {
    id: 'vibronoga',
    title: 'Вибронога',
    image: '/images/newteknica/инструмент-10.jpeg'
  },
  {
    id: 'generator',
    title: 'Бензиновый генератор',
    image: '/images/newteknica/инструмент-12.jpeg'
  },
  {
    id: 'chainsaws',
    title: 'Бензопилы',
    image: '/images/newteknica/инструмент-13.jpeg'
  },
  {
    id: 'caiman-mower',
    title: 'Газонокосилка Кайман',
    image: '/images/newteknica/инструмент-9.jpeg'
  },
  {
    id: 'basket-cradle',
    title: 'Корзина (Люлька)',
    image: '/images/newteknica/инструмент-17.jpeg'
  },
  {
    id: 'vibroplate',
    title: 'Виброплита',
    image: '/images/newteknica/инструмент-8.jpeg'
  }
]

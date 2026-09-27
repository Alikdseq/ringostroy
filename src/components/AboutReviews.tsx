const reviews = [
  {
    name: 'Лика',
    service: 'Расчистка участка под ключ',
    text: 'Самые лучшие! Быстро и недорого. Справились со своей работой на 5+. Спасибо большое. Всем рекомендую!'
  },
  {
    name: 'Жанна',
    service: 'Снос и демонтаж зданий',
    text: 'Результат превзошёл мои ожидания. Всё просто супер. И техника, и ребята — нет слов, только восторг. Спасибо большое. Однозначно рекомендую всем.'
  },
  {
    name: 'Алексей',
    service: 'Заказ с доставкой',
    text: 'Отлично. Оцениваю за последовательность и чёткость в выполнении договорённостей. Приятно иметь дело с человеком — хозяином своего слова.'
  },
  {
    name: 'Константин',
    service: 'Снос и демонтаж зданий',
    text: 'Работают настоящие профессионалы. Работа выполнена на отлично.'
  },
  {
    name: 'Дмитрий',
    service: 'Заказ с доставкой',
    text: 'Всё ок.'
  },
  {
    name: 'Денис',
    service: 'Благоустройство частных дворов',
    text: 'Ребята молодцы, всё сделали чётко. Обращусь к ним в дальнейшем.'
  },
  {
    name: 'Дональд',
    service: 'Покос травы',
    text: 'Мне нужно было почистить огород, и с задачей справились. Особая благодарность руководителю Герману за высокий профессионализм, добросовестность, отзывчивость и честность.'
  },
  {
    name: 'Геор',
    service: 'Расчистка участка под ключ',
    text: 'Меня всё устраивает. Мне нужен был отличный результат, и я его получил. Почистили весь участок.'
  },
  {
    name: 'Юрий',
    service: 'Аренда мини-погрузчика Zoomlion ZS085V',
    text: 'Парни молодцы и в профессиональном, и в человеческом плане. Качественно работают, неравнодушно и ответственно относятся к своей работе.'
  },
  {
    name: 'Олег',
    service: 'Услуги грузового эвакуатора',
    text: 'Работа выполнена качественно и в срок. Фирма хорошая, можно доверять. Спасибо. Буду ещё обращаться.'
  },
  {
    name: 'Константин',
    service: 'Копка фундамента',
    text: 'Очень приятно удивлён работой организации. Сказали в 09:00 — приехали в 09:00, назвали срок и уложились именно в него. Спасибо огромное Герману и ребятам: крутые профессионалы и хорошие люди. Настоятельно рекомендую.'
  }
]

const gratitudePhotos = [
  '/images/newteknica/Благодарность1.jpeg',
  '/images/newteknica/Балгодарность2.jpeg'
]

export default function AboutReviews({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '40px 0' : '70px 0', background: 'var(--background-black)' }}>
      <div className="container" style={{ paddingLeft: isMobile ? '15px' : undefined, paddingRight: isMobile ? '15px' : undefined }}>
        <h2 style={{
          color: 'var(--white)',
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: isMobile ? '8px' : '12px'
        }}>
          Отзывы
        </h2>
        <p style={{
          color: 'var(--txt)',
          textAlign: 'center',
          marginBottom: isMobile ? '24px' : '36px',
          fontSize: isMobile ? '14px' : '16px'
        }}>
          11 отзывов клиентов — все с оценкой 5
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0, 1fr))',
          gap: isMobile ? '14px' : '20px'
        }}>
          {reviews.map((review) => (
            <article
              key={`${review.name}-${review.service}`}
              style={{
                background: 'var(--cart-black)',
                border: '1px solid var(--stroke)',
                borderRadius: isMobile ? '16px' : '20px',
                padding: isMobile ? '18px' : '22px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <strong style={{ color: 'var(--white)', fontSize: isMobile ? '16px' : '18px' }}>{review.name}</strong>
                <span style={{ color: 'var(--primary)', letterSpacing: '2px', fontSize: '14px' }} aria-label="5 из 5">★★★★★</span>
              </div>
              <span style={{
                alignSelf: 'flex-start',
                color: 'var(--background-black)',
                background: 'var(--primary)',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 700
              }}>
                {review.service}
              </span>
              <p style={{ color: 'var(--txt)', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.6, margin: 0 }}>
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <h3 style={{
          color: 'var(--white)',
          fontSize: isMobile ? '22px' : '28px',
          fontWeight: 700,
          textAlign: 'center',
          marginTop: isMobile ? '36px' : '56px',
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          Благодарности
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
          gap: isMobile ? '12px' : '20px'
        }}>
          {gratitudePhotos.map((src, index) => (
            <div
              key={src}
              style={{
                borderRadius: isMobile ? '14px' : '18px',
                overflow: 'hidden',
                border: '1px solid var(--stroke)',
                background: 'var(--cart-black)'
              }}
            >
              <img
                src={src}
                alt={`Благодарность ${index + 1}`}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

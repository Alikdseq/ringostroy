import SEO from '../components/SEO';

const policyText = [
  { heading: 'Политика конфиденциальности', body: 'Мы уважаем вашу приватность и строго следуем 152-ФЗ.' },
  { heading: 'Обработка персональных данных', body: 'Все данные пользователей используются только для оказания услуг: звонки, связь и информирование. Никакие данные не передаются третьим лицам без законных оснований.' },
  { heading: 'Права пользователя', body: 'Вы можете запросить удаление или изменение своих данных, написать на почту misikov7700@mail.ru.' },
  { heading: 'Согласие на обработку', body: 'Оставляя заявку, вы подтверждаете согласие на обработку данных для целей исполнения вашей заявки.' }
]

export default function Privacy() {
  return (
    <>
      <SEO title="Политика конфиденциальности | RingooStroy" description="Правила обработки и хранения персональных данных на сайте. Надёжная защита и прозрачность." />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-7 text-center">Политика конфиденциальности</h1>
        <div className="bg-lime-50 rounded-xl p-7 text-gray-800 prose prose-lg">
          {policyText.map((p, i) => (
            <div key={i} className="mb-6">
              <h2>{p.heading}</h2>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">Последнее обновление: 2025</div>
      </section>
    </>
  )
}

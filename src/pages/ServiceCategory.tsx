import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { servicesApi } from '../services/api';
import type { Service } from '../types';
import SEO from '../components/SEO';

export default function ServiceCategory() {
  const { category } = useParams<{ category: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    // Нет отдельного api, грузим все услуги
    servicesApi.getAll()
      .then(res => {
        // Дополнительно: если будет категория, фильтровать по res.data.results.category.slug === category
        setServices(res.data.results); // при структуре без категорий
        setCategoryName(category || '')
      })
      .catch(() => setError('Ошибка загрузки услуг'))
      .finally(() => setLoading(false))
  }, [category]);

  return (
    <>
      <SEO 
        title={
          categoryName
            ? `Услуги: ${categoryName} во Владикавказе | RingooStroy`
            : 'Услуги аренды спецтехники | RingooStroy'
        }
        description={
          categoryName
            ? `Услуги ${categoryName.toLowerCase()} во Владикавказе. Профессиональное выполнение работ, современная техника, доступные цены. Работаем по всей Северной Осетии.`
            : 'Полный каталог услуг аренды спецтехники во Владикавказе'
        }
        keywords={
          categoryName
            ? `услуги ${categoryName.toLowerCase()}, ${categoryName.toLowerCase()} Владикавказ, аренда спецтехники ${categoryName.toLowerCase()}`
            : 'услуги аренды спецтехники, каталог услуг Владикавказ'
        }
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-7 text-center">{categoryName ? `Услуги: ${categoryName}` : 'Услуги по категории'}</h1>
        {loading ? (
          <div className="text-center mt-16">Загрузка...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-16">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">Услуги этой категории скоро появятся</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col gap-3">
                {service.image && <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />}
                <h3 className="text-xl font-semibold mb-3 text-black">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.short_description}</p>
                {service.price_from && <div className="text-lime-600 font-semibold text-lg mb-4">От {service.price_from} ₽</div>}
                <div className="flex gap-2">
                  <a href={service.whatsapp_link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-center font-semibold">WhatsApp</a>
                  <a href={service.call_link} className="flex-1 bg-lime-400 text-gray-800 px-4 py-2 rounded text-center font-semibold">Позвонить</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { equipmentApi } from '../services/api';
import type { Equipment } from '../types';
import SEO from '../components/SEO';

export default function EquipmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Equipment|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    equipmentApi.getAll()
      .then(res => {
        const found = res.data.results.find((x: Equipment) => x.slug === slug);
        if (!found) setError('Техника не найдена');
        setData(found || null);
      })
      .catch(() => setError('Ошибка загрузки данных по технике'))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <SEO title={data?.name ? `${data.name} | Спецтехника` : 'Спецтехника | Не найдено'} description={data?.description || 'Карточка техники'} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center mt-20">Загрузка...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-12">
            <h2 className="text-3xl mb-6">{error}</h2>
            <Link to="/equipment" className="btn">← Вернуться в каталог</Link>
          </div>
        ) : data ? (
          <>
            {/* Галерея изображений */}
            <div className="mb-7 flex justify-center items-center">
              {data.primary_image ? (
                <div className="rounded-lg w-full h-96 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={data.primary_image} 
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-lg w-full h-96 bg-gray-100 flex items-center justify-center text-6xl text-gray-400">
                  <span>🛠️</span>
                </div>
              )}
            </div>
            
            {/* Дополнительные изображения если есть */}
            {data.images && data.images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
                {data.images.slice(1, 4).map((img) => (
                  <div key={img.id} className="rounded-lg h-32 overflow-hidden bg-gray-100">
                    <img 
                      src={img.image} 
                      alt={img.alt_text || data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl font-bold mb-2 text-center">{data.name}</h1>
            <div className="flex justify-center text-gray-600 mb-4">{data.category?.name}</div>
            <div className="text-lg mb-6 text-center">{data.description}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div><span className="font-bold">Производитель:</span> {data.manufacturer}</div>
              <div><span className="font-bold">Модель:</span> {data.model}</div>
              <div><span className="font-bold">Цена (от):</span> <span className="text-lime-600 font-bold">{data.price_per_hour} ₽/час</span></div>
              <div><span className="font-bold">Статус:</span> {data.status}</div>
            </div>
            <div className="flex gap-5 mb-9 justify-center">
              <a href="/contacts" className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold text-lg">WhatsApp</a>
              <a href="/contacts" className="bg-lime-400 text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg">Позвонить</a>
            </div>
            <div className="mt-10 text-center">
              <Link to="/equipment" className="text-lime-400 underline text-lg">← К списку всей техники</Link>
            </div>
          </>
        ) : null}
      </section>
    </>
  );
}
